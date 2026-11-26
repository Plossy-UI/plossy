---
title: Układy formularzy
description: Formularz pionowy, poziomy z kolumną etykiet, siatka pól, sekcje fieldset z legendą i wiersz przycisków — wszystko responsywne.
order: 8
---

## Układ pionowy

`.pl-form-stacked` ustawia równe odstępy między bezpośrednimi dziećmi formularza. Etykieta leży nad kontrolką. Klasa `.pl-form-required` na etykiecie dodaje gwiazdkę.

```html example narrow
<form class="pl-form-stacked">
  <div class="pl-form-field">
    <label class="pl-form-label pl-form-required" for="demo-l-name">Nazwa projektu</label>
    <input class="pl-input" id="demo-l-name" type="text" placeholder="Np. Nowa strona sklepu">
  </div>
  <div class="pl-form-field">
    <label class="pl-form-label" for="demo-l-owner">Opiekun</label>
    <select class="pl-select" id="demo-l-owner">
      <option>Marta Zielińska</option>
      <option>Tomasz Nowak</option>
      <option>Ola Wiśniewska</option>
    </select>
  </div>
  <div class="pl-form-field">
    <label class="pl-form-label" for="demo-l-desc">Opis <span class="pl-form-optional">opcjonalne</span></label>
    <textarea class="pl-textarea" id="demo-l-desc" rows="3" placeholder="Cel, zakres i najważniejsze terminy"></textarea>
  </div>
  <div class="pl-form-actions">
    <button class="pl-button pl-button-primary" type="submit">Utwórz projekt</button>
    <button class="pl-button pl-button-ghost" type="button">Anuluj</button>
  </div>
</form>
```

## Układ poziomy

W `.pl-form-horizontal` etykiety tworzą kolumnę po lewej, a kontrolki po prawej (od breakpointu `m`; na węższych ekranach układ wraca do pionowego). Tekst lub pola wyboru w miejscu kontrolki opakuj w `.pl-form-controls-text`, by wyrównały się do etykiety. Szerokość kolumny etykiet ustawia zmienna `--pl-form-label-w`.

```html example
<form class="pl-form-horizontal">
  <div class="pl-form-field">
    <label class="pl-form-label" for="demo-h-name">Nazwa firmy</label>
    <input class="pl-input" id="demo-h-name" type="text" value="Studio Kreska sp. z o.o.">
  </div>
  <div class="pl-form-field">
    <label class="pl-form-label" for="demo-h-nip">NIP</label>
    <input class="pl-input pl-form-width-medium" id="demo-h-nip" type="text" placeholder="000-000-00-00">
    <p class="pl-form-help">Potrzebny do wystawienia faktury.</p>
  </div>
  <div class="pl-form-field">
    <span class="pl-form-label">Adres e-mail</span>
    <div class="pl-form-controls-text">biuro@studiokreska.pl <a href="#">Zmień</a></div>
  </div>
  <div class="pl-form-field">
    <span class="pl-form-label" id="demo-h-invoice">Faktury</span>
    <div class="pl-form-checks" role="group" aria-labelledby="demo-h-invoice">
      <label class="pl-form-check"><input class="pl-checkbox" type="checkbox" checked> Wysyłaj faktury e-mailem</label>
      <label class="pl-form-check"><input class="pl-checkbox" type="checkbox"> Dołączaj zestawienie godzin</label>
    </div>
  </div>
  <div class="pl-form-field">
    <label class="pl-form-label" for="demo-h-notes">Uwagi</label>
    <textarea class="pl-textarea" id="demo-h-notes" rows="3"></textarea>
  </div>
  <div class="pl-form-actions">
    <button class="pl-button pl-button-primary" type="submit">Zapisz zmiany</button>
    <button class="pl-button" type="button">Anuluj</button>
  </div>
</form>
```

## Siatka pól

`.pl-form-grid` układa pola w dwóch kolumnach (od breakpointu `s`). Liczbę kolumn zmieniają `.pl-form-grid-3`, `-4`, `-6`, a rozpiętość pola — `.pl-form-span-2`, `-3` i `.pl-form-span-full`.

