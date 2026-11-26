---
title: Label
description: Mała etykieta statusu — techniczna, wersalikami. Oznacza stan zamówienia, wersję, kategorię albo nowość.
---

## Podstawowe użycie

Dodaj klasę `.pl-label` do elementu `<span>`. Domyślna etykieta jest neutralna.

```html example row
<span class="pl-label">Szkic</span>
<span class="pl-label">v2.4.0</span>
<span class="pl-label">Archiwum</span>
```

## Tony

Klasy `.pl-label-{ton}` nadają kolor. Domyślny styl jest „miękki" — zabarwione tło i czytelny tekst.

```html example row
<span class="pl-label pl-label-primary">Nowe</span>
<span class="pl-label pl-label-secondary">Wersja beta</span>
<span class="pl-label pl-label-success">Opłacone</span>
<span class="pl-label pl-label-warning">Oczekuje</span>
<span class="pl-label pl-label-danger">Odrzucone</span>
<span class="pl-label pl-label-info">W drodze</span>
```

## Style

`.pl-label-solid` wypełnia etykietę pełnym kolorem, `.pl-label-outline` zostawia samą ramkę.

```html example column
<div class="pl-flex pl-flex-wrap" style="gap: 0.75rem">
  <span class="pl-label pl-label-solid">Szkic</span>
  <span class="pl-label pl-label-solid pl-label-primary">Nowe</span>
  <span class="pl-label pl-label-solid pl-label-secondary">Beta</span>
  <span class="pl-label pl-label-solid pl-label-success">Opłacone</span>
  <span class="pl-label pl-label-solid pl-label-warning">Oczekuje</span>
  <span class="pl-label pl-label-solid pl-label-danger">Odrzucone</span>
  <span class="pl-label pl-label-solid pl-label-info">W drodze</span>
</div>
<div class="pl-flex pl-flex-wrap" style="gap: 0.75rem">
  <span class="pl-label pl-label-outline">Szkic</span>
  <span class="pl-label pl-label-outline pl-label-primary">Nowe</span>
  <span class="pl-label pl-label-outline pl-label-secondary">Beta</span>
  <span class="pl-label pl-label-outline pl-label-success">Opłacone</span>
  <span class="pl-label pl-label-outline pl-label-warning">Oczekuje</span>
  <span class="pl-label pl-label-outline pl-label-danger">Odrzucone</span>
  <span class="pl-label pl-label-outline pl-label-info">W drodze</span>
</div>
```

## Iskra

`.pl-label-spark` to limonkowe wyróżnienie — używaj go oszczędnie, np. dla nowości.

```html example row
<span class="pl-label pl-label-spark">Nowość</span>
<span class="pl-label pl-label-spark pl-label-pill">−20% do niedzieli</span>
<span class="pl-label pl-label-spark pl-label-outline">Polecane</span>
```

## Kropka statusu

`.pl-label-dot` dodaje kropkę przed tekstem. Z `.pl-label-pulse` kropka pulsuje — dobre dla stanów „na żywo".

```html example row
<span class="pl-label pl-label-dot pl-label-success">Online</span>
<span class="pl-label pl-label-dot pl-label-warning">Zaraz wracam</span>
<span class="pl-label pl-label-dot">Offline</span>
<span class="pl-label pl-label-dot pl-label-pulse pl-label-danger">Na żywo</span>
<span class="pl-label pl-label-dot pl-label-pulse pl-label-outline pl-label-success">Wdrożenie trwa</span>
<span class="pl-label pl-label-dot pl-label-solid pl-label-primary">Aktywny</span>
```

## Z ikoną

Ikona w etykiecie dopasowuje się do wielkości tekstu.

```html example row
<span class="pl-label pl-label-success"><span data-pl-icon="check"></span> Zweryfikowany</span>
<span class="pl-label pl-label-warning"><span data-pl-icon="clock"></span> 2 dni do końca</span>
<span class="pl-label pl-label-primary"><span data-pl-icon="sparkles"></span> Pro</span>
<span class="pl-label pl-label-outline"><span data-pl-icon="lock"></span> Prywatne</span>
```

## Kształt i rozmiary

`.pl-label-pill` zaokrągla etykietę do pastylki. Rozmiary: `.pl-label-small` i `.pl-label-large`.

```html example row
<span class="pl-label pl-label-primary pl-label-small">Mała</span>
<span class="pl-label pl-label-primary">Domyślna</span>
<span class="pl-label pl-label-primary pl-label-large">Duża</span>
<span class="pl-label pl-label-success pl-label-pill pl-label-small">Pastylka</span>
<span class="pl-label pl-label-success pl-label-pill">Pastylka</span>
<span class="pl-label pl-label-success pl-label-pill pl-label-large pl-label-dot">Pastylka</span>
```

## Etykieta jako link

Na elemencie `<a>` lub `<button>` etykieta reaguje na hover i fokus.

```html example row
<a class="pl-label" href="#">#projektowanie</a>
<a class="pl-label pl-label-primary" href="#">#css</a>
<a class="pl-label pl-label-outline pl-label-info" href="#">#dostępność</a>
<a class="pl-label pl-label-solid pl-label-secondary pl-label-pill" href="#">Wszystkie tematy</a>
```

## W kontekście

Etykiety dobrze czują się obok nagłówków, w tabelach i w kartach.

```html example
<div class="pl-card" style="max-width: 28rem">
  <div class="pl-card-body">
    <p class="pl-flex pl-flex-middle" style="gap: 0.5rem; margin-bottom: 0.75rem">
      <span class="pl-label pl-label-dot pl-label-success">Opublikowany</span>
      <span class="pl-label">v1.8</span>
    </p>
    <h3 class="pl-card-title">Dziennik zmian — październik <span class="pl-label pl-label-spark pl-label-small">Nowość</span></h3>
    <p class="pl-card-text">Nowy edytor faktur, eksport do CSV i szybsze wyszukiwanie kontrahentów.</p>
  </div>
</div>
```

## API

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-label` | Etykieta bazowa (neutralna, miękka). |
| `.pl-label-primary` `-secondary` `-success` `-warning` `-danger` `-info` | Ton etykiety. |
| `.pl-label-spark` | Limonkowe wyróżnienie. |
| `.pl-label-solid` | Pełne wypełnienie kolorem tonu. |
| `.pl-label-outline` | Sama ramka, przezroczyste tło. |
| `.pl-label-dot` | Kropka statusu przed tekstem. |
| `.pl-label-pulse` | Pulsowanie kropki (razem z `.pl-label-dot`). |
| `.pl-label-pill` | Kształt pastylki. |
| `.pl-label-small` `.pl-label-large` | Rozmiary. |

### Zmienne CSS

| Zmienna | Domyślnie | Opis |
| --- | --- | --- |
| `--pl-label-h` | `1.5rem` | Minimalna wysokość. |
| `--pl-label-px` | `0.55rem` | Odstęp poziomy. |
