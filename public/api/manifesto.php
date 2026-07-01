<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

const EMAIL_PATTERN = '/^[^\s@]+@[^\s@]+\.[^\s@]+$/';

$privateConfigPaths = [
    dirname(__DIR__, 2) . '/private/manifesto-config.php',
    dirname(__DIR__, 3) . '/private/manifesto-config.php',
];

foreach ($privateConfigPaths as $privateConfig) {
    if (is_file($privateConfig)) {
        require_once $privateConfig;
        break;
    }
}

function respond(int $status, array $body): void
{
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function env_value(string $key, ?string $fallback = null): ?string
{
    if (defined($key)) {
        $constantValue = constant($key);
        if (is_string($constantValue) && $constantValue !== '') {
            return $constantValue;
        }
    }

    $value = getenv($key);
    if ($value === false || $value === '') {
        return $fallback;
    }

    return $value;
}

function request_origin(): string
{
    $scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
    $host = $_SERVER['HTTP_HOST'] ?? '';

    return $host ? "{$scheme}://{$host}" : '';
}

function absolute_url(string $pathOrUrl): string
{
    if (preg_match('/^https?:\/\//i', $pathOrUrl)) {
        return $pathOrUrl;
    }

    $siteUrl = rtrim(env_value('PUBLIC_SITE_URL', request_origin()) ?? '', '/');
    $path = '/' . ltrim($pathOrUrl, '/');

    return "{$siteUrl}{$path}";
}

function local_public_path(string $path): string
{
    return dirname(__DIR__) . '/' . ltrim($path, '/');
}

function same_origin_request(): bool
{
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if ($origin === '') {
        return true;
    }

    return rtrim($origin, '/') === rtrim(request_origin(), '/');
}

function email_address_from_header(string $from): string
{
    if (preg_match('/<([^>]+)>/', $from, $matches)) {
        return trim($matches[1]);
    }

    return trim($from);
}

function encoded_header(string $value): string
{
    return '=?UTF-8?B?' . base64_encode($value) . '?=';
}

function smtp_read_response($socket): array
{
    $response = '';

    while (($line = fgets($socket, 515)) !== false) {
        $response .= $line;
        if (preg_match('/^\d{3}\s/', $line)) {
            break;
        }
    }

    $code = (int) substr($response, 0, 3);

    return ['code' => $code, 'response' => trim($response)];
}

function smtp_expect($socket, array $expectedCodes): array
{
    $result = smtp_read_response($socket);

    if (!in_array($result['code'], $expectedCodes, true)) {
        return [
            'ok' => false,
            'body' => 'SMTP unexpected response: ' . $result['response'],
        ];
    }

    return ['ok' => true, 'body' => $result['response']];
}

function smtp_command($socket, string $command, array $expectedCodes): array
{
    fwrite($socket, $command . "\r\n");

    return smtp_expect($socket, $expectedCodes);
}

function smtp_dot_stuff(string $message): string
{
    return preg_replace('/^\./m', '..', $message) ?? $message;
}

function build_manifesto_email_message(
    string $to,
    string $from,
    string $subject,
    string $textBody,
    string $attachmentFile,
    string $attachmentName
): array {
    if (!is_file($attachmentFile) || !is_readable($attachmentFile)) {
        return ['ok' => false, 'body' => 'Attachment not readable: ' . $attachmentFile];
    }

    $attachmentBytes = file_get_contents($attachmentFile);
    if ($attachmentBytes === false) {
        return ['ok' => false, 'body' => 'Attachment could not be loaded: ' . $attachmentFile];
    }

    $boundary = 'manifesto_' . bin2hex(random_bytes(16));
    $encodedSubject = encoded_header($subject);
    $encodedAttachmentName = encoded_header($attachmentName);

    $headers = [
        'Date: ' . date(DATE_RFC2822),
        'From: ' . $from,
        'To: ' . $to,
        'Subject: ' . $encodedSubject,
        'MIME-Version: 1.0',
        'Content-Type: multipart/mixed; boundary="' . $boundary . '"',
        'X-Mailer: PHP/' . phpversion(),
    ];

    $body = "--{$boundary}\r\n";
    $body .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $body .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
    $body .= $textBody . "\r\n\r\n";
    $body .= "--{$boundary}\r\n";
    $body .= "Content-Type: application/pdf; name=\"{$encodedAttachmentName}\"\r\n";
    $body .= "Content-Transfer-Encoding: base64\r\n";
    $body .= "Content-Disposition: attachment; filename=\"{$encodedAttachmentName}\"\r\n\r\n";
    $body .= chunk_split(base64_encode($attachmentBytes));
    $body .= "\r\n--{$boundary}--\r\n";

    return [
        'ok' => true,
        'body' => implode("\r\n", $headers) . "\r\n\r\n" . $body,
    ];
}

function send_resend_email(array $payload, string $apiKey): array
{
    $ch = curl_init('https://api.resend.com/emails');

    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => [
            'Authorization: Bearer ' . $apiKey,
            'Content-Type: application/json',
        ],
        CURLOPT_POSTFIELDS => json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
        CURLOPT_TIMEOUT => 20,
    ]);

    $body = curl_exec($ch);
    $status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);

    curl_close($ch);

    return [
        'ok' => $body !== false && $status >= 200 && $status < 300,
        'status' => $status,
        'body' => $body === false ? $error : $body,
    ];
}

