---
title: Lightbox
description: Pełnoekranowa galeria obrazów, wideo i osadzonych treści — z powiększeniem z miniatury, gestami, klawiaturą, licznikiem i paskiem miniatur.
badge: JS
---

## Podstawowe użycie

Dodaj atrybut `data-pl-lightbox` do kontenera. Każdy odnośnik `a[href]` prowadzący do obrazu staje się pozycją galerii. Po kliknięciu obraz „wyrasta" z miniatury, a po zamknięciu do niej wraca.

Między pozycjami przejdziesz strzałkami na ekranie, klawiszami <kbd>←</kbd> <kbd>→</kbd> (także <kbd>Home</kbd> / <kbd>End</kbd>) albo przesunięciem palcem. Galerię zamyka <kbd>Esc</kbd>, przycisk, kliknięcie poza obrazem lub przeciągnięcie w pionie.

```html example
<div class="pl-grid pl-grid-small pl-child-width-1-2 pl-child-width-1-4@m" data-pl-lightbox>
  <div><a href="/img/photo-1.svg"><img src="/img/photo-1.svg" alt="Poranna mgła nad jeziorem" style="aspect-ratio: 4 / 3; width: 100%; object-fit: cover; border-radius: var(--pl-radius-md)"></a></div>
  <div><a href="/img/photo-2.svg"><img src="/img/photo-2.svg" alt="Ścieżka przez sosnowy las" style="aspect-ratio: 4 / 3; width: 100%; object-fit: cover; border-radius: var(--pl-radius-md)"></a></div>
  <div><a href="/img/photo-3.svg"><img src="/img/photo-3.svg" alt="Zachód słońca nad doliną" style="aspect-ratio: 4 / 3; width: 100%; object-fit: cover; border-radius: var(--pl-radius-md)"></a></div>
  <div><a href="/img/photo-4.svg"><img src="/img/photo-4.svg" alt="Skaliste wybrzeże" style="aspect-ratio: 4 / 3; width: 100%; object-fit: cover; border-radius: var(--pl-radius-md)"></a></div>
</div>
```

## Podpisy

Podpis pochodzi z atrybutu `data-caption` odnośnika, a gdy go brak — z atrybutu `alt` miniatury. Pusty `data-caption=""` wyłącza podpis dla danej pozycji.

```html example
<div class="pl-grid pl-grid-small pl-child-width-1-3" data-pl-lightbox>
  <div><a href="/img/photo-5.svg" data-caption="Tatry Zachodnie, wrzesień 2026 — fot. Marta Wilk"><img src="/img/photo-5.svg" alt="Górski szlak" style="aspect-ratio: 3 / 2; width: 100%; object-fit: cover; border-radius: var(--pl-radius-md)"></a></div>
  <div><a href="/img/photo-6.svg" data-caption="Dolina Chochołowska o świcie"><img src="/img/photo-6.svg" alt="Dolina" style="aspect-ratio: 3 / 2; width: 100%; object-fit: cover; border-radius: var(--pl-radius-md)"></a></div>
  <div><a href="/img/photo-7.svg"><img src="/img/photo-7.svg" alt="Ten podpis pochodzi z atrybutu alt miniatury" style="aspect-ratio: 3 / 2; width: 100%; object-fit: cover; border-radius: var(--pl-radius-md)"></a></div>
</div>
```

## Pasek miniatur

Opcja `thumbs: true` dodaje na dole pasek miniatur. Aktywną pozycję wyróżnia limonkowa obrączka.

