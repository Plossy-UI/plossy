---
title: Subnav
description: Pozioma nawigacja drugiego poziomu — filtry, widoki, sekcje profilu. W wariancie „pill" działa jak kontrolka segmentowa z przesuwanym wskaźnikiem.
---

## Podstawowe użycie

Dodaj klasę `.pl-subnav` do listy. Aktywną pozycję oznacz `.pl-active` na `<li>` — pojawi się pod nią podkreślenie w kolorze akcentu. Przy hoverze podkreślenie wjeżdża od lewej.

```html example
<ul class="pl-subnav">
  <li class="pl-active"><a href="#">Wszystkie</a></li>
  <li><a href="#">Otwarte</a></li>
  <li><a href="#">Zamknięte</a></li>
  <li><a href="#">Zarchiwizowane</a></li>
  <li class="pl-disabled"><a href="#">Usunięte</a></li>
</ul>
```

## Z separatorami

`.pl-subnav-divider` wstawia między pozycje pionowe kreski — dobre do stopek i metadanych.

```html example
<ul class="pl-subnav pl-subnav-divider">
  <li><a href="#">Regulamin</a></li>
  <li><a href="#">Prywatność</a></li>
  <li><a href="#">Pliki cookie</a></li>
  <li><span>© 2026 Lorem</span></li>
</ul>
```

## Pigułki

`.pl-subnav-pill` zamienia subnav w kontrolkę segmentową. Bez JavaScriptu aktywna pozycja po prostu ma własne tło.

```html example
<ul class="pl-subnav pl-subnav-pill">
  <li class="pl-active"><a href="#">Dzień</a></li>
  <li><a href="#">Tydzień</a></li>
  <li><a href="#">Miesiąc</a></li>
  <li><a href="#">Rok</a></li>
</ul>
```

### Przesuwany wskaźnik

Po dodaniu `data-pl-switcher` Switcher przełącza panele i udostępnia zmienne `--pl-indicator-*`, z których subnav rysuje jedną pigułkę sprężyście przesuwającą się między pozycjami.

```html example
<ul class="pl-subnav pl-subnav-pill" data-pl-switcher="connect: #demo-subnav-panels">
  <li class="pl-active"><a href="#">Miesięcznie</a></li>
  <li><a href="#">Rocznie</a></li>
  <li><a href="#">Dożywotnio</a></li>
</ul>
<div class="pl-switcher pl-margin-top" id="demo-subnav-panels">
  <div class="pl-active">
    <h3 style="margin-bottom: .2em">49 zł <small style="color: var(--pl-text-muted)">/ miesiąc</small></h3>
    <p>Pełna elastyczność — rezygnujesz, kiedy chcesz.</p>
  </div>
  <div>
    <h3 style="margin-bottom: .2em">39 zł <small style="color: var(--pl-text-muted)">/ miesiąc</small></h3>
    <p>Dwa miesiące gratis przy płatności za rok z góry.</p>
  </div>
  <div>
    <h3 style="margin-bottom: .2em">990 zł <small style="color: var(--pl-text-muted)">jednorazowo</small></h3>
    <p>Jedna płatność, wszystkie przyszłe aktualizacje.</p>
  </div>
</div>
```

### Kolor akcentu i kształt

`.pl-subnav-primary` wypełnia wskaźnik kolorem akcentu, a `.pl-subnav-rounded` zamienia pigułkę w zaokrąglony prostokąt.

```html example column
<div>
  <ul class="pl-subnav pl-subnav-pill pl-subnav-primary" data-pl-switcher>
    <li class="pl-active"><a href="#">Lista</a></li>
    <li><a href="#">Tablica</a></li>
    <li><a href="#">Kalendarz</a></li>
  </ul>
  <div class="pl-switcher" hidden><div></div><div></div><div></div></div>
</div>
<div>
  <ul class="pl-subnav pl-subnav-pill pl-subnav-rounded" data-pl-switcher>
    <li class="pl-active"><a href="#"><span data-pl-icon="layout-list"></span> Lista</a></li>
    <li><a href="#"><span data-pl-icon="layout-grid"></span> Siatka</a></li>
    <li><a href="#"><span data-pl-icon="map"></span> Mapa</a></li>
  </ul>
  <div class="pl-switcher" hidden><div></div><div></div><div></div></div>
</div>
```

