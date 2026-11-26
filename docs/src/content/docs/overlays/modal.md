---
title: Modal
description: Okna dialogowe oparte na natywnym elemencie dialog — z pułapką fokusu, sprężystą animacją, wariantami rozmiaru i gotowymi oknami alert, confirm i prompt.
badge: JS
---

## Podstawowe użycie

Modal to element `<dialog class="pl-modal">` z atrybutem `data-pl-modal`. W środku znajduje się widoczny panel `.pl-modal-dialog` z sekcjami `.pl-modal-header`, `.pl-modal-body` i `.pl-modal-footer`. Okno otwiera dowolny element z atrybutem `data-pl-modal-open="#id"`, a zamyka element z `data-pl-modal-close`, klawisz <kbd>Esc</kbd> lub kliknięcie tła.

Dzięki natywnemu `showModal()` fokus nie ucieka poza okno, reszta strony jest nieaktywna, a po zamknięciu fokus wraca do przycisku, który okno otworzył.

```html example center
<button class="pl-button pl-button-primary" type="button" data-pl-modal-open="#demo-modal">Otwórz modal</button>

<dialog class="pl-modal" id="demo-modal" data-pl-modal>
  <div class="pl-modal-dialog">
    <div class="pl-modal-header">
      <h2 class="pl-modal-title">Zaproś do zespołu</h2>
      <button class="pl-close" type="button" aria-label="Zamknij" data-pl-modal-close></button>
    </div>
    <div class="pl-modal-body">
      <p>Zaproszona osoba otrzyma wiadomość e-mail z linkiem aktywacyjnym. Link jest ważny przez 7 dni, a rolę możesz zmienić w każdej chwili w ustawieniach zespołu.</p>
    </div>
    <div class="pl-modal-footer">
      <button class="pl-button" type="button" data-pl-modal-close>Anuluj</button>
      <button class="pl-button pl-button-primary" type="button" data-pl-modal-close>Wyślij zaproszenie</button>
    </div>
  </div>
</dialog>
```

### Otwieranie przez Toggle

Modal współpracuje też z komponentem Toggle — `data-pl-toggle="#id"` wywoła jego metodę `toggle()`.

```html
<button class="pl-button" type="button" data-pl-toggle="#demo-modal">Otwórz przez toggle</button>
```

## Rozmiary

Szerokość panelu ustawiają klasy `.pl-modal-small`, `.pl-modal-large` i `.pl-modal-xlarge` dodane do elementu `<dialog>`. Dokładną wartość zmienisz zmienną `--pl-modal-width`.

```html example center
<button class="pl-button" type="button" data-pl-modal-open="#demo-modal-small">Mały</button>
<button class="pl-button" type="button" data-pl-modal-open="#demo-modal-large">Duży</button>
<button class="pl-button" type="button" data-pl-modal-open="#demo-modal-xlarge">Bardzo duży</button>

<dialog class="pl-modal pl-modal-small" id="demo-modal-small" data-pl-modal>
  <div class="pl-modal-dialog">
    <div class="pl-modal-header">
      <h2 class="pl-modal-title">Zmień nazwę</h2>
      <button class="pl-close" type="button" aria-label="Zamknij" data-pl-modal-close></button>
    </div>
    <div class="pl-modal-body">
      <p>Mały modal sprawdza się przy krótkich pytaniach i pojedynczych polach.</p>
    </div>
    <div class="pl-modal-footer">
      <button class="pl-button pl-button-primary" type="button" data-pl-modal-close>Gotowe</button>
    </div>
  </div>
</dialog>

<dialog class="pl-modal pl-modal-large" id="demo-modal-large" data-pl-modal>
  <div class="pl-modal-dialog">
    <div class="pl-modal-header">
      <h2 class="pl-modal-title">Podsumowanie zamówienia</h2>
      <button class="pl-close" type="button" aria-label="Zamknij" data-pl-modal-close></button>
    </div>
    <div class="pl-modal-body">
      <p>Duży modal mieści tabele, formularze w dwóch kolumnach i dłuższe opisy. Na wąskich ekranach i tak zajmie całą dostępną szerokość.</p>
    </div>
    <div class="pl-modal-footer">
      <button class="pl-button" type="button" data-pl-modal-close>Wróć</button>
      <button class="pl-button pl-button-primary" type="button" data-pl-modal-close>Zamawiam i płacę</button>
    </div>
  </div>
</dialog>

<dialog class="pl-modal pl-modal-xlarge" id="demo-modal-xlarge" data-pl-modal>
  <div class="pl-modal-dialog">
    <div class="pl-modal-header">
      <h2 class="pl-modal-title">Porównanie planów</h2>
      <button class="pl-close" type="button" aria-label="Zamknij" data-pl-modal-close></button>
    </div>
    <div class="pl-modal-body">
      <p>Najszerszy wariant — do 72rem. Dobry na porównania, podglądy dokumentów i rozbudowane kreatory.</p>
    </div>
  </div>
</dialog>
```

