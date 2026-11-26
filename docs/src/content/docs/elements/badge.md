---
title: Badge
description: Mały licznik lub kropka powiadomienia. Może stać w tekście, w przycisku albo przyczepić się do rogu ikony czy awatara.
---

## Podstawowe użycie

Klasa `.pl-badge` tworzy pigułkę z liczbą. Domyślnie ma kolor akcentu; jednocyfrowa wartość daje idealne koło.

```html example center
<span class="pl-badge">1</span>
<span class="pl-badge">24</span>
<span class="pl-badge">99+</span>
<span class="pl-badge">Nowe</span>
```

## Tony

Dostępne są wszystkie tony biblioteki oraz limonkowy `.pl-badge-spark`.

```html example center
<span class="pl-badge pl-badge-primary">8</span>
<span class="pl-badge pl-badge-secondary">8</span>
<span class="pl-badge pl-badge-success">8</span>
<span class="pl-badge pl-badge-warning">8</span>
<span class="pl-badge pl-badge-danger">8</span>
<span class="pl-badge pl-badge-info">8</span>
<span class="pl-badge pl-badge-spark">8</span>
```

## Style

`.pl-badge-soft` daje delikatne, zabarwione tło, a `.pl-badge-outline` — sam kontur. Kształt zmienisz przez `.pl-badge-rounded` (domyślna jest pigułka, `.pl-badge-pill`).

```html example center
<span class="pl-badge pl-badge-soft">12</span>
<span class="pl-badge pl-badge-soft pl-badge-success">12</span>
<span class="pl-badge pl-badge-soft pl-badge-warning">12</span>
<span class="pl-badge pl-badge-soft pl-badge-danger">12</span>
<span class="pl-badge pl-badge-soft pl-badge-info">12</span>
<span class="pl-badge pl-badge-soft pl-badge-secondary">12</span>
```

```html example center
<span class="pl-badge pl-badge-outline">12</span>
<span class="pl-badge pl-badge-outline pl-badge-success">12</span>
<span class="pl-badge pl-badge-outline pl-badge-danger">12</span>
<span class="pl-badge pl-badge-outline pl-badge-secondary">12</span>
<span class="pl-badge pl-badge-rounded">12</span>
<span class="pl-badge pl-badge-rounded pl-badge-soft pl-badge-info">v2.4</span>
```

## Rozmiary

```html example center
<span class="pl-badge pl-badge-small">3</span>
<span class="pl-badge">3</span>
<span class="pl-badge pl-badge-large">3</span>
<span class="pl-badge pl-badge-large pl-badge-soft pl-badge-success"><span data-pl-icon="trending-up"></span> 12%</span>
```

## Kropka

`.pl-badge-dot` to sama kropka bez treści — sygnał „jest coś nowego". Klasa `.pl-badge-pulse` dodaje rozchodzącą się falę.

```html example center
<span class="pl-badge pl-badge-dot"></span>
<span class="pl-badge pl-badge-dot pl-badge-success"></span>
<span class="pl-badge pl-badge-dot pl-badge-danger"></span>
<span class="pl-badge pl-badge-dot pl-badge-spark"></span>
<span class="pl-badge pl-badge-dot pl-badge-large pl-badge-warning"></span>
<span class="pl-badge pl-badge-dot pl-badge-pulse pl-badge-danger"></span>
<span class="pl-badge pl-badge-dot pl-badge-pulse pl-badge-spark"></span>
<span class="pl-badge pl-badge-pulse pl-badge-danger">3</span>
```

Kropka dobrze sprawdza się jako znacznik statusu w tekście.

```html example column
<span><span class="pl-badge pl-badge-dot pl-badge-pulse pl-badge-success"></span>&nbsp; Wszystkie systemy działają</span>
<span><span class="pl-badge pl-badge-dot pl-badge-warning"></span>&nbsp; Opóźnienia w wysyłce e-maili</span>
<span><span class="pl-badge pl-badge-dot pl-badge-danger"></span>&nbsp; Awaria interfejsu API</span>
```

## Na elemencie

Owiń element w `.pl-badge-anchor`, a znaczek przyczepi się do jego prawego górnego rogu. Położenie zmienisz klasami `.pl-badge-bottom-right`, `.pl-badge-top-left`, `.pl-badge-bottom-left`.

