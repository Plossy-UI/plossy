---
title: Animation
description: Gotowe animacje wejścia i akcenty ruchu. Odtwarzają się po dodaniu klasy, mają sprężysty charakter Plossy i szanują ustawienie ograniczenia ruchu.
---

## Podstawowe użycie

Dodaj elementowi jedną z klas `.pl-animation-*` — animacja odtworzy się raz, gdy klasa pojawi się na elemencie. Kliknij kartę, aby odtworzyć animację ponownie.

```html example
<div class="pl-grid pl-grid-small pl-child-width-1-2@s pl-child-width-1-4@m" id="demo-anim-basic">
  <div><button class="demo-anim" type="button" data-anim="pl-animation-fade">fade</button></div>
  <div><button class="demo-anim" type="button" data-anim="pl-animation-scale-up">scale-up</button></div>
  <div><button class="demo-anim" type="button" data-anim="pl-animation-scale-down">scale-down</button></div>
  <div><button class="demo-anim" type="button" data-anim="pl-animation-blur">blur</button></div>
  <div><button class="demo-anim" type="button" data-anim="pl-animation-spring">spring</button></div>
  <div><button class="demo-anim" type="button" data-anim="pl-animation-shake">shake</button></div>
  <div><button class="demo-anim" type="button" data-anim="pl-animation-slide-up">slide-up</button></div>
  <div><button class="demo-anim" type="button" data-anim="pl-animation-slide-down">slide-down</button></div>
  <div><button class="demo-anim" type="button" data-anim="pl-animation-slide-left">slide-left</button></div>
  <div><button class="demo-anim" type="button" data-anim="pl-animation-slide-right">slide-right</button></div>
</div>
```

```js example-js
// Ponowne odtworzenie: zdejmij klasę, wymuś przeliczenie układu, dodaj ją z powrotem.
function replay(el, classes) {
  if (!classes) return;
  const list = classes.split(' ');
  el.classList.remove(...list);
  void el.offsetWidth;
  el.classList.add(...list);
}

document.querySelectorAll('.demo-anim').forEach((button) => {
  replay(button, button.dataset.anim);
  button.addEventListener('click', () => replay(button, button.dataset.anim));
});
```

```css example-css
.demo-anim {
  display: grid;
  place-items: center;
  width: 100%;
  min-height: 5.5rem;
  padding: 0.75rem;
  border: 1px solid var(--pl-border);
  border-radius: var(--pl-radius-lg);
  background: var(--pl-surface);
  box-shadow: var(--pl-shadow-sm);
  color: var(--pl-text);
  font-family: var(--pl-font-mono);
  font-size: var(--pl-text-xs);
  cursor: pointer;
}
.demo-anim:hover {
  border-color: var(--pl-border-strong);
}
```

| Klasa | Efekt |
| --- | --- |
| `.pl-animation-fade` | Zanikanie → pełna widoczność. |
| `.pl-animation-scale-up` | Pojawienie się z lekkim powiększeniem (0.9 → 1). |
| `.pl-animation-scale-down` | Pojawienie się z pomniejszeniem (1.1 → 1). |
| `.pl-animation-slide-up` | Wjazd od dołu ku górze. |
| `.pl-animation-slide-down` | Wjazd od góry w dół. |
| `.pl-animation-slide-left` | Wjazd od prawej w lewo. |
| `.pl-animation-slide-right` | Wjazd od lewej w prawo. |
| `.pl-animation-blur` | Pojawienie się z wyostrzeniem. |
| `.pl-animation-spring` | Sprężyste „wyskoczenie" z przestrzeleniem. |
| `.pl-animation-shake` | Potrząśnięcie — np. przy błędzie walidacji. |

Nazwa kierunku oznacza **kierunek ruchu**: `slide-up` porusza element w górę, więc zaczyna on poniżej docelowego miejsca.

## Dystans przesunięcia