```html example
<div class="pl-grid pl-grid-small pl-child-width-1-4 pl-child-width-1-8@m" data-pl-lightbox="thumbs: true">
  <div><a href="/img/photo-1.svg" data-caption="Poranna mgła nad jeziorem"><img src="/img/photo-1.svg" alt="Poranna mgła nad jeziorem" style="aspect-ratio: 1; width: 100%; object-fit: cover; border-radius: var(--pl-radius-sm)"></a></div>
  <div><a href="/img/photo-2.svg" data-caption="Ścieżka przez sosnowy las"><img src="/img/photo-2.svg" alt="Ścieżka przez sosnowy las" style="aspect-ratio: 1; width: 100%; object-fit: cover; border-radius: var(--pl-radius-sm)"></a></div>
  <div><a href="/img/photo-3.svg" data-caption="Zachód słońca nad doliną"><img src="/img/photo-3.svg" alt="Zachód słońca nad doliną" style="aspect-ratio: 1; width: 100%; object-fit: cover; border-radius: var(--pl-radius-sm)"></a></div>
  <div><a href="/img/photo-4.svg" data-caption="Skaliste wybrzeże"><img src="/img/photo-4.svg" alt="Skaliste wybrzeże" style="aspect-ratio: 1; width: 100%; object-fit: cover; border-radius: var(--pl-radius-sm)"></a></div>
  <div><a href="/img/photo-5.svg" data-caption="Górski szlak"><img src="/img/photo-5.svg" alt="Górski szlak" style="aspect-ratio: 1; width: 100%; object-fit: cover; border-radius: var(--pl-radius-sm)"></a></div>
  <div><a href="/img/photo-6.svg" data-caption="Dolina o świcie"><img src="/img/photo-6.svg" alt="Dolina o świcie" style="aspect-ratio: 1; width: 100%; object-fit: cover; border-radius: var(--pl-radius-sm)"></a></div>
  <div><a href="/img/photo-7.svg" data-caption="Łąka w pełni lata"><img src="/img/photo-7.svg" alt="Łąka w pełni lata" style="aspect-ratio: 1; width: 100%; object-fit: cover; border-radius: var(--pl-radius-sm)"></a></div>
  <div><a href="/img/photo-8.svg" data-caption="Wieczór nad zatoką"><img src="/img/photo-8.svg" alt="Wieczór nad zatoką" style="aspect-ratio: 1; width: 100%; object-fit: cover; border-radius: var(--pl-radius-sm)"></a></div>
</div>
```

## Animacja przejścia

Domyślnie pozycje przesuwają się w bok (`animation: slide`). Opcja `animation: fade` zamienia to na miękkie przenikanie.

```html example
<div class="pl-grid pl-grid-small pl-child-width-1-3" data-pl-lightbox="animation: fade">
  <div><a href="/img/photo-8.svg"><img src="/img/photo-8.svg" alt="Wieczór nad zatoką" style="aspect-ratio: 3 / 2; width: 100%; object-fit: cover; border-radius: var(--pl-radius-md)"></a></div>
  <div><a href="/img/photo-4.svg"><img src="/img/photo-4.svg" alt="Skaliste wybrzeże" style="aspect-ratio: 3 / 2; width: 100%; object-fit: cover; border-radius: var(--pl-radius-md)"></a></div>
  <div><a href="/img/photo-1.svg"><img src="/img/photo-1.svg" alt="Poranna mgła nad jeziorem" style="aspect-ratio: 3 / 2; width: 100%; object-fit: cover; border-radius: var(--pl-radius-md)"></a></div>
</div>
```

## Bez zapętlenia i licznika

Z opcją `loop: false` galeria kończy się na ostatniej pozycji — strzałki na krańcach są nieaktywne. `counter: false` ukrywa licznik.

```html example
<div class="pl-grid pl-grid-small pl-child-width-1-3" data-pl-lightbox="loop: false; counter: false">
  <div><a href="/img/photo-2.svg"><img src="/img/photo-2.svg" alt="Pierwsze zdjęcie — nie da się cofnąć" style="aspect-ratio: 3 / 2; width: 100%; object-fit: cover; border-radius: var(--pl-radius-md)"></a></div>
  <div><a href="/img/photo-6.svg"><img src="/img/photo-6.svg" alt="Środkowe zdjęcie" style="aspect-ratio: 3 / 2; width: 100%; object-fit: cover; border-radius: var(--pl-radius-md)"></a></div>
  <div><a href="/img/photo-3.svg"><img src="/img/photo-3.svg" alt="Ostatnie zdjęcie — dalej już nic nie ma" style="aspect-ratio: 3 / 2; width: 100%; object-fit: cover; border-radius: var(--pl-radius-md)"></a></div>
</div>
```

