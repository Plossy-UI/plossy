---
title: Image
description: Pomocnicze klasy do obrazów — stałe proporcje, zaokrąglenia, podpisy pod zdjęciem i na nim, efekt przybliżenia oraz miniatury w ramce. Wyłącznie CSS.
---

## Podstawowe użycie

Owiń obraz w `.pl-image`. Wrapper przycina zawartość, a obraz wypełnia go w całości (`object-fit: cover`). Do obrazów poniżej pierwszego ekranu dodawaj natywne `loading="lazy"` oraz atrybuty `width` i `height` — przeglądarka zarezerwuje miejsce, a do czasu wczytania widoczne będzie neutralne tło.

```html example
<div class="pl-image pl-image-rounded" style="max-width: 32rem">
  <img src="/img/photo-1.svg" alt="Górski krajobraz o świcie" width="1200" height="800" loading="lazy">
</div>
```

## Proporcje

Klasy `.pl-ratio-*` wymuszają proporcje niezależnie od wymiarów pliku: `21-9`, `16-9`, `3-2`, `4-3`, `1-1`, `3-4`, `2-3`, `9-16`.

```html example
<div class="pl-grid pl-child-width-1-2 pl-child-width-1-4@m">
  <div>
    <div class="pl-image pl-image-rounded pl-ratio-1-1">
      <img src="/img/photo-2.svg" alt="" loading="lazy">
    </div>
    <p class="pl-margin-small-top"><code>.pl-ratio-1-1</code></p>
  </div>
  <div>
    <div class="pl-image pl-image-rounded pl-ratio-4-3">
      <img src="/img/photo-3.svg" alt="" loading="lazy">
    </div>
    <p class="pl-margin-small-top"><code>.pl-ratio-4-3</code></p>
  </div>
  <div>
    <div class="pl-image pl-image-rounded pl-ratio-16-9">
      <img src="/img/photo-4.svg" alt="" loading="lazy">
    </div>
    <p class="pl-margin-small-top"><code>.pl-ratio-16-9</code></p>
  </div>
  <div>
    <div class="pl-image pl-image-rounded pl-ratio-3-4">
      <img src="/img/photo-5.svg" alt="" loading="lazy">
    </div>
    <p class="pl-margin-small-top"><code>.pl-ratio-3-4</code></p>
  </div>
</div>
```

Szeroki, panoramiczny kadr:

```html example
<div class="pl-image pl-image-rounded pl-ratio-21-9">
  <img src="/img/photo-6.svg" alt="Panorama wybrzeża" loading="lazy">
</div>
```

Klasy proporcji działają także bezpośrednio na `<img>`, `<video>` i `<iframe>` oraz mają warianty responsywne z sufiksem `@s`, `@m`, `@l`, `@xl` — na przykład pionowy kadr na telefonie i panorama na większym ekranie:

```html example
<img class="pl-ratio-3-4 pl-ratio-21-9@s pl-image-rounded" src="/img/photo-7.svg" alt="Leśna droga" loading="lazy">
```

## Kształty

`.pl-image-rounded` (duże zaokrąglenie), `.pl-image-rounded-small` i `.pl-image-circle`. `.pl-image-shadow` dodaje miękki cień, a `.pl-image-border` — włosową obwódkę wewnętrzną, która odcina jasne zdjęcia od tła.

```html example center
<div class="pl-image pl-ratio-1-1" style="width: 9rem">
  <img src="/img/photo-8.svg" alt="" loading="lazy">
</div>
<div class="pl-image pl-image-rounded-small pl-ratio-1-1" style="width: 9rem">
  <img src="/img/photo-8.svg" alt="" loading="lazy">
</div>
<div class="pl-image pl-image-rounded pl-image-shadow pl-ratio-1-1" style="width: 9rem">
  <img src="/img/photo-8.svg" alt="" loading="lazy">
</div>
<div class="pl-image pl-image-circle pl-image-border" style="width: 9rem">
  <img src="/img/photo-8.svg" alt="" loading="lazy">
</div>
```

## Podpis pod obrazem

Użyj `<figure class="pl-figure">` z `<figcaption>`. `.pl-figure-label` to mała etykieta techniczna (numer, autor) dosunięta do prawej, a `.pl-figure-center` wyśrodkowuje podpis.

