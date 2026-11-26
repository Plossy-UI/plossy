---
title: Background
description: Kolory tła, pomocnicze klasy dla obrazów oraz dekoracyjne tła Plossy — kropki, siatka, zorza i ziarno.
---

## Kolory

Klasy `.pl-background-*` ustawiają kolor tła z tokenów. Tła tonów (`-primary`, `-secondary`, `-success`…) oraz `-spark` ustawiają też pasujący kolor tekstu.

```html example
<div class="pl-grid pl-grid-small pl-child-width-1-2@s pl-child-width-1-3@m">
  <div><div class="demo-bg pl-background-default pl-border">default</div></div>
  <div><div class="demo-bg pl-background-surface pl-border">surface</div></div>
  <div><div class="demo-bg pl-background-muted">muted</div></div>
  <div><div class="demo-bg pl-background-muted-strong">muted-strong</div></div>
  <div><div class="demo-bg pl-background-primary">primary</div></div>
  <div><div class="demo-bg pl-background-secondary">secondary</div></div>
  <div><div class="demo-bg pl-background-spark">spark</div></div>
  <div><div class="demo-bg pl-background-success">success</div></div>
  <div><div class="demo-bg pl-background-warning">warning</div></div>
  <div><div class="demo-bg pl-background-danger">danger</div></div>
  <div><div class="demo-bg pl-background-info">info</div></div>
  <div><div class="demo-bg pl-background-gradient">gradient</div></div>
</div>
```

```css example-css
.demo-bg {
  display: flex;
  align-items: flex-end;
  min-height: 5.5rem;
  padding: 0.75rem 1rem;
  border-radius: var(--pl-radius-md);
  font-family: var(--pl-font-mono);
  font-size: var(--pl-text-xs);
}
```

### Delikatne tony

Sufiks `-soft` daje lekko zabarwione tło — dobre pod komunikaty i wyróżnione bloki.

```html example
<div class="pl-grid pl-grid-small pl-child-width-1-2@s pl-child-width-1-4@m">
  <div><div class="demo-bg pl-background-primary-soft pl-text-primary">primary-soft</div></div>
  <div><div class="demo-bg pl-background-secondary-soft">secondary-soft</div></div>
  <div><div class="demo-bg pl-background-success-soft pl-text-success">success-soft</div></div>
  <div><div class="demo-bg pl-background-warning-soft pl-text-warning">warning-soft</div></div>
  <div><div class="demo-bg pl-background-danger-soft pl-text-danger">danger-soft</div></div>
  <div><div class="demo-bg pl-background-info-soft pl-text-info">info-soft</div></div>
  <div><div class="demo-bg pl-background-spark-soft">spark-soft</div></div>
</div>
```

## Dekoracje

Charakterystyczne tła Plossy. Wszystkie korzystają z tokenów, więc same dopasowują się do motywu i koloru akcentu.

### Kropki i siatka

`.pl-background-dots` i `.pl-background-grid` ustawiają tylko wzór, więc łączą się z klasami koloru. Rozmiar i kolor wzoru zmienisz zmiennymi `--pl-pattern-size` i `--pl-pattern-color`. Dodaj `.pl-background-fade`, aby wzór wygasał ku krawędziom.

```html example plain
<div class="pl-grid pl-grid-small pl-child-width-1-2@m">
  <div><div class="demo-deco pl-background-dots pl-background-surface pl-border"><strong>.pl-background-dots</strong></div></div>
  <div><div class="demo-deco pl-background-grid pl-background-surface pl-border"><strong>.pl-background-grid</strong></div></div>
  <div><div class="demo-deco pl-background-dots pl-background-fade pl-border"><strong>dots + fade</strong></div></div>
  <div><div class="demo-deco pl-background-grid pl-background-fade pl-border"><strong>grid + fade</strong></div></div>
  <div><div class="demo-deco pl-background-dots pl-background-primary"><strong>dots + primary</strong></div></div>
  <div><div class="demo-deco pl-background-grid pl-background-muted" style="--pl-pattern-size: 16px"><strong>grid 16px + muted</strong></div></div>
</div>
```

