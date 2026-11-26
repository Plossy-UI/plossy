---
title: Inverse
description: Lokalne odwrócenie kolorów. Klasa .pl-light dopasowuje wszystkie komponenty do ciemnego tła, a .pl-dark — do jasnego, niezależnie od motywu strony.
---

## Podstawowe użycie

Klasa `.pl-light` oznacza: „treść stoi na **ciemnym** tle, ma być jasna". Wewnątrz niej tokeny kolorów (`--pl-text`, `--pl-surface`, `--pl-border`, `--pl-muted`, tony, cienie…) przyjmują wartości ciemnego motywu, więc **każdy** komponent dopasowuje się sam — bez dodatkowych modyfikatorów.

Najprościej połączyć ją z klasą tła: w zakresie `.pl-light` klasa `.pl-background-default` daje ciemne tło strony.

```html example flush
<div class="pl-light pl-background-default pl-padding-large">
  <p class="pl-text-eyebrow">Wydanie 2.0</p>
  <h2 class="pl-margin-small-top">Ciemna sekcja w jasnej stronie</h2>
  <p class="pl-text-lead" style="max-width: 36rem">Nagłówki, akapity, linki i komponenty same zmieniają kolory. <a href="#">Zobacz, co nowego</a>.</p>
  <p class="pl-margin-medium-top">
    <button class="pl-button pl-button-primary" type="button">Wypróbuj</button>
    <button class="pl-button" type="button">Dokumentacja</button>
    <button class="pl-button pl-button-ghost" type="button">Pomiń</button>
  </p>
</div>
```

## Odwrócenie w drugą stronę

`.pl-dark` działa odwrotnie: treść stoi na **jasnym** tle i ma być ciemna. Przydaje się, gdy strona działa w ciemnym motywie, a fragment ma pozostać jasny (np. podgląd wydruku).

```html example flush
<div class="pl-dark pl-background-default pl-padding-large">
  <p class="pl-text-eyebrow">Podgląd wydruku</p>
  <h3 class="pl-margin-small-top">Faktura FV/2025/118</h3>
  <p class="pl-text-muted">Ten blok jest jasny zarówno w jasnym, jak i w ciemnym motywie strony.</p>
  <p class="pl-margin-top">
    <button class="pl-button pl-button-secondary" type="button">Drukuj</button>
    <button class="pl-button" type="button">Pobierz PDF</button>
  </p>
</div>
```

## Komponenty w odwróconym zakresie

Ponieważ odwracane są tokeny, a nie pojedyncze style, zmieniają się wszystkie komponenty naraz.

```html example flush
<div class="pl-light pl-background-default pl-padding">
  <div class="pl-grid pl-child-width-1-2@m">
    <div>
      <div class="pl-card pl-card-body">
        <h4>Plan Zespół</h4>
        <p class="pl-text-muted">Wspólne przestrzenie robocze, role i uprawnienia.</p>
        <p class="pl-flex pl-flex-wrap pl-gap-small">
          <span class="pl-label">Popularny</span>
          <span class="pl-badge">12</span>
        </p>
        <button class="pl-button pl-button-primary" type="button">Wybierz plan</button>
      </div>
    </div>
    <div>
      <div class="pl-alert pl-alert-success">Zmiany zostały zapisane.</div>
      <div class="pl-alert pl-alert-warning pl-margin-small-top">Okres próbny kończy się za 3 dni.</div>
      <p class="pl-margin-top">
        <input class="pl-input" type="email" placeholder="adres@przyklad.pl" aria-label="Adres e-mail">
      </p>
      <p class="pl-text-meta">Kolory tekstu: <span class="pl-text-primary">primary</span>, <span class="pl-text-success">success</span>, <span class="pl-text-danger">danger</span>.</p>
    </div>
  </div>
</div>
```

## Tła akcentowe

