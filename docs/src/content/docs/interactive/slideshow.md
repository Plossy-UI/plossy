---
title: Slideshow
description: Pokaz slajdów z przejściami, które podążają za palcem — sześć animacji, efekt Kena Burnsa, podpisy wjeżdżające kaskadowo i pasek postępu autoodtwarzania.
badge: JS
---

## Podstawowe użycie

Dodaj `data-pl-slideshow` do kontenera `.pl-slideshow`, a slajdy umieść w liście `.pl-slideshow-items`. Obraz lub wideo będące bezpośrednim dzieckiem slajdu wypełnia go w całości. Przeciągnij slajd — przejście porusza się razem ze wskaźnikiem, a po puszczeniu kończy się albo cofa zależnie od prędkości gestu.

```html example
<div class="pl-slideshow" data-pl-slideshow aria-label="Wyprawy po Polsce">
  <ul class="pl-slideshow-items">
    <li>
      <img src="/img/photo-1.svg" alt="">
      <div class="pl-slideshow-caption">
        <span class="pl-slideshow-eyebrow">Tatry</span>
        <h3>Świt nad Halą Gąsienicową</h3>
        <p>Wyjdź przed schroniskiem, zanim szlak się zaludni.</p>
      </div>
    </li>
    <li>
      <img src="/img/photo-2.svg" alt="">
      <div class="pl-slideshow-caption">
        <span class="pl-slideshow-eyebrow">Bieszczady</span>
        <h3>Zatoki Jeziora Solińskiego</h3>
        <p>Kajakiem dopłyniesz tam, gdzie nie prowadzi żadna droga.</p>
      </div>
    </li>
    <li>
      <img src="/img/photo-3.svg" alt="">
      <div class="pl-slideshow-caption">
        <span class="pl-slideshow-eyebrow">Pomorze</span>
        <h3>Koniec Mierzei Helskiej</h3>
        <p>35 kilometrów piasku między zatoką a otwartym morzem.</p>
      </div>
    </li>
    <li>
      <img src="/img/photo-4.svg" alt="">
      <div class="pl-slideshow-caption">
        <span class="pl-slideshow-eyebrow">Góry Stołowe</span>
        <h3>Labirynt Szczelińca</h3>
        <p>Skalne korytarze i tarasy z widokiem na Kotlinę Kłodzką.</p>
      </div>
    </li>
  </ul>
  <button class="pl-slidenav-previous" type="button" aria-label="Poprzedni" data-pl-slideshow-item="previous"></button>
  <button class="pl-slidenav-next" type="button" aria-label="Następny" data-pl-slideshow-item="next"></button>
  <ul class="pl-slideshow-nav pl-dotnav"></ul>
</div>
```

Elementy podpisu `.pl-slideshow-caption` pojawiają się jeden po drugim, gdy slajd staje się aktywny. Tę samą animację dostanie dowolny element slajdu z atrybutem `data-pl-slideshow-in`.

## Animacje

Opcja `animation` wybiera przejście: `slide` (domyślne), `fade`, `scale`, `push`, `pull` lub `zoom`. Każde uwzględnia kierunek i daje się „przeciągać".

