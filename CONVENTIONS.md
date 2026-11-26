# Plossy — konwencje

Obowiązują każdego, kto dopisuje komponent, narzędzie lub stronę dokumentacji.

## Struktura

```
src/scss/abstracts/_index.scss   mixiny i zmienne Sass (breakpointy, tony)
src/scss/_tokens.scss            tokeny projektowe (CSS custom properties)
src/scss/_base.scss              reset + wygląd elementów HTML
src/scss/components/_{nazwa}.scss
src/scss/utilities/_{nazwa}.scss
src/scss/_core.scss                rdzeń: indeks komponentów i narzędzi (lista @use)
src/scss/plossy.scss               pełny arkusz: rdzeń + presety + zgodność z Bootstrapem
src/scss/plossy.core.scss          sam rdzeń
src/scss/plossy.bootstrap.scss     sama zgodność z Bootstrapem
src/js/core.js                   rdzeń: Component, register, narzędzia
src/js/components/{nazwa}.js
src/js/index.js                  indeks importów — nie zmieniaj
docs/src/content/docs/{grupa}/{nazwa}.md   strony dokumentacji
docs/public/img/                 photo-1…8.svg (1200×800), avatar-1…6.svg
```

Pliki komponentów już istnieją jako puste szkielety i są wpięte w indeksy. Wypełniaj **tylko swoje** pliki. Nie twórz nowych plików SCSS/JS (nie trafią do indeksu) — wyjątkiem są strony `.md`.

Wzorce do naśladowania: `components/_button.scss`, `_card.scss`, `_accordion.scss`, `js/components/accordion.js`, `docs/.../interactive/accordion.md`.

## Język wizualny

Czysty, minimalistyczny, ciepły. Ma własny charakter — to nie jest Bootstrap ani Material.

- **Kolor**: ciepłe, piaskowe neutralne (`--pl-bg`, `--pl-surface`, `--pl-muted`), tekst „atramentowy", jeden akcent (`--pl-primary`, domyślnie iris) i limonkowa „iskra" (`--pl-spark`) używana oszczędnie — do drobnych wyróżnień (znaczniki, kropki statusu, podkreślenia).
- **Powierzchnie**: włosowa ramka 1px + miękki, warstwowy cień (`@include surface`). Żadnych ciężkich cieni ani grubych ramek.
- **Kształt**: wyraźnie zaokrąglone rogi (`--pl-radius-md` dla kontrolek, `-lg` dla kart, `-pill` dla znaczków).
- **Typografia**: nagłówki i tytuły — `--pl-font-display` (Bricolage Grotesque, waga ~560–640, ujemny tracking); tekst — `--pl-font-sans` (Geist); etykiety techniczne, małe „eyebrow" — `--pl-font-mono`, wersaliki, `letter-spacing: 0.06–0.08em`.
- **Ruch**: lekki i sprężysty. Transformacje (przesunięcia, skala, obrót) — `--pl-ease-spring`; kolory, cienie, przezroczystość — `--pl-ease`. Wejścia nakładek: zanikanie + lekka skala (0.96→1) lub przesunięcie o 6–10px. Hover: delikatne uniesienie / zmiana tła; `:active`: `scale(0.96–0.98)`.
- **Gęstość**: dużo powietrza. Kontrolki mają wysokość `--pl-control-h` (2.5rem), `-sm` (2rem), `-lg` (3rem).

## SCSS

Każdy partial zaczyna się od `@use '../abstracts' as *;` (plus `@use 'sass:math';` itp. w razie potrzeby).

