---
title: Position
description: Pozycjonowanie elementów względem rodzica — krawędzie, rogi, środek, marginesy i warstwy.
---

## Rogi i krawędzie

Dodaj rodzicowi `.pl-position-relative`, a elementowi jedną z klas `.pl-position-*`. Element zostanie ustawiony absolutnie we wskazanym miejscu.

```html example
<div class="pl-position-relative pl-height-medium pl-tile pl-tile-muted pl-tile-rounded">
  <span class="pl-badge pl-position-top-left">top-left</span>
  <span class="pl-badge pl-position-top-center">top-center</span>
  <span class="pl-badge pl-position-top-right">top-right</span>
  <span class="pl-badge pl-position-center-left">center-left</span>
  <span class="pl-badge pl-position-center">center</span>
  <span class="pl-badge pl-position-center-right">center-right</span>
  <span class="pl-badge pl-position-bottom-left">bottom-left</span>
  <span class="pl-badge pl-position-bottom-center">bottom-center</span>
  <span class="pl-badge pl-position-bottom-right">bottom-right</span>
</div>
```

## Margines od krawędzi

`.pl-position-small`, `-medium` i `-large` odsuwają element od krawędzi rodzica.

```html example
<div class="pl-grid pl-grid-small pl-child-width-1-3@s">
  <div>
    <div class="pl-cover-container pl-height-small" style="border-radius: var(--pl-radius-md)">
      <img class="pl-cover" src="/img/photo-1.svg" alt="">
      <span class="pl-badge pl-position-top-right pl-position-small">small</span>
    </div>
  </div>
  <div>
    <div class="pl-cover-container pl-height-small" style="border-radius: var(--pl-radius-md)">
      <img class="pl-cover" src="/img/photo-2.svg" alt="">
      <span class="pl-badge pl-position-top-right pl-position-medium">medium</span>
    </div>
  </div>
  <div>
    <div class="pl-cover-container pl-height-small" style="border-radius: var(--pl-radius-md)">
      <img class="pl-cover" src="/img/photo-3.svg" alt="">
      <span class="pl-badge pl-position-top-right pl-position-large">large</span>
    </div>
  </div>
</div>
```

## Pasy

`.pl-position-top`, `-bottom`, `-left`, `-right` rozciągają element wzdłuż całej krawędzi; `.pl-position-cover` wypełnia cały obszar rodzica.

```html example
<div class="pl-grid pl-grid-small pl-child-width-1-2@s">
  <div>
    <div class="pl-cover-container pl-height-medium" style="border-radius: var(--pl-radius-lg)">
      <img class="pl-cover" src="/img/photo-5.svg" alt="Jezioro w górach">
      <div class="pl-position-bottom pl-tile pl-tile-xsmall pl-tile-secondary">
        <strong>Morskie Oko</strong> · 1395 m n.p.m.
      </div>
    </div>
  </div>
  <div>
    <div class="pl-cover-container pl-height-medium" style="border-radius: var(--pl-radius-lg)">
      <img class="pl-cover" src="/img/photo-6.svg" alt="Las we mgle">
      <div class="pl-position-cover pl-position-small pl-flex pl-flex-center pl-flex-middle" style="border: 1px dashed var(--pl-border-strong); border-radius: var(--pl-radius-md)">
        <span class="pl-badge">cover + small</span>
      </div>
    </div>
  </div>
</div>
```

## Rodzaje pozycjonowania

`.pl-position-relative`, `-absolute`, `-fixed`, `-sticky` i `-static` ustawiają samą właściwość `position`.

`.pl-position-sticky` przykleja element do górnej krawędzi przewijanego obszaru; odległość ustawia zmienna `--pl-position-offset`.

```html example scroll
<div class="pl-position-sticky pl-card pl-card-small" style="--pl-position-offset: .5rem">
  <div class="pl-card-body"><strong>Przyklejony nagłówek</strong> — przewiń podgląd</div>
</div>
<p style="margin-top: 1rem">Paczka została nadana w poniedziałek o 9:14 w sortowni w Strykowie.</p>
<p>We wtorek o 6:02 dotarła do oddziału w Gdańsku i została przekazana kurierowi.</p>
<p>Kurier podjął pierwszą próbę doręczenia o 11:40. Nikogo nie zastał, dlatego zostawił awizo.</p>
<p>W środę paczka trafiła do punktu odbioru przy ul. Długiej 12, gdzie czeka przez siedem dni.</p>
<p>Po tym terminie przesyłka wróci do nadawcy, a koszt zwrotu zostanie doliczony do zamówienia.</p>
<p>Odbiór jest możliwy od poniedziałku do soboty w godzinach 8:00–20:00 po okazaniu kodu z wiadomości SMS.</p>
<p>W razie pytań skontaktuj się z infolinią, podając numer przesyłki widoczny na górze strony.</p>
<p>Dziękujemy za zakupy i zapraszamy ponownie.</p>
```

## Warstwy

`.pl-position-z-index` podnosi element nad rodzeństwo (`z-index: 1`); dostępne są też `-z-index-zero`, `-z-index-negative` i `-z-index-high`.

```html example
<div class="pl-position-relative pl-height-small">
  <div class="pl-card pl-card-small pl-position-top-left pl-position-z-index" style="width: 12rem"><div class="pl-card-body">Na wierzchu (z-index: 1)</div></div>
  <div class="pl-card pl-card-small pl-card-muted pl-position-top-left" style="width: 12rem; margin: 2rem 0 0 5rem"><div class="pl-card-body">Pod spodem, choć dalej w kodzie</div></div>
</div>
```

## API

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-position-relative` / `-absolute` / `-fixed` / `-static` | Wartość `position`. |
| `.pl-position-sticky` | `position: sticky` z odległością `--pl-position-offset`. |
| `.pl-position-top` / `-bottom` / `-left` / `-right` | Pas wzdłuż krawędzi. |
| `.pl-position-top-left` / `-top-center` / `-top-right` | Górne punkty. |
| `.pl-position-center-left` / `-center` / `-center-right` | Środkowe punkty. |
| `.pl-position-bottom-left` / `-bottom-center` / `-bottom-right` | Dolne punkty. |
| `.pl-position-cover` | Cały obszar rodzica. |
| `.pl-position-small` / `-medium` / `-large` | Margines od krawędzi: 0.75rem / 1.5rem / 2rem (3rem od `m`). |
| `.pl-position-z-index` | `z-index: 1`. |
| `.pl-position-z-index-zero` / `-negative` / `-high` | `z-index: 0` / `-1` / warstwa elementów przyklejonych. |
