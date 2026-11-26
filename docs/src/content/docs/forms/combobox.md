---
title: Combobox
description: Pole wyboru z wyszukiwaniem — ulepsza natywny select (także wielokrotny, ze znacznikami), podpowiada w polu tekstowym i potrafi pobierać wyniki asynchronicznie.
badge: JS
---

## Podstawowe użycie

Dodaj `data-pl-combobox` do zwykłego `<select>`. Element pozostaje w formularzu (wysyła wartość, reaguje na `required` i `<label for>`), a komponent zastępuje go polem z filtrowaną listą. Opcja z pustą wartością staje się tekstem zastępczym.

```html example narrow tall
<div class="pl-form-field">
  <label class="pl-form-label" for="demo-combo-city">Miasto dostawy</label>
  <select class="pl-select" id="demo-combo-city" name="miasto" data-pl-combobox>
    <option value="">Wybierz miasto…</option>
    <option value="bialystok">Białystok</option>
    <option value="bydgoszcz">Bydgoszcz</option>
    <option value="gdansk">Gdańsk</option>
    <option value="gdynia">Gdynia</option>
    <option value="katowice">Katowice</option>
    <option value="krakow" selected>Kraków</option>
    <option value="lublin">Lublin</option>
    <option value="lodz">Łódź</option>
    <option value="poznan">Poznań</option>
    <option value="rzeszow">Rzeszów</option>
    <option value="szczecin">Szczecin</option>
    <option value="warszawa">Warszawa</option>
    <option value="wroclaw">Wrocław</option>
  </select>
</div>
```

Wyszukiwanie ignoruje wielkość liter i polskie znaki — „lodz" znajdzie „Łódź". Klawiatura: <kbd>↓</kbd> <kbd>↑</kbd> poruszają się po liście, <kbd>Home</kbd> / <kbd>End</kbd> skaczą na początek i koniec, <kbd>Enter</kbd> wybiera, <kbd>Esc</kbd> zamyka.

## Grupy i pozycje wyłączone

Elementy `<optgroup>` stają się nagłówkami grup, a atrybut `disabled` wyłącza pozycję (klawiatura ją pomija).

```html example narrow tall
<select class="pl-select" aria-label="Plan abonamentu" data-pl-combobox>
  <optgroup label="Dla osób prywatnych">
    <option value="free">Darmowy</option>
    <option value="plus" selected>Plus — 19 zł / mies.</option>
    <option value="family">Rodzinny — 39 zł / mies.</option>
  </optgroup>
  <optgroup label="Dla firm">
    <option value="team">Zespół — 99 zł / mies.</option>
    <option value="business">Biznes — 249 zł / mies.</option>
    <option value="enterprise" disabled>Korporacja (wkrótce)</option>
  </optgroup>
</select>
```

## Wybór wielokrotny

Dla `<select multiple>` wybrane pozycje pojawiają się w polu jako znaczniki. Lista zostaje otwarta po wyborze, <kbd>Backspace</kbd> w pustym polu usuwa ostatni znacznik.

```html example narrow tall
<div class="pl-form-field">
  <label class="pl-form-label" for="demo-combo-skills">Technologie w projekcie</label>
  <select class="pl-select" id="demo-combo-skills" name="technologie[]" multiple data-pl-combobox="placeholder: Dodaj technologię…">
    <option selected>Astro</option>
    <option>Django</option>
    <option>Laravel</option>
    <option>Next.js</option>
    <option selected>PostgreSQL</option>
    <option>Redis</option>
    <option>Sass</option>
    <option>Svelte</option>
    <option selected>TypeScript</option>
    <option>Vue</option>
  </select>
  <span class="pl-form-help">Możesz wybrać dowolną liczbę pozycji.</span>
</div>
```

## Czyszczenie wyboru

`clearable: true` dodaje przycisk czyszczenia (działa też <kbd>Esc</kbd> przy zamkniętej liście).

```html example narrow tall
<select class="pl-select" aria-label="Opiekun zgłoszenia" data-pl-combobox="clearable: true">
  <option value="">Nie przypisano</option>
  <option value="1" selected>Marta Wiśniewska</option>
  <option value="2">Tomasz Zieliński</option>
  <option value="3">Agnieszka Nowak</option>
  <option value="4">Paweł Kamiński</option>
</select>
```

## Pozycje z ikoną, zdjęciem i opisem

Atrybuty `data-icon`, `data-image` i `data-description` na elementach `<option>` wzbogacają pozycje listy. Opis także jest przeszukiwany.

