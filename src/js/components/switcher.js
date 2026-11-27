import { Component, register, $$, uid, queryTargets, animationsDone, rafThrottle, prefersReducedMotion } from '../core.js';

const SKIP = '.pl-nav-header, .pl-nav-divider, .pl-tab-indicator, [hidden]';

/**
 * Switcher
 * <ul class="pl-tab" data-pl-switcher="connect: #panele">
 *   <li class="pl-active"><a href="#">…</a></li>
 * </ul>
 * <div class="pl-switcher" id="panele"><div>…</div></div>
 */
class Switcher extends Component {
  static defaults = {
    connect: null, // selektor kontenera paneli; domyślnie następne rodzeństwo .pl-switcher
    toggle: null, // selektor pozycji, np. '> *'; domyślnie '> li' lub bezpośrednie dzieci
    active: null, // indeks pozycji aktywnej na starcie
    animation: true, // true → delikatne wejście; false → brak; klasa lub „klasa-naprzód, klasa-wstecz"
    swiping: true, // przesunięcie palcem zmienia panel
    followHash: false, // synchronizacja z adresem (#id panelu lub href pozycji)
  };

  static primary = 'connect';

  init() {
    const { el, options } = this;
    this.current = -1;
    this.token = 0;

    const items = this.items;
    let start = items.findIndex((item) => item.classList.contains('pl-active'));
    if (typeof options.active === 'number') start = options.active;
    if (options.followHash) {
      const fromHash = this.indexFromHash();
      if (fromHash > -1) start = fromHash;
    }
    if (start < 0 || !items[start] || this.disabled(items[start])) start = items.findIndex((item) => !this.disabled(item));

    this.on(el, 'click', (event) => {
      const item = this.itemOf(event.target);
      if (!item) return;
      if (event.target.closest('a')) event.preventDefault();
      if (this.disabled(item)) return;
      this.show(this.items.indexOf(item));
    });

    this.on(el, 'keydown', (event) => this.onKeydown(event));

    // Nawigacja z wnętrza paneli + gesty — delegowane, bo kontener może pojawić się później.
    this.on(document, 'click', (event) => {
      const trigger = event.target.closest?.('[data-pl-switcher-item]');
      if (!trigger) return;
      const container = this.containerOf(trigger);
      if (!container) return;
      event.preventDefault();
      const value = trigger.getAttribute('data-pl-switcher-item');
      this.show(/^\d+$/.test(value) ? Number(value) : value);
    });

    if (options.swiping) this.bindSwipe();

    if (options.followHash) {
      this.on(window, 'hashchange', () => {
        const index = this.indexFromHash();
        if (index > -1) this.show(index);
      });
    }

    // Wskaźnik: przelicz przy zmianie rozmiaru i po załadowaniu fontów.
    this.updateIndicator = rafThrottle(() => this.setIndicator());
    if (typeof ResizeObserver === 'function') {
      const observer = new ResizeObserver(this.updateIndicator);
      observer.observe(el);
      items.forEach((item) => observer.observe(item));
      this.onDestroy(() => observer.disconnect());
    }
    this.on(window, 'resize', this.updateIndicator, { passive: true });
    document.fonts?.ready.then(() => this.setIndicator()).catch(() => {});

    this.activate(start, false);
    requestAnimationFrame(() => {
      this.setIndicator();
      requestAnimationFrame(() => el.classList.add('pl-switcher-ready'));
    });
  }

  // ── Struktura ───────────────────────────────────────────────────────────

  get items() {
    const { el, options } = this;
    let items;
    if (options.toggle) items = queryTargets(el, options.toggle).filter((item) => el.contains(item));
    else {
      items = $$(':scope > li', el);
      if (!items.length) items = [...el.children];
    }
    return items.filter((item) => !item.matches(SKIP));
  }

  /** Kontenery paneli (może być ich kilka). */
  get containers() {
    const { el, options } = this;
    if (options.connect) return queryTargets(el, options.connect);
    let next = el.nextElementSibling;
    while (next && !next.classList.contains('pl-switcher')) next = next.nextElementSibling;
    return next ? [next] : [];
  }

  get index() {
    return this.current;
  }

  get vertical() {
    const { el } = this;
    if (el.matches('.pl-tab-left, .pl-tab-right, .pl-nav')) return true;
    return getComputedStyle(el).flexDirection.startsWith('column');
  }

  /** Element z rolą „tab": link / przycisk w pozycji albo sama pozycja. */
  tabOf(item) {
    return item.matches('a, button') ? item : item.querySelector('a, button') || item;
  }

