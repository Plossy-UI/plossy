---
title: Align
description: Opływanie elementów tekstem — wyrównanie do lewej, prawej lub środka z gotowymi marginesami, także responsywnie.
---

## Podstawowe użycie

Klasy `.pl-align-left` i `.pl-align-right` ustawiają element (zwykle obraz) z boku, a tekst go opływa. Odstęp od tekstu jest równy `--pl-gutter`. Kontenerowi dodaj `.pl-clearfix`, aby objął element pływający.

```html example
<div class="pl-clearfix">
  <img class="pl-align-left pl-border-rounded" src="/img/photo-1.svg" width="240" height="160" alt="Górski krajobraz o świcie">
  <p>Szlak na przełęcz zaczyna się tuż za schroniskiem i przez pierwszą godzinę prowadzi lasem. Powyżej granicy drzew ścieżka wychodzi na otwarte hale, skąd przy dobrej pogodzie widać całe pasmo.</p>
  <p>Na wejście warto zarezerwować około trzech godzin. Latem wyrusz wcześnie rano — po południu często zbierają się burze, a na grani nie ma gdzie się schronić.</p>
</div>
```

```html example
<div class="pl-clearfix">
  <img class="pl-align-right pl-border-rounded" src="/img/photo-2.svg" width="240" height="160" alt="Jezioro otoczone lasem">
  <p>Zejście nad jezioro jest łagodniejsze i zajmuje niespełna półtorej godziny. Po drodze mijasz dwa punkty widokowe oraz źródło z wodą zdatną do picia.</p>
  <p>Przy brzegu działa niewielka wypożyczalnia kajaków, czynna od maja do końca września. Poza sezonem jest tu zupełnie pusto.</p>
</div>
```

## Wyśrodkowanie

`.pl-align-center` robi z elementu blok i centruje go marginesami automatycznymi.

```html example
<p>Mapa trasy z zaznaczonymi miejscami odpoczynku:</p>
<img class="pl-align-center pl-border-rounded" src="/img/photo-3.svg" width="420" height="280" alt="Mapa trasy">
<p>Cała pętla ma 14 kilometrów i 820 metrów przewyższenia.</p>
```

## Warianty responsywne

Z sufiksem `@s`, `@m`, `@l` lub `@xl` element zaczyna pływać dopiero od danego breakpointu — na węższych ekranach pozostaje zwykłym blokiem nad tekstem.

```html example
<div class="pl-clearfix">
  <img class="pl-align-left@m pl-border-rounded" src="/img/photo-4.svg" width="260" height="173" alt="Schronisko górskie">
  <p>Schronisko przyjmuje gości przez cały rok. Rezerwacja noclegu jest konieczna w weekendy i w czasie wakacji; w tygodniu zwykle znajdzie się wolne łóżko w sali zbiorowej.</p>
  <p>Kuchnia wydaje ciepłe posiłki do godziny 20. Płatność kartą jest możliwa, ale zasięg bywa kapryśny — miej przy sobie gotówkę.</p>
</div>
```

## API

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-align-left` | Element pływa po lewej, margines z prawej. |
| `.pl-align-right` | Element pływa po prawej, margines z lewej. |
| `.pl-align-center` | Blok wyśrodkowany w poziomie. |
| `.pl-align-left@s…@xl` | Opływanie po lewej od breakpointu. |
| `.pl-align-right@s…@xl` | Opływanie po prawej od breakpointu. |
