import { Component, register, uid, queryTargets, focusables, animationsDone, showLayer, hideLayer, autoPlace } from '../core.js';

/**
 * Popover — karta ze strzałką przypięta do elementu wyzwalającego.
 * <button data-pl-popover="title: Tytuł; content: Treść; pos: top">…</button>
 * <button data-pl-popover="target: #profil; pos: right">…</button>
 * <div id="profil" hidden>dowolny HTML</div>
 * Elementy z atrybutem data-pl-popover-close wewnątrz treści zamykają popover.
 */

const open = [];
let globalsBound = false;

function bindGlobals() {
  if (globalsBound) return;
  globalsBound = true;

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Node)) return;
    [...open].forEach((popover) => {
      if (!popover.options.dismiss) return;
      if (popover.el.contains(target) || popover.pop?.contains(target)) return;
      // Kliknięcie w popover zagnieżdżony (otwarty z wnętrza tego) nie zamyka rodzica.
      if (open.some((other) => other !== popover && popover.pop?.contains(other.el) && other.pop?.contains(target))) return;
      popover.hide();
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !open.length) return;
    event.preventDefault();
    open[open.length - 1].hide(true);
  });
}

class Popover extends Component {
  static defaults = {
    title: '',
    content: '',
    target: null, // selektor elementu, który staje się treścią popovera
    pos: 'top',
    mode: 'click', // click | hover | focus
    offset: 12,
    close: false, // przycisk zamykania
    dismiss: true, // zamykanie kliknięciem poza popoverem
    html: false, // traktuj title / content jako HTML
    cls: '', // dodatkowe klasy, np. pl-popover-large
    delayShow: 80,
    delayHide: 200,
    focus: true, // przenieś fokus do popovera, jeśli ma elementy interaktywne
  };
  static primary = 'content';

