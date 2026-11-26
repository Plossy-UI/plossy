---
title: Datepicker
description: Kalendarz do wyboru daty lub zakresu dat — w okienku przy polu albo osadzony w stronie. Polskie nazwy z Intl, tydzień od poniedziałku, pełna obsługa klawiatury.
badge: JS
---

## Podstawowe użycie

Dodaj `data-pl-datepicker` do pola tekstowego. Kliknięcie (lub <kbd>↓</kbd>) otwiera kalendarz; wybrana data trafia do pola w formacie `dd.MM.yyyy`, a jej postać ISO (`2026-03-14`) do atrybutu `data-value`. Datę można też po prostu wpisać z klawiatury.

```html example narrow tall
<div class="pl-form-field">
  <label class="pl-form-label" for="demo-date-basic">Data urodzenia</label>
  <div class="pl-form-icon">
    <span data-pl-icon="calendar"></span>
    <input class="pl-input" id="demo-date-basic" placeholder="dd.mm.rrrr" data-pl-datepicker>
  </div>
</div>
```

Dzisiejszy dzień oznacza limonkowa kropka. Kliknięcie tytułu („marzec 2026") przełącza na szybki wybór miesiąca, a kolejne — roku.

### Klawiatura

| Klawisz | Działanie |
| --- | --- |
| <kbd>↓</kbd> w polu | Otwiera kalendarz i przenosi fokus na siatkę dni. |
| <kbd>←</kbd> <kbd>→</kbd> <kbd>↑</kbd> <kbd>↓</kbd> | Poprzedni / następny dzień, tydzień wstecz / naprzód. |
| <kbd>Home</kbd> / <kbd>End</kbd> | Początek / koniec tygodnia. |
| <kbd>PageUp</kbd> / <kbd>PageDown</kbd> | Poprzedni / następny miesiąc (z <kbd>Shift</kbd> — rok). |
| <kbd>Enter</kbd> / <kbd>Spacja</kbd> | Wybiera dzień. |
| <kbd>Esc</kbd> | Zamyka kalendarz i wraca do pola. |

## Wartość początkowa i pole ukryte

Wartość startową podasz w `value` pola (w formacie wyświetlania) albo jako ISO w opcji `value`. Opcja `name` tworzy ukryte pole formularza z datą ISO — serwer dostaje jednoznaczny format niezależnie od tego, co widzi użytkownik.

```html example narrow tall
<form id="demo-date-form">
  <div class="pl-form-field">
    <label class="pl-form-label" for="demo-date-value">Termin płatności</label>
    <input class="pl-input" id="demo-date-value" data-pl-datepicker="value: 2026-12-24; name: termin; footer: true">
    <span class="pl-form-help" id="demo-date-value-out">Do formularza trafi: termin=2026-12-24</span>
  </div>
</form>
```

```js example-js
const input = document.querySelector('#demo-date-value');

input.addEventListener('pl:change', (event) => {
  const data = new FormData(document.querySelector('#demo-date-form'));
  document.querySelector('#demo-date-value-out').textContent = `Do formularza trafi: termin=${data.get('termin') || '(pusto)'}`;
});
```

Opcja `footer: true` dodaje przyciski „Dziś" i „Wyczyść".

## Format daty

`format` przyjmuje znaczniki `d`, `dd`, `M`, `MM`, `MMM`, `MMMM`, `yy`, `yyyy`. Ten sam format służy do odczytu daty wpisanej ręcznie.

```html example tall
<div class="pl-grid pl-child-width-1-3@m">
  <div class="pl-form-field">
    <label class="pl-form-label" for="demo-date-f1">dd.MM.yyyy</label>
    <input class="pl-input" id="demo-date-f1" data-pl-datepicker="value: today">
  </div>
  <div class="pl-form-field">
    <label class="pl-form-label" for="demo-date-f2">d MMMM yyyy</label>
    <input class="pl-input" id="demo-date-f2" data-pl-datepicker="value: today; format: d MMMM yyyy">
  </div>
  <div class="pl-form-field">
    <label class="pl-form-label" for="demo-date-f3">yyyy-MM-dd</label>
    <input class="pl-input" id="demo-date-f3" data-pl-datepicker="value: today; format: yyyy-MM-dd">
  </div>
</div>
```

## Zakres dozwolonych dat

`min` i `max` przyjmują datę ISO, słowo `today` albo przesunięcie w dniach względem dziś (`+30`, `-7`). Dni spoza zakresu są przekreślone, a nawigacja nie wychodzi poza granice.

```html example narrow tall
<div class="pl-form-field">
  <label class="pl-form-label" for="demo-date-min">Termin wizyty</label>
  <input class="pl-input" id="demo-date-min" placeholder="Wybierz dzień" data-pl-datepicker="min: today; max: +45">
  <span class="pl-form-help">Zapisy przyjmujemy najwyżej 45 dni naprzód.</span>
</div>
```

## Wyłączone dni

`disabled-days` blokuje dni tygodnia (0 = niedziela … 6 = sobota), a `disabled-dates` — konkretne daty ISO.

```html example narrow tall
<div class="pl-form-field">
  <label class="pl-form-label" for="demo-date-days">Dzień dostawy</label>
  <input class="pl-input" id="demo-date-days" placeholder="Dni robocze" data-pl-datepicker="min: +1; disabled-days: 0,6; disabled-dates: 2026-12-24,2026-12-25,2027-01-01,2027-01-06">
  <span class="pl-form-help">Kurier nie jeździ w weekendy i święta.</span>
</div>
```

## Wybór zakresu

Z `range: true` pierwsze kliknięcie ustawia początek, drugie — koniec. Podczas wybierania zakres podświetla się pod kursorem. Wartość ISO ma postać `od/do`.

```html example narrow tall
<div class="pl-form-field">
  <label class="pl-form-label" for="demo-date-range">Termin pobytu</label>
  <div class="pl-form-icon">
    <span data-pl-icon="calendar"></span>
    <input class="pl-input" id="demo-date-range" placeholder="Przyjazd – wyjazd" data-pl-datepicker="range: true; min: today; footer: true">
  </div>
  <span class="pl-form-help" id="demo-date-range-out">Wybierz dzień przyjazdu i wyjazdu.</span>
</div>
```

```js example-js
document.querySelector('#demo-date-range').addEventListener('pl:change', (event) => {
  const { start, end } = event.detail;
  const out = document.querySelector('#demo-date-range-out');
  if (!start || !end) return (out.textContent = 'Wybierz dzień przyjazdu i wyjazdu.');
  const nights = Math.round((end - start) / 86400000);
  out.textContent = `Liczba noclegów: ${nights}.`;
});
```

## Kalendarz osadzony

`inline: true` (albo użycie atrybutu na elemencie innym niż `<input>`) wyświetla kalendarz na stałe w treści strony. Opcja `name` doda ukryte pole z wartością.

```html example center
<div data-pl-datepicker="inline: true; value: today; name: dzien"></div>
<div data-pl-datepicker="inline: true; range: true; value: +3/+9; footer: true"></div>
```

## Warianty osadzonego kalendarza

`.pl-datepicker-large` powiększa komórki, a `.pl-datepicker-plain` na kontenerze zdejmuje ramkę i tło — np. wewnątrz karty.

```html example center
<div class="pl-datepicker-large" data-pl-datepicker="inline: true; value: today"></div>
<div class="pl-card pl-card-body">
  <h3 class="pl-card-title">Zarezerwuj rozmowę</h3>
  <p class="pl-text-muted pl-margin-small-bottom">Wolne terminy: wtorki i czwartki.</p>
  <div class="pl-datepicker-plain" data-pl-datepicker="inline: true; min: today; disabled-days: 0,1,3,5,6"></div>
</div>
```

## Inny język

Nazwy miesięcy i dni pochodzą z `Intl.DateTimeFormat` — opcja `locale` przełącza język, `week-start` pierwszy dzień tygodnia (0 = niedziela), a `labels` (w JS) teksty przycisków.

```html example center
<div data-pl-datepicker="inline: true; locale: en-US; week-start: 0; value: today"></div>
<div data-pl-datepicker="inline: true; locale: de; value: today"></div>
```

## Zdarzenia i metody

```html example narrow tall
<div class="pl-form-field">
  <label class="pl-form-label" for="demo-date-api">Data publikacji</label>
  <input class="pl-input" id="demo-date-api" data-pl-datepicker>
</div>
<p class="pl-margin-small-top">
  <button class="pl-button pl-button-small" type="button" id="demo-date-tomorrow">Jutro</button>
  <button class="pl-button pl-button-small" type="button" id="demo-date-week">Za tydzień</button>
  <button class="pl-button pl-button-small" type="button" id="demo-date-open">Otwórz</button>
  <button class="pl-button pl-button-small" type="button" id="demo-date-reset">Wyczyść</button>
</p>
<p class="pl-text-muted" id="demo-date-log">Nie wybrano daty.</p>
```

```js example-js
const field = document.querySelector('#demo-date-api');
const picker = Plossy.datepicker(field);
const log = document.querySelector('#demo-date-log');

field.addEventListener('pl:change', (event) => {
  const { date, value } = event.detail;
  log.textContent = date
    ? `Wybrano: ${date.toLocaleDateString('pl', { weekday: 'long', day: 'numeric', month: 'long' })} (${value})`
    : 'Nie wybrano daty.';
});

document.querySelector('#demo-date-tomorrow').addEventListener('click', () => picker.setDate('+1'));
document.querySelector('#demo-date-week').addEventListener('click', () => picker.setDate('+7'));
document.querySelector('#demo-date-open').addEventListener('click', () => picker.open());
document.querySelector('#demo-date-reset').addEventListener('click', () => picker.clear());
```

## API

### Opcje

Opcje przekazujesz w atrybucie: `data-pl-datepicker="range: true; min: today"`.

| Opcja | Typ | Domyślnie | Opis |
| --- | --- | --- | --- |
| `inline` | boolean | `false` | Kalendarz osadzony w stronie zamiast okienka. |
| `range` | boolean | `false` | Wybór zakresu dat. |
| `value` | string | `''` | Wartość początkowa: ISO, `today`, przesunięcie (`+7`); dla zakresu `od/do`. |
| `min` | string | `null` | Najwcześniejsza data: ISO, `today` lub przesunięcie w dniach. |
| `max` | string | `null` | Najpóźniejsza data. |
| `disabled-days` | string | `''` | Wyłączone dni tygodnia, np. `0,6`. |
| `disabled-dates` | string | `''` | Wyłączone daty ISO rozdzielone przecinkami. |
| `locale` | string | `'pl'` | Język nazw miesięcy i dni (`Intl.DateTimeFormat`). |
| `format` | string | `'dd.MM.yyyy'` | Format wyświetlania i odczytu. |
| `separator` | string | `' – '` | Łącznik dat w zakresie. |
| `week-start` | number | `1` | Pierwszy dzień tygodnia (0 = niedziela, 1 = poniedziałek). |
| `name` | string | `''` | Nazwa ukrytego pola z wartością ISO. |
| `footer` | boolean | `false` | Przyciski „Dziś" i „Wyczyść". |
| `close-on-select` | boolean | `true` | Zamyka okienko po wyborze. |
| `placement` | string | `'bottom-start'` | Położenie okienka; odwraca się przy braku miejsca. |
| `offset` | number | `6` | Odstęp okienka od pola (px). |
| `labels` | object | `null` | Nadpisanie tekstów (`today`, `clear`, `prevMonth`, `nextMonth`, `dialog` …) — tylko z JS. |

### Metody

| Metoda | Opis |
| --- | --- |
| `open()` | Otwiera okienko. |
| `close()` | Zamyka okienko. |
| `toggle()` | Przełącza okienko. |
| `setDate(data)` | Ustawia datę (`Date`, ISO, `today`, `+7`); dla zakresu tablica `[od, do]`; `null` czyści. |
| `getDate()` | Zwraca `Date` lub `null`; dla zakresu `[od, do]`. |
| `value` | Getter — wartość ISO (`2026-03-14` lub `od/do`). |
| `clear()` | Czyści wybór. |
| `update(opcje)` | Zmienia opcje w locie (np. `{ min: '2026-06-01' }`) i odświeża widok. |

### Zdarzenia

| Zdarzenie | Opis |
| --- | --- |
| `pl:change` | Zmiana daty. `detail.value` (ISO), `detail.date`, `detail.start`, `detail.end` (obiekty `Date`), `detail.formatted`. |
| `pl:beforeopen` | Przed otwarciem okienka; można anulować. |
| `pl:open` | Okienko otwarte. |
| `pl:close` | Okienko zamknięte. |

Na polu wysyłane są też natywne zdarzenia `input` i `change`.

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-datepicker` | Kalendarz (tworzony przez JS). |
| `.pl-datepicker-inline` | Kalendarz osadzony. |
| `.pl-datepicker-large` | Większe komórki (na kontenerze osadzonego kalendarza). |
| `.pl-datepicker-plain` | Bez ramki i tła (na kontenerze). |
| `.pl-datepicker-day` | Dzień; stany `.pl-datepicker-today`, `.pl-datepicker-selected`, `.pl-datepicker-outside`, `.pl-disabled`. |
| `.pl-datepicker-in-range` | Komórka wewnątrz zakresu; `.pl-datepicker-range-start`, `.pl-datepicker-range-end`. |
| `.pl-datepicker-cell` | Miesiąc / rok w widoku szybkiego wyboru. |
