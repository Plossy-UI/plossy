import { Component, register, $$, parseOptions, prefersReducedMotion } from '../core.js';

const EASE = 'cubic-bezier(0.33, 0.5, 0.2, 1)';
const CONTROL = '[data-pl-filter-control]';
const collator = typeof Intl !== 'undefined' ? new Intl.Collator('pl', { numeric: true, sensitivity: 'base' }) : null;

/** Rozbiera atrybut kontrolki na { filter, group, sort, order }. */
function parseControl(control) {
  const raw = control.getAttribute('data-pl-filter-control') || '';
  const parsed = parseOptions(raw, { filter: '', group: '', sort: '', order: 'asc' }, 'filter');
  for (const key of Object.keys(parsed)) parsed[key] = parsed[key] === null ? '' : String(parsed[key]);
  if (!('filter' in parsed) && !('sort' in parsed)) parsed.filter = '';
  return parsed;
}

/**
 * Filter — filtrowanie i sortowanie elementów z animacją FLIP.
 * <div data-pl-filter="target: .js-filter">
 *   <ul class="pl-subnav pl-subnav-pill">
 *     <li class="pl-active" data-pl-filter-control><a href="#">Wszystko</a></li>
 *     <li data-pl-filter-control="[data-color='blue']"><a href="#">Niebieskie</a></li>
 *   </ul>
 *   <div class="pl-grid js-filter">…</div>
 * </div>
 */
class Filter extends Component {
  static defaults = {
    target: '', // selektor kontenera z elementami
    selActive: false, // selektor kontrolek aktywnych na starcie
    animation: 'slide', // slide | fade | delayed-fade | false
    duration: 250,
  };
  static primary = 'target';

  init() {
    this.state = { filter: { '': '' }, sort: [] };
    this.pending = null;

    const { selActive } = this.options;
    const initial = selActive ? $$(String(selActive), this.el) : this.controls.filter((c) => c.classList.contains('pl-active'));
    initial.forEach((control) => this.merge(control));

    for (const control of this.controls) {
      if (!control.matches('a, button') && !control.querySelector('a, button')) {
        control.setAttribute('role', 'button');
        if (!control.hasAttribute('tabindex')) control.tabIndex = 0;
      }
    }

    this.on(this.el, 'click', (event) => {
      const control = event.target.closest(CONTROL);
      if (!control || !this.el.contains(control)) return;
      event.preventDefault();
      this.apply(control);
    });
    this.on(this.el, 'keydown', (event) => {
      if ((event.key !== 'Enter' && event.key !== ' ') || !event.target.matches?.(`${CONTROL}[role="button"]`)) return;
      event.preventDefault();
      this.apply(event.target);
    });
    this.onDestroy(() => this.finishAnimations());

    this.setState(this.state, false);
  }

  get controls() {
    return $$(CONTROL, this.el);
  }

  get targets() {
    const { target } = this.options;
    if (!target) return [];
    const inside = $$(target, this.el);
    return inside.length ? inside : $$(target);
  }

  /** Elementy widoczne po ostatnim filtrowaniu. */
  get visible() {
    return this.targets.flatMap((target) => [...target.children].filter((el) => !el.hidden));
  }

  getState() {
    return { filter: { ...this.state.filter }, sort: [...this.state.sort] };
  }

  /** Dokłada ustawienia kontrolki do stanu. */
  merge(control, state = this.state) {
    const o = parseControl(control);
    if ('filter' in o) {
      if (o.group) {
        delete state.filter[''];
        state.filter[o.group] = o.filter;
      } else {
        state.filter = { '': o.filter };
      }
    }
    if ('sort' in o) state.sort = o.sort ? [o.sort, o.order === 'desc' ? 'desc' : 'asc'] : [];
    return state;
  }

  isActive(control) {
    const o = parseControl(control);
    const { filter, sort } = this.state;
    let ok = true;
    if ('filter' in o) {
      const group = o.group || '';
      ok = group in filter ? filter[group] === o.filter : !o.filter && group !== '' && !filter[''];
    }
    if (ok && 'sort' in o) ok = sort[0] === o.sort && (sort[1] || 'asc') === (o.order === 'desc' ? 'desc' : 'asc');
    return ok;
  }

  /** Stosuje kontrolkę (element) — jak kliknięcie. */
  apply(control) {
    return this.setState(this.merge(control, this.getState()));
  }

  /** Przywraca wszystkie elementy i pierwotną kolejność filtrów. */
  reset() {
    return this.setState({ filter: { '': '' }, sort: this.state.sort });
  }

  /** Ustawia stan { filter: { grupa: selektor }, sort: [atrybut, 'asc'|'desc'] }. */
  setState(state, animate = true) {
    state = { filter: { ...(state.filter || { '': '' }) }, sort: [...(state.sort || [])] };
    if (!this.emit('beforefilter', { state }, true)) return Promise.resolve();
    this.state = state;

    for (const control of this.controls) {
      const active = this.isActive(control);
      control.classList.toggle('pl-active', active);
      const button = control.matches('a, button, [role="button"]') ? control : control.querySelector('a, button');
      button?.setAttribute('aria-pressed', String(active));
    }

    this.finishAnimations();
    const animation = animate && !prefersReducedMotion() && this.options.duration > 0 ? this.options.animation : false;
    const jobs = this.targets.map((target) => this.filterTarget(target, animation));
    return Promise.all(jobs).then(() => {
      if (this.state !== state) return;
      const items = this.visible;
      for (const empty of $$('.pl-filter-empty', this.el)) empty.hidden = items.length > 0;
      this.emit('afterfilter', { state, items });
    });
  }