## Wyśrodkowanie w pionie

Domyślnie panel stoi bliżej górnej krawędzi. Klasa `.pl-modal-center` ustawia go dokładnie na środku ekranu.

```html example center
<button class="pl-button" type="button" data-pl-modal-open="#demo-modal-center">Modal na środku</button>

<dialog class="pl-modal pl-modal-small pl-modal-center" id="demo-modal-center" data-pl-modal>
  <div class="pl-modal-dialog">
    <div class="pl-modal-header">
      <div>
        <span class="pl-modal-eyebrow">Sesja</span>
        <h2 class="pl-modal-title">Wylogować się?</h2>
      </div>
    </div>
    <div class="pl-modal-body">
      <p>Niezapisane zmiany w szkicu zostaną zachowane na tym urządzeniu.</p>
    </div>
    <div class="pl-modal-footer pl-modal-footer-plain">
      <button class="pl-button" type="button" data-pl-modal-close>Zostań</button>
      <button class="pl-button pl-button-primary" type="button" data-pl-modal-close>Wyloguj</button>
    </div>
  </div>
</dialog>
```

## Przewijanie

Gdy treść jest wyższa niż ekran, domyślnie przewija się cała warstwa modala. Klasa `.pl-modal-scroll` unieruchamia nagłówek i stopkę — przewija się tylko `.pl-modal-body`.

