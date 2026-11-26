---
title: Offcanvas
description: Panel wysuwany z krawędzi ekranu — na nawigację mobilną, koszyk czy filtry. Zbudowany na natywnym elemencie dialog, ze sprężystym wjazdem i wariantem pływającym.
badge: JS
---

## Podstawowe użycie

Offcanvas to element `<dialog class="pl-offcanvas">` z atrybutem `data-pl-offcanvas`, a w nim panel `.pl-offcanvas-bar`. Otwiera go dowolny element z `data-pl-offcanvas-open="#id"`, zamyka element z `data-pl-offcanvas-close`, klawisz <kbd>Esc</kbd>, kliknięcie tła albo — na ekranach dotykowych — przesunięcie panelu w stronę krawędzi.

```html example center
<button class="pl-button pl-button-primary" type="button" data-pl-offcanvas-open="#demo-offcanvas">Otwórz panel</button>

<dialog class="pl-offcanvas" id="demo-offcanvas" data-pl-offcanvas>
  <div class="pl-offcanvas-bar">
    <button class="pl-close pl-offcanvas-close" type="button" aria-label="Zamknij" data-pl-offcanvas-close></button>
    <h3 class="pl-offcanvas-title">Pracownia Sosna</h3>
    <p>Projektujemy i robimy meble z litego drewna — na wymiar, w małych seriach, w warsztacie pod Krakowem.</p>
    <p>Zapraszamy od poniedziałku do piątku w godzinach 9:00–17:00.</p>
    <button class="pl-button" type="button" data-pl-offcanvas-close>Zamknij panel</button>
  </div>
</dialog>
```

Panel współpracuje też z komponentem Toggle: `<button data-pl-toggle="#demo-offcanvas">`.

## Strona

Opcja `side` wybiera krawędź: `left` (domyślnie), `right`, `top` lub `bottom`. Samą wartość można podać skrótowo: `data-pl-offcanvas="right"`.

```html example center
<button class="pl-button" type="button" data-pl-offcanvas-open="#demo-offcanvas-left">Z lewej</button>
<button class="pl-button" type="button" data-pl-offcanvas-open="#demo-offcanvas-right">Z prawej</button>
<button class="pl-button" type="button" data-pl-offcanvas-open="#demo-offcanvas-top">Z góry</button>
<button class="pl-button" type="button" data-pl-offcanvas-open="#demo-offcanvas-bottom">Z dołu</button>

<dialog class="pl-offcanvas" id="demo-offcanvas-left" data-pl-offcanvas="side: left">
  <div class="pl-offcanvas-bar">
    <button class="pl-close pl-offcanvas-close" type="button" aria-label="Zamknij" data-pl-offcanvas-close></button>
    <h3 class="pl-offcanvas-title">Lewa krawędź</h3>
    <p>Klasyczne miejsce na nawigację główną w wersji mobilnej.</p>
  </div>
</dialog>

<dialog class="pl-offcanvas" id="demo-offcanvas-right" data-pl-offcanvas="side: right">
  <div class="pl-offcanvas-bar">
    <button class="pl-close pl-offcanvas-close" type="button" aria-label="Zamknij" data-pl-offcanvas-close></button>
    <h3 class="pl-offcanvas-title">Prawa krawędź</h3>
    <p>Dobre miejsce na koszyk, szczegóły rekordu albo ustawienia.</p>
  </div>
</dialog>

<dialog class="pl-offcanvas" id="demo-offcanvas-top" data-pl-offcanvas="side: top">
  <div class="pl-offcanvas-bar">
    <button class="pl-close pl-offcanvas-close" type="button" aria-label="Zamknij" data-pl-offcanvas-close></button>
    <h3 class="pl-offcanvas-title">Górna krawędź</h3>
    <p>Panel z góry ma wysokość dopasowaną do treści — sprawdza się jako pasek wyszukiwania lub komunikat.</p>
  </div>
</dialog>

<dialog class="pl-offcanvas" id="demo-offcanvas-bottom" data-pl-offcanvas="side: bottom">
  <div class="pl-offcanvas-bar">
    <button class="pl-close pl-offcanvas-close" type="button" aria-label="Zamknij" data-pl-offcanvas-close></button>
    <h3 class="pl-offcanvas-title">Dolna krawędź</h3>
    <p>Panel z dołu jest wygodny na telefonach — leży w zasięgu kciuka. Wysokość ustawisz zmienną <code>--pl-offcanvas-height</code>.</p>
  </div>
</dialog>
```

## Sekcje

