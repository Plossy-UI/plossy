---
title: Placeholder
description: Pusty stan z ikoną, tytułem i akcją oraz szkielety ładowania (skeleton) z delikatnym połyskiem.
---

## Podstawowe użycie

`.pl-placeholder` to obszar z przerywaną ramką — sygnalizuje, że w tym miejscu jeszcze nic nie ma.

```html example
<div class="pl-placeholder">
  <span class="pl-placeholder-icon" data-pl-icon="folder-open"></span>
  <h3 class="pl-placeholder-title">Brak projektów</h3>
  <p class="pl-placeholder-text">Utwórz pierwszy projekt, aby zaprosić zespół i zacząć planować pracę.</p>
  <div class="pl-placeholder-actions">
    <button class="pl-button pl-button-primary" type="button"><span data-pl-icon="plus"></span> Nowy projekt</button>
    <button class="pl-button pl-button-ghost" type="button">Importuj</button>
  </div>
</div>
```

## Sam tekst

Najprostsza forma — tylko komunikat.

```html example
<div class="pl-placeholder pl-placeholder-small">
  <p class="pl-placeholder-text">Nie znaleziono wyników dla „lampa stojąca dąb".</p>
</div>
```

## Rozmiary

`.pl-placeholder-small` do ciasnych miejsc (panel boczny, komórka), `.pl-placeholder-large` do pustych stron.

```html example
<div class="pl-grid pl-child-width-1-2@m">
  <div>
    <div class="pl-placeholder pl-placeholder-small">
      <span class="pl-placeholder-icon" data-pl-icon="bell-off"></span>
      <h3 class="pl-placeholder-title">Cisza w eterze</h3>
      <p class="pl-placeholder-text">Nie masz nowych powiadomień.</p>
    </div>
  </div>
  <div>
    <div class="pl-placeholder pl-placeholder-large">
      <span class="pl-placeholder-icon" data-pl-icon="shopping-cart"></span>
      <h3 class="pl-placeholder-title">Koszyk jest pusty</h3>
      <p class="pl-placeholder-text">Dodaj produkty, a pojawią się tutaj.</p>
    </div>
  </div>
</div>
```

## Układ poziomy

`.pl-placeholder-horizontal` od breakpointu `s` układa ikonę, treść (`.pl-placeholder-content`) i akcję w jednym wierszu.

```html example
<div class="pl-placeholder pl-placeholder-small pl-placeholder-horizontal">
  <span class="pl-placeholder-icon" data-pl-icon="credit-card"></span>
  <div class="pl-placeholder-content">
    <h3 class="pl-placeholder-title">Brak metody płatności</h3>
    <p class="pl-placeholder-text">Dodaj kartę, aby odnowienie planu przebiegło automatycznie.</p>
  </div>
  <div class="pl-placeholder-actions">
    <button class="pl-button pl-button-small" type="button">Dodaj kartę</button>
  </div>
</div>
```

## Bez ramki

`.pl-placeholder-plain` usuwa ramkę i tło — do pustych stanów wewnątrz karty lub tabeli.

```html example
<div class="pl-card">
  <div class="pl-card-header"><h3 class="pl-card-title">Aktywność</h3></div>
  <div class="pl-placeholder pl-placeholder-plain">
    <span class="pl-placeholder-icon" data-pl-icon="activity"></span>
    <h3 class="pl-placeholder-title">Jeszcze nic się nie wydarzyło</h3>
    <p class="pl-placeholder-text">Historia zmian pojawi się po pierwszej edycji dokumentu.</p>
  </div>
</div>
```

## Interaktywny

Na elemencie `<a>` lub `<button>` (albo z klasą `.pl-placeholder-hover`) cały obszar reaguje na hover — dobry jako kafelek „dodaj" lub strefa upuszczania. Stan podświetlenia wymusza `.pl-active`.

