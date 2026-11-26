---
title: Column
description: Tekst łamany na szpalty jak w gazecie — oparty na CSS multi-column, z liniami podziału i elementami na całą szerokość.
---

## Podstawowe użycie

Klasy `.pl-column-1-2` … `.pl-column-1-6` dzielą zawartość elementu na równe szpalty. Tekst przepływa między nimi automatycznie.

```html example
<div class="pl-column-1-3">
  <p>Bolesławiecka ceramika powstaje z białej gliny kamionkowej, wydobywanej w okolicach miasta od średniowiecza. Po wypaleniu w temperaturze ponad 1200 stopni naczynia stają się wyjątkowo twarde i odporne na zarysowania.</p>
  <p>Charakterystyczne wzory nanosi się ręcznie metodą stempelkową. Każdy stempel wycinany jest z gąbki, a dekoratorka potrzebuje nawet kilku godzin, by pokryć nimi jeden dzbanek.</p>
  <p>Najbardziej znany motyw — „pawie oczko" — pojawił się w XIX wieku i do dziś pozostaje znakiem rozpoznawczym tutejszych manufaktur.</p>
</div>
```

## Responsywność

Sufiksy `@s`, `@m`, `@l`, `@xl` włączają podział od danego breakpointu. Na wąskich ekranach tekst zostaje w jednej szpalcie.

```html example
<div class="pl-column-1-2@s pl-column-1-3@m pl-column-1-4@l">
  <p>Szlak wiedzie doliną potoku, najpierw łagodnie, przez bukowy las. Po godzinie marszu drzewa rzedną i odsłania się widok na grań.</p>
  <p>Schronisko stoi na polanie tuż pod przełęczą. Warto zatrzymać się tu na herbatę — dalej nie ma już żadnego źródła wody.</p>
  <p>Ostatni odcinek prowadzi skalnym grzbietem. Przy dobrej pogodzie ze szczytu widać trzy pasma górskie i taflę zalewu.</p>
  <p>Zejście zielonym szlakiem jest dłuższe, ale znacznie łagodniejsze dla kolan. Cała pętla zajmuje około sześciu godzin.</p>
</div>
```

## Linia podziału

`.pl-column-divider` rysuje linię między szpaltami i podwaja odstęp.

```html example
<div class="pl-column-1-2@s pl-column-divider">
  <p>Zamówienia złożone do godziny 14:00 wysyłamy tego samego dnia roboczego. Paczki nadajemy kurierem lub do automatów paczkowych, a numer przesyłki trafia na Twój adres e-mail zaraz po nadaniu.</p>
  <p>Masz 30 dni na zwrot bez podania przyczyny. Wystarczy wypełnić formularz na stronie i odesłać towar w oryginalnym opakowaniu — pieniądze zwracamy w ciągu trzech dni od odebrania paczki.</p>
</div>
```

## Element na całą szerokość

`.pl-column-span` rozciąga element (np. śródtytuł lub cytat) na wszystkie szpalty; tekst przed nim i po nim łamie się osobno.

```html example
<div class="pl-column-1-2@s">
  <p>Kawę zbiera się ręcznie, wybierając tylko dojrzałe, ciemnoczerwone owoce. Na jednym krzewie dojrzewają one nierównomiernie, więc zbieracze wracają w to samo miejsce kilka razy w sezonie.</p>
  <blockquote class="pl-column-span">Dobra kawa zaczyna się na plantacji, nie w palarni.</blockquote>
  <p>Po zbiorze ziarna są płukane i suszone na słońcu przez dwa tygodnie. Dopiero wtedy trafiają do worków i ruszają w podróż do palarni, gdzie wydobywa się z nich aromat.</p>
</div>
```

## Bez łamania elementów

Układ szpaltowy nadaje się też do „murowanej" listy kart. `.pl-column-avoid-break` pilnuje, żeby karta nie rozpadła się między szpalty.

```html example
<div class="pl-column-1-2 pl-column-1-3@m">
  <div class="pl-card pl-card-small pl-column-avoid-break" style="margin-bottom: 1.5rem"><div class="pl-card-body">„Wdrożenie zajęło nam jedno popołudnie." <small>— Marta, studio projektowe</small></div></div>
  <div class="pl-card pl-card-small pl-column-avoid-break" style="margin-bottom: 1.5rem"><div class="pl-card-body">„Wreszcie biblioteka, która nie wygląda jak wszystkie inne. Klienci pytają, kto robił nam interfejs, a my tylko podmieniliśmy tokeny kolorów." <small>— Paweł, sklep internetowy</small></div></div>
  <div class="pl-card pl-card-small pl-column-avoid-break" style="margin-bottom: 1.5rem"><div class="pl-card-body">„Ciemny motyw działa od ręki." <small>— Ola, aplikacja SaaS</small></div></div>
  <div class="pl-card pl-card-small pl-column-avoid-break" style="margin-bottom: 1.5rem"><div class="pl-card-body">„Dokumentacja z żywymi przykładami oszczędza mnóstwo czasu. Kopiuję, wklejam, działa." <small>— Tomek, freelancer</small></div></div>
  <div class="pl-card pl-card-small pl-column-avoid-break" style="margin-bottom: 1.5rem"><div class="pl-card-body">„Lekka i szybka." <small>— Kasia, agencja</small></div></div>
</div>
```

## API

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-column-1-2` … `.pl-column-1-6` | Liczba szpalt (z sufiksami `@s @m @l @xl`). |
| `.pl-column-1-1` | Jedna szpalta — do cofnięcia podziału od breakpointu. |
| `.pl-column-divider` | Linia między szpaltami. |
| `.pl-column-span` | Element na wszystkie szpalty. |
| `.pl-column-avoid-break` | Element nie jest dzielony między szpalty. |

### Zmienne CSS

| Zmienna | Domyślnie | Opis |
| --- | --- | --- |
| `--pl-column-gap` | `var(--pl-gutter)` | Odstęp między szpaltami. |
