// Zachowanie komponentów: klawiatura, fokus, zdarzenia, animacje i elementy dodane po załadowaniu.
import { expect, test } from '@playwright/test';
import { DESKTOP, open } from './helpers.mjs';

test.use({ viewport: DESKTOP });

/** Wstawia fragment HTML na końcu strony — komponenty mają się zainicjalizować same. */
async function mount(page, html) {
  await page.evaluate((markup) => {
    const box = document.createElement('div');
    box.id = 'test-box';
    box.style.cssText = 'position:fixed;top:80px;left:40px;z-index:5000;padding:16px;background:var(--pl-bg)';
    box.innerHTML = markup;
    document.body.append(box);
  }, html);
}

test('modal: otwiera się, Escape zamyka, fokus wraca do przycisku', async ({ page }) => {
  await open(page, '/docs/overlays/modal/');
  const opener = page.locator('[data-pl-modal-open="#demo-modal"]').first();
  const modal = page.locator('#demo-modal');
  await opener.click();
  await expect(modal).toBeVisible();
  await expect(modal).toHaveJSProperty('open', true);
  await page.keyboard.press('Escape');
  await expect(modal).toBeHidden();
  await expect(opener).toBeFocused();
});

test('offcanvas: panel wjeżdża zza krawędzi, a nie pojawia się od razu', async ({ page }) => {
  await open(page, '/examples/sklep/');
  const result = await page.evaluate(async () => {
    const dialog = document.getElementById('shop-cart');
    const bar = dialog.querySelector('.pl-offcanvas-bar');
    document.querySelector('[data-pl-offcanvas-open="#shop-cart"]').click();
    const start = bar.getBoundingClientRect().left;
    await new Promise((resolve) => setTimeout(resolve, 1200));
    return { start, end: bar.getBoundingClientRect().left, scroll: dialog.scrollLeft, viewport: innerWidth };
  });
  expect(result.scroll, 'okno panelu nie może się przewinąć').toBe(0);
  expect(result.start, 'panel startuje poza ekranem').toBeGreaterThan(result.end + 100);
  expect(result.end).toBeLessThan(result.viewport);
});

test('quantity: przyciski, zakres i zdarzenie pl:change', async ({ page }) => {
  await open(page, '/docs/forms/quantity/');
  await mount(page, '<div class="pl-quantity" id="t-q" data-pl-quantity><input type="number" value="1" min="1" max="3" aria-label="Ilość"></div>');
  const input = page.locator('#t-q input');
  await page.evaluate(() => {
    window.__changes = [];
    document.getElementById('t-q').addEventListener('pl:change', (event) => window.__changes.push([event.detail.previous, event.detail.value]));
  });
  await expect(page.locator('#t-q .pl-quantity-minus')).toBeDisabled();
  await page.locator('#t-q .pl-quantity-plus').click();
  await page.locator('#t-q .pl-quantity-plus').click();
  await expect(input).toHaveValue('3');
  await expect(page.locator('#t-q .pl-quantity-plus')).toBeDisabled();
  await input.press('ArrowDown');
  await expect(input).toHaveValue('2');
  expect(await page.evaluate(() => window.__changes)).toEqual([[1, 2], [2, 3], [3, 2]]);
});

test('rating: wybór gwiazdki, ponowne kliknięcie zeruje', async ({ page }) => {
  await open(page, '/docs/forms/rating/');
  await mount(page, '<div class="pl-rating" id="t-r" data-pl-rating="name: ocena" aria-label="Ocena"></div>');
  const stars = page.locator('#t-r .pl-rating-star');
  await expect(stars).toHaveCount(5);
  await stars.nth(3).click();
  expect(await page.evaluate(() => window.Plossy.rating('#t-r').value)).toBe(4);
  await expect(stars.nth(3)).toBeChecked();
  await stars.nth(3).click();
  expect(await page.evaluate(() => window.Plossy.rating('#t-r').value)).toBe(0);
});

test('combobox: wyszukiwanie bez polskich znaków i wybór klawiaturą', async ({ page }) => {
  await open(page, '/docs/forms/combobox/');
  const select = page.locator('#demo-combo-city');
  const input = page.locator('.pl-combobox:has(#demo-combo-city) .pl-combobox-input, .pl-combobox-input').first();
  await input.click();
  await input.fill('lodz');
  const options = page.locator('.pl-combobox-option:visible');
  await expect(options).toHaveCount(1);
  await expect(options.first()).toContainText('Łódź');
  await page.keyboard.press('Enter');
  await expect(select).toHaveValue('lodz');
});

