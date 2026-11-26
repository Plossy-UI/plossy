---
title: Tile
description: Kafel — prosty blok z tłem i hojnym paddingiem, stworzony do układania obok siebie w siatce.
---

## Podstawowe użycie

`.pl-tile` to blok z paddingiem. Styl nadają modyfikatory `-default`, `-muted`, `-primary` i `-secondary`. W połączeniu z `.pl-grid-collapse` kafle tworzą jednolitą mozaikę.

```html example
<div class="pl-grid pl-grid-collapse pl-child-width-1-2@s pl-grid-match">
  <div>
    <div class="pl-tile pl-tile-default">
      <h4>Default</h4>
      <p>Jasna powierzchnia z włosową ramką.</p>
    </div>
  </div>
  <div>
    <div class="pl-tile pl-tile-muted">
      <h4>Muted</h4>
      <p>Stonowane, piaskowe tło.</p>
    </div>
  </div>
  <div>
    <div class="pl-tile pl-tile-primary">
      <h4>Primary</h4>
      <p>Kolor akcentu z <a href="#">czytelnym linkiem</a>.</p>
    </div>
  </div>
  <div>
    <div class="pl-tile pl-tile-secondary">
      <h4>Secondary</h4>
      <p>„Atramentowe" tło z jasnym tekstem.</p>
    </div>
  </div>
</div>
```

## Padding

Domyślny padding to 2rem (3rem od `m`). Zmienisz go klasami `-xsmall`, `-small`, `-large`, `-xlarge` lub usuniesz przez `-padding-remove`.

```html example
<div class="pl-grid pl-grid-small pl-child-width-1-2@s pl-grid-middle">
  <div><div class="pl-tile pl-tile-muted pl-tile-xsmall"><code>.pl-tile-xsmall</code></div></div>
  <div><div class="pl-tile pl-tile-muted pl-tile-small"><code>.pl-tile-small</code></div></div>
  <div><div class="pl-tile pl-tile-muted"><code>.pl-tile</code></div></div>
  <div><div class="pl-tile pl-tile-muted pl-tile-large"><code>.pl-tile-large</code></div></div>
  <div class="pl-width-1-1"><div class="pl-tile pl-tile-muted pl-tile-xlarge"><code>.pl-tile-xlarge</code></div></div>
</div>
```

## Zaokrąglenie

Kafle są domyślnie prostokątne, żeby stykały się krawędziami. `.pl-tile-rounded` dodaje zaokrąglone rogi dla kafli stojących osobno.

```html example
<div class="pl-grid pl-grid-small pl-child-width-1-3@s pl-grid-match">
  <div>
    <div class="pl-tile pl-tile-small pl-tile-muted pl-tile-rounded">
      <h5>Projektowanie</h5>
      <p>Makiety, prototypy i system wizualny.</p>
    </div>
  </div>
  <div>
    <div class="pl-tile pl-tile-small pl-tile-primary pl-tile-rounded">
      <h5>Wdrożenie</h5>
      <p>Kodowanie i integracja z backendem.</p>
    </div>
  </div>
  <div>
    <div class="pl-tile pl-tile-small pl-tile-secondary pl-tile-rounded">
      <h5>Utrzymanie</h5>
      <p>Aktualizacje, monitoring, rozwój.</p>
    </div>
  </div>
</div>
```

## Kafel jako link

Element `<a class="pl-tile">` (lub dowolny kafel z `.pl-tile-hover`) lekko unosi się po najechaniu i ma widoczny fokus.

```html example
<div class="pl-grid pl-grid-small pl-child-width-1-2@s pl-grid-match">
  <div>
    <a class="pl-tile pl-tile-small pl-tile-default pl-tile-rounded" href="#">
      <h5>Dokumentacja →</h5>
      <p>Opisy wszystkich komponentów z przykładami.</p>
    </a>
  </div>
  <div>
    <a class="pl-tile pl-tile-small pl-tile-muted pl-tile-rounded" href="#">
      <h5>Szablony →</h5>
      <p>Gotowe strony do skopiowania.</p>
    </a>
  </div>
</div>
```

## Kafel ze zdjęciem

Kafel dobrze łączy się z [Cover](/docs/layout/cover/): zdjęcie wypełnia sąsiednią komórkę na całą wysokość.

```html example
<div class="pl-grid pl-grid-collapse pl-child-width-1-2@s pl-grid-match">
  <div>
    <div class="pl-cover-container" style="min-height: 14rem">
      <img class="pl-cover" src="/img/photo-3.svg" alt="Pracownia ceramiki">
    </div>
  </div>
  <div>
    <div class="pl-tile pl-tile-secondary">
      <h4>Ręcznie robiona ceramika</h4>
      <p>Każde naczynie powstaje w małej pracowni w Bolesławcu i jest wypalane dwukrotnie.</p>
      <button class="pl-button pl-button-primary" type="button">Zobacz kolekcję</button>
    </div>
  </div>
</div>
```

## API

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-tile` | Kafel z paddingiem. |
| `.pl-tile-default` | Jasna powierzchnia z ramką. |
| `.pl-tile-muted` | Stonowane tło. |
| `.pl-tile-primary` | Tło akcentu, odwrócone tokeny tekstu. |
| `.pl-tile-secondary` | Tło „atramentowe", odwrócone tokeny tekstu. |
| `.pl-tile-xsmall` / `-small` / `-large` / `-xlarge` | Rozmiar paddingu. |
| `.pl-tile-padding-remove` | Bez paddingu. |
| `.pl-tile-rounded` | Zaokrąglone rogi. |
| `.pl-tile-hover` | Uniesienie po najechaniu (domyślne dla `a.pl-tile`). |

### Zmienne CSS

| Zmienna | Opis |
| --- | --- |
| `--pl-tile-p` | Padding kafla. |
