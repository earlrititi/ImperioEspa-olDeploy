# Imperio E

Sitio en Astro preparado para publicarse en IONOS como hosting estatico con PHP para el envio del manifiesto. Carga analitica opcional con Google Tag Manager o Google tag.

## Stack actual

- Astro + Preact + Tailwind
- PHP para el endpoint `/api/manifesto.php`
- Envio gratuito con `mail()` de PHP; Resend queda como proveedor opcional
- Google Tag Manager o Google tag opcional
- Despliegue apto para hosting IONOS con PHP

## Variables de entorno

Usa `.env.example` como base.

| Variable | Uso |
| :-- | :-- |
| `PUBLIC_GTM_ID` | Activa Google Tag Manager si existe |
| `PUBLIC_GOOGLE_TAG_ID` | Activa Google tag si no usas GTM |
| `PUBLIC_SITE_URL` | URL publica del sitio, por ejemplo `https://imperioes.com` |
| `MANIFESTO_FROM_EMAIL` | Remitente del dominio, por ejemplo `Imperio Espanol <manifiesto@imperioes.com>` |
| `MANIFESTO_MAIL_PROVIDER` | `native` para `mail()` gratuito o `resend` si usas Resend |
| `RESEND_API_KEY` | Solo necesario si `MANIFESTO_MAIL_PROVIDER=resend` |
| `MANIFESTO_PDF_PATH` | Ruta local del PDF, por defecto `/manifesto-email.pdf` |
| `MANIFESTO_ATTACHMENT_URL` | URL absoluta del PDF que se adjunta al email |
| `MANIFESTO_ATTACHMENT_PATH` | Ruta local del PDF que se adjunta al email, por defecto `/manifesto-email.pdf` |

## Envio del manifiesto por correo

El PDF original pesa alrededor de 94 MB. Para enviar adjuntos de forma fiable se usa la copia comprimida `public/manifesto-email.pdf`, de alrededor de 2.8 MB.

El usuario solo introduce su correo. El endpoint `public/api/manifesto.php` valida la solicitud y adjunta esa copia al correo. No se incluye enlace de descarga en el email.

Pasos de configuracion:

1. Crea o confirma el correo remitente en IONOS, por ejemplo `manifiesto@imperioes.com`.
2. Configura `MANIFESTO_FROM_EMAIL` con ese remitente.
3. Configura `MANIFESTO_MAIL_PROVIDER` como `native`.
4. Configura `PUBLIC_SITE_URL` con la URL publica final.
5. Manten `public/manifesto-email.pdf` como version comprimida para adjuntar.

Si IONOS no permite variables de entorno en tu plan, copia este archivo:

`private/manifesto-config.example.php`

como:

`private/manifesto-config.php`

```php
<?php
define('MANIFESTO_FROM_EMAIL', 'Imperio Espanol <manifiesto@imperioes.com>');
define('MANIFESTO_MAIL_PROVIDER', 'native');
define('PUBLIC_SITE_URL', 'https://imperioes.com');
```

El endpoint lo carga automaticamente si existe como hermano del webroot o como carpeta privada junto al proyecto. El archivo real `private/manifesto-config.php` esta ignorado por Git para no subir claves privadas. Nunca subas claves privadas a un directorio publico.

## Publicacion en IONOS

1. Ejecuta `npm run build`.
2. Sube el contenido de `dist/` al directorio web de IONOS.
3. Asegurate de que `api/manifesto.php` y `manifesto-email.pdf` quedan publicados.
4. Comprueba que el plan de IONOS permite `mail()` de PHP.

## Comandos

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run preview`
