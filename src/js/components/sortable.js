import { Component, register, getInstance, prefersReducedMotion } from '../core.js';

const IGNORE = 'input, textarea, select, option, button, [contenteditable]:not([contenteditable="false"]), .pl-sortable-nodrag';
const EASE = 'cubic-bezier(0.33, 0.5, 0.2, 1)';
const HOLD = 260; // ms przytrzymania na ekranie dotykowym (bez uchwytu)

const animating = new WeakMap();

/** FLIP: zapamiętuje położenia dzieci, wykonuje zmianę w DOM i animuje różnicę. */
function flip(containers, mutate, duration) {
  const els = [...new Set(containers)].flatMap((c) => [...c.children]);
  const first = new Map(els.map((el) => [el, el.getBoundingClientRect()]));
  mutate();
  if (!duration || prefersReducedMotion()) return;
  for (const [el, a] of first) {
    animating.get(el)?.cancel();
    if (!el.isConnected || typeof el.animate !== 'function') continue;
    const b = el.getBoundingClientRect();
    const dx = a.left - b.left;
    const dy = a.top - b.top;
    if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) continue;
    const anim = el.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'none' }], { duration, easing: EASE });
    animating.set(el, anim);
    anim.onfinish = anim.oncancel = () => {
      if (animating.get(el) === anim) animating.delete(el);
    };
  }
}

/** Przenosi węzeł; moveBefore (gdzie dostępne) zachowuje fokus i stan. */
function move(parent, node, ref) {
  if (typeof parent.moveBefore === 'function' && node.isConnected) {
    try {
      parent.moveBefore(node, ref);
      return;
    } catch {
      /* inny dokument / niedozwolony ruch — zwykłe wstawienie */
    }
  }
  parent.insertBefore(node, ref);
}

// Wspólne elementy dla czytników ekranu: instrukcja + komunikaty na żywo.
let liveRegion;
let helpText;
const srOnly = 'position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0';

function a11yNodes() {
  if (!helpText || !helpText.isConnected) {
    helpText = document.createElement('div');
    helpText.id = 'pl-sortable-help';
    helpText.hidden = true;
    helpText.textContent =
      'Naciśnij spację, aby podnieść element. Strzałkami zmień jego pozycję, spacją lub Enterem upuść, klawiszem Escape anuluj.';
    liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'assertive');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.style.cssText = srOnly;
    document.body.append(helpText, liveRegion);
  }
  return { liveRegion, helpText };
}

function announce(text) {
  const { liveRegion: region } = a11yNodes();
  region.textContent = '';
  setTimeout(() => (region.textContent = text), 30);
}

/**
 * Sortable — zmiana kolejności przez przeciąganie (listy i zawijane siatki).
 * <ul class="pl-sortable" data-pl-sortable="group: zadania; handle: .pl-sortable-handle">
 *   <li>…</li>
 * </ul>
 */
class Sortable extends Component {
  static defaults = {
    group: '', // sortable o tej samej grupie wymieniają się elementami
    handle: '', // selektor uchwytu; puste = cały element
    animation: 200,
    clsDrag: 'pl-sortable-drag',
    clsPlaceholder: 'pl-sortable-placeholder',
    clsEmpty: 'pl-sortable-empty',
    threshold: 5,
  };
  static primary = 'group';

