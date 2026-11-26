import { Component, register, $, queryTargets, rafThrottle } from '../core.js';

/**
 * Height match — wyrównuje wysokości elementów.
 * <div class="pl-grid" data-pl-height-match="target: > * > .pl-card">…</div>
 */
class HeightMatch extends Component {
  static defaults = {
    target: '> *', // wyrównywane elementy
    row: true, // wyrównuj osobno w każdym wizualnym rzędzie
  };

  static primary = 'target';

  init() {
    this.update = rafThrottle(() => this.match());
    this.observed = new Set();

    if (typeof ResizeObserver === 'function') {
      this.observer = new ResizeObserver(this.update);
      this.observer.observe(this.el);
      this.onDestroy(() => this.observer.disconnect());
    }
    // Treść dodana lub zmieniona później.
    const mutations = new MutationObserver(this.update);
    mutations.observe(this.el, { childList: true, subtree: true, characterData: true });
    this.onDestroy(() => mutations.disconnect());

    this.on(window, 'resize', this.update, { passive: true });
    this.on(window, 'load', this.update);
    document.fonts?.ready.then(this.update).catch(() => {});
    this.onDestroy(() => this.targets.forEach((target) => (target.style.minHeight = '')));

    this.match();
  }

  get targets() {
    // Selektor działa wewnątrz elementu ('> .x' — względem niego).
    const selector = String(this.options.target || '> *').trim();
    let targets;
    try {
      targets = selector.startsWith('>') ? queryTargets(this.el, selector) : [...this.el.querySelectorAll(selector)];
    } catch {
      targets = [];
    }
    return targets.filter((target) => target.getClientRects().length);
  }

  match() {
    const targets = this.targets;

    if (this.observer) {
      for (const target of targets) {
        if (this.observed.has(target)) continue;
        this.observed.add(target);
        this.observer.observe(target);
      }
    }

    // Pomiar naturalnych wysokości (bez poprzedniego wyrównania).
    targets.forEach((target) => (target.style.minHeight = ''));
    const measured = targets.map((target) => {
      const rect = target.getBoundingClientRect();
      return { target, top: Math.round(rect.top), height: target.offsetHeight };
    });

    const groups = [];
    if (this.options.row) {
      for (const item of measured) {
        const group = groups.find((entry) => Math.abs(entry.top - item.top) <= 2);
        if (group) group.items.push(item);
        else groups.push({ top: item.top, items: [item] });
      }
    } else {
      groups.push({ top: 0, items: measured });
    }

    for (const { items } of groups) {
      if (items.length < 2) continue;
      const max = Math.max(...items.map((item) => item.height));
      for (const { target, height } of items) {
        if (height === max) continue;
        let value = max;
        const style = getComputedStyle(target);
        if (style.boxSizing !== 'border-box') {
          value -= parseFloat(style.paddingTop) + parseFloat(style.paddingBottom) + parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
        }
        target.style.minHeight = `${value}px`;
      }
    }
    this.emit('match', { targets });
  }
}

/** Jednostka wysokości okna odporna na chowające się paski mobilnych przeglądarek. */
const VH = typeof CSS !== 'undefined' && CSS.supports?.('height', '100svh') ? 'svh' : 'vh';

/**
 * Height viewport — minimalna wysokość liczona względem okna.
 * <section data-pl-height-viewport="offset-top: true; offset-bottom: 20">…</section>
 */
class HeightViewport extends Component {
  static defaults = {
    offsetTop: false, // true → odejmij odległość elementu od góry strony; liczba → px
    offsetBottom: false, // true → odejmij wysokość następnego elementu; 1–100 → % okna; >100 → px; '80px', '10vh' lub selektor
    expand: false, // rozciągnij element tak, by strona wypełniła całe okno
    min: 0, // dolna granica w px
  };

  init() {
    this.update = rafThrottle(() => this.resize());
    this.on(window, 'resize', this.update, { passive: true });
    this.on(window, 'load', this.update);
    document.fonts?.ready.then(this.update).catch(() => {});
    if (typeof ResizeObserver === 'function' && this.options.expand) {
      const observer = new ResizeObserver(this.update);
      observer.observe(document.body);
      this.onDestroy(() => observer.disconnect());
    }
    this.onDestroy(() => (this.el.style.minHeight = ''));
    this.resize();
  }

  /** Zwraca fragment wyrażenia calc() do odjęcia. */
  bottomOffset() {
    const { el } = this;
    const value = this.options.offsetBottom;
    if (value === false || value === null || value === '') return '';
    if (value === true) return `${el.nextElementSibling?.offsetHeight || 0}px`;
    if (typeof value === 'number') return value <= 100 ? `${value}${VH}` : `${value}px`;
    if (/^-?[\d.]+(px|vh|svh|dvh|rem|em)$/.test(value)) return value;
    return `${$(value)?.offsetHeight || 0}px`;
  }

  resize() {
    const { el, options } = this;
    if (!el.getClientRects().length) return;
    const min = Number(options.min) || 0;
    let height;

    if (options.expand) {
      // Dodaj elementowi tyle, ile brakuje stronie do pełnej wysokości okna.
      el.style.minHeight = '';
      const missing = window.innerHeight - document.documentElement.offsetHeight;
      height = missing > 0 ? `${el.offsetHeight + missing}px` : '';
      if (min && (!height || parseFloat(height) < min)) height = `${min}px`;
    } else {
      const parts = [];
      if (options.offsetTop === true) {
        const top = el.getBoundingClientRect().top + window.scrollY;
        // Odejmuj tylko dla elementów zaczynających się w pierwszym ekranie.
        if (top < window.innerHeight / 2) parts.push(`${Math.round(top)}px`);
      } else if (typeof options.offsetTop === 'number' && options.offsetTop) {
        parts.push(`${options.offsetTop}px`);
      }
      const bottom = this.bottomOffset();
      if (bottom) parts.push(bottom);
      const expression = parts.length ? `calc(100${VH} - ${parts.join(' - ')})` : `100${VH}`;
      height = min ? `max(${min}px, ${expression})` : expression;
    }

    if (el.style.minHeight !== height) el.style.minHeight = height;
    this.emit('resize', { height: el.offsetHeight });
  }
}

register('height-match', HeightMatch);
register('height-viewport', HeightViewport);
export { HeightMatch, HeightViewport };
export default HeightMatch;
