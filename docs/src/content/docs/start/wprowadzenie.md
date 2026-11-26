---
title: Wprowadzenie
description: Plossy to biblioteka komponentów interfejsu — czysty CSS oparty na tokenach i małe moduły JavaScript bez żadnych zależności.
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

### NPM

```bash
npm install plossy
```

W projekcie z bundlerem (Vite, Astro, webpack…) zaimportuj gotowe pliki z paczki:

```js
import 'plossy/dist/plossy.min.css';
import Plossy from 'plossy';
```

Import JavaScriptu uruchamia automatyczną inicjalizację komponentów z atrybutów `data-pl-*`; obiekt `Plossy` daje dostęp do API (np. `Plossy.modal('#okno').show()`).

### CDN

Bez instalacji — dołącz pliki prosto ze strony:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/plossy@0.2/dist/plossy.min.css" />
<script src="https://cdn.jsdelivr.net/npm/plossy@0.2/dist/plossy.min.js" defer></script>
```

Skrypt udostępnia globalny obiekt `window.Plossy`.

### Tylko to, czego używasz

`plossy.min.css` zawiera wszystko. Jeśli zależy Ci na rozmiarze, załaduj sam rdzeń i dołóż tylko potrzebne części — w tej kolejności:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/plossy@0.2/dist/plossy.core.min.css" />
<!-- opcjonalnie: wybrany styl (data-pl-style="flat") -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/plossy@0.2/dist/presets/flat.min.css" />
<!-- opcjonalnie: klasy Bootstrapa (d-flex, col-md-6, .btn …) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/plossy@0.2/dist/plossy.bootstrap.min.css" />
```

Rdzeń ma domyślny wygląd (styl „soft"), jasny i ciemny motyw oraz wszystkie akcenty. Po kompresji gzip waży ok. 65 kB zamiast 85 kB pełnego pliku; pojedynczy preset to 1–2 kB, a warstwa Bootstrapa ok. 25 kB.

### Pliki w paczce

| Plik | Do czego |
| --- | --- |
| `dist/plossy.min.css` | Wszystko: rdzeń, wszystkie style i zgodność z Bootstrapem. |
| `dist/plossy.core.min.css` | Sam rdzeń: komponenty, narzędzia, motywy i akcenty. |
| `dist/presets/{nazwa}.min.css` | Jeden styl (`flat`, `glass`, `pop`…), ładowany po rdzeniu. |
| `dist/plossy.bootstrap.min.css` | Klasy Bootstrapa, ładowane po rdzeniu. |
| `dist/plossy.min.js` | Skrypt dla tagu `<script>` (globalne `Plossy`). |
| `dist/plossy.esm.js` | Moduł ES dla bundlerów — to on ładuje się przy `import Plossy from 'plossy'`. |
| `dist/plossy.d.ts` | Deklaracje typów dla TypeScriptu — ładują się same. |

Każdy plik CSS i `plossy.js` ma też wersję czytelną, bez `.min`.

Źródła SCSS i JS nie wchodzą do paczki NPM. Jeśli chcesz zmieniać zmienne Sass albo budować własną wersję, pobierz [repozytorium z GitHuba](https://github.com/plossy-ui/plossy) i uruchom `npm install`, a potem `npm run dist`.

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
