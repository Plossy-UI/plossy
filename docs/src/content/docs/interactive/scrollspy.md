---
title: Scrollspy
description: Uruchamia animacje, gdy elementy wchodzą w obszar widoku, oraz podświetla w nawigacji sekcję, którą właśnie czytasz.
badge: JS
---

## Podstawowe użycie

Element z `data-pl-scrollspy` jest niewidoczny (`.pl-invisible`), dopóki nie pojawi się na ekranie. Wtedy dostaje klasę podaną w `cls`. Przewiń stronę, aby zobaczyć kolejne przykłady w akcji.

```html example
<div class="pl-card" data-pl-scrollspy="cls: pl-animation-slide-up">
  <div class="pl-card-body">
    <h3 class="pl-card-title">Raport kwartalny gotowy</h3>
    <p>Ta karta wjechała od dołu w chwili, gdy pojawiła się w oknie przeglądarki.</p>
  </div>
</div>
```

## Grupy z opóźnieniem

Opcja `target` wskazuje elementy wewnątrz kontenera, a `delay` rozsuwa ich animacje w czasie — powstaje kaskada.

```html example
<div class="pl-grid pl-child-width-1-3@s" data-pl-scrollspy="cls: pl-animation-slide-up; target: > *; delay: 120">
  <div>
    <div class="pl-card"><div class="pl-card-body"><h4 class="pl-card-title">Szybkość</h4><p>Strony ładują się poniżej sekundy.</p></div></div>
  </div>
  <div>
    <div class="pl-card"><div class="pl-card-body"><h4 class="pl-card-title">Prostota</h4><p>Konfiguracja w jednym pliku.</p></div></div>
  </div>
  <div>
    <div class="pl-card"><div class="pl-card-body"><h4 class="pl-card-title">Wsparcie</h4><p>Odpowiadamy w ciągu godziny.</p></div></div>
  </div>
</div>
```

## Różne animacje w grupie

Pojedynczy element może nadpisać klasę atrybutem `data-pl-scrollspy-class`.

```html example
<div class="pl-grid pl-child-width-1-3@s" data-pl-scrollspy="cls: pl-animation-fade; target: > * > .pl-card; delay: 150">
  <div>
    <div class="pl-card" data-pl-scrollspy-class="pl-animation-slide-right"><div class="pl-card-body">Z lewej strony</div></div>
  </div>
  <div>
    <div class="pl-card"><div class="pl-card-body">Domyślne zanikanie</div></div>
  </div>
  <div>
    <div class="pl-card" data-pl-scrollspy-class="pl-animation-slide-left"><div class="pl-card-body">Z prawej strony</div></div>
  </div>
</div>
```

## Powtarzanie

Z `repeat: true` animacja odtwarza się przy każdym wejściu w widok — klasa jest zdejmowana, gdy element znika z ekranu. Przewiń poniższy obszar w górę i w dół.

```html example scroll
<p>Przewiń w dół…</p>
<div style="height: 28rem"></div>
<div class="pl-card pl-card-primary" data-pl-scrollspy="cls: pl-animation-scale-up; repeat: true">
  <div class="pl-card-body">Pojawiam się za każdym razem, gdy wracasz.</div>
</div>
<div style="height: 28rem"></div>
<p>…i z powrotem w górę.</p>
```

## Przesunięcie progu

`offset-top` i `offset-left` powiększają (wartości dodatnie) lub pomniejszają (ujemne) obszar uznawany za widoczny. Wartość `-120` oznacza, że element musi wejść 120 px w głąb okna, zanim ruszy animacja.

```html example
<div class="pl-card pl-card-muted" data-pl-scrollspy="cls: pl-animation-fade; offset-top: -120">
  <div class="pl-card-body">Animuję się dopiero 120 px nad dolną krawędzią okna.</div>
</div>
```

## Bez ukrywania

`hidden: false` nie ukrywa elementu przed wejściem w widok — przydatne, gdy klasa nie jest animacją wejścia, tylko np. zmianą wyglądu.

```html example
<span class="pl-label" data-pl-scrollspy="cls: pl-label-solid; hidden: false; offset-top: -80">Zmieniam styl po wejściu w widok</span>
```

## Zdarzenia

Każdy obserwowany element wysyła `pl:inview` i (przy `repeat: true`) `pl:outview`.

```html example scroll
<p><small id="demo-scrollspy-log" style="position: sticky; top: 0; color: var(--pl-text-muted)">Przewiń, aby wywołać zdarzenie.</small></p>
<div style="height: 24rem"></div>
<div class="pl-card" id="demo-scrollspy-events" data-pl-scrollspy="cls: pl-animation-slide-up; repeat: true">
  <div class="pl-card-body">Obserwowana karta</div>
</div>
<div style="height: 24rem"></div>
```

```js example-js
const card = document.querySelector('#demo-scrollspy-events');
const log = document.querySelector('#demo-scrollspy-log');

card.addEventListener('pl:inview', () => (log.textContent = 'pl:inview — karta jest w widoku'));
card.addEventListener('pl:outview', () => (log.textContent = 'pl:outview — karta poza widokiem'));
```

