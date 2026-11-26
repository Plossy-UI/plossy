---
title: Parallax
description: Animuje położenie, skalę, obrót, przezroczystość i filtry elementu w rytm przewijania strony. Lekki, liczony raz na klatkę i wyłączany przy ograniczonym ruchu.
badge: JS
---

## Podstawowe użycie

Dodaj `data-pl-parallax` i podaj właściwości do animowania. Pojedyncza wartość to stan końcowy (początkiem jest stan spoczynkowy), dwie wartości po przecinku to początek i koniec. Postęp biegnie od chwili, gdy element pojawia się u dołu okna, do momentu, gdy znika u góry.

```html example flush
<div class="demo-parallax-stage">
  <img src="/img/photo-2.svg" alt="" data-pl-parallax="y: -70,70; scale: 1.25">
  <h3 data-pl-parallax="y: 60,-60">Przewijaj powoli</h3>
</div>
```

```css example-css
.demo-parallax-stage {
  position: relative;
  display: grid;
  place-items: center;
  height: 22rem;
  overflow: hidden;
}
.demo-parallax-stage > img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.demo-parallax-stage > h3 {
  position: relative;
  margin: 0;
  padding: 0.6rem 1.2rem;
  border-radius: var(--pl-radius-pill);
  background: var(--pl-surface);
  box-shadow: var(--pl-shadow-lg);
}
```

## Różne prędkości

Kilka elementów z innymi zakresami `y` tworzy wrażenie głębi — bliższe plany poruszają się szybciej.

```html example
<div class="pl-grid pl-child-width-1-3" style="padding: 4rem 0">
  <div><div class="pl-card" data-pl-parallax="y: 50,-50"><div class="pl-card-body">Wolno<br><small>y: 50,-50</small></div></div></div>
  <div><div class="pl-card pl-card-primary" data-pl-parallax="y: 110,-110"><div class="pl-card-body">Szybciej<br><small>y: 110,-110</small></div></div></div>
  <div><div class="pl-card" data-pl-parallax="y: -40,40"><div class="pl-card-body">Pod prąd<br><small>y: -40,40</small></div></div></div>
</div>
```

## Skala, obrót i przezroczystość

Właściwości można dowolnie łączyć. Transformacje składają się w jedną deklarację `transform`.

```html example center
<div class="pl-card" style="width: 12rem" data-pl-parallax="rotate: -8,8; scale: 0.85,1.05">
  <div class="pl-card-body">Obrót + skala</div>
</div>
<div class="pl-card" style="width: 12rem" data-pl-parallax="opacity: 0.15,1; x: -60,0; end: 60vh">
  <div class="pl-card-body">Wjazd z zanikaniem</div>
</div>
<div class="pl-card" style="width: 12rem" data-pl-parallax="blur: 8,0; scale: 1.15,1; end: 55vh">
  <div class="pl-card-body">Wyostrzenie</div>
</div>
```

## Początek i koniec

`start` i `end` przesuwają granice zakresu: liczba to piksele, `vh` — część wysokości okna, `%` — część wysokości elementu. W przykładzie wyżej `end: 60vh` kończy animację, zanim karta dotrze do górnych 60% okna, dzięki czemu przez resztę drogi jest w pełni widoczna.

## Więcej przystanków

Podaj trzy lub więcej wartości, aby ruch zmieniał kierunek po drodze — przystanki rozkładają się równomiernie.

```html example center
<span class="pl-label pl-label-solid" style="font-size: 1rem" data-pl-parallax="x: -120,120,-120; rotate: 0,180,360">Tam i z powrotem</span>
```

## Filtry

Oprócz `blur` dostępne są `grayscale`, `saturate`, `brightness` (w procentach) oraz `hue` (w stopniach).

```html example flush
<img src="/img/photo-5.svg" alt="" style="display: block; width: 100%; height: 18rem; object-fit: cover" data-pl-parallax="grayscale: 100,0; brightness: 70,100; end: 50vh">
```

## Tło

