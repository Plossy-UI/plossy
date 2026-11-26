---
title: Tab
description: Zakładki z linią, która płynnie przesuwa się pod aktywną pozycję. Warianty poziome i pionowe, pigułki oraz segmenty — wszystkie napędzane przez Switcher.
---

## Podstawowe użycie

Dodaj klasę `.pl-tab` do listy, a aktywną pozycję oznacz `.pl-active` na `<li>`. Atrybut `data-pl-switcher` łączy zakładki z panelami w kontenerze `.pl-switcher` (domyślnie następny element) i uruchamia przesuwany wskaźnik.

```html example
<ul class="pl-tab" data-pl-switcher>
  <li class="pl-active"><a href="#">Opis</a></li>
  <li><a href="#">Specyfikacja</a></li>
  <li><a href="#">Opinie</a></li>
  <li class="pl-disabled"><a href="#">Pytania</a></li>
</ul>
<div class="pl-switcher pl-margin-top">
  <div class="pl-active">
    <p>Fotel Lund łączy dębową ramę z tapicerką z naturalnego lnu. Głębokie siedzisko i lekko odchylone oparcie sprawiają, że nie chce się z niego wstawać.</p>
  </div>
  <div>
    <p>Szerokość 78 cm, głębokość 84 cm, wysokość 76 cm. Rama: dąb olejowany. Tkanina: len 100%, 420 g/m².</p>
  </div>
  <div>
    <p>Średnia ocen 4,8 na podstawie 126 opinii. Kupujący chwalą wygodę i jakość wykonania.</p>
  </div>
  <div></div>
</div>
```

Bez JavaScriptu (lub przed jego załadowaniem) aktywna zakładka ma własną, statyczną linię:

```html example
<ul class="pl-tab">
  <li><a href="#">Przegląd</a></li>
  <li class="pl-active"><a href="#">Aktywność</a></li>
  <li><a href="#">Ustawienia</a></li>
</ul>
```

## Ikony i znaczki

```html example
<ul class="pl-tab" data-pl-switcher>
  <li class="pl-active"><a href="#"><span data-pl-icon="mail"></span> Odebrane <span class="pl-badge pl-badge-primary pl-badge-small">8</span></a></li>
  <li><a href="#"><span data-pl-icon="send"></span> Wysłane</a></li>
  <li><a href="#"><span data-pl-icon="file-text"></span> Szkice <span class="pl-badge pl-badge-small">2</span></a></li>
</ul>
<div class="pl-switcher pl-margin-top">
  <div class="pl-active"><p>Masz 8 nieprzeczytanych wiadomości.</p></div>
  <div><p>Ostatnio wysłana: „Oferta — listopad", wczoraj o 16:20.</p></div>
  <div><p>Dwa szkice czekają na dokończenie.</p></div>
</div>
```

## Równe szerokości i wyrównanie

`.pl-tab-fill` rozciąga zakładki na całą szerokość. `.pl-tab-center` i `.pl-tab-right-align` wyrównują je do środka lub prawej.

```html example
<div>
  <ul class="pl-tab pl-tab-fill" data-pl-switcher>
    <li class="pl-active"><a href="#">Karta</a></li>
    <li><a href="#">BLIK</a></li>
    <li><a href="#">Przelew</a></li>
  </ul>
  <div class="pl-switcher pl-margin-top">
    <div class="pl-active"><p>Zapłać kartą Visa lub Mastercard — obciążymy ją dopiero przy wysyłce.</p></div>
    <div><p>Wpisz sześciocyfrowy kod z aplikacji banku.</p></div>
    <div><p>Dane do przelewu wyślemy e-mailem po złożeniu zamówienia.</p></div>
  </div>
</div>
<div class="pl-margin-top">
  <ul class="pl-tab pl-tab-center" data-pl-switcher>
    <li class="pl-active"><a href="#">Dla Ciebie</a></li>
    <li><a href="#">Obserwowani</a></li>
    <li><a href="#">Na czasie</a></li>
  </ul>
  <div class="pl-switcher" hidden><div></div><div></div><div></div></div>
</div>
```

## Zakładki pod treścią

`.pl-tab-bottom` przenosi linię na górną krawędź — dla zakładek umieszczonych pod panelami.

