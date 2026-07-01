# Stat Counter Cards

## Qué hace

Replica las cartas de estadísticas de la sección “Nosotros”: una cuadrícula de tarjetas oscuras con números grandes en verde neón, texto técnico en mayúsculas, hover con elevación y una barra lateral que aparece al pasar el cursor. Los números se animan desde 0 hasta su valor cuando la sección entra en pantalla.

También incluye el botón inclinado “Ver eventos”, porque forma parte de la apariencia de esa zona.

## Archivos originales analizados

- `index.html`
- `Style.css`
- `Animation.js`

## Cómo integrarlo en otra web

1. Copia el bloque de `html.md` en tu página.
2. Copia `css.css` en tu hoja de estilos o enlázalo como archivo separado.
3. Copia `script.js` si quieres el reveal y el contador animado.
4. Cambia los textos y cifras dentro de `.stat-number` y `.stat-label`.
5. Ajusta el enlace del botón `.stats-cta` para apuntar a la sección que corresponda.

## HTML necesario

Ver `html.md`.

## CSS necesario

Ver `css.css`.

## JavaScript necesario

Ver `script.js`. El JS hace dos cosas:

- Añade `.visible` a los elementos `.reveal` cuando entran en pantalla.
- Anima los valores de `.stat-number` una sola vez cuando `.about-stats` se ve en el viewport.

## Backend necesario

No aplica. Esta funcionalidad es de front-end.

## Dependencias

- No necesita librerías externas.
- Recomendado: cargar `Bebas Neue`, `JetBrains Mono` y `Space Grotesk`.

```html
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=JetBrains+Mono:wght@400;700&family=Space+Grotesk:wght@400;600;700&display=swap" rel="stylesheet">
```

## Variables o selectores importantes

- `.stats-showcase`: layout general de texto + cartas.
- `.stats-cta`: botón inclinado verde.
- `.about-stats`: cuadrícula de cartas.
- `.stat-card`: tarjeta con hover.
- `.stat-card::before`: barra lateral verde animada.
- `.stat-number`: número que se anima.
- `.stat-label`: etiqueta descriptiva.
- `.reveal` y `.reveal.visible`: animación de entrada.

## Riesgos o ajustes recomendados

- El contador solo detecta un número por tarjeta. Funciona con formatos como `+150`, `7`, `+20` o `40+`.
- Si el número tiene decimales, habría que adaptar la expresión regular y el redondeo.
- Si ya tienes un sistema de reveal en tu web, puedes eliminar la primera parte de `script.js` y conservar solo el contador.
- En móvil la cuadrícula pasa a una columna para mantener legibilidad.
