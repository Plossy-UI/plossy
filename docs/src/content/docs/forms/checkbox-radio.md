---
title: Checkbox i radio
description: Pola wyboru rysowane w CSS — ze znacznikiem, który „rysuje się" i sprężyście wyskakuje, stanem pośrednim, rozmiarami, tonami i wariantem kart.
order: 2
---

## Podstawowe użycie

Dodaj `.pl-checkbox` lub `.pl-radio` do natywnego pola. Etykieta `.pl-form-check` łączy kontrolkę z tekstem i powiększa obszar kliknięcia.

```html example column
<label class="pl-form-check">
  <input class="pl-checkbox" type="checkbox" checked>
  Zapamiętaj mnie na tym urządzeniu
</label>
<label class="pl-form-check">
  <input class="pl-checkbox" type="checkbox">
  Chcę otrzymywać newsletter (raz w miesiącu)
</label>
<label class="pl-form-check">
  <input class="pl-checkbox" type="checkbox" disabled>
  Opcja niedostępna w Twoim planie
</label>
```

## Radio

Pola radio o tej samej nazwie (`name`) tworzą grupę. `.pl-form-checks` układa je w kolumnie, a `.pl-form-checks-inline` — w wierszu.

```html example column
<div class="pl-form-checks" role="radiogroup" aria-label="Sposób dostawy">
  <label class="pl-form-check"><input class="pl-radio" type="radio" name="demo-delivery" checked> Kurier — 14,99 zł</label>
  <label class="pl-form-check"><input class="pl-radio" type="radio" name="demo-delivery"> Paczkomat — 9,99 zł</label>
  <label class="pl-form-check"><input class="pl-radio" type="radio" name="demo-delivery"> Odbiór osobisty — bezpłatnie</label>
</div>
<div class="pl-form-checks pl-form-checks-inline" role="radiogroup" aria-label="Rozmiar">
  <label class="pl-form-check"><input class="pl-radio" type="radio" name="demo-size"> S</label>
  <label class="pl-form-check"><input class="pl-radio" type="radio" name="demo-size" checked> M</label>
  <label class="pl-form-check"><input class="pl-radio" type="radio" name="demo-size"> L</label>
  <label class="pl-form-check"><input class="pl-radio" type="radio" name="demo-size" disabled> XL</label>
</div>
```

## Z opisem

Dłuższy opis umieść w `.pl-form-check-body` — tytuł i tekst pomocniczy `.pl-form-check-text` ułożą się jeden pod drugim.

```html example column
<label class="pl-form-check">
  <input class="pl-checkbox" type="checkbox" checked>
  <span class="pl-form-check-body">
    Powiadomienia o komentarzach
    <span class="pl-form-check-text">Wyślemy e-mail, gdy ktoś odpowie w Twoim wątku.</span>
  </span>
</label>
<label class="pl-form-check">
  <input class="pl-checkbox" type="checkbox">
  <span class="pl-form-check-body">
    Podsumowanie tygodnia
    <span class="pl-form-check-text">Najważniejsze zmiany w projektach w każdy poniedziałek.</span>
  </span>
</label>
```

## Stan pośredni

Stan `indeterminate` ustawia się wyłącznie skryptem. Typowe zastosowanie to pole „zaznacz wszystko".

```html example column
<label class="pl-form-check">
  <input class="pl-checkbox" type="checkbox" id="demo-all">
  <strong>Wszystkie uprawnienia</strong>
</label>
<div class="pl-form-checks" id="demo-perms" style="padding-left: 1.75rem">
  <label class="pl-form-check"><input class="pl-checkbox" type="checkbox" checked> Odczyt</label>
  <label class="pl-form-check"><input class="pl-checkbox" type="checkbox"> Edycja</label>
  <label class="pl-form-check"><input class="pl-checkbox" type="checkbox"> Usuwanie</label>
</div>
```

```js example-js
const all = document.querySelector('#demo-all');
const items = [...document.querySelectorAll('#demo-perms .pl-checkbox')];
const sync = () => {
  const checked = items.filter((item) => item.checked).length;
  all.checked = checked === items.length;
  all.indeterminate = checked > 0 && checked < items.length;
};
all.addEventListener('change', () => items.forEach((item) => (item.checked = all.checked)));
items.forEach((item) => item.addEventListener('change', sync));
sync();
```

## Rozmiary

`.pl-form-small` i `.pl-form-large` na kontrolce.

```html example row
<label class="pl-form-check"><input class="pl-checkbox pl-form-small" type="checkbox" checked> Mały</label>
<label class="pl-form-check"><input class="pl-checkbox" type="checkbox" checked> Domyślny</label>
<label class="pl-form-check"><input class="pl-checkbox pl-form-large" type="checkbox" checked> Duży</label>
<label class="pl-form-check"><input class="pl-radio pl-form-small" type="radio" name="demo-rs" checked> Mały</label>
<label class="pl-form-check"><input class="pl-radio" type="radio" name="demo-rm" checked> Domyślny</label>
<label class="pl-form-check"><input class="pl-radio pl-form-large" type="radio" name="demo-rl" checked> Duży</label>
```

## Tony

Klasy `.pl-form-{ton}` zmieniają kolor zaznaczenia.

