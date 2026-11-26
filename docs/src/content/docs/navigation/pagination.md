---
title: Pagination
description: Stronicowanie list i wyników — numery stron, strzałki rysowane w CSS, wielokropek, kilka stylów oraz prosty pager „poprzednia / następna".
---

## Podstawowe użycie

Dodaj klasę `.pl-pagination` do listy i umieść ją w `<nav aria-label="…">`. Bieżącą stronę oznacz klasą `.pl-active` na `<li>` (oraz `aria-current="page"` na linku), niedostępne pozycje — `.pl-disabled`. Wielokropek to zwykły `<span>`.

```html example
<nav aria-label="Stronicowanie wyników">
  <ul class="pl-pagination">
    <li class="pl-disabled"><a href="#" aria-label="Poprzednia strona"><span class="pl-pagination-previous"></span></a></li>
    <li class="pl-active"><a href="#" aria-current="page">1</a></li>
    <li><a href="#">2</a></li>
    <li><a href="#">3</a></li>
    <li><span>…</span></li>
    <li><a href="#">24</a></li>
    <li><a href="#" aria-label="Następna strona"><span class="pl-pagination-next"></span></a></li>
  </ul>
</nav>
```

## Strzałki z etykietami

Elementy `.pl-pagination-previous` i `.pl-pagination-next` to strzałki rysowane w CSS — przy hoverze lekko „uciekają" w swoją stronę. Możesz połączyć je z tekstem.

```html example
<ul class="pl-pagination">
  <li><a href="#"><span class="pl-pagination-previous"></span> Poprzednia</a></li>
  <li><a href="#">4</a></li>
  <li class="pl-active"><a href="#" aria-current="page">5</a></li>
  <li><a href="#">6</a></li>
  <li><a href="#">Następna <span class="pl-pagination-next"></span></a></li>
</ul>
```

## Style

### Pigułki

`.pl-pagination-pill` zaokrągla pozycje do pełnych kół.

```html example
<ul class="pl-pagination pl-pagination-pill">
  <li><a href="#" aria-label="Poprzednia strona"><span class="pl-pagination-previous"></span></a></li>
  <li><a href="#">1</a></li>
  <li class="pl-active"><a href="#" aria-current="page">2</a></li>
  <li><a href="#">3</a></li>
  <li><a href="#">4</a></li>
  <li><a href="#" aria-label="Następna strona"><span class="pl-pagination-next"></span></a></li>
</ul>
```

### Obrys

`.pl-pagination-outline` nadaje każdej pozycji ramkę; aktywna dostaje miękki pierścień w kolorze akcentu.

```html example
<ul class="pl-pagination pl-pagination-outline">
  <li><a href="#" aria-label="Poprzednia strona"><span class="pl-pagination-previous"></span></a></li>
  <li><a href="#">1</a></li>
  <li><a href="#">2</a></li>
  <li class="pl-active"><a href="#" aria-current="page">3</a></li>
  <li><span>…</span></li>
  <li><a href="#">12</a></li>
  <li><a href="#" aria-label="Następna strona"><span class="pl-pagination-next"></span></a></li>
</ul>
```

### Grupa

`.pl-pagination-group` zamyka stronicowanie we wspólnej ramce. Można ją łączyć z `.pl-pagination-pill`.

```html example row
<ul class="pl-pagination pl-pagination-group">
  <li><a href="#" aria-label="Poprzednia strona"><span class="pl-pagination-previous"></span></a></li>
  <li><a href="#">1</a></li>
  <li class="pl-active"><a href="#" aria-current="page">2</a></li>
  <li><a href="#">3</a></li>
  <li><a href="#" aria-label="Następna strona"><span class="pl-pagination-next"></span></a></li>
</ul>
<ul class="pl-pagination pl-pagination-group pl-pagination-pill">
  <li><a href="#" aria-label="Poprzednia strona"><span class="pl-pagination-previous"></span></a></li>
  <li><a href="#">1</a></li>
  <li class="pl-active"><a href="#" aria-current="page">2</a></li>
  <li><a href="#">3</a></li>
  <li><a href="#" aria-label="Następna strona"><span class="pl-pagination-next"></span></a></li>
</ul>
```

## Rozmiary

```html example column
<ul class="pl-pagination pl-pagination-small">
  <li><a href="#" aria-label="Poprzednia strona"><span class="pl-pagination-previous"></span></a></li>
  <li class="pl-active"><a href="#">1</a></li>
  <li><a href="#">2</a></li>
  <li><a href="#">3</a></li>
  <li><a href="#" aria-label="Następna strona"><span class="pl-pagination-next"></span></a></li>
</ul>
<ul class="pl-pagination">
  <li><a href="#" aria-label="Poprzednia strona"><span class="pl-pagination-previous"></span></a></li>
  <li class="pl-active"><a href="#">1</a></li>
  <li><a href="#">2</a></li>
  <li><a href="#">3</a></li>
  <li><a href="#" aria-label="Następna strona"><span class="pl-pagination-next"></span></a></li>
</ul>
<ul class="pl-pagination pl-pagination-large">
  <li><a href="#" aria-label="Poprzednia strona"><span class="pl-pagination-previous"></span></a></li>
  <li class="pl-active"><a href="#">1</a></li>
  <li><a href="#">2</a></li>
  <li><a href="#">3</a></li>
  <li><a href="#" aria-label="Następna strona"><span class="pl-pagination-next"></span></a></li>
</ul>
```

