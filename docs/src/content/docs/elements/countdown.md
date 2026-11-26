---
title: Countdown
description: Odliczanie do wybranej daty lub przez zadaną liczbę sekund. Każda cyfra zmienia się z osobną, sprężystą animacją.
badge: JS
---

## Podstawowe użycie

Dodaj `data-pl-countdown` z datą w formacie ISO 8601. Wewnątrz umieść komórki `.pl-countdown-number` z klasami jednostek: `.pl-countdown-days`, `-hours`, `-minutes`, `-seconds`. Pusty element `.pl-countdown-separator` rysuje dwukropek, który „tyka" razem z zegarem.

```html example center
<div class="pl-countdown" data-pl-countdown="date: 2027-01-01T00:00:00">
  <div class="pl-countdown-item">
    <div class="pl-countdown-number pl-countdown-days"></div>
    <div class="pl-countdown-label">Dni</div>
  </div>
  <div class="pl-countdown-separator"></div>
  <div class="pl-countdown-item">
    <div class="pl-countdown-number pl-countdown-hours"></div>
    <div class="pl-countdown-label">Godzin</div>
  </div>
  <div class="pl-countdown-separator"></div>
  <div class="pl-countdown-item">
    <div class="pl-countdown-number pl-countdown-minutes"></div>
    <div class="pl-countdown-label">Minut</div>
  </div>
  <div class="pl-countdown-separator"></div>
  <div class="pl-countdown-item">
    <div class="pl-countdown-number pl-countdown-seconds"></div>
    <div class="pl-countdown-label">Sekund</div>
  </div>
</div>
```

Data bez strefy czasowej jest interpretowana w czasie lokalnym użytkownika. Aby wskazać konkretny moment, dodaj strefę: `2027-01-01T00:00:00+01:00`.

## Odliczanie względne

Opcja `seconds` odlicza podaną liczbę sekund od chwili załadowania strony. Jednostki, których nie ma w znacznikach, „spływają" do mniejszych — bez komórki dni godziny pokażą łączną liczbę godzin, a bez godzin minuty pokażą łączną liczbę minut.

```html example center
<div class="pl-countdown pl-countdown-small" data-pl-countdown="seconds: 5400">
  <div class="pl-countdown-item">
    <div class="pl-countdown-number pl-countdown-minutes"></div>
    <div class="pl-countdown-label">Minut</div>
  </div>
  <div class="pl-countdown-separator"></div>
  <div class="pl-countdown-item">
    <div class="pl-countdown-number pl-countdown-seconds"></div>
    <div class="pl-countdown-label">Sekund</div>
  </div>
</div>
```

## Warianty

### Karty

`.pl-countdown-card` umieszcza każdą jednostkę na osobnej karcie.

```html example center
<div class="pl-countdown pl-countdown-card" data-pl-countdown="date: 2027-06-21T12:00:00">
  <div class="pl-countdown-item">
    <div class="pl-countdown-number pl-countdown-days"></div>
    <div class="pl-countdown-label">Dni</div>
  </div>
  <div class="pl-countdown-item">
    <div class="pl-countdown-number pl-countdown-hours"></div>
    <div class="pl-countdown-label">Godzin</div>
  </div>
  <div class="pl-countdown-item">
    <div class="pl-countdown-number pl-countdown-minutes"></div>
    <div class="pl-countdown-label">Minut</div>
  </div>
  <div class="pl-countdown-item">
    <div class="pl-countdown-number pl-countdown-seconds"></div>
    <div class="pl-countdown-label">Sekund</div>
  </div>
</div>
```

### Wypełnione i atramentowe

`.pl-countdown-muted` daje miękkie tło bez ramki, a `.pl-countdown-ink` — odwrócone, ciemne karty z limonkową etykietą ostatniej jednostki.

```html example center
<div class="pl-countdown pl-countdown-muted" data-pl-countdown="seconds: 93784">
  <div class="pl-countdown-item">
    <div class="pl-countdown-number pl-countdown-days"></div>
    <div class="pl-countdown-label">Dni</div>
  </div>
  <div class="pl-countdown-item">
    <div class="pl-countdown-number pl-countdown-hours"></div>
    <div class="pl-countdown-label">Godzin</div>
  </div>
  <div class="pl-countdown-item">
    <div class="pl-countdown-number pl-countdown-minutes"></div>
    <div class="pl-countdown-label">Minut</div>
  </div>
  <div class="pl-countdown-item">
    <div class="pl-countdown-number pl-countdown-seconds"></div>
    <div class="pl-countdown-label">Sekund</div>
  </div>
</div>
```

