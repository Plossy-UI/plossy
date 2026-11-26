import { register, $, clamp } from '../core.js';
import { Carousel, spring, rubber, velocityTracker } from './slider.js';

const tx = (value) => `translate3d(${(value * 100).toFixed(3)}%, 0, 0)`;
const sc = (value) => `scale(${value.toFixed(4)})`;

/**
 * Animacje przejścia: funkcja (postęp 0–1, kierunek ±1) → [style wychodzącego, style wchodzącego].
 * Dzięki temu przejście może podążać za palcem i kończyć się sprężyną.
 */
const ANIMATIONS = {
  slide: (p, dir) => [{ transform: tx(-dir * p) }, { transform: tx(dir * (1 - p)) }],
  fade: (p) => [{ opacity: 1 }, { opacity: p, zIndex: 1 }],
  scale: (p) => [
    { opacity: 1 - p, transform: sc(1 - 0.12 * p) },
    { opacity: p, transform: sc(1.12 - 0.12 * p), zIndex: 1 },
  ],
  zoom: (p) => [
    { opacity: 1 - p, transform: sc(1 + 0.45 * p), zIndex: 1 },
    { transform: sc(0.86 + 0.14 * p) },
  ],
  push: (p, dir) => [
    { transform: tx(-dir * p * 0.3), filter: `brightness(${(1 - 0.45 * p).toFixed(3)})` },
    { transform: tx(dir * (1 - p)), zIndex: 1 },
  ],
  pull: (p, dir) => [
    { transform: tx(-dir * p), zIndex: 1 },
    { transform: tx(dir * (1 - p) * 0.3), filter: `brightness(${(0.55 + 0.45 * p).toFixed(3)})` },
  ],
};

const NO_DRAG = 'input, textarea, select, [contenteditable]:not([contenteditable="false"]), .pl-drag-ignore';

/**
 * Slideshow — jeden slajd naraz, animowane przejścia.
 * <div class="pl-slideshow" data-pl-slideshow="animation: push">
 *   <ul class="pl-slideshow-items">
 *     <li><img src="…" alt=""><div class="pl-slideshow-caption">…</div></li>
 *   </ul>
 *   <button class="pl-slidenav-previous" data-pl-slideshow-item="previous"></button>
 *   <button class="pl-slidenav-next" data-pl-slideshow-item="next"></button>
 *   <ul class="pl-slideshow-nav pl-dotnav"></ul>
 * </div>
 */
class Slideshow extends Carousel {
  static prefix = 'slideshow';
  static defaults = {
    animation: 'slide', // slide | fade | scale | push | pull | zoom
    autoplay: false,
    autoplayInterval: 6000,
    pauseOnHover: true,
    ratio: '16:9', // false = wysokość tylko z min-height
    minHeight: '',
    maxHeight: '',
    finite: false,
    draggable: true,
    kenburns: false,
    progress: true, // pasek postępu autoodtwarzania
    index: 0,
    velocity: 1,
  };

  init() {
    if (!this.setup()) return;
    const { options, list, el } = this;
    this.tr = null;
    this.drag = null;
    this.suppressClick = 0;

    const ratio = String(options.ratio).match(/^\s*([\d.]+)\s*[:/]\s*([\d.]+)\s*$/);
    if (options.ratio === false || options.ratio === 'false') list.style.setProperty('--pl-slideshow-ratio', 'auto');
    else if (ratio) list.style.setProperty('--pl-slideshow-ratio', `${ratio[1]} / ${ratio[2]}`);
    const size = (value) => (typeof value === 'number' ? `${value}px` : value);
    if (options.minHeight) list.style.setProperty('--pl-slideshow-min-height', size(options.minHeight));
    if (options.maxHeight) list.style.setProperty('--pl-slideshow-max-height', size(options.maxHeight));
    if (options.kenburns) el.classList.add('pl-slideshow-kenburns');
    el.classList.toggle('pl-slideshow-draggable', Boolean(options.draggable));

    this.index = clamp(Number(options.index) || 0, 0, Math.max(0, this.slides.length - 1));
    this.setupDrag();
    this.update();
    el.classList.add('pl-slideshow-ready');
    this.onDestroy(() => this.tr?.anim?.stop());
    this.tick(true);
  }

