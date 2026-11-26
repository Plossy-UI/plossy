---
title: Grid
description: Elastyczna siatka z rynnami, responsywnymi szerokościami i nowoczesnymi układami CSS Grid — bez ani jednej linii JavaScriptu.
---

## Podstawowe użycie

Dodaj `.pl-grid` do kontenera. Każde bezpośrednie dziecko staje się komórką. Szerokości komórek ustawisz klasami [Width](/docs/layout/width/) albo hurtowo — klasami `.pl-child-width-*` na siatce.

```html example
<div class="pl-grid">
  <div class="pl-width-1-2"><div class="pl-card pl-card-small"><div class="pl-card-body">1-2</div></div></div>
  <div class="pl-width-1-4"><div class="pl-card pl-card-small"><div class="pl-card-body">1-4</div></div></div>
  <div class="pl-width-1-4"><div class="pl-card pl-card-small"><div class="pl-card-body">1-4</div></div></div>
</div>
```

## Szerokości dzieci

`.pl-child-width-1-1` … `.pl-child-width-1-6` nadają wszystkim komórkom tę samą szerokość. Sufiksy `@s`, `@m`, `@l`, `@xl` włączają klasę od danego breakpointu — poniżej komórki układają się jedna pod drugą.

```html example
<div class="pl-grid pl-child-width-1-2 pl-child-width-1-3@s pl-child-width-1-6@l">
  <div><div class="pl-card pl-card-small"><div class="pl-card-body">1</div></div></div>
  <div><div class="pl-card pl-card-small"><div class="pl-card-body">2</div></div></div>
  <div><div class="pl-card pl-card-small"><div class="pl-card-body">3</div></div></div>
  <div><div class="pl-card pl-card-small"><div class="pl-card-body">4</div></div></div>
  <div><div class="pl-card pl-card-small"><div class="pl-card-body">5</div></div></div>
  <div><div class="pl-card pl-card-small"><div class="pl-card-body">6</div></div></div>
</div>
```

### Równy podział i szerokość z treści

`.pl-child-width-expand` dzieli wiersz po równo między wszystkie komórki, `.pl-child-width-auto` dopasowuje każdą do jej zawartości.

```html example
<div class="pl-grid pl-child-width-expand">
  <div><div class="pl-card pl-card-small"><div class="pl-card-body">Expand</div></div></div>
  <div><div class="pl-card pl-card-small"><div class="pl-card-body">Expand</div></div></div>
  <div><div class="pl-card pl-card-small"><div class="pl-card-body">Expand</div></div></div>
</div>
<div class="pl-grid pl-child-width-auto">
  <div><div class="pl-card pl-card-small"><div class="pl-card-body">Auto</div></div></div>
  <div><div class="pl-card pl-card-small"><div class="pl-card-body">Auto — dłuższa treść</div></div></div>
  <div><div class="pl-card pl-card-small"><div class="pl-card-body">Auto</div></div></div>
</div>
```

### Mieszanie szerokości

Klasa na komórce zawsze wygrywa z klasą `.pl-child-width-*`. Typowy układ „panel boczny + treść": stała kolumna i `.pl-width-expand`.

```html example
<div class="pl-grid">
  <div class="pl-width-1-1 pl-width-medium@m"><div class="pl-card pl-card-small"><div class="pl-card-body">Panel boczny — 300px od breakpointu m</div></div></div>
  <div class="pl-width-1-1 pl-width-expand@m"><div class="pl-card pl-card-small"><div class="pl-card-body">Treść — zajmuje resztę wiersza</div></div></div>
</div>
```

## Rynny

Domyślna rynna to `--pl-gutter` (1.5rem). Modyfikatory `-small`, `-medium`, `-large` i `-collapse` zmieniają ją w obu kierunkach. Zawinięte wiersze dostają ten sam odstęp automatycznie.

