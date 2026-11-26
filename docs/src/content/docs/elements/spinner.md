---
title: Spinner
description: Wskaźniki ładowania w czystym CSS — pierścień, kropki, słupki i puls. Dziedziczą kolor tekstu, więc działają także w przyciskach.
---

## Podstawowe użycie

Pusty element z klasą `.pl-spinner` to obracający się pierścień. Dodaj `role="status"` i etykietę dla czytników ekranu.

```html example center
<span class="pl-spinner" role="status" aria-label="Wczytywanie"></span>
```

## Warianty

Oprócz pierścienia dostępne są `.pl-spinner-dots` (skaczące kropki), `.pl-spinner-bars` (słupki) i `.pl-spinner-pulse` (rozchodzący się puls). Żaden nie wymaga JavaScriptu ani dodatkowych elementów.

```html example center
<span class="pl-spinner pl-spinner-large" role="status" aria-label="Wczytywanie"></span>
<span class="pl-spinner pl-spinner-dots pl-spinner-large" role="status" aria-label="Wczytywanie"></span>
<span class="pl-spinner pl-spinner-bars pl-spinner-large" role="status" aria-label="Wczytywanie"></span>
<span class="pl-spinner pl-spinner-pulse pl-spinner-large" role="status" aria-label="Wczytywanie"></span>
```

## Rozmiary

`.pl-spinner-small`, domyślny, `.pl-spinner-large` i `.pl-spinner-xlarge`. Dowolny rozmiar ustawisz zmienną `--pl-spinner-size`.

```html example center
<span class="pl-spinner pl-spinner-small" role="status" aria-label="Wczytywanie"></span>
<span class="pl-spinner" role="status" aria-label="Wczytywanie"></span>
<span class="pl-spinner pl-spinner-large" role="status" aria-label="Wczytywanie"></span>
<span class="pl-spinner pl-spinner-xlarge" role="status" aria-label="Wczytywanie"></span>
<span class="pl-spinner" style="--pl-spinner-size: 5.5rem; --pl-spinner-width: 2px" role="status" aria-label="Wczytywanie"></span>
```

```html example center
<span class="pl-spinner pl-spinner-dots pl-spinner-small" role="status" aria-label="Wczytywanie"></span>
<span class="pl-spinner pl-spinner-dots" role="status" aria-label="Wczytywanie"></span>
<span class="pl-spinner pl-spinner-dots pl-spinner-large" role="status" aria-label="Wczytywanie"></span>
<span class="pl-spinner pl-spinner-bars pl-spinner-small" role="status" aria-label="Wczytywanie"></span>
<span class="pl-spinner pl-spinner-bars" role="status" aria-label="Wczytywanie"></span>
<span class="pl-spinner pl-spinner-bars pl-spinner-large" role="status" aria-label="Wczytywanie"></span>
```

## Tony

Spinner domyślnie przyjmuje kolor tekstu. Klasy `.pl-spinner-{ton}` i `.pl-spinner-muted` nadają mu własny kolor.

```html example center
<span class="pl-spinner pl-spinner-primary" role="status" aria-label="Wczytywanie"></span>
<span class="pl-spinner pl-spinner-secondary" role="status" aria-label="Wczytywanie"></span>
<span class="pl-spinner pl-spinner-success" role="status" aria-label="Wczytywanie"></span>
<span class="pl-spinner pl-spinner-warning" role="status" aria-label="Wczytywanie"></span>
<span class="pl-spinner pl-spinner-danger" role="status" aria-label="Wczytywanie"></span>
<span class="pl-spinner pl-spinner-info" role="status" aria-label="Wczytywanie"></span>
<span class="pl-spinner pl-spinner-muted" role="status" aria-label="Wczytywanie"></span>
```

```html example center
<span class="pl-spinner pl-spinner-dots pl-spinner-primary" role="status" aria-label="Wczytywanie"></span>
<span class="pl-spinner pl-spinner-bars pl-spinner-success" role="status" aria-label="Wczytywanie"></span>
<span class="pl-spinner pl-spinner-pulse pl-spinner-danger pl-spinner-large" role="status" aria-label="Wczytywanie"></span>
<span class="pl-spinner pl-spinner-dots pl-spinner-muted" role="status" aria-label="Wczytywanie"></span>
```

