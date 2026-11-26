import { Component, register, $, $$, clamp, uid, getInstance, prefersReducedMotion } from '../core.js';

// ── Fizyka ────────────────────────────────────────────────────────────────

/**
 * Sprężyna liczona w rAF (tłumiony oscylator, stały krok całkowania).
 * Zwraca uchwyt { stop(), velocity }.
 */
export function spring({ from, to, velocity = 0, stiffness = 170, damping = 20, precision = 0.35, update, done }) {
  if (prefersReducedMotion() || typeof requestAnimationFrame !== 'function') {
    update(to, 0);
    done?.();
    return { stop() {}, velocity: 0 };
  }
  let x = from;
  let v = velocity;
  let last = performance.now();
  let frame = 0;
  let active = true;
  const handle = {
    stop() {
      active = false;
      cancelAnimationFrame(frame);
    },
    get velocity() {
      return v;
    },
  };
  const step = (now) => {
    if (!active) return;
    let dt = clamp((now - last) / 1000, 0, 0.064);
    last = now;
    while (dt > 1e-5) {
      const h = Math.min(dt, 1 / 240);
      v += (-stiffness * (x - to) - damping * v) * h;
      x += v * h;
      dt -= h;
    }
    if (Math.abs(x - to) < precision && Math.abs(v) < precision * 25) {
      active = false;
      v = 0;
      update(to, 0);
      done?.();
      return;
    }
    update(x, v);
    frame = requestAnimationFrame(step);
  };
  frame = requestAnimationFrame(step);
  return handle;
}

/** Opór „gumki" po wyjściu poza zakres: im dalej, tym ciężej. */
export function rubber(distance, dimension, factor = 0.55) {
  const d = Math.abs(distance);
  return Math.sign(distance) * (1 - 1 / ((d * factor) / dimension + 1)) * dimension;
}

/** Śledzi prędkość wskaźnika z ostatnich ~100 ms (px/s). */
export function velocityTracker() {
  let samples = [];
  return {
    add(x, t) {
      samples.push({ x, t });
      while (samples.length > 2 && t - samples[0].t > 100) samples.shift();
    },
    get(now) {
      if (samples.length < 2) return 0;
      const first = samples[0];
      const last = samples[samples.length - 1];
      if (now - last.t > 80 || last.t === first.t) return 0; // wskaźnik stał w miejscu
      return ((last.x - first.x) / (last.t - first.t)) * 1000;
    },
  };
}

const NO_DRAG = 'input, textarea, select, [contenteditable]:not([contenteditable="false"]), .pl-drag-ignore';

// ── Wspólna baza: nawigacja, klawiatura, autoodtwarzanie, ARIA ────────────

/**
 * Baza karuzel (slider, slideshow). Klasa potomna ustawia `static prefix`
 * i implementuje `show()`, `navIndexes()` oraz `navOf()`.
 */
export class Carousel extends Component {
  static prefix = 'slider';
  static labels = {
    carousel: 'karuzela',
    slide: 'slajd',
    of: 'z',
    previous: 'Poprzedni slajd',
    next: 'Następny slajd',
    goto: 'Slajd',
  };

