---
title: Alert
description: Komunikaty kontekstowe z ikoną, tytułem i akcjami. Zamykają się płynnie — najpierw zanikają, potem zwijają wysokość, a sąsiednie elementy miękko się dosuwają.
badge: JS
---

## Podstawowe użycie

Klasa `.pl-alert` tworzy neutralny komunikat. Treść umieść w `.pl-alert-body`. Aby alert dało się zamknąć, dodaj atrybut `data-pl-alert` i przycisk `.pl-close` z klasą `.pl-alert-close`.

```html example
<div class="pl-alert" data-pl-alert>
  <div class="pl-alert-body">Zmiany w dokumencie zapisują się automatycznie co 30 sekund.</div>
  <button class="pl-close pl-alert-close" type="button" aria-label="Zamknij"></button>
</div>
```

## Tony

Domyślnie alert ma miękkie, zabarwione tło. Ton wybierasz modyfikatorem `.pl-alert-primary`, `-secondary`, `-success`, `-warning`, `-danger` lub `-info`.

```html example
<div class="pl-alert pl-alert-primary">
  <div class="pl-alert-body">Od dziś możesz udostępniać tablice osobom spoza zespołu.</div>
</div>
<div class="pl-alert pl-alert-secondary">
  <div class="pl-alert-body">Pracujesz w trybie offline — zmiany zsynchronizujemy po powrocie sieci.</div>
</div>
<div class="pl-alert pl-alert-success">
  <div class="pl-alert-body">Płatność została zaksięgowana. Fakturę wysłaliśmy na Twój adres e-mail.</div>
</div>
<div class="pl-alert pl-alert-warning">
  <div class="pl-alert-body">Okres próbny kończy się za 3 dni. <a href="#">Wybierz plan</a>, aby nie stracić dostępu.</div>
</div>
<div class="pl-alert pl-alert-danger">
  <div class="pl-alert-body">Nie udało się połączyć z serwerem. Sprawdź połączenie i spróbuj ponownie.</div>
</div>
<div class="pl-alert pl-alert-info">
  <div class="pl-alert-body">Przerwa techniczna zaplanowana jest na sobotę między 2:00 a 4:00.</div>
</div>
```

## Ikona i tytuł

Ikonę wstaw w `.pl-alert-icon` przed treścią, a nagłówek oznacz klasą `.pl-alert-title`. Dodatkowa klasa `.pl-alert-icon-box` umieszcza ikonę na zabarwionym kafelku.

```html example
<div class="pl-alert pl-alert-success" data-pl-alert>
  <span class="pl-alert-icon"><span data-pl-icon="circle-check"></span></span>
  <div class="pl-alert-body">
    <h4 class="pl-alert-title">Zamówienie przyjęte</h4>
    <p>Paczka nr 48 213 wyruszy do Ciebie jutro przed południem.</p>
  </div>
  <button class="pl-close pl-alert-close" type="button" aria-label="Zamknij"></button>
</div>

<div class="pl-alert pl-alert-danger" data-pl-alert>
  <span class="pl-alert-icon pl-alert-icon-box"><span data-pl-icon="triangle-alert"></span></span>
  <div class="pl-alert-body">
    <h4 class="pl-alert-title">Karta została odrzucona</h4>
    <p>Bank nie potwierdził transakcji. Użyj innej karty albo skontaktuj się ze swoim bankiem.</p>
  </div>
  <button class="pl-close pl-alert-close" type="button" aria-label="Zamknij"></button>
</div>
```

## Akcje

Przyciski umieść w `.pl-alert-actions`. Wewnątrz `.pl-alert-body` ustawią się pod treścią, a jako bezpośrednie dziecko alertu — po prawej stronie, w jednej linii z tekstem.