### Pełna szerokość

`.pl-subnav-fill` rozciąga kontrolkę i nadaje pozycjom równe szerokości.

```html example narrow
<div>
  <ul class="pl-subnav pl-subnav-pill pl-subnav-fill" data-pl-switcher>
    <li class="pl-active"><a href="#">Logowanie</a></li>
    <li><a href="#">Rejestracja</a></li>
  </ul>
  <div class="pl-switcher pl-margin-top">
    <div class="pl-active"><p>Wpisz e-mail i hasło, aby wejść na swoje konto.</p></div>
    <div><p>Załóż konto w minutę — bez karty płatniczej.</p></div>
  </div>
</div>
```

## Ikony i znaczki

```html example
<ul class="pl-subnav">
  <li class="pl-active"><a href="#"><span data-pl-icon="message-square"></span> Komentarze <span class="pl-badge pl-badge-small">18</span></a></li>
  <li><a href="#"><span data-pl-icon="history"></span> Historia</a></li>
  <li><a href="#"><span data-pl-icon="paperclip"></span> Załączniki <span class="pl-badge pl-badge-small">3</span></a></li>
</ul>
```

## Z menu rozwijanym

Pozycja subnav może otwierać Drop — na przykład wybór sortowania.

```html example
<ul class="pl-subnav">
  <li class="pl-active"><a href="#">Najnowsze</a></li>
  <li><a href="#">Popularne</a></li>
  <li>
    <a href="#">Sortuj <span data-pl-icon="chevron-down"></span></a>
    <div class="pl-drop pl-dropdown" data-pl-drop="mode: click">
      <ul class="pl-dropdown-nav">
        <li class="pl-active"><a href="#">Od najnowszych</a></li>
        <li><a href="#">Od najstarszych</a></li>
        <li><a href="#">Alfabetycznie</a></li>
      </ul>
    </div>
  </li>
</ul>
```

## Rozmiary

```html example column
<ul class="pl-subnav pl-subnav-pill pl-subnav-small">
  <li class="pl-active"><a href="#">1D</a></li>
  <li><a href="#">1T</a></li>
  <li><a href="#">1M</a></li>
  <li><a href="#">1R</a></li>
</ul>
<ul class="pl-subnav pl-subnav-pill">
  <li class="pl-active"><a href="#">1D</a></li>
  <li><a href="#">1T</a></li>
  <li><a href="#">1M</a></li>
  <li><a href="#">1R</a></li>
</ul>
<ul class="pl-subnav pl-subnav-pill pl-subnav-large">
  <li class="pl-active"><a href="#">1D</a></li>
  <li><a href="#">1T</a></li>
  <li><a href="#">1M</a></li>
  <li><a href="#">1R</a></li>
</ul>
```

## API

Subnav nie ma własnego skryptu. Przełączanie paneli i przesuwany wskaźnik zapewnia [Switcher](/docs/interactive/switcher/) — ustawia na liście klasę `.pl-switcher-ready` oraz zmienne `--pl-indicator-x`, `--pl-indicator-y`, `--pl-indicator-w`, `--pl-indicator-h`.

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-subnav` | Lista pozycji. |
| `.pl-subnav-divider` | Pionowe separatory między pozycjami. |
| `.pl-subnav-pill` | Kontrolka segmentowa. |
| `.pl-subnav-primary` | Wskaźnik w kolorze akcentu (z `.pl-subnav-pill`). |
| `.pl-subnav-rounded` | Zaokrąglony prostokąt zamiast pigułki. |
| `.pl-subnav-fill` | Pełna szerokość, równe pozycje. |
| `.pl-subnav-small` / `.pl-subnav-large` | Rozmiar. |
| `.pl-active` / `.pl-disabled` | Stany pozycji (na `<li>`). |

### Zmienne CSS

| Zmienna | Domyślnie | Opis |
| --- | --- | --- |
| `--pl-subnav-gap` | `1.5rem` | Odstęp między pozycjami. |
| `--pl-subnav-radius` | `--pl-radius-pill` | Zaokrąglenie pigułek. |
| `--pl-subnav-pad` | `3px` | Wewnętrzny margines kontrolki segmentowej. |
