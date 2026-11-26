---
title: OTP Input
description: Pole kodu jednorazowego złożone z osobnych kratek — z automatycznym przeskokiem, wklejaniem całego kodu, autouzupełnianiem z SMS i sprężystą animacją każdego znaku.
badge: JS
---

## Podstawowe użycie

Dodaj `data-pl-otp` do kontenera `.pl-otp` i umieść w nim zwykłe pole `<input>` — to ono trafi do formularza z pełnym kodem. Kratki tworzy JS; pierwsza ma `autocomplete="one-time-code"`, więc telefon podpowie kod z SMS-a.

```html example center
<div class="pl-otp" data-pl-otp="length: 6">
  <input type="text" name="kod">
</div>
```

Wpisanie znaku przenosi do następnej kratki, <kbd>Backspace</kbd> cofa, strzałki oraz <kbd>Home</kbd> / <kbd>End</kbd> poruszają się między polami. Wklejony kod (np. `123 456`) rozkłada się na wszystkie kratki.

## Długość i separator

`length` ustala liczbę znaków, a `separator` wstawia kreskę co N pól.

```html example column center
<div class="pl-otp" data-pl-otp="length: 4" aria-label="Kod PIN"></div>
<div class="pl-otp" data-pl-otp="length: 6; separator: 3"></div>
<div class="pl-otp" data-pl-otp="length: 8; separator: 4"></div>
```

## Kod alfanumeryczny

Domyślnie przyjmowane są tylko cyfry. `type: alphanumeric` dopuszcza też litery (zamieniane na wielkie) — np. dla kodów rabatowych lub kodów zapasowych.

```html example center
<div class="pl-otp" data-pl-otp="length: 8; type: alphanumeric; separator: 4" aria-label="Kod zapasowy">
  <input type="text" name="kod_zapasowy" value="K7PM">
</div>
```

## Maskowanie

`masked: true` ukrywa wpisane znaki — przydatne dla kodów PIN.

```html example center
<div class="pl-otp" data-pl-otp="length: 4; masked: true" aria-label="PIN do karty">
  <input type="text" name="pin" value="2741">
</div>
```

## Rozmiary

```html example column center
<div class="pl-otp pl-otp-small" data-pl-otp="length: 6"></div>
<div class="pl-otp" data-pl-otp="length: 6"></div>
<div class="pl-otp pl-otp-large" data-pl-otp="length: 6"></div>
```

## Warianty

`.pl-otp-joined` skleja kratki w jedną kontrolkę, `.pl-otp-line` zostawia same podkreślenia.

```html example column center
<div class="pl-otp pl-otp-joined" data-pl-otp="length: 6; separator: 3"></div>
<div class="pl-otp pl-otp-line" data-pl-otp="length: 6"></div>
```

## Weryfikacja: błąd i sukces

Zdarzenie `pl:complete` odpala się po wypełnieniu wszystkich pól. Metody `error()` i `success()` ustawiają stan — błąd potrząsa polami, sukces przechodzi po nich falą. W przykładzie poprawny kod to **246810**.

```html example column center
<div class="pl-text-center">
  <p class="pl-form-label" id="demo-otp-label">Wpisz kod z wiadomości SMS</p>
  <div class="pl-otp pl-otp-large" id="demo-otp-verify" data-pl-otp="length: 6; separator: 3" aria-labelledby="demo-otp-label"></div>
  <p class="pl-form-help" id="demo-otp-status">Kod wysłaliśmy na numer kończący się na 482.</p>
</div>
```

```js example-js
const el = document.querySelector('#demo-otp-verify');
const status = document.querySelector('#demo-otp-status');

el.addEventListener('pl:complete', (event) => {
  const otp = event.detail.component;
  status.textContent = 'Sprawdzam kod…';
  otp.disable();

  setTimeout(() => {
    otp.disable(false);
    if (event.detail.value === '246810') {
      otp.success();
      status.textContent = 'Kod poprawny — numer został potwierdzony.';
    } else {
      otp.error({ clear: true });
      status.textContent = 'Nieprawidłowy kod. Spróbuj jeszcze raz (podpowiedź: 246810).';
    }
  }, 700);
});
```

## Stany statyczne i pole wyłączone

Klasy `.pl-otp-danger` i `.pl-otp-success` możesz też nadać samodzielnie, np. po walidacji na serwerze. Atrybut `disabled` pola źródłowego wyłącza wszystkie kratki.

