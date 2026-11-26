---
title: Rating
description: Gwiazdki ocen — sam odczyt w czystym CSS (także ułamki, np. 4,3) oraz wybór oceny z klawiaturą, podglądem przy najechaniu i sprężystą animacją.
badge: JS
---

## Tylko do odczytu

Do pokazania oceny nie trzeba JavaScriptu. Wystarczy `.pl-rating` i wartość w zmiennej `--pl-rating-value` — wypełnienie liczy CSS, więc działają też ułamki. Dodaj `role="img"` i `aria-label`, żeby ocenę odczytał czytnik ekranu.

```html example center
<span class="pl-rating" style="--pl-rating-value: 4.3" role="img" aria-label="Ocena 4,3 na 5"></span>
```

```html example column center
<div class="pl-flex pl-flex-middle pl-gap-small">
  <span class="pl-rating" style="--pl-rating-value: 5" role="img" aria-label="Ocena 5 na 5"></span>
  <strong>5,0</strong> <span class="pl-text-muted">· 96 opinii</span>
</div>
<div class="pl-flex pl-flex-middle pl-gap-small">
  <span class="pl-rating" style="--pl-rating-value: 3.5" role="img" aria-label="Ocena 3,5 na 5"></span>
  <strong>3,5</strong> <span class="pl-text-muted">· 21 opinii</span>
</div>
<div class="pl-flex pl-flex-middle pl-gap-small">
  <span class="pl-rating" style="--pl-rating-value: 1.2" role="img" aria-label="Ocena 1,2 na 5"></span>
  <strong>1,2</strong> <span class="pl-text-muted">· 2 opinie</span>
</div>
```

## Wybór oceny

Atrybut `data-pl-rating` zamienia kontener w grupę pól radio w kształcie gwiazdek. Działają strzałki, a wartość trafia do formularza pod nazwą z opcji `name`. Ponowne kliknięcie wybranej gwiazdki zeruje ocenę (wyłączysz to opcją `clearable: false`).

```html example center
<div class="pl-rating" data-pl-rating="value: 3; name: ocena" aria-label="Twoja ocena"></div>
```

## Reakcja na zmianę

Komponent wysyła zdarzenie `pl:change` z nową wartością.

```html example column center
<div class="pl-rating pl-rating-large" id="demo-rating" data-pl-rating aria-label="Jak oceniasz zakup?"></div>
<p class="pl-text-muted pl-margin-remove" id="demo-rating-text">Kliknij gwiazdkę.</p>
```

```js example-js
const teksty = ['Kliknij gwiazdkę.', 'Słabo', 'Tak sobie', 'W porządku', 'Dobrze', 'Świetnie!'];
document.getElementById('demo-rating').addEventListener('pl:change', (event) => {
  document.getElementById('demo-rating-text').textContent = teksty[event.detail.value];
});
```

## Rozmiary

```html example column center
<span class="pl-rating pl-rating-small" style="--pl-rating-value: 4" role="img" aria-label="Ocena 4 na 5"></span>
<span class="pl-rating" style="--pl-rating-value: 4" role="img" aria-label="Ocena 4 na 5"></span>
<span class="pl-rating pl-rating-large" style="--pl-rating-value: 4" role="img" aria-label="Ocena 4 na 5"></span>
```

Dowolny rozmiar ustawisz zmienną `--pl-rating-size`.

## Kolory i skala

Kolor wypełnienia zmieniają klasy `.pl-rating-primary`, `.pl-rating-danger` i `.pl-rating-ink` albo zmienna `--pl-rating-color`. Liczbę gwiazdek ustawia opcja `max` (dla wersji bez JS — zmienna `--pl-rating-max`).

```html example column center
<span class="pl-rating pl-rating-primary" style="--pl-rating-value: 4" role="img" aria-label="Ocena 4 na 5"></span>
<span class="pl-rating pl-rating-ink" style="--pl-rating-value: 2.5" role="img" aria-label="Ocena 2,5 na 5"></span>
<span class="pl-rating" style="--pl-rating-value: 7.5; --pl-rating-max: 10" role="img" aria-label="Ocena 7,5 na 10"></span>
<div class="pl-rating pl-rating-danger" data-pl-rating="value: 2; max: 3" aria-label="Poziom ostrości"></div>
```

## Stany

```html example column center
<div class="pl-rating" data-pl-rating="value: 4; readonly: true" aria-label="Ocena zablokowana"></div>
<div class="pl-rating pl-disabled" data-pl-rating="value: 2" aria-label="Ocena wyłączona"></div>
```

## API

### Opcje

| Opcja | Typ | Domyślnie | Opis |
| --- | --- | --- | --- |
| `value` | number | `0` | Wartość początkowa. Opcja główna: `data-pl-rating="3"`. |
| `max` | number | `5` | Liczba gwiazdek. |
| `name` | string | `''` | Nazwa pól radio — pod nią ocena trafia do formularza. |
| `readonly` | boolean | `false` | Blokuje zmianę. |
| `clearable` | boolean | `true` | Ponowne kliknięcie wybranej gwiazdki zeruje ocenę. |
| `label` | string | `'Ocena'` | Etykieta ARIA grupy, gdy brak `aria-label` / `aria-labelledby`. |

### Metody

```js
const rating = Plossy.rating('#demo-rating');
rating.value = 4;
```

| Metoda | Opis |
| --- | --- |
| `value` | Getter / setter oceny. |
| `set(wartość)` | Ustawia ocenę. |
| `clear()` | Zeruje ocenę. |
| `disable(stan)` | Wyłącza (`true`) lub włącza (`false`) kontrolkę. |

### Zdarzenia

| Zdarzenie | Opis |
| --- | --- |
| `pl:change` | Zmiana oceny. `detail.value` — nowa wartość. |

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-rating` | Kontener; bez `data-pl-rating` rysuje ocenę z `--pl-rating-value`. |
| `.pl-rating-star` | Pojedyncza gwiazdka (tworzona przez JS); `.pl-active` — zaznaczona. |
| `.pl-rating-small`, `.pl-rating-large` | Rozmiary. |
| `.pl-rating-primary`, `.pl-rating-danger`, `.pl-rating-ink` | Kolory. |
| `.pl-disabled` | Stan wyłączony. |