function send_smtp_manifesto_email(
    string $to,
    string $from,
    string $subject,
    string $textBody,
    string $attachmentFile,
    string $attachmentName,
    string $host,
    int $port,
    string $secure,
    string $username,
    string $password
): array {
    $fromAddress = email_address_from_header($from);

    if (!preg_match(EMAIL_PATTERN, $fromAddress)) {
        return ['ok' => false, 'body' => 'Invalid from address'];
    }

    $message = build_manifesto_email_message(
        $to,
        $from,
        $subject,
        $textBody,
        $attachmentFile,
        $attachmentName
    );

    if (!$message['ok']) {
        return $message;
    }

    $secure = strtolower($secure);
    $transport = $secure === 'ssl' ? "ssl://{$host}" : $host;
    $socket = fsockopen($transport, $port, $errorNumber, $errorMessage, 20);

    if (!$socket) {
        return ['ok' => false, 'body' => "SMTP connection failed ({$errorNumber}): {$errorMessage}"];
    }

    stream_set_timeout($socket, 20);

    $result = smtp_expect($socket, [220]);
    if (!$result['ok']) {
        fclose($socket);
        return $result;
    }

    $serverName = $_SERVER['SERVER_NAME'] ?? 'localhost';
    $result = smtp_command($socket, "EHLO {$serverName}", [250]);
    if (!$result['ok']) {
        fclose($socket);
        return $result;
    }

    if (in_array($secure, ['tls', 'starttls'], true)) {
        $result = smtp_command($socket, 'STARTTLS', [220]);
        if (!$result['ok']) {
            fclose($socket);
            return $result;
        }

        $cryptoEnabled = stream_socket_enable_crypto(
            $socket,
            true,
            STREAM_CRYPTO_METHOD_TLS_CLIENT
        );

        if ($cryptoEnabled !== true) {
            fclose($socket);
            return ['ok' => false, 'body' => 'SMTP STARTTLS negotiation failed'];
        }

        $result = smtp_command($socket, "EHLO {$serverName}", [250]);
        if (!$result['ok']) {
            fclose($socket);
            return $result;
        }
    }

    $result = smtp_command($socket, 'AUTH LOGIN', [334]);
    if (!$result['ok']) {
        fclose($socket);
        return $result;
    }

    $result = smtp_command($socket, base64_encode($username), [334]);
    if (!$result['ok']) {
        fclose($socket);
        return $result;
    }

    $result = smtp_command($socket, base64_encode($password), [235]);
    if (!$result['ok']) {
        fclose($socket);
        return ['ok' => false, 'body' => 'SMTP authentication failed'];
    }

    $result = smtp_command($socket, "MAIL FROM:<{$fromAddress}>", [250]);
    if (!$result['ok']) {
        fclose($socket);
        return $result;
    }

    $result = smtp_command($socket, "RCPT TO:<{$to}>", [250, 251]);
    if (!$result['ok']) {
        fclose($socket);
        return $result;
    }

    $result = smtp_command($socket, 'DATA', [354]);
    if (!$result['ok']) {
        fclose($socket);
        return $result;
    }

    fwrite($socket, smtp_dot_stuff($message['body']) . "\r\n.\r\n");
    $result = smtp_expect($socket, [250]);
    smtp_command($socket, 'QUIT', [221]);
    fclose($socket);

    return $result['ok'] ? ['ok' => true, 'body' => 'sent'] : $result;
}

