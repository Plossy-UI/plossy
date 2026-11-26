---
title: Flex
description: Narzędzia flexbox — wyrównanie, kierunek, zawijanie, kolejność i odstępy bez pisania własnego CSS.
---

## Podstawowe użycie

`.pl-flex` zamienia element w kontener flex, `.pl-flex-inline` — w kontener liniowy. Dzieci układają się w wierszu.

```html example
<div class="pl-flex pl-gap-small">
  <div class="pl-card pl-card-small"><div class="pl-card-body">Pierwszy</div></div>
  <div class="pl-card pl-card-small"><div class="pl-card-body">Drugi</div></div>
  <div class="pl-card pl-card-small"><div class="pl-card-body">Trzeci</div></div>
</div>
```

## Wyrównanie w poziomie

`.pl-flex-left`, `-center`, `-right`, `-between`, `-around` i `-evenly` rozkładają elementy wzdłuż osi głównej.

```html example column
<div class="pl-flex pl-flex-center pl-gap-small">
  <div class="pl-card pl-card-small"><div class="pl-card-body">center</div></div>
  <div class="pl-card pl-card-small"><div class="pl-card-body">center</div></div>
</div>
<div class="pl-flex pl-flex-right pl-gap-small">
  <div class="pl-card pl-card-small"><div class="pl-card-body">right</div></div>
  <div class="pl-card pl-card-small"><div class="pl-card-body">right</div></div>
</div>
<div class="pl-flex pl-flex-between">
  <div class="pl-card pl-card-small"><div class="pl-card-body">between</div></div>
  <div class="pl-card pl-card-small"><div class="pl-card-body">between</div></div>
  <div class="pl-card pl-card-small"><div class="pl-card-body">between</div></div>
</div>
<div class="pl-flex pl-flex-around">
  <div class="pl-card pl-card-small"><div class="pl-card-body">around</div></div>
  <div class="pl-card pl-card-small"><div class="pl-card-body">around</div></div>
  <div class="pl-card pl-card-small"><div class="pl-card-body">around</div></div>
</div>
<div class="pl-flex pl-flex-evenly">
  <div class="pl-card pl-card-small"><div class="pl-card-body">evenly</div></div>
  <div class="pl-card pl-card-small"><div class="pl-card-body">evenly</div></div>
  <div class="pl-card pl-card-small"><div class="pl-card-body">evenly</div></div>
</div>
```

## Wyrównanie w pionie

`.pl-flex-top`, `-middle`, `-bottom`, `-baseline` i `-stretch` (domyślne) ustawiają elementy w osi poprzecznej.

```html example
<div class="pl-grid pl-grid-small pl-child-width-1-2 pl-child-width-1-4@m">
  <div>
    <div class="pl-flex pl-flex-top pl-gap-small" style="height: 8rem">
      <div class="pl-card pl-card-small"><div class="pl-card-body">top</div></div>
      <div class="pl-card pl-card-small"><div class="pl-card-body">top</div></div>
    </div>
  </div>
  <div>
    <div class="pl-flex pl-flex-middle pl-gap-small" style="height: 8rem">
      <div class="pl-card pl-card-small"><div class="pl-card-body">middle</div></div>
      <div class="pl-card pl-card-small"><div class="pl-card-body">middle</div></div>
    </div>
  </div>
  <div>
    <div class="pl-flex pl-flex-bottom pl-gap-small" style="height: 8rem">
      <div class="pl-card pl-card-small"><div class="pl-card-body">bottom</div></div>
      <div class="pl-card pl-card-small"><div class="pl-card-body">bottom</div></div>
    </div>
  </div>
  <div>
    <div class="pl-flex pl-flex-stretch pl-gap-small" style="height: 8rem">
      <div class="pl-card pl-card-small"><div class="pl-card-body">stretch</div></div>
      <div class="pl-card pl-card-small"><div class="pl-card-body">stretch</div></div>
    </div>
  </div>
</div>
```

