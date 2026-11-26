---
title: Overlay
description: Panel treści nakładany na obraz — półprzezroczysty, gradientowy lub w kolorze akcentu. Pozycję ustawiają klasy pl-position-*, a animację wejścia pl-transition-*.
---

## Podstawowe użycie

Umieść obraz i element `.pl-overlay` we wspólnym kontenerze `.pl-inline` (lub innym z `position: relative`). Klasa `.pl-position-bottom` przykleja panel do dolnej krawędzi, a `.pl-overlay-default` nadaje mu tło „szyby".

```html example center
<div class="pl-inline pl-overflow-hidden pl-border-rounded" style="max-width: 30rem">
  <img src="/img/photo-1.svg" alt="" width="1200" height="800">
  <div class="pl-overlay pl-overlay-default pl-position-bottom">
    <p>Domyślna nakładka przyklejona do dolnej krawędzi zdjęcia.</p>
  </div>
</div>
```

## Tła

Dostępne warianty: `.pl-overlay-default` (powierzchnia z rozmyciem), `.pl-overlay-primary` (akcent), `.pl-overlay-dark` (przyciemnienie) oraz gradienty. Sam `.pl-overlay` bez wariantu to tylko odstęp wewnętrzny.

```html example
<div class="pl-grid pl-child-width-1-3@m">
  <div>
    <div class="pl-inline pl-overflow-hidden pl-border-rounded">
      <img src="/img/photo-3.svg" alt="" width="1200" height="800">
      <div class="pl-overlay pl-overlay-default pl-position-bottom">
        <p><strong>Default</strong><br>Jasna szyba z rozmyciem tła.</p>
      </div>
    </div>
  </div>
  <div>
    <div class="pl-inline pl-overflow-hidden pl-border-rounded">
      <img src="/img/photo-3.svg" alt="" width="1200" height="800">
      <div class="pl-overlay pl-overlay-primary pl-position-bottom">
        <p><strong>Primary</strong><br>Półprzezroczysty akcent.</p>
      </div>
    </div>
  </div>
  <div>
    <div class="pl-inline pl-overflow-hidden pl-border-rounded">
      <img src="/img/photo-3.svg" alt="" width="1200" height="800">
      <div class="pl-overlay pl-overlay-dark pl-position-bottom">
        <p><strong>Dark</strong><br>Ciemne przyciemnienie.</p>
      </div>
    </div>
  </div>
</div>
```

## Gradienty

`.pl-overlay-gradient` to ciemny gradient od dołu — tekst pozostaje czytelny, a zdjęcie widoczne. `.pl-overlay-gradient-top` odwraca kierunek, `.pl-overlay-gradient-primary` używa koloru akcentu.

```html example
<div class="pl-grid pl-child-width-1-3@m">
  <div>
    <div class="pl-inline pl-overflow-hidden pl-border-rounded">
      <img src="/img/photo-4.svg" alt="" width="1200" height="800">
      <div class="pl-overlay pl-overlay-gradient pl-position-bottom">
        <h4 style="margin: 0">Dolina Pięciu Stawów</h4>
        <small>Tatry Wysokie · 6 h marszu</small>
      </div>
    </div>
  </div>
  <div>
    <div class="pl-inline pl-overflow-hidden pl-border-rounded">
      <img src="/img/photo-4.svg" alt="" width="1200" height="800">
      <div class="pl-overlay pl-overlay-gradient-top pl-position-top">
        <span class="pl-label pl-label-spark">Polecane</span>
      </div>
    </div>
  </div>
  <div>
    <div class="pl-inline pl-overflow-hidden pl-border-rounded">
      <img src="/img/photo-4.svg" alt="" width="1200" height="800">
      <div class="pl-overlay pl-overlay-gradient-primary pl-position-bottom">
        <h4 style="margin: 0">Rysy o świcie</h4>
        <small>Wyprawa z przewodnikiem</small>
      </div>
    </div>
  </div>
</div>
```

## Pozycja

