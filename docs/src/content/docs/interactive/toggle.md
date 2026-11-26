---
title: Toggle
description: Uniwersalny przełącznik — pokazuje i ukrywa dowolne elementy, przełącza klasy, otwiera modale i panele boczne. Sam dba o atrybuty ARIA.
badge: JS
---

## Podstawowe użycie

Dodaj `data-pl-toggle` z selektorem celu. Bez dodatkowych opcji przełączany jest atrybut `hidden`. Przełącznik dostaje `aria-expanded`, `aria-controls` oraz klasę `.pl-active`, gdy cel jest widoczny.

```html example
<button class="pl-button pl-button-primary" type="button" data-pl-toggle="#demo-toggle-basic">Pokaż szczegóły zamówienia</button>

<div class="pl-card pl-margin-top" id="demo-toggle-basic" hidden>
  <div class="pl-card-body">
    <h3 class="pl-card-title">Zamówienie nr 2025/1184</h3>
    <p>Paczka została nadana 12 marca i jest w drodze do punktu odbioru w Gdańsku.</p>
  </div>
</div>
```

Link z `href="#id"` nie potrzebuje wartości atrybutu — cel jest brany z adresu.

```html example
<a href="#demo-toggle-href" data-pl-toggle>Dlaczego prosimy o numer telefonu?</a>

<p id="demo-toggle-href" hidden>Kurier zadzwoni tylko wtedy, gdy nie zastanie nikogo pod wskazanym adresem. Numeru nie używamy do celów marketingowych.</p>
```

## Płynna animacja

Opcja `animation: true` rozwija i zwija cel z animacją wysokości.

```html example
<button class="pl-button" type="button" data-pl-toggle="target: #demo-toggle-height; animation: true">Regulamin promocji</button>

<div class="pl-card pl-card-muted pl-margin-top" id="demo-toggle-height" hidden>
  <div class="pl-card-body">
    <p>Promocja trwa od 1 do 30 kwietnia. Rabat 15% nalicza się automatycznie w koszyku przy zamówieniach powyżej 200 zł i nie łączy się z innymi kodami.</p>
    <p>Zwrot towaru kupionego w promocji odbywa się na standardowych zasadach — masz na niego 30 dni.</p>
  </div>
</div>
```

Zamiast `true` możesz podać klasę animacji — przy ukrywaniu zostanie odtworzona wstecz. Dwie klasy po przecinku oznaczają osobno wejście i wyjście.

```html example row
<button class="pl-button" type="button" data-pl-toggle="target: #demo-toggle-fade; animation: pl-animation-fade">Zanikanie</button>
<button class="pl-button" type="button" data-pl-toggle="target: #demo-toggle-scale; animation: pl-animation-scale-up">Skala</button>
<button class="pl-button" type="button" data-pl-toggle="target: #demo-toggle-slide; animation: pl-animation-slide-up, pl-animation-fade pl-animation-reverse">Wjazd / zanik</button>

<span class="pl-label" id="demo-toggle-fade" hidden>Zapisano</span>
<span class="pl-label" id="demo-toggle-scale" hidden>Nowość</span>
<span class="pl-label" id="demo-toggle-slide" hidden>W drodze</span>
```

## Przełączanie klasy

Z opcją `cls` przełącznik nie ukrywa celu, tylko dodaje i zdejmuje wskazaną klasę (lub kilka klas).

```html example
<div class="pl-card" id="demo-toggle-cls" style="max-width: 24rem">
  <div class="pl-card-body">
    <h3 class="pl-card-title">Plan Pro</h3>
    <p>Nielimitowane projekty, własna domena i priorytetowe wsparcie.</p>
    <button class="pl-button pl-button-small" type="button" data-pl-toggle="target: #demo-toggle-cls; cls: pl-card-primary">Wyróżnij kartę</button>
  </div>
</div>
```

## Cele względne

Cel nie musi mieć `id`. Wartości `next`, `prev`, `parent` oraz selektor zaczynający się od `>` są liczone względem przełącznika.

