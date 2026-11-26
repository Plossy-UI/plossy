import { Component, register, animationsDone, showLayer, hideLayer, place } from '../core.js';

/**
 * Tooltip — krótka podpowiedź po najechaniu lub sfokusowaniu.
 * <button data-pl-tooltip="Kopiuj link">…</button>
 * <button data-pl-tooltip="title: Usuń; pos: bottom; delay: 300">…</button>
 * <button title="Tekst z atrybutu title" data-pl-tooltip>…</button>
 */

// Jeden współdzielony dymek dla całej strony.
const TIP_ID = 'pl-tooltip';
const GROUP_WINDOW = 400; // ms — w tym czasie kolejny tooltip pojawia się bez opóźnienia
let tip = null;
let current = null;
let token = 0;
let lastHidden = -Infinity;
let globalsBound = false;

function getTip(host) {
  if (!tip) {
    tip = document.createElement('div');
    tip.id = TIP_ID;
    tip.setAttribute('role', 'tooltip');
    tip.className = 'pl-tooltip';
  }
  // Wewnątrz modala dymek musi być jego potomkiem (reszta dokumentu jest wtedy „inert").
  if (tip.parentElement !== host) host.appendChild(tip);
  return tip;
}

function bindGlobals() {
  if (globalsBound) return;
  globalsBound = true;
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') current?.hide();
  });
  window.addEventListener(
    'scroll',
    (event) => {
      // Przewinięcie wewnątrz samego dymka nie zamyka.
      if (current && event.target !== tip) current.hide();
    },
    { capture: true, passive: true },
  );
  window.addEventListener('resize', () => current?.hide(), { passive: true });
}

class Tooltip extends Component {
  static defaults = {
    title: '',
    pos: 'top',
    offset: 10,
    delay: 120, // opóźnienie pokazania (ms)
    cls: '', // dodatkowe klasy dymka, np. pl-tooltip-light
    html: false, // traktuj tytuł jako HTML
  };
  static primary = 'title';

  init() {
    const { el, options } = this;
    this.timer = 0;
    this.visible = false;

    // Natywny title → opcja (inaczej pojawiłyby się dwa dymki).
    const native = el.getAttribute('title');
    if (native != null) {
      if (!options.title) options.title = native;
      el.removeAttribute('title');
      this.onDestroy(() => el.setAttribute('title', native));
    }

    // Element bez tekstu (np. sama ikona) dostaje nazwę dostępną z treści podpowiedzi.
    this.labelled = false;
    if (
      options.title &&
      !options.html &&
      !el.hasAttribute('aria-label') &&
      !el.hasAttribute('aria-labelledby') &&
      !el.textContent.trim() &&
      !el.matches('input, select, textarea')
    ) {
      // aria-label wymaga roli: element bez niej (np. <span> z samą ikoną) staje się obrazem.
      if (!el.hasAttribute('role') && !el.matches('a[href], button, summary, img, svg')) {
        el.setAttribute('role', 'img');
        this.onDestroy(() => el.removeAttribute('role'));
      }
      el.setAttribute('aria-label', String(options.title));
      this.labelled = true;
    }

    this.on(el, 'pointerenter', (event) => {
      if (event.pointerType === 'touch') return;
      this.schedule();
    });
    this.on(el, 'pointerleave', () => this.hide());
    this.on(el, 'pointerdown', () => this.hide());
    this.on(el, 'focusin', () => {
      if (el.matches(':focus-visible') || el.querySelector(':focus-visible')) this.show();
    });
    this.on(el, 'focusout', () => this.hide());

    bindGlobals();
    this.onDestroy(() => this.hide(true));
  }

  schedule() {
    clearTimeout(this.timer);
    const grouped = current || performance.now() - lastHidden < GROUP_WINDOW;
    const delay = grouped ? 0 : this.options.delay;
    if (!delay) return this.show(Boolean(grouped));
    this.timer = setTimeout(() => this.show(), delay);
  }

  /** Zmienia treść podpowiedzi (także widocznej). */
  setTitle(title) {
    this.options.title = title;
    if (this.labelled) this.el.setAttribute('aria-label', String(title));
    if (this.visible) this.render();
  }

  render() {
    const { el, options } = this;
    const host = el.closest('dialog') || document.body;
    const node = getTip(host);
    if (options.html) node.innerHTML = String(options.title);
    else node.textContent = String(options.title);
    return node;
  }

  show(instant = false) {
    clearTimeout(this.timer);
    const { el, options } = this;
    if (this.visible || !options.title || !el.isConnected || el.matches(':disabled, .pl-disabled')) return;
    if (!this.emit('beforeshow', {}, true)) return;

    if (current && current !== this) current.hide(true);
    current = this;
    this.visible = true;
    ++token;

    const node = this.render();
    node.className = `pl-tooltip ${options.cls || ''} ${instant ? 'pl-tooltip-instant' : ''}`.trim();
    node.classList.add('pl-open');
    showLayer(node);
    place(node, el, { placement: options.pos, offset: options.offset });
    if (!this.labelled) {
      this.describedBy = el.getAttribute('aria-describedby');
      el.setAttribute('aria-describedby', [this.describedBy, TIP_ID].filter(Boolean).join(' '));
    }
    this.emit('show');
  }

  /** Ukrywa podpowiedź; `immediate` pomija animację (zamiana na inny tooltip). */
  async hide(immediate = false) {
    clearTimeout(this.timer);
    if (!this.visible) return;
    this.visible = false;
    const { el } = this;
    if (!this.labelled) {
      if (this.describedBy) el.setAttribute('aria-describedby', this.describedBy);
      else el.removeAttribute('aria-describedby');
    }
    if (current === this) current = null;
    lastHidden = performance.now();
    this.emit('hide');

    if (immediate || !tip) {
      tip?.classList.remove('pl-open', 'pl-leave');
      if (tip) hideLayer(tip);
      return;
    }
    const mine = ++token;
    tip.classList.add('pl-leave');
    tip.classList.remove('pl-open');
    await animationsDone(tip);
    if (mine !== token) return;
    tip.classList.remove('pl-leave');
    hideLayer(tip);
    this.emit('hidden');
  }
}

register('tooltip', Tooltip);
export default Tooltip;
