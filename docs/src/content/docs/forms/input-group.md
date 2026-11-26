---
title: Grupy pól
description: Łączenie pól z dodatkami — tekstem, ikonami, przyciskami i listami — we wspólnej ramce, oraz prefiksy i sufiksy wewnątrz samego pola.
order: 6
---

## Podstawowe użycie

`.pl-input-group` skleja swoje dzieci w jeden element ze wspólnym zaokrągleniem. Dodatek tekstowy to `.pl-input-group-text`.

```html example column narrow
<div class="pl-input-group">
  <span class="pl-input-group-text">@</span>
  <input class="pl-input" type="text" placeholder="nazwa_uzytkownika" aria-label="Nazwa użytkownika">
</div>
<div class="pl-input-group">
  <input class="pl-input" type="text" placeholder="twoja-firma" aria-label="Subdomena">
  <span class="pl-input-group-text">.plossy.app</span>
</div>
<div class="pl-input-group">
  <span class="pl-input-group-text">https://</span>
  <input class="pl-input" type="text" placeholder="example.com" aria-label="Domena">
  <span class="pl-input-group-text">/blog</span>
</div>
```

## Z ikoną

W dodatku może się znaleźć ikona.

```html example column narrow
<div class="pl-input-group">
  <span class="pl-input-group-text"><span data-pl-icon="phone"></span> +48</span>
  <input class="pl-input" type="tel" placeholder="600 700 800" aria-label="Numer telefonu">
</div>
<div class="pl-input-group">
  <span class="pl-input-group-text"><span data-pl-icon="credit-card"></span></span>
  <input class="pl-input" type="text" inputmode="numeric" placeholder="0000 0000 0000 0000" aria-label="Numer karty">
  <input class="pl-input pl-input-group-addon pl-form-width-xsmall" type="text" placeholder="MM/RR" aria-label="Data ważności">
</div>
```

## Z przyciskiem

Przyciski w grupie dopasowują wysokość i tracą wewnętrzne zaokrąglenia.

```html example column narrow
<div class="pl-input-group">
  <input class="pl-input" type="email" placeholder="Twój adres e-mail" aria-label="E-mail">
  <button class="pl-button pl-button-primary" type="button">Zapisz się</button>
</div>
<div class="pl-input-group">
  <input class="pl-input" type="text" value="https://plossy.app/zaproszenie/k3f9" readonly aria-label="Link z zaproszeniem">
  <button class="pl-button" type="button"><span data-pl-icon="copy"></span> Kopiuj</button>
</div>
<div class="pl-input-group">
  <button class="pl-button pl-button-icon" type="button" aria-label="Mniej"><span data-pl-icon="minus"></span></button>
  <input class="pl-input pl-text-center" type="text" inputmode="numeric" value="2" aria-label="Liczba sztuk">
  <button class="pl-button pl-button-icon" type="button" aria-label="Więcej"><span data-pl-icon="plus"></span></button>
</div>
```

## Z listą wyboru

Select z klasą `.pl-input-group-addon` zajmuje tylko tyle miejsca, ile potrzebuje.

```html example column narrow
<div class="pl-input-group">
  <input class="pl-input" type="text" inputmode="decimal" placeholder="0,00" aria-label="Kwota">
  <select class="pl-select pl-input-group-addon" aria-label="Waluta">
    <option>PLN</option>
    <option>EUR</option>
    <option>USD</option>
  </select>
</div>
<div class="pl-input-group">
  <select class="pl-select pl-input-group-addon" aria-label="Szukaj w">
    <option>Wszędzie</option>
    <option>Projekty</option>
    <option>Osoby</option>
  </select>
  <input class="pl-input" type="search" placeholder="Czego szukasz?" aria-label="Fraza">
  <button class="pl-button pl-button-secondary pl-button-icon" type="button" aria-label="Szukaj"><span data-pl-icon="search"></span></button>
</div>
```