  /** Wspólna konfiguracja. Zwraca false, gdy brakuje listy slajdów. */
  setup() {
    const p = this.constructor.prefix;
    const { el } = this;
    this.attr = `data-pl-${p}-item`;
    this.list = $(`.pl-${p}-items`, el);
    if (!this.list) return false;

    this.index = 0;
    this.pauses = new Set();
    this.autoplayOn = Boolean(this.options.autoplay);
    this.generatedNavs = new WeakSet();
    this._timer = 0;
    this._remaining = 0;
    this._startedAt = 0;

    const L = this.constructor.labels;
    if (!el.hasAttribute('role')) el.setAttribute('role', 'region');
    el.setAttribute('aria-roledescription', L.carousel);
    if (!el.hasAttribute('aria-label') && !el.hasAttribute('aria-labelledby')) {
      el.setAttribute('aria-label', L.carousel[0].toUpperCase() + L.carousel.slice(1));
    }
    if (!el.hasAttribute('tabindex')) el.tabIndex = 0;
    this.list.id ||= uid(`pl-${p}`);
    el.style.setProperty(`--pl-${p}-interval`, `${this.options.autoplayInterval}ms`);

    this.on(el, 'click', (event) => {
      const control = event.target.closest(`[${this.attr}]`);
      if (!control || !this.owns(control)) return;
      event.preventDefault();
      if (control.getAttribute('aria-disabled') === 'true') return;
      const value = control.getAttribute(this.attr).trim();
      if (value === 'toggle') this.autoplayOn ? this.stopAutoplay() : this.startAutoplay();
      else this.show(/^\d+$/.test(value) ? Number(value) : value);
    });

    this.on(el, 'keydown', (event) => {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return;
      if (event.target.closest(NO_DRAG) || !this.owns(event.target)) return;
      const count = this.slides.length;
      const target = { ArrowLeft: 'previous', ArrowRight: 'next', Home: 0, End: count - 1 }[event.key];
      if (target === undefined) return;
      event.preventDefault();
      this.show(target);
    });

    // Pauzy autoodtwarzania: hover, fokus z klawiatury, karta w tle, poza ekranem.
    this.on(el, 'pointerenter', (event) => {
      if (this.options.pauseOnHover && event.pointerType === 'mouse') this.pause('hover');
    });
    this.on(el, 'pointerleave', () => this.resume('hover'));
    this.on(el, 'focusin', (event) => {
      if (event.target.matches?.(':focus-visible')) this.pause('focus');
    });
    this.on(el, 'focusout', (event) => {
      if (!el.contains(event.relatedTarget)) this.resume('focus');
    });
    this.on(document, 'visibilitychange', () => (document.hidden ? this.pause('hidden') : this.resume('hidden')));
    if (typeof IntersectionObserver === 'function') {
      const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? this.resume('offscreen') : this.pause('offscreen')));
      io.observe(el);
      this.onDestroy(() => io.disconnect());
    }
    if (typeof MutationObserver === 'function') {
      const mo = new MutationObserver(() => this.update());
      mo.observe(this.list, { childList: true });
      this.onDestroy(() => mo.disconnect());
    }
    this.onDestroy(() => clearTimeout(this._timer));
    return true;
  }

  get slides() {
    return this.list ? [...this.list.children] : [];
  }

  /** Czy `node` należy do tej karuzeli (a nie do zagnieżdżonej)? */
  owns(node) {
    const name = this.constructor.componentName;
    for (let n = node; n && n !== this.el; n = n.parentElement) {
      if (getInstance(n, name)) return false;
    }
    return true;
  }

  /** Opisuje slajdy dla czytników ekranu. */
  labelSlides() {
    const L = this.constructor.labels;
    const slides = this.slides;
    slides.forEach((slide, i) => {
      if (!slide.matches('li')) slide.setAttribute('role', 'group');
      slide.setAttribute('aria-roledescription', L.slide);
      if (slide.hasAttribute('aria-label') && !slide.dataset.plAuto) return; // własna etykieta autora
      slide.dataset.plAuto = '1';
      slide.setAttribute('aria-label', `${i + 1} ${L.of} ${slides.length}`);
    });
  }

  /** Buduje kropki w pustych `.pl-{p}-nav` i numeruje pozycje własnych nawigacji. */
  buildNav() {
    const p = this.constructor.prefix;
    const L = this.constructor.labels;
    const indexes = this.navIndexes();
    for (const nav of $$(`.pl-${p}-nav`, this.el)) {
      if (!this.owns(nav)) continue;
      if (!nav.children.length || this.generatedNavs.has(nav)) {
        this.generatedNavs.add(nav);
        const current = [...nav.children].map((li) => li.getAttribute(this.attr)).join();
        if (current !== indexes.join()) {
          nav.innerHTML = indexes
            .map((i) => `<li ${this.attr}="${i}"><a href="#" role="button" aria-label="${L.goto} ${i + 1}"></a></li>`)
            .join('');
        }
      } else {
        [...nav.children].forEach((item, i) => {
          if (!item.hasAttribute(this.attr) && !item.querySelector(`[${this.attr}]`)) item.setAttribute(this.attr, i);
        });
      }
    }
    for (const control of $$(`[${this.attr}]`, this.el)) {
      if (!this.owns(control)) continue;
      const value = control.getAttribute(this.attr);
      const button = control.matches('a, button') ? control : control.querySelector('a, button');
      if (!button) continue;
      button.setAttribute('aria-controls', this.list.id);
      if ((value === 'previous' || value === 'next') && !button.hasAttribute('aria-label') && !button.textContent.trim()) {
        button.setAttribute('aria-label', L[value]);
      }
    }
  }

  /** Odświeża stan nawigacji (aktywna kropka, zablokowane strzałki). */
  updateNav() {
    const active = this.navOf(this.index);
    const [canPrev, canNext] = this.canMove();
    for (const control of $$(`[${this.attr}]`, this.el)) {
      if (!this.owns(control)) continue;
      const value = control.getAttribute(this.attr).trim();
      const button = control.matches('a, button') ? control : control.querySelector('a, button') || control;
      if (/^\d+$/.test(value)) {
        const on = Number(value) === active;
        control.classList.toggle('pl-active', on);
        if (on) button.setAttribute('aria-current', 'true');
        else button.removeAttribute('aria-current');
      } else if (value === 'previous' || value === 'next') {
        const off = !(value === 'next' ? canNext : canPrev);
        control.classList.toggle('pl-disabled', off);
        if (off) button.setAttribute('aria-disabled', 'true');
        else button.removeAttribute('aria-disabled');
      }
    }
  }

  // Do nadpisania w klasach potomnych.
  navIndexes() {
    return this.slides.map((_, i) => i);
  }
  navOf(index) {
    return index;
  }
  canMove() {
    return [true, true];
  }
  update() {}
  show() {}

  // ── Autoodtwarzanie ─────────────────────────────────────────────────────

  startAutoplay() {
    this.autoplayOn = true;
    this.tick(true);
  }

  stopAutoplay() {
    this.autoplayOn = false;
    this.tick(true);
  }

  pause(reason) {
    if (this.pauses.has(reason)) return;
    this.pauses.add(reason);
    this.tick(false);
  }

  resume(reason) {
    if (!this.pauses.delete(reason)) return;
    this.tick(false);
  }

  /** (Re)startuje licznik; `reset` zaczyna pełny interwał od nowa. */
  tick(reset = true) {
    const p = this.constructor.prefix;
    const now = performance.now();
    if (this._timer) {
      clearTimeout(this._timer);
      this._timer = 0;
      this._remaining -= now - this._startedAt;
    }
    const interval = Math.max(Number(this.options.autoplayInterval) || 0, 400);
    if (reset || !(this._remaining > 0)) this._remaining = interval;
    const possible = this.autoplayOn && this.slides.length > 1 && !prefersReducedMotion();
    const running = possible && !this.pauses.size;
    this.el.classList.toggle(`pl-${p}-autoplay`, possible);
    this.el.classList.toggle(`pl-${p}-paused`, possible && !running);
    this.list.setAttribute('aria-live', possible ? 'off' : 'polite');
    for (const control of $$(`[${this.attr}="toggle"]`, this.el)) {
      control.classList.toggle('pl-active', this.autoplayOn);
      control.setAttribute('aria-pressed', String(this.autoplayOn));
    }
    if (!running) return;
    this._startedAt = now;
    this._timer = setTimeout(() => {
      this._timer = 0;
      this._remaining = 0;
      const [, canNext] = this.canMove();
      this.show(canNext ? 'next' : 0);
    }, this._remaining);
  }
}