function send_native_manifesto_email(
    string $to,
    string $from,
    string $subject,
    string $textBody,
    string $attachmentFile,
    string $attachmentName
): array {
    if (!is_file($attachmentFile) || !is_readable($attachmentFile)) {
        return ['ok' => false, 'body' => 'Attachment not readable: ' . $attachmentFile];
    }

    $attachmentBytes = file_get_contents($attachmentFile);
    if ($attachmentBytes === false) {
        return ['ok' => false, 'body' => 'Attachment could not be loaded: ' . $attachmentFile];
    }

    $boundary = 'manifesto_' . bin2hex(random_bytes(16));
    $encodedSubject = encoded_header($subject);
    $encodedAttachmentName = encoded_header($attachmentName);
    $fromAddress = email_address_from_header($from);

    $headers = [
        'MIME-Version: 1.0',
        'From: ' . $from,
        'Reply-To: ' . $fromAddress,
        'Content-Type: multipart/mixed; boundary="' . $boundary . '"',
        'X-Mailer: PHP/' . phpversion(),
    ];

    $body = "--{$boundary}\r\n";
    $body .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $body .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
    $body .= $textBody . "\r\n\r\n";
    $body .= "--{$boundary}\r\n";
    $body .= "Content-Type: application/pdf; name=\"{$encodedAttachmentName}\"\r\n";
    $body .= "Content-Transfer-Encoding: base64\r\n";
    $body .= "Content-Disposition: attachment; filename=\"{$encodedAttachmentName}\"\r\n\r\n";
    $body .= chunk_split(base64_encode($attachmentBytes));
    $body .= "\r\n--{$boundary}--\r\n";

    $extraParams = preg_match(EMAIL_PATTERN, $fromAddress) ? '-f ' . escapeshellarg($fromAddress) : '';
    $sent = mail($to, $encodedSubject, $body, implode("\r\n", $headers), $extraParams);

    return ['ok' => $sent, 'body' => $sent ? 'sent' : 'PHP mail() returned false'];
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, ['ok' => false, 'error' => 'Metodo no permitido.']);
}

if (!same_origin_request()) {
    respond(403, ['ok' => false, 'error' => 'Origen no permitido.']);
}

$rawBody = file_get_contents('php://input') ?: '';
$data = json_decode($rawBody, true);

if (!is_array($data)) {
    respond(400, ['ok' => false, 'error' => 'Solicitud invalida.']);
}

$name = trim((string) ($data['name'] ?? ''));
$email = strtolower(trim((string) ($data['email'] ?? '')));
$source = substr(trim((string) ($data['source'] ?? 'web')), 0, 40);
$honeypot = trim((string) ($data['company'] ?? ''));

if ($honeypot !== '') {
    respond(200, ['ok' => true]);
}

if (!preg_match(EMAIL_PATTERN, $email)) {
    respond(400, ['ok' => false, 'error' => 'Introduce un correo valido.']);
}

$fromEmail = env_value('MANIFESTO_FROM_EMAIL', 'Imperio Espanol <manifiesto@imperioes.com>');

if (!$fromEmail) {
    respond(500, ['ok' => false, 'error' => 'El envio de correo no esta configurado.']);
}

