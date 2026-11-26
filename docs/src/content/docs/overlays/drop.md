---
title: Drop i Dropdown
description: Pływająca karta przypięta do przełącznika — od dowolnej treści po menu rozwijane z ikonami, skrótami, podmenu i pełną obsługą klawiatury.
badge: JS
---

## Podstawowe użycie

Element `.pl-drop` z atrybutem `data-pl-drop` umieść **bezpośrednio po** elemencie, który ma go otwierać. Drop trafia do warstwy wierzchniej przeglądarki, więc nie przycina go `overflow` rodzica, a jego pozycja sama dopasowuje się do krawędzi okna.

```html example center
<button class="pl-button" type="button">Otwórz drop</button>
<div class="pl-drop" data-pl-drop>
  <h3 class="pl-drop-title">Nowa wersja biblioteki</h3>
  <p class="pl-drop-text">Wydanie 2.4 przynosi podmenu, tryb hover i płynniejsze animacje wejścia.</p>
  <div class="pl-drop-footer">
    <button class="pl-button pl-button-small pl-button-ghost" type="button" data-pl-drop-close>Później</button>
    <button class="pl-button pl-button-small pl-button-primary" type="button" data-pl-drop-close>Zobacz zmiany</button>
  </div>
</div>
```

Drop zamyka się po kliknięciu poza nim, klawiszem <kbd>Esc</kbd> (fokus wraca na przełącznik) oraz po kliknięciu elementu z atrybutem `data-pl-drop-close`. Jednocześnie otwarty jest tylko jeden drop.

## Menu rozwijane

Klasa `.pl-dropdown` zmniejsza odstępy karty, a lista `.pl-dropdown-nav` zamienia się w menu. Aktywną pozycję oznacz klasą `.pl-active` na `li`. Kliknięcie pozycji zamyka menu.

```html example center
<button class="pl-button" type="button">Sortuj <span data-pl-icon="chevron-down"></span></button>
<div class="pl-drop pl-dropdown" data-pl-drop>
  <ul class="pl-dropdown-nav">
    <li class="pl-active"><a href="#">Najnowsze</a></li>
    <li><a href="#">Najpopularniejsze</a></li>
    <li><a href="#">Cena: od najniższej</a></li>
    <li><a href="#">Cena: od najwyższej</a></li>
  </ul>
</div>
```

### Ikony, nagłówki, separatory i skróty

Ikonę wstaw przed etykietą, skrót klawiszowy (`<kbd>`) lub dodatkową informację (`.pl-dropdown-meta`) — po niej; zostaną dosunięte do prawej. `li.pl-nav-header` tworzy nagłówek grupy, `li.pl-nav-divider` — separator, a `li.pl-dropdown-danger` wyróżnia akcję nieodwracalną.

```html example center
<button class="pl-button pl-button-primary" type="button">Akcje dokumentu <span data-pl-icon="chevron-down"></span></button>
<div class="pl-drop pl-dropdown" data-pl-drop>
  <ul class="pl-dropdown-nav">
    <li class="pl-nav-header">Dokument</li>
    <li><a href="#"><span data-pl-icon="pencil"></span> Edytuj <kbd>E</kbd></a></li>
    <li><a href="#"><span data-pl-icon="copy"></span> Duplikuj <kbd>Ctrl D</kbd></a></li>
    <li><a href="#"><span data-pl-icon="download"></span> Pobierz PDF</a></li>
    <li class="pl-disabled"><a href="#"><span data-pl-icon="history"></span> Historia wersji</a></li>
    <li class="pl-nav-divider"></li>
    <li class="pl-nav-header">Zespół</li>
    <li><a href="#"><span data-pl-icon="user-plus"></span> Zaproś osoby <span class="pl-dropdown-meta">3 / 5</span></a></li>
    <li><a href="#"><span data-pl-icon="link"></span> Kopiuj link</a></li>
    <li class="pl-nav-divider"></li>
    <li class="pl-dropdown-danger"><a href="#"><span data-pl-icon="trash-2"></span> Usuń <kbd>Del</kbd></a></li>
  </ul>
</div>
```

### Pozycje z opisem

Etykietę i opis (`<small>`) owiń we wspólny `<span>` — przydatne w przełącznikach kont lub trybów.