Klasy inwersji można postawić na tym samym elemencie co tło tonu. Na elemencie z klasą `.pl-light` ton `secondary` jest zawsze ciemny (atramentowy), więc `.pl-background-secondary.pl-light` daje ciemne tło w każdym motywie strony — a przyciski `secondary` w środku są już jasne. Dla `.pl-dark` działa to lustrzanie.

```html example
<div class="pl-grid pl-grid-small pl-child-width-1-3@m">
  <div>
    <div class="pl-light pl-background-secondary pl-padding pl-radius-lg">
      <h4>Secondary</h4>
      <p class="pl-text-muted">Atramentowe tło z jasną treścią.</p>
      <button class="pl-button pl-button-secondary pl-button-small" type="button">Dalej</button>
    </div>
  </div>
  <div>
    <div class="pl-light pl-background-primary pl-padding pl-radius-lg">
      <h4>Primary</h4>
      <p>Tło w kolorze akcentu.</p>
      <button class="pl-button pl-button-secondary pl-button-small" type="button">Dalej</button>
    </div>
  </div>
  <div>
    <div class="pl-light pl-background-cover pl-padding pl-radius-lg" style="background-image: linear-gradient(var(--pl-overlay), var(--pl-overlay)), url(/img/photo-4.svg)">
      <h4>Zdjęcie</h4>
      <p>Jasny tekst na przyciemnionym zdjęciu.</p>
      <button class="pl-button pl-button-small" type="button">Dalej</button>
    </div>
  </div>
</div>
```

## Zachowanie kolorów

Element z klasą `.pl-preserve-color` wraca do kolorów motywu strony, mimo że leży w odwróconym zakresie — np. zwykła karta na ciemnej sekcji.

```html example flush
<div class="pl-light pl-background-default pl-padding">
  <div class="pl-grid pl-child-width-1-2@m">
    <div>
      <div class="pl-card pl-card-body">
        <h4>Karta odwrócona</h4>
        <p class="pl-text-muted">Dziedziczy kolory zakresu <code>.pl-light</code>.</p>
        <button class="pl-button pl-button-small" type="button">Szczegóły</button>
      </div>
    </div>
    <div>
      <div class="pl-card pl-card-body pl-preserve-color">
        <h4>Karta z .pl-preserve-color</h4>
        <p class="pl-text-muted">Wygląda tak, jak w pozostałej części strony.</p>
        <button class="pl-button pl-button-small" type="button">Szczegóły</button>
      </div>
    </div>
  </div>
</div>
```

## Zagnieżdżanie

Zakresy można dowolnie zagnieżdżać — wygrywa najbliższy.

```html example flush
<div class="pl-light pl-background-default pl-padding">
  <p><strong>.pl-light</strong> — ciemna sekcja</p>
  <div class="pl-dark pl-background-default pl-padding-small pl-radius-lg">
    <p><strong>.pl-dark</strong> — jasna wyspa w środku</p>
    <div class="pl-light pl-background-default pl-padding-small pl-radius-md">
      <p class="pl-margin-remove"><strong>.pl-light</strong> — i znów ciemno</p>
    </div>
  </div>
</div>
```

## Inwersja a motyw

| | Zasięg | Zastosowanie |
| --- | --- | --- |
| `data-pl-theme="dark"` | Cała strona lub poddrzewo; wybór użytkownika. | Tryb ciemny aplikacji. |
| `.pl-light` / `.pl-dark` | Pojedyncza sekcja; decyzja projektowa. | Ciemna stopka, sekcja „hero", tekst na zdjęciu. |

Oba mechanizmy ustawiają te same tokeny, więc własne komponenty oparte na zmiennych `--pl-*` działają z nimi bez żadnych zmian.

## API

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-light` | Treść na ciemnym tle — tokeny ciemnego motywu w zakresie elementu. |
| `.pl-dark` | Treść na jasnym tle — tokeny jasnego motywu w zakresie elementu. |
| `.pl-preserve-color` | Przywraca kolory motywu strony wewnątrz odwróconego zakresu. |
