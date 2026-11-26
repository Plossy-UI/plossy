---
title: Style (presety)
description: Jeden atrybut zmienia charakter całej biblioteki. Dziesięć gotowych stylów — od czystego flat po szkło i papier — a własny to kilkanaście zmiennych CSS.
order: 3
badge: Nowy
---

## Jak to działa

Wygląd Plossy ma trzy niezależne osie, każda sterowana atrybutem — zwykle na `<html>`, ale działa też na dowolnym fragmencie strony:

| Atrybut | Co zmienia | Wartości |
| --- | --- | --- |
| `data-pl-style` | **Charakter**: kształty, cienie, kroje pisma, typografię przycisków, ruch, paletę neutralną. | *(brak)* = soft, `flat`, `elegant`, `tender`, `round`, `pop`, `editorial`, `paper`, `glass`, `toy` |
| `data-pl-theme` | Jasność. | `light`, `dark`, `auto` |
| `data-pl-accent` | Kolor akcentu. | `iris`, `moss`, `coral`, `ocean`, `plum`, `ink` |

```html
<html data-pl-style="flat" data-pl-theme="light">
```

Styl przełączysz na żywo listą **Styl** w nagłówku dokumentacji — zmienia się każdy komponent na każdej stronie. W [przykładach](/examples/) ta sama lista jest w pływającym pasku w lewym dolnym rogu.

## Gotowe style

Ten sam kod HTML w dziesięciu stylach:

```html example
<div class="pl-grid pl-grid-match pl-child-width-1-2@s">
  <div>
    <div class="pl-card" data-pl-style="soft">
      <div class="pl-card-body">
        <span class="pl-label pl-label-primary">Soft</span>
        <h3 class="pl-card-title pl-margin-small-top">Lampa Fjord</h3>
        <p class="pl-card-text">Miękkie cienie, zaokrąglenia i sprężysty ruch — styl domyślny.</p>
        <input class="pl-input pl-margin-small-bottom" type="text" placeholder="Twój e-mail" />
        <div class="pl-flex pl-flex-wrap pl-gap-small">
          <button class="pl-button pl-button-primary" type="button">Do koszyka</button>
          <button class="pl-button" type="button">Więcej</button>
        </div>
      </div>
    </div>
  </div>
  <div>
    <div class="pl-card" data-pl-style="flat">
      <div class="pl-card-body">
        <span class="pl-label pl-label-primary">Flat</span>
        <h3 class="pl-card-title pl-margin-small-top">Lampa Fjord</h3>
        <p class="pl-card-text">Czysty minimalizm: biel i czerń, proste rogi, zero cieni.</p>
        <input class="pl-input pl-margin-small-bottom" type="text" placeholder="Twój e-mail" />
        <div class="pl-flex pl-flex-wrap pl-gap-small">
          <button class="pl-button pl-button-primary" type="button">Do koszyka</button>
          <button class="pl-button" type="button">Więcej</button>
        </div>
      </div>
    </div>
  </div>
  <div>
    <div class="pl-card" data-pl-style="elegant">
      <div class="pl-card-body">
        <span class="pl-label pl-label-primary">Elegant</span>
        <h3 class="pl-card-title pl-margin-small-top">Lampa Fjord</h3>
        <p class="pl-card-text">Szeryfowe nagłówki, krem i złoto, rozstrzelone wersaliki.</p>
        <input class="pl-input pl-margin-small-bottom" type="text" placeholder="Twój e-mail" />
        <div class="pl-flex pl-flex-wrap pl-gap-small">
          <button class="pl-button pl-button-primary" type="button">Do koszyka</button>
          <button class="pl-button" type="button">Więcej</button>
        </div>
      </div>
    </div>
  </div>
  <div>
    <div class="pl-card" data-pl-style="tender">
      <div class="pl-card-body">
        <span class="pl-label pl-label-primary">Tender</span>
        <h3 class="pl-card-title pl-margin-small-top">Lampa Fjord</h3>
        <p class="pl-card-text">Ciepłe pastele, przyciski-pastylki z miękką poświatą.</p>
        <input class="pl-input pl-margin-small-bottom" type="text" placeholder="Twój e-mail" />
        <div class="pl-flex pl-flex-wrap pl-gap-small">
          <button class="pl-button pl-button-primary" type="button">Do koszyka</button>
          <button class="pl-button" type="button">Więcej</button>
        </div>
      </div>
    </div>
  </div>
  <div>
    <div class="pl-card" data-pl-style="round">
      <div class="pl-card-body">
        <span class="pl-label pl-label-primary">Round</span>
        <h3 class="pl-card-title pl-margin-small-top">Lampa Fjord</h3>
        <p class="pl-card-text">Duże zaokrąglenia, pastylki, wyraźniejsze cienie.</p>
        <input class="pl-input pl-margin-small-bottom" type="text" placeholder="Twój e-mail" />
        <div class="pl-flex pl-flex-wrap pl-gap-small">
          <button class="pl-button pl-button-primary" type="button">Do koszyka</button>
          <button class="pl-button" type="button">Więcej</button>
        </div>
      </div>
    </div>
  </div>
  <div>
    <div class="pl-card" data-pl-style="pop">
      <div class="pl-card-body">
        <span class="pl-label pl-label-primary">Pop</span>
        <h3 class="pl-card-title pl-margin-small-top">Lampa Fjord</h3>
        <p class="pl-card-text">Grube czarne ramki, twarde cienie, mocny kolor.</p>
        <input class="pl-input pl-margin-small-bottom" type="text" placeholder="Twój e-mail" />
        <div class="pl-flex pl-flex-wrap pl-gap-small">
          <button class="pl-button pl-button-primary" type="button">Do koszyka</button>
          <button class="pl-button" type="button">Więcej</button>
        </div>
      </div>
    </div>
  </div>
  <div>
    <div class="pl-card" data-pl-style="editorial">
      <div class="pl-card-body">
        <span class="pl-label pl-label-primary">Editorial</span>
        <h3 class="pl-card-title pl-margin-small-top">Lampa Fjord</h3>
        <p class="pl-card-text">Monumentalny szeryf, kremowa strona, czarne linie.</p>
        <input class="pl-input pl-margin-small-bottom" type="text" placeholder="Twój e-mail" />
        <div class="pl-flex pl-flex-wrap pl-gap-small">
          <button class="pl-button pl-button-primary" type="button">Do koszyka</button>
          <button class="pl-button" type="button">Więcej</button>
        </div>
      </div>
    </div>
  </div>
  <div>
    <div class="pl-card" data-pl-style="paper">
      <div class="pl-card-body">
        <span class="pl-label pl-label-primary">Paper</span>
        <h3 class="pl-card-title pl-margin-small-top">Lampa Fjord</h3>
        <p class="pl-card-text">Faktura papieru, ziemiste barwy, miękki szeryf.</p>
        <input class="pl-input pl-margin-small-bottom" type="text" placeholder="Twój e-mail" />
        <div class="pl-flex pl-flex-wrap pl-gap-small">
          <button class="pl-button pl-button-primary" type="button">Do koszyka</button>
          <button class="pl-button" type="button">Więcej</button>
        </div>
      </div>
    </div>
  </div>
  <div>
    <div class="pl-card" data-pl-style="glass">
      <div class="pl-card-body">
        <span class="pl-label pl-label-primary">Glass</span>
        <h3 class="pl-card-title pl-margin-small-top">Lampa Fjord</h3>
        <p class="pl-card-text">Półprzezroczyste, rozmyte powierzchnie i poświata.</p>
        <input class="pl-input pl-margin-small-bottom" type="text" placeholder="Twój e-mail" />
        <div class="pl-flex pl-flex-wrap pl-gap-small">
          <button class="pl-button pl-button-primary" type="button">Do koszyka</button>
          <button class="pl-button" type="button">Więcej</button>
        </div>
      </div>
    </div>
  </div>
  <div>
    <div class="pl-card" data-pl-style="toy">
      <div class="pl-card-body">
        <span class="pl-label pl-label-primary">Toy</span>
        <h3 class="pl-card-title pl-margin-small-top">Lampa Fjord</h3>
        <p class="pl-card-text">Pulchne kształty i przyciski z klockową krawędzią.</p>
        <input class="pl-input pl-margin-small-bottom" type="text" placeholder="Twój e-mail" />
        <div class="pl-flex pl-flex-wrap pl-gap-small">
          <button class="pl-button pl-button-primary" type="button">Do koszyka</button>
          <button class="pl-button" type="button">Więcej</button>
        </div>
      </div>
    </div>
  </div>
</div>
```