## Odnośniki tekstowe i pojedynczy obraz

Atrybut `data-pl-lightbox` może stać bezpośrednio na odnośniku — powstaje wtedy galeria z jedną pozycją, bez strzałek i licznika. Odnośniki nie muszą też zawierać miniatur: bez nich lightbox otwiera się zwykłym zanikaniem ze skalą.

```html example center
<a class="pl-button" href="/img/photo-5.svg" data-pl-lightbox data-caption="Plan sytuacyjny osiedla">Zobacz plan sytuacyjny</a>

<span data-pl-lightbox>
  <a class="pl-button pl-button-primary" href="/img/photo-1.svg" data-caption="Wizualizacja — widok od ulicy">Wizualizacje (3)</a>
  <a href="/img/photo-2.svg" data-caption="Wizualizacja — dziedziniec" hidden></a>
  <a href="/img/photo-3.svg" data-caption="Wizualizacja — taras na dachu" hidden></a>
</span>
```

## Wideo i iframe

Typ pozycji rozpoznawany jest po adresie: pliki `.mp4`, `.webm` i podobne otwierają się w odtwarzaczu `<video controls>`, a adresy YouTube i Vimeo zamieniane są na osadzony odtwarzacz. Typ można też wymusić atrybutem `data-type="image | video | iframe"` — np. dla obrazów bez rozszerzenia w adresie lub dowolnej strony w `iframe`. Plakat wideo ustawisz przez `data-poster`.

```html
<div data-pl-lightbox>
  <a href="/media/prezentacja.mp4" data-poster="/img/photo-4.svg" data-caption="Prezentacja produktu">Film MP4</a>
  <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">YouTube</a>
  <a href="https://vimeo.com/76979871">Vimeo</a>
  <a href="https://example.com/mapa" data-type="iframe">Dowolna strona</a>
  <a href="/api/obraz/42" data-type="image">Obraz bez rozszerzenia</a>
</div>
```

## Użycie programowe

`Plossy.lightboxPanel()` otwiera galerię z listy pozycji, bez żadnego kodu HTML. Z kolei `Plossy.lightbox(element).show(index)` otwiera istniejącą galerię na wskazanej pozycji.

```html example center
<button class="pl-button pl-button-primary" id="demo-lightbox-panel" type="button">Otwórz galerię z kodu</button>
<button class="pl-button" id="demo-lightbox-third" type="button">Pokaż trzecie zdjęcie</button>
<small id="demo-lightbox-log" style="flex-basis: 100%; text-align: center; color: var(--pl-text-muted)">—</small>

<div id="demo-lightbox-gallery" data-pl-lightbox hidden>
  <a href="/img/photo-6.svg" data-caption="Dolina o świcie"></a>
  <a href="/img/photo-7.svg" data-caption="Łąka w pełni lata"></a>
  <a href="/img/photo-8.svg" data-caption="Wieczór nad zatoką"></a>
</div>
```

```js example-js
document.querySelector('#demo-lightbox-panel').addEventListener('click', () => {
  Plossy.lightboxPanel({
    items: [
      { source: '/img/photo-3.svg', caption: 'Zachód słońca nad doliną' },
      { source: '/img/photo-5.svg', caption: 'Górski szlak' },
      { source: '/img/photo-1.svg', caption: 'Poranna mgła nad jeziorem', type: 'image' },
    ],
    index: 1,
    thumbs: true,
  });
});

const gallery = Plossy.lightbox('#demo-lightbox-gallery');
const log = document.querySelector('#demo-lightbox-log');

document.querySelector('#demo-lightbox-third').addEventListener('click', () => gallery.show(2));

gallery.el.addEventListener('pl:itemshow', (event) => {
  log.textContent = `Pozycja ${event.detail.index + 1}: ${event.detail.item.caption}`;
});
gallery.el.addEventListener('pl:hidden', () => (log.textContent = 'Galeria zamknięta.'));
```

