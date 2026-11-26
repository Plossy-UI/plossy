---
title: Password Strength
description: Segmentowy miernik siły hasła z etykietą słowną i listą wymagań, które odhaczają się na żywo podczas pisania.
badge: JS
---

## Podstawowe użycie

Owiń pole hasła elementem z `data-pl-strength`. Komponent dopisze pod polem miernik z czterech segmentów i etykietę: **Słabe**, **Średnie**, **Dobre** lub **Silne**. Kolor przechodzi od czerwieni przez bursztyn do zieleni.

```html example narrow
<div class="pl-form-field">
  <label class="pl-form-label" for="demo-strength-basic">Nowe hasło</label>
  <div data-pl-strength>
    <input class="pl-input" type="password" id="demo-strength-basic" placeholder="Wpisz hasło" autocomplete="new-password">
  </div>
</div>
```

## Lista wymagań

`rules: true` dodaje listę czterech reguł — długość, mała i wielka litera, cyfra, znak specjalny. Każda spełniona reguła dostaje animowany znaczek.

```html example narrow
<div class="pl-form-field">
  <label class="pl-form-label" for="demo-strength-rules">Hasło do konta</label>
  <div data-pl-strength="rules: true">
    <input class="pl-input" type="text" id="demo-strength-rules" value="Zielona7" autocomplete="off">
  </div>
</div>
```

## Minimalna długość

`min-length` zmienia próg długości (domyślnie 8). Hasło krótsze od progu zawsze jest „słabe"; długie hasła-zdania dostają dodatkowy punkt nawet bez znaków specjalnych.

```html example narrow
<div class="pl-form-field">
  <label class="pl-form-label" for="demo-strength-min">Hasło administratora</label>
  <div data-pl-strength="min-length: 12; rules: true">
    <input class="pl-input" type="text" id="demo-strength-min" value="Kawa-o-7-rano" autocomplete="off">
  </div>
  <span class="pl-form-help">Konta administracyjne wymagają co najmniej 12 znaków.</span>
</div>
```

## Poziomy siły

Ocena (`score`) to liczba od 0 do 4, zapisywana też w atrybucie `data-score` — możesz na niej oprzeć własne style.

```html example
<div class="pl-grid pl-child-width-1-2@s">
  <div><div data-pl-strength><input class="pl-input" type="text" value="kot" aria-label="Hasło słabe"></div></div>
  <div><div data-pl-strength><input class="pl-input" type="text" value="kotwica2" aria-label="Hasło średnie"></div></div>
  <div><div data-pl-strength><input class="pl-input" type="text" value="Kotwica22" aria-label="Hasło dobre"></div></div>
  <div><div data-pl-strength><input class="pl-input" type="text" value="Kotwica#22!" aria-label="Hasło silne"></div></div>
</div>
```

## Warianty

`.pl-strength-stacked` przenosi etykietę pod miernik, `.pl-strength-large` pogrubia segmenty, a `.pl-strength-rules-columns` układa reguły w kolumnach. `label: false` ukrywa etykietę.

```html example
<div class="pl-grid pl-child-width-1-2@m">
  <div>
    <div class="pl-strength-stacked pl-strength-large" data-pl-strength>
      <input class="pl-input" type="text" value="Jesien2026" aria-label="Hasło">
    </div>
  </div>
  <div>
    <div data-pl-strength="label: false">
      <input class="pl-input" type="text" value="mewa!Sopot" aria-label="Hasło">
    </div>
  </div>
</div>
<div class="pl-margin-top" data-pl-strength>
  <input class="pl-input" type="text" value="Rower-3-biegi" aria-label="Hasło">
  <div class="pl-strength-bar">
    <div class="pl-strength-meter"></div>
    <span class="pl-strength-label"></span>
  </div>
  <ul class="pl-strength-rules pl-strength-rules-columns"></ul>
</div>
```

Jak widać w ostatnim przykładzie, elementy `.pl-strength-bar`, `.pl-strength-meter`, `.pl-strength-label` i `.pl-strength-rules` możesz umieścić samodzielnie — komponent użyje ich zamiast tworzyć własne.

## Własne reguły i etykiety

