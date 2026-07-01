<?php
declare(strict_types=1);

$path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
$documentRoot = rtrim($_SERVER['DOCUMENT_ROOT'] ?? __DIR__, DIRECTORY_SEPARATOR);
$filePath = realpath($documentRoot . DIRECTORY_SEPARATOR . ltrim($path, '/'));

if ($filePath && str_starts_with($filePath, $documentRoot) && is_file($filePath)) {
    return false;
}

$directoryIndexPath = $documentRoot . DIRECTORY_SEPARATOR . trim($path, '/') . DIRECTORY_SEPARATOR . 'index.html';
if (is_file($directoryIndexPath)) {
    readfile($directoryIndexPath);
    return true;
}

$indexPath = $documentRoot . DIRECTORY_SEPARATOR . 'index.html';
if (is_file($indexPath)) {
    readfile($indexPath);
    return true;
}

http_response_code(404);
echo 'Not found';
