---
title: Totop
description: Przycisk powrotu na górę strony z płynnym przewijaniem. W wariancie przyklejonym pojawia się sprężyście po przewinięciu i może pokazywać postęp czytania.
badge: JS
---

## Podstawowe użycie

Dodaj klasę `.pl-totop` i atrybut `data-pl-totop` do pustego linku. Strzałkę rysuje CSS, a kliknięcie płynnie przewija stronę do góry.

```html example center
<a href="#" class="pl-totop" data-pl-totop></a>
```

## Tony

Domyślny przycisk jest neutralny. Klasy `.pl-totop-{ton}` wypełniają go kolorem.

```html example center
<a href="#" class="pl-totop" data-pl-totop></a>
<a href="#" class="pl-totop pl-totop-primary" data-pl-totop></a>
<a href="#" class="pl-totop pl-totop-secondary" data-pl-totop></a>
<a href="#" class="pl-totop pl-totop-success" data-pl-totop></a>
```

## Rozmiary i kształt

`.pl-totop-small`, `.pl-totop-large` oraz `.pl-totop-square` (zaokrąglony kwadrat).

```html example center
<a href="#" class="pl-totop pl-totop-small" data-pl-totop></a>
<a href="#" class="pl-totop" data-pl-totop></a>
<a href="#" class="pl-totop pl-totop-large" data-pl-totop></a>
<a href="#" class="pl-totop pl-totop-square" data-pl-totop></a>
<a href="#" class="pl-totop pl-totop-square pl-totop-primary pl-totop-large" data-pl-totop></a>
```

## Własna ikona

Gdy element ma treść, strzałka z CSS znika — wstaw dowolną ikonę.

```html example center
<a href="#" class="pl-totop" data-pl-totop aria-label="Wróć na górę"><span data-pl-icon="chevron-up"></span></a>
<a href="#" class="pl-totop pl-totop-secondary" data-pl-totop aria-label="Wróć na górę"><span data-pl-icon="rocket"></span></a>
```

## Pierścień postępu

Z klasą `.pl-totop-progress` wokół przycisku rysuje się pierścień pokazujący, jak daleko przewinięto stronę. Przewiń tę stronę, aby zobaczyć, jak się wypełnia.

```html example center
<a href="#" class="pl-totop pl-totop-progress" data-pl-totop></a>
<a href="#" class="pl-totop pl-totop-progress pl-totop-large" data-pl-totop></a>
<a href="#" class="pl-totop pl-totop-progress pl-totop-primary" data-pl-totop></a>
<a href="#" class="pl-totop pl-totop-progress pl-totop-secondary pl-totop-large" data-pl-totop></a>
```

## Przyklejony

`.pl-totop-fixed` przykleja przycisk do prawego dolnego rogu okna. Jest ukryty, dopóki strona nie zostanie przewinięta o `offset` pikseli (domyślnie 400) — wtedy sprężyście się pojawia. Ta strona ma taki przycisk: przewiń w dół i spójrz w prawy dolny róg.

```html example center
<p class="pl-text-muted">Przycisk z tego przykładu pojawi się w rogu okna po przewinięciu o 300 px.</p>
<a href="#" class="pl-totop pl-totop-fixed pl-totop-progress" data-pl-totop="offset: 300"></a>
```

`.pl-totop-left` przenosi go do lewego rogu. Odległość od krawędzi ustawisz zmiennymi `--pl-totop-x` i `--pl-totop-y`.

```html
<a href="#" class="pl-totop pl-totop-fixed pl-totop-left pl-totop-primary"
   style="--pl-totop-x: 2rem; --pl-totop-y: 2rem" data-pl-totop="offset: 800"></a>
```

## Przewijanie do elementu

Jeśli `href` wskazuje kotwicę (`#id`) albo podasz opcję `target`, przycisk przewinie do tego elementu zamiast na samą górę.