```html example
<form class="pl-form-grid pl-form-grid-6">
  <div class="pl-form-field pl-form-span-3">
    <label class="pl-form-label" for="demo-g-first">Imię</label>
    <input class="pl-input" id="demo-g-first" type="text" autocomplete="given-name">
  </div>
  <div class="pl-form-field pl-form-span-3">
    <label class="pl-form-label" for="demo-g-last">Nazwisko</label>
    <input class="pl-input" id="demo-g-last" type="text" autocomplete="family-name">
  </div>
  <div class="pl-form-field pl-form-span-full">
    <label class="pl-form-label" for="demo-g-street">Ulica i numer</label>
    <input class="pl-input" id="demo-g-street" type="text" autocomplete="street-address">
  </div>
  <div class="pl-form-field pl-form-span-2">
    <label class="pl-form-label" for="demo-g-zip">Kod pocztowy</label>
    <input class="pl-input" id="demo-g-zip" type="text" placeholder="00-000" autocomplete="postal-code">
  </div>
  <div class="pl-form-field pl-form-span-2">
    <label class="pl-form-label" for="demo-g-city">Miasto</label>
    <input class="pl-input" id="demo-g-city" type="text" autocomplete="address-level2">
  </div>
  <div class="pl-form-field pl-form-span-2">
    <label class="pl-form-label" for="demo-g-country">Kraj</label>
    <select class="pl-select" id="demo-g-country">
      <option>Polska</option>
      <option>Czechy</option>
      <option>Niemcy</option>
    </select>
  </div>
</form>
```

## Fieldset i legenda

Sekcje formularza grupuj w `<fieldset class="pl-fieldset">` z nagłówkiem `.pl-legend`. Kolejne sekcje oddziela włosowa linia. Atrybut `disabled` na fieldsecie wyłącza wszystkie pola w środku.

```html example narrow
<form>
  <fieldset class="pl-fieldset">
    <legend class="pl-legend">Dane kontaktowe <span class="pl-legend-text">Użyjemy ich tylko w sprawie zamówienia.</span></legend>
    <div class="pl-form-field">
      <label class="pl-form-label" for="demo-f-mail">E-mail</label>
      <input class="pl-input" id="demo-f-mail" type="email" placeholder="anna@example.com">
    </div>
    <div class="pl-form-field">
      <label class="pl-form-label" for="demo-f-phone">Telefon</label>
      <input class="pl-input" id="demo-f-phone" type="tel" placeholder="600 700 800">
    </div>
  </fieldset>
  <fieldset class="pl-fieldset">
    <legend class="pl-legend">Dostawa</legend>
    <div class="pl-form-checks">
      <label class="pl-form-check"><input class="pl-radio" type="radio" name="demo-f-ship" checked> Kurier, 1–2 dni robocze</label>
      <label class="pl-form-check"><input class="pl-radio" type="radio" name="demo-f-ship"> Paczkomat, 2–3 dni robocze</label>
    </div>
  </fieldset>
  <fieldset class="pl-fieldset" disabled>
    <legend class="pl-legend">Faktura <span class="pl-legend-text">Sekcja wyłączona — dostępna dla kont firmowych.</span></legend>
    <div class="pl-form-field">
      <label class="pl-form-label" for="demo-f-nip">NIP</label>
      <input class="pl-input" id="demo-f-nip" type="text">
    </div>
  </fieldset>
  <div class="pl-form-actions">
    <button class="pl-button pl-button-primary" type="submit">Zamawiam i płacę</button>
  </div>
</form>
```

## Formularz w jednym wierszu

Do krótkich formularzy (filtry, zapis na newsletter) wystarczą narzędzia flex.

```html example
<form class="pl-flex pl-flex-middle pl-flex-wrap" style="gap: 0.6rem">
  <div class="pl-form-icon pl-form-width-medium">
    <span data-pl-icon="search"></span>
    <input class="pl-input" type="search" placeholder="Szukaj zamówień" aria-label="Szukaj">
  </div>
  <select class="pl-select pl-form-width-small" aria-label="Status">
    <option>Wszystkie</option>
    <option>Opłacone</option>
    <option>W drodze</option>
  </select>
  <input class="pl-input pl-form-width-small" type="date" aria-label="Od dnia" value="2027-01-01">
  <label class="pl-form-check"><input class="pl-switch" type="checkbox" role="switch"> Tylko pilne</label>
  <button class="pl-button pl-button-secondary" type="submit">Filtruj</button>
</form>
```

## API

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-form-field` | Pole formularza: etykieta + kontrolka + podpowiedź. |
| `.pl-form-stacked` | Układ pionowy z równymi odstępami. |
| `.pl-form-horizontal` | Etykiety w kolumnie obok kontrolek (od `m`). |
| `.pl-form-controls-text` | Tekst w miejscu kontrolki, wyrównany do etykiety. |
| `.pl-form-grid` | Siatka pól; `.pl-form-grid-3`, `-4`, `-6` — liczba kolumn. |
| `.pl-form-span-2` `-3` `-full` | Rozpiętość pola w siatce. |
| `.pl-fieldset` `.pl-legend` `.pl-legend-text` | Sekcja formularza z nagłówkiem i opisem. |
| `.pl-form-actions` | Wiersz przycisków. |
| `.pl-form-required` `.pl-form-optional` | Gwiazdka / dopisek przy etykiecie. |

### Zmienne CSS

| Zmienna | Opis |
| --- | --- |
| `--pl-form-label-w` | Szerokość kolumny etykiet w układzie poziomym (domyślnie `12rem`). |
| `--pl-form-cols` | Liczba kolumn siatki. |
