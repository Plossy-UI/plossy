import { Component, register, $ } from '../core.js';

/**
 * OTP — kod jednorazowy wpisywany w osobnych polach.
 * <div class="pl-otp" data-pl-otp="length: 6"><input type="text" name="kod"></div>
 * Pole w środku (opcjonalne) trafia do formularza z pełnym kodem; pola-kratki tworzy JS.
 */
class Otp extends Component {
  static defaults = {
    length: 6,
    type: 'numeric', // numeric | alphanumeric
    separator: 0, // kreska co N znaków (0 = brak)
    masked: false, // ukrywa znaki jak w polu hasła
    name: '', // nazwa tworzonego pola ukrytego (gdy brak własnego <input>)
    autofocus: false,
    submit: false, // po wpisaniu całego kodu wysyła formularz
    label: 'Kod jednorazowy',
  };
  static primary = 'length';

  init() {
    const { el, options } = this;
    const length = Math.max(1, Number(options.length) || 6);
    options.length = length;
    el.classList.add('pl-otp');

    // Pole źródłowe — istniejące lub utworzone.
    this.input = $('input:not(.pl-otp-box)', el);
    if (!this.input) {
      this.input = document.createElement('input');
      this.input.type = 'hidden';
      if (options.name) this.input.name = options.name;
      el.append(this.input);
      this.ownInput = true;
    } else {
      this.input.classList.add('pl-otp-value');
      this.input.tabIndex = -1;
      this.input.setAttribute('aria-hidden', 'true');
    }
    const disabled = this.input.disabled;
    const initial = this.sanitize(this.input.value || '');

    el.setAttribute('role', 'group');
    if (!el.hasAttribute('aria-label') && !el.hasAttribute('aria-labelledby')) el.setAttribute('aria-label', options.label);

    this.boxes = [];
    this.generated = [];
    let group = null;
    for (let i = 0; i < length; i++) {
      if (!group || (options.separator > 0 && i % options.separator === 0)) {
        if (group) {
          const sep = document.createElement('span');
          sep.className = 'pl-otp-separator';
          sep.setAttribute('aria-hidden', 'true');
          el.insertBefore(sep, this.input);
          this.generated.push(sep);
        }
        group = document.createElement('span');
        group.className = 'pl-otp-group';
        el.insertBefore(group, this.input);
        this.generated.push(group);
      }
      const box = document.createElement('input');
      box.className = 'pl-otp-box';
      box.type = options.masked ? 'password' : 'text';
      box.inputMode = options.type === 'numeric' ? 'numeric' : 'text';
      if (options.type === 'numeric') box.pattern = '[0-9]*';
      box.autocomplete = i === 0 ? 'one-time-code' : 'off';
      box.autocapitalize = 'characters';
      box.spellcheck = false;
      box.disabled = disabled;
      box.style.setProperty('--pl-otp-index', i);
      box.setAttribute('aria-label', `Znak ${i + 1} z ${length}`);
      group.append(box);
      this.boxes.push(box);
    }

    this.on(el, 'focusin', (event) => {
      if (event.target.classList?.contains('pl-otp-box')) event.target.select();
    });

    // Kliknięcie w puste pole przenosi do pierwszego niewypełnionego.
    this.on(el, 'pointerup', (event) => {
      const box = event.target.closest?.('.pl-otp-box');
      if (!box || box.value) return;
      const first = this.boxes.find((other) => !other.value);
      if (first && first !== box) first.focus();
    });

    this.on(el, 'beforeinput', (event) => {
      const box = event.target;
      if (!box.classList?.contains('pl-otp-box')) return;
      // Pojedynczy znak zastępuje zawartość pola.
      if (event.inputType === 'insertText' && event.data && event.data.length === 1) {
        event.preventDefault();
        const char = this.sanitize(event.data);
        if (char) this.fill(this.boxes.indexOf(box), char);
        else this.reject(box);
      }
    });

    // Autouzupełnianie z SMS, wklejanie na urządzeniach mobilnych, IME.
    this.on(el, 'input', (event) => {
      const box = event.target;
      if (!box.classList?.contains('pl-otp-box')) return;
      const index = this.boxes.indexOf(box);
      let chars = this.sanitize(box.value);
      const prev = this.prev?.[index];
      // Klawiatury ekranowe potrafią dopisać znak zamiast zastąpić poprzedni.
      if (prev && chars.length === 2) chars = chars.replace(prev, '') || prev;
      box.value = '';
      if (chars) this.fill(chars.length >= this.options.length ? 0 : index, chars);
      else this.update();
    });

    this.on(el, 'paste', (event) => {
      const box = event.target;
      if (!box.classList?.contains('pl-otp-box')) return;
      event.preventDefault();
      const chars = this.sanitize(event.clipboardData?.getData('text') || '');
      if (!chars) return this.reject(box);
      this.fill(chars.length >= this.options.length ? 0 : this.boxes.indexOf(box), chars);
    });

    this.on(el, 'keydown', (event) => {
      const box = event.target;
      if (!box.classList?.contains('pl-otp-box')) return;
      const index = this.boxes.indexOf(box);
      const go = (i) => {
        event.preventDefault();
        this.boxes[Math.min(Math.max(i, 0), this.boxes.length - 1)].focus();
      };
      switch (event.key) {
        case 'Backspace':
          event.preventDefault();
          if (box.value) {
            box.value = '';
          } else if (index > 0) {
            this.boxes[index - 1].value = '';
            this.boxes[index - 1].focus();
          }
          this.update();
          break;
        case 'Delete':
          event.preventDefault();
          // Usuwa znak i dosuwa kolejne.
          this.write(this.chars().filter((_, i) => i !== index).join(''), true);
          box.select();
          break;
        case 'ArrowLeft':
          go(index - 1);
          break;
        case 'ArrowRight':
          go(index + 1);
          break;
        case 'Home':
          go(0);
          break;
        case 'End':
          go(this.boxes.length - 1);
          break;
        case 'ArrowUp':
        case 'ArrowDown':
          event.preventDefault();
          break;
        default:
      }
    });

    this.on(this.input.form, 'reset', () => setTimeout(() => this.clear()));

    this.onDestroy(() => {
      this.generated.forEach((node) => node.remove());
      if (this.ownInput) this.input.remove();
      else this.input.classList.remove('pl-otp-value');
    });

    if (initial) this.write(initial, true);
    if (options.autofocus) this.focus();
  }

