---
title: Search
description: Pole wyszukiwania z ikoną, przyciskiem czyszczenia i podpowiedzią skrótu klawiszowego — w wersji ramkowej, nawigacyjnej i dużej. Czysty CSS.
order: 10
---

## Podstawowe użycie

`.pl-search` to formularz z ikoną `.pl-search-icon` i polem `.pl-search-input`. Wariant `.pl-search-default` rysuje ramkę jak w zwykłym polu. Dodaj `role="search"`, aby czytniki ekranu rozpoznały obszar wyszukiwania.

```html example
<form class="pl-search pl-search-default" role="search">
  <span class="pl-search-icon" data-pl-icon="search"></span>
  <input class="pl-search-input" type="search" placeholder="Szukaj w dokumentacji…" aria-label="Szukaj">
</form>
```

## Czyszczenie i skrót klawiszowy

Przycisk `.pl-search-clear` typu `reset` czyści pole bez JavaScriptu i jest widoczny tylko wtedy, gdy pole ma treść. Element `.pl-search-kbd` podpowiada skrót — znika po fokusie lub wpisaniu frazy. Oba wymagają atrybutu `placeholder` na polu i muszą stać **po** nim.

```html example column
<form class="pl-search pl-search-default" role="search">
  <span class="pl-search-icon" data-pl-icon="search"></span>
  <input class="pl-search-input" type="search" placeholder="Szukaj…" aria-label="Szukaj">
  <button class="pl-search-clear" type="reset" aria-label="Wyczyść"></button>
  <kbd class="pl-search-kbd">Ctrl K</kbd>
</form>
<form class="pl-search pl-search-default" role="search">
  <span class="pl-search-icon" data-pl-icon="search"></span>
  <input class="pl-search-input" type="search" placeholder="Szukaj…" value="faktura 03/2027" aria-label="Szukaj">
  <button class="pl-search-clear" type="reset" aria-label="Wyczyść"></button>
  <kbd class="pl-search-kbd">/</kbd>
</form>
```

Sam skrót podłączysz kilkoma liniami:

```js
document.addEventListener('keydown', (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
    event.preventDefault();
    document.querySelector('.pl-search-input').focus();
  }
});
```

## Wariant nawigacyjny

`.pl-search-navbar` jest subtelny — bez ramki, na stonowanym tle — i sprężyście rozszerza się po fokusie. Szerokości ustawiają zmienne `--pl-search-w` i `--pl-search-w-focus`.

```html example
<div class="pl-flex pl-flex-between pl-flex-middle" style="gap: 1rem">
  <strong>Pulpit</strong>
  <form class="pl-search pl-search-navbar" role="search">
    <span class="pl-search-icon" data-pl-icon="search"></span>
    <input class="pl-search-input" type="search" placeholder="Szukaj" aria-label="Szukaj">
    <button class="pl-search-clear" type="reset" aria-label="Wyczyść"></button>
    <kbd class="pl-search-kbd">⌘K</kbd>
  </form>
</div>
```

## Duże wyszukiwanie

`.pl-search-large` to wyszukiwarka do sekcji hero lub strony wyników. Może zawierać przycisk wysyłający.

```html example center
<form class="pl-search pl-search-large" role="search">
  <span class="pl-search-icon" data-pl-icon="search"></span>
  <input class="pl-search-input" type="search" placeholder="Czego szukasz?" aria-label="Szukaj">
  <button class="pl-search-clear" type="reset" aria-label="Wyczyść"></button>
  <button class="pl-button pl-button-primary" type="submit">Szukaj</button>
</form>
```

```html example center
<form class="pl-search pl-search-large pl-search-pill" role="search">
  <span class="pl-search-icon" data-pl-icon="sparkles"></span>
  <input class="pl-search-input" type="search" placeholder="Zapytaj o cokolwiek…" aria-label="Zapytaj">
  <kbd class="pl-search-kbd">Enter</kbd>
</form>
```

## Rozmiary i kształt

