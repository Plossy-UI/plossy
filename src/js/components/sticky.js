import { Component, register, $, rafThrottle, animationsDone, prefersReducedMotion } from '../core.js';

const BREAKPOINTS = { s: 640, m: 960, l: 1200, xl: 1600 };

function toMedia(value) {
  if (value === false || value === null || value === undefined || value === '') return null;
  if (typeof value === 'string' && value.startsWith('@')) value = BREAKPOINTS[value.slice(1)] ?? 0;
  if (typeof value === 'number' || /^\d+$/.test(value)) return matchMedia(`(min-width: ${value}px)`);
  return matchMedia(value);
}

const classList = (value) => String(value || '').split(/[\s,]+/).filter(Boolean);

/** Długość: liczba px, '50vh', '100%' (wysokości elementu). */
function toPx(value, height) {
  if (typeof value === 'number') return value;
  const number = parseFloat(value);
  if (Number.isNaN(number)) return 0;
  if (String(value).endsWith('vh')) return (window.innerHeight * number) / 100;
  if (String(value).endsWith('%')) return (height * number) / 100;
  return number;
}

/**
 * Sticky
 * <div data-pl-sticky="offset: 16; end: parent; cls-active: pl-active">…</div>
 */
class Sticky extends Component {
  static defaults = {
    offset: 0, // odstęp od górnej krawędzi okna po przyklejeniu (px, vh)
    top: 0, // dodatkowy dystans przewijania, po którym element się przykleja (px, vh, % lub selektor)
    bottom: false, // alias `end` (true → rodzic)
    end: false, // granica: 'parent' / true, '!.selektor' (najbliższy przodek) albo selektor
    clsActive: 'pl-active',
    clsInactive: '',
    animation: false, // klasa animacji przy przyklejeniu (i odwrócona przy odklejeniu)
    showOnUp: false, // chowaj przy przewijaniu w dół, pokazuj przy przewijaniu w górę
    media: false, // aktywny od podanej szerokości (px, '@m', zapytanie media)
    zIndex: null,
  };

  init() {
    const { el, options } = this;
    this.fixed = false;
    this.active = null;
    this.below = false;
    this.lastY = window.scrollY;
    this.direction = 'down';
    this.leaving = 0;
    this.metrics = null;
    this.media = toMedia(options.media);

    this.placeholder = document.createElement('div');
    this.placeholder.className = 'pl-sticky-placeholder';
    this.placeholder.setAttribute('aria-hidden', 'true');
    this.placeholder.hidden = true;

    el.classList.add('pl-sticky');
    this.setState(false, true);

    this.update = rafThrottle(() => this.refresh());
    const remeasure = rafThrottle(() => {
      this.measure();
      this.refresh();
    });

    this.on(window, 'scroll', this.update, { passive: true });
    this.on(window, 'resize', remeasure, { passive: true });
    this.on(window, 'load', remeasure);
    this.on(this.media, 'change', remeasure);
    document.fonts?.ready.then(remeasure).catch(() => {});

    if (typeof ResizeObserver === 'function') {
      // Zmiana wysokości treści przyklejonego elementu → dopasuj placeholder.
      const observer = new ResizeObserver(() => {
        if (this.fixed && this.metrics && Math.abs(el.offsetHeight - this.metrics.height) > 0.5) {
          this.metrics.height = el.offsetHeight;
          this.placeholder.style.height = `${el.offsetHeight}px`;
          this.update();
        } else if (!this.fixed) this.update();
      });
      observer.observe(el);
      this.onDestroy(() => observer.disconnect());
    }

    this.onDestroy(() => {
      this.unfix();
      this.placeholder.remove();
      el.classList.remove('pl-sticky', 'pl-sticky-below', ...classList(options.clsActive), ...classList(options.clsInactive));
    });

    this.measure();
    this.refresh();
  }

  get enabled() {
    return (!this.media || this.media.matches) && this.el.isConnected && (this.fixed || this.el.getClientRects().length > 0);
  }

  /** Element wyznaczający dolną granicę przyklejenia. */
  get boundary() {
    let end = this.options.end || this.options.bottom;
    if (!end) return null;
    if (end === true || end === 'parent') return (this.fixed ? this.placeholder : this.el).parentElement;
    end = String(end);
    if (end.startsWith('!')) return this.el.parentElement?.closest(end.slice(1).trim()) || null;
    return $(end);
  }

  /** Mierzy element w naturalnym położeniu (na chwilę go odkleja — bez odmalowania). */
  measure() {
    const { el } = this;
    const wasFixed = this.fixed;
    if (wasFixed) this.unfix(true);
    const rect = el.getBoundingClientRect();
    const style = getComputedStyle(el);
    this.metrics = {
      width: rect.width,
      height: el.offsetHeight,
      margin: style.margin,
      flex: style.flex,
      alignSelf: style.alignSelf,
      gridArea: style.gridArea,
    };
    if (wasFixed) this.fix(true);
  }

