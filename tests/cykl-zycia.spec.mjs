// Cykl życia komponentów: automatyczne destroy() po usunięciu z DOM, przenoszenie,
// ponowne montowanie, zabezpieczenie przed podwójnym destroy() i zwalnianie zasobów.
import { expect, test } from '@playwright/test';
import { DESKTOP, open, watchErrors } from './helpers.mjs';

test.use({ viewport: DESKTOP });

/** Czeka, aż Plossy przetworzy usunięcia (obserwator + koniec bieżącego zadania). */
const settle = (page) => page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 40)));

/**
 * Rejestruje komponent-sondę `probe`: liczy init/destroy i nasłuchuje zdarzenia
 * `probe-ping` na window (sprawdza, czy nasłuch globalny został odpięty).
 */
async function probe(page) {
  await open(page, '/docs/start/javascript/');
  await page.evaluate(() => {
    const log = (window.__log = { init: 0, destroy: 0, override: 0, ping: 0 });
    class Probe extends window.Plossy.Component {
      static defaults = { label: 'atrybut' };
      init() {
        log.init++;
        this.on(window, 'probe-ping', () => log.ping++);
        this.onDestroy(() => log.destroy++);
      }
      destroy() {
        log.override++;
        super.destroy();
      }
    }
    window.Plossy.register('probe', Probe);
    const box = document.createElement('div');
    box.id = 'box';
    document.body.append(box);
    window.ping = () => window.dispatchEvent(new Event('probe-ping'));
  });
}

const log = (page) => page.evaluate(() => ({ ...window.__log }));