```html example center
<a href="#podstawowe-użycie" class="pl-button pl-button-soft" data-pl-totop><span data-pl-icon="arrow-up"></span> Wróć do sekcji „Podstawowe użycie"</a>
```

## Zdarzenia i JavaScript

Instancję pobierzesz przez `Plossy.totop(element)`. Zdarzenie `pl:beforescroll` można anulować.

```html example center
<a href="#" class="pl-totop pl-totop-primary" id="demo-totop" data-pl-totop></a>
<span class="pl-text-muted" id="demo-totop-log">Kliknij — przewijanie zostanie anulowane.</span>
```

```js example-js
const totop = document.getElementById('demo-totop');
const log = document.getElementById('demo-totop-log');
let count = 0;
totop.addEventListener('pl:beforescroll', (event) => {
  event.preventDefault();
  log.textContent = `Anulowano przewijanie (${++count}×). Postęp strony: ${Math.round(
    parseFloat(totop.style.getPropertyValue('--pl-totop-progress')) * 100,
  )}%`;
});
```

## API

### Opcje

Opcje podaje się w atrybucie: `data-pl-totop="offset: 600; focus: false"`. Sama liczba (`data-pl-totop="600"`) ustawia `offset`.

| Opcja | Typ | Domyślnie | Opis |
| --- | --- | --- | --- |
| `offset` | liczba | `400` | Po ilu pikselach przewinięcia element dostaje klasę `cls` (pojawia się wariant `.pl-totop-fixed`). |
| `target` | selektor | `''` | Element, do którego przewijamy. Domyślnie góra strony lub kotwica z `href`. |
| `focus` | boolean | `true` | Po przewinięciu przenosi fokus na cel (lub początek dokumentu), aby klawisz Tab ruszał od góry. |
| `cls` | string | `pl-active` | Klasa nadawana po przekroczeniu `offset`. |

### Metody

| Metoda | Opis |
| --- | --- |
| `scroll()` | Przewija do celu (płynnie; natychmiast przy `prefers-reduced-motion`). |
| `refresh()` | Przelicza widoczność i postęp przewijania. |
| `destroy()` | Odpina zdarzenia. |

### Zdarzenia

| Zdarzenie | Opis |
| --- | --- |
| `pl:beforescroll` | Przed przewinięciem; `preventDefault()` je anuluje. |
| `pl:scroll` | Po uruchomieniu przewijania; `detail.target` to element docelowy lub `null`. |
| `pl:show` | Strona przewinięta poza `offset` (nadano `.pl-active`). |
| `pl:hide` | Powrót powyżej `offset`. |

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-totop` | Przycisk; pusty rysuje strzałkę w CSS. |
| `.pl-totop-primary` … `.pl-totop-info` | Tony (pełne wypełnienie). |
| `.pl-totop-small` `.pl-totop-large` | Rozmiary. |
| `.pl-totop-square` | Zaokrąglony kwadrat. |
| `.pl-totop-fixed` | Przyklejony do rogu okna; widoczny z `.pl-active`. |
| `.pl-totop-left` | Lewy róg (z `.pl-totop-fixed`). |
| `.pl-totop-progress` | Pierścień postępu przewijania (dla okrągłego przycisku). |

### Zmienne CSS

| Zmienna | Domyślnie | Opis |
| --- | --- | --- |
| `--pl-totop-size` | `2.75rem` | Rozmiar przycisku. |
| `--pl-totop-x` / `--pl-totop-y` | `1.5rem` | Odległość od krawędzi okna (wariant fixed). |
| `--pl-totop-progress` | ustawia JS | Postęp przewijania strony, 0…1. |
| `--pl-totop-ring` | `2px` | Grubość pierścienia. |
| `--pl-totop-ring-color` | `var(--pl-primary)` | Kolor pierścienia. |

### Dostępność

Pusty przycisk dostaje automatycznie `aria-label="Wróć na górę strony"` (własny atrybut ma pierwszeństwo). Ukryty wariant przyklejony jest niedostępny dla klawiatury, dopóki się nie pojawi.
