---
title: Walidacja
description: Stany błędu i sukcesu, komunikaty pod polami, natywna walidacja w samym CSS oraz pomocnik JavaScript z polskimi komunikatami i potrząśnięciem błędnych pól.
badge: JS
order: 7
---

## Stany i komunikaty

Klasa `.pl-form-danger` lub `.pl-form-success` na kontrolce zmienia kolor ramki i poświaty fokusu. Komunikat pod polem to `.pl-form-help` z modyfikatorem `-danger`, `-success` lub `-warning`. Dla czytników ekranu dodaj `aria-invalid` i powiąż komunikat przez `aria-describedby`.

```html example column narrow
<div class="pl-width-1-1 pl-form-field">
  <label class="pl-form-label" for="demo-v-email">E-mail</label>
  <input class="pl-input pl-form-danger" id="demo-v-email" type="email" value="anna@example" aria-invalid="true" aria-describedby="demo-v-email-msg">
  <p class="pl-form-help pl-form-help-danger" id="demo-v-email-msg"><span data-pl-icon="circle-alert"></span>Podaj pełny adres, np. anna@example.com.</p>
</div>
<div class="pl-width-1-1 pl-form-field">
  <label class="pl-form-label" for="demo-v-user">Nazwa użytkownika</label>
  <input class="pl-input pl-form-success" id="demo-v-user" type="text" value="anna.kowalska">
  <p class="pl-form-help pl-form-help-success"><span data-pl-icon="circle-check"></span>Nazwa jest dostępna.</p>
</div>
<div class="pl-width-1-1 pl-form-field">
  <label class="pl-form-label" for="demo-v-pass">Hasło</label>
  <input class="pl-input pl-form-warning" id="demo-v-pass" type="password" value="haslo123">
  <p class="pl-form-help pl-form-help-warning"><span data-pl-icon="triangle-alert"></span>To hasło jest łatwe do odgadnięcia.</p>
</div>
```

## Inne kontrolki

Stany działają na wszystkich kontrolkach: select, textarea, checkbox, radio, a także na opakowaniu `.pl-form-affix`.

```html example column narrow
<select class="pl-select pl-form-danger" aria-label="Województwo" aria-invalid="true">
  <option value="" selected disabled>Wybierz województwo…</option>
  <option>Małopolskie</option>
  <option>Mazowieckie</option>
</select>
<textarea class="pl-textarea pl-form-danger" rows="2" aria-label="Opis" aria-invalid="true">Za krótko</textarea>
<div class="pl-width-1-1">
  <label class="pl-form-check">
    <input class="pl-checkbox pl-form-danger" type="checkbox" aria-invalid="true">
    Akceptuję regulamin sklepu
  </label>
  <p class="pl-form-help pl-form-help-danger">Zgoda jest wymagana do złożenia zamówienia.</p>
</div>
<div class="pl-form-affix pl-form-danger">
  <input class="pl-input" type="text" value="150" aria-label="Rabat" aria-invalid="true">
  <span class="pl-form-suffix">%</span>
</div>
```

## Walidacja natywna (sam CSS)

Klasa `.pl-form-validate` na formularzu włącza style oparte na pseudoklasach `:user-invalid` / `:user-valid` — pole jest oceniane dopiero po interakcji użytkownika. Komunikat `.pl-form-feedback` pozostaje ukryty, dopóki pole w tym samym `.pl-form-field` nie jest błędne. Przeglądarka pokazuje też własne dymki przy próbie wysłania.

```html example narrow
<form class="pl-form-validate" id="demo-native">
  <div class="pl-form-field">
    <label class="pl-form-label pl-form-required" for="demo-n-email">E-mail</label>
    <input class="pl-input" id="demo-n-email" type="email" placeholder="anna@example.com" required>
    <p class="pl-form-feedback">Podaj poprawny adres e-mail.</p>
  </div>
  <div class="pl-form-field">
    <label class="pl-form-label pl-form-required" for="demo-n-zip">Kod pocztowy</label>
    <input class="pl-input pl-form-width-small" id="demo-n-zip" type="text" placeholder="00-000" pattern="[0-9]{2}-[0-9]{3}" required>
    <p class="pl-form-feedback">Wpisz kod w formacie 00-000.</p>
  </div>
  <div class="pl-form-actions">
    <button class="pl-button pl-button-primary" type="submit">Sprawdź</button>
  </div>
</form>
```

```js example-js
document.querySelector('#demo-native').addEventListener('submit', (event) => {
  event.preventDefault();
  Plossy.notification({ message: 'Formularz jest poprawny.', status: 'success' });
});
```

