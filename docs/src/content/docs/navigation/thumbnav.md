---
title: Thumbnav
description: Nawigacja z miniatur zdjęć dla galerii i pokazów slajdów. Nieaktywne miniatury są przygaszone, aktywną otacza pierścień w kolorze akcentu.
---

## Podstawowe użycie

Dodaj klasę `.pl-thumbnav` do listy z linkami zawierającymi obrazy. Aktywną miniaturę oznacz `.pl-active` na `<li>`. Miniatury mają stały rozmiar, a obraz jest kadrowany (`object-fit: cover`).

```html example center
<ul class="pl-thumbnav">
  <li class="pl-active"><a href="#"><img src="/img/photo-1.svg" alt="Zdjęcie 1"></a></li>
  <li><a href="#"><img src="/img/photo-2.svg" alt="Zdjęcie 2"></a></li>
  <li><a href="#"><img src="/img/photo-3.svg" alt="Zdjęcie 3"></a></li>
  <li><a href="#"><img src="/img/photo-4.svg" alt="Zdjęcie 4"></a></li>
  <li><a href="#"><img src="/img/photo-5.svg" alt="Zdjęcie 5"></a></li>
</ul>
```

## Galeria ze Switcherem

Thumbnav współpracuje ze Switcherem, Sliderem i Slideshow. Poniżej miniatury przełączają duże zdjęcie.

```html example
<div class="pl-switcher" id="demo-thumbnav-gallery">
  <div class="pl-active"><img src="/img/photo-6.svg" alt="Widok 1" style="display: block; width: 100%; height: 18rem; object-fit: cover; border-radius: var(--pl-radius-lg)"></div>
  <div><img src="/img/photo-7.svg" alt="Widok 2" style="display: block; width: 100%; height: 18rem; object-fit: cover; border-radius: var(--pl-radius-lg)"></div>
  <div><img src="/img/photo-8.svg" alt="Widok 3" style="display: block; width: 100%; height: 18rem; object-fit: cover; border-radius: var(--pl-radius-lg)"></div>
  <div><img src="/img/photo-1.svg" alt="Widok 4" style="display: block; width: 100%; height: 18rem; object-fit: cover; border-radius: var(--pl-radius-lg)"></div>
</div>
<ul class="pl-thumbnav pl-thumbnav-center pl-margin-top" data-pl-switcher="connect: #demo-thumbnav-gallery">
  <li class="pl-active"><a href="#"><img src="/img/photo-6.svg" alt="Widok 1"></a></li>
  <li><a href="#"><img src="/img/photo-7.svg" alt="Widok 2"></a></li>
  <li><a href="#"><img src="/img/photo-8.svg" alt="Widok 3"></a></li>
  <li><a href="#"><img src="/img/photo-1.svg" alt="Widok 4"></a></li>
</ul>
```

## Pionowo

`.pl-thumbnav-vertical` układa miniatury w kolumnie — klasyczny układ galerii produktu.

```html example
<div style="display: flex; gap: 1rem">
  <ul class="pl-thumbnav pl-thumbnav-vertical pl-thumbnav-square" data-pl-switcher="connect: #demo-thumbnav-product" style="flex: none">
    <li class="pl-active"><a href="#"><img src="/img/photo-2.svg" alt="Przód"></a></li>
    <li><a href="#"><img src="/img/photo-3.svg" alt="Bok"></a></li>
    <li><a href="#"><img src="/img/photo-4.svg" alt="Detal"></a></li>
    <li><a href="#"><img src="/img/photo-5.svg" alt="We wnętrzu"></a></li>
  </ul>
  <div class="pl-switcher" id="demo-thumbnav-product" style="flex: 1; min-width: 0">
    <div class="pl-active"><img src="/img/photo-2.svg" alt="Przód" style="display: block; width: 100%; height: 16.25rem; object-fit: cover; border-radius: var(--pl-radius-lg)"></div>
    <div><img src="/img/photo-3.svg" alt="Bok" style="display: block; width: 100%; height: 16.25rem; object-fit: cover; border-radius: var(--pl-radius-lg)"></div>
    <div><img src="/img/photo-4.svg" alt="Detal" style="display: block; width: 100%; height: 16.25rem; object-fit: cover; border-radius: var(--pl-radius-lg)"></div>
    <div><img src="/img/photo-5.svg" alt="We wnętrzu" style="display: block; width: 100%; height: 16.25rem; object-fit: cover; border-radius: var(--pl-radius-lg)"></div>
  </div>
</div>
```