```html example center
<button class="pl-button" type="button" data-pl-modal-open="#demo-modal-page">Przewijana strona</button>
<button class="pl-button" type="button" data-pl-modal-open="#demo-modal-scroll">Przewijana treść</button>

<dialog class="pl-modal" id="demo-modal-page" data-pl-modal>
  <div class="pl-modal-dialog">
    <div class="pl-modal-header">
      <h2 class="pl-modal-title">Regulamin usługi</h2>
      <button class="pl-close" type="button" aria-label="Zamknij" data-pl-modal-close></button>
    </div>
    <div class="pl-modal-body">
      <p><strong>§1. Postanowienia ogólne.</strong> Regulamin określa zasady korzystania z serwisu, zakres odpowiedzialności oraz tryb postępowania reklamacyjnego.</p>
      <p><strong>§2. Konto użytkownika.</strong> Rejestracja jest bezpłatna. Użytkownik zobowiązuje się podać prawdziwe dane i chronić hasło przed dostępem osób trzecich.</p>
      <p><strong>§3. Płatności.</strong> Opłaty za plany płatne pobierane są z góry, w cyklu miesięcznym lub rocznym. Faktury trafiają na adres e-mail właściciela konta.</p>
      <p><strong>§4. Rezygnacja.</strong> Z subskrypcji można zrezygnować w dowolnym momencie. Dostęp pozostaje aktywny do końca opłaconego okresu.</p>
      <p><strong>§5. Dane osobowe.</strong> Administratorem danych jest usługodawca. Dane przetwarzane są wyłącznie w celu świadczenia usługi.</p>
      <p><strong>§6. Treści użytkownika.</strong> Użytkownik zachowuje pełnię praw do publikowanych materiałów i odpowiada za ich zgodność z prawem.</p>
      <p><strong>§7. Dostępność.</strong> Usługodawca dokłada starań, aby serwis działał nieprzerwanie, i z wyprzedzeniem informuje o przerwach technicznych.</p>
      <p><strong>§8. Reklamacje.</strong> Reklamacje rozpatrywane są w ciągu 14 dni od zgłoszenia. Odpowiedź wysyłana jest na adres e-mail konta.</p>
      <p><strong>§9. Zmiany regulaminu.</strong> O zmianach informujemy z 14-dniowym wyprzedzeniem. Dalsze korzystanie z serwisu oznacza ich akceptację.</p>
      <p><strong>§10. Postanowienia końcowe.</strong> W sprawach nieuregulowanych zastosowanie mają przepisy prawa polskiego.</p>
    </div>
    <div class="pl-modal-footer">
      <button class="pl-button" type="button" data-pl-modal-close>Odrzucam</button>
      <button class="pl-button pl-button-primary" type="button" data-pl-modal-close>Akceptuję</button>
    </div>
  </div>
</dialog>

<dialog class="pl-modal pl-modal-scroll" id="demo-modal-scroll" data-pl-modal>
  <div class="pl-modal-dialog">
    <div class="pl-modal-header">
      <h2 class="pl-modal-title">Regulamin usługi</h2>
      <button class="pl-close" type="button" aria-label="Zamknij" data-pl-modal-close></button>
    </div>
    <div class="pl-modal-body">
      <p><strong>§1. Postanowienia ogólne.</strong> Regulamin określa zasady korzystania z serwisu, zakres odpowiedzialności oraz tryb postępowania reklamacyjnego.</p>
      <p><strong>§2. Konto użytkownika.</strong> Rejestracja jest bezpłatna. Użytkownik zobowiązuje się podać prawdziwe dane i chronić hasło przed dostępem osób trzecich.</p>
      <p><strong>§3. Płatności.</strong> Opłaty za plany płatne pobierane są z góry, w cyklu miesięcznym lub rocznym. Faktury trafiają na adres e-mail właściciela konta.</p>
      <p><strong>§4. Rezygnacja.</strong> Z subskrypcji można zrezygnować w dowolnym momencie. Dostęp pozostaje aktywny do końca opłaconego okresu.</p>
      <p><strong>§5. Dane osobowe.</strong> Administratorem danych jest usługodawca. Dane przetwarzane są wyłącznie w celu świadczenia usługi.</p>
      <p><strong>§6. Treści użytkownika.</strong> Użytkownik zachowuje pełnię praw do publikowanych materiałów i odpowiada za ich zgodność z prawem.</p>
      <p><strong>§7. Dostępność.</strong> Usługodawca dokłada starań, aby serwis działał nieprzerwanie, i z wyprzedzeniem informuje o przerwach technicznych.</p>
      <p><strong>§8. Reklamacje.</strong> Reklamacje rozpatrywane są w ciągu 14 dni od zgłoszenia. Odpowiedź wysyłana jest na adres e-mail konta.</p>
      <p><strong>§9. Zmiany regulaminu.</strong> O zmianach informujemy z 14-dniowym wyprzedzeniem. Dalsze korzystanie z serwisu oznacza ich akceptację.</p>
      <p><strong>§10. Postanowienia końcowe.</strong> W sprawach nieuregulowanych zastosowanie mają przepisy prawa polskiego.</p>
    </div>
    <div class="pl-modal-footer">
      <button class="pl-button" type="button" data-pl-modal-close>Odrzucam</button>
      <button class="pl-button pl-button-primary" type="button" data-pl-modal-close>Akceptuję</button>
    </div>
  </div>
</dialog>
```

## Pełny ekran

Klasa `.pl-modal-full` rozciąga panel na cały ekran — bez marginesów i zaokrągleń. Dobrze łączy się z `.pl-modal-scroll`.