| Styl | Charakter | Kroje |
| --- | --- | --- |
| *soft* (domyślny) | Miękkie cienie, zaokrąglenia, sprężysty ruch. | Bricolage Grotesque, Geist |
| `flat` | Czysty minimalizm sklepu modowego: biel, czerń, proste rogi, włosowe linie, przyciski wersalikami. | Baloo Tamma 2 |
| `elegant` | Wytworny: szeryf, krem i złoto, ostre rogi, rozstrzelone wersaliki, wolny ruch. | Cormorant Garamond, Jost |
| `tender` | Czuły: ciepłe pastele, plamy koloru w tle, pastylki z poświatą. | Playfair Display, Nunito |
| `round` | Przyjazny: duże zaokrąglenia, mocniejsze cienie. | jak soft |
| `pop` | Maksymalizm: grube czarne ramki, twarde cienie, nasycony kolor. | jak soft, grubsze |
| `editorial` | Redakcyjny: monumentalny szeryf, kremowa strona, czarne linie, czerwony akcent. | DM Serif Display, Geist |
| `paper` | Namacalny: ziarno papieru, ziemiste barwy, ciepłe cienie. | Fraunces, Geist |
| `glass` | Głębia: półprzezroczyste rozmyte powierzchnie na świetlistym tle. | jak soft |
| `toy` | Zabawowy: pulchne kształty, kolorowe ramki, przyciski wciskane jak klocki. | jak soft, grubsze |

> Biblioteka nie dołącza krojów pisma. Style z własnymi krojami wskazują je w `--pl-font-display` i `--pl-font-sans` — załaduj je samodzielnie albo podmień te zmienne na swoje.

## Pokrętła stylu

Preset to po prostu zestaw zmiennych CSS. Oprócz zwykłych [tokenów](/docs/start/motywy/) (promienie, kolory, kroje, czasy animacji) biblioteka ma kilkanaście „pokręteł", które sterują charakterem wszystkich komponentów naraz:

| Zmienna | Domyślnie | Co robi |
| --- | --- | --- |
| `--pl-radius-xs … -xl`, `-pill` | 6 – 28 px | Zaokrąglenia wszystkich komponentów. `0px` = ostre rogi. |
| `--pl-shadow-scale` | `1` | Siła wszystkich cieni. `0` = bez cieni. |
| `--pl-gloss` | `1` | Połysk i kolorowa poświata przycisków. `0` = płasko. |
| `--pl-lift` | `1` | Unoszenie przycisków i kart przy hoverze. `0` = brak. |
| `--pl-press` | `0.965` | Skala przycisku przy kliknięciu. `1` = brak. |
| `--pl-border-w` | `1px` | Grubość ramek przycisków i kart. |
| `--pl-font-sans`, `--pl-font-display`, `--pl-font-mono` | | Kroje pisma. |
| `--pl-body-weight` | `400` | Grubość tekstu. |
| `--pl-heading-weight`, `--pl-heading-tracking`, `--pl-heading-case` | `620`, `-0.022em`, `none` | Nagłówki `h1–h6`. |
| `--pl-display-weight`, `--pl-display-tracking` | *(wg komponentu)* | Tytuły w komponentach (karty, modale, accordion …). |
| `--pl-control-weight`, `--pl-control-tracking`, `--pl-control-case`, `--pl-control-text` | `540`, `-0.006em`, `none`, `0.9375rem` | Typografia przycisków. |
| `--pl-control-h`, `-sm`, `-lg` | 2.5 / 2 / 3 rem | Wysokość kontrolek. |
| `--pl-dur-1 … -4`, `--pl-ease`, `--pl-ease-spring` | | Tempo i charakter ruchu. |
| `--pl-text-xs … -5xl` | | Skala pisma. |
| `--pl-bg`, `--pl-surface`, `--pl-border`, `--pl-text` … | | Paleta neutralna. |

