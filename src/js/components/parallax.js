import { Component, register, queryTargets, clamp, rafThrottle, prefersReducedMotion } from '../core.js';

const BREAKPOINTS = { s: 640, m: 960, l: 1200, xl: 1600 };

function toMedia(value) {
  if (value === false || value === null || value === undefined || value === '') return null;
  if (typeof value === 'string' && value.startsWith('@')) value = BREAKPOINTS[value.slice(1)] ?? 0;
  if (typeof value === 'number' || /^\d+$/.test(value)) return matchMedia(`(min-width: ${value}px)`);
  return matchMedia(value);
}

// Właściwość → [wartość spoczynkowa, domyślna jednostka].
const PROPS = {
  x: [0, 'px'],
  y: [0, 'px'],
  scale: [1, ''],
  rotate: [0, 'deg'],
  opacity: [1, ''],
  blur: [0, 'px'],
  grayscale: [0, '%'],
  saturate: [100, '%'],
  brightness: [100, '%'],
  hue: [0, 'deg'],
  bgx: [0, 'px'],
  bgy: [0, 'px'],
};

const FILTERS = { blur: 'blur', grayscale: 'grayscale', saturate: 'saturate', brightness: 'brightness', hue: 'hue-rotate' };

/** „-80" → [spoczynek, -80]; „1,1.2" → [1, 1.2]; dowolna liczba przystanków, opcjonalne jednostki. */
function parseStops(value, name) {
  const [rest, defaultUnit] = PROPS[name];
  const parts = String(value)
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean);
  let unit = defaultUnit;
  const stops = parts.map((part) => {
    const match = part.match(/^(-?[\d.]+)([a-z%]*)$/i);
    if (!match) return 0;
    if (match[2]) unit = match[2];
    return parseFloat(match[1]);
  });
  if (stops.length === 1) stops.unshift(rest);
  return { stops, unit };
}

function valueAt(stops, progress) {
  const last = stops.length - 1;
  const position = progress * last;
  const index = Math.min(Math.floor(position), last - 1);
  const from = stops[index];
  return from + (stops[index + 1] - from) * (position - index);
}

/** Długość opcji start/end: px, vh albo % wysokości celu. */
function toPx(value, height) {
  if (typeof value === 'number') return value;
  const number = parseFloat(value);
  if (Number.isNaN(number)) return 0;
  if (String(value).endsWith('vh')) return (window.innerHeight * number) / 100;
  if (String(value).endsWith('%')) return (height * number) / 100;
  return number;
}

/** Położenie elementu w dokumencie z pominięciem transformacji (własnych i przodków). */
function documentTop(el) {
  let top = 0;
  for (let node = el; node; node = node.offsetParent) top += node.offsetTop + (node !== el ? node.clientTop : 0);
  return top;
}

/**
 * Parallax
 * <div data-pl-parallax="y: -80">…</div>
 * <img data-pl-parallax="scale: 1,1.2; opacity: 1,0.3; target: !.sekcja">
 */
class Parallax extends Component {
  static defaults = {
    x: null,
    y: null,
    scale: null,
    rotate: null,
    opacity: null,
    blur: null,
    grayscale: null,
    saturate: null,
    brightness: null,
    hue: null,
    bgx: null,
    bgy: null,
    easing: 1, // wykładnik krzywej: 1 liniowo, >1 wolny start, <1 szybki start
    start: 0, // przesunięcie początku (px, vh, % wysokości celu)
    end: 0, // przesunięcie końca
    media: false, // aktywny od podanej szerokości
    target: false, // element, którego przejście przez okno wyznacza postęp ('!.x' → najbliższy przodek)
  };

  init() {
    const { el, options } = this;
    this.props = {};
    for (const name of Object.keys(PROPS)) {
      if (options[name] !== null && options[name] !== '') this.props[name] = parseStops(options[name], name);
    }
    this.media = toMedia(options.media);
    this.visible = true;
    this.progress = -1;
    this.applied = false;

    if (!Object.keys(this.props).length) return;

    this.update = rafThrottle(() => this.refresh());
    this.on(window, 'scroll', () => this.visible && this.update(), { passive: true });
    this.on(window, 'resize', () => this.refresh(true), { passive: true });
    this.on(window, 'load', () => this.refresh(true));
    this.on(this.media, 'change', () => this.refresh(true));
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    this.on(motion, 'change', () => this.refresh(true));

    if (typeof IntersectionObserver === 'function') {
      // Poza ekranem nic nie liczymy; margines pokrywa przesunięcia z transformacji.
      const observer = new IntersectionObserver(
        ([entry]) => {
          this.visible = entry.isIntersecting;
          if (this.visible) this.refresh();
        },
        { rootMargin: '50% 0px' },
      );
      observer.observe(this.target);
      this.onDestroy(() => observer.disconnect());
    }

    if ('bgx' in this.props || 'bgy' in this.props) this.prepareBackground();

    this.onDestroy(() => this.reset());
    this.refresh(true);
  }

