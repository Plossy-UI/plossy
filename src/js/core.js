/**
 * Plossy — rdzeń: rejestr komponentów, auto-inicjalizacja i narzędzia.
 *
 * Komponent = klasa dziedzicząca po `Component`, zarejestrowana przez
 * `register('nazwa', Klasa)`. Inicjalizuje się sam na elementach z atrybutem
 * `data-pl-nazwa`, także dodanych do DOM później.
 */

const registry = new Map();
const store = new WeakMap();
let started = false;
let selector = '';

/** Publiczne API (window.Plossy). Moduły mogą dopisywać własne funkcje. */
export const api = {};

// ── DOM ───────────────────────────────────────────────────────────────────

export const $ = (sel, ctx = document) => (typeof sel === 'string' ? ctx.querySelector(sel) : sel || null);

export const $$ = (sel, ctx = document) =>
  typeof sel === 'string' ? [...ctx.querySelectorAll(sel)] : sel ? (sel instanceof Element ? [sel] : [...sel]) : [];

let uidCounter = 0;
export const uid = (prefix = 'pl') => `${prefix}-${(++uidCounter).toString(36)}${Math.random().toString(36).slice(2, 6)}`;

export const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export const camel = (str) => str.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());

export const prefersReducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Znajduje elementy docelowe względem `el`.
 * Obsługuje: 'next', 'prev', 'parent', '> .dziecko' (względem el) oraz zwykły selektor CSS.
 */
export function queryTargets(el, target) {
  if (!target) return [];
  if (target instanceof Element) return [target];
  target = String(target).trim();
  if (target === 'next') return el.nextElementSibling ? [el.nextElementSibling] : [];
  if (target === 'prev') return el.previousElementSibling ? [el.previousElementSibling] : [];
  if (target === 'parent') return el.parentElement ? [el.parentElement] : [];
  if (target.startsWith('>')) return [...el.querySelectorAll(`:scope ${target}`)];
  try {
    return [...document.querySelectorAll(target)];
  } catch {
    return [];
  }
}

/** Elementy możliwe do sfokusowania wewnątrz `el`. */
export function focusables(el) {
  return $$(
    'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    el,
  ).filter((node) => node.offsetParent !== null || node.getClientRects().length);
}

// ── Opcje ─────────────────────────────────────────────────────────────────

function coerce(value) {
  value = value.trim();
  if (value === 'true') return true;
  if (value === 'false') return false;
  if (value === 'null') return null;
  if (value !== '' && !Number.isNaN(Number(value))) return Number(value);
  return value.replace(/^(['"])(.*)\1$/, '$2');
}

/**
 * Parsuje wartość atrybutu: "klucz: wartość; inny-klucz: 2" albo JSON.
 * Gdy wartość nie zawiera znanego klucza, trafia do opcji `primary`.
 */
export function parseOptions(str, defaults = {}, primary = null) {
  const out = {};
  if (!str || !(str = str.trim())) return out;
  if (str.startsWith('{')) {
    try {
      return JSON.parse(str);
    } catch {
      return out;
    }
  }
  const parts = str.split(';');
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    const idx = part.indexOf(':');
    const key = idx > 0 ? camel(part.slice(0, idx).trim()) : null;
    if (key && key in defaults) {
      out[key] = coerce(part.slice(idx + 1));
    } else if (i === 0 && primary) {
      out[primary] = coerce(parts.length === 1 ? str : part);
    }
  }
  return out;
}

// ── Komponent bazowy ──────────────────────────────────────────────────────

export class Component {
  /** Domyślne opcje — nadpisywane w klasach potomnych. */
  static defaults = {};
  /** Nazwa opcji, do której trafia „goła" wartość atrybutu (np. data-pl-toggle="#cel"). */
  static primary = null;

  constructor(el, options = {}) {
    const C = this.constructor;
    this.el = el;
    this.options = {
      ...C.defaults,
      ...parseOptions(el.getAttribute(`data-pl-${C.componentName}`), C.defaults, C.primary),
      ...options,
    };
    this._cleanup = [];
    let map = store.get(el);
    if (!map) store.set(el, (map = new Map()));
    map.set(C.componentName, this);
    this.init();
  }

  /** Punkt wejścia komponentu. Stan instancji ustawiaj tutaj (nie w polach klasy). */
  init() {}

  /** addEventListener z automatycznym sprzątaniem w destroy(). Zwraca funkcję odpinającą. */
  on(target, type, handler, options) {
    if (!target) return () => {};
    target.addEventListener(type, handler, options);
    const off = () => target.removeEventListener(type, handler, options);
    this._cleanup.push(off);
    return off;
  }

  /** Rejestruje dowolną funkcję sprzątającą. */
  onDestroy(fn) {
    this._cleanup.push(fn);
  }

  /**
   * Wysyła zdarzenie `pl:{type}` na elemencie komponentu (bąbelkuje).
   * Zwraca false, jeśli zdarzenie anulowano przez preventDefault().
   */
  emit(type, detail = {}, cancelable = false) {
    const event = new CustomEvent(`pl:${type}`, {
      bubbles: true,
      cancelable,
      detail: { ...detail, component: this },
    });
    this.el.dispatchEvent(event);
    return !event.defaultPrevented;
  }

  destroy() {
    this._cleanup.splice(0).forEach((fn) => fn());
    store.get(this.el)?.delete(this.constructor.componentName);
  }
}

// ── Rejestr ───────────────────────────────────────────────────────────────

export function getInstance(el, name) {
  return store.get(el)?.get(name) || null;
}

function create(el, name, options) {
  return getInstance(el, name) || new (registry.get(name))(el, options);
}

/** Rejestruje komponent i udostępnia go jako Plossy.nazwa(element, opcje). */
export function register(name, Class) {
  Class.componentName = name;
  registry.set(name, Class);
  selector = [...registry.keys()].map((n) => `[data-pl-${n}]`).join(',');
  const key = camel(name);
  if (!api[key]) {
    api[key] = (target, options) => {
      const el = $(target);
      return el ? create(el, name, options) : null;
    };
  }
  if (started) scan(document);
  return Class;
}

/** Inicjalizuje komponenty w `root` (wywoływane automatycznie). */
export function scan(root = document) {
  if (!selector) return;
  const nodes = [...root.querySelectorAll(selector)];
  if (root instanceof Element && root.matches(selector)) nodes.unshift(root);
  for (const el of nodes) {
    for (const name of registry.keys()) {
      if (el.hasAttribute(`data-pl-${name}`) && !getInstance(el, name)) {
        try {
          create(el, name);
        } catch (error) {
          console.error(`[Plossy] ${name}:`, error);
        }
      }
    }
  }
}

export function start() {
  if (started || typeof document === 'undefined') return;
  started = true;
  const boot = () => {
    scan(document);
    new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (node.nodeType === 1) scan(node);
        }
      }
    }).observe(document.documentElement, { childList: true, subtree: true });
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
}

