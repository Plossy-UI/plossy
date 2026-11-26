---
title: Chip
description: Kompaktowy znacznik — tag, filtr albo wybrana osoba. Może mieć ikonę, awatar i przycisk usuwania, a w wersji wybieralnej działa jak checkbox lub radio bez linijki JavaScriptu.
---

## Podstawowe użycie

Klasa `.pl-chip` na elemencie `<span>` tworzy statyczny znacznik. Na `<a>` lub `<button>` chip staje się klikalny — reaguje na najechanie i wciśnięcie.

```html example center
<span class="pl-chip">Projektowanie</span>
<a class="pl-chip" href="#">Typografia</a>
<button class="pl-chip" type="button">Dostępność</button>
```

## Ikona, kropka i awatar

Ikonę wstaw przed tekstem. `.pl-chip-dot` to kolorowa kropka kategorii (z `.pl-chip-dot-spark` — limonkowa), a `.pl-chip-avatar` — okrągłe zdjęcie przylegające do krawędzi.

```html example center
<span class="pl-chip"><span data-pl-icon="map-pin"></span> Kraków</span>
<span class="pl-chip"><span data-pl-icon="calendar"></span> 12 grudnia</span>
<span class="pl-chip pl-chip-success"><span class="pl-chip-dot"></span> Opłacone</span>
<span class="pl-chip"><span class="pl-chip-dot pl-chip-dot-spark"></span> Na żywo</span>
<span class="pl-chip"><img class="pl-chip-avatar" src="/img/avatar-1.svg" alt=""> Anna Kowalska</span>
<a class="pl-chip" href="#"><img class="pl-chip-avatar" src="/img/avatar-5.svg" alt=""> Marek Nowak</a>
```

## Usuwanie

Przycisk `.pl-chip-remove` rysuje mały „X". Samo usunięcie obsługuje Twój kod — poniżej przykład z delegacją zdarzeń i klasą `.pl-chip-leave`, która animuje znikanie.

```html example
<div class="pl-chip-group" id="demo-chip-remove">
  <span class="pl-chip">JavaScript <button class="pl-chip-remove" type="button" aria-label="Usuń: JavaScript"></button></span>
  <span class="pl-chip">TypeScript <button class="pl-chip-remove" type="button" aria-label="Usuń: TypeScript"></button></span>
  <span class="pl-chip pl-chip-primary"><span data-pl-icon="star"></span> Astro <button class="pl-chip-remove" type="button" aria-label="Usuń: Astro"></button></span>
  <span class="pl-chip"><img class="pl-chip-avatar" src="/img/avatar-3.svg" alt=""> Ewa Maj <button class="pl-chip-remove" type="button" aria-label="Usuń: Ewa Maj"></button></span>
</div>
```

```js example-js
document.querySelector('#demo-chip-remove').addEventListener('click', (event) => {
  const button = event.target.closest('.pl-chip-remove');
  if (!button) return;
  const chip = button.closest('.pl-chip');
  chip.classList.add('pl-chip-leave');
  chip.addEventListener('transitionend', () => chip.remove(), { once: true });
});
```

## Tony

```html example center
<span class="pl-chip pl-chip-primary">Primary</span>
<span class="pl-chip pl-chip-secondary">Secondary</span>
<span class="pl-chip pl-chip-success">Success</span>
<span class="pl-chip pl-chip-warning">Warning</span>
<span class="pl-chip pl-chip-danger">Danger</span>
<span class="pl-chip pl-chip-info">Info</span>
```

## Style

`.pl-chip-solid` wypełnia chip pełnym kolorem, `.pl-chip-outline` zostawia sam kontur, a `.pl-chip-rounded` zamienia pigułkę w zaokrąglony prostokąt.

```html example center
<span class="pl-chip pl-chip-solid">Domyślny</span>
<span class="pl-chip pl-chip-solid pl-chip-primary">Primary</span>
<span class="pl-chip pl-chip-solid pl-chip-success"><span data-pl-icon="check"></span> Gotowe</span>
<span class="pl-chip pl-chip-solid pl-chip-danger">Pilne <button class="pl-chip-remove" type="button" aria-label="Usuń"></button></span>
```

```html example center
<span class="pl-chip pl-chip-outline">Domyślny</span>
<span class="pl-chip pl-chip-outline pl-chip-primary">Primary</span>
<span class="pl-chip pl-chip-outline pl-chip-warning">W toku</span>
<a class="pl-chip pl-chip-outline pl-chip-info" href="#"><span data-pl-icon="hash"></span> ogłoszenia</a>
<span class="pl-chip pl-chip-rounded">Zaokrąglony</span>
<span class="pl-chip pl-chip-rounded pl-chip-primary"><span data-pl-icon="tag"></span> Wersja 2.0</span>
```

## Rozmiary

```html example center
<span class="pl-chip pl-chip-small">Mały</span>
<span class="pl-chip">Domyślny</span>
<span class="pl-chip pl-chip-large">Duży</span>
<span class="pl-chip pl-chip-small pl-chip-success"><span class="pl-chip-dot"></span> Aktywny</span>
<span class="pl-chip pl-chip-large"><img class="pl-chip-avatar" src="/img/avatar-2.svg" alt=""> Bartek Wrona <button class="pl-chip-remove" type="button" aria-label="Usuń"></button></span>
```

