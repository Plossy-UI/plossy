---
title: Switcher
description: Przełącza panele treści za pomocą dowolnej nawigacji — zakładek, pigułek, listy lub grupy przycisków. Z animacją zależną od kierunku, gestami i pełnym wzorcem ARIA.
badge: JS
---

## Podstawowe użycie

Dodaj `data-pl-switcher` do nawigacji. Panele to dzieci kontenera `.pl-switcher` — domyślnie brany jest najbliższy następny element z tą klasą. Aktywną pozycję i aktywny panel oznacza klasa `.pl-active`.

```html example
<ul class="pl-tab" data-pl-switcher>
  <li class="pl-active"><a href="#">Opis</a></li>
  <li><a href="#">Specyfikacja</a></li>
  <li><a href="#">Opinie</a></li>
</ul>

<div class="pl-switcher">
  <div>
    <p>Lampa biurkowa Luma łączy matowe aluminium z ciepłym, bezmigotliwym światłem. Ramię obraca się w trzech osiach, a jasność regulujesz dotykiem.</p>
  </div>
  <div>
    <p>Moc 9 W, temperatura barwowa 2700–5000 K, strumień 720 lm. Zasilanie przez USB-C, przewód 1,8 m w zestawie.</p>
  </div>
  <div>
    <p>Średnia ocena 4,8 na podstawie 214 opinii. Kupujący chwalą stabilną podstawę i równomierne światło.</p>
  </div>
</div>
```

## Połączenie przez selektor

Opcja `connect` wskazuje kontener paneli, który może leżeć w dowolnym miejscu strony. Selektor może pasować do kilku kontenerów — wszystkie będą przełączane razem.

```html example
<div class="pl-switcher pl-margin-bottom" id="demo-switcher-connect">
  <div><h3>Kraków</h3><p>Biuro przy Rynku Dębnickim, 42 osoby, zespoły produktowe i badawcze.</p></div>
  <div><h3>Wrocław</h3><p>Studio projektowe na Nadodrzu — 18 projektantów i pracownia prototypów.</p></div>
  <div><h3>Gdańsk</h3><p>Centrum wsparcia klientów czynne całą dobę, 27 konsultantów.</p></div>
</div>

<ul class="pl-subnav pl-subnav-pill" data-pl-switcher="connect: #demo-switcher-connect">
  <li class="pl-active"><a href="#">Kraków</a></li>
  <li><a href="#">Wrocław</a></li>
  <li><a href="#">Gdańsk</a></li>
</ul>
```

## Różne nawigacje

Switcher działa na każdej liście. Dla elementów, które nie są listą `ul > li`, bierze bezpośrednie dzieci; opcją `toggle` wskażesz pozycje samodzielnie.

### Grupa przycisków

```html example
<div class="pl-button-group" data-pl-switcher="toggle: > .pl-button">
  <button class="pl-button pl-active" type="button">Dzień</button>
  <button class="pl-button" type="button">Tydzień</button>
  <button class="pl-button" type="button">Miesiąc</button>
</div>

<div class="pl-switcher pl-margin-top">
  <div>Dziś: <strong>1 284</strong> odsłony, 37 nowych rejestracji.</div>
  <div>Ostatnie 7 dni: <strong>9 410</strong> odsłon, 256 nowych rejestracji.</div>
  <div>Ostatnie 30 dni: <strong>41 950</strong> odsłon, 1 102 nowe rejestracje.</div>
</div>
```

### Zakładki pionowe

Dla `.pl-tab-left` i `.pl-tab-right` komponent sam ustawia orientację pionową — między pozycjami przechodzisz strzałkami w górę i w dół.

```html example
<div class="pl-grid" style="align-items: start">
  <div class="pl-width-auto">
    <ul class="pl-tab pl-tab-left" data-pl-switcher="connect: #demo-switcher-vertical">
      <li class="pl-active"><a href="#">Profil</a></li>
      <li><a href="#">Powiadomienia</a></li>
      <li><a href="#">Bezpieczeństwo</a></li>
    </ul>
  </div>
  <div class="pl-width-expand">
    <div class="pl-switcher" id="demo-switcher-vertical">
      <div><h4>Profil</h4><p>Imię, zdjęcie i krótki opis widoczny dla współpracowników.</p></div>
      <div><h4>Powiadomienia</h4><p>Wybierz, o czym chcesz dostawać e-maile, a co ma trafiać tylko do aplikacji.</p></div>
      <div><h4>Bezpieczeństwo</h4><p>Hasło, weryfikacja dwuetapowa i lista aktywnych sesji.</p></div>
    </div>
  </div>
</div>
```