  init() {
    const { el } = this;
    this.session = null; // przeciąganie wskaźnikiem
    this.kb = null; // przenoszenie klawiaturą
    this.kbMoving = false;
    this.suppressClick = 0;
    el.classList.add('pl-sortable');
    el.classList.toggle('pl-sortable-by-handle', Boolean(this.options.handle));

    this.on(el, 'pointerdown', (event) => this.onDown(event));
    this.on(window, 'pointermove', (event) => this.onMove(event), { passive: false });
    this.on(window, 'pointerup', (event) => this.onUp(event));
    this.on(window, 'pointercancel', (event) => this.onUp(event, true));
    // Po rozpoczęciu przeciągania palcem strona nie może się przewijać.
    this.on(
      document,
      'touchmove',
      (event) => {
        if (this.session?.started && event.cancelable) event.preventDefault();
      },
      { passive: false },
    );
    this.on(el, 'contextmenu', (event) => {
      if (this.session) event.preventDefault();
    });
    this.on(el, 'dragstart', (event) => event.preventDefault());
    this.on(
      window,
      'click',
      (event) => {
        if (performance.now() < this.suppressClick) {
          event.preventDefault();
          event.stopPropagation();
        }
      },
      true,
    );
    this.on(window, 'keydown', (event) => {
      if (event.key === 'Escape' && this.session?.started) {
        event.preventDefault();
        this.finishDrag(true);
      }
    });

    this.on(el, 'keydown', (event) => this.onKey(event));
    this.on(el, 'focusin', (event) => {
      const item = this.itemOf(event.target);
      if (item && event.target === item) this.setTabStop(item);
    });
    this.on(el, 'focusout', (event) => {
      if (this.kb && !this.kbMoving && event.target === this.kb.item) this.dropKey();
    });

    if (typeof MutationObserver === 'function') {
      const mo = new MutationObserver(() => this.refresh());
      mo.observe(el, { childList: true });
      this.onDestroy(() => mo.disconnect());
    }
    this.onDestroy(() => this.finishDrag(true, true));
    this.refresh();
  }

  get items() {
    return [...this.el.children];
  }

  /** Kolejność: wartości atrybutu (np. 'data-id') albo same elementy. */
  toArray(attribute) {
    return attribute ? this.items.map((item) => item.getAttribute(attribute)) : this.items;
  }

  itemOf(node) {
    while (node && node.parentElement !== this.el) node = node.parentElement;
    return node || null;
  }

  /** Atrybuty dostępności i klasa pustej listy. */
  refresh() {
    const items = this.items.filter((item) => !item.classList.contains(this.options.clsDrag));
    this.el.classList.toggle(this.options.clsEmpty, !items.length);
    if (!items.length) return;
    const { helpText: help } = a11yNodes();
    const current = items.find((item) => item.dataset.plSortableTab === '0') || items[0];
    for (const item of items) {
      if (!item.dataset.plSortableTab && item.hasAttribute('tabindex')) continue; // tabindex autora
      item.dataset.plSortableTab = item === current ? '0' : '-1';
      item.tabIndex = item === current ? 0 : -1;
      item.setAttribute('aria-roledescription', 'element sortowalny');
      item.setAttribute('aria-describedby', help.id);
    }
  }

  setTabStop(item) {
    for (const other of this.items) {
      if (!other.dataset.plSortableTab) continue;
      other.dataset.plSortableTab = other === item ? '0' : '-1';
      other.tabIndex = other === item ? 0 : -1;
    }
  }

  // ── Wskaźnik ────────────────────────────────────────────────────────────

  onDown(event) {
    if (this.session || this.kb) return;
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    const item = this.itemOf(event.target);
    if (!item || event.target === this.el) return;
    const { handle } = this.options;
    if (handle) {
      const grip = event.target.closest(handle);
      if (!grip || !item.contains(grip)) return;
    } else if (event.target.closest(IGNORE)) {
      return;
    }
    const touch = event.pointerType === 'touch';
    this.session = {
      id: event.pointerId,
      item,
      x0: event.clientX,
      y0: event.clientY,
      x: event.clientX,
      y: event.clientY,
      started: false,
      // Bez uchwytu palec najpierw przewija stronę; przeciąganie zaczyna przytrzymanie.
      hold: touch && !handle ? setTimeout(() => this.startDrag(), HOLD) : 0,
      needsHold: touch && !handle,
    };
  }

  onMove(event) {
    const s = this.session;
    if (!s || event.pointerId !== s.id) return;
    s.x = event.clientX;
    s.y = event.clientY;
    if (!s.started) {
      const distance = Math.hypot(s.x - s.x0, s.y - s.y0);
      if (s.needsHold) {
        if (distance > 8) this.finishDrag(true); // użytkownik przewija
        return;
      }
      if (distance < this.options.threshold) return;
      this.startDrag();
      if (!this.session) return;
    }
    if (event.cancelable) event.preventDefault();
    this.moveClone();
    this.track();
  }

