---
title: Quantity
description: Licznik ilości z przyciskami − / + — zakres i krok z atrybutów pola, przytrzymanie powtarza zmianę, a liczba lekko podskakuje w stronę zmiany.
badge: JS
---

## Podstawowe użycie

Dodaj `data-pl-quantity` do kontenera `.pl-quantity` i umieść w nim pole `<input type="number">`. Przyciski tworzy JS. Zakres i krok komponent bierze z atrybutów `min`, `max` i `step` pola.

```html example center
<div class="pl-quantity" data-pl-quantity>
  <input type="number" name="ilosc" value="1" min="1" max="10" aria-label="Ilość">
</div>
```

Strzałki <kbd>↑</kbd> / <kbd>↓</kbd> zmieniają wartość, przytrzymanie przycisku powtarza zmianę, a na krańcach zakresu przycisk się wyłącza. Wpisana ręcznie wartość spoza zakresu jest przycinana po opuszczeniu pola.

## Krok i zakres

```html example center
<div class="pl-quantity" data-pl-quantity>
  <input type="number" value="250" min="0" max="1000" step="50" aria-label="Gramatura">
</div>
<div class="pl-quantity" data-pl-quantity>
  <input type="number" value="1.5" min="0.5" max="5" step="0.5" aria-label="Długość w metrach">
</div>
```

## Rozmiary

```html example center
<div class="pl-quantity pl-quantity-small" data-pl-quantity><input type="number" value="1" min="1" aria-label="Ilość"></div>
<div class="pl-quantity" data-pl-quantity><input type="number" value="1" min="1" aria-label="Ilość"></div>
<div class="pl-quantity pl-quantity-large" data-pl-quantity><input type="number" value="1" min="1" aria-label="Ilość"></div>
```

## Warianty

`.pl-quantity-divided` oddziela przyciski liniami, `.pl-quantity-pill` zaokrągla całość, `.pl-quantity-ghost` usuwa ramkę (dobre do wierszy koszyka), a `.pl-quantity-block` rozciąga licznik na całą szerokość.

```html example column center
<div class="pl-quantity pl-quantity-divided" data-pl-quantity><input type="number" value="2" min="1" aria-label="Ilość"></div>
<div class="pl-quantity pl-quantity-pill" data-pl-quantity><input type="number" value="2" min="1" aria-label="Ilość"></div>
<div class="pl-quantity pl-quantity-ghost" data-pl-quantity><input type="number" value="2" min="1" aria-label="Ilość"></div>
<div class="pl-width-medium">
  <div class="pl-quantity pl-quantity-block pl-quantity-divided" data-pl-quantity><input type="number" value="2" min="1" aria-label="Ilość"></div>
</div>
```

## Obok przycisku

```html example center
<div class="pl-flex pl-gap-small">
  <div class="pl-quantity pl-quantity-large" data-pl-quantity>
    <input type="number" name="ilosc" value="1" min="1" max="14" aria-label="Ilość">
  </div>
  <button class="pl-button pl-button-primary pl-button-large" type="button">
    <span data-pl-icon="shopping-bag"></span> Dodaj do koszyka
  </button>
</div>
```

## Reakcja na zmianę

Zdarzenie `pl:change` niesie nową i poprzednią wartość.

```html example column center
<div class="pl-quantity" id="demo-quantity" data-pl-quantity>
  <input type="number" value="1" min="1" max="20" aria-label="Ilość">
</div>
<p class="pl-margin-remove">Razem: <strong id="demo-quantity-sum">89 zł</strong></p>
```

```js example-js
document.getElementById('demo-quantity').addEventListener('pl:change', (event) => {
  document.getElementById('demo-quantity-sum').textContent = `${event.detail.value * 89} zł`;
});
```

## Stan wyłączony

```html example center
<div class="pl-quantity pl-disabled" data-pl-quantity>
  <input type="number" value="3" disabled aria-label="Ilość">
</div>
```

## API

### Opcje

| Opcja | Typ | Domyślnie | Opis |
| --- | --- | --- | --- |
| `min` | number | atrybut `min` lub `0` | Najmniejsza wartość. |
| `max` | number | atrybut `max` lub brak | Największa wartość. |
| `step` | number | atrybut `step` lub `1` | Krok zmiany. |
| `repeat` | boolean | `true` | Przytrzymanie przycisku powtarza zmianę. |
| `minus-label` | string | `'Mniej'` | Etykieta ARIA przycisku −. |
| `plus-label` | string | `'Więcej'` | Etykieta ARIA przycisku +. |

### Metody

```js
const quantity = Plossy.quantity('#demo-quantity');
quantity.value = 5;
quantity.step(-1);
```

| Metoda | Opis |
| --- | --- |
| `value` | Getter / setter wartości. |
| `set(wartość)` | Ustawia wartość (przycina do zakresu). |
| `step(kierunek)` | Zmienia wartość o krok: `1` w górę, `-1` w dół. |
| `disable(stan)` | Wyłącza (`true`) lub włącza (`false`) licznik. |

### Zdarzenia

| Zdarzenie | Opis |
| --- | --- |
| `pl:change` | Zmiana przez użytkownika. `detail.value`, `detail.previous`. |

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-quantity` | Kontener. |
| `.pl-quantity-input` | Pole z liczbą (klasę dodaje JS). |
| `.pl-quantity-button` | Przycisk; `.pl-quantity-minus` / `.pl-quantity-plus`. |
| `.pl-quantity-small`, `.pl-quantity-large` | Rozmiary. |
| `.pl-quantity-divided`, `.pl-quantity-pill`, `.pl-quantity-ghost`, `.pl-quantity-block` | Warianty. |
| `.pl-disabled` | Stan wyłączony. |