```html example
<div class="pl-alert pl-alert-warning">
  <span class="pl-alert-icon"><span data-pl-icon="cloud-upload"></span></span>
  <div class="pl-alert-body">
    <h4 class="pl-alert-title">Kończy się miejsce na dysku</h4>
    <p>Wykorzystujesz 9,2 GB z 10 GB. Po przekroczeniu limitu nowe pliki nie będą zapisywane.</p>
    <div class="pl-alert-actions">
      <button class="pl-button pl-button-small pl-button-warning" type="button">Zwiększ limit</button>
      <button class="pl-button pl-button-small pl-button-ghost pl-button-warning" type="button">Uporządkuj pliki</button>
    </div>
  </div>
</div>

<div class="pl-alert pl-alert-primary">
  <span class="pl-alert-icon"><span data-pl-icon="sparkles"></span></span>
  <div class="pl-alert-body">Dostępna jest aktualizacja do wersji 4.2.</div>
  <div class="pl-alert-actions">
    <button class="pl-button pl-button-small pl-button-primary" type="button">Zainstaluj</button>
  </div>
</div>
```

## Style

### Pełne wypełnienie

`.pl-alert-solid` wypełnia alert kolorem tonu — dla komunikatów, których nie wolno przeoczyć.

```html example
<div class="pl-alert pl-alert-solid pl-alert-primary" data-pl-alert>
  <span class="pl-alert-icon"><span data-pl-icon="rocket"></span></span>
  <div class="pl-alert-body">Wdrożenie na produkcję zakończyło się powodzeniem.</div>
  <button class="pl-close pl-alert-close" type="button" aria-label="Zamknij"></button>
</div>
<div class="pl-alert pl-alert-solid pl-alert-secondary" data-pl-alert>
  <span class="pl-alert-icon"><span data-pl-icon="moon"></span></span>
  <div class="pl-alert-body">Tryb skupienia jest włączony — powiadomienia wyciszone do 16:00.</div>
  <button class="pl-close pl-alert-close" type="button" aria-label="Zamknij"></button>
</div>
<div class="pl-alert pl-alert-solid pl-alert-danger" data-pl-alert>
  <span class="pl-alert-icon"><span data-pl-icon="octagon-alert"></span></span>
  <div class="pl-alert-body">Usunięcie projektu jest nieodwracalne. <a href="#">Dowiedz się więcej</a></div>
  <button class="pl-close pl-alert-close" type="button" aria-label="Zamknij"></button>
</div>
```

### Kontur

`.pl-alert-outline` zostawia samo obramowanie w kolorze tonu.

```html example
<div class="pl-alert pl-alert-outline pl-alert-success">
  <span class="pl-alert-icon"><span data-pl-icon="shield-check"></span></span>
  <div class="pl-alert-body">Weryfikacja dwuetapowa jest aktywna na tym koncie.</div>
</div>
<div class="pl-alert pl-alert-outline pl-alert-info">
  <span class="pl-alert-icon"><span data-pl-icon="info"></span></span>
  <div class="pl-alert-body">Eksport większych zestawów danych może potrwać kilka minut.</div>
</div>
```

### Pasek akcentu

`.pl-alert-accent` to jasna karta z kolorowym paskiem po lewej stronie — spokojniejsza, dobra do treści wewnątrz formularzy i paneli.

```html example
<div class="pl-alert pl-alert-accent pl-alert-primary" data-pl-alert>
  <div class="pl-alert-body">
    <h4 class="pl-alert-title">Wskazówka</h4>
    <p>Naciśnij <kbd>Ctrl</kbd> + <kbd>K</kbd>, aby szybko przejść do dowolnego projektu.</p>
  </div>
  <button class="pl-close pl-alert-close" type="button" aria-label="Zamknij"></button>
</div>
<div class="pl-alert pl-alert-accent pl-alert-warning">
  <span class="pl-alert-icon"><span data-pl-icon="clock"></span></span>
  <div class="pl-alert-body">Sesja wygaśnie za 5 minut z powodu braku aktywności.</div>
</div>
```