```html example tall
<div class="pl-grid pl-child-width-1-2@s">
  <div>
    <select class="pl-select" aria-label="Sposób dostawy" data-pl-combobox>
      <option value="kurier" data-icon="truck" data-description="1–2 dni robocze · 14,99 zł" selected>Kurier</option>
      <option value="paczkomat" data-icon="package" data-description="Odbiór 24/7 · 11,99 zł">Automat paczkowy</option>
      <option value="sklep" data-icon="store" data-description="Gotowe w 2 godziny · bezpłatnie">Odbiór w sklepie</option>
      <option value="zagranica" data-icon="globe" data-description="Niedostępne dla tego zamówienia" disabled>Wysyłka zagraniczna</option>
    </select>
  </div>
  <div>
    <select class="pl-select" aria-label="Osoba" data-pl-combobox="clearable: true">
      <option value="">Przypisz osobę…</option>
      <option value="1" data-image="/img/avatar-1.svg" data-description="Projektantka produktu">Julia Maj</option>
      <option value="2" data-image="/img/avatar-2.svg" data-description="Programista frontend">Kacper Lis</option>
      <option value="3" data-image="/img/avatar-3.svg" data-description="Analityczka danych">Ewa Sowa</option>
      <option value="4" data-image="/img/avatar-4.svg" data-description="Kierownik projektu">Adam Wilk</option>
    </select>
  </div>
</div>
```

## Tworzenie własnych pozycji

Z `creatable: true` wpisany tekst, którego nie ma na liście, można dodać jako nową pozycję — przydatne dla etykiet i tagów.

```html example narrow tall
<div class="pl-form-field">
  <label class="pl-form-label" for="demo-combo-tags">Etykiety wpisu</label>
  <select class="pl-select" id="demo-combo-tags" multiple data-pl-combobox="creatable: true; placeholder: Wpisz etykietę…">
    <option selected>poradnik</option>
    <option>recenzja</option>
    <option>nowości</option>
    <option>wywiad</option>
    <option>za kulisami</option>
  </select>
  <span class="pl-form-help">Wpisz np. „podcast” i naciśnij Enter.</span>
</div>
```

## Pole tekstowe z podpowiedziami

Na elemencie `<input>` komponent działa jak autouzupełnianie: użytkownik może wpisać dowolny tekst, a lista (z `<datalist>` lub opcji `options`) tylko podpowiada.

```html example tall
<div class="pl-grid pl-child-width-1-2@s">
  <div class="pl-form-field">
    <label class="pl-form-label" for="demo-combo-job">Stanowisko</label>
    <input class="pl-input" id="demo-combo-job" name="stanowisko" list="demo-combo-jobs" placeholder="np. Projektant UX" data-pl-combobox>
    <datalist id="demo-combo-jobs">
      <option value="Analityk danych"></option>
      <option value="Inżynier DevOps"></option>
      <option value="Kierownik produktu"></option>
      <option value="Programista backend"></option>
      <option value="Programista frontend"></option>
      <option value="Projektant UX"></option>
      <option value="Tester oprogramowania"></option>
    </datalist>
  </div>
  <div class="pl-form-field">
    <label class="pl-form-label" for="demo-combo-domain">Domena e-mail</label>
    <input class="pl-input" id="demo-combo-domain" placeholder="twojafirma.pl" data-pl-combobox="options: gmail.com, outlook.com, wp.pl, onet.pl, interia.pl, proton.me; clearable: true">
  </div>
</div>
```

## Bez wyszukiwania

`search: false` zamienia pole w zwykłą listę rozwijaną z własnym wyglądem. Wpisanie pierwszych liter przenosi do pasującej pozycji (typeahead), spacja otwiera listę.

```html example narrow tall
<select class="pl-select" aria-label="Sortowanie" data-pl-combobox="search: false">
  <option value="popular" selected>Najpopularniejsze</option>
  <option value="new">Najnowsze</option>
  <option value="cheap">Cena: od najniższej</option>
  <option value="expensive">Cena: od najwyższej</option>
  <option value="rating">Najlepiej oceniane</option>
</select>
```

## Rozmiary i stany

Klasy `.pl-form-small`, `.pl-form-large`, `.pl-form-danger` i `.pl-form-success` nadane elementowi źródłowemu przechodzą na kontrolkę. Atrybut `disabled` wyłącza pole.

