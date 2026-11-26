import { Component, register, api, $, uid, lockScroll, unlockScroll, animateClass } from '../core.js';

/**
 * Modal
 * <dialog class="pl-modal" id="m" data-pl-modal>
 *   <div class="pl-modal-dialog">
 *     <div class="pl-modal-header">
 *       <h2 class="pl-modal-title">…</h2>
 *       <button class="pl-close" type="button" aria-label="Zamknij" data-pl-modal-close></button>
 *     </div>
 *     <div class="pl-modal-body">…</div>
 *     <div class="pl-modal-footer">…</div>
 *   </div>
 * </dialog>
 * Otwieranie: <button data-pl-modal-open="#m"> lub <button data-pl-toggle="#m">.
 */

/** Aktualnie otwarte nakładki (modal, offcanvas) — w kolejności otwierania. */
const opened = new Set();

/** Czeka na animacje wskazanych elementów (z bezpiecznikiem czasowym). */
export function settle(nodes, limit = 1500) {
  const animations = nodes.filter(Boolean).flatMap((node) => node.getAnimations());
  if (!animations.length) return Promise.resolve();
  return Promise.race([
    Promise.allSettled(animations.map((animation) => animation.finished)),
    new Promise((resolve) => setTimeout(resolve, limit)),
  ]);
}

/**
 * Wspólna baza nakładek na natywnym <dialog>: showModal(), animowane zamykanie,
 * Esc, kliknięcie tła, blokada przewijania i powrót fokusu.
 */
export class Overlay extends Component {
  static defaults = {
    backdropClose: true, // kliknięcie tła zamyka
    escClose: true, // klawisz Esc zamyka
    static: false, // kliknięcie tła nie zamyka — okno „potrząsa głową"
    stack: false, // pozwala otworzyć nakładkę nad inną
  };

  /** Selektor widocznego panelu wewnątrz <dialog>. */
  static panel = '.pl-modal-dialog';
  /** Selektor tytułu (aria-labelledby). */
  static title = '.pl-modal-title';

  init() {
    const el = this.el;
    const name = this.constructor.componentName;
    this.state = 'closed';
    this.opener = null;
    this.closing = null;
    this.pressed = null;

    if (!(el instanceof HTMLDialogElement) || typeof el.showModal !== 'function') {
      console.warn(`[Plossy] ${name}: wymagany element <dialog>.`);
    }

    const title = el.querySelector(this.constructor.title);
    if (title && !el.hasAttribute('aria-labelledby') && !el.hasAttribute('aria-label')) {
      title.id ||= uid(`pl-${name}-title`);
      el.setAttribute('aria-labelledby', title.id);
    }

    this.setup();

    this.on(el, 'pointerdown', (event) => {
      // Naciśnięcie na pasku przewijania warstwy nie liczy się jako kliknięcie tła.
      const onScrollbar = event.target === el && (event.offsetX >= el.clientWidth || event.offsetY >= el.clientHeight);
      this.pressed = onScrollbar ? false : event.target;
    });

    this.on(el, 'click', (event) => {
      const closer = event.target.closest(`[data-pl-${name}-close]`);
      if (closer && closer.closest('dialog') === el) {
        event.preventDefault();
        this.hide();
        return;
      }
      // Tło = sam <dialog>; wymagamy, by także naciśnięcie zaczęło się na tle
      // (przeciągnięcie zaznaczenia poza panel nie zamyka okna).
      if (event.target === el && (this.pressed === el || this.pressed === null)) this.dismiss('backdrop');
      this.pressed = null;
    });

    this.on(el, 'keydown', (event) => {
      if (event.key !== 'Escape' || event.defaultPrevented) return;
      event.preventDefault();
      this.dismiss('esc');
    });

    // Zamknięcie zainicjowane przez przeglądarkę (np. gest „wstecz").
    this.on(el, 'cancel', (event) => {
      if (event.target !== el) return;
      event.preventDefault();
      this.dismiss('esc');
    });

    this.on(el, 'close', (event) => {
      if (event.target === el && this.state !== 'closed') this.finish();
    });

    this.onDestroy(() => this.finish(true));
  }

  /** Hak dla klas potomnych. */
  setup() {}

