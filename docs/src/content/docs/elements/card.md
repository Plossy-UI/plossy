---
title: Card
description: Uniwersalny kontener treści — z nagłówkiem, stopką, mediami, wariantami kolorystycznymi, uniesieniem przy hoverze i poświatą podążającą za kursorem.
---

## Podstawowe użycie

Karta to `.pl-card` z treścią w `.pl-card-body`. Tytuł, metadane i tekst mają własne klasy.

```html example narrow
<div class="pl-card">
  <div class="pl-card-body">
    <h3 class="pl-card-title">Plan Pro</h3>
    <p class="pl-card-meta">49 zł miesięcznie</p>
    <p class="pl-card-text">Nielimitowane projekty, własna domena i priorytetowe wsparcie dla całego zespołu.</p>
    <a class="pl-button pl-button-primary" href="#">Wybierz plan</a>
  </div>
</div>
```

## Nagłówek i stopka

`.pl-card-header` i `.pl-card-footer` oddzielają się od treści włosową linią. Oba są wierszami flex — elementy układają się obok siebie.

```html example narrow
<div class="pl-card">
  <div class="pl-card-header">
    <h3 class="pl-card-title">Zamówienie #10482</h3>
    <span class="pl-label pl-label-dot pl-label-success" style="margin-left: auto">Wysłane</span>
  </div>
  <div class="pl-card-body">
    <p class="pl-card-text">Lampa Arko, 2 × żarówka LED E27. Przesyłka dotrze w czwartek, 26 listopada.</p>
  </div>
  <div class="pl-card-footer">
    <span>Kurier DPD</span>
    <a class="pl-link-arrow" href="#" style="margin-left: auto">Śledź paczkę</a>
  </div>
</div>
```

## Media

`.pl-card-media` to obszar na obraz lub wideo — dopasowuje zaokrąglenie do pozycji w karcie (góra, dół lub jedyny element).

```html example
<div class="pl-grid pl-child-width-1-3@m">
  <div>
    <div class="pl-card">
      <figure class="pl-card-media"><img src="/img/photo-1.svg" alt="" width="1200" height="800"></figure>
      <div class="pl-card-body">
        <h3 class="pl-card-title">Media u góry</h3>
        <p class="pl-card-text">Obraz przylega do górnych krawędzi karty.</p>
      </div>
    </div>
  </div>
  <div>
    <div class="pl-card">
      <div class="pl-card-body">
        <h3 class="pl-card-title">Media na dole</h3>
        <p class="pl-card-text">Ten sam element jako ostatnie dziecko.</p>
      </div>
      <figure class="pl-card-media"><img src="/img/photo-2.svg" alt="" width="1200" height="800"></figure>
    </div>
  </div>
  <div>
    <div class="pl-card">
      <figure class="pl-card-media pl-card-media-inset"><img src="/img/photo-3.svg" alt="" width="1200" height="800"></figure>
      <div class="pl-card-body">
        <h3 class="pl-card-title">Media z marginesem</h3>
        <p class="pl-card-text"><code>.pl-card-media-inset</code> odsuwa obraz od krawędzi.</p>
      </div>
    </div>
  </div>
</div>
```

## Znaczek

`.pl-card-badge` umieszcza element w prawym górnym rogu karty.

```html example narrow
<div class="pl-card">
  <span class="pl-card-badge pl-label pl-label-spark">Nowość</span>
  <figure class="pl-card-media"><img src="/img/photo-4.svg" alt="" width="1200" height="800"></figure>
  <div class="pl-card-body">
    <h3 class="pl-card-title">Krzesło Nord</h3>
    <p class="pl-card-meta">Dąb olejowany · 529 zł</p>
  </div>
</div>
```

## Układ poziomy

`.pl-card-horizontal` ustawia media obok treści. Media jako ostatnie dziecko trafiają na prawą stronę.

