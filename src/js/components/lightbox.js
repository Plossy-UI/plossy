import { Component, register, api, $$, lockScroll, unlockScroll, prefersReducedMotion } from '../core.js';

/**
 * Lightbox
 * <div data-pl-lightbox="thumbs: true">
 *   <a href="duze.jpg" data-caption="Podpis"><img src="male.jpg" alt="Opis"></a>
 *   <a href="film.mp4" data-type="video">…</a>
 *   <a href="https://www.youtube.com/watch?v=…" data-type="iframe">…</a>
 * </div>
 * Programowo: Plossy.lightboxPanel({ items: [{ source, caption, type }], index: 0 }).
 */

const IMAGE = /\.(avif|bmp|gif|jpe?g|png|svg|webp)([?#].*)?$/i;
const VIDEO = /\.(mp4|m4v|mov|ogv|webm)([?#].*)?$/i;
const YOUTUBE = /(?:youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{6,})/i;
const VIMEO = /vimeo\.com\/(?:video\/)?(\d+)/i;

const ICONS = {
  previous: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>',
  next: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>',
  play: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l11-6.5a1 1 0 0 0 0-1.72l-11-6.5A1 1 0 0 0 8 5.5Z"/></svg>',
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** Rozpoznaje typ pozycji po adresie. */
function detectType(source = '', type = '') {
  if (['image', 'video', 'iframe'].includes(type)) return type;
  if (IMAGE.test(source)) return 'image';
  if (VIDEO.test(source)) return 'video';
  if (YOUTUBE.test(source) || VIMEO.test(source)) return 'iframe';
  return null;
}

/** Adres YouTube / Vimeo → adres osadzenia. */
function embedUrl(source) {
  const youtube = source.match(YOUTUBE);
  if (youtube) return `https://www.youtube-nocookie.com/embed/${youtube[1]}?autoplay=1&rel=0`;
  const vimeo = source.match(VIMEO);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1`;
  return source;
}

function settle(nodes, limit = 1200) {
  const animations = nodes.filter(Boolean).flatMap((node) => node.getAnimations());
  if (!animations.length) return Promise.resolve();
  return Promise.race([Promise.allSettled(animations.map((a) => a.finished)), wait(limit)]);
}

function springEasing() {
  return getComputedStyle(document.documentElement).getPropertyValue('--pl-ease-spring').trim() || 'ease-out';
}

function inViewport(rect) {
  return rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.right > 0 && rect.top < innerHeight && rect.left < innerWidth;
}

/** Panel galerii — tworzy <dialog>, pokazuje pozycje i sprząta po sobie. */
class LightboxPanel {
  constructor(options = {}) {
    const { items = [], index = 0, emit = null, ...rest } = options;
    this.options = { animation: 'slide', loop: true, thumbs: false, counter: true, ...rest };
    this.items = items
      .map((item) => (typeof item === 'string' ? { source: item } : { ...item }))
      .map((item) => ({ ...item, type: detectType(item.source, item.type) || 'image' }));
    this.index = -1;
    this.start = index;
    this.state = 'closed';
    this.current = null;
    this.opener = null;
    this.emitter = emit;
    this.el = null;
  }

  emit(type, detail = {}) {
    const payload = { index: this.index, item: this.items[this.index], panel: this, ...detail };
    if (this.emitter) return this.emitter(type, payload);
    this.el?.dispatchEvent(new CustomEvent(`pl:${type}`, { bubbles: true, detail: payload }));
  }

  build() {
    const { thumbs, counter, animation } = this.options;
    const many = this.items.length > 1;
    const el = document.createElement('dialog');
    el.className = `pl-lightbox pl-lightbox-${animation === 'fade' ? 'fade' : 'slide'}`;
    el.dataset.plTheme = 'dark';
    el.setAttribute('aria-label', 'Galeria');
    el.setAttribute('aria-roledescription', 'galeria');
    el.innerHTML = `
      <div class="pl-lightbox-backdrop"></div>
      <div class="pl-lightbox-toolbar">
        ${counter && many ? '<span class="pl-lightbox-counter" aria-live="polite"></span>' : ''}
        <button class="pl-close pl-lightbox-close" type="button" aria-label="Zamknij"></button>
      </div>
      <div class="pl-lightbox-stage"></div>
      ${
        many
          ? `<button class="pl-lightbox-nav pl-lightbox-previous pl-slidenav-previous" type="button" aria-label="Poprzedni">${ICONS.previous}</button>
             <button class="pl-lightbox-nav pl-lightbox-next pl-slidenav-next" type="button" aria-label="Następny">${ICONS.next}</button>`
          : ''
      }
      <div class="pl-lightbox-footer">
        <div class="pl-lightbox-caption"></div>
        ${thumbs && many ? '<div class="pl-lightbox-thumbs" role="tablist" aria-label="Miniatury"></div>' : ''}
      </div>`;

    this.el = el;
    this.stage = el.querySelector('.pl-lightbox-stage');
    this.counter = el.querySelector('.pl-lightbox-counter');
    this.caption = el.querySelector('.pl-lightbox-caption');
    this.thumbs = el.querySelector('.pl-lightbox-thumbs');
    this.prevButton = el.querySelector('.pl-lightbox-previous');
    this.nextButton = el.querySelector('.pl-lightbox-next');

    if (this.thumbs) {
      this.items.forEach((item, i) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'pl-lightbox-thumb';
        button.setAttribute('role', 'tab');
        button.setAttribute('aria-label', `Pozycja ${i + 1}${item.caption ? `: ${item.caption}` : ''}`);
        const src = item.thumb || (item.type === 'image' ? item.source : '');
        if (src) {
          const img = document.createElement('img');
          img.src = src;
          img.alt = '';
          img.loading = 'lazy';
          img.draggable = false;
          button.append(img);
        } else {
          button.innerHTML = ICONS.play;
        }
        button.addEventListener('click', () => this.go(i));
        this.thumbs.append(button);
      });
    }

    el.addEventListener('click', (event) => {
      if (this.swiped) return void (this.swiped = false);
      const target = event.target;
      if (target.closest('.pl-lightbox-close')) return void this.hide();
      if (target.closest('.pl-lightbox-previous')) return void this.prev();
      if (target.closest('.pl-lightbox-next')) return void this.next();
      // Kliknięcie poza medium zamyka galerię.
      if (!target.closest('.pl-lightbox-media, .pl-lightbox-error, .pl-lightbox-thumbs, .pl-lightbox-caption, button, a')) this.hide();
    });

    el.addEventListener('keydown', (event) => {
      if (event.defaultPrevented) return;
      const typing = event.target.matches?.('video, input, textarea, select');
      const actions = {
        Escape: () => this.hide(),
        ArrowLeft: () => !typing && this.prev(),
        ArrowRight: () => !typing && this.next(),
        Home: () => !typing && this.go(0),
        End: () => !typing && this.go(this.items.length - 1),
      };
      const action = actions[event.key];
      if (!action || (typing && event.key !== 'Escape')) return;
      event.preventDefault();
      action();
    });

    el.addEventListener('cancel', (event) => {
      event.preventDefault();
      this.hide();
    });

    el.addEventListener('close', () => {
      if (this.state !== 'closed') this.finish();
    });

    this.onResize = () => this.stage.querySelectorAll('[data-fit]').forEach((node) => this.fit(node));
    window.addEventListener('resize', this.onResize, { passive: true });

    this.bindSwipe();
  }

  /** Gesty dotykowe: w bok — zmiana pozycji, w pionie — zamknięcie. */
  bindSwipe() {
    const stage = this.stage;
    let drag = null;

    stage.addEventListener('pointerdown', (event) => {
      this.swiped = false;
      if (event.pointerType === 'mouse' || event.target.closest('video, iframe, button')) return;
      drag = { x: event.clientX, y: event.clientY, dx: 0, dy: 0, axis: null, item: this.current };
    });

    stage.addEventListener('pointermove', (event) => {
      if (!drag || !drag.item) return;
      drag.dx = event.clientX - drag.x;
      drag.dy = event.clientY - drag.y;
      if (!drag.axis) {
        if (Math.hypot(drag.dx, drag.dy) < 10) return;
        drag.axis = Math.abs(drag.dx) > Math.abs(drag.dy) ? 'x' : 'y';
        drag.item.classList.remove('pl-lightbox-snap', 'pl-lightbox-enter', 'pl-lightbox-first');
      }
      if (drag.axis === 'x') {
        const blocked = this.target(this.index + (drag.dx < 0 ? 1 : -1)) === null;
        drag.item.style.translate = `${drag.dx * (blocked ? 0.25 : 1)}px 0px`;
      } else {
        drag.item.style.translate = `0px ${drag.dy}px`;
        drag.item.style.opacity = String(Math.max(0.3, 1 - Math.abs(drag.dy) / 400));
      }
    });

    const end = (event) => {
      if (!drag) return;
      const { dx, dy, axis, item } = drag;
      drag = null;
      if (!axis || !item) return;
      this.swiped = true;
      setTimeout(() => (this.swiped = false), 350);
      const cancelled = event.type === 'pointercancel';
      if (!cancelled && axis === 'x' && Math.abs(dx) > 56 && this.target(this.index + (dx < 0 ? 1 : -1)) !== null) {
        return void (dx < 0 ? this.next() : this.prev());
      }
      if (!cancelled && axis === 'y' && Math.abs(dy) > 90) return void this.hide();
      item.classList.add('pl-lightbox-snap');
      item.style.translate = '0px 0px';
      item.style.opacity = '';
    };

    stage.addEventListener('pointerup', end);
    stage.addEventListener('pointercancel', end);
  }

  /** Indeks docelowy z uwzględnieniem zapętlenia; null, gdy poza zakresem. */
  target(index) {
    const count = this.items.length;
    if (!count) return null;
    if (this.options.loop && count > 1) return ((index % count) + count) % count;
    return index < 0 || index >= count ? null : index;
  }

  /** Buduje element pozycji (obraz / wideo / iframe) ze spinnerem. */
  render(item) {
    const wrap = document.createElement('div');
    wrap.className = 'pl-lightbox-item pl-loading';
    wrap.dataset.type = item.type;
    const spinner = document.createElement('div');
    spinner.className = 'pl-lightbox-spinner';
    spinner.setAttribute('role', 'status');
    spinner.setAttribute('aria-label', 'Wczytywanie');

    const done = () => {
      wrap.classList.remove('pl-loading');
      spinner.remove();
    };
    const fail = () => {
      done();
      const error = document.createElement('div');
      error.className = 'pl-lightbox-error';
      error.textContent = 'Nie udało się wczytać zawartości.';
      wrap.querySelector('.pl-lightbox-media')?.replaceWith(error);
    };

    let media;
    if (item.type === 'video') {
      media = document.createElement('video');
      media.controls = true;
      media.playsInline = true;
      media.preload = 'metadata';
      if (item.poster) media.poster = item.poster;
      media.addEventListener('loadedmetadata', done, { once: true });
      media.addEventListener('error', fail, { once: true });
      media.src = item.source;
    } else if (item.type === 'iframe') {
      media = document.createElement('iframe');
      media.allow = 'autoplay; fullscreen; picture-in-picture; encrypted-media';
      media.allowFullscreen = true;
      media.title = item.caption || 'Osadzona treść';
      media.addEventListener('load', done, { once: true });
      media.src = embedUrl(item.source);
    } else {
      media = document.createElement('img');
      media.alt = item.alt || item.caption || '';
      media.draggable = false;
      // Grafika wektorowa nie ma własnego rozmiaru — dopasowujemy ją do sceny.
      const vector = /\.svg([?#].*)?$/i.test(item.source);
      media.addEventListener(
        'load',
        () => {
          if (vector) this.fit(wrap);
          done();
        },
        { once: true },
      );
      media.addEventListener('error', fail, { once: true });
      if (vector) wrap.dataset.fit = '';
      media.src = item.source;
      if (media.complete && media.naturalWidth) done();
    }
    media.classList.add('pl-lightbox-media');
    wrap.append(spinner, media);
    return wrap;
  }

  /** Wpisuje obraz wektorowy w dostępne miejsce z zachowaniem proporcji. */
  fit(node) {
    const image = node.querySelector('img.pl-lightbox-media');
    if (!image?.naturalWidth || !image.naturalHeight) return;
    const style = getComputedStyle(node);
    const width = node.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
    const height = node.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom);
    if (width <= 0 || height <= 0) return;
    const ratio = image.naturalWidth / image.naturalHeight;
    const w = Math.min(width, height * ratio, 1600);
    image.style.width = `${Math.round(w)}px`;
    image.style.height = `${Math.round(w / ratio)}px`;
  }

  preload(index) {
    const item = this.items[this.target(index) ?? -1];
    if (!item || item.type !== 'image' || item.preloaded) return;
    item.preloaded = true;
    new Image().src = item.source;
  }

  /** Przechodzi do pozycji `index`. `first` — pierwsze wyświetlenie po otwarciu. */
  go(index, direction, first = false) {
    index = this.target(index);
    if (index === null || this.state === 'closed' || this.state === 'closing') return;
    if (index === this.index && this.current) return;
    const count = this.items.length;
    const previous = this.index;
    if (direction === undefined) {
      direction = index > previous ? 1 : -1;
      // Przy zapętleniu wybieramy krótszą drogę (ostatni → pierwszy to „dalej").
      if (this.options.loop && count > 2 && Math.abs(index - previous) === count - 1) direction = -direction;
    }

    const old = this.current;
    const item = this.items[index];
    const node = this.render(item);
    node.style.setProperty('--pl-lightbox-dir', String(direction));
    if (!first) node.classList.add('pl-lightbox-enter');
    this.stage.append(node);
    this.current = node;
    this.index = index;

    if (old) {
      old.querySelectorAll('video').forEach((video) => video.pause());
      old.style.setProperty('--pl-lightbox-dir', String(direction));
      old.classList.remove('pl-lightbox-enter', 'pl-lightbox-first', 'pl-lightbox-snap');
      old.classList.add('pl-lightbox-leave');
      old.setAttribute('aria-hidden', 'true');
      settle([old], 800).then(() => old.remove());
    }

    if (this.counter) this.counter.innerHTML = `<b>${index + 1}</b> / ${count}`;
    this.caption.textContent = item.caption || '';
    if (this.thumbs) {
      [...this.thumbs.children].forEach((thumb, i) => {
        thumb.classList.toggle('pl-active', i === index);
        thumb.setAttribute('aria-selected', String(i === index));
      });
      const active = this.thumbs.children[index];
      if (active) {
        const left = active.offsetLeft - (this.thumbs.clientWidth - active.offsetWidth) / 2;
        this.thumbs.scrollTo({ left, behavior: first || prefersReducedMotion() ? 'auto' : 'smooth' });
      }
    }
    if (this.prevButton) this.prevButton.disabled = this.target(index - 1) === null;
    if (this.nextButton) this.nextButton.disabled = this.target(index + 1) === null;

    this.preload(index + 1);
    this.preload(index - 1);
    this.emit('itemshow');
    return node;
  }

  next() {
    this.go(this.index + 1, 1);
  }

  prev() {
    this.go(this.index - 1, -1);
  }

  /** Miniatura na stronie odpowiadająca pozycji (dla animacji FLIP). */
  origin(index) {
    const link = this.items[index]?.el;
    return link?.querySelector?.('img, picture, video') || link || null;
  }

  /** Klatki animacji „z miniatury": przesunięcie + skala + przycięcie do kształtu miniatury. */
  flipFrames(image, origin) {
    const from = origin.getBoundingClientRect();
    const to = image.getBoundingClientRect();
    if (!inViewport(from) || !to.width || !to.height) return null;
    const scale = Math.max(from.width / to.width, from.height / to.height);
    const dx = from.left + from.width / 2 - (to.left + to.width / 2);
    const dy = from.top + from.height / 2 - (to.top + to.height / 2);
    const cropX = Math.max(0, (to.width - from.width / scale) / 2);
    const cropY = Math.max(0, (to.height - from.height / scale) / 2);
    const radiusFrom = (parseFloat(getComputedStyle(origin).borderTopLeftRadius) || 0) / scale;
    const radiusTo = parseFloat(getComputedStyle(image).borderTopLeftRadius) || 0;
    return [
      {
        transform: `translate(${dx}px, ${dy}px) scale(${scale})`,
        clipPath: `inset(${cropY}px ${cropX}px round ${radiusFrom}px)`,
      },
      { transform: 'translate(0px, 0px) scale(1)', clipPath: `inset(0px 0px round ${radiusTo}px)` },
    ];
  }

  /** Otwarcie z powiększeniem z miniatury. Zwraca false, gdy trzeba użyć zwykłej animacji. */
  async zoomIn(node, origin) {
    const image = node.querySelector('img.pl-lightbox-media');
    if (!image || !origin || prefersReducedMotion()) return false;
    node.classList.add('pl-lightbox-pending');
    await Promise.race([image.decode?.().catch(() => {}) ?? wait(0), wait(280)]);
    node.classList.remove('pl-lightbox-pending');
    if (!image.complete || !image.naturalWidth || this.current !== node || this.state !== 'open') return false;
    node.classList.remove('pl-loading');
    if ('fit' in node.dataset) this.fit(node);
    const frames = this.flipFrames(image, origin);
    if (!frames) return false;
    const timing = { duration: 560, easing: springEasing(), fill: 'backwards' };
    try {
      image.animate(frames, timing);
    } catch {
      image.animate(frames, { ...timing, easing: 'cubic-bezier(0.33, 0.5, 0.2, 1)' });
    }
    return true;
  }

  /** Zamknięcie z powrotem do miniatury. */
  zoomOut() {
    const node = this.current;
    const image = node?.querySelector('img.pl-lightbox-media');
    const origin = this.origin(this.index);
    if (!image || !origin?.isConnected || !image.naturalWidth || prefersReducedMotion() || node.style.translate) return false;
    const frames = this.flipFrames(image, origin);
    if (!frames) return false;
    this.el.classList.add('pl-lightbox-zooming');
    image.animate(frames.reverse(), { duration: 300, easing: 'cubic-bezier(0.3, 0, 0.2, 1)', fill: 'forwards' });
    return true;
  }

  async show(index = this.start) {
    if (this.state !== 'closed' || !this.items.length) return this;
    if (!this.el) this.build();
    const el = this.el;
    index = this.target(index) ?? 0;
    this.opener = document.activeElement;
    document.body.append(el);
    lockScroll();
    this.state = 'open';
    try {
      el.showModal();
    } catch (error) {
      console.error('[Plossy] lightbox:', error);
      this.finish();
      return this;
    }
    const node = this.go(index, 1, true);
    this.emit('show');
    const zoomed = node ? await this.zoomIn(node, this.items[index].el ? this.origin(index) : null) : false;
    if (!zoomed && node?.isConnected && this.state === 'open') node.classList.add('pl-lightbox-first');
    if (node) await settle([node, node.querySelector('.pl-lightbox-media')]);
    if (this.state === 'open') this.emit('shown');
    return this;
  }

  hide() {
    if (this.state !== 'open') return this.closing || Promise.resolve();
    this.state = 'closing';
    this.emit('hide');
    this.zoomOut();
    this.el.classList.add('pl-closing');
    const node = this.current;
    this.closing = settle([this.el.querySelector('.pl-lightbox-backdrop'), node, node?.querySelector('.pl-lightbox-media')]).then(() =>
      this.finish(),
    );
    return this.closing;
  }

  finish() {
    if (this.state === 'closed') return;
    const index = this.index;
    const item = this.items[index];
    this.state = 'closed';
    this.closing = null;
    const el = this.el;
    if (el) {
      el.querySelectorAll('video').forEach((video) => video.pause());
      if (el.open) el.close();
    }
    window.removeEventListener('resize', this.onResize);
    unlockScroll();
    const focusTarget = item?.el?.isConnected ? item.el : this.opener;
    if (focusTarget?.isConnected && focusTarget !== document.body) focusTarget.focus?.({ preventScroll: true });
    // Zdarzenie wysyłamy jeszcze z poprawnym indeksem (i przed usunięciem okna), potem sprzątamy.
    this.emit('hidden', { index, item });
    el?.remove();
    this.el = null;
    this.current = null;
    this.index = -1;
  }

  destroy() {
    this.finish();
  }
}

class Lightbox extends Component {
  static defaults = {
    animation: 'slide', // slide | fade
    loop: true, // po ostatniej pozycji wraca do pierwszej
    thumbs: false, // pasek miniatur
    counter: true, // licznik „3 / 8"
  };

  init() {
    this.panel = null;
    this.on(this.el, 'click', (event) => {
      if (event.defaultPrevented || event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target.closest('a[href]');
      if (!link) return;
      const index = this.links.indexOf(link);
      if (index < 0) return;
      event.preventDefault();
      this.show(index);
    });
    this.onDestroy(() => this.panel?.destroy());
  }

  /** Odnośniki tworzące galerię (obrazy, wideo, iframe). */
  get links() {
    const all = this.el.matches('a[href]') ? [this.el] : $$('a[href]', this.el);
    return all.filter((link) => !link.closest('[data-pl-lightbox-ignore]') && detectType(link.getAttribute('href'), link.dataset.type));
  }

  get items() {
    return this.links.map((link) => {
      const image = link.querySelector('img');
      const source = link.getAttribute('href');
      return {
        source,
        type: detectType(source, link.dataset.type),
        caption: link.dataset.caption ?? (image?.alt || link.title || ''),
        alt: image?.alt || link.dataset.alt || '',
        thumb: link.dataset.thumb || image?.currentSrc || image?.src || '',
        poster: link.dataset.poster || '',
        el: link,
      };
    });
  }

  get index() {
    return this.panel?.index ?? -1;
  }

  show(index = 0) {
    if (this.panel && this.panel.state !== 'closed') {
      this.panel.go(index);
      return Promise.resolve(this.panel);
    }
    const items = this.items;
    if (!items.length) return Promise.resolve(null);
    this.panel = new LightboxPanel({
      ...this.options,
      items,
      index,
      emit: (type, detail) => this.emit(type, detail),
    });
    return this.panel.show(index);
  }

  hide() {
    return this.panel?.hide() ?? Promise.resolve();
  }

  next() {
    this.panel?.next();
  }

  prev() {
    this.panel?.prev();
  }
}

register('lightbox', Lightbox);

/** Plossy.lightboxPanel({ items, index, animation, loop, thumbs, counter }) → panel (show / hide / go / next / prev). */
api.lightboxPanel = (options = {}) => {
  const panel = new LightboxPanel(options);
  panel.show(options.index ?? 0);
  return panel;
};

export { LightboxPanel };
export default Lightbox;
