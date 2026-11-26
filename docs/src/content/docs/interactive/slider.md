---
title: Slider
description: Karuzela wielu elementów naraz — z fizycznym przeciąganiem, bezwładnością, sprężystym dociąganiem i nieskończoną pętlą.
badge: JS
---

## Podstawowe użycie

Dodaj `data-pl-slider` do kontenera `.pl-slider`. Wewnątrz umieść `.pl-slider-container` (przycina tor) i listę `.pl-slider-items`. Liczbę widocznych elementów ustawiają klasy `.pl-slider-cols-*`. Przeciągnij tor myszą lub palcem — po puszczeniu sunie dalej z nadaną prędkością i sprężyście dociąga do najbliższego elementu.

```html example
<div class="pl-slider" data-pl-slider aria-label="Polecane miejsca">
  <div class="pl-slider-container">
    <ul class="pl-slider-items pl-slider-cols-1 pl-slider-cols-2@s pl-slider-cols-3@m">
      <li>
        <div class="pl-card pl-card-hover">
          <div class="pl-card-media"><img src="/img/photo-1.svg" alt="" width="1200" height="800"></div>
          <div class="pl-card-body">
            <p class="pl-card-meta">Tatry · 1500 m n.p.m.</p>
            <h3 class="pl-card-title">Hala Gąsienicowa</h3>
          </div>
        </div>
      </li>
      <li>
        <div class="pl-card pl-card-hover">
          <div class="pl-card-media"><img src="/img/photo-2.svg" alt="" width="1200" height="800"></div>
          <div class="pl-card-body">
            <p class="pl-card-meta">Bieszczady</p>
            <h3 class="pl-card-title">Jezioro Solińskie</h3>
          </div>
        </div>
      </li>
      <li>
        <div class="pl-card pl-card-hover">
          <div class="pl-card-media"><img src="/img/photo-3.svg" alt="" width="1200" height="800"></div>
          <div class="pl-card-body">
            <p class="pl-card-meta">Pomorze</p>
            <h3 class="pl-card-title">Mierzeja Helska</h3>
          </div>
        </div>
      </li>
      <li>
        <div class="pl-card pl-card-hover">
          <div class="pl-card-media"><img src="/img/photo-4.svg" alt="" width="1200" height="800"></div>
          <div class="pl-card-body">
            <p class="pl-card-meta">Góry Stołowe</p>
            <h3 class="pl-card-title">Szczeliniec Wielki</h3>
          </div>
        </div>
      </li>
      <li>
        <div class="pl-card pl-card-hover">
          <div class="pl-card-media"><img src="/img/photo-5.svg" alt="" width="1200" height="800"></div>
          <div class="pl-card-body">
            <p class="pl-card-meta">Podlasie</p>
            <h3 class="pl-card-title">Biebrzańskie bagna</h3>
          </div>
        </div>
      </li>
      <li>
        <div class="pl-card pl-card-hover">
          <div class="pl-card-media"><img src="/img/photo-6.svg" alt="" width="1200" height="800"></div>
          <div class="pl-card-body">
            <p class="pl-card-meta">Tatry Zachodnie</p>
            <h3 class="pl-card-title">Dolina Chochołowska</h3>
          </div>
        </div>
      </li>
      <li>
        <div class="pl-card pl-card-hover">
          <div class="pl-card-media"><img src="/img/photo-7.svg" alt="" width="1200" height="800"></div>
          <div class="pl-card-body">
            <p class="pl-card-meta">Suwalszczyzna</p>
            <h3 class="pl-card-title">Wigry</h3>
          </div>
        </div>
      </li>
      <li>
        <div class="pl-card pl-card-hover">
          <div class="pl-card-media"><img src="/img/photo-8.svg" alt="" width="1200" height="800"></div>
          <div class="pl-card-body">
            <p class="pl-card-meta">Jura Krakowsko-Częstochowska</p>
            <h3 class="pl-card-title">Ojców</h3>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <button class="pl-slidenav-previous" type="button" aria-label="Poprzedni" data-pl-slider-item="previous"></button>
  <button class="pl-slidenav-next" type="button" aria-label="Następny" data-pl-slider-item="next"></button>
  <ul class="pl-slider-nav pl-dotnav"></ul>
</div>
```