## Kształty

`.pl-thumbnav-square` daje kwadratowe miniatury, a `.pl-thumbnav-circle` — okrągłe (np. do wyboru koloru produktu albo osoby).

```html example center
<ul class="pl-thumbnav pl-thumbnav-square">
  <li><a href="#"><img src="/img/photo-1.svg" alt="Wariant 1"></a></li>
  <li class="pl-active"><a href="#"><img src="/img/photo-2.svg" alt="Wariant 2"></a></li>
  <li><a href="#"><img src="/img/photo-3.svg" alt="Wariant 3"></a></li>
</ul>
<ul class="pl-thumbnav pl-thumbnav-circle">
  <li class="pl-active"><a href="#"><img src="/img/avatar-1.svg" alt="Anna"></a></li>
  <li><a href="#"><img src="/img/avatar-2.svg" alt="Marek"></a></li>
  <li><a href="#"><img src="/img/avatar-3.svg" alt="Julia"></a></li>
  <li><a href="#"><img src="/img/avatar-4.svg" alt="Piotr"></a></li>
</ul>
```

## Rozmiary

```html example column
<ul class="pl-thumbnav pl-thumbnav-small">
  <li class="pl-active"><a href="#"><img src="/img/photo-4.svg" alt="Zdjęcie 1"></a></li>
  <li><a href="#"><img src="/img/photo-5.svg" alt="Zdjęcie 2"></a></li>
  <li><a href="#"><img src="/img/photo-6.svg" alt="Zdjęcie 3"></a></li>
  <li><a href="#"><img src="/img/photo-7.svg" alt="Zdjęcie 4"></a></li>
</ul>
<ul class="pl-thumbnav pl-thumbnav-large">
  <li><a href="#"><img src="/img/photo-4.svg" alt="Zdjęcie 1"></a></li>
  <li class="pl-active"><a href="#"><img src="/img/photo-5.svg" alt="Zdjęcie 2"></a></li>
  <li><a href="#"><img src="/img/photo-6.svg" alt="Zdjęcie 3"></a></li>
</ul>
```

## Na zdjęciu

`.pl-thumbnav-light` zmienia pierścień na biały — do miniatur nałożonych na zdjęcie lub ciemne tło.

```html example flush
<div style="position: relative">
  <img src="/img/photo-8.svg" alt="" style="display: block; width: 100%; height: 18rem; object-fit: cover">
  <ul class="pl-thumbnav pl-thumbnav-small pl-thumbnav-light pl-thumbnav-center" style="position: absolute; left: 0; right: 0; bottom: 1.25rem">
    <li><a href="#"><img src="/img/photo-6.svg" alt="Zdjęcie 1"></a></li>
    <li><a href="#"><img src="/img/photo-7.svg" alt="Zdjęcie 2"></a></li>
    <li class="pl-active"><a href="#"><img src="/img/photo-8.svg" alt="Zdjęcie 3"></a></li>
    <li><a href="#"><img src="/img/photo-1.svg" alt="Zdjęcie 4"></a></li>
  </ul>
</div>
```

## API

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-thumbnav` | Lista miniatur. |
| `.pl-thumbnav-vertical` | Układ pionowy. |
| `.pl-thumbnav-square` | Kwadratowe miniatury. |
| `.pl-thumbnav-circle` | Okrągłe miniatury. |
| `.pl-thumbnav-small` / `.pl-thumbnav-large` | Rozmiar. |
| `.pl-thumbnav-light` | Biały pierścień — na zdjęcia i ciemne tła. |
| `.pl-thumbnav-center` | Wyśrodkowanie miniatur. |
| `.pl-active` / `.pl-disabled` | Stany pozycji (na `<li>`). |

### Zmienne CSS

| Zmienna | Domyślnie | Opis |
| --- | --- | --- |
| `--pl-thumbnav-w` / `--pl-thumbnav-h` | `5rem` / `3.25rem` | Wymiary miniatury. |
| `--pl-thumbnav-radius` | `--pl-radius-sm` | Zaokrąglenie. |
| `--pl-thumbnav-gap` | `0.625rem` | Odstęp między miniaturami. |
| `--pl-thumbnav-ring` | `--pl-primary` | Kolor pierścienia aktywnej miniatury. |
| `--pl-thumbnav-ring-gap` | `--pl-bg` | Kolor odstępu między miniaturą a pierścieniem. |