  onUp(event, cancelled = false) {
    const s = this.session;
    if (!s || event.pointerId !== s.id) return;
    this.finishDrag(cancelled);
  }

  startDrag() {
    const s = this.session;
    if (!s || s.started) return;
    clearTimeout(s.hold);
    const { item } = s;
    const index = this.items.indexOf(item);
    if (index < 0 || !this.emit('start', { item, index, from: index }, true)) {
      this.session = null;
      return;
    }
    s.started = true;
    s.origin = { parent: this.el, next: item.nextElementSibling, index };
    const rect = item.getBoundingClientRect();
    s.offsetX = s.x0 - rect.left;
    s.offsetY = s.y0 - rect.top;

    const clone = item.cloneNode(true);
    clone.removeAttribute('id');
    clone.removeAttribute('tabindex');
    clone.setAttribute('aria-hidden', 'true');
    clone.classList.add(this.options.clsDrag);
    Object.assign(clone.style, {
      position: 'fixed',
      left: '0',
      top: '0',
      width: `${rect.width}px`,
      height: `${rect.height}px`,
      margin: '0',
      boxSizing: 'border-box',
      pointerEvents: 'none',
    });
    s.clone = clone;
    (item.closest('dialog[open]') || document.body).append(clone);
    this.moveClone();

    item.classList.add(this.options.clsPlaceholder);
    document.documentElement.classList.add('pl-sortable-dragging');
    getSelection?.()?.removeAllRanges();
    try {
      this.el.setPointerCapture(s.id); // zdarzenia docierają także spoza okna
    } catch {
      /* wskaźnik już zwolniony */
    }
    if (s.needsHold) navigator.vibrate?.(8);

    const loop = () => {
      if (this.session !== s) return;
      if (this.autoScroll()) this.track();
      s.frame = requestAnimationFrame(loop);
    };
    s.frame = requestAnimationFrame(loop);
  }

  moveClone() {
    const s = this.session;
    if (s?.clone) s.clone.style.translate = `${s.x - s.offsetX}px ${s.y - s.offsetY}px`;
  }

  /** Sortable pod wskaźnikiem: ten sam albo z tej samej grupy. */
  sortableAt(node) {
    const { group } = this.options;
    for (; node; node = node.parentElement) {
      const instance = getInstance(node, 'sortable');
      if (instance && (instance === this || (group !== '' && instance.options.group === group))) return instance;
    }
    return null;
  }

  /** Ustala miejsce upuszczenia na podstawie elementu pod wskaźnikiem. */
  track() {
    const s = this.session;
    if (!s?.started) return;
    const { item } = s;
    const under = document.elementFromPoint(s.x, s.y);
    const sortable = under && this.sortableAt(under);
    if (!sortable) return;
    const target = under === sortable.el ? null : sortable.itemOf(under);
    if (target === item) return;

    if (!target) {
      // Puste miejsce innej listy — dołącz na końcu.
      if (item.parentElement !== sortable.el) this.insert(sortable, null);
      return;
    }
    if (animating.has(target)) return; // cel jeszcze w ruchu — unika „migotania"

    const t = target.getBoundingClientRect();
    const r = item.getBoundingClientRect();
    let before;
    if (item.parentElement === sortable.el) {
      before = Boolean(item.compareDocumentPosition(target) & Node.DOCUMENT_POSITION_PRECEDING);
      // Większy cel ustępuje dopiero, gdy wskaźnik wejdzie w jego dalszą część.
      const sameRow = t.top < r.bottom - 1 && t.bottom > r.top + 1;
      if (sameRow && t.width > r.width + 1) {
        if (before ? s.x > t.left + r.width : s.x < t.right - r.width) return;
      } else if (!sameRow && t.height > r.height + 1) {
        if (before ? s.y > t.top + r.height : s.y < t.bottom - r.height) return;
      }
    } else {
      const sibling = target.nextElementSibling || target.previousElementSibling;
      const sr = sibling?.getBoundingClientRect();
      const horizontal = sr ? sr.top < t.bottom - 1 && sr.bottom > t.top + 1 : false;
      before = horizontal ? s.x < t.left + t.width / 2 : s.y < t.top + t.height / 2;
    }
    this.insert(sortable, before ? target : target.nextElementSibling);
  }