// ── Animacje ──────────────────────────────────────────────────────────────

/** Czeka na zakończenie wszystkich animacji / przejść CSS elementu. */
export function animationsDone(el) {
  return Promise.allSettled(el.getAnimations().map((a) => a.finished));
}

/** Dodaje klasę, czeka na animacje uruchomione przez nią i ją zdejmuje. */
export async function animateClass(el, className) {
  el.classList.add(className);
  await animationsDone(el);
  el.classList.remove(className);
}

const heightAnimations = new WeakMap();

/**
 * Płynnie rozwija / zwija element (wysokość + padding + przezroczystość).
 * Po zwinięciu ustawia `hidden`. Zwraca Promise.
 */
export function toggleHeight(el, show, { duration = 360, easing = 'cubic-bezier(0.33, 0.5, 0.2, 1)' } = {}) {
  const running = heightAnimations.get(el);
  const from = running ? getComputedStyle(el) : null;
  const startFrame = from
    ? { height: from.height, paddingTop: from.paddingTop, paddingBottom: from.paddingBottom, opacity: from.opacity }
    : null;
  running?.cancel();

  const collapsed = { height: '0px', paddingTop: '0px', paddingBottom: '0px', opacity: 0 };

  if (show) el.hidden = false;
  const cs = getComputedStyle(el);
  const expanded = {
    height: `${el.offsetHeight}px`,
    paddingTop: cs.paddingTop,
    paddingBottom: cs.paddingBottom,
    opacity: 1,
  };

  if (prefersReducedMotion() || !duration) {
    el.hidden = !show;
    heightAnimations.delete(el);
    return Promise.resolve();
  }

  const frames = show ? [startFrame || collapsed, expanded] : [startFrame || expanded, collapsed];
  el.style.overflow = 'hidden';
  const animation = el.animate(frames, { duration, easing });
  heightAnimations.set(el, animation);

  return animation.finished
    .then(() => {
      if (!show) el.hidden = true;
      el.style.overflow = '';
      heightAnimations.delete(el);
    })
    .catch(() => {});
}

// ── Warstwa wierzchnia (Popover API) ──────────────────────────────────────

/** Pokazuje element w top-layer (ponad modalami, bez problemów z overflow / z-index). */
export function showLayer(el) {
  el.hidden = false;
  if (typeof el.showPopover === 'function') {
    if (!el.hasAttribute('popover')) el.setAttribute('popover', 'manual');
    try {
      if (!el.matches(':popover-open')) el.showPopover();
    } catch {
      /* element odłączony od DOM */
    }
  }
}