```html example center
<button class="pl-button" type="button"><span data-pl-icon="globe"></span> Widoczność: publiczna</button>
<div class="pl-drop pl-dropdown" data-pl-drop>
  <ul class="pl-dropdown-nav">
    <li class="pl-active"><a href="#"><span data-pl-icon="globe"></span> <span>Publiczna<small>Każdy z linkiem może wyświetlać</small></span></a></li>
    <li><a href="#"><span data-pl-icon="users"></span> <span>Zespół<small>Tylko członkowie przestrzeni roboczej</small></span></a></li>
    <li><a href="#"><span data-pl-icon="lock"></span> <span>Prywatna<small>Widoczna wyłącznie dla Ciebie</small></span></a></li>
  </ul>
</div>
```

### Podmenu

Drop umieszczony wewnątrz innego dropa staje się podmenu: domyślnie otwiera się po najechaniu, po prawej stronie pozycji (`right-start`), a przełącznik dostaje strzałkę. Z klawiatury podmenu otwiera <kbd>→</kbd>, a zamyka <kbd>←</kbd>.

```html example center
<button class="pl-button" type="button"><span data-pl-icon="ellipsis"></span> Więcej</button>
<div class="pl-drop pl-dropdown" data-pl-drop>
  <ul class="pl-dropdown-nav">
    <li><a href="#"><span data-pl-icon="star"></span> Dodaj do ulubionych</a></li>
    <li>
      <a href="#"><span data-pl-icon="share-2"></span> Udostępnij</a>
      <div class="pl-drop pl-dropdown" data-pl-drop>
        <ul class="pl-dropdown-nav">
          <li><a href="#"><span data-pl-icon="mail"></span> E-mailem</a></li>
          <li><a href="#"><span data-pl-icon="message-circle"></span> W wiadomości</a></li>
          <li><a href="#"><span data-pl-icon="link"></span> Kopiuj link</a></li>
        </ul>
      </div>
    </li>
    <li>
      <a href="#"><span data-pl-icon="folder"></span> Przenieś do</a>
      <div class="pl-drop pl-dropdown" data-pl-drop>
        <ul class="pl-dropdown-nav">
          <li><a href="#">Projekty</a></li>
          <li><a href="#">Archiwum</a></li>
          <li>
            <a href="#">Wspólne</a>
            <div class="pl-drop pl-dropdown" data-pl-drop>
              <ul class="pl-dropdown-nav">
                <li><a href="#">Marketing</a></li>
                <li><a href="#">Sprzedaż</a></li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </li>
    <li class="pl-nav-divider"></li>
    <li><a href="#"><span data-pl-icon="flag"></span> Zgłoś problem</a></li>
  </ul>
</div>
```

## Tryb hover

`mode: hover` otwiera drop po najechaniu. Opóźnienie zamknięcia (`delay-hide`) pozwala spokojnie przenieść kursor z przełącznika na kartę. Dla dostępności drop otwiera się także kliknięciem (dotyk) i po sfokusowaniu klawiaturą.

```html example center
<button class="pl-button" type="button">Najedź na mnie</button>
<div class="pl-drop pl-dropdown" data-pl-drop="mode: hover">
  <ul class="pl-dropdown-nav">
    <li><a href="#"><span data-pl-icon="user"></span> Profil</a></li>
    <li><a href="#"><span data-pl-icon="settings"></span> Ustawienia</a></li>
    <li><a href="#"><span data-pl-icon="credit-card"></span> Płatności</a></li>
    <li class="pl-nav-divider"></li>
    <li><a href="#"><span data-pl-icon="log-out"></span> Wyloguj</a></li>
  </ul>
</div>

<button class="pl-button pl-button-ghost" type="button">Z opóźnieniem 300 ms</button>
<div class="pl-drop" data-pl-drop="mode: hover; delay-show: 300; pos: bottom">
  <p class="pl-drop-text">Opóźnienie otwarcia chroni przed przypadkowym wywołaniem podczas przesuwania kursora po stronie.</p>
</div>
```

## Pozycja

Opcja `pos` przyjmuje stronę (`top`, `bottom`, `left`, `right`) i opcjonalne wyrównanie (`-start`, `-end`). Gdy po wybranej stronie brakuje miejsca, drop przeskakuje na przeciwną, a animacja wejścia zawsze wychodzi od strony przełącznika.

