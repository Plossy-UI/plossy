---
title: Height
description: Dwa narzędzia do wysokości — wyrównywanie wysokości wielu elementów oraz minimalna wysokość liczona względem okna przeglądarki.
badge: JS
---

## Wyrównywanie wysokości

`data-pl-height-match` nadaje wskazanym elementom wysokość najwyższego z nich. Przydaje się tam, gdzie siatka CSS nie wystarcza — gdy wyrównać trzeba elementy zagnieżdżone głębiej albo leżące w różnych kontenerach.

```html example
<div class="pl-grid pl-child-width-1-3@s" style="align-items: start" data-pl-height-match="target: > * > .pl-card">
  <div>
    <div class="pl-card"><div class="pl-card-body">
      <h4 class="pl-card-title">Starter</h4>
      <p>Jeden projekt i podstawowe statystyki.</p>
    </div></div>
  </div>
  <div>
    <div class="pl-card"><div class="pl-card-body">
      <h4 class="pl-card-title">Pro</h4>
      <p>Nielimitowane projekty, własna domena, eksport danych, priorytetowe wsparcie oraz dostęp do wersji testowych nowych funkcji.</p>
    </div></div>
  </div>
  <div>
    <div class="pl-card"><div class="pl-card-body">
      <h4 class="pl-card-title">Zespół</h4>
      <p>Role, uprawnienia i wspólne przestrzenie robocze.</p>
    </div></div>
  </div>
</div>
```

## Elementy wewnątrz kart

Selektor `target` może sięgać dowolnie głęboko. Tutaj wyrównane są same tytuły, dzięki czemu opisy zaczynają się na jednej linii mimo różnej długości nagłówków.

```html example
<div class="pl-grid pl-child-width-1-3@s" data-pl-height-match="target: .pl-card-title">
  <div>
    <div class="pl-card"><div class="pl-card-body">
      <h4 class="pl-card-title">Analityka</h4>
      <p>Raporty odświeżane co godzinę.</p>
    </div></div>
  </div>
  <div>
    <div class="pl-card"><div class="pl-card-body">
      <h4 class="pl-card-title">Automatyczne przypomnienia o zbliżających się terminach płatności</h4>
      <p>Wysyłane e-mailem i SMS-em.</p>
    </div></div>
  </div>
  <div>
    <div class="pl-card"><div class="pl-card-body">
      <h4 class="pl-card-title">Integracje z księgowością</h4>
      <p>Eksport do popularnych programów.</p>
    </div></div>
  </div>
</div>
```

## Wiersze

Domyślnie (`row: true`) wysokości są wyrównywane osobno w każdym wizualnym rzędzie — po zawinięciu siatki drugi wiersz nie dziedziczy wysokości pierwszego. Z `row: false` wszystkie elementy dostają jedną wysokość.

```html example
<div class="pl-grid pl-child-width-1-2" style="align-items: start" data-pl-height-match="target: > * > .pl-card; row: false">
  <div><div class="pl-card pl-card-muted"><div class="pl-card-body">Krótka treść.</div></div></div>
  <div><div class="pl-card pl-card-muted"><div class="pl-card-body">Najdłuższa karta w całej grupie — to ona wyznacza wysokość wszystkich pozostałych, także tych w kolejnym wierszu.</div></div></div>
  <div><div class="pl-card pl-card-muted"><div class="pl-card-body">Drugi wiersz.</div></div></div>
  <div><div class="pl-card pl-card-muted"><div class="pl-card-body">Ta sama wysokość co wyżej.</div></div></div>
</div>
```

## Reakcja na zmiany

Komponent obserwuje rozmiar i zawartość elementów, więc wyrównanie odświeża się po zmianie szerokości okna, załadowaniu fontów czy dopisaniu treści.

