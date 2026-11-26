---
title: Icon
description: Wbudowany zestaw ponad 200 ikon SVG (Lucide) wstawianych jednym atrybutem — z rozmiarami, tonami, znaczkami w tle i możliwością dodania własnych.
badge: JS
---

## Podstawowe użycie

Dodaj atrybut `data-pl-icon` z nazwą ikony do pustego elementu `<span>`. Skrypt wstawi SVG i nada klasę `.pl-icon`. Ikona ma rozmiar `1.25em` i dziedziczy kolor tekstu.

```html example center
<span data-pl-icon="heart"></span>
<span data-pl-icon="star"></span>
<span data-pl-icon="shopping-cart"></span>
<span data-pl-icon="calendar"></span>
<span data-pl-icon="settings"></span>
```

Ikony układają się w linii tekstu:

```html example
<p><span data-pl-icon="map-pin"></span> ul. Mokotowska 12, Warszawa &nbsp;·&nbsp; <span data-pl-icon="clock"></span> pon.–pt. 9:00–17:00 &nbsp;·&nbsp; <span data-pl-icon="phone"></span> 22 123 45 67</p>
```

## Rozmiary

`.pl-icon-small` (1em), domyślny (1.25em), `.pl-icon-large` (2em) i `.pl-icon-xlarge` (3em). Rozmiar zależy od `font-size`, więc ikona skaluje się razem z tekstem.

```html example center
<span class="pl-icon-small" data-pl-icon="rocket"></span>
<span data-pl-icon="rocket"></span>
<span class="pl-icon-large" data-pl-icon="rocket"></span>
<span class="pl-icon-xlarge" data-pl-icon="rocket"></span>
<span data-pl-icon="rocket" style="font-size: 4rem"></span>
```

## Grubość linii

Opcja `stroke` zmienia grubość kreski (domyślnie `1.75`).

```html example center
<span class="pl-icon-large" data-pl-icon="name: leaf; stroke: 1"></span>
<span class="pl-icon-large" data-pl-icon="name: leaf; stroke: 1.75"></span>
<span class="pl-icon-large" data-pl-icon="name: leaf; stroke: 2.5"></span>
<span class="pl-icon-large" data-pl-icon="name: leaf; stroke: 3"></span>
```

## Tony

Klasy `.pl-icon-{ton}` kolorują ikonę. Dowolny inny kolor ustawisz zwykłym `color`.

```html example center
<span class="pl-icon-large pl-icon-primary" data-pl-icon="sparkles"></span>
<span class="pl-icon-large pl-icon-secondary" data-pl-icon="moon"></span>
<span class="pl-icon-large pl-icon-success" data-pl-icon="circle-check"></span>
<span class="pl-icon-large pl-icon-warning" data-pl-icon="triangle-alert"></span>
<span class="pl-icon-large pl-icon-danger" data-pl-icon="octagon-alert"></span>
<span class="pl-icon-large pl-icon-info" data-pl-icon="info"></span>
```

## Ikona w tle

`.pl-icon-box` umieszcza ikonę w zaokrąglonym kafelku z miękkim tłem w kolorze tonu. `.pl-icon-circle` robi z niego koło, a `.pl-icon-solid` wypełnia pełnym kolorem.

```html example center
<span class="pl-icon-box" data-pl-icon="package"></span>
<span class="pl-icon-box pl-icon-primary" data-pl-icon="zap"></span>
<span class="pl-icon-box pl-icon-success" data-pl-icon="leaf"></span>
<span class="pl-icon-box pl-icon-warning" data-pl-icon="lightbulb"></span>
<span class="pl-icon-box pl-icon-danger" data-pl-icon="flame"></span>
<span class="pl-icon-box pl-icon-info" data-pl-icon="droplet"></span>
```