  get panel() {
    return this.el.querySelector(`:scope > ${this.constructor.panel}`) || this.el.firstElementChild;
  }

  get isOpen() {
    return this.state === 'open';
  }

  /** Próba zamknięcia przez użytkownika (tło / Esc). */
  dismiss(reason) {
    if (this.state !== 'open') return;
    const { backdropClose, escClose, static: isStatic } = this.options;
    if (reason === 'backdrop' && isStatic) return this.nope();
    if (reason === 'backdrop' ? backdropClose : escClose) return this.hide();
    if (isStatic) this.nope();
  }

  /** Krótkie potrząśnięcie panelem. */
  nope() {
    const panel = this.panel;
    if (!panel || panel.classList.contains('pl-modal-shake')) return;
    animateClass(panel, 'pl-modal-shake');
  }

  toggle(opener) {
    return this.state === 'open' ? this.hide() : this.show(opener);
  }

  async show(opener) {
    const el = this.el;
    if (this.state === 'closing') await this.closing;
    if (this.state !== 'closed' || typeof el.showModal !== 'function') return;
    if (!this.emit('beforeshow', {}, true)) return;

    if (!this.options.stack) {
      [...opened].filter((other) => other !== this && !other.el.contains(el)).forEach((other) => other.hide());
    }

    this.opener = opener instanceof Element ? opener : document.activeElement;
    if (!el.isConnected) document.body.append(el);
    el.classList.remove('pl-closing');
    if (el.open) el.close(); // otwarty atrybutem `open` — przełączamy w tryb modalny
    this.state = 'open';
    opened.add(this);
    lockScroll();
    try {
      el.showModal();
      // Natywny fokus potrafi przewinąć okno do panelu, który dopiero wjeżdża — animacja wtedy „skacze”.
      el.scrollTop = 0;
      el.scrollLeft = 0;
    } catch (error) {
      this.state = 'closed';
      opened.delete(this);
      unlockScroll();
      console.error('[Plossy] modal:', error);
      return;
    }
    el.classList.add('pl-open');
    el.scrollTop = 0;
    this.emit('show');
    await settle([el, this.panel]);
    if (this.state === 'open') this.emit('shown');
  }

  hide() {
    if (this.state === 'closing') return this.closing;
    if (this.state !== 'open') return Promise.resolve();
    if (!this.emit('beforehide', {}, true)) return Promise.resolve();
    this.state = 'closing';
    this.el.classList.add('pl-closing');
    this.emit('hide');
    this.closing = settle([this.el, this.panel]).then(() => this.finish());
    return this.closing;
  }

  /** Domyka okno po animacji (lub natychmiast, gdy zamknęła je przeglądarka). */
  finish(silent = false) {
    if (this.state === 'closed') return;
    const el = this.el;
    this.state = 'closed';
    this.closing = null;
    opened.delete(this);
    if (el.open) el.close();
    el.classList.remove('pl-closing', 'pl-open');
    unlockScroll();
    const opener = this.opener;
    this.opener = null;
    if (opener?.isConnected && opener !== document.body) opener.focus?.({ preventScroll: true });
    if (!silent) this.emit('hidden');
  }
}

/** Delegowane otwieranie: <button data-pl-{name}-open="#cel">. */
export function delegateOpen(name) {
  if (typeof document === 'undefined') return;
  const attr = `data-pl-${name}-open`;
  document.addEventListener('click', (event) => {
    const opener = event.target.closest?.(`[${attr}]`);
    if (!opener || opener.disabled || opener.classList.contains('pl-disabled')) return;
    const selector = opener.getAttribute(attr) || opener.getAttribute('href');
    let target = null;
    try {
      target = selector ? document.querySelector(selector) : null;
    } catch {
      /* błędny selektor */
    }
    if (!target) return;
    event.preventDefault();
    api[name](target)?.show(opener);
  });
}

class Modal extends Overlay {
  static defaults = { ...Overlay.defaults };
}

register('modal', Modal);
delegateOpen('modal');

// ── Okna programowe ───────────────────────────────────────────────────────

const labels = { ok: 'OK', cancel: 'Anuluj', close: 'Zamknij' };

