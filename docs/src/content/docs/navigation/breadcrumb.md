---
title: Breadcrumb
description: Okruszki pokazują, gdzie w strukturze serwisu znajduje się użytkownik. Separatory rysuje CSS, więc znaczniki pozostają czystą listą linków.
---

## Podstawowe użycie

Dodaj klasę `.pl-breadcrumb` do listy `<ul>`. Ostatnia pozycja — bieżąca strona — to zwykły `<span>` z atrybutem `aria-current="page"`. Całość umieść w `<nav aria-label="…">`.

```html example
<nav aria-label="Okruszki">
  <ul class="pl-breadcrumb">
    <li><a href="#">Sklep</a></li>
    <li><a href="#">Meble</a></li>
    <li><a href="#">Fotele</a></li>
    <li><span aria-current="page">Fotel Lund, len naturalny</span></li>
  </ul>
</nav>
```

## Separatory

Domyślnym separatorem jest ukośnik. Modyfikatory `.pl-breadcrumb-chevron`, `.pl-breadcrumb-dot` i `.pl-breadcrumb-arrow` podmieniają go na strzałkę, kropkę lub strzałkę tekstową.

```html example column
<ul class="pl-breadcrumb pl-breadcrumb-chevron">
  <li><a href="#">Dokumentacja</a></li>
  <li><a href="#">Nawigacja</a></li>
  <li><span aria-current="page">Breadcrumb</span></li>
</ul>
<ul class="pl-breadcrumb pl-breadcrumb-dot">
  <li><a href="#">Magazyn</a></li>
  <li><a href="#">Wywiady</a></li>
  <li><span aria-current="page">Rozmowa z projektantką</span></li>
</ul>
<ul class="pl-breadcrumb pl-breadcrumb-arrow">
  <li><a href="#">Koszyk</a></li>
  <li><a href="#">Dostawa</a></li>
  <li><span aria-current="page">Płatność</span></li>
</ul>
```

## Z ikonami

Ikona może zastąpić etykietę pierwszej pozycji albo stać obok tekstu. Pamiętaj o `aria-label`, gdy link nie ma tekstu.

```html example column
<ul class="pl-breadcrumb pl-breadcrumb-chevron">
  <li><a href="#" aria-label="Strona główna"><span data-pl-icon="home"></span></a></li>
  <li><a href="#">Projekty</a></li>
  <li><a href="#">Aplikacja mobilna</a></li>
  <li><span aria-current="page">Ustawienia</span></li>
</ul>
<ul class="pl-breadcrumb">
  <li><a href="#"><span data-pl-icon="folder"></span> Dysk</a></li>
  <li><a href="#"><span data-pl-icon="folder"></span> Faktury</a></li>
  <li><span aria-current="page"><span data-pl-icon="file-text"></span> 2026-11.pdf</span></li>
</ul>
```

## Pigułka

`.pl-breadcrumb-pill` zamyka okruszki w zaokrąglonej ramce, a bieżącą pozycję wyróżnia kolorem akcentu. Dobrze wygląda nad nagłówkiem strony lub na zdjęciu.

```html example
<ul class="pl-breadcrumb pl-breadcrumb-pill pl-breadcrumb-chevron">
  <li><a href="#" aria-label="Strona główna"><span data-pl-icon="home"></span></a></li>
  <li><a href="#">Zespół</a></li>
  <li><a href="#">Uprawnienia</a></li>
  <li><span aria-current="page">Role</span></li>
</ul>
```

## Skracanie długich ścieżek

Z klasą `.pl-breadcrumb-truncate` okruszki nie zawijają się: środkowe pozycje są obcinane wielokropkiem, a pierwsza i ostatnia pozostają czytelne. Maksymalną szerokość środkowych pozycji ustawia zmienna `--pl-breadcrumb-truncate`.

```html example narrow
<ul class="pl-breadcrumb pl-breadcrumb-chevron pl-breadcrumb-truncate">
  <li><a href="#">Sklep</a></li>
  <li><a href="#">Wyposażenie wnętrz i dekoracje</a></li>
  <li><a href="#">Oświetlenie sufitowe i lampy wiszące</a></li>
  <li><span aria-current="page">Lampa Aalto, mosiądz szczotkowany</span></li>
</ul>
```

Gdy ścieżka jest bardzo głęboka, środkowe poziomy możesz schować w menu (kontrakt Drop).

```html example
<ul class="pl-breadcrumb pl-breadcrumb-chevron">
  <li><a href="#">Dysk</a></li>
  <li>
    <a href="#" aria-label="Pokaż ukryte poziomy"><span data-pl-icon="ellipsis"></span></a>
    <div class="pl-drop pl-dropdown" data-pl-drop="mode: click; pos: bottom-start">
      <ul class="pl-dropdown-nav">
        <li><a href="#">Klienci</a></li>
        <li><a href="#">Studio Forma</a></li>
        <li><a href="#">Rebranding 2026</a></li>
      </ul>
    </div>
  </li>
  <li><a href="#">Makiety</a></li>
  <li><span aria-current="page">Strona główna v3</span></li>
</ul>
```

## Rozmiary

```html example column
<ul class="pl-breadcrumb pl-breadcrumb-small">
  <li><a href="#">Konto</a></li>
  <li><a href="#">Rozliczenia</a></li>
  <li><span aria-current="page">Faktury</span></li>
</ul>
<ul class="pl-breadcrumb">
  <li><a href="#">Konto</a></li>
  <li><a href="#">Rozliczenia</a></li>
  <li><span aria-current="page">Faktury</span></li>
</ul>
<ul class="pl-breadcrumb pl-breadcrumb-large">
  <li><a href="#">Konto</a></li>
  <li><a href="#">Rozliczenia</a></li>
  <li><span aria-current="page">Faktury</span></li>
</ul>
```

## Pozycja wyłączona

Klasa `.pl-disabled` na `<li>` wyszarza pozycję i blokuje kliknięcie — przydatne, gdy poziom nie ma własnej strony.

```html example
<ul class="pl-breadcrumb">
  <li><a href="#">Panel</a></li>
  <li class="pl-disabled"><a href="#">Archiwum</a></li>
  <li><span aria-current="page">Raport kwartalny</span></li>
</ul>
```

## API

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-breadcrumb` | Lista okruszków (`<ul>` lub `<ol>`). |
| `.pl-breadcrumb-chevron` | Separator w kształcie strzałki. |
| `.pl-breadcrumb-dot` | Separator-kropka. |
| `.pl-breadcrumb-arrow` | Separator „→". |
| `.pl-breadcrumb-pill` | Okruszki w zaokrąglonej ramce. |
| `.pl-breadcrumb-truncate` | Jedna linia, środkowe pozycje obcinane. |
| `.pl-breadcrumb-small` / `.pl-breadcrumb-large` | Rozmiar tekstu. |
| `.pl-active` | Bieżąca pozycja (alternatywa dla `aria-current`). |
| `.pl-disabled` | Pozycja nieklikalna. |

### Zmienne CSS

| Zmienna | Domyślnie | Opis |
| --- | --- | --- |
| `--pl-breadcrumb-gap` | `0.3rem` | Odstęp wokół separatora. |
| `--pl-breadcrumb-truncate` | `8rem` | Maksymalna szerokość skracanej pozycji. |
