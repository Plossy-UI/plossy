import { Component, register, $, uid } from '../core.js';
import icons from '../icons.js';

const svg = (name) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || ''}</svg>`;

const escapeHtml = (str) => String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

/** Rozmiar pliku w czytelnej postaci (1,4 MB). */
export function formatSize(bytes) {
  const units = ['B', 'KB', 'MB', 'GB'];
  let i = 0;
  while (bytes >= 1024 && i < units.length - 1) {
    bytes /= 1024;
    i++;
  }
  return `${bytes.toLocaleString('pl-PL', { maximumFractionDigits: i ? 1 : 0 })} ${units[i]}`;
}

function typeIcon(file) {
  const type = file.type || '';
  const ext = (file.name.split('.').pop() || '').toLowerCase();
  if (type.startsWith('image/')) return 'image';
  if (type.startsWith('video/')) return 'film';
  if (type.startsWith('audio/')) return 'music';
  if (/^(zip|rar|7z|tar|gz)$/.test(ext)) return 'package';
  if (/^(js|ts|json|html|css|scss|xml|php|py)$/.test(ext)) return 'code';
  if (/^(csv|xls|xlsx|ods)$/.test(ext)) return 'table';
  if (type === 'application/pdf' || type.startsWith('text/') || /^(doc|docx|odt|rtf|md)$/.test(ext)) return 'file-text';
  return 'file';
}

function matchesAccept(file, accept) {
  const rules = String(accept || '')
    .split(',')
    .map((rule) => rule.trim().toLowerCase())
    .filter(Boolean);
  if (!rules.length) return true;
  const name = file.name.toLowerCase();
  const type = (file.type || '').toLowerCase();
  return rules.some((rule) => {
    if (rule.startsWith('.')) return name.endsWith(rule);
    if (rule.endsWith('/*')) return type.startsWith(rule.slice(0, -1));
    return type === rule;
  });
}

/**
 * Upload
 * <div class="pl-upload" data-pl-upload="multiple: true; max-size: 5">
 *   <span class="pl-upload-icon" data-pl-icon="cloud-upload"></span>
 *   <p class="pl-upload-text">Przeciągnij pliki lub <label class="pl-upload-link">wybierz plik<input type="file"></label></p>
 * </div>
 * Lista plików (.pl-upload-list) powstaje automatycznie tuż za strefą.
 */
class Upload extends Component {
  static defaults = {
    multiple: null, // domyślnie wg atrybutu `multiple` pola
    accept: '', // np. "image/*, .pdf" (domyślnie wg atrybutu `accept` pola)
    maxSize: 0, // MB, 0 = bez limitu
    maxFiles: 0, // 0 = bez limitu
    url: '', // adres, pod który wysyłane są pliki (XHR)
    name: 'file', // nazwa pola w FormData
    method: 'POST',
    auto: true, // wysyłaj od razu po wybraniu
    thumbnails: true, // miniatury obrazów
    list: '', // selektor własnej listy plików
    messages: true, // pokazuj komunikaty błędów pod strefą
  };

  init() {
    const { el, options } = this;
    this.entries = [];
    this.dragDepth = 0;

    this.input = $('input[type="file"]', el);
    if (!this.input) {
      this.input = document.createElement('input');
      this.input.type = 'file';
      this.input.tabIndex = -1;
      this.input.name = options.name;
      el.append(this.input);
      if (!el.hasAttribute('tabindex')) el.tabIndex = 0;
      el.setAttribute('role', 'button');
    }
    if (options.multiple === null) options.multiple = this.input.multiple;
    else this.input.multiple = !!options.multiple;
    if (options.accept) this.input.accept = options.accept;
    else options.accept = this.input.accept || '';

    this.list =
      (options.list && $(options.list)) ||
      (el.nextElementSibling?.classList.contains('pl-upload-list') ? el.nextElementSibling : null);
    if (!this.list) {
      this.list = document.createElement('ul');
      this.list.className = 'pl-upload-list';
      el.after(this.list);
      this.ownList = true;
    }
    this.list.setAttribute('aria-live', 'polite');

    this.on(this.input, 'change', () => {
      const files = [...this.input.files];
      if (files.length) this.add(files);
    });

    // Kliknięcie w dowolne miejsce strefy otwiera okno wyboru.
    this.on(el, 'click', (event) => {
      if (event.target.closest('a, button, label, input')) return;
      this.browse();
    });
    this.on(el, 'keydown', (event) => {
      if (event.target === el && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault();
        this.browse();
      }
    });

    this.on(el, 'dragenter', (event) => {
      if (!this.hasFiles(event)) return;
      event.preventDefault();
      this.dragDepth++;
      el.classList.add('pl-upload-dragover');
    });
    this.on(el, 'dragover', (event) => {
      if (!this.hasFiles(event)) return;
      event.preventDefault();
      event.dataTransfer.dropEffect = 'copy';
    });
    this.on(el, 'dragleave', () => {
      this.dragDepth = Math.max(0, this.dragDepth - 1);
      if (!this.dragDepth) el.classList.remove('pl-upload-dragover');
    });
    this.on(el, 'drop', (event) => {
      if (!this.hasFiles(event)) return;
      event.preventDefault();
      this.dragDepth = 0;
      el.classList.remove('pl-upload-dragover');
      if (!this.disabled) this.add([...event.dataTransfer.files]);
    });

    this.on(this.list, 'click', (event) => {
      const button = event.target.closest('.pl-upload-remove');
      const item = button?.closest('.pl-upload-item');
      const entry = item && this.entries.find((candidate) => candidate.el === item);
      if (entry) this.remove(entry.file);
    });

    this.onDestroy(() => {
      this.entries.forEach((entry) => this.release(entry));
      if (this.ownList) this.list.remove();
      this.errorEl?.remove();
    });
  }

  get disabled() {
    return this.el.classList.contains('pl-disabled') || this.input.disabled;
  }

  /** Wybrane pliki (tablica obiektów File). */
  get files() {
    return this.entries.map((entry) => entry.file);
  }

  hasFiles(event) {
    return [...(event.dataTransfer?.types || [])].includes('Files');
  }

  /** Otwiera systemowe okno wyboru plików. */
  browse() {
    if (!this.disabled) this.input.click();
  }

  /** Dodaje pliki (z walidacją typu, rozmiaru i liczby). */
  add(files) {
    const { options } = this;
    const accepted = [];
    const errors = [];
    this.clearErrors();
    if (!options.multiple) {
      files = [...files].slice(0, 1);
    }

    for (const file of files) {
      let error = null;
      if (!matchesAccept(file, options.accept)) {
        error = { type: 'type', message: `Plik „${file.name}” ma niedozwolony format.` };
      } else if (options.maxSize && file.size > options.maxSize * 1024 * 1024) {
        error = {
          type: 'size',
          message: `Plik „${file.name}” jest za duży (${formatSize(file.size)}). Maksymalny rozmiar to ${options.maxSize} MB.`,
        };
      } else if (options.maxFiles && this.entries.length + accepted.length >= options.maxFiles) {
        error = { type: 'count', message: `Można dodać najwyżej ${options.maxFiles} ${plural(options.maxFiles)}.` };
      }
      if (error) {
        if (error.type !== 'count' || !errors.some((other) => other.type === 'count')) errors.push({ ...error, file });
      } else {
        accepted.push(file);
      }
    }

    errors.forEach((error) => this.emit('error', error));

    if (!options.multiple && accepted.length) this.clear(true);
    if (errors.length) this.showErrors(errors);
    const entries = accepted.map((file, index) => this.createEntry(file, index));
    this.entries.push(...entries);
    this.sync();
    if (entries.length) {
      this.emit('select', { files: accepted });
      if (options.url && options.auto) entries.forEach((entry) => this.send(entry));
    }
    return accepted;
  }

  createEntry(file, index = 0) {
    const entry = { id: uid('pl-upload'), file, status: 'ready', percent: 0, xhr: null, objectUrl: null };
    const item = document.createElement('li');
    item.className = 'pl-upload-item';
    item.style.animationDelay = `${index * 50}ms`;
    let thumb = svg(typeIcon(file));
    if (this.options.thumbnails && file.type?.startsWith('image/') && typeof URL.createObjectURL === 'function') {
      entry.objectUrl = URL.createObjectURL(file);
      thumb = `<img src="${entry.objectUrl}" alt="">`;
    }
    const name = escapeHtml(file.name);
    item.innerHTML =
      `<span class="pl-upload-thumb">${thumb}</span>` +
      `<span class="pl-upload-info"><span class="pl-upload-name" title="${name}">${name}</span><span class="pl-upload-meta"></span></span>` +
      `<button class="pl-upload-remove" type="button" aria-label="Usuń plik ${name}">${svg('x')}</button>` +
      `<span class="pl-upload-progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" aria-label="Postęp przesyłania: ${name}"><span class="pl-upload-bar"></span></span>`;
    entry.el = item;
    this.list.append(item);
    this.describe(entry);
    return entry;
  }

  /** Opis pod nazwą pliku: rozmiar · typ / postęp / błąd. */
  describe(entry, text) {
    const { file } = entry;
    const ext = file.name.includes('.') ? file.name.split('.').pop().toUpperCase() : '';
    const base = [formatSize(file.size), ext].filter(Boolean).join(' · ');
    const meta = $('.pl-upload-meta', entry.el);
    if (meta) meta.textContent = text ? `${text}` : base;
    entry.base = base;
  }

  find(target) {
    if (typeof target === 'number') return this.entries[target] || null;
    return this.entries.find((entry) => entry === target || entry.file === target || entry.id === target || entry.el === target) || null;
  }

  /** Ustawia postęp pliku (0–100) — przydatne przy własnej wysyłce. */
  setProgress(target, percent, detail = {}) {
    const entry = this.find(target);
    if (!entry || entry.status === 'done') return;
    percent = Math.min(100, Math.max(0, Math.round(percent)));
    entry.percent = percent;
    entry.status = 'uploading';
    entry.el.classList.add('pl-upload-item-uploading');
    entry.el.classList.remove('pl-upload-item-error');
    entry.el.style.setProperty('--pl-upload-value', percent / 100);
    $('.pl-upload-progress', entry.el)?.setAttribute('aria-valuenow', percent);
    this.describe(entry, `Przesyłanie… ${percent}%`);
    this.emit('progress', { file: entry.file, percent, ...detail });
  }

  /** Oznacza plik jako przesłany. */
  complete(target, response = null, xhr = null) {
    const entry = this.find(target);
    if (!entry || entry.status === 'done') return;
    entry.status = 'done';
    entry.percent = 100;
    entry.el.style.setProperty('--pl-upload-value', 1);
    entry.el.classList.remove('pl-upload-item-uploading', 'pl-upload-item-error');
    entry.el.classList.add('pl-upload-item-done');
    this.describe(entry);
    this.describe(entry, `${entry.base} · Przesłano`);
    this.emit('complete', { file: entry.file, response, xhr });
    if (this.entries.every((other) => other.status === 'done')) this.emit('completeall', { files: this.files });
  }

  /** Oznacza plik jako nieprzesłany. */
  fail(target, message = 'Nie udało się przesłać pliku.', xhr = null) {
    const entry = this.find(target);
    if (!entry) return;
    entry.status = 'error';
    entry.el.classList.remove('pl-upload-item-uploading');
    entry.el.classList.add('pl-upload-item-error');
    this.describe(entry, message);
    this.emit('error', { type: 'upload', message, file: entry.file, xhr });
  }

  /** Wysyła oczekujące pliki pod `url` (gdy `auto: false`). */
  upload() {
    if (!this.options.url) return;
    this.entries.filter((entry) => entry.status === 'ready' || entry.status === 'error').forEach((entry) => this.send(entry));
  }

  send(entry) {
    const { options } = this;
    const xhr = new XMLHttpRequest();
    const data = new FormData();
    data.append(options.name, entry.file, entry.file.name);
    entry.xhr = xhr;
    xhr.open(options.method, options.url);
    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable) {
        this.setProgress(entry, (event.loaded / event.total) * 100, { loaded: event.loaded, total: event.total });
      }
    });
    xhr.addEventListener('load', () => {
      entry.xhr = null;
      if (xhr.status >= 200 && xhr.status < 300) {
        let response = xhr.responseText;
        try {
          response = JSON.parse(response);
        } catch {
          /* odpowiedź tekstowa */
        }
        this.complete(entry, response, xhr);
      } else {
        this.fail(entry, `Nie udało się przesłać pliku (błąd ${xhr.status}).`, xhr);
      }
    });
    xhr.addEventListener('error', () => {
      entry.xhr = null;
      this.fail(entry, 'Nie udało się przesłać pliku — sprawdź połączenie.', xhr);
    });
    if (!this.emit('beforesend', { file: entry.file, xhr, data }, true)) {
      entry.xhr = null;
      return;
    }
    this.setProgress(entry, 0);
    xhr.send(data);
  }

  release(entry) {
    entry.xhr?.abort();
    entry.xhr = null;
    if (entry.objectUrl) URL.revokeObjectURL(entry.objectUrl);
  }

  /** Usuwa plik z listy (przerywa trwającą wysyłkę). */
  remove(target) {
    const entry = this.find(target);
    if (!entry) return;
    this.entries.splice(this.entries.indexOf(entry), 1);
    this.release(entry);
    const item = entry.el;
    item.classList.add('pl-upload-item-leave');
    setTimeout(() => item.remove(), 200);
    this.clearErrors();
    this.sync();
    this.emit('remove', { file: entry.file });
  }

  /** Usuwa wszystkie pliki. */
  clear(silent = false) {
    const removed = this.entries.splice(0);
    removed.forEach((entry) => {
      this.release(entry);
      entry.el.remove();
    });
    this.clearErrors();
    this.sync();
    if (!silent) removed.forEach((entry) => this.emit('remove', { file: entry.file }));
  }

  /** Utrzymuje `input.files` w zgodzie z listą — zwykły formularz wyśle to, co widać. */
  sync() {
    try {
      const transfer = new DataTransfer();
      this.entries.forEach((entry) => transfer.items.add(entry.file));
      this.input.files = transfer.files;
    } catch {
      /* brak DataTransfer — pole zachowuje ostatni wybór */
    }
    this.el.classList.toggle('pl-upload-has-files', this.entries.length > 0);
  }

  showErrors(errors) {
    const { el } = this;
    el.classList.remove('pl-upload-invalid');
    void el.offsetWidth;
    el.classList.add('pl-upload-invalid');
    clearTimeout(this.invalidTimer);
    this.invalidTimer = setTimeout(() => el.classList.remove('pl-upload-invalid'), 1600);
    if (!this.options.messages) return;
    if (!this.errorEl) {
      this.errorEl = document.createElement('div');
      this.errorEl.className = 'pl-upload-error';
      this.errorEl.setAttribute('role', 'alert');
    }
    this.errorEl.innerHTML = `${svg('circle-alert')}<span>${errors.map((error) => escapeHtml(error.message)).join('<br>')}</span>`;
    el.after(this.errorEl);
  }

  clearErrors() {
    this.errorEl?.remove();
    this.el.classList.remove('pl-upload-invalid');
  }
}

function plural(n) {
  if (n === 1) return 'plik';
  const mod10 = n % 10;
  const mod100 = n % 100;
  return mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14) ? 'pliki' : 'plików';
}

register('upload', Upload);
export default Upload;