  update() {
    if (!this.list) return;
    if (this.tr) this.finish();
    const slides = this.slides;
    this.index = clamp(this.index, 0, Math.max(0, slides.length - 1));
    slides.forEach((slide, i) => slide.classList.toggle('pl-active', i === this.index));
    this.labelSlides();
    this.buildNav();

    let bar = $('.pl-slideshow-progress', this.el);
    if (!bar && this.options.autoplay && this.options.progress) {
      bar = document.createElement('div');
      bar.className = 'pl-slideshow-progress';
      this.el.append(bar);
    }
    if (bar) {
      bar.setAttribute('aria-hidden', 'true');
      if (bar.children.length !== slides.length) bar.innerHTML = '<span></span>'.repeat(slides.length);
    }
    this.progress = bar;
    this.updateNav();
  }

  updateNav() {
    super.updateNav();
    [...(this.progress?.children || [])].forEach((segment, i) => {
      segment.classList.toggle('pl-done', i < this.index);
      segment.classList.toggle('pl-active', i === this.index);
    });
  }

  canMove() {
    const n = this.slides.length;
    if (!this.options.finite) return [n > 1, n > 1];
    return [this.index > 0, this.index < n - 1];
  }

  /** Indeks slajdu docelowego albo -1, gdy ruch jest niemożliwy. */
  resolve(target) {
    const n = this.slides.length;
    if (n < 2) return -1;
    const to = this.index + (target === 'next' ? 1 : -1);
    if (to >= 0 && to < n) return to;
    return this.options.finite ? -1 : (to + n) % n;
  }

  /** Pokazuje slajd: indeks, 'next' lub 'previous'. */
  show(target, { velocity = 0 } = {}) {
    if (!this.list) return;
    if (this.tr) this.finish();
    let index;
    let dir;
    if (target === 'next' || target === 'previous') {
      dir = target === 'next' ? 1 : -1;
      index = this.resolve(target);
      if (index < 0) {
        // Koniec — lekkie „odbicie" bieżącego slajdu.
        if (this.slides.length) {
          this.begin(-1, dir);
          this.run(0, 700);
        }
        return;
      }
    } else {
      index = clamp(Math.round(Number(target)) || 0, 0, this.slides.length - 1);
      if (index === this.index) return;
      dir = index > this.index ? 1 : -1;
    }
    this.begin(index, dir);
    if (this.commit()) this.run(1, velocity);
    else this.finish();
  }

  begin(toIndex, dir) {
    const slides = this.slides;
    const from = slides[this.index];
    const to = toIndex >= 0 ? slides[toIndex] : null;
    this.tr = { from, to, fromIndex: this.index, toIndex, dir, p: 0, committed: false, anim: null };
    from.classList.add('pl-transition-active');
    to?.classList.add('pl-transition-active');
    this.renderTransition();
  }

  /** Zatwierdza przejście: slajd docelowy staje się aktywny. */
  commit() {
    const tr = this.tr;
    const detail = { index: tr.toIndex, item: tr.to, previous: tr.fromIndex };
    if (!this.emit('beforeitemshow', detail, true)) return false;
    tr.committed = true;
    tr.from.classList.remove('pl-active');
    tr.to.classList.add('pl-active');
    this.index = tr.toIndex;
    this.updateNav();
    this.emit('itemhide', { index: tr.fromIndex, item: tr.from });
    this.emit('itemshow', detail);
    this.tick(true);
    return true;
  }

  run(end, velocity = 0) {
    const tr = this.tr;
    const width = this.list.offsetWidth || 1;
    const speed = Math.max(Number(this.options.velocity) || 1, 0.1);
    tr.anim = spring({
      from: tr.p * width,
      to: end * width,
      velocity,
      stiffness: 210 * speed * speed,
      damping: 29 * speed,
      update: (x) => {
        tr.p = x / width;
        if (this.tr === tr) this.renderTransition();
      },
      done: () => {
        if (this.tr === tr) this.finish();
      },
    });
  }