`bgx` i `bgy` przesuwają obraz tła. Komponent sam powiększa tło o zakres ruchu, więc na krawędziach nie pojawi się pusty pas.

```html example flush
<div class="demo-parallax-bg" data-pl-parallax="bgy: -140">
  <div>
    <span class="pl-label pl-label-spark">Nowość</span>
    <h3>Kolekcja jesienna</h3>
  </div>
</div>
```

```css example-css
.demo-parallax-bg {
  display: grid;
  place-items: center;
  height: 20rem;
  text-align: center;
  background: url('/img/photo-4.svg') center / cover no-repeat;
}
.demo-parallax-bg > div {
  padding: 1rem 1.5rem;
  border-radius: var(--pl-radius-lg);
  background: var(--pl-surface);
  box-shadow: var(--pl-shadow-lg);
}
.demo-parallax-bg h3 {
  margin: 0.5rem 0 0;
}
```

## Inny element odniesienia

Domyślnie postęp wyznacza położenie samego elementu. Opcja `target` wskazuje inny — np. całą sekcję (`!.selektor` to najbliższy przodek). Wszystkie elementy poniżej animują się zgodnie, bo liczą postęp względem wspólnego kontenera.

```html example
<div class="demo-parallax-group pl-flex pl-flex-center" style="gap: 1rem; padding: 3rem 0">
  <img src="/img/avatar-1.svg" alt="" width="64" height="64" style="border-radius: 50%" data-pl-parallax="target: !.demo-parallax-group; x: -80,0; opacity: 0,1; end: 60vh">
  <img src="/img/avatar-2.svg" alt="" width="64" height="64" style="border-radius: 50%" data-pl-parallax="target: !.demo-parallax-group; y: 60,0; opacity: 0,1; end: 60vh">
  <img src="/img/avatar-3.svg" alt="" width="64" height="64" style="border-radius: 50%" data-pl-parallax="target: !.demo-parallax-group; x: 80,0; opacity: 0,1; end: 60vh">
</div>
```

## Krzywa i szerokość okna

`easing` to wykładnik krzywej postępu: `1` — liniowo, wartości większe od 1 zaczynają wolno i przyspieszają, mniejsze — odwrotnie. `media` włącza efekt dopiero od podanej szerokości okna.

```html
<img src="…" alt="" data-pl-parallax="y: -120; easing: 2; media: @m">
```

Gdy użytkownik ma włączone ograniczenie ruchu (`prefers-reduced-motion`), komponent nie stosuje żadnych zmian — element pozostaje w stanie spoczynkowym.

## API

### Opcje

Każda właściwość przyjmuje `koniec`, `początek,koniec` lub dłuższą listę przystanków.

| Opcja | Jednostka | Stan spoczynkowy | Opis |
| --- | --- | --- | --- |
| `x`, `y` | px (lub `%`, `vh`, `vw`) | `0` | Przesunięcie. |
| `scale` | — | `1` | Skala. |
| `rotate` | deg | `0` | Obrót. |
| `opacity` | — | `1` | Przezroczystość. |
| `blur` | px | `0` | Rozmycie. |
| `grayscale` | % | `0` | Odcienie szarości. |
| `saturate` | % | `100` | Nasycenie. |
| `brightness` | % | `100` | Jasność. |
| `hue` | deg | `0` | Obrót barwy. |
| `bgx`, `bgy` | px | `0` | Przesunięcie obrazu tła. |

| Opcja | Typ | Domyślnie | Opis |
| --- | --- | --- | --- |
| `easing` | number | `1` | Wykładnik krzywej postępu. |
| `start` | number \| string | `0` | Przesunięcie początku zakresu (px, `vh`, `%`). |
| `end` | number \| string | `0` | Przesunięcie końca zakresu. |
| `media` | number \| string | `false` | Minimalna szerokość okna (px), breakpoint (`@m`) lub zapytanie media. |
| `target` | string | — | Element wyznaczający postęp; `!.selektor` — najbliższy przodek. |

Komponent śledzi przewijanie okna przeglądarki.
