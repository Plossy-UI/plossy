---
title: Navbar
description: Górny pasek nawigacji — logo, linki z animowanym wskaźnikiem, menu rozwijane i mega-menu, hamburger oraz warianty szklany i pływający.
badge: JS
---

## Podstawowe użycie

Pasek składa się z kontenera `.pl-navbar-container` (tło, ramka) i elementu `.pl-navbar`, w którym układasz sekcje `.pl-navbar-left`, `.pl-navbar-center` i `.pl-navbar-right`. Linki trafiają do listy `.pl-navbar-nav`; aktywną pozycję oznacza `.pl-active` na `<li>`.

```html example flush
<header class="pl-navbar-container">
  <nav class="pl-navbar" aria-label="Główna">
    <div class="pl-navbar-left">
      <a class="pl-navbar-logo" href="#"><span class="pl-navbar-logo-mark"></span> Lorem</a>
      <ul class="pl-navbar-nav">
        <li class="pl-active"><a href="#">Produkt</a></li>
        <li><a href="#">Cennik</a></li>
        <li><a href="#">Klienci</a></li>
        <li><a href="#">Blog</a></li>
      </ul>
    </div>
    <div class="pl-navbar-right">
      <a class="pl-button pl-button-ghost pl-button-small" href="#">Zaloguj się</a>
      <a class="pl-button pl-button-primary pl-button-small" href="#">Wypróbuj</a>
    </div>
  </nav>
</header>
```

## Sekcje

Gdy pasek zawiera `.pl-navbar-center`, sekcje układają się w trzech kolumnach, a środek jest zawsze idealnie wyśrodkowany — niezależnie od szerokości lewej i prawej strony.

```html example flush
<header class="pl-navbar-container">
  <nav class="pl-navbar" aria-label="Sklep">
    <div class="pl-navbar-left">
      <ul class="pl-navbar-nav">
        <li><a href="#">Kolekcja</a></li>
        <li class="pl-active"><a href="#">Nowości</a></li>
        <li><a href="#">Wyprzedaż</a></li>
      </ul>
    </div>
    <div class="pl-navbar-center">
      <a class="pl-navbar-logo" href="#">Lorem</a>
    </div>
    <div class="pl-navbar-right">
      <button class="pl-button pl-button-ghost pl-button-icon pl-button-small" type="button" aria-label="Szukaj"><span data-pl-icon="search"></span></button>
      <button class="pl-button pl-button-ghost pl-button-icon pl-button-small" type="button" aria-label="Koszyk"><span data-pl-icon="shopping-bag"></span></button>
    </div>
  </nav>
</header>
```

## Style nawigacji

Domyślnie aktywną pozycję oznacza krótka kreska pod tekstem, a hover — pigułka wyrastająca ze środka. `.pl-navbar-nav-pill` wypełnia aktywną pozycję „atramentem", a `.pl-navbar-nav-line` przenosi wskaźnik na dolną krawędź paska.

```html example flush
<header class="pl-navbar-container">
  <nav class="pl-navbar" aria-label="Pigułki">
    <div class="pl-navbar-left">
      <a class="pl-navbar-logo" href="#"><span class="pl-navbar-logo-mark"></span> Lorem</a>
    </div>
    <div class="pl-navbar-center">
      <ul class="pl-navbar-nav pl-navbar-nav-pill">
        <li class="pl-active"><a href="#">Przegląd</a></li>
        <li><a href="#">Projekty</a></li>
        <li><a href="#">Zespół</a></li>
        <li><a href="#">Raporty</a></li>
      </ul>
    </div>
    <div class="pl-navbar-right">
      <img class="pl-avatar pl-avatar-small" src="/img/avatar-2.svg" alt="Marta Wolska" width="32" height="32">
    </div>
  </nav>
</header>
<header class="pl-navbar-container">
  <nav class="pl-navbar" aria-label="Linia">
    <div class="pl-navbar-left">
      <a class="pl-navbar-logo" href="#"><span class="pl-navbar-logo-mark"></span> Lorem</a>
      <ul class="pl-navbar-nav pl-navbar-nav-line">
        <li class="pl-active"><a href="#">Przegląd</a></li>
        <li><a href="#">Projekty</a></li>
        <li><a href="#">Zespół</a></li>
        <li><a href="#">Raporty</a></li>
      </ul>
    </div>
  </nav>
</header>
```