test('accordion: kliknięcie rozwija pozycję', async ({ page }) => {
  await open(page, '/docs/interactive/accordion/');
  const item = page.locator('.docs-preview .pl-accordion').first().locator('.pl-accordion-item').nth(1);
  await expect(item.locator('.pl-accordion-content')).toBeHidden();
  await item.locator('.pl-accordion-title').click();
  await expect(item.locator('.pl-accordion-content')).toBeVisible();
  await expect(item.locator('.pl-accordion-title')).toHaveAttribute('aria-expanded', 'true');
});

test('notification: wywołanie z kodu pokazuje i zamyka powiadomienie', async ({ page }) => {
  await open(page, '/docs/overlays/notification/');
  await page.evaluate(() => {
    window.__note = window.Plossy.notification('Zapisano zmiany', { status: 'success', timeout: 0 });
  });
  const note = page.locator('.pl-notification', { hasText: 'Zapisano zmiany' });
  await expect(note).toBeVisible();
  await page.evaluate(() => window.__note.close());
  await expect(note).toHaveCount(0);
});

test('auto-inicjalizacja: komponent dodany po załadowaniu uruchamia się sam', async ({ page }) => {
  await open(page, '/docs/start/javascript/');
  await mount(page, '<span id="t-i" data-pl-icon="star"></span>');
  await expect(page.locator('#t-i svg')).toHaveCount(1);
});

test('radio: kropka zaznaczonego pola jest na środku', async ({ page }) => {
  await open(page, '/docs/forms/checkbox-radio/');
  await mount(page, '<input class="pl-radio" id="t-radio" type="radio" checked>');
  const style = await page.evaluate(() => {
    const dot = getComputedStyle(document.getElementById('t-radio'), '::after');
    return { top: dot.top, right: dot.right, bottom: dot.bottom, left: dot.left, image: dot.backgroundImage };
  });
  expect([style.top, style.right, style.bottom, style.left]).toEqual(['0px', '0px', '0px', '0px']);
  expect(style.image).toContain('radial-gradient');
});

test('animacja wejścia puszcza element, więc hover może się płynnie animować', async ({ page }) => {
  await open(page, '/docs/utilities/animation/');
  await mount(page, '<div id="t-a" class="pl-animation-slide-up" style="width:80px;height:40px;transition:transform .3s">x</div>');
  await page.waitForFunction(() => document.getElementById('t-a').getAnimations().length === 0);
  const moving = await page.evaluate(async () => {
    const el = document.getElementById('t-a');
    el.style.transform = 'translateY(-10px)';
    await new Promise((resolve) => setTimeout(resolve, 100));
    const y = new DOMMatrixReadOnly(getComputedStyle(el).transform).m42;
    return y < -0.5 && y > -9.5;
  });
  expect(moving, 'element jest w trakcie przejścia, a nie od razu na końcu').toBe(true);
});

test('ken burns: po zakończeniu obraz zostaje powiększony', async ({ page }) => {
  await open(page, '/docs/utilities/animation/');
  await mount(page, '<div id="t-k" class="pl-animation-kenburns" style="width:80px;height:40px;animation-duration:.2s">x</div>');
  await page.waitForTimeout(600);
  const scale = await page.evaluate(() => new DOMMatrixReadOnly(getComputedStyle(document.getElementById('t-k')).transform).a);
  expect(scale).toBeCloseTo(1.2, 2);
});

test('przejście między stronami dokumentacji nie przeładowuje strony i zachowuje motyw', async ({ page }) => {
  await open(page, '/docs/elements/button/', { theme: 'dark', style: 'flat' });
  await page.evaluate(() => (window.__sameDocument = true));
  await page.locator('.docs-sidebar a[href="/docs/elements/card/"]').click();
  await expect(page).toHaveURL(/\/docs\/elements\/card\/$/);
  await expect(page.locator('h1')).toContainText('Card');
  expect(await page.evaluate(() => window.__sameDocument === true), 'bez pełnego przeładowania').toBe(true);
  await expect(page.locator('html')).toHaveAttribute('data-pl-theme', 'dark');
  await expect(page.locator('html')).toHaveAttribute('data-pl-style', 'flat');
});