  refresh() {
    const { el, options } = this;
    const scrollY = window.scrollY;
    if (scrollY !== this.lastY) this.direction = scrollY > this.lastY ? 'down' : 'up';
    this.lastY = scrollY;

    if (!this.enabled) {
      if (this.fixed) this.unfix();
      this.setState(false);
      return;
    }
    if (!this.metrics || (!this.fixed && Math.abs(this.metrics.height - el.offsetHeight) > 0.5)) this.measure();

    const { height } = this.metrics;
    const reference = this.fixed ? this.placeholder : el;
    const rect = reference.getBoundingClientRect();
    const offset = toPx(options.offset, height);
    const naturalTop = rect.top + scrollY; // położenie w dokumencie

    // Początek: przewinięcie, od którego element jest przyklejony.
    let start = naturalTop - offset;
    const { top } = options;
    if (typeof top === 'string' && top && Number.isNaN(parseFloat(top))) {
      const marker = $(top);
      if (marker) start = marker.getBoundingClientRect().bottom + scrollY - offset;
    } else if (top) {
      start += toPx(top, height);
    }

    // Koniec: przewinięcie, od którego element odjeżdża razem z granicą.
    let end = Infinity;
    const boundary = this.boundary;
    if (boundary) {
      const style = getComputedStyle(boundary);
      const inner = boundary.contains(reference) ? parseFloat(style.paddingBottom) + parseFloat(style.borderBottomWidth) : 0;
      end = boundary.getBoundingClientRect().bottom + scrollY - inner - height - offset;
    }

    const below = scrollY > naturalTop + height;
    const seamless = start <= naturalTop - offset + 1; // przyklejenie „w miejscu", bez przeskoku
    let shouldFix = scrollY > start && end > start;

    if (options.showOnUp) {
      // Pokazuj dopiero, gdy element całkiem zniknął, i tylko przy ruchu w górę.
      const hiddenStart = Math.max(start, naturalTop + height);
      if (this.fixed) shouldFix = scrollY > naturalTop - offset && (this.direction === 'up' || scrollY <= hiddenStart);
      else shouldFix = scrollY > hiddenStart && this.direction === 'up';
      if (this.fixed && scrollY <= naturalTop - offset) shouldFix = false;
    }

    if (shouldFix && !this.fixed) {
      this.fix();
      if ((options.animation || options.showOnUp) && !(seamless && !options.showOnUp)) this.animate(false);
      this.setState(true);
    } else if (shouldFix && this.leaving) {
      // Zmiana kierunku w trakcie chowania — wróć do stanu przyklejonego.
      this.cancelLeave();
      this.setState(true);
    } else if (!shouldFix && this.fixed) {
      const instant = scrollY <= naturalTop - offset || !(options.animation || options.showOnUp);
      if (instant) {
        this.unfix();
        this.setState(false);
      } else if (!this.leaving) {
        this.leave();
      }
    }

    if (this.fixed) {
      const live = this.placeholder.getBoundingClientRect();
      const shift = Math.min(0, end - scrollY);
      el.style.top = `${offset + shift}px`;
      el.style.left = `${live.left}px`;
      el.style.width = `${live.width}px`;
      el.classList.toggle('pl-sticky-end', shift < 0);
    }

    if (below !== this.below) {
      this.below = below;
      el.classList.toggle('pl-sticky-below', below);
    }
  }

  fix(silent = false) {
    const { el, placeholder, metrics, options } = this;
    if (this.fixed) return;
    this.cancelLeave();
    Object.assign(placeholder.style, {
      width: `${metrics.width}px`,
      height: `${metrics.height}px`,
      margin: metrics.margin,
      flex: metrics.flex.startsWith('0 ') ? metrics.flex : 'none',
      alignSelf: metrics.alignSelf,
      gridArea: metrics.gridArea,
    });
    el.after(placeholder);
    placeholder.hidden = false;
    // Elementy blokowe mają podążać za szerokością rodzica.
    const parentWidth = placeholder.parentElement?.clientWidth;
    if (parentWidth && getComputedStyle(placeholder.parentElement).display === 'block') {
      placeholder.style.width = '';
      if (Math.abs(placeholder.getBoundingClientRect().width - metrics.width) > 1) placeholder.style.width = `${metrics.width}px`;
    }
    el.classList.add('pl-sticky-fixed');
    if (options.zIndex !== null && options.zIndex !== '') el.style.zIndex = options.zIndex;
    this.fixed = true;
    if (!silent) this.refreshPosition();
  }

  refreshPosition() {
    const live = this.placeholder.getBoundingClientRect();
    this.el.style.left = `${live.left}px`;
    this.el.style.width = `${live.width}px`;
  }

  unfix(silent = false) {
    const { el, placeholder } = this;
    if (!this.fixed) return;
    if (!silent) this.cancelLeave();
    el.classList.remove('pl-sticky-fixed', 'pl-sticky-end');
    for (const prop of ['top', 'left', 'width', 'zIndex']) el.style[prop] = '';
    placeholder.hidden = true;
    placeholder.remove();
    this.fixed = false;
  }

  /** Animacja wejścia (lub odwrócona — wyjścia). */
  async animate(reverse) {
    const { el, options } = this;
    if (prefersReducedMotion()) return;
    const classes = classList(options.animation || 'pl-animation-slide-down');
    if (reverse) classes.push('pl-animation-reverse');
    el.classList.remove('pl-animation-reverse');
    el.classList.add(...classes);
    await animationsDone(el);
    el.classList.remove(...classes);
  }

  /** Odklejenie z animacją wyjścia. */
  async leave() {
    const token = (this.leaving = Math.random() + 1);
    this.setState(false);
    await this.animate(true);
    if (this.leaving !== token) return;
    this.leaving = 0;
    this.unfix();
    this.refresh();
  }

  cancelLeave() {
    if (!this.leaving) return;
    this.leaving = 0;
    this.el.classList.remove('pl-animation-reverse', ...classList(this.options.animation || 'pl-animation-slide-down'));
  }

  setState(active, force = false) {
    if (active === this.active && !force) return;
    const first = this.active === null;
    this.active = active;
    const on = classList(this.options.clsActive);
    const off = classList(this.options.clsInactive);
    this.el.classList.remove(...(active ? off : on));
    this.el.classList.add(...(active ? on : off));
    if (!first) this.emit(active ? 'active' : 'inactive');
  }
}

register('sticky', Sticky);
export default Sticky;
