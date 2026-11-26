---
title: Sortable
description: Zmiana kolejności przez przeciąganie — w listach i zawijanych siatkach, między grupami, na ekranach dotykowych i z klawiatury.
badge: JS
---

## Podstawowe użycie

Dodaj `data-pl-sortable` do kontenera — jego bezpośrednie dzieci stają się przeciągalne. Za wskaźnikiem podąża uniesiony klon, przerywany obrys pokazuje miejsce upuszczenia, a pozostałe elementy płynnie się rozsuwają.

```html example narrow
<ul class="pl-sortable" data-pl-sortable style="display: grid; gap: 0.5rem; margin: 0; padding: 0; list-style: none">
  <li class="pl-card pl-card-small"><div class="pl-card-body pl-flex pl-flex-middle" style="gap: 0.75rem"><span>Zarezerwować nocleg w schronisku</span></div></li>
  <li class="pl-card pl-card-small"><div class="pl-card-body pl-flex pl-flex-middle" style="gap: 0.75rem"><span>Sprawdzić prognozę pogody</span></div></li>
  <li class="pl-card pl-card-small"><div class="pl-card-body pl-flex pl-flex-middle" style="gap: 0.75rem"><span>Naostrzyć raki</span></div></li>
  <li class="pl-card pl-card-small"><div class="pl-card-body pl-flex pl-flex-middle" style="gap: 0.75rem"><span>Kupić mapę Tatr Wysokich</span></div></li>
  <li class="pl-card pl-card-small"><div class="pl-card-body pl-flex pl-flex-middle" style="gap: 0.75rem"><span>Spakować apteczkę</span></div></li>
</ul>
```

## Siatka

Sortowanie działa w dwóch wymiarach — w siatkach flex i grid, także z elementami o różnych rozmiarach.

```html example
<div class="pl-grid pl-grid-small pl-child-width-1-2 pl-child-width-1-4@m" data-pl-sortable>
  <div><div class="pl-card"><div class="pl-card-media"><img src="/img/photo-1.svg" alt="" width="1200" height="800"></div><div class="pl-card-body" style="padding: 0.75rem 1rem"><strong>Hala Gąsienicowa</strong></div></div></div><div><div class="pl-card"><div class="pl-card-media"><img src="/img/photo-2.svg" alt="" width="1200" height="800"></div><div class="pl-card-body" style="padding: 0.75rem 1rem"><strong>Jezioro Solińskie</strong></div></div></div><div><div class="pl-card"><div class="pl-card-media"><img src="/img/photo-3.svg" alt="" width="1200" height="800"></div><div class="pl-card-body" style="padding: 0.75rem 1rem"><strong>Mierzeja Helska</strong></div></div></div><div><div class="pl-card"><div class="pl-card-media"><img src="/img/photo-4.svg" alt="" width="1200" height="800"></div><div class="pl-card-body" style="padding: 0.75rem 1rem"><strong>Szczeliniec Wielki</strong></div></div></div><div><div class="pl-card"><div class="pl-card-media"><img src="/img/photo-5.svg" alt="" width="1200" height="800"></div><div class="pl-card-body" style="padding: 0.75rem 1rem"><strong>Biebrzańskie bagna</strong></div></div></div><div><div class="pl-card"><div class="pl-card-media"><img src="/img/photo-6.svg" alt="" width="1200" height="800"></div><div class="pl-card-body" style="padding: 0.75rem 1rem"><strong>Dolina Chochołowska</strong></div></div></div><div><div class="pl-card"><div class="pl-card-media"><img src="/img/photo-7.svg" alt="" width="1200" height="800"></div><div class="pl-card-body" style="padding: 0.75rem 1rem"><strong>Wigry</strong></div></div></div><div><div class="pl-card"><div class="pl-card-media"><img src="/img/photo-8.svg" alt="" width="1200" height="800"></div><div class="pl-card-body" style="padding: 0.75rem 1rem"><strong>Ojców</strong></div></div></div>
</div>
```

## Uchwyt

Opcja `handle` ogranicza chwytanie do wskazanego elementu. Klasa `.pl-sortable-handle` nadaje mu wygląd (pusty przycisk rysuje sześć kropek) oraz `touch-action: none`, dzięki czemu na ekranie dotykowym przeciąganie zaczyna się natychmiast.

