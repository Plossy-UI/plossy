---
title: Table
description: Tabele danych z technicznym nagłówkiem — z liniami, paskami, podświetleniem wierszy, sortowaniem, przyklejonym nagłówkiem i układem responsywnym.
---

## Podstawowe użycie

Dodaj klasę `.pl-table` do elementu `<table>`. Nagłówek dostaje wygląd małej etykiety, a komórki — wygodne odstępy.

```html example
<table class="pl-table">
  <thead>
    <tr><th>Produkt</th><th>Kategoria</th><th>Stan</th><th>Cena</th></tr>
  </thead>
  <tbody>
    <tr><td>Lampa Arko</td><td>Oświetlenie</td><td>24 szt.</td><td>349 zł</td></tr>
    <tr><td>Krzesło Nord</td><td>Meble</td><td>8 szt.</td><td>529 zł</td></tr>
    <tr><td>Stolik Fala</td><td>Meble</td><td>3 szt.</td><td>890 zł</td></tr>
  </tbody>
</table>
```

## Linie

`.pl-table-divider` oddziela wiersze włosową linią.

```html example
<table class="pl-table pl-table-divider">
  <thead>
    <tr><th>Faktura</th><th>Klient</th><th>Termin</th><th>Kwota</th></tr>
  </thead>
  <tbody>
    <tr><td>FV/2026/10/041</td><td>Studio Mgła</td><td>14.11.2026</td><td>4 920,00 zł</td></tr>
    <tr><td>FV/2026/10/040</td><td>Piekarnia Zakwas</td><td>12.11.2026</td><td>1 230,00 zł</td></tr>
    <tr><td>FV/2026/10/039</td><td>Kwiaciarnia Mak</td><td>08.11.2026</td><td>738,00 zł</td></tr>
  </tbody>
</table>
```

## Paski

`.pl-table-striped` nadaje co drugiemu wierszowi delikatne, zaokrąglone tło.

```html example
<table class="pl-table pl-table-striped">
  <thead>
    <tr><th>Stacja</th><th>Przyjazd</th><th>Odjazd</th><th>Peron</th></tr>
  </thead>
  <tbody>
    <tr><td>Warszawa Centralna</td><td>—</td><td>06:12</td><td>3</td></tr>
    <tr><td>Łódź Fabryczna</td><td>07:28</td><td>07:31</td><td>1</td></tr>
    <tr><td>Wrocław Główny</td><td>09:45</td><td>09:48</td><td>4</td></tr>
    <tr><td>Jelenia Góra</td><td>11:55</td><td>—</td><td>2</td></tr>
  </tbody>
</table>
```

## Podświetlenie wierszy

`.pl-table-hover` podświetla wiersz pod kursorem. Klasa `.pl-active` na `<tr>` oznacza wiersz zaznaczony.

```html example
<table class="pl-table pl-table-divider pl-table-hover">
  <thead>
    <tr><th>Zadanie</th><th>Osoba</th><th>Termin</th></tr>
  </thead>
  <tbody>
    <tr><td>Makiety strony głównej</td><td>Anna Kowalczyk</td><td>Pon., 30 lis</td></tr>
    <tr class="pl-active"><td>Przegląd dostępności</td><td>Julia Nowak</td><td>Śr., 2 gru</td></tr>
    <tr><td>Integracja płatności</td><td>Piotr Zieliński</td><td>Pt., 4 gru</td></tr>
  </tbody>
</table>
```

## Ramki

`.pl-table-bordered` rysuje ramkę wokół tabeli i każdej komórki.

```html example
<table class="pl-table pl-table-bordered pl-table-small">
  <thead>
    <tr><th>Rozmiar</th><th>Klatka piersiowa</th><th>Talia</th><th>Biodra</th></tr>
  </thead>
  <tbody>
    <tr><th>S</th><td>88–92 cm</td><td>72–76 cm</td><td>90–94 cm</td></tr>
    <tr><th>M</th><td>93–97 cm</td><td>77–81 cm</td><td>95–99 cm</td></tr>
    <tr><th>L</th><td>98–102 cm</td><td>82–86 cm</td><td>100–104 cm</td></tr>
  </tbody>
</table>
```

## Rozmiary

`.pl-table-small` zagęszcza tabelę, `.pl-table-large` dodaje powietrza.