Klasy `.pl-position-top`, `-bottom`, `-left`, `-right`, `-center`, `-cover`, `-top-left`, `-bottom-right` itd. decydują o miejscu panelu. `.pl-position-cover` rozciąga go na cały obraz.

```html example
<div class="pl-grid pl-child-width-1-2 pl-child-width-1-4@m">
  <div>
    <div class="pl-inline pl-overflow-hidden pl-border-rounded">
      <img src="/img/photo-6.svg" alt="" width="1200" height="800">
      <div class="pl-overlay pl-overlay-small pl-overlay-default pl-position-top">Top</div>
    </div>
  </div>
  <div>
    <div class="pl-inline pl-overflow-hidden pl-border-rounded">
      <img src="/img/photo-6.svg" alt="" width="1200" height="800">
      <div class="pl-overlay pl-overlay-small pl-overlay-default pl-position-left">Left</div>
    </div>
  </div>
  <div>
    <div class="pl-inline pl-overflow-hidden pl-border-rounded">
      <img src="/img/photo-6.svg" alt="" width="1200" height="800">
      <div class="pl-overlay pl-overlay-small pl-overlay-default pl-position-center">Center</div>
    </div>
  </div>
  <div>
    <div class="pl-inline pl-overflow-hidden pl-border-rounded">
      <img src="/img/photo-6.svg" alt="" width="1200" height="800">
      <div class="pl-overlay pl-overlay-small pl-overlay-primary pl-position-cover pl-flex pl-flex-center pl-flex-middle">Cover</div>
    </div>
  </div>
</div>
```

## Pływająca plakietka

Z marginesem `.pl-position-small` i klasą `.pl-overlay-rounded` panel staje się zaokrągloną plakietką odsuniętą od krawędzi.

```html example center
<div class="pl-inline pl-overflow-hidden pl-border-rounded" style="max-width: 30rem">
  <img src="/img/photo-7.svg" alt="" width="1200" height="800">
  <div class="pl-overlay pl-overlay-small pl-overlay-default pl-overlay-rounded pl-position-bottom-left pl-position-small">
    <strong>Apartament Sosnowy</strong><br>
    <small class="pl-text-muted">od 420 zł / noc</small>
  </div>
  <div class="pl-overlay pl-overlay-small pl-overlay-primary pl-overlay-rounded pl-position-top-right pl-position-small">
    <small>★ 4,9</small>
  </div>
</div>
```

## Wejście przy hoverze

Dodaj `.pl-transition-toggle` do kontenera, a do nakładki jedną z klas `.pl-transition-fade`, `-slide-bottom`, `-slide-top`, `-scale-up` itd. Atrybut `tabindex="0"` pozwala wywołać efekt klawiaturą.

```html example
<div class="pl-grid pl-child-width-1-3@m">
  <div>
    <div class="pl-inline pl-overflow-hidden pl-border-rounded pl-transition-toggle" tabindex="0">
      <img src="/img/photo-8.svg" alt="" width="1200" height="800">
      <div class="pl-overlay pl-overlay-default pl-position-bottom pl-transition-slide-bottom">
        <p><strong>Slide</strong> — panel wjeżdża od dołu.</p>
      </div>
    </div>
  </div>
  <div>
    <div class="pl-inline pl-overflow-hidden pl-border-rounded pl-transition-toggle" tabindex="0">
      <img src="/img/photo-8.svg" alt="" width="1200" height="800">
      <div class="pl-overlay pl-overlay-dark pl-position-cover pl-transition-fade pl-flex pl-flex-center pl-flex-middle">
        <p><strong>Fade</strong> — przyciemnienie.</p>
      </div>
    </div>
  </div>
  <div>
    <div class="pl-inline pl-overflow-hidden pl-border-rounded pl-transition-toggle" tabindex="0">
      <img src="/img/photo-8.svg" alt="" width="1200" height="800">
      <div class="pl-overlay pl-overlay-gradient pl-position-bottom pl-transition-fade">
        <h4 style="margin: 0">Gradient + fade</h4>
        <small>Podpis pojawia się płynnie</small>
      </div>
    </div>
  </div>
</div>
```

## Ikona nakładki

