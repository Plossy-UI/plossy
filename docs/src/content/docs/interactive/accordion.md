---
title: Accordion
description: Lista zwijanych sekcji z płynną animacją wysokości, obsługą klawiatury i pełnym zestawem atrybutów ARIA.
badge: JS
---

## Podstawowe użycie

Dodaj atrybut `data-pl-accordion` do kontenera z klasą `.pl-accordion`. Każda pozycja to `.pl-accordion-item` z tytułem `.pl-accordion-title` i treścią `.pl-accordion-content`. Pozycja z klasą `.pl-open` jest otwarta na starcie.

```html example
<div class="pl-accordion" data-pl-accordion>
  <div class="pl-accordion-item pl-open">
    <button class="pl-accordion-title" type="button">Czym jest Plossy?</button>
    <div class="pl-accordion-content">
      <p>Plossy to lekka biblioteka komponentów interfejsu — czysty CSS i niewielkie moduły JavaScript bez zależności.</p>
    </div>
  </div>
  <div class="pl-accordion-item">
    <button class="pl-accordion-title" type="button">Czy potrzebuję frameworka?</button>
    <div class="pl-accordion-content">
      <p>Nie. Komponenty inicjalizują się same na podstawie atrybutów <code>data-pl-*</code> i działają w każdym projekcie.</p>
    </div>
  </div>
  <div class="pl-accordion-item">
    <button class="pl-accordion-title" type="button">Jak zmienić kolory?</button>
    <div class="pl-accordion-content">
      <p>Cały wygląd opiera się na zmiennych CSS. Wystarczy nadpisać kilka tokenów, aby dopasować bibliotekę do marki.</p>
    </div>
  </div>
</div>
```

## Wiele otwartych pozycji

Domyślnie otwarcie jednej pozycji zamyka pozostałe. Opcja `multiple: true` pozwala trzymać otwartych kilka naraz.

```html example
<div class="pl-accordion" data-pl-accordion="multiple: true">
  <div class="pl-accordion-item pl-open">
    <button class="pl-accordion-title" type="button">Pierwsza pozycja</button>
    <div class="pl-accordion-content">Ta pozycja pozostanie otwarta po rozwinięciu kolejnej.</div>
  </div>
  <div class="pl-accordion-item pl-open">
    <button class="pl-accordion-title" type="button">Druga pozycja</button>
    <div class="pl-accordion-content">Obie mogą być widoczne jednocześnie.</div>
  </div>
  <div class="pl-accordion-item">
    <button class="pl-accordion-title" type="button">Trzecia pozycja</button>
    <div class="pl-accordion-content">Każdą zamykasz niezależnie.</div>
  </div>
</div>
```

## Zawsze jedna otwarta

Opcja `collapsible: false` nie pozwala zamknąć ostatniej otwartej pozycji.

```html example
<div class="pl-accordion" data-pl-accordion="collapsible: false">
  <div class="pl-accordion-item pl-open">
    <button class="pl-accordion-title" type="button">Dostawa</button>
    <div class="pl-accordion-content">Zamówienia wysyłamy w ciągu 24 godzin.</div>
  </div>
  <div class="pl-accordion-item">
    <button class="pl-accordion-title" type="button">Zwroty</button>
    <div class="pl-accordion-content">Masz 30 dni na zwrot bez podania przyczyny.</div>
  </div>
</div>
```

## Warianty

### Karty

Klasa `.pl-accordion-card` zamienia pozycje w osobne karty z cieniem.

```html example
<div class="pl-accordion pl-accordion-card" data-pl-accordion>
  <div class="pl-accordion-item pl-open">
    <button class="pl-accordion-title" type="button">Plan Starter</button>
    <div class="pl-accordion-content">Wszystko, czego potrzebujesz na początek — bez limitu projektów.</div>
  </div>
  <div class="pl-accordion-item">
    <button class="pl-accordion-title" type="button">Plan Pro</button>
    <div class="pl-accordion-content">Zaawansowane funkcje i priorytetowe wsparcie.</div>
  </div>
  <div class="pl-accordion-item">
    <button class="pl-accordion-title" type="button">Plan Zespół</button>
    <div class="pl-accordion-content">Wspólne przestrzenie robocze i role użytkowników.</div>
  </div>
</div>
```

### Wypełniony

Klasa `.pl-accordion-muted` nadaje pozycjom delikatne tło; otwarta pozycja przyjmuje kolor akcentu.

