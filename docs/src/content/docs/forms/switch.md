---
title: Switch
description: Przełącznik ze sprężystym kciukiem, który rozciąga się przy wciśnięciu. Czysty CSS na natywnym polu checkbox.
order: 3
---

## Podstawowe użycie

Dodaj `.pl-switch` do pola `<input type="checkbox">`. Atrybut `role="switch"` sprawia, że czytniki ekranu ogłaszają stan „włączone / wyłączone".

```html example column
<label class="pl-form-check">
  <input class="pl-switch" type="checkbox" role="switch" checked>
  Tryb skupienia
</label>
<label class="pl-form-check">
  <input class="pl-switch" type="checkbox" role="switch">
  Dźwięki powiadomień
</label>
<label class="pl-form-check">
  <input class="pl-switch" type="checkbox" role="switch" disabled>
  Synchronizacja w tle (niedostępna offline)
</label>
<label class="pl-form-check">
  <input class="pl-switch" type="checkbox" role="switch" checked disabled>
  Szyfrowanie danych (wymuszone przez administratora)
</label>
```

## Rozmiary

`.pl-form-small` i `.pl-form-large` na kontrolce.

```html example row
<label class="pl-form-check"><input class="pl-switch pl-form-small" type="checkbox" role="switch" checked> Mały</label>
<label class="pl-form-check"><input class="pl-switch" type="checkbox" role="switch" checked> Domyślny</label>
<label class="pl-form-check"><input class="pl-switch pl-form-large" type="checkbox" role="switch" checked> Duży</label>
```

## Tony

Klasy `.pl-form-{ton}` zmieniają kolor włączonego przełącznika.

```html example row
<input class="pl-switch pl-form-primary" type="checkbox" role="switch" checked aria-label="Primary">
<input class="pl-switch pl-form-secondary" type="checkbox" role="switch" checked aria-label="Secondary">
<input class="pl-switch pl-form-success" type="checkbox" role="switch" checked aria-label="Success">
<input class="pl-switch pl-form-warning" type="checkbox" role="switch" checked aria-label="Warning">
<input class="pl-switch pl-form-danger" type="checkbox" role="switch" checked aria-label="Danger">
<input class="pl-switch pl-form-info" type="checkbox" role="switch" checked aria-label="Info">
```

## Lista ustawień

`.pl-form-check-reverse` ustawia tekst po lewej, a przełącznik po prawej stronie — klasyczny układ ekranu ustawień. Opis dodasz przez `.pl-form-check-body` i `.pl-form-check-text`.

```html example narrow
<div class="pl-card pl-card-body">
  <div class="pl-form-checks" style="gap: 1.1rem">
    <label class="pl-form-check pl-form-check-reverse">
      <input class="pl-switch" type="checkbox" role="switch" checked>
      <span class="pl-form-check-body">
        Powiadomienia e-mail
        <span class="pl-form-check-text">Wzmianki, komentarze i zaproszenia do projektów.</span>
      </span>
    </label>
    <label class="pl-form-check pl-form-check-reverse">
      <input class="pl-switch" type="checkbox" role="switch">
      <span class="pl-form-check-body">
        Powiadomienia push
        <span class="pl-form-check-text">Na telefonie i w przeglądarce.</span>
      </span>
    </label>
    <label class="pl-form-check pl-form-check-reverse">
      <input class="pl-switch pl-form-success" type="checkbox" role="switch" checked>
      <span class="pl-form-check-body">
        Weryfikacja dwuetapowa
        <span class="pl-form-check-text">Dodatkowy kod przy każdym logowaniu.</span>
      </span>
    </label>
  </div>
</div>
```

## W karcie wyboru

Przełącznik działa także w `.pl-form-card` — cała karta jest klikalna i podświetla się po włączeniu.

```html example narrow
<label class="pl-form-card pl-form-card-flip">
  <input class="pl-switch" type="checkbox" role="switch" checked>
  <span class="pl-form-card-body">
    <span class="pl-form-card-title"><span data-pl-icon="zap"></span> Automatyczne kopie zapasowe</span>
    <span class="pl-form-card-text">Codziennie o 3:00, przechowywane przez 30 dni.</span>
  </span>
</label>
```

## API

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-switch` | Przełącznik (`<input type="checkbox" role="switch">`). |
| `.pl-form-small` `.pl-form-large` | Rozmiary. |
| `.pl-form-primary` … `.pl-form-info` | Ton stanu włączonego. |
| `.pl-form-check` | Etykieta z tekstem; `.pl-form-check-reverse` — przełącznik po prawej. |

### Zmienne CSS

| Zmienna | Opis |
| --- | --- |
| `--pl-switch-h` | Wysokość przełącznika (domyślnie `1.375rem`). |
| `--pl-switch-w` | Szerokość (domyślnie 1,75 × wysokość). |
| `--pl-form-accent` | Kolor stanu włączonego. |
