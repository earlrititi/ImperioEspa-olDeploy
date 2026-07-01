# Imperio E

Sitio en Astro preparado para publicarse en Hostinger como hosting estatico con PHP para el envio del manifiesto. Carga analitica opcional con Google Tag Manager o Google tag.

## Stack actual

- Astro + Preact + Tailwind
- PHP para el endpoint `/api/manifesto.php`
- Envio del manifiesto por SMTP autenticado de Hostinger; `mail()` nativo y Resend quedan como proveedores opcionales
- Google Tag Manager o Google tag opcional
- Despliegue apto para hosting Hostinger con PHP

## Variables de entorno

Usa `.env.example` como base.

| Variable | Uso |
| :-- | :-- |
| `PUBLIC_GTM_ID` | Activa Google Tag Manager si existe |
| `PUBLIC_GOOGLE_TAG_ID` | Activa Google tag si no usas GTM |
| `PUBLIC_SITE_URL` | URL publica del sitio, por ejemplo `https://imperioes.com` |
| `MANIFESTO_FROM_EMAIL` | Remitente del dominio, por ejemplo `Imperio Espanol <manifiesto@imperioes.com>` |
| `MANIFESTO_MAIL_PROVIDER` | `smtp` para Hostinger, `native` para `mail()` o `resend` si usas Resend |
| `MANIFESTO_SMTP_HOST` | Host SMTP, en Hostinger normalmente `smtp.hostinger.com` |
| `MANIFESTO_SMTP_PORT` | Puerto SMTP, en Hostinger normalmente `465` con SSL |
| `MANIFESTO_SMTP_SECURE` | `ssl` para puerto 465 o `tls`/`starttls` para puerto 587 |
| `MANIFESTO_SMTP_USERNAME` | Correo completo del buzon, por ejemplo `manifiesto@imperioes.com` |
| `MANIFESTO_SMTP_PASSWORD` | Password del buzon de Hostinger |
| `RESEND_API_KEY` | Solo necesario si `MANIFESTO_MAIL_PROVIDER=resend` |
| `MANIFESTO_PDF_PATH` | Ruta local del PDF, por defecto `/manifesto-email.pdf` |
| `MANIFESTO_ATTACHMENT_URL` | URL absoluta del PDF que se adjunta al email |
| `MANIFESTO_ATTACHMENT_PATH` | Ruta local del PDF que se adjunta al email, por defecto `/manifesto-email.pdf` |

## Envio del manifiesto por correo

El PDF original pesa alrededor de 94 MB. Para enviar adjuntos de forma fiable se usa la copia comprimida `public/manifesto-email.pdf`, de alrededor de 2.8 MB.

El usuario solo introduce su correo. El endpoint `public/api/manifesto.php` valida la solicitud y adjunta esa copia al correo. No se incluye enlace de descarga en el email.

## Prueba local del envio

La prueba local valida la web generada, PHP, SMTP, credenciales, adjunto y respuesta del endpoint antes de subir a Hostinger.

1. Copia la plantilla local:

```powershell
Copy-Item private\manifesto-config.local.example.php private\manifesto-config.php
```

2. Edita `private/manifesto-config.php` y cambia:

```php
define('MANIFESTO_SMTP_PASSWORD', 'CAMBIA_ESTA_PASSWORD');
```

por la password real del buzon `manifiesto@imperioes.com`.

3. Levanta la web local completa:

```powershell
.\scripts\serve-site-local.ps1
```

Esto ejecuta `npm run build` y sirve `dist/` con PHP. Abre:

```txt
http://127.0.0.1:8080/manifiesto
```

Tambien puedes probar el endpoint directo en otra terminal:

```powershell
.\scripts\test-manifesto-email.ps1 -Email "tu-correo-de-prueba@gmail.com"
```

Respuesta esperada:

```json
{
  "ok": true,
  "message": "Te hemos enviado el manifiesto por correo."
}
```

5. Revisa bandeja de entrada, spam y promociones. Esta prueba no sustituye la prueba final en staging de Hostinger, pero confirma que el endpoint puede enviar por SMTP y adjuntar el PDF.

Pasos de configuracion en Hostinger:

1. Crea el buzon remitente en Hostinger Email, por ejemplo `manifiesto@imperioes.com`.
2. Configura `MANIFESTO_FROM_EMAIL` con ese remitente.
3. Configura `MANIFESTO_MAIL_PROVIDER` como `smtp`.
4. Configura `PUBLIC_SITE_URL` con la URL publica final.
5. Configura `MANIFESTO_SMTP_HOST=smtp.hostinger.com`, `MANIFESTO_SMTP_PORT=465`, `MANIFESTO_SMTP_SECURE=ssl`, `MANIFESTO_SMTP_USERNAME` y `MANIFESTO_SMTP_PASSWORD`.
6. Manten `public/manifesto-email.pdf` como version comprimida para adjuntar.

Si Hostinger no permite variables de entorno en tu plan, crea este archivo fuera del directorio publico cuando sea posible:

`private/manifesto-config.example.php`

como:

`private/manifesto-config.php`

```php
<?php
define('MANIFESTO_FROM_EMAIL', 'Imperio Espanol <manifiesto@imperioes.com>');
define('MANIFESTO_MAIL_PROVIDER', 'smtp');
define('PUBLIC_SITE_URL', 'https://imperioes.com');

define('MANIFESTO_SMTP_HOST', 'smtp.hostinger.com');
define('MANIFESTO_SMTP_PORT', '465');
define('MANIFESTO_SMTP_SECURE', 'ssl');
define('MANIFESTO_SMTP_USERNAME', 'manifiesto@imperioes.com');
define('MANIFESTO_SMTP_PASSWORD', 'CAMBIA_ESTA_PASSWORD');
```

El endpoint lo carga automaticamente si existe como hermano del webroot o como carpeta privada junto al proyecto. El archivo real `private/manifesto-config.php` esta ignorado por Git para no subir claves privadas. Nunca subas claves privadas a un directorio publico.

## Publicacion en Hostinger

1. Ejecuta `npm run build`.
2. Sube el contenido de `dist/` al directorio web de Hostinger, normalmente `public_html/`.
3. Asegurate de que `api/manifesto.php` y `manifesto-email.pdf` quedan publicados.
4. Crea `private/manifesto-config.php` junto al webroot o en una ubicacion privada compatible con el endpoint.
5. Prueba el formulario desde `/manifiesto` y revisa spam/promociones en el primer envio.

## Prueba final tras desplegar

Cuando el staging o produccion ya este subido a Hostinger, ejecuta:

```powershell
.\scripts\test-manifesto-deployed.ps1 -BaseUrl "https://staging.imperioes.com" -Email "tu-correo-de-prueba@gmail.com"
```

Para produccion:

```powershell
.\scripts\test-manifesto-deployed.ps1 -BaseUrl "https://imperioes.com" -Email "tu-correo-de-prueba@gmail.com"
```

El script comprueba que `manifesto-email.pdf` sea accesible, llama a `/api/manifesto.php` y muestra la respuesta JSON del endpoint.

## Comandos

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run preview`