`.pl-search-small` zmniejsza pole, `.pl-search-pill` w pełni zaokrągla rogi, a `.pl-search-block` rozciąga formularz na całą szerokość.

```html example column
<form class="pl-search pl-search-default pl-search-small" role="search">
  <span class="pl-search-icon" data-pl-icon="search"></span>
  <input class="pl-search-input" type="search" placeholder="Filtruj listę" aria-label="Filtruj">
</form>
<form class="pl-search pl-search-default pl-search-pill" role="search">
  <span class="pl-search-icon" data-pl-icon="search"></span>
  <input class="pl-search-input" type="search" placeholder="Szukaj osób" aria-label="Szukaj osób">
</form>
<form class="pl-search pl-search-default pl-search-block" role="search">
  <span class="pl-search-icon" data-pl-icon="search"></span>
  <input class="pl-search-input" type="search" placeholder="Pełna szerokość" aria-label="Szukaj">
  <button class="pl-search-clear" type="reset" aria-label="Wyczyść"></button>
</form>
```

## Ikona jako przycisk

Ikona może być przyciskiem wysyłającym formularz — wtedy użyj `<button class="pl-search-icon">`. Może też stać po prawej stronie pola.

```html example column
<form class="pl-search pl-search-default" role="search">
  <button class="pl-search-icon" type="submit" aria-label="Szukaj"><span data-pl-icon="search"></span></button>
  <input class="pl-search-input" type="search" placeholder="Numer zamówienia" aria-label="Numer zamówienia">
</form>
<form class="pl-search pl-search-default" role="search">
  <input class="pl-search-input" type="search" placeholder="Szukaj produktów" aria-label="Szukaj produktów">
  <button class="pl-search-icon" type="submit" aria-label="Szukaj"><span data-pl-icon="arrow-right"></span></button>
</form>
```

## W oknie modalnym

Duże pole świetnie sprawdza się jako paleta poleceń.

```html example center
<button class="pl-button" type="button" data-pl-toggle="#demo-search-modal"><span data-pl-icon="search"></span> Otwórz wyszukiwarkę</button>
<dialog class="pl-modal" id="demo-search-modal" data-pl-modal>
  <div class="pl-modal-dialog">
    <div class="pl-modal-body">
      <form class="pl-search pl-search-large pl-search-block" role="search" style="box-shadow: none">
        <span class="pl-search-icon" data-pl-icon="search"></span>
        <input class="pl-search-input" type="search" placeholder="Szukaj stron, osób i poleceń…" aria-label="Szukaj" autofocus>
        <button class="pl-search-clear" type="reset" aria-label="Wyczyść"></button>
        <kbd class="pl-search-kbd">Esc</kbd>
      </form>
      <p class="pl-form-help">Wskazówka: wpisz „/" przed nazwą polecenia.</p>
    </div>
  </div>
</dialog>
```

## API

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-search` | Formularz wyszukiwania. |
| `.pl-search-input` | Pole tekstowe. |
| `.pl-search-icon` | Ikona (`<span>`) lub przycisk z ikoną (`<button>`). |
| `.pl-search-clear` | Przycisk czyszczenia (`<button type="reset">`). |
| `.pl-search-kbd` | Podpowiedź skrótu klawiszowego. |
| `.pl-search-default` | Wariant ramkowy. |
| `.pl-search-navbar` | Wariant subtelny, rozszerzany po fokusie. |
| `.pl-search-large` | Duże wyszukiwanie. |
| `.pl-search-small` `.pl-search-pill` `.pl-search-block` | Mały rozmiar, pełne zaokrąglenie, pełna szerokość. |

### Zmienne CSS

| Zmienna | Opis |
| --- | --- |
| `--pl-search-w` | Szerokość formularza. |
| `--pl-search-w-focus` | Szerokość po fokusie (wariant `navbar`). |
| `--pl-search-h` `--pl-search-px` `--pl-search-radius` | Wysokość, odstęp poziomy, zaokrąglenie. |