```html example tall
<div class="pl-grid pl-child-width-1-3@m">
  <div>
    <select class="pl-select pl-form-small" aria-label="Mały" data-pl-combobox>
      <option>Mały rozmiar</option><option>Druga pozycja</option><option>Trzecia pozycja</option>
    </select>
  </div>
  <div>
    <select class="pl-select" aria-label="Domyślny" data-pl-combobox>
      <option>Domyślny rozmiar</option><option>Druga pozycja</option><option>Trzecia pozycja</option>
    </select>
  </div>
  <div>
    <select class="pl-select pl-form-large" aria-label="Duży" data-pl-combobox>
      <option>Duży rozmiar</option><option>Druga pozycja</option><option>Trzecia pozycja</option>
    </select>
  </div>
  <div>
    <select class="pl-select pl-form-danger" aria-label="Błąd" data-pl-combobox>
      <option value="">Wybierz kraj — pole wymagane</option><option>Polska</option><option>Czechy</option>
    </select>
  </div>
  <div>
    <select class="pl-select pl-form-success" aria-label="Poprawne" data-pl-combobox>
      <option>Polska</option><option>Czechy</option>
    </select>
  </div>
  <div>
    <select class="pl-select" aria-label="Wyłączone" disabled data-pl-combobox>
      <option>Pole wyłączone</option>
    </select>
  </div>
</div>
```

## Źródło asynchroniczne

Przekaż funkcję `source` — dostaje wpisany tekst i zwraca (asynchronicznie) tablicę napisów lub obiektów `{ value, label, group, description, icon, image, disabled }`. Zapytania są opóźniane (`delay`), nieaktualne odpowiedzi — pomijane, a w polu kręci się wskaźnik ładowania. `source` może też być adresem URL: komponent doklei do niego zapytanie i oczekuje JSON-a.

```html example narrow tall
<div class="pl-form-field">
  <label class="pl-form-label" for="demo-combo-async">Szukaj książki</label>
  <select class="pl-select" id="demo-combo-async" name="ksiazka">
    <option value="">Wpisz tytuł lub autora…</option>
  </select>
  <span class="pl-form-help">Spróbuj: „lem”, „pan”, „tokarczuk”.</span>
</div>
```

```js example-js
const books = [
  { value: 'solaris', label: 'Solaris', description: 'Stanisław Lem · 1961' },
  { value: 'cyberiada', label: 'Cyberiada', description: 'Stanisław Lem · 1965' },
  { value: 'lalka', label: 'Lalka', description: 'Bolesław Prus · 1890' },
  { value: 'pan-tadeusz', label: 'Pan Tadeusz', description: 'Adam Mickiewicz · 1834' },
  { value: 'pan-wolodyjowski', label: 'Pan Wołodyjowski', description: 'Henryk Sienkiewicz · 1888' },
  { value: 'bieguni', label: 'Bieguni', description: 'Olga Tokarczuk · 2007' },
  { value: 'ksiegi-jakubowe', label: 'Księgi Jakubowe', description: 'Olga Tokarczuk · 2014' },
  { value: 'ferdydurke', label: 'Ferdydurke', description: 'Witold Gombrowicz · 1937' },
  { value: 'wesele', label: 'Wesele', description: 'Stanisław Wyspiański · 1901' },
];

Plossy.combobox('#demo-combo-async', {
  clearable: true,
  minLength: 2,
  // Symulacja zapytania do API (600 ms).
  source: (query) =>
    new Promise((resolve) => {
      const q = query.toLowerCase();
      setTimeout(() => resolve(books.filter((b) => `${b.label} ${b.description}`.toLowerCase().includes(q))), 600);
    }),
});
```

## Zdarzenia i metody

Komponent wysyła `pl:change` (oraz natywne `change` na elemencie źródłowym). Instancję pobierzesz przez `Plossy.combobox(element)`.

```html example narrow tall
<select class="pl-select" id="demo-combo-api" aria-label="Waluta" data-pl-combobox="clearable: true">
  <option value="">Wybierz walutę…</option>
  <option value="PLN">Złoty polski (PLN)</option>
  <option value="EUR">Euro (EUR)</option>
  <option value="USD">Dolar amerykański (USD)</option>
  <option value="CHF">Frank szwajcarski (CHF)</option>
  <option value="GBP">Funt brytyjski (GBP)</option>
</select>
<p class="pl-margin-small-top">
  <button class="pl-button pl-button-small" type="button" id="demo-combo-set">Ustaw EUR</button>
  <button class="pl-button pl-button-small" type="button" id="demo-combo-open">Otwórz listę</button>
  <button class="pl-button pl-button-small" type="button" id="demo-combo-clear">Wyczyść</button>
</p>
<p class="pl-text-muted" id="demo-combo-log">Wartość: —</p>
```

