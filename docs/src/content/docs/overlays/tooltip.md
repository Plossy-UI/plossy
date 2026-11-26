---
title: Tooltip
description: Krótka podpowiedź w „atramentowym" dymku — pojawia się po najechaniu lub sfokusowaniu elementu, sprężyście i bez zbędnej zwłoki.
badge: JS
---

## Podstawowe użycie

Dodaj atrybut `data-pl-tooltip` z treścią podpowiedzi. Tooltip pokazuje się po najechaniu kursorem oraz po sfokusowaniu klawiaturą, a znika po zjechaniu, kliknięciu, przewinięciu strony lub naciśnięciu <kbd>Esc</kbd>.

```html example center
<button class="pl-button" type="button" data-pl-tooltip="Zapisz zmiany w dokumencie">Najedź na mnie</button>
<button class="pl-button pl-button-icon" type="button" data-pl-tooltip="Kopiuj link"><span data-pl-icon="link"></span></button>
<button class="pl-button pl-button-icon" type="button" data-pl-tooltip="Dodaj do ulubionych"><span data-pl-icon="star"></span></button>
<button class="pl-button pl-button-icon" type="button" data-pl-tooltip="Usuń"><span data-pl-icon="trash-2"></span></button>
```

Przesuń kursor po sąsiednich przyciskach: gdy jeden tooltip jest już widoczny, kolejne pojawiają się natychmiast, bez opóźnienia.

## Atrybut title

Pusty `data-pl-tooltip` korzysta z treści atrybutu `title`. Natywny dymek przeglądarki zostaje wyłączony, a elementy bez własnego tekstu (np. przyciski z samą ikoną) dostają z tej treści `aria-label`.

```html example center
<button class="pl-button" type="button" title="Treść pobrana z atrybutu title" data-pl-tooltip>Przycisk z title</button>
<a href="#" title="Otwiera się w nowej karcie" data-pl-tooltip="pos: bottom">Dokumentacja API</a>
```

## Pozycja

Opcja `pos` ustawia stronę (`top`, `bottom`, `left`, `right`) i opcjonalne wyrównanie (`-start`, `-end`). Gdy brakuje miejsca, tooltip przeskakuje na przeciwną stronę, a strzałka zawsze wskazuje środek elementu.

```html example center
<button class="pl-button" type="button" data-pl-tooltip="title: Na górze; pos: top">top</button>
<button class="pl-button" type="button" data-pl-tooltip="title: Po prawej; pos: right">right</button>
<button class="pl-button" type="button" data-pl-tooltip="title: Na dole; pos: bottom">bottom</button>
<button class="pl-button" type="button" data-pl-tooltip="title: Po lewej; pos: left">left</button>
<button class="pl-button" type="button" data-pl-tooltip="title: Wyrównany do początku przycisku; pos: top-start">top-start</button>
<button class="pl-button" type="button" data-pl-tooltip="title: Wyrównany do końca przycisku; pos: bottom-end">bottom-end</button>
```

## Opóźnienie i odstęp

`delay` określa czas (ms) do pokazania, `offset` — odległość dymka od elementu.

```html example center
<button class="pl-button" type="button" data-pl-tooltip="title: Od razu; delay: 0">Bez opóźnienia</button>
<button class="pl-button" type="button" data-pl-tooltip="title: Po pół sekundy; delay: 500">Opóźnienie 500 ms</button>
<button class="pl-button" type="button" data-pl-tooltip="title: Trzymam dystans; offset: 20">Odstęp 20 px</button>
```

## Warianty

Opcja `cls` dodaje klasy do dymka. `.pl-tooltip-light` daje jasną powierzchnię z ramką, klasy tonów — kolor znaczeniowy.

```html example center
<button class="pl-button" type="button" data-pl-tooltip="title: Domyślny, atramentowy">Domyślny</button>
<button class="pl-button" type="button" data-pl-tooltip="title: Jasna powierzchnia z ramką; cls: pl-tooltip-light">Jasny</button>
<button class="pl-button pl-button-primary" type="button" data-pl-tooltip="title: Nowość w tej wersji; cls: pl-tooltip-primary">Primary</button>
<button class="pl-button pl-button-success" type="button" data-pl-tooltip="title: Zapisano pomyślnie; cls: pl-tooltip-success">Success</button>
<button class="pl-button pl-button-warning" type="button" data-pl-tooltip="title: Wymaga uwagi; cls: pl-tooltip-warning">Warning</button>
<button class="pl-button pl-button-danger" type="button" data-pl-tooltip="title: Tej operacji nie można cofnąć; cls: pl-tooltip-danger">Danger</button>
<button class="pl-button pl-button-info" type="button" data-pl-tooltip="title: Dodatkowa informacja; cls: pl-tooltip-info">Info</button>
```

### Rozmiary

```html example center
<button class="pl-button pl-button-small" type="button" data-pl-tooltip="title: Mały; cls: pl-tooltip-small">Mały</button>
<button class="pl-button" type="button" data-pl-tooltip="title: Standardowy rozmiar">Domyślny</button>
<button class="pl-button pl-button-large" type="button" data-pl-tooltip="title: Większy dymek pomieści dłuższe wyjaśnienie — tekst jest wyrównany do lewej i zawija się po 22 rem.; cls: pl-tooltip-large">Duży</button>
```

