---
title: Text
description: Narzędzia typograficzne — style, rozmiary, wagi, kolory, wyrównanie i zawijanie, a do tego gradient oraz zakreślacz w kolorze iskry.
---

## Style tekstu

`.pl-text-lead` to wprowadzenie pod nagłówkiem, `.pl-text-meta` — drobna informacja pomocnicza, a `.pl-text-eyebrow` — techniczna etykieta nad tytułem.

```html example
<p class="pl-text-eyebrow">Poradnik · 6 min czytania</p>
<h2>Jak zaplanować pierwszy sprint</h2>
<p class="pl-text-lead">Krótki plan, jasny cel i tablica, na którą zespół naprawdę zagląda — to wystarczy, żeby zacząć.</p>
<p class="pl-text-meta">Opublikowano 14 marca · <a href="#">Marta Zielińska</a></p>
```

## Efekty

### Gradient

`.pl-text-gradient` wypełnia litery przejściem od koloru akcentu do „iskry". Dodaj `.pl-text-gradient-animated`, aby barwy powoli się przelewały.

```html example
<h1 class="pl-margin-small-bottom">Projektuj <span class="pl-text-gradient">szybciej</span></h1>
<h2><span class="pl-text-gradient pl-text-gradient-animated">Interfejs, który ma charakter</span></h2>
```

Kolory przejścia zmienisz zmiennymi `--pl-text-gradient-from` i `--pl-text-gradient-to`.

```html example
<p class="pl-text-display pl-text-3xl">
  <span class="pl-text-gradient" style="--pl-text-gradient-from: var(--pl-danger); --pl-text-gradient-to: var(--pl-warning)">Ciepły zachód słońca</span>
</p>
```

### Zakreślacz

`.pl-text-highlight` podkreśla fragment grubą, limonkową linią — jak marker. Wariant `.pl-text-highlight-draw` rysuje zakreślenie od lewej, gdy element dostanie klasę `.pl-active` albo po najechaniu na rodzica z klasą `.pl-text-highlight-toggle`.

```html example
<h2>Mniej pracy, <span class="pl-text-highlight">więcej efektów</span></h2>
<p class="pl-text-lead pl-text-highlight-toggle">Najedź na ten akapit, a zobaczysz, jak <span class="pl-text-highlight pl-text-highlight-draw">zakreślenie rysuje się samo</span>.</p>
<p>Kolor zmienisz zmienną: <span class="pl-text-highlight" style="--pl-text-highlight-color: var(--pl-warning)">ważny termin — piątek</span>.</p>
```

## Kroje pisma

```html example
<p class="pl-text-display pl-text-2xl">.pl-text-display — krój nagłówkowy</p>
<p class="pl-text-sans">.pl-text-sans — krój podstawowy</p>
<p class="pl-text-mono">.pl-text-mono — krój o stałej szerokości</p>
<p class="pl-text-tabular">.pl-text-tabular — cyfry tabelaryczne: 1 111,00 zł / 9 876,54 zł</p>
```

## Rozmiary

Klasy `.pl-text-small`, `.pl-text-default` i `.pl-text-large` ustawiają rozmiar z dopasowaną interlinią. Pełna skala od `-xs` do `-5xl` odpowiada tokenom `--pl-text-*`.

```html example
<p class="pl-text-small">.pl-text-small — drobny druk regulaminu</p>
<p class="pl-text-default">.pl-text-default — zwykły tekst akapitu</p>
<p class="pl-text-large">.pl-text-large — nieco większy akapit</p>
<hr>
<div class="pl-text-xs">.pl-text-xs</div>
<div class="pl-text-sm">.pl-text-sm</div>
<div class="pl-text-md">.pl-text-md</div>
<div class="pl-text-lg">.pl-text-lg</div>
<div class="pl-text-xl">.pl-text-xl</div>
<div class="pl-text-2xl">.pl-text-2xl</div>
<div class="pl-text-3xl">.pl-text-3xl</div>
<div class="pl-text-4xl">.pl-text-4xl</div>
<div class="pl-text-5xl">.pl-text-5xl</div>
```

