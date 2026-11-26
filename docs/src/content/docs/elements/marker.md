---
title: Marker
description: Okrągły znacznik „+" z pulsującym pierścieniem — do hotspotów na zdjęciach. Łączy się z drop i tooltip.
---

## Podstawowe użycie

Dodaj klasę `.pl-marker` do pustego elementu `<a>` lub `<button>`. Znak „+" rysuje CSS; przy hoverze znacznik obraca się i rośnie.

```html example center
<button class="pl-marker" type="button" aria-label="Pokaż szczegóły"></button>
```

## Tony

Domyślny znacznik ma kolor akcentu. Klasy `.pl-marker-{ton}` zmieniają kolor, `.pl-marker-light` jest biały (na ciemne zdjęcia), `.pl-marker-spark` — limonkowy.

```html example center
<button class="pl-marker" type="button" aria-label="Akcent"></button>
<button class="pl-marker pl-marker-secondary" type="button" aria-label="Secondary"></button>
<button class="pl-marker pl-marker-success" type="button" aria-label="Success"></button>
<button class="pl-marker pl-marker-warning" type="button" aria-label="Warning"></button>
<button class="pl-marker pl-marker-danger" type="button" aria-label="Danger"></button>
<button class="pl-marker pl-marker-info" type="button" aria-label="Info"></button>
<button class="pl-marker pl-marker-spark" type="button" aria-label="Spark"></button>
<button class="pl-marker pl-marker-light" type="button" aria-label="Light"></button>
```

## Rozmiary

`.pl-marker-small` i `.pl-marker-large`.

```html example center
<button class="pl-marker pl-marker-small" type="button" aria-label="Mały"></button>
<button class="pl-marker" type="button" aria-label="Domyślny"></button>
<button class="pl-marker pl-marker-large" type="button" aria-label="Duży"></button>
```

## Bez pulsu

`.pl-marker-static` wyłącza pulsujące pierścienie. Puls wyłącza się też sam przy `prefers-reduced-motion`.

```html example center
<button class="pl-marker pl-marker-static" type="button" aria-label="Pokaż szczegóły"></button>
<button class="pl-marker pl-marker-static pl-marker-secondary" type="button" aria-label="Pokaż szczegóły"></button>
```

## Numer lub ikona

Gdy znacznik ma treść, rysowany „+" znika — możesz wstawić numer albo ikonę.

```html example center
<button class="pl-marker" type="button" aria-label="Punkt 1">1</button>
<button class="pl-marker pl-marker-secondary" type="button" aria-label="Punkt 2">2</button>
<button class="pl-marker pl-marker-spark" type="button" aria-label="Punkt 3">3</button>
<button class="pl-marker pl-marker-large pl-marker-danger" type="button" aria-label="Lokalizacja"><span data-pl-icon="map-pin"></span></button>
<button class="pl-marker pl-marker-large pl-marker-light" type="button" aria-label="Odtwórz"><span data-pl-icon="play"></span></button>
```

## Stan otwarty

Z klasą `.pl-open` (lub `aria-expanded="true"`) „+" obraca się w „×", a puls ustaje.

```html example center
<button class="pl-marker" type="button" aria-expanded="false" aria-label="Zamknięty"></button>
<button class="pl-marker pl-open" type="button" aria-expanded="true" aria-label="Otwarty"></button>
```

## Hotspoty na zdjęciu

Umieść znaczniki w kontenerze `.pl-inline` i ustaw je klasą `.pl-position-absolute` oraz stylem `top` / `left`. Tooltip pokaże krótki opis.

```html example center
<div class="pl-inline" style="position: relative; display: inline-block; max-width: 40rem">
  <img src="/img/photo-2.svg" alt="Salon z sofą, lampą i stolikiem" width="1200" height="800" style="border-radius: var(--pl-radius-lg); display: block">
  <a class="pl-marker pl-position-absolute" href="#" style="position: absolute; top: 28%; left: 22%" data-pl-tooltip="Lampa Arko — 349 zł" aria-label="Lampa Arko — 349 zł"></a>
  <a class="pl-marker pl-marker-light pl-position-absolute" href="#" style="position: absolute; top: 58%; left: 55%" data-pl-tooltip="Sofa Lumo — 3 290 zł" aria-label="Sofa Lumo — 3 290 zł"></a>
  <a class="pl-marker pl-marker-spark pl-position-absolute" href="#" style="position: absolute; top: 74%; left: 80%" data-pl-tooltip="title: Stolik Fala — 890 zł; pos: left" aria-label="Stolik Fala — 890 zł"></a>
</div>
```

## Z drop

Znacznik jako przełącznik panelu `.pl-drop` — panel stoi bezpośrednio po znaczniku.

```html example center
<div style="position: relative; display: inline-block; max-width: 40rem">
  <img src="/img/photo-5.svg" alt="Biurko z laptopem" width="1200" height="800" style="border-radius: var(--pl-radius-lg); display: block">
  <div style="position: absolute; top: 42%; left: 46%">
    <button class="pl-marker pl-marker-large" type="button" aria-label="Pokaż produkt"></button>
    <div class="pl-drop" data-pl-drop="mode: click; pos: right-start" style="padding: 1rem; width: 16rem">
      <p class="pl-card-meta">Biurko</p>
      <h4 class="pl-card-title" style="font-size: var(--pl-text-lg)">Biurko Linea 140</h4>
      <p class="pl-card-text" style="font-size: var(--pl-text-sm)">Dębowy blat, regulowana wysokość, kanał na kable.</p>
      <a class="pl-button pl-button-primary pl-button-small" href="#">Zobacz — 1 890 zł</a>
    </div>
  </div>
</div>
```

## API

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-marker` | Znacznik. Pusty rysuje „+"; z treścią pokazuje numer lub ikonę. |
| `.pl-marker-primary` … `.pl-marker-info` | Tony. |
| `.pl-marker-light` | Biały znacznik na ciemne tła. |
| `.pl-marker-spark` | Limonkowy znacznik. |
| `.pl-marker-small` `.pl-marker-large` | Rozmiary. |
| `.pl-marker-static` | Bez pulsujących pierścieni. |
| `.pl-open` / `.pl-active` / `[aria-expanded="true"]` | Stan otwarty: „+" obrócony w „×". |

### Zmienne CSS

| Zmienna | Domyślnie | Opis |
| --- | --- | --- |
| `--pl-marker-size` | `2rem` | Średnica znacznika. |
| `--pl-marker-plus` | `0.7rem` | Długość ramion znaku „+". |

### Dostępność

Pusty znacznik nie ma treści tekstowej — zawsze dodawaj `aria-label` opisujący, co się stanie po kliknięciu.
