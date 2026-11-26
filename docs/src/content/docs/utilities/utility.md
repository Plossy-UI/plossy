---
title: Utility
description: Zbiór drobnych narzędzi — panele, floaty, overflow, dopasowanie obrazów, zaokrąglenia, ramki, cienie, efekt szkła i inne.
---

## Szkło

`.pl-glass` to półprzezroczysta, „oszroniona" powierzchnia: rozmywa i lekko nasyca to, co znajduje się pod nią. Sprawdza się na paskach nawigacji, kartach nad zdjęciem i panelach pływających. Warianty `.pl-glass-subtle` i `.pl-glass-strong` zmieniają krycie i siłę rozmycia.

```html example flush
<div class="pl-background-cover pl-padding-large" style="background-image: url(/img/photo-6.svg)">
  <div class="pl-grid pl-grid-small pl-child-width-1-3@m">
    <div>
      <div class="pl-glass pl-glass-subtle pl-radius-lg pl-padding-small">
        <p class="pl-text-eyebrow">.pl-glass-subtle</p>
        <strong>18°C · Zakopane</strong>
        <p class="pl-text-meta pl-margin-remove">Słonecznie, wiatr 6 km/h</p>
      </div>
    </div>
    <div>
      <div class="pl-glass pl-radius-lg pl-padding-small">
        <p class="pl-text-eyebrow">.pl-glass</p>
        <strong>21°C · Kraków</strong>
        <p class="pl-text-meta pl-margin-remove">Lekkie zachmurzenie</p>
      </div>
    </div>
    <div>
      <div class="pl-glass pl-glass-strong pl-radius-lg pl-padding-small">
        <p class="pl-text-eyebrow">.pl-glass-strong</p>
        <strong>16°C · Gdańsk</strong>
        <p class="pl-text-meta pl-margin-remove">Przelotny deszcz</p>
      </div>
    </div>
  </div>
</div>
```

Krycie i rozmycie dostroisz zmiennymi `--pl-glass-opacity` (domyślnie `58%`) i `--pl-glass-blur` (`18px`). W przeglądarkach bez `backdrop-filter` powierzchnia staje się niemal kryjąca, więc tekst pozostaje czytelny.

## Cienie

Cztery poziomy miękkiego, warstwowego cienia: `.pl-box-shadow-small`, `-medium`, `-large`, `-xlarge`.

```html example
<div class="pl-grid pl-child-width-1-2@s pl-child-width-1-4@m pl-text-center">
  <div><div class="pl-box-shadow-small pl-background-surface pl-radius-lg pl-padding-small">small</div></div>
  <div><div class="pl-box-shadow-medium pl-background-surface pl-radius-lg pl-padding-small">medium</div></div>
  <div><div class="pl-box-shadow-large pl-background-surface pl-radius-lg pl-padding-small">large</div></div>
  <div><div class="pl-box-shadow-xlarge pl-background-surface pl-radius-lg pl-padding-small">xlarge</div></div>
</div>
```

### Cień po najechaniu

Klasy `.pl-box-shadow-hover-*` zmieniają cień przy hoverze — przejście jest płynne. Połącz je z `.pl-hover-lift`, aby element dodatkowo sprężyście się unosił.

```html example
<div class="pl-grid pl-child-width-1-3@m pl-text-center">
  <div><div class="pl-box-shadow-hover-medium pl-background-surface pl-border pl-radius-lg pl-padding-small">hover-medium</div></div>
  <div><div class="pl-box-shadow-small pl-box-shadow-hover-large pl-background-surface pl-radius-lg pl-padding-small">small → hover-large</div></div>
  <div><div class="pl-box-shadow-small pl-box-shadow-hover-xlarge pl-hover-lift pl-background-surface pl-radius-lg pl-padding-small">hover-xlarge + lift</div></div>
</div>
```

### Cień pod elementem

`.pl-box-shadow-bottom` rysuje rozmytą elipsę pod elementem — obraz wygląda, jakby unosił się nad stroną.

```html example center
<div class="pl-box-shadow-bottom">
  <img class="pl-radius-lg" src="/img/photo-7.svg" width="360" height="240" alt="Pustynny krajobraz">
</div>
```

## Zaokrąglenia

```html example row
<img class="pl-border-rounded" src="/img/photo-1.svg" width="150" height="100" alt="">
<img class="pl-border-circle pl-object-cover" src="/img/photo-2.svg" width="100" height="100" alt="">
<img class="pl-border-pill" src="/img/photo-3.svg" width="150" height="100" alt="">
```

