---
title: Notification
description: Powiadomienia (toasty) układane w stos — ze statusem, akcją, paskiem pozostałego czasu, pauzą po najechaniu i zamykaniem przez przeciągnięcie.
badge: JS
---

## Podstawowe użycie

Wywołaj `Plossy.notification()` z tekstem albo obiektem opcji. Powiadomienie pojawia się w prawym górnym rogu i znika po 4 sekundach; najechanie kursorem wstrzymuje odliczanie, a przeciągnięcie w bok zamyka je od razu.

```html example center
<button class="pl-button pl-button-primary" id="demo-notification-basic" type="button">Pokaż powiadomienie</button>
<button class="pl-button" id="demo-notification-title" type="button">Z tytułem</button>
```

```js example-js
document.querySelector('#demo-notification-basic').addEventListener('click', () => {
  Plossy.notification('Zmiany zostały zapisane');
});

document.querySelector('#demo-notification-title').addEventListener('click', () => {
  Plossy.notification({
    title: 'Nowa wiadomość',
    message: 'Ola Kowalczyk skomentowała Twój projekt „Strona główna".',
    icon: 'message-circle',
  });
});
```

## Wyzwalacz deklaratywny

Bez pisania kodu: atrybut `data-pl-notification` na przycisku pokazuje powiadomienie po kliknięciu.

```html example center
<button class="pl-button" type="button" data-pl-notification="Skopiowano do schowka">Sam tekst</button>
<button class="pl-button" type="button" data-pl-notification="message: Zapisano; status: success">Ze statusem</button>
<button class="pl-button" type="button" data-pl-notification="title: Brak połączenia; message: Sprawdź sieć i spróbuj ponownie.; status: danger; pos: bottom-center">Z tytułem, na dole</button>
```

## Statusy

Opcja `status` nadaje kolor znaczeniowy i domyślną ikonę. Statusy `warning` i `danger` są ogłaszane przez czytniki ekranu natychmiast (`role="alert"`), pozostałe — grzecznie (`role="status"`).

```html example center
<button class="pl-button" type="button" data-pl-notification="message: Powiadomienie neutralne">Neutralne</button>
<button class="pl-button pl-button-primary" type="button" data-pl-notification="message: Dostępna jest nowa wersja aplikacji; status: primary">Primary</button>
<button class="pl-button pl-button-success" type="button" data-pl-notification="message: Płatność została przyjęta; status: success">Success</button>
<button class="pl-button pl-button-warning" type="button" data-pl-notification="message: Kończy się miejsce na dysku; status: warning">Warning</button>
<button class="pl-button pl-button-danger" type="button" data-pl-notification="message: Nie udało się wysłać pliku; status: danger">Danger</button>
<button class="pl-button pl-button-info" type="button" data-pl-notification="message: Przerwa techniczna w sobotę o 22:00; status: info">Info</button>
```

### Wariant wypełniony

Klasa `pl-notification-solid` (opcja `cls`) wypełnia powiadomienie kolorem statusu; bez statusu daje ciemną, „atramentową" kartę.

```html example center
<button class="pl-button" type="button" data-pl-notification="message: Wysłano 3 zaproszenia; cls: pl-notification-solid; icon: send">Atramentowe</button>
<button class="pl-button pl-button-success pl-button-soft" type="button" data-pl-notification="title: Gotowe; message: Kopia zapasowa została utworzona.; status: success; cls: pl-notification-solid">Solid success</button>
<button class="pl-button pl-button-danger pl-button-soft" type="button" data-pl-notification="title: Błąd serwera; message: Spróbuj ponownie za chwilę.; status: danger; cls: pl-notification-solid">Solid danger</button>
```

## Pozycje

Sześć pozycji; każda ma własny stos. U góry najnowsze powiadomienie ląduje na górze, na dole — na dole, zawsze najbliżej krawędzi ekranu.