Dla bardziej złożonych paneli użyj sekcji `.pl-offcanvas-header`, `.pl-offcanvas-body` i `.pl-offcanvas-footer`. Nagłówek i stopka stoją w miejscu, a przewija się tylko treść.

```html example center
<button class="pl-button" type="button" data-pl-offcanvas-open="#demo-offcanvas-cart">Koszyk (3)</button>

<dialog class="pl-offcanvas" id="demo-offcanvas-cart" data-pl-offcanvas="side: right">
  <div class="pl-offcanvas-bar">
    <div class="pl-offcanvas-header">
      <h3 class="pl-offcanvas-title">Twój koszyk</h3>
      <button class="pl-close" type="button" aria-label="Zamknij" data-pl-offcanvas-close></button>
    </div>
    <div class="pl-offcanvas-body">
      <div class="pl-flex pl-flex-middle" style="gap: .85rem; margin-bottom: 1.1rem">
        <img src="/img/photo-2.svg" alt="" width="64" height="64" style="width: 64px; height: 64px; border-radius: var(--pl-radius-md); object-fit: cover">
        <div style="flex: 1">
          <strong>Lampa stołowa Mgła</strong><br>
          <small style="color: var(--pl-text-muted)">1 × 349,00 zł</small>
        </div>
      </div>
      <div class="pl-flex pl-flex-middle" style="gap: .85rem; margin-bottom: 1.1rem">
        <img src="/img/photo-5.svg" alt="" width="64" height="64" style="width: 64px; height: 64px; border-radius: var(--pl-radius-md); object-fit: cover">
        <div style="flex: 1">
          <strong>Wazon ceramiczny Otoczak</strong><br>
          <small style="color: var(--pl-text-muted)">2 × 129,00 zł</small>
        </div>
      </div>
      <div class="pl-flex pl-flex-middle" style="gap: .85rem">
        <img src="/img/photo-7.svg" alt="" width="64" height="64" style="width: 64px; height: 64px; border-radius: var(--pl-radius-md); object-fit: cover">
        <div style="flex: 1">
          <strong>Koc wełniany Szron</strong><br>
          <small style="color: var(--pl-text-muted)">1 × 459,00 zł</small>
        </div>
      </div>
    </div>
    <div class="pl-offcanvas-footer">
      <div class="pl-flex pl-flex-between" style="flex-basis: 100%; margin-bottom: .35rem">
        <span style="color: var(--pl-text-muted)">Razem</span>
        <strong>1 066,00 zł</strong>
      </div>
      <button class="pl-button" type="button" data-pl-offcanvas-close>Kontynuuj zakupy</button>
      <button class="pl-button pl-button-primary" type="button" data-pl-offcanvas-close>Do kasy</button>
    </div>
  </div>
</dialog>
```

## Wariant pływający

Klasa `.pl-offcanvas-floating` odkleja panel od krawędzi: dostaje margines, zaokrąglone rogi i miękki cień. To znak rozpoznawczy Plossy — sprężyna przy wjeździe jest tu najlepiej widoczna.

