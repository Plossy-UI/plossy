---
title: Counter
description: Animowany licznik, który odlicza do zadanej wartości, gdy pojawi się na ekranie. Formatuje liczby po polsku i nie powoduje drgania układu.
badge: JS
---

## Podstawowe użycie

Podaj wartość docelową w atrybucie `data-pl-counter`. Licznik rusza, gdy element wejdzie w widok. Cyfry mają stałą szerokość (`tabular-nums`), więc tekst obok nie skacze.

```html example center
<span class="demo-counter" data-pl-counter="12500"></span>
```

```css example-css
.demo-counter {
  font-family: var(--pl-font-display);
  font-size: var(--pl-text-4xl);
  font-weight: 620;
  letter-spacing: -0.03em;
  line-height: 1;
}
```

Wartość można też wpisać w treści elementu — przydatne, gdy liczba ma być widoczna bez JavaScriptu.

```html example center
<span class="demo-counter" data-pl-counter>48 300</span>
```

## Przedrostek, przyrostek, miejsca dziesiętne

```html example
<div class="pl-grid pl-child-width-1-3@s" style="text-align: center">
  <div>
    <div class="demo-counter" data-pl-counter="to: 98.6; decimals: 1; suffix: %"></div>
    <p>zadowolonych klientów</p>
  </div>
  <div>
    <div class="demo-counter" data-pl-counter="to: 2400; suffix: ' zł'"></div>
    <p>oszczędności rocznie</p>
  </div>
  <div>
    <div class="demo-counter" data-pl-counter="to: 350; suffix: +"></div>
    <p>wdrożeń w Polsce</p>
  </div>
</div>
```

## Formatowanie

Domyślnie liczby formatuje `Intl.NumberFormat('pl-PL')`: spacja jako separator tysięcy i przecinek dziesiętny. Opcje `separator` i `decimal` podmieniają znaki, a `locale` zmienia cały format.

```html example
<div class="pl-grid pl-child-width-1-3@s" style="text-align: center">
  <div>
    <div class="demo-counter" data-pl-counter="to: 1000; decimals: 2"></div>
    <p>domyślnie (pl-PL)</p>
  </div>
  <div>
    <div class="demo-counter" data-pl-counter="to: 1000; decimals: 2; separator: '.'"></div>
    <p><code>separator: '.'</code></p>
  </div>
  <div>
    <div class="demo-counter" data-pl-counter="to: 1000; decimals: 2; locale: en-US"></div>
    <p><code>locale: en-US</code></p>
  </div>
</div>
```

## Czas, opóźnienie i kierunek

`duration` ustawia czas animacji, `delay` opóźnia start, a `from` wyznacza wartość początkową — może być większa od końcowej, wtedy licznik odlicza w dół.

```html example
<div class="pl-grid pl-child-width-1-3@s" style="text-align: center">
  <div>
    <div class="demo-counter" data-pl-counter="to: 500; duration: 600"></div>
    <p>szybko — 600 ms</p>
  </div>
  <div>
    <div class="demo-counter" data-pl-counter="to: 500; duration: 3000; delay: 400"></div>
    <p>wolno, z opóźnieniem</p>
  </div>
  <div>
    <div class="demo-counter" data-pl-counter="from: 100; to: 0; duration: 2400; easing: linear; suffix: ' s'"></div>
    <p>odliczanie w dół</p>
  </div>
</div>
```

## Powtarzanie

Domyślnie animacja odtwarza się raz. Z `once: false` licznik zeruje się po zniknięciu z ekranu i startuje ponownie przy każdym powrocie.

```html example scroll
<p>Przewiń w dół…</p>
<div style="height: 26rem"></div>
<p style="text-align: center"><span class="demo-counter" data-pl-counter="to: 7250; once: false"></span></p>
<div style="height: 26rem"></div>
<p>…i wróć.</p>
```

## W praktyce