Pusta lista `.pl-slider-nav` sama wypełnia się kropkami. Elementy w całości widoczne dostają klasę `.pl-active`, a te poza widokiem — atrybut `inert`, więc nie przechwytują fokusu.

## Szerokość elementów

### Liczba kolumn

Klasy `.pl-slider-cols-1` … `.pl-slider-cols-6` (także z sufiksami `@s`, `@m`, `@l`, `@xl`) ustawiają zmienną `--pl-slider-items` i domyślny odstęp. Zmienną możesz też podać samodzielnie — ułamki pokazują „zajawkę" kolejnego elementu.

```html example
<div class="pl-slider" data-pl-slider>
  <div class="pl-slider-container">
    <ul class="pl-slider-items" style="--pl-slider-items: 2.5; --pl-slider-gap: 1rem">
      <li style="border-radius: var(--pl-radius-md); overflow: hidden"><img src="/img/photo-1.svg" alt="Hala Gąsienicowa" width="1200" height="800"></li>
      <li style="border-radius: var(--pl-radius-md); overflow: hidden"><img src="/img/photo-2.svg" alt="Jezioro Solińskie" width="1200" height="800"></li>
      <li style="border-radius: var(--pl-radius-md); overflow: hidden"><img src="/img/photo-3.svg" alt="Mierzeja Helska" width="1200" height="800"></li>
      <li style="border-radius: var(--pl-radius-md); overflow: hidden"><img src="/img/photo-4.svg" alt="Szczeliniec Wielki" width="1200" height="800"></li>
      <li style="border-radius: var(--pl-radius-md); overflow: hidden"><img src="/img/photo-5.svg" alt="Biebrzańskie bagna" width="1200" height="800"></li>
      <li style="border-radius: var(--pl-radius-md); overflow: hidden"><img src="/img/photo-6.svg" alt="Dolina Chochołowska" width="1200" height="800"></li>
      <li style="border-radius: var(--pl-radius-md); overflow: hidden"><img src="/img/photo-7.svg" alt="Wigry" width="1200" height="800"></li>
      <li style="border-radius: var(--pl-radius-md); overflow: hidden"><img src="/img/photo-8.svg" alt="Ojców" width="1200" height="800"></li>
    </ul>
  </div>
</div>
```

### Klasy siatki

Tor współpracuje z klasami `.pl-grid` i `.pl-child-width-*` — rynny i szerokości pochodzą wtedy z siatki.

```html example
<div class="pl-slider" data-pl-slider>
  <div class="pl-slider-container">
    <ul class="pl-slider-items pl-grid pl-grid-small pl-child-width-1-2 pl-child-width-1-4@m">
      <li><img src="/img/photo-1.svg" alt="Hala Gąsienicowa" width="1200" height="800"></li>
      <li><img src="/img/photo-2.svg" alt="Jezioro Solińskie" width="1200" height="800"></li>
      <li><img src="/img/photo-3.svg" alt="Mierzeja Helska" width="1200" height="800"></li>
      <li><img src="/img/photo-4.svg" alt="Szczeliniec Wielki" width="1200" height="800"></li>
      <li><img src="/img/photo-5.svg" alt="Biebrzańskie bagna" width="1200" height="800"></li>
      <li><img src="/img/photo-6.svg" alt="Dolina Chochołowska" width="1200" height="800"></li>
      <li><img src="/img/photo-7.svg" alt="Wigry" width="1200" height="800"></li>
      <li><img src="/img/photo-8.svg" alt="Ojców" width="1200" height="800"></li>
    </ul>
  </div>
  <button class="pl-slidenav-previous" type="button" aria-label="Poprzedni" data-pl-slider-item="previous"></button>
  <button class="pl-slidenav-next" type="button" aria-label="Następny" data-pl-slider-item="next"></button>
</div>
```

### Dowolne szerokości

Elementy mogą mieć różne, własne szerokości — slider mierzy każdy z osobna.

