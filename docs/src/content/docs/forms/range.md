---
title: Range
description: Suwak na natywnym polu range — z wypełnionym torem, sprężystym kciukiem, dymkiem wartości, podziałką i wariantem z dwoma kciukami (zakres od–do).
badge: JS
order: 9
---

## Podstawowe użycie

Dodaj `.pl-range` do `<input type="range">`. Atrybut `data-pl-range` synchronizuje wypełnienie toru z wartością (zmienne `--pl-range-progress` i `--pl-range-ratio`). W Firefoksie wypełnienie działa także bez skryptu.

```html example column narrow
<div class="pl-width-1-1 pl-form-field">
  <label class="pl-form-label" for="demo-volume">Głośność</label>
  <input class="pl-range" id="demo-volume" type="range" min="0" max="100" value="60" data-pl-range>
</div>
<div class="pl-width-1-1 pl-form-field">
  <label class="pl-form-label" for="demo-step">Ocena (krok 1, zakres 1–10)</label>
  <input class="pl-range" id="demo-step" type="range" min="1" max="10" step="1" value="7" data-pl-range>
</div>
<div class="pl-width-1-1 pl-form-field">
  <label class="pl-form-label" for="demo-off">Wyłączony</label>
  <input class="pl-range" id="demo-off" type="range" value="35" disabled data-pl-range>
</div>
```

## Dymek z wartością

Opcja `tooltip: true` pokazuje wartość nad kciukiem podczas najechania, przeciągania i fokusu. `tooltip: always` trzyma dymek stale na widoku. `prefix` i `suffix` dodają jednostkę (trafia też do `aria-valuetext`).

```html example column narrow
<div class="pl-width-1-1 pl-form-field">
  <label class="pl-form-label" for="demo-bright">Jasność</label>
  <input class="pl-range" id="demo-bright" type="range" min="0" max="100" value="45" data-pl-range="tooltip: true; suffix: ' %'">
</div>
<div class="pl-width-1-1 pl-form-field">
  <label class="pl-form-label" for="demo-budget">Budżet miesięczny</label>
  <input class="pl-range" id="demo-budget" type="range" min="500" max="20000" step="500" value="7500" data-pl-range="tooltip: always; suffix: ' zł'">
</div>
```

## Wartość obok suwaka

Opcja `output` wskazuje element, w którym komponent wypisuje sformatowaną wartość.

```html example narrow
<div class="pl-form-field">
  <div class="pl-flex pl-flex-between pl-flex-middle">
    <label class="pl-form-label" for="demo-team">Wielkość zespołu</label>
    <strong id="demo-team-out"></strong>
  </div>
  <input class="pl-range" id="demo-team" type="range" min="1" max="50" value="12" data-pl-range="output: #demo-team-out; suffix: ' os.'">
</div>
```

## Podziałka

Opcja `ticks` generuje pod suwakiem równo rozłożone znaczniki z wartościami. Własną podziałkę (np. z opisami) zbudujesz ręcznie: `.pl-range-wrap` z polem i listą `.pl-range-ticks`.

```html example column narrow
<input class="pl-range" type="range" min="0" max="100" step="25" value="50" aria-label="Jakość eksportu" data-pl-range="ticks: 5; suffix: '%'">
<div class="pl-width-1-1 pl-range-wrap">
  <input class="pl-range" type="range" min="1" max="4" step="1" value="2" aria-label="Poziom szczegółowości" data-pl-range>
  <div class="pl-range-ticks" aria-hidden="true">
    <span data-value="1">Szkic</span>
    <span data-value="2">Standard</span>
    <span data-value="3">Wysoka</span>
    <span data-value="4">Druk</span>
  </div>
</div>
```

## Tony

Klasy `.pl-form-{ton}` zmieniają kolor wypełnienia i kciuka.

```html example column narrow
<input class="pl-range pl-form-success" type="range" value="70" aria-label="Success" data-pl-range>
<input class="pl-range pl-form-warning" type="range" value="50" aria-label="Warning" data-pl-range>
<input class="pl-range pl-form-danger" type="range" value="30" aria-label="Danger" data-pl-range>
<input class="pl-range pl-form-secondary" type="range" value="60" aria-label="Secondary" data-pl-range>
```

## Rozmiary

`.pl-form-small` i `.pl-form-large` na kontrolce.

```html example column narrow
<input class="pl-range pl-form-small" type="range" value="30" aria-label="Mały" data-pl-range>
<input class="pl-range" type="range" value="50" aria-label="Domyślny" data-pl-range>
<input class="pl-range pl-form-large" type="range" value="70" aria-label="Duży" data-pl-range="tooltip: true">
```

## Zakres od–do

Opakowanie `.pl-range-dual` z dwoma polami i opcją `dual: true` tworzy suwak z dwoma kciukami. Kciuki nie mogą się minąć; `gap` wymusza minimalny odstęp. Kliknięcie w tor przesuwa bliższy kciuk, a każdy z nich obsługuje klawiaturę jak zwykłe pole range.

