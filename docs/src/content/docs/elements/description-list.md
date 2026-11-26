---
title: Description list
description: Listy par termin–opis na elemencie dl — do specyfikacji, szczegółów zamówienia, metadanych i podsumowań.
---

## Podstawowe użycie

Dodaj klasę `.pl-description-list` do elementu `<dl>`. Terminy (`<dt>`) stają się małymi etykietami pisanymi wersalikami, a opisy (`<dd>`) zachowują zwykły krój tekstu.

```html example
<dl class="pl-description-list">
  <dt>Klient</dt>
  <dd>Pracownia Ceramiki „Glina", Wrocław</dd>
  <dt>Zakres prac</dt>
  <dd>Identyfikacja wizualna, sklep internetowy i sesja zdjęciowa produktów.</dd>
  <dt>Termin</dt>
  <dd>Marzec – czerwiec 2026</dd>
</dl>
```

## Linie

`.pl-description-list-divider` oddziela kolejne pary włosową linią.

```html example
<dl class="pl-description-list pl-description-list-divider">
  <dt>Dostawa</dt>
  <dd>Kurier, 1–2 dni robocze. Darmowa od 199 zł.</dd>
  <dt>Zwroty</dt>
  <dd>30 dni na zwrot bez podania przyczyny.</dd>
  <dt>Gwarancja</dt>
  <dd>24 miesiące, naprawa w autoryzowanym serwisie.</dd>
</dl>
```

## Układ poziomy

`.pl-description-list-horizontal` ustawia terminy i opisy w dwóch kolumnach. Na wąskich ekranach (poniżej 640 px) lista wraca do układu pionowego. Szerokość kolumny terminów ustawia zmienna `--pl-dl-term-w`.

```html example
<dl class="pl-description-list pl-description-list-horizontal">
  <dt>Imię i nazwisko</dt>
  <dd>Karolina Dąbrowska</dd>
  <dt>Stanowisko</dt>
  <dd>Kierowniczka projektu</dd>
  <dt>E-mail</dt>
  <dd><a href="#">karolina@studio.example</a></dd>
  <dt>Biuro</dt>
  <dd>ul. Ogrodowa 12, 61-820 Poznań<br>poniedziałek – piątek, 9:00 – 17:00</dd>
</dl>
```

### Poziomy z liniami

```html example
<dl class="pl-description-list pl-description-list-horizontal pl-description-list-divider">
  <dt>Numer zamówienia</dt>
  <dd>#48 213</dd>
  <dt>Status</dt>
  <dd><span class="pl-chip pl-chip-small pl-chip-success"><span class="pl-chip-dot"></span> Wysłane</span></dd>
  <dt>Płatność</dt>
  <dd>Karta •••• 4421</dd>
  <dt>Adres dostawy</dt>
  <dd>Anna Kowalska, ul. Lipowa 7/3, 30-702 Kraków</dd>
</dl>
```

## Paski

`.pl-description-list-striped` podkreśla co drugą parę delikatnym tłem — wygodne przy długich specyfikacjach. Działa w obu układach.

```html example
<dl class="pl-description-list pl-description-list-horizontal pl-description-list-striped">
  <dt>Wyświetlacz</dt>
  <dd>14,2″, 3024 × 1964 px, 120 Hz</dd>
  <dt>Procesor</dt>
  <dd>10 rdzeni, 16-rdzeniowa grafika</dd>
  <dt>Pamięć</dt>
  <dd>32 GB RAM, dysk 1 TB</dd>
  <dt>Bateria</dt>
  <dd>Do 18 godzin pracy</dd>
  <dt>Waga</dt>
  <dd>1,55 kg</dd>
</dl>
```

```html example narrow
<dl class="pl-description-list pl-description-list-striped">
  <dt>Skład</dt>
  <dd>100% bawełna organiczna</dd>
  <dt>Pielęgnacja</dt>
  <dd>Pranie w 30°C, nie suszyć w suszarce</dd>
  <dt>Kraj produkcji</dt>
  <dd>Polska</dd>
</dl>
```

## Wyrównanie do prawej

`.pl-description-list-justify` (razem z `-horizontal`) dosuwa opisy do prawej krawędzi i wyrównuje cyfry — do podsumowań i paragonów. Poniżej w połączeniu z `.pl-description-list-card`.

```html example narrow
<dl class="pl-description-list pl-description-list-horizontal pl-description-list-justify pl-description-list-divider pl-description-list-plain pl-description-list-card">
  <dt>Produkty (3)</dt>
  <dd>427,00 zł</dd>
  <dt>Dostawa</dt>
  <dd>14,99 zł</dd>
  <dt>Rabat −10%</dt>
  <dd>−42,70 zł</dd>
  <dt><strong>Do zapłaty</strong></dt>
  <dd><strong>399,29 zł</strong></dd>
</dl>
```

## Zwykłe terminy

`.pl-description-list-plain` rezygnuje z wersalików — terminy są pisane zwykłym krojem, w stonowanym kolorze.

```html example
<dl class="pl-description-list pl-description-list-horizontal pl-description-list-plain">
  <dt>Utworzono</dt>
  <dd>12 listopada 2026, 14:08</dd>
  <dt>Ostatnia zmiana</dt>
  <dd>dzisiaj, 9:41 — Marek Nowak</dd>
  <dt>Rozmiar</dt>
  <dd>4,2 MB</dd>
</dl>
```

## Rozmiary

```html example
<div class="pl-grid pl-child-width-1-2@m">
  <div>
    <dl class="pl-description-list pl-description-list-small pl-description-list-horizontal">
      <dt>Wersja</dt>
      <dd>4.2.1</dd>
      <dt>Licencja</dt>
      <dd>MIT</dd>
      <dt>Rozmiar</dt>
      <dd>18 kB (gzip)</dd>
    </dl>
  </div>
  <div>
    <dl class="pl-description-list pl-description-list-large">
      <dt>Przychód w tym miesiącu</dt>
      <dd>128 400 zł</dd>
      <dt>Nowi klienci</dt>
      <dd>312</dd>
    </dl>
  </div>
</div>
```

## API

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-description-list` | Lista opisowa na elemencie `<dl>`. |
| `.pl-description-list-divider` | Linie między parami. |
| `.pl-description-list-horizontal` | Układ dwukolumnowy: termin \| opis (od 640 px). |
| `.pl-description-list-striped` | Tło co drugiej pary. |
| `.pl-description-list-justify` | Opisy wyrównane do prawej (z `-horizontal`). |
| `.pl-description-list-plain` | Terminy bez wersalików. |
| `.pl-description-list-card` | Lista na karcie. |
| `.pl-description-list-small`, `.pl-description-list-large` | Rozmiary. |

### Zmienne CSS

| Zmienna | Domyślnie | Opis |
| --- | --- | --- |
| `--pl-dl-gap` | `1.1rem` | Odstęp między parami. |
| `--pl-dl-term-w` | `12rem` | Szerokość kolumny terminów w układzie poziomym. |
