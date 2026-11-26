---
title: Form
description: Pola tekstowe, obszary tekstu i typy natywne w jednym, spójnym stylu — z miękką poświatą fokusu, rozmiarami, stanami, ikonami i małymi pomocnikami JavaScript.
badge: JS
order: 1
---

## Podstawowe użycie

Każda kontrolka dostaje własną klasę: `.pl-input`, `.pl-textarea`, `.pl-select`. Pole z etykietą i podpowiedzią opakuj w `.pl-form-field` — etykieta to `.pl-form-label`, tekst pomocniczy `.pl-form-help`.

```html example narrow
<form>
  <div class="pl-form-field">
    <label class="pl-form-label" for="demo-name">Imię i nazwisko</label>
    <input class="pl-input" id="demo-name" type="text" placeholder="Anna Kowalska" autocomplete="name">
  </div>
  <div class="pl-form-field">
    <label class="pl-form-label" for="demo-email">Adres e-mail</label>
    <input class="pl-input" id="demo-email" type="email" placeholder="anna@example.com" autocomplete="email">
    <p class="pl-form-help">Wyślemy na niego potwierdzenie zamówienia.</p>
  </div>
  <div class="pl-form-field">
    <label class="pl-form-label" for="demo-note">Uwagi do zamówienia <span class="pl-form-optional">opcjonalne</span></label>
    <textarea class="pl-textarea" id="demo-note" rows="3" placeholder="Np. kod do domofonu lub preferowana godzina dostawy"></textarea>
  </div>
  <div class="pl-form-actions">
    <button class="pl-button pl-button-primary" type="submit">Zapisz</button>
    <button class="pl-button pl-button-ghost" type="reset">Wyczyść</button>
  </div>
</form>
```

Pozostałe kontrolki mają własne strony: [Select](/docs/forms/select/), [Checkbox i radio](/docs/forms/checkbox-radio/), [Switch](/docs/forms/switch/), [Range](/docs/forms/range/), a także [pływające etykiety](/docs/forms/floating-labels/), [grupy pól](/docs/forms/input-group/), [walidacja](/docs/forms/validation/) i [układy](/docs/forms/layout/).

## Rozmiary

Klasy `.pl-form-small` i `.pl-form-large` na kontrolce zmieniają wysokość, zaokrąglenie i rozmiar tekstu. Pasują do rozmiarów przycisków.

```html example column narrow
<input class="pl-input pl-form-small" type="text" placeholder="Małe" aria-label="Małe pole">
<input class="pl-input" type="text" placeholder="Domyślne" aria-label="Domyślne pole">
<input class="pl-input pl-form-large" type="text" placeholder="Duże" aria-label="Duże pole">
```

## Szerokości

Domyślnie pole zajmuje całą szerokość rodzica. Stałą szerokość nadają klasy `.pl-form-width-xsmall`, `-small`, `-medium` i `-large`; możesz też użyć narzędzi `.pl-width-*`.

```html example column
<input class="pl-input pl-form-width-xsmall" type="text" placeholder="00-000" aria-label="Kod pocztowy">
<input class="pl-input pl-form-width-small" type="text" placeholder="Miasto" aria-label="Miasto">
<input class="pl-input pl-form-width-medium" type="text" placeholder="Ulica i numer" aria-label="Ulica">
<input class="pl-input pl-form-width-large" type="text" placeholder="Nazwa firmy" aria-label="Firma">
```

## Stany

Atrybuty `disabled` i `readonly` działają natywnie. Klasy `.pl-form-danger` i `.pl-form-success` na kontrolce oznaczają błąd lub poprawną wartość — więcej na stronie [Walidacja](/docs/forms/validation/).

```html example column narrow
<input class="pl-input" type="text" value="Pole wyłączone" disabled aria-label="Wyłączone">
<input class="pl-input" type="text" value="PL-2026-00418 (tylko do odczytu)" readonly aria-label="Tylko do odczytu">
<div class="pl-width-1-1">
  <input class="pl-input pl-form-danger" type="email" value="anna@example" aria-label="Błędny e-mail" aria-invalid="true">
  <p class="pl-form-help pl-form-help-danger">Adres e-mail jest niepełny.</p>
</div>
<div class="pl-width-1-1">
  <input class="pl-input pl-form-success" type="text" value="anna.kowalska" aria-label="Nazwa użytkownika">
  <p class="pl-form-help pl-form-help-success">Ta nazwa jest wolna.</p>
</div>
```

## Pole bez ramki

`.pl-form-blank` ukrywa ramkę i tło do czasu najechania lub fokusu. Przydaje się do edycji w miejscu — np. tytułu dokumentu.

```html example column narrow
<input class="pl-input pl-form-blank pl-form-large" type="text" value="Plan kampanii — wiosna 2027" aria-label="Tytuł dokumentu">
<textarea class="pl-textarea pl-form-blank" rows="2" aria-label="Opis">Kliknij, aby edytować opis dokumentu.</textarea>
```

