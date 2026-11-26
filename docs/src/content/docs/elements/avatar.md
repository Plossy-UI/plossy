---
title: Avatar
description: Zdjęcie, inicjały lub ikona użytkownika — w kilku rozmiarach i kształtach, ze statusem obecności, pierścieniem i nakładającym się stosem.
---

## Podstawowe użycie

Klasa `.pl-avatar` przyjmuje trzy rodzaje zawartości: obraz `<img>`, tekst (inicjały) albo ikonę.

```html example center
<span class="pl-avatar"><img src="/img/avatar-1.svg" alt="Anna Kowalska"></span>
<span class="pl-avatar">MK</span>
<span class="pl-avatar"><span data-pl-icon="user-round"></span></span>
```

## Rozmiary

Od `.pl-avatar-xsmall` (1,5 rem) do `.pl-avatar-2xlarge` (7 rem). Inicjały i ikona skalują się razem z awatarem.

```html example center
<span class="pl-avatar pl-avatar-xsmall"><img src="/img/avatar-2.svg" alt=""></span>
<span class="pl-avatar pl-avatar-small"><img src="/img/avatar-2.svg" alt=""></span>
<span class="pl-avatar"><img src="/img/avatar-2.svg" alt=""></span>
<span class="pl-avatar pl-avatar-large"><img src="/img/avatar-2.svg" alt=""></span>
<span class="pl-avatar pl-avatar-xlarge"><img src="/img/avatar-2.svg" alt=""></span>
<span class="pl-avatar pl-avatar-2xlarge"><img src="/img/avatar-2.svg" alt=""></span>
```

```html example center
<span class="pl-avatar pl-avatar-xsmall pl-avatar-primary">JN</span>
<span class="pl-avatar pl-avatar-small pl-avatar-primary">JN</span>
<span class="pl-avatar pl-avatar-primary">JN</span>
<span class="pl-avatar pl-avatar-large pl-avatar-primary">JN</span>
<span class="pl-avatar pl-avatar-xlarge pl-avatar-primary">JN</span>
```

## Kształty

Domyślnie awatar jest kołem. `.pl-avatar-rounded` daje miękki „squircle" proporcjonalny do rozmiaru, `.pl-avatar-square` — lekko zaokrąglony kwadrat.

```html example center
<span class="pl-avatar pl-avatar-large"><img src="/img/avatar-4.svg" alt=""></span>
<span class="pl-avatar pl-avatar-large pl-avatar-rounded"><img src="/img/avatar-4.svg" alt=""></span>
<span class="pl-avatar pl-avatar-large pl-avatar-square"><img src="/img/avatar-4.svg" alt=""></span>
<span class="pl-avatar pl-avatar-large pl-avatar-rounded pl-avatar-info">PL</span>
<span class="pl-avatar pl-avatar-large pl-avatar-rounded pl-avatar-secondary"><span data-pl-icon="rocket"></span></span>
```

## Tony inicjałów

Tony nadają inicjałom i ikonom miękkie, zabarwione tło. Z `.pl-avatar-solid` tło jest pełne. `.pl-avatar-spark` to limonkowy akcent — używaj go oszczędnie.

```html example center
<span class="pl-avatar">AK</span>
<span class="pl-avatar pl-avatar-primary">BW</span>
<span class="pl-avatar pl-avatar-success">CZ</span>
<span class="pl-avatar pl-avatar-warning">DM</span>
<span class="pl-avatar pl-avatar-danger">EP</span>
<span class="pl-avatar pl-avatar-info">FS</span>
<span class="pl-avatar pl-avatar-secondary">GT</span>
<span class="pl-avatar pl-avatar-spark">HL</span>
```

```html example center
<span class="pl-avatar pl-avatar-solid pl-avatar-primary">BW</span>
<span class="pl-avatar pl-avatar-solid pl-avatar-success">CZ</span>
<span class="pl-avatar pl-avatar-solid pl-avatar-warning">DM</span>
<span class="pl-avatar pl-avatar-solid pl-avatar-danger">EP</span>
<span class="pl-avatar pl-avatar-solid pl-avatar-info">FS</span>
```

## Status

Kropkę statusu wstaw jako `.pl-avatar-status` wewnątrz awatara. Stan `-online` to pulsująca limonkowa iskra; pozostałe: `-busy`, `-away`, `-offline`. Dodaj tekst dla czytników ekranu, np. przez `aria-label` na awatarze.

