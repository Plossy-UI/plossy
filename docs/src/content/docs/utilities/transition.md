---
title: Transition
description: Płynne przejścia odsłaniane po najechaniu na kontener — zanikanie, skalowanie i przesunięcia. Działają też z fokusem klawiatury i klasą .pl-active.
---

## Podstawowe użycie

Kontenerowi nadaj klasę `.pl-transition-toggle`, a elementowi w środku — jedną z klas `.pl-transition-*`. Element jest ukryty i pojawia się, gdy kursor znajdzie się nad kontenerem albo fokus trafi do jego wnętrza. Dodaj `tabindex="0"`, aby kontener był dostępny z klawiatury.

```html example center
<div class="pl-transition-toggle demo-tr" tabindex="0">
  <img src="/img/photo-1.svg" alt="Górski krajobraz">
  <div class="pl-transition-fade demo-tr-cover">
    <span class="pl-button pl-button-small">Zobacz zdjęcie</span>
  </div>
</div>
```

```css example-css
.demo-tr {
  position: relative;
  display: block;
  max-width: 22rem;
  border-radius: var(--pl-radius-lg);
  overflow: hidden;
}
.demo-tr img {
  display: block;
  width: 100%;
}
.demo-tr-cover {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  background: var(--pl-overlay);
}
.demo-tr-caption {
  position: absolute;
  padding: 0.6rem 0.9rem;
  background: var(--pl-surface);
  color: var(--pl-text);
  font-size: var(--pl-text-sm);
  font-weight: 540;
}
.demo-tr-caption.is-bottom { inset: auto 0 0 0; }
.demo-tr-caption.is-top { inset: 0 0 auto 0; }
.demo-tr-caption.is-left { inset: 0 auto 0 0; display: grid; place-items: center; }
.demo-tr-caption.is-right { inset: 0 0 0 auto; display: grid; place-items: center; }
.demo-tr-chip {
  position: absolute;
  inset: auto auto 0.75rem 0.75rem;
  padding: 0.35rem 0.75rem;
  border-radius: var(--pl-radius-pill);
  background: var(--pl-surface);
  box-shadow: var(--pl-shadow-md);
  color: var(--pl-text);
  font-size: var(--pl-text-sm);
  font-weight: 540;
}
```

## Skalowanie

`.pl-transition-scale-up` powiększa element, `.pl-transition-scale-down` zaczyna od powiększenia i wraca do naturalnego rozmiaru. W parze z `.pl-transition-opaque` element pozostaje widoczny przez cały czas — animuje się tylko skala. To klasyczny efekt „zoomu" zdjęcia.

```html example
<div class="pl-grid pl-grid-small pl-child-width-1-2@s">
  <div>
    <div class="pl-transition-toggle demo-tr" tabindex="0">
      <img class="pl-transition-scale-up pl-transition-opaque" src="/img/photo-2.svg" alt="Jezioro">
    </div>
    <p class="pl-text-meta pl-margin-small-top">scale-up + opaque</p>
  </div>
  <div>
    <div class="pl-transition-toggle demo-tr" tabindex="0">
      <img class="pl-transition-scale-down pl-transition-opaque" src="/img/photo-3.svg" alt="Las">
    </div>
    <p class="pl-text-meta pl-margin-small-top">scale-down + opaque</p>
  </div>
</div>
```

## Przesunięcia

Klasy `.pl-transition-slide-top`, `-bottom`, `-left`, `-right` wsuwają element z danej krawędzi — o cały jego rozmiar. Nazwa oznacza stronę, **z której** element przychodzi.

```html example
<div class="pl-grid pl-grid-small pl-child-width-1-2@s pl-child-width-1-4@m">
  <div><div class="pl-transition-toggle demo-tr" tabindex="0"><img src="/img/photo-4.svg" alt=""><div class="pl-transition-slide-top demo-tr-caption is-top">slide-top</div></div></div>
  <div><div class="pl-transition-toggle demo-tr" tabindex="0"><img src="/img/photo-5.svg" alt=""><div class="pl-transition-slide-bottom demo-tr-caption is-bottom">slide-bottom</div></div></div>
  <div><div class="pl-transition-toggle demo-tr" tabindex="0"><img src="/img/photo-6.svg" alt=""><div class="pl-transition-slide-left demo-tr-caption is-left">slide-left</div></div></div>
  <div><div class="pl-transition-toggle demo-tr" tabindex="0"><img src="/img/photo-7.svg" alt=""><div class="pl-transition-slide-right demo-tr-caption is-right">slide-right</div></div></div>
</div>
```

### Małe i średnie

Warianty `-small` (0.5rem) i `-medium` (3rem) przesuwają element o stały, krótszy dystans — dobre dla etykiet i przycisków na zdjęciu.