`.pl-overlay-icon` to szklane kółko z ikoną — np. „powiększ" lub „odtwórz". Pusty element rysuje „+". Ikona lekko rośnie, gdy kursor jest nad kafelkiem.

```html example
<div class="pl-grid pl-child-width-1-3@m">
  <div>
    <a class="pl-inline pl-overflow-hidden pl-border-rounded pl-transition-toggle" href="#" style="display: block">
      <img src="/img/photo-2.svg" alt="Powiększ zdjęcie" width="1200" height="800">
      <span class="pl-overlay-icon pl-position-center"></span>
    </a>
  </div>
  <div>
    <a class="pl-inline pl-overflow-hidden pl-border-rounded pl-transition-toggle" href="#" style="display: block">
      <img src="/img/photo-5.svg" alt="Odtwórz film" width="1200" height="800">
      <span class="pl-overlay-icon pl-position-center" data-pl-icon="play"></span>
    </a>
  </div>
  <div>
    <a class="pl-inline pl-overflow-hidden pl-border-rounded pl-transition-toggle" href="#" style="display: block">
      <img src="/img/photo-1.svg" alt="Zobacz galerię" width="1200" height="800">
      <span class="pl-overlay pl-overlay-dark pl-position-cover pl-transition-fade"></span>
      <span class="pl-overlay-icon pl-position-center pl-transition-scale-up" data-pl-icon="zoom-in"></span>
    </a>
  </div>
</div>
```

## Rozmiary

`.pl-overlay-small` i `.pl-overlay-large` zmieniają odstęp wewnętrzny.

```html example
<div class="pl-grid pl-child-width-1-3@m">
  <div>
    <div class="pl-inline pl-overflow-hidden pl-border-rounded">
      <img src="/img/photo-6.svg" alt="" width="1200" height="800">
      <div class="pl-overlay pl-overlay-small pl-overlay-default pl-position-bottom">Small</div>
    </div>
  </div>
  <div>
    <div class="pl-inline pl-overflow-hidden pl-border-rounded">
      <img src="/img/photo-6.svg" alt="" width="1200" height="800">
      <div class="pl-overlay pl-overlay-default pl-position-bottom">Domyślny</div>
    </div>
  </div>
  <div>
    <div class="pl-inline pl-overflow-hidden pl-border-rounded">
      <img src="/img/photo-6.svg" alt="" width="1200" height="800">
      <div class="pl-overlay pl-overlay-large pl-overlay-default pl-position-bottom">Large</div>
    </div>
  </div>
</div>
```

## API

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-overlay` | Panel nakładki (odstęp wewnętrzny, kolor tekstu). |
| `.pl-overlay-default` | Półprzezroczysta powierzchnia z rozmyciem tła. |
| `.pl-overlay-primary` | Półprzezroczysty akcent, jasny tekst. |
| `.pl-overlay-dark` | Ciemne przyciemnienie, jasny tekst. |
| `.pl-overlay-gradient` | Ciemny gradient od dołu. |
| `.pl-overlay-gradient-top` | Ciemny gradient od góry. |
| `.pl-overlay-gradient-primary` | Gradient w kolorze akcentu od dołu. |
| `.pl-overlay-rounded` | Zaokrąglone rogi (pływająca plakietka). |
| `.pl-overlay-small` `.pl-overlay-large` | Odstęp wewnętrzny. |
| `.pl-overlay-icon` | Szklane kółko z ikoną; puste rysuje „+". |

### Zmienne CSS

| Zmienna | Domyślnie | Opis |
| --- | --- | --- |
| `--pl-overlay-p` | `1.25rem` | Odstęp wewnętrzny panelu. |
| `--pl-overlay-icon-size` | `3.25rem` | Średnica `.pl-overlay-icon`. |

### Powiązane narzędzia

Nakładka korzysta z klas [Position](/docs/layout/position/) (`.pl-position-*`), [Transition](/docs/utilities/transition/) (`.pl-transition-toggle`, `.pl-transition-*`) oraz `.pl-inline` i `.pl-overflow-hidden` z narzędzi ogólnych.