```html example
<div class="pl-card pl-card-horizontal" style="max-width: 40rem; margin-inline: auto">
  <figure class="pl-card-media"><img src="/img/photo-5.svg" alt="" width="1200" height="800"></figure>
  <div class="pl-card-body">
    <p class="pl-card-meta">Poradnik · 6 min czytania</p>
    <h3 class="pl-card-title">Jak urządzić domowe biuro</h3>
    <p class="pl-card-text">Światło, ergonomia i porządek w kablach — trzy rzeczy, od których warto zacząć.</p>
  </div>
</div>
<div class="pl-card pl-card-horizontal" style="max-width: 40rem; margin: 1.5rem auto 0">
  <div class="pl-card-body">
    <p class="pl-card-meta">Inspiracje</p>
    <h3 class="pl-card-title">Małe mieszkanie, duże pomysły</h3>
    <p class="pl-card-text">Pięć realizacji poniżej 40 m², które nie udają większych, niż są.</p>
  </div>
  <figure class="pl-card-media"><img src="/img/photo-6.svg" alt="" width="1200" height="800"></figure>
</div>
```

## Warianty

Domyślna karta to biała powierzchnia z cieniem. `.pl-card-muted` ma szare tło bez ramki, `.pl-card-outline` samą ramkę, `.pl-card-ghost` jest przezroczysta. `.pl-card-primary` i `.pl-card-secondary` wypełniają kartę kolorem — tekst i linie w środku dopasowują się same.

```html example
<div class="pl-grid pl-child-width-1-2@s pl-child-width-1-3@m">
  <div>
    <div class="pl-card">
      <div class="pl-card-body">
        <h3 class="pl-card-title">Domyślna</h3>
        <p class="pl-card-text">Powierzchnia, włosowa ramka i miękki cień.</p>
      </div>
    </div>
  </div>
  <div>
    <div class="pl-card pl-card-muted">
      <div class="pl-card-body">
        <h3 class="pl-card-title">Muted</h3>
        <p class="pl-card-text">Wyciszone tło bez ramki i cienia.</p>
      </div>
    </div>
  </div>
  <div>
    <div class="pl-card pl-card-outline">
      <div class="pl-card-body">
        <h3 class="pl-card-title">Outline</h3>
        <p class="pl-card-text">Sama ramka, przezroczyste tło.</p>
      </div>
    </div>
  </div>
  <div>
    <div class="pl-card pl-card-ghost">
      <div class="pl-card-body">
        <h3 class="pl-card-title">Ghost</h3>
        <p class="pl-card-text">Bez tła i ramki — sam układ.</p>
      </div>
    </div>
  </div>
  <div>
    <div class="pl-card pl-card-primary">
      <div class="pl-card-body">
        <h3 class="pl-card-title">Primary</h3>
        <p class="pl-card-text">Kolor akcentu z kolorowym cieniem.</p>
      </div>
      <div class="pl-card-footer">Stopka dopasowuje kolory</div>
    </div>
  </div>
  <div>
    <div class="pl-card pl-card-secondary">
      <div class="pl-card-body">
        <h3 class="pl-card-title">Secondary</h3>
        <p class="pl-card-text">Atramentowa, odwrócona powierzchnia.</p>
      </div>
      <div class="pl-card-footer">Stopka dopasowuje kolory</div>
    </div>
  </div>
</div>
```

## Akcent

`.pl-card-accent` dodaje u góry cienką, gradientową kreskę — od akcentu do limonkowej iskry.

```html example narrow
<div class="pl-card pl-card-accent">
  <div class="pl-card-body">
    <p class="pl-card-meta">Polecany</p>
    <h3 class="pl-card-title">Plan Zespół</h3>
    <p class="pl-card-text">Wspólne przestrzenie robocze, role i uprawnienia oraz logowanie SSO.</p>
  </div>
</div>
```

## Hover

`.pl-card-hover` unosi kartę przy najechaniu, wzmacnia cień i delikatnie przybliża obraz w `.pl-card-media`.

```html example
<div class="pl-grid pl-child-width-1-3@m">
  <div>
    <div class="pl-card pl-card-hover">
      <figure class="pl-card-media"><img src="/img/photo-7.svg" alt="" width="1200" height="800"></figure>
      <div class="pl-card-body">
        <h3 class="pl-card-title">Sofa Lumo</h3>
        <p class="pl-card-meta">3 290 zł</p>
      </div>
    </div>
  </div>
  <div>
    <div class="pl-card pl-card-hover">
      <figure class="pl-card-media"><img src="/img/photo-8.svg" alt="" width="1200" height="800"></figure>
      <div class="pl-card-body">
        <h3 class="pl-card-title">Stolik Fala</h3>
        <p class="pl-card-meta">890 zł</p>
      </div>
    </div>
  </div>
  <div>
    <div class="pl-card pl-card-hover pl-card-muted">
      <div class="pl-card-body">
        <h3 class="pl-card-title">Bez mediów</h3>
        <p class="pl-card-text">Efekt działa z każdym wariantem karty.</p>
      </div>
    </div>
  </div>
</div>
```