Klasy `.pl-radius-*` odpowiadają tokenom `--pl-radius-*`.

```html example row
<div class="demo-r pl-radius-none">none</div>
<div class="demo-r pl-radius-xs">xs</div>
<div class="demo-r pl-radius-sm">sm</div>
<div class="demo-r pl-radius-md">md</div>
<div class="demo-r pl-radius-lg">lg</div>
<div class="demo-r pl-radius-xl">xl</div>
```

```css example-css
.demo-r {
  display: grid;
  place-items: center;
  width: 5.5rem;
  height: 5.5rem;
  border: 1px solid var(--pl-primary-border);
  background: var(--pl-primary-soft);
  color: var(--pl-primary-text);
  font-family: var(--pl-font-mono);
  font-size: var(--pl-text-xs);
}
```

## Ramki

`.pl-border` dodaje włosową ramkę; `-top`, `-bottom`, `-left`, `-right` — tylko z jednej strony. Modyfikatory `.pl-border-strong`, `.pl-border-dashed` i `.pl-border-{ton}` zmieniają jej wygląd.

```html example
<div class="pl-grid pl-grid-small pl-child-width-1-2@s pl-child-width-1-4@m pl-text-center">
  <div><div class="pl-border pl-padding-small pl-radius-md">.pl-border</div></div>
  <div><div class="pl-border pl-border-strong pl-padding-small pl-radius-md">-strong</div></div>
  <div><div class="pl-border pl-border-dashed pl-border-strong pl-padding-small pl-radius-md">-dashed</div></div>
  <div><div class="pl-border pl-border-primary pl-padding-small pl-radius-md">-primary</div></div>
  <div><div class="pl-border-top pl-padding-small">-top</div></div>
  <div><div class="pl-border-bottom pl-padding-small">-bottom</div></div>
  <div><div class="pl-border-left pl-padding-small">-left</div></div>
  <div><div class="pl-border-right pl-padding-small">-right</div></div>
</div>
```

## Panel

`.pl-panel` to neutralny kontener: tworzy kontekst pozycjonowania, obejmuje floaty i usuwa dolny margines ostatniego dziecka. `.pl-panel-scrollable` daje przewijane pole o stałej wysokości, które użytkownik może rozciągnąć.

```html example
<div class="pl-panel-scrollable">
  <p><strong>§1.</strong> Regulamin określa zasady korzystania z serwisu oraz prawa i obowiązki użytkowników.</p>
  <p><strong>§2.</strong> Konto zakłada się bezpłatnie. Użytkownik odpowiada za poufność swojego hasła.</p>
  <p><strong>§3.</strong> Płatności za plany płatne pobierane są z góry za każdy okres rozliczeniowy.</p>
  <p><strong>§4.</strong> Subskrypcję można anulować w dowolnym momencie w ustawieniach konta.</p>
  <p><strong>§5.</strong> Reklamacje rozpatrujemy w ciągu 14 dni od daty zgłoszenia.</p>
  <p><strong>§6.</strong> W sprawach nieuregulowanych stosuje się przepisy prawa polskiego.</p>
</div>
```

## Floaty i clearfix

`.pl-float-left` i `.pl-float-right` ustawiają opływanie, `.pl-clearfix` na kontenerze obejmuje pływające dzieci.

```html example
<div class="pl-clearfix pl-background-muted pl-padding-small pl-radius-md">
  <span class="pl-float-left pl-label">.pl-float-left</span>
  <span class="pl-float-right pl-label">.pl-float-right</span>
</div>
```

## Overflow i resize

```html example
<div class="pl-grid pl-grid-small pl-child-width-1-2@m">
  <div>
    <p class="pl-text-eyebrow">.pl-overflow-auto</p>
    <div class="pl-overflow-auto pl-border pl-radius-md pl-padding-small" style="height: 7rem">
      <p style="width: 34rem">Szeroka treść przewija się wewnątrz kontenera w obu kierunkach, zamiast rozpychać układ strony. To przydatne dla tabel i bloków kodu.</p>
      <p style="width: 34rem">Drugi akapit zapewnia przewijanie w pionie.</p>
    </div>
  </div>
  <div>
    <p class="pl-text-eyebrow">.pl-resize-vertical</p>
    <div class="pl-resize-vertical pl-border pl-radius-md pl-padding-small" style="height: 7rem">
      Złap za prawy dolny róg i przeciągnij, aby zmienić wysokość pola.
    </div>
  </div>
</div>
```

