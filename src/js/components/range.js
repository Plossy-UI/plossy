import { Component, register, $$, clamp, queryTargets } from '../core.js';

const numberFormat = typeof Intl !== 'undefined' ? new Intl.NumberFormat('pl-PL', { maximumFractionDigits: 6 }) : null;

/**
 * Range — suwak z wypełnieniem, dymkiem wartości i podziałką.
 * <input class="pl-range" type="range" min="0" max="100" value="40" data-pl-range>
 * <input class="pl-range" type="range" data-pl-range="tooltip: true; suffix: ' %'; ticks: 5">
 *
 * Zakres min–max (dwa pola na jednym torze):
 * <div class="pl-range-dual" data-pl-range="dual: true; tooltip: true">
 *   <input class="pl-range" type="range" min="0" max="500" value="120" aria-label="Od">
 *   <input class="pl-range" type="range" min="0" max="500" value="380" aria-label="Do">
 * </div>
 */
class Range extends Component {
  static defaults = {
    dual: false, // dwa kciuki (element to opakowanie z dwoma polami)
    tooltip: false, // dymek z wartością: true (przy hoverze / fokusie) albo 'always'
    ticks: 0, // liczba znaczników podziałki generowanych pod suwakiem
    gap: 0, // minimalny odstęp między kciukami (dual)
    prefix: '',
    suffix: '',
    output: '', // selektor elementu, do którego trafia sformatowana wartość
  };

  init() {
    const { el, options } = this;
    const single = el.matches('input');
    this.inputs = single ? [el] : $$('input[type="range"]', el).slice(0, 2);
    if (!this.inputs.length) return;
    this.dual = !single && this.inputs.length === 2 && (options.dual || el.classList.contains('pl-range-dual'));
    if (!this.dual) this.inputs = [this.inputs[0]];
    if (this.dual) el.classList.add('pl-range-dual');

    this.outputs = options.output ? queryTargets(el, options.output) : [];
    this.bubbles = [];
    this.ticks = null;
    this.created = [];

    if (options.tooltip) this.buildBubbles();
    if (options.ticks > 1) this.buildTicks();
    this.ticks ||= this.host?.querySelector('.pl-range-ticks') || (this.dual && el.nextElementSibling?.matches('.pl-range-ticks') ? el.nextElementSibling : null);

    this.inputs.forEach((input, index) => {
      this.on(input, 'input', () => {
        if (this.dual) this.constrain(index);
        this.update();
        this.emit('input', this.detail());
      });
      this.on(input, 'change', () => this.emit('change', this.detail()));
    });
    this.on(this.inputs[0].form, 'reset', () => requestAnimationFrame(() => this.update()));

    if (this.dual) {
      this.constrain(1);
      this.on(el, 'pointerdown', (event) => this.jump(event));
      this.on(el, 'pointermove', (event) => {
        if (!event.buttons) this.raise(this.nearest(this.ratioAt(event.clientX)));
      });
    }

    this.onDestroy(() => {
      this.created.forEach((node) => node.remove());
      for (const input of this.inputs) {
        input.style.removeProperty('--pl-range-ratio');
        input.style.removeProperty('--pl-range-progress');
        input.style.zIndex = '';
      }
    });
    this.update();
  }

  /** Element, w którym leżą dymki (opakowanie suwaka). Tworzony przy pierwszym użyciu. */
  get host() {
    if (this._host) return this._host;
    const { el } = this;
    if (!el.matches('input')) return (this._host = el);
    if (el.parentElement?.classList.contains('pl-range-wrap')) return (this._host = el.parentElement);
    return null;
  }

  ensureHost() {
    if (this.host) return this.host;
    const { el } = this;
    const wrap = document.createElement('div');
    wrap.className = 'pl-range-wrap';
    el.before(wrap);
    wrap.append(el);
    return (this._host = wrap);
  }

  buildBubbles() {
    const host = this.ensureHost();
    const always = this.options.tooltip === 'always';
    this.bubbles = this.inputs.map(() => {
      const bubble = document.createElement('output');
      bubble.className = 'pl-range-bubble';
      bubble.setAttribute('aria-hidden', 'true');
      if (always) bubble.classList.add('pl-range-bubble-always');
      host.append(bubble);
      this.created.push(bubble);
      return bubble;
    });
  }

  buildTicks() {
    const host = this.ensureHost();
    const { min, max } = this.bounds();
    const count = Math.round(this.options.ticks);
    const ticks = document.createElement('div');
    ticks.className = 'pl-range-ticks';
    ticks.setAttribute('aria-hidden', 'true');
    for (let i = 0; i < count; i++) {
      const value = this.snap(min + ((max - min) * i) / (count - 1));
      const tick = document.createElement('span');
      tick.dataset.value = value;
      tick.textContent = this.format(value);
      ticks.append(tick);
    }
    if (this.dual) host.after(ticks);
    else host.append(ticks);
    this.created.push(ticks);
    this.ticks = ticks;
  }

  bounds(input = this.inputs[0]) {
    const min = input.min === '' ? 0 : Number(input.min);
    const max = input.max === '' ? 100 : Number(input.max);
    const step = input.step === 'any' ? 0 : Number(input.step) || 1;
    return { min, max, step };
  }