test('upload: kliknięcie strefy otwiera wybór plików, a wybrany plik trafia na listę', async ({ page }) => {
  await open(page, '/docs/forms/upload/');
  await mount(page, '<div class="pl-upload" id="t-u" data-pl-upload="auto: false"><p class="pl-upload-text">Upuść plik</p></div>');
  const chooser = page.waitForEvent('filechooser');
  await page.locator('#t-u .pl-upload-text').click();
  await (await chooser).setFiles({ name: 'faktura.txt', mimeType: 'text/plain', buffer: Buffer.from('test') });
  expect(await page.evaluate(() => window.Plossy.upload('#t-u').files.map((file) => file.name))).toEqual(['faktura.txt']);
});

test('slider: kropki nawigacji mają nazwy i przełączają slajdy', async ({ page }) => {
  await open(page, '/docs/interactive/slider/');
  const slider = page.locator('.docs-preview [data-pl-slider]:has(.pl-dotnav)').first();
  const dots = slider.locator('.pl-dotnav a');
  await expect(dots.first()).toHaveAttribute('aria-label', /Slajd 1/);
  await dots.nth(1).click();
  await expect(slider.locator('.pl-dotnav li').nth(1)).toHaveClass(/pl-active/);
});

test('datepicker: pole otwiera kalendarz i ogłasza jego stan', async ({ page }) => {
  await open(page, '/docs/forms/datepicker/');
  const input = page.locator('#demo-date-basic');
  await expect(input).toHaveAttribute('role', 'combobox');
  await expect(input).toHaveAttribute('aria-expanded', 'false');
  await input.click();
  await expect(input).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator(`#${await input.getAttribute('aria-controls')}`)).toBeVisible();
});

test('filter: kontrolka jest przyciskiem ze stanem wciśnięcia i reaguje na spację', async ({ page }) => {
  await open(page, '/docs/interactive/filter/');
  const controls = page.locator('.docs-preview [data-pl-filter]').first().locator('[data-pl-filter-control] a');
  await expect(controls.first()).toHaveAttribute('role', 'button');
  await expect(controls.first()).toHaveAttribute('aria-pressed', 'true');
  await controls.nth(1).focus();
  await page.keyboard.press('Space');
  await expect(controls.nth(1)).toHaveAttribute('aria-pressed', 'true');
  await expect(controls.first()).toHaveAttribute('aria-pressed', 'false');
});

test('kreator: ustawienia zmieniają podgląd, a wyeksportowany CSS daje ten sam wygląd na innej stronie', async ({ page }) => {
  // Bez animacji — kolory czytamy od razu po zmianie ustawień.
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await open(page, '/kreator/');
  await page.selectOption('#k-style', 'flat');
  await page.locator('input[name=accentOn]').check();
  await page.locator('#k-h').fill('150');
  await page.locator('#k-l').fill('0.7');
  await page.locator('input[name=shapeOn]').check();
  await page.locator('#k-r').fill('20');
  await page.locator('[data-kreator-theme=dark]').click();

  const look = (selector) =>
    page.evaluate((sel) => {
      const style = getComputedStyle(document.querySelector(sel));
      return [style.backgroundColor, style.color, style.borderRadius].join(' | ');
    }, selector);
  await page.waitForTimeout(500); // kolory dochodzą do wartości końcowej
  const inPreview = await look('[data-kreator-preview] .pl-button-primary');
  const html = await page.locator('[data-kreator-html]').textContent();
  const css = await page.locator('[data-kreator-css]').textContent();
  expect(css).toContain('--pl-accent-h: 150');
  expect(html).toContain('data-pl-accent="custom"');
  await expect(page.locator('[data-kreator-contrast] li')).toHaveCount(5);
  const shared = page.url();

  // Wklejamy eksport na zwykłej stronie dokumentacji — przycisk ma wyglądać jak w podglądzie.
  await page.goto('/docs/elements/button/');
  await page.evaluate(
    ({ html, css }) => {
      for (const [, name, value] of html.matchAll(/(data-pl-[a-z]+)="([^"]*)"/g)) document.documentElement.setAttribute(name, value);
      document.head.append(Object.assign(document.createElement('style'), { textContent: css }));
    },
    { html, css },
  );
  await expect.poll(() => look('.docs-preview .pl-button-primary')).toBe(inPreview);

  // Link odtwarza ustawienia.
  await page.goto(shared);
  await expect(page.locator('#k-style')).toHaveValue('flat');
  await expect(page.locator('#k-h')).toHaveValue('150');
  await expect(page.locator('html')).toHaveAttribute('data-pl-theme', 'dark');
  await expect(page.locator('html')).toHaveAttribute('data-pl-style', 'flat');
});