## Nawigacja śledząca sekcje

Drugi komponent, `data-pl-scrollspy-nav`, podświetla link prowadzący do sekcji, która jest aktualnie przy górnej krawędzi przewijanego obszaru. Klasa trafia na element wskazany w `closest` (domyślnie `li`). Z `scroll: true` kliknięcie przewija płynnie.

```html example
<div class="pl-grid" style="align-items: start">
  <div class="pl-width-1-3">
    <ul class="pl-nav pl-nav-default" data-pl-scrollspy-nav="closest: li; scroll: true; offset: 12">
      <li><a href="#demo-spy-wstep">Wstęp</a></li>
      <li><a href="#demo-spy-instalacja">Instalacja</a></li>
      <li><a href="#demo-spy-konfiguracja">Konfiguracja</a></li>
      <li><a href="#demo-spy-wdrozenie">Wdrożenie</a></li>
    </ul>
  </div>
  <div class="pl-width-expand">
    <div class="pl-card" style="height: 18rem; overflow: auto" tabindex="0" role="region" aria-label="Przewijana treść">
      <div class="pl-card-body">
        <h4 id="demo-spy-wstep">Wstęp</h4>
        <p>Przewodnik przeprowadzi Cię od pustego katalogu do działającej strony. Każdy krok zajmuje kilka minut i nie wymaga wcześniejszego doświadczenia.</p>
        <p>Zacznij od sprawdzenia, czy masz zainstalowany Node.js w wersji 20 lub nowszej.</p>
        <h4 id="demo-spy-instalacja">Instalacja</h4>
        <p>Pobierz paczkę z rejestru npm i dołącz arkusz stylów oraz skrypt do swojego projektu.</p>
        <p>Jeśli nie używasz narzędzi budujących, wystarczą dwa znaczniki w nagłówku strony.</p>
        <h4 id="demo-spy-konfiguracja">Konfiguracja</h4>
        <p>Kolory, promienie zaokrągleń i kroje pisma zmienisz, nadpisując zmienne CSS. Nie musisz przebudowywać biblioteki.</p>
        <p>Ciemny motyw włącza jeden atrybut na elemencie <code>html</code>.</p>
        <h4 id="demo-spy-wdrozenie">Wdrożenie</h4>
        <p>Zbuduj projekt i wgraj katalog wynikowy na dowolny hosting plików statycznych.</p>
        <p>Pamiętaj o ustawieniu długiego czasu pamięci podręcznej dla zasobów z odciskiem w nazwie.</p>
      </div>
    </div>
  </div>
</div>
```

Komponent działa zarówno dla przewijania całej strony, jak i dla sekcji w przewijanym kontenerze. Przy przyklejonym nagłówku ustaw `offset` na jego wysokość.

## API

### Opcje — scrollspy

| Opcja | Typ | Domyślnie | Opis |
| --- | --- | --- | --- |
| `cls` | string | `pl-animation-fade` | Klasa (klasy) dodawana po wejściu w widok. |
| `target` | string | — | Selektor obserwowanych elementów (np. `> *`). Bez niego obserwowany jest sam element. |
| `delay` | number | `0` | Opóźnienie między kolejnymi elementami, w milisekundach. |
| `repeat` | boolean | `false` | Powtarzaj przy każdym wejściu w widok. |
| `hidden` | boolean | `true` | Ukryj element (`.pl-invisible`) do czasu wejścia w widok. |
| `offset-top` | number | `0` | Korekta obszaru widoku w pionie, px. |
| `offset-left` | number | `0` | Korekta obszaru widoku w poziomie, px. |

Atrybut `data-pl-scrollspy-class` na obserwowanym elemencie nadpisuje `cls`.

### Opcje — scrollspy-nav

| Opcja | Typ | Domyślnie | Opis |
| --- | --- | --- | --- |
| `cls` | string | `pl-active` | Klasa aktywnej pozycji. |
| `closest` | string \| boolean | `li` | Przodek linku, który dostaje klasę; `false` — sam link. |
| `scroll` | boolean | `false` | Płynne przewijanie po kliknięciu linku. |
| `offset` | number | `0` | Odstęp od górnej krawędzi, px. |
| `overflow` | boolean | `true` | Pierwsza pozycja jest aktywna także przed pierwszą sekcją. |
| `duration` | number \| string | `auto` | Czas płynnego przewijania w milisekundach. |

### Zdarzenia

| Zdarzenie | Komponent | Opis |
| --- | --- | --- |
| `pl:inview` | scrollspy | Element wszedł w widok (wysyłane na tym elemencie). |
| `pl:outview` | scrollspy | Element opuścił widok (tylko z `repeat: true`). |
| `pl:active` | scrollspy-nav | Zmieniła się aktywna pozycja; `detail.link`, `detail.target`. |

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-invisible` | Nakładana do czasu wejścia w widok. |
| `.pl-active` | Aktywna pozycja nawigacji (domyślna wartość `cls`). |
