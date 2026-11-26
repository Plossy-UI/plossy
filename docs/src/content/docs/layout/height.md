---
title: Height
description: Wysokości stałe, procentowe, maksymalne i liczone od wysokości okna.
---

## Stałe wysokości

`.pl-height-small`, `-medium` i `-large` nadają elementowi stałą wysokość.

```html example
<div class="pl-grid pl-grid-small pl-child-width-1-3 pl-grid-bottom">
  <div><div class="pl-card pl-card-small pl-height-small"><div class="pl-card-body">small · 152px</div></div></div>
  <div><div class="pl-card pl-card-small pl-height-medium"><div class="pl-card-body">medium · 300px</div></div></div>
  <div><div class="pl-card pl-card-small pl-height-large"><div class="pl-card-body">large · 448px</div></div></div>
</div>
```

## Pełna wysokość rodzica

`.pl-height-1-1` ustawia `height: 100%` — rodzic musi mieć określoną wysokość.

```html example
<div class="pl-tile pl-tile-muted pl-tile-xsmall pl-tile-rounded pl-height-medium">
  <div class="pl-card pl-card-small pl-height-1-1"><div class="pl-card-body">Wypełniam cały kafel w pionie</div></div>
</div>
```

## Wysokość okna

`.pl-height-viewport` ustawia minimalną wysokość na 100% okna przeglądarki. Używa jednostki `svh`, więc na telefonach treść nie chowa się pod paskiem adresu. Dostępne są też `.pl-height-viewport-half` (50%) i `.pl-height-viewport-2-3` (66%).

```html
<section class="pl-section pl-section-secondary pl-height-viewport pl-flex pl-flex-middle">
  <div class="pl-container">
    <h1>Sekcja na cały ekran</h1>
  </div>
</section>
```

```html example flush
<div class="pl-cover-container pl-height-viewport-half pl-flex pl-flex-middle pl-flex-center">
  <img class="pl-cover" src="/img/photo-7.svg" alt="">
  <div class="pl-card pl-card-small"><div class="pl-card-body">Co najmniej połowa wysokości okna</div></div>
</div>
```

## Maksymalna wysokość

`.pl-height-max-small`, `-max-medium`, `-max-large` ograniczają wysokość — przydatne dla obrazów i przewijanych paneli.

```html example
<div class="pl-grid pl-grid-small pl-child-width-1-3 pl-grid-middle">
  <div><img class="pl-height-max-small" src="/img/photo-1.svg" alt="Zdjęcie o maksymalnej wysokości small" style="border-radius: var(--pl-radius-md)"></div>
  <div><img class="pl-height-max-medium" src="/img/photo-2.svg" alt="Zdjęcie o maksymalnej wysokości medium" style="border-radius: var(--pl-radius-md)"></div>
  <div>
    <div class="pl-card pl-card-small pl-height-max-small" style="overflow: auto" tabindex="0" role="region" aria-label="Przewijana karta"><div class="pl-card-body">
      <p>Regulamin promocji „Jesienne porządki" obowiązuje od 1 do 30 listopada.</p>
      <p>Rabat nalicza się automatycznie w koszyku po dodaniu co najmniej dwóch produktów z kategorii objętych akcją.</p>
      <p>Promocje nie łączą się z innymi kodami rabatowymi.</p>
    </div></div>
  </div>
</div>
```

## Minimalna wysokość

`.pl-height-min-small`, `-min-medium`, `-min-large` gwarantują minimalną wysokość, ale pozwalają treści ją przekroczyć.

```html example
<div class="pl-tile pl-tile-small pl-tile-primary pl-tile-rounded pl-height-min-small pl-flex pl-flex-middle">
  <p>Blok ma co najmniej 152px, a przy dłuższej treści po prostu urośnie.</p>
</div>
```

## API

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-height-1-1` | `height: 100%`. |
| `.pl-height-auto` | `height: auto`. |
| `.pl-height-viewport` | `min-height: 100svh`. |
| `.pl-height-viewport-half` | `min-height: 50svh`. |
| `.pl-height-viewport-2-3` | `min-height: 66svh`. |
| `.pl-height-small` / `-medium` / `-large` | Stała wysokość: 9.5rem / 18.75rem / 28rem. |
| `.pl-height-max-small` / `-max-medium` / `-max-large` | Maksymalna wysokość. |
| `.pl-height-min-small` / `-min-medium` / `-min-large` | Minimalna wysokość. |
