---
title: Visibility
description: Ukrywanie i pokazywanie elementów — na stałe, zależnie od szerokości ekranu, typu urządzenia albo po najechaniu na kontener.
---

## Podstawowe użycie

`.pl-hidden` usuwa element z układu (`display: none`). `.pl-invisible` tylko go ukrywa (`visibility: hidden`) — miejsce pozostaje zarezerwowane.

```html example row
<span class="pl-label">Widoczny</span>
<span class="pl-label pl-hidden">.pl-hidden</span>
<span class="pl-label pl-invisible">.pl-invisible</span>
<span class="pl-label">Widoczny</span>
```

Zamiast `.pl-hidden` możesz też użyć atrybutu `hidden` — działa identycznie. Element ukryty wizualnie, ale dostępny dla czytników ekranu, oznacz klasą [`.pl-visually-hidden`](/docs/utilities/utility/).

## Ukrywanie responsywne

`.pl-hidden@s`, `@m`, `@l`, `@xl` ukrywają element **od** danego breakpointu w górę. `.pl-visible@…` działają odwrotnie — element pojawia się dopiero od breakpointu.

```html example
<div class="pl-grid pl-grid-small pl-child-width-1-2@s">
  <div>
    <p class="pl-text-eyebrow">Znika na szerszych ekranach</p>
    <div class="pl-flex pl-flex-wrap pl-gap-small">
      <span class="pl-label pl-hidden@s">.pl-hidden@s</span>
      <span class="pl-label pl-hidden@m">.pl-hidden@m</span>
      <span class="pl-label pl-hidden@l">.pl-hidden@l</span>
      <span class="pl-label pl-hidden@xl">.pl-hidden@xl</span>
    </div>
  </div>
  <div>
    <p class="pl-text-eyebrow">Pojawia się na szerszych ekranach</p>
    <div class="pl-flex pl-flex-wrap pl-gap-small">
      <span class="pl-label pl-visible@s">.pl-visible@s</span>
      <span class="pl-label pl-visible@m">.pl-visible@m</span>
      <span class="pl-label pl-visible@l">.pl-visible@l</span>
      <span class="pl-label pl-visible@xl">.pl-visible@xl</span>
    </div>
  </div>
</div>
<p class="pl-text-meta pl-margin-top">Zmień szerokość okna, aby zobaczyć działanie.</p>
```

| Klasa | Ukryty, gdy okno ma… |
| --- | --- |
| `.pl-hidden@s` | 640px i więcej |
| `.pl-hidden@m` | 960px i więcej |
| `.pl-hidden@l` | 1200px i więcej |
| `.pl-hidden@xl` | 1600px i więcej |
| `.pl-visible@s` | mniej niż 640px |
| `.pl-visible@m` | mniej niż 960px |
| `.pl-visible@l` | mniej niż 1200px |
| `.pl-visible@xl` | mniej niż 1600px |

## Urządzenia dotykowe

`.pl-hidden-touch` ukrywa element na urządzeniach obsługiwanych palcem, `.pl-hidden-notouch` — na urządzeniach z myszą lub gładzikiem.

```html example column
<p class="pl-hidden-touch"><span data-pl-icon="monitor"></span> Najedź kursorem na wykres, aby zobaczyć szczegóły.</p>
<p class="pl-hidden-notouch"><span data-pl-icon="smartphone"></span> Dotknij wykresu, aby zobaczyć szczegóły.</p>
```

## Odsłanianie po najechaniu

Kontenerowi nadaj `.pl-visible-toggle`, a elementom w środku — `.pl-hidden-hover` (nie zajmuje miejsca, dopóki jest ukryty) lub `.pl-invisible-hover` (miejsce jest zarezerwowane, element płynnie się pojawia). Elementy odsłania także fokus klawiatury wewnątrz kontenera; dodaj `tabindex="0"`, jeśli kontener nie zawiera elementów fokusowalnych. Na ekranach dotykowych — gdzie nie ma hovera — elementy są zawsze widoczne.

```html example
<ul class="pl-list pl-list-divider">
  <li class="pl-visible-toggle pl-flex pl-flex-middle pl-flex-between">
    <span>Umowa ramowa — Nordwind sp. z o.o.</span>
    <span class="pl-invisible-hover">
      <button class="pl-button pl-button-small pl-button-ghost" type="button">Edytuj</button>
      <button class="pl-button pl-button-small pl-button-ghost pl-button-danger" type="button">Usuń</button>
    </span>
  </li>
  <li class="pl-visible-toggle pl-flex pl-flex-middle pl-flex-between">
    <span>Aneks nr 2 — zmiana stawek</span>
    <span class="pl-invisible-hover">
      <button class="pl-button pl-button-small pl-button-ghost" type="button">Edytuj</button>
      <button class="pl-button pl-button-small pl-button-ghost pl-button-danger" type="button">Usuń</button>
    </span>
  </li>
  <li class="pl-visible-toggle pl-flex pl-flex-middle pl-flex-between">
    <span>Protokół odbioru — etap I</span>
    <span class="pl-invisible-hover">
      <button class="pl-button pl-button-small pl-button-ghost" type="button">Edytuj</button>
      <button class="pl-button pl-button-small pl-button-ghost pl-button-danger" type="button">Usuń</button>
    </span>
  </li>
</ul>
```

Różnica między obiema klasami:

```html example
<div class="pl-grid pl-grid-small pl-child-width-1-2@s">
  <div>
    <div class="pl-visible-toggle pl-card pl-card-body" tabindex="0">
      <strong>.pl-hidden-hover</strong>
      <p class="pl-text-muted pl-margin-small-top">Karta rośnie, gdy pojawia się dodatkowa treść.</p>
      <p class="pl-hidden-hover pl-margin-small-top"><a href="#">Czytaj dalej →</a></p>
    </div>
  </div>
  <div>
    <div class="pl-visible-toggle pl-card pl-card-body" tabindex="0">
      <strong>.pl-invisible-hover</strong>
      <p class="pl-text-muted pl-margin-small-top">Miejsce na link jest zarezerwowane od początku.</p>
      <p class="pl-invisible-hover pl-margin-small-top"><a href="#">Czytaj dalej →</a></p>
    </div>
  </div>
</div>
```

## API

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-hidden` | `display: none`. |
| `.pl-invisible` | `visibility: hidden`. |
| `.pl-hidden@s` … `@xl` | Ukryty od breakpointu w górę. |
| `.pl-visible@s` … `@xl` | Widoczny od breakpointu w górę. |
| `.pl-hidden-touch` | Ukryty na urządzeniach dotykowych. |
| `.pl-hidden-notouch` | Ukryty na urządzeniach z kursorem. |
| `.pl-visible-toggle` | Kontener wyzwalający odsłanianie. |
| `.pl-hidden-hover` | Dziecko ukryte (bez zajmowania miejsca) do hovera / fokusu. |
| `.pl-invisible-hover` | Dziecko przezroczyste do hovera / fokusu. |
