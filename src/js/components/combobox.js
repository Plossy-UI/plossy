import { Component, register, uid, debounce, showLayer, hideLayer, autoPlace, animationsDone } from '../core.js';
import icons from '../icons.js';

const svg = (name) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || ''}</svg>`;

const escapeHtml = (str) => String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

/** Sprowadza tekst do porównań: małe litery, bez znaków diakrytycznych (długość bez zmian). */
const fold = (text) =>
  String(text)
    .split('')
    .map((ch) => (ch === 'ł' || ch === 'Ł' ? 'l' : ch.normalize('NFD')[0] || ch).toLowerCase()[0] || ch)
    .join('');

function normalize(list) {
  return (list || []).map((entry) => {
    if (entry === null || typeof entry !== 'object') return { value: String(entry), label: String(entry) };
    const label = entry.label ?? entry.text ?? entry.name ?? entry.value;
    return { ...entry, value: String(entry.value ?? label), label: String(label) };
  });
}

/**
 * Combobox — pole wyboru z wyszukiwaniem.
 * <select class="pl-select" data-pl-combobox>…</select>                (także `multiple`)
 * <input class="pl-input" data-pl-combobox list="id-datalist">         (dowolny tekst + podpowiedzi)
 * Plossy.combobox(el, { source: async (q) => [...] })                    (źródło asynchroniczne)
 */
class Combobox extends Component {
  static defaults = {
    placeholder: '',
    clearable: false, // przycisk czyszczenia
    creatable: false, // pozwala dodać własną pozycję
    search: true, // filtrowanie przez wpisywanie
    highlight: true, // wyróżnia dopasowany fragment
    closeOnSelect: null, // domyślnie: true dla pojedynczego wyboru
    options: null, // lista pozycji (JS)
    source: null, // funkcja async (q) => [...] lub adres URL (doklejane ?q)
    minLength: 0, // minimalna długość zapytania dla `source`
    delay: 220, // opóźnienie zapytań `source` (ms)
    placement: 'bottom-start',
    offset: 6,
    emptyText: 'Brak wyników',
    loadingText: 'Szukam…',
    createText: 'Dodaj',
  };

  init() {
    const { el, options } = this;
    this.isSelect = el.tagName === 'SELECT';
    this.multiple = this.isSelect && el.multiple;
    this.isOpen = false;
    this.items = [];
    this.selected = [];
    this.visible = [];
    this.active = -1;
    this.query = '';
    this.request = 0;
    this.typed = '';
    if (options.closeOnSelect === null) options.closeOnSelect = !this.multiple;

    this.build();
    this.readItems();
    this.renderValue();
    this.bind();
  }

  // ── Budowa ──────────────────────────────────────────────────────────────

  build() {
    const { el, options } = this;
    const wrapper = (this.wrapper = document.createElement('div'));
    wrapper.className = 'pl-combobox';
    for (const cls of el.classList) {
      if (/^pl-form-(small|large|danger|success|width-)/.test(cls)) wrapper.classList.add(cls);
    }
    wrapper.classList.toggle('pl-combobox-multiple', this.multiple);

    const control = (this.control = document.createElement('div'));
    control.className = 'pl-combobox-control';

    const listId = uid('pl-combobox');
    let input;
    if (this.isSelect) {
      input = document.createElement('input');
      input.type = 'text';
      const label = el.labels?.[0];
      if (label) {
        label.id ||= uid('pl-combobox-label');
        input.setAttribute('aria-labelledby', label.id);
      } else if (el.getAttribute('aria-label')) {
        input.setAttribute('aria-label', el.getAttribute('aria-label'));
      }
      this.placeholderOption = [...el.options].find((option) => option.value === '' && !option.closest('optgroup')) || null;
      el.after(wrapper);
      el.classList.add('pl-combobox-native');
      this.nativeTabIndex = el.getAttribute('tabindex');
      el.tabIndex = -1;
      el.setAttribute('aria-hidden', 'true');
    } else {
      input = el;
      el.before(wrapper);
      this.hadInputClass = el.classList.contains('pl-input');
      el.classList.remove('pl-input');
      const listAttr = el.getAttribute('list');
      this.datalist = listAttr ? document.getElementById(listAttr) : null;
      if (this.datalist) el.removeAttribute('list');
    }
    this.input = input;
    this.placeholder =
      options.placeholder || el.getAttribute('placeholder') || el.dataset.placeholder || this.placeholderOption?.textContent.trim() || '';
    input.classList.add('pl-combobox-input');
    input.autocomplete = 'off';
    input.spellcheck = false;
    input.setAttribute('role', 'combobox');
    input.setAttribute('aria-autocomplete', options.search ? 'list' : 'none');
    input.setAttribute('aria-expanded', 'false');
    input.setAttribute('aria-controls', listId);
    input.setAttribute('aria-haspopup', 'listbox');
    if (!options.search) input.readOnly = true;
    if (this.isSelect) input.disabled = el.disabled;
    wrapper.classList.toggle('pl-disabled', input.disabled);

    control.append(input);

    this.clearButton = document.createElement('button');
    this.clearButton.type = 'button';
    this.clearButton.className = 'pl-combobox-clear';
    this.clearButton.tabIndex = -1;
    this.clearButton.setAttribute('aria-label', 'Wyczyść');
    this.clearButton.innerHTML = svg('x');
    this.clearButton.hidden = true;
    if (options.clearable) control.append(this.clearButton);

    const caret = document.createElement('span');
    caret.className = 'pl-combobox-caret';
    caret.innerHTML = svg(this.isSelect ? 'chevrons-up-down' : 'chevron-down');
    control.append(caret);

    const list = (this.list = document.createElement('div'));
    list.className = 'pl-combobox-list';
    list.id = listId;
    list.setAttribute('role', 'listbox');
    list.hidden = true;
    if (this.multiple) list.setAttribute('aria-multiselectable', 'true');
    if (input.getAttribute('aria-labelledby')) list.setAttribute('aria-labelledby', input.getAttribute('aria-labelledby'));
    else list.setAttribute('aria-label', this.placeholder || 'Opcje');

    wrapper.append(control, list);

    this.onDestroy(() => {
      this.stopPlace?.();
      hideLayer(list);
      if (this.isSelect) {
        el.classList.remove('pl-combobox-native');
        el.removeAttribute('aria-hidden');
        if (this.nativeTabIndex === null) el.removeAttribute('tabindex');
        else el.setAttribute('tabindex', this.nativeTabIndex);
      } else {
        wrapper.before(el);
        el.classList.remove('pl-combobox-input');
        if (this.hadInputClass) el.classList.add('pl-input');
        for (const name of ['role', 'aria-autocomplete', 'aria-expanded', 'aria-controls', 'aria-haspopup', 'aria-activedescendant']) {
          el.removeAttribute(name);
        }
      }
      wrapper.remove();
    });
  }

  /** Wczytuje pozycje z <select>, <datalist> lub opcji `options`. */
  readItems() {
    const { el, options } = this;
    if (this.isSelect) {
      this.items = [...el.options]
        .filter((option) => option !== this.placeholderOption)
        .map((option) => ({
          value: option.value,
          label: option.textContent.trim(),
          group: option.closest('optgroup')?.label || '',
          disabled: option.disabled || !!option.closest('optgroup')?.disabled,
          description: option.dataset.description || '',
          icon: option.dataset.icon || '',
          image: option.dataset.image || '',
          option,
        }));
      this.selected = this.items.filter((item) => item.option.selected);
      if (!this.multiple && this.placeholderOption?.selected) this.selected = [];
    } else if (options.options) {
      this.items = normalize(typeof options.options === 'string' ? options.options.split(',').map((s) => s.trim()) : options.options);
    } else if (this.datalist) {
      this.items = [...this.datalist.options].map((option) => ({
        value: option.value,
        label: option.label || option.textContent.trim() || option.value,
        description: option.dataset.description || '',
        icon: option.dataset.icon || '',
        image: option.dataset.image || '',
      }));
    }
    if (options.options && this.isSelect) this.setOptions(options.options, true);
  }

  bind() {
    const { input, list, control, wrapper, options } = this;

    this.on(input, 'input', () => {
      if (this.syncing) return;
      this.query = input.value;
      if (!this.isSelect) this.wrapper.classList.toggle('pl-combobox-has-value', !!input.value);
      this.clearButton.hidden = !this.hasValue;
      if (!this.isOpen) this.open(true);
      else this.refreshList();
    });

    this.on(input, 'keydown', (event) => this.onKeydown(event));

    this.on(control, 'pointerdown', (event) => {
      if (input.disabled || event.button > 0) return;
      if (event.target.closest('.pl-combobox-chip-remove, .pl-combobox-clear')) {
        event.preventDefault();
        return;
      }
      if (event.target !== input) event.preventDefault();
      input.focus();
      if (this.isOpen) {
        if (event.target !== input || !options.search) this.close();
      } else {
        this.open();
      }
    });

    this.on(control, 'click', (event) => {
      const remove = event.target.closest('.pl-combobox-chip-remove');
      if (remove) {
        const value = remove.closest('.pl-combobox-chip')?.dataset.value;
        this.deselect(this.selected.find((item) => item.value === value));
      } else if (event.target.closest('.pl-combobox-clear')) {
        this.clear();
        input.focus();
      }
    });

    // Lista nie zabiera fokusu polu.
    this.on(list, 'pointerdown', (event) => event.preventDefault());
    this.on(list, 'click', (event) => {
      const option = event.target.closest('.pl-combobox-option');
      const index = this.visible.findIndex((entry) => entry.el === option);
      if (index >= 0) this.choose(index);
    });
    this.on(list, 'pointermove', (event) => {
      const option = event.target.closest('.pl-combobox-option');
      const index = this.visible.findIndex((entry) => entry.el === option);
      if (index >= 0 && index !== this.active && !this.visible[index].item.disabled) this.setActive(index, false);
    });

    this.on(
      document,
      'pointerdown',
      (event) => {
        if (this.isOpen && !wrapper.contains(event.target)) this.close();
      },
      true,
    );
    this.on(wrapper, 'focusout', (event) => {
      if (this.isOpen && !wrapper.contains(event.relatedTarget)) this.close();
    });

    if (this.isSelect) {
      // Fokus na ukrytym <select> (np. klik w <label>) przechodzi na pole.
      this.on(this.el, 'focus', () => input.focus());
      this.on(this.el.form, 'reset', () => setTimeout(() => this.refresh()));
    } else {
      this.on(input, 'change', () => {
        if (!this.syncing) this.emit('change', { value: input.value, item: null });
      });
    }

    this.load = debounce((query) => this.fetch(query), options.delay);
  }

  // ── Wartość ─────────────────────────────────────────────────────────────

  get hasValue() {
    return this.isSelect ? this.selected.length > 0 : !!this.input.value;
  }

  /** Wartość: string (pojedynczy wybór / tekst) lub tablica (multiple). */
  get value() {
    if (!this.isSelect) return this.input.value;
    return this.multiple ? this.selected.map((item) => item.value) : (this.selected[0]?.value ?? '');
  }

  renderValue() {
    const { input, control } = this;
    const chips = new Map([...control.querySelectorAll('.pl-combobox-chip')].map((chip) => [chip.dataset.value, chip]));
    if (this.multiple) {
      for (const item of this.selected) {
        if (chips.has(item.value)) {
          chips.delete(item.value);
          continue;
        }
        const chip = document.createElement('span');
        chip.className = 'pl-combobox-chip';
        chip.dataset.value = item.value;
        chip.innerHTML = `<span class="pl-combobox-chip-label">${escapeHtml(item.label)}</span><button class="pl-combobox-chip-remove" type="button" tabindex="-1" aria-label="Usuń: ${escapeHtml(item.label)}">${svg('x')}</button>`;
        control.insertBefore(chip, input);
      }
      chips.forEach((chip) => chip.remove());
      input.placeholder = this.selected.length ? '' : this.placeholder;
      if (!this.isOpen) input.value = '';
    } else if (this.isSelect) {
      input.placeholder = this.placeholder;
      if (!this.isOpen || !this.query) input.value = this.selected[0]?.label || '';
    } else {
      input.placeholder = this.placeholder;
    }
    this.clearButton.hidden = !this.hasValue;
    this.wrapper.classList.toggle('pl-combobox-has-value', this.hasValue);
  }

  /** Zapisuje wybór do <select> / pola i wysyła zdarzenia. */
  commit(item = null) {
    const { el } = this;
    if (this.isSelect) {
      const values = new Set(this.selected.map((entry) => entry.value));
      for (const entry of this.selected) {
        if (!entry.option || entry.option.parentNode === null) {
          entry.option = new Option(entry.label, entry.value);
          el.append(entry.option);
        }
      }
      for (const option of el.options) option.selected = values.has(option.value) && option !== this.placeholderOption;
      if (!this.selected.length) {
        if (this.placeholderOption) this.placeholderOption.selected = true;
        else if (!this.multiple) el.selectedIndex = -1;
      }
    } else if (item) {
      this.input.value = item.label;
      this.input.dataset.value = item.value;
    }
    this.renderValue();
    this.syncing = true;
    el.dispatchEvent(new Event('change', { bubbles: true }));
    this.syncing = false;
    this.emit('change', { value: this.value, item, items: [...this.selected] });
  }

  choose(index) {
    const entry = this.visible[index];
    if (!entry || entry.item.disabled) return;
    let { item } = entry;
    if (entry.create) {
      item = { value: this.query.trim(), label: this.query.trim(), created: true };
      this.items.push(item);
      this.emit('create', { item });
    }
    if (this.multiple) {
      const at = this.selected.findIndex((other) => other.value === item.value);
      if (at >= 0) this.selected.splice(at, 1);
      else this.selected.push(item);
      this.query = '';
      this.input.value = '';
      this.commit(item);
      if (this.options.closeOnSelect) this.close();
      else this.refreshList(item.value);
    } else {
      this.selected = this.isSelect ? [item] : [];
      this.query = '';
      this.commit(item);
      this.close();
    }
  }

  deselect(item) {
    if (!item) return;
    this.selected = this.selected.filter((other) => other !== item);
    this.commit(item);
    if (this.isOpen) this.refreshList();
  }

  /** Ustawia wartość (string lub tablica wartości). */
  setValue(value, silent = false) {
    const values = (Array.isArray(value) ? value : value === null || value === undefined || value === '' ? [] : [value]).map(String);
    if (this.isSelect) {
      this.selected = values.map((v) => this.items.find((item) => item.value === v)).filter(Boolean);
      if (!this.multiple) this.selected = this.selected.slice(0, 1);
    } else {
      const item = this.items.find((entry) => entry.value === values[0]);
      this.input.value = item?.label ?? values[0] ?? '';
    }
    this.query = '';
    if (silent) {
      this.renderValue();
    } else {
      this.commit(null);
    }
    if (this.isOpen) this.refreshList();
  }

  /** Czyści wybór. */
  clear() {
    this.selected = [];
    this.query = '';
    this.input.value = '';
    delete this.input.dataset.value;
    this.commit(null);
    if (this.isOpen) this.refreshList();
  }

  /** Podmienia listę pozycji. */
  setOptions(list, silent = false) {
    const items = normalize(list);
    if (this.isSelect) {
      const keep = new Set(this.selected.map((item) => item.value));
      [...this.el.options].forEach((option) => {
        if (option !== this.placeholderOption && !keep.has(option.value)) option.remove();
      });
      this.el.querySelectorAll('optgroup:empty').forEach((group) => group.remove());
      for (const item of items) {
        const existing = this.selected.find((other) => other.value === item.value);
        if (existing) {
          item.option = existing.option;
          this.selected[this.selected.indexOf(existing)] = item;
        } else {
          item.option = new Option(item.label, item.value);
          item.option.disabled = !!item.disabled;
          this.el.append(item.option);
        }
      }
    }
    this.items = items;
    if (!silent && this.isOpen) this.refreshList();
  }

  /** Ponownie wczytuje pozycje i wybór z elementu źródłowego. */
  refresh() {
    this.readItems();
    this.renderValue();
    if (this.isOpen) this.refreshList();
  }

  // ── Lista ───────────────────────────────────────────────────────────────

  refreshList(keepValue) {
    const { options } = this;
    if (options.source) {
      if (this.query.length < options.minLength) {
        this.request++;
        this.setLoading(false);
        this.items = this.isSelect ? [...this.selected] : [];
        this.renderList(options.minLength > 0 ? `Wpisz co najmniej ${options.minLength} zn., aby wyszukać` : options.emptyText);
        return;
      }
      this.setLoading(true);
      if (!this.visible.length) this.renderMessage(options.loadingText, true);
      this.load(this.query);
      return;
    }
    this.renderList(null, keepValue);
  }

  async fetch(query) {
    const { options } = this;
    const token = ++this.request;
    try {
      const source = options.source;
      const result =
        typeof source === 'function'
          ? await source(query)
          : await fetch(`${source}${encodeURIComponent(query)}`).then((response) => response.json());
      if (token !== this.request) return;
      const items = normalize(result);
      // Zachowaj obiekty już wybranych pozycji.
      this.items = items.map((item) => this.selected.find((other) => other.value === item.value) || item);
      this.setLoading(false);
      if (this.isOpen) this.renderList(null, undefined, true);
    } catch (error) {
      if (token !== this.request) return;
      this.setLoading(false);
      this.renderMessage('Nie udało się pobrać wyników');
      this.emit('error', { error });
    }
  }

  setLoading(state) {
    this.wrapper.classList.toggle('pl-combobox-loading', state);
    this.input.setAttribute('aria-busy', String(state));
  }

  renderMessage(text, loading = false) {
    this.visible = [];
    this.active = -1;
    this.input.removeAttribute('aria-activedescendant');
    this.list.innerHTML = `<div class="pl-combobox-empty${loading ? ' pl-combobox-empty-loading' : ''}" role="presentation">${loading ? '<span class="pl-combobox-spinner"></span>' : ''}${escapeHtml(text)}</div>`;
  }

  renderList(emptyText = null, keepValue, prefiltered = false) {
    const { list, options } = this;
    const query = this.query.trim();
    const needle = fold(query);
    const filter = needle && options.search && !prefiltered && !options.source;
    const selectedValues = new Set(this.selected.map((item) => item.value));
    const matches = this.items.filter((item) => !filter || fold(item.label).includes(needle) || (item.description && fold(item.description).includes(needle)));

    this.visible = [];
    list.innerHTML = '';
    let group = null;
    let container = list;
    matches.forEach((item) => {
      if ((item.group || '') !== (group ?? '')) {
        group = item.group || '';
        if (group) {
          container = document.createElement('div');
          container.className = 'pl-combobox-group';
          container.setAttribute('role', 'group');
          const label = document.createElement('div');
          label.className = 'pl-combobox-group-label';
          label.id = uid('pl-combobox-group');
          label.textContent = group;
          container.setAttribute('aria-labelledby', label.id);
          container.append(label);
          list.append(container);
        } else {
          container = list;
        }
      }
      const selected = this.isSelect ? selectedValues.has(item.value) : false;
      const option = this.optionEl(item, needle, selected);
      container.append(option);
      this.visible.push({ item, el: option });
    });

    const exact = this.items.some((item) => fold(item.label) === needle);
    if (options.creatable && query && !exact) {
      const option = document.createElement('div');
      option.className = 'pl-combobox-option pl-combobox-create';
      option.setAttribute('role', 'option');
      option.setAttribute('aria-selected', 'false');
      option.id = uid(`${list.id}-o`);
      option.innerHTML = `<span class="pl-combobox-option-icon">${svg('plus')}</span><span class="pl-combobox-option-text">${escapeHtml(options.createText)} „<strong>${escapeHtml(query)}</strong>”</span>`;
      list.append(option);
      this.visible.push({ item: { value: query, label: query }, el: option, create: true });
    }

    if (!this.visible.length) {
      this.renderMessage(emptyText || options.emptyText);
      return;
    }

    // Pozycja aktywna: zachowana → wybrana → pierwsza dostępna (gdy trwa wyszukiwanie).
    let active = -1;
    if (keepValue !== undefined) active = this.visible.findIndex((entry) => entry.item.value === keepValue);
    if (active < 0 && !query && this.isSelect && !this.multiple) {
      active = this.visible.findIndex((entry) => selectedValues.has(entry.item.value));
    }
    if (active < 0 && ((query && this.isSelect) || !options.search)) active = this.visible.findIndex((entry) => !entry.item.disabled);
    this.active = -1;
    this.input.removeAttribute('aria-activedescendant');
    if (active >= 0) this.setActive(active);
  }

  optionEl(item, needle, selected) {
    const option = document.createElement('div');
    option.className = 'pl-combobox-option';
    option.id = uid(`${this.list.id}-o`);
    option.setAttribute('role', 'option');
    option.setAttribute('aria-selected', String(selected));
    if (item.disabled) {
      option.setAttribute('aria-disabled', 'true');
      option.classList.add('pl-disabled');
    }
    let label = escapeHtml(item.label);
    if (needle && this.options.highlight) {
      const at = fold(item.label).indexOf(needle);
      if (at >= 0) {
        label = `${escapeHtml(item.label.slice(0, at))}<mark>${escapeHtml(item.label.slice(at, at + needle.length))}</mark>${escapeHtml(item.label.slice(at + needle.length))}`;
      }
    }
    let media = '';
    if (item.image) media = `<img class="pl-combobox-option-image" src="${escapeHtml(item.image)}" alt="">`;
    else if (item.icon) media = `<span class="pl-combobox-option-icon">${svg(item.icon)}</span>`;
    option.innerHTML =
      media +
      `<span class="pl-combobox-option-text"><span class="pl-combobox-option-label">${label}</span>${item.description ? `<span class="pl-combobox-option-description">${escapeHtml(item.description)}</span>` : ''}</span>` +
      `<span class="pl-combobox-check">${svg('check')}</span>`;
    return option;
  }

  setActive(index, scroll = true) {
    this.visible[this.active]?.el.classList.remove('pl-active');
    this.active = index;
    const entry = this.visible[index];
    if (!entry) {
      this.input.removeAttribute('aria-activedescendant');
      return;
    }
    entry.el.classList.add('pl-active');
    this.input.setAttribute('aria-activedescendant', entry.el.id);
    if (scroll && this.isOpen) entry.el.scrollIntoView({ block: 'nearest' });
  }

  /** Przesuwa pozycję aktywną z pominięciem wyłączonych. */
  move(step, from = this.active) {
    const count = this.visible.length;
    if (!count) return;
    let index = from;
    for (let i = 0; i < count; i++) {
      index = (index + step + count) % count;
      if (!this.visible[index].item.disabled) return this.setActive(index);
    }
  }

  edge(last) {
    const order = last ? [...this.visible.keys()].reverse() : [...this.visible.keys()];
    const index = order.find((i) => !this.visible[i].item.disabled);
    if (index !== undefined) this.setActive(index);
  }

  onKeydown(event) {
    const { input, options } = this;
    const { key } = event;
    switch (key) {
      case 'ArrowDown':
      case 'ArrowUp':
        event.preventDefault();
        if (event.altKey && key === 'ArrowUp') return this.close();
        if (!this.isOpen) {
          this.open();
          if (this.active < 0) this.edge(key === 'ArrowUp');
        } else if (this.active < 0) {
          this.edge(key === 'ArrowUp');
        } else {
          this.move(key === 'ArrowDown' ? 1 : -1);
        }
        break;
      case 'Home':
      case 'End':
        if (!this.isOpen) return;
        event.preventDefault();
        this.edge(key === 'End');
        break;
      case 'PageDown':
      case 'PageUp':
        if (!this.isOpen) return;
        event.preventDefault();
        {
          const target = Math.min(Math.max(this.active + (key === 'PageDown' ? 8 : -8), 0), this.visible.length - 1);
          if (this.visible[target]?.item.disabled) this.move(key === 'PageDown' ? 1 : -1, target);
          else this.setActive(target);
        }
        break;
      case 'Enter':
        if (this.isOpen) {
          if (this.active >= 0) {
            event.preventDefault();
            this.choose(this.active);
          } else if (!this.isSelect) {
            this.close();
          } else {
            event.preventDefault();
          }
        }
        break;
      case 'Escape':
        if (this.isOpen) {
          event.preventDefault();
          event.stopPropagation();
          this.close();
        } else if (options.clearable && this.hasValue) {
          event.preventDefault();
          this.clear();
        }
        break;
      case 'Tab':
        if (this.isOpen) this.close();
        break;
      case 'Backspace':
        if (this.multiple && !input.value && this.selected.length) {
          this.deselect(this.selected[this.selected.length - 1]);
        }
        break;
      case ' ':
        if (!options.search) {
          event.preventDefault();
          if (this.isOpen && this.active >= 0) this.choose(this.active);
          else this.open();
        }
        break;
      default:
        // Bez wyszukiwania: wybór przez wpisanie początku nazwy.
        if (!options.search && key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
          this.typeahead(key);
        }
    }
  }

  typeahead(char) {
    clearTimeout(this.typedTimer);
    this.typed += fold(char);
    this.typedTimer = setTimeout(() => {
      this.typed = '';
    }, 600);
    if (!this.isOpen) this.open();
    const start = this.typed.length === 1 ? this.active + 1 : Math.max(this.active, 0);
    const order = [...this.visible.keys()];
    const rotated = [...order.slice(start), ...order.slice(0, start)];
    const index = rotated.find((i) => !this.visible[i].item.disabled && fold(this.visible[i].item.label).startsWith(this.typed));
    if (index !== undefined) this.setActive(index);
  }

  // ── Otwieranie ──────────────────────────────────────────────────────────

  /** Otwiera listę. */
  open(keepQuery = false) {
    const { input, list, options } = this;
    if (this.isOpen || input.disabled) return;
    if (!this.emit('beforeopen', {}, true)) return;
    this.isOpen = true;
    if (!keepQuery) {
      this.query = '';
      if (this.isSelect && !this.multiple && options.search) input.select();
    }
    this.wrapper.classList.add('pl-open');
    input.setAttribute('aria-expanded', 'true');
    list.classList.remove('pl-combobox-list-out');
    showLayer(list);
    this.refreshList();
    this.stopPlace?.();
    this.stopPlace = autoPlace(list, this.control, { placement: options.placement, offset: options.offset, matchWidth: true });
    this.visible[this.active]?.el.scrollIntoView({ block: 'nearest' });
    this.emit('open');
  }

  /** Zamyka listę. */
  async close() {
    const { input, list } = this;
    if (!this.isOpen) return;
    this.isOpen = false;
    this.request++;
    this.setLoading(false);
    this.query = '';
    this.wrapper.classList.remove('pl-open');
    input.setAttribute('aria-expanded', 'false');
    input.removeAttribute('aria-activedescendant');
    if (this.isSelect) this.renderValue();
    this.emit('close');
    list.classList.add('pl-combobox-list-out');
    await animationsDone(list);
    if (this.isOpen) return;
    this.stopPlace?.();
    this.stopPlace = null;
    list.classList.remove('pl-combobox-list-out');
    hideLayer(list);
  }

  toggle() {
    return this.isOpen ? this.close() : this.open();
  }
}

register('combobox', Combobox);
export default Combobox;
