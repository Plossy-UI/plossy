---
title: Upload
description: Strefa „przeciągnij i upuść" z listą plików, miniaturami obrazów, walidacją rozmiaru i typu oraz paskami postępu dla każdego pliku.
badge: JS
---

## Podstawowe użycie

Dodaj `data-pl-upload` do elementu `.pl-upload`. W środku umieść ikonę `.pl-upload-icon`, tekst `.pl-upload-text` i etykietę `.pl-upload-link` obejmującą pole `<input type="file">` — pole jest ukryte wizualnie, ale pozostaje dostępne z klawiatury. Lista wybranych plików pojawia się tuż pod strefą.

```html example
<div class="pl-upload" data-pl-upload>
  <span class="pl-upload-icon" data-pl-icon="cloud-upload"></span>
  <p class="pl-upload-text">Przeciągnij plik tutaj lub <label class="pl-upload-link">wybierz plik<input type="file" name="zalacznik"></label></p>
  <p class="pl-upload-hint">Dowolny format</p>
</div>
```

Bez opcji `url` komponent niczego nie wysyła — utrzymuje wybór w polu formularza (także po usunięciu pozycji z listy), więc zwykły `<form>` prześle dokładnie to, co widać.

## Wiele plików i limity

`multiple: true` pozwala dodawać kolejne pliki. `max-size` (w MB) i `max-files` ograniczają wybór; odrzucone pliki wywołują zdarzenie `pl:error`, a pod strefą pojawia się komunikat.

```html example
<div class="pl-upload" data-pl-upload="multiple: true; max-size: 2; max-files: 3">
  <span class="pl-upload-icon" data-pl-icon="files"></span>
  <p class="pl-upload-text">Upuść dokumenty lub <label class="pl-upload-link">przeglądaj dysk<input type="file" name="dokumenty[]" multiple></label></p>
  <p class="pl-upload-hint">Maks. 3 pliki · do 2 MB każdy</p>
</div>
```

## Typy plików i miniatury

Opcja `accept` (lub atrybut `accept` pola) działa także dla plików upuszczonych na strefę. Obrazy dostają miniaturę; klasa `.pl-upload-list-grid` na własnej liście zamienia ją w galerię kafelków.

```html example
<div class="pl-upload" data-pl-upload="multiple: true; accept: image/*; list: #demo-upload-gallery">
  <span class="pl-upload-icon" data-pl-icon="images"></span>
  <p class="pl-upload-text">Dodaj zdjęcia produktu — przeciągnij je lub <label class="pl-upload-link">wybierz z dysku<input type="file" multiple></label></p>
  <p class="pl-upload-hint">PNG · JPG · WebP · SVG</p>
</div>
<ul class="pl-upload-list pl-upload-list-grid" id="demo-upload-gallery"></ul>
```

## Postęp przesyłania

Gdy ustawisz `url`, każdy plik jest wysyłany osobnym żądaniem `POST` (XHR), a pasek pokazuje rzeczywisty postęp. Dokumentacja nie ma backendu, więc poniżej postęp jest symulowany metodami `setProgress()` i `complete()` — tych samych użyjesz przy własnym mechanizmie wysyłki (np. `fetch` do chmury).

```html example
<div class="pl-upload" id="demo-upload-progress" data-pl-upload="multiple: true; max-size: 10">
  <span class="pl-upload-icon" data-pl-icon="cloud-upload"></span>
  <p class="pl-upload-text">Przeciągnij pliki, aby je przesłać, lub <label class="pl-upload-link">wybierz pliki<input type="file" multiple></label></p>
  <p class="pl-upload-hint">Do 10 MB · co piąty plik „nie dojdzie”</p>
</div>
```

```js example-js
const zone = document.querySelector('#demo-upload-progress');
let counter = 0;

zone.addEventListener('pl:select', (event) => {
  const upload = event.detail.component;

  event.detail.files.forEach((file) => {
    const willFail = ++counter % 5 === 0;
    let percent = 0;

    const timer = setInterval(() => {
      if (!upload.files.includes(file)) return clearInterval(timer); // usunięto w trakcie
      percent += 4 + Math.random() * 14;

      if (willFail && percent > 60) {
        clearInterval(timer);
        upload.fail(file, 'Serwer odrzucił plik — spróbuj ponownie.');
      } else if (percent >= 100) {
        clearInterval(timer);
        upload.complete(file, { ok: true });
      } else {
        upload.setProgress(file, percent);
      }
    }, 180);
  });
});
```