  itemOf(node) {
    return this.items.find((item) => item.contains(node)) || null;
  }

  disabled(item) {
    return item.classList.contains('pl-disabled') || this.tabOf(item).matches(':disabled, [aria-disabled="true"]');
  }

  containerOf(node) {
    return (
      this.containers.find((container) => {
        if (!container.contains(node)) return false;
        // Pomiń wyzwalacze należące do zagnieżdżonego switchera.
        const nearest = node.closest('.pl-switcher');
        return !container.classList.contains('pl-switcher') || nearest === container;
      }) || null
    );
  }

  indexFromHash() {
    const hash = decodeURIComponent(location.hash);
    if (hash.length < 2) return -1;
    const items = this.items;
    const byHref = items.findIndex((item) => this.tabOf(item).getAttribute('href') === hash);
    if (byHref > -1) return byHref;
    for (const container of this.containers) {
      const byId = [...container.children].findIndex((panel) => `#${panel.id}` === hash);
      if (byId > -1) return byId;
    }
    return -1;
  }

  // ── Interakcja ──────────────────────────────────────────────────────────

  onKeydown(event) {
    const item = this.itemOf(event.target);
    if (!item || event.target !== this.tabOf(item)) return;
    const items = this.items.filter((entry) => !this.disabled(entry));
    const position = items.indexOf(item);
    if (position < 0) return;
    const vertical = this.vertical;
    const rtl = getComputedStyle(this.el).direction === 'rtl';
    const prevKey = vertical ? 'ArrowUp' : rtl ? 'ArrowRight' : 'ArrowLeft';
    const nextKey = vertical ? 'ArrowDown' : rtl ? 'ArrowLeft' : 'ArrowRight';
    let target;
    if (event.key === nextKey) target = items[(position + 1) % items.length];
    else if (event.key === prevKey) target = items[(position - 1 + items.length) % items.length];
    else if (event.key === 'Home') target = items[0];
    else if (event.key === 'End') target = items[items.length - 1];
    else if ((event.key === 'Enter' || event.key === ' ') && !event.target.matches('button')) target = item;
    if (!target) return;
    event.preventDefault();
    this.show(this.items.indexOf(target));
    this.tabOf(target).focus();
  }

  bindSwipe() {
    let startX = 0;
    let startY = 0;
    let tracking = null;
    this.on(
      document,
      'touchstart',
      (event) => {
        tracking = event.touches.length === 1 ? this.containerOf(event.target) : null;
        if (!tracking) return;
        startX = event.touches[0].clientX;
        startY = event.touches[0].clientY;
      },
      { passive: true },
    );
    this.on(
      document,
      'touchend',
      (event) => {
        if (!tracking) return;
        tracking = null;
        const touch = event.changedTouches[0];
        const dx = touch.clientX - startX;
        const dy = touch.clientY - startY;
        if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
        const items = this.items;
        // Bez zapętlania — gest na skraju nic nie robi.
        let index = this.current;
        do index += dx < 0 ? 1 : -1;
        while (items[index] && this.disabled(items[index]));
        if (items[index]) this.show(index);
      },
      { passive: true },
    );
  }

  // ── Stan ────────────────────────────────────────────────────────────────

  resolve(index) {
    const items = this.items;
    if (index === 'next' || index === 'previous') {
      const step = index === 'next' ? 1 : -1;
      let candidate = this.current;
      for (let i = 0; i < items.length; i++) {
        candidate = (candidate + step + items.length) % items.length;
        if (!this.disabled(items[candidate])) return candidate;
      }
      return -1;
    }
    if (index instanceof Element) return items.findIndex((item) => item === index || item.contains(index));
    index = Number(index);
    return Number.isInteger(index) && items[index] ? index : -1;
  }

  show(index) {
    index = this.resolve(index);
    if (index < 0 || index === this.current) return;
    if (!this.emit('beforeshow', { index, item: this.items[index] }, true)) return;
    this.activate(index, true);
  }