### Lista nawigacyjna

```html example
<div class="pl-grid" style="align-items: start">
  <div class="pl-width-1-3">
    <ul class="pl-nav pl-nav-default" data-pl-switcher="connect: #demo-switcher-nav">
      <li class="pl-nav-header">Pomoc</li>
      <li class="pl-active"><a href="#">Pierwsze kroki</a></li>
      <li><a href="#">Płatności</a></li>
      <li><a href="#">Integracje</a></li>
    </ul>
  </div>
  <div class="pl-width-expand">
    <div class="pl-switcher" id="demo-switcher-nav">
      <div>Załóż konto, zaproś zespół i utwórz pierwszy projekt — zajmie to mniej niż pięć minut.</div>
      <div>Akceptujemy karty, BLIK i przelewy. Faktury znajdziesz w zakładce „Rozliczenia".</div>
      <div>Połącz konto ze Slackiem, GitHubem lub kalendarzem Google.</div>
    </div>
  </div>
</div>
```

## Pozycje wyłączone

Pozycja z klasą `.pl-disabled` jest pomijana przez klawiaturę, gesty i nawigację `next` / `previous`.

```html example
<ul class="pl-tab" data-pl-switcher>
  <li class="pl-active"><a href="#">Aktywne</a></li>
  <li><a href="#">Zakończone</a></li>
  <li class="pl-disabled"><a href="#">Archiwum</a></li>
</ul>
<div class="pl-switcher">
  <div>3 zadania w toku.</div>
  <div>12 zadań zakończonych w tym miesiącu.</div>
  <div>Archiwum jest niedostępne w planie Starter.</div>
</div>
```

## Animacje

Domyślnie nowy panel wchodzi z delikatnym zanikaniem i przesunięciem zgodnym z kierunkiem zmiany. Opcja `animation` przyjmuje dowolną klasę animacji, a `animation: false` wyłącza efekt.

```html example
<ul class="pl-subnav pl-subnav-pill" data-pl-switcher="animation: pl-animation-scale-up">
  <li class="pl-active"><a href="#">Skala</a></li>
  <li><a href="#">Druga</a></li>
  <li><a href="#">Trzecia</a></li>
</ul>
<div class="pl-switcher">
  <div><div class="pl-card"><div class="pl-card-body">Panel powiększa się przy wejściu — <code>pl-animation-scale-up</code>.</div></div></div>
  <div><div class="pl-card"><div class="pl-card-body">Ta sama animacja w każdą stronę.</div></div></div>
  <div><div class="pl-card"><div class="pl-card-body">Trzeci panel.</div></div></div>
</div>
```

Dwie klasy po przecinku to animacje zależne od kierunku: pierwsza przy przejściu do dalszej pozycji, druga przy powrocie do wcześniejszej.

```html example
<ul class="pl-tab" data-pl-switcher="animation: pl-animation-slide-right, pl-animation-slide-left">
  <li class="pl-active"><a href="#">Styczeń</a></li>
  <li><a href="#">Luty</a></li>
  <li><a href="#">Marzec</a></li>
</ul>
<div class="pl-switcher">
  <div><div class="pl-card pl-card-muted"><div class="pl-card-body">Przychód 84 200 zł, 312 zamówień.</div></div></div>
  <div><div class="pl-card pl-card-muted"><div class="pl-card-body">Przychód 91 750 zł, 348 zamówień.</div></div></div>
  <div><div class="pl-card pl-card-muted"><div class="pl-card-body">Przychód 103 400 zł, 395 zamówień.</div></div></div>
</div>
```

## Nawigacja z wnętrza paneli

Element z atrybutem `data-pl-switcher-item` wewnątrz panelu przełącza na `next`, `previous` lub wskazany indeks. Tak zbudujesz kreator krok po kroku.