## Wybieralne chipy

Użyj `<label class="pl-chip pl-chip-selectable">` z ukrytym polem `checkbox` w środku. Stan zaznaczenia rysuje wyłącznie CSS (`:has(input:checked)`), a pole pozostaje w pełni dostępne z klawiatury i trafia do formularza. Po zaznaczeniu wysuwa się znacznik wyboru.

```html example
<fieldset class="pl-chip-group">
  <legend class="pl-margin-small-bottom">Co Cię interesuje?</legend>
  <label class="pl-chip pl-chip-selectable"><input type="checkbox" name="topics" value="design" checked> Projektowanie</label>
  <label class="pl-chip pl-chip-selectable"><input type="checkbox" name="topics" value="frontend" checked> Frontend</label>
  <label class="pl-chip pl-chip-selectable"><input type="checkbox" name="topics" value="backend"> Backend</label>
  <label class="pl-chip pl-chip-selectable"><input type="checkbox" name="topics" value="devops"> DevOps</label>
  <label class="pl-chip pl-chip-selectable"><input type="checkbox" name="topics" value="ai"> Sztuczna inteligencja</label>
  <label class="pl-chip pl-chip-selectable"><input type="checkbox" name="topics" value="legacy" disabled> Niedostępne</label>
</fieldset>
```

### Wybór pojedynczy

Z polami `radio` o wspólnym `name` zaznaczony może być tylko jeden chip.

```html example
<div class="pl-chip-group" role="radiogroup" aria-label="Rozmiar">
  <label class="pl-chip pl-chip-selectable pl-chip-plain"><input type="radio" name="demo-size" value="s"> S</label>
  <label class="pl-chip pl-chip-selectable pl-chip-plain"><input type="radio" name="demo-size" value="m" checked> M</label>
  <label class="pl-chip pl-chip-selectable pl-chip-plain"><input type="radio" name="demo-size" value="l"> L</label>
  <label class="pl-chip pl-chip-selectable pl-chip-plain"><input type="radio" name="demo-size" value="xl"> XL</label>
</div>
```

### Zaznaczenie „soft" i własny kolor

`.pl-chip-soft` zastępuje pełne wypełnienie delikatnym tłem. `.pl-chip-plain` ukrywa znacznik wyboru. Kolor zaznaczenia ustawisz zmiennymi `--pl-chip-active` i `--pl-chip-on-active`.

```html example
<div class="pl-chip-group pl-margin">
  <label class="pl-chip pl-chip-selectable pl-chip-soft"><input type="checkbox" checked> <span data-pl-icon="truck"></span> Darmowa dostawa</label>
  <label class="pl-chip pl-chip-selectable pl-chip-soft"><input type="checkbox"> <span data-pl-icon="percent"></span> Promocje</label>
  <label class="pl-chip pl-chip-selectable pl-chip-soft"><input type="checkbox" checked> <span data-pl-icon="leaf"></span> Eko</label>
</div>
<div class="pl-chip-group">
  <label class="pl-chip pl-chip-selectable pl-chip-large" style="--pl-chip-active: var(--pl-spark); --pl-chip-on-active: var(--pl-on-spark)"><input type="radio" name="demo-plan" checked> Miesięcznie</label>
  <label class="pl-chip pl-chip-selectable pl-chip-large" style="--pl-chip-active: var(--pl-spark); --pl-chip-on-active: var(--pl-on-spark)"><input type="radio" name="demo-plan"> Rocznie −20%</label>
</div>
```

## API

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-chip` | Znacznik. Na `<a>` / `<button>` — klikalny. |
| `.pl-chip-primary` … `.pl-chip-info`, `-secondary` | Ton. |
| `.pl-chip-solid` | Pełne wypełnienie. |
| `.pl-chip-outline` | Sam kontur. |
| `.pl-chip-rounded` | Zaokrąglony prostokąt zamiast pigułki. |
| `.pl-chip-small`, `.pl-chip-large` | Rozmiary. |
| `.pl-chip-avatar` | Zdjęcie na początku chipa. |
| `.pl-chip-dot` | Kropka kategorii; `.pl-chip-dot-spark` — limonkowa. |
| `.pl-chip-label` | Tekst obcinany wielokropkiem, gdy brakuje miejsca. |
| `.pl-chip-remove` | Przycisk usuwania. |
| `.pl-chip-selectable` | Chip wybieralny (`<label>` z `checkbox` / `radio`). |
| `.pl-chip-soft` | Delikatne tło zaznaczonego chipa. |
| `.pl-chip-plain` | Bez znacznika wyboru. |
| `.pl-chip-group` | Zawijany rząd chipów z odstępami. |
| `.pl-chip-leave` | Stan animacji usuwania. |

### Zmienne CSS

| Zmienna | Domyślnie | Opis |
| --- | --- | --- |
| `--pl-chip-h` | `2rem` | Wysokość. |
| `--pl-chip-px` | `0.75rem` | Odstęp poziomy. |
| `--pl-chip-radius` | `var(--pl-radius-pill)` | Zaokrąglenie. |
| `--pl-chip-active` | `var(--pl-primary)` | Tło zaznaczonego chipa wybieralnego. |
| `--pl-chip-on-active` | `var(--pl-on-primary)` | Kolor tekstu zaznaczonego chipa. |
