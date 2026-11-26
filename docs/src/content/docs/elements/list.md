---
title: List
description: Listy bez domyślnego wyglądu przeglądarki — z punktorami, podziałami i paskami — oraz list-group, czyli obramowane, interaktywne wiersze.
---

## Podstawowe użycie

Klasa `.pl-list` usuwa punktory i wcięcie, zostawiając równe odstępy między pozycjami.

```html example
<ul class="pl-list">
  <li>Bezpłatna dostawa od 199 zł</li>
  <li>30 dni na zwrot</li>
  <li>Dwuletnia gwarancja producenta</li>
</ul>
```

## Punktory

Modyfikatory `.pl-list-disc`, `-circle`, `-square`, `-decimal` i `-hyphen` przywracają punktory w wybranym kształcie.

```html example
<div class="pl-grid pl-child-width-1-2 pl-child-width-1-3@m">
  <div>
    <ul class="pl-list pl-list-disc">
      <li>Mąka pszenna</li>
      <li>Drożdże świeże</li>
      <li>Sól morska</li>
    </ul>
  </div>
  <div>
    <ul class="pl-list pl-list-circle">
      <li>Mąka pszenna</li>
      <li>Drożdże świeże</li>
      <li>Sól morska</li>
    </ul>
  </div>
  <div>
    <ul class="pl-list pl-list-square">
      <li>Mąka pszenna</li>
      <li>Drożdże świeże</li>
      <li>Sól morska</li>
    </ul>
  </div>
  <div>
    <ol class="pl-list pl-list-decimal">
      <li>Wymieszaj składniki</li>
      <li>Odstaw na godzinę</li>
      <li>Piecz 25 minut</li>
    </ol>
  </div>
  <div>
    <ul class="pl-list pl-list-hyphen">
      <li>Mąka pszenna</li>
      <li>Drożdże świeże</li>
      <li>Sól morska</li>
    </ul>
  </div>
  <div>
    <ul class="pl-list pl-list-check">
      <li>Mąka pszenna</li>
      <li>Drożdże świeże</li>
      <li>Sól morska</li>
    </ul>
  </div>
</div>
```

## Lista z „ptaszkami"

`.pl-list-check` rysuje znak wyboru w miękkim kółku — typowa lista korzyści w cenniku.

```html example narrow
<ul class="pl-list pl-list-check">
  <li>Nielimitowana liczba projektów</li>
  <li>Własna domena i certyfikat SSL</li>
  <li>Kopie zapasowe co 24 godziny</li>
  <li>Wsparcie na czacie w dni robocze</li>
</ul>
```

## Kolor punktorów

`.pl-list-muted` wycisza punktory, `.pl-list-primary` nadaje im kolor akcentu, `.pl-list-spark` — iskry. Działa ze wszystkimi rodzajami punktorów.

```html example
<div class="pl-grid pl-child-width-1-2 pl-child-width-1-4@m">
  <div>
    <ul class="pl-list pl-list-disc pl-list-muted">
      <li>Wyciszony</li>
      <li>Wyciszony</li>
      <li>Wyciszony</li>
    </ul>
  </div>
  <div>
    <ul class="pl-list pl-list-disc pl-list-primary">
      <li>Akcent</li>
      <li>Akcent</li>
      <li>Akcent</li>
    </ul>
  </div>
  <div>
    <ol class="pl-list pl-list-decimal pl-list-primary">
      <li>Akcent</li>
      <li>Akcent</li>
      <li>Akcent</li>
    </ol>
  </div>
  <div>
    <ul class="pl-list pl-list-check pl-list-primary">
      <li>Akcent</li>
      <li>Akcent</li>
      <li>Akcent</li>
    </ul>
  </div>
</div>
```

## Podział

`.pl-list-divider` oddziela pozycje włosową linią.

```html example narrow
<ul class="pl-list pl-list-divider">
  <li>Poniedziałek – piątek: 8:00–18:00</li>
  <li>Sobota: 9:00–14:00</li>
  <li>Niedziela: nieczynne</li>
</ul>
```

## Paski

`.pl-list-striped` nadaje co drugiej pozycji delikatne tło.

```html example narrow
<ul class="pl-list pl-list-striped">
  <li>Warszawa Centralna — 06:12</li>
  <li>Łódź Fabryczna — 07:31</li>
  <li>Wrocław Główny — 09:48</li>
  <li>Jelenia Góra — 11:55</li>
</ul>
```

## Odstępy

`.pl-list-large` zwiększa odstępy, `.pl-list-collapse` usuwa je całkowicie.

```html example
<div class="pl-grid pl-child-width-1-3@s">
  <div>
    <p class="pl-text-meta">Domyślne</p>
    <ul class="pl-list pl-list-divider">
      <li>Faktury</li>
      <li>Płatności</li>
      <li>Raporty</li>
    </ul>
  </div>
  <div>
    <p class="pl-text-meta">Large</p>
    <ul class="pl-list pl-list-divider pl-list-large">
      <li>Faktury</li>
      <li>Płatności</li>
      <li>Raporty</li>
    </ul>
  </div>
  <div>
    <p class="pl-text-meta">Collapse</p>
    <ul class="pl-list pl-list-collapse">
      <li>Faktury</li>
      <li>Płatności</li>
      <li>Raporty</li>
    </ul>
  </div>
</div>
```