```css example-css
.demo-deco {
  display: grid;
  place-items: center;
  min-height: 11rem;
  padding: 1.5rem;
  border-radius: var(--pl-radius-lg);
  text-align: center;
}
```

### Zorza

`.pl-background-aurora` rysuje miękkie, rozmyte plamy koloru akcentu i iskry, które powoli dryfują. Animacja wyłącza się przy `prefers-reduced-motion`; klasa `.pl-background-aurora-static` zatrzymuje ją na stałe, a `.pl-background-aurora-strong` wzmacnia barwy.

```html example plain
<div class="pl-background-aurora pl-background-surface pl-border pl-radius-xl pl-padding-large pl-text-center">
  <p class="pl-text-eyebrow">Wiosenna edycja</p>
  <h2 class="pl-margin-small-top">Lżejszy interfejs. <span class="pl-text-gradient">Więcej światła.</span></h2>
  <p class="pl-text-lead pl-margin-auto" style="max-width: 34rem">Tło zorzy sprawdza się w sekcjach „hero", na kartach cennika i wszędzie tam, gdzie potrzeba odrobiny głębi.</p>
  <p class="pl-margin-medium-top">
    <a class="pl-button pl-button-primary" href="#">Zacznij za darmo</a>
    <a class="pl-button pl-button-ghost" href="#">Zobacz demo</a>
  </p>
</div>
```

Zorza najlepiej wygląda w parze z ciemnym tłem i klasą [`.pl-light`](/docs/utilities/inverse/):

```html example plain
<div class="pl-light pl-background-default pl-background-aurora pl-background-aurora-strong pl-background-noise pl-radius-xl pl-padding-large">
  <p class="pl-text-eyebrow">Tryb nocny</p>
  <h3 class="pl-margin-small-top">Zorza, ziarno i ciemna powierzchnia</h3>
  <p class="pl-text-muted" style="max-width: 30rem">Trzy klasy tła i jedna klasa odwrócenia kolorów — bez ani jednej linijki własnego CSS.</p>
</div>
```

| Zmienna | Domyślnie | Opis |
| --- | --- | --- |
| `--pl-aurora-strength` | `1` | Mnożnik nasycenia plam. |
| `--pl-aurora-blur` | `48px` | Rozmycie. |
| `--pl-aurora-speed` | `24s` | Czas jednego przebiegu animacji. |

### Ziarno

`.pl-background-noise` nakłada delikatną fakturę szumu (filtr SVG osadzony w CSS). Intensywność ustawia `--pl-noise-opacity`.

```html example plain
<div class="pl-grid pl-grid-small pl-child-width-1-3@m">
  <div><div class="demo-deco pl-background-noise pl-background-muted"><strong>muted + noise</strong></div></div>
  <div><div class="demo-deco pl-background-noise pl-background-primary"><strong>primary + noise</strong></div></div>
  <div><div class="demo-deco pl-background-noise pl-background-gradient" style="--pl-noise-opacity: 0.55"><strong>gradient + mocne ziarno</strong></div></div>
</div>
```

> Zorza, ziarno i `-fade` używają pseudoelementów oraz ustawiają `position: relative` i `isolation: isolate` — treść elementu zawsze pozostaje nad dekoracją.

## Obrazy w tle

Sam obraz ustaw przez `background-image`. Klasy sterują rozmiarem, powtarzaniem i położeniem.

```html example
<div class="pl-grid pl-grid-small pl-child-width-1-3@m">
  <div><div class="demo-img pl-background-cover" style="background-image: url(/img/photo-1.svg)"><span>cover</span></div></div>
  <div><div class="demo-img pl-background-contain pl-background-muted" style="background-image: url(/img/photo-2.svg)"><span>contain</span></div></div>
  <div><div class="demo-img pl-background-norepeat pl-background-top-right pl-background-muted" style="background-image: url(/img/avatar-1.svg); background-size: 4rem"><span>norepeat + top-right</span></div></div>
</div>
```

```css example-css
.demo-img {
  display: flex;
  align-items: flex-end;
  height: 11rem;
  padding: 0.75rem;
  border-radius: var(--pl-radius-md);
}
.demo-img span {
  padding: 0.2rem 0.55rem;
  border-radius: var(--pl-radius-pill);
  background: var(--pl-surface);
  color: var(--pl-text);
  font-family: var(--pl-font-mono);
  font-size: var(--pl-text-xs);
}
```

