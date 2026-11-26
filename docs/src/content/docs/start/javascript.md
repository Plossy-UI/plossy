---
title: JavaScript
description: Komponenty uruchamiają się same na podstawie atrybutów data-pl-*. Gdy potrzebujesz więcej — jest proste API, zdarzenia i możliwość pisania własnych komponentów.
order: 4
---

## Automatyczna inicjalizacja

Wystarczy atrybut. Plossy obserwuje dokument, więc elementy dodane później (np. z AJAX-a) również zostaną zainicjalizowane.

```html
<div class="pl-accordion" data-pl-accordion>…</div>
```

## Opcje

Opcje podajesz w wartości atrybutu jako pary `klucz: wartość` rozdzielone średnikami. Nazwy wieloczłonowe zapisuj z myślnikami. Typy (liczby, `true` / `false`) są rozpoznawane automatycznie; można też użyć JSON-a.

```html
<div data-pl-accordion="multiple: true; duration: 200">…</div>
<div data-pl-accordion='{"multiple": true, "duration": 200}'>…</div>
```

Wiele komponentów ma opcję główną — wtedy wystarczy sama wartość:

```html
<button data-pl-toggle="#panel">Pokaż</button>
<span data-pl-icon="heart"></span>
<button data-pl-tooltip="Zapisz zmiany">…</button>
```

## API

Globalny obiekt `Plossy` udostępnia funkcję dla każdego komponentu. Zwraca ona istniejącą instancję albo tworzy nową.

```js
const modal = Plossy.modal('#regulamin');
modal.show();

// Tworzenie z opcjami na elemencie bez atrybutu
Plossy.accordion(document.querySelector('.faq'), { multiple: true });
```

## Zdarzenia

Komponenty wysyłają zdarzenia z prefiksem `pl:`. Bąbelkują, więc można nasłuchiwać wyżej w drzewie; `event.detail.component` wskazuje instancję. Zdarzenia `before…` można anulować.

```js
document.querySelector('#regulamin').addEventListener('pl:beforehide', (event) => {
  if (!formularzZapisany) event.preventDefault();
});

document.addEventListener('pl:shown', (event) => {
  console.log('Pokazano', event.target, event.detail.component);
});
```

| Zdarzenie | Kiedy |
| --- | --- |
| `pl:beforeshow` / `pl:beforehide` | Przed pokazaniem / ukryciem (można anulować). |
| `pl:show` / `pl:hide` | Start animacji. |
| `pl:shown` / `pl:hidden` | Koniec animacji. |

## Własny komponent

Komponent to klasa dziedzicząca po `Plossy.Component`. Po rejestracji działa jak wbudowane: z atrybutem `data-pl-…`, opcjami i funkcją w `Plossy`.

```html example center
<button class="pl-button" type="button" data-pl-clicker="step: 5">Kliknięto 0 razy</button>
```

```js example-js
class Clicker extends Plossy.Component {
  static defaults = { step: 1 };

  init() {
    this.count = 0;
    this.on(this.el, 'click', () => {
      this.count += this.options.step;
      this.el.textContent = `Kliknięto ${this.count} razy`;
      this.emit('change', { count: this.count });
    });
  }
}

Plossy.register('clicker', Clicker);
```

| Element | Opis |
| --- | --- |
| `static defaults` | Domyślne opcje; tylko te klucze są odczytywane z atrybutu. |
| `static primary` | Nazwa opcji przyjmującej „gołą" wartość atrybutu. |
| `init()` | Punkt wejścia; tu ustawiaj stan instancji. |
| `this.el`, `this.options` | Element i scalone opcje. |
| `this.on(cel, typ, fn)` | Nasłuch sprzątany automatycznie w `destroy()`. |
| `this.emit(typ, detail, cancelable)` | Wysyła `pl:{typ}`; zwraca `false`, gdy anulowano. |

## Narzędzia

`Plossy.util` zawiera funkcje używane przez komponenty — przydatne także we własnym kodzie.

| Funkcja | Opis |
| --- | --- |
| `toggleHeight(el, show)` | Płynne rozwijanie / zwijanie elementu. |
| `place(floating, reference, opcje)` | Pozycjonuje element pływający względem innego (z odbiciem i dosunięciem do krawędzi). |
| `autoPlace(…)` | Jak wyżej, z aktualizacją przy przewijaniu; zwraca funkcję zatrzymującą. |
| `showLayer(el)` / `hideLayer(el)` | Pokazuje element w warstwie wierzchniej (Popover API). |
| `lockScroll()` / `unlockScroll()` | Blokada przewijania strony. |
| `animateClass(el, klasa)` | Dodaje klasę, czeka na koniec animacji i ją zdejmuje. |
| `focusables(el)` | Lista elementów możliwych do sfokusowania. |
| `debounce(fn, ms)`, `rafThrottle(fn)` | Ograniczanie częstotliwości wywołań. |