Prawdziwa wysyłka wymaga tylko adresu:

```html
<div class="pl-upload" data-pl-upload="url: /api/upload; name: plik; multiple: true">…</div>
```

## Wariant kompaktowy

`.pl-upload-small` układa strefę w jednym wierszu — dobre do formularzy i okien modalnych. `.pl-upload-muted` daje wypełnione tło bez ramki.

```html example column
<div>
  <div class="pl-upload pl-upload-small" data-pl-upload="accept: .pdf,.doc,.docx; max-size: 5">
    <span class="pl-upload-icon" data-pl-icon="paperclip"></span>
    <p class="pl-upload-text">Upuść CV lub <label class="pl-upload-link">wybierz plik<input type="file" name="cv"></label></p>
    <p class="pl-upload-hint">PDF, DOC · 5 MB</p>
  </div>
</div>
<div>
  <div class="pl-upload pl-upload-small pl-upload-muted" data-pl-upload="accept: image/*">
    <span class="pl-upload-icon" data-pl-icon="camera"></span>
    <p class="pl-upload-text">Zdjęcie profilowe — <label class="pl-upload-link">zmień<input type="file" name="avatar"></label></p>
    <p class="pl-upload-hint">Kwadrat, min. 400 px</p>
  </div>
</div>
```

## Cała strefa jako przycisk

Jeśli pominiesz pole `<input>`, komponent utworzy je sam, a cała strefa stanie się klikalna i dostępna z klawiatury (Enter / spacja).

```html example
<div class="pl-upload pl-upload-muted" data-pl-upload="multiple: true; name: skany[]">
  <span class="pl-upload-icon" data-pl-icon="upload"></span>
  <p class="pl-upload-text">Kliknij lub upuść skany faktur</p>
  <p class="pl-upload-hint">Rozpoznamy je automatycznie</p>
</div>
```

## Stan wyłączony

Klasa `.pl-disabled` (lub atrybut `disabled` pola) blokuje strefę.

```html example
<div class="pl-upload pl-upload-small pl-disabled" data-pl-upload>
  <span class="pl-upload-icon" data-pl-icon="lock"></span>
  <p class="pl-upload-text">Przesyłanie dostępne po weryfikacji konta</p>
</div>
```

## Zdarzenia i metody

Wszystkie zdarzenia bąbelkują; w `event.detail` znajdziesz plik (`file`) lub pliki (`files`) oraz instancję (`component`).

```html example
<div class="pl-upload pl-upload-small" id="demo-upload-events" data-pl-upload="multiple: true; max-size: 1">
  <span class="pl-upload-icon" data-pl-icon="file-text"></span>
  <p class="pl-upload-text">Dodaj pliki (do 1 MB) — <label class="pl-upload-link">wybierz<input type="file" multiple></label></p>
</div>
<p class="pl-margin-small-top">
  <button class="pl-button pl-button-small" type="button" id="demo-upload-clear">Wyczyść listę</button>
  <span class="pl-text-muted pl-margin-small-left" id="demo-upload-log">Brak plików.</span>
</p>
```

```js example-js
const zone = document.querySelector('#demo-upload-events');
const log = document.querySelector('#demo-upload-log');
const upload = Plossy.upload(zone);

const summary = () => {
  const total = upload.files.reduce((sum, file) => sum + file.size, 0);
  log.textContent = upload.files.length
    ? `Plików: ${upload.files.length}, łącznie ${(total / 1024).toFixed(0)} KB.`
    : 'Brak plików.';
};

zone.addEventListener('pl:select', summary);
zone.addEventListener('pl:remove', summary);
zone.addEventListener('pl:error', (event) => {
  log.textContent = `Odrzucono: ${event.detail.message}`;
});
document.querySelector('#demo-upload-clear').addEventListener('click', () => upload.clear());
```

