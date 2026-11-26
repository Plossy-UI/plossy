---
title: Margin
description: Klasy odstępów zewnętrznych — sześć rozmiarów, kierunki, marginesy automatyczne i usuwanie marginesów, także responsywnie.
---

## Podstawowe użycie

Klasa `.pl-margin` dodaje elementowi margines dolny, a jeśli element ma poprzednika — również górny. Dzięki temu kolejne bloki mają równy odstęp, a pierwszy i ostatni nie „odstają" od krawędzi kontenera.

```html example
<div class="pl-margin pl-card pl-card-body">Podsumowanie zamówienia</div>
<div class="pl-margin pl-card pl-card-body">Adres dostawy</div>
<div class="pl-margin pl-card pl-card-body">Metoda płatności</div>
```

## Rozmiary

Do nazwy dodaj `-xsmall`, `-small`, `-medium`, `-large` lub `-xlarge`. Dwa największe rozmiary rosną płynnie razem z szerokością okna.

```html example
<div class="demo-m pl-margin-xsmall">.pl-margin-xsmall</div>
<div class="demo-m pl-margin-xsmall">0.5rem</div>
<div class="demo-m pl-margin-small">.pl-margin-small — 0.75rem</div>
<div class="demo-m pl-margin">.pl-margin — 1.5rem</div>
<div class="demo-m pl-margin-medium">.pl-margin-medium — 3rem</div>
<div class="demo-m pl-margin-large">.pl-margin-large — 4–5rem</div>
<div class="demo-m pl-margin-xlarge">.pl-margin-xlarge — 6–9rem</div>
<div class="demo-m">Koniec</div>
```

```css example-css
.demo-m {
  padding: 0.6rem 0.9rem;
  border: 1px solid var(--pl-primary-border);
  border-radius: var(--pl-radius-sm);
  background: var(--pl-primary-soft);
  color: var(--pl-primary-text);
  font-family: var(--pl-font-mono);
  font-size: var(--pl-text-xs);
}
```

| Klasa | Wartość |
| --- | --- |
| `.pl-margin-xsmall` | `--pl-space-2` (0.5rem) |
| `.pl-margin-small` | `--pl-space-3` (0.75rem) |
| `.pl-margin` | `--pl-space-5` (1.5rem) |
| `.pl-margin-medium` | `--pl-space-7` (3rem) |
| `.pl-margin-large` | 4rem → 5rem |
| `.pl-margin-xlarge` | 6rem → 9rem |

## Kierunki

Sufiksy `-top`, `-bottom`, `-left`, `-right` ustawiają margines tylko z jednej strony. Łączą się z każdym rozmiarem: `.pl-margin-small-top`, `.pl-margin-large-bottom`, `.pl-margin-medium-left`…

```html example
<div class="pl-flex pl-flex-middle">
  <span class="pl-badge">Nowość</span>
  <strong class="pl-margin-small-left">Raport kwartalny</strong>
  <span class="pl-margin-left pl-text-muted">12 stron</span>
  <button class="pl-button pl-button-small pl-margin-medium-left" type="button">Pobierz</button>
</div>
<p class="pl-margin-medium-top">Ten akapit ma klasę <code>.pl-margin-medium-top</code>.</p>
```

## Marginesy automatyczne

`.pl-margin-auto` wyśrodkowuje blok w poziomie. `.pl-margin-auto-left` i `.pl-margin-auto-right` dosuwają element do krawędzi — w kontenerze flex „odpychają" go od sąsiadów. Dostępne są też `-auto-top`, `-auto-bottom` i `-auto-vertical`.

```html example
<div class="pl-card pl-card-body pl-margin-auto" style="max-width: 20rem">Wyśrodkowana karta</div>

<div class="pl-flex pl-flex-middle pl-margin-top">
  <strong>Zespół produktowy</strong>
  <span class="pl-margin-small-left pl-text-muted">8 osób</span>
  <button class="pl-button pl-button-primary pl-button-small pl-margin-auto-left" type="button">Zaproś</button>
</div>
```

## Usuwanie marginesów

`.pl-margin-remove` zeruje wszystkie marginesy, a warianty `-top`, `-bottom`, `-left`, `-right`, `-vertical`, `-horizontal` — wybrane strony. Przydatne przy nagłówkach i akapitach, które mają własne odstępy.

```html example
<h4 class="pl-margin-remove-bottom">Anna Kowalczyk</h4>
<p class="pl-text-meta pl-margin-remove-top">Projektantka produktu · Kraków</p>
```

### Sąsiedzi i dzieci

| Klasa | Działanie |
| --- | --- |
| `.pl-margin-remove-adjacent` | Usuwa górny margines **następnego** elementu. |
| `.pl-margin-remove-first-child` | Usuwa górny margines pierwszego dziecka. |
| `.pl-margin-remove-last-child` | Usuwa dolny margines ostatniego dziecka. |

```html example
<h4 class="pl-margin-remove-adjacent pl-margin-remove-bottom">Tytuł bez odstępu</h4>
<p class="pl-margin">Ten akapit ma klasę <code>.pl-margin</code>, ale poprzednik wyzerował jego górny margines.</p>
```

## Warianty responsywne

Klasy `-auto…` i `-remove…` przyjmują sufiksy `@s`, `@m`, `@l`, `@xl` i działają od danego breakpointu w górę.

```html example
<div class="pl-flex pl-flex-wrap pl-flex-middle pl-gap-small">
  <strong>Faktura FV/2025/118</strong>
  <span class="pl-label">Opłacona</span>
  <button class="pl-button pl-button-small pl-margin-auto-left@m" type="button">Pobierz PDF</button>
</div>
<p class="pl-text-meta pl-margin-small-top">Od breakpointu <code>m</code> przycisk odsuwa się do prawej krawędzi.</p>
```

## API

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-margin` | Margines dolny (+ górny, gdy element ma poprzednika). |
| `.pl-margin-{xsmall\|small\|medium\|large\|xlarge}` | To samo w innym rozmiarze. |
| `.pl-margin-{top\|bottom\|left\|right}` | Margines z jednej strony. |
| `.pl-margin-{rozmiar}-{strona}` | Rozmiar + strona, np. `.pl-margin-small-top`. |
| `.pl-margin-auto` | `margin-left` i `margin-right: auto`. |
| `.pl-margin-auto-{left\|right\|top\|bottom\|vertical}` | Margines automatyczny z wybranej strony. |
| `.pl-margin-remove` | Zeruje wszystkie marginesy. |
| `.pl-margin-remove-{top\|bottom\|left\|right\|vertical\|horizontal}` | Zeruje wybrane marginesy. |
| `.pl-margin-remove-adjacent` | Zeruje górny margines następnego elementu. |
| `.pl-margin-remove-first-child` / `-last-child` | Zeruje margines skrajnego dziecka. |
| `…@s`, `…@m`, `…@l`, `…@xl` | Wariant responsywny klas `-auto…` i `-remove…`. |