### Położenie

Dziewięć klas: `.pl-background-top-left`, `-top-center`, `-top-right`, `-center-left`, `-center-center`, `-center-right`, `-bottom-left`, `-bottom-center`, `-bottom-right`.

```html example
<div class="pl-grid pl-grid-small pl-child-width-1-3">
  <div><div class="demo-img pl-background-cover pl-background-top-left" style="background-image: url(/img/photo-3.svg); height: 6rem"><span>top-left</span></div></div>
  <div><div class="demo-img pl-background-cover pl-background-center-center" style="background-image: url(/img/photo-3.svg); height: 6rem"><span>center-center</span></div></div>
  <div><div class="demo-img pl-background-cover pl-background-bottom-right" style="background-image: url(/img/photo-3.svg); height: 6rem"><span>bottom-right</span></div></div>
</div>
```

### Tło nieruchome

`.pl-background-fixed` przypina obraz do okna (efekt paralaksy przy przewijaniu). Na urządzeniach dotykowych klasa jest wyłączana.

```html example
<div class="demo-img pl-background-cover pl-background-fixed" style="background-image: url(/img/photo-4.svg); height: 14rem"><span>fixed — przewiń stronę</span></div>
```

### Mieszanie

Klasy `.pl-background-blend-*` ustawiają `background-blend-mode` — obraz miesza się z kolorem tła elementu.

```html example
<div class="pl-grid pl-grid-small pl-child-width-1-2@s pl-child-width-1-4@m">
  <div><div class="demo-img pl-background-cover pl-background-primary pl-background-blend-multiply" style="background-image: url(/img/photo-5.svg)"><span>multiply</span></div></div>
  <div><div class="demo-img pl-background-cover pl-background-primary pl-background-blend-screen" style="background-image: url(/img/photo-5.svg)"><span>screen</span></div></div>
  <div><div class="demo-img pl-background-cover pl-background-primary pl-background-blend-overlay" style="background-image: url(/img/photo-5.svg)"><span>overlay</span></div></div>
  <div><div class="demo-img pl-background-cover pl-background-primary pl-background-blend-luminosity" style="background-image: url(/img/photo-5.svg)"><span>luminosity</span></div></div>
</div>
```

Dostępne tryby: `multiply`, `screen`, `overlay`, `darken`, `lighten`, `color-dodge`, `color-burn`, `hard-light`, `soft-light`, `difference`, `exclusion`, `hue`, `saturation`, `color`, `luminosity`.

## API

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-background-default` | Tło strony (`--pl-bg`). |
| `.pl-background-surface` | Tło powierzchni (karty). |
| `.pl-background-muted` / `-muted-strong` | Stonowane tło. |
| `.pl-background-transparent` | Przezroczyste tło. |
| `.pl-background-{ton}` | Pełny kolor tonu + kolor tekstu. |
| `.pl-background-{ton}-soft` | Delikatnie zabarwione tło. |
| `.pl-background-spark` / `-spark-soft` | Limonkowa iskra. |
| `.pl-background-gradient` | Gradient akcentu. |
| `.pl-background-dots` / `-grid` | Wzór kropek / siatki. |
| `.pl-background-fade` | Wygaszanie wzoru ku krawędziom. |
| `.pl-background-aurora` | Animowana zorza. |
| `.pl-background-aurora-strong` / `-static` | Mocniejsze barwy / bez animacji. |
| `.pl-background-noise` | Faktura ziarna. |
| `.pl-background-cover` / `-contain` | Rozmiar obrazu. |
| `.pl-background-width-1-1` / `-height-1-1` | Obraz na pełną szerokość / wysokość. |
| `.pl-background-norepeat` | Bez powtarzania. |
| `.pl-background-fixed` | Tło przypięte do okna. |
| `.pl-background-{top\|center\|bottom}-{left\|center\|right}` | Położenie obrazu. |
| `.pl-background-blend-{tryb}` | Tryb mieszania. |
