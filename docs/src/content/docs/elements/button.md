---
title: Button
description: Przyciski w sześciu tonach i pięciu stylach — z ikonami, stanem ładowania, grupami i sprężystą reakcją na kliknięcie.
---

## Podstawowe użycie

Dodaj klasę `.pl-button` do elementu `<button>`, `<a>` lub `<input>`. Domyślny przycisk jest neutralny: biała powierzchnia z włosową ramką.

```html example row
<button class="pl-button" type="button">Przycisk</button>
<a class="pl-button" href="#">Link</a>
<button class="pl-button" type="button" disabled>Nieaktywny</button>
```

## Tony

Klasy `.pl-button-{ton}` wypełniają przycisk kolorem. Przy hoverze przycisk lekko się unosi i rzuca kolorowy cień, przy kliknięciu — sprężyście się kurczy.

```html example row
<button class="pl-button pl-button-primary" type="button">Primary</button>
<button class="pl-button pl-button-secondary" type="button">Secondary</button>
<button class="pl-button pl-button-success" type="button">Success</button>
<button class="pl-button pl-button-warning" type="button">Warning</button>
<button class="pl-button pl-button-danger" type="button">Danger</button>
<button class="pl-button pl-button-info" type="button">Info</button>
```

## Style

Każdy ton można połączyć ze stylem. Bez klasy tonu styl jest neutralny.

### Soft

`.pl-button-soft` — delikatne, zabarwione tło.

```html example row
<button class="pl-button pl-button-soft" type="button">Neutralny</button>
<button class="pl-button pl-button-soft pl-button-primary" type="button">Primary</button>
<button class="pl-button pl-button-soft pl-button-secondary" type="button">Secondary</button>
<button class="pl-button pl-button-soft pl-button-success" type="button">Success</button>
<button class="pl-button pl-button-soft pl-button-warning" type="button">Warning</button>
<button class="pl-button pl-button-soft pl-button-danger" type="button">Danger</button>
<button class="pl-button pl-button-soft pl-button-info" type="button">Info</button>
```

### Outline

`.pl-button-outline` — sama ramka w kolorze tonu.

```html example row
<button class="pl-button pl-button-outline" type="button">Neutralny</button>
<button class="pl-button pl-button-outline pl-button-primary" type="button">Primary</button>
<button class="pl-button pl-button-outline pl-button-secondary" type="button">Secondary</button>
<button class="pl-button pl-button-outline pl-button-success" type="button">Success</button>
<button class="pl-button pl-button-outline pl-button-warning" type="button">Warning</button>
<button class="pl-button pl-button-outline pl-button-danger" type="button">Danger</button>
<button class="pl-button pl-button-outline pl-button-info" type="button">Info</button>
```

### Ghost

`.pl-button-ghost` — bez tła i ramki; tło pojawia się przy hoverze. Dobry do akcji drugoplanowych i pasków narzędzi.

```html example row
<button class="pl-button pl-button-ghost" type="button">Neutralny</button>
<button class="pl-button pl-button-ghost pl-button-primary" type="button">Primary</button>
<button class="pl-button pl-button-ghost pl-button-secondary" type="button">Secondary</button>
<button class="pl-button pl-button-ghost pl-button-success" type="button">Success</button>
<button class="pl-button pl-button-ghost pl-button-warning" type="button">Warning</button>
<button class="pl-button pl-button-ghost pl-button-danger" type="button">Danger</button>
<button class="pl-button pl-button-ghost pl-button-info" type="button">Info</button>
```

### Text i link

`.pl-button-text` to przycisk tekstowy z podkreśleniem, które wjeżdża od lewej. `.pl-button-link` wygląda jak zwykły odnośnik.

```html example row
<button class="pl-button pl-button-text" type="button">Przycisk tekstowy</button>
<button class="pl-button pl-button-text" type="button">Dowiedz się więcej <span class="pl-button-arrow" data-pl-icon="arrow-right"></span></button>
<button class="pl-button pl-button-link" type="button">Przycisk-link</button>
```

## Rozmiary

`.pl-button-small` i `.pl-button-large`. Wysokości odpowiadają kontrolkom formularzy.

```html example row
<button class="pl-button pl-button-primary pl-button-small" type="button">Mały</button>
<button class="pl-button pl-button-primary" type="button">Domyślny</button>
<button class="pl-button pl-button-primary pl-button-large" type="button">Duży</button>
```

```html example row
<button class="pl-button pl-button-small" type="button">Mały</button>
<button class="pl-button" type="button">Domyślny</button>
<button class="pl-button pl-button-large" type="button">Duży</button>
```

## Pastylka

`.pl-button-pill` w pełni zaokrągla przycisk.

```html example row
<button class="pl-button pl-button-pill" type="button">Obserwuj</button>
<button class="pl-button pl-button-primary pl-button-pill" type="button">Wypróbuj za darmo</button>
<button class="pl-button pl-button-soft pl-button-success pl-button-pill pl-button-small" type="button">Dostępny</button>
<button class="pl-button pl-button-outline pl-button-pill pl-button-large" type="button">Umów rozmowę</button>
```