```html example
<div class="pl-grid pl-grid-small pl-child-width-1-2 pl-child-width-1-3@m">
  <div>
    <p class="pl-filter-label pl-margin-small-bottom">slide</p>
    <div class="pl-slideshow pl-slideshow-arrows-hover" data-pl-slideshow="animation: slide; ratio: 3:2" aria-label="Animacja slide">
      <ul class="pl-slideshow-items">
        <li><img src="/img/photo-1.svg" alt=""></li><li><img src="/img/photo-2.svg" alt=""></li><li><img src="/img/photo-3.svg" alt=""></li>
      </ul>
      <button class="pl-slidenav-previous pl-slidenav-small" type="button" aria-label="Poprzedni" data-pl-slideshow-item="previous"></button>
      <button class="pl-slidenav-next pl-slidenav-small" type="button" aria-label="Następny" data-pl-slideshow-item="next"></button>
    </div>
  </div>
  <div>
    <p class="pl-filter-label pl-margin-small-bottom">fade</p>
    <div class="pl-slideshow pl-slideshow-arrows-hover" data-pl-slideshow="animation: fade; ratio: 3:2" aria-label="Animacja fade">
      <ul class="pl-slideshow-items">
        <li><img src="/img/photo-4.svg" alt=""></li><li><img src="/img/photo-5.svg" alt=""></li><li><img src="/img/photo-6.svg" alt=""></li>
      </ul>
      <button class="pl-slidenav-previous pl-slidenav-small" type="button" aria-label="Poprzedni" data-pl-slideshow-item="previous"></button>
      <button class="pl-slidenav-next pl-slidenav-small" type="button" aria-label="Następny" data-pl-slideshow-item="next"></button>
    </div>
  </div>
  <div>
    <p class="pl-filter-label pl-margin-small-bottom">scale</p>
    <div class="pl-slideshow pl-slideshow-arrows-hover" data-pl-slideshow="animation: scale; ratio: 3:2" aria-label="Animacja scale">
      <ul class="pl-slideshow-items">
        <li><img src="/img/photo-7.svg" alt=""></li><li><img src="/img/photo-8.svg" alt=""></li><li><img src="/img/photo-1.svg" alt=""></li>
      </ul>
      <button class="pl-slidenav-previous pl-slidenav-small" type="button" aria-label="Poprzedni" data-pl-slideshow-item="previous"></button>
      <button class="pl-slidenav-next pl-slidenav-small" type="button" aria-label="Następny" data-pl-slideshow-item="next"></button>
    </div>
  </div>
  <div>
    <p class="pl-filter-label pl-margin-small-bottom">push</p>
    <div class="pl-slideshow pl-slideshow-arrows-hover" data-pl-slideshow="animation: push; ratio: 3:2" aria-label="Animacja push">
      <ul class="pl-slideshow-items">
        <li><img src="/img/photo-2.svg" alt=""></li><li><img src="/img/photo-3.svg" alt=""></li><li><img src="/img/photo-4.svg" alt=""></li>
      </ul>
      <button class="pl-slidenav-previous pl-slidenav-small" type="button" aria-label="Poprzedni" data-pl-slideshow-item="previous"></button>
      <button class="pl-slidenav-next pl-slidenav-small" type="button" aria-label="Następny" data-pl-slideshow-item="next"></button>
    </div>
  </div>
  <div>
    <p class="pl-filter-label pl-margin-small-bottom">pull</p>
    <div class="pl-slideshow pl-slideshow-arrows-hover" data-pl-slideshow="animation: pull; ratio: 3:2" aria-label="Animacja pull">
      <ul class="pl-slideshow-items">
        <li><img src="/img/photo-5.svg" alt=""></li><li><img src="/img/photo-6.svg" alt=""></li><li><img src="/img/photo-7.svg" alt=""></li>
      </ul>
      <button class="pl-slidenav-previous pl-slidenav-small" type="button" aria-label="Poprzedni" data-pl-slideshow-item="previous"></button>
      <button class="pl-slidenav-next pl-slidenav-small" type="button" aria-label="Następny" data-pl-slideshow-item="next"></button>
    </div>
  </div>
  <div>
    <p class="pl-filter-label pl-margin-small-bottom">zoom</p>
    <div class="pl-slideshow pl-slideshow-arrows-hover" data-pl-slideshow="animation: zoom; ratio: 3:2" aria-label="Animacja zoom">
      <ul class="pl-slideshow-items">
        <li><img src="/img/photo-8.svg" alt=""></li><li><img src="/img/photo-1.svg" alt=""></li><li><img src="/img/photo-2.svg" alt=""></li>
      </ul>
      <button class="pl-slidenav-previous pl-slidenav-small" type="button" aria-label="Poprzedni" data-pl-slideshow-item="previous"></button>
      <button class="pl-slidenav-next pl-slidenav-small" type="button" aria-label="Następny" data-pl-slideshow-item="next"></button>
    </div>
  </div>
</div>
```

## Proporcje i wysokość

`ratio` ustala proporcje (domyślnie `16:9`), a `min-height` i `max-height` ograniczają wysokość — liczba oznacza piksele, można też podać dowolną jednostkę CSS. `ratio: false` zostawia samą wysokość minimalną.