## Własny styl

Wystarczy blok CSS z własną nazwą. Poniższy przykład definiuje styl `brutal` — grube ramki, twarde cienie, wersaliki — i stosuje go tylko do jednego fragmentu:

```html example center
<div class="pl-card" data-pl-style="brutal" style="max-width: 24rem">
  <div class="pl-card-body">
    <h3 class="pl-card-title">Własny styl</h3>
    <p class="pl-card-text">Kilkanaście zmiennych i komponenty wyglądają zupełnie inaczej.</p>
    <button class="pl-button pl-button-primary" type="button">Zamawiam</button>
    <button class="pl-button" type="button">Anuluj</button>
  </div>
</div>
```

```css example-css
[data-pl-style='brutal'] {
  --pl-radius-xs: 0px;
  --pl-radius-sm: 0px;
  --pl-radius-md: 0px;
  --pl-radius-lg: 0px;
  --pl-border-w: 2px;
  --pl-border: var(--pl-text);
  --pl-gloss: 0;
  --pl-lift: 3;
  --pl-heading-weight: 800;
  --pl-display-weight: 800;
  --pl-control-weight: 700;
  --pl-control-case: uppercase;
  --pl-control-tracking: 0.04em;
  /* twardy cień zamiast miękkiego — nadpisanie tokenów cieni */
  --pl-shadow-xs: 3px 3px 0 var(--pl-text);
  --pl-shadow-sm: 5px 5px 0 var(--pl-text);
  --pl-shadow-lg: 8px 8px 0 var(--pl-text);
}

/* opcjonalne poprawki pojedynczych komponentów */
[data-pl-style='brutal'] .pl-button {
  box-shadow: 3px 3px 0 var(--pl-text);
}
```

### W Sass

Presety biblioteki leżą w `src/scss/styles/` i są dołączane w `plossy.scss` — niepotrzebne możesz stamtąd usunąć. Własny dodasz mixinami z `_engine.scss`; same dbają o przeliczenie kolorów pochodnych (hover, tła „soft", cienie), także gdy styl jest użyty lokalnie, a nie na `<html>`.

```scss
@use 'engine' as *;

// pokrętła + paleta jasna
@include preset('moj') {
  --pl-radius-md: 4px;
  --pl-shadow-scale: 0.5;
  --pl-font-display: 'Fraunces', serif;
  --pl-bg: oklch(0.98 0.01 90);
}

// paleta ciemna i domyślny akcent (opcjonalnie)
@include preset-dark('moj') {
  --pl-bg: oklch(0.16 0.01 90);
}
@include preset-accent('moj', 0.55, 0.2, 30);

// korekty pojedynczych komponentów (opcjonalnie)
[data-pl-style='moj'] {
  @include no-depth; // wyłącza własne poświaty komponentów
  .pl-button { --pl-button-px: 2em; }
}
```

## Zasięg i ograniczenia

- Styl, motyw i akcent **łączą się dowolnie** — każdy styl ma własną paletę jasną i ciemną oraz domyślny akcent, ale `data-pl-accent` nadal go nadpisuje.
- Tokeny sterują zdecydowaną większością wyglądu. Nieliczne detale komponentów (np. własne poświaty) preset koryguje dodatkowymi regułami — mixiny `no-depth` i `outline-button` z `_engine.scss` robią to hurtem.
- Preset zmienia wygląd, nie strukturę: układ, odstępy wewnętrzne i zachowanie JavaScript pozostają takie same.
