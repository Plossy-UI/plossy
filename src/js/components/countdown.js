import { Component, register, $ } from '../core.js';

const UNITS = [
  ['days', 86400],
  ['hours', 3600],
  ['minutes', 60],
  ['seconds', 1],
];

const LABELS = { days: 'dni', hours: 'godz.', minutes: 'min', seconds: 's' };

/**
 * Countdown — odliczanie do daty lub przez zadaną liczbę sekund.
 * <div class="pl-countdown" data-pl-countdown="date: 2027-01-01T00:00:00">
 *   <div class="pl-countdown-item">
 *     <div class="pl-countdown-number pl-countdown-days"></div>
 *     <div class="pl-countdown-label">Dni</div>
 *   </div>
 *   <div class="pl-countdown-separator"></div>
 *   … pl-countdown-hours, pl-countdown-minutes, pl-countdown-seconds
 * </div>
 */
class Countdown extends Component {
  static defaults = {
    date: '', // data docelowa (ISO 8601 lub znacznik czasu w ms)
    seconds: 0, // alternatywnie: odliczanie względne w sekundach
    autostart: true,
    pad: 2, // minimalna liczba cyfr w komórce
    reload: false, // po zakończeniu odliczanie względne zaczyna się od nowa
  };
  static primary = 'date';

  init() {
    this.timer = null;
    this.target = 0;
    this.remaining = 0; // ms pozostałe przy zatrzymaniu
    this.ended = false;
    this.values = {};

    // Komórki obecne w znacznikach; brakująca większa jednostka „spływa" do mniejszej.
    this.cells = {};
    for (const [unit] of UNITS) {
      const cell = $(`.pl-countdown-${unit}`, this.el);
      if (cell) this.cells[unit] = cell;
    }

    if (!this.el.hasAttribute('role')) this.el.setAttribute('role', 'timer');
    Object.values(this.cells).forEach((cell) => cell.setAttribute('aria-hidden', 'true'));

    // Tekst dla czytników ekranu — aktualizowany co minutę, nie co sekundę.
    this.sr = document.createElement('span');
    this.sr.className = 'pl-countdown-sr';
    this.sr.style.cssText =
      'position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0';
    this.el.append(this.sr);
    this.onDestroy(() => {
      this.stop();
      this.sr.remove();
    });

    this.on(document, 'visibilitychange', () => {
      if (!document.hidden && this.timer) this.tick();
    });

    this.reset(false);
    if (this.options.autostart) this.start();
  }

  /** Wyznacza czas docelowy z opcji. */
  resolveTarget() {
    const { date, seconds } = this.options;
    if (date !== '' && date !== null && date !== undefined) {
      const time = typeof date === 'number' ? date : Date.parse(date);
      if (!Number.isNaN(time)) return time;
      console.warn(`[Plossy] countdown: nieprawidłowa data „${date}"`);
    }
    return Date.now() + Math.max(0, Number(seconds) || 0) * 1000;
  }

  get running() {
    return this.timer !== null;
  }

  /** Uruchamia lub wznawia odliczanie. */
  start() {
    if (this.running || this.ended) return;
    // Odliczanie względne wznawiamy od miejsca zatrzymania.
    if (this.relative) this.target = Date.now() + this.remaining;
    this.el.classList.add('pl-countdown-running');
    this.timer = 0;
    this.tick();
  }

  /** Zatrzymuje odliczanie (dla dat bezwzględnych czas płynie dalej). */
  stop() {
    if (this.timer === null) return;
    clearTimeout(this.timer);
    this.timer = null;
    this.remaining = Math.max(0, this.target - Date.now());
    this.el.classList.remove('pl-countdown-running');
  }