// ── Slider ────────────────────────────────────────────────────────────────

/**
 * Slider — karuzela wielu elementów.
 * <div class="pl-slider" data-pl-slider>
 *   <div class="pl-slider-container">
 *     <ul class="pl-slider-items pl-slider-cols-3@m"><li>…</li></ul>
 *   </div>
 *   <button class="pl-slidenav-previous" data-pl-slider-item="previous"></button>
 *   <button class="pl-slidenav-next" data-pl-slider-item="next"></button>
 *   <ul class="pl-slider-nav pl-dotnav"></ul>
 * </div>
 */
class Slider extends Carousel {
  static prefix = 'slider';
  static defaults = {
    center: false, // wyśrodkowuje aktywny element
    finite: false, // bez zapętlenia
    sets: false, // przewija o cały zestaw widocznych elementów
    autoplay: false,
    autoplayInterval: 5000,
    pauseOnHover: true,
    draggable: true,
    index: 0,
    velocity: 1, // mnożnik szybkości animacji
  };

  init() {
    if (!this.setup()) return;
    this.container = $('.pl-slider-container', this.el) || this.list.parentElement;
    this.pos = 0;
    this.target = 0;
    this.metrics = [];
    this.anim = null;
    this.drag = null;
    this.wheelTimer = 0;
    this.suppressClick = 0;
    this.index = Math.max(0, Number(this.options.index) || 0);
    this.el.classList.toggle('pl-slider-draggable', Boolean(this.options.draggable));

    this.setupDrag();
    this.update();
    this.el.classList.add('pl-slider-ready');

    if (typeof ResizeObserver === 'function') {
      this.ro = new ResizeObserver(() => this.refresh());
      this.observe();
      this.onDestroy(() => this.ro.disconnect());
    } else {
      this.on(window, 'resize', () => this.refresh());
    }
    this.onDestroy(() => {
      this.anim?.stop();
      clearTimeout(this.wheelTimer);
    });
    this.tick(true);
  }