```html example narrow
<ul class="pl-sortable" data-pl-sortable="handle: .pl-sortable-handle" style="display: grid; gap: 0.5rem; margin: 0; padding: 0; list-style: none">
  <li class="pl-card pl-card-small"><div class="pl-card-body pl-flex pl-flex-middle" style="gap: 0.75rem"><button class="pl-sortable-handle" type="button" aria-label="Przenieś"></button><span>Śniadanie w schronisku</span></div></li>
  <li class="pl-card pl-card-small"><div class="pl-card-body pl-flex pl-flex-middle" style="gap: 0.75rem"><button class="pl-sortable-handle" type="button" aria-label="Przenieś"></button><span>Wyjście na szlak o 6:30</span></div></li>
  <li class="pl-card pl-card-small"><div class="pl-card-body pl-flex pl-flex-middle" style="gap: 0.75rem"><button class="pl-sortable-handle" type="button" aria-label="Przenieś"></button><span>Przerwa nad Czarnym Stawem</span></div></li>
  <li class="pl-card pl-card-small"><div class="pl-card-body pl-flex pl-flex-middle" style="gap: 0.75rem"><button class="pl-sortable-handle" type="button" aria-label="Przenieś"></button><span>Powrót przez Halę</span></div></li>
</ul>
```

## Grupy

Listy z tą samą wartością `group` wymieniają się elementami. Pusta lista dostaje klasę `.pl-sortable-empty` i pozostaje celem upuszczenia; tekst podpowiedzi pochodzi z atrybutu `data-pl-empty`.

```html example
<div class="pl-grid pl-grid-small pl-child-width-1-3@s">
  <div>
    <p class="pl-filter-label pl-margin-small-bottom" id="demo-todo-label">Do zrobienia</p>
    <ul class="pl-sortable" data-pl-sortable="group: demo-zadania" aria-labelledby="demo-todo-label" data-pl-empty="Upuść zadanie tutaj" style="display: grid; align-content: start; gap: 0.5rem; margin: 0; padding: 0; list-style: none; min-height: 4.5rem">
      <li class="pl-card pl-card-small"><div class="pl-card-body pl-flex pl-flex-middle" style="gap: 0.75rem"><span>Kupić bilety na pociąg</span></div></li>
      <li class="pl-card pl-card-small"><div class="pl-card-body pl-flex pl-flex-middle" style="gap: 0.75rem"><span>Zarezerwować nocleg</span></div></li>
      <li class="pl-card pl-card-small"><div class="pl-card-body pl-flex pl-flex-middle" style="gap: 0.75rem"><span>Pożyczyć czołówkę</span></div></li>
    </ul>
  </div>
  <div>
    <p class="pl-filter-label pl-margin-small-bottom" id="demo-doing-label">W toku</p>
    <ul class="pl-sortable" data-pl-sortable="group: demo-zadania" aria-labelledby="demo-doing-label" data-pl-empty="Upuść zadanie tutaj" style="display: grid; align-content: start; gap: 0.5rem; margin: 0; padding: 0; list-style: none; min-height: 4.5rem">
      <li class="pl-card pl-card-small"><div class="pl-card-body pl-flex pl-flex-middle" style="gap: 0.75rem"><span>Zaplanować trasę</span></div></li>
    </ul>
  </div>
  <div>
    <p class="pl-filter-label pl-margin-small-bottom" id="demo-done-label">Gotowe</p>
    <ul class="pl-sortable" data-pl-sortable="group: demo-zadania" aria-labelledby="demo-done-label" data-pl-empty="Upuść zadanie tutaj" style="display: grid; align-content: start; gap: 0.5rem; margin: 0; padding: 0; list-style: none; min-height: 4.5rem">
      
    </ul>
  </div>
</div>
```

## Ekrany dotykowe

Sortable korzysta ze zdarzeń wskaźnika, więc działa z myszą, piórem i palcem. Żeby nie blokować przewijania długich list:

- **bez uchwytu** przesunięcie palcem przewija stronę jak zwykle, a element podnosi się po krótkim przytrzymaniu (ok. ¼ sekundy);
- **z uchwytem** `.pl-sortable-handle` (ma `touch-action: none`) przeciąganie startuje od razu.

Jeśli chcesz, by cały element reagował natychmiast także na dotyk, nadaj elementom `touch-action: none` i wskaż je jako uchwyt — pamiętaj, że wtedy nie da się przez nie przewijać strony. Podczas przeciągania przy krawędzi okna lub przewijanego kontenera zawartość przewija się sama.

