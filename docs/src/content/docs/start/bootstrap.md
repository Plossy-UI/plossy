---
title: Zgodność z Bootstrapem
description: Znasz Bootstrapa? Jego klasy narzędziowe, siatka i helpery działają w Plossy od razu — w kolorach, promieniach i cieniach biblioteki.
order: 5
---

## Narzędzia

Wszystkie popularne klasy narzędziowe mają te same nazwy i tę samą skalę co w Bootstrapie 5 (`0–5` = 0 / 0.25 / 0.5 / 1 / 1.5 / 3 rem), łącznie z wariantami responsywnymi `-sm`, `-md`, `-lg`, `-xl`, `-xxl`.

```html example
<div class="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 p-4 border rounded-4 bg-body-tertiary shadow-sm">
  <div>
    <p class="text-uppercase small fw-semibold text-primary mb-1">Plan Pro</p>
    <p class="h4 mb-1">49 zł / miesiąc</p>
    <p class="text-body-secondary mb-0">Nielimitowane projekty i priorytetowe wsparcie.</p>
  </div>
  <button class="pl-button pl-button-primary ms-md-auto" type="button">Wybieram</button>
</div>
```

## Siatka

`.container`, `.row`, `.col-*`, `.offset-*`, `.row-cols-*` oraz odstępy `.g-*`, `.gx-*`, `.gy-*` zachowują się identycznie jak w Bootstrapie (12 kolumn, breakpointy 576 / 768 / 992 / 1200 / 1400 px).

```html example
<div class="row g-3">
  <div class="col-12 col-md-8"><div class="p-3 rounded-3 bg-primary-subtle text-primary">.col-12 .col-md-8</div></div>
  <div class="col-6 col-md-4"><div class="p-3 rounded-3 bg-primary-subtle text-primary">.col-6 .col-md-4</div></div>
  <div class="col-6 col-md-4"><div class="p-3 rounded-3 bg-body-secondary">.col-6 .col-md-4</div></div>
  <div class="col-6 col-md-4"><div class="p-3 rounded-3 bg-body-secondary">.col-6 .col-md-4</div></div>
  <div class="col-6 col-md-4"><div class="p-3 rounded-3 bg-body-secondary">.col-6 .col-md-4</div></div>
</div>
```

```html example
<div class="row row-cols-2 row-cols-lg-4 g-2 text-center">
  <div class="col"><div class="py-3 border rounded-3">1</div></div>
  <div class="col"><div class="py-3 border rounded-3">2</div></div>
  <div class="col"><div class="py-3 border rounded-3">3</div></div>
  <div class="col"><div class="py-3 border rounded-3">4</div></div>
</div>
```

## Kolory i tła

Klasy kolorów korzystają z tokenów Plossy, więc reagują na motyw i akcent.

```html example row
<span class="px-3 py-2 rounded-pill text-bg-primary">text-bg-primary</span>
<span class="px-3 py-2 rounded-pill text-bg-success">text-bg-success</span>
<span class="px-3 py-2 rounded-pill text-bg-warning">text-bg-warning</span>
<span class="px-3 py-2 rounded-pill text-bg-danger">text-bg-danger</span>
<span class="px-3 py-2 rounded-pill bg-info-subtle text-info">bg-info-subtle</span>
<span class="px-3 py-2 rounded-pill text-bg-dark">text-bg-dark</span>
```

## Komponenty

Najczęściej używane klasy komponentów Bootstrapa są aliasami komponentów Plossy — istniejący kod HTML dostaje nowy wygląd bez zmian.

```html example
<div class="row g-4">
  <div class="col-md-6">
    <div class="card">
      <div class="card-header"><h5 class="card-title">Nowe konto</h5></div>
      <div class="card-body">
        <div class="mb-3">
          <label class="form-label" for="demo-bs-email">E-mail</label>
          <input class="form-control" id="demo-bs-email" type="email" placeholder="ty@firma.pl" />
          <div class="form-text">Nie udostępniamy adresu nikomu.</div>
        </div>
        <div class="mb-3">
          <label class="form-label" for="demo-bs-plan">Plan</label>
          <select class="form-select" id="demo-bs-plan">
            <option>Starter</option>
            <option>Pro</option>
          </select>
        </div>
        <div class="form-check form-switch mb-3">
          <input class="form-check-input" type="checkbox" id="demo-bs-news" checked />
          <label class="form-check-label" for="demo-bs-news">Newsletter</label>
        </div>
        <div class="d-flex gap-2">
          <button class="btn btn-primary" type="button">Załóż konto</button>
          <button class="btn btn-outline-secondary" type="button">Anuluj</button>
        </div>
      </div>
    </div>
  </div>
  <div class="col-md-6">
    <div class="alert alert-success mb-3" role="alert">Płatność została zaksięgowana.</div>
    <ul class="list-group mb-3">
      <li class="list-group-item d-flex justify-content-between align-items-center">Faktury <span class="badge">12</span></li>
      <li class="list-group-item d-flex justify-content-between align-items-center">Zamówienia <span class="badge">4</span></li>
      <li class="list-group-item">Ustawienia</li>
    </ul>
    <div class="d-flex flex-wrap gap-2 align-items-center">
      <button class="btn btn-success btn-sm" type="button">Mały</button>
      <button class="btn btn-danger" type="button">Usuń</button>
      <button class="btn btn-light" type="button">Light</button>
      <button class="btn btn-link" type="button">Link</button>
      <span class="spinner-border spinner-border-sm" role="status"></span>
    </div>
  </div>
</div>
```