```html example
<div class="pl-grid pl-child-width-1-2" style="align-items: start" data-pl-height-match="target: > * > .pl-card">
  <div><div class="pl-card"><div class="pl-card-body" id="demo-height-grow">Kliknij przycisk, aby dopisać treść do tej karty.</div></div></div>
  <div><div class="pl-card"><div class="pl-card-body">Ta karta dopasuje się sama.</div></div></div>
</div>
<p class="pl-margin-top"><button class="pl-button pl-button-small" id="demo-height-add" type="button">Dopisz akapit</button></p>
```

```js example-js
document.querySelector('#demo-height-add').addEventListener('click', () => {
  const paragraph = document.createElement('p');
  paragraph.textContent = 'Kolejny akapit z dodatkowymi informacjami o zamówieniu.';
  document.querySelector('#demo-height-grow').append(paragraph);
});
```

## Wysokość okna

`data-pl-height-viewport` ustawia `min-height` elementu na wysokość okna — idealne dla sekcji otwierającej stronę. Treść dłuższa niż okno nadal się mieści, bo to wysokość minimalna.

```html
<section class="pl-section pl-flex pl-flex-middle" data-pl-height-viewport>
  <div class="pl-container">…</div>
</section>
```

### Odjęcie nagłówka i stopki

`offset-top: true` odejmuje odległość elementu od góry strony (czyli np. wysokość paska nawigacji nad nim). `offset-bottom` odejmuje miejsce u dołu: `true` — wysokość następnego elementu, liczba do 100 — procent wysokości okna, większa liczba lub wartość z jednostką — piksele, a selektor — wysokość wskazanego elementu.

```html
<header class="pl-navbar">…</header>
<section data-pl-height-viewport="offset-top: true; offset-bottom: 20">
  Wypełniam okno pod nagłówkiem, zostawiając u dołu 20% na zapowiedź kolejnej sekcji.
</section>
```

W podglądzie poniżej sekcja zajmuje połowę wysokości okna (`offset-bottom: 50`), ale nie mniej niż 240 px (`min`).

```html example flush
<div class="pl-flex pl-flex-center pl-flex-middle" style="background: var(--pl-primary-soft); text-align: center" data-pl-height-viewport="offset-bottom: 50; min: 240">
  <div>
    <h3 style="margin: 0">Połowa okna</h3>
    <p style="margin: .25rem 0 0">Zmień wysokość okna przeglądarki, aby zobaczyć reakcję.</p>
  </div>
</div>
```

### Wypełnienie strony

`expand: true` rozciąga element o tyle, ile brakuje stronie do pełnej wysokości okna — stopka zostaje przy dolnej krawędzi nawet na prawie pustych podstronach.

```html
<header>…</header>
<main data-pl-height-viewport="expand: true">…</main>
<footer>…</footer>
```

## API

### Opcje — height-match

| Opcja | Typ | Domyślnie | Opis |
| --- | --- | --- | --- |
| `target` | string | `> *` | Selektor wyrównywanych elementów. |
| `row` | boolean | `true` | Wyrównuj osobno w każdym wizualnym wierszu. |

### Opcje — height-viewport

| Opcja | Typ | Domyślnie | Opis |
| --- | --- | --- | --- |
| `offset-top` | boolean \| number | `false` | `true` — odejmij położenie elementu względem góry strony; liczba — piksele. |
| `offset-bottom` | boolean \| number \| string | `false` | `true` — wysokość następnego elementu; 1–100 — procent okna; powyżej 100 lub z jednostką — długość; selektor — wysokość elementu. |
| `expand` | boolean | `false` | Rozciągnij element, aby strona wypełniła okno. |
| `min` | number | `0` | Minimalna wysokość w pikselach. |

### Zdarzenia

| Zdarzenie | Komponent | Opis |
| --- | --- | --- |
| `pl:match` | height-match | Po każdym wyrównaniu; `detail.targets`. |
| `pl:resize` | height-viewport | Po przeliczeniu wysokości; `detail.height`. |

Oba komponenty ustawiają właściwość `min-height` w stylu inline — nie nadpisuj jej własnym `!important`.