## Ikony

Opakuj pole w `.pl-form-icon` i dodaj przed nim ikonę. Klasa `.pl-form-icon-flip` (na opakowaniu albo na samej ikonie) przenosi ją na prawą stronę. Ikona będąca przyciskiem lub linkiem jest klikalna.

```html example column narrow
<div class="pl-form-icon">
  <span data-pl-icon="user"></span>
  <input class="pl-input" type="text" placeholder="Nazwa użytkownika" aria-label="Nazwa użytkownika">
</div>
<div class="pl-form-icon pl-form-icon-flip">
  <span data-pl-icon="calendar"></span>
  <input class="pl-input" type="text" placeholder="Termin realizacji" aria-label="Termin">
</div>
<div class="pl-form-icon">
  <span data-pl-icon="link"></span>
  <input class="pl-input" type="url" placeholder="https://twoja-strona.pl" aria-label="Adres strony">
  <button class="pl-form-icon-flip" type="button" aria-label="Kopiuj adres" data-pl-tooltip="Kopiuj"><span data-pl-icon="copy"></span></button>
</div>
<div class="pl-form-icon">
  <span data-pl-icon="mail"></span>
  <input class="pl-input pl-form-large" type="email" placeholder="Duże pole z ikoną" aria-label="E-mail">
</div>
```

## Typy natywne

Pola daty, czasu, liczby, koloru i pliku korzystają z natywnych kontrolek przeglądarki, ale wyglądają spójnie z resztą formularza.

```html example
<div class="pl-form-grid">
  <div class="pl-form-field">
    <label class="pl-form-label" for="demo-date">Data odbioru</label>
    <input class="pl-input" id="demo-date" type="date" value="2027-03-14">
  </div>
  <div class="pl-form-field">
    <label class="pl-form-label" for="demo-time">Godzina</label>
    <input class="pl-input" id="demo-time" type="time" value="09:30">
  </div>
  <div class="pl-form-field">
    <label class="pl-form-label" for="demo-number">Liczba sztuk</label>
    <input class="pl-input" id="demo-number" type="number" min="1" max="99" value="2">
  </div>
  <div class="pl-form-field">
    <label class="pl-form-label" for="demo-color">Kolor przewodni</label>
    <input class="pl-input" id="demo-color" type="color" value="#5b4be0">
  </div>
  <div class="pl-form-field pl-form-span-full">
    <label class="pl-form-label" for="demo-file">Załącznik</label>
    <input class="pl-input" id="demo-file" type="file" accept=".pdf,.jpg,.png">
    <p class="pl-form-help">PDF, JPG lub PNG, maksymalnie 10 MB.</p>
  </div>
</div>
```

## Rosnące pole tekstowe

Atrybut `data-pl-autosize` sprawia, że `<textarea>` rośnie razem z treścią. Opcja `max-rows` ogranicza wysokość — po jej przekroczeniu pojawia się przewijanie.

```html example column narrow
<textarea class="pl-textarea" rows="2" data-pl-autosize placeholder="Pisz dalej — pole będzie rosło…" aria-label="Wiadomość"></textarea>
<textarea class="pl-textarea" rows="2" data-pl-autosize="max-rows: 5" placeholder="Najwyżej 5 wierszy, potem przewijanie" aria-label="Komentarz"></textarea>
```

## Pokaż / ukryj hasło

Przycisk z `data-pl-password-toggle` przełącza widoczność hasła w tym samym opakowaniu i podmienia ikonę `eye` / `eye-off`. Ustawia też `aria-pressed` i etykietę dla czytników ekranu.

```html example narrow
<div class="pl-form-field">
  <label class="pl-form-label" for="demo-password">Hasło</label>
  <div class="pl-form-icon">
    <span data-pl-icon="lock"></span>
    <input class="pl-input" id="demo-password" type="password" value="bardzo-tajne-haslo" autocomplete="new-password">
    <button class="pl-form-icon-flip" type="button" data-pl-password-toggle><span data-pl-icon="eye"></span></button>
  </div>
  <p class="pl-form-help">Co najmniej 12 znaków, w tym cyfra.</p>
</div>
```

## Licznik znaków

`data-pl-char-count` dodaje licznik aktualizowany na żywo. Limit bierze z atrybutu `maxlength` albo z opcji `max`. Blisko limitu licznik zmienia kolor na ostrzegawczy. Jeśli w polu `.pl-form-field` jest już element `.pl-form-count`, zostanie użyty zamiast tworzenia nowego.

