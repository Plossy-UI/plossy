---
title: Comment
description: Komentarze i wątki dyskusji — nagłówek z awatarem, treść, akcje oraz zagnieżdżone odpowiedzi połączone liniami.
---

## Podstawowe użycie

Komentarz to `.pl-comment` z nagłówkiem `.pl-comment-header` (awatar, tytuł `.pl-comment-title`, metadane `.pl-comment-meta`) i treścią `.pl-comment-body`.

```html example
<article class="pl-comment">
  <header class="pl-comment-header">
    <img class="pl-comment-avatar" src="/img/avatar-1.svg" alt="" width="40" height="40">
    <div>
      <h4 class="pl-comment-title"><a href="#">Anna Kowalska</a></h4>
      <ul class="pl-comment-meta">
        <li><time datetime="2026-11-20T09:14">2 godziny temu</time></li>
        <li><a href="#">Odpowiedz</a></li>
      </ul>
    </div>
  </header>
  <div class="pl-comment-body">
    <p>Świetny wpis! Od dawna szukałam prostego wyjaśnienia, jak działa siatka bazowa. Czy planujecie kontynuację o typografii responsywnej?</p>
  </div>
</article>
```

## Akcje

Pod treścią możesz dodać wiersz `.pl-comment-actions` z przyciskami `.pl-comment-action`. Aktywną akcję (np. polubienie) oznacz klasą `.pl-active`. `.pl-comment-badge` to mała etykieta przy autorze.

```html example
<article class="pl-comment">
  <header class="pl-comment-header">
    <span class="pl-avatar pl-comment-avatar pl-avatar-primary">TB</span>
    <div>
      <h4 class="pl-comment-title">Tomasz Bielak <span class="pl-comment-badge">Autor</span></h4>
      <ul class="pl-comment-meta">
        <li>wczoraj, 18:42</li>
        <li>edytowano</li>
      </ul>
    </div>
  </header>
  <div class="pl-comment-body">
    <p>Dzięki za czujność — literówka w drugim przykładzie już poprawiona. Kod w repozytorium też jest zaktualizowany.</p>
  </div>
  <div class="pl-comment-actions">
    <button class="pl-comment-action pl-active" type="button"><span data-pl-icon="thumbs-up"></span> 12</button>
    <button class="pl-comment-action" type="button"><span data-pl-icon="message-circle"></span> Odpowiedz</button>
    <button class="pl-comment-action" type="button"><span data-pl-icon="share-2"></span> Udostępnij</button>
    <button class="pl-comment-action" type="button" aria-label="Więcej"><span data-pl-icon="ellipsis"></span></button>
  </div>
</article>
```

## Wyróżniony komentarz

`.pl-comment-primary` podkreśla komentarz tłem w kolorze akcentu — np. odpowiedź autora albo zaakceptowane rozwiązanie. `.pl-comment-card` zamienia komentarz w kartę.

```html example
<article class="pl-comment pl-comment-primary pl-margin">
  <header class="pl-comment-header">
    <img class="pl-comment-avatar" src="/img/avatar-4.svg" alt="" width="40" height="40">
    <div>
      <h4 class="pl-comment-title">Daria Lis <span class="pl-comment-badge">Rozwiązanie</span></h4>
      <ul class="pl-comment-meta">
        <li>3 dni temu</li>
      </ul>
    </div>
  </header>
  <div class="pl-comment-body">
    <p>Problem znika po wyczyszczeniu pamięci podręcznej i ponownym zbudowaniu projektu. U mnie pomogło <code>npm run clean</code>.</p>
  </div>
</article>

<article class="pl-comment pl-comment-card">
  <header class="pl-comment-header">
    <img class="pl-comment-avatar" src="/img/avatar-6.svg" alt="" width="40" height="40">
    <div>
      <h4 class="pl-comment-title">Piotr Zych</h4>
      <ul class="pl-comment-meta">
        <li>5 dni temu</li>
        <li>Zweryfikowany zakup</li>
      </ul>
    </div>
  </header>
  <div class="pl-comment-body">
    <p>Plecak używam codziennie od pół roku. Szwy trzymają, zamki chodzą gładko, a laptop 15″ mieści się bez problemu.</p>
  </div>
</article>
```