  get target() {
    const { el, options } = this;
    if (!options.target) return el;
    const selector = String(options.target);
    if (selector.startsWith('!')) return el.closest(selector.slice(1).trim()) || el;
    return queryTargets(el, selector)[0] || el;
  }

  get enabled() {
    return (!this.media || this.media.matches) && !prefersReducedMotion();
  }

  /** Powiększa tło tak, by przesuwanie nie odsłoniło pustych krawędzi. */
  prepareBackground() {
    const { el } = this;
    const source = getComputedStyle(el).backgroundImage.match(/url\(["']?(.*?)["']?\)/)?.[1];
    if (!source) return;
    const image = new Image();
    image.onload = () => {
      this.image = { width: image.naturalWidth, height: image.naturalHeight };
      this.refresh(true);
    };
    image.src = source;
  }

  sizeBackground() {
    const { el, image, props } = this;
    if (!image || !image.width || !image.height) return;
    const range = (name) => (props[name] && props[name].unit === 'px' ? Math.max(...props[name].stops) - Math.min(...props[name].stops) : 0);
    const width = el.offsetWidth + range('bgx');
    const height = el.offsetHeight + range('bgy');
    const scale = Math.max(width / image.width, height / image.height);
    el.style.backgroundSize = `${Math.ceil(image.width * scale)}px ${Math.ceil(image.height * scale)}px`;
    el.style.backgroundRepeat = 'no-repeat';
  }

  refresh(force = false) {
    const { el, options, props } = this;
    if (!this.enabled) {
      this.reset();
      return;
    }
    if (force) {
      this.progress = -1;
      this.sizeBackground();
    }

    const target = this.target;
    const height = target.offsetHeight;
    const viewport = window.innerHeight;
    const root = document.scrollingElement || document.documentElement;
    const top = documentTop(target);
    const maxScroll = Math.max(0, root.scrollHeight - viewport);
    // Postęp 0 → cel wchodzi od dołu; 1 → wychodzi górą (przycięte do zakresu przewijania strony).
    const from = Math.max(0, top - viewport + toPx(options.start, height));
    const to = Math.min(maxScroll, top + height - toPx(options.end, height));
    let progress = to > from ? clamp((window.scrollY - from) / (to - from), 0, 1) : 0;
    const easing = Number(options.easing);
    if (easing > 0 && easing !== 1) progress **= easing;
    if (Math.abs(progress - this.progress) < 0.0005) return;
    this.progress = progress;

    const value = (name) => valueAt(props[name].stops, progress);
    const unit = (name) => props[name].unit;

    const transform = [];
    if (props.x || props.y) {
      const x = props.x ? `${value('x').toFixed(2)}${unit('x')}` : '0';
      const y = props.y ? `${value('y').toFixed(2)}${unit('y')}` : '0';
      transform.push(`translate3d(${x}, ${y}, 0)`);
    }
    if (props.rotate) transform.push(`rotate(${value('rotate').toFixed(3)}${unit('rotate')})`);
    if (props.scale) transform.push(`scale(${value('scale').toFixed(4)})`);
    if (transform.length) el.style.transform = transform.join(' ');

    if (props.opacity) el.style.opacity = value('opacity').toFixed(3);

    const filter = Object.keys(FILTERS)
      .filter((name) => props[name])
      .map((name) => `${FILTERS[name]}(${value(name).toFixed(2)}${unit(name)})`);
    if (filter.length) el.style.filter = filter.join(' ');

    if (props.bgx || props.bgy) {
      // Przesunięcie liczone wokół środka zakresu — zapas tła rozkłada się po równo na obie strony.
      const centered = (name) => {
        const { stops } = props[name];
        return (value(name) - (Math.max(...stops) + Math.min(...stops)) / 2).toFixed(2);
      };
      const bgx = props.bgx ? `calc(50% + ${centered('bgx')}${unit('bgx')})` : '50%';
      const bgy = props.bgy ? `calc(50% + ${centered('bgy')}${unit('bgy')})` : '50%';
      el.style.backgroundPosition = `${bgx} ${bgy}`;
    }

    if (!this.applied) {
      this.applied = true;
      const hints = [];
      if (transform.length) hints.push('transform');
      if (props.opacity) hints.push('opacity');
      if (filter.length) hints.push('filter');
      if (hints.length) el.style.willChange = hints.join(', ');
    }
  }

  /** Przywraca element do stanu bez efektu. */
  reset() {
    if (!this.applied) return;
    this.applied = false;
    this.progress = -1;
    for (const prop of ['transform', 'opacity', 'filter', 'willChange', 'backgroundPosition', 'backgroundSize', 'backgroundRepeat']) {
      this.el.style[prop] = '';
    }
  }
}

register('parallax', Parallax);
export default Parallax;