  observe() {
    if (!this.ro) return;
    this.ro.disconnect();
    this.ro.observe(this.container);
    this.slides.forEach((slide) => this.ro.observe(slide));
  }

  /** Przelicza wszystko po zmianie liczby slajdów. */
  update() {
    if (!this.list) return;
    this.labelSlides();
    this.observe();
    this.refresh();
  }

  /** Mierzy układ i ustawia tor bez animacji. */
  refresh() {
    if (!this.list || this.drag?.active) return;
    this.measure();
    this.buildNav();
    if (!this.metrics.length) return;
    this.index = clamp(this.index, 0, this.metrics.length - 1);
    this.anim?.stop();
    this.anim = null;
    this.pos = this.target = this.stops[this.index];
    this.render();
    this.updateActive(this.pos);
    this.updateNav();
  }

  measure() {
    const slides = this.slides;
    const { options } = this;
    const box = getComputedStyle(this.container);
    const track = getComputedStyle(this.list);
    this.viewW = this.container.clientWidth - (parseFloat(box.paddingLeft) || 0) - (parseFloat(box.paddingRight) || 0);
    // Siatka z rynnami (.pl-grid) cofa tor ujemnym marginesem — uwzględnij to przesunięcie.
    const lead = (this.lead = Math.min(0, parseFloat(track.marginLeft) || 0));
    const gap = parseFloat(track.columnGap) || 0;
    const base = slides[0]?.offsetLeft || 0;
    const old = new Map(this.metrics.map((m) => [m.el, m.k]));
    this.metrics = slides.map((el) => ({ el, left: el.offsetLeft - base, width: el.offsetWidth, k: old.get(el) || 0 }));
    const m = this.metrics;
    const n = m.length;
    if (!n) return;

    const content = m[n - 1].left + m[n - 1].width;
    const widest = Math.max(...m.map((item) => item.width));
    this.total = content + gap;
    this.loop = !options.finite && n > 1 && this.total >= this.viewW + widest - 1;

    const raw = m.map((item) => (options.center ? item.left + (item.width + lead) / 2 - this.viewW / 2 : item.left));
    this.min = options.center ? raw[0] : 0;
    this.max = options.center ? raw[n - 1] : Math.max(0, content + lead - this.viewW);
    this.stops = this.loop ? raw : raw.map((stop) => clamp(stop, this.min, this.max));

    // Indeksy, na których tor może się zatrzymać (kropki nawigacji).
    let stopIdx = [0];
    if (options.sets && !options.center) {
      let start = 0;
      for (let i = 1; i < n; i++) {
        if (m[i].left + m[i].width - m[start].left > this.viewW - lead + 1) {
          start = i;
          stopIdx.push(i);
        }
      }
    } else {
      stopIdx = m.map((_, i) => i);
    }
    if (!this.loop) {
      // Pomija pozycje, które po przycięciu do końca toru dają to samo położenie.
      let lastStop = -Infinity;
      stopIdx = stopIdx.filter((i) => {
        if (this.stops[i] <= lastStop + 1) return false;
        lastStop = this.stops[i];
        return true;
      });
      if (!stopIdx.length) stopIdx = [0];
      for (const item of m) {
        if (item.k) item.el.style.transform = '';
        item.k = 0;
      }
    }
    this.stopIdx = stopIdx;
  }

  navIndexes() {
    return this.stopIdx || [];
  }

  /** Pozycja nawigacji odpowiadająca indeksowi (ostatni przystanek ≤ index). */
  navOf(index) {
    let found = this.stopIdx?.[0] ?? 0;
    for (const i of this.stopIdx || []) if (i <= index) found = i;
    return found;
  }

  canMove() {
    if (this.loop || !this.options.finite || !this.stopIdx) return [true, true];
    const at = this.stopIdx.indexOf(this.navOf(this.index));
    return [at > 0, at < this.stopIdx.length - 1];
  }