```html example center
<span class="pl-icon-box pl-icon-circle" data-pl-icon="user"></span>
<span class="pl-icon-box pl-icon-circle pl-icon-primary" data-pl-icon="bell"></span>
<span class="pl-icon-box pl-icon-solid" data-pl-icon="crown"></span>
<span class="pl-icon-box pl-icon-solid pl-icon-primary" data-pl-icon="rocket"></span>
<span class="pl-icon-box pl-icon-solid pl-icon-success pl-icon-circle" data-pl-icon="check"></span>
<span class="pl-icon-box pl-icon-solid pl-icon-danger pl-icon-circle" data-pl-icon="heart"></span>
```

Typowe użycie — lista zalet:

```html example
<div class="pl-grid pl-child-width-1-3@m">
  <div>
    <span class="pl-icon-box pl-icon-primary" data-pl-icon="truck"></span>
    <h4 style="margin: 1rem 0 0.3rem">Dostawa w 24 h</h4>
    <p class="pl-text-muted">Zamówienia do 14:00 wysyłamy tego samego dnia.</p>
  </div>
  <div>
    <span class="pl-icon-box pl-icon-success" data-pl-icon="rotate-ccw"></span>
    <h4 style="margin: 1rem 0 0.3rem">30 dni na zwrot</h4>
    <p class="pl-text-muted">Bez podawania przyczyny i bez kosztów.</p>
  </div>
  <div>
    <span class="pl-icon-box pl-icon-warning" data-pl-icon="life-buoy"></span>
    <h4 style="margin: 1rem 0 0.3rem">Wsparcie na czacie</h4>
    <p class="pl-text-muted">Odpowiadamy średnio w cztery minuty.</p>
  </div>
</div>
```

## Przycisk-ikona

`.pl-icon-button` to lekki przycisk z samą ikoną — bez ramki, z tłem przy hoverze. Do pasków narzędzi, wierszy tabel i nagłówków kart. Zawsze dodawaj `aria-label`.

```html example center
<button class="pl-icon-button" type="button" aria-label="Edytuj"><span data-pl-icon="pencil"></span></button>
<button class="pl-icon-button" type="button" aria-label="Kopiuj"><span data-pl-icon="copy"></span></button>
<button class="pl-icon-button" type="button" aria-label="Udostępnij"><span data-pl-icon="share-2"></span></button>
<a class="pl-icon-button" href="#" aria-label="Otwórz w nowej karcie"><span data-pl-icon="external-link"></span></a>
<button class="pl-icon-button" type="button" aria-label="Usuń"><span data-pl-icon="trash-2"></span></button>
```

## Obracanie

`.pl-icon-spin` obraca ikonę — przydatne z ikonami `loader`, `loader-circle` i `refresh-cw`.

```html example center
<span class="pl-icon-large pl-icon-spin" data-pl-icon="loader"></span>
<span class="pl-icon-large pl-icon-spin pl-icon-primary" data-pl-icon="loader-circle"></span>
<span class="pl-icon-large pl-icon-spin" data-pl-icon="refresh-cw"></span>
```

## W innych komponentach

Przyciski, etykiety, alerty i nawigacje same dopasowują rozmiar i odstęp ikony.

```html example row
<button class="pl-button pl-button-primary" type="button"><span data-pl-icon="download"></span> Pobierz</button>
<span class="pl-label pl-label-success"><span data-pl-icon="check"></span> Zweryfikowany</span>
<a class="pl-link-text" href="#"><span data-pl-icon="paperclip"></span> umowa.pdf</a>
```

## Zmiana ikony z JavaScript

Instancja ma metodę `render(nazwa)`, która podmienia ikonę.

```html example center
<button class="pl-button" id="demo-icon-toggle" type="button"><span id="demo-icon" data-pl-icon="eye"></span> Pokaż hasło</button>
```

```js example-js
const icon = Plossy.icon('#demo-icon');
let visible = false;
document.getElementById('demo-icon-toggle').addEventListener('click', () => {
  visible = !visible;
  icon.render(visible ? 'eye-off' : 'eye');
});
```

