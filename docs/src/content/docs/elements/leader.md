---
title: Leader
description: Kropkowany łącznik między nazwą a wartością — do kart menu, cenników i spisów treści. Czysty CSS, bez skryptu.
---

## Podstawowe użycie

Kontener `.pl-leader` układa dzieci w jednym wierszu i wypełnia wolne miejsce kropkami. Pierwszy element to opis, ostatni — wartość.

```html example narrow
<div class="pl-leader"><span>Espresso</span><span>9 zł</span></div>
<div class="pl-leader"><span>Flat white</span><span>14 zł</span></div>
<div class="pl-leader"><span>Cold brew z tonikiem</span><span>17 zł</span></div>
<div class="pl-leader"><span>Matcha latte na mleku owsianym</span><span>19 zł</span></div>
```

## Rodzaje wypełnienia

Domyślne kropki zamienisz na kreski (`.pl-leader-dashed`), ciągłą linię (`.pl-leader-line`) albo puste miejsce (`.pl-leader-blank`).

```html example narrow
<div class="pl-leader"><span>Kropki (domyślnie)</span><span>01</span></div>
<div class="pl-leader pl-leader-dashed"><span>Kreski</span><span>02</span></div>
<div class="pl-leader pl-leader-line"><span>Linia</span><span>03</span></div>
<div class="pl-leader pl-leader-blank"><span>Bez wypełnienia</span><span>04</span></div>
```

## Kolory

`.pl-leader-muted` wycisza łącznik, `.pl-leader-primary` nadaje mu kolor akcentu, a `.pl-leader-spark` — limonkowej iskry.

```html example narrow
<div class="pl-leader pl-leader-muted"><span>Wyciszony</span><span>120 zł</span></div>
<div class="pl-leader pl-leader-primary"><span>Akcent</span><span>240 zł</span></div>
<div class="pl-leader pl-leader-spark"><span>Iskra</span><span>360 zł</span></div>
```

## Duży

`.pl-leader-large` powiększa kropki i odstępy — dobrze wygląda z większym krojem.

```html example
<div style="max-width: 34rem; margin-inline: auto">
  <h3 class="pl-leader pl-leader-large"><span>Kolacja degustacyjna</span><span>280 zł</span></h3>
  <h3 class="pl-leader pl-leader-large pl-leader-primary"><span>Dobór win</span><span>140 zł</span></h3>
</div>
```

## Karta menu

Łącznik łączy się z dowolną typografią. Opis pozycji umieść pod wierszem.

```html example
<div class="pl-card" style="max-width: 30rem; margin-inline: auto">
  <div class="pl-card-header">
    <h3 class="pl-card-title">Śniadania</h3>
    <span class="pl-label pl-label-spark" style="margin-left: auto">do 12:00</span>
  </div>
  <div class="pl-card-body">
    <div class="pl-leader"><strong>Szakszuka</strong><strong>32 zł</strong></div>
    <p class="pl-card-meta">Jajka, pomidory, pieczona papryka, chleb na zakwasie</p>
    <div class="pl-leader"><strong>Owsianka nocna</strong><strong>24 zł</strong></div>
    <p class="pl-card-meta">Płatki owsiane, jogurt kokosowy, sezonowe owoce</p>
    <div class="pl-leader"><strong>Tost z awokado</strong><strong>29 zł</strong></div>
    <p class="pl-card-meta">Awokado, jajko w koszulce, chili, kolendra</p>
  </div>
</div>
```

## Spis treści

Na elemencie `<a>` cały wiersz jest klikalny, a łącznik przyjmuje kolor akcentu przy hoverze.

```html example narrow
<nav aria-label="Spis treści">
  <a class="pl-leader" href="#"><span>1. Wprowadzenie</span><span>3</span></a>
  <a class="pl-leader" href="#"><span>2. Siatka i układ</span><span>12</span></a>
  <a class="pl-leader" href="#"><span>3. Typografia</span><span>27</span></a>
  <a class="pl-leader" href="#"><span>4. Kolor i kontrast</span><span>41</span></a>
  <a class="pl-leader" href="#"><span>5. Ruch w interfejsie</span><span>58</span></a>
</nav>
```

## Podsumowanie zamówienia

Wariant `.pl-leader-blank` lub `-line` sprawdza się w podsumowaniach.

```html example narrow
<div class="pl-leader pl-leader-muted"><span>Produkty (3)</span><span>417,00 zł</span></div>
<div class="pl-leader pl-leader-muted"><span>Dostawa kurierem</span><span>14,99 zł</span></div>
<div class="pl-leader pl-leader-muted"><span>Rabat JESIEN10</span><span>−41,70 zł</span></div>
<hr>
<div class="pl-leader pl-leader-blank"><strong>Do zapłaty</strong><strong>390,29 zł</strong></div>
```

## API

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-leader` | Wiersz z łącznikiem. Pierwsze dziecko — opis, ostatnie — wartość. |
| `.pl-leader-dashed` | Kreski zamiast kropek. |
| `.pl-leader-line` | Ciągła, włosowa linia. |
| `.pl-leader-blank` | Bez widocznego wypełnienia. |
| `.pl-leader-muted` `.pl-leader-primary` `.pl-leader-spark` | Kolor łącznika. |
| `.pl-leader-large` | Większe kropki i odstępy. |

### Zmienne CSS

| Zmienna | Domyślnie | Opis |
| --- | --- | --- |
| `--pl-leader-color` | `var(--pl-border-strong)` | Kolor wypełnienia. |
| `--pl-leader-gap` | `0.6em` | Odstęp między tekstem a łącznikiem. |
| `--pl-leader-step` | `7px` | Rozstaw kropek / kresek. |
| `--pl-leader-dot` | `1px` | Promień kropki. |