```html example
<div class="pl-grid pl-child-width-1-2@s">
  <div>
    <figure class="pl-figure">
      <div class="pl-image pl-image-rounded pl-ratio-3-2">
        <img src="/img/photo-1.svg" alt="Schronisko na przełęczy" loading="lazy">
      </div>
      <figcaption>
        <span><strong>Schronisko na przełęczy.</strong> Ostatni przystanek przed szczytem.</span>
        <span class="pl-figure-label">Fot. 01</span>
      </figcaption>
    </figure>
  </div>
  <div>
    <figure class="pl-figure pl-figure-center">
      <div class="pl-image pl-image-rounded pl-ratio-3-2">
        <img src="/img/photo-3.svg" alt="Jezioro o zachodzie słońca" loading="lazy">
      </div>
      <figcaption>Jezioro o zachodzie słońca, widok z pomostu.</figcaption>
    </figure>
  </div>
</div>
```

## Podpis na obrazie

`<figcaption class="pl-image-caption">` wewnątrz `.pl-image` kładzie podpis na dolnej krawędzi zdjęcia, na ciemnym gradiencie. `.pl-image-caption-top` przenosi go na górę, a `.pl-image-caption-chip` zamienia w małą, rozmytą pigułkę.

```html example
<div class="pl-grid pl-child-width-1-3@m">
  <div>
    <figure class="pl-image pl-image-rounded pl-ratio-4-3">
      <img src="/img/photo-2.svg" alt="" loading="lazy">
      <figcaption class="pl-image-caption">
        <strong>Dolina Pięciu Stawów</strong>
        <small>Tatry Wysokie · 1670 m n.p.m.</small>
      </figcaption>
    </figure>
  </div>
  <div>
    <figure class="pl-image pl-image-rounded pl-ratio-4-3">
      <img src="/img/photo-4.svg" alt="" loading="lazy">
      <figcaption class="pl-image-caption pl-image-caption-top">
        <strong>Mierzeja Helska</strong>
        <small>Wybrzeże Bałtyku</small>
      </figcaption>
    </figure>
  </div>
  <div>
    <figure class="pl-image pl-image-rounded pl-ratio-4-3">
      <img src="/img/photo-6.svg" alt="Winnica w słońcu" loading="lazy">
      <figcaption class="pl-image-caption pl-image-caption-chip">Fot. Marta Wilk</figcaption>
    </figure>
  </div>
</div>
```

### Podpis po najechaniu

`.pl-image-caption-hover` ukrywa podpis do czasu najechania lub fokusu. Na ekranach dotykowych podpis jest widoczny zawsze.

```html example
<div class="pl-grid pl-child-width-1-2@s">
  <div>
    <a class="pl-image pl-image-rounded pl-image-zoom pl-ratio-16-9" href="#">
      <img src="/img/photo-5.svg" alt="" loading="lazy">
      <span class="pl-image-caption pl-image-caption-hover">
        <strong>Pracownia ceramiki</strong>
        <small>Zobacz realizację →</small>
      </span>
    </a>
  </div>
  <div>
    <a class="pl-image pl-image-rounded pl-image-zoom pl-ratio-16-9" href="#">
      <img src="/img/photo-7.svg" alt="" loading="lazy">
      <span class="pl-image-caption pl-image-caption-hover">
        <strong>Dom nad jeziorem</strong>
        <small>Zobacz realizację →</small>
      </span>
    </a>
  </div>
</div>
```

## Efekty hover

`.pl-image-zoom` łagodnie przybliża obraz, `.pl-image-grayscale` pokazuje go w szarości i przywraca kolor po najechaniu, a `.pl-image-dim` lekko go przyciemnia. Jeśli efekt ma uruchamiać najechanie na większy element (np. kartę), nadaj temu elementowi klasę `.pl-image-zoom-parent`.

```html example
<div class="pl-grid pl-child-width-1-3@s">
  <div>
    <div class="pl-image pl-image-rounded pl-image-zoom pl-ratio-4-3">
      <img src="/img/photo-1.svg" alt="" loading="lazy">
    </div>
    <p class="pl-margin-small-top"><code>.pl-image-zoom</code></p>
  </div>
  <div>
    <div class="pl-image pl-image-rounded pl-image-grayscale pl-ratio-4-3">
      <img src="/img/photo-3.svg" alt="" loading="lazy">
    </div>
    <p class="pl-margin-small-top"><code>.pl-image-grayscale</code></p>
  </div>
  <div>
    <div class="pl-image pl-image-rounded pl-image-dim pl-ratio-4-3">
      <img src="/img/photo-6.svg" alt="" loading="lazy">
    </div>
    <p class="pl-margin-small-top"><code>.pl-image-dim</code></p>
  </div>
</div>
```

