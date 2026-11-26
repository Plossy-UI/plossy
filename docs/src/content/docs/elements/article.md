---
title: Article
description: Typografia dłuższych treści — tytuł, metadane, lead, ilustracje z podpisem i wyróżnione cytaty, złożone w wygodnej do czytania kolumnie.
---

## Podstawowe użycie

Klasa `.pl-article` na elemencie `<article>` ogranicza szerokość kolumny do wygodnej miary i ustawia rytm tekstu. Tytuł oznacz `.pl-article-title`, a wiersz z autorem i datą — `.pl-article-meta` (kolejne elementy rozdzielają się kropkami).

```html example
<article class="pl-article">
  <a class="pl-article-eyebrow" href="#">Projektowanie</a>
  <h1 class="pl-article-title"><a href="#">Dlaczego puste miejsce to też projekt</a></h1>
  <p class="pl-article-meta">
    <span>Marta Wilk</span>
    <time datetime="2026-10-14">14 października 2026</time>
    <span>6 min czytania</span>
  </p>
  <p class="pl-article-lead">Światło między elementami robi w interfejsie więcej, niż się wydaje: porządkuje, prowadzi wzrok i daje treści oddech.</p>
  <p>Kiedy ekran jest ciasny, każda decyzja użytkownika kosztuje więcej. Oko musi najpierw oddzielić to, co ważne, od tego, co po prostu jest obok. Odstęp wykonuje tę pracę za nas — bez ramek, linii i kolorowych teł.</p>
  <p>W praktyce wystarczy kilka stałych wartości. Skala odstępów oparta na jednym module sprawia, że układ wygląda na przemyślany, nawet jeśli powstawał szybko.</p>
</article>
```

## Lead i inicjał

`.pl-article-lead` wyróżnia akapit wprowadzający. `.pl-article-dropcap` zamienia pierwszą literę akapitu w ozdobny inicjał.

```html example
<article class="pl-article">
  <p class="pl-article-lead">Piec opalany drewnem nagrzewa się dwie godziny. To wystarczy, żeby ciasto zdążyło wyrosnąć drugi raz.</p>
  <p class="pl-article-dropcap">Piekarnia przy Rybackiej otwiera się o szóstej, ale światło w oknie zapala się dużo wcześniej. Pierwsze bochenki trafiają do pieca, gdy ulica jest jeszcze pusta, a jedynym dźwiękiem jest szuranie drewnianej łopaty po kamiennym trzonie. Zakwas, na którym powstaje chleb, ma jedenaście lat i własne imię.</p>
</article>
```

## Ilustracja

Element `<figure>` z klasą `.pl-article-figure` dostaje zaokrąglone rogi i podpis poprzedzony krótką kreską. `.pl-article-figure-wide` na szerokich ekranach wysuwa ilustrację poza kolumnę tekstu.

```html example
<article class="pl-article">
  <p>Trasa zaczyna się łagodnie, wzdłuż potoku. Przez pierwszą godzinę idzie się w cieniu buków i dopiero powyżej górnej granicy lasu otwiera się widok na całą dolinę.</p>
  <figure class="pl-article-figure">
    <img src="/img/photo-2.svg" alt="Widok na dolinę o poranku" width="1200" height="800" loading="lazy">
    <figcaption>Dolina o szóstej rano — mgła utrzymuje się tu do pierwszych promieni słońca.</figcaption>
  </figure>
  <p>Na przełęczy warto zrobić dłuższy postój. Wiatr bywa tu silny nawet latem, więc kurtka w plecaku to nie przesada.</p>
</article>
```

## Cytat

`.pl-article-quote` to wyróżniony cytat z gradientową kreską. Autora umieść w `<footer>` lub `<cite>`. Wariant `.pl-article-quote-center` wyśrodkowuje tekst pod dużym cudzysłowem.

```html example
<article class="pl-article">
  <p>Zespół przez pół roku testował trzy różne podejścia do nawigacji, zanim zdecydował się na najprostsze z nich.</p>
  <blockquote class="pl-article-quote">
    <p>Dobry interfejs poznaje się po tym, że nikt o nim nie mówi. Ludzie po prostu robią to, po co przyszli.</p>
    <footer>Tomasz Bielak, projektant produktu</footer>
  </blockquote>
  <p>Wyniki badań potwierdziły tę intuicję: czas potrzebny na znalezienie ustawień skrócił się o ponad połowę.</p>
  <blockquote class="pl-article-quote pl-article-quote-center">
    <p>Upraszczanie to nie odejmowanie funkcji, tylko odejmowanie wątpliwości.</p>
    <cite>Z notatek zespołu</cite>
  </blockquote>
</article>
```