```html example
<div class="pl-accordion pl-accordion-muted" data-pl-accordion>
  <div class="pl-accordion-item">
    <button class="pl-accordion-title" type="button">Projektowanie</button>
    <div class="pl-accordion-content">Makiety, prototypy i system wizualny.</div>
  </div>
  <div class="pl-accordion-item pl-open">
    <button class="pl-accordion-title" type="button">Wdrożenie</button>
    <div class="pl-accordion-content">Kodowanie komponentów i integracja z backendem.</div>
  </div>
  <div class="pl-accordion-item">
    <button class="pl-accordion-title" type="button">Utrzymanie</button>
    <div class="pl-accordion-content">Aktualizacje, monitoring i rozwój.</div>
  </div>
</div>
```

### Mały, z ikoną po lewej

Modyfikatory `.pl-accordion-small` i `.pl-accordion-icon-left` można łączyć z każdym wariantem.

```html example
<div class="pl-accordion pl-accordion-small pl-accordion-icon-left" data-pl-accordion>
  <div class="pl-accordion-item">
    <button class="pl-accordion-title" type="button">Ustawienia konta</button>
    <div class="pl-accordion-content">Zmień adres e-mail, hasło i preferencje powiadomień.</div>
  </div>
  <div class="pl-accordion-item">
    <button class="pl-accordion-title" type="button">Płatności</button>
    <div class="pl-accordion-content">Zarządzaj metodami płatności i fakturami.</div>
  </div>
</div>
```

## Sterowanie z JavaScript

Instancję pobierzesz przez `Plossy.accordion(element)`. Zdarzenia mają prefiks `pl:` i bąbelkują.

```html example
<div class="pl-accordion pl-accordion-card" id="demo-accordion" data-pl-accordion>
  <div class="pl-accordion-item">
    <button class="pl-accordion-title" type="button">Pozycja A</button>
    <div class="pl-accordion-content">Treść pozycji A.</div>
  </div>
  <div class="pl-accordion-item">
    <button class="pl-accordion-title" type="button">Pozycja B</button>
    <div class="pl-accordion-content">Treść pozycji B.</div>
  </div>
</div>
<p style="margin-top: 1rem">
  <button class="pl-button pl-button-small" id="demo-accordion-a" type="button">Przełącz A</button>
  <button class="pl-button pl-button-small" id="demo-accordion-b" type="button">Pokaż B</button>
  <small id="demo-accordion-log" style="margin-left: .5rem; color: var(--pl-text-muted)"></small>
</p>
```

```js example-js
const accordion = Plossy.accordion('#demo-accordion');

document.querySelector('#demo-accordion-a').addEventListener('click', () => accordion.toggle(0));
document.querySelector('#demo-accordion-b').addEventListener('click', () => accordion.show(1));

accordion.el.addEventListener('pl:shown', (event) => {
  const title = event.detail.item.querySelector('.pl-accordion-title').textContent;
  document.querySelector('#demo-accordion-log').textContent = `Otwarto: ${title}`;
});
```

## API

### Opcje

Opcje przekazujesz w atrybucie: `data-pl-accordion="multiple: true; duration: 200"`.

| Opcja | Typ | Domyślnie | Opis |
| --- | --- | --- | --- |
| `multiple` | boolean | `false` | Pozwala otworzyć wiele pozycji jednocześnie. |
| `collapsible` | boolean | `true` | Pozwala zamknąć wszystkie pozycje. |
| `active` | number | `null` | Indeks pozycji otwartej na starcie. |
| `duration` | number | `320` | Czas animacji w milisekundach. |

### Metody

| Metoda | Opis |
| --- | --- |
| `toggle(item)` | Przełącza pozycję (indeks lub element). |
| `show(item)` | Otwiera pozycję. |
| `hide(item)` | Zamyka pozycję. |

### Zdarzenia

| Zdarzenie | Opis |
| --- | --- |
| `pl:beforeshow` | Przed otwarciem. Można anulować przez `preventDefault()`. |
| `pl:show` | Rozpoczęcie animacji otwierania. |
| `pl:shown` | Po zakończeniu animacji otwierania. |
| `pl:beforehide` | Przed zamknięciem. Można anulować. |
| `pl:hide` | Rozpoczęcie animacji zamykania. |
| `pl:hidden` | Po zakończeniu animacji zamykania. |

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-accordion` | Kontener. |
| `.pl-accordion-item` | Pojedyncza pozycja; `.pl-open` oznacza otwartą. |
| `.pl-accordion-title` | Klikalny tytuł. |
| `.pl-accordion-content` | Zwijana treść. |
| `.pl-accordion-card` | Wariant kart. |
| `.pl-accordion-muted` | Wariant wypełniony. |
| `.pl-accordion-small` | Mniejszy rozmiar. |
| `.pl-accordion-icon-left` | Ikona po lewej stronie. |
