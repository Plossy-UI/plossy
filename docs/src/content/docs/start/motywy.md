---
title: Motywy i tokeny
description: Cały wygląd Plossy opiera się na zmiennych CSS. Ciemny motyw, kolor akcentu i własna marka to kwestia kilku linijek.
order: 2
---

> Wolisz ustawić wygląd suwakami? [Kreator motywu](/kreator/) pokazuje zmiany na żywo, pilnuje kontrastu i wypisuje gotowy CSS.

## Jasny i ciemny motyw

Motyw ustawia atrybut `data-pl-theme` — zwykle na elemencie `<html>`. Wartość `auto` podąża za ustawieniami systemu.

```html
<html data-pl-theme="dark">
```

Atrybut działa też lokalnie: dowolny fragment strony może mieć własny motyw.

```html example
<div class="pl-grid pl-child-width-1-2@s">
  <div>
    <div class="pl-card" data-pl-theme="light">
      <div class="pl-card-body">
        <h3 class="pl-card-title">Jasny</h3>
        <p class="pl-card-text">Ten fragment zawsze używa jasnego motywu.</p>
        <button class="pl-button pl-button-primary" type="button">Akcja</button>
      </div>
    </div>
  </div>
  <div>
    <div class="pl-card" data-pl-theme="dark">
      <div class="pl-card-body">
        <h3 class="pl-card-title">Ciemny</h3>
        <p class="pl-card-text">A ten — zawsze ciemnego.</p>
        <button class="pl-button pl-button-primary" type="button">Akcja</button>
      </div>
    </div>
  </div>
</div>
```

## Akcent

Atrybut `data-pl-accent` wybiera jeden z gotowych akcentów: `iris` (domyślny), `moss`, `coral`, `ocean`, `plum`, `ink`. Podobnie jak motyw, działa globalnie i lokalnie.

```html example center
<button class="pl-button pl-button-primary" data-pl-accent="iris" type="button">Iris</button>
<button class="pl-button pl-button-primary" data-pl-accent="moss" type="button">Moss</button>
<button class="pl-button pl-button-primary" data-pl-accent="coral" type="button">Coral</button>
<button class="pl-button pl-button-primary" data-pl-accent="ocean" type="button">Ocean</button>
<button class="pl-button pl-button-primary" data-pl-accent="plum" type="button">Plum</button>
<button class="pl-button pl-button-primary" data-pl-accent="ink" type="button">Ink</button>
```

### Własny akcent

Akcent jest parametryczny — opisują go trzy liczby w przestrzeni OKLCH: jasność, nasycenie i odcień. Wszystkie pochodne (hover, tła „soft", ramki, pierścień fokusu) przeliczają się same, także w ciemnym motywie.

```css
:root {
  --pl-accent-l: 0.58; /* jasność 0–1 */
  --pl-accent-c: 0.18; /* nasycenie */
  --pl-accent-h: 15;   /* odcień 0–360 */
}
```

## Kolory

Każdy ton ma komplet tokenów: `--pl-{ton}` (pełny), `--pl-on-{ton}` (tekst na pełnym tle), `--pl-{ton}-soft` (delikatne tło), `--pl-{ton}-border` i `--pl-{ton}-text` (czytelny, zabarwiony tekst).

```html example
<div class="pl-grid pl-grid-small pl-child-width-1-3 pl-child-width-1-6@m">
  <div><div class="docs-swatch" style="background: var(--pl-primary); color: var(--pl-on-primary)">primary</div></div>
  <div><div class="docs-swatch" style="background: var(--pl-secondary); color: var(--pl-on-secondary)">secondary</div></div>
  <div><div class="docs-swatch" style="background: var(--pl-success); color: var(--pl-on-success)">success</div></div>
  <div><div class="docs-swatch" style="background: var(--pl-warning); color: var(--pl-on-warning)">warning</div></div>
  <div><div class="docs-swatch" style="background: var(--pl-danger); color: var(--pl-on-danger)">danger</div></div>
  <div><div class="docs-swatch" style="background: var(--pl-info); color: var(--pl-on-info)">info</div></div>
  <div><div class="docs-swatch" style="background: var(--pl-primary-soft); color: var(--pl-primary-text)">soft</div></div>
  <div><div class="docs-swatch" style="background: var(--pl-secondary-soft); color: var(--pl-secondary-text)">soft</div></div>
  <div><div class="docs-swatch" style="background: var(--pl-success-soft); color: var(--pl-success-text)">soft</div></div>
  <div><div class="docs-swatch" style="background: var(--pl-warning-soft); color: var(--pl-warning-text)">soft</div></div>
  <div><div class="docs-swatch" style="background: var(--pl-danger-soft); color: var(--pl-danger-text)">soft</div></div>
  <div><div class="docs-swatch" style="background: var(--pl-info-soft); color: var(--pl-info-text)">soft</div></div>
</div>
```

```css example-css
.docs-swatch {
  display: grid;
  place-items: end start;
  height: 4.5rem;
  padding: 0.5rem 0.7rem;
  border-radius: var(--pl-radius-md);
  font-family: var(--pl-font-mono);
  font-size: 0.6875rem;
}
```

### Neutralne

| Token | Zastosowanie |
| --- | --- |
| `--pl-bg` | Tło strony. |
| `--pl-surface` | Tło kart i kontrolek. |
| `--pl-surface-raised` | Tło elementów pływających (menu, popover). |
| `--pl-muted`, `--pl-muted-strong` | Delikatne wypełnienia. |
| `--pl-border`, `--pl-border-strong` | Ramki. |
| `--pl-text`, `--pl-text-muted`, `--pl-text-subtle` | Tekst: główny, drugorzędny, pomocniczy. |
| `--pl-ink`, `--pl-on-ink` | Odwrócona powierzchnia (tooltipy, ciemne sekcje). |
| `--pl-spark`, `--pl-on-spark` | Limonkowa „iskra" — drobne wyróżnienia. |

## Kształt, cień, ruch

| Token | Wartość | Opis |
| --- | --- | --- |
| `--pl-radius-xs … -xl`, `-pill` | 6 / 8 / 12 / 18 / 28 px | Promienie zaokrągleń. |
| `--pl-shadow-xs … -xl` | | Miękkie, warstwowe cienie. |
| `--pl-space-1 … -9` | 0.25 – 6 rem | Skala odstępów. |
| `--pl-control-h`, `-sm`, `-lg` | 2.5 / 2 / 3 rem | Wysokość kontrolek. |
| `--pl-dur-1 … -4` | 120 / 200 / 320 / 520 ms | Czasy animacji. |
| `--pl-ease` | | Płynne wyhamowanie — kolory, cienie. |
| `--pl-ease-spring` | | Sprężyna z lekkim przestrzeleniem — przesunięcia i skala. |

Przy włączonym w systemie ograniczeniu ruchu (`prefers-reduced-motion`) czasy animacji są automatycznie skracane do zera.

## Typografia

```css
:root {
  --pl-font-sans: 'Inter', system-ui, sans-serif;
  --pl-font-display: 'Fraunces', serif;
  --pl-font-mono: 'JetBrains Mono', monospace;
}
```