## Zagnieżdżanie

Listy można zagnieżdżać — każdy poziom ma własne modyfikatory.

```html example narrow
<ul class="pl-list pl-list-disc pl-list-primary">
  <li>Frontend
    <ul class="pl-list pl-list-hyphen pl-list-muted">
      <li>Komponenty interfejsu</li>
      <li>Testy dostępności</li>
    </ul>
  </li>
  <li>Backend
    <ul class="pl-list pl-list-hyphen pl-list-muted">
      <li>API zamówień</li>
      <li>Integracja z płatnościami</li>
    </ul>
  </li>
  <li>Wdrożenie</li>
</ul>
```

## Lista z treścią

Pozycja może zawierać dowolny układ, np. awatar z opisem.

```html example narrow
<ul class="pl-list pl-list-divider pl-list-large">
  <li class="pl-flex pl-flex-middle" style="gap: 0.75rem">
    <img src="/img/avatar-1.svg" alt="" width="40" height="40" style="border-radius: 50%">
    <div><strong>Anna Kowalczyk</strong><br><small class="pl-text-muted">Projektantka produktu</small></div>
  </li>
  <li class="pl-flex pl-flex-middle" style="gap: 0.75rem">
    <img src="/img/avatar-2.svg" alt="" width="40" height="40" style="border-radius: 50%">
    <div><strong>Piotr Zieliński</strong><br><small class="pl-text-muted">Inżynier frontend</small></div>
  </li>
  <li class="pl-flex pl-flex-middle" style="gap: 0.75rem">
    <img src="/img/avatar-3.svg" alt="" width="40" height="40" style="border-radius: 50%">
    <div><strong>Julia Nowak</strong><br><small class="pl-text-muted">Badaczka UX</small></div>
  </li>
</ul>
```

## List group

`.pl-list-group` to obramowana lista wierszy `.pl-list-group-item` na wspólnej powierzchni.

```html example narrow
<ul class="pl-list-group">
  <li class="pl-list-group-item">Dane konta</li>
  <li class="pl-list-group-item">Adresy dostawy</li>
  <li class="pl-list-group-item">Metody płatności</li>
  <li class="pl-list-group-item">Powiadomienia</li>
</ul>
```

### Interaktywne wiersze

Wiersze będące linkami lub przyciskami reagują na hover. `.pl-active` oznacza bieżącą pozycję (z wysuwanym akcentem po lewej), `.pl-disabled` — niedostępną.

```html example narrow
<div class="pl-list-group">
  <a class="pl-list-group-item pl-active" href="#" aria-current="true"><span data-pl-icon="user"></span> Profil</a>
  <a class="pl-list-group-item" href="#"><span data-pl-icon="credit-card"></span> Płatności</a>
  <a class="pl-list-group-item" href="#"><span data-pl-icon="bell"></span> Powiadomienia</a>
  <a class="pl-list-group-item pl-disabled" href="#" aria-disabled="true" tabindex="-1"><span data-pl-icon="users"></span> Zespół (plan Pro)</a>
</div>
```

### Znaczki i metadane

Ostatni element `.pl-badge`, `.pl-label` lub `.pl-list-group-meta` jest dosuwany do prawej krawędzi.

```html example narrow
<div class="pl-list-group">
  <a class="pl-list-group-item" href="#"><span data-pl-icon="mail"></span> Odebrane <span class="pl-badge pl-badge-primary">12</span></a>
  <a class="pl-list-group-item" href="#"><span data-pl-icon="send"></span> Wysłane <span class="pl-list-group-meta">248</span></a>
  <a class="pl-list-group-item" href="#"><span data-pl-icon="file-text"></span> Szkice <span class="pl-label pl-label-warning">3 niedokończone</span></a>
  <a class="pl-list-group-item" href="#"><span data-pl-icon="trash-2"></span> Kosz <span class="pl-list-group-meta">pusty</span></a>
</div>
```

### Tytuł i opis

Bogatszą treść opakuj w `.pl-list-group-content` z `.pl-list-group-title` i `.pl-list-group-text`.