```html example center
<span class="pl-badge-anchor">
  <button class="pl-button pl-button-icon" type="button" aria-label="Powiadomienia: 4 nowe"><span data-pl-icon="bell"></span></button>
  <span class="pl-badge pl-badge-danger">4</span>
</span>
<span class="pl-badge-anchor">
  <button class="pl-button pl-button-icon" type="button" aria-label="Wiadomości"><span data-pl-icon="mail"></span></button>
  <span class="pl-badge pl-badge-dot pl-badge-pulse pl-badge-spark"></span>
</span>
<span class="pl-badge-anchor">
  <button class="pl-button" type="button"><span data-pl-icon="shopping-cart"></span> Koszyk</button>
  <span class="pl-badge">2</span>
</span>
<span class="pl-badge-anchor">
  <button class="pl-button pl-button-icon" type="button" aria-label="Zadania"><span data-pl-icon="clipboard-check"></span></button>
  <span class="pl-badge pl-badge-success pl-badge-bottom-right">7</span>
</span>
<span class="pl-badge-anchor">
  <button class="pl-button pl-button-icon" type="button" aria-label="Czat"><span data-pl-icon="message-circle"></span></button>
  <span class="pl-badge pl-badge-secondary pl-badge-top-left">12</span>
</span>
```

Dla okrągłych elementów (awatar) dodaj `.pl-badge-anchor-circle` — znaczek usiądzie dokładnie na obwodzie koła.

```html example center
<span class="pl-badge-anchor pl-badge-anchor-circle">
  <span class="pl-avatar pl-avatar-large"><img src="/img/avatar-1.svg" alt="Anna Kowalska"></span>
  <span class="pl-badge pl-badge-danger">3</span>
</span>
<span class="pl-badge-anchor pl-badge-anchor-circle">
  <span class="pl-avatar pl-avatar-large"><img src="/img/avatar-4.svg" alt="Daria Lis"></span>
  <span class="pl-badge pl-badge-dot pl-badge-large pl-badge-spark pl-badge-bottom-right"></span>
</span>
<span class="pl-badge-anchor pl-badge-anchor-circle">
  <span class="pl-avatar pl-avatar-large pl-avatar-primary">MK</span>
  <span class="pl-badge pl-badge-secondary pl-badge-bottom-right"><span data-pl-icon="check"></span></span>
</span>
```

Znaczek ma obwódkę w kolorze tła strony. Na innym tle ustaw `--pl-badge-ring`.

## W przyciskach i listach

Wewnątrz `.pl-button` znaczek sam dopasowuje odstępy; na przycisku z pełnym wypełnieniem staje się półprzezroczysty.

```html example center
<button class="pl-button" type="button">Skrzynka <span class="pl-badge">12</span></button>
<button class="pl-button pl-button-primary" type="button">Do akceptacji <span class="pl-badge">5</span></button>
<button class="pl-button pl-button-soft" type="button">Filtry <span class="pl-badge pl-badge-secondary">3</span></button>
```

```html example narrow
<ul class="pl-list pl-list-divider">
  <li class="pl-flex pl-flex-between pl-flex-middle">Odebrane <span class="pl-badge">18</span></li>
  <li class="pl-flex pl-flex-between pl-flex-middle">Wersje robocze <span class="pl-badge pl-badge-soft pl-badge-secondary">2</span></li>
  <li class="pl-flex pl-flex-between pl-flex-middle">Spam <span class="pl-badge pl-badge-soft pl-badge-danger">41</span></li>
</ul>
```

## API

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-badge` | Znaczek z liczbą lub krótkim tekstem. |
| `.pl-badge-primary` … `.pl-badge-info`, `-secondary`, `-spark` | Ton. |
| `.pl-badge-soft` | Delikatne, zabarwione tło. |
| `.pl-badge-outline` | Sam kontur. |
| `.pl-badge-pill`, `.pl-badge-rounded` | Kształt: pigułka (domyślnie) lub zaokrąglony prostokąt. |
| `.pl-badge-small`, `.pl-badge-large` | Rozmiary. |
| `.pl-badge-dot` | Kropka bez treści. |
| `.pl-badge-pulse` | Pulsująca fala wokół znaczka. |
| `.pl-badge-anchor` | Wrapper pozycjonujący znaczek w rogu elementu. |
| `.pl-badge-anchor-circle` | Pozycjonowanie na obwodzie okrągłego elementu. |
| `.pl-badge-bottom-right`, `-top-left`, `-bottom-left` | Róg, do którego przyczepia się znaczek. |

### Zmienne CSS

| Zmienna | Domyślnie | Opis |
| --- | --- | --- |
| `--pl-badge-size` | `1.25rem` | Wysokość (i minimalna szerokość) znaczka. |
| `--pl-badge-ring` | `var(--pl-bg)` | Kolor obwódki znaczka przyczepionego do elementu. |
