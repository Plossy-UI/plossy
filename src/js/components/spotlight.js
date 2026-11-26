import { Component, register, rafThrottle } from '../core.js';

/**
 * Spotlight — poświata podążająca za kursorem.
 * <div class="pl-card pl-spotlight" data-pl-spotlight>…</div>
 * Na kontenerze: data-pl-spotlight="target: > .pl-card" obsłuży wiele elementów naraz.
 */
class Spotlight extends Component {
  static defaults = {
    target: null, // selektor elementów podświetlanych (domyślnie sam element)
  };
  static primary = 'target';

  init() {
    const targets = () => (this.options.target ? [...this.el.querySelectorAll(`:scope ${this.options.target}`)] : [this.el]);

    const move = rafThrottle((event) => {
      for (const node of targets()) {
        const rect = node.getBoundingClientRect();
        node.style.setProperty('--pl-spot-x', `${event.clientX - rect.left}px`);
        node.style.setProperty('--pl-spot-y', `${event.clientY - rect.top}px`);
        node.classList.add('pl-spotlight', 'pl-spotlight-active');
      }
    });

    this.on(this.el, 'pointermove', move);
    this.on(this.el, 'pointerleave', () => {
      requestAnimationFrame(() => targets().forEach((node) => node.classList.remove('pl-spotlight-active')));
    });
  }
}

register('spotlight', Spotlight);
export default Spotlight;