## Rozmiary

Kontrolki dostają `.pl-form-small` / `.pl-form-large`, przyciski — `.pl-button-small` / `.pl-button-large`, a grupa — `.pl-input-group-small` / `.pl-input-group-large` (dopasowuje dodatki tekstowe).

```html example column narrow
<div class="pl-input-group pl-input-group-small">
  <span class="pl-input-group-text">zł</span>
  <input class="pl-input pl-form-small" type="text" placeholder="Mała grupa" aria-label="Kwota">
  <button class="pl-button pl-button-small" type="button">OK</button>
</div>
<div class="pl-input-group pl-input-group-large">
  <span class="pl-input-group-text">zł</span>
  <input class="pl-input pl-form-large" type="text" placeholder="Duża grupa" aria-label="Kwota">
  <button class="pl-button pl-button-primary pl-button-large" type="button">Zapłać</button>
</div>
```

## Prefiks i sufiks wewnątrz pola

`.pl-form-affix` wygląda jak jedno pole, ale mieści dodatkowe elementy: `.pl-form-prefix`, `.pl-form-suffix`, ikony oraz małe przyciski `.pl-form-action`. Fokus w środku podświetla całą ramkę.

```html example column narrow
<div class="pl-form-affix">
  <span class="pl-form-prefix">plossy.app/</span>
  <input class="pl-input" type="text" value="studio-kreska" aria-label="Adres profilu">
</div>
<div class="pl-form-affix">
  <input class="pl-input" type="text" inputmode="decimal" value="1 249,00" aria-label="Cena">
  <span class="pl-form-suffix">zł brutto</span>
</div>
<div class="pl-form-affix">
  <span data-pl-icon="search"></span>
  <input class="pl-input" type="text" value="krzesło biurowe" placeholder="Szukaj produktów" aria-label="Szukaj">
  <button class="pl-form-clear" type="button" data-pl-form-clear aria-label="Wyczyść"></button>
</div>
<div class="pl-form-affix">
  <span data-pl-icon="key"></span>
  <input class="pl-input" type="password" value="sk_live_8f2k19x0" aria-label="Klucz API">
  <button class="pl-form-action" type="button" data-pl-password-toggle><span data-pl-icon="eye"></span></button>
  <button class="pl-form-action" type="button" aria-label="Kopiuj"><span data-pl-icon="copy"></span></button>
</div>
```

## Rozmiary i stany pola z dodatkami

Klasy rozmiaru i stanu ustaw na opakowaniu `.pl-form-affix`.

```html example column narrow
<div class="pl-form-affix pl-form-small">
  <span class="pl-form-prefix">#</span>
  <input class="pl-input" type="text" value="20418" aria-label="Numer zamówienia">
</div>
<div class="pl-form-affix pl-form-large pl-form-danger">
  <input class="pl-input" type="text" value="12" aria-label="Rabat" aria-invalid="true">
  <span class="pl-form-suffix">%</span>
</div>
<div class="pl-form-affix">
  <span class="pl-form-prefix">kg</span>
  <input class="pl-input" type="text" value="Pole wyłączone" disabled aria-label="Waga">
</div>
```

## API

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-input-group` | Grupa sklejonych elementów. |
| `.pl-input-group-text` | Dodatek tekstowy / z ikoną. |
| `.pl-input-group-addon` | Na `.pl-select` lub `.pl-input`: element o szerokości treści zamiast rozciągania. |
| `.pl-input-group-small` `.pl-input-group-large` | Rozmiar dodatków tekstowych. |
| `.pl-form-affix` | Pole z elementami w środku. |
| `.pl-form-prefix` `.pl-form-suffix` | Tekst przed / za wartością. |
| `.pl-form-action` | Mały przycisk-ikona wewnątrz pola. |
| `.pl-form-clear` | Przycisk czyszczenia (z `data-pl-form-clear`). |
