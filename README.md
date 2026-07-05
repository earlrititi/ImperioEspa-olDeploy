# Imperio E

Sitio en Astro preparado para publicarse en Vercel con Supabase, Stripe, Resend y envio del manifiesto desde una API Route serverless. Carga analitica opcional con Google Tag Manager o Google tag.

## Stack actual

- Astro + Preact + Tailwind
- API Routes de Astro sobre Vercel
- Envio del manifiesto por Resend desde `/api/manifesto.php`
- Supabase Auth + Postgres
- Stripe Checkout + Billing
- Google Tag Manager o Google tag opcional
- Despliegue en Vercel con dominio gestionado en IONOS

## Variables de entorno

Usa `.env.example` como base.

| Variable | Uso |
| :-- | :-- |
| `PUBLIC_GTM_ID` | Activa Google Tag Manager si existe |
| `PUBLIC_GOOGLE_TAG_ID` | Activa Google tag si no usas GTM |
| `PUBLIC_SITE_URL` | URL publica del sitio, por ejemplo `https://imperioes.com` |
| `MANIFESTO_FROM_EMAIL` | Remitente del dominio, por ejemplo `Imperio Espanol <noreply@imperioes.com>` |
| `MANIFESTO_MAIL_PROVIDER` | Mantener como `resend` en Vercel |
| `RESEND_API_KEY` | API key de Resend |
| `RESEND_FROM_EMAIL` | Remitente general de emails transaccionales |
| `MANIFESTO_SMTP_*` | Variables legacy de Hostinger; no necesarias en Vercel |
| `MANIFESTO_PDF_URL` | URL absoluta del PDF publico |
| `MANIFESTO_PDF_PATH` | Ruta local del PDF, por defecto `/manifesto-email.pdf` |
| `MANIFESTO_ATTACHMENT_URL` | URL absoluta del PDF que se adjunta al email |
| `MANIFESTO_ATTACHMENT_PATH` | Ruta local del PDF que se adjunta al email, por defecto `/manifesto-email.pdf` |

## Envio del manifiesto por correo

El PDF original pesa alrededor de 94 MB. Para enviar adjuntos de forma fiable se usa la copia comprimida `public/manifesto-email.pdf`, de alrededor de 2.8 MB.

El usuario solo introduce su correo. El endpoint `src/pages/api/manifesto.php.ts` valida la solicitud y pide a Resend que adjunte esa copia publica al correo. No se incluye enlace de descarga en el email.

## Prueba local del envio

Con `.env.local` configurado y `RESEND_API_KEY` disponible, levanta Astro:

```powershell
npm run dev
```

Prueba el formulario en:

```txt
http://localhost:4321/manifiesto
```

Respuesta esperada del endpoint:

```json
{
  "ok": true,
  "message": "Te hemos enviado el manifiesto por correo."
}
```

Revisa bandeja de entrada, spam y promociones.

## Publicacion en Vercel

1. Ejecuta `npm run build`.
2. Sube los cambios al repositorio conectado a Vercel.
3. Configura variables de entorno en Vercel.
4. Comprueba que `https://imperioes.com/manifesto-email.pdf` responde `200`.
5. Prueba el formulario desde `/manifiesto` y revisa spam/promociones en el primer envio.

## Prueba final tras desplegar

Cuando produccion ya este desplegado en Vercel, ejecuta:

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
