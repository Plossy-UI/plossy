---
title: Iconnav
description: Nawigacja złożona z samych ikon — paski narzędzi, akcje przy treści i boczne menu aplikacji.
---

## Podstawowe użycie

Dodaj klasę `.pl-iconnav` do listy `<ul>`. Każda pozycja to link lub przycisk z ikoną. Ponieważ ikony nie mają tekstu, każda pozycja potrzebuje `aria-label`.

```html example center
<ul class="pl-iconnav">
  <li><a href="#" aria-label="Edytuj"><span data-pl-icon="pencil"></span></a></li>
  <li><a href="#" aria-label="Kopiuj"><span data-pl-icon="copy"></span></a></li>
  <li><a href="#" aria-label="Udostępnij"><span data-pl-icon="share-2"></span></a></li>
  <li><a href="#" aria-label="Usuń"><span data-pl-icon="trash-2"></span></a></li>
</ul>
```

## Aktywna pozycja

Klasa `.pl-active` na `<li>` wyróżnia bieżącą pozycję tłem w kolorze akcentu. `.pl-disabled` wyłącza pozycję. Dodaj `aria-current="page"` (nawigacja) lub `aria-pressed="true"` (przełącznik).

```html example center
<ul class="pl-iconnav">
  <li class="pl-active"><a href="#" aria-label="Siatka" aria-current="page"><span data-pl-icon="layout-grid"></span></a></li>
  <li><a href="#" aria-label="Lista"><span data-pl-icon="layout-list"></span></a></li>
  <li><a href="#" aria-label="Tabela"><span data-pl-icon="table"></span></a></li>
  <li class="pl-disabled"><a href="#" aria-label="Mapa" aria-disabled="true" tabindex="-1"><span data-pl-icon="map"></span></a></li>
</ul>
```

## Pionowy

`.pl-iconnav-vertical` układa pozycje w kolumnie — na boczny pasek aplikacji.

```html example center
<ul class="pl-iconnav pl-iconnav-vertical">
  <li class="pl-active"><a href="#" aria-label="Pulpit" aria-current="page"><span data-pl-icon="home"></span></a></li>
  <li><a href="#" aria-label="Projekty"><span data-pl-icon="folder"></span></a></li>
  <li><a href="#" aria-label="Kalendarz"><span data-pl-icon="calendar"></span></a></li>
  <li><a href="#" aria-label="Zespół"><span data-pl-icon="users"></span></a></li>
  <li class="pl-iconnav-divider" aria-hidden="true"></li>
  <li><a href="#" aria-label="Ustawienia"><span data-pl-icon="settings"></span></a></li>
</ul>
```

## Pasek narzędzi

`.pl-iconnav-bar` zamyka ikony w kapsule z ramką i cieniem. Grupy rozdziela `.pl-iconnav-divider`. Z `.pl-iconnav-pill` kapsuła i pozycje są w pełni zaokrąglone.

```html example center
<ul class="pl-iconnav pl-iconnav-bar" role="toolbar" aria-label="Formatowanie">
  <li class="pl-active" role="presentation"><button type="button" aria-label="Pogrubienie" aria-pressed="true"><span data-pl-icon="bold"></span></button></li>
  <li role="presentation"><button type="button" aria-label="Kursywa" aria-pressed="false"><span data-pl-icon="italic"></span></button></li>
  <li role="presentation"><button type="button" aria-label="Podkreślenie" aria-pressed="false"><span data-pl-icon="underline"></span></button></li>
  <li class="pl-iconnav-divider" role="separator"></li>
  <li class="pl-active" role="presentation"><button type="button" aria-label="Do lewej" aria-pressed="true"><span data-pl-icon="align-left"></span></button></li>
  <li role="presentation"><button type="button" aria-label="Do środka" aria-pressed="false"><span data-pl-icon="align-center"></span></button></li>
  <li role="presentation"><button type="button" aria-label="Do prawej" aria-pressed="false"><span data-pl-icon="align-right"></span></button></li>
  <li class="pl-iconnav-divider" role="separator"></li>
  <li role="presentation"><button type="button" aria-label="Wstaw link"><span data-pl-icon="link"></span></button></li>
  <li role="presentation"><button type="button" aria-label="Wstaw obraz"><span data-pl-icon="image"></span></button></li>
</ul>

<ul class="pl-iconnav pl-iconnav-bar pl-iconnav-pill pl-iconnav-solid" aria-label="Motyw">
  <li><button type="button" aria-label="Jasny"><span data-pl-icon="sun"></span></button></li>
  <li class="pl-active"><button type="button" aria-label="Ciemny" aria-pressed="true"><span data-pl-icon="moon"></span></button></li>
  <li><button type="button" aria-label="Systemowy"><span data-pl-icon="monitor"></span></button></li>
</ul>
```

## Styl aktywnej pozycji

Domyślnie aktywna pozycja ma miękkie tło. `.pl-iconnav-solid` daje pełne, atramentowe wypełnienie, a `.pl-iconnav-line` — kreskę pod ikoną (w wariancie pionowym: z boku).

