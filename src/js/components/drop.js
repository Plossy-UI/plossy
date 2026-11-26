import { Component, register, $$, uid, queryTargets, animationsDone, showLayer, hideLayer, autoPlace } from '../core.js';

/**
 * Drop — pływająca karta / menu przypięte do przełącznika.
 * Element stoi bezpośrednio po przełączniku:
 * <button>Menu</button>
 * <div class="pl-drop pl-dropdown" data-pl-drop="mode: click; pos: bottom-start">
 *   <ul class="pl-dropdown-nav"><li><a href="#">…</a></li></ul>
 * </div>
 */

// Otwarte dropy w kolejności otwierania (ostatni = najwyższy).
const open = [];
let globalsBound = false;

const ALIGN = { left: 'start', top: 'start', right: 'end', bottom: 'end', start: 'start', end: 'end' };

/** 'bottom-left' → 'bottom-start', 'bottom-center' → 'bottom'. */
function normalizePlacement(pos) {
  const [side, align] = String(pos).trim().split('-');
  if (!['top', 'bottom', 'left', 'right'].includes(side)) return 'bottom-start';
  return ALIGN[align] ? `${side}-${ALIGN[align]}` : side;
}

function bindGlobals() {
  if (globalsBound) return;
  globalsBound = true;

  // Kliknięcie poza dropem i jego przełącznikiem zamyka go.
  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Node)) return;
    [...open].forEach((drop) => {
      if (drop.el.contains(target) || drop.toggleEl?.contains(target)) return;
      drop.hide();
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !open.length) return;
    const drop = open[open.length - 1];
    event.preventDefault();
    // Fokus wraca na przełącznik tylko wtedy, gdy był wewnątrz dropa.
    drop.hide();
  });
}

class Drop extends Component {
  static defaults = {
    toggle: null, // selektor przełącznika (domyślnie poprzedni element)
    mode: null, // click | hover (domyślnie click; hover dla podmenu)
    pos: null, // np. bottom-start (domyślnie; right-start dla podmenu)
    offset: null, // odstęp od przełącznika w px (domyślnie 8; 4 dla podmenu)
    delayShow: 0, // opóźnienie otwarcia w trybie hover (ms)
    delayHide: 220, // opóźnienie zamknięcia w trybie hover (ms)
    closeOnClick: 'auto', // auto | true | false
    matchWidth: false, // szerokość co najmniej taka jak przełącznika
    flip: true,
    shift: true,
  };

  init() {
    const { el, options } = this;
    this.isOpen = false;
    this.token = 0;
    this.timer = 0;
    this.hovering = false;
    this.stopPlace = null;
    this.parentDrop = el.parentElement?.closest('.pl-drop, [data-pl-drop]') || null;
    this.nested = Boolean(this.parentDrop);
    this.mode = options.mode === 'hover' || (options.mode == null && this.nested) ? 'hover' : 'click';
    this.placement = normalizePlacement(options.pos || (this.nested ? 'right-start' : 'bottom-start'));
    this.offset = options.offset ?? (this.nested ? 4 : 8);

    const toggle = options.toggle ? queryTargets(el, options.toggle)[0] : el.previousElementSibling;
    this.toggleEl = toggle || null;

    el.id ||= uid('pl-drop');
    el.classList.remove('pl-open');
    this.setupMenu();

    if (toggle) {
      const hasMenu = Boolean(this.menu);
      toggle.setAttribute('aria-haspopup', hasMenu ? 'menu' : 'true');
      toggle.setAttribute('aria-controls', el.id);
      toggle.setAttribute('aria-expanded', 'false');
      if (!toggle.matches('button, a[href], input, select, textarea, [tabindex]')) {
        toggle.setAttribute('role', 'button');
        toggle.tabIndex = 0;
      }
      this.onDestroy(() => {
        ['aria-haspopup', 'aria-controls', 'aria-expanded'].forEach((name) => toggle.removeAttribute(name));
        toggle.classList.remove('pl-open');
      });

      this.on(toggle, 'click', (event) => this.onToggleClick(event));
      this.on(toggle, 'keydown', (event) => this.onToggleKeydown(event));

      if (this.mode === 'hover') {
        this.on(toggle, 'pointerenter', (event) => {
          if (event.pointerType === 'touch') return;
          this.hovering = true;
          this.schedule(true);
        });
        this.on(toggle, 'pointerleave', (event) => {
          if (event.pointerType === 'touch') return;
          this.hovering = false;
          this.schedule(false);
        });
        this.on(toggle, 'focusin', () => {
          if (!this.suppressFocus && toggle.matches(':focus-visible')) this.schedule(true, 0);
        });
      }
    }

    if (this.mode === 'hover') {
      this.on(el, 'pointerenter', (event) => {
        if (event.pointerType !== 'touch') clearTimeout(this.timer);
      });
      this.on(el, 'pointerleave', (event) => {
        if (event.pointerType !== 'touch') this.schedule(false);
      });
    }

    this.on(el, 'click', (event) => this.onClick(event));
    this.on(el, 'keydown', (event) => this.onKeydown(event));

    // Fokus opuszczający drop i przełącznik (np. Tab) zamyka go.
    const onFocusOut = () => {
      setTimeout(() => {
        const active = document.activeElement;
        if (!this.isOpen || !active || active === document.body) return;
        if (el.contains(active) || this.toggleEl?.contains(active)) return;
        this.hide();
      });
    };
    this.on(el, 'focusout', onFocusOut);
    this.on(toggle, 'focusout', onFocusOut);

    bindGlobals();
    this.onDestroy(() => this.teardown());
  }