```html example
<div class="pl-grid pl-grid-small pl-child-width-1-2@s pl-child-width-1-4@m">
  <div><div class="pl-transition-toggle demo-tr" tabindex="0"><img src="/img/photo-8.svg" alt=""><div class="pl-transition-slide-bottom-small demo-tr-chip">bottom-small</div></div></div>
  <div><div class="pl-transition-toggle demo-tr" tabindex="0"><img src="/img/photo-1.svg" alt=""><div class="pl-transition-slide-bottom-medium demo-tr-chip">bottom-medium</div></div></div>
  <div><div class="pl-transition-toggle demo-tr" tabindex="0"><img src="/img/photo-2.svg" alt=""><div class="pl-transition-slide-left-small demo-tr-chip">left-small</div></div></div>
  <div><div class="pl-transition-toggle demo-tr" tabindex="0"><img src="/img/photo-3.svg" alt=""><div class="pl-transition-slide-right-medium demo-tr-chip">right-medium</div></div></div>
</div>
```

## Łączenie przejść

W jednym kontenerze może działać wiele przejść naraz. `.pl-transition-delay-1` … `-5` opóźniają kolejne elementy o 60 ms, a `.pl-transition-blur` wyostrza rozmyty element. Podpis ma klasę [`.pl-light`](/docs/utilities/inverse/), więc jest jasny w obu motywach.

```html example center
<a class="pl-transition-toggle demo-tr" href="#">
  <img class="pl-transition-scale-up pl-transition-opaque" src="/img/photo-5.svg" alt="Wybrzeże">
  <div class="pl-transition-fade demo-tr-cover"></div>
  <div class="demo-tr-stack pl-light">
    <span class="pl-transition-slide-bottom-small pl-text-eyebrow">Podróże</span>
    <strong class="pl-transition-slide-bottom-small pl-transition-delay-1 pl-text-large">Tydzień na wybrzeżu Algarve</strong>
    <span class="pl-transition-slide-bottom-small pl-transition-delay-2 pl-text-small">Czytaj reportaż →</span>
  </div>
</a>
```

```css example-css
.demo-tr-stack {
  position: absolute;
  inset: auto 0 0 0;
  display: grid;
  gap: 0.2rem;
  padding: 1rem 1.1rem;
}
.demo-tr-stack .pl-text-eyebrow {
  color: var(--pl-spark);
}
```

## Wolniejsze przejście

`.pl-transition-slow` wydłuża czas przejścia. Dokładną wartość ustawisz zmienną `--pl-transition-duration`.

```html example
<div class="pl-grid pl-grid-small pl-child-width-1-2@s">
  <div>
    <div class="pl-transition-toggle demo-tr" tabindex="0">
      <img class="pl-transition-scale-up pl-transition-opaque" src="/img/photo-6.svg" alt="">
    </div>
    <p class="pl-text-meta pl-margin-small-top">domyślne tempo</p>
  </div>
  <div>
    <div class="pl-transition-toggle demo-tr" tabindex="0">
      <img class="pl-transition-scale-up pl-transition-opaque pl-transition-slow" src="/img/photo-6.svg" alt="">
    </div>
    <p class="pl-text-meta pl-margin-small-top">.pl-transition-slow</p>
  </div>
</div>
```

## Sterowanie klasą .pl-active

Przejście uruchamia też klasa `.pl-active` na kontenerze `.pl-transition-toggle` albo na dowolnym przodku z klasą `.pl-transition-active` (tak robią to np. slajdy pokazu). Dzięki temu efekt można wyzwolić z JavaScriptu.

```html example center
<div class="pl-transition-toggle demo-tr" id="demo-tr-active">
  <img src="/img/photo-7.svg" alt="Pustynia">
  <div class="pl-transition-slide-bottom demo-tr-caption is-bottom">Sahara, Maroko — 2024</div>
</div>
<button class="pl-button" type="button" data-pl-toggle="target: #demo-tr-active; cls: pl-active">Przełącz podpis</button>
```

## API

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-transition-toggle` | Kontener wyzwalający (hover, `:focus-within`, `.pl-active`). |
| `.pl-transition-active` | Przodek, którego `.pl-active` uruchamia przejścia. |
| `.pl-transition-fade` | Zanikanie. |
| `.pl-transition-scale-up` / `-scale-down` | Skalowanie. |
| `.pl-transition-slide-{top\|bottom\|left\|right}` | Wsunięcie o 100% z danej strony. |
| `…-small` / `…-medium` | Wsunięcie o 0.5rem / 3rem. |
| `.pl-transition-blur` | Wyostrzenie rozmytego elementu. |
| `.pl-transition-opaque` | Element stale widoczny (bez zanikania). |
| `.pl-transition-slow` | Wolniejsze przejście. |
| `.pl-transition-delay-{1…5}` | Opóźnienie 60–300 ms. |

### Zmienne

| Zmienna | Domyślnie | Opis |
| --- | --- | --- |
| `--pl-transition-duration` | `var(--pl-dur-3)` (320 ms) | Czas przejścia. |
