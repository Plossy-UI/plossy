---
title: Wprowadzenie
description: Plossy to lekka biblioteka komponentów interfejsu — czysty CSS oparty na tokenach i małe moduły JavaScript bez żadnych zależności.
order: 1
---

## Czym jest Plossy

Plossy dostarcza kilkadziesiąt gotowych komponentów — od przycisków i formularzy, przez modale i powiadomienia, po slidery i sortowanie metodą „przeciągnij i upuść". Wszystko w spójnym, minimalistycznym stylu z lekkimi, sprężystymi animacjami.

- **Zero zależności** — jeden plik CSS i jeden plik JS.
- **Inicjalizacja z atrybutów** — komponenty uruchamiają się same po dodaniu `data-pl-*`, także dla elementów wstawionych później.
- **Tokeny projektowe** — kolory, promienie, cienie i ruch to zmienne CSS; ciemny motyw i własny akcent ustawisz jednym atrybutem.
- **Dostępność** — obsługa klawiatury, role ARIA i poszanowanie `prefers-reduced-motion`.
- **Zgodność z Bootstrapem** — klasy narzędziowe i siatka (`d-flex`, `my-2`, `col-md-6` …) działają od razu.

## Instalacja

Zbuduj paczkę poleceniem `npm run dist` — w katalogu `dist/` pojawią się gotowe pliki. Dołącz je do strony:

```html
<link rel="stylesheet" href="dist/plossy.min.css" />
<script src="dist/plossy.min.js" defer></script>
```

W projekcie z bundlerem zaimportuj źródła:

```js
import 'plossy/src/scss/plossy.scss';
import Plossy from 'plossy/src/js/index.js';
```

Biblioteka nie dołącza krojów pisma. Domyślne tokeny wskazują na **Geist** (tekst), **Bricolage Grotesque** (nagłówki) i **Geist Mono** (kod) z bezpiecznymi zamiennikami systemowymi — kroje podmienisz zmiennymi `--pl-font-sans`, `--pl-font-display` i `--pl-font-mono`.

## Pierwszy przykład

Klasy mają prefiks `pl-`, a zachowanie dodaje atrybut `data-pl-*`.

```html example center
<button class="pl-button pl-button-primary" type="button">
  Zaczynamy
  <span class="pl-button-arrow" data-pl-icon="arrow-right"></span>
</button>
<button class="pl-button" type="button">Dokumentacja</button>
<button class="pl-button pl-button-ghost" type="button">Pomiń</button>
```

## Jak czytać dokumentację

Każdy przykład składa się z **żywego podglądu** i **kodu** pod nim. Przycisk „Kopiuj" kopiuje kod aktywnej zakładki; gdy przykład wymaga skryptu lub stylów, znajdziesz je w zakładkach obok HTML. Na końcu każdej strony jest sekcja **API** z opcjami, metodami, zdarzeniami i klasami.

W nagłówku możesz przełączyć **motyw** (jasny / ciemny) i **akcent** — wszystkie przykłady reagują natychmiast.

## Konwencje nazw

| Wzorzec | Przykład | Znaczenie |
| --- | --- | --- |
| `.pl-{komponent}` | `.pl-card` | Komponent. |
| `.pl-{komponent}-{część}` | `.pl-card-body` | Część komponentu. |
| `.pl-{komponent}-{modyfikator}` | `.pl-button-primary`, `.pl-button-small` | Wariant, ton lub rozmiar. |
| `.pl-open`, `.pl-active`, `.pl-disabled` | | Stany. |
| `…@s`, `…@m`, `…@l`, `…@xl` | `.pl-width-1-2@m` | Wersja od breakpointu 640 / 960 / 1200 / 1600 px. |
| `data-pl-{komponent}` | `data-pl-accordion="multiple: true"` | Uruchamia skrypt komponentu i przekazuje opcje. |

## Obsługa przeglądarek

Plossy korzysta z nowoczesnych możliwości CSS (`oklch`, `color-mix`, `:has`, zagnieżdżone `<dialog>`, Popover API), dlatego wymaga aktualnych wersji Chrome, Edge, Firefoksa i Safari.
