import { Component, register, prefersReducedMotion } from '../core.js';

/**
 * Alert — komunikat z animowanym zamykaniem.
 * <div class="pl-alert pl-alert-success" data-pl-alert>
 *   <div class="pl-alert-body">…</div>
 *   <button class="pl-close pl-alert-close" type="button" aria-label="Zamknij"></button>
 * </div>
 */
class Alert extends Component {
  static defaults = {
    duration: 320, // czas animacji zamykania (ms)
    timeout: 0, // automatyczne zamknięcie po czasie (ms); 0 = wyłączone
    remove: true, // usuwa element z DOM po zamknięciu (false = tylko `hidden`)
    selClose: '.pl-alert-close',
  };

  init() {
    this.closing = false;
    this.timer = null;

    if (!this.el.hasAttribute('role')) {
      const urgent = this.el.matches('.pl-alert-danger, .pl-alert-warning');
      this.el.setAttribute('role', urgent ? 'alert' : 'status');
    }

    this.on(this.el, 'click', (event) => {
      const button = event.target.closest(this.options.selClose);
      if (!button || button.closest('[data-pl-alert]') !== this.el) return;
      event.preventDefault();
      this.close();
    });

    if (this.options.timeout > 0) {
      this.start();
      // Najechanie lub fokus wstrzymuje odliczanie.
      this.on(this.el, 'pointerenter', () => this.stop());
      this.on(this.el, 'pointerleave', () => this.start());
      this.on(this.el, 'focusin', () => this.stop());
      this.on(this.el, 'focusout', () => this.start());
    }

    this.onDestroy(() => this.stop());
  }

  start() {
    this.stop();
    if (this.options.timeout > 0 && !this.closing) {
      this.timer = setTimeout(() => this.close(), this.options.timeout);
    }
  }

  stop() {
    clearTimeout(this.timer);
    this.timer = null;
  }

  /** Zamyka alert: zanik + zwinięcie wysokości, potem usunięcie z DOM. */
  async close() {
    if (this.closing || this.el.hidden) return;
    if (!this.emit('beforehide', {}, true)) return;
    this.closing = true;
    this.stop();
    this.emit('hide');

    const { el } = this;
    const duration = prefersReducedMotion() ? 0 : this.options.duration;

    if (duration && typeof el.animate === 'function') {
      const cs = getComputedStyle(el);
      el.classList.add('pl-alert-leave');
      el.style.overflow = 'hidden';
      const from = {
        height: `${el.offsetHeight}px`,
        paddingTop: cs.paddingTop,
        paddingBottom: cs.paddingBottom,
        marginTop: cs.marginTop,
        marginBottom: cs.marginBottom,
        borderTopWidth: cs.borderTopWidth,
        borderBottomWidth: cs.borderBottomWidth,
        opacity: 1,
        transform: 'scale(1)',
      };
      // Najpierw zanik, potem zwinięcie — sąsiednie elementy płynnie się dosuwają.
      const faded = { ...from, opacity: 0, transform: 'scale(0.97)', offset: 0.45 };
      const to = {
        height: '0px',
        paddingTop: '0px',
        paddingBottom: '0px',
        marginTop: '0px',
        marginBottom: '0px',
        borderTopWidth: '0px',
        borderBottomWidth: '0px',
        opacity: 0,
        transform: 'scale(0.97)',
      };
      try {
        await el.animate([from, faded, to], { duration, easing: 'cubic-bezier(0.33, 0.5, 0.2, 1)' }).finished;
      } catch {
        /* animacja przerwana */
      }
    }

    el.hidden = true;
    el.classList.remove('pl-alert-leave');
    el.style.overflow = '';
    this.closing = false;
    this.emit('hidden');

    if (this.options.remove) {
      const parent = el.parentNode;
      this.destroy();
      parent?.removeChild(el);
    }
  }

  /** Alias close() — spójność z resztą biblioteki. */
  hide() {
    return this.close();
  }
}

register('alert', Alert);
export default Alert;
