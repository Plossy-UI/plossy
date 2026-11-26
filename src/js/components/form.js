import { Component, register, $, $$, uid, getInstance, queryTargets } from '../core.js';

// Opakowania, w których kontrolka „mieszka" razem z ikoną / przyciskami.
const WRAPPERS = '.pl-form-icon, .pl-form-affix, .pl-input-group, .pl-form-floating, .pl-form-field';

/** Ustawia wartość pola i powiadamia nasłuchujących (jak wpisanie przez użytkownika). */
function setValue(input, value) {
  input.value = value;
  input.dispatchEvent(new Event('input', { bubbles: true }));
  input.dispatchEvent(new Event('change', { bubbles: true }));
}

/**
 * Autosize — pole tekstowe rośnie razem z treścią.
 * <textarea class="pl-textarea" data-pl-autosize></textarea>
 * <textarea class="pl-textarea" data-pl-autosize="max-rows: 8"></textarea>
 */
class Autosize extends Component {
  static defaults = {
    minRows: 0, // minimalna liczba wierszy (0 = z atrybutu rows / CSS)
    maxRows: 0, // po przekroczeniu pojawia się przewijanie (0 = bez limitu)
  };

  init() {
    const { el } = this;
    this.resizeBefore = el.style.resize;
    el.style.resize = 'none';
    if (this.options.minRows) el.rows = this.options.minRows;

    this.update = this.update.bind(this);
    this.on(el, 'input', this.update);
    this.on(el.form, 'reset', () => requestAnimationFrame(this.update));
    this.on(window, 'resize', this.update, { passive: true });
    // Element mógł być ukryty przy starcie (zakładka, modal) — przelicz, gdy dostanie rozmiar.
    if (typeof ResizeObserver === 'function') {
      let width = el.offsetWidth;
      const observer = new ResizeObserver(() => {
        if (el.offsetWidth !== width) {
          width = el.offsetWidth;
          this.update();
        }
      });
      observer.observe(el);
      this.onDestroy(() => observer.disconnect());
    }
    this.onDestroy(() => {
      el.style.height = '';
      el.style.overflowY = '';
      el.style.resize = this.resizeBefore;
    });
    this.update();
  }

  update() {
    const { el } = this;
    if (!el.offsetParent && !el.getClientRects().length) return;
    const cs = getComputedStyle(el);
    const extra = el.offsetHeight - el.clientHeight; // ramki
    el.style.height = 'auto';
    let height = el.scrollHeight + extra;
    let overflow = 'hidden';
    if (this.options.maxRows) {
      const line = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.5;
      const max = line * this.options.maxRows + parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom) + extra;
      if (height > max) {
        height = max;
        overflow = 'auto';
      }
    }
    el.style.overflowY = overflow;
    el.style.height = `${height}px`;
  }
}

register('autosize', Autosize);

/**
 * Password toggle — przycisk pokazujący / ukrywający hasło.
 * <div class="pl-form-icon">
 *   <input class="pl-input" type="password">
 *   <button class="pl-form-icon-flip" type="button" data-pl-password-toggle><span data-pl-icon="eye"></span></button>
 * </div>
 */
class PasswordToggle extends Component {
  static defaults = {
    target: '', // selektor pola; domyślnie pole hasła w tym samym opakowaniu
    iconShow: 'eye',
    iconHide: 'eye-off',
    labelShow: 'Pokaż hasło',
    labelHide: 'Ukryj hasło',
  };
  static primary = 'target';

  init() {
    const { el } = this;
    this.input = this.options.target
      ? queryTargets(el, this.options.target)[0]
      : el.closest(WRAPPERS)?.querySelector('input[type="password"], input[data-pl-password]');
    if (!this.input) return;
    if (el.matches('button') && !el.hasAttribute('type')) el.type = 'button';
    if (!el.matches('button, a[href]')) {
      el.setAttribute('role', 'button');
      el.tabIndex = 0;
    }
    if (this.input.id) el.setAttribute('aria-controls', this.input.id);

    this.on(el, 'click', (event) => {
      event.preventDefault();
      this.toggle();
    });
    this.on(el, 'keydown', (event) => {
      if ((event.key === 'Enter' || event.key === ' ') && !el.matches('button, a[href]')) {
        event.preventDefault();
        this.toggle();
      }
    });
    // Przed wysłaniem formularza hasło wraca do postaci ukrytej.
    this.on(this.input.form, 'submit', () => this.hide());
    this.sync();
  }

