---
title: Slidenav
description: Okrągłe przyciski „poprzedni / następny" ze strzałkami rysowanymi w CSS. Lekko szklane tło sprawia, że są czytelne także na zdjęciach.
---

## Podstawowe użycie

Dodaj klasę `.pl-slidenav-previous` lub `.pl-slidenav-next` do przycisku albo linku. Element nie potrzebuje treści — strzałkę rysuje CSS — ale zawsze podaj `aria-label`.

```html example center
<button class="pl-slidenav-previous" type="button" aria-label="Poprzedni slajd"></button>
<button class="pl-slidenav-next" type="button" aria-label="Następny slajd"></button>
```

## Rozmiary

`.pl-slidenav-small` i `.pl-slidenav-large` zmieniają średnicę przycisku i wielkość strzałki.

```html example center
<button class="pl-slidenav-previous pl-slidenav-small" type="button" aria-label="Poprzedni"></button>
<button class="pl-slidenav-next pl-slidenav-small" type="button" aria-label="Następny"></button>
<button class="pl-slidenav-previous" type="button" aria-label="Poprzedni"></button>
<button class="pl-slidenav-next" type="button" aria-label="Następny"></button>
<button class="pl-slidenav-previous pl-slidenav-large" type="button" aria-label="Poprzedni"></button>
<button class="pl-slidenav-next pl-slidenav-large" type="button" aria-label="Następny"></button>
```

## Na zdjęciu

Półprzezroczyste tło z rozmyciem dopasowuje się do tego, co leży pod spodem. Typowe ułożenie w pokazie slajdów: strzałki wyśrodkowane w pionie przy krawędziach.

```html example flush
<div style="position: relative">
  <img src="/img/photo-5.svg" alt="" style="display: block; width: 100%; height: 20rem; object-fit: cover">
  <button class="pl-slidenav-previous pl-slidenav-large" type="button" aria-label="Poprzednie zdjęcie" style="position: absolute; top: 50%; left: 1.25rem; margin-top: -1.75rem"></button>
  <button class="pl-slidenav-next pl-slidenav-large" type="button" aria-label="Następne zdjęcie" style="position: absolute; top: 50%; right: 1.25rem; margin-top: -1.75rem"></button>
</div>
```

## Kontener

`.pl-slidenav-container` ustawia parę strzałek obok siebie — na przykład w rogu karuzeli albo obok nagłówka sekcji.

```html example
<div class="pl-flex pl-flex-middle pl-flex-between">
  <h3 style="margin: 0">Polecane w tym tygodniu</h3>
  <div class="pl-slidenav-container">
    <button class="pl-slidenav-previous" type="button" aria-label="Przewiń w lewo"></button>
    <button class="pl-slidenav-next" type="button" aria-label="Przewiń w prawo"></button>
  </div>
</div>
```

## Warianty

`.pl-slidenav-solid` wypełnia przycisk „atramentem", a `.pl-slidenav-ghost` zostawia samą strzałkę z tłem dopiero przy hoverze.

```html example center
<div class="pl-slidenav-container">
  <button class="pl-slidenav-previous pl-slidenav-solid" type="button" aria-label="Poprzedni"></button>
  <button class="pl-slidenav-next pl-slidenav-solid" type="button" aria-label="Następny"></button>
</div>
<div class="pl-slidenav-container">
  <button class="pl-slidenav-previous pl-slidenav-ghost" type="button" aria-label="Poprzedni"></button>
  <button class="pl-slidenav-next pl-slidenav-ghost" type="button" aria-label="Następny"></button>
</div>
```

## Pionowo

`.pl-slidenav-vertical` obraca strzałki w górę i w dół; `.pl-slidenav-container-vertical` układa parę w kolumnie.

```html example center
<div class="pl-slidenav-container pl-slidenav-container-vertical">
  <button class="pl-slidenav-previous pl-slidenav-vertical" type="button" aria-label="W górę"></button>
  <button class="pl-slidenav-next pl-slidenav-vertical" type="button" aria-label="W dół"></button>
</div>
```

## Stan wyłączony

Atrybut `disabled` (lub klasa `.pl-disabled` na linku) wyszarza strzałkę — np. na pierwszym i ostatnim slajdzie karuzeli bez zapętlenia.

```html example center
<div class="pl-slidenav-container">
  <button class="pl-slidenav-previous" type="button" aria-label="Poprzedni" disabled></button>
  <button class="pl-slidenav-next" type="button" aria-label="Następny"></button>
</div>
```

## API

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-slidenav-previous` | Strzałka „wstecz". |
| `.pl-slidenav-next` | Strzałka „dalej". |
| `.pl-slidenav-small` / `.pl-slidenav-large` | Rozmiar. |
| `.pl-slidenav-solid` | Pełne, ciemne wypełnienie. |
| `.pl-slidenav-ghost` | Bez tła i ramki. |
| `.pl-slidenav-vertical` | Strzałki góra / dół. |
| `.pl-slidenav-container` | Para strzałek obok siebie. |
| `.pl-slidenav-container-vertical` | Para strzałek w kolumnie. |
| `.pl-disabled` | Stan wyłączony (dla linków). |

### Zmienne CSS

| Zmienna | Domyślnie | Opis |
| --- | --- | --- |
| `--pl-slidenav-size` | `2.5rem` | Średnica przycisku. |
| `--pl-slidenav-arrow` | `0.55rem` | Wielkość strzałki. |