export function hideLayer(el) {
  try {
    if (el.hasAttribute('popover') && el.matches(':popover-open')) el.hidePopover();
  } catch {
    /* noop */
  }
  el.hidden = true;
}

// ── Pozycjonowanie elementów pływających ──────────────────────────────────

const OPPOSITE = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' };

/**
 * Ustawia `floating` (position: fixed) względem `reference`.
 * placement: 'top|bottom|left|right' + opcjonalnie '-start|-end' (np. 'bottom-start').
 * Zapisuje faktyczne położenie w atrybucie data-pl-placement oraz zmienne
 * --pl-arrow-x / --pl-arrow-y (środek elementu odniesienia względem floating).
 */
export function place(floating, reference, options = {}) {
  const { placement = 'bottom', offset = 8, flip = true, shift = true, padding = 8, matchWidth = false } = options;
  const ref = reference instanceof Element ? reference.getBoundingClientRect() : reference;
  if (matchWidth) floating.style.minWidth = `${ref.width}px`;

  const fw = floating.offsetWidth;
  const fh = floating.offsetHeight;
  const vw = document.documentElement.clientWidth;
  const vh = window.innerHeight;
  let [side, align = 'center'] = placement.split('-');

  const space = {
    top: ref.top - fh - offset - padding,
    bottom: vh - ref.bottom - fh - offset - padding,
    left: ref.left - fw - offset - padding,
    right: vw - ref.right - fw - offset - padding,
  };
  if (flip && space[side] < 0 && space[OPPOSITE[side]] > space[side]) side = OPPOSITE[side];

  const vertical = side === 'top' || side === 'bottom';
  let x;
  let y;
  if (vertical) {
    y = side === 'top' ? ref.top - fh - offset : ref.bottom + offset;
    x = align === 'start' ? ref.left : align === 'end' ? ref.right - fw : ref.left + (ref.width - fw) / 2;
    if (shift) x = clamp(x, padding, Math.max(padding, vw - fw - padding));
  } else {
    x = side === 'left' ? ref.left - fw - offset : ref.right + offset;
    y = align === 'start' ? ref.top : align === 'end' ? ref.bottom - fh : ref.top + (ref.height - fh) / 2;
    if (shift) y = clamp(y, padding, Math.max(padding, vh - fh - padding));
  }

  floating.style.left = `${Math.round(x)}px`;
  floating.style.top = `${Math.round(y)}px`;
  floating.dataset.plPlacement = align === 'center' ? side : `${side}-${align}`;
  floating.style.setProperty('--pl-arrow-x', `${Math.round(ref.left + ref.width / 2 - x)}px`);
  floating.style.setProperty('--pl-arrow-y', `${Math.round(ref.top + ref.height / 2 - y)}px`);
  return side;
}

/** Jak place(), ale aktualizuje pozycję przy przewijaniu i zmianie rozmiaru. Zwraca funkcję stop(). */
export function autoPlace(floating, reference, options = {}) {
  let frame = 0;
  const update = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => place(floating, reference, options));
  };
  place(floating, reference, options);
  window.addEventListener('scroll', update, { capture: true, passive: true });
  window.addEventListener('resize', update, { passive: true });
  const observer = typeof ResizeObserver === 'function' ? new ResizeObserver(update) : null;
  observer?.observe(floating);
  return () => {
    cancelAnimationFrame(frame);
    window.removeEventListener('scroll', update, { capture: true });
    window.removeEventListener('resize', update);
    observer?.disconnect();
  };
}

// ── Blokada przewijania ───────────────────────────────────────────────────

let scrollLocks = 0;

export function lockScroll() {
  if (scrollLocks++ > 0) return;
  const root = document.documentElement;
  root.style.setProperty('--pl-scrollbar-w', `${window.innerWidth - root.clientWidth}px`);
  root.classList.add('pl-scroll-lock');
}

export function unlockScroll() {
  if (scrollLocks === 0 || --scrollLocks > 0) return;
  const root = document.documentElement;
  root.classList.remove('pl-scroll-lock');
  root.style.removeProperty('--pl-scrollbar-w');
}

// ── Różne ─────────────────────────────────────────────────────────────────

/** Ogranicza wywołania do jednego na klatkę animacji. */
export function rafThrottle(fn) {
  let frame = 0;
  return (...args) => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      fn(...args);
    });
  };
}

export function debounce(fn, wait = 150) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  };
}

Object.assign(api, {
  register,
  scan,
  getInstance,
  Component,
  util: {
    $,
    $$,
    uid,
    clamp,
    parseOptions,
    queryTargets,
    focusables,
    animationsDone,
    animateClass,
    toggleHeight,
    showLayer,
    hideLayer,
    place,
    autoPlace,
    lockScroll,
    unlockScroll,
    rafThrottle,
    debounce,
    prefersReducedMotion,
  },
});