  get visible() {
    return !!this.input && this.input.type !== 'password';
  }

  sync() {
    const { el, options } = this;
    const visible = this.visible;
    el.setAttribute('aria-pressed', String(visible));
    el.setAttribute('aria-label', visible ? options.labelHide : options.labelShow);
    el.classList.toggle('pl-active', visible);
    const icon = el.matches('[data-pl-icon]') ? el : $('[data-pl-icon]', el);
    if (icon) {
      const name = visible ? options.iconHide : options.iconShow;
      const instance = getInstance(icon, 'icon');
      if (instance) instance.render(name);
      else icon.setAttribute('data-pl-icon', name);
    }
  }

  show() {
    this.set(true);
  }

  hide() {
    this.set(false);
  }

  toggle() {
    this.set(!this.visible);
  }

  set(visible) {
    if (!this.input || visible === this.visible) return;
    this.input.type = visible ? 'text' : 'password';
    this.sync();
    this.emit(visible ? 'show' : 'hide', { input: this.input });
  }
}

register('password-toggle', PasswordToggle);

/**
 * Char count — licznik znaków na żywo.
 * <textarea class="pl-textarea" maxlength="160" data-pl-char-count></textarea>
 * <input class="pl-input" data-pl-char-count="max: 60; target: #licznik">
 */
class CharCount extends Component {
  static defaults = {
    max: 0, // limit; domyślnie z atrybutu maxlength (0 = sam licznik)
    target: '', // selektor elementu licznika; domyślnie .pl-form-count w polu lub nowy element
    warn: 0.9, // od jakiej części limitu licznik ostrzega
    template: '{count} / {max}',
  };
  static primary = 'max';

  init() {
    const { el, options } = this;
    this.max = Number(options.max) || (el.maxLength > 0 ? el.maxLength : 0);
    this.counter =
      (options.target && queryTargets(el, options.target)[0]) || el.closest('.pl-form-field')?.querySelector('.pl-form-count');
    if (!this.counter) {
      this.counter = document.createElement('span');
      this.counter.className = 'pl-form-help pl-form-count';
      (el.closest('.pl-form-icon, .pl-form-affix, .pl-input-group, .pl-form-floating') || el).after(this.counter);
      this.onDestroy(() => this.counter.remove());
    }
    this.counter.id ||= uid('pl-count');
    const described = el.getAttribute('aria-describedby');
    if (!described?.split(' ').includes(this.counter.id)) {
      el.setAttribute('aria-describedby', described ? `${described} ${this.counter.id}` : this.counter.id);
    }

    this.update = this.update.bind(this);
    this.on(el, 'input', this.update);
    this.on(el.form, 'reset', () => requestAnimationFrame(this.update));
    this.update();
  }

  update() {
    const { el, counter, max, options } = this;
    const count = el.value.length;
    const left = max - count;
    counter.textContent = max
      ? options.template.replace('{count}', count).replace('{max}', max).replace('{left}', left)
      : String(count);
    const over = !!max && count > max;
    const warn = !!max && !over && count >= max * options.warn;
    counter.classList.toggle('pl-form-count-warning', warn);
    counter.classList.toggle('pl-form-count-danger', over || (!!max && count === max));
    if (over !== this.over) {
      this.over = over;
      this.emit(over ? 'exceed' : 'within', { count, max });
    }
  }
}

register('char-count', CharCount);

/**
 * Form clear — przycisk czyszczący pole.
 * <div class="pl-form-affix"><input class="pl-input" placeholder="…"><button class="pl-form-clear" type="button" data-pl-form-clear aria-label="Wyczyść"></button></div>
 */
class FormClear extends Component {
  static defaults = { target: '' };
  static primary = 'target';

  init() {
    const { el } = this;
    if (el.matches('button') && !el.hasAttribute('type')) el.type = 'button';
    if (!el.hasAttribute('aria-label') && !el.textContent.trim()) el.setAttribute('aria-label', 'Wyczyść');
    this.on(el, 'click', (event) => {
      event.preventDefault();
      this.clear();
    });
  }

  get input() {
    return this.options.target
      ? queryTargets(this.el, this.options.target)[0]
      : this.el.closest(WRAPPERS)?.querySelector('input:not([type="hidden"]), textarea');
  }