```html example
<div class="pl-grid pl-grid-small pl-child-width-1-3" style="max-width: 34rem; margin-inline: auto">
  <div><button class="pl-button pl-button-small pl-button-block" type="button">top-start</button>
    <div class="pl-drop pl-drop-auto" data-pl-drop="pos: top-start">Drop u góry, do lewej</div></div>
  <div><button class="pl-button pl-button-small pl-button-block" type="button">top</button>
    <div class="pl-drop pl-drop-auto" data-pl-drop="pos: top">Drop u góry, na środku</div></div>
  <div><button class="pl-button pl-button-small pl-button-block" type="button">top-end</button>
    <div class="pl-drop pl-drop-auto" data-pl-drop="pos: top-end">Drop u góry, do prawej</div></div>
  <div><button class="pl-button pl-button-small pl-button-block" type="button">left-start</button>
    <div class="pl-drop pl-drop-auto" data-pl-drop="pos: left-start">Drop po lewej</div></div>
  <div><button class="pl-button pl-button-small pl-button-block" type="button">bottom</button>
    <div class="pl-drop pl-drop-auto" data-pl-drop="pos: bottom">Drop na dole, na środku</div></div>
  <div><button class="pl-button pl-button-small pl-button-block" type="button">right-start</button>
    <div class="pl-drop pl-drop-auto" data-pl-drop="pos: right-start">Drop po prawej</div></div>
  <div><button class="pl-button pl-button-small pl-button-block" type="button">bottom-start</button>
    <div class="pl-drop pl-drop-auto" data-pl-drop="pos: bottom-start">Drop na dole, do lewej</div></div>
  <div><button class="pl-button pl-button-small pl-button-block" type="button">left-end</button>
    <div class="pl-drop pl-drop-auto" data-pl-drop="pos: left-end">Drop po lewej, do dołu</div></div>
  <div><button class="pl-button pl-button-small pl-button-block" type="button">bottom-end</button>
    <div class="pl-drop pl-drop-auto" data-pl-drop="pos: bottom-end">Drop na dole, do prawej</div></div>
</div>
```

### Odstęp i szerokość przełącznika

`offset` ustawia odległość od przełącznika (w px), a `match-width: true` sprawia, że drop jest co najmniej tak szeroki jak przełącznik — przydatne w polach wyboru.

```html example center
<button class="pl-button" type="button">Odstęp 20 px</button>
<div class="pl-drop pl-drop-auto" data-pl-drop="offset: 20; pos: bottom">Trzymam dystans</div>

<button class="pl-button" type="button" style="width: 16rem; justify-content: space-between">Wybierz przestrzeń roboczą <span data-pl-icon="chevrons-up-down"></span></button>
<div class="pl-drop pl-dropdown" data-pl-drop="match-width: true; offset: 6">
  <ul class="pl-dropdown-nav">
    <li class="pl-active"><a href="#">Studio Brzoza</a></li>
    <li><a href="#">Pracownia Mech</a></li>
    <li><a href="#">Kolektyw Fala</a></li>
    <li class="pl-nav-divider"></li>
    <li><a href="#"><span data-pl-icon="plus"></span> Nowa przestrzeń</a></li>
  </ul>
</div>
```

## Rozmiary

Domyślna szerokość dropa to `18rem`. `.pl-drop-large` poszerza go do `28rem`, a `.pl-drop-auto` dopasowuje do treści. Własną szerokość ustawisz zmienną `--pl-drop-width`.

```html example center
<button class="pl-button" type="button">Domyślny</button>
<div class="pl-drop" data-pl-drop>
  <p class="pl-drop-text">Standardowa szerokość sprawdza się przy krótkich komunikatach i prostych formularzach.</p>
</div>

<button class="pl-button" type="button">Duży</button>
<div class="pl-drop pl-drop-large" data-pl-drop="pos: bottom">
  <h3 class="pl-drop-title">Skróty klawiszowe</h3>
  <p class="pl-drop-text">Większy drop pomieści siatkę odnośników, podgląd treści albo rozbudowany filtr. Odstępy wewnętrzne rosną razem z nim.</p>
</div>

<button class="pl-button" type="button">Auto</button>
<div class="pl-drop pl-drop-auto" data-pl-drop="pos: bottom-end">Tyle, ile trzeba</div>
```