## Z ikonami

Ikona wewnątrz przycisku dopasowuje rozmiar i odstęp. Może stać przed tekstem lub po nim.

```html example row
<button class="pl-button pl-button-primary" type="button"><span data-pl-icon="plus"></span> Nowy projekt</button>
<button class="pl-button" type="button"><span data-pl-icon="download"></span> Pobierz PDF</button>
<button class="pl-button pl-button-soft pl-button-danger" type="button"><span data-pl-icon="trash-2"></span> Usuń</button>
<button class="pl-button pl-button-ghost" type="button">Filtry <span data-pl-icon="chevron-down"></span></button>
```

### Strzałka

Ikona z klasą `.pl-button-arrow` sprężyście „ucieka" w prawo przy hoverze przycisku.

```html example row
<a class="pl-button pl-button-primary pl-button-large" href="#">Zacznij teraz <span class="pl-button-arrow" data-pl-icon="arrow-right"></span></a>
<a class="pl-button pl-button-secondary pl-button-pill" href="#">Zobacz realizacje <span class="pl-button-arrow" data-pl-icon="arrow-up-right"></span></a>
<a class="pl-button pl-button-ghost" href="#">Dalej <span class="pl-button-arrow" data-pl-icon="chevron-right"></span></a>
```

## Przyciski-ikony

`.pl-button-icon` robi z przycisku kwadrat (lub koło z `.pl-button-pill`). Pamiętaj o `aria-label`.

```html example row
<button class="pl-button pl-button-icon pl-button-small" type="button" aria-label="Edytuj"><span data-pl-icon="pencil"></span></button>
<button class="pl-button pl-button-icon" type="button" aria-label="Ustawienia"><span data-pl-icon="settings"></span></button>
<button class="pl-button pl-button-icon pl-button-large" type="button" aria-label="Udostępnij"><span data-pl-icon="share-2"></span></button>
<button class="pl-button pl-button-icon pl-button-primary" type="button" aria-label="Dodaj"><span data-pl-icon="plus"></span></button>
<button class="pl-button pl-button-icon pl-button-primary pl-button-pill" type="button" aria-label="Wyślij"><span data-pl-icon="send"></span></button>
<button class="pl-button pl-button-icon pl-button-soft pl-button-danger pl-button-pill" type="button" aria-label="Polub"><span data-pl-icon="heart"></span></button>
<button class="pl-button pl-button-icon pl-button-ghost" type="button" aria-label="Więcej"><span data-pl-icon="ellipsis"></span></button>
<button class="pl-button pl-button-icon pl-button-outline pl-button-pill pl-button-large" type="button" aria-label="Odtwórz"><span data-pl-icon="play"></span></button>
```

## Pełna szerokość

`.pl-button-block` rozciąga przycisk na całą szerokość kontenera.

```html example narrow
<button class="pl-button pl-button-primary pl-button-block pl-button-large" type="button">Zaloguj się</button>
<button class="pl-button pl-button-block" type="button" style="margin-top: 0.75rem"><span data-pl-icon="mail"></span> Kontynuuj przez e-mail</button>
```

## Stan ładowania

`.pl-button-loading` ukrywa treść i pokazuje spinner, zachowując szerokość przycisku. Kliknięcia są w tym czasie blokowane.

```html example row
<button class="pl-button pl-button-primary pl-button-loading" type="button" aria-busy="true">Zapisz zmiany</button>
<button class="pl-button pl-button-loading" type="button" aria-busy="true">Wczytaj więcej</button>
<button class="pl-button pl-button-soft pl-button-success pl-button-loading" type="button" aria-busy="true">Synchronizuj</button>
<button class="pl-button pl-button-outline pl-button-danger pl-button-loading" type="button" aria-busy="true">Usuń konto</button>
<button class="pl-button pl-button-icon pl-button-secondary pl-button-loading" type="button" aria-busy="true" aria-label="Odświeżanie"><span data-pl-icon="refresh-cw"></span></button>
```

Klasę przełącza się z JavaScript na czas operacji:

```html example row
<button class="pl-button pl-button-primary" id="demo-button-save" type="button"><span data-pl-icon="save"></span> Zapisz zmiany</button>
```

```js example-js
const save = document.getElementById('demo-button-save');
save.addEventListener('click', () => {
  save.classList.add('pl-button-loading');
  save.setAttribute('aria-busy', 'true');
  setTimeout(() => {
    save.classList.remove('pl-button-loading');
    save.removeAttribute('aria-busy');
    Plossy.notification({ message: 'Zmiany zapisane', status: 'success' });
  }, 1600);
});
```

## Nieaktywny

Atrybut `disabled` (dla `<button>`) lub klasa `.pl-disabled` (dla linków) wyszarza przycisk i blokuje interakcję.

