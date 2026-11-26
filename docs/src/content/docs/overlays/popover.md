---
title: Popover
description: Karta ze strzałką przypięta do elementu — na dłuższe wyjaśnienia, mini-profile i szybkie potwierdzenia. Otwierana kliknięciem, najechaniem lub fokusem.
badge: JS
---

## Podstawowe użycie

Dodaj do elementu atrybut `data-pl-popover` z opcjami `title` i `content`. Popover otwiera się kliknięciem, a zamyka ponownym kliknięciem, kliknięciem poza nim lub klawiszem <kbd>Esc</kbd>.

```html example center
<button class="pl-button pl-button-primary" type="button" data-pl-popover="title: Automatyczny zapis; content: Zmiany zapisujemy co 30 sekund. Historię wersji znajdziesz w menu dokumentu.">Kliknij mnie</button>
<button class="pl-button" type="button" data-pl-popover="Sama treść, bez tytułu — wystarczy wpisać ją jako wartość atrybutu.">Tylko treść</button>
```

## Pozycja

Opcja `pos` działa jak w pozostałych nakładkach: strona (`top`, `bottom`, `left`, `right`) i opcjonalne wyrównanie (`-start`, `-end`). Przy braku miejsca popover przeskakuje na przeciwną stronę; strzałka zawsze celuje w środek elementu.

```html example center
<button class="pl-button" type="button" data-pl-popover="title: Na górze; content: Domyślna pozycja popovera.; pos: top">top</button>
<button class="pl-button" type="button" data-pl-popover="title: Po prawej; content: Dobre miejsce przy listach i tabelach.; pos: right">right</button>
<button class="pl-button" type="button" data-pl-popover="title: Na dole; content: Sprawdza się pod nagłówkami i paskami narzędzi.; pos: bottom">bottom</button>
<button class="pl-button" type="button" data-pl-popover="title: Po lewej; content: Przydatne przy prawej krawędzi ekranu.; pos: left">left</button>
<button class="pl-button" type="button" data-pl-popover="title: Do początku; content: Krawędź popovera równa się z początkiem przycisku.; pos: bottom-start">bottom-start</button>
<button class="pl-button" type="button" data-pl-popover="title: Do końca; content: Krawędź popovera równa się z końcem przycisku.; pos: top-end">top-end</button>
```

## Tryby wyzwalania

`mode: hover` otwiera popover po najechaniu (kursor można przenieść na kartę), `mode: focus` — po sfokusowaniu, co dobrze sprawdza się przy polach formularza.

```html example center
<button class="pl-button" type="button" data-pl-popover="title: Tryb click; content: Domyślny — otwieranie i zamykanie kliknięciem.">Click</button>
<button class="pl-button" type="button" data-pl-popover="title: Tryb hover; content: Otwiera się po najechaniu i po sfokusowaniu klawiaturą.; mode: hover">Hover</button>
<input class="pl-input" type="password" placeholder="Nowe hasło" style="width: 14rem" aria-label="Nowe hasło"
  data-pl-popover="title: Wymagania; content: Co najmniej 12 znaków, jedna cyfra i jeden znak specjalny.; mode: focus; pos: bottom-start">
```

## Przycisk zamykania

Opcja `close: true` dodaje przycisk zamykania. Z `dismiss: false` popover nie zamyka się po kliknięciu poza nim — zostaje do czasu świadomego zamknięcia.

```html example center
<button class="pl-button" type="button" data-pl-popover="title: Wskazówka; content: Przeciągnij kartę, aby zmienić kolejność zadań na tablicy.; close: true">Z przyciskiem zamykania</button>
<button class="pl-button" type="button" data-pl-popover="title: Zostaję na miejscu; content: Zamknie mnie tylko przycisk, klawisz Esc albo ponowne kliknięcie.; close: true; dismiss: false; pos: bottom">Bez zamykania kliknięciem obok</button>
```

## Treść z elementu

Opcja `target` wskazuje element, który staje się treścią popovera — może więc zawierać dowolny HTML. Ukryj go atrybutem `hidden`; elementy z `data-pl-popover-close` zamykają popover.

### Mini-profil

