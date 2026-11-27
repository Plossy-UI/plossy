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

## Cykl życia

Gdy element komponentu zostanie usunięty z dokumentu (podmiana treści z AJAX-a, przejście w aplikacji SPA, `remove()`), Plossy sam wywoła `destroy()` — dla wszystkich instancji w usuniętym fragmencie, także tych utworzonych z kodu. Odpinane są nasłuchy, zatrzymywane obserwatory i liczniki, usuwane elementy pływające (np. dymki).

- **Przeniesienie nie niszczy.** Element przeniesiony w inne miejsce (`append`, sortowanie, filtrowanie) zachowuje instancję. Dotyczy to także elementu odłączonego i wstawionego z powrotem w tym samym zadaniu — również po `await` na obietnicy, która jest już rozwiązana. Jeśli między odłączeniem a powrotem czekasz na sieć, timer, klatkę animacji lub zdarzenie, instancja zostanie zniszczona i przywrócona (patrz niżej) — chyba że użyjesz `data-pl-persist`.
- **Powrót do dokumentu.** Element odłączony na dłużej (np. na czas zapytania AJAX) i wstawiony ponownie odzyskuje tę samą instancję z pierwotnymi opcjami — referencja trzymana w kodzie dalej działa. Instancja uruchamia się jednak od nowa: to, co jest w Twoim HTML-u (wartości pól, zaznaczenia), zostaje, ale stan samego komponentu wraca do początkowego — karuzela do pierwszego slajdu, lista wybranych plików uploadu znika.
- **Jawne `destroy()`** jest ostateczne: element po ponownym wstawieniu nie odzyska instancji z kodu (komponent z atrybutu `data-pl-…` uruchomi się od nowa). Kolejne wywołania `destroy()` nic nie robią.

```js
const slider = Plossy.slider('#polecane');
const widok = document.querySelector('#widok');
widok.remove();              // po chwili: slider.destroy() — automatycznie
kontener.append(widok);      // ten sam obiekt `slider` działa dalej
```

Gdy widok ma przeżyć odłączenie razem ze stanem (np. zakładki SPA trzymane w pamięci, fragment koszyka odkładany na czas zapytania), oznacz atrybutem `data-pl-persist` sam odkładany element albo kontener, z którego wyjmujesz dzieci. Takich instancji Plossy nie niszczy — jeśli fragment nie wróci, wywołaj `destroy()` sam. Dawne zachowanie całej strony — bez automatycznego niszczenia — przywraca `Plossy.config.autoDestroy = false`.

```html
<section data-pl-persist>…</section>   <!-- odłączana sekcja zachowuje instancje -->
<main data-pl-persist>…</main>         <!-- dzieci wyjmowane z <main> też -->
```

Atrybut można też ustawić tylko na czas operacji:

```js
koszyk.setAttribute('data-pl-persist', '');
koszyk.remove();
const html = await fetch('/koszyk').then((r) => r.text()); // dowolnie długo
kontener.append(koszyk);
koszyk.removeAttribute('data-pl-persist');
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
| `this.onDestroy(fn)` | Własne sprzątanie: timery, obserwatory, elementy dodane do `body`. |
| `this.signal` | `AbortSignal` przerywany w `destroy()` — dla `fetch()` i sprawdzania po `await`. |
| `this.emit(typ, detail, cancelable)` | Wysyła `pl:{typ}`; zwraca `false`, gdy anulowano. |

## TypeScript

Paczka zawiera deklaracje typów (`dist/plossy.d.ts`) — edytor podpowiada opcje i metody każdego komponentu, a kompilator wyłapuje literówki. Nie trzeba niczego doinstalowywać.

```ts
import Plossy, { type PlossyEvent } from 'plossy';

const quantity = Plossy.quantity('#ilosc', { min: 1, max: 10 });
quantity?.step(1);

document.addEventListener('pl:change', (event) => {
  console.log(event.detail.value, event.detail.component);
});

// Gdy chcesz dokładnie opisać zawartość zdarzenia:
function onChange(event: PlossyEvent<{ value: number; previous: number }>) {
  console.log(event.detail.value - event.detail.previous);
}
```

Funkcje `Plossy.nazwa()` zwracają `null`, gdy element nie istnieje — stąd `?.` w przykładzie. Typy opcji są dostępne pod nazwami `{Komponent}Options` (np. `ModalOptions`, `SliderOptions`).

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
