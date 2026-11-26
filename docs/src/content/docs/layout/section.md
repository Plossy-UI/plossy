---
title: Section
description: Poziome pasy strony z gotowym rytmem pionowych odstępów i stylami tła — także ciemnymi, w których treść sama pozostaje czytelna.
---

## Podstawowe użycie

`.pl-section` dodaje pionowy padding, który płynnie rośnie z szerokością ekranu. W środku zwykle umieszcza się [Container](/docs/layout/container/).

```html example flush
<div class="pl-section pl-section-muted">
  <div class="pl-container">
    <h3>Zbuduj stronę z gotowych klocków</h3>
    <p>Sekcja odpowiada za tło i oddech w pionie, kontener — za szerokość treści.</p>
  </div>
</div>
```

## Style

Modyfikatory `-default`, `-muted`, `-primary` i `-secondary` ustawiają tło. W sekcjach `-primary` i `-secondary` tokeny tekstu, ramek i powierzchni są przeliczane względem tła — nagłówki, akapity, linki, karty i dividery wewnątrz dopasowują się same.

```html example flush
<div class="pl-section pl-section-small pl-section-default">
  <div class="pl-container">
    <h4>Default</h4>
    <p>Tło strony. Przydatne, gdy sekcja ma przykryć to, co pod nią.</p>
  </div>
</div>
<div class="pl-section pl-section-small pl-section-muted">
  <div class="pl-container">
    <h4>Muted</h4>
    <p>Delikatne, piaskowe tło do przeplatania z sekcjami domyślnymi.</p>
  </div>
</div>
<div class="pl-section pl-section-small pl-section-primary">
  <div class="pl-container">
    <h4>Primary</h4>
    <p>Kolor akcentu. <a href="#">Linki</a> i tekst pomocniczy zmieniają barwę automatycznie.</p>
  </div>
</div>
<div class="pl-section pl-section-small pl-section-secondary">
  <div class="pl-container">
    <h4>Secondary</h4>
    <p>„Atramentowa" sekcja — w ciemnym motywie odwraca się w jasną.</p>
  </div>
</div>
```

### Komponenty w ciemnej sekcji

Karty, linie i teksty pomocnicze korzystają z tych samych tokenów, więc nie wymagają dodatkowych klas. Dla przycisków w sekcji `-primary` wybierz wariant `.pl-button-secondary` lub domyślny.

```html example flush
<div class="pl-section pl-section-secondary">
  <div class="pl-container">
    <h3>Dołącz do 12 000 zespołów</h3>
    <p style="color: var(--pl-text-muted)">Pierwsze 30 dni bez opłat i bez podawania karty.</p>
    <div class="pl-grid pl-child-width-1-3@s" style="margin-top: 1.5rem">
      <div><div class="pl-card pl-card-small"><div class="pl-card-body"><strong>99,98%</strong><br><small>dostępności usług</small></div></div></div>
      <div><div class="pl-card pl-card-small"><div class="pl-card-body"><strong>4 min</strong><br><small>średni czas odpowiedzi</small></div></div></div>
      <div><div class="pl-card pl-card-small"><div class="pl-card-body"><strong>38 krajów</strong><br><small>w których działamy</small></div></div></div>
    </div>
    <hr class="pl-divider-icon">
    <button class="pl-button pl-button-primary" type="button">Załóż konto</button>
  </div>
</div>
```

## Rozmiary

Padding zmienisz modyfikatorami `-xsmall`, `-small`, `-large` i `-xlarge`.

```html example flush
<div class="pl-section pl-section-xsmall pl-section-muted">
  <div class="pl-container"><code>.pl-section-xsmall</code></div>
</div>
<div class="pl-section pl-section-small pl-section-default">
  <div class="pl-container"><code>.pl-section-small</code></div>
</div>
<div class="pl-section pl-section-muted">
  <div class="pl-container"><code>.pl-section</code></div>
</div>
<div class="pl-section pl-section-large pl-section-default">
  <div class="pl-container"><code>.pl-section-large</code></div>
</div>
<div class="pl-section pl-section-xlarge pl-section-muted">
  <div class="pl-container"><code>.pl-section-xlarge</code></div>
</div>
```

## Bez paddingu

`.pl-section-remove-vertical` usuwa padding z góry i z dołu, `-remove-top` i `-remove-bottom` — z jednej strony. Przydaje się, gdy dwie sekcje o tym samym tle stoją obok siebie.

```html example flush
<div class="pl-section pl-section-muted pl-section-remove-bottom">
  <div class="pl-container">
    <h4>Nagłówek bloku</h4>
  </div>
</div>
<div class="pl-section pl-section-muted pl-section-small">
  <div class="pl-container">
    <p>Druga sekcja ma to samo tło — bez <code>-remove-bottom</code> odstęp między nimi byłby podwójny.</p>
  </div>
</div>
```

## Nachodzenie

`.pl-section-overlap` wsuwa sekcję na poprzednią jak arkusz z zaokrągloną górą. Głębokość ustawia zmienna `--pl-section-overlap` (domyślnie 3rem) — poprzedniej sekcji warto dać większy padding.

```html example flush
<div class="pl-section pl-section-large pl-section-primary">
  <div class="pl-container">
    <h2>Raport roczny 2026</h2>
    <p>Najważniejsze liczby i wnioski w jednym miejscu.</p>
  </div>
</div>
<div class="pl-section pl-section-overlap pl-section-default">
  <div class="pl-container">
    <h4>Podsumowanie</h4>
    <p>Ta sekcja nachodzi na poprzednią, tworząc efekt warstw.</p>
  </div>
</div>
```

## Zaokrąglona sekcja

`.pl-section-rounded` zaokrągla rogi — dobre dla „wyspy" z wezwaniem do działania wewnątrz kontenera.

```html example
<div class="pl-section pl-section-small pl-section-primary pl-section-rounded">
  <div class="pl-container">
    <h3>Gotowy, żeby zacząć?</h3>
    <p>Instalacja zajmuje mniej niż minutę.</p>
    <button class="pl-button pl-button-secondary" type="button">Pobierz Plossy</button>
  </div>
</div>
```

## API

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-section` | Sekcja z pionowym paddingiem. |
| `.pl-section-xsmall` / `-small` / `-large` / `-xlarge` | Rozmiar paddingu. |
| `.pl-section-remove-vertical` | Bez paddingu pionowego. |
| `.pl-section-remove-top` / `-remove-bottom` | Bez paddingu z jednej strony. |
| `.pl-section-default` | Tło strony. |
| `.pl-section-muted` | Stonowane tło. |
| `.pl-section-primary` | Tło w kolorze akcentu, odwrócone tokeny tekstu. |
| `.pl-section-secondary` | Tło „atramentowe", odwrócone tokeny tekstu. |
| `.pl-section-overlap` | Nachodzi na poprzednią sekcję. |
| `.pl-section-rounded` | Zaokrąglone rogi. |

### Zmienne CSS

| Zmienna | Opis |
| --- | --- |
| `--pl-section-py` | Padding pionowy sekcji. |
| `--pl-section-overlap` | Głębokość nachodzenia (domyślnie `3rem`). |