  snap(value, input = this.inputs[0]) {
    const { min, max, step } = this.bounds(input);
    if (step) value = Math.round((value - min) / step) * step + min;
    return clamp(Number(value.toFixed(6)), min, max);
  }

  ratio(input) {
    const { min, max } = this.bounds(input);
    return max > min ? clamp((Number(input.value) - min) / (max - min), 0, 1) : 0;
  }

  format(value) {
    const text = numberFormat ? numberFormat.format(value) : String(value);
    return `${this.options.prefix}${text}${this.options.suffix}`;
  }

  /** Wartość (liczba) albo para [od, do] w trybie dual. */
  get value() {
    const values = this.inputs.map((input) => Number(input.value));
    return this.dual ? values : values[0];
  }

  detail() {
    const values = this.inputs.map((input) => Number(input.value));
    return { value: this.dual ? values : values[0], values };
  }

  /** Ustawia wartość: liczba albo [od, do]. */
  set(value) {
    const values = Array.isArray(value) ? value : [value];
    this.inputs.forEach((input, index) => {
      if (values[index] !== undefined && values[index] !== null) input.value = values[index];
    });
    if (this.dual) this.constrain(1);
    this.update();
    this.emit('change', this.detail());
  }

  /** Pilnuje, by kciuk „od" nie minął kciuka „do" (z zachowaniem odstępu gap). */
  constrain(moved) {
    const [low, high] = this.inputs;
    const gap = Math.max(0, Number(this.options.gap) || 0);
    if (Number(low.value) > Number(high.value) - gap) {
      if (moved === 0) low.value = Number(high.value) - gap;
      else high.value = Number(low.value) + gap;
      // Gdy zabrakło miejsca przy krawędzi, ustąpić musi drugi kciuk.
      if (Number(low.value) > Number(high.value) - gap) {
        if (moved === 0) high.value = Number(low.value) + gap;
        else low.value = Number(high.value) - gap;
      }
    }
    this.raise(moved);
  }

  /** Wysuwa wskazany kciuk na wierzch (ważne, gdy oba się pokrywają). */
  raise(index) {
    if (!this.dual) return;
    this.inputs.forEach((input, i) => {
      input.style.zIndex = i === index ? '2' : '';
    });
  }

  thumbSize() {
    const raw = getComputedStyle(this.inputs[0]).getPropertyValue('--pl-range-thumb').trim();
    const number = parseFloat(raw);
    if (Number.isNaN(number)) return 18;
    return raw.endsWith('rem') ? number * parseFloat(getComputedStyle(document.documentElement).fontSize) : number;
  }

  ratioAt(clientX) {
    const rect = this.el.getBoundingClientRect();
    const thumb = this.thumbSize();
    const usable = rect.width - thumb;
    return usable > 0 ? clamp((clientX - rect.left - thumb / 2) / usable, 0, 1) : 0;
  }

  nearest(ratio) {
    const [a, b] = this.inputs.map((input) => this.ratio(input));
    if (a === b) return ratio < a ? 0 : 1;
    return Math.abs(ratio - a) <= Math.abs(ratio - b) ? 0 : 1;
  }

  /** Kliknięcie w tor (dual) przesuwa bliższy kciuk. */
  jump(event) {
    if (event.target !== this.el || event.button > 0) return;
    const ratio = this.ratioAt(event.clientX);
    const index = this.nearest(ratio);
    const input = this.inputs[index];
    if (input.disabled) return;
    event.preventDefault();
    const { min, max } = this.bounds(input);
    input.value = this.snap(min + ratio * (max - min), input);
    input.focus({ preventScroll: true });
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
  }

  /** Synchronizuje zmienne CSS, dymki, podziałkę i elementy wyjściowe. */
  update() {
    if (!this.inputs?.length) return;
    const ratios = this.inputs.map((input) => this.ratio(input));
    const values = this.inputs.map((input) => Number(input.value));
    const texts = values.map((value) => this.format(value));
    const decorated = this.options.prefix || this.options.suffix;

    this.inputs.forEach((input, index) => {
      input.style.setProperty('--pl-range-ratio', ratios[index].toFixed(4));
      input.style.setProperty('--pl-range-progress', `${(ratios[index] * 100).toFixed(2)}%`);
      if (decorated) input.setAttribute('aria-valuetext', texts[index]);
      const bubble = this.bubbles[index];
      if (bubble) {
        bubble.style.setProperty('--pl-range-ratio', ratios[index].toFixed(4));
        bubble.textContent = texts[index];
      }
    });

    if (this.dual) {
      this.el.style.setProperty('--pl-range-start', ratios[0].toFixed(4));
      this.el.style.setProperty('--pl-range-end', ratios[1].toFixed(4));
    }

    if (this.ticks) {
      for (const tick of this.ticks.children) {
        if (tick.dataset.value !== undefined) tick.classList.toggle('pl-active', values.includes(Number(tick.dataset.value)));
      }
    }

    const text = this.dual ? `${texts[0]} – ${texts[1]}` : texts[0];
    this.outputs.forEach((node, index) => {
      // Dwa elementy wyjściowe w trybie dual dostają osobno „od" i „do".
      node.textContent = this.dual && this.outputs.length > 1 ? texts[index] ?? '' : text;
    });
  }
}

register('range', Range);
export default Range;