test.describe('cykl życia', () => {
  test('usunięcie elementu wywołuje destroy() i odpina nasłuchy globalne', async ({ page }) => {
    await probe(page);
    await page.evaluate(() => {
      document.getElementById('box').innerHTML = '<div id="a" data-pl-probe></div>';
    });
    await expect.poll(() => log(page)).toMatchObject({ init: 1 });
    await page.evaluate(() => {
      window.__a = document.getElementById('a');
      window.ping();
      window.__a.remove();
    });
    await settle(page);
    await page.evaluate(() => window.ping());
    expect(await log(page)).toMatchObject({ init: 1, destroy: 1, ping: 1 });
    expect(await page.evaluate(() => window.Plossy.getInstance(window.__a, 'probe'))).toBeNull();
  });

  test('usunięcie przodka niszczy instancje w całym poddrzewie, także utworzone z kodu', async ({ page }) => {
    await probe(page);
    await page.evaluate(() => {
      document.getElementById('box').innerHTML =
        '<section id="s"><div data-pl-probe><div data-pl-probe></div></div><p><span id="kod"></span></p></section>';
    });
    await expect.poll(() => log(page)).toMatchObject({ init: 2 });
    await page.evaluate(() => {
      window.Plossy.probe('#kod', { label: 'kod' });
      document.getElementById('box').innerHTML = '';
    });
    await settle(page);
    await page.evaluate(() => window.ping());
    expect(await log(page)).toMatchObject({ init: 3, destroy: 3, ping: 0 });
  });

  test('przeniesienie elementu w obrębie DOM nie niszczy instancji', async ({ page }) => {
    await probe(page);
    const result = await page.evaluate(async () => {
      const box = document.getElementById('box');
      box.innerHTML = '<ul id="lista"><li id="x" data-pl-probe>1</li><li>2</li></ul><div id="cel"></div>';
      await new Promise((resolve) => setTimeout(resolve));
      const el = document.getElementById('x');
      const before = window.Plossy.getInstance(el, 'probe');
      // 1) zwykłe przeniesienie, 2) zmiana kolejności (sortowanie), 3) odłączenie na czas await
      document.getElementById('cel').append(el);
      document.getElementById('lista').prepend(el);
      el.remove();
      await Promise.resolve();
      await new Promise((resolve) => queueMicrotask(resolve));
      document.getElementById('cel').append(el);
      await new Promise((resolve) => setTimeout(resolve, 40));
      return { same: window.Plossy.getInstance(el, 'probe') === before };
    });
    expect(result.same).toBe(true);
    expect(await log(page)).toMatchObject({ init: 1, destroy: 0 });
  });

  test('odłączenie na dłużej i powrót: ta sama instancja z pierwotnymi opcjami', async ({ page }) => {
    await probe(page);
    await page.evaluate(() => {
      document.getElementById('box').innerHTML = '<div id="decl" data-pl-probe="label: z-atrybutu"></div><div id="prog"></div>';
      window.__view = document.getElementById('box');
    });
    await expect.poll(() => log(page)).toMatchObject({ init: 1 });
    await page.evaluate(() => {
      window.__decl = window.Plossy.getInstance(document.getElementById('decl'), 'probe');
      window.__prog = window.Plossy.probe('#prog', { label: 'z-kodu' });
      window.__view.remove(); // widok SPA odłożony do pamięci
    });
    await settle(page);
    expect(await log(page)).toMatchObject({ init: 2, destroy: 2 });
    expect(await page.evaluate(() => window.Plossy.getInstance(window.__prog.el, 'probe'))).toBeNull();

    const after = await page.evaluate(async () => {
      document.body.append(window.__view);
      await new Promise((resolve) => setTimeout(resolve, 40));
      window.ping();
      const decl = window.Plossy.getInstance(document.getElementById('decl'), 'probe');
      const prog = window.Plossy.getInstance(document.getElementById('prog'), 'probe');
      return {
        declSame: decl === window.__decl,
        progSame: prog === window.__prog,
        declLabel: decl?.options.label,
        progLabel: prog?.options.label,
      };
    });
    expect(after).toEqual({ declSame: true, progSame: true, declLabel: 'z-atrybutu', progLabel: 'z-kodu' });
    // Po ponownym montowaniu każdy nasłuch jest podpięty dokładnie raz.
    expect(await log(page)).toMatchObject({ init: 4, destroy: 2, ping: 2 });
  });

  test('Plossy.nazwa() na odłączonym elemencie zwraca przywróconą, tę samą instancję', async ({ page }) => {
    await probe(page);
    const same = await page.evaluate(async () => {
      const el = document.createElement('div');
      document.getElementById('box').append(el);
      const first = window.Plossy.probe(el, { label: 'z-kodu' });
      el.remove();
      await new Promise((resolve) => setTimeout(resolve, 40));
      const again = window.Plossy.probe(el);
      return again === first && again.options.label === 'z-kodu';
    });
    expect(same).toBe(true);
  });

  test('destroy() działa tylko raz — jawnie, wielokrotnie i razem z automatycznym', async ({ page }) => {
    await probe(page);
    await page.evaluate(() => {
      document.getElementById('box').innerHTML = '<div id="d" data-pl-probe></div><div id="p"></div>';
    });
    await expect.poll(() => log(page)).toMatchObject({ init: 1 });
    const result = await page.evaluate(async () => {
      const d = document.getElementById('d');
      const p = document.getElementById('p');
      const decl = window.Plossy.getInstance(d, 'probe');
      const prog = window.Plossy.probe(p);
      decl.destroy();
      decl.destroy();
      prog.destroy();
      d.remove(); // jak alert.close() / Plossy.dialog(): destroy(), a potem remove()
      p.remove();
      await new Promise((resolve) => setTimeout(resolve, 40));
      // Po jawnym destroy() element z kodu nie odzyskuje instancji, a z atrybutu startuje od nowa.
      document.getElementById('box').append(d, p);
      await new Promise((resolve) => setTimeout(resolve, 40));
      const fresh = window.Plossy.getInstance(d, 'probe');
      return {
        progBack: window.Plossy.getInstance(p, 'probe'),
        declNew: !!fresh && fresh !== decl,
      };
    });
    expect(result).toEqual({ progBack: null, declNew: true });
    // init: decl + prog + nowa instancja z atrybutu; destroy i nadpisane destroy() — po jednym razie na instancję.
    expect(await log(page)).toMatchObject({ init: 3, destroy: 2, override: 2 });
  });

  test('granica: await na rozwiązanej obietnicy zachowuje instancję, czekanie na timer/sieć — tylko z data-pl-persist', async ({ page }) => {
    await probe(page);
    await page.evaluate(() => {
      document.getElementById('box').innerHTML = '<div id="v"><div data-pl-probe></div></div>';
    });
    await expect.poll(() => log(page)).toMatchObject({ init: 1 });
    const result = await page.evaluate(async () => {
      const v = document.getElementById('v');
      const box = document.getElementById('box');
      const instance = () => window.Plossy.getInstance(v.firstElementChild, 'probe');
      const first = instance();
      const later = () => new Promise((resolve) => setTimeout(resolve, 20)); // jak odpowiedź z sieci
      // 1) Czekanie dłuższe niż bieżące zadanie: destroy(), potem przywrócenie tej samej instancji.
      v.remove();
      await later();
      box.append(v);
      await later();
      const revived = instance() === first;
      // 2) To samo z atrybutem ustawionym na czas operacji: bez destroy().
      v.setAttribute('data-pl-persist', '');
      v.remove();
      await later();
      box.append(v);
      v.removeAttribute('data-pl-persist');
      await later();
      return { revived, kept: instance() === first };
    });
    expect(result).toEqual({ revived: true, kept: true });
    // init: start + przywrócenie po (1); w (2) bez destroy() i bez ponownego init().
    expect(await log(page)).toMatchObject({ init: 2, destroy: 1 });
  });

  test('nie inicjalizuje elementu dodanego i od razu usuniętego', async ({ page }) => {
    await probe(page);
    await page.evaluate(() => {
      const el = document.createElement('div');
      el.setAttribute('data-pl-probe', '');
      document.getElementById('box').append(el);
      el.remove();
    });
    await settle(page);
    expect(await log(page)).toMatchObject({ init: 0, destroy: 0 });
  });

  test('zgodność wstecz: data-pl-persist i Plossy.config.autoDestroy = false', async ({ page }) => {
    await probe(page);
    await page.evaluate(() => {
      document.getElementById('box').innerHTML =
        '<section id="trwaly" data-pl-persist><div data-pl-probe></div></section>' +
        '<main id="widoki" data-pl-persist><div id="widok"><div data-pl-probe></div></div></main>' +
        '<div id="zwykly"><div data-pl-probe></div></div>';
    });
    await expect.poll(() => log(page)).toMatchObject({ init: 3 });
    await page.evaluate(() => {
      document.getElementById('trwaly').remove(); // odłożony sam element z atrybutem
      document.getElementById('widok').remove(); // dziecko wyjęte z kontenera, który zostaje w DOM
      window.Plossy.config.autoDestroy = false;
      document.getElementById('zwykly').remove();
    });
    await settle(page);
    await page.evaluate(() => window.ping());
    expect(await log(page)).toMatchObject({ init: 3, destroy: 0, ping: 3 });
  });
});