  renderTransition() {
    const { from, to, dir, p } = this.tr;
    if (!to) {
      from.style.transform = tx(-dir * Math.max(p, 0));
      return;
    }
    const animation = ANIMATIONS[this.options.animation] || ANIMATIONS.slide;
    const [out, into] = animation(clamp(p, 0, 1), dir);
    Object.assign(from.style, out);
    Object.assign(to.style, into);
  }

  /** Kończy (lub porzuca) bieżące przejście i sprząta style. */
  finish() {
    const tr = this.tr;
    if (!tr) return;
    this.tr = null;
    tr.anim?.stop();
    for (const slide of [tr.from, tr.to]) {
      if (!slide) continue;
      for (const prop of ['transform', 'opacity', 'zIndex', 'filter']) slide.style[prop] = '';
      slide.classList.remove('pl-transition-active');
    }
    if (!tr.committed) return;
    tr.from.querySelectorAll('video').forEach((video) => video.pause());
    tr.to.querySelectorAll('video[autoplay]').forEach((video) => video.play?.()?.catch?.(() => {}));
    this.emit('itemshown', { index: tr.toIndex, item: tr.to, previous: tr.fromIndex });
  }

  // ── Przeciąganie: przejście podąża za wskaźnikiem ───────────────────────

  setupDrag() {
    const c = this.list;

    this.on(c, 'pointerdown', (event) => {
      if (!this.options.draggable || this.drag || !this.slides.length) return;
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      if (event.target.closest(NO_DRAG) || !this.owns(event.target)) return;
      this.drag = { id: event.pointerId, x0: event.clientX, y0: event.clientY, active: false, tracker: velocityTracker() };
    });

    this.on(window, 'pointermove', (event) => {
      const d = this.drag;
      if (!d || event.pointerId !== d.id) return;
      const dy = event.clientY - d.y0;
      let dx = event.clientX - d.x0;
      if (!d.active) {
        if (Math.abs(dx) < 5 && Math.abs(dy) < 5) return;
        if (event.pointerType !== 'mouse' && Math.abs(dy) > Math.abs(dx)) {
          this.drag = null;
          return;
        }
        if (Math.abs(dx) < 5) return;
        if (this.tr) this.finish();
        d.active = true;
        d.x0 = event.clientX;
        d.width = c.offsetWidth || 1;
        dx = 0;
        try {
          c.setPointerCapture(d.id);
        } catch {
          /* wskaźnik już zwolniony */
        }
        this.el.classList.add('pl-slideshow-dragging');
        this.pause('drag');
      }
      const dir = dx <= 0 ? 1 : -1;
      if (!this.tr || this.tr.dir !== dir) {
        this.finish();
        this.begin(this.resolve(dir > 0 ? 'next' : 'previous'), dir);
      }
      const distance = Math.abs(dx);
      this.tr.p = this.tr.to ? clamp(distance / d.width, 0, 1) : rubber(distance, d.width) / d.width / 2.5;
      d.tracker.add(event.clientX, event.timeStamp);
      this.renderTransition();
    });

    const release = (event) => {
      const d = this.drag;
      if (!d || event.pointerId !== d.id) return;
      this.drag = null;
      if (!d.active) return;
      try {
        c.releasePointerCapture(d.id);
      } catch {
        /* noop */
      }
      this.el.classList.remove('pl-slideshow-dragging');
      this.suppressClick = performance.now() + 250;
      this.resume('drag');
      const tr = this.tr;
      if (!tr) return;
      // Prędkość w stronę dokończenia przejścia (px/s).
      const v = event.type === 'pointercancel' ? 0 : -d.tracker.get(event.timeStamp) * tr.dir;
      const forward = tr.to && (v > 320 || (tr.p > 0.5 && v > -320));
      if (forward && this.commit()) this.run(1, v);
      else this.run(0, v);
    };
    this.on(window, 'pointerup', release);
    this.on(window, 'pointercancel', release);

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
  }
}

register('slideshow', Slideshow);
export default Slideshow;