```html example center
<button class="pl-button pl-button-primary" type="button" data-pl-offcanvas-open="#demo-offcanvas-floating">Pływający z lewej</button>
<button class="pl-button" type="button" data-pl-offcanvas-open="#demo-offcanvas-floating-right">Pływający z prawej</button>
<button class="pl-button" type="button" data-pl-offcanvas-open="#demo-offcanvas-floating-bottom">Pływający z dołu</button>

<dialog class="pl-offcanvas pl-offcanvas-floating" id="demo-offcanvas-floating" data-pl-offcanvas>
  <div class="pl-offcanvas-bar">
    <button class="pl-close pl-offcanvas-close" type="button" aria-label="Zamknij" data-pl-offcanvas-close></button>
    <ul class="pl-nav pl-nav-primary">
      <li class="pl-active"><a href="#">Start</a></li>
      <li><a href="#">Kolekcje</a></li>
      <li><a href="#">Pracownia</a></li>
      <li><a href="#">Dziennik</a></li>
      <li><a href="#">Kontakt</a></li>
    </ul>
    <p style="margin-top: auto; color: var(--pl-text-muted); font-size: var(--pl-text-sm)">ul. Stolarska 12, Kraków<br>pon.–pt. 9:00–17:00</p>
  </div>
</dialog>

<dialog class="pl-offcanvas pl-offcanvas-floating" id="demo-offcanvas-floating-right" data-pl-offcanvas="side: right">
  <div class="pl-offcanvas-bar">
    <div class="pl-offcanvas-header">
      <h3 class="pl-offcanvas-title">Powiadomienia</h3>
      <button class="pl-close" type="button" aria-label="Zamknij" data-pl-offcanvas-close></button>
    </div>
    <div class="pl-offcanvas-body">
      <p><strong>Ola Nowak</strong> skomentowała projekt „Katalog 2027”.<br><small style="color: var(--pl-text-muted)">5 minut temu</small></p>
      <p><strong>Eksport zakończony.</strong> Plik PDF jest gotowy do pobrania.<br><small style="color: var(--pl-text-muted)">godzinę temu</small></p>
      <p><strong>Tomasz Lis</strong> zaprosił Cię do zespołu „Marketing”.<br><small style="color: var(--pl-text-muted)">wczoraj</small></p>
    </div>
    <div class="pl-offcanvas-footer">
      <button class="pl-button" type="button" data-pl-offcanvas-close>Oznacz jako przeczytane</button>
    </div>
  </div>
</dialog>

<dialog class="pl-offcanvas pl-offcanvas-floating" id="demo-offcanvas-floating-bottom" data-pl-offcanvas="side: bottom">
  <div class="pl-offcanvas-bar">
    <div class="pl-offcanvas-handle"></div>
    <div class="pl-offcanvas-body">
      <h3 class="pl-offcanvas-title">Ta strona używa plików cookie</h3>
      <p style="color: var(--pl-text-muted)">Niezbędne pliki zapewniają działanie serwisu. Za Twoją zgodą użyjemy także plików analitycznych, żeby ulepszać nasze treści.</p>
      <div class="pl-flex" style="gap: .5rem; flex-wrap: wrap">
        <button class="pl-button pl-button-primary" type="button" data-pl-offcanvas-close>Akceptuję wszystkie</button>
        <button class="pl-button" type="button" data-pl-offcanvas-close>Tylko niezbędne</button>
      </div>
    </div>
  </div>
</dialog>
```

## Szerokość

Klasy `.pl-offcanvas-small` i `.pl-offcanvas-large` na elemencie `<dialog>` (lub `.pl-offcanvas-bar-small` / `.pl-offcanvas-bar-large` na panelu) zmieniają szerokość. Dowolną wartość ustawisz zmienną `--pl-offcanvas-width`.

```html example center
<button class="pl-button" type="button" data-pl-offcanvas-open="#demo-offcanvas-small">Wąski</button>
<button class="pl-button" type="button" data-pl-offcanvas-open="#demo-offcanvas-large">Szeroki</button>

<dialog class="pl-offcanvas pl-offcanvas-small" id="demo-offcanvas-small" data-pl-offcanvas>
  <div class="pl-offcanvas-bar">
    <button class="pl-close pl-offcanvas-close" type="button" aria-label="Zamknij" data-pl-offcanvas-close></button>
    <h3 class="pl-offcanvas-title">Wąski panel</h3>
    <p>16rem — w sam raz na krótkie menu.</p>
  </div>
</dialog>

<dialog class="pl-offcanvas pl-offcanvas-large" id="demo-offcanvas-large" data-pl-offcanvas="side: right">
  <div class="pl-offcanvas-bar">
    <button class="pl-close pl-offcanvas-close" type="button" aria-label="Zamknij" data-pl-offcanvas-close></button>
    <h3 class="pl-offcanvas-title">Szeroki panel</h3>
    <p>28rem — zmieści formularz, podgląd dokumentu albo szczegóły zamówienia.</p>
  </div>
</dialog>
```

## Nawigacja mobilna

Typowe zastosowanie: menu strony zbudowane z komponentu Nav. Kliknięcie odnośnika prowadzącego do kotwicy na tej samej stronie (`href="#sekcja"`) automatycznie zamyka panel.

```html example center
<button class="pl-button" type="button" data-pl-offcanvas-open="#demo-offcanvas-nav" aria-label="Otwórz menu">
  <span data-pl-icon="menu"></span> Menu
</button>

<dialog class="pl-offcanvas" id="demo-offcanvas-nav" data-pl-offcanvas aria-label="Menu główne">
  <div class="pl-offcanvas-bar">
    <div class="pl-offcanvas-header">
      <h3 class="pl-offcanvas-title">Menu</h3>
      <button class="pl-close" type="button" aria-label="Zamknij" data-pl-offcanvas-close></button>
    </div>
    <div class="pl-offcanvas-body">
      <ul class="pl-nav pl-nav-default">
        <li class="pl-nav-header">Sklep</li>
        <li class="pl-active"><a href="#">Nowości</a></li>
        <li><a href="#">Meble</a></li>
        <li><a href="#">Oświetlenie</a></li>
        <li><a href="#">Tekstylia</a></li>
        <li class="pl-nav-divider"></li>
        <li class="pl-nav-header">Pomoc</li>
        <li><a href="#">Dostawa i zwroty</a></li>
        <li><a href="#">Kontakt</a></li>
      </ul>
    </div>
    <div class="pl-offcanvas-footer">
      <button class="pl-button pl-button-primary" type="button" data-pl-offcanvas-close>Zaloguj się</button>
    </div>
  </div>
</dialog>
```

