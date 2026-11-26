import { Component, register, $$, uid, toggleHeight } from '../core.js';

/**
 * Accordion
 * <div class="pl-accordion" data-pl-accordion>
 *   <div class="pl-accordion-item pl-open">
 *     <button class="pl-accordion-title" type="button">…</button>
 *     <div class="pl-accordion-content">…</div>
 *   </div>
 * </div>
 */
class Accordion extends Component {
  static defaults = {
    multiple: false, // pozwala otworzyć wiele pozycji naraz
    collapsible: true, // pozwala zamknąć wszystkie pozycje
    active: null, // indeks pozycji otwartej na starcie
    duration: 380,
  };

  init() {
    this.items.forEach((item, index) => {
      const { title, content } = this.parts(item);
      if (!title || !content) return;
      const open = item.classList.contains('pl-open') || this.options.active === index;
      item.classList.toggle('pl-open', open);
      content.hidden = !open;
      content.id ||= uid('pl-accordion');
      title.id ||= uid('pl-accordion-title');
      title.setAttribute('aria-controls', content.id);
      title.setAttribute('aria-expanded', String(open));
      content.setAttribute('role', 'region');
      content.setAttribute('aria-labelledby', title.id);
      if (!title.matches('button, a[href]')) {
        title.setAttribute('role', 'button');
        title.tabIndex = 0;
      }
    });

    this.on(this.el, 'click', (event) => {
      const title = event.target.closest('.pl-accordion-title');
      const item = title?.closest('.pl-accordion-item');
      if (!item || item.parentElement !== this.el) return;
      event.preventDefault();
      this.toggle(item);
    });

    this.on(this.el, 'keydown', (event) => {
      const title = event.target.closest('.pl-accordion-title');
      if (!title || title.closest('.pl-accordion-item')?.parentElement !== this.el) return;
      const titles = this.items.map((item) => this.parts(item).title).filter(Boolean);
      const index = titles.indexOf(title);
      const move = { ArrowDown: index + 1, ArrowUp: index - 1, Home: 0, End: titles.length - 1 }[event.key];
      if (move !== undefined) {
        event.preventDefault();
        titles[(move + titles.length) % titles.length].focus();
      } else if ((event.key === 'Enter' || event.key === ' ') && !title.matches('button, a[href]')) {
        event.preventDefault();
        this.toggle(title.closest('.pl-accordion-item'));
      }
    });
  }

  get items() {
    return $$(':scope > .pl-accordion-item', this.el);
  }

  parts(item) {
    return {
      title: item.querySelector(':scope > .pl-accordion-title'),
      content: item.querySelector(':scope > .pl-accordion-content'),
    };
  }

  resolve(item) {
    return typeof item === 'number' ? this.items[item] : item;
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
      this.items.filter((other) => other !== item && other.classList.contains('pl-open')).forEach((other) => this.hide(other, true));
    }
    const { title, content } = this.parts(item);
    item.classList.add('pl-open');
    title.setAttribute('aria-expanded', 'true');
    this.emit('show', { item });
    await toggleHeight(content, true, { duration: this.options.duration });
    this.emit('shown', { item });
  }

  async hide(item, force = false) {
    item = this.resolve(item);
    if (!item || !item.classList.contains('pl-open')) return;
    const openCount = this.items.filter((other) => other.classList.contains('pl-open')).length;
    if (!force && !this.options.collapsible && openCount <= 1) return;
    if (!this.emit('beforehide', { item }, true)) return;
    const { title, content } = this.parts(item);
    item.classList.remove('pl-open');
    title.setAttribute('aria-expanded', 'false');
    this.emit('hide', { item });
    await toggleHeight(content, false, { duration: this.options.duration });
    this.emit('hidden', { item });
  }
}

register('accordion', Accordion);
export default Accordion;
