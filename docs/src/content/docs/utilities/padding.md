---
title: Padding
description: Klasy odstępów wewnętrznych — cztery rozmiary oraz usuwanie paddingu z wybranych stron, także responsywnie.
---

## Podstawowe użycie

Klasa `.pl-padding` dodaje elementowi wygodny odstęp wewnętrzny, który rośnie płynnie z szerokością okna (od 1.5rem do 2.5rem).

```html example
<div class="pl-padding pl-background-muted pl-border-rounded">
  <h4>Bezpłatna dostawa</h4>
  <p>Zamówienia powyżej 200 zł wysyłamy na nasz koszt — kurierem lub do paczkomatu.</p>
</div>
```

## Rozmiary

Dostępne są warianty `.pl-padding-xsmall`, `.pl-padding-small` i `.pl-padding-large`.

```html example
<div class="pl-grid pl-child-width-1-2@s pl-child-width-1-4@m">
  <div><div class="pl-padding-xsmall demo-p"><div>xsmall</div></div></div>
  <div><div class="pl-padding-small demo-p"><div>small</div></div></div>
  <div><div class="pl-padding demo-p"><div>domyślny</div></div></div>
  <div><div class="pl-padding-large demo-p"><div>large</div></div></div>
</div>
```

```css example-css
.demo-p {
  border: 1px dashed var(--pl-primary-border);
  border-radius: var(--pl-radius-md);
  background: var(--pl-primary-soft);
}
.demo-p > div {
  padding: 0.5rem 0.75rem;
  border-radius: var(--pl-radius-xs);
  background: var(--pl-surface);
  font-family: var(--pl-font-mono);
  font-size: var(--pl-text-xs);
}
```

| Klasa | Wartość |
| --- | --- |
| `.pl-padding-xsmall` | 0.5rem |
| `.pl-padding-small` | 1rem |
| `.pl-padding` | 1.5rem → 2.5rem |
| `.pl-padding-large` | 2.5rem → 4.5rem |

## Usuwanie paddingu

`.pl-padding-remove` zeruje padding ze wszystkich stron. Warianty `-top`, `-bottom`, `-left`, `-right`, `-vertical` i `-horizontal` działają na wybrane krawędzie — np. żeby obraz w karcie dochodził do samych brzegów.

```html example
<div class="pl-grid pl-child-width-1-3@m">
  <div><div class="pl-padding pl-padding-remove-top demo-p"><div>-remove-top</div></div></div>
  <div><div class="pl-padding pl-padding-remove-horizontal demo-p"><div>-remove-horizontal</div></div></div>
  <div><div class="pl-padding pl-padding-remove-vertical demo-p"><div>-remove-vertical</div></div></div>
</div>
```

## Warianty responsywne

Klasy `-remove…` przyjmują sufiksy `@s`, `@m`, `@l`, `@xl`.

```html example
<div class="pl-padding pl-padding-remove-left@m pl-border-left">
  <strong>Notatka redakcji</strong>
  <p class="pl-text-muted">Poniżej breakpointu <code>m</code> blok ma padding z każdej strony, powyżej — lewa krawędź przylega do linii.</p>
</div>
```

## API

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-padding` | Domyślny padding ze wszystkich stron. |
| `.pl-padding-xsmall` / `-small` / `-large` | Inne rozmiary. |
| `.pl-padding-remove` | Zeruje padding. |
| `.pl-padding-remove-{top\|bottom\|left\|right}` | Zeruje padding z jednej strony. |
| `.pl-padding-remove-vertical` / `-horizontal` | Zeruje padding w osi. |
| `…@s`, `…@m`, `…@l`, `…@xl` | Wariant responsywny klas `-remove…`. |