```html example center
<ul class="pl-iconnav pl-iconnav-solid">
  <li><a href="#" aria-label="Pulpit"><span data-pl-icon="home"></span></a></li>
  <li class="pl-active"><a href="#" aria-label="Statystyki"><span data-pl-icon="chart-bar"></span></a></li>
  <li><a href="#" aria-label="Portfel"><span data-pl-icon="wallet"></span></a></li>
</ul>

<ul class="pl-iconnav pl-iconnav-line">
  <li><a href="#" aria-label="Pulpit"><span data-pl-icon="home"></span></a></li>
  <li class="pl-active"><a href="#" aria-label="Szukaj"><span data-pl-icon="search"></span></a></li>
  <li><a href="#" aria-label="Ulubione"><span data-pl-icon="heart"></span></a></li>
  <li><a href="#" aria-label="Profil"><span data-pl-icon="user"></span></a></li>
</ul>

<ul class="pl-iconnav pl-iconnav-vertical pl-iconnav-line">
  <li class="pl-active"><a href="#" aria-label="Skrzynka"><span data-pl-icon="mail"></span></a></li>
  <li><a href="#" aria-label="Wysłane"><span data-pl-icon="send"></span></a></li>
  <li><a href="#" aria-label="Kosz"><span data-pl-icon="trash"></span></a></li>
</ul>
```

## Ze znaczkiem i tekstem

Wewnątrz pozycji możesz umieścić `.pl-badge` — licznik lub kropka przyczepią się do rogu ikony. Krótki tekst obok ikony również jest dozwolony.

```html example center
<ul class="pl-iconnav pl-iconnav-large">
  <li><a href="#" aria-label="Powiadomienia: 3 nowe"><span data-pl-icon="bell"></span><span class="pl-badge pl-badge-danger">3</span></a></li>
  <li><a href="#" aria-label="Wiadomości: nowe"><span data-pl-icon="message-square"></span><span class="pl-badge pl-badge-dot pl-badge-spark"></span></a></li>
  <li><a href="#" aria-label="Koszyk: 2 produkty"><span data-pl-icon="shopping-bag"></span><span class="pl-badge">2</span></a></li>
</ul>

<ul class="pl-iconnav">
  <li><a href="#"><span data-pl-icon="thumbs-up"></span> 128</a></li>
  <li><a href="#"><span data-pl-icon="message-circle"></span> 24</a></li>
  <li><a href="#"><span data-pl-icon="bookmark"></span> Zapisz</a></li>
</ul>
```

## Rozmiary

```html example center
<ul class="pl-iconnav pl-iconnav-small">
  <li><a href="#" aria-label="Pobierz"><span data-pl-icon="download"></span></a></li>
  <li><a href="#" aria-label="Drukuj"><span data-pl-icon="file-text"></span></a></li>
  <li><a href="#" aria-label="Więcej"><span data-pl-icon="ellipsis"></span></a></li>
</ul>
<ul class="pl-iconnav">
  <li><a href="#" aria-label="Pobierz"><span data-pl-icon="download"></span></a></li>
  <li><a href="#" aria-label="Drukuj"><span data-pl-icon="file-text"></span></a></li>
  <li><a href="#" aria-label="Więcej"><span data-pl-icon="ellipsis"></span></a></li>
</ul>
<ul class="pl-iconnav pl-iconnav-large">
  <li><a href="#" aria-label="Pobierz"><span data-pl-icon="download"></span></a></li>
  <li><a href="#" aria-label="Drukuj"><span data-pl-icon="file-text"></span></a></li>
  <li><a href="#" aria-label="Więcej"><span data-pl-icon="ellipsis"></span></a></li>
</ul>
```

## W praktyce

Iconnav często towarzyszy treści — na przykład jako akcje w nagłówku karty. Podpowiedzi dodasz atrybutem `data-pl-tooltip`.

```html example
<div class="pl-card" style="max-width: 28rem">
  <div class="pl-card-header pl-flex-between">
    <h3 class="pl-card-title">Raport sprzedaży.pdf</h3>
    <ul class="pl-iconnav pl-iconnav-small">
      <li><a href="#" aria-label="Podgląd" data-pl-tooltip="Podgląd"><span data-pl-icon="eye"></span></a></li>
      <li><a href="#" aria-label="Pobierz" data-pl-tooltip="Pobierz"><span data-pl-icon="download"></span></a></li>
      <li><a href="#" aria-label="Usuń" data-pl-tooltip="Usuń"><span data-pl-icon="trash-2"></span></a></li>
    </ul>
  </div>
  <div class="pl-card-body">
    <p class="pl-card-text">Zestawienie za październik 2026 — 14 stron, 2,1 MB. Ostatnio otwierany wczoraj.</p>
  </div>
</div>
```

## API

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-iconnav` | Lista ikon w rzędzie. |
| `.pl-iconnav-vertical` | Układ pionowy. |
| `.pl-active` | Aktywna pozycja (na `<li>`). |
| `.pl-disabled` | Wyłączona pozycja (na `<li>`). |
| `.pl-iconnav-divider` | Kreska rozdzielająca grupy (na `<li>`). |
| `.pl-iconnav-bar` | Pasek narzędzi w kapsule z ramką. |
| `.pl-iconnav-pill` | W pełni zaokrąglone pozycje (i kapsuła). |
| `.pl-iconnav-solid` | Aktywna pozycja z pełnym wypełnieniem. |
| `.pl-iconnav-line` | Aktywna pozycja oznaczona kreską. |
| `.pl-iconnav-small`, `.pl-iconnav-large` | Rozmiary. |

### Zmienne CSS

| Zmienna | Domyślnie | Opis |
| --- | --- | --- |
| `--pl-iconnav-size` | `2.25rem` | Rozmiar pola pozycji. |
| `--pl-iconnav-gap` | `0.125rem` | Odstęp między pozycjami. |
| `--pl-iconnav-radius` | `var(--pl-radius-sm)` | Zaokrąglenie pozycji. |
