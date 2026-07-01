# Supabase setup

1. Crea un proyecto en Supabase.
2. Ve a SQL Editor.
3. Ejecuta el contenido de `supabase/migrations/001_initial_schema.sql`.
4. Confirma que existen:
   - `public.profiles`
   - `public.subscriptions`
5. Confirma que Row Level Security esta activado en ambas tablas.
6. Copia:
   - `PUBLIC_SUPABASE_URL`
   - `PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

La migracion incluye `GRANT` explicitos para que las tablas funcionen con proyectos nuevos de Supabase donde la Data API ya no expone tablas publicas automaticamente. Tambien crea las funciones de trigger en el esquema privado `private` para evitar exponer funciones privilegiadas por la API.