- **Tylko tokeny.** Żadnych kolorów „na sztywno" (wyjątek: `transparent`, `currentColor`, czysta biel/czerń w `oklch(1 0 0 / α)` dla połysków i cieni wewnętrznych). Dzięki temu ciemny motyw i akcenty działają automatycznie — nie pisz selektorów `[data-pl-theme]`.
- **Mieszanie kolorów zawsze `color-mix(in oklab, …)`** — nigdy `in oklch` (przekłamuje odcień).
- Tokeny kolorów: `--pl-bg --pl-surface --pl-surface-raised --pl-muted --pl-muted-strong --pl-border --pl-border-strong --pl-text --pl-text-muted --pl-text-subtle --pl-ink --pl-on-ink --pl-spark --pl-on-spark --pl-overlay --pl-focus --pl-ring` oraz dla każdego tonu `primary secondary success warning danger info`: `--pl-{ton}`, `--pl-on-{ton}`, `--pl-{ton}-hover`, `--pl-{ton}-soft`, `--pl-{ton}-border`, `--pl-{ton}-text`.
- Pozostałe: `--pl-space-1…9`, `--pl-gutter`, `--pl-radius-xs|sm|md|lg|xl|pill`, `--pl-text-xs|sm|md|lg|xl|2xl|3xl|4xl|5xl`, `--pl-shadow-xs|sm|md|lg|xl`, `--pl-dur-1…4` (120/200/320/520 ms), `--pl-ease`, `--pl-ease-in`, `--pl-ease-in-out`, `--pl-ease-spring`, `--pl-control-h(-sm|-lg)`, `--pl-z-sticky|navbar|drop|tooltip|notification`, `--pl-container`.
- **Tony**: `@include tones('pl-alert');` generuje `.pl-alert-primary` … `.pl-alert-info`, które ustawiają `--pl-tone`, `--pl-on-tone`, `--pl-tone-soft`, `--pl-tone-text`. Komponent korzysta z tych zmiennych (z sensownymi wartościami domyślnymi na klasie bazowej).
- Mixiny: `up($bp)`, `down($bp)`, `responsive using ($s)`, `tones`, `focus-ring`, `focus-visible`, `surface`, `floating-surface`, `transition`, `button-reset`, `truncate`, `visually-hidden`.
- **Breakpointy** `s 640px`, `m 960px`, `l 1200px`, `xl 1600px`; klasy responsywne z sufiksem `@` jak w UIkit: `.pl-width-1-2@m` (w SCSS: `.pl-width-1-2\@m`, mixin `responsive` robi to sam).
- **Nazewnictwo** w stylu UIkit: `.pl-{komponent}`, części `.pl-{komponent}-{część}`, modyfikatory `.pl-{komponent}-{modyfikator}` (np. `.pl-button-primary`, `.pl-button-small`). Stany: `.pl-open`, `.pl-active`, `.pl-disabled`. Rozmiary: `-small`, `-large`.
- Lokalne zmienne komponentu `--pl-{komponent}-…` dla łatwego dostrajania.
- Każdy interaktywny element ma widoczny fokus (`@include focus-visible;`).
- Czasy animacji przez tokeny `--pl-dur-*` (wyłączają się same przy `prefers-reduced-motion`). Animacje `@keyframes` o stałym czasie (np. spinnery) są OK; efektowne animacje wejścia owiń w `@media (prefers-reduced-motion: no-preference)`.
- Elementy pływające (drop, tooltip, popover, toast): `@include floating-surface;` — są pozycjonowane przez JS (`position: fixed`), trafiają do top-layer.
- Specyficzność niska i płaska. Narzędzia (utilities) używają `!important`.

## JavaScript

Vanilla ES modules, zero zależności. Każdy komponent:

```js
import { Component, register } from '../core.js';

class Alert extends Component {
  static defaults = { duration: 200 };   // opcje
  static primary = null;                  // opcja dla „gołej" wartości atrybutu
  init() { /* stan instancji ustawiaj TU, nie w polach klasy */ }
}
register('alert', Alert);                 // → [data-pl-alert], Plossy.alert(el)
export default Alert;
```

