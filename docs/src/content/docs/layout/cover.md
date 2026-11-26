---
title: Cover
description: Zdjęcie, wideo lub iframe wypełniające cały pojemnik z zachowaniem proporcji — w czystym CSS.
---

## Podstawowe użycie

Nadaj pojemnikowi klasę `.pl-cover-container` i określ jego wysokość, a mediom — klasę `.pl-cover`. Obraz zostanie przeskalowany i przycięty tak, by zakryć cały obszar.

```html example
<div class="pl-cover-container pl-height-medium" style="border-radius: var(--pl-radius-lg)">
  <img class="pl-cover" src="/img/photo-1.svg" alt="Górski krajobraz o świcie">
</div>
```

## Treść nad zdjęciem

Elementy obok `.pl-cover` układają się nad nim. Połącz z klasami [Position](/docs/layout/position/), aby umieścić treść w wybranym miejscu.

```html example
<div class="pl-cover-container pl-height-medium" style="border-radius: var(--pl-radius-lg)">
  <img class="pl-cover" src="/img/photo-4.svg" alt="Wybrzeże o zachodzie słońca">
  <div class="pl-position-bottom-left pl-position-small">
    <div class="pl-card pl-card-small"><div class="pl-card-body">
      <strong>Wybrzeże Bałtyku</strong><br>
      <small>7 dni · od 1 890 zł</small>
    </div></div>
  </div>
</div>
```

## Punkt kadrowania

Domyślnie widoczny jest środek obrazu. Klasy `.pl-cover-top`, `-bottom`, `-left`, `-right` (lub zmienna `--pl-cover-position`) wybierają inny fragment.

```html example
<div class="pl-grid pl-grid-small pl-child-width-1-3">
  <div>
    <div class="pl-cover-container pl-height-small" style="border-radius: var(--pl-radius-md)">
      <img class="pl-cover pl-cover-top" src="/img/photo-5.svg" alt="Kadr od góry">
    </div>
    <p><small><code>.pl-cover-top</code></small></p>
  </div>
  <div>
    <div class="pl-cover-container pl-height-small" style="border-radius: var(--pl-radius-md)">
      <img class="pl-cover" src="/img/photo-5.svg" alt="Kadr centralny">
    </div>
    <p><small>domyślnie</small></p>
  </div>
  <div>
    <div class="pl-cover-container pl-height-small" style="border-radius: var(--pl-radius-md)">
      <img class="pl-cover pl-cover-bottom" src="/img/photo-5.svg" alt="Kadr od dołu">
    </div>
    <p><small><code>.pl-cover-bottom</code></small></p>
  </div>
</div>
```

## Proporcje zamiast wysokości

Wysokość pojemnika może wynikać z `aspect-ratio` — kadr pozostaje wtedy stały przy każdej szerokości.

```html example
<div class="pl-grid pl-grid-small pl-child-width-1-2 pl-child-width-1-4@s">
  <div><div class="pl-cover-container" style="aspect-ratio: 1; border-radius: var(--pl-radius-md)"><img class="pl-cover" src="/img/photo-6.svg" alt="Kadr kwadratowy"></div></div>
  <div><div class="pl-cover-container" style="aspect-ratio: 1; border-radius: var(--pl-radius-md)"><img class="pl-cover" src="/img/photo-7.svg" alt="Kadr kwadratowy"></div></div>
  <div><div class="pl-cover-container" style="aspect-ratio: 1; border-radius: var(--pl-radius-md)"><img class="pl-cover" src="/img/photo-8.svg" alt="Kadr kwadratowy"></div></div>
  <div><div class="pl-cover-container" style="aspect-ratio: 1; border-radius: var(--pl-radius-md)"><img class="pl-cover" src="/img/photo-2.svg" alt="Kadr kwadratowy"></div></div>
</div>
```

## Wideo i iframe

Element `<video class="pl-cover">` działa tak samo jak obraz. `<iframe>` nie obsługuje `object-fit`, dlatego jest skalowany jednostkami kontenera — pojemnik **musi** mieć wtedy określoną wysokość (`height` lub `aspect-ratio`). Proporcje osadzonego filmu ustawia `--pl-cover-ratio` (domyślnie 16/9).

```html
<div class="pl-cover-container pl-height-large">
  <video class="pl-cover" src="film.mp4" autoplay muted loop playsinline></video>
</div>

<div class="pl-cover-container pl-height-large">
  <iframe class="pl-cover" src="https://example.com/embed/film" style="--pl-cover-ratio: calc(4 / 3)" title="Film w tle"></iframe>
</div>
```

Media z klasą `.pl-cover` nie reagują na kliknięcia (`pointer-events: none`), więc nie blokują treści leżącej nad nimi.

## Sekcja hero

Cover w roli tła sekcji o wysokości okna.

```html example flush
<div class="pl-cover-container pl-flex pl-flex-middle pl-flex-center" style="min-height: 22rem">
  <img class="pl-cover" src="/img/photo-8.svg" alt="">
  <div class="pl-card" style="max-width: 26rem; text-align: center"><div class="pl-card-body">
    <h3>Odkryj Tatry jesienią</h3>
    <p class="pl-card-text">Puste szlaki, złote buki i schroniska bez kolejek.</p>
    <button class="pl-button pl-button-primary" type="button">Zaplanuj wyjazd</button>
  </div></div>
</div>
```

## API

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-cover-container` | Pojemnik: `position: relative` i przycinanie. |
| `.pl-cover` | Media wypełniające pojemnik (`img`, `video`, `iframe`). |
| `.pl-cover-top` / `-bottom` / `-left` / `-right` | Punkt kadrowania. |

### Zmienne CSS

| Zmienna | Domyślnie | Opis |
| --- | --- | --- |
| `--pl-cover-position` | `center` | Wartość `object-position`. |
| `--pl-cover-ratio` | `calc(16 / 9)` | Proporcje treści `<iframe>`. |