```html example center
<a href="#" data-pl-popover="target: #demo-popover-profile; pos: bottom; mode: hover">@marta.wisniewska</a>

<div id="demo-popover-profile" hidden>
  <div class="pl-flex pl-flex-middle" style="gap: .75rem">
    <span class="pl-avatar pl-avatar-large"><img src="/img/avatar-2.svg" alt=""></span>
    <div>
      <div class="pl-popover-title">Marta Wiśniewska</div>
      <div>Projektantka produktu · Gdańsk</div>
    </div>
  </div>
  <p class="pl-margin-small-top">Prowadzi system projektowy i dba o to, żeby każdy komponent miał swoje miejsce.</p>
  <p style="color: var(--pl-text)"><strong>128</strong> projektów · <strong>2,4 tys.</strong> obserwujących</p>
  <div class="pl-popover-footer">
    <button class="pl-button pl-button-small" type="button">Wiadomość</button>
    <button class="pl-button pl-button-small pl-button-primary" type="button">Obserwuj</button>
  </div>
</div>
```

### Potwierdzenie akcji

Gdy popover zawiera elementy interaktywne, fokus przenosi się do niego po otwarciu, a po zamknięciu wraca na przycisk.

```html example center
<button class="pl-button pl-button-danger pl-button-soft" type="button" data-pl-popover="target: #demo-popover-confirm; title: Usunąć projekt?; pos: top">
  <span data-pl-icon="trash-2"></span> Usuń projekt
</button>

<div id="demo-popover-confirm" hidden>
  <p>Projekt „Strona główna 2026" i wszystkie jego pliki zostaną trwale usunięte.</p>
  <div class="pl-popover-footer">
    <button class="pl-button pl-button-small pl-button-ghost" type="button" data-pl-popover-close>Anuluj</button>
    <button class="pl-button pl-button-small pl-button-danger" id="demo-popover-confirm-yes" type="button" data-pl-popover-close>Usuń</button>
  </div>
</div>
```

```js example-js
document.querySelector('#demo-popover-confirm-yes').addEventListener('click', () => {
  Plossy.notification({ message: 'Projekt został usunięty', status: 'danger' });
});
```

### Formularz

```html example center
<button class="pl-button" type="button" data-pl-popover="target: #demo-popover-form; title: Udostępnij dokument; pos: bottom; close: true; cls: pl-popover-large">
  <span data-pl-icon="share-2"></span> Udostępnij
</button>

<div id="demo-popover-form" hidden>
  <label class="pl-form-label" for="demo-popover-email">Adres e-mail</label>
  <div class="pl-flex" style="gap: .5rem">
    <input class="pl-input" id="demo-popover-email" type="email" placeholder="jan@firma.pl">
    <button class="pl-button pl-button-primary" type="button" data-pl-popover-close>Zaproś</button>
  </div>
  <p class="pl-margin-small-top">Zaproszona osoba dostanie dostęp tylko do odczytu.</p>
</div>
```

## Warianty

Opcja `cls` dodaje klasy do popovera: rozmiary `.pl-popover-small` / `.pl-popover-large`, szerokość do treści `.pl-popover-auto` oraz odwróconą powierzchnię `.pl-popover-ink`.

```html example center
<button class="pl-button" type="button" data-pl-popover="content: Zwięzła podpowiedź w małej karcie.; cls: pl-popover-small">Mały</button>
<button class="pl-button" type="button" data-pl-popover="title: Duży popover; content: Szersza karta z większymi odstępami pomieści kilka zdań wyjaśnienia, listę albo prosty formularz — bez wrażenia ścisku.; cls: pl-popover-large">Duży</button>
<button class="pl-button" type="button" data-pl-popover="content: Tyle, ile trzeba; cls: pl-popover-auto">Auto</button>
<button class="pl-button pl-button-secondary" type="button" data-pl-popover="title: Nowość; content: Tablice można teraz udostępniać publicznym linkiem.; cls: pl-popover-ink; pos: bottom">Atramentowy</button>
```

## HTML w treści

Z opcją `html: true` wartości `title` i `content` są wstawiane jako HTML (tylko dla zaufanych danych). Złożone wartości najwygodniej zapisać w formacie JSON.