## Klawiatura

Elementy są fokusowalne (jeden przystanek <kbd>Tab</kbd> na listę, strzałki przenoszą fokus). <kbd>Spacja</kbd> podnosi element, strzałki go przesuwają (w siatce także w pionie), <kbd>Spacja</kbd> lub <kbd>Enter</kbd> upuszcza, <kbd>Esc</kbd> anuluje i przywraca pierwotną pozycję. Każdy krok jest ogłaszany czytnikom ekranu po polsku, np. „Podniesiono: Naostrzyć raki. Pozycja 3 z 5."

## Zdarzenia i odczyt kolejności

Metoda `toArray('data-id')` zwraca kolejność jako listę wartości atrybutu — gotową do wysłania na serwer.

```html example narrow
<ul class="pl-sortable" id="demo-sortable-order" data-pl-sortable style="display: grid; gap: 0.5rem; margin: 0; padding: 0; list-style: none">
  <li class="pl-card pl-card-small" data-id="kawa"><div class="pl-card-body pl-flex pl-flex-middle" style="gap: 0.75rem"><span>Kawa</span></div></li>
  <li class="pl-card pl-card-small" data-id="herbata"><div class="pl-card-body pl-flex pl-flex-middle" style="gap: 0.75rem"><span>Herbata</span></div></li>
  <li class="pl-card pl-card-small" data-id="kakao"><div class="pl-card-body pl-flex pl-flex-middle" style="gap: 0.75rem"><span>Kakao</span></div></li>
  <li class="pl-card pl-card-small" data-id="lemoniada"><div class="pl-card-body pl-flex pl-flex-middle" style="gap: 0.75rem"><span>Lemoniada</span></div></li>
</ul>
<p class="pl-text-muted pl-margin-small-top">Kolejność: <code id="demo-sortable-output">kawa, herbata, kakao, lemoniada</code></p>
```

```js example-js
const list = document.querySelector('#demo-sortable-order');
const output = document.querySelector('#demo-sortable-output');

list.addEventListener('pl:moved', (event) => {
  const sortable = event.detail.component;
  output.textContent = sortable.toArray('data-id').join(', ');
});
```

## API

### Opcje

| Opcja | Typ | Domyślnie | Opis |
| --- | --- | --- | --- |
| `group` | string | — | Nazwa grupy; listy o tej samej grupie wymieniają się elementami. |
| `handle` | string | — | Selektor uchwytu. Puste = cały element. |
| `animation` | number | `200` | Czas animacji przesuwania (ms); `0` wyłącza. |
| `cls-drag` | string | `pl-sortable-drag` | Klasa unoszonego klonu. |
| `cls-placeholder` | string | `pl-sortable-placeholder` | Klasa miejsca upuszczenia. |
| `cls-empty` | string | `pl-sortable-empty` | Klasa pustej listy. |
| `threshold` | number | `5` | Dystans (px), po którym zaczyna się przeciąganie myszą. |

### Metody

| Metoda | Opis |
| --- | --- |
| `toArray(atrybut?)` | Aktualna kolejność: wartości atrybutu albo — bez argumentu — same elementy. |
| `refresh()` | Odświeża stan po ręcznej zmianie zawartości (wywoływane też automatycznie). |

### Zdarzenia

| Zdarzenie | Opis |
| --- | --- |
| `pl:start` | Początek przeciągania (`detail.item`, `detail.from`); można anulować. |
| `pl:stop` | Koniec przeciągania (`detail.item`, `detail.from`, `detail.to`, `detail.cancelled`). |
| `pl:moved` | Element zmienił pozycję w obrębie listy (`detail.from`, `detail.to`). |
| `pl:added` | Element trafił do tej listy z innej (`detail.source`). |
| `pl:removed` | Element opuścił tę listę (`detail.target`). |

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-sortable` | Kontener (dodawana automatycznie). |
| `.pl-sortable-handle` | Uchwyt do chwytania. |
| `.pl-sortable-nodrag` | Fragment elementu, który nie zaczyna przeciągania. |
| `.pl-sortable-drag` | Unoszony klon. |
| `.pl-sortable-placeholder` | Miejsce upuszczenia. |
| `.pl-sortable-empty` | Pusta lista. |
| `.pl-sortable-grabbed` | Element podniesiony klawiaturą. |