```html example center
<button class="pl-button" type="button" data-pl-modal-open="#demo-modal-full">Modal pełnoekranowy</button>

<dialog class="pl-modal pl-modal-full pl-modal-scroll" id="demo-modal-full" data-pl-modal>
  <div class="pl-modal-dialog">
    <div class="pl-modal-header">
      <div>
        <span class="pl-modal-eyebrow">Edytor</span>
        <h2 class="pl-modal-title">Nowy wpis na blogu</h2>
      </div>
      <button class="pl-close" type="button" aria-label="Zamknij" data-pl-modal-close></button>
    </div>
    <div class="pl-modal-body">
      <p>Tryb pełnoekranowy pozwala skupić się na jednym zadaniu: pisaniu, konfiguracji albo przeglądaniu dużego zestawu danych.</p>
      <p>Nagłówek i stopka pozostają na miejscu, a treść przewija się pomiędzy nimi.</p>
    </div>
    <div class="pl-modal-footer">
      <button class="pl-button" type="button" data-pl-modal-close>Zapisz szkic</button>
      <button class="pl-button pl-button-primary" type="button" data-pl-modal-close>Opublikuj</button>
    </div>
  </div>
</dialog>
```

## Arkusz dolny

Klasa `.pl-modal-sheet` na telefonach (poniżej 640px) zamienia modal w arkusz wysuwany od dołu — z zaokrągloną górą i uchwytem. Na większych ekranach pozostaje zwykłym oknem. Wariant `.pl-modal-sheet-always` zachowuje wygląd arkusza na każdej szerokości.

```html example center
<button class="pl-button" type="button" data-pl-modal-open="#demo-modal-sheet">Arkusz na telefonie</button>
<button class="pl-button" type="button" data-pl-modal-open="#demo-modal-sheet-always">Arkusz zawsze</button>

<dialog class="pl-modal pl-modal-sheet" id="demo-modal-sheet" data-pl-modal>
  <div class="pl-modal-dialog">
    <div class="pl-modal-header">
      <h2 class="pl-modal-title">Udostępnij</h2>
      <button class="pl-close" type="button" aria-label="Zamknij" data-pl-modal-close></button>
    </div>
    <div class="pl-modal-body">
      <p>Zmniejsz okno przeglądarki poniżej 640px, aby zobaczyć ten modal jako arkusz dolny.</p>
    </div>
    <div class="pl-modal-footer">
      <button class="pl-button pl-button-primary pl-button-block" type="button" data-pl-modal-close>Kopiuj link</button>
    </div>
  </div>
</dialog>

<dialog class="pl-modal pl-modal-sheet-always" id="demo-modal-sheet-always" data-pl-modal>
  <div class="pl-modal-dialog">
    <div class="pl-modal-header">
      <h2 class="pl-modal-title">Sortowanie</h2>
      <button class="pl-close" type="button" aria-label="Zamknij" data-pl-modal-close></button>
    </div>
    <div class="pl-modal-body">
      <ul class="pl-nav pl-nav-default">
        <li class="pl-active"><a href="#" data-pl-modal-close>Polecane</a></li>
        <li><a href="#" data-pl-modal-close>Cena: od najniższej</a></li>
        <li><a href="#" data-pl-modal-close>Cena: od najwyższej</a></li>
        <li><a href="#" data-pl-modal-close>Najnowsze</a></li>
        <li><a href="#" data-pl-modal-close>Najlepiej oceniane</a></li>
      </ul>
    </div>
  </div>
</dialog>
```

## Media

Klasa `.pl-modal-media` usuwa padding i tło panelu — obraz, wideo lub `iframe` wypełnia całe okno. Przycisk zamykania z klasą `.pl-modal-close-outside` ląduje poza panelem, a `.pl-modal-close-default` — w jego rogu.

