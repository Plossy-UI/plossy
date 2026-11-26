import { Component, register, $$, queryTargets, rafThrottle } from '../core.js';
import { scrollTo, scrollParent, focusTarget } from './scroll.js';

const fire = (target, type, detail) =>
  target.dispatchEvent(new CustomEvent(`pl:${type}`, { bubbles: true, detail }));

const classList = (value) => String(value || '').split(/[\s,]+/).filter(Boolean);

/**
 * Scrollspy — animacja po wejściu elementu w obszar widoku.
 * <div data-pl-scrollspy="cls: pl-animation-slide-up; target: > *; delay: 80">…</div>
 */
class Scrollspy extends Component {
  static defaults = {
    cls: 'pl-animation-fade', // klasa (klasy) dodawana po wejściu w widok
    target: null, // elementy obserwowane; domyślnie sam element
    hidden: true, // ukryj (.pl-invisible) do czasu wejścia w widok
    offsetTop: 0, // powiększa (+) lub pomniejsza (−) obszar widoku w pionie, px
    offsetLeft: 0, // jw. w poziomie
    repeat: false, // powtarzaj przy każdym wejściu
    delay: 0, // opóźnienie między kolejnymi elementami, ms
  };

  static primary = 'cls';

  init() {
    const { options } = this;
    this.state = new WeakMap();
    this.timers = new Set();
    this.lastTime = 0;

    if (typeof IntersectionObserver !== 'function') return;

    this.observer = new IntersectionObserver(
      (entries) => {
        // Kolejność jak w dokumencie — opóźnienia układają się w kaskadę.
        entries
          .slice()
          .sort((a, b) => (a.target.compareDocumentPosition(b.target) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1))
          .forEach((entry) => (entry.isIntersecting ? this.enter(entry.target) : this.leave(entry.target)));
      },
      { rootMargin: `${options.offsetTop}px ${options.offsetLeft}px` },
    );

    this.observe();

    // Elementy dodane później (np. doładowana lista).
    if (options.target) {
      const mutations = new MutationObserver(() => this.observe());
      mutations.observe(this.el, { childList: true, subtree: true });
      this.onDestroy(() => mutations.disconnect());
    }

    this.onDestroy(() => {
      this.observer.disconnect();
      this.timers.forEach(clearTimeout);
    });
  }

  get targets() {
    const selector = String(this.options.target || '').trim();
    if (!selector) return [this.el];
    // Selektor działa wewnątrz elementu ('> .x' — względem niego).
    if (selector.startsWith('>')) return queryTargets(this.el, selector);
    try {
      return [...this.el.querySelectorAll(selector)];
    } catch {
      return [];
    }
  }

  classesFor(target) {
    return classList(target.getAttribute('data-pl-scrollspy-class') || this.options.cls);
  }

  observe() {
    for (const target of this.targets) {
      if (this.state.has(target)) continue;
      this.state.set(target, { inview: false, timer: 0 });
      if (this.options.hidden) target.classList.add('pl-invisible');
      this.observer.observe(target);
    }
  }

  enter(target) {
    const state = this.state.get(target);
    if (!state || state.inview) return;
    state.inview = true;

    const { delay, repeat } = this.options;
    const now = performance.now();
    const at = delay ? Math.max(now, this.lastTime + delay) : now;
    this.lastTime = at;

    const run = () => {
      this.timers.delete(state.timer);
      state.timer = 0;
      target.classList.remove('pl-invisible');
      target.classList.add(...this.classesFor(target));
      fire(target, 'inview', { component: this, target });
    };

    if (at - now < 1) run();
    else {
      state.timer = setTimeout(run, at - now);
      this.timers.add(state.timer);
    }
    if (!repeat) this.observer.unobserve(target);
  }

  leave(target) {
    const state = this.state.get(target);
    if (!state || !state.inview || !this.options.repeat) return;
    state.inview = false;
    if (state.timer) {
      clearTimeout(state.timer);
      this.timers.delete(state.timer);
      state.timer = 0;
    }
    target.classList.remove(...this.classesFor(target));
    if (this.options.hidden) target.classList.add('pl-invisible');
    fire(target, 'outview', { component: this, target });
  }
}

