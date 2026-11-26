import { Component, register, api, getInstance, queryTargets, toggleHeight, animationsDone, uid, prefersReducedMotion } from '../core.js';

const BREAKPOINTS = { s: 640, m: 960, l: 1200, xl: 1600 };

/** Zamienia wartość opcji `media` (liczba px, '@m', zapytanie media) na MediaQueryList. */
function toMedia(value) {
  if (value === false || value === null || value === undefined || value === '') return null;
  if (typeof value === 'string' && value.startsWith('@')) value = BREAKPOINTS[value.slice(1)] ?? 0;
  if (typeof value === 'number' || /^\d+$/.test(value)) return matchMedia(`(min-width: ${value}px)`);
  return matchMedia(value);
}

const fire = (target, type, detail, cancelable = false) => {
  const event = new CustomEvent(`pl:${type}`, { bubbles: true, cancelable, detail });
  target.dispatchEvent(event);
  return !event.defaultPrevented;
};

/**
 * Toggle
 * <button data-pl-toggle="#cel">…</button>
 * <button data-pl-toggle="target: #cel; cls: pl-open; animation: true">…</button>
 */
class Toggle extends Component {
  static defaults = {
    target: null, // selektor, 'next', 'prev', 'parent', '> .x'; domyślnie href lub następny element
    cls: '', // klasa przełączana na celu; bez niej przełączany jest atrybut hidden
    animation: false, // true → płynna wysokość; nazwa klasy animacji (opcjonalnie „wejście, wyjście")
    mode: 'click', // click | hover (można łączyć: "click, hover")
    queued: false, // wiele celów pokazywanych po kolei
    media: false, // aktywny dopiero od podanej szerokości (px, '@m' lub zapytanie media)
    duration: 360,
  };

  static primary = 'target';

  init() {
    const { el, options } = this;
    this.media = toMedia(options.media);
    this.hoverTimer = 0;
    this.busy = false;
    const modes = String(options.mode).split(',').map((mode) => mode.trim());

    if (!el.matches('button, a[href], input, summary')) {
      el.setAttribute('role', 'button');
      if (!el.hasAttribute('tabindex')) el.tabIndex = 0;
      this.on(el, 'keydown', (event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        this.toggle();
      });
    }

    this.on(el, 'click', (event) => {
      if (!this.enabled) return;
      if (el.matches('a[href^="#"]') || this.targets.length) event.preventDefault();
      // W trybie hover kliknięcie myszą nie przełącza (stan wynika z położenia kursora).
      if (modes.includes('hover') && !modes.includes('click') && event.pointerType === 'mouse') return;
      this.toggle();
    });

    if (modes.includes('hover')) {
      const enter = (event) => {
        if (event.pointerType !== 'mouse' || !this.enabled) return;
        clearTimeout(this.hoverTimer);
        if (!this.isToggled()) this.toggle();
      };
      const leave = (event) => {
        if (event.pointerType !== 'mouse' || !this.enabled) return;
        clearTimeout(this.hoverTimer);
        this.hoverTimer = setTimeout(() => {
          const hovered = [el, ...this.targets].some((node) => node.matches(':hover'));
          if (!hovered && this.isToggled()) this.toggle();
        }, 160);
      };
      this.on(el, 'pointerenter', enter);
      this.on(el, 'pointerleave', leave);
      // Cele mogą pojawić się później — nasłuch delegowany.
      this.on(document, 'pointerout', (event) => {
        const target = this.targets.find((node) => node.contains(event.target));
        if (target && !target.contains(event.relatedTarget)) leave(event);
      });
      this.onDestroy(() => clearTimeout(this.hoverTimer));
    }

    // Stan mógł zmienić ktoś inny (drugi przełącznik, Esc w modalu) — synchronizuj ARIA.
    const sync = (event) => {
      if (event.detail?.component !== this && this.targets.includes(event.target)) queueMicrotask(() => this.sync());
    };
    for (const type of ['pl:show', 'pl:shown', 'pl:hide', 'pl:hidden']) this.on(document, type, sync);
    this.on(document, 'close', sync, true);

    this.sync();
  }