```html example center
<button class="pl-button" type="button" data-pl-modal-open="#demo-modal-media">Podgląd zdjęcia</button>
<button class="pl-button" type="button" data-pl-modal-open="#demo-modal-corner">Zamykanie w rogu</button>

<dialog class="pl-modal pl-modal-media pl-modal-center" id="demo-modal-media" data-pl-modal>
  <div class="pl-modal-dialog">
    <button class="pl-close pl-modal-close-outside" type="button" aria-label="Zamknij" data-pl-modal-close></button>
    <img src="/img/photo-3.svg" alt="Krajobraz o zachodzie słońca" width="1200" height="800">
    <p class="pl-modal-caption">Zachód słońca nad doliną — fot. Marta Wilk</p>
  </div>
</dialog>

<dialog class="pl-modal pl-modal-center" id="demo-modal-corner" data-pl-modal>
  <div class="pl-modal-dialog">
    <button class="pl-close pl-modal-close-default" type="button" aria-label="Zamknij" data-pl-modal-close></button>
    <div class="pl-modal-body">
      <h2 class="pl-modal-title">Nowość: tryb skupienia</h2>
      <p style="margin-top: .75rem">Ukryj panele boczne i powiadomienia jednym skrótem. Tryb skupienia włączysz kombinacją <kbd>Ctrl</kbd> + <kbd>.</kbd></p>
      <button class="pl-button pl-button-primary" type="button" data-pl-modal-close>Wypróbuj</button>
    </div>
  </div>
</dialog>
```

## Modal statyczny

Opcja `static: true` sprawia, że kliknięcie tła nie zamyka okna — panel krótko „potrząsa głową", sygnalizując, że czeka na decyzję. Zamykanie klawiszem <kbd>Esc</kbd> wyłączysz osobno opcją `esc-close: false`.

```html example center
<button class="pl-button" type="button" data-pl-modal-open="#demo-modal-static">Modal statyczny</button>

<dialog class="pl-modal pl-modal-small pl-modal-center" id="demo-modal-static" data-pl-modal="static: true; esc-close: false">
  <div class="pl-modal-dialog">
    <div class="pl-modal-header">
      <h2 class="pl-modal-title">Usunąć projekt?</h2>
    </div>
    <div class="pl-modal-body">
      <p>Projekt „Kampania jesienna” oraz 24 powiązane pliki zostaną trwale usunięte. Tej operacji nie można cofnąć.</p>
    </div>
    <div class="pl-modal-footer">
      <button class="pl-button" type="button" data-pl-modal-close>Anuluj</button>
      <button class="pl-button pl-button-danger" type="button" data-pl-modal-close>Usuń projekt</button>
    </div>
  </div>
</dialog>
```

## Modal nad modalem

Otwarcie modala domyślnie zamyka ten, który jest już widoczny. Z opcją `stack: true` nowe okno pojawia się nad poprzednim.

```html example center
<button class="pl-button" type="button" data-pl-modal-open="#demo-modal-stack-1">Otwórz pierwszy</button>

<dialog class="pl-modal" id="demo-modal-stack-1" data-pl-modal>
  <div class="pl-modal-dialog">
    <div class="pl-modal-header">
      <h2 class="pl-modal-title">Ustawienia płatności</h2>
      <button class="pl-close" type="button" aria-label="Zamknij" data-pl-modal-close></button>
    </div>
    <div class="pl-modal-body">
      <p>Aktualna metoda: karta kończąca się na 4242. Możesz dodać kolejną bez zamykania tego okna albo przejść do historii faktur.</p>
    </div>
    <div class="pl-modal-footer">
      <button class="pl-button" type="button" data-pl-modal-open="#demo-modal-stack-3">Historia faktur (zastępuje)</button>
      <button class="pl-button pl-button-primary" type="button" data-pl-modal-open="#demo-modal-stack-2">Dodaj kartę (nad oknem)</button>
    </div>
  </div>
</dialog>

<dialog class="pl-modal pl-modal-small pl-modal-center" id="demo-modal-stack-2" data-pl-modal="stack: true">
  <div class="pl-modal-dialog">
    <div class="pl-modal-header">
      <h2 class="pl-modal-title">Nowa karta</h2>
      <button class="pl-close" type="button" aria-label="Zamknij" data-pl-modal-close></button>
    </div>
    <div class="pl-modal-body">
      <p>To okno leży nad poprzednim. Po zamknięciu wrócisz do ustawień płatności.</p>
    </div>
    <div class="pl-modal-footer">
      <button class="pl-button pl-button-primary" type="button" data-pl-modal-close>Zapisz kartę</button>
    </div>
  </div>
</dialog>

<dialog class="pl-modal" id="demo-modal-stack-3" data-pl-modal>
  <div class="pl-modal-dialog">
    <div class="pl-modal-header">
      <h2 class="pl-modal-title">Historia faktur</h2>
      <button class="pl-close" type="button" aria-label="Zamknij" data-pl-modal-close></button>
    </div>
    <div class="pl-modal-body">
      <p>To okno zastąpiło poprzednie — bez opcji <code>stack</code> widoczny jest zawsze tylko jeden modal.</p>
    </div>
  </div>
</dialog>
```