Lista wymagań może mieć własne treści: pozycje `.pl-strength-rule` z atrybutem `data-rule` (`length`, `case`, `digit`, `symbol`). Etykiety poziomów zmienisz opcją `labels`.

```html example narrow
<div class="pl-form-field">
  <label class="pl-form-label" for="demo-strength-custom">Hasło do skarbca</label>
  <div data-pl-strength="min-length: 10; labels: Kiepskie, Ujdzie, Porządne, Pancerne">
    <input class="pl-input" type="text" id="demo-strength-custom" value="Sezamie!" autocomplete="off">
    <ul class="pl-strength-rules">
      <li class="pl-strength-rule" data-rule="length">Dziesięć znaków lub więcej</li>
      <li class="pl-strength-rule" data-rule="symbol">Przynajmniej jeden symbol</li>
      <li class="pl-strength-rule" data-rule="digit">Jakaś cyfra dla pewności</li>
    </ul>
  </div>
</div>
```

## Zdarzenie zmiany

`pl:change` niesie ocenę i stan reguł — wygodne do blokowania przycisku, dopóki hasło nie jest wystarczająco dobre.

```html example narrow
<form id="demo-strength-form">
  <div class="pl-form-field">
    <label class="pl-form-label" for="demo-strength-event">Ustaw hasło</label>
    <div data-pl-strength="rules: true">
      <input class="pl-input" type="password" id="demo-strength-event" placeholder="Minimum „Dobre”" autocomplete="new-password">
    </div>
  </div>
  <button class="pl-button pl-button-primary pl-margin-top" type="submit" disabled>Zapisz hasło</button>
</form>
```

```js example-js
const form = document.querySelector('#demo-strength-form');
const button = form.querySelector('button');

form.addEventListener('pl:change', (event) => {
  button.disabled = event.detail.score < 3;
});
form.addEventListener('submit', (event) => {
  event.preventDefault();
  Plossy.notification?.({ message: 'Hasło zapisane.', status: 'success' });
});
```

## API

### Opcje

Opcje przekazujesz w atrybucie: `data-pl-strength="min-length: 10; rules: true"`.

| Opcja | Typ | Domyślnie | Opis |
| --- | --- | --- | --- |
| `min-length` | number | `8` | Minimalna długość hasła. |
| `rules` | boolean | `false` | Tworzy listę wymagań odhaczanych na żywo. |
| `label` | boolean | `true` | Pokazuje etykietę słowną. |
| `labels` | string / array | `Słabe, Średnie, Dobre, Silne` | Etykiety czterech poziomów (rozdzielone przecinkami). |
| `empty-label` | string | `''` | Etykieta dla pustego pola. |
| `input` | string | `''` | Selektor pola hasła, jeśli leży poza komponentem. |

### Metody

| Metoda | Opis |
| --- | --- |
| `check(hasło)` | Zwraca `{ score, rules }` dla podanego tekstu (bez zmiany widoku). |
| `update()` | Przelicza ocenę na podstawie bieżącej wartości pola. |
| `score` | Właściwość — aktualna ocena 0–4. |
| `rules` | Właściwość — stan reguł: `{ length, case, digit, symbol }`. |

### Zdarzenia

| Zdarzenie | Opis |
| --- | --- |
| `pl:change` | Po każdej zmianie pola. `detail.score` (0–4), `detail.label`, `detail.rules`, `detail.value`, `detail.changed` (czy ocena się zmieniła). |

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-strength` | Kontener (dodawana automatycznie); atrybut `data-score="0…4"`. |
| `.pl-strength-bar` | Wiersz z miernikiem i etykietą. |
| `.pl-strength-meter` | Miernik; segmenty `.pl-strength-segment`, wypełnione mają `.pl-active`. |
| `.pl-strength-label` | Etykieta słowna. |
| `.pl-strength-rules` | Lista wymagań; `.pl-strength-rules-columns` — w kolumnach. |
| `.pl-strength-rule` | Wymaganie (`data-rule`); spełnione ma `.pl-active`. |
| `.pl-strength-stacked` | Etykieta pod miernikiem. |
| `.pl-strength-large` | Grubsze segmenty. |
