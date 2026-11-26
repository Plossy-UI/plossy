---
title: Stepper
description: Wskaźnik kroków dla procesów wieloetapowych — zamówień, rejestracji, kreatorów. Numerowane znaczniki łączy linia, która wypełnia się wraz z postępem.
---

## Podstawowe użycie

Dodaj klasę `.pl-stepper` do listy `<ol>`. Każdy krok to `<li>` ze znacznikiem `.pl-stepper-marker` i treścią `.pl-stepper-content` (tytuł `.pl-stepper-title`, opcjonalny opis `.pl-stepper-description`). Pusty znacznik numeruje się sam. Stany ustawiasz klasami na `<li>`: `.pl-complete` (ukończony), `.pl-active` (bieżący).

```html example
<ol class="pl-stepper">
  <li class="pl-complete">
    <span class="pl-stepper-marker"></span>
    <div class="pl-stepper-content"><span class="pl-stepper-title">Koszyk</span></div>
  </li>
  <li class="pl-active" aria-current="step">
    <span class="pl-stepper-marker"></span>
    <div class="pl-stepper-content"><span class="pl-stepper-title">Dostawa</span></div>
  </li>
  <li>
    <span class="pl-stepper-marker"></span>
    <div class="pl-stepper-content"><span class="pl-stepper-title">Płatność</span></div>
  </li>
  <li>
    <span class="pl-stepper-marker"></span>
    <div class="pl-stepper-content"><span class="pl-stepper-title">Gotowe</span></div>
  </li>
</ol>
```

## Z opisami

```html example
<ol class="pl-stepper">
  <li class="pl-complete">
    <span class="pl-stepper-marker"></span>
    <div class="pl-stepper-content">
      <span class="pl-stepper-title">Konto</span>
      <span class="pl-stepper-description">E-mail i hasło</span>
    </div>
  </li>
  <li class="pl-active" aria-current="step">
    <span class="pl-stepper-marker"></span>
    <div class="pl-stepper-content">
      <span class="pl-stepper-title">Firma</span>
      <span class="pl-stepper-description">Dane do faktury</span>
    </div>
  </li>
  <li>
    <span class="pl-stepper-marker"></span>
    <div class="pl-stepper-content">
      <span class="pl-stepper-title">Zespół</span>
      <span class="pl-stepper-description">Zaproś współpracowników</span>
    </div>
  </li>
</ol>
```

## Etykiety pod znacznikami

`.pl-stepper-stacked` ustawia treść pod znacznikami i centruje ją — kroki mają wtedy równe szerokości.

```html example
<ol class="pl-stepper pl-stepper-stacked">
  <li class="pl-complete">
    <span class="pl-stepper-marker"></span>
    <div class="pl-stepper-content">
      <span class="pl-stepper-title">Zamówiono</span>
      <span class="pl-stepper-description">12 listopada</span>
    </div>
  </li>
  <li class="pl-complete">
    <span class="pl-stepper-marker"></span>
    <div class="pl-stepper-content">
      <span class="pl-stepper-title">Spakowano</span>
      <span class="pl-stepper-description">13 listopada</span>
    </div>
  </li>
  <li class="pl-active" aria-current="step">
    <span class="pl-stepper-marker"></span>
    <div class="pl-stepper-content">
      <span class="pl-stepper-title">W drodze</span>
      <span class="pl-stepper-description">Kurier odebrał paczkę</span>
    </div>
  </li>
  <li>
    <span class="pl-stepper-marker"></span>
    <div class="pl-stepper-content">
      <span class="pl-stepper-title">Doręczono</span>
      <span class="pl-stepper-description">Planowo 15 listopada</span>
    </div>
  </li>
</ol>
```

## Stan błędu

Klasa `.pl-error` oznacza krok wymagający poprawy — znacznik pokazuje wykrzyknik.

```html example
<ol class="pl-stepper">
  <li class="pl-complete">
    <span class="pl-stepper-marker"></span>
    <div class="pl-stepper-content"><span class="pl-stepper-title">Dane</span></div>
  </li>
  <li class="pl-error pl-active" aria-current="step">
    <span class="pl-stepper-marker"></span>
    <div class="pl-stepper-content">
      <span class="pl-stepper-title">Weryfikacja</span>
      <span class="pl-stepper-description">Nieczytelny skan dokumentu</span>
    </div>
  </li>
  <li>
    <span class="pl-stepper-marker"></span>
    <div class="pl-stepper-content"><span class="pl-stepper-title">Aktywacja</span></div>
  </li>
</ol>
```

## Ikony w znacznikach

Zamiast numeru możesz wstawić ikonę — wystarczy, że znacznik nie jest pusty.

