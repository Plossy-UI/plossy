---
title: Video
description: Odtwarza wideo, gdy pojawia się na ekranie, i zatrzymuje, gdy z niego znika. Ma też tryb podglądu po najechaniu kursorem i szanuje ustawienie ograniczonego ruchu.
badge: JS
---

W dokumentacji nie ma plików wideo, dlatego w żywych przykładach obraz jest generowany w locie z elementu `canvas` (zakładka JavaScript). W swoim projekcie po prostu podaj atrybut `src` lub znaczniki `<source>`.

## Odtwarzanie w widoku

Domyślny tryb `autoplay: inview` uruchamia wideo, gdy co najmniej jedna czwarta kadru jest widoczna, i pauzuje je po zniknięciu z ekranu albo po przejściu na inną kartę. Opcja `automute` (domyślnie włączona) wycisza dźwięk — przeglądarki nie pozwalają na samoczynne odtwarzanie z dźwiękiem.

```html example
<video class="demo-video" id="demo-video-inview" data-pl-video="autoplay: inview" muted loop playsinline></video>
<p class="pl-margin-small-top"><small style="color: var(--pl-text-muted)">Stan: <span id="demo-video-state">oczekuje</span></small></p>
```

```js example-js
// Źródło zastępcze: animacja rysowana na canvasie (w projekcie użyj atrybutu src).
function demoStream(hue) {
  const canvas = document.createElement('canvas');
  canvas.width = 640;
  canvas.height = 360;
  const ctx = canvas.getContext('2d');
  const draw = (time) => {
    const t = time / 1000;
    ctx.fillStyle = `hsl(${hue} 45% 14%)`;
    ctx.fillRect(0, 0, 640, 360);
    for (let i = 0; i < 6; i++) {
      const x = 320 + Math.cos(t * 0.9 + i) * 210;
      const y = 180 + Math.sin(t * 1.3 + i * 1.7) * 110;
      ctx.beginPath();
      ctx.arc(x, y, 34 + i * 6, 0, Math.PI * 2);
      ctx.fillStyle = `hsl(${hue + i * 22} 80% 62% / 0.75)`;
      ctx.fill();
    }
    requestAnimationFrame(draw);
  };
  requestAnimationFrame(draw);
  return canvas.captureStream(30);
}
window.demoStream = demoStream;

const video = document.querySelector('#demo-video-inview');
const state = document.querySelector('#demo-video-state');
video.srcObject = demoStream(265);
video.addEventListener('pl:play', () => (state.textContent = 'odtwarzanie (pl:play)'));
video.addEventListener('pl:pause', () => (state.textContent = 'pauza (pl:pause)'));
```

```css example-css
.demo-video {
  display: block;
  width: 100%;
  max-width: 34rem;
  aspect-ratio: 16 / 9;
  border-radius: var(--pl-radius-lg);
  background: var(--pl-ink);
}
```

W projekcie wygląda to tak:

```html
<video src="/media/prezentacja.mp4" data-pl-video muted loop playsinline></video>
```

## Podgląd po najechaniu

Tryb `autoplay: hover` odtwarza wideo tylko wtedy, gdy kursor (lub fokus klawiatury) znajduje się nad nim. Opcja `hover-target` przenosi strefę reakcji na inny element — np. całą kartę — a `rewind: true` cofa materiał do początku po zjechaniu kursorem.

```html example
<div class="pl-grid pl-child-width-1-2@s">
  <div>
    <a class="pl-card pl-card-hover demo-video-card" href="#">
      <video class="demo-video" data-demo-hue="150" data-pl-video="autoplay: hover; hover-target: !.pl-card" muted loop playsinline></video>
      <div class="pl-card-body">
        <h4 class="pl-card-title">Zwiastun kursu</h4>
        <p>Najedź na kartę, aby zobaczyć podgląd.</p>
      </div>
    </a>
  </div>
  <div>
    <a class="pl-card pl-card-hover demo-video-card" href="#">
      <video class="demo-video" data-demo-hue="20" data-pl-video="autoplay: hover; hover-target: !.pl-card" muted loop playsinline></video>
      <div class="pl-card-body">
        <h4 class="pl-card-title">Lekcja 1: podstawy</h4>
        <p>Podgląd zatrzymuje się po zjechaniu kursorem.</p>
      </div>
    </a>
  </div>
</div>
```

```js example-js
document.querySelectorAll('.demo-video-card video').forEach((video) => {
  video.srcObject = window.demoStream(Number(video.dataset.demoHue));
});
```

```css example-css
.demo-video-card {
  display: block;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
}
.demo-video-card .demo-video {
  max-width: none;
  border-radius: 0;
}
```

## Pozostałe tryby

`autoplay: true` uruchamia wideo od razu po inicjalizacji, a `autoplay: false` niczego nie odtwarza samoczynnie — komponent udostępnia wtedy tylko metody `play()` i `pause()`.

```html
<video src="/media/tlo.mp4" data-pl-video="autoplay: true" muted loop playsinline></video>
<video src="/media/wywiad.mp4" data-pl-video="autoplay: false; automute: false" controls></video>
```

## YouTube i Vimeo

Komponent steruje także osadzonymi odtwarzaczami, wysyłając im polecenia przez `postMessage`. Dla YouTube adres ramki musi zawierać parametr `enablejsapi=1`.

```html
<iframe src="https://www.youtube-nocookie.com/embed/IDENTYFIKATOR?enablejsapi=1&playsinline=1&rel=0"
        width="1280" height="720" allow="autoplay; encrypted-media" allowfullscreen
        title="Prezentacja produktu" data-pl-video="autoplay: inview"></iframe>

<iframe src="https://player.vimeo.com/video/IDENTYFIKATOR"
        width="1280" height="720" allow="autoplay; fullscreen" allowfullscreen
        title="Film o zespole" data-pl-video="autoplay: inview"></iframe>
```

## Ograniczony ruch

Jeśli użytkownik ma w systemie włączone ograniczenie ruchu, tryby `inview` i `true` niczego nie odtwarzają, a natywne wideo bez kontrolek dostaje atrybut `controls`, żeby dało się je uruchomić ręcznie. Tryb `hover` pozostaje aktywny, bo odtwarzanie jest tam świadomą akcją użytkownika.

## Sterowanie z JavaScript

```js
const video = Plossy.video('#prezentacja');

video.play();
video.pause();
```

## API

### Opcje

Sama wartość atrybutu (`data-pl-video="hover"`) trafia do opcji `autoplay`.

| Opcja | Typ | Domyślnie | Opis |
| --- | --- | --- | --- |
| `autoplay` | boolean \| string | `inview` | `inview` — w widoku; `hover` — po najechaniu; `true` — od razu; `false` — nigdy. |
| `automute` | boolean | `true` | Wycisza wideo przed odtworzeniem. |
| `hover-target` | string | — | Strefa reakcji w trybie `hover`; `!.selektor` — najbliższy przodek. |
| `rewind` | boolean | `false` | Po zatrzymaniu wraca do początku. |
| `threshold` | number | `0.25` | Część kadru (0–1), która musi być widoczna w trybie `inview`. |

### Metody

| Metoda | Opis |
| --- | --- |
| `play()` | Rozpoczyna odtwarzanie. |
| `pause()` | Wstrzymuje odtwarzanie. |

### Zdarzenia

| Zdarzenie | Opis |
| --- | --- |
| `pl:play` | Komponent uruchomił odtwarzanie. |
| `pl:pause` | Komponent wstrzymał odtwarzanie. |