## Ramka

`.pl-image-frame` to miniatura w białej ramce z włosową obwódką. Na elemencie `<a>` (lub z klasą `.pl-image-frame-hover`) unosi się i lekko przechyla po najechaniu. Może zawierać `<figcaption>`.

```html example center
<img class="pl-image-frame" src="/img/photo-2.svg" alt="" width="180" height="120" loading="lazy">
<a class="pl-image-frame" href="#">
  <img src="/img/photo-4.svg" alt="Otwórz zdjęcie" width="180" height="120" loading="lazy">
</a>
<figure class="pl-image-frame pl-image-frame-large pl-image-frame-hover">
  <img src="/img/photo-8.svg" alt="" width="200" height="133" loading="lazy">
  <figcaption>Wakacje 2026, Mazury</figcaption>
</figure>
<span class="pl-image-frame pl-image-frame-circle">
  <img src="/img/avatar-3.svg" alt="" width="96" height="96" loading="lazy">
</span>
```

## Dopasowanie kadru

Domyślnie obraz wypełnia wrapper. `.pl-image-contain` mieści go w całości, a `.pl-image-top` / `.pl-image-bottom` przesuwają punkt kadrowania.

```html example
<div class="pl-grid pl-child-width-1-3@s">
  <div>
    <div class="pl-image pl-image-rounded pl-ratio-1-1">
      <img src="/img/photo-5.svg" alt="" loading="lazy">
    </div>
    <p class="pl-margin-small-top">Wypełnienie (domyślnie)</p>
  </div>
  <div>
    <div class="pl-image pl-image-rounded pl-image-contain pl-ratio-1-1">
      <img src="/img/photo-5.svg" alt="" loading="lazy">
    </div>
    <p class="pl-margin-small-top"><code>.pl-image-contain</code></p>
  </div>
  <div>
    <div class="pl-image pl-image-rounded pl-image-top pl-ratio-21-9">
      <img src="/img/photo-5.svg" alt="" loading="lazy">
    </div>
    <p class="pl-margin-small-top"><code>.pl-image-top</code></p>
  </div>
</div>
```

## API

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-image` | Wrapper obrazu (przycina i wypełnia). |
| `.pl-image-inline` | Wrapper w linii tekstu. |
| `.pl-ratio-21-9`, `-16-9`, `-3-2`, `-4-3`, `-1-1`, `-3-4`, `-2-3`, `-9-16` | Proporcje; z sufiksami `@s`, `@m`, `@l`, `@xl`. |
| `.pl-image-rounded`, `.pl-image-rounded-small`, `.pl-image-circle` | Kształt (także bezpośrednio na `<img>`). |
| `.pl-image-shadow` | Miękki cień. |
| `.pl-image-border` | Włosowa obwódka wewnętrzna. |
| `.pl-image-contain` | Obraz mieści się w całości. |
| `.pl-image-top`, `.pl-image-bottom` | Punkt kadrowania. |
| `.pl-image-zoom` | Przybliżenie po najechaniu; `.pl-image-zoom-parent` na elemencie nadrzędnym. |
| `.pl-image-grayscale`, `.pl-image-dim` | Efekty po najechaniu. |
| `.pl-figure` | Obraz z podpisem pod spodem; `.pl-figure-center`, `.pl-figure-label`. |
| `.pl-image-caption` | Podpis na obrazie; `-top`, `-chip`, `-hover`. |
| `.pl-image-frame` | Miniatura w ramce; `-large`, `-circle`, `-hover`. |

### Zmienne CSS

| Zmienna | Domyślnie | Opis |
| --- | --- | --- |
| `--pl-image-radius` | `0px` | Zaokrąglenie wrappera. |
| `--pl-image-frame-p` | `0.375rem` | Grubość ramki miniatury. |
| `--pl-image-frame-radius` | `var(--pl-radius-md)` | Zaokrąglenie ramki. |