  clear() {
    const { input } = this;
    if (!input || input.disabled || input.readOnly) return;
    setValue(input, '');
    input.focus();
    this.emit('clear', { input });
  }
}

register('form-clear', FormClear);

// ── Walidacja ─────────────────────────────────────────────────────────────

const plural = (n, one, few, many) => {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (n === 1) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
  return many;
};

const chars = (n) => `${n} ${plural(n, 'znak', 'znaki', 'znaków')}`;

/** Polski komunikat dla pierwszego naruszonego ograniczenia pola. */
function messageFor(field) {
  const v = field.validity;
  const custom = (key) => field.getAttribute(`data-pl-message-${key}`);
  if (v.valueMissing) {
    if (custom('required')) return custom('required');
    if (field.type === 'checkbox') return 'Zaznacz to pole, aby kontynuować.';
    if (field.type === 'radio') return 'Wybierz jedną z opcji.';
    if (field.type === 'file') return 'Wybierz plik.';
    if (field.matches('select')) return 'Wybierz pozycję z listy.';
    return 'To pole jest wymagane.';
  }
  if (v.typeMismatch) {
    if (custom('type')) return custom('type');
    if (field.type === 'email') return 'Podaj poprawny adres e-mail, np. jan@example.com.';
    if (field.type === 'url') return 'Podaj poprawny adres URL, np. https://example.com.';
    return 'Podaj wartość w poprawnym formacie.';
  }
  if (v.patternMismatch) return custom('pattern') || field.title || 'Podaj wartość w wymaganym formacie.';
  if (v.tooShort) return custom('minlength') || `Wpisz co najmniej ${chars(field.minLength)} (obecnie ${field.value.length}).`;
  if (v.tooLong) return custom('maxlength') || `Wpisz najwyżej ${chars(field.maxLength)} (obecnie ${field.value.length}).`;
  if (v.rangeUnderflow) return custom('min') || `Wartość nie może być mniejsza niż ${field.min}.`;
  if (v.rangeOverflow) return custom('max') || `Wartość nie może być większa niż ${field.max}.`;
  if (v.stepMismatch) return custom('step') || 'Podaj wartość zgodną z dozwolonym krokiem.';
  if (v.badInput) return custom('type') || 'Podaj poprawną wartość.';
  if (v.customError) return field.validationMessage;
  return '';
}

/**
 * Form validate — walidacja oparta na Constraint Validation API z polskimi komunikatami.
 * <form data-pl-form-validate> … <input class="pl-input" required> … </form>
 */
class FormValidate extends Component {
  static defaults = {
    live: true, // sprawdza pole po opuszczeniu (blur) i poprawia na bieżąco
    success: false, // oznacza poprawne pola klasą .pl-form-success
    shake: true, // potrząsa błędnymi polami przy próbie wysłania
    focus: true, // przenosi fokus do pierwszego błędnego pola
  };

  init() {
    const { el } = this;
    this.hadNoValidate = el.noValidate;
    el.noValidate = true; // wyłącza dymki przeglądarki — komunikaty rysujemy sami
    this.messages = new Map();

    this.on(el, 'submit', (event) => {
      if (this.validate()) {
        this.emit('valid', { originalEvent: event });
        return;
      }
      event.preventDefault();
      event.stopImmediatePropagation();
    });

    this.on(el, 'focusout', (event) => {
      if (!this.options.live || !this.isField(event.target)) return;
      // Pustych, nietkniętych pól nie oceniamy przy samym przejściu fokusem.
      if (!this.touched(event.target) && event.target.validity.valueMissing) return;
      this.validateField(event.target);
    });

    const revalidate = (event) => {
      const field = event.target;
      if (!this.isField(field)) return;
      if (this.marked(field) || (this.options.live && event.type === 'change')) this.validateField(field);
    };
    this.on(el, 'input', revalidate);
    this.on(el, 'change', revalidate);
    this.on(el, 'reset', () => this.reset());
    this.onDestroy(() => {
      this.reset();
      el.noValidate = this.hadNoValidate;
    });
  }

  get fields() {
    return [...this.el.elements].filter((field) => this.isField(field));
  }

  isField(field) {
    return (
      field instanceof Element &&
      field.matches('input, select, textarea') &&
      field.form === this.el &&
      field.willValidate &&
      !field.matches('[type="hidden"], [type="submit"], [type="reset"], [type="button"], [data-pl-novalidate]')
    );
  }