```html example
<ul class="pl-subnav pl-subnav-pill" data-pl-switcher="connect: #demo-switcher-wizard">
  <li class="pl-active"><a href="#">1. Konto</a></li>
  <li><a href="#">2. Zespół</a></li>
  <li><a href="#">3. Gotowe</a></li>
</ul>

<div class="pl-switcher" id="demo-switcher-wizard">
  <div>
    <p>Podaj nazwę firmy i adres e-mail administratora.</p>
    <button class="pl-button pl-button-primary pl-button-small" type="button" data-pl-switcher-item="next">Dalej</button>
  </div>
  <div>
    <p>Zaproś współpracowników — możesz to też zrobić później.</p>
    <button class="pl-button pl-button-small" type="button" data-pl-switcher-item="previous">Wstecz</button>
    <button class="pl-button pl-button-primary pl-button-small" type="button" data-pl-switcher-item="next">Dalej</button>
  </div>
  <div>
    <p>Wszystko gotowe. Twoja przestrzeń robocza czeka.</p>
    <button class="pl-button pl-button-small" type="button" data-pl-switcher-item="0">Zacznij od nowa</button>
  </div>
</div>
```

## Pozycja startowa i gesty

`active` ustawia indeks pozycji aktywnej na starcie (liczony od zera). Na ekranach dotykowych panele zmienia się przesunięciem palca w bok — wyłączysz to opcją `swiping: false`.

```html example
<ul class="pl-tab" data-pl-switcher="active: 1">
  <li><a href="#">Wczoraj</a></li>
  <li><a href="#">Dziś</a></li>
  <li><a href="#">Jutro</a></li>
</ul>
<div class="pl-switcher">
  <div>Wczoraj: przegląd sprintu i retrospektywa.</div>
  <div>Dziś: planowanie kwartału o 11:00, potem warsztat z klientem.</div>
  <div>Jutro: dzień bez spotkań.</div>
</div>
```

## Synchronizacja z adresem

Z opcją `follow-hash: true` aktywna pozycja trafia do adresu strony (`href` pozycji albo `id` panelu), a wejście z gotowym `#hash` otwiera właściwy panel.

```html
<ul class="pl-tab" data-pl-switcher="follow-hash: true">
  <li><a href="#opis">Opis</a></li>
  <li><a href="#opinie">Opinie</a></li>
</ul>
<div class="pl-switcher">
  <div id="opis">…</div>
  <div id="opinie">…</div>
</div>
```

## Wskaźnik aktywnej pozycji

Switcher zapisuje na swoim elemencie położenie i rozmiar aktywnej pozycji w zmiennych CSS `--pl-indicator-x`, `--pl-indicator-y`, `--pl-indicator-w`, `--pl-indicator-h` (w pikselach, względem elementu) i dodaje klasę `.pl-switcher-ready`. Zakładki i pigułki rysują z nich przesuwany wskaźnik; możesz wykorzystać je również we własnej nawigacji.

```html example
<div class="demo-switcher-own" data-pl-switcher>
  <button type="button" class="pl-active">Lista</button>
  <button type="button">Tablica</button>
  <button type="button">Kalendarz</button>
</div>
<div class="pl-switcher pl-margin-top">
  <div>Widok listy — zadania jedno pod drugim.</div>
  <div>Widok tablicy — kolumny ze statusami.</div>
  <div>Widok kalendarza — zadania według terminów.</div>
</div>
```

```css example-css
.demo-switcher-own {
  position: relative;
  display: inline-flex;
  padding: 4px;
  border-radius: var(--pl-radius-pill);
  background: var(--pl-muted-strong);
}
.demo-switcher-own::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: var(--pl-indicator-w, 0);
  height: var(--pl-indicator-h, 0);
  transform: translate(var(--pl-indicator-x, 0), var(--pl-indicator-y, 0));
  border-radius: inherit;
  background: var(--pl-surface);
  box-shadow: var(--pl-shadow-sm);
}
.demo-switcher-own.pl-switcher-ready::before {
  transition: transform var(--pl-dur-4) var(--pl-ease-spring), width var(--pl-dur-3) var(--pl-ease);
}
.demo-switcher-own > button {
  position: relative;
  padding: 0.4rem 1rem;
  border: 0;
  border-radius: inherit;
  background: none;
  font: inherit;
  font-size: var(--pl-text-sm);
  color: var(--pl-text-muted);
  cursor: pointer;
}
.demo-switcher-own > .pl-active {
  color: var(--pl-text);
}
```