```html example
<div class="pl-grid pl-grid-small pl-child-width-1-3" style="max-width: 34rem; margin-inline: auto">
  <div><button class="pl-button pl-button-small pl-button-block" type="button" data-pl-notification="message: Lewy górny róg; pos: top-left">top-left</button></div>
  <div><button class="pl-button pl-button-small pl-button-block" type="button" data-pl-notification="message: Góra, na środku; pos: top-center">top-center</button></div>
  <div><button class="pl-button pl-button-small pl-button-block" type="button" data-pl-notification="message: Prawy górny róg; pos: top-right">top-right</button></div>
  <div><button class="pl-button pl-button-small pl-button-block" type="button" data-pl-notification="message: Lewy dolny róg; pos: bottom-left">bottom-left</button></div>
  <div><button class="pl-button pl-button-small pl-button-block" type="button" data-pl-notification="message: Dół, na środku; pos: bottom-center">bottom-center</button></div>
  <div><button class="pl-button pl-button-small pl-button-block" type="button" data-pl-notification="message: Prawy dolny róg; pos: bottom-right">bottom-right</button></div>
</div>
```

## Czas wyświetlania

`timeout` to czas w milisekundach; cienki pasek pokazuje, ile go zostało. Wartość `0` tworzy powiadomienie „przyklejone", które zamknie dopiero użytkownik lub kod. `progress: false` ukrywa pasek.

```html example center
<button class="pl-button" type="button" data-pl-notification="message: Zniknę po 1,5 sekundy; timeout: 1500">1,5 sekundy</button>
<button class="pl-button" type="button" data-pl-notification="message: Mam czas — 10 sekund. Najedź, aby wstrzymać odliczanie.; timeout: 10000; status: info">10 sekund</button>
<button class="pl-button" type="button" data-pl-notification="title: Wymagana aktualizacja; message: Zamknij mnie przyciskiem lub przeciągnięciem.; timeout: 0; status: warning">Przyklejone</button>
<button class="pl-button" type="button" data-pl-notification="message: Bez paska postępu; progress: false">Bez paska</button>
```

## Akcja

Opcja `action` dodaje przycisk, np. „Cofnij". Funkcja `onClick` dostaje obiekt powiadomienia; po kliknięciu powiadomienie zamyka się (chyba że funkcja zwróci `false`).

```html example center
<button class="pl-button" id="demo-notification-undo" type="button"><span data-pl-icon="trash-2"></span> Usuń wiadomość</button>
<button class="pl-button" id="demo-notification-update" type="button"><span data-pl-icon="upload"></span> Wyślij plik</button>
```

```js example-js
document.querySelector('#demo-notification-undo').addEventListener('click', () => {
  Plossy.notification({
    message: 'Wiadomość przeniesiona do kosza',
    icon: 'trash-2',
    timeout: 6000,
    action: {
      label: 'Cofnij',
      onClick: () => Plossy.notification({ message: 'Przywrócono wiadomość', status: 'success' }),
    },
  });
});

// Powiadomienie przyklejone, aktualizowane i zamykane z kodu.
document.querySelector('#demo-notification-update').addEventListener('click', () => {
  const upload = Plossy.notification({
    title: 'Wysyłanie pliku',
    message: 'raport-kwartalny.pdf — 0%',
    icon: 'cloud-upload',
    status: 'primary',
    timeout: 0,
    close: false,
  });
  let percent = 0;
  const timer = setInterval(() => {
    percent += 20;
    upload.update(`raport-kwartalny.pdf — ${percent}%`);
    if (percent >= 100) {
      clearInterval(timer);
      upload.close();
      Plossy.notification({ message: 'Plik został wysłany', status: 'success' });
    }
  }, 500);
});
```

## Grupy i zamykanie

Każde wywołanie zwraca obiekt z metodą `close()`. `Plossy.notification.closeAll()` zamyka wszystkie powiadomienia, a z argumentem — tylko te z daną grupą (`group`).

```html example center
<button class="pl-button" id="demo-notification-chat" type="button">Dodaj z grupy „czat"</button>
<button class="pl-button" id="demo-notification-system" type="button">Dodaj z grupy „system"</button>
<button class="pl-button pl-button-ghost" id="demo-notification-close-chat" type="button">Zamknij grupę „czat"</button>
<button class="pl-button pl-button-ghost" id="demo-notification-close-all" type="button">Zamknij wszystkie</button>
```

```js example-js
const people = ['Ola', 'Tomek', 'Kasia', 'Michał'];
let index = 0;

document.querySelector('#demo-notification-chat').addEventListener('click', () => {
  Plossy.notification({
    message: `${people[index++ % people.length]} pisze do Ciebie`,
    icon: 'message-circle',
    group: 'czat',
    timeout: 0,
  });
});

document.querySelector('#demo-notification-system').addEventListener('click', () => {
  Plossy.notification({ message: 'Kopia zapasowa ukończona', status: 'info', group: 'system', timeout: 0 });
});

document.querySelector('#demo-notification-close-chat').addEventListener('click', () => Plossy.notification.closeAll('czat'));
document.querySelector('#demo-notification-close-all').addEventListener('click', () => Plossy.notification.closeAll());
```