## Ikony, elementy i podtytuły

W linkach możesz umieszczać ikony i znaczki. `.pl-navbar-item` to pojemnik na dowolną treść (tekst, formularz, status), a `.pl-navbar-subtitle` dodaje drugi wiersz pod etykietą linku.

```html example flush
<header class="pl-navbar-container">
  <nav class="pl-navbar" aria-label="Aplikacja">
    <div class="pl-navbar-left">
      <ul class="pl-navbar-nav">
        <li class="pl-active"><a href="#"><span data-pl-icon="layout-dashboard"></span> Pulpit</a></li>
        <li><a href="#"><span data-pl-icon="mail"></span> Wiadomości <span class="pl-badge pl-badge-primary pl-badge-small">3</span></a></li>
        <li>
          <a href="#">
            <span data-pl-icon="rocket"></span>
            <span>Wdrożenia <span class="pl-navbar-subtitle">ostatnie: 14 min temu</span></span>
          </a>
        </li>
      </ul>
    </div>
    <div class="pl-navbar-right">
      <div class="pl-navbar-item"><span class="pl-badge pl-badge-dot pl-badge-success"></span> Wszystkie systemy działają</div>
    </div>
  </nav>
</header>
```

## Menu rozwijane

Menu to Drop umieszczony bezpośrednio po linku: `<div class="pl-drop pl-navbar-dropdown" data-pl-drop="mode: hover">` z listą `.pl-dropdown-nav`. Element `.pl-navbar-caret` rysuje strzałkę, która obraca się po otwarciu.

```html example flush tall
<header class="pl-navbar-container">
  <nav class="pl-navbar" aria-label="Z menu">
    <div class="pl-navbar-left">
      <a class="pl-navbar-logo" href="#"><span class="pl-navbar-logo-mark"></span> Lorem</a>
      <ul class="pl-navbar-nav">
        <li>
          <a href="#">Produkt <span class="pl-navbar-caret"></span></a>
          <div class="pl-drop pl-navbar-dropdown" data-pl-drop="mode: hover">
            <ul class="pl-dropdown-nav">
              <li class="pl-nav-header">Platforma</li>
              <li><a href="#"><span data-pl-icon="chart-line"></span> Analityka</a></li>
              <li><a href="#"><span data-pl-icon="zap"></span> Automatyzacje</a></li>
              <li><a href="#"><span data-pl-icon="puzzle"></span> Integracje</a></li>
              <li class="pl-nav-divider"></li>
              <li><a href="#"><span data-pl-icon="sparkles"></span> Co nowego</a></li>
            </ul>
          </div>
        </li>
        <li>
          <a href="#">Zasoby <span class="pl-navbar-caret"></span></a>
          <div class="pl-drop pl-navbar-dropdown" data-pl-drop="mode: hover">
            <ul class="pl-dropdown-nav">
              <li><a href="#">Dokumentacja</a></li>
              <li><a href="#">Poradniki</a></li>
              <li><a href="#">Dziennik zmian</a></li>
            </ul>
          </div>
        </li>
        <li><a href="#">Cennik</a></li>
      </ul>
    </div>
    <div class="pl-navbar-right">
      <a class="pl-button pl-button-secondary pl-button-small" href="#">Umów demo</a>
    </div>
  </nav>
</header>
```

## Mega-menu

