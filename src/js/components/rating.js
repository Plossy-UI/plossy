import { Component, register, $, uid, clamp } from '../core.js';

/**
 * Rating — wybór oceny gwiazdkami.
 * <div class="pl-rating" data-pl-rating="value: 3; name: ocena"></div>
 * Gwiazdki to grupa pól radio (strzałki, formularze i czytniki ekranu działają natywnie).
 * Sam odczyt nie wymaga JS: <span class="pl-rating" style="--pl-rating-value: 4.5"></span>
 */
class Rating extends Component {
  static defaults = {
    value: 0,
    max: 5,
    name: '', // nazwa pól radio (wartość trafia do formularza)
    readonly: false,
    clearable: true, // ponowne kliknięcie wybranej gwiazdki zeruje ocenę
    label: 'Ocena',
    star: 'gwiazdka|gwiazdki|gwiazdek', // odmiana do etykiet ARIA
  };
  static primary = 'value';

  init() {
    const { el, options } = this;
    const max = Math.max(1, Math.round(Number(options.max)) || 5);
    options.max = max;
    this.current = 0;
    el.classList.add('pl-rating');
    el.classList.toggle('pl-rating-readonly', !!options.readonly);
    el.style.setProperty('--pl-rating-max', max);
    el.setAttribute('role', 'radiogroup');
    if (!el.hasAttribute('aria-label') && !el.hasAttribute('aria-labelledby')) el.setAttribute('aria-label', options.label);

    const name = options.name || uid('pl-rating');
    const make = (value) => {
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = name;
      input.value = String(value);
      input.className = value ? 'pl-rating-star' : 'pl-rating-zero';
      input.setAttribute('aria-label', value ? `${value} ${this.plural(value)}` : 'Brak oceny');
      if (options.readonly) input.disabled = true;
      return input;
    };
    this.zero = make(0);
    this.stars = Array.from({ length: max }, (_, i) => make(i + 1));
    el.append(this.zero, ...this.stars);
    this.onDestroy(() => {
      [this.zero, ...this.stars].forEach((node) => node.remove());
      el.classList.remove('pl-rating-readonly');
    });

    this.on(el, 'change', (event) => {
      if (!event.target.matches('input[type="radio"]')) return;
      this.set(Number(event.target.value), true);
    });
    // Ponowne kliknięcie zaznaczonej gwiazdki czyści ocenę.
    this.on(el, 'click', (event) => {
      const star = event.target.closest('.pl-rating-star');
      if (!star || !options.clearable || options.readonly) return;
      // click poprzedza change, więc zgodność z bieżącą wartością oznacza ponowne kliknięcie.
      if (Number(star.value) === this.current) this.set(0, true);
    });
    this.on(el, 'pointerover', (event) => {
      const star = event.target.closest('.pl-rating-star');
      if (star && !options.readonly) this.paint(Number(star.value), true);
    });
    this.on(el, 'pointerleave', () => this.paint(this.current));

    this.set(clamp(Math.round(Number(options.value)) || 0, 0, max));
  }

  plural(n) {
    const [one, few, many] = String(this.options.star).split('|');
    if (n === 1) return one;
    const d = n % 10;
    const h = n % 100;
    return d >= 2 && d <= 4 && !(h >= 12 && h <= 14) ? few || one : many || few || one;
  }

  /** Koloruje gwiazdki do podanej wartości (preview = podgląd przy najechaniu). */
  paint(value, preview = false) {
    this.stars.forEach((star, i) => {
      const on = i < value;
      star.classList.toggle('pl-active', on && !(preview && i >= this.current));
      star.classList.toggle('pl-rating-preview', preview && on && i >= this.current);
    });
  }

  get value() {
    return this.current;
  }

  set value(value) {
    this.set(value);
  }

  set(value, user = false) {
    const next = clamp(Math.round(Number(value)) || 0, 0, this.options.max);
    const changed = next !== this.current;
    this.current = next;
    const target = next ? this.stars[next - 1] : this.zero;
    target.checked = true;
    this.el.style.setProperty('--pl-rating-value', next);
    this.paint(next);
    if (changed && user) {
      this.stars.forEach((star, i) => {
        star.classList.remove('pl-rating-pop');
        if (i < next) {
          star.style.animationDelay = `${i * 35}ms`;
          void star.offsetWidth;
          star.classList.add('pl-rating-pop');
        }
      });
    }
    if (changed) this.emit('change', { value: next });
  }

  clear() {
    this.set(0);
  }

  disable(state = true) {
    this.el.classList.toggle('pl-disabled', !!state);
    [this.zero, ...this.stars].forEach((input) => (input.disabled = !!state || !!this.options.readonly));
  }
}

register('rating', Rating);
export default Rating;
