import { Component, register, api, $, clamp, prefersReducedMotion } from '../core.js';

const EASINGS = {
  linear: (t) => t,
  'ease-in': (t) => t * t * t,
  'ease-out': (t) => 1 - (1 - t) ** 4,
  'ease-in-out': (t) => (t < 0.5 ? 8 * t ** 4 : 1 - (-2 * t + 2) ** 4 / 2),
  // Lekkie przestrzelenie i powrót.
  spring: (t) => 1 + 2.2 * (t - 1) ** 3 + 1.2 * (t - 1) ** 2,
};

const running = new WeakMap();

/** Najbliższy przewijany przodek albo element przewijania dokumentu. */
export function scrollParent(el) {
  const root = document.scrollingElement || document.documentElement;
  for (let node = el?.parentElement; node && node !== document.body && node !== root; node = node.parentElement) {
    const { overflowY } = getComputedStyle(node);
    if ((overflowY === 'auto' || overflowY === 'scroll') && node.scrollHeight > node.clientHeight) return node;
  }
  return root;
}

/**
 * Płynnie przewija do elementu (lub pozycji w px).
 * Opcje: offset, duration (ms lub 'auto'), easing (nazwa lub funkcja), container.
 * Zwraca Promise rozwiązywany po zakończeniu (true) lub przerwaniu przez użytkownika (false).
 */
export function scrollTo(target, options = {}) {
  const { offset = 0, duration = 'auto', easing = 'ease-in-out' } = options;
  const root = document.scrollingElement || document.documentElement;
  const el = typeof target === 'number' ? null : $(target);
  if (typeof target !== 'number' && !el) return Promise.resolve(false);

  const container = $(options.container) || (el ? scrollParent(el) : root);
  const isRoot = container === root;
  const start = container.scrollTop;
  let end;
  if (el) {
    const base = isRoot ? 0 : container.getBoundingClientRect().top + container.clientTop;
    end = start + el.getBoundingClientRect().top - base - offset;
  } else {
    end = target - offset;
  }
  const viewport = isRoot ? window.innerHeight : container.clientHeight;
  end = clamp(Math.round(end), 0, Math.max(0, container.scrollHeight - viewport));

  running.get(container)?.(false);

  const distance = end - start;
  const time = duration === 'auto' || duration === null ? clamp(Math.abs(distance) * 0.45, 280, 1100) : Number(duration) || 0;
  const ease = typeof easing === 'function' ? easing : EASINGS[easing] || EASINGS['ease-in-out'];

  if (!distance || !time || prefersReducedMotion()) {
    container.scrollTop = end;
    return Promise.resolve(true);
  }

  return new Promise((resolve) => {
    let frame = 0;
    const startTime = performance.now();
    // Własna animacja nie może walczyć z CSS scroll-behavior: smooth.
    const behavior = container.style.scrollBehavior;
    container.style.scrollBehavior = 'auto';
    const abortEvents = ['wheel', 'touchstart', 'pointerdown', 'keydown'];
    const finish = (done) => {
      cancelAnimationFrame(frame);
      abortEvents.forEach((type) => window.removeEventListener(type, abort, true));
      container.style.scrollBehavior = behavior;
      running.delete(container);
      resolve(done);
    };
    const abort = (event) => {
      if (event.type === 'keydown' && !/^(Arrow|Page|Home|End| |Escape)/.test(event.key)) return;
      finish(false);
    };
    const step = (now) => {
      const t = clamp((now - startTime) / time, 0, 1);
      container.scrollTop = start + distance * ease(t);
      if (t < 1) frame = requestAnimationFrame(step);
      else {
        container.scrollTop = end;
        finish(true);
      }
    };
    abortEvents.forEach((type) => window.addEventListener(type, abort, { capture: true, passive: true }));
    running.set(container, finish);
    frame = requestAnimationFrame(step);
  });
}

/** Przenosi fokus na cel przewijania (dla klawiatury i czytników ekranu). */
export function focusTarget(target) {
  if (!target || target === document.body || target === document.documentElement) return;
  if (!target.matches('a[href], button, input, select, textarea, [tabindex]')) {
    target.setAttribute('tabindex', '-1');
    target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
  }
  target.focus({ preventScroll: true });
}

/**
 * Scroll
 * <a href="#sekcja" data-pl-scroll>…</a>
 * <a href="#sekcja" data-pl-scroll="offset: 80; duration: 600; easing: ease-out">…</a>
 */
class Scroll extends Component {
  static defaults = {
    offset: 0, // odstęp od górnej krawędzi (np. wysokość przyklejonego nagłówka)
    duration: 'auto', // ms albo 'auto' (zależnie od dystansu)
    easing: 'ease-in-out', // linear | ease-in | ease-out | ease-in-out | spring
    hash: true, // aktualizuj adres
    focus: true, // przenieś fokus na cel
  };

  static primary = 'offset';

  init() {
    this.on(this.el, 'click', (event) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.button) return;
      const link = this.el.matches('a[href]') ? this.el : event.target.closest('a[href]');
      const href = link?.getAttribute('href') || this.el.getAttribute('data-pl-scroll-target') || '';
      if (!href.startsWith('#')) return;
      event.preventDefault();
      this.scrollTo(href);
    });
  }

  /** Przewija do celu (selektor / element); bez argumentu — do celu z href. */
  async scrollTo(target = this.el.getAttribute('href')) {
    const { offset, duration, easing, hash, focus } = this.options;
    let el = null;
    if (target instanceof Element) el = target;
    else if (typeof target === 'string' && target.length > 1) {
      el = document.getElementById(decodeURIComponent(target.slice(1))) || (target !== '#top' ? safeQuery(target) : null);
    }
    const top = !el && (target === '#' || target === '#top');
    if (!el && !top) return false;
    if (!this.emit('beforescroll', { target: el }, true)) return false;

    const done = await scrollTo(el || 0, { offset: el ? offset : 0, duration, easing });
    if (hash && typeof target === 'string' && target.length > 1 && target !== location.hash) {
      history.pushState(null, '', target);
    }
    if (done && focus && el) focusTarget(el);
    this.emit('scrolled', { target: el, completed: done });
    return done;
  }
}

function safeQuery(selector) {
  try {
    return document.querySelector(selector);
  } catch {
    return null;
  }
}

register('scroll', Scroll);
api.scroll.to = scrollTo;
export default Scroll;