Wewnątrz Dropa użyj `.pl-navbar-dropdown-grid` — każde dziecko staje się kolumną oddzieloną cienką linią. Kafel `.pl-navbar-dropdown-feature` wyróżnia wybraną treść. Na wąskich ekranach kolumny układają się jedna pod drugą.

```html example flush tall
<header class="pl-navbar-container">
  <nav class="pl-navbar" aria-label="Mega-menu">
    <div class="pl-navbar-left">
      <a class="pl-navbar-logo" href="#"><span class="pl-navbar-logo-mark"></span> Lorem</a>
      <ul class="pl-navbar-nav">
        <li>
          <a href="#">Rozwiązania <span class="pl-navbar-caret"></span></a>
          <div class="pl-drop pl-navbar-dropdown" data-pl-drop="mode: click">
            <div class="pl-navbar-dropdown-grid">
              <ul class="pl-dropdown-nav">
                <li class="pl-nav-header">Dla zespołów</li>
                <li><a href="#">Marketing</a></li>
                <li><a href="#">Sprzedaż</a></li>
                <li><a href="#">Obsługa klienta</a></li>
                <li><a href="#">Produkt</a></li>
              </ul>
              <ul class="pl-dropdown-nav">
                <li class="pl-nav-header">Według wielkości</li>
                <li><a href="#">Startupy</a></li>
                <li><a href="#">Średnie firmy</a></li>
                <li><a href="#">Korporacje</a></li>
                <li><a href="#">Agencje</a></li>
              </ul>
              <a class="pl-navbar-dropdown-feature" href="#">
                <strong>Raport 2026</strong>
                <span>Jak 400 zespołów skróciło czas wdrożeń o połowę.</span>
              </a>
            </div>
          </div>
        </li>
        <li><a href="#">Cennik</a></li>
        <li><a href="#">Kontakt</a></li>
      </ul>
    </div>
  </nav>
</header>
```

## Hamburger

`.pl-navbar-toggle` to przycisk z trzema kreskami rysowanymi w CSS. Gdy dostanie klasę `.pl-open` albo atrybut `aria-expanded="true"` (ustawia go m.in. Toggle), kreski sprężyście składają się w „X".

```html example center
<button class="pl-navbar-toggle" id="demo-navbar-burger" type="button" aria-label="Menu" aria-expanded="false"></button>
<button class="pl-navbar-toggle pl-open" type="button" aria-label="Zamknij menu"></button>
```

```js example-js
const burger = document.querySelector('#demo-navbar-burger');

burger.addEventListener('click', () => {
  const open = burger.getAttribute('aria-expanded') === 'true';
  burger.setAttribute('aria-expanded', String(!open));
});
```

## Wzorzec mobilny

Na małych ekranach schowaj linki (`.pl-visible@m`) i pokaż hamburger (`.pl-hidden@m`), który przez `data-pl-toggle` otwiera panel Offcanvas z nawigacją `.pl-nav`. Zmniejsz okno poniżej 960 px, aby zobaczyć przełączenie — albo po prostu kliknij przycisk.

```html example flush
<header class="pl-navbar-container">
  <nav class="pl-navbar" aria-label="Responsywna">
    <div class="pl-navbar-left">
      <a class="pl-navbar-logo" href="#"><span class="pl-navbar-logo-mark"></span> Lorem</a>
      <ul class="pl-navbar-nav pl-visible@m">
        <li class="pl-active"><a href="#">Produkt</a></li>
        <li><a href="#">Cennik</a></li>
        <li><a href="#">Blog</a></li>
      </ul>
    </div>
    <div class="pl-navbar-right">
      <a class="pl-button pl-button-primary pl-button-small" href="#">Wypróbuj</a>
      <button class="pl-navbar-toggle" type="button" aria-label="Otwórz menu" data-pl-toggle="#demo-navbar-offcanvas"></button>
    </div>
  </nav>
</header>

<dialog class="pl-offcanvas" id="demo-navbar-offcanvas" data-pl-offcanvas="side: right">
  <div class="pl-offcanvas-bar">
    <button class="pl-close" type="button" aria-label="Zamknij" data-pl-offcanvas-close></button>
    <ul class="pl-nav pl-nav-primary" style="margin-top: 2rem">
      <li class="pl-active"><a href="#">Produkt</a></li>
      <li><a href="#">Cennik</a></li>
      <li><a href="#">Blog</a></li>
      <li><a href="#">Kontakt</a></li>
    </ul>
  </div>
</dialog>
```