```js example-js
const select = document.querySelector('#demo-combo-api');
const combo = Plossy.combobox(select);
const log = document.querySelector('#demo-combo-log');

select.addEventListener('pl:change', (event) => {
  log.textContent = `Wartość: ${event.detail.value || '—'}`;
});
document.querySelector('#demo-combo-set').addEventListener('click', () => combo.setValue('EUR'));
document.querySelector('#demo-combo-open').addEventListener('click', () => { combo.input.focus(); combo.open(); });
document.querySelector('#demo-combo-clear').addEventListener('click', () => combo.clear());
```

## API

### Opcje

Opcje przekazujesz w atrybucie: `data-pl-combobox="clearable: true; placeholder: Szukaj…"` lub w JS: `Plossy.combobox(el, { … })`.

| Opcja | Typ | Domyślnie | Opis |
| --- | --- | --- | --- |
| `placeholder` | string | `''` | Tekst zastępczy (domyślnie z atrybutu `placeholder` lub pustej opcji). |
| `clearable` | boolean | `false` | Przycisk czyszczenia wyboru. |
| `creatable` | boolean | `false` | Pozwala dodać wpisany tekst jako nową pozycję. |
| `search` | boolean | `true` | Filtrowanie przez wpisywanie; `false` = lista z typeahead. |
| `highlight` | boolean | `true` | Wyróżnia dopasowany fragment nazwy. |
| `close-on-select` | boolean | auto | Zamyka listę po wyborze (domyślnie `true` dla pojedynczego wyboru, `false` dla `multiple`). |
| `options` | array / string | `null` | Lista pozycji; w atrybucie — napisy rozdzielone przecinkami. |
| `source` | function / string | `null` | Źródło asynchroniczne: `async (q) => [...]` lub adres URL, do którego doklejane jest zapytanie. |
| `min-length` | number | `0` | Minimalna długość zapytania dla `source`. |
| `delay` | number | `220` | Opóźnienie zapytań do `source` (ms). |
| `placement` | string | `'bottom-start'` | Położenie listy; odwraca się, gdy brakuje miejsca. |
| `offset` | number | `6` | Odstęp listy od pola (px). |
| `empty-text` | string | `'Brak wyników'` | Tekst pustej listy. |
| `loading-text` | string | `'Szukam…'` | Tekst podczas ładowania. |
| `create-text` | string | `'Dodaj'` | Etykieta pozycji tworzenia. |

### Metody

| Metoda | Opis |
| --- | --- |
| `open()` | Otwiera listę. |
| `close()` | Zamyka listę. |
| `toggle()` | Przełącza listę. |
| `setValue(wartość)` | Ustawia wybór — napis lub tablica wartości dla `multiple`. |
| `clear()` | Czyści wybór. |
| `value` | Getter — wartość (napis) lub tablica wartości (`multiple`). |
| `setOptions(lista)` | Podmienia pozycje listy. |
| `refresh()` | Ponownie wczytuje pozycje z `<select>` (po zmianie jego opcji). |

### Zdarzenia

| Zdarzenie | Opis |
| --- | --- |
| `pl:change` | Zmiana wartości. `detail.value`, `detail.item` (ostatnio kliknięta pozycja), `detail.items` (wybrane). |
| `pl:beforeopen` | Przed otwarciem listy; można anulować. |
| `pl:open` | Lista otwarta. |
| `pl:close` | Lista zamknięta. |
| `pl:create` | Utworzono nową pozycję (`creatable`). `detail.item`. |
| `pl:error` | Błąd źródła asynchronicznego. `detail.error`. |

### Klasy

Struktura jest generowana przez JS — klasy przydają się do własnych stylów.

| Klasa | Opis |
| --- | --- |
| `.pl-combobox` | Opakowanie; `.pl-open` gdy lista otwarta, `.pl-combobox-multiple`, `.pl-combobox-loading`. |
| `.pl-combobox-control` | Kontrolka (ramka pola). |
| `.pl-combobox-input` | Pole tekstowe (`role="combobox"`). |
| `.pl-combobox-chip` | Znacznik wybranej pozycji (`multiple`). |
| `.pl-combobox-clear` | Przycisk czyszczenia. |
| `.pl-combobox-list` | Pływająca lista (`role="listbox"`). |
| `.pl-combobox-group`, `.pl-combobox-group-label` | Grupa pozycji i jej nagłówek. |
| `.pl-combobox-option` | Pozycja; `.pl-active` — wskazana, `aria-selected="true"` — wybrana, `.pl-disabled`. |
| `.pl-combobox-empty` | Pusty stan / ładowanie. |