```html example
<div class="pl-card" style="max-width: 26rem">
  <div class="pl-card-body">
    <button class="pl-button pl-button-small" type="button" data-pl-toggle="target: next; animation: true">Pokaż notatkę</button>
    <p class="pl-margin-small-top" hidden>Klient prosi o dostawę po godzinie 16:00.</p>
  </div>
</div>
```

## Wiele celów

Selektor może wskazywać wiele elementów — każdy zostanie przełączony niezależnie, co pozwala zamieniać jedną treść na drugą.

```html example
<button class="pl-button" type="button" data-pl-toggle="target: .demo-toggle-swap">Zmień widok cen</button>

<p class="demo-toggle-swap pl-margin-top"><strong>49 zł</strong> miesięcznie, płatne co miesiąc.</p>
<p class="demo-toggle-swap pl-margin-top" hidden><strong>490 zł</strong> rocznie — dwa miesiące gratis.</p>
```

### Kolejka

Opcja `queued: true` pokazuje cele po kolei: każde kliknięcie ukrywa bieżący i odsłania następny.

```html example
<button class="pl-button" type="button" data-pl-toggle="target: .demo-toggle-tip; queued: true; animation: pl-animation-fade pl-animation-fast">Następna wskazówka</button>

<div class="pl-margin-top">
  <p class="demo-toggle-tip">1. Skrót <kbd>Ctrl</kbd> + <kbd>K</kbd> otwiera wyszukiwarkę z każdego miejsca.</p>
  <p class="demo-toggle-tip" hidden>2. Przeciągnij plik na listę, aby dodać go jako załącznik.</p>
  <p class="demo-toggle-tip" hidden>3. Kliknij dwukrotnie nazwę projektu, żeby ją zmienić.</p>
</div>
```

## Tryb hover

`mode: hover` pokazuje cel po najechaniu kursorem i ukrywa po jego zjechaniu. Na ekranach dotykowych i z klawiatury nadal działa kliknięcie.

```html example
<button class="pl-button" type="button" data-pl-toggle="target: #demo-toggle-hover; mode: hover; animation: pl-animation-fade">Najedź, aby zobaczyć limit</button>

<p id="demo-toggle-hover" class="pl-margin-top" hidden>Wykorzystano 7,2 GB z 10 GB dostępnych w Twoim planie.</p>
```

## Modal i offcanvas

Jeśli cel jest modalem lub panelem bocznym, przełącznik wywołuje jego metodę `toggle()` — nie trzeba żadnych dodatkowych opcji.

```html example row
<button class="pl-button pl-button-primary" type="button" data-pl-toggle="#demo-toggle-modal">Otwórz modal</button>
<button class="pl-button" type="button" data-pl-toggle="#demo-toggle-offcanvas">Otwórz panel</button>

<dialog class="pl-modal" id="demo-toggle-modal" data-pl-modal>
  <div class="pl-modal-dialog">
    <div class="pl-modal-header">
      <h2 class="pl-modal-title">Usunąć projekt?</h2>
      <button class="pl-close" type="button" aria-label="Zamknij" data-pl-modal-close></button>
    </div>
    <div class="pl-modal-body">
      <p>Projekt „Kampania wiosenna" trafi do kosza. Możesz go przywrócić w ciągu 30 dni.</p>
    </div>
    <div class="pl-modal-footer">
      <button class="pl-button" type="button" data-pl-modal-close>Anuluj</button>
      <button class="pl-button pl-button-danger" type="button" data-pl-modal-close>Usuń</button>
    </div>
  </div>
</dialog>

<dialog class="pl-offcanvas" id="demo-toggle-offcanvas" data-pl-offcanvas="side: right">
  <div class="pl-offcanvas-bar">
    <button class="pl-close" type="button" aria-label="Zamknij" data-pl-offcanvas-close></button>
    <h3>Filtry</h3>
    <p>Tu znajdą się opcje filtrowania listy.</p>
  </div>
</dialog>
```