## Dowolna treść

Drop to zwykła karta — może zawierać formularz, listę czy przyciski. Kliknięcia wewnątrz nie zamykają go, o ile nie trafiają w pozycję menu lub `data-pl-drop-close`.

```html example center
<button class="pl-button" type="button"><span data-pl-icon="filter"></span> Filtry</button>
<div class="pl-drop" data-pl-drop>
  <h3 class="pl-drop-title">Filtruj zamówienia</h3>
  <div class="pl-margin-small-top">
    <label class="pl-form-label" for="demo-drop-status">Status</label>
    <select class="pl-select" id="demo-drop-status">
      <option>Wszystkie</option>
      <option>Opłacone</option>
      <option>W realizacji</option>
      <option>Wysłane</option>
    </select>
  </div>
  <div class="pl-margin-small-top">
    <label class="pl-form-label" for="demo-drop-min">Kwota od</label>
    <input class="pl-input" id="demo-drop-min" type="number" placeholder="0 zł">
  </div>
  <div class="pl-drop-footer">
    <button class="pl-button pl-button-small pl-button-ghost" type="button" data-pl-drop-close>Wyczyść</button>
    <button class="pl-button pl-button-small pl-button-primary" type="button" data-pl-drop-close>Zastosuj</button>
  </div>
</div>

<button class="pl-button pl-button-icon" type="button" aria-label="Konto"><span data-pl-icon="user-round"></span></button>
<div class="pl-drop pl-dropdown" data-pl-drop="pos: bottom-end">
  <div class="pl-flex pl-flex-middle" style="gap: .75rem; padding: .5rem .625rem .625rem">
    <span class="pl-avatar"><img src="/img/avatar-2.svg" alt=""></span>
    <div>
      <strong>Marta Wiśniewska</strong><br>
      <small style="color: var(--pl-text-muted)">marta@brzoza.studio</small>
    </div>
  </div>
  <ul class="pl-dropdown-nav">
    <li class="pl-nav-divider"></li>
    <li><a href="#"><span data-pl-icon="user"></span> Mój profil</a></li>
    <li><a href="#"><span data-pl-icon="settings"></span> Ustawienia <kbd>Ctrl ,</kbd></a></li>
    <li><a href="#"><span data-pl-icon="life-buoy"></span> Pomoc</a></li>
    <li class="pl-nav-divider"></li>
    <li><a href="#"><span data-pl-icon="log-out"></span> Wyloguj się</a></li>
  </ul>
</div>
```

## Własny przełącznik

Jeśli przełącznik nie stoi bezpośrednio przed dropem, wskaż go opcją `toggle` (selektor CSS).

```html example center
<button class="pl-button pl-button-soft pl-button-primary" id="demo-drop-toggle" type="button">Przełącznik w innym miejscu</button>
<span style="color: var(--pl-text-muted)">…dowolna treść pomiędzy…</span>
<div class="pl-drop" data-pl-drop="toggle: #demo-drop-toggle; pos: bottom">
  <p class="pl-drop-text">Ten drop jest powiązany z przyciskiem przez selektor <code>#demo-drop-toggle</code>.</p>
</div>
```

## Klawiatura

| Klawisz | Działanie |
| --- | --- |
| <kbd>Enter</kbd> / <kbd>Spacja</kbd> | Przełącza drop (na przełączniku), aktywuje pozycję menu. |
| <kbd>↓</kbd> na przełączniku | Otwiera menu i fokusuje pierwszą pozycję. |
| <kbd>↓</kbd> <kbd>↑</kbd> | Następna / poprzednia pozycja (zapętlone). |
| <kbd>Home</kbd> <kbd>End</kbd> | Pierwsza / ostatnia pozycja. |
| <kbd>→</kbd> <kbd>←</kbd> | Otwiera / zamyka podmenu. |
| <kbd>Esc</kbd> | Zamyka najwyższy otwarty drop i zwraca fokus na przełącznik. |
| <kbd>Tab</kbd> | Wyjście fokusem poza drop zamyka go. |

## Sterowanie z JavaScript

Instancję pobierzesz przez `Plossy.drop(element)`. Zdarzenia mają prefiks `pl:` i bąbelkują; `pl:beforeshow` i `pl:beforehide` można anulować.

