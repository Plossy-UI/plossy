---
title: Dotnav
description: Nawigacja z kropek dla pokazów slajdów, karuzel i sekcji strony. Aktywna kropka sprężyście rozciąga się w pigułkę.
---

## Podstawowe użycie

Dodaj klasę `.pl-dotnav` do listy. Aktywna pozycja ma klasę `.pl-active` na `<li>`. Tekst linku jest ukryty wizualnie, ale pozostaje dostępny dla czytników ekranu — zawsze go podawaj.

```html example center
<ul class="pl-dotnav">
  <li class="pl-active"><a href="#">Slajd 1</a></li>
  <li><a href="#">Slajd 2</a></li>
  <li><a href="#">Slajd 3</a></li>
  <li><a href="#">Slajd 4</a></li>
  <li><a href="#">Slajd 5</a></li>
</ul>
```

## Przełączanie

Dotnav współpracuje ze Switcherem, Sliderem i Slideshow — wystarczy, że komponent przenosi klasę `.pl-active`. Kliknij kropki poniżej, aby zobaczyć animację.

```html example
<div class="pl-switcher" id="demo-dotnav-panels">
  <div class="pl-active">
    <h4>Zaprojektuj</h4>
    <p>Zacznij od gotowych komponentów i dopasuj je tokenami do swojej marki.</p>
  </div>
  <div>
    <h4>Zbuduj</h4>
    <p>Czysty HTML i atrybuty <code>data-pl-*</code> — bez kroku budowania i bez zależności.</p>
  </div>
  <div>
    <h4>Opublikuj</h4>
    <p>Lekki CSS i moduły ładowane tylko wtedy, gdy są potrzebne.</p>
  </div>
</div>
<ul class="pl-dotnav pl-margin-top" data-pl-switcher="connect: #demo-dotnav-panels">
  <li class="pl-active"><a href="#">Zaprojektuj</a></li>
  <li><a href="#">Zbuduj</a></li>
  <li><a href="#">Opublikuj</a></li>
</ul>
```

## Pionowo

`.pl-dotnav-vertical` układa kropki w kolumnie — aktywna rozciąga się w pionie. Sprawdza się jako wskaźnik sekcji przy krawędzi ekranu.

```html example center
<ul class="pl-dotnav pl-dotnav-vertical">
  <li><a href="#">Wstęp</a></li>
  <li class="pl-active"><a href="#">Funkcje</a></li>
  <li><a href="#">Cennik</a></li>
  <li><a href="#">Opinie</a></li>
  <li><a href="#">Kontakt</a></li>
</ul>
```

## Na zdjęciu

Na zdjęciach i ciemnych tłach użyj `.pl-dotnav-light`.

```html example flush
<div style="position: relative">
  <img src="/img/photo-3.svg" alt="" style="display: block; width: 100%; height: 16rem; object-fit: cover">
  <ul class="pl-dotnav pl-dotnav-light" style="position: absolute; left: 0; right: 0; bottom: 1.25rem; justify-content: center">
    <li><a href="#">Zdjęcie 1</a></li>
    <li class="pl-active"><a href="#">Zdjęcie 2</a></li>
    <li><a href="#">Zdjęcie 3</a></li>
    <li><a href="#">Zdjęcie 4</a></li>
  </ul>
</div>
```

## Rozmiary i kolor

Modyfikatory `.pl-dotnav-small` i `.pl-dotnav-large` zmieniają rozmiar, a `.pl-dotnav-spark` barwi aktywną kropkę limonkową „iskrą".

```html example center
<ul class="pl-dotnav pl-dotnav-small">
  <li class="pl-active"><a href="#">1</a></li>
  <li><a href="#">2</a></li>
  <li><a href="#">3</a></li>
  <li><a href="#">4</a></li>
</ul>
<ul class="pl-dotnav">
  <li><a href="#">1</a></li>
  <li class="pl-active"><a href="#">2</a></li>
  <li><a href="#">3</a></li>
  <li><a href="#">4</a></li>
</ul>
<ul class="pl-dotnav pl-dotnav-large">
  <li><a href="#">1</a></li>
  <li><a href="#">2</a></li>
  <li class="pl-active"><a href="#">3</a></li>
  <li><a href="#">4</a></li>
</ul>
<ul class="pl-dotnav pl-dotnav-large pl-dotnav-spark">
  <li><a href="#">1</a></li>
  <li><a href="#">2</a></li>
  <li><a href="#">3</a></li>
  <li class="pl-active"><a href="#">4</a></li>
</ul>
```

## API

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-dotnav` | Lista kropek. |
| `.pl-dotnav-vertical` | Układ pionowy. |
| `.pl-dotnav-light` | Jasne kropki na zdjęcia i ciemne tła. |
| `.pl-dotnav-spark` | Aktywna kropka w kolorze „iskry". |
| `.pl-dotnav-small` / `.pl-dotnav-large` | Rozmiar. |
| `.pl-active` | Aktywna pozycja (na `<li>`). |

### Zmienne CSS

| Zmienna | Domyślnie | Opis |
| --- | --- | --- |
| `--pl-dotnav-size` | `0.5rem` | Średnica kropki. |
| `--pl-dotnav-active` | `1.5rem` | Długość aktywnej pigułki. |
| `--pl-dotnav-gap` | `0.5rem` | Odstęp między kropkami. |
| `--pl-dotnav-color` | `--pl-border-strong` | Kolor kropek. |
| `--pl-dotnav-color-active` | `--pl-primary` | Kolor aktywnej kropki. |