```html example
<div class="pl-slideshow" data-pl-slideshow="ratio: 21:9; min-height: 220; max-height: 420">
  <ul class="pl-slideshow-items">
    <li><img src="/img/photo-5.svg" alt="Mgły nad Biebrzą"></li>
    <li><img src="/img/photo-3.svg" alt="Koniec Mierzei Helskiej"></li>
    <li><img src="/img/photo-1.svg" alt="Świt nad Halą Gąsienicową"></li>
  </ul>
  <button class="pl-slidenav-previous" type="button" aria-label="Poprzedni" data-pl-slideshow-item="previous"></button>
  <button class="pl-slidenav-next" type="button" aria-label="Następny" data-pl-slideshow-item="next"></button>
</div>
```

## Autoodtwarzanie i pasek postępu

Z `autoplay: true` slajdy zmieniają się co `autoplay-interval` ms, a u góry pojawia się pasek postępu z segmentem na każdy slajd. Najedź myszą — odliczanie i pasek zatrzymują się w tym samym miejscu i ruszają dalej po zjechaniu. Pasek wyłączysz opcją `progress: false`; klasa `.pl-slideshow-progress-bottom` na własnym elemencie `.pl-slideshow-progress` przenosi go na dół.

```html example
<div class="pl-slideshow" data-pl-slideshow="autoplay: true; autoplay-interval: 4000; animation: push" aria-label="Wyróżnione trasy">
  <ul class="pl-slideshow-items">
    <li>
      <img src="/img/photo-2.svg" alt="">
      <div class="pl-slideshow-caption">
        <span class="pl-slideshow-eyebrow">Bieszczady</span>
        <h3>Zatoki Jeziora Solińskiego</h3>
        <p>Kajakiem dopłyniesz tam, gdzie nie prowadzi żadna droga.</p>
        <a class="pl-button pl-button-primary pl-button-small" href="#">Zobacz trasę</a>
      </div>
    </li>
    <li>
      <img src="/img/photo-4.svg" alt="">
      <div class="pl-slideshow-caption">
        <span class="pl-slideshow-eyebrow">Góry Stołowe</span>
        <h3>Labirynt Szczelińca</h3>
        <p>Skalne korytarze i tarasy z widokiem na Kotlinę Kłodzką.</p>
        <a class="pl-button pl-button-primary pl-button-small" href="#">Zobacz trasę</a>
      </div>
    </li>
    <li>
      <img src="/img/photo-1.svg" alt="">
      <div class="pl-slideshow-caption">
        <span class="pl-slideshow-eyebrow">Tatry</span>
        <h3>Świt nad Halą Gąsienicową</h3>
        <p>Wyjdź przed schroniskiem, zanim szlak się zaludni.</p>
        <a class="pl-button pl-button-primary pl-button-small" href="#">Zobacz trasę</a>
      </div>
    </li>
    <li>
      <img src="/img/photo-5.svg" alt="">
      <div class="pl-slideshow-caption">
        <span class="pl-slideshow-eyebrow">Podlasie</span>
        <h3>Mgły nad Biebrzą</h3>
        <p>Kładki przez torfowiska najlepiej smakują o piątej rano.</p>
        <a class="pl-button pl-button-primary pl-button-small" href="#">Zobacz trasę</a>
      </div>
    </li>
  </ul>
  <button class="pl-slidenav-previous" type="button" aria-label="Poprzedni" data-pl-slideshow-item="previous"></button>
  <button class="pl-slidenav-next" type="button" aria-label="Następny" data-pl-slideshow-item="next"></button>
</div>
```

Autoodtwarzanie wstrzymuje się też przy fokusie z klawiatury, podczas przeciągania, poza ekranem i w karcie w tle, a przy `prefers-reduced-motion` nie startuje. Przycisk z `data-pl-slideshow-item="toggle"` pozwala je wyłączyć na stałe.

## Ken Burns

`kenburns: true` powoli przybliża i przesuwa zdjęcie aktywnego slajdu. Najlepiej wygląda z przejściem `fade`.