W gotowym projekcie dodaj do przycisku klasę `.pl-hidden@m`, aby zniknął na dużych ekranach.

## Warianty paska

### Przezroczysty

`.pl-navbar-transparent` usuwa tło i ramkę — pasek stapia się z sekcją, na której leży.

```html example flush
<div style="background: var(--pl-primary-soft)">
  <header class="pl-navbar-container pl-navbar-transparent">
    <nav class="pl-navbar" aria-label="Przezroczysta">
      <div class="pl-navbar-left">
        <a class="pl-navbar-logo" href="#"><span class="pl-navbar-logo-mark"></span> Lorem</a>
      </div>
      <div class="pl-navbar-right">
        <ul class="pl-navbar-nav">
          <li class="pl-active"><a href="#">Start</a></li>
          <li><a href="#">O nas</a></li>
          <li><a href="#">Kontakt</a></li>
        </ul>
      </div>
    </nav>
  </header>
  <div style="padding: 2.5rem 1.25rem 3.5rem; text-align: center">
    <h3>Jasność w każdym projekcie</h3>
    <p style="color: var(--pl-text-muted)">Planuj, buduj i publikuj w jednym miejscu.</p>
  </div>
</div>
```

### Szklany

`.pl-navbar-glass` nadaje półprzezroczyste tło z rozmyciem — treść przewijana pod paskiem delikatnie przez niego prześwituje. Najlepiej działa razem z przyklejaniem.

```html example flush
<div style="position: relative; height: 18rem; overflow: auto; isolation: isolate">
  <header class="pl-navbar-container pl-navbar-glass pl-navbar-sticky">
    <nav class="pl-navbar" aria-label="Szklana">
      <div class="pl-navbar-left">
        <a class="pl-navbar-logo" href="#"><span class="pl-navbar-logo-mark"></span> Lorem</a>
      </div>
      <div class="pl-navbar-right">
        <ul class="pl-navbar-nav">
          <li class="pl-active"><a href="#">Galeria</a></li>
          <li><a href="#">Autorzy</a></li>
          <li><a href="#">Licencje</a></li>
        </ul>
      </div>
    </nav>
  </header>
  <img src="/img/photo-2.svg" alt="" style="display: block; width: 100%; margin-top: -4rem">
  <img src="/img/photo-5.svg" alt="" style="display: block; width: 100%">
</div>
```

### Pływający

`.pl-navbar-floating` to znak rozpoznawczy Plossy: pasek odkleja się od krawędzi i zamienia w zaokrągloną, szklaną pigułkę z miękkim cieniem. Maksymalną szerokość ustawia zmienna `--pl-navbar-max`.

```html example flush
<div style="position: relative; height: 20rem; overflow: auto; isolation: isolate">
  <header class="pl-navbar-container pl-navbar-floating pl-navbar-sticky" style="--pl-navbar-max: 40rem">
    <nav class="pl-navbar" aria-label="Pływająca">
      <div class="pl-navbar-left">
        <a class="pl-navbar-logo" href="#"><span class="pl-navbar-logo-mark"></span> Lorem</a>
      </div>
      <div class="pl-navbar-center">
        <ul class="pl-navbar-nav">
          <li class="pl-active"><a href="#">Produkt</a></li>
          <li><a href="#">Cennik</a></li>
          <li><a href="#">Blog</a></li>
        </ul>
      </div>
      <div class="pl-navbar-right">
        <a class="pl-button pl-button-primary pl-button-small pl-button-pill" href="#">Wypróbuj</a>
      </div>
    </nav>
  </header>
  <img src="/img/photo-6.svg" alt="" style="display: block; width: 100%; margin-top: -4.25rem">
  <img src="/img/photo-1.svg" alt="" style="display: block; width: 100%">
</div>
```