  activate(index, animate) {
    const { el, options } = this;
    const items = this.items;
    const previous = this.current;
    const forward = previous < 0 || index > previous;
    this.current = index;

    // Role i stan pozycji.
    const tablist = items.length && items.every((item) => this.tabOf(item) !== item || item.matches('a, button'));
    if (tablist) {
      el.setAttribute('role', 'tablist');
      if (this.vertical) el.setAttribute('aria-orientation', 'vertical');
      else el.removeAttribute('aria-orientation');
      // Nagłówki i separatory między zakładkami nie są zakładkami.
      for (const child of el.children) {
        if (!items.includes(child) && !child.hasAttribute('role')) child.setAttribute('role', 'presentation');
      }
    }
    const containers = this.containers;
    items.forEach((item, i) => {
      const tab = this.tabOf(item);
      const active = i === index;
      item.classList.toggle('pl-active', active);
      if (tab !== item) item.setAttribute('role', 'presentation');
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      tab.id ||= uid('pl-tab');
      if (this.disabled(item)) tab.setAttribute('aria-disabled', 'true');
      const panel = containers[0]?.children[i];
      if (panel) tab.setAttribute('aria-controls', (panel.id ||= uid('pl-panel')));
    });

    // Panele.
    const token = ++this.token;
    const { signal } = this;
    const detail = { index, previous, item: items[index] };
    if (animate && previous > -1) this.emit('hide', { index: previous, item: items[previous] });
    const pending = [];
    for (const container of containers) {
      [...container.children].forEach((panel, i) => {
        const active = i === index;
        const was = panel.classList.contains('pl-active');
        panel.classList.toggle('pl-active', active);
        panel.setAttribute('role', 'tabpanel');
        const tab = items[i] && this.tabOf(items[i]);
        if (tab) panel.setAttribute('aria-labelledby', tab.id);
        if (active && !was && animate) pending.push(this.animateIn(panel, forward));
      });
    }

    this.setIndicator();

    if (!animate) return;
    if (previous > -1) this.emit('hidden', { index: previous, item: items[previous] });
    this.emit('show', detail);
    if (options.followHash) {
      const panel = containers[0]?.children[index];
      const href = this.tabOf(items[index]).getAttribute('href');
      const hash = href && href.length > 1 && href.startsWith('#') ? href : panel?.id ? `#${panel.id}` : '';
      if (hash && hash !== location.hash) history.replaceState(null, '', hash);
    }
    Promise.all(pending).then(() => {
      if (!signal.aborted && token === this.token) this.emit('shown', detail);
    });
  }

  async animateIn(panel, forward) {
    const { animation } = this.options;
    if (!animation || prefersReducedMotion()) return;
    let classes;
    if (animation === true) {
      classes = ['pl-switcher-enter'];
      panel.style.setProperty('--pl-switcher-dir', forward ? '1' : '-1');
    } else {
      const [ahead, back] = String(animation).split(',').map((name) => name.trim().split(/\s+/).filter(Boolean));
      classes = forward || !back?.length ? ahead : back;
    }
    // Zdejmij pozostałości po przerwanej animacji.
    const stale = (panel.dataset.plSwitcherAnim || '').split(' ').filter(Boolean);
    panel.classList.remove(...stale);
    void panel.offsetWidth;
    panel.classList.add(...classes);
    panel.dataset.plSwitcherAnim = classes.join(' ');
    await animationsDone(panel);
    if (panel.dataset.plSwitcherAnim === classes.join(' ') && panel.classList.contains('pl-active')) {
      panel.classList.remove(...classes);
      delete panel.dataset.plSwitcherAnim;
    } else if (!panel.classList.contains('pl-active')) {
      panel.classList.remove(...classes);
    }
  }

  /** Zapisuje położenie aktywnej pozycji w zmiennych --pl-indicator-* (px względem elementu). */
  setIndicator() {
    const { el } = this;
    const item = this.items[this.current];
    if (!item || !el.isConnected) return;
    const base = el.getBoundingClientRect();
    const rect = item.getBoundingClientRect();
    if (!base.width && !base.height) return;
    // Skala z transformacji przodków (np. animacja wejścia modala) nie może zafałszować pomiaru.
    const scaleX = el.offsetWidth ? base.width / el.offsetWidth : 1;
    const scaleY = el.offsetHeight ? base.height / el.offsetHeight : 1;
    const x = (rect.left - base.left) / (scaleX || 1) - el.clientLeft + el.scrollLeft;
    const y = (rect.top - base.top) / (scaleY || 1) - el.clientTop + el.scrollTop;
    const set = (name, value) => el.style.setProperty(`--pl-indicator-${name}`, `${Math.round(value * 100) / 100}px`);
    set('x', x);
    set('y', y);
    set('w', item.offsetWidth);
    set('h', item.offsetHeight);
  }
}

register('switcher', Switcher);
export default Switcher;
