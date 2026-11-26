import { Component, register, api, animationsDone, showLayer, hideLayer, prefersReducedMotion } from '../core.js';

/**
 * Notification — powiadomienia (toasty) układane w stos.
 * Plossy.notification('Zapisano zmiany');
 * const n = Plossy.notification({ message, title, status: 'success', pos: 'top-right', timeout: 4000 });
 * n.close();  Plossy.notification.closeAll();
 * Deklaratywnie: <button data-pl-notification="message: Zapisano; status: success">
 */

const POSITIONS = ['top-right', 'top-left', 'top-center', 'bottom-left', 'bottom-center', 'bottom-right'];
const STATUSES = ['primary', 'secondary', 'success', 'warning', 'danger', 'info'];
const ICONS = { primary: 'bell', success: 'circle-check', warning: 'triangle-alert', danger: 'circle-x', info: 'info' };
const EASE = 'cubic-bezier(0.33, 0.5, 0.2, 1)';
const SWIPE_DISTANCE = 72;

const DEFAULTS = {
  message: '',
  title: '',
  status: '', // primary | success | warning | danger | info
  pos: 'top-right',
  timeout: 4000, // ms; 0 = nie znika samo
  icon: null, // nazwa ikony; false = bez ikony; null = wg statusu
  close: true, // przycisk zamykania
  action: null, // { label, onClick(notification) }
  group: '', // etykieta do closeAll(group)
  cls: '', // dodatkowe klasy wiadomości, np. pl-notification-solid
  html: false, // traktuj message jako HTML
  progress: true, // pasek pozostałego czasu
  onClose: null,
};

const containers = new Map(); // pos → element
const active = new Set();

/** Najwyższy otwarty modal albo <body> — poza modalem dokument jest „inert". */
function getHost() {
  const modals = [...document.querySelectorAll('dialog[open]')].filter((dialog) => dialog.matches(':modal'));
  return modals[modals.length - 1] || document.body;
}

function getContainer(pos) {
  let container = containers.get(pos);
  if (!container) {
    container = document.createElement('div');
    container.className = `pl-notification pl-notification-${pos}`;
    containers.set(pos, container);
  }
  const host = getHost();
  if (container.parentElement !== host) {
    host.appendChild(container);
    if (host !== document.body) {
      // Po zamknięciu modala stos wraca do <body>.
      host.addEventListener(
        'close',
        () => {
          if (container.parentElement === host && container.childElementCount) {
            document.body.appendChild(container);
            showLayer(container);
          }
        },
        { once: true },
      );
    }
  } else {
    // Ponowne pokazanie przenosi stos na wierzch top-layer.
    try {
      if (container.matches(':popover-open')) container.hidePopover();
    } catch {
      /* noop */
    }
  }
  showLayer(container);
  return container;
}

function releaseContainer(container) {
  if (container.childElementCount) return;
  hideLayer(container);
  container.remove();
}

class Toast {
  constructor(options) {
    this.options = options;
    this.closed = false;
    this.pauses = new Set();
    this.build();
    this.mount();
  }