### Iskra

`.pl-alert-spark` dodaje w rogu pulsującą, limonkową kropkę — drobny znak, że to coś nowego.

```html example
<div class="pl-alert pl-alert-accent pl-alert-spark" data-pl-alert>
  <span class="pl-alert-icon pl-alert-icon-box"><span data-pl-icon="wand-sparkles"></span></span>
  <div class="pl-alert-body">
    <h4 class="pl-alert-title">Nowość: automatyczne podsumowania</h4>
    <p>Długie wątki streszczamy teraz jednym kliknięciem. Wypróbuj w dowolnej dyskusji.</p>
  </div>
  <button class="pl-close pl-alert-close" type="button" aria-label="Zamknij"></button>
</div>
```

## Rozmiary

`.pl-alert-small` sprawdza się w ciasnych panelach, `.pl-alert-large` — jako wyeksponowany blok na stronie.

```html example
<div class="pl-alert pl-alert-small pl-alert-info" data-pl-alert>
  <span class="pl-alert-icon"><span data-pl-icon="info"></span></span>
  <div class="pl-alert-body">Pole jest opcjonalne.</div>
  <button class="pl-close pl-alert-close" type="button" aria-label="Zamknij"></button>
</div>
<div class="pl-alert pl-alert-large pl-alert-primary">
  <span class="pl-alert-icon pl-alert-icon-box"><span data-pl-icon="gift"></span></span>
  <div class="pl-alert-body">
    <h4 class="pl-alert-title">Dwa miesiące w prezencie</h4>
    <p>Przejdź na rozliczenie roczne do końca miesiąca, a dwa miesiące dostaniesz od nas gratis.</p>
  </div>
</div>
```

## Baner

`.pl-alert-banner` rozciąga komunikat na całą szerokość, bez zaokrągleń — na górę strony lub sekcji.

```html example flush
<div class="pl-alert pl-alert-banner pl-alert-solid pl-alert-secondary" data-pl-alert>
  <div class="pl-alert-body">Darmowa dostawa od 199 zł — tylko do niedzieli. <a href="#">Zobacz ofertę</a></div>
  <button class="pl-close pl-alert-close" type="button" aria-label="Zamknij"></button>
</div>
```

## Automatyczne zamykanie

Opcja `timeout` zamyka alert po podanym czasie. Najechanie kursorem lub fokus wstrzymują odliczanie. Klasa `.pl-alert-enter` dodaje sprężyste wejście nowo wstawionym alertom.

```html example
<button class="pl-button" id="demo-alert-add" type="button">
  <span data-pl-icon="plus"></span> Pokaż komunikat
</button>
<div id="demo-alert-stack" style="margin-top: 1rem"></div>
```

```js example-js
const stack = document.querySelector('#demo-alert-stack');

document.querySelector('#demo-alert-add').addEventListener('click', () => {
  stack.insertAdjacentHTML(
    'afterbegin',
    `<div class="pl-alert pl-alert-success pl-alert-enter" data-pl-alert="timeout: 4000">
      <span class="pl-alert-icon"><span data-pl-icon="check"></span></span>
      <div class="pl-alert-body">Zapisano o ${new Date().toLocaleTimeString('pl-PL')}. Zniknę za 4 sekundy.</div>
      <button class="pl-close pl-alert-close" type="button" aria-label="Zamknij"></button>
    </div>`,
  );
});
```

## Sterowanie z JavaScript

Instancję pobierzesz przez `Plossy.alert(element)`. Zdarzenie `pl:beforehide` można anulować — na przykład po to, by poprosić o potwierdzenie. Z opcją `remove: false` alert zostaje w DOM jako `hidden` i można go przywrócić.