```html example
<div class="pl-grid pl-grid-small pl-child-width-1-3">
  <div><div class="pl-card pl-card-small"><div class="pl-card-body">Small</div></div></div>
  <div><div class="pl-card pl-card-small"><div class="pl-card-body">Small</div></div></div>
  <div><div class="pl-card pl-card-small"><div class="pl-card-body">Small</div></div></div>
  <div><div class="pl-card pl-card-small"><div class="pl-card-body">Small</div></div></div>
  <div><div class="pl-card pl-card-small"><div class="pl-card-body">Small</div></div></div>
  <div><div class="pl-card pl-card-small"><div class="pl-card-body">Small</div></div></div>
</div>
```

```html example
<div class="pl-grid pl-grid-large pl-child-width-1-3">
  <div><div class="pl-card pl-card-small"><div class="pl-card-body">Large</div></div></div>
  <div><div class="pl-card pl-card-small"><div class="pl-card-body">Large</div></div></div>
  <div><div class="pl-card pl-card-small"><div class="pl-card-body">Large</div></div></div>
</div>
```

```html example
<div class="pl-grid pl-grid-collapse pl-child-width-1-3">
  <div><div class="pl-tile pl-tile-small pl-tile-muted">Collapse</div></div>
  <div><div class="pl-tile pl-tile-small pl-tile-primary">Collapse</div></div>
  <div><div class="pl-tile pl-tile-small pl-tile-secondary">Collapse</div></div>
</div>
```

### Osobno dla kolumn i wierszy

`.pl-grid-column-*` i `.pl-grid-row-*` (z tymi samymi rozmiarami) ustawiają rynnę tylko w jednym kierunku.

```html example
<div class="pl-grid pl-grid-column-small pl-grid-row-large pl-child-width-1-2">
  <div><div class="pl-card pl-card-small"><div class="pl-card-body">Wąska rynna pozioma</div></div></div>
  <div><div class="pl-card pl-card-small"><div class="pl-card-body">Wąska rynna pozioma</div></div></div>
  <div><div class="pl-card pl-card-small"><div class="pl-card-body">Duży odstęp wierszy</div></div></div>
  <div><div class="pl-card pl-card-small"><div class="pl-card-body">Duży odstęp wierszy</div></div></div>
</div>
```

## Linie podziału

`.pl-grid-divider` rysuje włosowe linie między kolumnami i wierszami. Linie pojawiają się tylko pomiędzy komórkami — także po zawinięciu wiersza.

```html example
<div class="pl-grid pl-grid-divider pl-child-width-1-1 pl-child-width-1-3@s">
  <div>
    <h5>Szybki start</h5>
    <p>Jeden plik CSS i jeden moduł JS. Komponenty inicjują się same.</p>
  </div>
  <div>
    <h5>Motywy</h5>
    <p>Jasny i ciemny motyw oraz sześć akcentów opartych na tokenach.</p>
  </div>
  <div>
    <h5>Dostępność</h5>
    <p>Obsługa klawiatury i atrybuty ARIA w każdym komponencie.</p>
  </div>
  <div>
    <h5>Bez zależności</h5>
    <p>Czysty JavaScript w modułach ES — bierzesz tylko to, czego używasz.</p>
  </div>
  <div>
    <h5>Animacje</h5>
    <p>Sprężysty, lekki ruch, który wyłącza się przy ograniczonych animacjach.</p>
  </div>
  <div>
    <h5>Responsywność</h5>
    <p>Cztery breakpointy i sufiksy <code>@s</code>–<code>@xl</code>.</p>
  </div>
</div>
```

## Równa wysokość

Komórki w wierszu mają zawsze tę samą wysokość. Aby rozciągnąć także ich zawartość (np. karty), dodaj `.pl-grid-match`.