```html example
<div class="pl-slider" data-pl-slider>
  <div class="pl-slider-container">
    <ul class="pl-slider-items pl-slider-gap-small">
      <li style="width: 18rem"><img src="/img/photo-1.svg" alt="" style="height: 12rem; width: 100%; object-fit: cover; border-radius: var(--pl-radius-md)"></li>
      <li style="width: 11rem"><img src="/img/photo-2.svg" alt="" style="height: 12rem; width: 100%; object-fit: cover; border-radius: var(--pl-radius-md)"></li>
      <li style="width: 24rem"><img src="/img/photo-3.svg" alt="" style="height: 12rem; width: 100%; object-fit: cover; border-radius: var(--pl-radius-md)"></li>
      <li style="width: 14rem"><img src="/img/photo-4.svg" alt="" style="height: 12rem; width: 100%; object-fit: cover; border-radius: var(--pl-radius-md)"></li>
      <li style="width: 20rem"><img src="/img/photo-5.svg" alt="" style="height: 12rem; width: 100%; object-fit: cover; border-radius: var(--pl-radius-md)"></li>
      <li style="width: 12rem"><img src="/img/photo-6.svg" alt="" style="height: 12rem; width: 100%; object-fit: cover; border-radius: var(--pl-radius-md)"></li>
      <li style="width: 22rem"><img src="/img/photo-7.svg" alt="" style="height: 12rem; width: 100%; object-fit: cover; border-radius: var(--pl-radius-md)"></li>
    </ul>
  </div>
  <ul class="pl-slider-nav pl-dotnav"></ul>
</div>
```

## Odstępy

Odstęp między elementami to zmienna `--pl-slider-gap`. Gotowe klasy na liście: `.pl-slider-gap-small`, `.pl-slider-gap-large` i `.pl-slider-gap-collapse`.

```html example
<div class="pl-slider" data-pl-slider>
  <div class="pl-slider-container" style="border-radius: var(--pl-radius-lg)">
    <ul class="pl-slider-items pl-slider-cols-2 pl-slider-cols-4@m pl-slider-gap-collapse">
      <li><img src="/img/photo-1.svg" alt="Hala Gąsienicowa" width="1200" height="800"></li>
      <li><img src="/img/photo-2.svg" alt="Jezioro Solińskie" width="1200" height="800"></li>
      <li><img src="/img/photo-3.svg" alt="Mierzeja Helska" width="1200" height="800"></li>
      <li><img src="/img/photo-4.svg" alt="Szczeliniec Wielki" width="1200" height="800"></li>
      <li><img src="/img/photo-5.svg" alt="Biebrzańskie bagna" width="1200" height="800"></li>
      <li><img src="/img/photo-6.svg" alt="Dolina Chochołowska" width="1200" height="800"></li>
      <li><img src="/img/photo-7.svg" alt="Wigry" width="1200" height="800"></li>
      <li><img src="/img/photo-8.svg" alt="Ojców" width="1200" height="800"></li>
    </ul>
  </div>
  <button class="pl-slidenav-previous" type="button" aria-label="Poprzedni" data-pl-slider-item="previous"></button>
  <button class="pl-slidenav-next" type="button" aria-label="Następny" data-pl-slider-item="next"></button>
</div>
```

## Wyśrodkowanie

Opcja `center: true` ustawia aktywny element na środku. W połączeniu z klasą `.pl-slider-focus` elementy poza środkiem są przygaszone i pomniejszone.