  render() {
    const { pos } = this;
    this.list.style.transform = `translate3d(${-pos}px, 0, 0)`;
    if (!this.loop) return;
    // Zapętlenie bez klonów: każdy element przeskakuje o wielokrotność długości toru.
    for (const item of this.metrics) {
      const k = Math.round((pos + this.viewW / 2 - (item.left + item.width / 2)) / this.total);
      if (k !== item.k) {
        item.k = k;
        item.el.style.transform = k ? `translate3d(${k * this.total}px, 0, 0)` : '';
      }
    }
  }

  /** `.pl-active` dla w pełni widocznych, `inert` dla całkiem niewidocznych. */
  updateActive(pos) {
    for (const item of this.metrics) {
      let x = item.left - pos;
      if (this.loop) x -= Math.round((x + item.width / 2 - this.viewW / 2) / this.total) * this.total;
      const right = x + this.lead + item.width;
      const full = x >= -1.5 && right <= this.viewW + 1.5;
      const any = right > 1.5 && x + this.lead < this.viewW - 1.5;
      item.el.classList.toggle('pl-active', full);
      if (!any && item.el.contains(document.activeElement)) this.el.focus({ preventScroll: true });
      item.el.inert = !any;
    }
  }

  /** Najbliższy przystanek dla położenia `pos`. */
  nearest(pos) {
    let best = null;
    for (const index of this.stopIdx) {
      let dest = this.stops[index];
      if (this.loop) dest += Math.round((pos - dest) / this.total) * this.total;
      const distance = Math.abs(dest - pos);
      if (!best || distance < best.distance) best = { index, dest, distance };
    }
    return best;
  }

  /** Pokazuje element: indeks, 'next' lub 'previous'. */
  show(target, { velocity } = {}) {
    const n = this.metrics?.length;
    if (!n) return;
    let index;
    let dir = 0;
    if (target === 'next' || target === 'previous') {
      dir = target === 'next' ? 1 : -1;
      const list = this.stopIdx;
      let to = list.indexOf(this.navOf(this.index)) + dir;
      if (to < 0 || to >= list.length) {
        if (!this.loop && this.options.finite) {
          // Koniec toru — sprężyste „odbicie".
          this.animate(this.target, velocity ?? dir * 900);
          return;
        }
        to = (to + list.length) % list.length;
        if (!this.loop) dir = 0;
      }
      index = list[to];
    } else {
      index = this.navOf(clamp(Math.round(Number(target)) || 0, 0, n - 1));
    }

    let dest = this.stops[index];
    if (this.loop) {
      const base = this.target;
      dest += Math.round((base - dest) / this.total) * this.total;
      if (dir > 0 && dest <= base + 1) dest += this.total;
      if (dir < 0 && dest >= base - 1) dest -= this.total;
    }
    this.goTo(index, dest, velocity);
  }

  goTo(index, dest, velocity) {
    const previous = this.index;
    const changed = index !== previous;
    const item = this.metrics[index].el;
    if (changed && !this.emit('beforeitemshow', { index, item, previous }, true)) {
      dest = this.target;
      index = previous;
    }
    const moved = index !== previous;
    this.index = index;
    this.target = dest;
    this.updateActive(dest);
    this.updateNav();
    if (moved) {
      this.emit('itemhide', { index: previous, item: this.metrics[previous]?.el });
      this.emit('itemshow', { index, item, previous });
    }
    this.tick(true);
    this.animate(dest, velocity, () => {
      if (moved) this.emit('itemshown', { index, item, previous });
    });
  }

  animate(dest, velocity, done) {
    const carried = this.anim?.velocity || 0;
    this.anim?.stop();
    const speed = Math.max(Number(this.options.velocity) || 1, 0.1);
    this.anim = spring({
      from: this.pos,
      to: dest,
      velocity: velocity ?? carried,
      stiffness: 170 * speed * speed,
      damping: 20 * speed,
      update: (x) => {
        this.pos = x;
        this.render();
      },
      done: () => {
        this.anim = null;
        if (this.loop) {
          // Normalizacja, żeby położenie nie rosło w nieskończoność.
          const shift = Math.floor(this.pos / this.total) * this.total;
          this.pos -= shift;
          this.target -= shift;
          this.render();
        }
        done?.();
      },
    });
  }

  // ── Przeciąganie ────────────────────────────────────────────────────────

