---
title: Close
description: Przycisk zamykania z „X" narysowanym w czystym CSS. Dziedziczy kolor tekstu, więc działa na każdym tle — jasnym, ciemnym i kolorowym.
---

## Podstawowe użycie

Dodaj klasę `.pl-close` do pustego elementu `<button>`. Ikona powstaje z pseudoelementów, dlatego przycisk nie potrzebuje żadnej treści — pamiętaj tylko o `aria-label`. Po najechaniu „X" obraca się o ćwierć obrotu.

```html example center
<button class="pl-close" type="button" aria-label="Zamknij"></button>
```

## Rozmiary

Modyfikatory `.pl-close-small` i `.pl-close-large` zmieniają rozmiar pola i ikony.

```html example center
<button class="pl-close pl-close-small" type="button" aria-label="Zamknij"></button>
<button class="pl-close" type="button" aria-label="Zamknij"></button>
<button class="pl-close pl-close-large" type="button" aria-label="Zamknij"></button>
```

## Style

`.pl-close-filled` dodaje stałe, półprzezroczyste tło, a `.pl-close-outline` włosową obwódkę. Oba przydają się, gdy przycisk leży na zdjęciu lub musi być wyraźniej widoczny.

```html example center
<button class="pl-close pl-close-filled" type="button" aria-label="Zamknij"></button>
<button class="pl-close pl-close-outline" type="button" aria-label="Zamknij"></button>
<button class="pl-close pl-close-filled pl-close-large" type="button" aria-label="Zamknij"></button>
<button class="pl-close" type="button" aria-label="Zamknij" disabled></button>
```

## Kolor i ciemne powierzchnie

Przycisk używa `currentColor`, więc przyjmuje kolor tekstu rodzica. Nie potrzebujesz osobnego wariantu „na ciemne tło".

```html example
<div class="pl-grid pl-child-width-1-3@s">
  <div>
    <div class="pl-flex pl-flex-between pl-flex-middle" style="padding: .75rem 1rem; border-radius: var(--pl-radius-md); background: var(--pl-ink); color: var(--pl-on-ink)">
      <span>Ciemna powierzchnia</span>
      <button class="pl-close" type="button" aria-label="Zamknij"></button>
    </div>
  </div>
  <div>
    <div class="pl-flex pl-flex-between pl-flex-middle" style="padding: .75rem 1rem; border-radius: var(--pl-radius-md); background: var(--pl-primary); color: var(--pl-on-primary)">
      <span>Kolor akcentu</span>
      <button class="pl-close" type="button" aria-label="Zamknij"></button>
    </div>
  </div>
  <div>
    <div class="pl-flex pl-flex-between pl-flex-middle" style="padding: .75rem 1rem; border-radius: var(--pl-radius-md); background: var(--pl-danger-soft); color: var(--pl-danger-text)">
      <span>Zabarwione tło</span>
      <button class="pl-close" type="button" aria-label="Zamknij"></button>
    </div>
  </div>
</div>
```

## W innych komponentach

Sam przycisk niczego nie zamyka — zachowanie nadaje komponent nadrzędny. Alert reaguje na klasę `.pl-alert-close`, modal na atrybut `data-pl-modal-close`, a offcanvas na `data-pl-offcanvas-close`.

```html example
<div class="pl-alert pl-alert-primary" data-pl-alert>
  <div class="pl-alert-body">Nowa wersja aplikacji jest gotowa do zainstalowania.</div>
  <button class="pl-close pl-alert-close" type="button" aria-label="Zamknij"></button>
</div>

<div class="pl-card" style="max-width: 24rem">
  <div class="pl-card-header pl-flex-between">
    <h3 class="pl-card-title">Zaproś do zespołu</h3>
    <button class="pl-close pl-close-small" type="button" aria-label="Zamknij"></button>
  </div>
  <div class="pl-card-body">
    <p class="pl-card-text">Wyślij zaproszenie e-mailem — nowa osoba dołączy jednym kliknięciem.</p>
  </div>
</div>
```

## Własny wygląd

Wymiary kontrolują lokalne zmienne CSS.

```html example center
<button class="pl-close" type="button" aria-label="Zamknij" style="--pl-close-size: 3.5rem; --pl-close-icon: 1.5rem; --pl-close-stroke: 3px; color: var(--pl-primary)"></button>
```

## API

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-close` | Przycisk zamykania. |
| `.pl-close-small` | Mniejszy rozmiar (1,5 rem). |
| `.pl-close-large` | Większy rozmiar (2,75 rem). |
| `.pl-close-filled` | Stałe, półprzezroczyste tło. |
| `.pl-close-outline` | Włosowa obwódka. |

### Zmienne CSS

| Zmienna | Domyślnie | Opis |
| --- | --- | --- |
| `--pl-close-size` | `2rem` | Rozmiar pola przycisku. |
| `--pl-close-icon` | `0.875rem` | Długość kresek tworzących „X". |
| `--pl-close-stroke` | `1.5px` | Grubość kresek. |
