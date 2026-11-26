import { Component, register, prefersReducedMotion } from '../core.js';

const EASINGS = {
  linear: (t) => t,
  'ease-out': (t) => 1 - (1 - t) ** 4,
  'ease-in-out': (t) => (t < 0.5 ? 8 * t ** 4 : 1 - (-2 * t + 2) ** 4 / 2),
};

/**
 * Counter
 * <span data-pl-counter="12500"></span>
 * <span data-pl-counter="to: 98.6; decimals: 1; suffix: %"></span>
 */
class Counter extends Component {
  static defaults = {
    to: null, // wartość końcowa; domyślnie liczba z treści elementu
    from: 0,
    duration: 1600,
    delay: 0,
    decimals: 0,
    separator: null, // separator tysięcy; domyślnie wg locale (pl-PL: spacja niełamiąca)
    decimal: null, // separator dziesiętny; domyślnie wg locale (pl-PL: przecinek)
    prefix: '',
    suffix: '',
    locale: 'pl-PL',
    easing: 'ease-out', // linear | ease-out | ease-in-out
    once: true, // animuj tylko przy pierwszym wejściu w widok
    autostart: true, // start po wejściu w widok
  };

  static primary = 'to';

  init() {
    const { el, options } = this;
    this.frame = 0;
    this.timer = 0;
    this.done = false;

    const text = el.textContent.trim();
    if (options.to === null || options.to === '') {
      // „12 500,5" → 12500.5
      const parsed = parseFloat(text.replace(/[^\d,.-]/g, '').replace(/\.(?=\d{3}(\D|$))/g, '').replace(',', '.'));
      this.to = Number.isNaN(parsed) ? 0 : parsed;
    } else {
      this.to = Number(options.to) || 0;
    }
    this.from = Number(options.from) || 0;

    try {
      this.formatter = new Intl.NumberFormat(options.locale || 'pl-PL', {
        minimumFractionDigits: options.decimals,
        maximumFractionDigits: options.decimals,
        useGrouping: 'always',
      });
    } catch {
      this.formatter = new Intl.NumberFormat('pl-PL', { minimumFractionDigits: options.decimals, maximumFractionDigits: options.decimals });
    }

    // Czytniki ekranu dostają od razu wartość końcową; animowana część jest dla nich ukryta.
    this.visual = document.createElement('span');
    this.visual.setAttribute('aria-hidden', 'true');
    this.label = document.createElement('span');
    this.label.textContent = this.format(this.to);
    Object.assign(this.label.style, {
      position: 'absolute',
      width: '1px',
      height: '1px',
      overflow: 'hidden',
      clipPath: 'inset(50%)',
      whiteSpace: 'nowrap',
    });
    el.textContent = '';
    el.append(this.visual, this.label);
    el.style.fontVariantNumeric = 'tabular-nums';

    this.render(this.from);

    if (options.autostart && typeof IntersectionObserver === 'function') {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            if (options.once) observer.disconnect();
            this.start();
          } else if (!options.once) {
            this.reset();
          }
        },
        { threshold: 0.2 },
      );
      observer.observe(el);
      this.onDestroy(() => observer.disconnect());
    }

    this.onDestroy(() => this.stop());
  }

  format(value) {
    const { separator, decimal, prefix, suffix } = this.options;
    let text;
    if (separator === null && decimal === null) text = this.formatter.format(value);
    else {
      text = this.formatter
        .formatToParts(value)
        .map((part) => {
          if (part.type === 'group' && separator !== null) return String(separator);
          if (part.type === 'decimal' && decimal !== null) return String(decimal);
          return part.value;
        })
        .join('');
    }
    return `${prefix ?? ''}${text}${suffix ?? ''}`;
  }

  render(value) {
    this.visual.textContent = this.format(value);
  }

  stop() {
    cancelAnimationFrame(this.frame);
    clearTimeout(this.timer);
    this.frame = 0;
    this.timer = 0;
  }

  /** Wraca do wartości początkowej. */
  reset() {
    this.stop();
    this.done = false;
    this.render(this.from);
  }

  /** Uruchamia (lub restartuje) odliczanie; opcjonalnie do nowej wartości. */
  start(to) {
    const { options } = this;
    if (typeof to === 'number') {
      this.to = to;
      this.label.textContent = this.format(to);
    }
    this.stop();
    this.emit('start', { value: this.from });

    const finish = () => {
      this.render(this.to);
      this.done = true;
      this.emit('complete', { value: this.to });
    };

    const duration = Number(options.duration) || 0;
    if (!duration || prefersReducedMotion()) {
      finish();
      return;
    }

    const ease = EASINGS[options.easing] || EASINGS['ease-out'];
    const { from, to: end } = this;
    const run = () => {
      const startTime = performance.now();
      const step = (now) => {
        const t = Math.min((now - startTime) / duration, 1);
        if (t < 1) {
          this.render(from + (end - from) * ease(t));
          this.frame = requestAnimationFrame(step);
        } else {
          this.frame = 0;
          finish();
        }
      };
      this.frame = requestAnimationFrame(step);
    };
    if (options.delay) this.timer = setTimeout(run, Number(options.delay));
    else run();
  }
}

register('counter', Counter);
export default Counter;