## Walidacja z JavaScriptem

Atrybut `data-pl-form-validate` na formularzu wyłącza dymki przeglądarki i zastępuje je komunikatami pod polami — po polsku, na podstawie natywnych atrybutów (`required`, `type`, `minlength`, `pattern`, `min`, `max`…). Pole jest sprawdzane po opuszczeniu, a błąd znika od razu po poprawieniu. Przy próbie wysłania błędne pola potrząsają się, a fokus trafia do pierwszego z nich.

```html example narrow
<form data-pl-form-validate id="demo-js-form">
  <div class="pl-form-field">
    <label class="pl-form-label pl-form-required" for="demo-j-name">Imię i nazwisko</label>
    <input class="pl-input" id="demo-j-name" type="text" required minlength="3" autocomplete="name">
  </div>
  <div class="pl-form-field">
    <label class="pl-form-label pl-form-required" for="demo-j-email">E-mail</label>
    <div class="pl-form-icon">
      <span data-pl-icon="mail"></span>
      <input class="pl-input" id="demo-j-email" type="email" required autocomplete="email">
    </div>
  </div>
  <div class="pl-form-field">
    <label class="pl-form-label pl-form-required" for="demo-j-zip">Kod pocztowy</label>
    <input class="pl-input pl-form-width-small" id="demo-j-zip" type="text" required pattern="[0-9]{2}-[0-9]{3}" placeholder="00-000" data-pl-message-pattern="Wpisz kod w formacie 00-000.">
  </div>
  <div class="pl-form-field">
    <label class="pl-form-label pl-form-required" for="demo-j-topic">Temat</label>
    <select class="pl-select" id="demo-j-topic" required>
      <option value="" selected disabled>Wybierz temat…</option>
      <option>Wycena projektu</option>
      <option>Współpraca</option>
      <option>Wsparcie techniczne</option>
    </select>
  </div>
  <div class="pl-form-field">
    <label class="pl-form-label" for="demo-j-seats">Liczba osób w zespole</label>
    <input class="pl-input pl-form-width-small" id="demo-j-seats" type="number" min="1" max="50" value="5">
  </div>
  <div class="pl-form-field">
    <span class="pl-form-label pl-form-required" id="demo-j-contact">Preferowany kontakt</span>
    <div class="pl-form-checks pl-form-checks-inline" role="radiogroup" aria-labelledby="demo-j-contact">
      <label class="pl-form-check"><input class="pl-radio" type="radio" name="demo-j-contact" value="mail" required> E-mail</label>
      <label class="pl-form-check"><input class="pl-radio" type="radio" name="demo-j-contact" value="phone"> Telefon</label>
    </div>
  </div>
  <div class="pl-form-field">
    <label class="pl-form-check">
      <input class="pl-checkbox" type="checkbox" required data-pl-message-required="Bez tej zgody nie możemy odpowiedzieć.">
      Zgadzam się na kontakt w sprawie zapytania
    </label>
  </div>
  <div class="pl-form-actions">
    <button class="pl-button pl-button-primary" type="submit">Wyślij zapytanie</button>
    <button class="pl-button pl-button-ghost" type="reset">Wyczyść</button>
  </div>
</form>
```

```js example-js
const form = document.querySelector('#demo-js-form');
form.addEventListener('pl:valid', (event) => {
  event.detail.originalEvent.preventDefault(); // w demo niczego nie wysyłamy
  Plossy.notification({ message: 'Dziękujemy! Zapytanie zostało wysłane.', status: 'success' });
});
form.addEventListener('pl:invalid', (event) => {
  Plossy.notification({ message: `Popraw zaznaczone pola (${event.detail.fields.length}).`, status: 'danger' });
});
```

## Oznaczanie poprawnych pól

Opcja `success: true` dodaje `.pl-form-success` do pól, które przeszły walidację.

```html example narrow
<form data-pl-form-validate="success: true">
  <div class="pl-form-field">
    <label class="pl-form-label" for="demo-s-login">Login</label>
    <input class="pl-input" id="demo-s-login" type="text" required minlength="4" value="anna">
    <p class="pl-form-help">Co najmniej 4 znaki. Kliknij w pole i wyjdź z niego.</p>
  </div>
  <div class="pl-form-field">
    <label class="pl-form-label" for="demo-s-www">Strona WWW</label>
    <input class="pl-input" id="demo-s-www" type="url" value="plossy.app">
  </div>
  <div class="pl-form-actions">
    <button class="pl-button pl-button-primary" type="submit">Zapisz</button>
  </div>
</form>
```