test.describe('cykl życia — prawdziwe komponenty', () => {
  /** Liczba nasłuchów na window i document (CDP). */
  async function listeners(page) {
    const client = await page.context().newCDPSession(page);
    let total = 0;
    for (const expression of ['window', 'document']) {
      const { result } = await client.send('Runtime.evaluate', { expression });
      const { listeners } = await client.send('DOMDebugger.getEventListeners', { objectId: result.objectId });
      total += listeners.length;
    }
    await client.detach();
    return total;
  }

  test('AJAX: wielokrotna podmiana listy produktów nie zostawia nasłuchów ani elementów pływających', async ({ page }) => {
    const errors = watchErrors(page);
    await open(page, '/docs/start/javascript/');
    const card = (i) => `
      <article class="pl-card">
        <button class="pl-button" type="button" data-pl-tooltip="Dodaj do ulubionych">♥</button>
        <button class="pl-button" type="button" id="pop-${i}" data-pl-popover="content: Darmowa dostawa od 200 zł; mode: click">Dostawa</button>
        <div class="pl-quantity" data-pl-quantity="min: 1; max: 9"><input class="pl-input" type="number" value="1" aria-label="Ilość"></div>
        <div data-pl-sticky="offset: 20"><span>Cena</span></div>
      </article>`;
    const render = async (i) => {
      await page.evaluate(
        ([html, i]) => {
          let list = document.getElementById('produkty');
          if (!list) {
            list = document.createElement('div');
            list.id = 'produkty';
            document.querySelector('.docs-content').prepend(list);
          }
          list.innerHTML = html;
          return i;
        },
        [card(i).repeat(3), i],
      );
      await settle(page);
      // Otwarty popover i pokazany tooltip tworzą elementy poza listą (w body).
      await page.locator(`#pop-${i}`).first().click();
      await page.locator('[data-pl-tooltip]').first().hover();
      await expect(page.locator('.pl-popover:popover-open')).toHaveCount(1);
    };

    await render(0);
    const baseline = await listeners(page);
    const floating = await page.evaluate(() => document.querySelectorAll('.pl-popover, .pl-tooltip').length);
    for (let i = 1; i <= 5; i++) await render(i);
    expect(await listeners(page), 'nasłuchy na window/document nie mogą przyrastać').toBe(baseline);
    expect(await page.evaluate(() => document.querySelectorAll('.pl-popover, .pl-tooltip').length)).toBe(floating);
    // Plusy i minusy quantity powstają tylko w bieżącej liście.
    expect(await page.locator('#produkty .pl-quantity button').count()).toBe(6);

    await page.evaluate(() => document.getElementById('produkty').remove());
    await settle(page);
    expect(await page.locator('.pl-popover:popover-open').count()).toBe(0);
    expect(errors).toEqual([]);
  });

  test('quantity: wartość wpisana w pole autora przetrwa odłączenie na czas zapytania', async ({ page }) => {
    await open(page, '/docs/forms/quantity/');
    const result = await page.evaluate(async () => {
      const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      const cart = document.createElement('div');
      cart.innerHTML = '<div class="pl-quantity" data-pl-quantity="min: 1; max: 9"><input class="pl-input" type="number" value="1" aria-label="Ilość"></div>';
      document.querySelector('.docs-content').prepend(cart);
      await wait(40);
      const box = cart.firstElementChild;
      const before = window.Plossy.getInstance(box, 'quantity');
      box.querySelector('input').value = '4';
      cart.remove(); // np. koszyk odświeżany AJAX-em
      await wait(200);
      const destroyed = window.Plossy.getInstance(box, 'quantity') === null;
      document.querySelector('.docs-content').prepend(cart);
      await wait(40);
      return {
        destroyed,
        same: window.Plossy.getInstance(box, 'quantity') === before,
        value: box.querySelector('input').value,
        buttons: box.querySelectorAll('button').length,
      };
    });
    expect(result).toEqual({ destroyed: true, same: true, value: '4', buttons: 2 });
  });

  test('combobox: zapytanie w toku jest przerywane, a spóźniona odpowiedź nie trafia do przywróconej instancji', async ({ page }) => {
    const errors = watchErrors(page);
    await open(page, '/docs/forms/combobox/');
    const result = await page.evaluate(async () => {
      const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      const calls = [];
      const events = [];
      const holder = document.createElement('div');
      holder.innerHTML = '<input class="pl-input" id="t-cb" aria-label="Szukaj produktu">';
      document.querySelector('.docs-content').prepend(holder);
      const input = holder.querySelector('input');
      const combo = window.Plossy.combobox(input, {
        delay: 0,
        // Serwer, który ignoruje przerwanie: odpowiada po 300 ms tak czy inaczej.
        source: (query, { signal }) => {
          const call = { query, signal };
          calls.push(call);
          return new Promise((resolve) => setTimeout(() => resolve([`${query} — wynik`]), 300));
        },
      });
      ['pl:error', 'pl:change'].forEach((type) => holder.addEventListener(type, () => events.push(type)));
      const type = (text) => {
        input.value = text;
        input.dispatchEvent(new Event('input', { bubbles: true }));
      };
      input.focus();
      type('stary');
      await wait(30); // zapytanie „stary" w toku
      holder.remove(); // np. podmiana fragmentu AJAX-em
      await wait(40);
      const abortedOnRemove = calls[0]?.signal.aborted;
      document.querySelector('.docs-content').prepend(holder);
      await wait(40);
      const same = window.Plossy.getInstance(input, 'combobox') === combo;
      input.focus();
      type('nowy');
      const shown = () => [...holder.querySelectorAll('.pl-combobox-option')].map((o) => o.textContent.trim());
      await wait(240); // spóźniona odpowiedź „stary" już przyszła, „nowy" jeszcze nie
      const meanwhile = shown();
      await wait(460);
      const options = shown();
      return { abortedOnRemove, same, meanwhile, options, queries: calls.map((c) => c.query), lastAborted: calls.at(-1).signal.aborted, events };
    });
    expect(result.abortedOnRemove, 'destroy() przerywa zapytanie').toBe(true);
    expect(result.same).toBe(true);
    expect(result.queries).toEqual(['stary', 'nowy']);
    expect(result.lastAborted).toBe(false);
    expect(result.options.join(' | ')).toContain('nowy — wynik');
    expect(result.meanwhile, 'spóźniona odpowiedź z poprzedniego życia instancji').toEqual([]);
    expect(result.options.join(' | ')).not.toContain('stary');
    expect(result.events).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('modal: otwarty i usunięty zwalnia blokadę przewijania; odłożony wraca po show()', async ({ page }) => {
    const errors = watchErrors(page);
    await open(page, '/docs/overlays/modal/');
    await page.evaluate(() => {
      const holder = document.createElement('div');
      holder.id = 'holder';
      holder.innerHTML =
        '<dialog class="pl-modal" id="t-m" data-pl-modal><div class="pl-modal-dialog"><div class="pl-modal-body">Koszyk</div></div></dialog>';
      document.body.append(holder);
    });
    await settle(page);
    // 1) Usunięcie otwartego okna (np. podmiana fragmentu AJAX-em) zdejmuje blokadę przewijania.
    await page.evaluate(() => window.Plossy.modal('#t-m').show());
    await expect(page.locator('html')).toHaveClass(/pl-scroll-lock/);
    await page.evaluate(() => {
      window.__m = window.Plossy.getInstance(document.getElementById('t-m'), 'modal');
      document.getElementById('holder').remove();
    });
    await settle(page);
    await expect(page.locator('html')).not.toHaveClass(/pl-scroll-lock/);
    expect(await page.evaluate(() => window.__m.isOpen)).toBe(false);

    // 2) Referencja trzymana w kodzie: show() na odłożonym oknie przywraca tę samą instancję.
    await page.evaluate(() => window.__m.show());
    const modal = page.locator('#t-m');
    await expect(modal).toBeVisible();
    expect(await page.evaluate(() => window.Plossy.getInstance(document.getElementById('t-m'), 'modal') === window.__m)).toBe(true);
    await page.keyboard.press('Escape');
    await expect(modal).toBeHidden();
    await expect(page.locator('html')).not.toHaveClass(/pl-scroll-lock/);
    expect(errors).toEqual([]);
  });

  test('SPA: przejście między stronami niszczy instancje poprzedniej strony bez błędów', async ({ page }) => {
    const errors = watchErrors(page);
    await open(page, '/docs/interactive/slider/');
    await page.evaluate(() => {
      window.__old = [...document.querySelectorAll('[data-pl-slider], [data-pl-sticky], [data-pl-scrollspy]')].flatMap((el) =>
        ['slider', 'sticky', 'scrollspy'].map((name) => window.Plossy.getInstance(el, name)).filter(Boolean),
      );
    });
    expect(await page.evaluate(() => window.__old.length)).toBeGreaterThan(0);
    for (const path of ['/docs/forms/combobox/', '/docs/overlays/popover/', '/docs/interactive/sortable/']) {
      await page.locator(`.docs-sidebar a[href="${path}"]`).click();
      await expect(page).toHaveURL(new RegExp(`${path}$`));
      await settle(page);
    }
    const leftovers = await page.evaluate(() =>
      window.__old.filter((instance) => instance._cleanup.length || window.Plossy.getInstance(instance.el, instance.constructor.componentName)).length,
    );
    expect(leftovers, 'instancje poprzedniej strony powinny być zniszczone').toBe(0);
    expect(errors).toEqual([]);
  });
});

/** Strony komponentów z JS: odłożenie treści i ponowne wstawienie nie dubluje DOM-u ani nie wyrzuca błędów. */
const JS_PAGES = [
  'elements/alert', 'elements/countdown', 'elements/icon', 'elements/totop',
  'forms/combobox', 'forms/datepicker', 'forms/form', 'forms/otp-input', 'forms/password-strength', 'forms/quantity',
  'forms/range', 'forms/rating', 'forms/upload', 'forms/validation',
  'interactive/accordion', 'interactive/counter', 'interactive/filter', 'interactive/height-match', 'interactive/parallax',
  'interactive/scroll', 'interactive/scrollspy', 'interactive/slider', 'interactive/slideshow', 'interactive/sortable',
  'interactive/spotlight', 'interactive/sticky', 'interactive/switcher', 'interactive/toggle', 'interactive/video',
  'navigation/nav', 'navigation/navbar',
  'overlays/drop', 'overlays/lightbox', 'overlays/modal', 'overlays/notification', 'overlays/offcanvas', 'overlays/popover', 'overlays/tooltip',
];

test.describe('ponowne montowanie na stronach komponentów', () => {
  test.use({ reducedMotion: 'reduce' });
  for (const path of JS_PAGES) {
    test(`/docs/${path}/: treść odłączona i wstawiona z powrotem wygląda tak samo`, async ({ page }) => {
      const errors = watchErrors(page);
      await open(page, `/docs/${path}/`);
      const result = await page.evaluate(async () => {
        const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        const content = document.querySelector('.docs-content');
        // Odliczanie zmienia cyfry z upływem czasu — jego wnętrze pomijamy.
        const shape = () =>
          [...content.querySelectorAll('*')]
            .filter((el) => !el.parentElement.closest('[data-pl-countdown]'))
            .map((el) => el.tagName)
            .join(' ');
        await wait(300);
        const before = shape();
        const parent = content.parentNode;
        const next = content.nextSibling;
        content.remove();
        await wait(60);
        parent.insertBefore(content, next);
        await wait(300);
        return { before, after: shape() };
      });
      expect(result.after.split(' ').length, 'liczba elementów po ponownym montowaniu').toBe(result.before.split(' ').length);
      expect(result.after).toBe(result.before);
      expect(errors).toEqual([]);
    });
  }
});