```html example narrow
<div class="pl-list-group pl-list-group-large">
  <a class="pl-list-group-item" href="#">
    <span class="pl-icon-box pl-icon-primary" data-pl-icon="rocket"></span>
    <span class="pl-list-group-content">
      <span class="pl-list-group-title">Szybki start</span>
      <span class="pl-list-group-text">Instalacja i pierwszy komponent w pięć minut</span>
    </span>
    <span class="pl-list-group-meta" data-pl-icon="chevron-right"></span>
  </a>
  <a class="pl-list-group-item" href="#">
    <span class="pl-icon-box pl-icon-success" data-pl-icon="palette"></span>
    <span class="pl-list-group-content">
      <span class="pl-list-group-title">Motywy</span>
      <span class="pl-list-group-text">Kolory, akcent i tryb ciemny</span>
    </span>
    <span class="pl-list-group-meta" data-pl-icon="chevron-right"></span>
  </a>
  <a class="pl-list-group-item" href="#">
    <span class="pl-icon-box pl-icon-warning" data-pl-icon="puzzle"></span>
    <span class="pl-list-group-content">
      <span class="pl-list-group-title">Komponenty</span>
      <span class="pl-list-group-text">Pełny katalog z przykładami</span>
    </span>
    <span class="pl-list-group-meta" data-pl-icon="chevron-right"></span>
  </a>
</div>
```

### Pola wyboru

Wiersz może być etykietą `<label>` z polem wyboru — klikalny jest wtedy cały wiersz.

```html example narrow
<div class="pl-list-group">
  <label class="pl-list-group-item"><input type="checkbox" checked> Podsumowanie tygodnia</label>
  <label class="pl-list-group-item"><input type="checkbox"> Nowe funkcje i aktualizacje</label>
  <label class="pl-list-group-item"><input type="checkbox" checked> Alerty bezpieczeństwa</label>
</div>
```

### Warianty

`.pl-list-group-flush` usuwa ramkę zewnętrzną (np. wewnątrz karty), `.pl-list-group-numbered` numeruje wiersze, `.pl-list-group-small` i `-large` zmieniają gęstość.

```html example
<div class="pl-grid pl-child-width-1-2@m">
  <div>
    <div class="pl-card">
      <div class="pl-card-header"><h3 class="pl-card-title">Ostatnie zamówienia</h3></div>
      <ul class="pl-list-group pl-list-group-flush">
        <li class="pl-list-group-item">#10482 — Lampa Arko <span class="pl-list-group-meta">349 zł</span></li>
        <li class="pl-list-group-item">#10481 — Krzesło Nord <span class="pl-list-group-meta">529 zł</span></li>
        <li class="pl-list-group-item">#10479 — Stolik Fala <span class="pl-list-group-meta">890 zł</span></li>
      </ul>
    </div>
  </div>
  <div>
    <ol class="pl-list-group pl-list-group-numbered pl-list-group-small">
      <li class="pl-list-group-item">Załóż konto</li>
      <li class="pl-list-group-item">Potwierdź adres e-mail</li>
      <li class="pl-list-group-item">Dodaj pierwszy produkt</li>
      <li class="pl-list-group-item">Opublikuj sklep</li>
    </ol>
  </div>
</div>
```

### Pozioma

`.pl-list-group-horizontal` układa wiersze obok siebie od breakpointu `s`.

```html example
<div class="pl-list-group pl-list-group-horizontal">
  <a class="pl-list-group-item pl-active" href="#">Dzień</a>
  <a class="pl-list-group-item" href="#">Tydzień</a>
  <a class="pl-list-group-item" href="#">Miesiąc</a>
  <a class="pl-list-group-item" href="#">Rok</a>
</div>
```

## API

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-list` | Lista bez punktorów i wcięcia. |
| `.pl-list-disc` `-circle` `-square` `-decimal` `-hyphen` | Rodzaj punktora. |
| `.pl-list-check` | Znaki wyboru w kółku. |
| `.pl-list-muted` `.pl-list-primary` `.pl-list-spark` | Kolor punktorów. |
| `.pl-list-divider` | Linie między pozycjami. |
| `.pl-list-striped` | Tło co drugiej pozycji. |
| `.pl-list-large` `.pl-list-collapse` | Większe / zerowe odstępy. |
| `.pl-list-group` | Obramowana grupa wierszy. |
| `.pl-list-group-item` | Wiersz grupy (`li`, `a`, `button`, `label`). Stany: `.pl-active`, `.pl-disabled`. |
| `.pl-list-group-content` `-title` `-text` | Treść wielowierszowa wiersza. |
| `.pl-list-group-meta` | Drugoplanowy element dosunięty do prawej. |
| `.pl-list-group-flush` | Bez ramki zewnętrznej i tła. |
| `.pl-list-group-numbered` | Automatyczna numeracja. |
| `.pl-list-group-horizontal` | Układ poziomy od `s`. |
| `.pl-list-group-small` `.pl-list-group-large` | Gęstość wierszy. |

### Zmienne CSS

| Zmienna | Domyślnie | Opis |
| --- | --- | --- |
| `--pl-list-gap` | `0.55rem` | Odstęp między pozycjami. |
| `--pl-list-marker` | `var(--pl-text)` | Kolor punktora. |
| `--pl-list-group-px` / `-py` | `1rem` / `0.75rem` | Odstępy wewnętrzne wiersza. |
| `--pl-list-group-radius` | `var(--pl-radius-md)` | Zaokrąglenie grupy. |