## Panel filtrów

Offcanvas dobrze zastępuje boczną kolumnę filtrów na wąskich ekranach.

```html example center
<button class="pl-button" type="button" data-pl-offcanvas-open="#demo-offcanvas-filters">Filtry</button>

<dialog class="pl-offcanvas" id="demo-offcanvas-filters" data-pl-offcanvas="side: right">
  <div class="pl-offcanvas-bar">
    <div class="pl-offcanvas-header">
      <h3 class="pl-offcanvas-title">Filtry</h3>
      <button class="pl-close" type="button" aria-label="Zamknij" data-pl-offcanvas-close></button>
    </div>
    <div class="pl-offcanvas-body">
      <fieldset style="border: 0; padding: 0; margin: 0 0 1.5rem">
        <legend style="font-weight: 600; margin-bottom: .6rem">Kategoria</legend>
        <label style="display: block; margin-bottom: .4rem"><input class="pl-checkbox" type="checkbox" checked> Krzesła</label>
        <label style="display: block; margin-bottom: .4rem"><input class="pl-checkbox" type="checkbox"> Stoły</label>
        <label style="display: block; margin-bottom: .4rem"><input class="pl-checkbox" type="checkbox"> Regały</label>
        <label style="display: block"><input class="pl-checkbox" type="checkbox"> Komody</label>
      </fieldset>
      <fieldset style="border: 0; padding: 0; margin: 0">
        <legend style="font-weight: 600; margin-bottom: .6rem">Materiał</legend>
        <label style="display: block; margin-bottom: .4rem"><input class="pl-radio" type="radio" name="demo-material" checked> Dąb</label>
        <label style="display: block; margin-bottom: .4rem"><input class="pl-radio" type="radio" name="demo-material"> Jesion</label>
        <label style="display: block"><input class="pl-radio" type="radio" name="demo-material"> Orzech</label>
      </fieldset>
    </div>
    <div class="pl-offcanvas-footer">
      <button class="pl-button" type="button" data-pl-offcanvas-close>Wyczyść</button>
      <button class="pl-button pl-button-primary" type="button" data-pl-offcanvas-close>Pokaż 48 produktów</button>
    </div>
  </div>
</dialog>
```

## Bez przyciemnienia

Opcja `overlay: false` wyłącza przyciemnienie i rozmycie tła. Panel nadal jest modalny — kliknięcie poza nim go zamyka. Z `backdrop-close: false` zamkniesz go tylko przyciskiem lub klawiszem <kbd>Esc</kbd>.

```html example center
<button class="pl-button" type="button" data-pl-offcanvas-open="#demo-offcanvas-plain">Bez przyciemnienia</button>
<button class="pl-button" type="button" data-pl-offcanvas-open="#demo-offcanvas-locked">Tło nie zamyka</button>

<dialog class="pl-offcanvas pl-offcanvas-floating" id="demo-offcanvas-plain" data-pl-offcanvas="side: right; overlay: false">
  <div class="pl-offcanvas-bar">
    <button class="pl-close pl-offcanvas-close" type="button" aria-label="Zamknij" data-pl-offcanvas-close></button>
    <h3 class="pl-offcanvas-title">Pomoc</h3>
    <p>Strona pozostaje w pełni widoczna, więc możesz porównywać ją z treścią panelu.</p>
  </div>
</dialog>

<dialog class="pl-offcanvas" id="demo-offcanvas-locked" data-pl-offcanvas="backdrop-close: false">
  <div class="pl-offcanvas-bar">
    <button class="pl-close pl-offcanvas-close" type="button" aria-label="Zamknij" data-pl-offcanvas-close></button>
    <h3 class="pl-offcanvas-title">Kreator konfiguracji</h3>
    <p>Kliknięcie tła nic nie zrobi — użyj przycisku zamykania lub klawisza Esc.</p>
  </div>
</dialog>
```

## Sterowanie z JavaScript

Instancję pobierzesz przez `Plossy.offcanvas(element)`. Zdarzenia są takie same jak w modalu.