## API

### Opcje

Opcje przekazujesz w atrybucie: `data-pl-lightbox="animation: fade; thumbs: true"`. Te same klucze przyjmuje `Plossy.lightboxPanel()`.

| Opcja | Typ | Domyślnie | Opis |
| --- | --- | --- | --- |
| `animation` | string | `slide` | Przejście między pozycjami: `slide` lub `fade`. |
| `loop` | boolean | `true` | Po ostatniej pozycji wraca do pierwszej. |
| `thumbs` | boolean | `false` | Pasek miniatur na dole. |
| `counter` | boolean | `true` | Licznik pozycji „3 / 8". |

### Atrybuty odnośnika

| Atrybut | Opis |
| --- | --- |
| `href` | Adres obrazu, pliku wideo lub strony do osadzenia. |
| `data-caption` | Podpis (domyślnie `alt` miniatury). |
| `data-type` | Wymuszony typ: `image`, `video` lub `iframe`. |
| `data-thumb` | Adres miniatury na pasku (domyślnie obraz wewnątrz odnośnika). |
| `data-poster` | Plakat dla wideo. |

### Pozycje `lightboxPanel`

| Pole | Opis |
| --- | --- |
| `source` | Adres zasobu (wymagane). |
| `type` | `image`, `video` lub `iframe` — domyślnie rozpoznawany po adresie. |
| `caption` | Podpis. |
| `thumb` | Adres miniatury. |
| `alt` | Tekst alternatywny obrazu. |
| `poster` | Plakat dla wideo. |

### Metody

| Metoda | Opis |
| --- | --- |
| `show(index)` | Otwiera galerię na pozycji `index` (domyślnie 0). |
| `hide()` | Zamyka galerię. |
| `next()` / `prev()` | Następna / poprzednia pozycja. |
| `Plossy.lightboxPanel({ items, index, … })` | Otwiera galerię z listy pozycji; zwraca panel z metodami `show`, `hide`, `go(index)`, `next`, `prev`. |

### Zdarzenia

Zdarzenia wysyłane są na elemencie z `data-pl-lightbox` (dla `lightboxPanel` — na oknie galerii, skąd bąbelkują do `document`). `event.detail` zawiera `index`, `item` i `panel`.

| Zdarzenie | Opis |
| --- | --- |
| `pl:show` | Galeria otwarta, startuje animacja. |
| `pl:shown` | Po zakończeniu animacji otwierania. |
| `pl:itemshow` | Wyświetlono pozycję (także pierwszą). |
| `pl:hide` | Rozpoczęcie zamykania. |
| `pl:hidden` | Galeria zamknięta i usunięta z dokumentu. |

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-lightbox` | Okno galerii (`<dialog>` tworzony przez skrypt, zawsze w ciemnym motywie). |
| `.pl-lightbox-toolbar` | Górny pasek z licznikiem i przyciskiem zamykania. |
| `.pl-lightbox-counter` | Licznik pozycji. |
| `.pl-lightbox-stage` | Scena z bieżącą pozycją. |
| `.pl-lightbox-item` | Pojedyncza pozycja; `.pl-loading` w trakcie wczytywania. |
| `.pl-lightbox-media` | Obraz, wideo lub iframe. |
| `.pl-lightbox-nav` | Strzałki (`.pl-lightbox-previous`, `.pl-lightbox-next`; mają też klasy `.pl-slidenav-previous` / `.pl-slidenav-next`). |
| `.pl-lightbox-caption` | Podpis. |
| `.pl-lightbox-thumbs` | Pasek miniatur; pozycje `.pl-lightbox-thumb`, aktywna `.pl-active`. |