  touched(field) {
    return field.type === 'checkbox' || field.type === 'radio' ? field.checked : field.value !== '';
  }

  marked(field) {
    return this.group(field).some((item) => item.classList.contains('pl-form-danger'));
  }

  /** Pola radio o tej samej nazwie traktujemy jako jedną grupę. */
  group(field) {
    if (field.type === 'radio' && field.name) {
      return this.fields.filter((item) => item.type === 'radio' && item.name === field.name);
    }
    return [field];
  }

  /** Sprawdza cały formularz. Zwraca true, gdy wszystko jest poprawne. */
  validate() {
    const seen = new Set();
    const invalid = [];
    for (const field of this.fields) {
      const first = this.group(field)[0];
      if (seen.has(first)) continue;
      seen.add(first);
      if (!this.validateField(first)) invalid.push(first);
    }
    if (!invalid.length) return true;

    if (this.options.shake) {
      for (const field of invalid) {
        for (const item of this.group(field)) {
          const target = item.closest('.pl-form-affix') || item;
          target.classList.remove('pl-form-shake');
          void target.offsetWidth; // restart animacji
          target.classList.add('pl-form-shake');
          target.addEventListener('animationend', () => target.classList.remove('pl-form-shake'), { once: true });
        }
      }
    }
    if (this.options.focus) invalid[0].focus({ preventScroll: false });
    this.emit('invalid', { fields: invalid });
    return false;
  }

  /** Sprawdza jedno pole i aktualizuje jego wygląd oraz komunikat. */
  validateField(field) {
    field = $(field, this.el);
    if (!field || !this.isField(field)) return true;
    const group = this.group(field);
    const first = group[0];
    const valid = first.validity.valid;
    const message = valid ? '' : messageFor(first);

    for (const item of group) {
      const visual = item.closest('.pl-form-affix') || item;
      visual.classList.toggle('pl-form-danger', !valid);
      visual.classList.toggle('pl-form-success', valid && this.options.success && this.touched(item));
      if (valid) item.removeAttribute('aria-invalid');
      else item.setAttribute('aria-invalid', 'true');
    }
    this.setMessage(first, group, message);
    return valid;
  }

  setMessage(field, group, message) {
    let node = this.messages.get(field);
    if (!message) {
      if (node) {
        node.remove();
        this.messages.delete(field);
        for (const item of group) this.describe(item, node.id, false);
      }
      return;
    }
    if (!node) {
      node = document.createElement('div');
      node.className = 'pl-form-help pl-form-help-danger';
      node.id = uid('pl-error');
      node.setAttribute('data-pl-form-message', '');
      this.messages.set(field, node);
      const holder = field.closest('.pl-form-field');
      const last = group[group.length - 1];
      // Komunikat trafia za najbardziej zewnętrzne opakowanie kontrolki.
      const anchor =
        ['.pl-input-group', '.pl-form-checks', '.pl-form-floating', '.pl-form-icon', '.pl-form-affix', '.pl-form-check', '.pl-form-card']
          .map((selector) => last.closest(selector))
          .find((node) => node && this.el.contains(node)) || last;
      if (holder && group.length > 1) holder.append(node);
      else anchor.after(node);
      for (const item of group) this.describe(item, node.id, true);
    }
    if (node.textContent !== message) node.textContent = message;
  }

  describe(field, id, add) {
    const ids = (field.getAttribute('aria-describedby') || '').split(' ').filter((item) => item && item !== id);
    if (add) ids.push(id);
    if (ids.length) field.setAttribute('aria-describedby', ids.join(' '));
    else field.removeAttribute('aria-describedby');
  }

  /** Usuwa oznaczenia i komunikaty. */
  reset() {
    for (const [field, node] of this.messages) {
      node.remove();
      for (const item of this.group(field)) this.describe(item, node.id, false);
    }
    this.messages.clear();
    for (const node of $$('.pl-form-danger, .pl-form-success', this.el)) {
      if (node.matches('input, select, textarea, .pl-form-affix')) node.classList.remove('pl-form-danger', 'pl-form-success');
    }
    for (const field of this.fields) field.removeAttribute('aria-invalid');
  }
}

register('form-validate', FormValidate);

export { Autosize, PasswordToggle, CharCount, FormClear, FormValidate };
export default FormValidate;