```html example
<div class="pl-slideshow" data-pl-slideshow="kenburns: true; animation: fade; autoplay: true; autoplay-interval: 5000; progress: false">
  <ul class="pl-slideshow-items">
    <li>
      <img src="/img/photo-3.svg" alt="">
      <div class="pl-slideshow-caption pl-slideshow-caption-center">
        <span class="pl-slideshow-eyebrow">Pomorze</span>
        <h3>Koniec Mierzei Helskiej</h3>
        <p>35 kilometrów piasku między zatoką a otwartym morzem.</p>
      </div>
    </li>
    <li>
      <img src="/img/photo-5.svg" alt="">
      <div class="pl-slideshow-caption pl-slideshow-caption-center">
        <span class="pl-slideshow-eyebrow">Podlasie</span>
        <h3>Mgły nad Biebrzą</h3>
        <p>Kładki przez torfowiska najlepiej smakują o piątej rano.</p>
      </div>
    </li>
    <li>
      <img src="/img/photo-2.svg" alt="">
      <div class="pl-slideshow-caption pl-slideshow-caption-center">
        <span class="pl-slideshow-eyebrow">Bieszczady</span>
        <h3>Zatoki Jeziora Solińskiego</h3>
        <p>Kajakiem dopłyniesz tam, gdzie nie prowadzi żadna droga.</p>
      </div>
    </li>
  </ul>
  <ul class="pl-slideshow-nav pl-slideshow-nav-inside pl-dotnav pl-dotnav-light"></ul>
</div>
```

## Podpisy

Domyślnie podpis leży na dole na gradiencie. Modyfikatory: `.pl-slideshow-caption-top`, `.pl-slideshow-caption-center` (przykład wyżej) oraz `.pl-slideshow-caption-card` — szklana karta w rogu.

```html example
<div class="pl-slideshow pl-slideshow-arrows-hover" data-pl-slideshow="animation: scale">
  <ul class="pl-slideshow-items">
    <li>
      <img src="/img/photo-4.svg" alt="">
      <div class="pl-slideshow-caption pl-slideshow-caption-card">
        <span class="pl-slideshow-eyebrow">Góry Stołowe</span>
        <h3>Labirynt Szczelińca</h3>
        <p>Skalne korytarze i tarasy z widokiem na Kotlinę Kłodzką.</p>
      </div>
    </li>
    <li>
      <img src="/img/photo-1.svg" alt="">
      <div class="pl-slideshow-caption pl-slideshow-caption-card">
        <span class="pl-slideshow-eyebrow">Tatry</span>
        <h3>Świt nad Halą Gąsienicową</h3>
        <p>Wyjdź przed schroniskiem, zanim szlak się zaludni.</p>
      </div>
    </li>
    <li>
      <img src="/img/photo-3.svg" alt="">
      <div class="pl-slideshow-caption pl-slideshow-caption-card">
        <span class="pl-slideshow-eyebrow">Pomorze</span>
        <h3>Koniec Mierzei Helskiej</h3>
        <p>35 kilometrów piasku między zatoką a otwartym morzem.</p>
      </div>
    </li>
  </ul>
  <button class="pl-slidenav-previous" type="button" aria-label="Poprzedni" data-pl-slideshow-item="previous"></button>
  <button class="pl-slidenav-next" type="button" aria-label="Następny" data-pl-slideshow-item="next"></button>
</div>
```

## Nawigacja

### Kropki na slajdzie

Klasa `.pl-slideshow-nav-inside` kładzie nawigację na dolnej krawędzi slajdu; `.pl-dotnav-light` rozjaśnia kropki.

```html example
<div class="pl-slideshow" data-pl-slideshow="animation: pull; ratio: 2:1">
  <ul class="pl-slideshow-items">
    <li><img src="/img/photo-1.svg" alt="Świt nad Halą Gąsienicową"></li>
    <li><img src="/img/photo-2.svg" alt="Zatoki Jeziora Solińskiego"></li>
    <li><img src="/img/photo-3.svg" alt="Koniec Mierzei Helskiej"></li>
    <li><img src="/img/photo-4.svg" alt="Labirynt Szczelińca"></li>
    <li><img src="/img/photo-5.svg" alt="Mgły nad Biebrzą"></li>
  </ul>
  <button class="pl-slidenav-previous" type="button" aria-label="Poprzedni" data-pl-slideshow-item="previous"></button>
  <button class="pl-slidenav-next" type="button" aria-label="Następny" data-pl-slideshow-item="next"></button>
  <ul class="pl-slideshow-nav pl-slideshow-nav-inside pl-dotnav pl-dotnav-light"></ul>
</div>
```

### Miniatury