## API

### Opcje

Opcje przekazujesz w atrybucie: `data-pl-upload="multiple: true; max-size: 5"`.

| Opcja | Typ | Domyślnie | Opis |
| --- | --- | --- | --- |
| `multiple` | boolean | wg pola | Pozwala wybrać wiele plików. Domyślnie zgodnie z atrybutem `multiple` pola. |
| `accept` | string | wg pola | Dozwolone typy: `image/*`, `application/pdf`, `.docx` — rozdzielone przecinkami. |
| `max-size` | number | `0` | Maksymalny rozmiar jednego pliku w MB (`0` = bez limitu). |
| `max-files` | number | `0` | Maksymalna liczba plików (`0` = bez limitu). |
| `url` | string | `''` | Adres wysyłki. Gdy ustawiony, pliki są przesyłane przez XHR. |
| `name` | string | `'file'` | Nazwa pola w `FormData` (oraz tworzonego pola, gdy brak `<input>`). |
| `method` | string | `'POST'` | Metoda HTTP. |
| `auto` | boolean | `true` | Wysyła pliki od razu po wybraniu. Przy `false` wywołaj `upload()`. |
| `thumbnails` | boolean | `true` | Miniatury dla obrazów. |
| `list` | string | `''` | Selektor własnej listy plików (domyślnie tworzona za strefą). |
| `messages` | boolean | `true` | Pokazuje komunikaty błędów pod strefą. |

### Metody

```js
const upload = Plossy.upload('#strefa');
upload.files;      // tablica obiektów File
upload.clear();
```

| Metoda | Opis |
| --- | --- |
| `files` | Getter — aktualnie wybrane pliki (`File[]`). |
| `add(files)` | Dodaje pliki programowo (z walidacją). |
| `remove(file)` | Usuwa plik (obiekt `File` lub indeks); przerywa trwającą wysyłkę. |
| `clear()` | Usuwa wszystkie pliki. |
| `browse()` | Otwiera systemowe okno wyboru. |
| `upload()` | Wysyła oczekujące pliki pod `url`. |
| `setProgress(file, procent)` | Ustawia postęp pliku (0–100). |
| `complete(file, odpowiedź)` | Oznacza plik jako przesłany. |
| `fail(file, komunikat)` | Oznacza plik jako nieprzesłany. |

### Zdarzenia

| Zdarzenie | Opis |
| --- | --- |
| `pl:select` | Dodano pliki. `detail.files` — zaakceptowane pliki. |
| `pl:error` | Plik odrzucony lub błąd wysyłki. `detail.type`: `size`, `type`, `count`, `upload`; `detail.message` — komunikat po polsku. |
| `pl:beforesend` | Przed wysłaniem żądania; `detail.xhr`, `detail.data` (`FormData`). Można anulować lub dodać nagłówki. |
| `pl:progress` | Postęp wysyłki. `detail.percent`, `detail.file`. |
| `pl:complete` | Plik przesłany. `detail.response` — odpowiedź serwera (JSON, jeśli się da). |
| `pl:completeall` | Wszystkie pliki z listy przesłane. |
| `pl:remove` | Usunięto plik z listy. |

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-upload` | Strefa upuszczania. |
| `.pl-upload-icon` | Ikona w strefie. |
| `.pl-upload-text` | Główny tekst. |
| `.pl-upload-hint` | Drobna podpowiedź (formaty, limity). |
| `.pl-upload-link` | Etykieta-odnośnik obejmująca pole pliku. |
| `.pl-upload-small` | Wariant kompaktowy, w jednym wierszu. |
| `.pl-upload-muted` | Wypełnione tło bez ramki. |
| `.pl-upload-dragover` | Stan: plik nad strefą (ustawiany przez JS). |
| `.pl-upload-list` | Lista plików. |
| `.pl-upload-list-grid` | Lista jako siatka miniatur. |
| `.pl-upload-item` | Pozycja listy; stany `-uploading`, `-done`, `-error`. |
| `.pl-disabled` | Strefa wyłączona. |