## Sterowanie z JavaScript

```html example
<ul class="pl-tab" id="demo-switcher-js" data-pl-switcher>
  <li class="pl-active"><a href="#">Pierwsza</a></li>
  <li><a href="#">Druga</a></li>
  <li><a href="#">Trzecia</a></li>
</ul>
<div class="pl-switcher">
  <div>Treść pierwszej zakładki.</div>
  <div>Treść drugiej zakładki.</div>
  <div>Treść trzeciej zakładki.</div>
</div>
<p class="pl-margin-top">
  <button class="pl-button pl-button-small" id="demo-switcher-prev" type="button">Poprzednia</button>
  <button class="pl-button pl-button-small" id="demo-switcher-next" type="button">Następna</button>
  <small id="demo-switcher-log" style="margin-left: .5rem; color: var(--pl-text-muted)"></small>
</p>
```

```js example-js
const switcher = Plossy.switcher('#demo-switcher-js');

document.querySelector('#demo-switcher-prev').addEventListener('click', () => switcher.show('previous'));
document.querySelector('#demo-switcher-next').addEventListener('click', () => switcher.show('next'));

switcher.el.addEventListener('pl:show', (event) => {
  document.querySelector('#demo-switcher-log').textContent = `Aktywny indeks: ${event.detail.index}`;
});
```

## Dostępność

Komponent realizuje wzorzec zakładek ARIA: nawigacja dostaje `role="tablist"`, pozycje `role="tab"` z `aria-selected` i `aria-controls`, panele `role="tabpanel"` z `aria-labelledby`. W kolejności tabulacji jest tylko aktywna pozycja; między pozycjami przechodzisz strzałkami, <kbd>Home</kbd> i <kbd>End</kbd>.

## API

### Opcje

| Opcja | Typ | Domyślnie | Opis |
| --- | --- | --- | --- |
| `connect` | string | następny `.pl-switcher` | Selektor kontenera (kontenerów) paneli. |
| `toggle` | string | `> li` lub `> *` | Selektor pozycji nawigacji. |
| `active` | number | — | Indeks pozycji aktywnej na starcie. Bez niego decyduje klasa `.pl-active`, a w ostateczności pierwsza pozycja. |
| `animation` | boolean \| string | `true` | `true` — domyślne wejście; `false` — brak; klasa animacji albo `klasa-naprzód, klasa-wstecz`. |
| `swiping` | boolean | `true` | Zmiana panelu gestem przesunięcia. |
| `follow-hash` | boolean | `false` | Synchronizacja aktywnej pozycji z adresem strony. |

### Metody

| Metoda / właściwość | Opis |
| --- | --- |
| `show(index)` | Pokazuje panel o podanym indeksie; przyjmuje też `'next'` i `'previous'`. |
| `index` | Indeks aktywnej pozycji. |

### Zdarzenia

Wszystkie niosą `event.detail.index` i `event.detail.item`.

| Zdarzenie | Opis |
| --- | --- |
| `pl:beforeshow` | Przed zmianą. Można anulować przez `preventDefault()`. |
| `pl:hide` / `pl:hidden` | Dotychczasowy panel został ukryty. |
| `pl:show` | Nowy panel jest aktywny, rusza animacja. |
| `pl:shown` | Po zakończeniu animacji wejścia. |

### Klasy i zmienne

| Nazwa | Opis |
| --- | --- |
| `.pl-switcher` | Kontener paneli; widoczne jest tylko dziecko z `.pl-active`. |
| `.pl-active` | Aktywna pozycja i aktywny panel. |
| `.pl-switcher-ready` | Dodawana do nawigacji po pierwszym pomiarze wskaźnika. |
| `--pl-indicator-x`, `-y`, `-w`, `-h` | Położenie i rozmiar aktywnej pozycji (px). |
| `--pl-switcher-shift` | Dystans domyślnej animacji wejścia (na `.pl-switcher`, domyślnie `10px`). |