```html example
<table class="pl-table pl-table-divider pl-table-small">
  <thead>
    <tr><th>Klucz</th><th>Wartość</th><th>Zmieniono</th></tr>
  </thead>
  <tbody>
    <tr><td><code>theme</code></td><td>dark</td><td>2 dni temu</td></tr>
    <tr><td><code>locale</code></td><td>pl-PL</td><td>tydzień temu</td></tr>
    <tr><td><code>currency</code></td><td>PLN</td><td>miesiąc temu</td></tr>
  </tbody>
</table>
```

```html example
<table class="pl-table pl-table-divider pl-table-large">
  <thead>
    <tr><th>Plan</th><th>Projekty</th><th>Cena</th></tr>
  </thead>
  <tbody>
    <tr><td>Starter</td><td>3</td><td>0 zł</td></tr>
    <tr><td>Pro</td><td>bez limitu</td><td>49 zł / mies.</td></tr>
  </tbody>
</table>
```

## Wyrównanie

`.pl-table-justify` usuwa zewnętrzne odstępy skrajnych kolumn, dzięki czemu tabela równa się z tekstem. `.pl-table-middle` wyśrodkowuje komórki w pionie (można ją nadać także pojedynczej komórce), a `.pl-table-numeric` wyrównuje kolumnę liczb do prawej.

```html example
<table class="pl-table pl-table-divider pl-table-justify pl-table-middle">
  <thead>
    <tr><th>Osoba</th><th>Rola</th><th class="pl-table-numeric">Zamknięte zgłoszenia</th></tr>
  </thead>
  <tbody>
    <tr>
      <td><img src="/img/avatar-1.svg" alt="" width="36" height="36" style="border-radius: 50%; margin-right: 0.6rem"> Anna Kowalczyk</td>
      <td>Projektantka produktu</td>
      <td class="pl-table-numeric">128</td>
    </tr>
    <tr>
      <td><img src="/img/avatar-2.svg" alt="" width="36" height="36" style="border-radius: 50%; margin-right: 0.6rem"> Piotr Zieliński</td>
      <td>Inżynier frontend</td>
      <td class="pl-table-numeric">1 042</td>
    </tr>
    <tr>
      <td><img src="/img/avatar-3.svg" alt="" width="36" height="36" style="border-radius: 50%; margin-right: 0.6rem"> Julia Nowak</td>
      <td>Badaczka UX</td>
      <td class="pl-table-numeric">76</td>
    </tr>
  </tbody>
</table>
```

## Szerokość kolumn

`.pl-table-shrink` zwęża kolumnę do treści, `.pl-table-expand` oddaje jej całe wolne miejsce. `.pl-table-nowrap` blokuje łamanie tekstu.

```html example
<table class="pl-table pl-table-divider pl-table-middle">
  <thead>
    <tr><th class="pl-table-shrink">Nr</th><th class="pl-table-expand">Opis</th><th class="pl-table-shrink">Status</th><th class="pl-table-shrink"></th></tr>
  </thead>
  <tbody>
    <tr>
      <td>#482</td>
      <td>Formularz zamówienia nie zapamiętuje wybranego paczkomatu po powrocie z płatności</td>
      <td><span class="pl-label pl-label-dot pl-label-warning">W toku</span></td>
      <td><button class="pl-icon-button" type="button" aria-label="Więcej"><span data-pl-icon="ellipsis"></span></button></td>
    </tr>
    <tr>
      <td>#481</td>
      <td>Dodać eksport faktur do CSV</td>
      <td><span class="pl-label pl-label-dot pl-label-success">Gotowe</span></td>
      <td><button class="pl-icon-button" type="button" aria-label="Więcej"><span data-pl-icon="ellipsis"></span></button></td>
    </tr>
  </tbody>
</table>
```

## Komórka-link

`.pl-table-link` na komórce rozciąga zawarty w niej link na całą jej powierzchnię.

```html example
<table class="pl-table pl-table-divider pl-table-hover">
  <thead>
    <tr><th>Dokument</th><th>Autor</th><th>Zmieniono</th></tr>
  </thead>
  <tbody>
    <tr><td class="pl-table-link"><a href="#">Strategia marki 2027</a></td><td>Marta Wiśniewska</td><td>dzisiaj</td></tr>
    <tr><td class="pl-table-link"><a href="#">Plan kampanii zimowej</a></td><td>Tomasz Lis</td><td>wczoraj</td></tr>
    <tr><td class="pl-table-link"><a href="#">Notatki z warsztatów</a></td><td>Julia Nowak</td><td>3 dni temu</td></tr>
  </tbody>
</table>
```