## Własne reguły

Niestandardowe reguły dodasz natywnym `setCustomValidity()` — komunikat zostanie pokazany tak jak pozostałe. Po zmianie wywołaj `validateField()`.

```html example narrow
<form data-pl-form-validate id="demo-custom">
  <div class="pl-form-field">
    <label class="pl-form-label" for="demo-c-pass">Nowe hasło</label>
    <input class="pl-input" id="demo-c-pass" type="password" required minlength="8" autocomplete="new-password">
  </div>
  <div class="pl-form-field">
    <label class="pl-form-label" for="demo-c-repeat">Powtórz hasło</label>
    <input class="pl-input" id="demo-c-repeat" type="password" required autocomplete="new-password">
  </div>
  <div class="pl-form-actions">
    <button class="pl-button pl-button-primary" type="submit">Zmień hasło</button>
  </div>
</form>
```

```js example-js
const customForm = document.querySelector('#demo-custom');
const pass = customForm.querySelector('#demo-c-pass');
const repeat = customForm.querySelector('#demo-c-repeat');
const check = () => {
  repeat.setCustomValidity(repeat.value && repeat.value !== pass.value ? 'Hasła nie są takie same.' : '');
  if (repeat.value) Plossy.formValidate(customForm).validateField(repeat);
};
pass.addEventListener('input', check);
repeat.addEventListener('input', check);
customForm.addEventListener('pl:valid', (event) => event.detail.originalEvent.preventDefault());
```

## Potrząśnięcie

Klasa `.pl-form-shake` odtwarza krótką animację potrząśnięcia — możesz jej użyć samodzielnie, np. po błędnym logowaniu.

```html example row
<input class="pl-input pl-form-width-medium" id="demo-shake" type="password" value="zlehaslo" aria-label="Hasło">
<button class="pl-button" type="button" id="demo-shake-btn">Potrząśnij</button>
```

```js example-js
document.querySelector('#demo-shake-btn').addEventListener('click', () => {
  const input = document.querySelector('#demo-shake');
  input.classList.remove('pl-form-shake');
  void input.offsetWidth;
  input.classList.add('pl-form-shake', 'pl-form-danger');
});
```

## API

### Opcje

`data-pl-form-validate`

| Opcja | Typ | Domyślnie | Opis |
| --- | --- | --- | --- |
| `live` | boolean | `true` | Sprawdza pole po jego opuszczeniu i przy zmianie wartości. |
| `success` | boolean | `false` | Oznacza poprawne pola klasą `.pl-form-success`. |
| `shake` | boolean | `true` | Potrząsa błędnymi polami przy próbie wysłania. |
| `focus` | boolean | `true` | Przenosi fokus do pierwszego błędnego pola. |

Atrybuty pól:

| Atrybut | Opis |
| --- | --- |
| `data-pl-message-required` | Własny komunikat dla pustego pola wymaganego. |
| `data-pl-message-type` | …dla błędnego formatu (`email`, `url`, liczba). |
| `data-pl-message-pattern` | …dla niezgodności z `pattern` (zamiast niego zadziała też `title`). |
| `data-pl-message-minlength` / `-maxlength` | …dla zbyt krótkiej / długiej wartości. |
| `data-pl-message-min` / `-max` / `-step` | …dla wartości spoza zakresu lub kroku. |
| `data-pl-novalidate` | Pomija pole. |

### Metody

| Metoda | Opis |
| --- | --- |
| `validate()` | Sprawdza cały formularz; zwraca `true`, gdy jest poprawny. |
| `validateField(pole)` | Sprawdza jedno pole (element lub selektor). |
| `reset()` | Usuwa oznaczenia i komunikaty. |

### Zdarzenia

| Zdarzenie | Opis |
| --- | --- |
| `pl:valid` | Formularz jest poprawny i zostanie wysłany. `detail.originalEvent` to zdarzenie `submit` (można je anulować). |
| `pl:invalid` | Wysyłka zatrzymana; `detail.fields` zawiera błędne pola. |

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-form-danger` `.pl-form-success` | Stan kontrolki (także `.pl-form-warning`, `-info`). |
| `.pl-form-help-danger` `-success` `-warning` | Kolor komunikatu pod polem. |
| `.pl-form-validate` | Na `<form>`: style natywnej walidacji (`:user-invalid`, `:user-valid`). |
| `.pl-form-feedback` | Komunikat widoczny tylko przy błędnym polu. |
| `.pl-form-shake` | Animacja potrząśnięcia. |
| `.pl-form-required` | Gwiazdka przy etykiecie pola wymaganego. |
