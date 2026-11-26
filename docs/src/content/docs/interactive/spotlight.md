---
title: Spotlight
description: Miękka poświata podążająca za kursorem — na pojedynczym elemencie albo na całej grupie kart jednocześnie.
badge: JS
---

## Podstawowe użycie

Dodaj atrybut `data-pl-spotlight` do elementu (np. karty). Gdy kursor znajdzie się nad nim, pod treścią pojawi się poświata w kolorze akcentu, która płynnie gaśnie po zjechaniu.

```html example narrow
<div class="pl-card" data-pl-spotlight>
  <div class="pl-card-body">
    <span class="pl-icon-box pl-icon-primary" data-pl-icon="sparkles"></span>
    <h3 class="pl-card-title" style="margin-top: 1rem">Najedź kursorem</h3>
    <p class="pl-card-text">Poświata podąża za wskaźnikiem i zanika po opuszczeniu karty.</p>
  </div>
</div>
```

## Grupa elementów

Atrybut na kontenerze z opcją `target` obsługuje wiele elementów naraz. Poświata każdego z nich liczy się względem kursora, więc światło „przelewa się" między sąsiednimi kartami.

```html example
<div class="pl-grid pl-child-width-1-3@m" data-pl-spotlight="target: > div > .pl-card">
  <div>
    <div class="pl-card">
      <div class="pl-card-body">
        <h3 class="pl-card-title">Analityka</h3>
        <p class="pl-card-text">Ruch, konwersje i przychód na jednym ekranie.</p>
      </div>
    </div>
  </div>
  <div>
    <div class="pl-card">
      <div class="pl-card-body">
        <h3 class="pl-card-title">Automatyzacje</h3>
        <p class="pl-card-text">Reguły, które wysyłają wiadomości i faktury za Ciebie.</p>
      </div>
    </div>
  </div>
  <div>
    <div class="pl-card">
      <div class="pl-card-body">
        <h3 class="pl-card-title">Integracje</h3>
        <p class="pl-card-text">Płatności, kurierzy i księgowość bez przepisywania danych.</p>
      </div>
    </div>
  </div>
</div>
```

## Podświetlana ramka

`.pl-spotlight-border` zamiast tła rozświetla samą ramkę elementu w pobliżu kursora.

```html example
<div class="pl-grid pl-child-width-1-3@m" data-pl-spotlight="target: > div > .pl-card">
  <div>
    <div class="pl-card pl-spotlight-border">
      <div class="pl-card-body">
        <p class="pl-card-meta">Starter</p>
        <h3 class="pl-card-title">0 zł</h3>
        <p class="pl-card-text">3 projekty, 1 użytkownik.</p>
      </div>
    </div>
  </div>
  <div>
    <div class="pl-card pl-spotlight-border">
      <div class="pl-card-body">
        <p class="pl-card-meta">Pro</p>
        <h3 class="pl-card-title">49 zł</h3>
        <p class="pl-card-text">Bez limitu projektów, 5 użytkowników.</p>
      </div>
    </div>
  </div>
  <div>
    <div class="pl-card pl-spotlight-border">
      <div class="pl-card-body">
        <p class="pl-card-meta">Zespół</p>
        <h3 class="pl-card-title">149 zł</h3>
        <p class="pl-card-text">Role, SSO i wsparcie priorytetowe.</p>
      </div>
    </div>
  </div>
</div>
```

## Kolor iskry

`.pl-spotlight-spark` zmienia kolor poświaty na limonkową iskrę. Działa także z ramką.

```html example
<div class="pl-grid pl-child-width-1-2@s" data-pl-spotlight="target: > div > .pl-card">
  <div>
    <div class="pl-card pl-spotlight-spark">
      <div class="pl-card-body">
        <h3 class="pl-card-title">Poświata iskry</h3>
        <p class="pl-card-text">Limonkowe światło pod treścią karty.</p>
      </div>
    </div>
  </div>
  <div>
    <div class="pl-card pl-spotlight-spark pl-spotlight-border">
      <div class="pl-card-body">
        <h3 class="pl-card-title">Ramka iskry</h3>
        <p class="pl-card-text">Limonkowa krawędź podąża za kursorem.</p>
      </div>
    </div>
  </div>
</div>
```

## Na ciemnej powierzchni

Efekt jest najbardziej widoczny na ciemnym tle — np. na karcie `.pl-card-secondary`.