  get enabled() {
    return !this.media || this.media.matches;
  }

  /** Elementy docelowe (wyliczane na bieżąco — działają także dla treści dodanej później). */
  get targets() {
    const { el, options } = this;
    let target = options.target;
    if (!target) {
      const href = el.getAttribute('href');
      target = href && href.length > 1 && href.startsWith('#') ? href : 'next';
    }
    return queryTargets(el, target);
  }

  overlay(target) {
    for (const name of ['modal', 'offcanvas']) {
      if (!target.hasAttribute(`data-pl-${name}`)) continue;
      return getInstance(target, name) || api[name]?.(target) || null;
    }
    return getInstance(target, 'modal') || getInstance(target, 'offcanvas');
  }

  shown(target) {
    if (this.overlay(target)) return target.matches('dialog') ? target.open : target.classList.contains('pl-open');
    return this.options.cls ? this.classes.every((cls) => target.classList.contains(cls)) : !target.hidden;
  }

  get classes() {
    return String(this.options.cls).split(/[\s,]+/).filter(Boolean);
  }

  isToggled() {
    return this.targets.some((target) => this.shown(target));
  }

  /** Uzgadnia aria-expanded, aria-controls i klasę .pl-active ze stanem celów. */
  sync() {
    const targets = this.targets;
    if (!targets.length) return;
    const active = targets.some((target) => this.shown(target));
    this.el.setAttribute('aria-expanded', String(active));
    this.el.setAttribute('aria-controls', targets.map((target) => (target.id ||= uid('pl-toggle'))).join(' '));
    this.el.classList.toggle('pl-active', active);
  }

  async toggle() {
    const targets = this.targets;
    if (!targets.length || this.busy) return;

    if (this.options.queued && targets.length > 1) {
      // Kolejka: widoczny jest jeden cel, każde przełączenie pokazuje następny.
      const current = targets.findIndex((target) => this.shown(target));
      const next = targets[(current + 1) % targets.length];
      this.busy = true;
      try {
        if (current > -1) await this.set(targets[current], false);
        await this.set(next, true);
      } finally {
        this.busy = false;
      }
    } else {
      await Promise.all(targets.map((target) => this.set(target, !this.shown(target))));
    }
    this.sync();
  }

  async set(target, show) {
    const overlay = this.overlay(target);
    if (overlay) {
      if (typeof overlay.toggle === 'function') overlay.toggle(this.el);
      return;
    }

    const detail = { component: this, toggle: this.el };
    if (!fire(target, show ? 'beforeshow' : 'beforehide', detail, true)) return;

    const { cls, animation, duration } = this.options;
    if (cls) {
      this.classes.forEach((name) => target.classList.toggle(name, show));
      fire(target, show ? 'show' : 'hide', detail);
      this.syncState(show);
      await animationsDone(target);
    } else if (animation === true) {
      fire(target, show ? 'show' : 'hide', detail);
      this.syncState(show);
      await toggleHeight(target, show, { duration });
    } else if (animation && !prefersReducedMotion()) {
      const [enter, leave] = String(animation).split(',').map((name) => name.trim().split(/\s+/).filter(Boolean));
      fire(target, show ? 'show' : 'hide', detail);
      this.syncState(show);
      if (show) {
        target.hidden = false;
        target.classList.add(...enter);
        await animationsDone(target);
        target.classList.remove(...enter);
      } else {
        const names = leave?.length ? leave : [...enter, 'pl-animation-reverse'];
        target.classList.add(...names);
        await animationsDone(target);
        target.hidden = true;
        target.classList.remove(...names);
      }
    } else {
      target.hidden = !show;
      fire(target, show ? 'show' : 'hide', detail);
    }
    fire(target, show ? 'shown' : 'hidden', detail);
  }

  /** Ustawia ARIA od razu, zanim skończy się animacja. */
  syncState(active) {
    this.el.setAttribute('aria-expanded', String(active));
    this.el.classList.toggle('pl-active', active);
  }
}

register('toggle', Toggle);
export default Toggle;