  /** Role ARIA dla listy menu (o ile autor nie ustawił własnych). */
  setupMenu() {
    this.menu = $$('.pl-dropdown-nav', this.el).find((nav) => this.owns(nav)) || null;
    $$('.pl-dropdown-nav', this.el)
      .filter((nav) => this.owns(nav))
      .forEach((nav) => {
        if (!nav.hasAttribute('role')) nav.setAttribute('role', 'menu');
        [...nav.children].forEach((li) => {
          if (li.hasAttribute('role')) return;
          if (li.classList.contains('pl-nav-divider')) li.setAttribute('role', 'separator');
          else li.setAttribute('role', 'none');
          const item = li.querySelector(':scope > a, :scope > button');
          if (item && !item.hasAttribute('role')) item.setAttribute('role', 'menuitem');
        });
      });
  }

  /** Czy `node` należy do tego dropa (a nie do zagnieżdżonego). */
  owns(node) {
    return node.closest('.pl-drop, [data-pl-drop]') === this.el;
  }

  get items() {
    return $$('.pl-dropdown-nav > li > a, .pl-dropdown-nav > li > button', this.el).filter(
      (item) =>
        this.owns(item) &&
        !item.disabled &&
        !item.parentElement.classList.contains('pl-disabled') &&
        item.getClientRects().length,
    );
  }

  schedule(show, delay) {
    clearTimeout(this.timer);
    delay ??= show ? this.options.delayShow : this.options.delayHide;
    if (!delay) return show ? this.show() : this.hide();
    this.timer = setTimeout(() => (show ? this.show() : this.hide()), delay);
  }

  onToggleClick(event) {
    if (this.toggleEl.matches('a')) event.preventDefault();
    clearTimeout(this.timer);
    if (this.mode === 'hover') {
      // Mysz nad przełącznikiem: klik tylko potwierdza otwarcie; dotyk / klawiatura przełączają.
      if (this.isOpen && !this.hovering) this.hide();
      else this.show();
      return;
    }
    this.toggle();
  }

  onToggleKeydown(event) {
    const side = this.placement.split('-')[0];
    const openKey = side === 'right' ? 'ArrowRight' : side === 'left' ? 'ArrowLeft' : side === 'top' ? 'ArrowUp' : 'ArrowDown';
    if (event.key === openKey || (event.key === 'ArrowDown' && !this.nested)) {
      if (!this.menu && this.isOpen) return;
      event.preventDefault();
      event.stopPropagation();
      this.show();
      this.focusItem(0);
    } else if ((event.key === 'Enter' || event.key === ' ') && this.toggleEl.getAttribute('role') === 'button') {
      event.preventDefault();
      this.toggle();
    }
  }

