---
title: Nav
description: Pionowa nawigacja do paneli bocznych, menu i spisów treści — z nagłówkami, ikonami, licznikami oraz zwijanymi podmenu.
badge: JS
---

## Podstawowe użycie

Lista `.pl-nav` potrzebuje jednego ze stylów: `.pl-nav-default`, `.pl-nav-primary` lub `.pl-nav-pill`. Aktywną pozycję oznacz klasą `.pl-active` na `<li>` — w stylu domyślnym pojawia się przy niej animowana kreska.

```html example narrow
<ul class="pl-nav pl-nav-default">
  <li class="pl-active"><a href="#">Przegląd</a></li>
  <li><a href="#">Zamówienia</a></li>
  <li><a href="#">Klienci</a></li>
  <li><a href="#">Raporty</a></li>
  <li class="pl-disabled"><a href="#">Integracje (wkrótce)</a></li>
</ul>
```

## Nagłówki i separatory

`.pl-nav-header` grupuje pozycje pod małą etykietą, a `.pl-nav-divider` rysuje linię. Obie klasy stawiasz na `<li>` — działają także wewnątrz menu rozwijanego `.pl-dropdown-nav`.

```html example narrow
<ul class="pl-nav pl-nav-default">
  <li class="pl-nav-header">Sprzedaż</li>
  <li class="pl-active"><a href="#">Zamówienia</a></li>
  <li><a href="#">Zwroty</a></li>
  <li><a href="#">Kody rabatowe</a></li>
  <li class="pl-nav-header">Katalog</li>
  <li><a href="#">Produkty</a></li>
  <li><a href="#">Kolekcje</a></li>
  <li class="pl-nav-divider"></li>
  <li><a href="#">Ustawienia sklepu</a></li>
</ul>
```

## Ikony i liczniki

Ikona na początku linku dostaje właściwy rozmiar i odstęp. Znaczek `.pl-badge` albo dowolny element z klasą `.pl-nav-meta` na końcu linku jest dosuwany do prawej krawędzi.

```html example narrow
<ul class="pl-nav pl-nav-default">
  <li class="pl-active">
    <a href="#"><span data-pl-icon="mail"></span> Odebrane <span class="pl-badge pl-badge-primary">12</span></a>
  </li>
  <li>
    <a href="#"><span data-pl-icon="star"></span> Oznaczone <span class="pl-nav-meta">4</span></a>
  </li>
  <li>
    <a href="#"><span data-pl-icon="send"></span> Wysłane</a>
  </li>
  <li>
    <a href="#"><span data-pl-icon="file-text"></span> Szkice <span class="pl-nav-meta">2</span></a>
  </li>
  <li class="pl-nav-divider"></li>
  <li>
    <a href="#"><span data-pl-icon="trash-2"></span> Kosz</a>
  </li>
</ul>
```

## Podmenu

Zagnieżdżona lista `.pl-nav-sub` tworzy drugi poziom z linią prowadzącą. Rodzic z klasą `.pl-parent` dostaje strzałkę. Po dodaniu atrybutu `data-pl-nav` podmenu zwijają się i rozwijają z animacją; otwarte na starcie jest to z klasą `.pl-open` oraz to, które zawiera aktywną pozycję.

```html example narrow
<ul class="pl-nav pl-nav-default" data-pl-nav>
  <li><a href="#"><span data-pl-icon="layout-dashboard"></span> Pulpit</a></li>
  <li class="pl-parent">
    <a href="#"><span data-pl-icon="package"></span> Produkty</a>
    <ul class="pl-nav-sub">
      <li><a href="#">Wszystkie produkty</a></li>
      <li class="pl-active"><a href="#">Stany magazynowe</a></li>
      <li><a href="#">Kategorie</a></li>
    </ul>
  </li>
  <li class="pl-parent">
    <a href="#"><span data-pl-icon="chart-bar"></span> Analityka <span class="pl-badge pl-badge-spark">Nowe</span></a>
    <ul class="pl-nav-sub">
      <li><a href="#">Sprzedaż</a></li>
      <li><a href="#">Ruch na stronie</a></li>
      <li><a href="#">Konwersje</a></li>
    </ul>
  </li>
  <li class="pl-parent">
    <a href="#"><span data-pl-icon="settings"></span> Ustawienia</a>
    <ul class="pl-nav-sub">
      <li><a href="#">Ogólne</a></li>
      <li><a href="#">Płatności</a></li>
      <li><a href="#">Dostawa</a></li>
    </ul>
  </li>
</ul>
```

Opcja `multiple: true` pozwala trzymać otwartych kilka podmenu naraz. Bez atrybutu `data-pl-nav` podmenu są po prostu zawsze widoczne.

```html example narrow
<ul class="pl-nav pl-nav-default" data-pl-nav="multiple: true">
  <li class="pl-parent pl-open">
    <a href="#">Pierwsze kroki</a>
    <ul class="pl-nav-sub">
      <li><a href="#">Instalacja</a></li>
      <li><a href="#">Struktura projektu</a></li>
    </ul>
  </li>
  <li class="pl-parent pl-open">
    <a href="#">Dostosowywanie</a>
    <ul class="pl-nav-sub">
      <li><a href="#">Tokeny</a></li>
      <li><a href="#">Ciemny motyw</a></li>
    </ul>
  </li>
</ul>
```

## Styl „pill"

`.pl-nav-pill` zaokrągla pozycje, a aktywną wypełnia „atramentem".

```html example narrow
<ul class="pl-nav pl-nav-pill">
  <li class="pl-active"><a href="#"><span data-pl-icon="home"></span> Start</a></li>
  <li><a href="#"><span data-pl-icon="compass"></span> Odkrywaj <span class="pl-nav-meta">128</span></a></li>
  <li><a href="#"><span data-pl-icon="bookmark"></span> Zapisane</a></li>
  <li><a href="#"><span data-pl-icon="user"></span> Profil</a></li>
</ul>
```