  insert(sortable, ref) {
    const { item } = this.session;
    if (ref === item || (item.parentElement === sortable.el && item.nextElementSibling === ref)) return;
    const from = item.parentElement;
    flip([from, sortable.el], () => move(sortable.el, item, ref), this.options.animation);
  }

  /** Przewija najbliższy przewijalny kontener, gdy wskaźnik jest przy krawędzi. */
  autoScroll() {
    const s = this.session;
    const EDGE = 64;
    const MAX = 20;
    const root = document.scrollingElement || document.documentElement;
    const speed = (pos, start, end) => {
      if (pos < start + EDGE) return -MAX * Math.min(1, (start + EDGE - pos) / EDGE);
      if (pos > end - EDGE) return MAX * Math.min(1, (pos - (end - EDGE)) / EDGE);
      return 0;
    };
    const scrollers = [];
    for (let node = s.item.parentElement; node && node !== document.body && node !== root; node = node.parentElement) {
      const cs = getComputedStyle(node);
      if (/(auto|scroll)/.test(cs.overflowY + cs.overflowX)) scrollers.push(node);
    }
    scrollers.push(root);
    for (const scroller of scrollers) {
      const isRoot = scroller === root;
      const rect = isRoot ? { top: 0, left: 0, bottom: innerHeight, right: innerWidth } : scroller.getBoundingClientRect();
      let dy = speed(s.y, Math.max(rect.top, 0), Math.min(rect.bottom, innerHeight));
      let dx = speed(s.x, Math.max(rect.left, 0), Math.min(rect.right, innerWidth));
      const maxY = scroller.scrollHeight - scroller.clientHeight;
      const maxX = scroller.scrollWidth - scroller.clientWidth;
      if (dy < 0 ? scroller.scrollTop <= 0 : scroller.scrollTop >= maxY - 1) dy = 0;
      if (dx < 0 ? scroller.scrollLeft <= 0 : scroller.scrollLeft >= maxX - 1) dx = 0;
      if (dx || dy) {
        scroller.scrollBy({ left: dx, top: dy, behavior: 'instant' });
        return true;
      }
    }
    return false;
  }

  /** Kończy przeciąganie: upuszczenie albo anulowanie (powrót na miejsce). */
  finishDrag(cancelled = false, immediate = false) {
    const s = this.session;
    if (!s) return;
    this.session = null;
    clearTimeout(s.hold);
    if (!s.started) return;
    cancelAnimationFrame(s.frame);
    const { item, clone, origin } = s;
    const { options } = this;
    document.documentElement.classList.remove('pl-sortable-dragging');
    this.suppressClick = performance.now() + 250;

    if (cancelled && (item.parentElement !== origin.parent || item.nextElementSibling !== origin.next)) {
      const ref = origin.next?.parentElement === origin.parent ? origin.next : null;
      flip([item.parentElement, origin.parent], () => move(origin.parent, item, ref), immediate ? 0 : options.animation);
    }

    const settle = () => {
      clone.remove();
      item.classList.remove(options.clsPlaceholder);
    };
    if (immediate || prefersReducedMotion() || typeof clone.animate !== 'function') {
      settle();
    } else {
      // Klon „ląduje" w miejscu zastępnika.
      const rect = item.getBoundingClientRect();
      const cs = getComputedStyle(clone);
      clone.classList.add('pl-sortable-drop');
      clone
        .animate(
          [
            { translate: cs.translate, rotate: cs.rotate, scale: cs.scale },
            { translate: `${rect.left}px ${rect.top}px`, rotate: '0deg', scale: '1' },
          ],
          { duration: Math.max(options.animation, 120) * 1.2, easing: EASE, fill: 'forwards' },
        )
        .finished.then(settle, settle);
    }

    const target = getInstance(item.parentElement, 'sortable') || this;
    const to = target.items.indexOf(item);
    const from = origin.index;
    this.refresh();
    if (target !== this) {
      target.refresh();
      this.emit('removed', { item, from, to, target });
      target.emit('added', { item, from, to, source: this });
    } else if (to !== from) {
      this.emit('moved', { item, from, to });
    }
    this.emit('stop', { item, from, to, target, cancelled });
  }