const escapeHtml = (value) =>
  String(value ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

/**
 * Tworzy modal z podanej treści (HTML lub element), pokazuje go i usuwa po zamknięciu.
 * Opcje: cls (klasy <dialog>), oraz opcje modala (static, backdropClose, escClose, stack).
 */
function dialog(content, options = {}) {
  const { cls = '', ...rest } = options;
  const el = document.createElement('dialog');
  el.className = `pl-modal ${cls}`.trim();
  const panel = document.createElement('div');
  panel.className = 'pl-modal-dialog';
  if (content instanceof Node) panel.append(content);
  else panel.innerHTML = content ?? '';
  el.append(panel);
  document.body.append(el);

  const instance = new Modal(el, { stack: true, ...rest });
  el.addEventListener('pl:hidden', (event) => {
    if (event.target !== el) return;
    instance.destroy();
    el.remove();
  });
  instance.show();
  return instance;
}

/** Wspólny szkielet alert / confirm / prompt. Zwraca Promise z wynikiem. */
function ask(kind, message, options = {}, value = '') {
  const {
    title = '',
    html = false,
    ok = labels.ok,
    cancel = labels.cancel,
    tone = 'primary',
    cls = 'pl-modal-small pl-modal-center',
    placeholder = '',
    type = 'text',
    ...rest
  } = options;
  const text = html ? String(message ?? '') : escapeHtml(message);
  const inputId = uid('pl-modal-input');
  const withCancel = kind !== 'alert';

  const body =
    kind === 'prompt'
      ? `<label class="pl-modal-prompt-label pl-modal-message" for="${inputId}">${text}</label>
         <input class="pl-input" id="${inputId}" type="${escapeHtml(type)}" placeholder="${escapeHtml(placeholder)}" autocomplete="off" autofocus>`
      : `<div class="pl-modal-message">${text}</div>`;

  const markup = `
    <form method="dialog" novalidate>
      ${title ? `<div class="pl-modal-header"><h2 class="pl-modal-title">${escapeHtml(title)}</h2></div>` : ''}
      <div class="pl-modal-body"${title ? '' : ' style="padding-top: var(--pl-modal-px)"'}>${body}</div>
      <div class="pl-modal-footer pl-modal-footer-plain">
        ${withCancel ? `<button class="pl-button" type="button" data-pl-modal-close>${escapeHtml(cancel)}</button>` : ''}
        <button class="pl-button pl-button-${escapeHtml(tone)}" type="submit"${kind === 'prompt' ? '' : ' autofocus'}>${escapeHtml(ok)}</button>
      </div>
    </form>`;

  return new Promise((resolve) => {
    let result = kind === 'confirm' ? false : kind === 'prompt' ? null : undefined;
    const instance = dialog(markup, { cls, ...rest });
    const el = instance.el;
    const input = el.querySelector('input');
    el.setAttribute('role', kind === 'prompt' ? 'dialog' : 'alertdialog');
    if (!title) el.setAttribute('aria-label', kind === 'alert' ? 'Komunikat' : kind === 'confirm' ? 'Potwierdzenie' : 'Pytanie');
    if (input) {
      input.value = value ?? '';
      input.select();
    }
    el.querySelector('form').addEventListener('submit', (event) => {
      event.preventDefault();
      result = kind === 'confirm' ? true : kind === 'prompt' ? input.value : undefined;
      instance.hide();
    });
    el.addEventListener('pl:hidden', (event) => {
      if (event.target === el) resolve(result);
    });
  });
}

Object.assign(api.modal, {
  /** Plossy.modal.dialog(html, opcje) → instancja modala (usuwana po zamknięciu). */
  dialog,
  /** Plossy.modal.alert('Tekst', opcje) → Promise<void>. */
  alert: (message, options) => ask('alert', message, options),
  /** Plossy.modal.confirm('Tekst', opcje) → Promise<boolean>. */
  confirm: (message, options) => ask('confirm', message, options),
  /** Plossy.modal.prompt('Pytanie', 'wartość', opcje) → Promise<string|null>. */
  prompt: (message, value = '', options) => ask('prompt', message, options, value),
  /** Domyślne etykiety przycisków — można nadpisać globalnie. */
  labels,
});

export default Modal;