  filterTarget(target, animation) {
    const children = [...target.children];
    const selectors = Object.values(this.state.filter).filter(Boolean);
    const matches = (el) =>
      selectors.every((selector) => {
        try {
          return el.matches(selector);
        } catch {
          return true; // błędny selektor niczego nie ukrywa
        }
      });
    const [attribute, order] = this.state.sort;
    let sorted = children;
    if (attribute) {
      const compare = (a, b) => (collator ? collator.compare(a, b) : a < b ? -1 : a > b ? 1 : 0);
      sorted = [...children].sort(
        (a, b) => compare(a.getAttribute(attribute) || '', b.getAttribute(attribute) || '') * (order === 'desc' ? -1 : 1),
      );
    }
    const mutate = () => {
      for (const el of children) el.hidden = !matches(el);
      if (sorted.some((el, i) => el !== children[i])) target.append(...sorted);
    };

    if (!animation || typeof target.animate !== 'function') {
      mutate();
      return Promise.resolve();
    }
    return animation === 'slide' ? this.slide(target, children, mutate) : this.fade(target, children, mutate, animation === 'delayed-fade');
  }

  /** Natychmiast kończy trwające animacje (np. przy szybkim klikaniu). */
  finishAnimations() {
    const pending = this.pending;
    this.pending = null;
    pending?.forEach((finish) => finish());
  }

  track(animations, cleanup) {
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      animations.forEach((animation) => animation.cancel());
      cleanup?.();
    };
    (this.pending ||= []).push(finish);
    return Promise.allSettled(animations.map((animation) => animation.finished)).then(finish);
  }

  /** FLIP: zostające suną na nowe miejsca, nowe wchodzą, usuwane znikają w miejscu. */
  slide(target, children, mutate) {
    const { duration } = this.options;
    const before = new Map(children.filter((el) => !el.hidden).map((el) => [el, el.getBoundingClientRect()]));
    const heightBefore = target.offsetHeight;
    mutate();
    const heightAfter = target.offsetHeight;
    const after = new Map(children.filter((el) => !el.hidden).map((el) => [el, el.getBoundingClientRect()]));
    const box = target.getBoundingClientRect();
    const animations = [];
    const restore = [];

    const targetCss = target.style.cssText;
    if (getComputedStyle(target).position === 'static') target.style.position = 'relative';
    restore.push(() => (target.style.cssText = targetCss));

    for (const el of children) {
      const a = before.get(el);
      const b = after.get(el);
      if (a && b) {
        const dx = a.left - b.left;
        const dy = a.top - b.top;
        if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) continue;
        animations.push(el.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'none' }], { duration, easing: EASE }));
      } else if (b) {
        animations.push(
          el.animate(
            [
              { opacity: 0, transform: 'scale(0.9)' },
              { opacity: 1, transform: 'none' },
            ],
            { duration, delay: duration * 0.2, easing: EASE, fill: 'backwards' },
          ),
        );
      } else if (a) {
        // Wychodzący element zostaje na chwilę „przypięty" w starym miejscu, poza układem.
        const css = el.style.cssText;
        el.hidden = false;
        Object.assign(el.style, {
          position: 'absolute',
          left: `${a.left - box.left - target.clientLeft + target.scrollLeft}px`,
          top: `${a.top - box.top - target.clientTop + target.scrollTop}px`,
          width: `${a.width}px`,
          height: `${a.height}px`,
          margin: '0',
          boxSizing: 'border-box',
          pointerEvents: 'none',
        });
        restore.push(() => {
          el.style.cssText = css;
          el.hidden = true;
        });
        animations.push(
          el.animate(
            [
              { opacity: 1, transform: 'none' },
              { opacity: 0, transform: 'scale(0.88)' },
            ],
            { duration: duration * 0.8, easing: EASE, fill: 'forwards' },
          ),
        );
      }
    }
    if (Math.abs(heightBefore - heightAfter) > 1) {
      animations.push(target.animate([{ height: `${heightBefore}px` }, { height: `${heightAfter}px` }], { duration, easing: EASE }));
    }
    return this.track(animations, () => restore.forEach((fn) => fn()));
  }

  /** Stary układ zanika, nowy się pojawia (opcjonalnie kaskadowo). */
  async fade(target, children, mutate, delayed) {
    const { duration } = this.options;
    const half = duration / 2;
    const step = delayed ? Math.min(45, duration / 4) : 0;
    const state = this.state;
    const out = children
      .filter((el) => !el.hidden)
      .map((el, i) =>
        el.animate([{ opacity: 1 }, { opacity: 0, transform: delayed ? 'translateY(-6px)' : 'none' }], {
          duration: half,
          delay: i * step,
          easing: EASE,
          fill: 'forwards',
        }),
      );
    await this.track(out);
    // Przerwane przez nowe filtrowanie — nowy przebieg sam ustawi widoczność.
    if (this.state !== state) return;
    mutate();
    const into = [...target.children]
      .filter((el) => !el.hidden)
      .map((el, i) =>
        el.animate([{ opacity: 0, transform: delayed ? 'translateY(8px)' : 'none' }, { opacity: 1, transform: 'none' }], {
          duration: half,
          delay: i * step,
          easing: EASE,
          fill: 'backwards',
        }),
      );
    await this.track(into);
  }
}

register('filter', Filter);
export default Filter;