### Idealne wyśrodkowanie

Połączenie `.pl-flex-center` i `.pl-flex-middle` ustawia element dokładnie na środku.

```html example
<div class="pl-flex pl-flex-center pl-flex-middle pl-tile pl-tile-muted pl-tile-rounded" style="height: 10rem">
  <div class="pl-card pl-card-small"><div class="pl-card-body">Na samym środku</div></div>
</div>
```

## Kierunek

`.pl-flex-row`, `-row-reverse`, `-column` i `-column-reverse` zmieniają oś główną.

```html example
<div class="pl-grid pl-child-width-1-2">
  <div>
    <div class="pl-flex pl-flex-row-reverse pl-gap-small">
      <div class="pl-card pl-card-small"><div class="pl-card-body">1</div></div>
      <div class="pl-card pl-card-small"><div class="pl-card-body">2</div></div>
      <div class="pl-card pl-card-small"><div class="pl-card-body">3</div></div>
    </div>
  </div>
  <div>
    <div class="pl-flex pl-flex-column pl-gap-small">
      <div class="pl-card pl-card-small"><div class="pl-card-body">1</div></div>
      <div class="pl-card pl-card-small"><div class="pl-card-body">2</div></div>
      <div class="pl-card pl-card-small"><div class="pl-card-body">3</div></div>
    </div>
  </div>
</div>
```

## Responsywność

Klasy wyrównania, kierunku, kolejności i rozmiaru mają warianty `@s`, `@m`, `@l`, `@xl`. Poniżej: kolumna na telefonie, wiersz z rozstrzeleniem od `s`.

```html example
<div class="pl-flex pl-flex-column pl-flex-row@s pl-flex-between@s pl-flex-middle@s pl-gap-small">
  <div class="pl-card pl-card-small"><div class="pl-card-body">Logo</div></div>
  <div class="pl-card pl-card-small"><div class="pl-card-body">Nawigacja</div></div>
  <div class="pl-card pl-card-small"><div class="pl-card-body">Konto</div></div>
</div>
```

## Zawijanie

`.pl-flex-wrap` pozwala elementom przejść do kolejnego wiersza (`-nowrap`, `-wrap-reverse` — pozostałe tryby). Rozkład wierszy ustawiają `.pl-flex-wrap-top`, `-middle`, `-bottom`, `-between`, `-around`, `-stretch`.

```html example
<div class="pl-flex pl-flex-wrap pl-gap-small">
  <div class="pl-card pl-card-small"><div class="pl-card-body">Architektura</div></div>
  <div class="pl-card pl-card-small"><div class="pl-card-body">Wzornictwo</div></div>
  <div class="pl-card pl-card-small"><div class="pl-card-body">Fotografia</div></div>
  <div class="pl-card pl-card-small"><div class="pl-card-body">Typografia</div></div>
  <div class="pl-card pl-card-small"><div class="pl-card-body">Ilustracja</div></div>
  <div class="pl-card pl-card-small"><div class="pl-card-body">Projektowanie wnętrz</div></div>
  <div class="pl-card pl-card-small"><div class="pl-card-body">Moda</div></div>
  <div class="pl-card pl-card-small"><div class="pl-card-body">Rzemiosło</div></div>
</div>
```

## Kolejność

`.pl-flex-first` przenosi element na początek, `.pl-flex-last` — na koniec. Z sufiksem zmienisz kolejność tylko na większych ekranach.

```html example
<div class="pl-flex pl-gap-small">
  <div class="pl-card pl-card-small pl-flex-last"><div class="pl-card-body">1 (last)</div></div>
  <div class="pl-card pl-card-small"><div class="pl-card-body">2</div></div>
  <div class="pl-card pl-card-small pl-flex-first@m"><div class="pl-card-body">3 (first@m)</div></div>
</div>
```

## Rozmiar elementu

`.pl-flex-1` wypełnia wolne miejsce, `.pl-flex-auto` rośnie od rozmiaru treści, `.pl-flex-none` nie zmienia rozmiaru.