  // ── Klawiatura ──────────────────────────────────────────────────────────

  label(item) {
    const text = item.getAttribute('aria-label') || item.textContent.replace(/\s+/g, ' ').trim();
    return text.length > 48 ? `${text.slice(0, 48)}…` : text;
  }

  /** Sąsiad w kierunku strzałki (uwzględnia wiersze siatki). */
  neighbor(item, key) {
    const items = this.items;
    const i = items.indexOf(item);
    if (key === 'ArrowLeft') return items[i - 1];
    if (key === 'ArrowRight') return items[i + 1];
    const up = key === 'ArrowUp';
    const r = item.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    let best = null;
    let bestScore = Infinity;
    for (const other of items) {
      if (other === item) continue;
      const o = other.getBoundingClientRect();
      if (up ? o.bottom > r.top + 1 : o.top < r.bottom - 1) continue;
      const score = Math.abs(o.top - r.top) * 1e4 + Math.abs(o.left + o.width / 2 - cx);
      if (score < bestScore) {
        bestScore = score;
        best = other;
      }
    }
    return best || (up ? items[i - 1] : items[i + 1]);
  }

  onKey(event) {
    const item = this.itemOf(event.target);
    if (!item || event.target !== item || this.session) return;
    const { key } = event;
    const arrow = key.startsWith('Arrow');
    const count = this.items.length;

    if (!this.kb) {
      if (key === ' ') {
        event.preventDefault();
        const index = this.items.indexOf(item);
        if (!this.emit('start', { item, index, from: index }, true)) return;
        this.kb = { item, next: item.nextElementSibling, index };
        item.classList.add('pl-sortable-grabbed');
        announce(`Podniesiono: ${this.label(item)}. Pozycja ${index + 1} z ${count}. Strzałkami zmień pozycję, spacją upuść, Escape anuluje.`);
      } else if (arrow || key === 'Home' || key === 'End') {
        const next = key === 'Home' ? this.items[0] : key === 'End' ? this.items[count - 1] : this.neighbor(item, key);
        if (next) {
          event.preventDefault();
          next.focus();
        }
      }
      return;
    }

    if (arrow) {
      event.preventDefault();
      const other = this.neighbor(item, key);
      if (!other) return;
      const before = key === 'ArrowUp' || key === 'ArrowLeft';
      this.kbMoving = true;
      flip([this.el], () => move(this.el, item, before ? other : other.nextElementSibling), this.options.animation);
      item.focus({ preventScroll: true });
      this.kbMoving = false;
      item.scrollIntoView({ block: 'nearest', inline: 'nearest' });
      announce(`Pozycja ${this.items.indexOf(item) + 1} z ${count}.`);
    } else if (key === ' ' || key === 'Enter') {
      event.preventDefault();
      this.dropKey();
    } else if (key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      this.dropKey(true);
    }
  }

  dropKey(cancelled = false) {
    const k = this.kb;
    if (!k) return;
    this.kb = null;
    const { item } = k;
    item.classList.remove('pl-sortable-grabbed');
    if (cancelled) {
      const hadFocus = document.activeElement === item;
      this.kbMoving = true;
      const ref = k.next?.parentElement === this.el ? k.next : null;
      if (item.nextElementSibling !== ref) flip([this.el], () => move(this.el, item, ref), this.options.animation);
      if (hadFocus) item.focus({ preventScroll: true });
      this.kbMoving = false;
    }
    const to = this.items.indexOf(item);
    const count = this.items.length;
    announce(
      cancelled
        ? `Anulowano. ${this.label(item)} wraca na pozycję ${to + 1} z ${count}.`
        : `Upuszczono: ${this.label(item)}. Pozycja ${to + 1} z ${count}.`,
    );
    if (to !== k.index) this.emit('moved', { item, from: k.index, to });
    this.emit('stop', { item, from: k.index, to, target: this, cancelled });
  }
}

register('sortable', Sortable);
export default Sortable;