## Okna systemowe

Zamienniki `alert()`, `confirm()` i `prompt()` zwracają obietnice (Promise) i mają polskie etykiety przycisków. `Plossy.modal.dialog(html)` tworzy modal z dowolnej treści, pokazuje go i usuwa z dokumentu po zamknięciu.

```html example center
<button class="pl-button" id="demo-modal-alert" type="button">Alert</button>
<button class="pl-button" id="demo-modal-confirm" type="button">Confirm</button>
<button class="pl-button" id="demo-modal-prompt" type="button">Prompt</button>
<button class="pl-button" id="demo-modal-dialog" type="button">Dialog</button>
<small id="demo-modal-result" style="flex-basis: 100%; text-align: center; color: var(--pl-text-muted)">Wynik pojawi się tutaj.</small>
```

```js example-js
const result = document.querySelector('#demo-modal-result');

document.querySelector('#demo-modal-alert').addEventListener('click', async () => {
  await Plossy.modal.alert('Zmiany zostały zapisane.', { title: 'Gotowe' });
  result.textContent = 'Alert zamknięty.';
});

document.querySelector('#demo-modal-confirm').addEventListener('click', async () => {
  const ok = await Plossy.modal.confirm('Czy na pewno chcesz usunąć 3 zaznaczone pliki?', {
    title: 'Usuwanie plików',
    ok: 'Usuń',
    tone: 'danger',
  });
  result.textContent = ok ? 'Potwierdzono usunięcie.' : 'Anulowano.';
});

document.querySelector('#demo-modal-prompt').addEventListener('click', async () => {
  const name = await Plossy.modal.prompt('Jak nazwać nowy folder?', 'Bez nazwy', { ok: 'Utwórz' });
  result.textContent = name === null ? 'Anulowano.' : `Utworzono folder „${name}”.`;
});

document.querySelector('#demo-modal-dialog').addEventListener('click', () => {
  Plossy.modal.dialog(
    `<button class="pl-close pl-modal-close-default" type="button" aria-label="Zamknij" data-pl-modal-close></button>
     <div class="pl-modal-body">
       <h2 class="pl-modal-title">Dowolna treść</h2>
       <p style="margin-top: .75rem">Ten modal powstał w JavaScripcie i zniknie z dokumentu po zamknięciu.</p>
     </div>`,
    { cls: 'pl-modal-small pl-modal-center' },
  );
});
```

Opcje okien systemowych: `title`, `ok` i `cancel` (etykiety przycisków), `tone` (kolor przycisku głównego), `cls` (klasy modala), `html: true` (treść jako HTML — domyślnie tekst jest bezpiecznie escapowany), a dla `prompt` także `placeholder` i `type`. Domyślne etykiety zmienisz globalnie: `Plossy.modal.labels.cancel = 'Wróć'`.

## Sterowanie z JavaScript

Instancję pobierzesz przez `Plossy.modal(element)`. Zdarzenia mają prefiks `pl:` i bąbelkują; `pl:beforeshow` i `pl:beforehide` można anulować.

```html example center
<button class="pl-button" id="demo-modal-js-open" type="button">Pokaż na 3 sekundy</button>
<small id="demo-modal-js-log" style="color: var(--pl-text-muted)">—</small>

<dialog class="pl-modal pl-modal-small pl-modal-center" id="demo-modal-js" data-pl-modal>
  <div class="pl-modal-dialog">
    <div class="pl-modal-body">
      <h2 class="pl-modal-title">Synchronizacja…</h2>
      <p style="margin-top: .75rem">To okno zamknie się samo po trzech sekundach.</p>
    </div>
  </div>
</dialog>
```