```html example
<div class="pl-slider pl-slider-focus" data-pl-slider="center: true">
  <div class="pl-slider-container">
    <ul class="pl-slider-items pl-slider-gap-small" style="--pl-slider-items: 1.6">
      <li style="border-radius: var(--pl-radius-lg); overflow: hidden"><img src="/img/photo-1.svg" alt="Hala Gąsienicowa" width="1200" height="800"></li>
      <li style="border-radius: var(--pl-radius-lg); overflow: hidden"><img src="/img/photo-2.svg" alt="Jezioro Solińskie" width="1200" height="800"></li>
      <li style="border-radius: var(--pl-radius-lg); overflow: hidden"><img src="/img/photo-3.svg" alt="Mierzeja Helska" width="1200" height="800"></li>
      <li style="border-radius: var(--pl-radius-lg); overflow: hidden"><img src="/img/photo-4.svg" alt="Szczeliniec Wielki" width="1200" height="800"></li>
      <li style="border-radius: var(--pl-radius-lg); overflow: hidden"><img src="/img/photo-5.svg" alt="Biebrzańskie bagna" width="1200" height="800"></li>
      <li style="border-radius: var(--pl-radius-lg); overflow: hidden"><img src="/img/photo-6.svg" alt="Dolina Chochołowska" width="1200" height="800"></li>
      <li style="border-radius: var(--pl-radius-lg); overflow: hidden"><img src="/img/photo-7.svg" alt="Wigry" width="1200" height="800"></li>
      <li style="border-radius: var(--pl-radius-lg); overflow: hidden"><img src="/img/photo-8.svg" alt="Ojców" width="1200" height="800"></li>
    </ul>
  </div>
  <button class="pl-slidenav-previous" type="button" aria-label="Poprzedni" data-pl-slider-item="previous"></button>
  <button class="pl-slidenav-next" type="button" aria-label="Następny" data-pl-slider-item="next"></button>
  <ul class="pl-slider-nav pl-dotnav"></ul>
</div>
```

## Skończony tor

Domyślnie slider kręci się w pętli. Opcja `finite: true` zatrzymuje go na końcach: strzałki się wyłączają, a przeciągnięcie poza skraj stawia rosnący opór i sprężyście wraca.

```html example
<div class="pl-slider" data-pl-slider="finite: true">
  <div class="pl-slider-container">
    <ul class="pl-slider-items pl-slider-cols-2 pl-slider-cols-3@m">
      <li>
        <div class="pl-card">
          <div class="pl-card-media"><img src="/img/photo-1.svg" alt="" width="1200" height="800"></div>
          <div class="pl-card-body">
            <p class="pl-card-meta">Tatry · 1500 m n.p.m.</p>
            <h3 class="pl-card-title">Hala Gąsienicowa</h3>
          </div>
        </div>
      </li>
      <li>
        <div class="pl-card">
          <div class="pl-card-media"><img src="/img/photo-2.svg" alt="" width="1200" height="800"></div>
          <div class="pl-card-body">
            <p class="pl-card-meta">Bieszczady</p>
            <h3 class="pl-card-title">Jezioro Solińskie</h3>
          </div>
        </div>
      </li>
      <li>
        <div class="pl-card">
          <div class="pl-card-media"><img src="/img/photo-3.svg" alt="" width="1200" height="800"></div>
          <div class="pl-card-body">
            <p class="pl-card-meta">Pomorze</p>
            <h3 class="pl-card-title">Mierzeja Helska</h3>
          </div>
        </div>
      </li>
      <li>
        <div class="pl-card">
          <div class="pl-card-media"><img src="/img/photo-4.svg" alt="" width="1200" height="800"></div>
          <div class="pl-card-body">
            <p class="pl-card-meta">Góry Stołowe</p>
            <h3 class="pl-card-title">Szczeliniec Wielki</h3>
          </div>
        </div>
      </li>
      <li>
        <div class="pl-card">
          <div class="pl-card-media"><img src="/img/photo-5.svg" alt="" width="1200" height="800"></div>
          <div class="pl-card-body">
            <p class="pl-card-meta">Podlasie</p>
            <h3 class="pl-card-title">Biebrzańskie bagna</h3>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <button class="pl-slidenav-previous" type="button" aria-label="Poprzedni" data-pl-slider-item="previous"></button>
  <button class="pl-slidenav-next" type="button" aria-label="Następny" data-pl-slider-item="next"></button>
  <ul class="pl-slider-nav pl-dotnav"></ul>
</div>
```

## Zestawy

Z `sets: true` strzałki i kropki przewijają o cały zestaw widocznych elementów zamiast o jeden.

