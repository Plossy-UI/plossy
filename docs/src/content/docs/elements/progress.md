---
title: Progress
description: Paski postępu — natywny element progress, wariant z divów z etykietą, segmentami i paskami oraz pierścień w czystym CSS.
---

## Podstawowe użycie

Dodaj klasę `.pl-progress` do natywnego elementu `<progress>`. Wygląda tak samo w każdej przeglądarce i jest od razu dostępny dla czytników ekranu.

```html example narrow
<progress class="pl-progress" value="64" max="100">64%</progress>
```

## Tony

Klasy `.pl-progress-{ton}` zmieniają kolor wypełnienia; `.pl-progress-spark` to limonkowa iskra.

```html example narrow
<progress class="pl-progress pl-progress-primary" value="85" max="100"></progress>
<progress class="pl-progress pl-progress-secondary" value="70" max="100"></progress>
<progress class="pl-progress pl-progress-success" value="100" max="100"></progress>
<progress class="pl-progress pl-progress-warning" value="55" max="100"></progress>
<progress class="pl-progress pl-progress-danger" value="20" max="100"></progress>
<progress class="pl-progress pl-progress-info" value="40" max="100"></progress>
<progress class="pl-progress pl-progress-spark" value="62" max="100"></progress>
```

## Rozmiary

`.pl-progress-small` (cienka linia) i `.pl-progress-large`.

```html example narrow
<progress class="pl-progress pl-progress-small" value="45" max="100"></progress>
<progress class="pl-progress" value="45" max="100"></progress>
<progress class="pl-progress pl-progress-large" value="45" max="100"></progress>
```

## Nieokreślony

Element `<progress>` bez atrybutu `value` pokazuje animację oczekiwania.

```html example narrow
<progress class="pl-progress" aria-label="Wczytywanie"></progress>
<progress class="pl-progress pl-progress-small pl-progress-success" aria-label="Synchronizacja"></progress>
```

## Animowana zmiana wartości

Zmieniaj `value` z JavaScript — wypełnienie przesuwa się płynnie.

```html example narrow
<progress class="pl-progress" id="demo-progress" value="10" max="100"></progress>
<p style="margin-top: 1rem">
  <button class="pl-button pl-button-small" id="demo-progress-start" type="button">Rozpocznij wysyłanie</button>
</p>
```

```js example-js
const bar = document.getElementById('demo-progress');
let timer;
document.getElementById('demo-progress-start').addEventListener('click', () => {
  clearInterval(timer);
  bar.value = 0;
  timer = setInterval(() => {
    bar.value = Math.min(bar.value + 6 + Math.random() * 12, 100);
    if (bar.value >= 100) clearInterval(timer);
  }, 350);
});
```

## Pasek z divów

Gdy potrzebujesz etykiety w środku, segmentów lub pasków, użyj `.pl-progress-bar` z dzieckiem `.pl-progress-fill`. Wartość (0–100) podaj w zmiennej `--pl-progress`, a dla czytników ekranu dodaj `role="progressbar"` i atrybuty `aria-value*`.

```html example narrow
<div class="pl-progress-bar" role="progressbar" aria-label="Wykorzystane miejsce" aria-valuenow="64" aria-valuemin="0" aria-valuemax="100" style="--pl-progress: 64">
  <div class="pl-progress-fill"></div>
</div>
```

### Z nagłówkiem

`.pl-progress-label` nad paskiem pokazuje opis i wartość.

```html example narrow
<div class="pl-progress-label"><span>Miejsce na dysku</span><span>32 GB z 50 GB</span></div>
<div class="pl-progress-bar" role="progressbar" aria-label="Miejsce na dysku" aria-valuenow="64" aria-valuemin="0" aria-valuemax="100" style="--pl-progress: 64">
  <div class="pl-progress-fill"></div>
</div>
<div class="pl-progress-label" style="margin-top: 1.5rem"><span>Profil uzupełniony</span><span>90%</span></div>
<div class="pl-progress-bar pl-progress-success" role="progressbar" aria-label="Profil uzupełniony" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100" style="--pl-progress: 90">
  <div class="pl-progress-fill"></div>
</div>
```

### Etykieta w pasku

W rozmiarze `.pl-progress-large` tekst wewnątrz `.pl-progress-fill` jest widoczny.

```html example narrow
<div class="pl-progress-bar pl-progress-large" role="progressbar" aria-valuenow="72" aria-valuemin="0" aria-valuemax="100" style="--pl-progress: 72">
  <div class="pl-progress-fill">72%</div>
</div>
```

### Segmenty

Kilka wypełnień w jednym pasku — każde ma własną wartość `--pl-progress` i ton.

```html example narrow
<div class="pl-progress-label"><span>Budżet kwartalny</span><span>85% rozdysponowane</span></div>
<div class="pl-progress-bar pl-progress-large">
  <div class="pl-progress-fill" role="progressbar" aria-label="Marketing" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="--pl-progress: 40">Marketing</div>
  <div class="pl-progress-fill pl-progress-success" role="progressbar" aria-label="Rozwój" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100" style="--pl-progress: 30">Rozwój</div>
  <div class="pl-progress-fill pl-progress-warning" role="progressbar" aria-label="Wsparcie" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100" style="--pl-progress: 15">Wsparcie</div>
</div>
```

### Paski i animacja

`.pl-progress-striped` dodaje ukośne paski, a `.pl-progress-animated` wprawia je w ruch.