Nawigacja z własną zawartością nie jest nadpisywana — kolejne pozycje są łączone ze slajdami po kolei (lub jawnie przez `data-pl-slideshow-item="2"`).

```html example
<div class="pl-slideshow" data-pl-slideshow="animation: fade; ratio: 2:1">
  <ul class="pl-slideshow-items">
    <li><img src="/img/photo-1.svg" alt="Świt nad Halą Gąsienicową"></li>
    <li><img src="/img/photo-2.svg" alt="Zatoki Jeziora Solińskiego"></li>
    <li><img src="/img/photo-3.svg" alt="Koniec Mierzei Helskiej"></li>
    <li><img src="/img/photo-4.svg" alt="Labirynt Szczelińca"></li>
    <li><img src="/img/photo-5.svg" alt="Mgły nad Biebrzą"></li>
  </ul>
  <ul class="pl-slideshow-nav pl-thumbnav">
    <li><a href="#" aria-label="Świt nad Halą Gąsienicową"><img src="/img/photo-1.svg" alt=""></a></li><li><a href="#" aria-label="Zatoki Jeziora Solińskiego"><img src="/img/photo-2.svg" alt=""></a></li><li><a href="#" aria-label="Koniec Mierzei Helskiej"><img src="/img/photo-3.svg" alt=""></a></li><li><a href="#" aria-label="Labirynt Szczelińca"><img src="/img/photo-4.svg" alt=""></a></li><li><a href="#" aria-label="Mgły nad Biebrzą"><img src="/img/photo-5.svg" alt=""></a></li>
  </ul>
</div>
```

### Pasek sterowania

`.pl-slideshow-arrows` układa kropki i strzałki w jednym rzędzie pod slajdami.

```html example
<div class="pl-slideshow" data-pl-slideshow="finite: true; ratio: 2:1">
  <ul class="pl-slideshow-items">
    <li><img src="/img/photo-5.svg" alt="Mgły nad Biebrzą"></li>
    <li><img src="/img/photo-4.svg" alt="Labirynt Szczelińca"></li>
    <li><img src="/img/photo-3.svg" alt="Koniec Mierzei Helskiej"></li>
  </ul>
  <div class="pl-slideshow-arrows">
    <ul class="pl-slideshow-nav pl-dotnav"></ul>
    <button class="pl-slidenav-previous pl-slidenav-small" type="button" aria-label="Poprzedni" data-pl-slideshow-item="previous"></button>
    <button class="pl-slidenav-next pl-slidenav-small" type="button" aria-label="Następny" data-pl-slideshow-item="next"></button>
  </div>
</div>
```

Z `finite: true` pokaz nie zapętla się: strzałki na końcach są wyłączone, a przeciągnięcie ostatniego slajdu stawia sprężysty opór.

## Sterowanie z JavaScriptu

```html example
<div class="pl-slideshow" id="demo-slideshow-api" data-pl-slideshow="animation: zoom; ratio: 2:1">
  <ul class="pl-slideshow-items">
    <li><img src="/img/photo-1.svg" alt="Świt nad Halą Gąsienicową"></li>
    <li><img src="/img/photo-2.svg" alt="Zatoki Jeziora Solińskiego"></li>
    <li><img src="/img/photo-3.svg" alt="Koniec Mierzei Helskiej"></li>
    <li><img src="/img/photo-4.svg" alt="Labirynt Szczelińca"></li>
  </ul>
</div>
<div class="pl-flex pl-flex-middle pl-margin-top" style="gap: 0.5rem; flex-wrap: wrap">
  <button class="pl-button pl-button-small" type="button" id="demo-slideshow-prev">Poprzedni</button>
  <button class="pl-button pl-button-small" type="button" id="demo-slideshow-next">Następny</button>
  <button class="pl-button pl-button-small" type="button" id="demo-slideshow-play">Włącz autoodtwarzanie</button>
  <span class="pl-text-muted" id="demo-slideshow-status">Slajd 1 z 4</span>
</div>
```

