---
title: Heading
description: Duże nagłówki ekspozycyjne oraz ozdobniki — nadtytuł, linia, znacznik i podkreślenie — które nadają sekcjom wyraźną hierarchię.
---

## Rozmiary ekspozycyjne

Klasy od `.pl-heading-small` do `.pl-heading-2xlarge` nadają nagłówkom rozmiary większe niż domyślne `h1`. Skalują się płynnie z szerokością okna, mają ciasną interlinię i ujemny tracking.

```html example
<h2 class="pl-heading-small">Projektuj spokojniej</h2>
<h2 class="pl-heading-medium">Projektuj spokojniej</h2>
<h2 class="pl-heading-large">Projektuj spokojniej</h2>
<h2 class="pl-heading-xlarge">Spokojniej</h2>
<h2 class="pl-heading-2xlarge">Plossy</h2>
```

## Akcenty w tekście

Fragment nagłówka możesz wyróżnić elementem `<span>`: `.pl-heading-accent` koloruje go akcentem, `.pl-heading-mark` podkreśla limonkowym zakreślaczem, a `.pl-heading-outline` zostawia sam kontur liter.

```html example
<h2 class="pl-heading-medium">Interfejsy, które <span class="pl-heading-accent">oddychają</span></h2>
<h2 class="pl-heading-medium">Mniej szumu, <span class="pl-heading-mark">więcej treści</span></h2>
<h2 class="pl-heading-medium">Wersja <span class="pl-heading-outline">2027</span></h2>
```

## Eyebrow

`.pl-heading-eyebrow` to mały nadtytuł pisany krojem mono i wersalikami, poprzedzony limonkową iskrą. Stoi nad właściwym nagłówkiem i nazywa sekcję.

```html example
<p class="pl-heading-eyebrow">Nowość w wersji 4.2</p>
<h2 class="pl-heading-small">Wspólna praca w czasie rzeczywistym</h2>
<p>Zapraszaj współpracowników do dokumentu i obserwuj zmiany na żywo — bez odświeżania strony.</p>
```

Warianty: `.pl-heading-eyebrow-line` zamienia kropkę w krótką kreskę, `.pl-heading-eyebrow-plain` usuwa znacznik, `.pl-heading-eyebrow-primary` koloruje tekst, a `.pl-heading-eyebrow-center` wyśrodkowuje całość.

```html example
<p class="pl-heading-eyebrow pl-heading-eyebrow-line">Rozdział 03</p>
<h3>Siatka i rytm</h3>

<p class="pl-heading-eyebrow pl-heading-eyebrow-plain pl-heading-eyebrow-primary pl-margin-top">Cennik</p>
<h3>Jeden plan dla całego zespołu</h3>

<p class="pl-heading-eyebrow pl-heading-eyebrow-center pl-margin-top">Opinie klientów</p>
<h3 class="pl-text-center">Zaufało nam ponad 4000 zespołów</h3>
```

## Divider

`.pl-heading-divider` dodaje pod nagłówkiem włosową linię z krótkim akcentem, który wydłuża się po najechaniu.

```html example
<h3 class="pl-heading-divider">Ostatnie zamówienia</h3>
<p>W tym tygodniu zrealizowaliśmy 128 zamówień, o 14% więcej niż w poprzednim.</p>
```

## Bullet

`.pl-heading-bullet` stawia przed nagłówkiem pionowy znacznik w kolorze akcentu. Z `.pl-heading-bullet-spark` znacznik jest limonkowy.

```html example
<h3 class="pl-heading-bullet">Ustawienia konta</h3>
<h3 class="pl-heading-bullet pl-heading-bullet-spark">Co nowego</h3>
<h2 class="pl-heading-bullet pl-heading-small">Raport kwartalny</h2>
```

## Line

`.pl-heading-line` prowadzi od tekstu poziomą linię do krawędzi kontenera. Z `.pl-heading-line-center` linie stoją po obu stronach, z `.pl-heading-line-right` — tylko po lewej. `.pl-heading-line-dashed` zmienia linię w przerywaną.

```html example
<h4 class="pl-heading-line">Najnowsze wpisy</h4>
<h4 class="pl-heading-line pl-heading-line-center">lub kontynuuj przez e-mail</h4>
<h4 class="pl-heading-line pl-heading-line-right">Archiwum</h4>
<h4 class="pl-heading-line pl-heading-line-center pl-heading-line-dashed">Koniec listy</h4>
```

Dobrze łączy się z nadtytułem — jako lekki separator sekcji:

```html example
<p class="pl-heading-eyebrow pl-heading-eyebrow-plain pl-heading-line">Listopad 2026</p>
<p>Wydaliśmy trzy aktualizacje, w tym nowy edytor tabel i eksport do PDF.</p>
<p class="pl-heading-eyebrow pl-heading-eyebrow-plain pl-heading-line pl-margin-top">Październik 2026</p>
<p>Dodaliśmy tryb ciemny oraz skróty klawiszowe w całej aplikacji.</p>
```

## Sekcja powitalna

Ozdobniki najlepiej działają razem.

```html example
<div class="pl-text-center" style="padding: 2rem 0">
  <p class="pl-heading-eyebrow pl-heading-eyebrow-center">Biblioteka komponentów</p>
  <h1 class="pl-heading-large">Buduj szybciej,<br><span class="pl-heading-mark">wyglądaj lepiej</span></h1>
  <p class="pl-margin-top" style="max-width: 34rem; margin-inline: auto; color: var(--pl-text-muted); font-size: var(--pl-text-lg)">Ponad 80 komponentów w czystym CSS i lekkim JavaScripcie — gotowych do użycia w każdym projekcie.</p>
  <p class="pl-margin-top">
    <a class="pl-button pl-button-primary pl-button-large" href="#">Zacznij teraz <span class="pl-button-arrow" data-pl-icon="arrow-right"></span></a>
  </p>
</div>
```

## API

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-heading-small` | Rozmiar ekspozycyjny: do 2,75 rem. |
| `.pl-heading-medium` | Do 3,75 rem. |
| `.pl-heading-large` | Do 5,25 rem. |
| `.pl-heading-xlarge` | Do 7,5 rem. |
| `.pl-heading-2xlarge` | Do 11 rem. |
| `.pl-heading-accent` | Fragment w kolorze akcentu. |
| `.pl-heading-mark` | Fragment z limonkowym zakreślaczem. |
| `.pl-heading-outline` | Fragment z samym konturem liter. |
| `.pl-heading-eyebrow` | Nadtytuł (mono, wersaliki, limonkowa kropka). |
| `.pl-heading-eyebrow-line`, `-plain`, `-primary`, `-center` | Warianty nadtytułu. |
| `.pl-heading-divider` | Linia pod nagłówkiem z akcentem. |
| `.pl-heading-bullet` | Pionowy znacznik z lewej; `.pl-heading-bullet-spark` — limonkowy. |
| `.pl-heading-line` | Linia obok tekstu; `-center`, `-right`, `-dashed`. |

### Zmienne CSS

| Zmienna | Domyślnie | Opis |
| --- | --- | --- |
| `--pl-heading-accent` | `var(--pl-primary)` | Kolor akcentu w `-divider`, `-bullet` i `-eyebrow-line`. |