```html example row
<button class="pl-button" type="button" disabled>Domyślny</button>
<button class="pl-button pl-button-primary" type="button" disabled>Primary</button>
<button class="pl-button pl-button-soft pl-button-primary" type="button" disabled>Soft</button>
<button class="pl-button pl-button-outline" type="button" disabled>Outline</button>
<a class="pl-button pl-button-secondary pl-disabled" href="#" aria-disabled="true" tabindex="-1">Link nieaktywny</a>
```

## Stan aktywny

Klasa `.pl-active` oznacza przycisk wciśnięty / wybrany (np. w przełącznikach). Dodaj też `aria-pressed="true"`.

```html example row
<button class="pl-button" type="button">Zwykły</button>
<button class="pl-button pl-active" type="button" aria-pressed="true">Aktywny</button>
```

## Grupy

`.pl-button-group` skleja przyciski w jeden blok ze wspólnymi krawędziami.

```html example column
<div class="pl-button-group" role="group" aria-label="Zakres dat">
  <button class="pl-button" type="button">Dzień</button>
  <button class="pl-button pl-active" type="button" aria-pressed="true">Tydzień</button>
  <button class="pl-button" type="button">Miesiąc</button>
  <button class="pl-button" type="button">Rok</button>
</div>
<div class="pl-button-group" role="group" aria-label="Formatowanie">
  <button class="pl-button pl-button-icon" type="button" aria-label="Pogrubienie"><span data-pl-icon="bold"></span></button>
  <button class="pl-button pl-button-icon" type="button" aria-label="Kursywa"><span data-pl-icon="italic"></span></button>
  <button class="pl-button pl-button-icon" type="button" aria-label="Podkreślenie"><span data-pl-icon="underline"></span></button>
</div>
<div class="pl-button-group" role="group" aria-label="Zapis">
  <button class="pl-button pl-button-primary" type="button">Opublikuj</button>
  <button class="pl-button pl-button-primary pl-button-icon" type="button" aria-label="Więcej opcji publikacji"><span data-pl-icon="chevron-down"></span></button>
</div>
<div class="pl-button-group" role="group" aria-label="Nawigacja">
  <button class="pl-button pl-button-small" type="button"><span data-pl-icon="chevron-left"></span> Poprzedni</button>
  <button class="pl-button pl-button-small" type="button">Następny <span data-pl-icon="chevron-right"></span></button>
</div>
```

## Z menu rozwijanym

Przycisk jako przełącznik komponentu [Drop](/docs/overlays/drop/) — panel stoi bezpośrednio po przycisku.

```html example row
<div>
  <button class="pl-button" type="button">Eksportuj <span data-pl-icon="chevron-down"></span></button>
  <div class="pl-drop" data-pl-drop="mode: click; pos: bottom-start">
    <ul class="pl-dropdown-nav">
      <li><a href="#">Plik CSV</a></li>
      <li><a href="#">Arkusz XLSX</a></li>
      <li class="pl-nav-divider"></li>
      <li><a href="#">Dokument PDF</a></li>
    </ul>
  </div>
</div>
```

## Dostrajanie

Wymiary przycisku kontrolują lokalne zmienne CSS.

```html example row
<button class="pl-button pl-button-primary" type="button" style="--pl-button-h: 3.5rem; --pl-button-px: 2em; --pl-button-radius: 0.5rem">Własne wymiary</button>
<button class="pl-button pl-button-secondary" type="button" style="--pl-button-radius: 0">Ostre rogi</button>
```

## API

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-button` | Przycisk bazowy (neutralny). |
| `.pl-button-primary` `-secondary` `-success` `-warning` `-danger` `-info` | Ton — pełne wypełnienie. |
| `.pl-button-soft` | Styl: delikatne tło w kolorze tonu. |
| `.pl-button-outline` | Styl: ramka w kolorze tonu. |
| `.pl-button-ghost` | Styl: bez tła i ramki. |
| `.pl-button-text` | Przycisk tekstowy z animowanym podkreśleniem. |
| `.pl-button-link` | Wygląd zwykłego odnośnika. |
| `.pl-button-small` `.pl-button-large` | Rozmiary. |
| `.pl-button-pill` | Pełne zaokrąglenie. |
| `.pl-button-icon` | Kwadratowy przycisk z samą ikoną. |
| `.pl-button-block` | Pełna szerokość. |
| `.pl-button-loading` | Stan ładowania (spinner zamiast treści). |
| `.pl-button-arrow` | Na ikonie wewnątrz przycisku: przesunięcie w prawo przy hoverze. |
| `.pl-button-group` | Kontener sklejający przyciski. |
| `.pl-active` | Stan wciśnięty / wybrany. |
| `.pl-disabled` / `[disabled]` | Stan nieaktywny. |

### Zmienne CSS

| Zmienna | Domyślnie | Opis |
| --- | --- | --- |
| `--pl-button-h` | `var(--pl-control-h)` | Wysokość. |
| `--pl-button-px` | `1.05em` | Odstęp poziomy. |
| `--pl-button-radius` | `var(--pl-radius-md)` | Zaokrąglenie. |