  bounded(pos) {
    if (this.loop) return pos;
    if (pos < this.min) return this.min + rubber(pos - this.min, this.viewW);
    if (pos > this.max) return this.max + rubber(pos - this.max, this.viewW);
    return pos;
  }

  setupDrag() {
    const c = this.container;

    this.on(c, 'pointerdown', (event) => {
      if (!this.options.draggable || this.drag || !this.metrics.length) return;
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      if (event.target.closest(NO_DRAG) || !this.owns(event.target)) return;
      this.drag = {
        id: event.pointerId,
        x0: event.clientX,
        y0: event.clientY,
        pos0: this.pos,
        active: false,
        caught: Boolean(this.anim), // „złapanie" toru w ruchu
        tracker: velocityTracker(),
      };
      if (this.anim) {
        this.anim.stop();
        this.anim = null;
      }
    });

    this.on(window, 'pointermove', (event) => {
      const d = this.drag;
      if (!d || event.pointerId !== d.id) return;
      const dx = event.clientX - d.x0;
      const dy = event.clientY - d.y0;
      if (!d.active) {
        if (Math.abs(dx) < 5 && Math.abs(dy) < 5) return;
        if (event.pointerType !== 'mouse' && Math.abs(dy) > Math.abs(dx)) {
          this.endDrag(true);
          return;
        }
        if (Math.abs(dx) < 5) return;
        d.active = true;
        d.x0 = event.clientX;
        try {
          c.setPointerCapture(d.id);
        } catch {
          /* wskaźnik już zwolniony */
        }
        this.el.classList.add('pl-slider-dragging');
        this.pause('drag');
      }
      this.pos = this.bounded(d.pos0 - (event.clientX - d.x0));
      d.tracker.add(event.clientX, event.timeStamp);
      this.render();
    });

    const release = (event) => {
      const d = this.drag;
      if (!d || event.pointerId !== d.id) return;
      this.endDrag(event.type === 'pointercancel', event.timeStamp);
    };
    this.on(window, 'pointerup', release);
    this.on(window, 'pointercancel', release);

    // Po przeciągnięciu nie uruchamiaj kliknięcia w link / kartę.
    this.on(
      c,
      'click',
      (event) => {
        if (performance.now() < this.suppressClick) {
          event.preventDefault();
          event.stopPropagation();
        }
      },
      true,
    );
    this.on(c, 'dragstart', (event) => event.preventDefault());

    // Poziomy gest na gładziku przesuwa tor, po chwili bezruchu — dociągnięcie.
    this.on(
      c,
      'wheel',
      (event) => {
        if (!this.options.draggable || !this.metrics.length || Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
        event.preventDefault();
        this.anim?.stop();
        this.anim = null;
        const delta = event.deltaMode === 1 ? event.deltaX * 16 : event.deltaX;
        this.pos = this.loop ? this.pos + delta : clamp(this.pos + delta, this.min, this.max);
        this.render();
        clearTimeout(this.wheelTimer);
        this.wheelTimer = setTimeout(() => {
          const { index, dest } = this.nearest(this.pos);
          this.goTo(index, dest, 0);
        }, 110);
      },
      { passive: false },
    );
  }

  endDrag(cancelled, now = performance.now()) {
    const d = this.drag;
    if (!d) return;
    this.drag = null;
    if (!d.active) {
      if (d.caught) {
        const { index, dest } = this.nearest(this.pos);
        this.goTo(index, dest, 0);
      }
      return;
    }
    try {
      this.container.releasePointerCapture(d.id);
    } catch {
      /* noop */
    }
    this.el.classList.remove('pl-slider-dragging');
    this.suppressClick = performance.now() + 250;

    const v = cancelled ? 0 : -d.tracker.get(now); // prędkość toru (px/s)
    const start = this.target;
    const { index, dest } = this.nearest(this.pos + v * 0.22);
    this.resume('drag');
    // Krótkie, szybkie machnięcie zawsze przesuwa co najmniej o jeden przystanek.
    if (Math.abs(v) > 280 && Math.abs(dest - start) < 1) {
      const at = this.stopIdx.indexOf(this.navOf(this.index));
      if (this.loop || (v > 0 ? at < this.stopIdx.length - 1 : at > 0)) {
        this.show(v > 0 ? 'next' : 'previous', { velocity: v });
        return;
      }
    }
    this.goTo(index, dest, v);
  }
}

register('slider', Slider);
export default Slider;
