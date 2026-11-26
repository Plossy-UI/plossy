---
title: Width
description: Szerokości ułamkowe, stałe i automatyczne — z wariantami dla każdego breakpointu.
---

## Ułamki

Klasy `.pl-width-{licznik}-{mianownik}` ustawiają szerokość jako część rodzica. Najczęściej używa się ich na komórkach [siatki](/docs/layout/grid/).

```html example
<div class="pl-grid pl-grid-small">
  <div class="pl-width-1-1"><div class="pl-card pl-card-small"><div class="pl-card-body">1-1</div></div></div>
  <div class="pl-width-1-2"><div class="pl-card pl-card-small"><div class="pl-card-body">1-2</div></div></div>
  <div class="pl-width-1-2"><div class="pl-card pl-card-small"><div class="pl-card-body">1-2</div></div></div>
  <div class="pl-width-1-3"><div class="pl-card pl-card-small"><div class="pl-card-body">1-3</div></div></div>
  <div class="pl-width-2-3"><div class="pl-card pl-card-small"><div class="pl-card-body">2-3</div></div></div>
  <div class="pl-width-1-4"><div class="pl-card pl-card-small"><div class="pl-card-body">1-4</div></div></div>
  <div class="pl-width-3-4"><div class="pl-card pl-card-small"><div class="pl-card-body">3-4</div></div></div>
  <div class="pl-width-1-5"><div class="pl-card pl-card-small"><div class="pl-card-body">1-5</div></div></div>
  <div class="pl-width-4-5"><div class="pl-card pl-card-small"><div class="pl-card-body">4-5</div></div></div>
  <div class="pl-width-2-5"><div class="pl-card pl-card-small"><div class="pl-card-body">2-5</div></div></div>
  <div class="pl-width-3-5"><div class="pl-card pl-card-small"><div class="pl-card-body">3-5</div></div></div>
  <div class="pl-width-1-6"><div class="pl-card pl-card-small"><div class="pl-card-body">1-6</div></div></div>
  <div class="pl-width-5-6"><div class="pl-card pl-card-small"><div class="pl-card-body">5-6</div></div></div>
</div>
```

## Auto i expand

`.pl-width-auto` dopasowuje element do treści, `.pl-width-expand` wypełnia miejsce, które zostało w wierszu.

```html example
<div class="pl-grid pl-grid-small">
  <div class="pl-width-auto"><div class="pl-card pl-card-small"><div class="pl-card-body">Auto</div></div></div>
  <div class="pl-width-expand"><div class="pl-card pl-card-small"><div class="pl-card-body">Expand</div></div></div>
  <div class="pl-width-1-4"><div class="pl-card pl-card-small"><div class="pl-card-body">1-4</div></div></div>
</div>
```

## Stałe szerokości

Pięć stałych rozmiarów — nie przekraczają szerokości rodzica.

```html example column
<div class="pl-card pl-card-small pl-width-small"><div class="pl-card-body">small · 152px</div></div>
<div class="pl-card pl-card-small pl-width-medium"><div class="pl-card-body">medium · 300px</div></div>
<div class="pl-card pl-card-small pl-width-large"><div class="pl-card-body">large · 448px</div></div>
<div class="pl-card pl-card-small pl-width-xlarge"><div class="pl-card-body">xlarge · 600px</div></div>
<div class="pl-card pl-card-small pl-width-2xlarge"><div class="pl-card-body">2xlarge · 752px</div></div>
```

## Szerokość z treści

`.pl-width-max-content` rozciąga element do najdłuższej linii treści, `.pl-width-min-content` zwęża go do najdłuższego słowa.

```html example column
<div class="pl-card pl-card-small pl-width-max-content"><div class="pl-card-body">Dokładnie tyle, ile zajmuje tekst</div></div>
<div class="pl-card pl-card-small pl-width-min-content"><div class="pl-card-body">Najwęziej jak to możliwe</div></div>
```

## Responsywność

Każda klasa ma warianty `@s` (640px), `@m` (960px), `@l` (1200px) i `@xl` (1600px), które działają od danej szerokości okna w górę. Zmień rozmiar okna, aby zobaczyć efekt.

```html example
<div class="pl-grid pl-grid-small">
  <div class="pl-width-1-1 pl-width-1-2@s pl-width-1-4@l"><div class="pl-card pl-card-small"><div class="pl-card-body">1-1 → 1-2@s → 1-4@l</div></div></div>
  <div class="pl-width-1-1 pl-width-1-2@s pl-width-1-4@l"><div class="pl-card pl-card-small"><div class="pl-card-body">1-1 → 1-2@s → 1-4@l</div></div></div>
  <div class="pl-width-1-1 pl-width-expand@l"><div class="pl-card pl-card-small"><div class="pl-card-body">1-1 → expand@l</div></div></div>
</div>
```

## Poza siatką

Klasy szerokości działają na dowolnym elemencie — przycisku, polu formularza, obrazie.

```html example column
<button class="pl-button pl-button-primary pl-width-1-1" type="button">Przycisk na całą szerokość</button>
<button class="pl-button pl-width-1-1 pl-width-medium@s" type="button">Pełny na telefonie, 300px od s</button>
<img class="pl-width-1-2" src="/img/photo-6.svg" alt="Zdjęcie o szerokości połowy rodzica" style="border-radius: var(--pl-radius-md)">
```

## API

### Klasy

Wszystkie klasy mają warianty `@s @m @l @xl`.

| Klasa | Opis |
| --- | --- |
| `.pl-width-1-1` | 100%. |
| `.pl-width-1-2` | 50%. |
| `.pl-width-1-3` / `.pl-width-2-3` | 33,3% / 66,6%. |
| `.pl-width-1-4` / `.pl-width-3-4` | 25% / 75%. |
| `.pl-width-1-5` / `-2-5` / `-3-5` / `-4-5` | 20% / 40% / 60% / 80%. |
| `.pl-width-1-6` / `.pl-width-5-6` | 16,6% / 83,3%. |
| `.pl-width-auto` | Szerokość treści. |
| `.pl-width-expand` | Reszta wolnego miejsca. |
| `.pl-width-small` | 9.5rem (152px). |
| `.pl-width-medium` | 18.75rem (300px). |
| `.pl-width-large` | 28rem (448px). |
| `.pl-width-xlarge` | 37.5rem (600px). |
| `.pl-width-2xlarge` | 47rem (752px). |
| `.pl-width-max-content` / `-min-content` | Szerokość wewnętrzna treści. |
