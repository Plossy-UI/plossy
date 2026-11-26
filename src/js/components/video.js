import { Component, register } from '../core.js';

const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Video
 * <video src="…" data-pl-video="autoplay: inview" muted loop playsinline></video>
 * <video src="…" data-pl-video="autoplay: hover; hover-target: !.pl-card"></video>
 * Działa też dla osadzonych odtwarzaczy YouTube (z enablejsapi=1) i Vimeo.
 */
class Video extends Component {
  static defaults = {
    autoplay: 'inview', // true | false | inview | hover
    automute: true, // wycisz przed automatycznym odtwarzaniem (wymóg przeglądarek)
    hoverTarget: false, // element reagujący na kursor ('!.x' → najbliższy przodek); domyślnie samo wideo
    rewind: false, // po zatrzymaniu wróć do początku
    threshold: 0.25, // część wideo, która musi być widoczna (tryb inview)
  };

  static primary = 'autoplay';

  init() {
    const { el, options } = this;
    this.native = el.matches('video, audio');
    this.provider = this.native ? null : this.detectProvider();
    this.ready = this.native;
    this.wanted = false;
    if (!this.native && !this.provider) return;

    if (this.provider) {
      // Odtwarzacz w ramce przyjmuje polecenia dopiero po załadowaniu.
      this.on(el, 'load', () => {
        this.ready = true;
        if (this.wanted) this.play();
      });
      // Ramka mogła załadować się przed inicjalizacją.
      setTimeout(() => {
        if (this.ready) return;
        this.ready = true;
        if (this.wanted) this.play();
      }, 1500);
    }

    const mode = options.autoplay;

    if (mode === 'hover') {
      const selector = String(options.hoverTarget || '');
      const zone = !options.hoverTarget ? el : selector.startsWith('!') ? el.closest(selector.slice(1).trim()) || el : document.querySelector(selector) || el;
      if (this.native) el.preload = el.getAttribute('preload') || 'metadata';
      this.on(zone, 'pointerenter', () => this.play());
      this.on(zone, 'pointerleave', () => this.pause());
      this.on(zone, 'focusin', () => this.play());
      this.on(zone, 'focusout', (event) => {
        if (!zone.contains(event.relatedTarget)) this.pause();
      });
      return;
    }

    if (mode === false || mode === 'false') return;

    // Ograniczony ruch: nie uruchamiamy niczego samoczynnie — zostają natywne kontrolki.
    if (reducedMotion()) {
      if (this.native) {
        el.removeAttribute('autoplay');
        el.pause();
        if (!el.controls && !el.closest('a, button')) el.controls = true;
      }
      return;
    }

    if (mode === 'inview' && typeof IntersectionObserver === 'function') {
      const observer = new IntersectionObserver(
        ([entry]) => (entry.isIntersecting ? this.play() : this.pause()),
        { threshold: Number(options.threshold) || 0 },
      );
      observer.observe(el);
      this.onDestroy(() => observer.disconnect());
      // Karta w tle nie powinna odtwarzać.
      this.on(document, 'visibilitychange', () => {
        if (document.hidden) this.pause(true);
        else if (this.wanted) this.play();
      });
    } else {
      this.play();
    }
  }

  detectProvider() {
    const src = this.el.getAttribute('src') || '';
    if (!this.el.matches('iframe')) return null;
    if (/youtube(-nocookie)?\.com|youtu\.be/.test(src)) return 'youtube';
    if (/vimeo\.com/.test(src)) return 'vimeo';
    return null;
  }

  post(command) {
    try {
      this.el.contentWindow?.postMessage(JSON.stringify(command), '*');
    } catch {
      /* ramka niedostępna */
    }
  }

  mute() {
    const { el } = this;
    if (this.native) el.muted = true;
    else if (this.provider === 'youtube') this.post({ event: 'command', func: 'mute', args: [] });
    else this.post({ method: 'setVolume', value: 0 });
  }

  play() {
    const { el, options } = this;
    this.wanted = true;
    if (!this.ready) return;
    if (options.automute) this.mute();
    if (this.native) {
      el.playsInline = true;
      const result = el.play();
      // Przeglądarka może odmówić (np. brak wyciszenia) — to nie jest błąd.
      result?.catch?.(() => {});
    } else if (this.provider === 'youtube') this.post({ event: 'command', func: 'playVideo', args: [] });
    else this.post({ method: 'play' });
    this.emit('play');
  }

  /** `keep` — zachowaj zamiar odtwarzania (wznowienie po powrocie na kartę). */
  pause(keep = false) {
    const { el, options } = this;
    if (!keep) this.wanted = false;
    if (!this.ready) return;
    if (this.native) {
      el.pause();
      if (options.rewind) el.currentTime = 0;
    } else if (this.provider === 'youtube') {
      this.post({ event: 'command', func: 'pauseVideo', args: [] });
      if (options.rewind) this.post({ event: 'command', func: 'seekTo', args: [0, true] });
    } else {
      this.post({ method: 'pause' });
      if (options.rewind) this.post({ method: 'setCurrentTime', value: 0 });
    }
    this.emit('pause');
  }
}

register('video', Video);
export default Video;