Dostępne są też `.pl-overflow-hidden`, `.pl-overflow-visible`, `.pl-overflow-x-auto`, `.pl-resize` i `.pl-resize-horizontal`.

## Display

```html example
<span class="pl-display-block pl-background-muted pl-padding-xsmall pl-radius-sm">span z .pl-display-block</span>
<div class="pl-margin-small-top">
  <div class="pl-display-inline-block pl-background-muted pl-padding-xsmall pl-radius-sm">div z .pl-display-inline-block</div>
  <div class="pl-display-inline-block pl-background-muted pl-padding-xsmall pl-radius-sm">drugi obok</div>
</div>
```

### Kontener inline

`.pl-inline` to blok liniowy z `position: relative` — obejmuje obraz dokładnie po jego krawędziach, więc łatwo położyć na nim znaczek lub nakładkę.

```html example
<div class="pl-inline">
  <img class="pl-radius-lg" src="/img/photo-8.svg" width="320" height="213" alt="Zdjęcie produktu">
  <span class="pl-label" style="position: absolute; top: 0.75rem; left: 0.75rem">Nowość</span>
</div>
```

## Dopasowanie obrazów

Klasy `.pl-object-*` ustawiają `object-fit`, a `.pl-object-position-*` — punkt zaczepienia. Proporcje nadają klasy `.pl-ratio-*` opisane na stronie [Image](/docs/elements/image/).

```html example
<div class="pl-grid pl-grid-small pl-child-width-1-2@s pl-child-width-1-4@m">
  <div><img class="demo-o pl-object-cover" src="/img/photo-1.svg" alt=""><p class="pl-text-meta pl-margin-small-top">cover</p></div>
  <div><img class="demo-o pl-object-contain" src="/img/photo-1.svg" alt=""><p class="pl-text-meta pl-margin-small-top">contain</p></div>
  <div><img class="demo-o pl-object-cover pl-object-position-top-left" src="/img/photo-1.svg" alt=""><p class="pl-text-meta pl-margin-small-top">cover + top-left</p></div>
  <div><img class="demo-o pl-object-cover pl-ratio-16-9" style="height: auto" src="/img/photo-1.svg" alt=""><p class="pl-text-meta pl-margin-small-top">cover + ratio-16-9</p></div>
</div>
```

```css example-css
.demo-o {
  width: 100%;
  height: 9rem;
  border-radius: var(--pl-radius-md);
  background: var(--pl-muted);
}
```

### Responsywne media

`.pl-responsive-width` ogranicza szerokość do kontenera z zachowaniem proporcji; `.pl-responsive-height` robi to samo względem wysokości.

```html example
<div class="pl-border pl-radius-md pl-padding-small" style="height: 9rem">
  <img class="pl-responsive-height pl-radius-sm" src="/img/photo-2.svg" width="1200" height="800" alt="">
</div>
```

## Inicjał

`.pl-dropcap` powiększa pierwszą literę akapitu.

```html example
<p class="pl-dropcap">Dawno temu, zanim na dobre zadomowiły się u nas biblioteki komponentów, każdy przycisk rysowano od zera. Dziś zestaw gotowych, dopracowanych elementów pozwala skupić się na tym, co naprawdę odróżnia produkt od konkurencji — na treści i na doświadczeniu użytkownika.</p>
```

## Logo

`.pl-logo` nadaje nazwie marki krój nagłówkowy i wyrównuje ją z obrazem. Opcjonalny `.pl-logo-mark` to mały znaczek w kolorze iskry.

```html example row
<a class="pl-logo" href="#"><span class="pl-logo-mark"></span>Nordwind</a>
<a class="pl-logo" href="#"><img src="/img/avatar-4.svg" class="pl-border-circle" alt="">Studio Fala</a>
```

## Stany i kursory

`.pl-disabled` wyszarza element i wyłącza jego interakcje. `.pl-drag` oznacza element w trakcie przeciągania.

```html example row
<a class="pl-button pl-disabled" href="#" aria-disabled="true" tabindex="-1">.pl-disabled</a>
<span class="pl-label pl-cursor-pointer">pointer</span>
<span class="pl-label pl-cursor-grab">grab</span>
<span class="pl-label pl-cursor-help">help</span>
<span class="pl-label pl-cursor-not-allowed">not-allowed</span>
<span class="pl-label pl-cursor-zoom-in">zoom-in</span>
<span class="pl-label pl-user-select-none">user-select-none</span>
```