## Własne ikony

`Plossy.icons.add()` rejestruje dodatkowe ikony. Podaj samą zawartość SVG (bez znacznika `<svg>`) narysowaną w polu 24×24 — linie dostaną kolor i grubość jak pozostałe ikony.

```html example center
<span class="pl-icon-xlarge pl-icon-primary" id="demo-icon-custom"></span>
<span class="pl-icon-box pl-icon-success" id="demo-icon-custom-box"></span>
```

```js example-js
Plossy.icons.add({
  'demo-triangle': '<path d="M12 3 21 20H3z" /><path d="M12 10v4" /><circle cx="12" cy="17" r="0.5" />',
});

// Elementy utworzone przed rejestracją ikony inicjalizujemy ręcznie.
Plossy.icon('#demo-icon-custom', { name: 'demo-triangle' });
Plossy.icon('#demo-icon-custom-box', { name: 'demo-triangle' });
```

Ikony zarejestrowane przed inicjalizacją strony działają normalnie przez atrybut: `<span data-pl-icon="demo-triangle"></span>`.

## Wszystkie ikony

Kliknij ikonę, aby skopiować jej nazwę. Lista powstaje z `Plossy.icons.names()`.

```html example plain
<div class="demo-icons">
  <label class="demo-icons-search">
    <span data-pl-icon="search"></span>
    <input type="search" id="demo-icons-query" placeholder="Szukaj ikony, np. arrow, user, chart…" aria-label="Szukaj ikony" autocomplete="off">
    <span class="demo-icons-count" id="demo-icons-count"></span>
  </label>
  <div class="demo-icons-grid" id="demo-icons-grid"></div>
  <p class="demo-icons-empty" id="demo-icons-empty" hidden>Brak ikon pasujących do zapytania.</p>
</div>
```

```js example-js
const grid = document.getElementById('demo-icons-grid');
const query = document.getElementById('demo-icons-query');
const count = document.getElementById('demo-icons-count');
const empty = document.getElementById('demo-icons-empty');
const names = Plossy.icons.names().filter((name) => !name.startsWith('demo-'));

grid.innerHTML = names
  .map(
    (name) =>
      `<button type="button" class="demo-icons-item" data-name="${name}" title="${name}">
        <span data-pl-icon="${name}"></span><span class="demo-icons-name">${name}</span>
      </button>`,
  )
  .join('');

const filter = () => {
  const term = query.value.trim().toLowerCase();
  let visible = 0;
  for (const item of grid.children) {
    const match = item.dataset.name.includes(term);
    item.hidden = !match;
    if (match) visible++;
  }
  count.textContent = `${visible} / ${names.length}`;
  empty.hidden = visible > 0;
};
query.addEventListener('input', filter);
filter();

grid.addEventListener('click', async (event) => {
  const item = event.target.closest('.demo-icons-item');
  if (!item) return;
  const name = item.dataset.name;
  try {
    await navigator.clipboard.writeText(name);
  } catch {
    // Schowek niedostępny (np. brak HTTPS) — pokazujemy samą nazwę.
  }
  item.classList.add('is-copied');
  setTimeout(() => item.classList.remove('is-copied'), 900);
  Plossy.notification?.({ message: `Skopiowano: ${name}`, status: 'success', timeout: 1800 });
});
```

