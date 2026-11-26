import { Component, register, $, uid } from '../core.js';

const RULES = {
  length: (min) => `Co najmniej ${min} znaków`,
  case: () => 'Mała i wielka litera',
  digit: () => 'Co najmniej jedna cyfra',
  symbol: () => 'Znak specjalny (np. ! @ # ?)',
};

/**
 * Strength — miernik siły hasła.
 * <div class="pl-strength" data-pl-strength="rules: true">
 *   <input class="pl-input" type="password">
 * </div>
 * Miernik, etykietę i listę wymagań tworzy JS (albo używa istniejących
 * .pl-strength-meter / .pl-strength-label / .pl-strength-rules).
 */
class Strength extends Component {
  static defaults = {
    minLength: 8,
    rules: false, // lista wymagań odhaczanych na żywo
    label: true, // etykieta słowna
    labels: ['Słabe', 'Średnie', 'Dobre', 'Silne'],
    input: '', // selektor pola, gdy leży poza komponentem
    emptyLabel: '',
  };

  init() {
    const { el, options } = this;
    el.classList.add('pl-strength');
    this.input = (options.input && $(options.input)) || $('input', el);
    if (typeof options.labels === 'string') options.labels = options.labels.split(',').map((label) => label.trim());
    this.created = [];
    this.score = 0;

    // Miernik.
    this.meter = $('.pl-strength-meter', el);
    let bar = this.meter?.closest('.pl-strength-bar');
    if (!this.meter) {
      bar = this.make('div', 'pl-strength-bar');
      this.meter = this.make('div', 'pl-strength-meter');
      bar.append(this.meter);
      el.append(bar);
      this.created.push(bar);
    }
    if (!this.meter.children.length) {
      for (let i = 0; i < 4; i++) this.meter.append(this.make('span', 'pl-strength-segment'));
    }
    this.meter.setAttribute('role', 'meter');
    this.meter.setAttribute('aria-label', 'Siła hasła');
    this.meter.setAttribute('aria-valuemin', '0');
    this.meter.setAttribute('aria-valuemax', '4');

    // Etykieta.
    this.labelEl = $('.pl-strength-label', el);
    if (!this.labelEl && options.label) {
      this.labelEl = this.make('span', 'pl-strength-label');
      (bar || el).append(this.labelEl);
      if (!bar) this.created.push(this.labelEl);
    }
    this.labelEl?.setAttribute('aria-live', 'polite');

    // Lista wymagań.
    this.rulesEl = $('.pl-strength-rules', el);
    if (!this.rulesEl && options.rules) {
      this.rulesEl = this.make('ul', 'pl-strength-rules');
      el.append(this.rulesEl);
      this.created.push(this.rulesEl);
    }
    if (this.rulesEl && !this.rulesEl.children.length) {
      for (const [rule, text] of Object.entries(RULES)) {
        const item = this.make('li', 'pl-strength-rule');
        item.dataset.rule = rule;
        item.textContent = text(options.minLength);
        this.rulesEl.append(item);
      }
    }
    if (this.rulesEl && this.input) {
      this.rulesEl.id ||= uid('pl-strength');
      const described = this.input.getAttribute('aria-describedby');
      if (!described?.includes(this.rulesEl.id)) {
        this.input.setAttribute('aria-describedby', [described, this.rulesEl.id].filter(Boolean).join(' '));
      }
    }

    this.on(this.input, 'input', () => this.update());
    this.on(this.input?.form, 'reset', () => setTimeout(() => this.update()));
    this.onDestroy(() => this.created.forEach((node) => node.remove()));
    this.update(true);
  }

  make(tag, className) {
    const node = document.createElement(tag);
    node.className = className;
    return node;
  }

  /** Ocena hasła: { score: 0–4, rules: { length, case, digit, symbol } }. */
  check(value = this.input?.value || '') {
    const min = this.options.minLength;
    const rules = {
      length: value.length >= min,
      case: /\p{Ll}/u.test(value) && /\p{Lu}/u.test(value),
      digit: /\d/.test(value),
      symbol: /[^\p{L}\d\s]/u.test(value),
    };
    let score = 0;
    if (value) {
      const variety = [rules.case, rules.digit, rules.symbol].filter(Boolean).length;
      // Powtórzenia i oczywiste ciągi obniżają ocenę.
      const weak = /^(.)\1+$/.test(value) || /^(?:0?123456789?|abcdef|qwerty|haslo|hasło|password)/i.test(value);
      score = 1;
      if (rules.length) {
        score = 1 + variety;
        if (variety < 3 && value.length >= min + 6) score++;
        if (weak) score = Math.min(score, 1);
      }
      score = Math.min(4, score);
    }
    return { score, rules };
  }

  update(silent = false) {
    const value = this.input?.value || '';
    const { score, rules } = this.check(value);
    const label = score ? this.options.labels[score - 1] || '' : this.options.emptyLabel;
    this.el.dataset.score = score;
    [...this.meter.children].forEach((segment, i) => segment.classList.toggle('pl-active', i < score));
    this.meter.setAttribute('aria-valuenow', score);
    this.meter.setAttribute('aria-valuetext', label || 'Brak hasła');
    if (this.labelEl) this.labelEl.textContent = label;
    if (this.rulesEl) {
      for (const item of this.rulesEl.querySelectorAll('[data-rule]')) {
        const met = !!rules[item.dataset.rule];
        item.classList.toggle('pl-active', met);
        item.setAttribute('aria-label', `${item.textContent} — ${met ? 'spełnione' : 'niespełnione'}`);
      }
    }
    const changed = score !== this.score;
    this.score = score;
    this.rules = rules;
    if (!silent) this.emit('change', { score, label, rules, value, changed });
  }
}

register('strength', Strength);
export default Strength;