```html example
<div class="pl-slider" data-pl-slider="sets: true">
  <div class="pl-slider-container">
    <ul class="pl-slider-items pl-slider-cols-2 pl-slider-cols-4@m pl-slider-gap-small">
      <li style="border-radius: var(--pl-radius-md); overflow: hidden"><img src="/img/photo-1.svg" alt="Hala Gąsienicowa" width="1200" height="800"></li>
      <li style="border-radius: var(--pl-radius-md); overflow: hidden"><img src="/img/photo-2.svg" alt="Jezioro Solińskie" width="1200" height="800"></li>
      <li style="border-radius: var(--pl-radius-md); overflow: hidden"><img src="/img/photo-3.svg" alt="Mierzeja Helska" width="1200" height="800"></li>
      <li style="border-radius: var(--pl-radius-md); overflow: hidden"><img src="/img/photo-4.svg" alt="Szczeliniec Wielki" width="1200" height="800"></li>
      <li style="border-radius: var(--pl-radius-md); overflow: hidden"><img src="/img/photo-5.svg" alt="Biebrzańskie bagna" width="1200" height="800"></li>
      <li style="border-radius: var(--pl-radius-md); overflow: hidden"><img src="/img/photo-6.svg" alt="Dolina Chochołowska" width="1200" height="800"></li>
      <li style="border-radius: var(--pl-radius-md); overflow: hidden"><img src="/img/photo-7.svg" alt="Wigry" width="1200" height="800"></li>
      <li style="border-radius: var(--pl-radius-md); overflow: hidden"><img src="/img/photo-8.svg" alt="Ojców" width="1200" height="800"></li>
    </ul>
  </div>
  <button class="pl-slidenav-previous" type="button" aria-label="Poprzedni" data-pl-slider-item="previous"></button>
  <button class="pl-slidenav-next" type="button" aria-label="Następny" data-pl-slider-item="next"></button>
  <ul class="pl-slider-nav pl-dotnav"></ul>
</div>
```

## Autoodtwarzanie

`autoplay: true` przewija tor co `autoplay-interval` milisekund. Odtwarzanie wstrzymuje się po najechaniu myszą, przy fokusie z klawiatury, podczas przeciągania, gdy slider jest poza ekranem albo karta przeglądarki jest w tle. Przy `prefers-reduced-motion` nie startuje wcale. Kontrolka `data-pl-slider-item="toggle"` włącza i wyłącza odtwarzanie.

```html example
<div class="pl-slider" data-pl-slider="autoplay: true; autoplay-interval: 2500; sets: true">
  <div class="pl-slider-container">
    <ul class="pl-slider-items pl-slider-cols-2 pl-slider-cols-3@m">
      <li style="border-radius: var(--pl-radius-md); overflow: hidden"><img src="/img/photo-1.svg" alt="Hala Gąsienicowa" width="1200" height="800"></li>
      <li style="border-radius: var(--pl-radius-md); overflow: hidden"><img src="/img/photo-2.svg" alt="Jezioro Solińskie" width="1200" height="800"></li>
      <li style="border-radius: var(--pl-radius-md); overflow: hidden"><img src="/img/photo-3.svg" alt="Mierzeja Helska" width="1200" height="800"></li>
      <li style="border-radius: var(--pl-radius-md); overflow: hidden"><img src="/img/photo-4.svg" alt="Szczeliniec Wielki" width="1200" height="800"></li>
      <li style="border-radius: var(--pl-radius-md); overflow: hidden"><img src="/img/photo-5.svg" alt="Biebrzańskie bagna" width="1200" height="800"></li>
      <li style="border-radius: var(--pl-radius-md); overflow: hidden"><img src="/img/photo-6.svg" alt="Dolina Chochołowska" width="1200" height="800"></li>
      <li style="border-radius: var(--pl-radius-md); overflow: hidden"><img src="/img/photo-7.svg" alt="Wigry" width="1200" height="800"></li>
      <li style="border-radius: var(--pl-radius-md); overflow: hidden"><img src="/img/photo-8.svg" alt="Ojców" width="1200" height="800"></li>
    </ul>
  </div>
  <div class="pl-slider-arrows">
    <ul class="pl-slider-nav pl-dotnav"></ul>
    <button class="pl-button pl-button-small" type="button" data-pl-slider-item="toggle">Autoodtwarzanie</button>
    <button class="pl-slidenav-previous pl-slidenav-small" type="button" aria-label="Poprzedni" data-pl-slider-item="previous"></button>
    <button class="pl-slidenav-next pl-slidenav-small" type="button" aria-label="Następny" data-pl-slider-item="next"></button>
  </div>
</div>
```