```html example column narrow
<div class="pl-width-1-1 pl-form-field">
  <label class="pl-form-label" for="demo-bio">O mnie</label>
  <textarea class="pl-textarea" id="demo-bio" rows="3" maxlength="120" data-pl-char-count data-pl-autosize>Projektuję interfejsy i lubię dobrą kawę.</textarea>
  <div class="pl-form-help pl-form-help-split">
    <span>Krótki opis widoczny w profilu.</span>
    <span class="pl-form-count"></span>
  </div>
</div>
<div class="pl-width-1-1 pl-form-field">
  <label class="pl-form-label" for="demo-title">Tytuł ogłoszenia</label>
  <input class="pl-input" id="demo-title" type="text" value="Rower miejski, stan idealny" data-pl-char-count="max: 40; template: Pozostało {left}">
</div>
```

## Czyszczenie pola

Przycisk `.pl-form-clear` z `data-pl-form-clear` czyści pole w tym samym opakowaniu i zwraca do niego fokus. Jest widoczny tylko wtedy, gdy pole ma treść (pole musi mieć `placeholder`).

```html example narrow
<div class="pl-form-affix">
  <span data-pl-icon="tag"></span>
  <input class="pl-input" type="text" value="WIOSNA27" placeholder="Kod rabatowy" aria-label="Kod rabatowy">
  <button class="pl-form-clear" type="button" data-pl-form-clear aria-label="Wyczyść"></button>
</div>
```

## API

### Opcje

`data-pl-autosize`

| Opcja | Typ | Domyślnie | Opis |
| --- | --- | --- | --- |
| `min-rows` | number | `0` | Minimalna liczba wierszy (0 — z atrybutu `rows`). |
| `max-rows` | number | `0` | Maksymalna liczba wierszy; dalej przewijanie (0 — bez limitu). |

`data-pl-password-toggle`

| Opcja | Typ | Domyślnie | Opis |
| --- | --- | --- | --- |
| `target` | string | `''` | Selektor pola hasła. Domyślnie pole w tym samym opakowaniu. |
| `icon-show` / `icon-hide` | string | `eye` / `eye-off` | Nazwy ikon dla obu stanów. |
| `label-show` / `label-hide` | string | `Pokaż hasło` / `Ukryj hasło` | Etykiety `aria-label`. |

`data-pl-char-count`

| Opcja | Typ | Domyślnie | Opis |
| --- | --- | --- | --- |
| `max` | number | `0` | Limit znaków. Domyślnie z atrybutu `maxlength`. |
| `target` | string | `''` | Selektor elementu licznika. |
| `warn` | number | `0.9` | Część limitu, od której licznik ostrzega. |
| `template` | string | `{count} / {max}` | Szablon tekstu; dostępne `{count}`, `{max}`, `{left}`. |

`data-pl-form-clear`

| Opcja | Typ | Domyślnie | Opis |
| --- | --- | --- | --- |
| `target` | string | `''` | Selektor czyszczonego pola. Domyślnie pole w tym samym opakowaniu. |

### Metody

| Metoda | Opis |
| --- | --- |
| `Plossy.autosize(el).update()` | Przelicza wysokość (np. po zmianie wartości ze skryptu). |
| `Plossy.passwordToggle(el).show()` / `hide()` / `toggle()` | Steruje widocznością hasła. |
| `Plossy.charCount(el).update()` | Odświeża licznik. |
| `Plossy.formClear(el).clear()` | Czyści pole. |

### Zdarzenia

| Zdarzenie | Opis |
| --- | --- |
| `pl:show` / `pl:hide` | Hasło zostało pokazane / ukryte (`password-toggle`). |
| `pl:exceed` / `pl:within` | Liczba znaków przekroczyła limit / wróciła do limitu (`char-count`). |
| `pl:clear` | Pole zostało wyczyszczone (`form-clear`). |

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-input` `.pl-textarea` `.pl-select` | Kontrolki tekstowe. |
| `.pl-form-field` | Opakowanie: etykieta + kontrolka + podpowiedź. |
| `.pl-form-label` | Etykieta. `.pl-form-required` dodaje gwiazdkę, `.pl-form-optional` — dopisek. |
| `.pl-form-help` | Tekst pomocniczy; `.pl-form-help-danger`, `-success`, `-warning`, `-split`. |
| `.pl-form-small` `.pl-form-large` | Rozmiary kontrolki. |
| `.pl-form-danger` `.pl-form-success` | Stany kontrolki (działają też pozostałe tony: `-primary`, `-warning`, `-info`). |
| `.pl-form-blank` | Pole bez ramki. |
| `.pl-form-width-xsmall` … `-large` | Stałe szerokości. |
| `.pl-form-icon` | Opakowanie pola z ikoną; `.pl-form-icon-flip` — ikona po prawej. |
| `.pl-form-affix` | Pole z elementami wewnątrz (prefiks, sufiks, przyciski). |
| `.pl-form-clear` `.pl-form-action` | Małe przyciski wewnątrz pola. |
| `.pl-form-count` | Licznik znaków. |
| `.pl-form-actions` | Wiersz przycisków formularza. |