- **Nie używaj pól klasy dla stanu instancji** (`foo = 1`) — konstruktor bazowy wywołuje `init()` wcześniej, pola by go nadpisały. Stan ustawiaj w `init()`.
- Opcje z atrybutu: `data-pl-nazwa="klucz: wartość; inny-klucz: 2"` (kebab → camelCase, typy rozpoznawane automatycznie) lub JSON. Parsowane są tylko klucze obecne w `defaults`.
- `this.el`, `this.options`, `this.on(target, type, handler, opts)` (sprząta się w `destroy()`), `this.onDestroy(fn)`, `this.emit(type, detail, cancelable)` → zdarzenie `pl:{type}` bąbelkujące z `detail.component`; zwraca `false` po `preventDefault()`.
- Nazwy zdarzeń: `beforeshow`, `show`, `shown`, `beforehide`, `hide`, `hidden` oraz własne (`change`, `select`, `move`, …).
- Publiczne metody: `show()`, `hide()`, `toggle()` itd. Instancja: `Plossy.nazwa(elementLubSelektor, opcje)`.
- Funkcje statyczne (np. `Plossy.notification({...})`) dopisz po `register`: `import { api } …; api.notification = …`.
- Plik może rejestrować kilka komponentów (np. `scrollspy` i `scrollspy-nav`).
- Narzędzia z `core.js`: `$`, `$$`, `uid`, `clamp`, `camel`, `queryTargets(el, 'next'|'prev'|'parent'|'> .x'|selektor)`, `focusables`, `getInstance(el, nazwa)`, `animationsDone(el)`, `animateClass(el, cls)`, `toggleHeight(el, show, {duration})`, `showLayer(el)` / `hideLayer(el)` (top-layer przez Popover API), `place(floating, reference, {placement, offset, flip, shift, matchWidth})`, `autoPlace(…)` → `stop()`, `lockScroll()` / `unlockScroll()`, `rafThrottle`, `debounce`, `prefersReducedMotion()`. Przeczytaj `core.js` przed pisaniem.
- Modale i panele boczne to natywne `<dialog>` + `showModal()`; animację wyjścia rób klasą, po `animationsDone()` wywołaj `close()`.
- Dostępność: role/ARIA, obsługa klawiatury (Esc, strzałki, Home/End), zarządzanie fokusem.
- Komponent musi działać także dla elementów dodanych dynamicznie i nie może wyrzucać błędów, gdy brakuje opcjonalnych części.
- Komentarze i komunikaty po polsku, zwięźle.

## Style (presety)

`data-pl-style` (`flat`, `elegant`, `tender`, `round`, `pop`, `editorial`, `paper`, `glass`, `toy`) przełącza charakter całej biblioteki; presety leżą w `src/scss/styles/`, mixiny do pisania własnych w `styles/_engine.scss`. Żeby nowy komponent poddawał się presetom:

- promienie, cienie, kroje, czasy i `--pl-ease-spring` **zawsze z tokenów** (nigdy `border-radius: 12px`, `box-shadow: 0 4px …` na sztywno — własny cień buduj z `--pl-shadow-*` albo mnoż przez `var(--pl-shadow-scale)`),
- tytuły w kroju display: `font-weight: var(--pl-display-weight, 600); letter-spacing: var(--pl-display-tracking, -0.02em);`,
- efekty „wypukłości" skaluj pokrętłami `--pl-gloss`, `--pl-lift`, `--pl-press`.

Opis pokręteł: `docs/src/content/docs/start/style.md`.

## Kontrakty między komponentami

Trzymaj się ich, pisząc przykłady korzystające z cudzych komponentów.

- **Icon**: `<span data-pl-icon="check"></span>` — nazwy w `src/js/icons.js` (Lucide). Element dostaje klasę `.pl-icon` (1.25em).
- **Close**: `<button class="pl-close" type="button" aria-label="Zamknij"></button>` — „X" rysowany w CSS. Zamykanie obsługuje komponent-rodzic: alert reaguje na `.pl-alert-close`, modal na `[data-pl-modal-close]`, offcanvas na `[data-pl-offcanvas-close]`.
- **Toggle**: `<button data-pl-toggle="#cel">` lub `data-pl-toggle="target: #cel; cls: pl-open; animation: true"`. Bez `cls` przełącza `hidden`. Jeśli cel jest modalem / offcanvasem (`data-pl-modal`, `data-pl-offcanvas`), wywołuje jego `toggle()`.
- **Modal**: `<dialog class="pl-modal" id="m" data-pl-modal><div class="pl-modal-dialog"><div class="pl-modal-header"><h2 class="pl-modal-title">…</h2><button class="pl-close" data-pl-modal-close></button></div><div class="pl-modal-body">…</div><div class="pl-modal-footer">…</div></div></dialog>`.
- **Offcanvas**: `<dialog class="pl-offcanvas" id="o" data-pl-offcanvas="side: left"><div class="pl-offcanvas-bar">…</div></dialog>`.
- **Drop**: element `.pl-drop` z `data-pl-drop` stoi **bezpośrednio po** elemencie przełączającym: `<button>Menu</button><div class="pl-drop" data-pl-drop="mode: click; pos: bottom-start">…</div>`. Menu: wewnątrz `<ul class="pl-dropdown-nav"><li><a href="#">…</a></li><li class="pl-nav-header">…</li><li class="pl-nav-divider"></li></ul>`; aktywna pozycja `li.pl-active`.
- **Switcher**: `<ul class="pl-tab" data-pl-switcher="connect: #panele"><li class="pl-active"><a href="#">…</a></li>…</ul><div class="pl-switcher" id="panele"><div>…</div>…</div>` — bez `connect` bierze następne rodzeństwo `.pl-switcher`. Aktywny `li` i aktywny panel mają `.pl-active`. Switcher ustawia na swoim elemencie zmienne `--pl-indicator-x/-y/-w/-h` (px, pozycja aktywnej pozycji względem elementu) oraz klasę `.pl-switcher-ready` — nawigacje (tab, subnav pill) rysują z nich przesuwany wskaźnik.
- **Scrollspy**: `data-pl-scrollspy="cls: pl-animation-slide-up; target: > *; delay: 80"` — do czasu wejścia w widok elementy mają `.pl-invisible`, potem dostają klasę animacji.
- **Animacje** (utilities): `.pl-animation-fade`, `-scale-up`, `-scale-down`, `-slide-up`, `-slide-down`, `-slide-left`, `-slide-right`, `-blur`, `-shake`, `-spring`; modyfikatory `.pl-animation-fast`, `.pl-animation-slow`, `.pl-animation-reverse`.
- **Tooltip**: `data-pl-tooltip="Tekst"` lub `data-pl-tooltip="title: Tekst; pos: top"`.
- **Notification**: `Plossy.notification('Tekst')` / `Plossy.notification({ message, status: 'success', pos: 'top-right', timeout: 4000 })`.
- Widoczność: `.pl-hidden` (display: none), `.pl-invisible` (visibility: hidden); odstępy: `.pl-margin`, `.pl-margin-small-top` …; flex: `.pl-flex`, `.pl-flex-middle`, `.pl-flex-between` …; siatka: `<div class="pl-grid pl-child-width-1-3@m">`.

