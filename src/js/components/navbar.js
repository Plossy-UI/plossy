import { Component, register, $$, uid, toggleHeight, rafThrottle } from '../core.js';

/**
 * Navbar — reakcja paska na przewijanie.
 * <header class="pl-navbar-container pl-navbar-sticky" data-pl-navbar="hide: true">
 *   <nav class="pl-navbar">…</nav>
 * </header>
 *
 * Po przekroczeniu `offset` dodaje klasę `pl-navbar-scrolled` (cień + niższy pasek);
 * z opcją `hide` chowa pasek przy przewijaniu w dół i pokazuje przy przewijaniu w górę.
 */
class Navbar extends Component {
  static defaults = {
    offset: 16, // po ilu px przewinięcia pasek dostaje klasę `cls`
    cls: 'pl-navbar-scrolled',
    hide: false, // chowaj przy przewijaniu w dół
    hideOffset: 240, // od ilu px przewinięcia wolno chować
    tolerance: 6, // minimalny ruch (px), który zmienia stan
    container: null, // selektor przewijanego kontenera (domyślnie okno)
  };

  init() {
    const { container } = this.options;
    this.scroller = (container && (this.el.closest(container) || document.querySelector(container))) || null;
    this.last = this.position;
    this.scrolled = false;
    this.hidden = false;

    const update = rafThrottle(() => this.update());
    this.on(this.scroller || window, 'scroll', update, { passive: true });
    // Fokus z klawiatury wewnątrz schowanego paska — pokaż go.
    this.on(this.el, 'focusin', () => this.show());
    this.onDestroy(() => this.el.classList.remove(this.options.cls, 'pl-navbar-hidden'));
    this.update();
  }

  get position() {
    return Math.max(0, this.scroller ? this.scroller.scrollTop : window.scrollY);
  }

  /** Czy w pasku jest coś otwartego (menu, hamburger) — wtedy go nie chowamy. */
  get busy() {
    return Boolean(this.el.querySelector('[aria-expanded="true"], .pl-navbar-toggle.pl-open'));
  }

  update() {
    const { offset, cls, hide, hideOffset, tolerance } = this.options;
    const y = this.position;

    const scrolled = y > offset;
    if (scrolled !== this.scrolled) {
      this.scrolled = scrolled;
      this.el.classList.toggle(cls, scrolled);
      this.emit('scrolled', { scrolled });
    }

    if (hide) {
      const delta = y - this.last;
      if (y <= hideOffset || delta < -tolerance) this.show();
      else if (delta > tolerance && !this.busy) this.hide();
      if (Math.abs(delta) > tolerance) this.last = y;
    } else {
      this.last = y;
    }
  }

  show() {
    if (!this.hidden) return;
    this.hidden = false;
    this.el.classList.remove('pl-navbar-hidden');
    this.emit('show');
  }

  hide() {
    if (this.hidden) return;
    this.hidden = true;
    this.el.classList.add('pl-navbar-hidden');
    this.emit('hide');
  }
}

/**
 * Nav — zwijane podmenu w nawigacji pionowej.
 * <ul class="pl-nav pl-nav-default" data-pl-nav>
 *   <li class="pl-parent pl-open"><a href="#">…</a><ul class="pl-nav-sub">…</ul></li>
 * </ul>
 */
class Nav extends Component {
  static defaults = {
    multiple: false, // pozwala otworzyć wiele podmenu naraz
    collapsible: true, // pozwala zamknąć wszystkie
    duration: 340,
  };

  init() {
    this.parents.forEach((item) => {
      const { link, sub } = this.parts(item);
      if (!link || !sub) return;
      // Podmenu z aktywną pozycją jest otwarte na starcie.
      const open = item.classList.contains('pl-open') || Boolean(sub.querySelector('.pl-active'));
      item.classList.toggle('pl-open', open);
      sub.hidden = !open;
      sub.id ||= uid('pl-nav-sub');
      link.setAttribute('aria-controls', sub.id);
      link.setAttribute('aria-expanded', String(open));
      if (!link.matches('button, a[href]')) {
        link.setAttribute('role', 'button');
        link.tabIndex = 0;
      }
    });

    this.on(this.el, 'click', (event) => {
      const item = this.parentOf(event.target);
      if (!item) return;
      event.preventDefault();
      this.toggle(item);
    });

    this.on(this.el, 'keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      const item = this.parentOf(event.target);
      if (!item || event.target.closest('button, a[href]')) return;
      event.preventDefault();
      this.toggle(item);
    });
  }

  get parents() {
    return $$('.pl-parent', this.el).filter((item) => item.closest('[data-pl-nav]') === this.el);
  }

  parts(item) {
    return {
      link: item.querySelector(':scope > a, :scope > button'),
      sub: item.querySelector(':scope > .pl-nav-sub'),
    };
  }

  /** Pozycja nadrzędna, której link kliknięto (albo null). */
  parentOf(target) {
    const link = target.closest?.('a, button, [role="button"]');
    const item = link?.parentElement;
    if (!item?.classList.contains('pl-parent') || item.closest('[data-pl-nav]') !== this.el) return null;
    return this.parts(item).sub ? item : null;
  }

  resolve(item) {
    return typeof item === 'number' ? this.parents[item] : item;
  }

  toggle(item) {
    item = this.resolve(item);
    if (!item) return;
    return item.classList.contains('pl-open') ? this.hide(item) : this.show(item);
  }

  async show(item) {
    item = this.resolve(item);
    if (!item || item.classList.contains('pl-open')) return;
    if (!this.emit('beforeshow', { item }, true)) return;
    if (!this.options.multiple) {
      // Zamknij rodzeństwo na tym samym poziomie.
      this.parents
        .filter((other) => other !== item && other.parentElement === item.parentElement && other.classList.contains('pl-open'))
        .forEach((other) => this.hide(other, true));
    }
    const { link, sub } = this.parts(item);
    item.classList.add('pl-open');
    link.setAttribute('aria-expanded', 'true');
    this.emit('show', { item });
    await toggleHeight(sub, true, { duration: this.options.duration });
    this.emit('shown', { item });
  }

  async hide(item, force = false) {
    item = this.resolve(item);
    if (!item || !item.classList.contains('pl-open')) return;
    if (!force && !this.options.collapsible) return;
    if (!this.emit('beforehide', { item }, true)) return;
    const { link, sub } = this.parts(item);
    item.classList.remove('pl-open');
    link.setAttribute('aria-expanded', 'false');
    this.emit('hide', { item });
    await toggleHeight(sub, false, { duration: this.options.duration });
    this.emit('hidden', { item });
  }
}

register('navbar', Navbar);
register('nav', Nav);

export { Navbar, Nav };
export default Navbar;