## Notatka i stopka

`.pl-article-note` to ramka na dopowiedzenie (pierwszy `<strong>` staje się etykietą), a `.pl-article-footer` zamyka artykuł wierszem z tagami i akcjami.

```html example
<article class="pl-article">
  <p>Aktualizację przeprowadzisz jednym poleceniem. Cały proces trwa zwykle mniej niż minutę i nie wymaga zatrzymywania aplikacji.</p>
  <div class="pl-article-note">
    <strong>Warto wiedzieć</strong>
    Przed aktualizacją zrób kopię pliku konfiguracyjnego — nowe wersje dopisują do niego domyślne wartości.
  </div>
  <footer class="pl-article-footer">
    <div class="pl-chip-group">
      <a class="pl-chip pl-chip-small" href="#">wdrożenia</a>
      <a class="pl-chip pl-chip-small" href="#">poradnik</a>
    </div>
    <a class="pl-button pl-button-text" href="#">Czytaj dalej <span class="pl-button-arrow" data-pl-icon="arrow-right"></span></a>
  </footer>
</article>
```

## Pełny przykład

Nagłówki, listy i linie wewnątrz `.pl-article` dostają dopasowane odstępy. Kolejne artykuły (`.pl-article + .pl-article`) rozdziela linia.

```html example
<article class="pl-article pl-article-center">
  <a class="pl-article-eyebrow" href="#">Poradnik</a>
  <h1 class="pl-article-title">Jak zaplanować tydzień pracy zdalnej</h1>
  <div class="pl-article-meta">
    <span class="pl-avatar pl-avatar-small"><img src="/img/avatar-3.svg" alt=""></span>
    <a href="#">Karolina Dąbrowska</a>
    <time datetime="2026-11-02">2 listopada 2026</time>
    <span>4 min czytania</span>
  </div>
  <p class="pl-article-lead">Praca z domu daje swobodę, ale bez planu szybko zamienia się w ciąg przypadkowych zadań. Oto prosty rytm, który działa.</p>
  <h2>Zacznij od trzech priorytetów</h2>
  <p>W poniedziałek rano zapisz trzy rzeczy, które muszą się wydarzyć do piątku. Nie dziesięć — trzy. Reszta zadań ułoży się wokół nich.</p>
  <ul>
    <li>Jedno zadanie wymagające głębokiego skupienia.</li>
    <li>Jedno zadanie zespołowe, od którego zależą inni.</li>
    <li>Jedna sprawa odkładana od dawna.</li>
  </ul>
  <figure class="pl-article-figure">
    <img src="/img/photo-5.svg" alt="Biurko z notatnikiem i kubkiem kawy" width="1200" height="800" loading="lazy">
    <figcaption>Papierowy notatnik wciąż wygrywa z aplikacjami, gdy chodzi o plan dnia.</figcaption>
  </figure>
  <h3>Bloki zamiast listy</h3>
  <p>Zamiast długiej listy zadań zaplanuj w kalendarzu bloki czasu. Dwie godziny bez komunikatora dają więcej niż cały dzień przerywany powiadomieniami.</p>
  <hr>
  <p>Na koniec tygodnia poświęć kwadrans na podsumowanie: co się udało, co przesuwasz i dlaczego.</p>
</article>
```

## API

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-article` | Kontener artykułu (kolumna o maks. szerokości 44 rem). |
| `.pl-article-center` | Wyśrodkowuje kolumnę. |
| `.pl-article-wide` | Szersza kolumna (56 rem). |
| `.pl-article-eyebrow` | Kategoria nad tytułem (mono, wersaliki, limonkowa kropka). |
| `.pl-article-title` | Tytuł artykułu. |
| `.pl-article-meta` | Wiersz metadanych: autor, data, czas czytania. |
| `.pl-article-lead` | Akapit wprowadzający. |
| `.pl-article-dropcap` | Akapit z inicjałem. |
| `.pl-article-figure` | Ilustracja z podpisem; `.pl-article-figure-wide` — szersza od kolumny. |
| `.pl-article-quote` | Wyróżniony cytat; `.pl-article-quote-center` — wyśrodkowany. |
| `.pl-article-note` | Ramka z dopowiedzeniem. |
| `.pl-article-footer` | Stopka artykułu. |

### Zmienne CSS

| Zmienna | Domyślnie | Opis |
| --- | --- | --- |
| `--pl-article-width` | `44rem` | Maksymalna szerokość kolumny tekstu. |
