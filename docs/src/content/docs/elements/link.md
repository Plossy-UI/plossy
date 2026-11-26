---
title: Link
description: Warianty odnośników — wyciszone, tekstowe, nagłówkowe — oraz trzy animowane linki „podpisowe" z rosnącym podkreśleniem, strzałką i limonkowym zakreślaczem.
---

## Podstawowe użycie

Zwykły element `<a>` ma kolor akcentu i cienkie podkreślenie, które wzmacnia się przy hoverze. Klasy `.pl-link-*` zmieniają ten wygląd.

```html example
<p>Zamówienia złożone do 14:00 wysyłamy tego samego dnia. Szczegóły znajdziesz w <a href="#">regulaminie dostaw</a>, a status paczki sprawdzisz w <a href="#">panelu klienta</a>.</p>
```

## Wyciszony

`.pl-link-muted` — link drugoplanowy, np. w stopce lub metadanych.

```html example row
<a class="pl-link-muted" href="#">Polityka prywatności</a>
<a class="pl-link-muted" href="#">Regulamin</a>
<a class="pl-link-muted" href="#">Kontakt</a>
```

## Tekstowy

`.pl-link-text` ma kolor zwykłego tekstu; akcent pojawia się dopiero przy hoverze.

```html example
<p>Autor: <a class="pl-link-text" href="#">Marta Wiśniewska</a> · 6 min czytania</p>
```

## Nagłówkowy

`.pl-link-heading` dziedziczy kolor i nie ma podkreślenia — do tytułów artykułów i kart.

```html example
<h3><a class="pl-link-heading" href="#">Jak zaprojektować cennik, który się nie starzeje</a></h3>
<p class="pl-text-muted">Trzy zasady, dzięki którym tabela planów zostaje czytelna także po roku rozwoju produktu.</p>
```

## Reset

`.pl-link-reset` usuwa cały wygląd linku — kolor i podkreślenie są dziedziczone.

```html example
<p>Zadzwoń: <a class="pl-link-reset" href="tel:+48221234567">+48 22 123 45 67</a> (link bez stylu)</p>
```

## Toggle

`.pl-link-toggle` na elemencie nadrzędnym sprawia, że hover całego bloku uruchamia stan hover linków `.pl-link-*` w środku. Przydatne, gdy cała karta jest odnośnikiem.

```html example
<a class="pl-link-toggle pl-flex pl-flex-middle" href="#" style="gap: 1rem; max-width: 30rem">
  <img src="/img/photo-3.svg" alt="" width="96" height="64" style="border-radius: var(--pl-radius-sm); flex: none">
  <span>
    <span class="pl-h5 pl-link-heading" style="display: block; margin: 0 0 0.2em">Przewodnik po tokenach projektowych</span>
    <span class="pl-link-arrow">Czytaj dalej</span>
  </span>
</a>
```

## Animowane podkreślenie

`.pl-link-underline` — kreska rośnie od lewej, a po zjechaniu kursorem zwija się w prawo. Klasa `.pl-active` utrzymuje podkreślenie (np. bieżąca strona).

```html example row
<a class="pl-link-underline" href="#">Realizacje</a>
<a class="pl-link-underline pl-active" href="#">Oferta</a>
<a class="pl-link-underline" href="#">Zespół</a>
<a class="pl-link-underline" href="#">Kontakt</a>
```

Działa też w tekście wielowierszowym i z dowolnym kolorem — kreska używa `currentColor`.

```html example
<h3 style="max-width: 24rem"><a class="pl-link-underline" href="#" style="--pl-link-line: 2px">Dłuższy tytuł, który łamie się na dwa wiersze i wciąż ładnie się podkreśla</a></h3>
```

## Link ze strzałką

`.pl-link-arrow` dodaje strzałkę, która sprężyście odsuwa się przy hoverze. `.pl-link-arrow-left` odwraca kierunek — do linków „wstecz".

```html example row
<a class="pl-link-arrow" href="#">Zobacz wszystkie projekty</a>
<a class="pl-link-arrow pl-link-text" href="#">Dokumentacja</a>
<a class="pl-link-arrow pl-link-arrow-left pl-link-muted" href="#">Wróć do listy</a>
```

## Zakreślacz

`.pl-link-highlight` — limonkowy marker pod tekstem, który przy hoverze zakrywa całe słowo.

```html example
<p style="font-size: var(--pl-text-lg)">Projektujemy <a class="pl-link-highlight" href="#">systemy wizualne</a>, budujemy <a class="pl-link-highlight" href="#">sklepy internetowe</a> i dbamy o to, żeby jedno pasowało do drugiego.</p>
```

## Łączenie

Warianty kolorystyczne można łączyć z animowanymi.

```html example row
<a class="pl-link-underline pl-link-muted" href="#">Wyciszony z podkreśleniem</a>
<a class="pl-link-underline" href="#" style="color: var(--pl-primary-text)">Akcent z podkreśleniem</a>
<a class="pl-link-arrow pl-link-heading pl-h5" href="#" style="margin: 0">Nagłówek ze strzałką</a>
```

## API

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-link-muted` | Wyciszony kolor, ciemnieje przy hoverze. |
| `.pl-link-text` | Kolor tekstu, akcent przy hoverze. |
| `.pl-link-heading` | Dziedziczy kolor, bez podkreślenia, akcent przy hoverze. |
| `.pl-link-reset` | Bez wyglądu linku. |
| `.pl-link-toggle` | Na rodzicu: hover rodzica uruchamia hover linków `.pl-link-*` wewnątrz. |
| `.pl-link-underline` | Podkreślenie rosnące od lewej. `.pl-active` utrzymuje je na stałe. |
| `.pl-link-arrow` | Strzałka na końcu, odsuwana przy hoverze. |
| `.pl-link-arrow-left` | Razem z `.pl-link-arrow`: strzałka wstecz, przed tekstem. |
| `.pl-link-highlight` | Limonkowy zakreślacz zakrywający tekst przy hoverze. |

### Zmienne CSS

| Zmienna | Domyślnie | Opis |
| --- | --- | --- |
| `--pl-link-line` | `1.5px` | Grubość kreski w `.pl-link-underline`. |