Animacje `slide` mają warianty dystansu: `-small` (0.5rem), domyślny (1.5rem), `-medium` (3rem) i `-full` (100% rozmiaru elementu). Własną wartość ustawisz zmienną `--pl-animation-distance`.

```html example
<div class="pl-grid pl-grid-small pl-child-width-1-2@s pl-child-width-1-4@m">
  <div><button class="demo-anim" type="button" data-anim="pl-animation-slide-up-small">slide-up-small</button></div>
  <div><button class="demo-anim" type="button" data-anim="pl-animation-slide-up">slide-up</button></div>
  <div><button class="demo-anim" type="button" data-anim="pl-animation-slide-up-medium">slide-up-medium</button></div>
  <div><button class="demo-anim" type="button" data-anim="pl-animation-slide-up-full">slide-up-full</button></div>
  <div><button class="demo-anim" type="button" data-anim="pl-animation-slide-right-small">slide-right-small</button></div>
  <div><button class="demo-anim" type="button" data-anim="pl-animation-slide-right">slide-right</button></div>
  <div><button class="demo-anim" type="button" data-anim="pl-animation-slide-right-medium">slide-right-medium</button></div>
  <div><button class="demo-anim" type="button" data-anim="pl-animation-slide-right-full">slide-right-full</button></div>
</div>
```

## Tempo i kierunek

`.pl-animation-fast` skraca animację, `.pl-animation-slow` ją wydłuża. `.pl-animation-reverse` odtwarza ją od końca — w ten sposób z animacji wejścia powstaje animacja wyjścia.

```html example
<div class="pl-grid pl-grid-small pl-child-width-1-2@s pl-child-width-1-4@m">
  <div><button class="demo-anim" type="button" data-anim="pl-animation-scale-up pl-animation-fast">fast</button></div>
  <div><button class="demo-anim" type="button" data-anim="pl-animation-scale-up">domyślne</button></div>
  <div><button class="demo-anim" type="button" data-anim="pl-animation-scale-up pl-animation-slow">slow</button></div>
  <div><button class="demo-anim" type="button" id="demo-anim-reverse">reverse (znika i wraca)</button></div>
</div>
```

```js example-js
const reverse = document.querySelector('#demo-anim-reverse');

reverse.addEventListener('click', () => {
  reverse.classList.remove('pl-animation-slide-up', 'pl-animation-reverse');
  void reverse.offsetWidth;
  reverse.classList.add('pl-animation-slide-up', 'pl-animation-reverse');
  reverse.addEventListener('animationend', () => {
    reverse.classList.remove('pl-animation-reverse');
    void reverse.offsetWidth;
    reverse.classList.add('pl-animation-slide-up');
  }, { once: true });
});
```

Czas trwania można też ustawić dokładnie zmienną `--pl-animation-duration`.

## Opóźnienia i kaskada

Klasy `.pl-animation-delay-1` … `-5` opóźniają start o kolejne 100 ms. Ułożone po kolei dają efekt kaskady.

```html example
<div class="pl-grid pl-grid-small pl-child-width-1-3@s" id="demo-anim-stagger">
  <div><div class="pl-card pl-card-body pl-animation-slide-up"><strong>Plan</strong><p class="pl-text-meta pl-margin-remove">bez opóźnienia</p></div></div>
  <div><div class="pl-card pl-card-body pl-animation-slide-up pl-animation-delay-1"><strong>Projekt</strong><p class="pl-text-meta pl-margin-remove">delay-1</p></div></div>
  <div><div class="pl-card pl-card-body pl-animation-slide-up pl-animation-delay-2"><strong>Wdrożenie</strong><p class="pl-text-meta pl-margin-remove">delay-2</p></div></div>
</div>
<p class="pl-margin-top"><button class="pl-button pl-button-small" id="demo-anim-stagger-replay" type="button"><span data-pl-icon="refresh-cw"></span> Odtwórz ponownie</button></p>
```