## Klikalna karta

Kartą może być sam element `<a class="pl-card">`. Gdy w karcie są też inne interaktywne elementy, użyj `.pl-card-stretch` na głównym linku — jego obszar kliknięcia rozciągnie się na całą kartę.

```html example
<div class="pl-grid pl-child-width-1-2@m">
  <div>
    <a class="pl-card pl-card-hover" href="#">
      <div class="pl-card-body">
        <p class="pl-card-meta">Cała karta jest linkiem</p>
        <h3 class="pl-card-title">Dokumentacja API</h3>
        <p class="pl-card-text">Punkty końcowe, uwierzytelnianie i przykłady zapytań.</p>
      </div>
    </a>
  </div>
  <div>
    <div class="pl-card pl-card-hover">
      <div class="pl-card-body">
        <p class="pl-card-meta">Rozciągnięty link</p>
        <h3 class="pl-card-title"><a class="pl-card-stretch pl-link-heading" href="#">Przewodnik wdrożeniowy</a></h3>
        <p class="pl-card-text">Link w tytule obejmuje całą kartę dzięki <code>.pl-card-stretch</code>.</p>
      </div>
    </div>
  </div>
</div>
```

## Rozmiary

`.pl-card-small` i `.pl-card-large` zmieniają odstęp wewnętrzny i zaokrąglenie.

```html example
<div class="pl-grid pl-child-width-1-3@m pl-flex-middle">
  <div>
    <div class="pl-card pl-card-small">
      <div class="pl-card-body">
        <h3 class="pl-card-title">Small</h3>
        <p class="pl-card-text">Ciasne odstępy do gęstych układów.</p>
      </div>
    </div>
  </div>
  <div>
    <div class="pl-card">
      <div class="pl-card-body">
        <h3 class="pl-card-title">Domyślna</h3>
        <p class="pl-card-text">Standardowy odstęp 1,5 rem.</p>
      </div>
    </div>
  </div>
  <div>
    <div class="pl-card pl-card-large">
      <div class="pl-card-body">
        <h3 class="pl-card-title">Large</h3>
        <p class="pl-card-text">Więcej powietrza dla treści wyróżnionych.</p>
      </div>
    </div>
  </div>
</div>
```

## Ze Spotlight

Atrybut `data-pl-spotlight` dodaje poświatę podążającą za kursorem — zobacz [Spotlight](/docs/interactive/spotlight/). Wariant `.pl-spotlight-border` podświetla samą ramkę.

```html example
<div class="pl-grid pl-child-width-1-3@m" data-pl-spotlight="target: > div > .pl-card">
  <div>
    <div class="pl-card">
      <div class="pl-card-body">
        <span class="pl-icon-box pl-icon-primary" data-pl-icon="zap"></span>
        <h3 class="pl-card-title" style="margin-top: 1rem">Szybkość</h3>
        <p class="pl-card-text">Strony ładują się poniżej sekundy.</p>
      </div>
    </div>
  </div>
  <div>
    <div class="pl-card pl-spotlight-border">
      <div class="pl-card-body">
        <span class="pl-icon-box pl-icon-primary" data-pl-icon="shield-check"></span>
        <h3 class="pl-card-title" style="margin-top: 1rem">Bezpieczeństwo</h3>
        <p class="pl-card-text">Ta karta podświetla ramkę.</p>
      </div>
    </div>
  </div>
  <div>
    <div class="pl-card pl-spotlight-spark">
      <div class="pl-card-body">
        <span class="pl-icon-box pl-icon-primary" data-pl-icon="sparkles"></span>
        <h3 class="pl-card-title" style="margin-top: 1rem">Iskra</h3>
        <p class="pl-card-text">Limonkowa poświata zamiast akcentu.</p>
      </div>
    </div>
  </div>
</div>
```