  build() {
    const { options } = this;
    const assertive = options.status === 'danger' || options.status === 'warning';

    const item = (this.item = document.createElement('div'));
    item.className = 'pl-notification-item';

    const el = (this.el = document.createElement('div'));
    el.className = ['pl-notification-message', options.status && `pl-notification-${options.status}`, options.cls, 'pl-enter']
      .filter(Boolean)
      .join(' ');
    el.setAttribute('role', assertive ? 'alert' : 'status');
    el.setAttribute('aria-live', assertive ? 'assertive' : 'polite');
    el.setAttribute('aria-atomic', 'true');

    const iconName = options.icon === false ? null : options.icon || ICONS[options.status];
    if (iconName) {
      const icon = document.createElement('span');
      icon.className = 'pl-notification-icon';
      icon.setAttribute('data-pl-icon', iconName);
      el.append(icon);
    }

    const content = document.createElement('div');
    content.className = 'pl-notification-content';
    if (options.title) {
      const title = document.createElement('div');
      title.className = 'pl-notification-title';
      title.textContent = String(options.title);
      content.append(title);
    }
    const text = (this.textEl = document.createElement('div'));
    text.className = 'pl-notification-text';
    if (options.html) text.innerHTML = String(options.message);
    else text.textContent = String(options.message);
    if (options.message !== '') content.append(text);

    if (options.action?.label) {
      const action = document.createElement('button');
      action.type = 'button';
      action.className = 'pl-notification-action';
      action.textContent = String(options.action.label);
      action.addEventListener('click', () => {
        const keep = options.action.onClick?.(this.handle) === false;
        if (!keep) this.close();
      });
      content.append(action);
    }
    el.append(content);

    if (options.close) {
      const close = document.createElement('button');
      close.type = 'button';
      close.className = 'pl-close pl-notification-close';
      close.setAttribute('aria-label', 'Zamknij powiadomienie');
      close.addEventListener('click', () => this.close());
      el.append(close);
    }

    if (options.timeout > 0) {
      const bar = (this.bar = document.createElement('span'));
      bar.className = 'pl-notification-progress';
      bar.setAttribute('aria-hidden', 'true');
      if (!options.progress) bar.hidden = true;
      el.append(bar);
    }

    item.append(el);

    // Pauza licznika po najechaniu i przy fokusie wewnątrz.
    el.addEventListener('pointerenter', (event) => event.pointerType !== 'touch' && this.pause('hover'));
    el.addEventListener('pointerleave', () => this.resume('hover'));
    el.addEventListener('focusin', () => this.pause('focus'));
    el.addEventListener('focusout', () => this.resume('focus'));
    el.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        this.close();
      }
    });
    this.bindSwipe();

    this.handle = {
      el,
      options,
      close: () => this.close(),
      update: (message) => {
        if (options.html) text.innerHTML = String(message);
        else text.textContent = String(message);
        if (!text.isConnected) content.append(text);
      },
    };
  }

  mount() {
    const { item, el, options } = this;
    const container = (this.container = getContainer(options.pos));
    // U góry najnowsze na górze, na dole — na dole (zawsze najbliżej krawędzi ekranu).
    if (options.pos.startsWith('top')) container.prepend(item);
    else container.append(item);
    active.add(this);

    if (!prefersReducedMotion()) {
      const cs = getComputedStyle(item);
      item.animate(
        [
          { height: '0px', paddingTop: '0px', paddingBottom: '0px' },
          { height: `${item.offsetHeight}px`, paddingTop: cs.paddingTop, paddingBottom: cs.paddingBottom },
        ],
        { duration: 280, easing: EASE },
      );
    }
    animationsDone(el).then(() => el.classList.remove('pl-enter'));

    if (this.bar) {
      this.timer = this.bar.animate([{ transform: 'scaleX(1)' }, { transform: 'scaleX(0)' }], {
        duration: options.timeout,
        easing: 'linear',
        fill: 'forwards',
      });
      this.timer.finished.then(() => this.close()).catch(() => {});
    }
  }

  pause(reason) {
    this.pauses.add(reason);
    if (this.timer?.playState === 'running') this.timer.pause();
  }

  resume(reason) {
    this.pauses.delete(reason);
    if (!this.pauses.size && !this.closed && this.timer?.playState === 'paused') this.timer.play();
  }

  /** Przeciągnięcie w bok zamyka powiadomienie. */
  bindSwipe() {
    const { el } = this;
    let startX = 0;
    let dx = 0;
    let dragging = false;
    let pointer = null;

    el.addEventListener('pointerdown', (event) => {
      if (event.button !== 0 || event.target.closest('button, a, input, [data-pl-no-swipe]') || this.closed) return;
      pointer = event.pointerId;
      startX = event.clientX;
      dx = 0;
      dragging = false;
    });

    el.addEventListener('pointermove', (event) => {
      if (event.pointerId !== pointer) return;
      dx = event.clientX - startX;
      if (!dragging) {
        if (Math.abs(dx) < 6) return;
        dragging = true;
        el.getAnimations().forEach((animation) => animation.finish());
        el.classList.remove('pl-enter');
        el.classList.add('pl-dragging');
        try {
          el.setPointerCapture(pointer);
        } catch {
          /* noop */
        }
        this.pause('drag');
      }
      el.style.transform = `translateX(${dx}px)`;
      el.style.opacity = String(Math.max(0.25, 1 - Math.abs(dx) / 260));
    });

    const end = (event) => {
      if (event.pointerId !== pointer) return;
      pointer = null;
      if (!dragging) return;
      dragging = false;
      el.classList.remove('pl-dragging');
      if (event.type === 'pointerup' && Math.abs(dx) > SWIPE_DISTANCE) {
        this.close(dx);
        return;
      }
      // Powrót na miejsce.
      const from = { transform: el.style.transform, opacity: el.style.opacity };
      el.style.transform = '';
      el.style.opacity = '';
      if (!prefersReducedMotion()) el.animate([from, { transform: 'translateX(0)', opacity: 1 }], { duration: 260, easing: EASE });
      this.resume('drag');
    };
    el.addEventListener('pointerup', end);
    el.addEventListener('pointercancel', end);
  }

  async close(swipe = 0) {
    if (this.closed) return;
    this.closed = true;
    active.delete(this);
    const { item, el, container } = this;
    this.timer?.cancel();
    const reduced = prefersReducedMotion();
    const hadFocus = el.contains(document.activeElement);

    if (swipe && !reduced) {
      const out = el.animate(
        [
          { transform: el.style.transform, opacity: el.style.opacity },
          { transform: `translateX(${Math.sign(swipe) * (el.offsetWidth + 40)}px)`, opacity: 0 },
        ],
        { duration: 180, easing: 'ease-in', fill: 'forwards' },
      );
      await out.finished.catch(() => {});
    } else {
      el.classList.remove('pl-enter');
      el.classList.add('pl-leave');
      await animationsDone(el);
    }

    if (!reduced && item.isConnected) {
      // Zwinięcie wysokości — pozostałe powiadomienia płynnie zajmują miejsce.
      const cs = getComputedStyle(item);
      const collapse = item.animate(
        [
          { height: `${item.offsetHeight}px`, paddingTop: cs.paddingTop, paddingBottom: cs.paddingBottom },
          { height: '0px', paddingTop: '0px', paddingBottom: '0px' },
        ],
        { duration: 220, easing: EASE, fill: 'forwards' },
      );
      await collapse.finished.catch(() => {});
    }

    if (hadFocus) document.activeElement?.blur?.();
    item.remove();
    releaseContainer(container);
    this.options.onClose?.(this.handle);
    el.dispatchEvent(new CustomEvent('pl:hidden', { detail: { notification: this.handle } }));
    document.dispatchEvent(new CustomEvent('pl:notificationclose', { detail: { notification: this.handle } }));
  }
}