```js example-js
document.querySelector('#demo-anim-stagger-replay').addEventListener('click', () => {
  document.querySelectorAll('#demo-anim-stagger .pl-card').forEach((card) => {
    card.classList.remove('pl-animation-slide-up');
    void card.offsetWidth;
    card.classList.add('pl-animation-slide-up');
  });
});
```

Do animowania elementów w chwili, gdy pojawiają się w oknie przeglądarki, służy komponent Scrollspy: `data-pl-scrollspy="cls: pl-animation-slide-up; target: > *; delay: 80"`.

## Odtwarzanie po najechaniu

W kontenerze `.pl-animation-toggle` animacje dzieci czekają na najechanie kursorem lub fokus klawiatury i odtwarzają się przy każdym kolejnym wejściu. Dodaj `tabindex="0"`, aby kontener był osiągalny z klawiatury.

```html example
<div class="pl-grid pl-grid-small pl-child-width-1-3@m">
  <div>
    <div class="pl-animation-toggle pl-card pl-card-body pl-text-center" tabindex="0">
      <span class="pl-animation-spring pl-display-inline-block pl-text-3xl" data-pl-icon="heart"></span>
      <p class="pl-margin-small-top">Najedź — <code>spring</code></p>
    </div>
  </div>
  <div>
    <div class="pl-animation-toggle pl-card pl-card-body pl-text-center" tabindex="0">
      <span class="pl-animation-shake pl-display-inline-block pl-text-3xl" data-pl-icon="bell"></span>
      <p class="pl-margin-small-top">Najedź — <code>shake</code></p>
    </div>
  </div>
  <div>
    <div class="pl-animation-toggle pl-card pl-card-body pl-text-center" tabindex="0">
      <span class="pl-animation-slide-up-small pl-display-inline-block pl-text-3xl" data-pl-icon="arrow-up"></span>
      <p class="pl-margin-small-top">Najedź — <code>slide-up-small</code></p>
    </div>
  </div>
</div>
```

## Ken Burns

`.pl-animation-kenburns` powoli powiększa obraz (15 s). Animacja rusza sama w chwili dodania klasy i odtwarza się raz — nie reaguje na najechanie. Kontener potrzebuje `overflow: hidden`. Punkt, ku któremu obraz „płynie", ustawiają klasy `.pl-transform-origin-*`; `.pl-animation-reverse` zamienia zbliżenie w oddalenie.

W przykładzie klasę dodaje [Scrollspy](/docs/interactive/scrollspy/) przy każdym wejściu obrazu w widok — dzięki temu ruch zaczyna się, gdy do niego przewiniesz, a nie przy wczytaniu strony.

```html example
<div class="pl-grid pl-grid-small pl-child-width-1-2@s">
  <div>
    <div class="pl-overflow-hidden pl-radius-lg">
      <img data-pl-scrollspy="cls: pl-animation-kenburns; hidden: false; repeat: true" src="/img/photo-5.svg" alt="Wybrzeże o zachodzie słońca">
    </div>
    <p class="pl-text-meta pl-margin-small-top">Zbliżenie do środka</p>
  </div>
  <div>
    <div class="pl-overflow-hidden pl-radius-lg">
      <img class="pl-transform-origin-bottom-right" data-pl-scrollspy="cls: pl-animation-kenburns pl-animation-reverse; hidden: false; repeat: true" src="/img/photo-6.svg" alt="Las we mgle">
    </div>
    <p class="pl-text-meta pl-margin-small-top">Oddalenie od prawego dolnego rogu</p>
  </div>
</div>
```

## Rysowanie konturu SVG

`.pl-animation-stroke` na elemencie `<svg>` rysuje kontury kształtów. Najprościej dodać kształtom atrybut `pathLength="1"`; bez niego ustaw zmienną `--pl-animation-stroke` na długość ścieżki.