## Lista z odpowiedziami

`.pl-comment-list` to lista `<ul>`. Odpowiedzi umieszczasz w zagnieżdżonym `<ul>` wewnątrz `<li>` — zostaną wcięte i połączone z komentarzem nadrzędnym zaokrąglonymi liniami, na dowolnej głębokości.

```html example
<ul class="pl-comment-list">
  <li>
    <article class="pl-comment">
      <header class="pl-comment-header">
        <img class="pl-comment-avatar" src="/img/avatar-1.svg" alt="" width="40" height="40">
        <div>
          <h4 class="pl-comment-title">Anna Kowalska</h4>
          <ul class="pl-comment-meta"><li>4 godziny temu</li></ul>
        </div>
      </header>
      <div class="pl-comment-body">
        <p>Czy ktoś testował nową wersję na starszych telefonach? U mnie animacje wyraźnie zwalniają.</p>
      </div>
      <div class="pl-comment-actions">
        <button class="pl-comment-action" type="button"><span data-pl-icon="thumbs-up"></span> 4</button>
        <button class="pl-comment-action" type="button"><span data-pl-icon="message-circle"></span> Odpowiedz</button>
      </div>
    </article>
    <ul>
      <li>
        <article class="pl-comment">
          <header class="pl-comment-header">
            <img class="pl-comment-avatar" src="/img/avatar-5.svg" alt="" width="40" height="40">
            <div>
              <h4 class="pl-comment-title">Marek Nowak</h4>
              <ul class="pl-comment-meta"><li>3 godziny temu</li></ul>
            </div>
          </header>
          <div class="pl-comment-body">
            <p>Tak, na czteroletnim Androidzie jest podobnie. Pomaga włączenie trybu ograniczonego ruchu w ustawieniach.</p>
          </div>
        </article>
        <ul>
          <li>
            <article class="pl-comment">
              <header class="pl-comment-header">
                <img class="pl-comment-avatar" src="/img/avatar-1.svg" alt="" width="40" height="40">
                <div>
                  <h4 class="pl-comment-title">Anna Kowalska</h4>
                  <ul class="pl-comment-meta"><li>2 godziny temu</li></ul>
                </div>
              </header>
              <div class="pl-comment-body">
                <p>Działa, dzięki! Zgłoszę to jeszcze zespołowi.</p>
              </div>
            </article>
          </li>
        </ul>
      </li>
      <li>
        <article class="pl-comment">
          <header class="pl-comment-header">
            <span class="pl-avatar pl-comment-avatar pl-avatar-secondary">TB</span>
            <div>
              <h4 class="pl-comment-title">Tomasz Bielak <span class="pl-comment-badge">Zespół</span></h4>
              <ul class="pl-comment-meta"><li>godzinę temu</li></ul>
            </div>
          </header>
          <div class="pl-comment-body">
            <p>Poprawka jest już w drodze — wyjdzie w wersji 4.2.1 jeszcze w tym tygodniu.</p>
          </div>
        </article>
      </li>
    </ul>
  </li>
  <li>
    <article class="pl-comment">
      <header class="pl-comment-header">
        <img class="pl-comment-avatar" src="/img/avatar-3.svg" alt="" width="40" height="40">
        <div>
          <h4 class="pl-comment-title">Ewa Maj</h4>
          <ul class="pl-comment-meta"><li>wczoraj</li></ul>
        </div>
      </header>
      <div class="pl-comment-body">
        <p>Nowy ekran ustawień jest dużo czytelniejszy. Brawo za porządek w sekcji powiadomień.</p>
      </div>
    </article>
  </li>
</ul>
```

## Wyróżnienie w wątku

Wyróżniony komentarz działa także wewnątrz listy — linie odpowiedzi dopasowują się do jego ramki.