```html example center
<button class="pl-button" id="demo-offcanvas-js-open" type="button">Otwórz z JavaScriptu</button>
<small id="demo-offcanvas-js-log" style="color: var(--pl-text-muted)">—</small>

<dialog class="pl-offcanvas pl-offcanvas-floating" id="demo-offcanvas-js" data-pl-offcanvas="side: right">
  <div class="pl-offcanvas-bar">
    <button class="pl-close pl-offcanvas-close" type="button" aria-label="Zamknij" data-pl-offcanvas-close></button>
    <h3 class="pl-offcanvas-title">Panel sterowany kodem</h3>
    <p>Otworzyła go metoda <code>show()</code>.</p>
  </div>
</dialog>
```

```js example-js
const panel = Plossy.offcanvas('#demo-offcanvas-js');
const log = document.querySelector('#demo-offcanvas-js-log');

document.querySelector('#demo-offcanvas-js-open').addEventListener('click', () => panel.show());

['show', 'shown', 'hide', 'hidden'].forEach((type) => {
  panel.el.addEventListener(`pl:${type}`, () => (log.textContent = `Zdarzenie: pl:${type}`));
});
```

## API

### Opcje

Opcje przekazujesz w atrybucie: `data-pl-offcanvas="side: right; overlay: false"`.

| Opcja | Typ | Domyślnie | Opis |
| --- | --- | --- | --- |
| `side` | string | `left` | Krawędź: `left`, `right`, `top` lub `bottom`. |
| `overlay` | boolean | `true` | Przyciemnienie i rozmycie tła. |
| `backdrop-close` | boolean | `true` | Kliknięcie tła zamyka panel. |
| `esc-close` | boolean | `true` | Klawisz Esc zamyka panel. |
| `swipe` | boolean | `true` | Zamykanie gestem przesunięcia (panele boczne, ekrany dotykowe). |
| `anchor-close` | boolean | `true` | Kliknięcie odnośnika do kotwicy (`#sekcja`) zamyka panel. |
| `stack` | boolean | `false` | Pozwala otworzyć panel nad inną nakładką, zamiast ją zastępować. |

### Atrybuty

| Atrybut | Opis |
| --- | --- |
| `data-pl-offcanvas` | Inicjalizuje panel na elemencie `<dialog>`. |
| `data-pl-offcanvas-open="#id"` | Otwiera wskazany panel po kliknięciu. |
| `data-pl-offcanvas-close` | Zamyka panel, w którym się znajduje. |
| `data-pl-toggle="#id"` | Przełącza panel przez komponent Toggle. |

### Metody

| Metoda | Opis |
| --- | --- |
| `show()` | Otwiera panel. Zwraca Promise spełnianą po animacji. |
| `hide()` | Zamyka panel. Zwraca Promise spełnianą po animacji. |
| `toggle()` | Przełącza panel. |

### Zdarzenia

| Zdarzenie | Opis |
| --- | --- |
| `pl:beforeshow` | Przed otwarciem. Można anulować przez `preventDefault()`. |
| `pl:show` | Panel otwarty, startuje animacja. |
| `pl:shown` | Po zakończeniu animacji otwierania. |
| `pl:beforehide` | Przed zamknięciem. Można anulować. |
| `pl:hide` | Rozpoczęcie animacji zamykania. |
| `pl:hidden` | Panel zamknięty, fokus wrócił do elementu otwierającego. |

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-offcanvas` | Element `<dialog>` — przezroczysta warstwa na cały ekran. |
| `.pl-offcanvas-bar` | Widoczny panel. |
| `.pl-offcanvas-header` | Nagłówek z tytułem i przyciskiem zamykania. |
| `.pl-offcanvas-title` | Tytuł panelu. |
| `.pl-offcanvas-body` | Przewijana treść. |
| `.pl-offcanvas-footer` | Stopka z przyciskami. |
| `.pl-offcanvas-close` | Przycisk zamykania w rogu panelu (bez nagłówka). |
| `.pl-offcanvas-handle` | Uchwyt dla paneli wysuwanych z dołu. |
| `.pl-offcanvas-floating` | Wariant pływający — margines, zaokrąglenie, cień. |
| `.pl-offcanvas-small` `.pl-offcanvas-large` | Szerokość panelu. |
| `.pl-offcanvas-left` `.pl-offcanvas-right` `.pl-offcanvas-top` `.pl-offcanvas-bottom` | Strona — ustawiane automatycznie z opcji `side`. |
| `.pl-offcanvas-no-overlay` | Bez przyciemnienia — ustawiane z opcji `overlay`. |