```html example center
<svg class="pl-animation-stroke pl-text-primary" id="demo-anim-stroke" width="220" height="120" viewBox="0 0 220 120" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="Wykres rosnący">
  <path pathLength="1" d="M10 100 L60 70 L100 84 L150 36 L210 14" />
  <path pathLength="1" d="M176 14 H210 V48" />
</svg>
<button class="pl-button pl-button-small" id="demo-anim-stroke-replay" type="button"><span data-pl-icon="refresh-cw"></span> Narysuj ponownie</button>
```

```js example-js
document.querySelector('#demo-anim-stroke-replay').addEventListener('click', () => {
  const svg = document.querySelector('#demo-anim-stroke');
  svg.classList.remove('pl-animation-stroke');
  void svg.getBoundingClientRect();
  svg.classList.add('pl-animation-stroke');
});
```

## Animacje ciągłe

Trzy pętle do drobnych akcentów: `.pl-animation-float` (unoszenie), `.pl-animation-pulse` (pulsowanie) i `.pl-animation-spin` (obrót).

```html example center
<div class="pl-text-center">
  <div class="pl-animation-float pl-card pl-card-body pl-box-shadow-large">Nowa wiadomość</div>
  <p class="pl-text-meta pl-margin-top">float</p>
</div>
<div class="pl-text-center">
  <span class="pl-animation-pulse pl-display-inline-block pl-border-circle pl-background-spark" style="width: 1rem; height: 1rem"></span>
  <p class="pl-text-meta pl-margin-top">pulse</p>
</div>
<div class="pl-text-center">
  <span class="pl-animation-spin pl-display-inline-block pl-text-2xl" data-pl-icon="loader"></span>
  <p class="pl-text-meta pl-margin-top">spin</p>
</div>
```

## Ograniczenie ruchu

Gdy użytkownik włączy w systemie „ogranicz ruch" (`prefers-reduced-motion: reduce`), animacje wejścia skracają się praktycznie do zera — element od razu jest w stanie końcowym. Animacje `shake`, `kenburns`, `stroke`, `float` i `pulse` są wtedy wyłączone, a `spin` zwalnia.

## Odtwarzanie z JavaScript

Animacja startuje w chwili dodania klasy. Aby odtworzyć ją ponownie, zdejmij klasę, wymuś przeliczenie układu i dodaj ją z powrotem:

```js
function replay(el, cls) {
  el.classList.remove(cls);
  void el.offsetWidth; // wymusza reflow
  el.classList.add(cls);
}

replay(document.querySelector('#komunikat'), 'pl-animation-shake');
```

## API

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-animation-fade` | Zanikanie. |
| `.pl-animation-scale-up` / `-scale-down` | Skalowanie z zanikaniem. |
| `.pl-animation-slide-{up\|down\|left\|right}` | Przesunięcie o 1.5rem z zanikaniem. |
| `…-small` / `…-medium` / `…-full` | Dystans 0.5rem / 3rem / 100%. |
| `.pl-animation-blur` | Zanikanie + wyostrzenie. |
| `.pl-animation-spring` | Sprężyste wyskoczenie. |
| `.pl-animation-shake` | Potrząśnięcie. |
| `.pl-animation-kenburns` | Powolne powiększanie obrazu. |
| `.pl-animation-stroke` | Rysowanie konturu SVG. |
| `.pl-animation-fast` / `-slow` | Tempo. |
| `.pl-animation-reverse` | Odtwarzanie od końca. |
| `.pl-animation-delay-{1…5}` | Opóźnienie 100–500 ms. |
| `.pl-animation-toggle` | Kontener: animacje dzieci po hoverze / fokusie. |
| `.pl-animation-float` / `-pulse` / `-spin` | Animacje ciągłe. |
| `.pl-transform-origin-{…}` | Punkt odniesienia transformacji. |

### Zmienne

| Zmienna | Domyślnie | Opis |
| --- | --- | --- |
| `--pl-animation-duration` | `var(--pl-dur-4)` (520 ms) | Czas trwania. |
| `--pl-animation-distance` | `1.5rem` | Dystans animacji `slide`. |
| `--pl-animation-stroke` | `1` | Długość ścieżki dla `stroke`. |