```js example-js
const show = Plossy.slideshow('#demo-slideshow-api');
const status = document.querySelector('#demo-slideshow-status');
const play = document.querySelector('#demo-slideshow-play');

document.querySelector('#demo-slideshow-prev').addEventListener('click', () => show.show('previous'));
document.querySelector('#demo-slideshow-next').addEventListener('click', () => show.show('next'));
play.addEventListener('click', () => {
  show.autoplayOn ? show.stopAutoplay() : show.startAutoplay();
  play.textContent = show.autoplayOn ? 'Wyłącz autoodtwarzanie' : 'Włącz autoodtwarzanie';
});

show.el.addEventListener('pl:itemshow', (event) => {
  status.textContent = `Slajd ${event.detail.index + 1} z ${show.slides.length}`;
});
```

## Dostępność

- Kontener: `role="region"`, `aria-roledescription="karuzela"` — nadaj mu nazwę przez `aria-label`.
- Slajdy: `aria-roledescription="slajd"` i etykieta „2 z 5"; lista ma `aria-live="polite"` (`off` podczas autoodtwarzania).
- Klawiatura: <kbd>←</kbd> / <kbd>→</kbd> zmieniają slajd, <kbd>Home</kbd> / <kbd>End</kbd> skaczą na pierwszy i ostatni.
- Pionowy gest palcem przewija stronę, poziomy zmienia slajd.
- Wideo w slajdzie jest pauzowane po jego opuszczeniu; wideo z atrybutem `autoplay` startuje po wejściu.

## API

### Opcje

| Opcja | Typ | Domyślnie | Opis |
| --- | --- | --- | --- |
| `animation` | string | `slide` | `slide`, `fade`, `scale`, `push`, `pull`, `zoom`. |
| `autoplay` | boolean | `false` | Automatyczna zmiana slajdów. |
| `autoplay-interval` | number | `6000` | Czas wyświetlania slajdu (ms). |
| `pause-on-hover` | boolean | `true` | Wstrzymuje autoodtwarzanie po najechaniu myszą. |
| `progress` | boolean | `true` | Pasek postępu przy włączonym `autoplay`. |
| `ratio` | string \| false | `16:9` | Proporcje pokazu. |
| `min-height` | number \| string | — | Minimalna wysokość. |
| `max-height` | number \| string | — | Maksymalna wysokość. |
| `finite` | boolean | `false` | Wyłącza zapętlenie. |
| `draggable` | boolean | `true` | Zmiana slajdu przeciągnięciem. |
| `kenburns` | boolean | `false` | Powolne przybliżanie zdjęcia. |
| `index` | number | `0` | Slajd aktywny na starcie. |
| `velocity` | number | `1` | Mnożnik szybkości przejścia. |

### Metody

| Metoda | Opis |
| --- | --- |
| `show(index \| 'next' \| 'previous')` | Przechodzi do slajdu. |
| `startAutoplay()` | Włącza autoodtwarzanie. |
| `stopAutoplay()` | Wyłącza autoodtwarzanie. |
| `update()` | Odświeża nawigację po zmianie liczby slajdów (wywoływane też automatycznie). |

### Zdarzenia

| Zdarzenie | Opis |
| --- | --- |
| `pl:beforeitemshow` | Przed zmianą slajdu; można anulować przez `preventDefault()`. |
| `pl:itemshow` | Slajd zaczyna się pojawiać (`detail.index`, `detail.item`, `detail.previous`). |
| `pl:itemshown` | Przejście zakończone. |
| `pl:itemhide` | Poprzedni slajd zaczyna znikać. |

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-slideshow` | Kontener komponentu. |
| `.pl-slideshow-items` | Lista slajdów. |
| `.pl-slideshow-media` | Dowolny element wypełniający slajd (jak obraz). |
| `.pl-slideshow-caption` | Podpis; warianty `-top`, `-center`, `-card`. |
| `.pl-slideshow-eyebrow` | Mała etykieta nad tytułem podpisu. |
| `.pl-slideshow-nav` | Nawigacja (kropki lub miniatury). |
| `.pl-slideshow-nav-inside` | Nawigacja na slajdzie. |
| `.pl-slideshow-arrows` | Pasek sterowania pod slajdami. |
| `.pl-slideshow-arrows-hover` | Strzałki widoczne po najechaniu. |
| `.pl-slideshow-progress` | Pasek postępu; `-bottom` przenosi go na dół. |
| `.pl-slideshow-kenburns` | Włącza efekt Kena Burnsa (dodawana przez opcję). |
| `.pl-slideshow-square` | Bez zaokrąglonych rogów. |
| `.pl-active` | Aktywny slajd / pozycja nawigacji. |