```html example center
<div class="pl-countdown pl-countdown-ink" data-pl-countdown="seconds: 7325">
  <div class="pl-countdown-item">
    <div class="pl-countdown-number pl-countdown-hours"></div>
    <div class="pl-countdown-label">Godzin</div>
  </div>
  <div class="pl-countdown-separator"></div>
  <div class="pl-countdown-item">
    <div class="pl-countdown-number pl-countdown-minutes"></div>
    <div class="pl-countdown-label">Minut</div>
  </div>
  <div class="pl-countdown-separator"></div>
  <div class="pl-countdown-item">
    <div class="pl-countdown-number pl-countdown-seconds"></div>
    <div class="pl-countdown-label">Sekund</div>
  </div>
</div>
```

### W linii tekstu

`.pl-countdown-inline` dopasowuje odliczanie do otaczającego tekstu — do banerów, przycisków i etykiet.

```html example
<div class="pl-alert pl-alert-warning">
  <span class="pl-alert-icon"><span data-pl-icon="timer"></span></span>
  <div class="pl-alert-body">
    Rezerwacja koszyka wygaśnie za
    <strong class="pl-countdown pl-countdown-inline" data-pl-countdown="seconds: 899">
      <span class="pl-countdown-item"><span class="pl-countdown-number pl-countdown-minutes"></span><span class="pl-countdown-label">min</span></span>
      <span class="pl-countdown-item"><span class="pl-countdown-number pl-countdown-seconds"></span><span class="pl-countdown-label">s</span></span>
    </strong>
  </div>
</div>
```

## Animacja cyfr

Domyślnie cyfry wsuwają się z góry. `.pl-countdown-flip` obraca je wokół osi poziomej, a `.pl-countdown-fade` przenika z lekkim rozmyciem. Animowana jest tylko ta cyfra, która faktycznie się zmieniła. Przy `prefers-reduced-motion` cyfry podmieniają się bez animacji.

```html example center
<div class="pl-countdown pl-countdown-card pl-countdown-flip pl-countdown-small" data-pl-countdown="seconds: 3599">
  <div class="pl-countdown-item">
    <div class="pl-countdown-number pl-countdown-minutes"></div>
    <div class="pl-countdown-label">Flip · min</div>
  </div>
  <div class="pl-countdown-item">
    <div class="pl-countdown-number pl-countdown-seconds"></div>
    <div class="pl-countdown-label">Flip · s</div>
  </div>
</div>
<div class="pl-countdown pl-countdown-card pl-countdown-fade pl-countdown-small" data-pl-countdown="seconds: 3599">
  <div class="pl-countdown-item">
    <div class="pl-countdown-number pl-countdown-minutes"></div>
    <div class="pl-countdown-label">Fade · min</div>
  </div>
  <div class="pl-countdown-item">
    <div class="pl-countdown-number pl-countdown-seconds"></div>
    <div class="pl-countdown-label">Fade · s</div>
  </div>
</div>
```

## Rozmiary i tony

`.pl-countdown-small` i `.pl-countdown-large` zmieniają skalę, a klasy tonów (`.pl-countdown-primary` … `-info`) kolorują liczby.

```html example center
<div class="pl-countdown pl-countdown-large pl-countdown-primary" data-pl-countdown="date: 2027-09-01T09:00:00">
  <div class="pl-countdown-item">
    <div class="pl-countdown-number pl-countdown-days"></div>
    <div class="pl-countdown-label">Dni</div>
  </div>
  <div class="pl-countdown-separator"></div>
  <div class="pl-countdown-item">
    <div class="pl-countdown-number pl-countdown-hours"></div>
    <div class="pl-countdown-label">Godzin</div>
  </div>
  <div class="pl-countdown-separator"></div>
  <div class="pl-countdown-item">
    <div class="pl-countdown-number pl-countdown-minutes"></div>
    <div class="pl-countdown-label">Minut</div>
  </div>
</div>
```

## Sterowanie i zdarzenie końca

Z opcją `autostart: false` odliczanie czeka na wywołanie `start()`. Po dojściu do zera komponent wysyła zdarzenie `pl:end` i dostaje klasę `.pl-countdown-ended`. Metoda `reset()` ustawia licznik od nowa — także z nową wartością.

