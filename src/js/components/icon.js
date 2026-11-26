import { Component, register, api } from '../core.js';
import icons from '../icons.js';

/**
 * Icon — wstawia ikonę SVG z wbudowanego zestawu (Lucide, licencja ISC).
 * <span data-pl-icon="check"></span>
 * <span data-pl-icon="name: heart; stroke: 2.5"></span>
 */
class Icon extends Component {
  static defaults = {
    name: '',
    stroke: 1.75,
  };
  static primary = 'name';

  init() {
    this.render();
  }

  render(name = this.options.name) {
    const body = icons[name];
    this.el.classList.add('pl-icon');
    if (!body) {
      if (name) console.warn(`[Plossy] icon: nieznana ikona „${name}"`);
      return;
    }
    this.options.name = name;
    if (!this.el.hasAttribute('aria-label')) this.el.setAttribute('aria-hidden', 'true');
    this.el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${this.options.stroke}" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;
  }
}

register('icon', Icon);

/** Rejestr ikon: Plossy.icons.add({ nazwa: '<path d="…"/>' }), Plossy.icons.names() */
api.icons = {
  add(map) {
    Object.assign(icons, map);
  },
  names() {
    return Object.keys(icons).sort();
  },
  get(name) {
    return icons[name] || null;
  },
};

export default Icon;
