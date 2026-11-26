import { Component, register, uid, focusables, showLayer, hideLayer, autoPlace, animationsDone } from '../core.js';
import icons from '../icons.js';

const svg = (name) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || ''}</svg>`;

const pad = (n, length = 2) => String(n).padStart(length, '0');
const strip = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());
const today = () => strip(new Date());
const toISO = (date) => (date ? `${pad(date.getFullYear(), 4)}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` : '');
const same = (a, b) => !!a && !!b && a.getTime() === b.getTime();
const addDays = (date, n) => new Date(date.getFullYear(), date.getMonth(), date.getDate() + n);
const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
const addMonths = (date, n) => {
  const first = new Date(date.getFullYear(), date.getMonth() + n, 1);
  first.setDate(Math.min(date.getDate(), daysInMonth(first.getFullYear(), first.getMonth())));
  return first;
};

/** Data z: Date, 'YYYY-MM-DD', 'today' albo przesunięcia w dniach ('+7', '-30'). */
function toDate(value) {
  if (value === null || value === undefined || value === '') return null;
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : strip(value);
  if (typeof value === 'number') return addDays(today(), value);
  const text = String(value).trim();
  if (text === 'today') return today();
  if (/^[+-]\d+$/.test(text)) return addDays(today(), Number(text));
  const match = text.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (!match) return null;
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  return date.getMonth() === Number(match[2]) - 1 ? date : null;
}

const TOKENS = /yyyy|yy|MMMM|MMM|MM|M|dd|d/g;

const LABELS = {
  dialog: 'Wybierz datę',
  prevMonth: 'Poprzedni miesiąc',
  nextMonth: 'Następny miesiąc',
  prevYear: 'Poprzedni rok',
  nextYear: 'Następny rok',
  prevYears: 'Poprzednie lata',
  nextYears: 'Następne lata',
  pickMonth: 'Wybierz miesiąc',
  pickYear: 'Wybierz rok',
  today: 'Dziś',
  clear: 'Wyczyść',
};

/**
 * Datepicker
 * <input class="pl-input" data-pl-datepicker>                      — kalendarz w okienku
 * <div data-pl-datepicker="inline: true; name: termin"></div>      — kalendarz osadzony
 */
class Datepicker extends Component {
  static defaults = {
    inline: false,
    range: false, // wybór zakresu dat
    value: '', // wartość początkowa (ISO; zakres: "od/do")
    min: null, // 'YYYY-MM-DD', 'today' lub przesunięcie w dniach: '+7', '-30'
    max: null,
    disabledDays: '', // dni tygodnia: 0 = niedziela … 6 = sobota, np. "0,6"
    disabledDates: '', // konkretne daty ISO rozdzielone przecinkami
    locale: 'pl',
    format: 'dd.MM.yyyy',
    separator: ' – ', // łącznik dat zakresu
    weekStart: 1, // 1 = poniedziałek
    name: '', // nazwa ukrytego pola z wartością ISO
    footer: false, // przyciski „Dziś" i „Wyczyść"
    closeOnSelect: true,
    placement: 'bottom-start',
    offset: 6,
    labels: null, // nadpisanie tekstów interfejsu
  };

  init() {
    const { el, options } = this;
    this.isInput = el.tagName === 'INPUT';
    this.inline = !!options.inline || !this.isInput;
    this.input = this.isInput ? el : null;
    this.labels = { ...LABELS, ...(options.labels || {}) };
    this.isOpen = false;
    this.view = 'days';
    this.start = null;
    this.end = null;
    this.hover = null;
    this.setup();

    if (options.name) {
      this.hidden = document.createElement('input');
      this.hidden.type = 'hidden';
      this.hidden.name = options.name;
      el.after(this.hidden);
    }

    this.build();

    // Wartość początkowa: opcja → data-value → treść pola.
    const initial = options.value || el.dataset.value || '';
    if (initial) this.assign(String(initial).split('/').map(toDate));
    else if (this.input?.value) this.assign(this.parse(this.input.value));
    this.cursor = this.clampDate(this.start || today());
    this.write(true);

    if (this.inline) {
      this.picker.classList.add('pl-datepicker-inline');
      if (this.isInput) el.after(this.picker);
      else el.append(this.picker);
      this.render();
    } else {
      this.picker.hidden = true;
      this.picker.setAttribute('role', 'dialog');
      this.picker.setAttribute('aria-label', this.labels.dialog);
      el.setAttribute('aria-haspopup', 'dialog');
      el.setAttribute('aria-expanded', 'false');
      el.autocomplete = 'off';
    }
    this.bind();

    this.onDestroy(() => {
      this.stopPlace?.();
      this.picker.remove();
      this.hidden?.remove();
      if (!this.inline) {
        el.removeAttribute('aria-haspopup');
        el.removeAttribute('aria-expanded');
      }
    });
  }

  /** Przelicza opcje zależne (granice, wyłączone dni, nazwy z Intl). */
  setup() {
    const { options } = this;
    this.min = toDate(options.min);
    this.max = toDate(options.max);
    const list = (value) => (Array.isArray(value) ? value : String(value ?? '').split(',')).map((v) => String(v).trim()).filter(Boolean);
    this.disabledDays = new Set(list(options.disabledDays).map(Number));
    this.disabledDates = new Set(list(options.disabledDates).map((v) => toISO(toDate(v))));
    const intl = (opts) => {
      try {
        return new Intl.DateTimeFormat(options.locale, opts);
      } catch {
        return new Intl.DateTimeFormat('pl', opts);
      }
    };
    this.fmt = {
      title: intl({ month: 'long', year: 'numeric' }),
      full: intl({ weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
      month: intl({ month: 'long' }),
      monthShort: intl({ month: 'short' }),
      weekday: intl({ weekday: 'short' }),
      weekdayLong: intl({ weekday: 'long' }),
    };
    this.monthNames = Array.from({ length: 12 }, (_, m) => this.fmt.month.format(new Date(2024, m, 1)));
    // Dopełniacz („14 marca") — nazwa miesiąca w kontekście dnia.
    const dayMonth = intl({ day: 'numeric', month: 'long' });
    this.monthNamesDay = Array.from(
      { length: 12 },
      (_, m) => dayMonth.formatToParts(new Date(2024, m, 1)).find((part) => part.type === 'month')?.value || this.monthNames[m],
    );
    this.monthShort = Array.from({ length: 12 }, (_, m) => this.fmt.monthShort.format(new Date(2024, m, 1)).replace('.', ''));
  }

  build() {
    const { labels } = this;
    const picker = (this.picker = document.createElement('div'));
    picker.className = 'pl-datepicker';
    if (this.options.range) picker.classList.add('pl-datepicker-range');
    this.titleId = uid('pl-datepicker');
    picker.innerHTML =
      `<div class="pl-datepicker-header">` +
      `<button class="pl-datepicker-title" type="button" id="${this.titleId}" aria-live="polite"></button>` +
      `<span class="pl-datepicker-nav">` +
      `<button class="pl-datepicker-prev" type="button" aria-label="${labels.prevMonth}">${svg('chevron-left')}</button>` +
      `<button class="pl-datepicker-next" type="button" aria-label="${labels.nextMonth}">${svg('chevron-right')}</button>` +
      `</span></div>` +
      `<div class="pl-datepicker-body"></div>` +
      (this.options.footer
        ? `<div class="pl-datepicker-footer"><button class="pl-datepicker-action pl-datepicker-action-today" type="button">${labels.today}</button><button class="pl-datepicker-action pl-datepicker-action-clear" type="button">${labels.clear}</button></div>`
        : '');
    this.title = picker.querySelector('.pl-datepicker-title');
    this.body = picker.querySelector('.pl-datepicker-body');
    this.prevButton = picker.querySelector('.pl-datepicker-prev');
    this.nextButton = picker.querySelector('.pl-datepicker-next');
  }

  bind() {
    const { picker, input } = this;

    this.on(picker, 'click', (event) => {
      const button = event.target.closest('button');
      if (!button || !picker.contains(button)) return;
      if (button.getAttribute('aria-disabled') === 'true') return;
      if (button === this.prevButton) return this.shift(-1);
      if (button === this.nextButton) return this.shift(1);
      if (button === this.title) return this.setView(this.view === 'days' ? 'months' : this.view === 'months' ? 'years' : 'days');
      if (button.classList.contains('pl-datepicker-action-today')) return this.goToday();
      if (button.classList.contains('pl-datepicker-action-clear')) return this.clear();
      if (button.dataset.date) return this.select(toDate(button.dataset.date));
      const keyboard = event.detail === 0;
      if (button.dataset.month) {
        this.cursor = this.clampDate(new Date(this.cursor.getFullYear(), Number(button.dataset.month), Math.min(this.cursor.getDate(), daysInMonth(this.cursor.getFullYear(), Number(button.dataset.month)))));
        return this.setView('days', keyboard);
      }
      if (button.dataset.year) {
        const year = Number(button.dataset.year);
        this.cursor = this.clampDate(new Date(year, this.cursor.getMonth(), Math.min(this.cursor.getDate(), daysInMonth(year, this.cursor.getMonth()))));
        return this.setView('months', keyboard);
      }
    });

    this.on(picker, 'keydown', (event) => this.onKeydown(event));

    // Podgląd zakresu pod kursorem / fokusem.
    if (this.options.range) {
      const preview = (event) => {
        const date = toDate(event.target.closest?.('[data-date]')?.dataset.date);
        if (!same(date, this.hover) && (date || this.hover)) {
          this.hover = date;
          this.paint();
        }
      };
      this.on(picker, 'pointerover', preview);
      this.on(picker, 'focusin', preview);
      this.on(picker, 'pointerleave', () => {
        this.hover = null;
        this.paint();
      });
    }

    if (input) {
      this.on(input, 'change', () => {
        if (this.writing) return;
        const dates = this.parse(input.value);
        if (dates.length && dates.every((date) => date && !this.isDisabled(date))) {
          const before = this.value;
          this.assign(dates);
          if (this.value === before) return this.write(true);
          this.cursor = this.clampDate(this.start);
          this.write();
          this.emitChange();
        } else if (!input.value.trim()) {
          this.clear();
        } else {
          this.write(true); // przywróć poprzednią poprawną wartość
        }
        if (this.isOpen || this.inline) this.render();
      });
    }

    if (this.inline) return;

    // Klik w kalendarz nie zabiera fokusu polu.
    this.on(picker, 'pointerdown', (event) => {
      if (document.activeElement === input) event.preventDefault();
    });
    this.on(input, 'click', () => this.open());
    this.on(input, 'input', () => {
      if (this.writing) return;
      const dates = this.parse(input.value);
      if (!this.isOpen) this.open();
      if (dates.length && dates.every(Boolean)) {
        this.cursor = this.clampDate(dates[0]);
        this.render();
      }
    });
    this.on(input, 'keydown', (event) => {
      if (event.key === 'ArrowDown' || (event.key === 'ArrowUp' && event.altKey)) {
        event.preventDefault();
        this.open();
        this.focusCursor();
      } else if (event.key === 'Escape' && this.isOpen) {
        event.preventDefault();
        event.stopPropagation();
        this.close();
      } else if (event.key === 'Enter' && this.isOpen) {
        // Zatwierdź wpisany tekst, nie wysyłaj formularza.
        event.preventDefault();
        input.dispatchEvent(new Event('change', { bubbles: true }));
        this.close();
      } else if (event.key === 'Tab') {
        this.close();
      }
    });
    this.on(
      document,
      'pointerdown',
      (event) => {
        const { target } = event;
        if (!this.isOpen || picker.contains(target) || target === input) return;
        if ([...(input.labels || [])].some((label) => label.contains(target))) return;
        this.close();
      },
      true,
    );
    this.on(picker, 'focusout', (event) => {
      const next = event.relatedTarget;
      if (this.isOpen && next && !picker.contains(next) && next !== input) this.close();
    });
  }

  // ── Daty ────────────────────────────────────────────────────────────────

  isDisabled(date) {
    return (
      (this.min && date < this.min) ||
      (this.max && date > this.max) ||
      this.disabledDays.has(date.getDay()) ||
      this.disabledDates.has(toISO(date))
    );
  }

  clampDate(date) {
    if (this.min && date < this.min) return new Date(this.min);
    if (this.max && date > this.max) return new Date(this.max);
    return date;
  }

  /** Formatuje datę wg opcji `format`. */
  format(date) {
    if (!date) return '';
    const map = {
      yyyy: pad(date.getFullYear(), 4),
      yy: pad(date.getFullYear() % 100),
      MMMM: (/\bd/.test(this.options.format) ? this.monthNamesDay : this.monthNames)[date.getMonth()],
      MMM: this.monthShort[date.getMonth()],
      MM: pad(date.getMonth() + 1),
      M: date.getMonth() + 1,
      dd: pad(date.getDate()),
      d: date.getDate(),
    };
    return this.options.format.replace(TOKENS, (token) => map[token]);
  }

  parseOne(text) {
    text = text.trim();
    if (!text) return null;
    if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(text)) return toDate(text);
    const order = [];
    const source = this.options.format.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(TOKENS, (token) => {
      order.push(token);
      if (token === 'yyyy') return '(\\d{4})';
      if (token === 'yy') return '(\\d{2})';
      if (token === 'MMMM' || token === 'MMM') return '([^\\s\\d.,/-]+)';
      return '(\\d{1,2})';
    });
    const match = text.match(new RegExp(`^${source}$`, 'i'));
    if (!match) return null;
    const now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth();
    let day = 1;
    order.forEach((token, i) => {
      const part = match[i + 1];
      if (token === 'yyyy') year = Number(part);
      else if (token === 'yy') year = 2000 + Number(part);
      else if (token === 'MMMM') {
        const find = (names) => names.findIndex((name) => name.toLowerCase() === part.toLowerCase());
        month = find(this.monthNamesDay) >= 0 ? find(this.monthNamesDay) : find(this.monthNames);
      }
      else if (token === 'MMM') month = this.monthShort.findIndex((name) => name.toLowerCase() === part.toLowerCase().replace('.', ''));
      else if (token === 'MM' || token === 'M') month = Number(part) - 1;
      else day = Number(part);
    });
    if (month < 0 || month > 11 || day < 1 || day > daysInMonth(year, month)) return null;
    return new Date(year, month, day);
  }

  /** Zamienia tekst pola na tablicę dat ([data] lub [od, do]). */
  parse(text) {
    text = String(text || '').trim();
    if (!text) return [];
    if (this.options.range) {
      const separator = this.options.separator.trim() || '–';
      const parts = text.split(new RegExp(`\\s*(?:${separator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}|–|—|\\s-\\s|/)\\s*`));
      if (parts.length === 2) return parts.map((part) => this.parseOne(part));
      if (text.includes('/')) return text.split('/').map(toDate);
      return [this.parseOne(text)];
    }
    return [this.parseOne(text)];
  }

  assign(dates) {
    dates = (dates || []).filter(Boolean);
    if (this.options.range) {
      const [a = null, b = null] = dates;
      this.start = a && b && b < a ? b : a;
      this.end = a && b && b < a ? a : b;
    } else {
      this.start = dates[0] || null;
      this.end = null;
    }
  }

  /** Wartość ISO: 'YYYY-MM-DD' lub 'od/do' dla zakresu. */
  get value() {
    if (this.options.range) return this.start && this.end ? `${toISO(this.start)}/${toISO(this.end)}` : '';
    return toISO(this.start);
  }

  /** Zapisuje wartość do pola, data-value i pola ukrytego. */
  write(silent = false) {
    const { el, input, options } = this;
    const iso = this.value;
    let text = '';
    if (options.range) text = this.start && this.end ? `${this.format(this.start)}${options.separator}${this.format(this.end)}` : '';
    else text = this.format(this.start);
    if (iso) el.dataset.value = iso;
    else delete el.dataset.value;
    if (this.hidden) this.hidden.value = iso;
    if (!input || input.value === text) return;
    input.value = text;
    if (silent) return;
    this.writing = true;
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
    this.writing = false;
  }

  emitChange() {
    this.emit('change', {
      value: this.value,
      date: this.start ? new Date(this.start) : null,
      start: this.start ? new Date(this.start) : null,
      end: this.end ? new Date(this.end) : null,
      formatted: this.input ? this.input.value : this.options.range ? [this.format(this.start), this.format(this.end)].join(this.options.separator) : this.format(this.start),
    });
  }

  /** Wybiera dzień (kliknięcie / Enter). */
  select(date) {
    if (!date || this.isDisabled(date)) return;
    const { options } = this;
    const hadFocus = this.picker.contains(document.activeElement);
    this.cursor = date;
    let done = true;
    if (options.range) {
      if (!this.start || this.end) {
        this.start = date;
        this.end = null;
        done = false;
      } else if (date < this.start) {
        this.end = this.start;
        this.start = date;
      } else {
        this.end = date;
      }
    } else {
      this.start = date;
    }
    this.hover = null;
    if (this.monthOf(date) !== this.shownMonth) this.render(this.monthOf(date) > this.shownMonth ? 'next' : 'prev');
    else this.paint(true);
    if (hadFocus) this.focusCursor();
    if (!done) return;
    this.write();
    this.emitChange();
    if (!this.inline && options.closeOnSelect) this.close(true);
  }

  goToday() {
    const now = today();
    this.view = 'days';
    if (!this.options.range && !this.isDisabled(now)) {
      this.cursor = now;
      this.render();
      return this.select(now);
    }
    this.cursor = this.clampDate(now);
    this.render();
  }

  /** Ustawia datę: Date / ISO, a dla zakresu tablicę [od, do]. `null` czyści. */
  setDate(value, silent = false) {
    this.assign((Array.isArray(value) ? value : [value]).map(toDate));
    if (this.start) this.cursor = this.clampDate(this.start);
    this.write(silent);
    if (this.isOpen || this.inline) this.render();
    if (!silent) this.emitChange();
  }

  /** Zwraca Date (lub null); dla zakresu — [od, do]. */
  getDate() {
    const copy = (date) => (date ? new Date(date) : null);
    return this.options.range ? [copy(this.start), copy(this.end)] : copy(this.start);
  }

  clear() {
    const had = !!this.start;
    this.start = null;
    this.end = null;
    this.hover = null;
    this.write();
    if (this.isOpen || this.inline) this.paint();
    if (had) this.emitChange();
  }

  /** Zmienia opcje (np. min / max) i odświeża kalendarz. */
  update(options = {}) {
    Object.assign(this.options, options);
    this.setup();
    this.cursor = this.clampDate(this.cursor);
    if (this.isOpen || this.inline) this.render();
  }

  // ── Widok ───────────────────────────────────────────────────────────────

  monthOf(date) {
    return date.getFullYear() * 12 + date.getMonth();
  }

  setView(view, focus = this.picker.contains(document.activeElement)) {
    this.view = view;
    this.render('zoom');
    if (focus) this.focusCursor();
  }

  /** Przesuwa widok o miesiąc / rok / 12 lat. */
  shift(step, focus = false) {
    const { cursor } = this;
    if (this.view === 'days') this.cursor = addMonths(cursor, step);
    else if (this.view === 'months') this.cursor = addMonths(cursor, step * 12);
    else this.cursor = addMonths(cursor, step * 144);
    this.cursor = this.clampDate(this.cursor);
    this.render(step > 0 ? 'next' : 'prev');
    if (focus) this.focusCursor();
  }

  render(animation = '') {
    const { cursor, labels, view } = this;
    const year = cursor.getFullYear();
    const month = cursor.getMonth();
    const wrap = document.createElement('div');
    wrap.className = `pl-datepicker-view pl-datepicker-${view}`;
    if (animation) wrap.classList.add(`pl-datepicker-anim-${animation}`);
    this.picker.dataset.view = view;

    if (view === 'days') {
      this.shownMonth = this.monthOf(cursor);
      const title = this.fmt.title.format(cursor);
      this.title.textContent = title.charAt(0).toLocaleUpperCase(this.options.locale) + title.slice(1);
      this.title.setAttribute('aria-label', `${this.title.textContent} — ${labels.pickMonth}`);
      this.prevButton.setAttribute('aria-label', labels.prevMonth);
      this.nextButton.setAttribute('aria-label', labels.nextMonth);
      this.setNav(this.min && new Date(year, month, 0) < this.min, this.max && new Date(year, month + 1, 1) > this.max);

      const weekStart = Number(this.options.weekStart) || 0;
      const monday = new Date(2024, 0, 1); // poniedziałek
      let head = '';
      for (let i = 0; i < 7; i++) {
        const ref = addDays(monday, ((weekStart + i + 6) % 7));
        const weekend = ref.getDay() === 0 || ref.getDay() === 6;
        head += `<th scope="col" abbr="${this.fmt.weekdayLong.format(ref)}"${weekend ? ' class="pl-datepicker-weekend"' : ''}>${this.fmt.weekday.format(ref).replace('.', '')}</th>`;
      }
      const first = new Date(year, month, 1);
      const offset = (first.getDay() - weekStart + 7) % 7;
      let date = addDays(first, -offset);
      let rows = '';
      for (let week = 0; week < 6; week++) {
        rows += '<tr>';
        for (let i = 0; i < 7; i++) {
          rows += `<td role="gridcell"><button class="pl-datepicker-day${date.getMonth() !== month ? ' pl-datepicker-outside' : ''}" type="button" tabindex="-1" data-date="${toISO(date)}" aria-label="${this.fmt.full.format(date)}">${date.getDate()}</button></td>`;
          date = addDays(date, 1);
        }
        rows += '</tr>';
      }
      wrap.innerHTML = `<table class="pl-datepicker-grid" role="grid" aria-labelledby="${this.titleId}"><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table>`;
    } else if (view === 'months') {
      this.title.textContent = String(year);
      this.title.setAttribute('aria-label', `${year} — ${labels.pickYear}`);
      this.prevButton.setAttribute('aria-label', labels.prevYear);
      this.nextButton.setAttribute('aria-label', labels.nextYear);
      this.setNav(this.min && year <= this.min.getFullYear(), this.max && year >= this.max.getFullYear());
      const now = today();
      wrap.innerHTML = this.monthShort
        .map((name, m) => {
          const disabled = (this.min && new Date(year, m + 1, 0) < this.min) || (this.max && new Date(year, m, 1) > this.max);
          const selected = [this.start, this.end].some((d) => d && d.getFullYear() === year && d.getMonth() === m);
          const current = now.getFullYear() === year && now.getMonth() === m;
          return `<button class="pl-datepicker-cell${selected ? ' pl-datepicker-selected' : ''}${current ? ' pl-datepicker-current' : ''}" type="button" data-month="${m}" tabindex="${m === month ? 0 : -1}" aria-label="${this.monthNames[m]} ${year}"${selected ? ' aria-pressed="true"' : ''}${disabled ? ' aria-disabled="true"' : ''}>${name}</button>`;
        })
        .join('');
    } else {
      const from = Math.floor(year / 12) * 12;
      this.title.textContent = `${from} – ${from + 11}`;
      this.title.setAttribute('aria-label', this.title.textContent);
      this.prevButton.setAttribute('aria-label', labels.prevYears);
      this.nextButton.setAttribute('aria-label', labels.nextYears);
      this.setNav(this.min && from <= this.min.getFullYear(), this.max && from + 11 >= this.max.getFullYear());
      const now = today().getFullYear();
      let html = '';
      for (let y = from; y < from + 12; y++) {
        const disabled = (this.min && y < this.min.getFullYear()) || (this.max && y > this.max.getFullYear());
        const selected = [this.start, this.end].some((d) => d && d.getFullYear() === y);
        html += `<button class="pl-datepicker-cell${selected ? ' pl-datepicker-selected' : ''}${y === now ? ' pl-datepicker-current' : ''}" type="button" data-year="${y}" tabindex="${y === year ? 0 : -1}"${selected ? ' aria-pressed="true"' : ''}${disabled ? ' aria-disabled="true"' : ''}>${y}</button>`;
      }
      wrap.innerHTML = html;
    }

    this.body.replaceChildren(wrap);
    if (view === 'days') this.paint();
  }

  setNav(prevDisabled, nextDisabled) {
    this.prevButton.disabled = !!prevDisabled;
    this.nextButton.disabled = !!nextDisabled;
  }

  /** Aktualizuje stany dni (bez przebudowy siatki). */
  paint(pop = false) {
    if (this.view !== 'days') return;
    const { start, end, hover, cursor } = this;
    const now = today();
    const range = this.options.range;
    // Zakres do podświetlenia: wybrany albo podgląd (od startu do kursora).
    let from = start;
    let to = end;
    const preview = range && start && !end && hover && !same(hover, start);
    if (preview) {
      from = hover < start ? hover : start;
      to = hover < start ? start : hover;
    }
    for (const button of this.body.querySelectorAll('.pl-datepicker-day')) {
      const date = toDate(button.dataset.date);
      const cell = button.parentElement;
      const disabled = this.isDisabled(date);
      const isStart = same(date, start);
      const isEnd = same(date, end);
      const selected = isStart || isEnd;
      const inRange = !!(range && from && to && date >= from && date <= to && !same(from, to));
      const wasSelected = button.classList.contains('pl-datepicker-selected');
      button.classList.toggle('pl-datepicker-today', same(date, now));
      button.classList.toggle('pl-datepicker-selected', selected);
      button.classList.toggle('pl-datepicker-pop', pop && selected && !wasSelected);
      button.classList.toggle('pl-disabled', disabled);
      if (disabled) button.setAttribute('aria-disabled', 'true');
      else button.removeAttribute('aria-disabled');
      if (same(date, now)) button.setAttribute('aria-current', 'date');
      button.tabIndex = same(date, cursor) ? 0 : -1;
      cell.setAttribute('aria-selected', String(selected || (inRange && !preview)));
      cell.classList.toggle('pl-datepicker-in-range', inRange);
      cell.classList.toggle('pl-datepicker-preview', inRange && !!preview);
      cell.classList.toggle('pl-datepicker-range-start', inRange && same(date, from));
      cell.classList.toggle('pl-datepicker-range-end', inRange && same(date, to));
    }
  }

  focusCursor() {
    const target =
      this.view === 'days'
        ? this.body.querySelector(`[data-date="${toISO(this.cursor)}"]`)
        : this.body.querySelector('[tabindex="0"]') || this.body.querySelector('button');
    target?.focus();
  }

  /** Przenosi kursor klawiatury na inną datę (zmienia miesiąc w razie potrzeby). */
  moveCursor(date) {
    date = this.clampDate(date);
    const before = this.monthOf(this.cursor);
    const after = this.monthOf(date);
    this.cursor = date;
    if (after !== before || after !== this.shownMonth) this.render(after > before ? 'next' : 'prev');
    else this.paint();
    this.focusCursor();
  }

  onKeydown(event) {
    const { key } = event;
    const target = event.target;

    if (key === 'Escape' && !this.inline) {
      event.preventDefault();
      event.stopPropagation();
      return this.close(true);
    }
    // Okienko jest dialogiem — Tab krąży w jego obrębie.
    if (key === 'Tab' && !this.inline) {
      const items = focusables(this.picker);
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && target === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && target === last) {
        event.preventDefault();
        first.focus();
      }
      return;
    }

    if (this.view === 'days' && target.dataset?.date) {
      const date = toDate(target.dataset.date);
      const weekStart = Number(this.options.weekStart) || 0;
      const dow = (date.getDay() - weekStart + 7) % 7;
      const moves = {
        ArrowLeft: () => addDays(date, -1),
        ArrowRight: () => addDays(date, 1),
        ArrowUp: () => addDays(date, -7),
        ArrowDown: () => addDays(date, 7),
        Home: () => addDays(date, -dow),
        End: () => addDays(date, 6 - dow),
        PageUp: () => addMonths(date, event.shiftKey ? -12 : -1),
        PageDown: () => addMonths(date, event.shiftKey ? 12 : 1),
      };
      if (moves[key]) {
        event.preventDefault();
        this.moveCursor(moves[key]());
      }
      return;
    }

    // Widok miesięcy / lat: siatka 3 × 4.
    if (target.classList?.contains('pl-datepicker-cell')) {
      const cells = [...this.body.querySelectorAll('.pl-datepicker-cell')];
      const index = cells.indexOf(target);
      const step = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -3, ArrowDown: 3 }[key];
      let next = null;
      if (step) next = index + step;
      else if (key === 'Home') next = 0;
      else if (key === 'End') next = cells.length - 1;
      else if (key === 'PageUp' || key === 'PageDown') {
        event.preventDefault();
        this.shift(key === 'PageDown' ? 1 : -1, true);
        return;
      }
      if (next === null) return;
      event.preventDefault();
      if (next < 0 || next >= cells.length) {
        this.shift(next < 0 ? -1 : 1);
        const fresh = [...this.body.querySelectorAll('.pl-datepicker-cell')];
        fresh[(next + cells.length) % cells.length]?.focus();
      } else {
        cells[next].focus();
      }
    }
  }

  // ── Okienko ─────────────────────────────────────────────────────────────

  /** Otwiera kalendarz. */
  open() {
    const { picker, el, options } = this;
    if (this.inline || this.isOpen || el.disabled || el.readOnly) return;
    if (!this.emit('beforeopen', {}, true)) return;
    this.isOpen = true;
    this.view = 'days';
    this.hover = null;
    this.cursor = this.clampDate(this.start || this.cursor || today());
    // W modalu okienko musi leżeć wewnątrz <dialog>; w sekcji z motywem — dziedziczyć jej tokeny.
    let host = el.closest('dialog, [data-pl-theme], [data-pl-accent]');
    if (!host || host === document.documentElement) host = document.body;
    if (picker.parentElement !== host) host.append(picker);
    picker.classList.remove('pl-datepicker-out');
    this.render();
    showLayer(picker);
    this.stopPlace?.();
    this.stopPlace = autoPlace(picker, el, { placement: options.placement, offset: options.offset });
    el.setAttribute('aria-expanded', 'true');
    el.classList.add('pl-datepicker-active');
    this.emit('open');
  }

  /** Zamyka kalendarz; `focus: true` oddaje fokus polu. */
  async close(focus = false) {
    const { picker, el } = this;
    if (this.inline || !this.isOpen) return;
    this.isOpen = false;
    // Niedokończony zakres wraca do ostatniej pełnej wartości.
    if (this.options.range && this.start && !this.end) {
      this.assign((el.dataset.value || '').split('/').map(toDate));
    }
    el.setAttribute('aria-expanded', 'false');
    el.classList.remove('pl-datepicker-active');
    if (focus || picker.contains(document.activeElement)) el.focus({ preventScroll: true });
    this.emit('close');
    picker.classList.add('pl-datepicker-out');
    await animationsDone(picker);
    if (this.isOpen) return;
    this.stopPlace?.();
    this.stopPlace = null;
    picker.classList.remove('pl-datepicker-out');
    hideLayer(picker);
  }

  toggle() {
    return this.isOpen ? this.close() : this.open();
  }
}

register('datepicker', Datepicker);
export default Datepicker;