```html example center
<button class="pl-button" type="button" data-pl-popover='{"title": "Skróty klawiszowe", "content": "<kbd>Ctrl K</kbd> — paleta poleceń<br><kbd>Ctrl /</kbd> — lista skrótów", "html": true, "pos": "right"}'>Skróty</button>
```

## Sterowanie z JavaScript

Instancję pobierzesz przez `Plossy.popover(element, opcje)`. Metoda `update()` zmienia opcje i odświeża otwarty popover.

```html example center
<button class="pl-button" id="demo-popover-api" type="button">Stan synchronizacji</button>
<button class="pl-button pl-button-ghost" id="demo-popover-api-update" type="button">Zmień treść</button>
```

```js example-js
const popover = Plossy.popover('#demo-popover-api', {
  title: 'Synchronizacja',
  content: 'Wszystkie zmiany są zapisane.',
  pos: 'bottom',
  dismiss: false,
});

let count = 0;
document.querySelector('#demo-popover-api-update').addEventListener('click', () => {
  count += 1;
  popover.update({ content: `Zsynchronizowano ${count} ${count === 1 ? 'raz' : 'razy'}.` });
  popover.show();
});
```

## API

### Opcje

Sama treść: `data-pl-popover="Tekst"`. Z opcjami: `data-pl-popover="title: Tytuł; content: Treść; pos: right"`.

| Opcja | Typ | Domyślnie | Opis |
| --- | --- | --- | --- |
| `title` | string | `''` | Tytuł w nagłówku. |
| `content` | string | `''` | Treść popovera. |
| `target` | string | `null` | Selektor elementu używanego jako treść. |
| `pos` | string | `top` | Strona i wyrównanie: `top\|bottom\|left\|right` + `-start\|-end`. |
| `mode` | string | `click` | `click`, `hover` lub `focus`. |
| `offset` | number | `12` | Odstęp od elementu w px. |
| `close` | boolean | `false` | Dodaje przycisk zamykania. |
| `dismiss` | boolean | `true` | Zamyka po kliknięciu poza popoverem. |
| `html` | boolean | `false` | Wstawia `title` i `content` jako HTML. |
| `cls` | string | `''` | Dodatkowe klasy popovera. |
| `delay-show` | number | `80` | Opóźnienie otwarcia w trybie hover (ms). |
| `delay-hide` | number | `200` | Opóźnienie zamknięcia w trybie hover (ms). |
| `focus` | boolean | `true` | Przenosi fokus do popovera z elementami interaktywnymi. |

### Metody

| Metoda | Opis |
| --- | --- |
| `show()` | Otwiera popover. |
| `hide()` | Zamyka popover. |
| `toggle()` | Przełącza stan. |
| `update(options)` | Zmienia opcje i odświeża treść. |

### Zdarzenia

| Zdarzenie | Opis |
| --- | --- |
| `pl:beforeshow` | Przed otwarciem. Można anulować przez `preventDefault()`. |
| `pl:show` | Popover został pokazany, startuje animacja. |
| `pl:shown` | Po zakończeniu animacji wejścia. |
| `pl:beforehide` | Przed zamknięciem. Można anulować. |
| `pl:hide` | Startuje animacja wyjścia. |
| `pl:hidden` | Popover został ukryty. |

Zdarzenia są wysyłane na elemencie wyzwalającym.

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-popover` | Karta popovera (tworzona przez JS). |
| `.pl-popover-header`, `.pl-popover-title` | Nagłówek i tytuł. |
| `.pl-popover-body` | Treść. |
| `.pl-popover-footer` | Wiersz przycisków wyrównany do prawej. |
| `.pl-popover-small`, `.pl-popover-large` | Rozmiary (`13rem` / `24rem`; domyślnie `18rem`). |
| `.pl-popover-auto` | Szerokość dopasowana do treści. |
| `.pl-popover-flush` | Treść bez wewnętrznych odstępów. |
| `.pl-popover-ink` | Odwrócona, „atramentowa" powierzchnia. |
| `.pl-open` | Ustawiana na elemencie wyzwalającym, gdy popover jest otwarty. |

Atrybut `data-pl-popover-close` na elemencie wewnątrz treści zamyka popover po kliknięciu.