## Styl „primary"

`.pl-nav-primary` to duża typografia nagłówkowa — do menu pełnoekranowych, paneli offcanvas i stopek. Aktywną pozycję poprzedza limonkowa iskra, a hover lekko przesuwa tekst.

```html example
<ul class="pl-nav pl-nav-primary">
  <li class="pl-active"><a href="#">Realizacje</a></li>
  <li><a href="#">Studio</a></li>
  <li><a href="#">Dziennik</a></li>
  <li><a href="#">Kontakt</a></li>
</ul>
```

## Wyśrodkowanie

`.pl-nav-center` centruje pozycje — przydatne w menu mobilnym i modalach.

```html example
<ul class="pl-nav pl-nav-primary pl-nav-center">
  <li><a href="#">Kolekcja</a></li>
  <li class="pl-active"><a href="#">Nowości</a></li>
  <li><a href="#">Wyprzedaż</a></li>
</ul>
```

## Rozmiary

```html example row
<ul class="pl-nav pl-nav-default pl-nav-small" style="width: 12rem">
  <li class="pl-nav-header">Mały</li>
  <li class="pl-active"><a href="#">Profil</a></li>
  <li><a href="#">Bezpieczeństwo</a></li>
  <li><a href="#">Powiadomienia</a></li>
</ul>
<ul class="pl-nav pl-nav-default" style="width: 13rem">
  <li class="pl-nav-header">Domyślny</li>
  <li class="pl-active"><a href="#">Profil</a></li>
  <li><a href="#">Bezpieczeństwo</a></li>
  <li><a href="#">Powiadomienia</a></li>
</ul>
<ul class="pl-nav pl-nav-default pl-nav-large" style="width: 14rem">
  <li class="pl-nav-header">Duży</li>
  <li class="pl-active"><a href="#">Profil</a></li>
  <li><a href="#">Bezpieczeństwo</a></li>
  <li><a href="#">Powiadomienia</a></li>
</ul>
```

## W karcie i w menu rozwijanym

Nav dobrze czuje się w karcie panelu bocznego. Nagłówki i separatory wyglądają tak samo w menu Drop.

```html example row
<div class="pl-card" style="width: 16rem">
  <div class="pl-card-body">
    <ul class="pl-nav pl-nav-default">
      <li class="pl-nav-header">Konto</li>
      <li class="pl-active"><a href="#"><span data-pl-icon="user"></span> Dane osobowe</a></li>
      <li><a href="#"><span data-pl-icon="credit-card"></span> Płatności</a></li>
      <li><a href="#"><span data-pl-icon="bell"></span> Powiadomienia</a></li>
      <li class="pl-nav-divider"></li>
      <li><a href="#"><span data-pl-icon="log-out"></span> Wyloguj</a></li>
    </ul>
  </div>
</div>
<div>
  <button class="pl-button" type="button">Menu konta</button>
  <div class="pl-drop pl-dropdown" data-pl-drop="mode: click; pos: bottom-start">
    <ul class="pl-dropdown-nav">
      <li class="pl-nav-header">Konto</li>
      <li><a href="#">Dane osobowe</a></li>
      <li><a href="#">Płatności</a></li>
      <li class="pl-nav-divider"></li>
      <li><a href="#">Wyloguj</a></li>
    </ul>
  </div>
</div>
```

## API

### Opcje

Opcje przekazujesz w atrybucie: `data-pl-nav="multiple: true"`.

| Opcja | Typ | Domyślnie | Opis |
| --- | --- | --- | --- |
| `multiple` | boolean | `false` | Pozwala otworzyć kilka podmenu jednocześnie. |
| `collapsible` | boolean | `true` | Pozwala zamknąć otwarte podmenu kliknięciem. |
| `duration` | number | `280` | Czas animacji w milisekundach. |

### Metody

Instancję pobierzesz przez `Plossy.nav(element)`.

| Metoda | Opis |
| --- | --- |
| `toggle(item)` | Przełącza podmenu (indeks pozycji `.pl-parent` lub element). |
| `show(item)` | Rozwija podmenu. |
| `hide(item)` | Zwija podmenu. |

### Zdarzenia

| Zdarzenie | Opis |
| --- | --- |
| `pl:beforeshow` | Przed rozwinięciem. Można anulować przez `preventDefault()`. |
| `pl:show` / `pl:shown` | Początek i koniec animacji rozwijania. |
| `pl:beforehide` | Przed zwinięciem. Można anulować. |
| `pl:hide` / `pl:hidden` | Początek i koniec animacji zwijania. |

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-nav` | Lista nawigacji. |
| `.pl-nav-default` | Styl domyślny z kreską przy aktywnej pozycji. |
| `.pl-nav-pill` | Zaokrąglone pozycje, aktywna wypełniona. |
| `.pl-nav-primary` | Duża typografia nagłówkowa. |
| `.pl-nav-header` | Etykieta grupy (na `<li>`). |
| `.pl-nav-divider` | Linia oddzielająca (na `<li>`). |
| `.pl-nav-sub` | Lista drugiego poziomu. |
| `.pl-parent` | Pozycja z podmenu; `.pl-open` oznacza rozwiniętą. |
| `.pl-nav-meta` | Drobna informacja dosunięta do prawej (np. licznik). |
| `.pl-nav-center` | Wyśrodkowanie pozycji. |
| `.pl-nav-small` / `.pl-nav-large` | Rozmiar. |
| `.pl-active` / `.pl-disabled` | Stany pozycji (na `<li>`). |