```html example
<div class="pl-grid pl-child-width-1-2 pl-child-width-1-4@m">
  <div>
    <div class="pl-card"><div class="pl-card-body">
      <div class="pl-card-meta">Przychód</div>
      <div class="demo-counter" style="font-size: var(--pl-text-2xl)" data-pl-counter="to: 184250; suffix: ' zł'"></div>
    </div></div>
  </div>
  <div>
    <div class="pl-card"><div class="pl-card-body">
      <div class="pl-card-meta">Zamówienia</div>
      <div class="demo-counter" style="font-size: var(--pl-text-2xl)" data-pl-counter="to: 1392; delay: 100"></div>
    </div></div>
  </div>
  <div>
    <div class="pl-card"><div class="pl-card-body">
      <div class="pl-card-meta">Konwersja</div>
      <div class="demo-counter" style="font-size: var(--pl-text-2xl)" data-pl-counter="to: 3.84; decimals: 2; suffix: %; delay: 200"></div>
    </div></div>
  </div>
  <div>
    <div class="pl-card"><div class="pl-card-body">
      <div class="pl-card-meta">Średni koszyk</div>
      <div class="demo-counter" style="font-size: var(--pl-text-2xl)" data-pl-counter="to: 132.4; decimals: 2; suffix: ' zł'; delay: 300"></div>
    </div></div>
  </div>
</div>
```

## Sterowanie z JavaScript

Z `autostart: false` licznik czeka na wywołanie `start()`. Metoda przyjmuje opcjonalnie nową wartość docelową.

```html example center
<span class="demo-counter" id="demo-counter-js" data-pl-counter="to: 2025; autostart: false; duration: 1200"></span>
<button class="pl-button pl-button-primary" id="demo-counter-start" type="button">Start</button>
<button class="pl-button" id="demo-counter-random" type="button">Losowa wartość</button>
<small id="demo-counter-log" style="color: var(--pl-text-muted)"></small>
```

```js example-js
const counter = Plossy.counter('#demo-counter-js');
const log = document.querySelector('#demo-counter-log');

document.querySelector('#demo-counter-start').addEventListener('click', () => counter.start());
document.querySelector('#demo-counter-random').addEventListener('click', () => {
  counter.start(Math.round(Math.random() * 90000) + 1000);
});

counter.el.addEventListener('pl:start', () => (log.textContent = 'Liczę…'));
counter.el.addEventListener('pl:complete', (event) => (log.textContent = `Koniec: ${event.detail.value}`));
```

## Dostępność

Czytniki ekranu od razu otrzymują wartość końcową — animowane cyfry są przed nimi ukryte. Przy włączonym ograniczeniu ruchu licznik pokazuje wynik bez animacji.

## API

### Opcje

Sama wartość atrybutu (`data-pl-counter="12500"`) trafia do opcji `to`.

| Opcja | Typ | Domyślnie | Opis |
| --- | --- | --- | --- |
| `to` | number | treść elementu | Wartość końcowa. |
| `from` | number | `0` | Wartość początkowa. |
| `duration` | number | `1600` | Czas animacji w milisekundach. |
| `delay` | number | `0` | Opóźnienie startu w milisekundach. |
| `decimals` | number | `0` | Liczba miejsc po przecinku. |
| `separator` | string | wg `locale` | Separator tysięcy (np. `' '`, `'.'`, pusty `''`). |
| `decimal` | string | wg `locale` | Separator dziesiętny. |
| `prefix` | string | — | Tekst przed liczbą. |
| `suffix` | string | — | Tekst po liczbie. Spacje wymagają cudzysłowu: `suffix: ' zł'`. |
| `locale` | string | `pl-PL` | Ustawienia regionalne formatowania. |
| `easing` | string | `ease-out` | `linear`, `ease-out`, `ease-in-out`. |
| `once` | boolean | `true` | Animuj tylko przy pierwszym wejściu w widok. |
| `autostart` | boolean | `true` | Startuj po wejściu w widok. |

### Metody

| Metoda | Opis |
| --- | --- |
| `start(to?)` | Uruchamia lub restartuje odliczanie; opcjonalnie do nowej wartości. |
| `reset()` | Zatrzymuje i wraca do wartości początkowej. |
| `stop()` | Zatrzymuje animację w bieżącym miejscu. |

### Zdarzenia

| Zdarzenie | Opis |
| --- | --- |
| `pl:start` | Odliczanie ruszyło. |
| `pl:complete` | Osiągnięto wartość końcową; `detail.value`. |