```html example center
<span class="pl-avatar pl-avatar-large" aria-label="Anna Kowalska, dostępna">
  <img src="/img/avatar-1.svg" alt="">
  <span class="pl-avatar-status pl-avatar-status-online"></span>
</span>
<span class="pl-avatar pl-avatar-large" aria-label="Marek Nowak, zajęty">
  <img src="/img/avatar-5.svg" alt="">
  <span class="pl-avatar-status pl-avatar-status-busy"></span>
</span>
<span class="pl-avatar pl-avatar-large pl-avatar-warning" aria-label="Olga Lis, zaraz wraca">
  OL
  <span class="pl-avatar-status pl-avatar-status-away"></span>
</span>
<span class="pl-avatar pl-avatar-large" aria-label="Piotr Zych, niedostępny">
  <img src="/img/avatar-6.svg" alt="">
  <span class="pl-avatar-status pl-avatar-status-offline"></span>
</span>
<span class="pl-avatar pl-avatar-large pl-avatar-rounded" aria-label="Ewa Maj, dostępna">
  <img src="/img/avatar-3.svg" alt="">
  <span class="pl-avatar-status pl-avatar-status-online"></span>
</span>
<span class="pl-avatar pl-avatar-small" aria-label="Jan Kot, dostępny">
  <img src="/img/avatar-2.svg" alt="">
  <span class="pl-avatar-status pl-avatar-status-online pl-avatar-status-top"></span>
</span>
```

## Pierścień

`.pl-avatar-ring` otacza awatar pierścieniem w kolorze akcentu (lub tonu), `.pl-avatar-ring-spark` — limonkowym. Dobre do oznaczenia aktywnej osoby albo nieobejrzanej relacji.

```html example center
<span class="pl-avatar pl-avatar-large pl-avatar-ring"><img src="/img/avatar-1.svg" alt=""></span>
<span class="pl-avatar pl-avatar-large pl-avatar-ring-spark"><img src="/img/avatar-4.svg" alt=""></span>
<span class="pl-avatar pl-avatar-large pl-avatar-ring pl-avatar-success">RD</span>
<span class="pl-avatar pl-avatar-large pl-avatar-ring pl-avatar-danger pl-avatar-rounded"><img src="/img/avatar-6.svg" alt=""></span>
```

## Klikalny awatar

Awatar na elemencie `<a>` lub `<button>` sprężyście powiększa się po najechaniu i ma widoczny fokus.

```html example center
<a class="pl-avatar pl-avatar-large" href="#" aria-label="Profil: Anna Kowalska"><img src="/img/avatar-1.svg" alt=""></a>
<button class="pl-avatar pl-avatar-large pl-avatar-primary" type="button" aria-label="Menu użytkownika">TW</button>
<button class="pl-avatar pl-avatar-large" type="button" aria-label="Dodaj osobę"><span data-pl-icon="plus"></span></button>
```

## Grupa

`.pl-avatar-group` układa awatary w nakładający się stos. Ostatni element z klasą `.pl-avatar-more` pokazuje liczbę pozostałych osób. Najechany awatar unosi się; z `.pl-avatar-group-expand` cały stos się rozsuwa.

```html example center
<div class="pl-avatar-group">
  <span class="pl-avatar"><img src="/img/avatar-1.svg" alt="Anna"></span>
  <span class="pl-avatar"><img src="/img/avatar-2.svg" alt="Bartek"></span>
  <span class="pl-avatar pl-avatar-primary">CK</span>
  <span class="pl-avatar"><img src="/img/avatar-4.svg" alt="Daria"></span>
  <span class="pl-avatar pl-avatar-more">+5</span>
</div>

<div class="pl-avatar-group pl-avatar-group-expand">
  <a class="pl-avatar pl-avatar-large" href="#"><img src="/img/avatar-3.svg" alt="Ewa"></a>
  <a class="pl-avatar pl-avatar-large" href="#"><img src="/img/avatar-5.svg" alt="Filip"></a>
  <a class="pl-avatar pl-avatar-large" href="#"><img src="/img/avatar-6.svg" alt="Gosia"></a>
  <a class="pl-avatar pl-avatar-large pl-avatar-more" href="#">+12</a>
</div>

<div class="pl-avatar-group">
  <span class="pl-avatar pl-avatar-small pl-avatar-success">HJ</span>
  <span class="pl-avatar pl-avatar-small pl-avatar-warning">IK</span>
  <span class="pl-avatar pl-avatar-small pl-avatar-info">LM</span>
  <span class="pl-avatar pl-avatar-small pl-avatar-more">+3</span>
</div>
```