$apiKey = env_value('RESEND_API_KEY');
$smtpPassword = env_value('MANIFESTO_SMTP_PASSWORD');
$mailProvider = strtolower(env_value('MANIFESTO_MAIL_PROVIDER', $apiKey ? 'resend' : ($smtpPassword ? 'smtp' : 'native')) ?? 'native');
$attachmentPath = env_value(
    'MANIFESTO_ATTACHMENT_URL',
    env_value('MANIFESTO_ATTACHMENT_PATH', env_value('MANIFESTO_PDF_PATH', '/manifesto-email.pdf'))
) ?? '/manifesto-email.pdf';
$attachmentUrl = absolute_url($attachmentPath);
$attachmentFile = local_public_path(env_value('MANIFESTO_ATTACHMENT_PATH', env_value('MANIFESTO_PDF_PATH', '/manifesto-email.pdf')) ?? '/manifesto-email.pdf');
$greetingName = $name !== '' ? $name : 'lector';
$subject = 'Tu manifiesto de Imperio Espanol';
$textBody = "Hola {$greetingName},\n\nGracias por pedir el manifiesto. Te lo dejamos adjunto a este correo.\n\nImperio Espanol";

if ($mailProvider === 'resend') {
    if (!$apiKey) {
        respond(500, ['ok' => false, 'error' => 'Resend no esta configurado.']);
    }

    $safeName = htmlspecialchars($greetingName, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
    $emailPayload = [
        'from' => $fromEmail,
        'to' => [$email],
        'subject' => $subject,
        'html' => "
            <p>Hola {$safeName},</p>
            <p>Gracias por pedir el manifiesto. Te lo dejamos adjunto a este correo.</p>
            <p>Imperio Espanol</p>
        ",
        'text' => $textBody,
        'attachments' => [
            [
                'filename' => 'Manifiesto Imperio Espanol.pdf',
                'path' => $attachmentUrl,
            ],
        ],
        'tags' => [
            [
                'name' => 'source',
                'value' => $source !== '' ? $source : 'web',
            ],
        ],
    ];

    $result = send_resend_email($emailPayload, $apiKey);

    if (!$result['ok']) {
        error_log('Resend manifesto email failed: ' . (string) $result['body']);
        respond(502, ['ok' => false, 'error' => 'No se pudo enviar el correo. Intentalo de nuevo.']);
    }

    respond(200, ['ok' => true, 'message' => 'Te hemos enviado el manifiesto por correo.']);
}

if ($mailProvider === 'smtp') {
    $smtpHost = env_value('MANIFESTO_SMTP_HOST', 'smtp.hostinger.com') ?? 'smtp.hostinger.com';
    $smtpPort = (int) (env_value('MANIFESTO_SMTP_PORT', '465') ?? '465');
    $smtpSecure = env_value('MANIFESTO_SMTP_SECURE', 'ssl') ?? 'ssl';
    $smtpUsername = env_value('MANIFESTO_SMTP_USERNAME', email_address_from_header($fromEmail)) ?? '';

    if (!$smtpUsername || !$smtpPassword) {
        respond(500, ['ok' => false, 'error' => 'El SMTP no esta configurado.']);
    }

    $result = send_smtp_manifesto_email(
        $email,
        $fromEmail,
        $subject,
        $textBody,
        $attachmentFile,
        'Manifiesto Imperio Espanol.pdf',
        $smtpHost,
        $smtpPort,
        $smtpSecure,
        $smtpUsername,
        $smtpPassword
    );

    if (!$result['ok']) {
        error_log('SMTP manifesto email failed: ' . (string) $result['body']);
        respond(502, ['ok' => false, 'error' => 'No se pudo enviar el correo. Intentalo de nuevo.']);
    }

    respond(200, ['ok' => true, 'message' => 'Te hemos enviado el manifiesto por correo.']);
}

$result = send_native_manifesto_email(
    $email,
    $fromEmail,
    $subject,
    $textBody,
    $attachmentFile,
    'Manifiesto Imperio Espanol.pdf'
);

if (!$result['ok']) {
    error_log('Native manifesto email failed: ' . (string) $result['body']);
    respond(502, ['ok' => false, 'error' => 'No se pudo enviar el correo. Intentalo de nuevo.']);
}

respond(200, ['ok' => true, 'message' => 'Te hemos enviado el manifiesto por correo.']);