  sanitize(text) {
    const pattern = this.options.type === 'numeric' ? /[^0-9]/g : /[^0-9a-z]/gi;
    return String(text).replace(pattern, '').toUpperCase();
  }

  chars() {
    return this.boxes.map((box) => box.value);
  }

  /** Aktualny kod. */
  get value() {
    return this.chars().join('');
  }

  set value(code) {
    this.setValue(code);
  }

  get complete() {
    return this.boxes.every((box) => box.value);
  }

  /** Wpisuje znaki od pozycji `index` i przenosi fokus dalej. */
  fill(index, chars) {
    index = Math.max(0, index);
    let last = index;
    [...chars].slice(0, this.boxes.length - index).forEach((char, offset) => {
      const box = this.boxes[index + offset];
      box.value = char;
      this.pop(box);
      last = index + offset;
    });
    const next = this.boxes[Math.min(last + 1, this.boxes.length - 1)];
    if (this.el.contains(document.activeElement) || document.activeElement === document.body) {
      next.focus();
      if (last === this.boxes.length - 1) next.select();
    }
    this.update();
  }

  pop(box) {
    box.classList.remove('pl-otp-pop');
    void box.offsetWidth;
    box.classList.add('pl-otp-pop');
  }

  /** Niedozwolony znak — krótkie potrząśnięcie polem. */
  reject(box) {
    box.classList.remove('pl-otp-shake');
    void box.offsetWidth;
    box.classList.add('pl-otp-shake');
    setTimeout(() => box.classList.remove('pl-otp-shake'), 450);
  }

  write(code, silent = false) {
    const chars = [...this.sanitize(code)];
    this.boxes.forEach((box, i) => {
      box.value = chars[i] || '';
    });
    this.update(silent);
  }

  update(silent = false) {
    const value = this.value;
    this.prev = this.chars();
    this.boxes.forEach((box) => box.classList.toggle('pl-otp-filled', !!box.value));
    if (value === this.input.value) return;
    const wasComplete = this.input.value.length === this.boxes.length;
    this.input.value = value;
    if (this.el.classList.contains('pl-otp-danger') || this.el.classList.contains('pl-otp-success')) this.reset();
    if (silent) return;
    this.input.dispatchEvent(new Event('input', { bubbles: false }));
    this.emit('change', { value, complete: this.complete });
    if (this.complete && !(wasComplete && value === this.lastComplete)) {
      this.lastComplete = value;
      this.emit('complete', { value });
      if (this.options.submit) this.input.form?.requestSubmit?.();
    }
  }

  /** Ustawia kod programowo. */
  setValue(code) {
    this.write(code ?? '');
  }

  /** Czyści pola (i stan błędu / sukcesu). */
  clear(focus = false) {
    this.reset();
    this.lastComplete = null;
    this.write('');
    if (focus) this.focus();
  }

  /** Fokus na pierwszym pustym polu. */
  focus() {
    (this.boxes.find((box) => !box.value) || this.boxes[this.boxes.length - 1])?.focus();
  }

  /** Stan błędu z potrząśnięciem; `clear: true` czyści kod. */
  error({ clear = false } = {}) {
    const { el } = this;
    el.classList.remove('pl-otp-success', 'pl-otp-shake');
    void el.offsetWidth;
    el.classList.add('pl-otp-danger', 'pl-otp-shake');
    this.boxes.forEach((box) => box.setAttribute('aria-invalid', 'true'));
    setTimeout(() => el.classList.remove('pl-otp-shake'), 450);
    if (clear) {
      this.lastComplete = null;
      this.boxes.forEach((box) => {
        box.value = '';
        box.classList.remove('pl-otp-filled');
      });
      this.input.value = '';
      this.boxes[0].focus();
    }
  }

  /** Stan sukcesu (fala po polach). */
  success() {
    this.el.classList.remove('pl-otp-danger', 'pl-otp-shake');
    this.el.classList.add('pl-otp-success');
    this.boxes.forEach((box) => {
      box.removeAttribute('aria-invalid');
      box.classList.remove('pl-otp-pop');
    });
  }

  /** Usuwa stan błędu / sukcesu. */
  reset() {
    this.el.classList.remove('pl-otp-danger', 'pl-otp-success', 'pl-otp-shake');
    this.boxes.forEach((box) => box.removeAttribute('aria-invalid'));
  }

  /** Włącza / wyłącza pola. */
  disable(state = true) {
    this.boxes.forEach((box) => {
      box.disabled = state;
    });
    this.input.disabled = state;
  }
}

register('otp', Otp);
export default Otp;