## Strzałki i nawigacja

Przyciski z `data-pl-slider-item="previous|next"` umieszczone bezpośrednio w `.pl-slider` lądują po bokach toru. Klasa `.pl-slider-arrows-hover` pokazuje je dopiero po najechaniu lub fokusie, a `.pl-slider-arrows-outside` wysuwa poza krawędź. Pasek `.pl-slider-arrows` (przykład wyżej) układa kropki i strzałki w jednym rzędzie pod torem.

```html example
<div class="pl-slider pl-slider-arrows-hover" data-pl-slider>
  <div class="pl-slider-container pl-slider-fade">
    <ul class="pl-slider-items pl-slider-cols-2 pl-slider-cols-3@m pl-slider-gap-small">
      <li style="border-radius: var(--pl-radius-md); overflow: hidden"><img src="/img/photo-1.svg" alt="Hala Gąsienicowa" width="1200" height="800"></li>
      <li style="border-radius: var(--pl-radius-md); overflow: hidden"><img src="/img/photo-2.svg" alt="Jezioro Solińskie" width="1200" height="800"></li>
      <li style="border-radius: var(--pl-radius-md); overflow: hidden"><img src="/img/photo-3.svg" alt="Mierzeja Helska" width="1200" height="800"></li>
      <li style="border-radius: var(--pl-radius-md); overflow: hidden"><img src="/img/photo-4.svg" alt="Szczeliniec Wielki" width="1200" height="800"></li>
      <li style="border-radius: var(--pl-radius-md); overflow: hidden"><img src="/img/photo-5.svg" alt="Biebrzańskie bagna" width="1200" height="800"></li>
      <li style="border-radius: var(--pl-radius-md); overflow: hidden"><img src="/img/photo-6.svg" alt="Dolina Chochołowska" width="1200" height="800"></li>
      <li style="border-radius: var(--pl-radius-md); overflow: hidden"><img src="/img/photo-7.svg" alt="Wigry" width="1200" height="800"></li>
      <li style="border-radius: var(--pl-radius-md); overflow: hidden"><img src="/img/photo-8.svg" alt="Ojców" width="1200" height="800"></li>
    </ul>
  </div>
  <button class="pl-slidenav-previous" type="button" aria-label="Poprzedni" data-pl-slider-item="previous"></button>
  <button class="pl-slidenav-next" type="button" aria-label="Następny" data-pl-slider-item="next"></button>
</div>
```

Klasa `.pl-slider-fade` na kontenerze wygasza krawędzie toru (szerokość: `--pl-slider-fade`).

## Karty z cieniem

Kontener przycina zawartość, więc cienie i uniesienie kart byłyby ucięte. Klasa `.pl-slider-container-offset` dodaje wokół toru zapas miejsca.

