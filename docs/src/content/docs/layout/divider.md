---
title: Divider
description: Linie oddzielające treść — od włosowej kreski, przez ornament z iskrą, po linię z etykietą.
---

## Podstawowe użycie

Dodaj `.pl-divider` do elementu `<hr>` (lub `<div>`).

```html example
<p>Zamówienie nr 20418 zostało opłacone i przekazane do realizacji.</p>
<hr class="pl-divider">
<p>Przewidywana data dostawy: piątek, 27 listopada.</p>
```

## Ornament

`.pl-divider-icon` przerywa linię pośrodku limonkową iskrą z delikatną poświatą.

```html example
<p>Rozdział pierwszy kończy się w chwili, gdy pociąg rusza z peronu.</p>
<hr class="pl-divider-icon">
<p>Rozdział drugi zaczyna się trzy lata później, w zupełnie innym mieście.</p>
```

## Krótka kreska

`.pl-divider-small` to krótki, grubszy akcent — zwykle pod nagłówkiem. Dziedziczy wyrównanie tekstu rodzica.

```html example
<h3>O pracowni</h3>
<hr class="pl-divider-small">
<p>Od 2012 roku projektujemy meble z litego drewna.</p>

<div style="text-align: center; margin-top: 2.5rem">
  <h3>Nasze wartości</h3>
  <hr class="pl-divider-small">
  <p>Rzemiosło, prostota, trwałość.</p>
</div>
```

## Etykieta

`.pl-divider-label` umieszcza tekst w środku linii. `-label-left` i `-label-right` dosuwają go do krawędzi. Użyj elementu `<div>` — `<hr>` nie może zawierać treści.

```html example
<button class="pl-button pl-button-primary pl-width-1-1" type="button">Zaloguj się e-mailem</button>
<div class="pl-divider-label">lub</div>
<button class="pl-button pl-width-1-1" type="button">Kontynuuj przez Google</button>

<div class="pl-divider-label pl-divider-label-left" role="separator">Dzisiaj</div>
<p>Anna dodała 3 pliki do projektu „Katalog wiosna".</p>
<div class="pl-divider-label pl-divider-label-right pl-divider-dashed" role="separator">Koniec listy</div>
```

## Style linii

`.pl-divider-dashed` i `.pl-divider-dotted` zmieniają krój linii, `.pl-divider-strong` ją przyciemnia, a `.pl-divider-fade` wygasza ku końcom.

```html example
<hr class="pl-divider pl-divider-dashed">
<hr class="pl-divider pl-divider-dotted">
<hr class="pl-divider pl-divider-strong">
<hr class="pl-divider pl-divider-fade">
```

## Pionowa

`.pl-divider-vertical` rysuje linię pionową o wysokości `--pl-divider-h` (domyślnie 6rem), wyśrodkowaną w poziomie. Wewnątrz `.pl-flex` lub `.pl-grid` rozciąga się na wysokość sąsiadów.

```html example
<p style="text-align: center">Przewiń dalej</p>
<hr class="pl-divider-vertical" style="--pl-divider-h: 3.5rem">
<p style="text-align: center">Historia marki</p>
```

```html example
<div class="pl-flex pl-flex-middle pl-gap-medium">
  <div><strong>128</strong><br><small>projektów</small></div>
  <hr class="pl-divider-vertical">
  <div><strong>42</strong><br><small>klientów</small></div>
  <hr class="pl-divider-vertical pl-divider-dashed">
  <div><strong>9 lat</strong><br><small>na rynku</small></div>
</div>
```

## Odstępy

Domyślny margines pionowy to 1.5rem. `.pl-divider-compact` go zmniejsza, `.pl-divider-spacious` zwiększa; dowolną wartość ustawisz zmienną `--pl-divider-gap`.

```html example
<p>Kompaktowo</p>
<hr class="pl-divider pl-divider-compact">
<p>Przestronnie</p>
<hr class="pl-divider-icon pl-divider-spacious">
<p>Koniec</p>
```

## API

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-divider` | Pozioma linia. |
| `.pl-divider-icon` | Linia z iskrą pośrodku. |
| `.pl-divider-small` | Krótka, gruba kreska. |
| `.pl-divider-vertical` | Linia pionowa. |
| `.pl-divider-label` | Linia z tekstem (`-label-left`, `-label-right`). |
| `.pl-divider-dashed` / `-dotted` | Linia przerywana / kropkowana. |
| `.pl-divider-strong` | Ciemniejsza linia. |
| `.pl-divider-fade` | Linia zanikająca ku końcom. |
| `.pl-divider-compact` / `-spacious` | Mniejszy / większy margines. |

### Zmienne CSS

| Zmienna | Domyślnie | Opis |
| --- | --- | --- |
| `--pl-divider-color` | `var(--pl-border)` | Kolor linii. |
| `--pl-divider-gap` | `1.5rem` | Margines pionowy. |
| `--pl-divider-h` | `6rem` | Wysokość linii pionowej. |
| `--pl-divider-small-color` | `var(--pl-text)` | Kolor krótkiej kreski. |
