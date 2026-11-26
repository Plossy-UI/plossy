---
title: Pływające etykiety
description: Etykieta leży w polu jak placeholder, a po fokusie lub wpisaniu wartości sprężyście unosi się nad tekst. Czysty CSS, bez JavaScriptu.
order: 5
---

## Podstawowe użycie

Opakuj pole w `.pl-form-floating` i umieść `<label>` **po** kontrolce. Pole musi mieć atrybut `placeholder` (może być spacją) — na nim opiera się wykrywanie, czy pole jest puste.

```html example column narrow
<div class="pl-form-floating">
  <input class="pl-input" id="demo-fl-email" type="email" placeholder="anna@example.com" autocomplete="email">
  <label for="demo-fl-email">Adres e-mail</label>
</div>
<div class="pl-form-floating">
  <input class="pl-input" id="demo-fl-pass" type="password" placeholder=" " autocomplete="current-password">
  <label for="demo-fl-pass">Hasło</label>
</div>
<div class="pl-form-floating">
  <input class="pl-input" id="demo-fl-city" type="text" placeholder=" " value="Kraków">
  <label for="demo-fl-city">Miasto</label>
</div>
```

Właściwy placeholder (np. przykład wartości) pojawia się dopiero po fokusie, gdy etykieta jest już u góry.

## Textarea

```html example narrow
<div class="pl-form-floating">
  <textarea class="pl-textarea" id="demo-fl-msg" placeholder="Opisz krótko, w czym możemy pomóc" rows="3"></textarea>
  <label for="demo-fl-msg">Wiadomość</label>
</div>
```

## Select

W przypadku listy wyboru etykieta jest zawsze uniesiona.

```html example narrow
<div class="pl-form-floating">
  <select class="pl-select" id="demo-fl-role">
    <option>Projektantka</option>
    <option>Programista</option>
    <option>Menedżerka produktu</option>
    <option>Analityk</option>
  </select>
  <label for="demo-fl-role">Rola w zespole</label>
</div>
```

## Stany

Klasy stanów i atrybut `disabled` działają jak w zwykłych polach — etykieta przejmuje kolor stanu.

```html example column narrow
<div class="pl-width-1-1">
  <div class="pl-form-floating">
    <input class="pl-input pl-form-danger" id="demo-fl-nip" type="text" placeholder=" " value="123-45" aria-invalid="true">
    <label for="demo-fl-nip">NIP</label>
  </div>
  <p class="pl-form-help pl-form-help-danger">NIP powinien mieć 10 cyfr.</p>
</div>
<div class="pl-form-floating">
  <input class="pl-input pl-form-success" id="demo-fl-phone" type="tel" placeholder=" " value="+48 600 700 800">
  <label for="demo-fl-phone">Telefon</label>
</div>
<div class="pl-form-floating">
  <input class="pl-input" id="demo-fl-id" type="text" placeholder=" " value="KL-20418" disabled>
  <label for="demo-fl-id">Numer klienta</label>
</div>
```

## Z ikoną i w grupie

Pływające pole można łączyć z przyciskiem w `.pl-input-group`.

```html example narrow
<div class="pl-input-group">
  <div class="pl-form-floating">
    <input class="pl-input" id="demo-fl-code" type="text" placeholder=" ">
    <label for="demo-fl-code">Kod rabatowy</label>
  </div>
  <button class="pl-button pl-button-secondary" type="button">Zastosuj</button>
</div>
```

## Formularz logowania

```html example narrow
<form class="pl-card pl-card-body pl-form-stacked">
  <h3 class="pl-card-title">Zaloguj się</h3>
  <div class="pl-form-floating">
    <input class="pl-input" id="demo-fl-login" type="email" placeholder=" " autocomplete="username">
    <label for="demo-fl-login">E-mail</label>
  </div>
  <div class="pl-form-floating">
    <input class="pl-input" id="demo-fl-login-pass" type="password" placeholder=" " autocomplete="current-password">
    <label for="demo-fl-login-pass">Hasło</label>
  </div>
  <label class="pl-form-check"><input class="pl-checkbox" type="checkbox" checked> Nie wylogowuj mnie</label>
  <button class="pl-button pl-button-primary pl-button-large pl-button-block" type="submit">Zaloguj</button>
</form>
```

## API

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-form-floating` | Opakowanie: kontrolka (`.pl-input`, `.pl-textarea`, `.pl-select`) + `<label>` po niej. |

### Zmienne CSS

| Zmienna | Opis |
| --- | --- |
| `--pl-floating-h` | Wysokość pola (domyślnie `3.5rem`). |
| `--pl-floating-px` | Odstęp poziomy wewnątrz pola. |