  init() {
    const { el, options } = this;
    this.isOpen = false;
    this.token = 0;
    this.timer = 0;
    this.pop = null;
    this.stopPlace = null;
    this.id = uid('pl-popover');

    // Natywny title jako tytuł zapasowy.
    const native = el.getAttribute('title');
    if (native != null) {
      if (!options.title && !options.content) options.content = native;
      else if (!options.title) options.title = native;
      el.removeAttribute('title');
    }

    // Pola formularza nie mogą mieć aria-expanded / aria-haspopup — dostają tylko aria-describedby.
    this.expandable = !el.matches('input, select, textarea');
    if (this.expandable) {
      el.setAttribute('aria-haspopup', 'dialog');
      el.setAttribute('aria-expanded', 'false');
    }
    if (!el.matches('button, a[href], input, select, textarea, [tabindex]')) {
      el.setAttribute('role', 'button');
      el.tabIndex = 0;
      this.on(el, 'keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          this.toggle();
        }
      });
    }

    const { mode } = options;
    if (mode === 'hover') {
      this.on(el, 'pointerenter', (event) => {
        if (event.pointerType !== 'touch') this.schedule(true);
      });
      this.on(el, 'pointerleave', (event) => {
        if (event.pointerType !== 'touch') this.schedule(false);
      });
      this.on(el, 'focusin', () => {
        if (!this.suppressFocus && el.matches(':focus-visible')) this.schedule(true, 0);
      });
      this.on(el, 'focusout', () => this.onFocusOut());
      this.on(el, 'click', (event) => {
        if (el.matches('a')) event.preventDefault();
        if (event.pointerType === 'mouse') this.show();
        else this.toggle();
      });
    } else if (mode === 'focus') {
      this.on(el, 'focusin', () => {
        if (!this.suppressFocus) this.show();
      });
      this.on(el, 'focusout', () => this.onFocusOut());
    } else {
      this.on(el, 'click', (event) => {
        if (el.matches('a')) event.preventDefault();
        this.toggle();
      });
    }

    bindGlobals();
    this.onDestroy(() => {
      this.teardown();
      this.restoreTarget();
      this.pop?.remove();
      ['aria-haspopup', 'aria-expanded', 'aria-controls'].forEach((name) => el.removeAttribute(name));
    });
  }

  onFocusOut() {
    setTimeout(() => {
      const active = document.activeElement;
      if (!this.isOpen || this.el.contains(active) || this.pop?.contains(active)) return;
      this.hide();
    });
  }

  schedule(show, delay) {
    clearTimeout(this.timer);
    delay ??= show ? this.options.delayShow : this.options.delayHide;
    if (!delay) return show ? this.show() : this.hide();
    this.timer = setTimeout(() => (show ? this.show() : this.hide()), delay);
  }

  /** Buduje element popovera (raz) i wypełnia go treścią. */
  build() {
    const { el, options } = this;
    let pop = this.pop;
    if (!pop) {
      pop = this.pop = document.createElement('div');
      pop.id = this.id;
      pop.setAttribute('role', options.mode === 'click' ? 'dialog' : 'tooltip');
      pop.tabIndex = -1;

      pop.addEventListener('click', (event) => {
        if (event.target.closest('[data-pl-popover-close]')) this.hide(true);
      });
      pop.addEventListener('keydown', (event) => this.onKeydown(event));
      pop.addEventListener('focusout', () => {
        if (options.mode !== 'click' || options.dismiss) this.onFocusOut();
      });
      if (options.mode === 'hover') {
        pop.addEventListener('pointerenter', () => clearTimeout(this.timer));
        pop.addEventListener('pointerleave', (event) => {
          if (event.pointerType !== 'touch') this.schedule(false);
        });
      }
    }

    pop.className = `pl-popover ${options.cls || ''}`.trim();
    this.restoreTarget();
    pop.replaceChildren();
    pop.removeAttribute('aria-labelledby');

    const set = (node, value) => {
      if (options.html) node.innerHTML = String(value);
      else node.textContent = String(value);
    };
    const closeButton = () => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'pl-close';
      button.setAttribute('aria-label', 'Zamknij');
      button.setAttribute('data-pl-popover-close', '');
      return button;
    };

    const hasTitle = options.title !== '' && options.title != null;
    if (hasTitle) {
      const header = document.createElement('div');
      header.className = 'pl-popover-header';
      const title = document.createElement('div');
      title.className = 'pl-popover-title';
      title.id = `${this.id}-title`;
      set(title, options.title);
      header.append(title);
      if (options.close) header.append(closeButton());
      pop.append(header);
      pop.setAttribute('aria-labelledby', title.id);
    }

    const body = document.createElement('div');
    body.className = 'pl-popover-body';
    if (!hasTitle && options.close) body.append(closeButton());

    const target = options.target ? queryTargets(el, options.target)[0] : null;
    if (target) {
      // Element docelowy przenosimy do popovera (wróci na miejsce w destroy()).
      this.targetEl = target;
      this.targetHome = document.createComment('pl-popover');
      this.targetHidden = target.hidden;
      target.before(this.targetHome);
      target.hidden = false;
      body.append(target);
    } else {
      const content = document.createElement('div');
      set(content, options.content);
      body.append(...(options.html ? content.childNodes : [content.textContent]));
    }
    pop.append(body);
    if (!hasTitle && !pop.hasAttribute('aria-label')) pop.setAttribute('aria-label', el.textContent.trim() || 'Popover');
    else if (hasTitle) pop.removeAttribute('aria-label');

    // Wewnątrz modala popover musi być jego potomkiem (reszta dokumentu jest „inert").
    const host = el.closest('dialog, .pl-popover') || document.body;
    if (pop.parentElement !== host) host.append(pop);
    return pop;
  }

  restoreTarget() {
    if (!this.targetEl) return;
    this.targetEl.hidden = this.targetHidden;
    this.targetHome.replaceWith(this.targetEl);
    this.targetEl = this.targetHome = null;
  }

  onKeydown(event) {
    if (event.key !== 'Tab' || this.options.mode !== 'click') return;
    // Tab na krańcach treści wraca do elementu wyzwalającego (popover leży poza kolejnością DOM).
    const items = focusables(this.pop);
    const first = items[0];
    const last = items[items.length - 1];
    const active = document.activeElement;
    const leaving = event.shiftKey ? active === first || active === this.pop : active === last || (!items.length && active === this.pop);
    if (leaving) {
      event.preventDefault();
      this.el.focus();
    }
  }

  /** Aktualizuje opcje (title, content…) i odświeża otwarty popover. */
  update(options = {}) {
    Object.assign(this.options, options);
    if (this.isOpen) this.build();
  }

  toggle() {
    return this.isOpen ? this.hide() : this.show();
  }

  show() {
    clearTimeout(this.timer);
    const { el, options } = this;
    if (this.isOpen || !el.isConnected) return;
    if (!options.target && options.content === '' && options.title === '') return;
    if (!this.emit('beforeshow', {}, true)) return;

    const pop = this.build();

    // Jeden popover naraz — z wyjątkiem tych, z których wnętrza otwieramy kolejny.
    [...open].forEach((other) => {
      if (other !== this && !other.pop?.contains(el)) other.hide();
    });

    const token = ++this.token;
    const { signal } = this;
    this.isOpen = true;
    open.push(this);

    pop.classList.remove('pl-leave');
    pop.classList.add('pl-open');
    el.classList.add('pl-open');
    if (this.expandable) el.setAttribute('aria-expanded', 'true');
    if (options.mode === 'click') el.setAttribute('aria-controls', pop.id);
    else el.setAttribute('aria-describedby', pop.id);
    showLayer(pop);
    this.stopPlace?.();
    this.stopPlace = autoPlace(pop, el, { placement: options.pos, offset: options.offset });

    if (options.mode === 'click' && options.focus && focusables(pop).length) {
      pop.focus({ preventScroll: true });
    }

    this.emit('show');
    animationsDone(pop).then(() => {
      if (!signal.aborted && token === this.token && this.isOpen) this.emit('shown');
    });
  }

  /** Zamyka popover; `refocus` wymusza powrót fokusu na element wyzwalający. */
  async hide(refocus = false) {
    clearTimeout(this.timer);
    if (!this.isOpen) return;
    if (!this.emit('beforehide', {}, true)) return;

    const { el, pop } = this;
    // Najpierw popovery otwarte z wnętrza tego.
    [...open].forEach((other) => {
      if (other !== this && pop.contains(other.el)) other.hide();
    });

    const token = ++this.token;
    const { signal } = this;
    const hadFocus = pop.contains(document.activeElement);
    this.isOpen = false;
    const index = open.indexOf(this);
    if (index > -1) open.splice(index, 1);

    el.classList.remove('pl-open');
    if (this.expandable) el.setAttribute('aria-expanded', 'false');
    el.removeAttribute('aria-describedby');
    if (hadFocus || (refocus === true && this.options.mode === 'click')) {
      this.suppressFocus = true;
      el.focus({ preventScroll: true });
      this.suppressFocus = false;
    }

    pop.classList.add('pl-leave');
    pop.classList.remove('pl-open');
    this.emit('hide');
    await animationsDone(pop);
    // Po destroy() (także przed ponownym init()) spóźnione zamknięcie nic nie robi.
    if (signal.aborted || token !== this.token) return;
    this.teardown();
    this.emit('hidden');
  }

  teardown() {
    clearTimeout(this.timer);
    this.stopPlace?.();
    this.stopPlace = null;
    const index = open.indexOf(this);
    if (index > -1) open.splice(index, 1);
    this.isOpen = false;
    if (!this.pop) return;
    this.pop.classList.remove('pl-open', 'pl-leave');
    hideLayer(this.pop);
    this.pop.hidden = false;
  }
}

register('popover', Popover);
export default Popover;