```html example
<div class="pl-grid pl-child-width-1-2@s">
  <div>
    <button class="pl-placeholder pl-placeholder-small" type="button">
      <span class="pl-placeholder-icon" data-pl-icon="plus"></span>
      <span class="pl-placeholder-title">Dodaj adres dostawy</span>
    </button>
  </div>
  <div>
    <div class="pl-placeholder pl-placeholder-small pl-placeholder-hover pl-active">
      <span class="pl-placeholder-icon" data-pl-icon="cloud-upload"></span>
      <span class="pl-placeholder-title">Upuść pliki tutaj</span>
      <span class="pl-placeholder-text">Stan <code>.pl-active</code> — plik nad strefą</span>
    </div>
  </div>
</div>
```

## Skeleton

`.pl-skeleton` to szkielet ładowania z przesuwającym się połyskiem. Kształt nadają `.pl-skeleton-text` (wiersz), `.pl-skeleton-title`, `.pl-skeleton-circle`, `.pl-skeleton-rect` i `.pl-skeleton-button`. Szerokość ustawisz klasami `.pl-width-*`.

```html example
<div style="max-width: 26rem; margin-inline: auto" aria-hidden="true">
  <div class="pl-skeleton pl-skeleton-title"></div>
  <div class="pl-skeleton pl-skeleton-text"></div>
  <div class="pl-skeleton pl-skeleton-text"></div>
  <div class="pl-skeleton pl-skeleton-text pl-width-2-3"></div>
</div>
```

### Kształty

```html example row
<div class="pl-skeleton pl-skeleton-circle"></div>
<div class="pl-skeleton pl-skeleton-circle" style="--pl-skeleton-size: 4rem"></div>
<div class="pl-skeleton pl-skeleton-button"></div>
<div class="pl-skeleton pl-skeleton-rect" style="width: 12rem"></div>
<div class="pl-skeleton pl-skeleton-rect" style="width: 8rem; --pl-skeleton-ratio: 1"></div>
```

### Grupa wierszy

`.pl-skeleton-group` układa wiersze w równych odstępach i skraca ostatni.

```html example narrow
<div class="pl-flex" style="gap: 1rem" aria-hidden="true">
  <div class="pl-skeleton pl-skeleton-circle"></div>
  <div class="pl-skeleton-group" style="flex: 1; padding-top: 0.4rem">
    <div class="pl-skeleton pl-skeleton-text pl-width-1-3"></div>
    <div class="pl-skeleton pl-skeleton-text"></div>
    <div class="pl-skeleton pl-skeleton-text"></div>
  </div>
</div>
```

### Szkielet karty

Składaj szkielety tak, by odpowiadały docelowemu układowi — treść nie „skacze" po załadowaniu.

```html example
<div class="pl-grid pl-child-width-1-3@m" aria-busy="true">
  <div>
    <div class="pl-card" aria-hidden="true">
      <div class="pl-skeleton pl-skeleton-rect" style="border-radius: var(--pl-radius-lg) var(--pl-radius-lg) 0 0"></div>
      <div class="pl-card-body">
        <div class="pl-skeleton pl-skeleton-title"></div>
        <div class="pl-skeleton-group">
          <div class="pl-skeleton pl-skeleton-text"></div>
          <div class="pl-skeleton pl-skeleton-text"></div>
        </div>
        <div class="pl-skeleton pl-skeleton-button" style="margin-top: 1.25rem"></div>
      </div>
    </div>
  </div>
  <div>
    <div class="pl-card" aria-hidden="true">
      <div class="pl-skeleton pl-skeleton-rect" style="border-radius: var(--pl-radius-lg) var(--pl-radius-lg) 0 0"></div>
      <div class="pl-card-body">
        <div class="pl-skeleton pl-skeleton-title"></div>
        <div class="pl-skeleton-group">
          <div class="pl-skeleton pl-skeleton-text"></div>
          <div class="pl-skeleton pl-skeleton-text"></div>
        </div>
        <div class="pl-skeleton pl-skeleton-button" style="margin-top: 1.25rem"></div>
      </div>
    </div>
  </div>
  <div>
    <div class="pl-card" aria-hidden="true">
      <div class="pl-skeleton pl-skeleton-rect" style="border-radius: var(--pl-radius-lg) var(--pl-radius-lg) 0 0"></div>
      <div class="pl-card-body">
        <div class="pl-skeleton pl-skeleton-title"></div>
        <div class="pl-skeleton-group">
          <div class="pl-skeleton pl-skeleton-text"></div>
          <div class="pl-skeleton pl-skeleton-text"></div>
        </div>
        <div class="pl-skeleton pl-skeleton-button" style="margin-top: 1.25rem"></div>
      </div>
    </div>
  </div>
</div>
```