```html example
<div class="pl-grid pl-grid-match pl-child-width-1-3@s">
  <div>
    <div class="pl-card"><div class="pl-card-body">
      <h5 class="pl-card-title">Starter</h5>
      <p class="pl-card-text">Dla jednej osoby.</p>
    </div></div>
  </div>
  <div>
    <div class="pl-card"><div class="pl-card-body">
      <h5 class="pl-card-title">Zespół</h5>
      <p class="pl-card-text">Wspólne przestrzenie robocze, role i uprawnienia, a do tego priorytetowe wsparcie w dni robocze.</p>
    </div></div>
  </div>
  <div>
    <div class="pl-card"><div class="pl-card-body">
      <h5 class="pl-card-title">Firma</h5>
      <p class="pl-card-text">Logowanie SSO i umowa SLA.</p>
    </div></div>
  </div>
</div>
```

## Wyrównanie

`.pl-grid-middle` i `.pl-grid-bottom` wyrównują komórki w pionie, `.pl-grid-center` — w poziomie. Do bardziej złożonych przypadków użyj klas [Flex](/docs/layout/flex/) — siatka jest kontenerem flex.

```html example
<div class="pl-grid pl-grid-middle pl-grid-center pl-child-width-1-4">
  <div><div class="pl-card pl-card-small" style="height: 7rem"><div class="pl-card-body">Wysoka</div></div></div>
  <div><div class="pl-card pl-card-small"><div class="pl-card-body">Na środku</div></div></div>
  <div><div class="pl-card pl-card-small"><div class="pl-card-body">Na środku</div></div></div>
</div>
```

## Zagnieżdżanie

Siatkę można wstawić do komórki innej siatki — każda zachowuje własne rynny.

```html example
<div class="pl-grid pl-child-width-1-2">
  <div><div class="pl-card pl-card-small"><div class="pl-card-body">Lewa kolumna</div></div></div>
  <div>
    <div class="pl-grid pl-grid-small pl-child-width-1-2">
      <div><div class="pl-card pl-card-small"><div class="pl-card-body">A</div></div></div>
      <div><div class="pl-card pl-card-small"><div class="pl-card-body">B</div></div></div>
      <div><div class="pl-card pl-card-small"><div class="pl-card-body">C</div></div></div>
      <div><div class="pl-card pl-card-small"><div class="pl-card-body">D</div></div></div>
    </div>
  </div>
</div>
```

## Siatka automatyczna

`.pl-grid-auto` to CSS Grid, który sam dobiera liczbę kolumn: każda ma co najmniej `--pl-grid-min` (domyślnie 16rem), a wolne miejsce dzielone jest po równo. Bez breakpointów. Wariant `.pl-grid-auto-fill` nie rozciąga elementów, gdy jest ich mniej niż kolumn.

```html example
<div class="pl-grid-auto" style="--pl-grid-min: 11rem">
  <div class="pl-card pl-card-small"><div class="pl-card-body">Analityka</div></div>
  <div class="pl-card pl-card-small"><div class="pl-card-body">Faktury</div></div>
  <div class="pl-card pl-card-small"><div class="pl-card-body">Klienci</div></div>
  <div class="pl-card pl-card-small"><div class="pl-card-body">Magazyn</div></div>
  <div class="pl-card pl-card-small"><div class="pl-card-body">Raporty</div></div>
</div>
```

```html example
<div class="pl-grid-auto-fill pl-grid-small" style="--pl-grid-min: 11rem">
  <div class="pl-card pl-card-small"><div class="pl-card-body">auto-fill</div></div>
  <div class="pl-card pl-card-small"><div class="pl-card-body">auto-fill</div></div>
</div>
```

## Bento

`.pl-bento` buduje mozaikę kafli: 1 kolumna na telefonie, 2 od `s`, 4 od `m` (liczbę zmienisz klasą `.pl-bento-2|3|5|6` lub zmienną `--pl-bento-cols`). Kafle rozciągasz klasami `.pl-span-2…6`, `.pl-span-full` i `.pl-row-span-2|3`; luki wypełniają się automatycznie.

