import { Component, register, clamp, rafThrottle, prefersReducedMotion } from '../core.js';

/**
 * Totop — płynny powrót na górę strony.
 * <a href="#" class="pl-totop" data-pl-totop></a>
 * <a href="#" class="pl-totop pl-totop-fixed pl-totop-progress" data-pl-totop="offset: 400"></a>
 *
 * Wariant .pl-totop-fixed dostaje klasę .pl-active po przewinięciu poza `offset`.
 * Zmienna --pl-totop-progress (0…1) opisuje postęp przewijania strony.
 */
class Totop extends Component {
  static defaults = {
    offset: 400, // po ilu pikselach przewinięcia przycisk staje się aktywny
    target: '', // selektor elementu, do którego wracamy (domyślnie: góra strony / cel z href)
    focus: true, // po przewinięciu przenieś fokus na cel (dostępność)
    cls: 'pl-active',
  };
  static primary = 'offset';

  init() {
    const { el } = this;
    this.active = null;

    if (!el.hasAttribute('aria-label') && !el.textContent.trim()) {
      el.setAttribute('aria-label', 'Wróć na górę strony');
    }
    // Element inny niż link / przycisk musi być osiągalny z klawiatury.
    if (!el.matches('a[href], button')) {
      if (!el.hasAttribute('role')) el.setAttribute('role', 'button');
      if (!el.hasAttribute('tabindex')) el.tabIndex = 0;
      this.on(el, 'keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          this.scroll();
        }
      });
    }

    this.on(el, 'click', (event) => {
      event.preventDefault();
      this.scroll();
    });

    this.update = rafThrottle(() => this.refresh());
    this.on(window, 'scroll', this.update, { passive: true });
    this.on(window, 'resize', this.update, { passive: true });
    this.refresh();
  }

  /** Element docelowy (opcja `target` lub kotwica z href) albo null = góra strony. */
  get target() {
    const { target } = this.options;
    const hash = this.el.getAttribute('href');
    const selector = target || (hash && hash.length > 1 && hash.startsWith('#') ? hash : '');
    if (!selector) return null;
    try {
      return document.querySelector(selector);
    } catch {
      return null;
    }
  }

  /** Aktualizuje widoczność (.pl-active) i postęp przewijania. */
  refresh() {
    const root = document.scrollingElement || document.documentElement;
    const top = window.scrollY;
    const max = Math.max(root.scrollHeight - window.innerHeight, 0);
    const progress = max ? clamp(top / max, 0, 1) : 0;
    this.el.style.setProperty('--pl-totop-progress', progress.toFixed(4));

    const active = top > this.options.offset;
    if (active !== this.active) {
      this.active = active;
      this.el.classList.toggle(this.options.cls, active);
      this.emit(active ? 'show' : 'hide');
    }
  }

  /** Przewija do celu. Zdarzenie `pl:beforescroll` można anulować. */
  scroll() {
    if (!this.emit('beforescroll', {}, true)) return;
    const target = this.target;
    const behavior = prefersReducedMotion() ? 'auto' : 'smooth';

    if (target) target.scrollIntoView({ behavior, block: 'start' });
    else window.scrollTo({ top: 0, left: 0, behavior });

    if (this.options.focus) {
      // Fokus wraca na początek dokumentu, żeby Tab ruszał od góry.
      const node = target || document.body;
      const had = node.hasAttribute('tabindex');
      if (!had) node.setAttribute('tabindex', '-1');
      // <body> nie powinien pokazywać pierścienia fokusu wokół całej strony.
      const quiet = node === document.body;
      if (quiet) node.style.outline = 'none';
      node.focus({ preventScroll: true });
      node.addEventListener(
        'blur',
        () => {
          if (!had) node.removeAttribute('tabindex');
          if (quiet) node.style.outline = '';
        },
        { once: true },
      );
    }
    this.emit('scroll', { target });
  }

  destroy() {
    this.el.classList.remove(this.options.cls);
    super.destroy();
  }
}

register('totop', Totop);
export default Totop;
