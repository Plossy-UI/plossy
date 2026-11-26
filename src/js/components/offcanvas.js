import { register } from '../core.js';
import { Overlay, delegateOpen } from './modal.js';

/**
 * Offcanvas
 * <dialog class="pl-offcanvas" id="o" data-pl-offcanvas="side: left">
 *   <div class="pl-offcanvas-bar">
 *     <button class="pl-close pl-offcanvas-close" type="button" aria-label="Zamknij" data-pl-offcanvas-close></button>
 *     …
 *   </div>
 * </dialog>
 * Otwieranie: <button data-pl-offcanvas-open="#o"> lub <button data-pl-toggle="#o">.
 */

const SIDES = ['left', 'right', 'top', 'bottom'];

class Offcanvas extends Overlay {
  static defaults = {
    ...Overlay.defaults,
    side: 'left', // left | right | top | bottom
    overlay: true, // false = bez przyciemnienia tła
    swipe: true, // zamykanie gestem przesunięcia (panele boczne, dotyk)
    anchorClose: true, // kliknięcie odnośnika do kotwicy (#sekcja) zamyka panel
  };

  static primary = 'side';
  static panel = '.pl-offcanvas-bar';
  static title = '.pl-offcanvas-title';

  setup() {
    const el = this.el;
    const side = SIDES.includes(this.options.side) ? this.options.side : 'left';
    this.side = side;
    SIDES.forEach((name) => el.classList.toggle(`pl-offcanvas-${name}`, name === side));
    el.classList.toggle('pl-offcanvas-no-overlay', !this.options.overlay);
    if (!el.hasAttribute('aria-labelledby') && !el.hasAttribute('aria-label')) el.setAttribute('aria-label', 'Panel boczny');

    this.on(el, 'click', (event) => {
      if (!this.options.anchorClose) return;
      const link = event.target.closest('a[href^="#"]');
      if (link && link.getAttribute('href').length > 1 && !link.hasAttribute('data-pl-toggle')) this.hide();
    });

    this.bindSwipe();
  }

  /** Zamykanie przeciągnięciem panelu w stronę krawędzi (tylko dotyk, lewy / prawy). */
  bindSwipe() {
    if (!this.options.swipe || (this.side !== 'left' && this.side !== 'right')) return;
    const sign = this.side === 'left' ? -1 : 1;
    let drag = null;

    const end = (event) => {
      if (!drag) return;
      const { bar, dx, active, startTime } = drag;
      drag = null;
      if (!active) return;
      const velocity = Math.abs(dx) / Math.max(event.timeStamp - startTime, 1);
      const far = dx * sign > 0 && (Math.abs(dx) > bar.offsetWidth * 0.35 || (Math.abs(dx) > 24 && velocity > 0.5));
      bar.classList.remove('pl-dragging');
      if (far && event.type !== 'pointercancel') {
        // Animacja wyjścia startuje z bieżącego przesunięcia.
        this.hide();
      } else {
        bar.classList.add('pl-offcanvas-snap');
        bar.style.translate = '0px 0px';
      }
    };

    this.on(this.el, 'pl:hidden', (event) => {
      if (event.target !== this.el) return;
      const bar = this.panel;
      bar?.classList.remove('pl-offcanvas-snap', 'pl-dragging');
      bar?.style.removeProperty('translate');
    });

    this.on(this.el, 'pointerdown', (event) => {
      const bar = this.panel;
      if (event.pointerType !== 'touch' || this.state !== 'open' || !bar?.contains(event.target)) return;
      drag = { bar, x: event.clientX, y: event.clientY, dx: 0, active: false, startTime: event.timeStamp };
    });

    this.on(this.el, 'pointermove', (event) => {
      if (!drag) return;
      const dx = event.clientX - drag.x;
      const dy = event.clientY - drag.y;
      if (!drag.active) {
        if (Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx)) return void (drag = null); // przewijanie w pionie
        if (Math.abs(dx) < 10) return;
        drag.active = true;
        drag.bar.classList.remove('pl-offcanvas-snap');
        drag.bar.classList.add('pl-dragging');
      }
      // W stronę krawędzi — 1:1, w przeciwną — z oporem.
      drag.dx = dx * sign > 0 ? dx : dx * 0.15;
      drag.bar.style.translate = `${drag.dx}px 0px`;
    });

    this.on(this.el, 'pointerup', end);
    this.on(this.el, 'pointercancel', end);
  }
}

register('offcanvas', Offcanvas);
delegateOpen('offcanvas');

export default Offcanvas;