```html example
<div class="pl-bento pl-grid-small">
  <div class="pl-tile pl-tile-small pl-tile-primary pl-tile-rounded pl-span-2 pl-row-span-2">
    <h3>128 tys.</h3>
    <p>aktywnych użytkowników w tym miesiącu</p>
  </div>
  <div class="pl-tile pl-tile-small pl-tile-muted pl-tile-rounded">
    <h5>Konwersja</h5>
    <p>4,8%</p>
  </div>
  <div class="pl-tile pl-tile-small pl-tile-muted pl-tile-rounded">
    <h5>Koszyk</h5>
    <p>214 zł</p>
  </div>
  <div class="pl-tile pl-tile-small pl-tile-secondary pl-tile-rounded pl-span-2">
    <h5>Nowe zamówienia</h5>
    <p>312 dzisiaj, o 18% więcej niż wczoraj</p>
  </div>
  <div class="pl-tile pl-tile-small pl-tile-default pl-tile-rounded pl-span-full">
    <h5>Cały wiersz</h5>
    <p><code>.pl-span-full</code> rozciąga kafel na wszystkie kolumny.</p>
  </div>
</div>
```

Spany z sufiksem (`.pl-span-2@l`, `.pl-row-span-2@m`) zaczynają działać od wskazanego breakpointu.

```html example
<div class="pl-bento pl-bento-3" style="--pl-bento-row: 6rem">
  <div class="pl-card pl-card-small pl-span-2@l"><div class="pl-card-body">span-2@l</div></div>
  <div class="pl-card pl-card-small pl-row-span-2@m"><div class="pl-card-body">row-span-2@m</div></div>
  <div class="pl-card pl-card-small"><div class="pl-card-body">1</div></div>
  <div class="pl-card pl-card-small"><div class="pl-card-body">2</div></div>
</div>
```

## API

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-grid` | Siatka flex z rynnami. |
| `.pl-grid-small` / `-medium` / `-large` / `-collapse` | Rozmiar rynny w obu kierunkach. |
| `.pl-grid-column-{small,medium,large,collapse}` | Rynna tylko między kolumnami. |
| `.pl-grid-row-{small,medium,large,collapse}` | Odstęp tylko między wierszami. |
| `.pl-grid-divider` | Linie między komórkami. |
| `.pl-grid-match` | Zawartość komórek o równej wysokości. |
| `.pl-grid-middle` / `-bottom` / `-center` | Wyrównanie komórek. |
| `.pl-child-width-1-1` … `1-6` | Szerokość wszystkich dzieci (z sufiksami `@s @m @l @xl`). |
| `.pl-child-width-auto` | Dzieci o szerokości treści. |
| `.pl-child-width-expand` | Dzieci dzielą wiersz po równo. |
| `.pl-grid-auto` / `.pl-grid-auto-fill` | CSS Grid z automatyczną liczbą kolumn. |
| `.pl-bento` | Mozaika CSS Grid (`.pl-bento-2|3|5|6` — liczba kolumn od `m`). |
| `.pl-span-2` … `6`, `.pl-span-full` | Rozpiętość w kolumnach (także z sufiksami). |
| `.pl-row-span-2`, `.pl-row-span-3` | Rozpiętość w wierszach (także z sufiksami). |

### Zmienne CSS

| Zmienna | Domyślnie | Opis |
| --- | --- | --- |
| `--pl-grid-gap` | `var(--pl-gutter)` | Rynna w obu kierunkach. |
| `--pl-grid-gap-x` / `--pl-grid-gap-y` | `var(--pl-grid-gap)` | Rynna pozioma / pionowa. |
| `--pl-grid-min` | `16rem` | Minimalna szerokość kolumny w `.pl-grid-auto`. |
| `--pl-bento-cols` | `4` | Liczba kolumn bento od `m`. |
| `--pl-bento-row` | `11rem` | Minimalna wysokość wiersza bento. |