```html example
<div class="pl-flex pl-gap-small">
  <div class="pl-card pl-card-small pl-flex-none"><div class="pl-card-body">none</div></div>
  <div class="pl-card pl-card-small pl-flex-1"><div class="pl-card-body">flex-1 — zajmuje resztę</div></div>
  <div class="pl-card pl-card-small pl-flex-none"><div class="pl-card-body">none</div></div>
</div>
```

## Pojedynczy element

`.pl-flex-self-top`, `-middle`, `-bottom`, `-stretch` nadpisują wyrównanie jednego dziecka.

```html example
<div class="pl-flex pl-gap-small" style="height: 8rem">
  <div class="pl-card pl-card-small pl-flex-self-top"><div class="pl-card-body">self-top</div></div>
  <div class="pl-card pl-card-small pl-flex-self-middle"><div class="pl-card-body">self-middle</div></div>
  <div class="pl-card pl-card-small pl-flex-self-bottom"><div class="pl-card-body">self-bottom</div></div>
  <div class="pl-card pl-card-small"><div class="pl-card-body">stretch</div></div>
</div>
```

## Odstępy

`.pl-gap-xsmall`, `-small`, `-medium` (lub samo `.pl-gap`), `-large` ustawiają `gap` — działają w kontenerach flex i grid.

```html example column
<div class="pl-flex pl-gap-xsmall">
  <div class="pl-card pl-card-small"><div class="pl-card-body">xsmall</div></div>
  <div class="pl-card pl-card-small"><div class="pl-card-body">xsmall</div></div>
  <div class="pl-card pl-card-small"><div class="pl-card-body">xsmall</div></div>
</div>
<div class="pl-flex pl-gap-small">
  <div class="pl-card pl-card-small"><div class="pl-card-body">small</div></div>
  <div class="pl-card pl-card-small"><div class="pl-card-body">small</div></div>
  <div class="pl-card pl-card-small"><div class="pl-card-body">small</div></div>
</div>
<div class="pl-flex pl-gap-medium">
  <div class="pl-card pl-card-small"><div class="pl-card-body">medium</div></div>
  <div class="pl-card pl-card-small"><div class="pl-card-body">medium</div></div>
  <div class="pl-card pl-card-small"><div class="pl-card-body">medium</div></div>
</div>
<div class="pl-flex pl-gap-large">
  <div class="pl-card pl-card-small"><div class="pl-card-body">large</div></div>
  <div class="pl-card pl-card-small"><div class="pl-card-body">large</div></div>
  <div class="pl-card pl-card-small"><div class="pl-card-body">large</div></div>
</div>
```

## API

### Klasy

Klasy oznaczone ● mają warianty responsywne `@s @m @l @xl`.

| Klasa | Opis |
| --- | --- |
| `.pl-flex` / `.pl-flex-inline` | Kontener flex / inline-flex. |
| `.pl-flex-left` `-center` `-right` `-between` `-around` `-evenly` ● | Wyrównanie w osi głównej. |
| `.pl-flex-top` `-middle` `-bottom` `-baseline` `-stretch` ● | Wyrównanie w osi poprzecznej. |
| `.pl-flex-row` `-row-reverse` `-column` `-column-reverse` ● | Kierunek. |
| `.pl-flex-wrap` `-nowrap` `-wrap-reverse` | Zawijanie. |
| `.pl-flex-wrap-top` `-middle` `-bottom` `-between` `-around` `-stretch` | Rozkład zawiniętych wierszy. |
| `.pl-flex-first` `-last` `-initial` ● | Kolejność elementu. |
| `.pl-flex-1` `-auto` `-none` ● | Rozmiar elementu. |
| `.pl-flex-self-top` `-middle` `-bottom` `-stretch` | Wyrównanie pojedynczego elementu. |
| `.pl-gap-xsmall` `-small` `-medium` `-large` `-remove` | Odstęp między elementami. |