## Wagi i styl

```html example
<p class="pl-text-light">.pl-text-light — waga 300</p>
<p class="pl-text-normal">.pl-text-normal — waga 400</p>
<p class="pl-text-medium">.pl-text-medium — waga 520</p>
<p class="pl-text-semibold">.pl-text-semibold — waga 620</p>
<p class="pl-text-bold">.pl-text-bold — waga 720</p>
<p class="pl-text-italic">.pl-text-italic — kursywa</p>
```

Klasy `.pl-text-lighter` i `.pl-text-bolder` zmieniają wagę względem rodzica.

## Transformacje i dekoracje

```html example
<p class="pl-text-uppercase">.pl-text-uppercase — wersaliki</p>
<p class="pl-text-capitalize">.pl-text-capitalize — każde słowo wielką literą</p>
<p class="pl-text-lowercase">.pl-text-lowercase — MAŁE LITERY</p>
<p class="pl-text-underline">.pl-text-underline — podkreślenie</p>
<p class="pl-text-line-through">.pl-text-line-through — 249,00 zł</p>
<p><a class="pl-text-decoration-none" href="#">.pl-text-decoration-none — link bez podkreślenia</a></p>
<p class="pl-text-tight">.pl-text-tight — ciaśniejsze odstępy liter</p>
<p class="pl-text-wide pl-text-uppercase pl-text-small">.pl-text-wide — szersze odstępy liter</p>
```

## Kolory

Kolory tonów korzystają z tokenów `--pl-{ton}-text`, więc zachowują kontrast w jasnym i ciemnym motywie.

```html example
<p class="pl-text-emphasis">.pl-text-emphasis — pełny kolor tekstu</p>
<p class="pl-text-muted">.pl-text-muted — tekst drugoplanowy</p>
<p class="pl-text-subtle">.pl-text-subtle — tekst najcichszy</p>
<p class="pl-text-primary">.pl-text-primary — kolor akcentu</p>
<p class="pl-text-secondary">.pl-text-secondary — kolor atramentu</p>
<p class="pl-text-success">.pl-text-success — płatność zaksięgowana</p>
<p class="pl-text-warning">.pl-text-warning — subskrypcja wygasa za 3 dni</p>
<p class="pl-text-danger">.pl-text-danger — nie udało się zapisać zmian</p>
<p class="pl-text-info">.pl-text-info — dostępna jest nowa wersja</p>
```

## Wyrównanie

`.pl-text-left`, `.pl-text-center`, `.pl-text-right` i `.pl-text-justify` ustawiają wyrównanie w poziomie. Pierwsze trzy mają warianty responsywne `@s`, `@m`, `@l`, `@xl`.

```html example
<p class="pl-text-left">Do lewej</p>
<p class="pl-text-center">Do środka</p>
<p class="pl-text-right">Do prawej</p>
<p class="pl-text-justify">Tekst wyjustowany rozciąga się od krawędzi do krawędzi kontenera, a przeglądarka dzieli wyrazy tam, gdzie to możliwe, aby odstępy między słowami pozostały równe.</p>
<p class="pl-text-center pl-text-left@m pl-text-muted">Na telefonie wyśrodkowany, od breakpointu <code>m</code> — do lewej.</p>
```

### Wyrównanie w pionie

Klasy `.pl-text-top`, `.pl-text-middle`, `.pl-text-bottom` i `.pl-text-baseline` ustawiają `vertical-align` elementów liniowych i komórek tabeli.

```html example
<p>
  <img class="pl-text-top pl-border-rounded" src="/img/avatar-1.svg" width="48" height="48" alt=""> top
  <img class="pl-text-middle pl-border-rounded pl-margin-left" src="/img/avatar-2.svg" width="48" height="48" alt=""> middle
  <img class="pl-text-bottom pl-border-rounded pl-margin-left" src="/img/avatar-3.svg" width="48" height="48" alt=""> bottom
</p>
```

## Zawijanie