## Sortowanie

Przycisk `.pl-table-sort` w nagłówku pokazuje strzałki sortowania, a atrybut `aria-sort="ascending | descending"` na `<th>` podświetla aktywny kierunek. Komponent dostarcza wygląd — samo sortowanie to kilka linii skryptu.

```html example
<table class="pl-table pl-table-divider pl-table-hover" id="demo-table-sort">
  <thead>
    <tr>
      <th aria-sort="ascending"><button class="pl-table-sort" type="button">Miasto</button></th>
      <th><button class="pl-table-sort" type="button">Zamówienia</button></th>
      <th><button class="pl-table-sort" type="button">Przychód</button></th>
    </tr>
  </thead>
  <tbody>
    <tr><td>Gdańsk</td><td>412</td><td>86 300 zł</td></tr>
    <tr><td>Kraków</td><td>631</td><td>124 900 zł</td></tr>
    <tr><td>Poznań</td><td>287</td><td>59 150 zł</td></tr>
    <tr><td>Warszawa</td><td>1 204</td><td>263 700 zł</td></tr>
  </tbody>
</table>
```

```js example-js
const table = document.getElementById('demo-table-sort');
const value = (row, i) => row.cells[i].textContent.trim();
const number = (text) => parseFloat(text.replace(/[^\d,-]/g, '').replace(',', '.'));

table.querySelectorAll('.pl-table-sort').forEach((button) => {
  button.addEventListener('click', () => {
    const th = button.closest('th');
    const index = th.cellIndex;
    const dir = th.getAttribute('aria-sort') === 'ascending' ? 'descending' : 'ascending';
    table.querySelectorAll('th').forEach((cell) => cell.removeAttribute('aria-sort'));
    th.setAttribute('aria-sort', dir);

    const rows = [...table.tBodies[0].rows].sort((a, b) => {
      const [x, y] = [value(a, index), value(b, index)];
      const result = Number.isNaN(number(x)) ? x.localeCompare(y, 'pl') : number(x) - number(y);
      return dir === 'ascending' ? result : -result;
    });
    table.tBodies[0].append(...rows);
  });
});
```

## Zaznaczanie wierszy

Klasa `.pl-active` na wierszu daje tło akcentu i znacznik z lewej strony.

```html example
<table class="pl-table pl-table-divider pl-table-hover pl-table-middle" id="demo-table-select">
  <thead>
    <tr><th class="pl-table-shrink"><span class="pl-hidden">Wybór</span></th><th>Plik</th><th>Rozmiar</th><th>Typ</th></tr>
  </thead>
  <tbody>
    <tr class="pl-active"><td><input type="checkbox" checked aria-label="Wybierz oferta.pdf"></td><td>oferta.pdf</td><td>1,2 MB</td><td>PDF</td></tr>
    <tr><td><input type="checkbox" aria-label="Wybierz logo.svg"></td><td>logo.svg</td><td>14 KB</td><td>SVG</td></tr>
    <tr><td><input type="checkbox" aria-label="Wybierz zdjecia.zip"></td><td>zdjecia.zip</td><td>48 MB</td><td>Archiwum</td></tr>
  </tbody>
</table>
```

```js example-js
document.getElementById('demo-table-select').addEventListener('change', (event) => {
  event.target.closest('tr').classList.toggle('pl-active', event.target.checked);
});
```

## Podpis i stopka

Element `<caption>` opisuje tabelę (z `.pl-table-caption-bottom` trafia pod nią), a `<tfoot>` wyróżnia podsumowanie.