## Siatka kart

Karty w [siatce](/docs/layout/grid/) mają równą wysokość — treść rozciąga się, a stopki wyrównują do dołu. Scrollspy animuje ich wejście.

```html example
<div class="pl-grid pl-child-width-1-2@s pl-child-width-1-3@m" data-pl-scrollspy="cls: pl-animation-slide-up; target: > div; delay: 80">
  <div>
    <div class="pl-card pl-card-hover" style="height: 100%">
      <figure class="pl-card-media"><img src="/img/photo-1.svg" alt="" width="1200" height="800"></figure>
      <div class="pl-card-body">
        <p class="pl-card-meta">Projektowanie</p>
        <h3 class="pl-card-title">System wizualny od zera</h3>
        <p class="pl-card-text">Od tokenów po komponenty — jak budować spójny interfejs.</p>
      </div>
      <div class="pl-card-footer">
        <img src="/img/avatar-1.svg" alt="" width="28" height="28" style="border-radius: 50%">
        <span>Anna Kowalczyk</span>
        <span style="margin-left: auto">12 lis</span>
      </div>
    </div>
  </div>
  <div>
    <div class="pl-card pl-card-hover" style="height: 100%">
      <figure class="pl-card-media"><img src="/img/photo-2.svg" alt="" width="1200" height="800"></figure>
      <div class="pl-card-body">
        <p class="pl-card-meta">Frontend</p>
        <h3 class="pl-card-title">Animacje, które nie męczą</h3>
        <p class="pl-card-text">Sprężysty ruch w praktyce.</p>
      </div>
      <div class="pl-card-footer">
        <img src="/img/avatar-2.svg" alt="" width="28" height="28" style="border-radius: 50%">
        <span>Piotr Zieliński</span>
        <span style="margin-left: auto">8 lis</span>
      </div>
    </div>
  </div>
  <div>
    <div class="pl-card pl-card-hover" style="height: 100%">
      <figure class="pl-card-media"><img src="/img/photo-3.svg" alt="" width="1200" height="800"></figure>
      <div class="pl-card-body">
        <p class="pl-card-meta">Badania</p>
        <h3 class="pl-card-title">Pięć pytań przed redesignem</h3>
        <p class="pl-card-text">Zanim otworzysz edytor, porozmawiaj z użytkownikami — to oszczędza tygodnie pracy.</p>
      </div>
      <div class="pl-card-footer">
        <img src="/img/avatar-3.svg" alt="" width="28" height="28" style="border-radius: 50%">
        <span>Julia Nowak</span>
        <span style="margin-left: auto">2 lis</span>
      </div>
    </div>
  </div>
</div>
```

## API

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-card` | Karta (kolumna flex). |
| `.pl-card-body` | Treść z odstępem wewnętrznym; rozciąga się na wolne miejsce. |
| `.pl-card-header` `.pl-card-footer` | Nagłówek i stopka oddzielone linią. |
| `.pl-card-title` `-meta` `-text` | Tytuł, metadane, tekst. |
| `.pl-card-media` | Obszar obrazu / wideo. |
| `.pl-card-media-inset` | Media odsunięte od krawędzi, zaokrąglone z każdej strony. |
| `.pl-card-badge` | Element w prawym górnym rogu. |
| `.pl-card-horizontal` | Media obok treści. |
| `.pl-card-muted` `-outline` `-ghost` | Warianty powierzchni. |
| `.pl-card-primary` `.pl-card-secondary` | Wypełnienie akcentem / atramentem. |
| `.pl-card-accent` | Gradientowa kreska u góry. |
| `.pl-card-hover` | Uniesienie i cień przy hoverze, zoom mediów. |
| `.pl-card-link` | Karta klikalna niebędąca elementem `<a>` (kursor, fokus). |
| `.pl-card-stretch` | Na linku wewnątrz: obszar kliknięcia na całą kartę. |
| `.pl-card-small` `.pl-card-large` | Rozmiary. |

### Zmienne CSS

| Zmienna | Domyślnie | Opis |
| --- | --- | --- |
| `--pl-card-p` | `1.5rem` | Odstęp wewnętrzny. |
| `--pl-card-radius` | `var(--pl-radius-lg)` | Zaokrąglenie. |