```html example
<ol class="pl-stepper pl-stepper-stacked">
  <li class="pl-complete">
    <span class="pl-stepper-marker"><span data-pl-icon="user"></span></span>
    <div class="pl-stepper-content"><span class="pl-stepper-title">Profil</span></div>
  </li>
  <li class="pl-active" aria-current="step">
    <span class="pl-stepper-marker"><span data-pl-icon="credit-card"></span></span>
    <div class="pl-stepper-content"><span class="pl-stepper-title">Płatność</span></div>
  </li>
  <li>
    <span class="pl-stepper-marker"><span data-pl-icon="rocket"></span></span>
    <div class="pl-stepper-content"><span class="pl-stepper-title">Start</span></div>
  </li>
</ol>
```

## Układ pionowy

`.pl-stepper-vertical` układa kroki w kolumnie. Pod opisem zmieścisz dodatkową treść w `.pl-stepper-body` — na przykład przyciski bieżącego kroku.

```html example narrow
<ol class="pl-stepper pl-stepper-vertical">
  <li class="pl-complete">
    <span class="pl-stepper-marker"></span>
    <div class="pl-stepper-content">
      <span class="pl-stepper-title">Utwórz repozytorium</span>
      <span class="pl-stepper-description">Połączono z kontem GitHub.</span>
    </div>
  </li>
  <li class="pl-active" aria-current="step">
    <span class="pl-stepper-marker"></span>
    <div class="pl-stepper-content">
      <span class="pl-stepper-title">Skonfiguruj środowisko</span>
      <span class="pl-stepper-description">Dodaj zmienne i wybierz region serwera.</span>
      <div class="pl-stepper-body">
        <button class="pl-button pl-button-primary pl-button-small" type="button">Dalej</button>
        <button class="pl-button pl-button-ghost pl-button-small" type="button">Wstecz</button>
      </div>
    </div>
  </li>
  <li>
    <span class="pl-stepper-marker"></span>
    <div class="pl-stepper-content">
      <span class="pl-stepper-title">Pierwsze wdrożenie</span>
      <span class="pl-stepper-description">Zajmie około dwóch minut.</span>
    </div>
  </li>
</ol>
```

## Kropki

`.pl-stepper-dots` to wersja kompaktowa: małe kropki bez numerów. Działa w każdym układzie.

```html example column
<ol class="pl-stepper pl-stepper-dots">
  <li class="pl-complete">
    <span class="pl-stepper-marker"></span>
    <div class="pl-stepper-content"><span class="pl-stepper-title">Szkic</span></div>
  </li>
  <li class="pl-complete">
    <span class="pl-stepper-marker"></span>
    <div class="pl-stepper-content"><span class="pl-stepper-title">Recenzja</span></div>
  </li>
  <li class="pl-active" aria-current="step">
    <span class="pl-stepper-marker"></span>
    <div class="pl-stepper-content"><span class="pl-stepper-title">Korekta</span></div>
  </li>
  <li>
    <span class="pl-stepper-marker"></span>
    <div class="pl-stepper-content"><span class="pl-stepper-title">Publikacja</span></div>
  </li>
</ol>
<ol class="pl-stepper pl-stepper-dots pl-stepper-stacked">
  <li class="pl-complete">
    <span class="pl-stepper-marker"></span>
    <div class="pl-stepper-content"><span class="pl-stepper-title">Szkic</span></div>
  </li>
  <li class="pl-complete">
    <span class="pl-stepper-marker"></span>
    <div class="pl-stepper-content"><span class="pl-stepper-title">Recenzja</span></div>
  </li>
  <li class="pl-active" aria-current="step">
    <span class="pl-stepper-marker"></span>
    <div class="pl-stepper-content"><span class="pl-stepper-title">Korekta</span></div>
  </li>
  <li>
    <span class="pl-stepper-marker"></span>
    <div class="pl-stepper-content"><span class="pl-stepper-title">Publikacja</span></div>
  </li>
</ol>
```

Jako oś czasu w układzie pionowym:

```html example narrow
<ol class="pl-stepper pl-stepper-dots pl-stepper-vertical">
  <li class="pl-complete">
    <span class="pl-stepper-marker"></span>
    <div class="pl-stepper-content">
      <span class="pl-stepper-title">Zgłoszenie przyjęte</span>
      <span class="pl-stepper-description">Dziś, 9:14</span>
    </div>
  </li>
  <li class="pl-complete">
    <span class="pl-stepper-marker"></span>
    <div class="pl-stepper-content">
      <span class="pl-stepper-title">Przypisano do Oli</span>
      <span class="pl-stepper-description">Dziś, 9:32</span>
    </div>
  </li>
  <li class="pl-active">
    <span class="pl-stepper-marker"></span>
    <div class="pl-stepper-content">
      <span class="pl-stepper-title">W trakcie analizy</span>
      <span class="pl-stepper-description">Odpowiemy w ciągu godziny</span>
    </div>
  </li>
</ol>
```

## Klikalne kroki