```html example
<div class="pl-switcher pl-margin-bottom" id="demo-tab-bottom">
  <div class="pl-active"><p><strong>Poniedziałek.</strong> Planowanie sprintu i przegląd backlogu.</p></div>
  <div><p><strong>Środa.</strong> Demo dla klienta o 14:00.</p></div>
  <div><p><strong>Piątek.</strong> Retrospektywa i wdrożenie na produkcję.</p></div>
</div>
<ul class="pl-tab pl-tab-bottom" data-pl-switcher="connect: #demo-tab-bottom">
  <li class="pl-active"><a href="#">Poniedziałek</a></li>
  <li><a href="#">Środa</a></li>
  <li><a href="#">Piątek</a></li>
</ul>
```

## Zakładki pionowe

`.pl-tab-left` ustawia zakładki w kolumnie z linią po prawej stronie (zakładki stoją na lewo od treści), `.pl-tab-right` — odwrotnie. Wskaźnik przesuwa się wtedy w pionie.

```html example
<div style="display: flex; gap: 1.5rem">
  <ul class="pl-tab pl-tab-left" data-pl-switcher="connect: #demo-tab-left" style="flex: none">
    <li class="pl-active"><a href="#">Profil</a></li>
    <li><a href="#">Bezpieczeństwo</a></li>
    <li><a href="#">Powiadomienia</a></li>
    <li><a href="#">Rozliczenia</a></li>
  </ul>
  <div class="pl-switcher" id="demo-tab-left" style="flex: 1">
    <div class="pl-active"><h4>Profil</h4><p>Imię, zdjęcie i krótki opis widoczne dla członków zespołu.</p></div>
    <div><h4>Bezpieczeństwo</h4><p>Hasło, logowanie dwuetapowe i aktywne sesje.</p></div>
    <div><h4>Powiadomienia</h4><p>Zdecyduj, o czym chcesz dostawać e-maile i powiadomienia push.</p></div>
    <div><h4>Rozliczenia</h4><p>Plan, metoda płatności i historia faktur.</p></div>
  </div>
</div>
```

```html example
<div style="display: flex; gap: 1.5rem">
  <div class="pl-switcher" id="demo-tab-right" style="flex: 1">
    <div class="pl-active"><h4>Wersja 3.2</h4><p>Nowy edytor reguł automatyzacji i eksport raportów do CSV.</p></div>
    <div><h4>Wersja 3.1</h4><p>Ciemny motyw oraz skróty klawiszowe w całej aplikacji.</p></div>
    <div><h4>Wersja 3.0</h4><p>Przebudowany pulpit i dwukrotnie szybsze wyszukiwanie.</p></div>
  </div>
  <ul class="pl-tab pl-tab-right" data-pl-switcher="connect: #demo-tab-right" style="flex: none">
    <li class="pl-active"><a href="#">3.2</a></li>
    <li><a href="#">3.1</a></li>
    <li><a href="#">3.0</a></li>
  </ul>
</div>
```

## Pigułki

W wariancie `.pl-tab-pill` wskaźnikiem jest zabarwione tło, które przesuwa się pod aktywną zakładkę.

```html example
<ul class="pl-tab pl-tab-pill" data-pl-switcher>
  <li class="pl-active"><a href="#">Wszystko</a></li>
  <li><a href="#">Projektowanie</a></li>
  <li><a href="#">Programowanie</a></li>
  <li><a href="#">Marketing</a></li>
</ul>
<div class="pl-switcher pl-margin-top">
  <div class="pl-active"><p>42 kursy we wszystkich kategoriach.</p></div>
  <div><p>14 kursów: typografia, systemy projektowe, prototypowanie.</p></div>
  <div><p>19 kursów: JavaScript, CSS, dostępność, wydajność.</p></div>
  <div><p>9 kursów: SEO, kampanie, analityka.</p></div>
</div>
```

Pigułki działają także pionowo:

```html example
<div style="display: flex; gap: 1.5rem">
  <ul class="pl-tab pl-tab-pill pl-tab-left" data-pl-switcher="connect: #demo-tab-pill-left" style="flex: none">
    <li class="pl-active"><a href="#"><span data-pl-icon="palette"></span> Wygląd</a></li>
    <li><a href="#"><span data-pl-icon="globe"></span> Język i region</a></li>
    <li><a href="#"><span data-pl-icon="shield"></span> Prywatność</a></li>
  </ul>
  <div class="pl-switcher" id="demo-tab-pill-left" style="flex: 1">
    <div class="pl-active"><p>Wybierz motyw jasny, ciemny albo zgodny z systemem.</p></div>
    <div><p>Polski, strefa czasowa Europa/Warszawa, format daty DD.MM.RRRR.</p></div>
    <div><p>Zarządzaj zgodami i pobierz kopię swoich danych.</p></div>
  </div>
</div>
```