## Przyklejanie

Najprościej przykleić pasek klasą `.pl-navbar-sticky` (`position: sticky`). Jeśli potrzebujesz granic, animacji lub trybu „pokaż przy przewijaniu w górę" opartych na komponencie Sticky, użyj atrybutu `data-pl-sticky` na kontenerze:

```html
<header class="pl-navbar-container" data-pl-sticky="show-on-up: true; animation: pl-animation-slide-down">
  <nav class="pl-navbar">…</nav>
</header>
```

## Reakcja na przewijanie

Atrybut `data-pl-navbar` dodaje paskowi klasę `.pl-navbar-scrolled` po przewinięciu o `offset` pikseli — pasek staje się niższy i dostaje cień (przezroczysty zyskuje szklane tło). Z opcją `hide: true` pasek chowa się przy przewijaniu w dół i wraca przy przewijaniu w górę. Przewiń poniższy podgląd.

```html example flush
<div id="demo-navbar-scroll" style="position: relative; height: 20rem; overflow: auto; isolation: isolate">
  <header class="pl-navbar-container pl-navbar-transparent pl-navbar-sticky" data-pl-navbar="container: #demo-navbar-scroll; hide: true; hide-offset: 120">
    <nav class="pl-navbar" aria-label="Reagująca na przewijanie">
      <div class="pl-navbar-left">
        <a class="pl-navbar-logo" href="#"><span class="pl-navbar-logo-mark"></span> Lorem</a>
      </div>
      <div class="pl-navbar-right">
        <ul class="pl-navbar-nav">
          <li class="pl-active"><a href="#">Historia</a></li>
          <li><a href="#">Zespół</a></li>
          <li><a href="#">Kariera</a></li>
        </ul>
      </div>
    </nav>
  </header>
  <div style="padding: 1.5rem 1.25rem 2rem">
    <h3>Przewiń w dół, potem w górę</h3>
    <p>Po kilku pikselach pasek dostaje tło i cień. Dalej — chowa się, żeby nie zasłaniać treści, i wraca, gdy tylko zaczniesz przewijać w górę.</p>
    <img src="/img/photo-4.svg" alt="" style="display: block; width: 100%; border-radius: var(--pl-radius-md)">
    <p style="margin-top: 1rem">Zaczynaliśmy w 2019 roku w trzyosobowym składzie. Dziś z naszych narzędzi korzysta ponad dwa tysiące zespołów w całej Europie.</p>
    <img src="/img/photo-7.svg" alt="" style="display: block; width: 100%; border-radius: var(--pl-radius-md)">
  </div>
</div>
```

## Rozmiary

`.pl-navbar-small` i `.pl-navbar-large` na kontenerze zmieniają wysokość paska (zmienna `--pl-navbar-h`).

```html example flush
<header class="pl-navbar-container pl-navbar-small">
  <nav class="pl-navbar" aria-label="Mała">
    <div class="pl-navbar-left">
      <a class="pl-navbar-logo" href="#"><span class="pl-navbar-logo-mark"></span> Lorem</a>
      <ul class="pl-navbar-nav">
        <li class="pl-active"><a href="#">Mały</a></li>
        <li><a href="#">Pasek</a></li>
      </ul>
    </div>
  </nav>
</header>
<header class="pl-navbar-container pl-navbar-large">
  <nav class="pl-navbar" aria-label="Duża">
    <div class="pl-navbar-left">
      <a class="pl-navbar-logo" href="#"><span class="pl-navbar-logo-mark"></span> Lorem</a>
      <ul class="pl-navbar-nav">
        <li class="pl-active"><a href="#">Duży</a></li>
        <li><a href="#">Pasek</a></li>
      </ul>
    </div>
  </nav>
</header>
```