```html example
<ul class="pl-comment-list">
  <li>
    <article class="pl-comment pl-comment-primary">
      <header class="pl-comment-header">
        <img class="pl-comment-avatar" src="/img/avatar-2.svg" alt="" width="40" height="40">
        <div>
          <h4 class="pl-comment-title">Bartek Wrona <span class="pl-comment-badge">Przypięty</span></h4>
          <ul class="pl-comment-meta"><li>tydzień temu</li></ul>
        </div>
      </header>
      <div class="pl-comment-body">
        <p>Zanim zadasz pytanie, zajrzyj do sekcji FAQ — większość odpowiedzi już tam jest.</p>
      </div>
    </article>
    <ul>
      <li>
        <article class="pl-comment">
          <header class="pl-comment-header">
            <img class="pl-comment-avatar" src="/img/avatar-6.svg" alt="" width="40" height="40">
            <div>
              <h4 class="pl-comment-title">Piotr Zych</h4>
              <ul class="pl-comment-meta"><li>6 dni temu</li></ul>
            </div>
          </header>
          <div class="pl-comment-body">
            <p>Dobrze, że to przypięliście. Link do FAQ przydałby się też w stopce.</p>
          </div>
        </article>
      </li>
    </ul>
  </li>
</ul>
```

## Mniejszy rozmiar i linie

`.pl-comment-list-small` zmniejsza awatary i tekst (pojedynczy komentarz: `.pl-comment-small`), a `.pl-comment-list-divider` oddziela komentarze najwyższego poziomu liniami.

```html example narrow
<ul class="pl-comment-list pl-comment-list-small pl-comment-list-divider">
  <li>
    <article class="pl-comment">
      <header class="pl-comment-header">
        <img class="pl-comment-avatar" src="/img/avatar-3.svg" alt="" width="32" height="32">
        <div>
          <h4 class="pl-comment-title">Ewa Maj</h4>
          <ul class="pl-comment-meta"><li>10:24</li></ul>
        </div>
      </header>
      <div class="pl-comment-body"><p>Makiety są gotowe do przeglądu.</p></div>
    </article>
  </li>
  <li>
    <article class="pl-comment">
      <header class="pl-comment-header">
        <img class="pl-comment-avatar" src="/img/avatar-5.svg" alt="" width="32" height="32">
        <div>
          <h4 class="pl-comment-title">Marek Nowak</h4>
          <ul class="pl-comment-meta"><li>10:31</li></ul>
        </div>
      </header>
      <div class="pl-comment-body"><p>Zerknę po spotkaniu, około 12:00.</p></div>
    </article>
  </li>
</ul>
```

## API

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-comment` | Pojedynczy komentarz. |
| `.pl-comment-header` | Nagłówek z awatarem i autorem. |
| `.pl-comment-avatar` | Awatar (na `<img>` lub razem z `.pl-avatar`). |
| `.pl-comment-title` | Autor. |
| `.pl-comment-meta` | Lista metadanych rozdzielanych kropkami. |
| `.pl-comment-body` | Treść. |
| `.pl-comment-actions`, `.pl-comment-action` | Wiersz akcji i pojedynczy przycisk. |
| `.pl-comment-badge` | Etykieta przy autorze. |
| `.pl-comment-primary` | Wyróżniony komentarz. |
| `.pl-comment-card` | Komentarz jako karta. |
| `.pl-comment-small` | Mniejszy komentarz. |
| `.pl-comment-list` | Lista komentarzy z zagnieżdżonymi odpowiedziami. |
| `.pl-comment-list-small` | Mniejsza lista. |
| `.pl-comment-list-divider` | Linie między komentarzami najwyższego poziomu. |

### Zmienne CSS

| Zmienna | Domyślnie | Opis |
| --- | --- | --- |
| `--pl-comment-avatar` | `2.5rem` | Rozmiar awatara (wyznacza też wcięcie odpowiedzi). |
| `--pl-comment-gap` | `0.875rem` | Odstęp między awatarem a tekstem. |
| `--pl-comment-space` | `1.5rem` | Odstęp między komentarzami. |
| `--pl-comment-line` | `var(--pl-border-strong)` | Kolor linii łączących odpowiedzi. |