Awatary w grupie mają obwódkę w kolorze tła strony. Na innym tle (np. na karcie) ustaw zmienną `--pl-avatar-ring`.

```html example
<div class="pl-card" style="max-width: 24rem">
  <div class="pl-card-body pl-flex pl-flex-between pl-flex-middle">
    <div>
      <h3 class="pl-card-title">Zespół projektowy</h3>
      <p class="pl-card-meta">8 osób · 3 online</p>
    </div>
    <div class="pl-avatar-group" style="--pl-avatar-ring: var(--pl-surface)">
      <span class="pl-avatar pl-avatar-small"><img src="/img/avatar-1.svg" alt=""></span>
      <span class="pl-avatar pl-avatar-small"><img src="/img/avatar-5.svg" alt=""></span>
      <span class="pl-avatar pl-avatar-small"><img src="/img/avatar-3.svg" alt=""></span>
      <span class="pl-avatar pl-avatar-small pl-avatar-more">+5</span>
    </div>
  </div>
</div>
```

## Z podpisem

`.pl-avatar-item` zestawia awatar z imieniem (`.pl-avatar-name`) i dodatkową informacją (`.pl-avatar-meta`).

```html example row
<div class="pl-avatar-item">
  <span class="pl-avatar">
    <img src="/img/avatar-1.svg" alt="">
    <span class="pl-avatar-status pl-avatar-status-online"></span>
  </span>
  <span class="pl-avatar-text">
    <span class="pl-avatar-name">Anna Kowalska</span>
    <span class="pl-avatar-meta">Projektantka produktu</span>
  </span>
</div>
<a class="pl-avatar-item" href="#">
  <span class="pl-avatar pl-avatar-rounded pl-avatar-primary">NS</span>
  <span class="pl-avatar-text">
    <span class="pl-avatar-name">Norbert Sikora</span>
    <span class="pl-avatar-meta">norbert@studio.example</span>
  </span>
</a>
```

## API

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-avatar` | Awatar (obraz, inicjały lub ikona). |
| `.pl-avatar-xsmall`, `-small`, `-large`, `-xlarge`, `-2xlarge` | Rozmiary: 1,5 / 2 / 3,5 / 5 / 7 rem (domyślnie 2,5 rem). |
| `.pl-avatar-circle`, `-rounded`, `-square` | Kształt. |
| `.pl-avatar-primary` … `.pl-avatar-info`, `-secondary`, `-spark` | Ton tła inicjałów. |
| `.pl-avatar-solid` | Pełne tło w kolorze tonu. |
| `.pl-avatar-ring`, `.pl-avatar-ring-spark` | Pierścień wokół awatara. |
| `.pl-avatar-status` | Kropka statusu; stany `-online`, `-busy`, `-away`, `-offline`; `-top` przenosi ją na górę. |
| `.pl-avatar-group` | Nakładający się stos; `.pl-avatar-group-expand` rozsuwa go po najechaniu. |
| `.pl-avatar-more` | Licznik „+N" na końcu grupy. |
| `.pl-avatar-item`, `-text`, `-name`, `-meta` | Awatar z podpisem. |

### Zmienne CSS

| Zmienna | Domyślnie | Opis |
| --- | --- | --- |
| `--pl-avatar-size` | `2.5rem` | Rozmiar awatara. |
| `--pl-avatar-radius` | `50%` | Zaokrąglenie. |
| `--pl-avatar-bg` | zależnie od tonu | Tło inicjałów. |
| `--pl-avatar-color` | zależnie od tonu | Kolor inicjałów / ikony. |
| `--pl-avatar-ring` | `var(--pl-bg)` | Kolor obwódki w grupie, pod pierścieniem i wokół statusu. |
| `--pl-avatar-overlap` | `0.3` | Stopień nakładania w grupie (ułamek rozmiaru). |