## Segmenty

`.pl-tab-segment` to zwarta kontrolka segmentowa: wspólne tło i „płytka" przesuwająca się pod aktywną pozycję. Z `.pl-tab-fill` zajmuje całą szerokość.

```html example
<ul class="pl-tab pl-tab-segment" data-pl-switcher>
  <li class="pl-active"><a href="#"><span data-pl-icon="code"></span> Kod</a></li>
  <li><a href="#"><span data-pl-icon="eye"></span> Podgląd</a></li>
  <li><a href="#"><span data-pl-icon="columns-2"></span> Obok siebie</a></li>
</ul>
<div class="pl-switcher pl-margin-top">
  <div class="pl-active"><p>Edytujesz źródło dokumentu.</p></div>
  <div><p>Widzisz dokument tak, jak zobaczą go czytelnicy.</p></div>
  <div><p>Źródło po lewej, podgląd na żywo po prawej.</p></div>
</div>
```

```html example narrow
<div>
  <ul class="pl-tab pl-tab-segment pl-tab-fill" data-pl-switcher>
    <li class="pl-active"><a href="#">Kupno</a></li>
    <li><a href="#">Sprzedaż</a></li>
    <li><a href="#">Wymiana</a></li>
  </ul>
  <div class="pl-switcher pl-margin-top">
    <div class="pl-active"><p>Kurs kupna: 4,2815 zł</p></div>
    <div><p>Kurs sprzedaży: 4,3460 zł</p></div>
    <div><p>Wymiana między własnymi rachunkami bez prowizji.</p></div>
  </div>
</div>
```

## Rozmiary

```html example
<ul class="pl-tab pl-tab-small">
  <li class="pl-active"><a href="#">Małe</a></li>
  <li><a href="#">Zakładki</a></li>
  <li><a href="#">Kompaktowe</a></li>
</ul>
<ul class="pl-tab pl-tab-large pl-margin-top">
  <li class="pl-active"><a href="#">Duże</a></li>
  <li><a href="#">Zakładki</a></li>
  <li><a href="#">Wygodne</a></li>
</ul>
```

## API

Tab nie ma własnego skryptu — przełączaniem, klawiaturą i atrybutami ARIA zajmuje się [Switcher](/docs/interactive/switcher/). Ustawia on na liście klasę `.pl-switcher-ready` oraz zmienne `--pl-indicator-x`, `--pl-indicator-y`, `--pl-indicator-w` i `--pl-indicator-h`, z których zakładki rysują wskaźnik.

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-tab` | Lista zakładek (`ul > li > a`). |
| `.pl-tab-bottom` | Linia na górnej krawędzi (zakładki pod treścią). |
| `.pl-tab-left` | Układ pionowy, zakładki po lewej stronie treści. |
| `.pl-tab-right` | Układ pionowy, zakładki po prawej stronie treści. |
| `.pl-tab-pill` | Wskaźnik jako zabarwione tło. |
| `.pl-tab-segment` | Kontrolka segmentowa. |
| `.pl-tab-fill` | Równe szerokości na całą dostępną przestrzeń. |
| `.pl-tab-center` / `.pl-tab-right-align` | Wyrównanie zakładek. |
| `.pl-tab-small` / `.pl-tab-large` | Rozmiar. |
| `.pl-active` / `.pl-disabled` | Stany pozycji (na `<li>`). |

### Zmienne CSS

| Zmienna | Domyślnie | Opis |
| --- | --- | --- |
| `--pl-tab-px` / `--pl-tab-py` | `0.9rem` / `0.7rem` | Padding zakładki. |
| `--pl-tab-line` | `2px` | Grubość linii wskaźnika. |
| `--pl-tab-color` | `--pl-primary` | Kolor wskaźnika. |
| `--pl-tab-radius` | `--pl-radius-pill` | Zaokrąglenie pigułek / segmentów. |
