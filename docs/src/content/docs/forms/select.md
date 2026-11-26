---
title: Select
description: Natywna lista wyboru z własną strzałką, w stylu pozostałych pól. Dostępna, szybka i w pełni obsługiwana z klawiatury oraz na urządzeniach mobilnych.
order: 4
---

## Podstawowe użycie

Dodaj `.pl-select` do elementu `<select>`. Lista opcji pozostaje natywna — na telefonach otwiera systemowy selektor.

```html example narrow
<div class="pl-form-field">
  <label class="pl-form-label" for="demo-country">Kraj dostawy</label>
  <select class="pl-select" id="demo-country">
    <option>Polska</option>
    <option>Czechy</option>
    <option>Niemcy</option>
    <option>Słowacja</option>
    <option>Litwa</option>
  </select>
</div>
```

## Tekst zastępczy

Pusta opcja (`value=""`) z atrybutami `disabled selected` działa jak placeholder — dopóki jest wybrana, tekst ma stonowany kolor.

```html example narrow
<select class="pl-select" aria-label="Kategoria zgłoszenia" required>
  <option value="" disabled selected>Wybierz kategorię…</option>
  <option value="billing">Płatności i faktury</option>
  <option value="tech">Problem techniczny</option>
  <option value="account">Konto i logowanie</option>
  <option value="other">Inna sprawa</option>
</select>
```

## Grupy opcji

`<optgroup>` porządkuje długie listy.

```html example narrow
<select class="pl-select" aria-label="Strefa czasowa">
  <optgroup label="Europa">
    <option>Warszawa (UTC+1)</option>
    <option>Londyn (UTC+0)</option>
    <option>Helsinki (UTC+2)</option>
  </optgroup>
  <optgroup label="Ameryka">
    <option>Nowy Jork (UTC−5)</option>
    <option>San Francisco (UTC−8)</option>
  </optgroup>
  <optgroup label="Azja">
    <option>Tokio (UTC+9)</option>
    <option>Singapur (UTC+8)</option>
  </optgroup>
</select>
```

## Rozmiary

`.pl-form-small` i `.pl-form-large` — jak w polach tekstowych.

```html example column narrow
<select class="pl-select pl-form-small" aria-label="Mały">
  <option>Sortuj: najnowsze</option>
  <option>Sortuj: najtańsze</option>
</select>
<select class="pl-select" aria-label="Domyślny">
  <option>Sortuj: najnowsze</option>
  <option>Sortuj: najtańsze</option>
</select>
<select class="pl-select pl-form-large" aria-label="Duży">
  <option>Sortuj: najnowsze</option>
  <option>Sortuj: najtańsze</option>
</select>
```

## Stany

```html example column narrow
<select class="pl-select" disabled aria-label="Wyłączony">
  <option>Brak dostępnych terminów</option>
</select>
<div class="pl-width-1-1">
  <select class="pl-select pl-form-danger" aria-label="Błąd" aria-invalid="true">
    <option value="" selected disabled>Wybierz metodę płatności…</option>
    <option>BLIK</option>
    <option>Karta</option>
  </select>
  <p class="pl-form-help pl-form-help-danger">Wybierz metodę płatności, aby przejść dalej.</p>
</div>
<select class="pl-select pl-form-success" aria-label="Poprawny">
  <option>Przelew tradycyjny</option>
</select>
```

## Szerokość i pole bez ramki

Select przyjmuje klasy `.pl-form-width-*`. Wariant `.pl-form-blank` sprawdza się w paskach narzędzi i filtrach.

```html example row
<select class="pl-select pl-form-width-small" aria-label="Język">
  <option>Polski</option>
  <option>English</option>
  <option>Deutsch</option>
</select>
<select class="pl-select pl-form-width-xsmall" aria-label="Liczba na stronę">
  <option>10</option>
  <option>25</option>
  <option>50</option>
</select>
<select class="pl-select pl-form-blank pl-form-width-medium" aria-label="Okres">
  <option>Ostatnie 7 dni</option>
  <option>Ostatnie 30 dni</option>
  <option>Ten rok</option>
</select>
```

## Z ikoną

Select można umieścić w `.pl-form-icon` tak samo jak pole tekstowe.

```html example narrow
<div class="pl-form-icon">
  <span data-pl-icon="globe"></span>
  <select class="pl-select" aria-label="Region">
    <option>Europa Środkowa</option>
    <option>Europa Zachodnia</option>
    <option>Skandynawia</option>
  </select>
</div>
```

## Wybór wielokrotny

Z atrybutem `multiple` (lub `size`) select staje się przewijaną listą.

```html example narrow
<div class="pl-form-field">
  <label class="pl-form-label" for="demo-tags">Obszary zainteresowań</label>
  <select class="pl-select" id="demo-tags" multiple size="5">
    <option selected>Projektowanie interfejsów</option>
    <option>Frontend</option>
    <option selected>Dostępność</option>
    <option>Badania użytkowników</option>
    <option>Analityka</option>
    <option>Marketing treści</option>
  </select>
  <p class="pl-form-help">Przytrzymaj Ctrl (⌘ na Macu), aby zaznaczyć kilka pozycji.</p>
</div>
```

## API

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-select` | Lista wyboru (`<select>`). |
| `.pl-form-small` `.pl-form-large` | Rozmiary. |
| `.pl-form-danger` `.pl-form-success` | Stany walidacji. |
| `.pl-form-blank` | Bez ramki i tła. |
| `.pl-form-width-xsmall` … `-large` | Stałe szerokości. |

### Zmienne CSS

| Zmienna | Opis |
| --- | --- |
| `--pl-select-chevron` | Kolor strzałki. |
| `--pl-form-h` `--pl-form-px` `--pl-form-radius` | Wysokość, wewnętrzny odstęp poziomy i zaokrąglenie. |