```html example
<div class="pl-alert pl-alert-accent pl-alert-danger" id="demo-alert" data-pl-alert="remove: false">
  <span class="pl-alert-icon"><span data-pl-icon="trash-2"></span></span>
  <div class="pl-alert-body">Masz 3 niezapisane szkice. Zamknięcie tego komunikatu wymaga potwierdzenia.</div>
  <button class="pl-close pl-alert-close" type="button" aria-label="Zamknij"></button>
</div>
<p style="margin-top: 1rem">
  <button class="pl-button pl-button-small" id="demo-alert-close" type="button">Zamknij z kodu</button>
  <button class="pl-button pl-button-small" id="demo-alert-restore" type="button">Przywróć</button>
  <small id="demo-alert-log" style="margin-left: .5rem; color: var(--pl-text-muted)"></small>
</p>
```

```js example-js
const alert = Plossy.alert('#demo-alert');
const log = document.querySelector('#demo-alert-log');

alert.el.addEventListener('pl:beforehide', (event) => {
  if (!confirm('Na pewno zamknąć komunikat?')) event.preventDefault();
});
alert.el.addEventListener('pl:hidden', () => (log.textContent = 'Zdarzenie: pl:hidden'));

document.querySelector('#demo-alert-close').addEventListener('click', () => alert.close());
document.querySelector('#demo-alert-restore').addEventListener('click', () => {
  alert.el.hidden = false;
  log.textContent = '';
});
```

## Dostępność

Komponent sam nadaje atrybut `role`: `alert` dla tonów `danger` i `warning` (czytniki ekranu odczytują je natychmiast) oraz `status` dla pozostałych. Jeśli ustawisz `role` samodzielnie, nie zostanie nadpisany. Alerty bez `data-pl-alert` są zwykłym HTML-em — dodaj `role` ręcznie, gdy komunikat pojawia się dynamicznie.

## API

### Opcje

Opcje przekazujesz w atrybucie: `data-pl-alert="timeout: 5000; duration: 200"`.

| Opcja | Typ | Domyślnie | Opis |
| --- | --- | --- | --- |
| `duration` | number | `320` | Czas animacji zamykania w milisekundach. |
| `timeout` | number | `0` | Automatyczne zamknięcie po czasie (ms). `0` wyłącza. |
| `remove` | boolean | `true` | Usuwa element z DOM po zamknięciu; `false` ustawia tylko `hidden`. |
| `sel-close` | string | `.pl-alert-close` | Selektor przycisku zamykającego. |

### Metody

| Metoda | Opis |
| --- | --- |
| `close()` | Zamyka alert z animacją. Zwraca `Promise`. |
| `hide()` | Alias `close()`. |

### Zdarzenia

| Zdarzenie | Opis |
| --- | --- |
| `pl:beforehide` | Przed zamknięciem. Można anulować przez `preventDefault()`. |
| `pl:hide` | Rozpoczęcie animacji zamykania. |
| `pl:hidden` | Po zakończeniu animacji, tuż przed usunięciem z DOM. |

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-alert` | Kontener komunikatu. |
| `.pl-alert-primary` … `.pl-alert-info` | Ton: `primary`, `secondary`, `success`, `warning`, `danger`, `info`. |
| `.pl-alert-solid` | Pełne wypełnienie kolorem tonu. |
| `.pl-alert-outline` | Samo obramowanie. |
| `.pl-alert-accent` | Jasna karta z paskiem akcentu. |
| `.pl-alert-spark` | Pulsująca limonkowa kropka w rogu. |
| `.pl-alert-icon` | Miejsce na ikonę; z `.pl-alert-icon-box` — na kafelku. |
| `.pl-alert-body` | Treść. |
| `.pl-alert-title` | Tytuł. |
| `.pl-alert-actions` | Przyciski akcji. |
| `.pl-alert-close` | Przycisk zamykający (razem z `.pl-close`). |
| `.pl-alert-small`, `.pl-alert-large` | Rozmiary. |
| `.pl-alert-banner` | Baner na całą szerokość. |
| `.pl-alert-enter` | Animacja wejścia. |