```html example
<table class="pl-table pl-table-divider pl-table-caption-bottom">
  <caption>Zamówienie nr 10482 — ceny brutto</caption>
  <thead>
    <tr><th>Pozycja</th><th class="pl-table-numeric">Ilość</th><th class="pl-table-numeric">Wartość</th></tr>
  </thead>
  <tbody>
    <tr><td>Lampa Arko</td><td class="pl-table-numeric">1</td><td class="pl-table-numeric">349,00 zł</td></tr>
    <tr><td>Żarówka LED E27</td><td class="pl-table-numeric">2</td><td class="pl-table-numeric">58,00 zł</td></tr>
    <tr><td>Dostawa kurierem</td><td class="pl-table-numeric">1</td><td class="pl-table-numeric">14,99 zł</td></tr>
  </tbody>
  <tfoot>
    <tr><td colspan="2">Razem</td><td class="pl-table-numeric">421,99 zł</td></tr>
  </tfoot>
</table>
```

## Przewijanie w poziomie

Szeroką tabelę owiń w `.pl-overflow-auto` — na wąskich ekranach przewinie się w poziomie, nie rozpychając strony.

```html example
<div class="pl-overflow-auto" tabindex="0" role="region" aria-label="Tabela — przewiń w poziomie">
  <table class="pl-table pl-table-divider pl-table-small pl-table-nowrap">
    <thead>
      <tr><th>Miesiąc</th><th>Sesje</th><th>Użytkownicy</th><th>Współczynnik odrzuceń</th><th>Konwersja</th><th>Średni koszyk</th><th>Przychód</th><th>Zwroty</th></tr>
    </thead>
    <tbody>
      <tr><td>Sierpień 2026</td><td>48 210</td><td>31 904</td><td>42,1%</td><td>2,4%</td><td>212,40 zł</td><td>163 880 zł</td><td>3,1%</td></tr>
      <tr><td>Wrzesień 2026</td><td>52 733</td><td>34 118</td><td>40,7%</td><td>2,6%</td><td>219,90 zł</td><td>195 060 zł</td><td>2,8%</td></tr>
      <tr><td>Październik 2026</td><td>61 045</td><td>39 870</td><td>38,9%</td><td>2,9%</td><td>231,10 zł</td><td>264 310 zł</td><td>2,6%</td></tr>
    </tbody>
  </table>
</div>
```

## Przyklejony nagłówek

`.pl-table-sticky` przykleja nagłówek do górnej krawędzi przewijanego kontenera. Odsunięcie (np. pod przyklejonym paskiem nawigacji) ustawisz zmienną `--pl-table-sticky-top`, tło — `--pl-table-sticky-bg`.

```html example
<div class="pl-overflow-auto" tabindex="0" role="region" aria-label="Tabela — przewiń" style="overflow: auto; max-height: 15rem; border: 1px solid var(--pl-border); border-radius: var(--pl-radius-md); background: var(--pl-surface)">
  <table class="pl-table pl-table-divider pl-table-small pl-table-sticky">
    <thead>
      <tr><th>Data</th><th>Zdarzenie</th><th>Użytkownik</th></tr>
    </thead>
    <tbody>
      <tr><td>25.11, 14:02</td><td>Zalogowano z nowego urządzenia</td><td>a.kowalczyk</td></tr>
      <tr><td>25.11, 13:47</td><td>Zmieniono rolę użytkownika</td><td>admin</td></tr>
      <tr><td>25.11, 12:15</td><td>Wyeksportowano raport sprzedaży</td><td>p.zielinski</td></tr>
      <tr><td>25.11, 11:58</td><td>Dodano produkt „Stolik Fala"</td><td>j.nowak</td></tr>
      <tr><td>25.11, 10:31</td><td>Zaktualizowano cennik dostaw</td><td>admin</td></tr>
      <tr><td>25.11, 09:04</td><td>Usunięto kod rabatowy LATO15</td><td>t.lis</td></tr>
      <tr><td>24.11, 17:40</td><td>Zmieniono hasło</td><td>m.wisniewska</td></tr>
      <tr><td>24.11, 16:22</td><td>Utworzono kopię zapasową</td><td>system</td></tr>
    </tbody>
  </table>
</div>
```

## Responsywna

`.pl-table-responsive` poniżej breakpointu `m` (960px) układa komórki każdego wiersza w stos. Atrybut `data-label` na komórce wyświetla nazwę kolumny obok wartości. Zmniejsz okno, aby zobaczyć efekt.