## Dokumentacja

Strona = plik Markdown (zwykły `.md`, nie MDX) w `docs/src/content/docs/{grupa}/{nazwa}.md`. Grupy: `start`, `layout`, `elements`, `navigation`, `forms`, `overlays`, `interactive`, `utilities`.

````md
---
title: Alert
description: Jedno–dwa zdania wprowadzenia (lead pod tytułem).
badge: JS        # tylko dla komponentów ze skryptem
---

## Podstawowe użycie

Krótki opis.

```html example
<div class="pl-alert">…</div>
```
````

- Blok ` ```html example ` renderuje **żywy podgląd i kod pod nim** (jak w MDB). Bezpośrednio po nim można dodać ` ```js example-js ` i/lub ` ```css example-css ` — pojawią się jako zakładki i zostaną wykonane w podglądzie (JS uruchamia się po `DOMContentLoaded`, `Plossy` jest dostępne).
- Słowa po `example` ustawiają układ podglądu: `center` (flex, wyśrodkowane, gap), `row` (flex, do lewej, gap), `column` (pionowo, gap), `flush` (bez paddingu), `plain` (bez kropek w tle), `muted` (szare tło), `tall` (min. 22rem), `scroll` (max 26rem + przewijanie), `narrow` (dzieci max 26rem). Np. ` ```html example center `.
- Zwykłe bloki kodu (bez `example`) to sam kod z przyciskiem kopiowania.
- Język: **polski**, zwięzły, konkretny. Treści przykładów realistyczne (nie „lorem ipsum"). Nazwy klas / API po angielsku.
- Układ strony: `## Podstawowe użycie` → kolejne sekcje z wariantami (każda: 1–2 zdania + przykład) → na końcu `## API` z tabelami `### Opcje`, `### Metody`, `### Zdarzenia` (dla JS) i `### Klasy`.
- `id` w przykładach muszą być unikalne w obrębie strony (prefiksuj `demo-`).
- Obrazy: `/img/photo-1.svg` … `/img/photo-8.svg`, `/img/avatar-1.svg` … `/img/avatar-6.svg`. Nie linkuj zewnętrznych zasobów.
- Style inline w przykładach tylko wtedy, gdy to konieczne do pokazania działania (np. wysokość pojemnika).

## Sprawdzanie

- SCSS: `npx sass --no-source-map src/scss/plossy.scss > /dev/null` (kompiluje całość).
- JS: `node --check src/js/components/{nazwa}.js`.
- Dev-serwer dokumentacji: `npm run dev` (gdy ENOSPC: `PLOSSY_POLL=1 npm run dev`).
