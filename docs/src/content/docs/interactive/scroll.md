---
title: Scroll
description: Płynne przewijanie do kotwic z kontrolą czasu, krzywej i odstępu od krawędzi. Aktualizuje adres i przenosi fokus na cel.
badge: JS
---

## Podstawowe użycie

Dodaj `data-pl-scroll` do linku z kotwicą. Przewijanie odbywa się w najbliższym przewijanym kontenerze celu — albo w oknie, jeśli takiego nie ma.

```html example
<p>
  <a class="pl-button pl-button-primary" href="#demo-scroll-end" data-pl-scroll>Przewiń na koniec listy</a>
</p>
<div class="pl-card" style="height: 16rem; overflow: auto">
  <div class="pl-card-body">
    <h4 id="demo-scroll-start">Dziennik zmian</h4>
    <p><strong>3.4</strong> — nowy edytor szablonów wiadomości i eksport do PDF.</p>
    <p><strong>3.3</strong> — skróty klawiszowe na liście zadań, szybsze wyszukiwanie.</p>
    <p><strong>3.2</strong> — integracja z kalendarzem, przypomnienia o terminach.</p>
    <p><strong>3.1</strong> — ciemny motyw i ustawienia dostępności.</p>
    <p><strong>3.0</strong> — całkowicie przebudowany panel projektu.</p>
    <p><strong>2.9</strong> — import danych z arkuszy kalkulacyjnych.</p>
    <p><strong>2.8</strong> — role i uprawnienia w zespołach.</p>
    <p id="demo-scroll-end"><strong>2.7</strong> — pierwsze wydanie publiczne. <a href="#demo-scroll-start" data-pl-scroll>Wróć na górę</a></p>
  </div>
</div>
```

## Odstęp od krawędzi

`offset` zostawia miejsce nad celem — przydaje się, gdy stronę przykrywa przyklejony nagłówek. Poniższy przycisk przewija całą stronę do sekcji API, zatrzymując się 96 px przed nią.

```html example center
<a class="pl-button" href="#api" data-pl-scroll="offset: 96">Przejdź do API</a>
```

Sama liczba w atrybucie (`data-pl-scroll="96"`) również ustawia `offset`.

## Czas i krzywa

`duration` to czas w milisekundach (domyślnie `auto` — zależny od dystansu), a `easing` wybiera krzywą ruchu.

```html example
<p class="pl-flex" style="flex-wrap: wrap; gap: .5rem">
  <a class="pl-button pl-button-small" href="#demo-scroll-b" data-pl-scroll="duration: 1500; easing: linear">linear · 1500 ms</a>
  <a class="pl-button pl-button-small" href="#demo-scroll-b" data-pl-scroll="duration: 900; easing: ease-out">ease-out · 900 ms</a>
  <a class="pl-button pl-button-small" href="#demo-scroll-b" data-pl-scroll="duration: 900; easing: spring">spring · 900 ms</a>
  <a class="pl-button pl-button-small" href="#demo-scroll-a" data-pl-scroll="duration: 300">Powrót · 300 ms</a>
</p>
<div class="pl-card" style="height: 14rem; overflow: auto">
  <div class="pl-card-body">
    <p id="demo-scroll-a"><strong>Początek.</strong> Wybierz jeden z przycisków powyżej i porównaj charakter ruchu.</p>
    <div style="height: 40rem; border-left: 2px dashed var(--pl-border-strong); margin-left: .5rem"></div>
    <p id="demo-scroll-b"><strong>Koniec.</strong> Dotarliśmy na miejsce.</p>
  </div>
</div>
```

Użytkownik może w każdej chwili przerwać animację kółkiem myszy, dotykiem lub klawiszami przewijania. Przy włączonym ograniczeniu ruchu w systemie strona przeskakuje do celu bez animacji.

## Adres i fokus

Po przewinięciu komponent dopisuje kotwicę do adresu i przenosi fokus na cel, żeby dalsza nawigacja klawiaturą zaczynała się we właściwym miejscu. Oba zachowania można wyłączyć.

```html
<a href="#kontakt" data-pl-scroll="hash: false; focus: false">Kontakt</a>
```

## Z JavaScript

Funkcja `Plossy.scroll.to(cel, opcje)` przewija bez żadnego znacznika. Zwraca `Promise` z wartością `true` po dotarciu do celu albo `false`, gdy użytkownik przerwał ruch.

```html example
<p>
  <button class="pl-button" id="demo-scroll-js" type="button">Przewiń do ostatniego wiersza</button>
  <small id="demo-scroll-log" style="margin-left: .5rem; color: var(--pl-text-muted)"></small>
</p>
<div class="pl-card" id="demo-scroll-box" style="height: 12rem; overflow: auto">
  <div class="pl-card-body">
    <p>Faktura 03/2025 — opłacona</p>
    <p>Faktura 04/2025 — opłacona</p>
    <p>Faktura 05/2025 — opłacona</p>
    <p>Faktura 06/2025 — opłacona</p>
    <p>Faktura 07/2025 — opłacona</p>
    <p>Faktura 08/2025 — opłacona</p>
    <p id="demo-scroll-last">Faktura 09/2025 — oczekuje na płatność</p>
  </div>
</div>
```

```js example-js
const log = document.querySelector('#demo-scroll-log');

document.querySelector('#demo-scroll-js').addEventListener('click', async () => {
  log.textContent = 'Przewijam…';
  const done = await Plossy.scroll.to('#demo-scroll-last', { duration: 800, easing: 'ease-out' });
  log.textContent = done ? 'Gotowe.' : 'Przerwano.';
});
```

## API

### Opcje

| Opcja | Typ | Domyślnie | Opis |
| --- | --- | --- | --- |
| `offset` | number | `0` | Odstęp nad celem, px. |
| `duration` | number \| string | `auto` | Czas animacji w ms; `auto` dobiera go do dystansu (280–1100 ms). |
| `easing` | string | `ease-in-out` | `linear`, `ease-in`, `ease-out`, `ease-in-out`, `spring`. |
| `hash` | boolean | `true` | Dopisuje kotwicę do adresu strony. |
| `focus` | boolean | `true` | Przenosi fokus na cel po przewinięciu. |

### Metody

| Metoda | Opis |
| --- | --- |
| `scrollTo(cel?)` | Przewija do celu instancji lub do podanego selektora / elementu. |
| `Plossy.scroll.to(cel, opcje)` | Funkcja statyczna. `cel` — selektor, element lub pozycja w px; opcje: `offset`, `duration`, `easing` (nazwa lub funkcja `t => number`), `container`. |

### Zdarzenia

| Zdarzenie | Opis |
| --- | --- |
| `pl:beforescroll` | Przed przewinięciem; `detail.target`. Można anulować przez `preventDefault()`. |
| `pl:scrolled` | Po zakończeniu; `detail.target`, `detail.completed` (`false`, gdy przerwano). |