/** Plossy.notification('Tekst') / Plossy.notification({ message, status, … }) → { el, close(), update() } */
function notification(message, extra) {
  if (typeof document === 'undefined') return { close() {} };
  const input = message !== null && typeof message === 'object' && !(message instanceof Node) ? message : { message, ...extra };
  const options = { ...DEFAULTS, ...input };
  if (!POSITIONS.includes(options.pos)) options.pos = DEFAULTS.pos;
  if (!STATUSES.includes(options.status)) options.status = '';
  options.timeout = Number(options.timeout) || 0;
  if (options.message == null) options.message = '';
  return new Toast(options).handle;
}

notification.closeAll = (group) => {
  [...active].forEach((toast) => {
    if (group == null || toast.options.group === group) toast.close();
  });
};

notification.defaults = DEFAULTS;

/** Wyzwalacz deklaratywny: <button data-pl-notification="message: Zapisano; status: success"> */
class Notification extends Component {
  static defaults = {
    message: '',
    title: '',
    status: '',
    pos: 'top-right',
    timeout: 4000,
    icon: null,
    close: true,
    group: '',
    cls: '',
    progress: true,
  };
  static primary = 'message';

  init() {
    this.on(this.el, 'click', (event) => {
      if (this.el.matches('a')) event.preventDefault();
      this.show();
    });
  }

  show() {
    if (!this.emit('beforeshow', {}, true)) return null;
    return notification({ ...this.options });
  }
}

register('notification', Notification);
api.notification = notification;

export { notification };
export default Notification;
