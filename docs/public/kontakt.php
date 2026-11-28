<?php
// Formularz kontaktowy plossyui.com (strona /kontakt/).
//   GET  kontakt.php → nowe działanie do zabezpieczenia: {"question": "3 + 4"}
//   POST kontakt.php → sprawdza dane i wysyła wiadomość mailem: {"ok": true} albo {"error": …, "message": …}
// Wynik działania zna tylko serwer (sesja). Każde pytanie można rozwiązać raz; boty odsiewa też
// ukryte pole „website", minimalny czas wypełnienia i limit wiadomości na godzinę.
// Wymaga PHP 7.3+ i działającej funkcji mail() na hostingu.

const RECIPIENT = 'kploska@gmail.com';
// Nadawca musi być w domenie serwera — inaczej poczta trafi do spamu albo zostanie odrzucona.
const SENDER = 'formularz@plossyui.com';
const MIN_SECONDS = 3;
const MAX_PER_HOUR = 5;

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

session_name('plossy_kontakt');
session_set_cookie_params([
    'lifetime' => 0,
    'path' => '/',
    'secure' => !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off',
    'httponly' => true,
    'samesite' => 'Strict',
]);
session_start();

function reply($status, $data)
{
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

function fail($status, $code, $message)
{
    reply($status, ['error' => $code, 'message' => $message]);
}

function field($name)
{
    return isset($_POST[$name]) && is_string($_POST[$name]) ? trim($_POST[$name]) : '';
}

function length($text)
{
    return function_exists('mb_strlen') ? mb_strlen($text, 'UTF-8') : strlen($text);
}

$method = isset($_SERVER['REQUEST_METHOD']) ? $_SERVER['REQUEST_METHOD'] : 'GET';

if ($method === 'GET') {
    $a = random_int(1, 9);
    $b = random_int(1, 9);
    $_SESSION['captcha'] = $a + $b;
    // Czas liczony od pierwszego pytania — nowe działanie po pomyłce go nie zeruje.
    if (!isset($_SESSION['started'])) {
        $_SESSION['started'] = time();
    }
    reply(200, ['question' => "$a + $b"]);
}

if ($method !== 'POST') {
    header('Allow: GET, POST');
    fail(405, 'method', 'Niedozwolona metoda.');
}

// Pułapka: pole niewidoczne dla ludzi. Bot dostaje „sukces", ale nic nie jest wysyłane.
if (field('website') !== '') {
    reply(200, ['ok' => true]);
}

$expected = isset($_SESSION['captcha']) ? $_SESSION['captcha'] : null;
$started = isset($_SESSION['started']) ? $_SESSION['started'] : time();
unset($_SESSION['captcha']); // jedno pytanie = jedna próba

if ($expected === null) {
    fail(400, 'captcha', 'Pytanie wygasło. Odpowiedz na nowe działanie i wyślij jeszcze raz.');
}
$answer = field('captcha');
if (!preg_match('/^\d{1,3}$/', $answer) || (int) $answer !== $expected) {
    fail(422, 'captcha', 'Wynik działania się nie zgadza. Spróbuj z nowym.');
}
if (time() - $started < MIN_SECONDS) {
    fail(422, 'captcha', 'Za szybko. Odpowiedz na nowe działanie i wyślij jeszcze raz.');
}

$sent = isset($_SESSION['sent']) && is_array($_SESSION['sent']) ? $_SESSION['sent'] : [];
$sent = array_values(array_filter($sent, function ($time) {
    return $time > time() - 3600;
}));
if (count($sent) >= MAX_PER_HOUR) {
    fail(429, 'limit', 'Wysłano już kilka wiadomości. Spróbuj ponownie za godzinę.');
}

// Znaki nowej linii w nagłówkach pozwoliłyby dopisać własnych odbiorców — usuwamy je.
$name = preg_replace('/[\r\n\t]+/', ' ', field('name'));
$email = preg_replace('/[\r\n\t]+/', '', field('email'));
$message = str_replace("\r\n", "\n", field('message'));

if ($name === '' || length($name) > 100) {
    fail(422, 'name', 'Podaj imię (do 100 znaków).');
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || length($email) > 200) {
    fail(422, 'email', 'Podaj poprawny adres e-mail.');
}
if (length($message) < 10 || length($message) > 5000) {
    fail(422, 'message', 'Wiadomość powinna mieć od 10 do 5000 znaków.');
}

$subject = '=?UTF-8?B?' . base64_encode("Plossy — wiadomość od $name") . '?=';
$body = "Imię: $name\nE-mail: $email\n\n$message\n\n— \nWysłano z formularza https://plossyui.com/kontakt/\n";
$headers = implode("\r\n", [
    'From: Plossy <' . SENDER . '>',
    "Reply-To: $email",
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
]);

if (!mail(RECIPIENT, $subject, $body, $headers, '-f' . SENDER)) {
    fail(500, 'mail', 'Serwer nie zdołał wysłać wiadomości. Spróbuj ponownie później.');
}

$sent[] = time();
$_SESSION['sent'] = $sent;
reply(200, ['ok' => true]);