| Bootstrap | Plossy |
| --- | --- |
| `btn`, `btn-{ton}`, `btn-outline-{ton}`, `btn-sm`, `btn-lg`, `btn-link`, `btn-group`, `btn-close` | [Button](/docs/elements/button/), [Close](/docs/elements/close/) |
| `card`, `card-body`, `card-header`, `card-footer`, `card-title`, `card-subtitle`, `card-text`, `card-img-top` | [Card](/docs/elements/card/) |
| `form-control`, `form-select`, `form-label`, `form-text`, `form-check`, `form-check-input`, `form-switch`, `form-range`, `form-floating`, `input-group`, `input-group-text`, `is-valid`, `is-invalid` | [Form](/docs/forms/form/) |
| `alert`, `alert-{ton}`, `alert-heading` | [Alert](/docs/elements/alert/) |
| `badge` | [Label](/docs/elements/label/) |
| `table`, `table-striped`, `table-hover`, `table-bordered`, `table-sm` | [Table](/docs/elements/table/) |
| `list-group`, `list-group-item`, `list-group-flush` | [List](/docs/elements/list/) |
| `spinner-border`, `spinner-grow` | [Spinner](/docs/elements/spinner/) |

> Komponenty o innej strukturze HTML lub z własnym skryptem — **modal, dropdown, navbar, collapse, offcanvas, tabs, tooltip** i atrybuty `data-bs-*` — nie są aliasowane. Użyj ich odpowiedników `pl-*` z atrybutami `data-pl-*`, opisanych na kolejnych stronach.

## Zakres

| Grupa | Klasy |
| --- | --- |
| Wyświetlanie | `d-none`, `d-block`, `d-flex`, `d-grid`, `d-inline-flex` … + `d-{bp}-*`, `d-print-*` |
| Flex | `flex-row`, `flex-column`, `flex-wrap`, `flex-fill`, `flex-grow-1`, `justify-content-*`, `align-items-*`, `align-self-*`, `align-content-*`, `order-*` |
| Odstępy | `m-*`, `mt- mb- ms- me- mx- my-`, `p-*`, `pt- …`, `gap-*`, `row-gap-*`, `column-gap-*`, `*-auto`, ujemne `m*-n1…n5` |
| Siatka | `container`, `container-fluid`, `container-{bp}`, `row`, `col`, `col-{1–12}`, `col-{bp}-*`, `col-auto`, `offset-*`, `row-cols-*`, `g-*`, `gx-*`, `gy-*` |
| Rozmiary | `w-25 … w-100`, `w-auto`, `h-*`, `mw-100`, `mh-100`, `vw-100`, `vh-100`, `min-vh-100` |
| Tekst | `text-start / -center / -end`, `fs-1 … fs-6`, `fw-*`, `fst-*`, `lh-*`, `text-uppercase`, `text-truncate`, `text-nowrap`, `text-break`, `text-decoration-*`, `lead`, `small`, `h1 … h6`, `display-1 … display-6`, `font-monospace` |
| Kolory | `text-{ton}`, `text-body`, `text-body-secondary`, `text-muted`, `bg-{ton}`, `bg-{ton}-subtle`, `bg-body`, `bg-light`, `bg-dark`, `text-bg-{ton}`, `border-{ton}`, `opacity-*` |
| Ramki i kształt | `border`, `border-top …`, `border-0`, `border-1 … 5`, `rounded`, `rounded-0 … 5`, `rounded-circle`, `rounded-pill`, `rounded-top …`, `shadow-sm`, `shadow`, `shadow-lg`, `shadow-none` |
| Pozycja | `position-*`, `top-0 / 50 / 100`, `start-*`, `end-*`, `bottom-*`, `translate-middle`, `fixed-top`, `sticky-top`, `z-0 … z-3` |
| Helpery | `hstack`, `vstack`, `vr`, `ratio ratio-16x9`, `stretched-link`, `visually-hidden`, `clearfix`, `img-fluid`, `img-thumbnail`, `list-unstyled`, `list-inline`, `overflow-*`, `visible`, `invisible`, `pe-none`, `user-select-*`, `float-*`, `object-fit-*`, `align-*` |