```html example narrow
<div class="pl-progress-bar pl-progress-large pl-progress-striped" style="--pl-progress: 55">
  <div class="pl-progress-fill"></div>
</div>
<div class="pl-progress-bar pl-progress-large pl-progress-striped pl-progress-animated pl-progress-success" style="--pl-progress: 75; margin-top: 1rem">
  <div class="pl-progress-fill">Instalowanie…</div>
</div>
<div class="pl-progress-bar pl-progress-striped pl-progress-animated pl-progress-info" style="--pl-progress: 35; margin-top: 1rem">
  <div class="pl-progress-fill"></div>
</div>
```

### Nieokreślony

`.pl-progress-indeterminate` — wypełnienie przesuwa się w pętli.

```html example narrow
<div class="pl-progress-bar pl-progress-indeterminate" role="progressbar" aria-label="Wczytywanie">
  <div class="pl-progress-fill"></div>
</div>
```

## Pierścień

`.pl-progress-ring` rysuje okrągły wskaźnik w czystym CSS (`conic-gradient`). Wartość podaj w `--pl-progress`; treść elementu trafia do środka.

```html example center
<div class="pl-progress-ring" role="progressbar" aria-valuenow="64" aria-valuemin="0" aria-valuemax="100" style="--pl-progress: 64">64%</div>
<div class="pl-progress-ring pl-progress-success" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="--pl-progress: 100"><span data-pl-icon="check"></span></div>
<div class="pl-progress-ring pl-progress-warning" role="progressbar" aria-valuenow="38" aria-valuemin="0" aria-valuemax="100" style="--pl-progress: 38">38%</div>
<div class="pl-progress-ring pl-progress-danger" role="progressbar" aria-valuenow="12" aria-valuemin="0" aria-valuemax="100" style="--pl-progress: 12">12%</div>
```

### Rozmiary i podpis

`.pl-progress-small` i `.pl-progress-large` skalują pierścień; element `<small>` w środku staje się podpisem.

```html example center
<div class="pl-progress-ring pl-progress-small" role="progressbar" aria-label="Postęp" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="--pl-progress: 75"></div>
<div class="pl-progress-ring" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="--pl-progress: 75">75%</div>
<div class="pl-progress-ring pl-progress-large" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="--pl-progress: 75">7 500<small>kroków</small></div>
<div class="pl-progress-ring pl-progress-large pl-progress-spark" role="progressbar" aria-valuenow="42" aria-valuemin="0" aria-valuemax="100" style="--pl-progress: 42; --pl-progress-width: 1rem">42%<small>celu</small></div>
```

### Animowany i nieokreślony

Zmiana `--pl-progress` animuje się płynnie. `.pl-progress-indeterminate` zamienia pierścień w obracający się łuk.

```html example center
<div class="pl-progress-ring pl-progress-large" id="demo-ring" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style="--pl-progress: 25">25%</div>
<div class="pl-progress-ring pl-progress-indeterminate" role="progressbar" aria-label="Wczytywanie"></div>
<button class="pl-button pl-button-small" id="demo-ring-random" type="button">Losuj wartość</button>
```

```js example-js
const ring = document.getElementById('demo-ring');
document.getElementById('demo-ring-random').addEventListener('click', () => {
  const value = Math.round(Math.random() * 100);
  ring.style.setProperty('--pl-progress', value);
  ring.setAttribute('aria-valuenow', value);
  ring.textContent = `${value}%`;
});
```

## W karcie

```html example
<div class="pl-card" style="max-width: 26rem; margin-inline: auto">
  <div class="pl-card-body pl-flex pl-flex-middle" style="gap: 1.25rem">
    <div class="pl-progress-ring pl-progress-success" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style="--pl-progress: 80">4/5</div>
    <div style="flex: 1">
      <h3 class="pl-card-title">Konfiguracja sklepu</h3>
      <p class="pl-card-text" style="font-size: var(--pl-text-sm)">Został ostatni krok — podłącz bramkę płatności.</p>
    </div>
  </div>
</div>
```

## API

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-progress` | Natywny `<progress>`; bez `value` — stan nieokreślony. |
| `.pl-progress-bar` | Pasek z divów (tor). |
| `.pl-progress-fill` | Wypełnienie paska; kilka obok siebie tworzy segmenty. |
| `.pl-progress-label` | Wiersz nad paskiem: opis + wartość. |
| `.pl-progress-striped` | Ukośne paski (na pasku lub pojedynczym wypełnieniu). |
| `.pl-progress-animated` | Ruch pasków. |
| `.pl-progress-indeterminate` | Stan nieokreślony paska lub pierścienia. |
| `.pl-progress-ring` | Pierścień postępu. |
| `.pl-progress-small` `.pl-progress-large` | Rozmiary (pasek i pierścień). |
| `.pl-progress-primary` … `.pl-progress-info`, `.pl-progress-spark` | Tony. |

### Zmienne CSS

| Zmienna | Domyślnie | Opis |
| --- | --- | --- |
| `--pl-progress` | `0` | Wartość 0–100 dla `.pl-progress-fill` i `.pl-progress-ring`. |
| `--pl-progress-h` | `0.5rem` | Wysokość paska. |
| `--pl-progress-track` | `var(--pl-muted-strong)` | Kolor toru. |
| `--pl-progress-size` | `4.5rem` | Średnica pierścienia. |
| `--pl-progress-width` | `0.4rem` | Grubość pierścienia. |

### Dostępność

Natywny `<progress>` nie wymaga dodatkowych atrybutów poza etykietą (`aria-label` lub `<label>`). Wariantom z divów nadaj `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax` i aktualizuj `aria-valuenow` razem z `--pl-progress`.
