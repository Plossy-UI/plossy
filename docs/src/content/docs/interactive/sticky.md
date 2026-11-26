---
title: Sticky
description: Przykleja element do górnej krawędzi okna, gdy przewijanie go minie. Z granicą końcową, animacją, pokazywaniem przy ruchu w górę i klasami stanu.
badge: JS
---

## Podstawowe użycie

Dodaj `data-pl-sticky`. Gdy element dotrze do górnej krawędzi okna, przechodzi w `position: fixed`, a jego miejsce w układzie zajmuje niewidoczny placeholder — strona nie skacze. W przykładach używamy `offset: 80`, żeby element zatrzymał się pod nagłówkiem dokumentacji, oraz `end: parent`, by nie wyjechał poza ramkę podglądu.

```html example
<div style="height: 34rem">
  <div class="pl-card pl-card-primary" data-pl-sticky="offset: 80; end: parent">
    <div class="pl-card-body">Przewiń stronę — zostanę pod nagłówkiem aż do końca tego obszaru.</div>
  </div>
  <p class="pl-margin-top">Treść pod spodem przewija się normalnie. Karta wyżej trzyma się okna tak długo, jak długo widać jej kontener.</p>
</div>
```

## Granica końcowa

Opcja `end` wyznacza, gdzie przyklejenie się kończy: `parent` (lub `true`) to rodzic, `!.selektor` — najbliższy przodek pasujący do selektora, a zwykły selektor — dowolny element strony. Typowe zastosowanie to boczna kolumna, która towarzyszy artykułowi.

```html example
<div class="pl-grid demo-sticky-article">
  <div class="pl-width-2-3">
    <h4>Jak przygotować zespół do wdrożenia</h4>
    <p>Zacznij od wyznaczenia jednej osoby odpowiedzialnej za cały proces. To ona zbiera pytania, pilnuje terminów i decyduje o kolejności prac.</p>
    <p>W pierwszym tygodniu przenieś tylko jeden, niewielki projekt. Pozwoli to wychwycić braki w konfiguracji, zanim dotkną wszystkich.</p>
    <p>Drugi tydzień poświęć na szkolenia. Krótkie, półgodzinne sesje sprawdzają się lepiej niż jedno długie spotkanie.</p>
    <p>W trzecim tygodniu przenieś pozostałe projekty i wyłącz stare narzędzie w trybie tylko do odczytu.</p>
    <p>Po miesiącu zbierz opinie i popraw to, co spowalnia codzienną pracę. Wdrożenie kończy się dopiero wtedy, gdy zespół przestaje o nim myśleć.</p>
    <p>Na koniec spisz wnioski — przydadzą się przy kolejnym narzędziu.</p>
  </div>
  <div class="pl-width-1-3">
    <div class="pl-card" data-pl-sticky="offset: 88; end: !.demo-sticky-article">
      <div class="pl-card-body">
        <h4 class="pl-card-title">W tym artykule</h4>
        <p>Plan na cztery tygodnie i lista kontrolna do pobrania.</p>
        <button class="pl-button pl-button-primary pl-button-small" type="button">Pobierz listę</button>
      </div>
    </div>
  </div>
</div>
```

## Klasy stanu

Po przyklejeniu element dostaje klasę z `cls-active` (domyślnie `.pl-active`), a po odklejeniu — z `cls-inactive`. Gotowy modyfikator `.pl-sticky-raised` nadaje przyklejonemu paskowi półprzezroczyste tło z rozmyciem i cień.

```html example
<div style="height: 30rem">
  <div class="pl-sticky-raised demo-sticky-bar" data-pl-sticky="offset: 72; end: parent; cls-active: demo-sticky-stuck">
    <strong>Koszyk · 3 produkty</strong>
    <button class="pl-button pl-button-primary pl-button-small" type="button">Do kasy — 428 zł</button>
  </div>
  <p class="pl-margin-top">Pasek podsumowania zmienia wygląd w chwili przyklejenia: dostaje tło, cień i zaokrąglenie.</p>
</div>
```

```css example-css
.demo-sticky-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.75rem 0;
  border-radius: var(--pl-radius-md);
  transition: padding var(--pl-dur-3) var(--pl-ease);
}
.demo-sticky-stuck {
  padding: 0.75rem 1rem;
}
```

## Opóźnione przyklejenie z animacją

Opcja `top` odsuwa moment przyklejenia: liczba to dodatkowy dystans przewijania w pikselach, `100vh` — wysokość okna, a selektor — chwila, w której wskazany element zniknie nad krawędzią. Ponieważ element pojawia się wtedy „znikąd", warto dodać `animation`.

