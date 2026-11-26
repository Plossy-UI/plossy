---
title: Container
description: Wyśrodkowana kolumna treści o ograniczonej szerokości i bocznych marginesach, które rosną razem z ekranem.
---

## Podstawowe użycie

Klasa `.pl-container` ogranicza szerokość treści do tokenu `--pl-container` (domyślnie 1200px), wyśrodkowuje ją i dodaje boczne marginesy: 1rem na telefonie, 1.5rem od `s` i 2.5rem od `m`.

```html example flush
<div class="pl-section pl-section-muted pl-section-small">
  <div class="pl-container">
    <div class="pl-card pl-card-small"><div class="pl-card-body">
      <strong>.pl-container</strong> — treść trzyma się środka, niezależnie od szerokości okna.
    </div></div>
  </div>
</div>
```

## Szerokości

Modyfikatory zmieniają maksymalną szerokość. `.pl-container-expand` znosi limit, ale zostawia boczne marginesy.

```html example flush
<div class="pl-section pl-section-muted pl-section-small">
  <div class="pl-container pl-container-xsmall">
    <div class="pl-card pl-card-small"><div class="pl-card-body"><code>.pl-container-xsmall</code> — 720px, wąska kolumna do czytania</div></div>
  </div>
  <div class="pl-container pl-container-small" style="margin-top: .75rem">
    <div class="pl-card pl-card-small"><div class="pl-card-body"><code>.pl-container-small</code> — 900px</div></div>
  </div>
  <div class="pl-container" style="margin-top: .75rem">
    <div class="pl-card pl-card-small"><div class="pl-card-body"><code>.pl-container</code> — 1200px</div></div>
  </div>
  <div class="pl-container pl-container-large" style="margin-top: .75rem">
    <div class="pl-card pl-card-small"><div class="pl-card-body"><code>.pl-container-large</code> — 1400px</div></div>
  </div>
  <div class="pl-container pl-container-xlarge" style="margin-top: .75rem">
    <div class="pl-card pl-card-small"><div class="pl-card-body"><code>.pl-container-xlarge</code> — 1600px</div></div>
  </div>
  <div class="pl-container pl-container-expand" style="margin-top: .75rem">
    <div class="pl-card pl-card-small"><div class="pl-card-body"><code>.pl-container-expand</code> — cała dostępna szerokość</div></div>
  </div>
</div>
```

## Własna szerokość

Limit jest zmienną CSS. Ustaw `--pl-container` globalnie (na `:root`), aby zmienić domyślną szerokość w całym projekcie, albo `--pl-container-max` na pojedynczym kontenerze.

```html example flush
<div class="pl-section pl-section-muted pl-section-small">
  <div class="pl-container" style="--pl-container-max: 30rem">
    <div class="pl-card pl-card-small"><div class="pl-card-body">Kontener o szerokości 30rem — np. formularz logowania.</div></div>
  </div>
</div>
```

```css
:root {
  --pl-container: 1320px;
}
```

## Zagnieżdżanie

Kontener umieszczony w innym kontenerze nie dokłada drugiego marginesu bocznego — można więc bezpiecznie zawęzić fragment treści.

```html example flush
<div class="pl-section pl-section-muted pl-section-small">
  <div class="pl-container">
    <div class="pl-card pl-card-small"><div class="pl-card-body">Zewnętrzny kontener</div></div>
    <div class="pl-container pl-container-xsmall" style="margin-top: .75rem">
      <div class="pl-card pl-card-small"><div class="pl-card-body">Wewnętrzny <code>.pl-container-xsmall</code> — węższy, bez podwójnych marginesów</div></div>
    </div>
  </div>
</div>
```

## Element „na spad"

`.pl-container-item-padding-remove-left` i `-right` znoszą boczny margines kontenera dla wybranego elementu — zdjęcie dochodzi wtedy do krawędzi na wąskich ekranach. Wersja bez sufiksu działa po obu stronach.

```html example flush
<div class="pl-section pl-section-muted pl-section-small">
  <div class="pl-container pl-container-small">
    <p>Tekst trzyma marginesy kontenera, a zdjęcie poniżej wychodzi poza nie z prawej strony.</p>
    <div class="pl-container-item-padding-remove-right">
      <img src="/img/photo-2.svg" alt="Widok z lotu ptaka" style="display: block; width: 100%; height: 12rem; object-fit: cover">
    </div>
  </div>
</div>
```

## API

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-container` | Kontener o szerokości `--pl-container` (1200px). |
| `.pl-container-xsmall` | Maks. 720px. |
| `.pl-container-small` | Maks. 900px. |
| `.pl-container-large` | Maks. 1400px. |
| `.pl-container-xlarge` | Maks. 1600px. |
| `.pl-container-expand` | Bez limitu szerokości, z marginesami bocznymi. |
| `.pl-container-padding-remove` | Kontener bez marginesów bocznych. |
| `.pl-container-item-padding-remove` | Element potomny wychodzi poza marginesy z obu stron. |
| `.pl-container-item-padding-remove-left` | …tylko z lewej. |
| `.pl-container-item-padding-remove-right` | …tylko z prawej. |

### Zmienne CSS

| Zmienna | Domyślnie | Opis |
| --- | --- | --- |
| `--pl-container` | `1200px` | Globalna szerokość kontenera (token). |
| `--pl-container-max` | `var(--pl-container)` | Limit pojedynczego kontenera. |
| `--pl-container-pad` | `1rem` / `1.5rem` / `2.5rem` | Margines boczny (bazowy / od `s` / od `m`). |