```html example row
<input class="pl-checkbox pl-form-primary" type="checkbox" checked aria-label="Primary">
<input class="pl-checkbox pl-form-secondary" type="checkbox" checked aria-label="Secondary">
<input class="pl-checkbox pl-form-success" type="checkbox" checked aria-label="Success">
<input class="pl-checkbox pl-form-warning" type="checkbox" checked aria-label="Warning">
<input class="pl-checkbox pl-form-danger" type="checkbox" checked aria-label="Danger">
<input class="pl-checkbox pl-form-info" type="checkbox" checked aria-label="Info">
<input class="pl-radio pl-form-success" type="radio" name="demo-tone-a" checked aria-label="Success">
<input class="pl-radio pl-form-danger" type="radio" name="demo-tone-b" checked aria-label="Danger">
<input class="pl-radio pl-form-info" type="radio" name="demo-tone-c" checked aria-label="Info">
```

## Karty wyboru

`.pl-form-card` zamienia etykietę w klikalną kartę, która podświetla się po zaznaczeniu. W środku: `.pl-form-card-body` z `.pl-form-card-title` i `.pl-form-card-text`, opcjonalnie `.pl-form-card-meta` (np. cena).

```html example
<div class="pl-grid pl-grid-small pl-child-width-1-3@m" role="radiogroup" aria-label="Plan">
  <div>
    <label class="pl-form-card">
      <input class="pl-radio" type="radio" name="demo-plan">
      <span class="pl-form-card-body">
        <span class="pl-form-card-title">Start</span>
        <span class="pl-form-card-text">1 projekt, 2 osoby, 5 GB na pliki.</span>
        <span class="pl-form-card-meta" style="margin: 0.4rem 0 0">0 zł / mies.</span>
      </span>
    </label>
  </div>
  <div>
    <label class="pl-form-card">
      <input class="pl-radio" type="radio" name="demo-plan" checked>
      <span class="pl-form-card-body">
        <span class="pl-form-card-title">Zespół <span class="pl-badge pl-badge-primary">Polecany</span></span>
        <span class="pl-form-card-text">Bez limitu projektów, 15 osób, 100 GB.</span>
        <span class="pl-form-card-meta" style="margin: 0.4rem 0 0">49 zł / mies.</span>
      </span>
    </label>
  </div>
  <div>
    <label class="pl-form-card">
      <input class="pl-radio" type="radio" name="demo-plan">
      <span class="pl-form-card-body">
        <span class="pl-form-card-title">Firma</span>
        <span class="pl-form-card-text">SSO, dziennik zdarzeń, wsparcie 24/7.</span>
        <span class="pl-form-card-meta" style="margin: 0.4rem 0 0">199 zł / mies.</span>
      </span>
    </label>
  </div>
</div>
```

## Karty — warianty

`.pl-form-card-flip` przenosi kontrolkę na prawą stronę, a `.pl-form-card-plain` ukrywa ją wizualnie (zaznaczenie pokazuje sama karta). Karty działają też z polami checkbox.

```html example column narrow
<label class="pl-width-1-1 pl-form-card pl-form-card-flip">
  <input class="pl-checkbox" type="checkbox" checked>
  <span class="pl-form-card-body">
    <span class="pl-form-card-title"><span data-pl-icon="shield-check"></span> Ubezpieczenie przesyłki</span>
    <span class="pl-form-card-text">Ochrona do 5000 zł za 3,99 zł.</span>
  </span>
</label>
<label class="pl-width-1-1 pl-form-card pl-form-card-flip">
  <input class="pl-checkbox" type="checkbox">
  <span class="pl-form-card-body">
    <span class="pl-form-card-title"><span data-pl-icon="gift"></span> Zapakuj na prezent</span>
    <span class="pl-form-card-text">Papier, wstążka i bilecik z dedykacją.</span>
  </span>
</label>
<div class="pl-width-1-1 pl-flex" style="gap: 0.6rem" role="radiogroup" aria-label="Motyw">
  <label class="pl-form-card pl-form-card-plain">
    <input class="pl-radio" type="radio" name="demo-theme" checked>
    <span class="pl-form-card-title"><span data-pl-icon="sun"></span> Jasny</span>
  </label>
  <label class="pl-form-card pl-form-card-plain">
    <input class="pl-radio" type="radio" name="demo-theme">
    <span class="pl-form-card-title"><span data-pl-icon="moon"></span> Ciemny</span>
  </label>
  <label class="pl-form-card pl-form-card-plain">
    <input class="pl-radio" type="radio" name="demo-theme">
    <span class="pl-form-card-title"><span data-pl-icon="monitor"></span> System</span>
  </label>
</div>
```

## API

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-checkbox` | Pole wyboru (`<input type="checkbox">`). Obsługuje `:indeterminate`. |
| `.pl-radio` | Pole radio (`<input type="radio">`). |
| `.pl-form-check` | Etykieta z kontrolką i tekstem. `.pl-form-check-reverse` — kontrolka po prawej. |
| `.pl-form-check-body` `.pl-form-check-text` | Tytuł z opisem pod spodem. |
| `.pl-form-checks` | Grupa w kolumnie; `.pl-form-checks-inline` — w wierszu. |
| `.pl-form-small` `.pl-form-large` | Rozmiary kontrolki. |
| `.pl-form-primary` … `.pl-form-info` | Ton zaznaczenia. |
| `.pl-form-card` | Karta wyboru; `-flip` (kontrolka po prawej), `-plain` (kontrolka ukryta). |
| `.pl-form-card-body` `-title` `-text` `-meta` | Części karty. |

### Zmienne CSS

| Zmienna | Opis |
| --- | --- |
| `--pl-check-size` | Rozmiar kontrolki (domyślnie `1.125rem`). |
| `--pl-form-accent` | Kolor zaznaczenia. |