```html example column center
<div class="pl-otp pl-otp-danger" data-pl-otp="length: 6"><input type="text" value="135790"></div>
<div class="pl-otp pl-otp-success" data-pl-otp="length: 6"><input type="text" value="246810"></div>
<div class="pl-otp" data-pl-otp="length: 6"><input type="text" value="123" disabled></div>
```

## W formularzu

Opcja `submit: true` wysyła formularz, gdy tylko kod jest kompletny. Bez własnego pola `<input>` komponent utworzy pole ukryte o nazwie z opcji `name`.

```html example center
<form class="pl-card pl-card-body" id="demo-otp-form" style="max-width: 24rem">
  <h3 class="pl-card-title">Potwierdź logowanie</h3>
  <p class="pl-text-muted">Otwórz aplikację uwierzytelniającą i przepisz sześciocyfrowy kod.</p>
  <div class="pl-otp pl-margin-small-top" data-pl-otp="length: 6; name: totp; submit: true"></div>
  <p class="pl-form-help" id="demo-otp-form-out">Formularz wyśle się sam po wpisaniu kodu.</p>
  <button class="pl-button pl-button-primary pl-margin-small-top" type="submit">Zaloguj się</button>
</form>
```

```js example-js
const form = document.querySelector('#demo-otp-form');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const code = new FormData(form).get('totp');
  document.querySelector('#demo-otp-form-out').textContent = code
    ? `Wysłano formularz z polem totp=${code}.`
    : 'Najpierw wpisz kod.';
});
```

## API

### Opcje

Opcje przekazujesz w atrybucie: `data-pl-otp="length: 6; separator: 3"`. Sama liczba (`data-pl-otp="4"`) ustawia długość.

| Opcja | Typ | Domyślnie | Opis |
| --- | --- | --- | --- |
| `length` | number | `6` | Liczba znaków kodu. |
| `type` | string | `'numeric'` | `numeric` — same cyfry, `alphanumeric` — cyfry i litery. |
| `separator` | number | `0` | Kreska co N pól (`0` = brak). |
| `masked` | boolean | `false` | Ukrywa wpisywane znaki. |
| `name` | string | `''` | Nazwa pola ukrytego, gdy w kontenerze nie ma własnego `<input>`. |
| `autofocus` | boolean | `false` | Ustawia fokus na pierwszym pustym polu po inicjalizacji. |
| `submit` | boolean | `false` | Wysyła formularz po wpisaniu całego kodu. |
| `label` | string | `'Kod jednorazowy'` | Etykieta ARIA grupy, gdy brak `aria-label` / `aria-labelledby`. |

### Metody

```js
const otp = Plossy.otp('#kod');
otp.value;          // "246810"
otp.error({ clear: true });
```

| Metoda | Opis |
| --- | --- |
| `value` | Getter / setter aktualnego kodu. |
| `complete` | Getter — `true`, gdy wszystkie pola są wypełnione. |
| `setValue(kod)` | Ustawia kod. |
| `clear(focus)` | Czyści pola i stan; `clear(true)` ustawia też fokus. |
| `focus()` | Fokus na pierwszym pustym polu. |
| `error({ clear })` | Stan błędu z potrząśnięciem; `clear: true` czyści kod. |
| `success()` | Stan sukcesu z animacją fali. |
| `reset()` | Usuwa stan błędu / sukcesu. |
| `disable(stan)` | Wyłącza (`true`) lub włącza (`false`) pola. |

### Zdarzenia

| Zdarzenie | Opis |
| --- | --- |
| `pl:change` | Zmiana kodu. `detail.value`, `detail.complete`. |
| `pl:complete` | Wszystkie pola wypełnione. `detail.value` — pełny kod. |

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-otp` | Kontener. |
| `.pl-otp-box` | Pojedyncza kratka (tworzona przez JS); `.pl-otp-filled` — wypełniona. |
| `.pl-otp-group` | Grupa kratek między separatorami. |
| `.pl-otp-separator` | Kreska między grupami. |
| `.pl-otp-small`, `.pl-otp-large` | Rozmiary. |
| `.pl-otp-joined` | Kratki złączone w jedną kontrolkę. |
| `.pl-otp-line` | Same podkreślenia. |
| `.pl-otp-danger`, `.pl-otp-success` | Stany walidacji. |