```html example center
<div class="pl-countdown pl-countdown-card pl-countdown-danger" id="demo-countdown" data-pl-countdown="seconds: 10; autostart: false">
  <div class="pl-countdown-item">
    <div class="pl-countdown-number pl-countdown-seconds"></div>
    <div class="pl-countdown-label">Sekund</div>
  </div>
</div>
<div>
  <button class="pl-button pl-button-small pl-button-primary" id="demo-countdown-start" type="button">Start</button>
  <button class="pl-button pl-button-small" id="demo-countdown-stop" type="button">Pauza</button>
  <button class="pl-button pl-button-small" id="demo-countdown-reset" type="button">Od nowa</button>
  <small id="demo-countdown-log" style="margin-left: .5rem; color: var(--pl-text-muted)"></small>
</div>
```

```js example-js
const countdown = Plossy.countdown('#demo-countdown');
const log = document.querySelector('#demo-countdown-log');

document.querySelector('#demo-countdown-start').addEventListener('click', () => countdown.start());
document.querySelector('#demo-countdown-stop').addEventListener('click', () => countdown.stop());
document.querySelector('#demo-countdown-reset').addEventListener('click', () => {
  countdown.reset({ seconds: 10 });
  log.textContent = '';
});

countdown.el.addEventListener('pl:end', () => {
  log.textContent = 'Czas minął!';
});
```

## Dostępność

Kontener dostaje `role="timer"`. Animowane cyfry są ukryte przed czytnikami ekranu — zamiast nich komponent utrzymuje niewidoczny tekst z pozostałym czasem, odświeżany co minutę, a nie co sekundę.

## API

### Opcje

Opcje przekazujesz w atrybucie: `data-pl-countdown="date: 2027-01-01T00:00:00"` lub samą datę: `data-pl-countdown="2027-01-01T00:00:00"`.

| Opcja | Typ | Domyślnie | Opis |
| --- | --- | --- | --- |
| `date` | string \| number | `''` | Data docelowa (ISO 8601) lub znacznik czasu w milisekundach. |
| `seconds` | number | `0` | Odliczanie względne — liczba sekund od startu. Używane, gdy brak `date`. |
| `autostart` | boolean | `true` | Uruchamia odliczanie od razu. |
| `pad` | number | `2` | Minimalna liczba cyfr w komórce (uzupełniana zerami). |
| `reload` | boolean | `false` | Po dojściu do zera odliczanie względne zaczyna się od nowa. |

### Metody

| Metoda | Opis |
| --- | --- |
| `start()` | Uruchamia lub wznawia odliczanie. |
| `stop()` | Zatrzymuje. Odliczanie względne wznowi się od tego samego miejsca; przy dacie bezwzględnej czas płynie dalej. |
| `reset(options?)` | Ustawia licznik od nowa; opcjonalnie z nowym `date` lub `seconds`. |

### Zdarzenia

| Zdarzenie | Opis |
| --- | --- |
| `pl:tick` | Co sekundę. `detail` zawiera `days`, `hours`, `minutes`, `seconds` (obecne jednostki) oraz `remaining` w ms. |
| `pl:end` | Odliczanie dobiegło końca. |

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-countdown` | Kontener. |
| `.pl-countdown-item` | Komórka: liczba + etykieta. |
| `.pl-countdown-number` | Liczba; razem z `.pl-countdown-days`, `-hours`, `-minutes` lub `-seconds`. |
| `.pl-countdown-label` | Etykieta jednostki. |
| `.pl-countdown-separator` | Dwukropek rysowany w CSS. |
| `.pl-countdown-card`, `-muted`, `-ink` | Warianty komórek. |
| `.pl-countdown-inline` | Odliczanie w linii tekstu. |
| `.pl-countdown-flip`, `.pl-countdown-fade` | Rodzaj animacji cyfr. |
| `.pl-countdown-small`, `.pl-countdown-large` | Rozmiary. |
| `.pl-countdown-primary` … `.pl-countdown-info` | Ton liczb. |
| `.pl-countdown-running`, `.pl-countdown-ended` | Klasy stanu ustawiane przez skrypt. |

### Zmienne CSS

| Zmienna | Opis |
| --- | --- |
| `--pl-countdown-size` | Rozmiar cyfr. |
| `--pl-countdown-gap` | Odstęp między komórkami. |
| `--pl-countdown-progress` | Ustawiana przez skrypt: postęp od 0 do 1 — do własnych pasków postępu. |