test('zagnieżdżanie: fragment z własnym motywem i stylem nie przejmuje wyglądu strony', async ({ page }) => {
  // Strona: Tender, ciemna. Fragmenty w środku mają wyglądać po swojemu.
  await open(page, '/docs/start/javascript/', { style: 'tender', theme: 'dark' });
  await page.evaluate(() => {
    const box = document.createElement('div');
    box.innerHTML = `
      <div id="n-tender-light" data-pl-style="tender" data-pl-theme="light">x</div>
      <div id="n-flat-light" data-pl-style="flat" data-pl-theme="light">x</div>
      <div id="n-flat-dark" data-pl-style="flat" data-pl-theme="dark">x</div>
      <div id="n-soft-light" data-pl-style="soft" data-pl-theme="light">x</div>
      <div id="n-soft" data-pl-style="soft">x</div>
      <div id="n-light" data-pl-theme="light">x</div>`;
    document.body.append(box);
  });
  const token = (id, name) =>
    page.evaluate(([i, n]) => getComputedStyle(document.getElementById(i)).getPropertyValue(n).trim(), [id, name]);
  // Jasność tła: > 0.9 = jasne, < 0.4 = ciemne.
  const lightness = async (id) => Number((await token(id, '--pl-bg')).match(/oklch\(([\d.]+)/)[1]);

  expect(await lightness('n-tender-light'), 'Tender jasny w ciemnej stronie').toBeGreaterThan(0.9);
  expect(await lightness('n-flat-light'), 'Flat jasny').toBeGreaterThan(0.9);
  expect(await lightness('n-flat-dark'), 'Flat ciemny').toBeLessThan(0.4);
  expect(await lightness('n-flat-dark'), 'ciemny Flat ma własną paletę (0.13), nie Tender').toBeCloseTo(0.13, 2);
  expect(await lightness('n-soft-light'), 'Soft jasny').toBeGreaterThan(0.9);
  expect(await lightness('n-soft'), 'Soft bez motywu dziedziczy ciemny').toBeLessThan(0.4);
  expect(await lightness('n-light'), 'sam jasny motyw w ciemnej stronie').toBeGreaterThan(0.9);
  // Styl domyślny na fragmencie przywraca kształty Soft, a nie zostawia pastylek Tender.
  expect(await token('n-soft-light', '--pl-radius-md')).toBe('12px');
});

test.describe('telefon', () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });

  for (const path of ['/', '/docs/elements/button/', '/kreator/', '/examples/']) {
    test(`menu mobilne na ${path}: działy, styl i akcent są dostępne`, async ({ page }) => {
      await open(page, path);
      const drawer = page.locator('.docs-sidebar');
      const links = drawer.locator('.docs-mobile-links a');
      await expect(page.locator('.docs-menu-btn')).toBeVisible();
      await expect(links.first()).not.toBeInViewport();

      await page.locator('.docs-menu-btn').click();
      await expect(links).toHaveCount(5);
      await expect(links.first()).toBeInViewport();

      // Styl i akcent, których na telefonie nie ma w nagłówku.
      await drawer.locator('[data-docs-style="flat"]').click();
      await expect(page.locator('html')).toHaveAttribute('data-pl-style', 'flat');
      await drawer.locator('[data-docs-accent="coral"]').click();
      await expect(page.locator('html')).toHaveAttribute('data-pl-accent', 'coral');

      // Przejście do innego działu zamyka menu.
      await drawer.locator('.docs-mobile-links a[href="/docs/start/motywy/"]').click();
      await expect(page).toHaveURL(/\/docs\/start\/motywy\/$/);
      await expect(page.locator('body')).not.toHaveClass(/docs-menu-open/);
    });
  }

  test('strona główna: hasło mieści się na ekranie, sekcje nie są ucięte', async ({ page }) => {
    await open(page, '/');
    const cut = await page.evaluate(() => {
      const width = document.documentElement.clientWidth;
      return [...document.querySelectorAll('.home-title em, .home-split > *, .home-split p, .home-code, .home-install code')]
        .filter((el) => el.getBoundingClientRect().right > width + 1)
        .map((el) => el.className || el.tagName);
    });
    expect(cut, 'elementy wychodzące poza prawą krawędź').toEqual([]);
  });
});