## Od określonej szerokości

Opcja `media` włącza przełącznik dopiero od podanej szerokości okna — liczba w pikselach, skrót breakpointu (`@s`, `@m`, `@l`, `@xl`) albo pełne zapytanie media. Poniżej progu kliknięcie nic nie robi.

```html example
<button class="pl-button" type="button" data-pl-toggle="target: #demo-toggle-media; media: @m; animation: true">Działam od 960 px</button>

<p id="demo-toggle-media" class="pl-margin-top" hidden>Ten akapit da się przełączyć tylko na szerokich ekranach.</p>
```

## Sterowanie z JavaScript

Instancję pobierzesz przez `Plossy.toggle(element)`. Zdarzenia są wysyłane na elemencie docelowym i bąbelkują.

```html example
<button class="pl-button" id="demo-toggle-js" type="button" data-pl-toggle="target: #demo-toggle-js-target; animation: true">Przełącz</button>
<button class="pl-button pl-button-text" id="demo-toggle-js-remote" type="button">Przełącz z kodu</button>

<div class="pl-card pl-margin-top" id="demo-toggle-js-target" hidden>
  <div class="pl-card-body">Stan tej karty jest raportowany poniżej.</div>
</div>
<p class="pl-margin-small-top"><small id="demo-toggle-js-log" style="color: var(--pl-text-muted)">Czekam na zdarzenie…</small></p>
```

```js example-js
const toggle = Plossy.toggle('#demo-toggle-js');
const target = document.querySelector('#demo-toggle-js-target');
const log = document.querySelector('#demo-toggle-js-log');

document.querySelector('#demo-toggle-js-remote').addEventListener('click', () => toggle.toggle());

target.addEventListener('pl:shown', () => (log.textContent = 'pl:shown — karta jest widoczna'));
target.addEventListener('pl:hidden', () => (log.textContent = 'pl:hidden — karta jest ukryta'));
```

## API

### Opcje

Sama wartość atrybutu (`data-pl-toggle="#cel"`) trafia do opcji `target`.

| Opcja | Typ | Domyślnie | Opis |
| --- | --- | --- | --- |
| `target` | string | `href` lub `next` | Selektor CSS, `next`, `prev`, `parent` albo `> .dziecko`. Może wskazywać wiele elementów. |
| `cls` | string | — | Klasa (klasy) przełączana na celu. Bez niej przełączany jest atrybut `hidden`. |
| `animation` | boolean \| string | `false` | `true` — animacja wysokości; nazwa klasy — animacja wejścia (wyjście odtwarzane wstecz); `wejście, wyjście` — dwie osobne klasy. |
| `mode` | string | `click` | `click`, `hover` lub oba po przecinku. |
| `queued` | boolean | `false` | Przy wielu celach pokazuje je pojedynczo, w kolejności. |
| `media` | number \| string | `false` | Minimalna szerokość okna (px), breakpoint (`@m`) lub zapytanie media. |
| `duration` | number | `300` | Czas animacji wysokości w milisekundach. |

### Metody

| Metoda | Opis |
| --- | --- |
| `toggle()` | Przełącza cel (cele). Zwraca `Promise` rozwiązywany po zakończeniu animacji. |
| `isToggled()` | Zwraca `true`, gdy którykolwiek cel jest widoczny / ma klasę. |

### Zdarzenia

Wysyłane na elemencie docelowym; `event.detail.toggle` wskazuje przełącznik.

| Zdarzenie | Opis |
| --- | --- |
| `pl:beforeshow` | Przed pokazaniem. Można anulować przez `preventDefault()`. |
| `pl:show` | Rozpoczęcie pokazywania. |
| `pl:shown` | Po zakończeniu animacji pokazywania. |
| `pl:beforehide` | Przed ukryciem. Można anulować. |
| `pl:hide` | Rozpoczęcie ukrywania. |
| `pl:hidden` | Po zakończeniu animacji ukrywania. |

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-active` | Dodawana do przełącznika, gdy cel jest widoczny. |