## Dłuższa treść i HTML

Długi tekst zawija się automatycznie (maks. `17.5rem`). Z opcją `html: true` treść jest wstawiana jako HTML — używaj jej wyłącznie dla zaufanych danych.

```html example center
<button class="pl-button" type="button" data-pl-tooltip="Hasło powinno mieć co najmniej 12 znaków, w tym cyfrę i znak specjalny.">Dłuższy tekst</button>
<button class="pl-button" type="button" data-pl-tooltip='{"title": "Zapisz <kbd>Ctrl S</kbd>", "html": true}'>Ze skrótem</button>
<button class="pl-button" type="button" data-pl-tooltip='{"title": "<strong>Plan Pro</strong><br>Bez limitu projektów", "html": true, "cls": "pl-tooltip-light pl-tooltip-left"}'>Z formatowaniem</button>
```

Treść zawierającą średnik lub cudzysłowy najwygodniej przekazać w formacie JSON, jak wyżej.

## W tekście i na ikonach

Tooltip działa na dowolnym elemencie. Elementy nieinteraktywne powinny mieć `tabindex="0"`, aby były osiągalne z klawiatury; klasa `.pl-tooltip-hint` dodaje kropkowane podkreślenie.

```html example
<p>Rozliczenie następuje w cyklu <span class="pl-tooltip-hint" tabindex="0" data-pl-tooltip="Monthly Recurring Revenue — miesięczny przychód powtarzalny">MRR</span>, a faktury wystawiamy z terminem <span class="pl-tooltip-hint" tabindex="0" data-pl-tooltip="title: Płatność w ciągu 14 dni od daty wystawienia; pos: bottom">NET 14</span>.</p>
<p class="pl-flex pl-flex-middle" style="gap: .375rem">
  Klucz API <span tabindex="0" style="display: inline-flex; color: var(--pl-text-subtle)" data-pl-tooltip="title: Klucz znajdziesz w Ustawieniach, w zakładce Integracje; pos: right"><span data-pl-icon="circle-help"></span></span>
</p>
```

## Sterowanie z JavaScript

`Plossy.tooltip(element, opcje)` tworzy lub zwraca instancję. Metoda `setTitle()` podmienia treść — także wtedy, gdy tooltip jest widoczny.

```html example center
<button class="pl-button" id="demo-tooltip-copy" type="button" data-pl-tooltip="Kopiuj adres"><span data-pl-icon="copy"></span> hello@plossy.dev</button>
<button class="pl-button pl-button-ghost" id="demo-tooltip-api" type="button">Pokaż na 2 sekundy</button>
```

```js example-js
const button = document.querySelector('#demo-tooltip-copy');
const tooltip = Plossy.tooltip(button);

button.addEventListener('click', () => {
  tooltip.setTitle('Skopiowano!');
  tooltip.show();
  setTimeout(() => tooltip.setTitle('Kopiuj adres'), 1500);
});

document.querySelector('#demo-tooltip-api').addEventListener('click', () => {
  tooltip.show();
  setTimeout(() => tooltip.hide(), 2000);
});
```

## API

### Opcje

Sama treść: `data-pl-tooltip="Tekst"`. Z opcjami: `data-pl-tooltip="title: Tekst; pos: bottom; delay: 300"`.

| Opcja | Typ | Domyślnie | Opis |
| --- | --- | --- | --- |
| `title` | string | `''` | Treść podpowiedzi (domyślnie z atrybutu `title`). |
| `pos` | string | `top` | Strona i wyrównanie: `top\|bottom\|left\|right` + `-start\|-end`. |
| `offset` | number | `10` | Odstęp od elementu w px. |
| `delay` | number | `120` | Opóźnienie pokazania w ms (pomijane, gdy inny tooltip był przed chwilą widoczny). |
| `cls` | string | `''` | Dodatkowe klasy dymka. |
| `html` | boolean | `false` | Wstawia treść jako HTML. |

### Metody

| Metoda | Opis |
| --- | --- |
| `show()` | Pokazuje tooltip. |
| `hide()` | Ukrywa tooltip. |
| `setTitle(text)` | Zmienia treść. |

### Zdarzenia

| Zdarzenie | Opis |
| --- | --- |
| `pl:beforeshow` | Przed pokazaniem. Można anulować przez `preventDefault()`. |
| `pl:show` | Tooltip został pokazany. |
| `pl:hide` | Rozpoczęcie ukrywania. |
| `pl:hidden` | Tooltip został ukryty. |

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-tooltip` | Dymek (jeden współdzielony element, tworzony przez JS). |
| `.pl-tooltip-light` | Jasna powierzchnia z ramką. |
| `.pl-tooltip-primary` … `.pl-tooltip-info` | Tony. |
| `.pl-tooltip-small`, `.pl-tooltip-large` | Rozmiary. |
| `.pl-tooltip-left` | Tekst wyrównany do lewej. |
| `.pl-tooltip-hint` | Kropkowane podkreślenie dla terminów w tekście. |

Zmienne: `--pl-tooltip-bg`, `--pl-tooltip-color`, `--pl-tooltip-max`, `--pl-tooltip-arrow`.