```html example
<div style="height: 44rem">
  <div class="pl-card pl-card-secondary" data-pl-sticky="offset: 80; top: 200; end: parent; animation: pl-animation-slide-down">
    <div class="pl-card-body">Wjadę z góry po 200 px przewijania.</div>
  </div>
  <p class="pl-margin-top">Przewijaj dalej. Karta najpierw odjedzie razem ze stroną, a po chwili wsunie się spod nagłówka. Przy powrocie schowa się tą samą animacją odtworzoną wstecz.</p>
</div>
```

## Pokazywanie przy przewijaniu w górę

Z `show-on-up: true` element chowa się, gdy przewijasz w dół, i wraca, gdy tylko ruszysz w górę — popularny wzorzec dla nagłówków, które nie powinny zabierać miejsca podczas czytania.

```html example
<div style="height: 60rem">
  <div class="pl-card pl-sticky-raised" data-pl-sticky="offset: 80; end: parent; show-on-up: true; animation: pl-animation-slide-down">
    <div class="pl-card-body"><strong>Nagłówek sekcji</strong> — przewiń w dół, a potem odrobinę w górę.</div>
  </div>
  <p class="pl-margin-top">W trakcie czytania nagłówek nie zasłania treści. Wystarczy niewielki ruch w górę, aby znów był pod ręką.</p>
</div>
```

## Pasek nawigacji

Sticky dobrze współpracuje z `.pl-navbar`: po przyklejeniu pasek może dostać cień i tło. Nagłówek całej strony zwykle nie potrzebuje granicy `end`.

```html
<nav class="pl-navbar pl-sticky-raised" data-pl-sticky="cls-active: pl-navbar-scrolled">
  …
</nav>
```

## Od określonej szerokości

Opcja `media` włącza przyklejanie dopiero od podanej szerokości okna — na telefonach element zostaje w normalnym układzie.

```html
<aside data-pl-sticky="offset: 24; end: parent; media: @m">…</aside>
```

## Zdarzenia

```html example
<div style="height: 26rem">
  <div class="pl-card" id="demo-sticky-events" data-pl-sticky="offset: 80; end: parent">
    <div class="pl-card-body">Stan: <strong id="demo-sticky-state">w układzie strony</strong></div>
  </div>
</div>
```

```js example-js
const sticky = document.querySelector('#demo-sticky-events');
const state = document.querySelector('#demo-sticky-state');

sticky.addEventListener('pl:active', () => (state.textContent = 'przyklejony (pl:active)'));
sticky.addEventListener('pl:inactive', () => (state.textContent = 'w układzie strony (pl:inactive)'));
```

## API

### Opcje

| Opcja | Typ | Domyślnie | Opis |
| --- | --- | --- | --- |
| `offset` | number \| string | `0` | Odstęp od górnej krawędzi okna po przyklejeniu (px lub `vh`). |
| `top` | number \| string | `0` | Opóźnienie przyklejenia: px, `vh`, `%` wysokości elementu albo selektor elementu, po którego minięciu następuje przyklejenie. |
| `end` | boolean \| string | `false` | Dolna granica: `parent` / `true`, `!.selektor` (najbliższy przodek) lub selektor. |
| `bottom` | boolean \| string | `false` | Alias `end`. |
| `cls-active` | string | `pl-active` | Klasa dodawana po przyklejeniu. |
| `cls-inactive` | string | — | Klasa dodawana, gdy element nie jest przyklejony. |
| `animation` | string | `false` | Klasa animacji odtwarzana przy przyklejeniu (i wstecz przy odklejeniu), gdy element nie przykleja się „w miejscu". |
| `show-on-up` | boolean | `false` | Chowaj przy przewijaniu w dół, pokazuj przy przewijaniu w górę. |
| `media` | number \| string | `false` | Minimalna szerokość okna (px), breakpoint (`@m`) lub zapytanie media. |
| `z-index` | number | `--pl-z-sticky` | Własna wartość `z-index` przyklejonego elementu. |

### Zdarzenia

| Zdarzenie | Opis |
| --- | --- |
| `pl:active` | Element został przyklejony. |
| `pl:inactive` | Element wrócił do układu strony (lub został schowany). |

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-sticky` | Dodawana do każdego elementu z komponentem. |
| `.pl-sticky-fixed` | Element jest przyklejony (`position: fixed`). |
| `.pl-sticky-below` | Przewijanie minęło pierwotne położenie elementu. |
| `.pl-sticky-end` | Element dotarł do granicy `end` i odjeżdża razem z nią. |
| `.pl-sticky-placeholder` | Niewidoczny element zajmujący miejsce przyklejonego. |
| `.pl-sticky-raised` | Modyfikator: tło z rozmyciem i cień po przyklejeniu. |

Komponent przykleja względem okna przeglądarki. Przodek z właściwością `transform`, `filter` lub `contain` zmienia punkt odniesienia `position: fixed` — unikaj ich na kontenerach elementów sticky.
