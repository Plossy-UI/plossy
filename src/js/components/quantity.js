import { Component, register, $, clamp } from '../core.js';

/**
 * Quantity — licznik ilości z przyciskami − / +.
 * <div class="pl-quantity" data-pl-quantity><input type="number" name="ilosc" value="1" min="1" max="10"></div>
 * Zakres i krok bierze z atrybutów pola (min / max / step) albo z opcji. Przyciski tworzy JS.
 */
class Quantity extends Component {
  static defaults = {
    min: null,
    max: null,
    step: null,
    repeat: true, // przytrzymanie przycisku powtarza zmianę
    minusLabel: 'Mniej',
    plusLabel: 'Więcej',
  };

  init() {
    const { el, options } = this;
    el.classList.add('pl-quantity');
    this.input = $('input', el);
    if (!this.input) {
      this.input = document.createElement('input');
      this.input.type = 'number';
      this.input.value = '1';
      el.append(this.input);
      this.ownInput = true;
    }
    this.input.classList.add('pl-quantity-input');
    if (!this.input.hasAttribute('inputmode')) this.input.inputMode = 'numeric';
    if (!this.input.hasAttribute('aria-label') && !this.input.labels?.length) this.input.setAttribute('aria-label', 'Ilość');

    const make = (dir) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `pl-quantity-button ${dir < 0 ? 'pl-quantity-minus' : 'pl-quantity-plus'}`;
      button.setAttribute('aria-label', dir < 0 ? options.minusLabel : options.plusLabel);
      button.tabIndex = -1; // pole obsługuje strzałki; przyciski są dla myszy i dotyku
      this.on(button, 'pointerdown', (event) => {
        if (event.button) return;
        event.preventDefault();
        this.input.focus({ preventScroll: true });
        this.step(dir, true);
        if (!options.repeat) return;
        this.stopRepeat();
        this.timer = setTimeout(() => {
          this.timer = setInterval(() => this.step(dir, true), 70);
        }, 420);
      });
      // Aktywacja z klawiatury / technologii asystujących (bez pointerdown).
      this.on(button, 'click', (event) => {
        if (event.detail === 0) this.step(dir, true);
      });
      return button;
    };
    this.minus = make(-1);
    this.plus = make(1);
    this.input.before(this.minus);
    this.input.after(this.plus);

    this.on(document, 'pointerup', () => this.stopRepeat());
    this.on(document, 'pointercancel', () => this.stopRepeat());
    this.on(this.input, 'keydown', (event) => {
      if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return;
      event.preventDefault();
      this.step(event.key === 'ArrowUp' ? 1 : -1, true);
    });
    this.on(this.input, 'input', () => this.sync());
    this.on(this.input, 'change', (event) => {
      this.set(this.input.value, true, true);
    });

    this.onDestroy(() => {
      this.stopRepeat();
      this.minus.remove();
      this.plus.remove();
      this.input.classList.remove('pl-quantity-input', 'pl-quantity-up', 'pl-quantity-down');
      if (this.ownInput) this.input.remove();
    });

    this.last = this.parse(this.input.value);
    this.set(this.last);
  }

  limit(name, fallback) {
    const option = this.options[name];
    const raw = option !== null && option !== '' ? option : this.input.getAttribute(name);
    const number = Number(raw);
    return raw === null || raw === '' || Number.isNaN(number) ? fallback : number;
  }

  get min() {
    return this.limit('min', 0);
  }

  get max() {
    return this.limit('max', Infinity);
  }

  get stepSize() {
    return this.limit('step', 1) || 1;
  }

  parse(value) {
    const number = Number(String(value).replace(',', '.'));
    return Number.isFinite(number) ? number : this.min;
  }

  stopRepeat() {
    clearTimeout(this.timer);
    clearInterval(this.timer);
    this.timer = null;
  }

  /** Blokuje przyciski na krańcach zakresu. */
  sync() {
    const value = this.parse(this.input.value);
    const off = this.input.disabled;
    this.minus.disabled = off || value <= this.min;
    this.plus.disabled = off || value >= this.max;
    if (this.minus.disabled || this.plus.disabled) this.stopRepeat();
  }

  get value() {
    return this.last;
  }

  set value(value) {
    this.set(value);
  }

  set(value, user = false, silentAnimation = false) {
    const step = this.stepSize;
    const decimals = (String(step).split('.')[1] || '').length;
    const next = Number(clamp(this.parse(value), this.min, this.max).toFixed(decimals));
    const previous = this.last;
    this.last = next;
    this.input.value = String(next);
    this.sync();
    if (next === previous) return;
    if (user && !silentAnimation) {
      const cls = next > previous ? 'pl-quantity-up' : 'pl-quantity-down';
      this.input.classList.remove('pl-quantity-up', 'pl-quantity-down');
      void this.input.offsetWidth;
      this.input.classList.add(cls);
    }
    if (user) {
      this.input.dispatchEvent(new Event('input', { bubbles: true }));
      this.emit('change', { value: next, previous });
    }
  }

  step(direction = 1, user = false) {
    this.set(this.last + direction * this.stepSize, user);
  }

  disable(state = true) {
    this.input.disabled = !!state;
    this.el.classList.toggle('pl-disabled', !!state);
    this.sync();
  }
}

register('quantity', Quantity);
export default Quantity;