```css example-css
.demo-icons-search {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  height: var(--pl-control-h-lg);
  margin-bottom: 1.25rem;
  padding: 0 1rem;
  border: 1px solid var(--pl-border);
  border-radius: var(--pl-radius-md);
  background: var(--pl-surface);
  box-shadow: var(--pl-shadow-xs);
  color: var(--pl-text-subtle);
  cursor: text;
  transition: border-color var(--pl-dur-2) var(--pl-ease), box-shadow var(--pl-dur-2) var(--pl-ease);
}
.demo-icons-search:focus-within {
  border-color: var(--pl-primary);
  box-shadow: var(--pl-ring);
}
.demo-icons-search input {
  flex: 1;
  min-width: 0;
  border: 0;
  outline: 0;
  background: none;
  color: var(--pl-text);
}
.demo-icons-count {
  font-family: var(--pl-font-mono);
  font-size: var(--pl-text-xs);
  white-space: nowrap;
}
.demo-icons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(6.75rem, 1fr));
  gap: 0.5rem;
}
.demo-icons-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  min-width: 0;
  padding: 1rem 0.4rem 0.7rem;
  border: 1px solid transparent;
  border-radius: var(--pl-radius-md);
  background: none;
  color: var(--pl-text);
  transition: background-color var(--pl-dur-2) var(--pl-ease), border-color var(--pl-dur-2) var(--pl-ease),
    transform var(--pl-dur-3) var(--pl-ease-spring);
}
.demo-icons-item .pl-icon {
  width: 1.5rem;
  height: 1.5rem;
  transition: transform var(--pl-dur-3) var(--pl-ease-spring);
}
.demo-icons-item:hover {
  border-color: var(--pl-border);
  background: var(--pl-surface);
}
.demo-icons-item:hover .pl-icon {
  transform: scale(1.2);
}
.demo-icons-item:active {
  transform: scale(0.95);
}
.demo-icons-item.is-copied {
  border-color: var(--pl-success-border);
  background: var(--pl-success-soft);
  color: var(--pl-success-text);
}
.demo-icons-name {
  max-width: 100%;
  overflow: hidden;
  color: var(--pl-text-subtle);
  font-family: var(--pl-font-mono);
  font-size: 0.6875rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.demo-icons-empty {
  padding: 2rem 0;
  color: var(--pl-text-muted);
  text-align: center;
}
```

## API

### Opcje

Opcje podaje się w atrybucie: `data-pl-icon="name: heart; stroke: 2.5"`. Sama wartość (`data-pl-icon="heart"`) ustawia `name`.

| Opcja | Typ | Domyślnie | Opis |
| --- | --- | --- | --- |
| `name` | string | `''` | Nazwa ikony z zestawu. |
| `stroke` | liczba | `1.75` | Grubość linii SVG. |

### Metody

| Metoda | Opis |
| --- | --- |
| `Plossy.icon(el, opcje)` | Tworzy / zwraca instancję na elemencie. |
| `render(name)` | Rysuje ikonę o podanej nazwie (bez argumentu — bieżącą). |
| `Plossy.icons.add({ nazwa: '<path … />' })` | Rejestruje własne ikony (zawartość SVG 24×24). |
| `Plossy.icons.names()` | Zwraca posortowaną tablicę nazw wszystkich ikon. |
| `Plossy.icons.get(name)` | Zwraca zawartość SVG ikony lub `null`. |

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-icon` | Nadawana automatycznie; ikona 1.25em w kolorze tekstu. |
| `.pl-icon-small` `-large` `-xlarge` | Rozmiary: 1em, 2em, 3em. |
| `.pl-icon-primary` … `.pl-icon-info` | Ton ikony (lub kafelka `.pl-icon-box`). |
| `.pl-icon-box` | Ikona w kafelku z miękkim tłem. |
| `.pl-icon-solid` | Razem z `.pl-icon-box`: pełne wypełnienie. |
| `.pl-icon-circle` | Okrągły kafelek. |
| `.pl-icon-button` | Lekki przycisk z samą ikoną (na `<button>` / `<a>`). |
| `.pl-icon-spin` | Ciągły obrót. |

### Dostępność

Ikona dostaje `aria-hidden="true"`, o ile element nie ma własnego `aria-label` — traktowana jest jako dekoracja obok tekstu. Jeśli ikona jest jedyną treścią przycisku lub linku, nadaj `aria-label` temu przyciskowi. Zestaw ikon pochodzi z projektu [Lucide](https://lucide.dev) (licencja ISC).