/**
 * Scrollspy-nav — podświetla link sekcji, która jest aktualnie w widoku.
 * <ul class="pl-nav" data-pl-scrollspy-nav="closest: li; scroll: true; offset: 80">…</ul>
 */
class ScrollspyNav extends Component {
  static defaults = {
    cls: 'pl-active', // klasa aktywnej pozycji
    closest: 'li', // przodek linku, który dostaje klasę (false → sam link)
    scroll: false, // płynne przewijanie po kliknięciu
    offset: 0, // odstęp od górnej krawędzi, px
    overflow: true, // pierwsza pozycja aktywna także przed pierwszą sekcją
    duration: 'auto',
  };

  init() {
    this.active = null;
    this.locked = false;
    this.update = rafThrottle(() => this.refresh());

    this.on(document, 'scroll', this.update, { capture: true, passive: true });
    this.on(window, 'resize', this.update, { passive: true });
    this.on(window, 'load', this.update);

    this.on(this.el, 'click', async (event) => {
      if (!this.options.scroll) return;
      const link = event.target.closest('a[href*="#"]');
      if (!link || !this.el.contains(link) || event.metaKey || event.ctrlKey) return;
      const target = this.targetOf(link);
      if (!target) return;
      event.preventDefault();
      // Podczas animacji trzymaj podświetlenie na klikniętej pozycji.
      this.locked = true;
      this.setActive(link);
      const done = await scrollTo(target, { offset: this.options.offset, duration: this.options.duration });
      this.locked = false;
      if (done) {
        if (link.hash !== location.hash) history.replaceState(null, '', link.hash);
        focusTarget(target);
      } else this.refresh();
    });

    this.refresh();
  }

  get links() {
    return $$('a[href*="#"]', this.el).filter((link) => this.targetOf(link));
  }

  targetOf(link) {
    const href = link.getAttribute('href') || '';
    const hash = href.slice(href.indexOf('#') + 1);
    if (!hash) return null;
    // Link do innej strony nie jest sekcją tej.
    if (!href.startsWith('#') && link.pathname !== location.pathname) return null;
    return document.getElementById(decodeURIComponent(hash));
  }

  refresh() {
    if (this.locked) return;
    const links = this.links;
    if (!links.length) return;
    const { offset, overflow } = this.options;
    const root = document.scrollingElement || document.documentElement;

    let current = null;
    let scroller = root;
    for (const link of links) {
      const target = this.targetOf(link);
      if (!target.getClientRects().length) continue;
      scroller = scrollParent(target);
      const base = scroller === root ? 0 : scroller.getBoundingClientRect().top + scroller.clientTop;
      if (target.getBoundingClientRect().top - base <= offset + 2) current = link;
      else break;
    }

    // Koniec przewijania — ostatnia sekcja może nigdy nie dotrzeć do górnej krawędzi.
    const viewport = scroller === root ? window.innerHeight : scroller.clientHeight;
    const scrollable = scroller.scrollHeight - viewport;
    if (scrollable > 0 && scroller.scrollTop >= scrollable - 2) current = links[links.length - 1];
    if (!current && overflow) current = links[0];

    this.setActive(current);
  }

  holder(link) {
    const { closest } = this.options;
    return (closest && link.closest(String(closest))) || link;
  }

  setActive(link) {
    if (link === this.active) return;
    const classes = classList(this.options.cls);
    if (this.active) {
      this.holder(this.active).classList.remove(...classes);
      this.active.removeAttribute('aria-current');
    }
    // Usuń też klasy wpisane ręcznie w HTML.
    for (const other of $$('a[href*="#"]', this.el)) {
      if (other !== link) this.holder(other).classList.remove(...classes);
    }
    this.active = link;
    if (!link) return;
    this.holder(link).classList.add(...classes);
    link.setAttribute('aria-current', 'location');
    this.emit('active', { link, target: this.targetOf(link) });
  }
}

register('scrollspy', Scrollspy);
register('scrollspy-nav', ScrollspyNav);
export { Scrollspy, ScrollspyNav };
export default Scrollspy;