  /** Ustawia odliczanie od nowa; opcjonalnie z nową datą lub liczbą sekund. */
  reset(options) {
    const wasRunning = this.running;
    this.stop();
    if (options && typeof options === 'object') {
      if ('seconds' in options && !('date' in options)) this.options.date = '';
      Object.assign(this.options, options);
    }
    const { date } = this.options;
    this.relative = date === '' || date === null || date === undefined || Number.isNaN(typeof date === 'number' ? date : Date.parse(date));
    this.target = this.resolveTarget();
    this.remaining = Math.max(0, this.target - Date.now());
    this.total = this.remaining;
    this.ended = false;
    this.el.classList.remove('pl-countdown-ended', 'pl-countdown-finish');
    this.render(this.remaining, false);
    if (wasRunning || (options && typeof options === 'object' && this.options.autostart)) this.start();
  }

  tick() {
    clearTimeout(this.timer);
    const left = this.target - Date.now();
    this.render(Math.max(0, left));

    if (left <= 0) {
      this.timer = null;
      this.el.classList.remove('pl-countdown-running');
      this.ended = true;
      this.remaining = 0;
      this.el.classList.add('pl-countdown-ended', 'pl-countdown-finish');
      this.emit('end');
      if (this.options.reload && this.relative && this.options.seconds > 0) {
        this.reset();
        this.start();
      }
      return;
    }
    // Następne tyknięcie tuż po przekroczeniu granicy sekundy.
    this.timer = setTimeout(() => this.tick(), (left % 1000) + 20);
  }

  /** Rozkłada pozostały czas na jednostki obecne w znacznikach. */
  split(ms) {
    let rest = Math.ceil(ms / 1000);
    const out = {};
    for (const [unit, size] of UNITS) {
      if (!this.cells[unit]) continue;
      out[unit] = Math.floor(rest / size);
      rest -= out[unit] * size;
    }
    return out;
  }

  render(ms, animate = true) {
    const values = this.split(ms);
    let changed = false;

    for (const [unit, value] of Object.entries(values)) {
      if (this.values[unit] === value) continue;
      changed = true;
      this.values[unit] = value;
      this.renderCell(this.cells[unit], String(value).padStart(this.options.pad, '0'), animate);
    }

    if (!changed) return;
    this.el.style.setProperty('--pl-countdown-progress', this.total ? String(1 - ms / this.total) : '0');
    // Czytniki ekranu: odświeżenie tylko przy zmianie minut (lub braku komórki sekund).
    const key = Object.entries(values)
      .filter(([unit]) => unit !== 'seconds' || Object.keys(values).length === 1)
      .map(([unit, value]) => `${value} ${LABELS[unit]}`)
      .join(' ');
    if (key !== this.srKey) {
      this.srKey = key;
      this.sr.textContent = key;
    }
    if (animate) this.emit('tick', { ...values, remaining: ms });
  }

  /** Aktualizuje cyfry komórki; zmienione cyfry dostają animację wymiany. */
  renderCell(cell, text, animate) {
    let digits = [...cell.querySelectorAll(':scope > .pl-countdown-digit')];
    if (digits.length !== text.length) {
      cell.textContent = '';
      digits = [...text].map(() => {
        const digit = document.createElement('span');
        digit.className = 'pl-countdown-digit';
        cell.append(digit);
        return digit;
      });
      animate = false;
    }
    digits.forEach((digit, index) => {
      const next = text[index];
      const prev = digit.dataset.value;
      if (prev === next) return;
      digit.dataset.value = next;
      const incoming = document.createElement('span');
      incoming.textContent = next;
      if (animate && prev !== undefined) {
        incoming.className = 'pl-countdown-digit-in';
        const outgoing = document.createElement('span');
        outgoing.className = 'pl-countdown-digit-out';
        outgoing.textContent = prev;
        outgoing.addEventListener('animationend', () => outgoing.remove(), { once: true });
        setTimeout(() => outgoing.remove(), 700);
        digit.replaceChildren(incoming, outgoing);
      } else {
        digit.replaceChildren(incoming);
      }
    });
  }
}

register('countdown', Countdown);
export default Countdown;