### Rodzaj animacji

Domyślnie szkielet ma połysk. `.pl-skeleton-pulse` zamienia go na pulsowanie przezroczystości, `.pl-skeleton-static` wyłącza animację.

```html example
<div class="pl-grid pl-child-width-1-3@s">
  <div>
    <p class="pl-text-meta">Połysk</p>
    <div class="pl-skeleton pl-skeleton-text"></div>
    <div class="pl-skeleton pl-skeleton-text pl-width-2-3"></div>
  </div>
  <div>
    <p class="pl-text-meta">Puls</p>
    <div class="pl-skeleton pl-skeleton-pulse pl-skeleton-text"></div>
    <div class="pl-skeleton pl-skeleton-pulse pl-skeleton-text pl-width-2-3"></div>
  </div>
  <div>
    <p class="pl-text-meta">Statyczny</p>
    <div class="pl-skeleton pl-skeleton-static pl-skeleton-text"></div>
    <div class="pl-skeleton pl-skeleton-static pl-skeleton-text pl-width-2-3"></div>
  </div>
</div>
```

### Szkielet na istniejącej treści

Klasa `.pl-skeleton` ukrywa tekst i dzieci elementu, zachowując jego wymiary. Wystarczy ją zdjąć po załadowaniu danych.

```html example
<p><span class="pl-skeleton" id="demo-skeleton-text" style="display: inline-block">Zamówienie nr 10482 zostało wysłane</span></p>
<button class="pl-button pl-button-small" id="demo-skeleton-toggle" type="button">Przełącz ładowanie</button>
```

```js example-js
document.getElementById('demo-skeleton-toggle').addEventListener('click', () => {
  document.getElementById('demo-skeleton-text').classList.toggle('pl-skeleton');
});
```

## API

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-placeholder` | Obszar pustego stanu z przerywaną ramką. |
| `.pl-placeholder-icon` | Ikona w kafelku. |
| `.pl-placeholder-title` `-text` | Tytuł i opis. |
| `.pl-placeholder-actions` | Wiersz przycisków. |
| `.pl-placeholder-content` | Kontener treści w układzie poziomym. |
| `.pl-placeholder-small` `-large` | Rozmiary. |
| `.pl-placeholder-plain` | Bez ramki i tła. |
| `.pl-placeholder-horizontal` | Układ poziomy od `s`. |
| `.pl-placeholder-hover` | Interaktywny hover (automatycznie dla `a` / `button`); `.pl-active` wymusza podświetlenie. |
| `.pl-skeleton` | Szkielet ładowania (połysk). |
| `.pl-skeleton-text` `-title` `-circle` `-rect` `-button` | Kształty. |
| `.pl-skeleton-group` | Kolumna wierszy z krótszym ostatnim. |
| `.pl-skeleton-pulse` `.pl-skeleton-static` | Puls zamiast połysku / bez animacji. |

### Zmienne CSS

| Zmienna | Domyślnie | Opis |
| --- | --- | --- |
| `--pl-placeholder-p` | `2.5rem` | Odstęp wewnętrzny. |
| `--pl-skeleton-size` | `2.75rem` | Średnica `.pl-skeleton-circle`. |
| `--pl-skeleton-ratio` | `16 / 9` | Proporcje `.pl-skeleton-rect`. |
| `--pl-skeleton-base` / `-shine` | tokeny `muted` | Kolor tła i połysku. |

### Dostępność

Szkielety oznacz `aria-hidden="true"`, a ładowany region — `aria-busy="true"`. Przy `prefers-reduced-motion` animacja połysku jest wyłączona.