## API

### Opcje

Opcje przekazujesz w atrybucie na kontenerze: `data-pl-navbar="hide: true; offset: 24"`.

| Opcja | Typ | Domyślnie | Opis |
| --- | --- | --- | --- |
| `offset` | number | `16` | Po ilu pikselach przewinięcia pasek dostaje klasę `cls`. |
| `cls` | string | `pl-navbar-scrolled` | Klasa stanu „przewinięto". |
| `hide` | boolean | `false` | Chowa pasek przy przewijaniu w dół, pokazuje przy przewijaniu w górę. |
| `hide-offset` | number | `240` | Od ilu pikseli przewinięcia pasek może się schować. |
| `tolerance` | number | `6` | Minimalny ruch (px), który zmienia stan. |
| `container` | string | `null` | Selektor przewijanego kontenera; domyślnie okno. |

### Metody

Instancję pobierzesz przez `Plossy.navbar(element)`.

| Metoda | Opis |
| --- | --- |
| `show()` | Pokazuje schowany pasek. |
| `hide()` | Chowa pasek. |
| `update()` | Przelicza stan na podstawie pozycji przewijania. |

### Zdarzenia

| Zdarzenie | Opis |
| --- | --- |
| `pl:scrolled` | Zmiana stanu „przewinięto"; `detail.scrolled` to `true` lub `false`. |
| `pl:hide` | Pasek został schowany. |
| `pl:show` | Pasek wrócił. |

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-navbar-container` | Zewnętrzny kontener: tło, ramka, warianty. |
| `.pl-navbar` | Pasek z sekcjami. |
| `.pl-navbar-left` / `-center` / `-right` | Sekcje paska. |
| `.pl-navbar-nav` | Lista linków (`li > a`). |
| `.pl-navbar-nav-pill` / `.pl-navbar-nav-line` | Style wskaźnika aktywnej pozycji. |
| `.pl-navbar-item` | Pojemnik na dowolną treść. |
| `.pl-navbar-logo` | Logo / nazwa marki. |
| `.pl-navbar-logo-mark` | Znak graficzny rysowany w CSS. |
| `.pl-navbar-subtitle` | Drugi wiersz pod etykietą linku. |
| `.pl-navbar-caret` | Strzałka przy pozycji z menu. |
| `.pl-navbar-toggle` | Hamburger; `.pl-open` lub `aria-expanded="true"` zamienia go w „X". |
| `.pl-navbar-dropdown` | Menu rozwijane (razem z `.pl-drop`). |
| `.pl-navbar-dropdown-grid` | Układ kolumn mega-menu. |
| `.pl-navbar-dropdown-feature` | Wyróżniony kafel w mega-menu. |
| `.pl-navbar-transparent` | Bez tła i ramki. |
| `.pl-navbar-glass` | Matowe szkło. |
| `.pl-navbar-floating` | Pływająca pigułka. |
| `.pl-navbar-sticky` | Przyklejenie do górnej krawędzi. |
| `.pl-navbar-scrolled` | Stan po przewinięciu (dodawany przez JS). |
| `.pl-navbar-hidden` | Pasek schowany (dodawany przez JS). |
| `.pl-navbar-small` / `.pl-navbar-large` | Wysokość paska. |

### Zmienne CSS

| Zmienna | Domyślnie | Opis |
| --- | --- | --- |
| `--pl-navbar-h` | `4rem` | Wysokość paska. |
| `--pl-navbar-px` | `1.25rem` | Poziomy padding. |
| `--pl-navbar-bg` | `--pl-surface` | Tło kontenera. |
| `--pl-navbar-max` | `60rem` | Maksymalna szerokość paska pływającego. |
| `--pl-navbar-offset` | `0.75rem` | Odstęp paska pływającego od krawędzi. |