```html example
<div class="pl-slider" data-pl-slider="finite: true">
  <div class="pl-slider-container pl-slider-container-offset">
    <ul class="pl-slider-items pl-slider-cols-1 pl-slider-cols-2@s pl-slider-cols-3@m">
      <li>
        <div class="pl-card pl-card-hover">
          <div class="pl-card-media"><img src="/img/photo-5.svg" alt="" width="1200" height="800"></div>
          <div class="pl-card-body">
            <p class="pl-card-meta">Podlasie</p>
            <h3 class="pl-card-title">Biebrzańskie bagna</h3>
          </div>
        </div>
      </li>
      <li>
        <div class="pl-card pl-card-hover">
          <div class="pl-card-media"><img src="/img/photo-6.svg" alt="" width="1200" height="800"></div>
          <div class="pl-card-body">
            <p class="pl-card-meta">Tatry Zachodnie</p>
            <h3 class="pl-card-title">Dolina Chochołowska</h3>
          </div>
        </div>
      </li>
      <li>
        <div class="pl-card pl-card-hover">
          <div class="pl-card-media"><img src="/img/photo-7.svg" alt="" width="1200" height="800"></div>
          <div class="pl-card-body">
            <p class="pl-card-meta">Suwalszczyzna</p>
            <h3 class="pl-card-title">Wigry</h3>
          </div>
        </div>
      </li>
      <li>
        <div class="pl-card pl-card-hover">
          <div class="pl-card-media"><img src="/img/photo-8.svg" alt="" width="1200" height="800"></div>
          <div class="pl-card-body">
            <p class="pl-card-meta">Jura Krakowsko-Częstochowska</p>
            <h3 class="pl-card-title">Ojców</h3>
          </div>
        </div>
      </li>
      <li>
        <div class="pl-card pl-card-hover">
          <div class="pl-card-media"><img src="/img/photo-1.svg" alt="" width="1200" height="800"></div>
          <div class="pl-card-body">
            <p class="pl-card-meta">Tatry · 1500 m n.p.m.</p>
            <h3 class="pl-card-title">Hala Gąsienicowa</h3>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <ul class="pl-slider-nav pl-dotnav"></ul>
</div>
```

## Sterowanie z JavaScriptu

Instancję pobierzesz przez `Plossy.slider(element)`. Zdarzenia `pl:itemshow` / `pl:itemshown` informują o zmianie aktywnego elementu.

```html example
<div class="pl-slider" id="demo-slider-api" data-pl-slider>
  <div class="pl-slider-container">
    <ul class="pl-slider-items pl-slider-cols-2 pl-slider-cols-4@m pl-slider-gap-small">
      <li style="border-radius: var(--pl-radius-md); overflow: hidden"><img src="/img/photo-1.svg" alt="Hala Gąsienicowa" width="1200" height="800"></li>
      <li style="border-radius: var(--pl-radius-md); overflow: hidden"><img src="/img/photo-2.svg" alt="Jezioro Solińskie" width="1200" height="800"></li>
      <li style="border-radius: var(--pl-radius-md); overflow: hidden"><img src="/img/photo-3.svg" alt="Mierzeja Helska" width="1200" height="800"></li>
      <li style="border-radius: var(--pl-radius-md); overflow: hidden"><img src="/img/photo-4.svg" alt="Szczeliniec Wielki" width="1200" height="800"></li>
      <li style="border-radius: var(--pl-radius-md); overflow: hidden"><img src="/img/photo-5.svg" alt="Biebrzańskie bagna" width="1200" height="800"></li>
      <li style="border-radius: var(--pl-radius-md); overflow: hidden"><img src="/img/photo-6.svg" alt="Dolina Chochołowska" width="1200" height="800"></li>
      <li style="border-radius: var(--pl-radius-md); overflow: hidden"><img src="/img/photo-7.svg" alt="Wigry" width="1200" height="800"></li>
      <li style="border-radius: var(--pl-radius-md); overflow: hidden"><img src="/img/photo-8.svg" alt="Ojców" width="1200" height="800"></li>
    </ul>
  </div>
</div>
<div class="pl-flex pl-flex-middle pl-margin-top" style="gap: 0.5rem; flex-wrap: wrap">
  <button class="pl-button pl-button-small" type="button" id="demo-slider-prev">Poprzedni</button>
  <button class="pl-button pl-button-small" type="button" id="demo-slider-next">Następny</button>
  <button class="pl-button pl-button-small" type="button" id="demo-slider-fifth">Pokaż piąty</button>
  <span class="pl-text-muted" id="demo-slider-status">Aktywny element: 1</span>
</div>
```

```js example-js
const slider = Plossy.slider('#demo-slider-api');
const status = document.querySelector('#demo-slider-status');

document.querySelector('#demo-slider-prev').addEventListener('click', () => slider.show('previous'));
document.querySelector('#demo-slider-next').addEventListener('click', () => slider.show('next'));
document.querySelector('#demo-slider-fifth').addEventListener('click', () => slider.show(4));

slider.el.addEventListener('pl:itemshow', (event) => {
  status.textContent = `Aktywny element: ${event.detail.index + 1}`;
});
```