```html example narrow
<div>
  <p class="pl-text-eyebrow">.pl-text-truncate</p>
  <p class="pl-text-truncate">Sprawozdanie finansowe za trzeci kwartał — wersja ostateczna do zatwierdzenia przez zarząd.pdf</p>
  <p class="pl-text-eyebrow">.pl-text-clamp-2</p>
  <p class="pl-text-clamp-2">Zespół wdrożeniowy zakończył migrację wszystkich kont do nowej infrastruktury. Przerwa w działaniu usług trwała krócej niż zaplanowane cztery minuty, a żadne dane nie zostały utracone.</p>
  <p class="pl-text-eyebrow">.pl-text-clamp-3</p>
  <p class="pl-text-clamp-3">Zespół wdrożeniowy zakończył migrację wszystkich kont do nowej infrastruktury. Przerwa w działaniu usług trwała krócej niż zaplanowane cztery minuty, a żadne dane nie zostały utracone. Szczegółowy raport trafi do klientów w przyszłym tygodniu.</p>
  <p class="pl-text-eyebrow">.pl-text-break</p>
  <p class="pl-text-break">https://przyklad.pl/zamowienia/2025/03/faktury/korekty/FV-2025-03-000118-korekta-ostateczna</p>
  <p class="pl-text-eyebrow">.pl-text-nowrap</p>
  <p class="pl-text-nowrap pl-overflow-auto">Ten wiersz nigdy się nie zawinie, nawet jeśli nie mieści się w kontenerze.</p>
  <p class="pl-text-eyebrow">.pl-text-balance</p>
  <p class="pl-text-balance pl-text-large">Równomiernie rozłożone wiersze sprawiają, że krótkie nagłówki wyglądają spokojniej.</p>
</div>
```

## API

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-text-lead` | Większy akapit wprowadzający. |
| `.pl-text-meta` | Drobna informacja pomocnicza. |
| `.pl-text-eyebrow` | Etykieta nad tytułem (mono, wersaliki). |
| `.pl-text-gradient` | Tekst wypełniony gradientem akcent → iskra. |
| `.pl-text-gradient-animated` | Animowany gradient (z `.pl-text-gradient`). |
| `.pl-text-highlight` | Zakreślenie w kolorze iskry. |
| `.pl-text-highlight-draw` | Zakreślenie rysowane po `.pl-active` / hoverze rodzica `.pl-text-highlight-toggle`. |
| `.pl-text-display` / `-sans` / `-mono` | Krój pisma. |
| `.pl-text-tabular` | Cyfry o stałej szerokości. |
| `.pl-text-small` / `-default` / `-large` | Rozmiar z interlinią. |
| `.pl-text-{xs\|sm\|md\|lg\|xl\|2xl\|3xl\|4xl\|5xl}` | Rozmiar ze skali tokenów. |
| `.pl-text-light` / `-normal` / `-medium` / `-semibold` / `-bold` | Waga. |
| `.pl-text-lighter` / `-bolder` | Waga względna. |
| `.pl-text-italic` | Kursywa. |
| `.pl-text-uppercase` / `-lowercase` / `-capitalize` / `-transform-none` | Transformacja. |
| `.pl-text-underline` / `-line-through` / `-decoration-none` | Dekoracja. |
| `.pl-text-tight` / `-wide` | Odstępy między literami. |
| `.pl-text-muted` / `-subtle` / `-emphasis` | Kolory neutralne. |
| `.pl-text-{primary\|secondary\|success\|warning\|danger\|info}` | Kolory tonów. |
| `.pl-text-left` / `-center` / `-right` (+ `@s…@xl`) | Wyrównanie w poziomie. |
| `.pl-text-justify` | Justowanie. |
| `.pl-text-top` / `-middle` / `-bottom` / `-baseline` | Wyrównanie w pionie. |
| `.pl-text-truncate` | Jeden wiersz z wielokropkiem. |
| `.pl-text-clamp-{1…4}` | Ograniczenie liczby wierszy. |
| `.pl-text-break` | Łamanie długich ciągów znaków. |
| `.pl-text-nowrap` | Bez zawijania. |
| `.pl-text-balance` / `-pretty` | Zrównoważone łamanie wierszy. |