## Mieszanie

Klasy `.pl-blend-*` ustawiają `mix-blend-mode` elementu względem tła.

```html example
<div class="pl-grid pl-grid-small pl-child-width-1-3@m">
  <div><div class="pl-inline"><img class="pl-radius-md" src="/img/photo-3.svg" alt=""><div class="demo-blend pl-blend-multiply">multiply</div></div></div>
  <div><div class="pl-inline"><img class="pl-radius-md" src="/img/photo-3.svg" alt=""><div class="demo-blend pl-blend-overlay">overlay</div></div></div>
  <div><div class="pl-inline"><img class="pl-radius-md" src="/img/photo-3.svg" alt=""><div class="demo-blend pl-blend-difference">difference</div></div></div>
</div>
```

```css example-css
.demo-blend {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  border-radius: var(--pl-radius-md);
  background: var(--pl-primary);
  color: var(--pl-on-primary);
  font-family: var(--pl-font-mono);
  font-size: var(--pl-text-sm);
}
```

## Dostępność

`.pl-visually-hidden` ukrywa element wizualnie, pozostawiając go dla czytników ekranu. `.pl-visually-hidden-focusable` pokazuje go po otrzymaniu fokusu — to gotowy link „Przejdź do treści".

```html example
<button class="pl-button pl-button-icon" type="button">
  <span data-pl-icon="search"></span>
  <span class="pl-visually-hidden">Szukaj</span>
</button>
<a class="pl-visually-hidden-focusable pl-button pl-button-primary pl-margin-small-left" href="#">Przejdź do treści (widoczne po Tab)</a>
```

## API

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-glass` (+ `-subtle`, `-strong`) | Powierzchnia szklana. |
| `.pl-box-shadow-{small\|medium\|large\|xlarge}` | Cień. |
| `.pl-box-shadow-hover-{…}` | Cień po najechaniu. |
| `.pl-box-shadow-bottom` | Rozmyty cień pod elementem. |
| `.pl-box-shadow-remove` | Usuwa cień. |
| `.pl-hover-lift` | Sprężyste uniesienie przy hoverze. |
| `.pl-border-rounded` / `-circle` / `-pill` | Zaokrąglenie. |
| `.pl-radius-{none\|xs\|sm\|md\|lg\|xl}` | Promień z tokenów. |
| `.pl-border` (+ `-top`, `-bottom`, `-left`, `-right`) | Ramka. |
| `.pl-border-strong` / `-dashed` / `-remove` / `-{ton}` | Modyfikatory ramki. |
| `.pl-panel` / `.pl-panel-scrollable` | Kontener / pole przewijane. |
| `.pl-clearfix` | Obejmuje pływające dzieci. |
| `.pl-float-left` / `-right` / `-none` | Opływanie. |
| `.pl-overflow-hidden` / `-auto` / `-visible` / `-x-auto` | Overflow. |
| `.pl-resize` / `-vertical` / `-horizontal` | Zmiana rozmiaru przez użytkownika. |
| `.pl-display-block` / `-inline` / `-inline-block` / `-contents` | Display. |
| `.pl-inline` | Kontener liniowy z pozycjonowaniem. |
| `.pl-object-{cover\|contain\|fill\|none\|scale-down}` | `object-fit`. |
| `.pl-object-position-{…}` | `object-position` (9 punktów). |
| `.pl-responsive-width` / `-height` | Responsywne media. |
| `.pl-dropcap` | Inicjał. |
| `.pl-logo` / `.pl-logo-mark` | Logo. |
| `.pl-disabled` | Stan wyłączony. |
| `.pl-drag` | Element w trakcie przeciągania. |
| `.pl-cursor-{pointer\|default\|grab\|help\|not-allowed\|zoom-in}` | Kursor. |
| `.pl-user-select-none` / `-all`, `.pl-pointer-events-none` | Zaznaczanie i zdarzenia wskaźnika. |
| `.pl-blend-{tryb}` | `mix-blend-mode`. |
| `.pl-transform-center`, `.pl-transform-origin-{…}` | Transformacje. |
| `.pl-visually-hidden` / `-focusable` | Ukrycie dostępne dla czytników. |
| `.pl-preserve-color` | Przywraca kolory motywu w zakresie [`.pl-light` / `.pl-dark`](/docs/utilities/inverse/). |