## Dostępność

- Kontener dostaje `role="region"` i `aria-roledescription="karuzela"`; nazwij go przez `aria-label` lub `aria-labelledby`.
- Każdy element ma `aria-roledescription="slajd"` i etykietę „3 z 8".
- Lista ma `aria-live="polite"`, a w trakcie autoodtwarzania `off`, żeby czytnik nie przerywał.
- Gdy fokus jest w sliderze, <kbd>←</kbd> / <kbd>→</kbd> przewijają, <kbd>Home</kbd> / <kbd>End</kbd> skaczą na początek i koniec.
- Pionowe przesuwanie palcem zawsze przewija stronę (`touch-action: pan-y`), poziome przesuwa tor. Poziomy gest na gładziku też przesuwa tor.
- Elementy wewnątrz slajdu, które nie powinny zaczynać przeciągania, oznacz klasą `.pl-drag-ignore`.

## API

### Opcje

| Opcja | Typ | Domyślnie | Opis |
| --- | --- | --- | --- |
| `center` | boolean | `false` | Wyśrodkowuje aktywny element. |
| `finite` | boolean | `false` | Wyłącza nieskończoną pętlę. |
| `sets` | boolean | `false` | Przewija o cały zestaw widocznych elementów. |
| `autoplay` | boolean | `false` | Automatyczne przewijanie. |
| `autoplay-interval` | number | `5000` | Odstęp między przewinięciami (ms). |
| `pause-on-hover` | boolean | `true` | Wstrzymuje autoodtwarzanie po najechaniu myszą. |
| `draggable` | boolean | `true` | Przeciąganie myszą / palcem i gest gładzika. |
| `index` | number | `0` | Element aktywny na starcie. |
| `velocity` | number | `1` | Mnożnik szybkości animacji (większy = szybciej). |

Pętla wymaga, by elementów było więcej, niż mieści się w widoku — w przeciwnym razie slider sam przechodzi w tryb skończony.

### Metody

| Metoda | Opis |
| --- | --- |
| `show(index \| 'next' \| 'previous')` | Przewija do elementu. |
| `startAutoplay()` | Włącza autoodtwarzanie. |
| `stopAutoplay()` | Wyłącza autoodtwarzanie. |
| `update()` | Przelicza układ po dodaniu lub usunięciu elementów (wywoływane też automatycznie). |

### Zdarzenia

| Zdarzenie | Opis |
| --- | --- |
| `pl:beforeitemshow` | Przed zmianą elementu; można anulować przez `preventDefault()`. |
| `pl:itemshow` | Rozpoczyna się przewijanie do elementu (`detail.index`, `detail.item`, `detail.previous`). |
| `pl:itemshown` | Tor zatrzymał się na elemencie. |
| `pl:itemhide` | Poprzedni element przestaje być aktywny. |

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-slider` | Kontener komponentu. |
| `.pl-slider-container` | Okno przycinające tor. |
| `.pl-slider-container-offset` | Zapas miejsca na cienie kart. |
| `.pl-slider-fade` | Wygaszone krawędzie okna. |
| `.pl-slider-items` | Tor z elementami. |
| `.pl-slider-cols-{1–6}` | Liczba widocznych elementów (z sufiksami `@s` `@m` `@l` `@xl`). |
| `.pl-slider-gap-small` `-large` `-collapse` | Odstęp między elementami. |
| `.pl-slider-nav` | Nawigacja; pusta wypełnia się kropkami. |
| `.pl-slider-arrows` | Pasek sterowania pod torem. |
| `.pl-slider-arrows-hover` | Strzałki widoczne po najechaniu. |
| `.pl-slider-arrows-outside` | Strzałki wysunięte poza tor. |
| `.pl-slider-focus` | Przygasza elementy bez klasy `.pl-active`. |
| `.pl-active` | Element w całości widoczny / aktywna kropka. |
| `.pl-drag-ignore` | Wyłącza przeciąganie na elemencie. |