```html example column narrow
<div class="pl-width-1-1 pl-form-field">
  <div class="pl-flex pl-flex-between pl-flex-middle">
    <span class="pl-form-label" id="demo-price-label">Cena</span>
    <strong id="demo-price-out"></strong>
  </div>
  <div class="pl-range-dual" role="group" aria-labelledby="demo-price-label" data-pl-range="dual: true; gap: 50; suffix: ' zł'; output: #demo-price-out">
    <input class="pl-range" type="range" min="0" max="1000" step="10" value="180" aria-label="Cena od">
    <input class="pl-range" type="range" min="0" max="1000" step="10" value="640" aria-label="Cena do">
  </div>
</div>
<div class="pl-width-1-1 pl-form-field">
  <span class="pl-form-label" id="demo-hours-label">Godziny dostawy</span>
  <div class="pl-range-dual pl-form-success" role="group" aria-labelledby="demo-hours-label" data-pl-range="dual: true; tooltip: always; ticks: 5; suffix: ':00'">
    <input class="pl-range" type="range" min="8" max="20" step="1" value="10" aria-label="Od godziny">
    <input class="pl-range" type="range" min="8" max="20" step="1" value="16" aria-label="Do godziny">
  </div>
</div>
```

## Zdarzenia i sterowanie ze skryptu

Komponent wysyła `pl:input` podczas przeciągania i `pl:change` po zatwierdzeniu. Metoda `set()` ustawia wartość i odświeża wygląd.

```html example column narrow
<input class="pl-range" id="demo-api" type="range" min="0" max="100" value="25" aria-label="Postęp" data-pl-range="tooltip: true">
<div class="pl-width-1-1 pl-flex pl-flex-middle" style="gap: 0.6rem">
  <button class="pl-button pl-button-small" type="button" id="demo-api-0">0</button>
  <button class="pl-button pl-button-small" type="button" id="demo-api-50">50</button>
  <button class="pl-button pl-button-small" type="button" id="demo-api-100">100</button>
  <span class="pl-form-help" id="demo-api-log" style="margin: 0">Przesuń suwak…</span>
</div>
```

```js example-js
const range = document.querySelector('#demo-api');
const log = document.querySelector('#demo-api-log');
range.addEventListener('pl:input', (event) => (log.textContent = `pl:input → ${event.detail.value}`));
range.addEventListener('pl:change', (event) => (log.textContent = `pl:change → ${event.detail.value}`));
for (const value of [0, 50, 100]) {
  document.querySelector(`#demo-api-${value}`).addEventListener('click', () => Plossy.range(range).set(value));
}
```

## API

### Opcje

| Opcja | Typ | Domyślnie | Opis |
| --- | --- | --- | --- |
| `dual` | boolean | `false` | Dwa kciuki — element to opakowanie `.pl-range-dual` z dwoma polami. |
| `tooltip` | boolean \| `always` | `false` | Dymek z wartością nad kciukiem. |
| `ticks` | number | `0` | Liczba generowanych znaczników podziałki (min. 2). |
| `gap` | number | `0` | Minimalny odstęp między kciukami w trybie `dual`. |
| `prefix` / `suffix` | string | `''` | Tekst przed / za wartością (dymek, podziałka, `output`). |
| `output` | string | `''` | Selektor elementu, do którego trafia sformatowana wartość. |

### Metody

| Metoda | Opis |
| --- | --- |
| `set(wartość)` | Ustawia wartość — liczba albo `[od, do]` w trybie `dual`. |
| `update()` | Odświeża wygląd po zmianie `value` / `min` / `max` ze skryptu. |
| `value` | Getter: bieżąca wartość (liczba albo `[od, do]`). |

### Zdarzenia

| Zdarzenie | Opis |
| --- | --- |
| `pl:input` | W trakcie zmiany. `detail.value` (liczba lub para), `detail.values` (zawsze tablica). |
| `pl:change` | Po zatwierdzeniu zmiany lub wywołaniu `set()`. |

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-range` | Suwak (`<input type="range">`). |
| `.pl-form-small` `.pl-form-large` | Rozmiary (aliasy: `.pl-range-small`, `.pl-range-large`). |
| `.pl-form-primary` … `.pl-form-info` | Ton. |
| `.pl-range-wrap` | Opakowanie pojedynczego suwaka (dymek, podziałka); tworzone automatycznie, gdy jest potrzebne. |
| `.pl-range-dual` | Opakowanie dwóch pól — zakres od–do. |
| `.pl-range-bubble` | Dymek wartości; `.pl-range-bubble-always` — stale widoczny. |
| `.pl-range-ticks` | Podziałka; aktywny znacznik dostaje `.pl-active`. |

### Zmienne CSS

| Zmienna | Opis |
| --- | --- |
| `--pl-range-progress` | Postęp w procentach (ustawia JS). |
| `--pl-range-ratio` | Postęp jako liczba 0–1 (ustawia JS; można podać ręcznie bez skryptu). |
| `--pl-range-thumb` `--pl-range-track` | Rozmiar kciuka i grubość toru. |
| `--pl-range-accent` `--pl-range-rail` | Kolor wypełnienia i tła toru. |