```js example-js
const modal = Plossy.modal('#demo-modal-js');
const log = document.querySelector('#demo-modal-js-log');

document.querySelector('#demo-modal-js-open').addEventListener('click', () => {
  modal.show();
  setTimeout(() => modal.hide(), 3000);
});

['show', 'shown', 'hide', 'hidden'].forEach((type) => {
  modal.el.addEventListener(`pl:${type}`, () => (log.textContent = `Zdarzenie: pl:${type}`));
});
```

## API

### Opcje

Opcje przekazujesz w atrybucie: `data-pl-modal="static: true; esc-close: false"`.

| Opcja | Typ | Domyślnie | Opis |
| --- | --- | --- | --- |
| `backdrop-close` | boolean | `true` | Kliknięcie tła zamyka okno. |
| `esc-close` | boolean | `true` | Klawisz Esc zamyka okno. |
| `static` | boolean | `false` | Kliknięcie tła nie zamyka okna — panel potrząsa się w odpowiedzi. |
| `stack` | boolean | `false` | Pozwala otworzyć okno nad innym, zamiast je zastępować. |

### Atrybuty

| Atrybut | Opis |
| --- | --- |
| `data-pl-modal` | Inicjalizuje modal na elemencie `<dialog>`. |
| `data-pl-modal-open="#id"` | Otwiera wskazany modal po kliknięciu (działa też na linkach — wtedy cel może być w `href`). |
| `data-pl-modal-close` | Zamyka modal, w którym się znajduje. |
| `data-pl-toggle="#id"` | Przełącza modal przez komponent Toggle. |

### Metody

| Metoda | Opis |
| --- | --- |
| `show()` | Otwiera okno. Zwraca Promise spełnianą po animacji. |
| `hide()` | Zamyka okno. Zwraca Promise spełnianą po animacji. |
| `toggle()` | Przełącza okno. |
| `Plossy.modal.alert(tekst, opcje)` | Komunikat z przyciskiem OK → `Promise<void>`. |
| `Plossy.modal.confirm(tekst, opcje)` | Pytanie tak / nie → `Promise<boolean>`. |
| `Plossy.modal.prompt(tekst, wartość, opcje)` | Pytanie z polem tekstowym → `Promise<string \| null>`. |
| `Plossy.modal.dialog(html, opcje)` | Tworzy i pokazuje modal z podanej treści; zwraca instancję. |

### Zdarzenia

| Zdarzenie | Opis |
| --- | --- |
| `pl:beforeshow` | Przed otwarciem. Można anulować przez `preventDefault()`. |
| `pl:show` | Okno otwarte, startuje animacja. |
| `pl:shown` | Po zakończeniu animacji otwierania. |
| `pl:beforehide` | Przed zamknięciem. Można anulować. |
| `pl:hide` | Rozpoczęcie animacji zamykania. |
| `pl:hidden` | Okno zamknięte, fokus wrócił do elementu otwierającego. |

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-modal` | Element `<dialog>` — przezroczysta warstwa na cały ekran. |
| `.pl-modal-dialog` | Widoczny panel okna. |
| `.pl-modal-header` | Nagłówek z tytułem i przyciskiem zamykania. |
| `.pl-modal-title` | Tytuł okna. |
| `.pl-modal-eyebrow` | Mała etykieta nad tytułem. |
| `.pl-modal-body` | Treść. |
| `.pl-modal-footer` | Stopka z przyciskami; `.pl-modal-footer-plain` — bez tła i linii. |
| `.pl-modal-small` `.pl-modal-large` `.pl-modal-xlarge` | Szerokość panelu. |
| `.pl-modal-full` | Pełny ekran. |
| `.pl-modal-center` | Wyśrodkowanie w pionie. |
| `.pl-modal-scroll` | Przewijana tylko treść — nagłówek i stopka stoją. |
| `.pl-modal-sheet` | Arkusz dolny na telefonach; `.pl-modal-sheet-always` — zawsze. |
| `.pl-modal-media` | Okno na obraz / wideo bez paddingu i tła. |
| `.pl-modal-caption` | Podpis pod medium. |
| `.pl-modal-close-default` | Przycisk zamykania w rogu panelu. |
| `.pl-modal-close-outside` | Przycisk zamykania poza panelem. |
