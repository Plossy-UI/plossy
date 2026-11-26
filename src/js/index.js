// Plossy — punkt wejścia JS. Importuje wszystkie komponenty i uruchamia auto-inicjalizację.
import { api, start } from './core.js';

import './components/accordion.js';
import './components/alert.js';
import './components/countdown.js';
import './components/icon.js';
import './components/navbar.js';
import './components/totop.js';
import './components/upload.js';
import './components/otp.js';
import './components/strength.js';
import './components/rating.js';
import './components/quantity.js';
import './components/combobox.js';
import './components/datepicker.js';
import './components/range.js';
import './components/form.js';
import './components/drop.js';
import './components/tooltip.js';
import './components/popover.js';
import './components/modal.js';
import './components/offcanvas.js';
import './components/notification.js';
import './components/lightbox.js';
import './components/toggle.js';
import './components/switcher.js';
import './components/scrollspy.js';
import './components/scroll.js';
import './components/sticky.js';
import './components/parallax.js';
import './components/slider.js';
import './components/slideshow.js';
import './components/sortable.js';
import './components/filter.js';
import './components/video.js';
import './components/counter.js';
import './components/height-match.js';
import './components/spotlight.js';

if (typeof window !== 'undefined') {
  window.Plossy = api;
  start();
}

export default api;
export * from './core.js';