Zawartość kroku możesz owinąć linkiem lub przyciskiem — wtedy użytkownik wraca do wcześniejszych etapów. Poniżej stan zmienia kilka linijek JavaScript; linia łącznika wypełnia się płynnie.

```html example
<ol class="pl-stepper" id="demo-stepper">
  <li class="pl-complete">
    <button type="button">
      <span class="pl-stepper-marker"></span>
      <span class="pl-stepper-content"><span class="pl-stepper-title">Plan</span></span>
    </button>
  </li>
  <li class="pl-active">
    <button type="button">
      <span class="pl-stepper-marker"></span>
      <span class="pl-stepper-content"><span class="pl-stepper-title">Dodatki</span></span>
    </button>
  </li>
  <li>
    <button type="button">
      <span class="pl-stepper-marker"></span>
      <span class="pl-stepper-content"><span class="pl-stepper-title">Podsumowanie</span></span>
    </button>
  </li>
  <li>
    <button type="button">
      <span class="pl-stepper-marker"></span>
      <span class="pl-stepper-content"><span class="pl-stepper-title">Płatność</span></span>
    </button>
  </li>
</ol>
```

```js example-js
const stepper = document.querySelector('#demo-stepper');
const steps = [...stepper.children];

stepper.addEventListener('click', (event) => {
  const step = event.target.closest('li');
  if (!step) return;
  const current = steps.indexOf(step);
  steps.forEach((item, index) => {
    item.classList.toggle('pl-complete', index < current);
    item.classList.toggle('pl-active', index === current);
  });
});
```

## Rozmiary i kolory

`.pl-stepper-small` i `.pl-stepper-large` skalują znaczniki; `.pl-stepper-success` i `.pl-stepper-ink` zmieniają kolor postępu.

```html example column
<ol class="pl-stepper pl-stepper-small pl-stepper-ink">
  <li class="pl-complete">
    <span class="pl-stepper-marker"></span>
    <div class="pl-stepper-content"><span class="pl-stepper-title">Import</span></div>
  </li>
  <li class="pl-active">
    <span class="pl-stepper-marker"></span>
    <div class="pl-stepper-content"><span class="pl-stepper-title">Mapowanie pól</span></div>
  </li>
  <li>
    <span class="pl-stepper-marker"></span>
    <div class="pl-stepper-content"><span class="pl-stepper-title">Podgląd</span></div>
  </li>
</ol>
<ol class="pl-stepper pl-stepper-large pl-stepper-success">
  <li class="pl-complete">
    <span class="pl-stepper-marker"></span>
    <div class="pl-stepper-content">
      <span class="pl-stepper-title">Zgłoszenie</span>
      <span class="pl-stepper-description">Wysłane</span>
    </div>
  </li>
  <li class="pl-complete">
    <span class="pl-stepper-marker"></span>
    <div class="pl-stepper-content">
      <span class="pl-stepper-title">Rozmowa</span>
      <span class="pl-stepper-description">Zakończona</span>
    </div>
  </li>
  <li class="pl-active">
    <span class="pl-stepper-marker"></span>
    <div class="pl-stepper-content">
      <span class="pl-stepper-title">Oferta</span>
      <span class="pl-stepper-description">Czeka na podpis</span>
    </div>
  </li>
</ol>
```

## API

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-stepper` | Lista kroków (`<ol>`), układ poziomy. |
| `.pl-stepper-marker` | Znacznik kroku; pusty numeruje się sam. |
| `.pl-stepper-content` | Pojemnik na tytuł i opis. |
| `.pl-stepper-title` | Tytuł kroku. |
| `.pl-stepper-description` | Opis kroku. |
| `.pl-stepper-body` | Dodatkowa treść kroku. |
| `.pl-stepper-stacked` | Treść pod znacznikami, wyśrodkowana. |
| `.pl-stepper-vertical` | Układ pionowy. |
| `.pl-stepper-dots` | Wariant kompaktowy z kropkami. |
| `.pl-stepper-small` / `.pl-stepper-large` | Rozmiar. |
| `.pl-stepper-success` / `.pl-stepper-ink` | Kolor postępu. |
| `.pl-active` | Bieżący krok (na `<li>`). |
| `.pl-complete` | Krok ukończony — wypełnia łącznik do następnego. |
| `.pl-error` | Krok z błędem. |
| `.pl-disabled` | Krok niedostępny. |

### Zmienne CSS

| Zmienna | Domyślnie | Opis |
| --- | --- | --- |
| `--pl-stepper-size` | `2rem` | Średnica znacznika. |
| `--pl-stepper-gap` | `0.75rem` | Odstęp między znacznikiem, treścią i łącznikiem. |
| `--pl-stepper-line` | `2px` | Grubość łącznika. |
| `--pl-stepper-color` | `--pl-primary` | Kolor postępu. |