## Wyrównanie

`.pl-pagination-center` i `.pl-pagination-right` wyrównują całość. Klasa `.pl-pagination-push` na `<li>` dosuwa tę pozycję (i kolejne) do prawej — tak zbudujesz układ „poprzednia z lewej, następna z prawej".

```html example
<ul class="pl-pagination pl-pagination-center">
  <li><a href="#" aria-label="Poprzednia strona"><span class="pl-pagination-previous"></span></a></li>
  <li><a href="#">1</a></li>
  <li class="pl-active"><a href="#">2</a></li>
  <li><a href="#">3</a></li>
  <li><a href="#" aria-label="Następna strona"><span class="pl-pagination-next"></span></a></li>
</ul>
<ul class="pl-pagination pl-pagination-right pl-margin-small-top">
  <li><a href="#" aria-label="Poprzednia strona"><span class="pl-pagination-previous"></span></a></li>
  <li><a href="#">1</a></li>
  <li class="pl-active"><a href="#">2</a></li>
  <li><a href="#">3</a></li>
  <li><a href="#" aria-label="Następna strona"><span class="pl-pagination-next"></span></a></li>
</ul>
<ul class="pl-pagination pl-margin-small-top">
  <li><a href="#"><span class="pl-pagination-previous"></span> Nowsze wpisy</a></li>
  <li class="pl-pagination-push"><a href="#">Starsze wpisy <span class="pl-pagination-next"></span></a></li>
</ul>
```

## Ze stopką tabeli

Typowy układ: informacja o zakresie po lewej, stronicowanie po prawej.

```html example
<div class="pl-flex pl-flex-middle pl-flex-between" style="gap: 1rem; flex-wrap: wrap">
  <small style="color: var(--pl-text-muted)">Pozycje <strong>21–30</strong> z 248</small>
  <ul class="pl-pagination pl-pagination-small pl-pagination-outline">
    <li><a href="#" aria-label="Poprzednia strona"><span class="pl-pagination-previous"></span></a></li>
    <li><a href="#">2</a></li>
    <li class="pl-active"><a href="#" aria-current="page">3</a></li>
    <li><a href="#">4</a></li>
    <li><a href="#" aria-label="Następna strona"><span class="pl-pagination-next"></span></a></li>
  </ul>
</div>
```

## Pager

`.pl-pager` to dwie duże karty „poprzednia / następna" — do artykułów i dokumentacji. Etykieta `.pl-pager-label` i tytuł `.pl-pager-title` są opcjonalne. Jeśli jest tylko następna strona, dodaj do `<li>` klasę `.pl-pager-next`.

```html example
<nav aria-label="Sąsiednie artykuły">
  <ul class="pl-pager">
    <li>
      <a href="#">
        <span class="pl-pager-label">Poprzedni</span>
        <span class="pl-pager-title">Tokeny projektowe</span>
      </a>
    </li>
    <li>
      <a href="#">
        <span class="pl-pager-label">Następny</span>
        <span class="pl-pager-title">Ciemny motyw krok po kroku</span>
      </a>
    </li>
  </ul>
</nav>
```

```html example
<ul class="pl-pager">
  <li class="pl-pager-next">
    <a href="#">
      <span class="pl-pager-label">Zacznij tutaj</span>
      <span class="pl-pager-title">Instalacja</span>
    </a>
  </li>
</ul>
```

## API

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-pagination` | Lista stron. |
| `.pl-pagination-previous` / `.pl-pagination-next` | Strzałki rysowane w CSS (element wewnątrz linku). |
| `.pl-pagination-pill` | Okrągłe pozycje. |
| `.pl-pagination-outline` | Pozycje z ramką. |
| `.pl-pagination-group` | Wspólna ramka wokół całości. |
| `.pl-pagination-small` / `.pl-pagination-large` | Rozmiar. |
| `.pl-pagination-center` / `-right` / `-between` | Wyrównanie. |
| `.pl-pagination-push` | Dosuwa pozycję do prawej (na `<li>`). |
| `.pl-active` / `.pl-disabled` | Stany pozycji (na `<li>`). |
| `.pl-pager` | Pager „poprzednia / następna". |
| `.pl-pager-next` | Wymusza prawą kolumnę dla pojedynczej pozycji. |
| `.pl-pager-label` / `.pl-pager-title` | Etykieta i tytuł w pagerze. |

### Zmienne CSS

| Zmienna | Domyślnie | Opis |
| --- | --- | --- |
| `--pl-pagination-size` | `2.25rem` | Wysokość i minimalna szerokość pozycji. |
| `--pl-pagination-radius` | `--pl-radius-sm` | Zaokrąglenie pozycji. |
| `--pl-pagination-gap` | `0.25rem` | Odstęp między pozycjami. |