```html example
<table class="pl-table pl-table-divider pl-table-responsive">
  <thead>
    <tr><th>Zamówienie</th><th>Klient</th><th>Status</th><th>Kwota</th></tr>
  </thead>
  <tbody>
    <tr>
      <td data-label="Zamówienie">#10482</td>
      <td data-label="Klient">Anna Kowalczyk</td>
      <td data-label="Status"><span class="pl-label pl-label-dot pl-label-success">Wysłane</span></td>
      <td data-label="Kwota">421,99 zł</td>
    </tr>
    <tr>
      <td data-label="Zamówienie">#10481</td>
      <td data-label="Klient">Piotr Zieliński</td>
      <td data-label="Status"><span class="pl-label pl-label-dot pl-label-warning">Pakowanie</span></td>
      <td data-label="Kwota">529,00 zł</td>
    </tr>
    <tr>
      <td data-label="Zamówienie">#10479</td>
      <td data-label="Klient">Julia Nowak</td>
      <td data-label="Status"><span class="pl-label pl-label-dot pl-label-danger">Anulowane</span></td>
      <td data-label="Kwota">890,00 zł</td>
    </tr>
  </tbody>
</table>
```

## Tabela w karcie

```html example
<div class="pl-card">
  <div class="pl-card-header">
    <h3 class="pl-card-title">Najlepiej sprzedające się</h3>
    <a class="pl-link-arrow" href="#" style="margin-left: auto; font-size: var(--pl-text-sm)">Wszystkie</a>
  </div>
  <div class="pl-overflow-auto" tabindex="0" role="region" aria-label="Tabela — przewiń w poziomie">
    <table class="pl-table pl-table-divider pl-table-hover pl-table-middle" style="--pl-table-px: 1.5rem">
      <thead>
        <tr><th>Produkt</th><th>Sprzedano</th><th>Trend</th><th class="pl-table-numeric">Przychód</th></tr>
      </thead>
      <tbody>
        <tr><td>Sofa Lumo</td><td>84</td><td><span class="pl-label pl-label-success"><span data-pl-icon="trending-up"></span> 12%</span></td><td class="pl-table-numeric">276 360 zł</td></tr>
        <tr><td>Krzesło Nord</td><td>312</td><td><span class="pl-label pl-label-success"><span data-pl-icon="trending-up"></span> 4%</span></td><td class="pl-table-numeric">165 048 zł</td></tr>
        <tr><td>Lampa Arko</td><td>405</td><td><span class="pl-label pl-label-danger"><span data-pl-icon="trending-down"></span> 3%</span></td><td class="pl-table-numeric">141 345 zł</td></tr>
      </tbody>
    </table>
  </div>
</div>
```

## API

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-table` | Tabela bazowa. |
| `.pl-table-divider` | Linie między wierszami. |
| `.pl-table-striped` | Tło co drugiego wiersza. |
| `.pl-table-hover` | Podświetlenie wiersza pod kursorem. |
| `.pl-table-bordered` | Ramki wszystkich komórek. |
| `.pl-table-small` `.pl-table-large` | Gęstość. |
| `.pl-table-justify` | Bez zewnętrznych odstępów skrajnych kolumn. |
| `.pl-table-middle` | Wyśrodkowanie w pionie (tabela lub komórka). |
| `.pl-table-responsive` | Stos komórek poniżej `m`; etykiety z `data-label`. |
| `.pl-table-sticky` | Przyklejony nagłówek. |
| `.pl-table-caption-bottom` | Podpis pod tabelą. |
| `.pl-table-shrink` | Komórka / kolumna zwężona do treści. |
| `.pl-table-expand` | Kolumna zajmująca wolne miejsce. |
| `.pl-table-nowrap` | Bez łamania tekstu (komórka lub cała tabela). |
| `.pl-table-numeric` | Wyrównanie do prawej. |
| `.pl-table-link` | Komórka, której link wypełnia całą powierzchnię. |
| `.pl-table-sort` | Przycisk sortowania w `<th>`; kierunek z `aria-sort` na `<th>`. |
| `tr.pl-active` | Zaznaczony wiersz. |

### Zmienne CSS

| Zmienna | Domyślnie | Opis |
| --- | --- | --- |
| `--pl-table-px` / `--pl-table-py` | `1rem` / `0.85rem` | Odstępy komórek. |
| `--pl-table-sticky-top` | `0` | Odsunięcie przyklejonego nagłówka. |
| `--pl-table-sticky-bg` | `var(--pl-surface)` | Tło przyklejonego nagłówka. |