```html example
<div class="pl-card pl-card-secondary pl-card-large pl-spotlight-spark" data-pl-spotlight style="--pl-spot-size: 30rem">
  <div class="pl-card-body">
    <p class="pl-card-meta">Wersja 2.0</p>
    <h3 class="pl-card-title">Nowy edytor już dostępny</h3>
    <p class="pl-card-text">Szybszy, z historią zmian i współpracą w czasie rzeczywistym.</p>
    <a class="pl-button pl-button-primary" href="#">Zobacz, co nowego <span class="pl-button-arrow" data-pl-icon="arrow-right"></span></a>
  </div>
</div>
```

## Rozmiar i kolor

Zmienne `--pl-spot-size` i `--pl-spot-color` sterują średnicą i barwą poświaty. Efekt działa na dowolnym elemencie, nie tylko na kartach.

```html example
<div class="pl-grid pl-child-width-1-3@m" data-pl-spotlight="target: > div > .pl-card">
  <div>
    <div class="pl-card" style="--pl-spot-size: 10rem">
      <div class="pl-card-body">
        <h3 class="pl-card-title">Mała</h3>
        <p class="pl-card-text"><code>--pl-spot-size: 10rem</code></p>
      </div>
    </div>
  </div>
  <div>
    <div class="pl-card" style="--pl-spot-size: 36rem">
      <div class="pl-card-body">
        <h3 class="pl-card-title">Duża</h3>
        <p class="pl-card-text"><code>--pl-spot-size: 36rem</code></p>
      </div>
    </div>
  </div>
  <div>
    <div class="pl-card" style="--pl-spot-color: var(--pl-danger)">
      <div class="pl-card-body">
        <h3 class="pl-card-title">Własny kolor</h3>
        <p class="pl-card-text"><code>--pl-spot-color: var(--pl-danger)</code></p>
      </div>
    </div>
  </div>
</div>
```

```html example center
<button class="pl-button pl-button-large pl-button-pill pl-spotlight-border" type="button" data-pl-spotlight style="--pl-spot-size: 9rem">Przycisk z podświetlaną ramką</button>
```

## Jak to działa

Skrypt zapisuje pozycję kursora w zmiennych `--pl-spot-x` i `--pl-spot-y` na każdym elemencie docelowym oraz dodaje klasy `.pl-spotlight` i `.pl-spotlight-active`. Samą poświatę rysuje CSS — pseudo-element `::after` z gradientem radialnym. Możesz więc ustawić ją na stałe, bez JavaScriptu:

```html example narrow
<div class="pl-card pl-spotlight pl-spotlight-active" style="--pl-spot-x: 85%; --pl-spot-y: 0%">
  <div class="pl-card-body">
    <h3 class="pl-card-title">Statyczna poświata</h3>
    <p class="pl-card-text">Klasy <code>.pl-spotlight .pl-spotlight-active</code> i pozycja w zmiennych CSS.</p>
  </div>
</div>
```

## API

### Opcje

Opcje podaje się w atrybucie: `data-pl-spotlight="target: > .pl-card"`. Sama wartość atrybutu ustawia `target`.

| Opcja | Typ | Domyślnie | Opis |
| --- | --- | --- | --- |
| `target` | selektor | `null` | Elementy podświetlane, względem elementu z atrybutem (np. `> .pl-card`). Bez opcji podświetlany jest sam element. |

### Metody

| Metoda | Opis |
| --- | --- |
| `Plossy.spotlight(el, opcje)` | Tworzy / zwraca instancję. |
| `destroy()` | Odpina zdarzenia wskaźnika. |

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-spotlight` | Element z poświatą (nadawana automatycznie przez skrypt). |
| `.pl-spotlight-active` | Poświata widoczna (nadawana, gdy kursor jest nad elementem). |
| `.pl-spotlight-border` | Podświetlana ramka zamiast tła. |
| `.pl-spotlight-spark` | Limonkowy kolor poświaty. |

### Zmienne CSS

| Zmienna | Domyślnie | Opis |
| --- | --- | --- |
| `--pl-spot-size` | `22rem` | Średnica poświaty. |
| `--pl-spot-color` | `var(--pl-primary)` | Kolor poświaty. |
| `--pl-spot-x` / `--pl-spot-y` | `50%` | Pozycja środka (ustawia skrypt, w pikselach). |