  onClick(event) {
    const mode = this.options.closeOnClick;
    if (mode === false || mode === 'false') return;
    const item = event.target.closest('a, button');
    if (!item || !this.el.contains(item)) return;
    // Przełącznik podmenu nie zamyka menu.
    if (item.hasAttribute('aria-haspopup') && item.getAttribute('aria-controls')) return;
    const inNav = Boolean(item.closest('.pl-dropdown-nav'));
    if (item.getAttribute('href') === '#') event.preventDefault();
    if (inNav || mode === true || mode === 'true' || item.hasAttribute('data-pl-drop-close')) {
      const refocus = this.el.contains(document.activeElement) && !this.nested;
      this.hide(refocus);
    }
  }

  onKeydown(event) {
    if (!this.owns(event.target) && event.target !== this.el) return;
    const items = this.items;
    const index = items.indexOf(event.target.closest('a, button'));
    const side = this.placement.split('-')[0];

    // W podmenu strzałka „wstecz" wraca do pozycji nadrzędnej.
    if (this.nested && ((side === 'right' && event.key === 'ArrowLeft') || (side === 'left' && event.key === 'ArrowRight'))) {
      event.preventDefault();
      event.stopPropagation();
      this.hide(true);
      return;
    }
    if (!items.length) return;
    const move = {
      ArrowDown: index + 1,
      ArrowUp: index < 0 ? items.length - 1 : index - 1,
      Home: 0,
      End: items.length - 1,
    }[event.key];
    if (move === undefined) return;
    event.preventDefault();
    event.stopPropagation();
    items[(move + items.length) % items.length].focus();
  }

  focusItem(index) {
    const items = this.items;
    if (!items.length) return;
    items[index < 0 ? items.length + index : index]?.focus();
  }

  toggle() {
    return this.isOpen ? this.hide() : this.show();
  }

  show() {
    clearTimeout(this.timer);
    if (this.isOpen || !this.el.isConnected) return;
    if (!this.emit('beforeshow', {}, true)) return;

    // Jeden otwarty drop naraz — przodkowie (menu nadrzędne) zostają.
    [...open].forEach((other) => {
      if (other !== this && !other.el.contains(this.el)) other.hide();
    });

    const { el, toggleEl } = this;
    const token = ++this.token;
    this.isOpen = true;
    open.push(this);

    el.classList.remove('pl-leave');
    el.classList.add('pl-open');
    toggleEl?.classList.add('pl-open');
    toggleEl?.setAttribute('aria-expanded', 'true');
    showLayer(el);
    this.stopPlace?.();
    this.stopPlace = autoPlace(el, toggleEl || el.parentElement || document.body, {
      placement: this.placement,
      offset: this.offset,
      flip: this.options.flip,
      shift: this.options.shift,
      matchWidth: this.options.matchWidth,
    });

    this.emit('show');
    animationsDone(el).then(() => {
      if (token === this.token && this.isOpen) this.emit('shown');
    });
  }

  /** Zamyka drop; `refocus` przenosi fokus z powrotem na przełącznik. */
  async hide(refocus = false) {
    clearTimeout(this.timer);
    if (!this.isOpen) return;
    if (!this.emit('beforehide', {}, true)) return;

    // Najpierw zagnieżdżone dropy.
    [...open].forEach((other) => {
      if (other !== this && this.el.contains(other.el)) other.hide();
    });

    const { el, toggleEl } = this;
    const token = ++this.token;
    const hadFocus = el.contains(document.activeElement);
    this.isOpen = false;
    const index = open.indexOf(this);
    if (index > -1) open.splice(index, 1);

    toggleEl?.classList.remove('pl-open');
    toggleEl?.setAttribute('aria-expanded', 'false');
    if (toggleEl && (refocus === true || hadFocus)) {
      this.suppressFocus = true;
      toggleEl.focus({ preventScroll: true });
      this.suppressFocus = false;
    }

    el.classList.add('pl-leave');
    el.classList.remove('pl-open');
    this.emit('hide');
    await animationsDone(el);
    if (token !== this.token) return;
    this.teardown();
    this.emit('hidden');
  }

  teardown() {
    clearTimeout(this.timer);
    this.stopPlace?.();
    this.stopPlace = null;
    this.el.classList.remove('pl-leave', 'pl-open');
    hideLayer(this.el);
    // Atrybut hidden nie jest potrzebny — widocznością steruje klasa .pl-open.
    this.el.hidden = false;
    const index = open.indexOf(this);
    if (index > -1) open.splice(index, 1);
    this.isOpen = false;
  }
}

register('drop', Drop);
export default Drop;