## Ikona i przycisk zamykania

`icon` przyjmuje nazwę ikony z zestawu Plossy albo `false`, aby ją ukryć. `close: false` usuwa przycisk zamykania — powiadomienie nadal można zamknąć przeciągnięciem.

```html example center
<button class="pl-button" type="button" data-pl-notification="message: Dodano do ulubionych; icon: heart; status: danger">Własna ikona</button>
<button class="pl-button" type="button" data-pl-notification="message: Zapisano szkic; status: success; icon: false">Bez ikony</button>
<button class="pl-button" type="button" data-pl-notification="message: Bez przycisku zamykania; close: false; icon: bell-off">Bez zamykania</button>
```

## Dostępność

- Powiadomienia mają `role="status"` / `aria-live="polite"`, a ostrzeżenia i błędy — `role="alert"` / `aria-live="assertive"`.
- Odliczanie wstrzymuje się po najechaniu kursorem oraz gdy fokus znajduje się wewnątrz powiadomienia; <kbd>Esc</kbd> zamyka sfokusowane powiadomienie.
- Stos trafia do warstwy wierzchniej przeglądarki, więc jest widoczny i klikalny także nad otwartym modalem.
- Nie umieszczaj w powiadomieniach informacji krytycznych, które użytkownik musi przeczytać — do tego służy modal lub alert w treści strony.

## API

### Plossy.notification(options)

`Plossy.notification('Tekst')`, `Plossy.notification('Tekst', { status: 'success' })` lub `Plossy.notification({ message: 'Tekst', … })`.

| Opcja | Typ | Domyślnie | Opis |
| --- | --- | --- | --- |
| `message` | string | `''` | Treść powiadomienia. |
| `title` | string | `''` | Tytuł nad treścią. |
| `status` | string | `''` | `primary`, `success`, `warning`, `danger` lub `info`. |
| `pos` | string | `top-right` | `top-left`, `top-center`, `top-right`, `bottom-left`, `bottom-center`, `bottom-right`. |
| `timeout` | number | `4000` | Czas wyświetlania w ms; `0` — do zamknięcia ręcznego. |
| `icon` | string \| false | wg statusu | Nazwa ikony; `false` ukrywa ikonę. |
| `close` | boolean | `true` | Przycisk zamykania. |
| `action` | object | `null` | `{ label, onClick(notification) }` — przycisk akcji. |
| `group` | string | `''` | Etykieta grupy dla `closeAll(group)`. |
| `cls` | string | `''` | Dodatkowe klasy, np. `pl-notification-solid`. |
| `progress` | boolean | `true` | Pasek pozostałego czasu. |
| `html` | boolean | `false` | Wstawia `message` jako HTML (tylko zaufane dane). |
| `onClose` | function | `null` | Wywoływana po zamknięciu. |

Opcji `action`, `html` i `onClose` nie można ustawić w atrybucie `data-pl-notification`.

### Metody

| Metoda | Opis |
| --- | --- |
| `notification.close()` | Zamyka powiadomienie (obiekt zwrócony przez `Plossy.notification()`). |
| `notification.update(message)` | Podmienia treść. |
| `notification.el` | Element powiadomienia. |
| `Plossy.notification.closeAll(group?)` | Zamyka wszystkie powiadomienia lub tylko z podanej grupy. |

### Zdarzenia

| Zdarzenie | Opis |
| --- | --- |
| `pl:beforeshow` | Na wyzwalaczu deklaratywnym, przed pokazaniem. Można anulować. |
| `pl:notificationclose` | Na `document`, po zamknięciu powiadomienia (`event.detail.notification`). |

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-notification` | Pojemnik stosu; `.pl-notification-top-right` itd. — pozycja. |
| `.pl-notification-message` | Pojedyncze powiadomienie. |
| `.pl-notification-primary` … `.pl-notification-info` | Tony. |
| `.pl-notification-solid` | Wariant wypełniony. |
| `.pl-notification-icon`, `-title`, `-text`, `-action`, `-close`, `-progress` | Części powiadomienia. |

Zmienne pojemnika: `--pl-notification-width` (domyślnie `23rem`), `--pl-notification-edge`, `--pl-notification-gap`.