## W tekście

Spinner jest elementem liniowym i dopasowuje się do wiersza.

```html example
<p><span class="pl-spinner pl-spinner-small pl-spinner-primary" aria-hidden="true"></span> Zapisywanie zmian…</p>
<p class="pl-text-muted">Asystent pisze <span class="pl-spinner pl-spinner-dots pl-spinner-small" aria-hidden="true"></span></p>
```

## W przyciskach

Wewnątrz `.pl-button` spinner przyjmuje rozmiar ikony i kolor tekstu przycisku. Przycisk w trakcie operacji oznacz `disabled`.

```html example row
<button class="pl-button pl-button-primary" type="button" disabled><span class="pl-spinner" aria-hidden="true"></span> Zapisywanie…</button>
<button class="pl-button" type="button" disabled><span class="pl-spinner pl-spinner-dots" aria-hidden="true"></span> Wysyłanie</button>
<button class="pl-button pl-button-soft pl-button-success" type="button" disabled><span class="pl-spinner pl-spinner-bars" aria-hidden="true"></span> Synchronizacja</button>
<button class="pl-button pl-button-secondary pl-button-icon" type="button" disabled aria-label="Wczytywanie"><span class="pl-spinner" aria-hidden="true"></span></button>
```

## Blok ładowania

`.pl-spinner-block` wyśrodkowuje spinner z podpisem — do ładowania sekcji lub karty.

```html example
<div class="pl-card">
  <div class="pl-spinner-block" role="status">
    <span class="pl-spinner pl-spinner-large pl-spinner-primary" aria-hidden="true"></span>
    <span>Pobieramy Twoje zamówienia…</span>
  </div>
</div>
```

## Nakładka na treść

Połącz spinner z `.pl-overlay` i `.pl-position-cover`, aby zablokować ładowaną sekcję.

```html example
<div class="pl-card" style="position: relative; overflow: hidden; max-width: 28rem; margin-inline: auto" aria-busy="true">
  <div class="pl-card-body">
    <h3 class="pl-card-title">Raport sprzedaży</h3>
    <p class="pl-card-text">Przychód w październiku wzrósł o 18% względem września, głównie dzięki kampanii jesiennej.</p>
  </div>
  <div class="pl-overlay pl-overlay-default pl-position-cover pl-flex pl-flex-center pl-flex-middle" style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center">
    <span class="pl-spinner pl-spinner-large pl-spinner-primary" role="status" aria-label="Odświeżanie raportu"></span>
  </div>
</div>
```

## API

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-spinner` | Pierścień (domyślny wariant). |
| `.pl-spinner-dots` | Trzy skaczące kropki. |
| `.pl-spinner-bars` | Trzy pulsujące słupki. |
| `.pl-spinner-pulse` | Rozchodzące się kręgi. |
| `.pl-spinner-small` `-large` `-xlarge` | Rozmiary. |
| `.pl-spinner-primary` … `.pl-spinner-info`, `.pl-spinner-muted` | Tony. |
| `.pl-spinner-block` | Wyśrodkowany kontener: spinner + podpis. |

### Zmienne CSS

| Zmienna | Domyślnie | Opis |
| --- | --- | --- |
| `--pl-spinner-size` | `1.5rem` | Rozmiar. |
| `--pl-spinner-width` | 1/10 rozmiaru (min. 2px) | Grubość pierścienia. |
| `--pl-spinner-speed` | `0.75s` | Czas jednego obrotu pierścienia. |

### Dostępność

Samodzielny spinner oznacz `role="status"` i `aria-label`. Gdy obok jest widoczny tekst („Zapisywanie…"), spinnerowi nadaj `aria-hidden="true"`. Przy `prefers-reduced-motion` pierścień obraca się wolniej, ale nie zatrzymuje się — nadal informuje o trwającej operacji.