```html example center
<button class="pl-button" type="button">Przełącznik</button>
<div class="pl-drop" id="demo-drop-api" data-pl-drop="pos: bottom">
  <p class="pl-drop-text">Ten drop można otworzyć także z kodu.</p>
</div>
<button class="pl-button pl-button-ghost" id="demo-drop-api-show" type="button">Otwórz z kodu</button>
<small id="demo-drop-api-log" style="color: var(--pl-text-muted)">Stan: zamknięty</small>
```

```js example-js
const drop = Plossy.drop('#demo-drop-api');
const log = document.querySelector('#demo-drop-api-log');

document.querySelector('#demo-drop-api-show').addEventListener('click', (event) => {
  event.stopPropagation(); // kliknięcie poza dropem zamknęłoby go od razu
  drop.toggle();
});

drop.el.addEventListener('pl:shown', () => (log.textContent = 'Stan: otwarty'));
drop.el.addEventListener('pl:hidden', () => (log.textContent = 'Stan: zamknięty'));
```

## API

### Opcje

Opcje przekazujesz w atrybucie: `data-pl-drop="mode: hover; pos: bottom-end; offset: 12"`.

| Opcja | Typ | Domyślnie | Opis |
| --- | --- | --- | --- |
| `toggle` | string | poprzedni element | Selektor przełącznika. |
| `mode` | string | `click` | `click` lub `hover` (dla podmenu domyślnie `hover`). |
| `pos` | string | `bottom-start` | Strona i wyrównanie: `top\|bottom\|left\|right` + `-start\|-end` (dla podmenu domyślnie `right-start`). |
| `offset` | number | `8` | Odstęp od przełącznika w px (dla podmenu `4`). |
| `delay-show` | number | `0` | Opóźnienie otwarcia w trybie hover (ms). |
| `delay-hide` | number | `220` | Opóźnienie zamknięcia w trybie hover (ms). |
| `close-on-click` | string \| boolean | `auto` | `auto` — zamyka po kliknięciu pozycji `.pl-dropdown-nav`; `true` — po kliknięciu dowolnego odnośnika lub przycisku; `false` — nigdy. |
| `match-width` | boolean | `false` | Minimalna szerokość równa szerokości przełącznika. |
| `flip` | boolean | `true` | Przeskakuje na przeciwną stronę, gdy brakuje miejsca. |
| `shift` | boolean | `true` | Dosuwa drop tak, by mieścił się w oknie. |

### Metody

| Metoda | Opis |
| --- | --- |
| `show()` | Otwiera drop. |
| `hide()` | Zamyka drop (razem z podmenu). |
| `toggle()` | Przełącza stan. |

### Zdarzenia

| Zdarzenie | Opis |
| --- | --- |
| `pl:beforeshow` | Przed otwarciem. Można anulować przez `preventDefault()`. |
| `pl:show` | Drop został pokazany, startuje animacja. |
| `pl:shown` | Po zakończeniu animacji wejścia. |
| `pl:beforehide` | Przed zamknięciem. Można anulować. |
| `pl:hide` | Startuje animacja wyjścia. |
| `pl:hidden` | Drop został ukryty. |

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-drop` | Pływająca karta (domyślnie `18rem`). |
| `.pl-drop-large` | Szeroki drop (`28rem`) z większymi odstępami. |
| `.pl-drop-auto` | Szerokość dopasowana do treści. |
| `.pl-drop-scroll` | Przewijanie treści wyższej niż okno. |
| `.pl-drop-title`, `.pl-drop-text`, `.pl-drop-footer` | Opcjonalne części karty. |
| `.pl-dropdown` | Wariant z ciasnymi odstępami na menu. |
| `.pl-dropdown-nav` | Lista menu (`ul > li > a`). |
| `.pl-active`, `.pl-disabled` | Stan pozycji (na `li`). |
| `.pl-dropdown-danger` | Pozycja niebezpieczna (na `li`). |
| `.pl-dropdown-meta` | Dodatkowa informacja dosunięta do prawej. |
| `.pl-nav-header`, `.pl-nav-divider` | Nagłówek grupy i separator (na `li`). |
| `.pl-open` | Stan otwarcia — ustawiany na dropie i przełączniku. |

Atrybut `data-pl-drop-close` na elemencie wewnątrz dropa zamyka go po kliknięciu.
