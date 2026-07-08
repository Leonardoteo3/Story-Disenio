# design.md

Sistema de diseño visual del slideshow, extraído del CSS/HTML actuales
(`style.css`, `index.html`) y de las referencias en `inspiracion/` y `ui/`.

## Concepto

"Bento glass": tarjetas de vidrio esmerilado (glassmorphism) flotando sobre un
fondo fotográfico fijo, organizadas en un grid tipo bento box. Estética oscura,
premium, con un acento ámbar como color de acción.

## Layout

- Contenedor principal `.glass-container`: 90vw (máx. 1400px) × 85vh, centrado
  en viewport, `display: grid` con columnas `1.6fr 1fr` (izquierda más ancha
  que derecha), `gap: 25px`, `border-radius: 40px`.
- **Columna izquierda** (`.left-column`, flex column):
  - Fila superior (`.header-row`, 160px de alto): avatar squircle + panel de
    título, lado a lado.
  - Fila inferior (`.text-panel`): cuerpo de texto + contador "Paso X de Y".
- **Columna derecha** (`.right-column`, flex column): panel de imagen a toda
  altura + botón "Siguiente" integrado como panel.
- **Botón "Anterior"** flota fuera del borde izquierdo del contenedor
  (`position: absolute; left: -35px`), no ocupa espacio en el grid.

## Paleta de color

- Fondo de página: imagen (`fondo/magnific_0pRmdObTfW.png`), cover, fija.
- Panel exterior (`.glass-container`): `rgba(30, 30, 35, 0.4)` + blur 20px.
- Paneles internos (`.glass-panel`): `rgba(25, 25, 32, 0.5)`, borde
  `rgba(255,255,255,0.1)`, sombra interior sutil de luz.
- Texto: blanco a distintas opacidades (95% títulos, 85% cuerpo, 50% metadata).
- **Acento primario (acción / progreso):** ámbar `#ffb800`
  (botón Siguiente, anillo de progreso).
- **Acento de éxito (fin de curso):** verde `rgba(46, 204, 113, ...)`
  (botón "Finalizar").
- Botón "Anterior": gris oscuro neutro `rgba(30, 30, 35, 0.9)`, sin color de
  acento — es una acción secundaria.

## Tipografía

- Familia: `'Segoe UI', Roboto, Helvetica, Arial, sans-serif` (system stack,
  sin fuentes web cargadas).
- Título de paso: 1.6rem, weight 600, `text-wrap: balance`.
- Texto de cuerpo: 1.5rem, weight 300 (contraste deliberado: título bold /
  cuerpo liviano).
- Metadata (contador de pasos): 1.1rem, 50% opacidad, en píldora
  (`border-radius: 20px`) sobre fondo `rgba(0,0,0,0.2)`.

## Componente clave: avatar squircle + anillo de progreso

- Avatar no es un círculo: es un cuadrado con esquinas muy redondeadas
  (`border-radius: 26px` sobre imagen de 130×130px) — de ahí "squircle".
- El anillo de progreso es un `<rect>` SVG (no un círculo ni conic-gradient)
  que envuelve el squircle, con `rx=ry=35`, rotado -90° para que el progreso
  empiece arriba. Se anima con `stroke-dashoffset` calculado dinámicamente vía
  JS (`getTotalLength()`), con transición `cubic-bezier(0.4, 0, 0.2, 1)` de
  0.8s — mismo look "squircle" replicado en el trazo de progreso, no solo en
  la imagen.

## Animaciones / motion

- Transición de contenido entre pasos: fade out (300ms) → swap → fade in,
  aplicado a título, texto e imagen a la vez (nunca instantáneo).
- Botón "Anterior": aparece con delay de 1.5s tras cambiar de paso (para no
  competir visualmente con la entrada del nuevo contenido), animación
  `floatIn` con overshoot (`cubic-bezier(0.175, 0.885, 0.32, 1.275)`).
- Botón "Siguiente": pulso continuo (`glowPulse`, halo ámbar) mientras quedan
  pasos por delante; el pulso se apaga y el color cambia a verde en el último
  paso (`finish-btn`), señalizando claramente el cambio de acción.
- Todas las interacciones (`:active`) usan `transform: scale(0.95)` como
  feedback táctil.

## Assets de referencia (no cargados en runtime)

- `inspiracion/`: capturas/imágenes de referencia estética (avatares, mood
  board) que inspiraron el estilo squircle/glass.
- `ui/boceto-ui.png`: boceto original del layout bento que define la
  proporción de columnas y la posición del botón flotante "Anterior".

## Lineamientos para extender el diseño

- Mantener siempre la dupla título-bold / cuerpo-liviano; no usar el mismo
  peso de fuente para ambos.
- Cualquier nuevo estado "final" (como `finish-btn`) debe reservar el verde
  para éxito/cierre y el ámbar para la acción principal en progreso — no
  introducir un tercer color de acento sin necesidad.
- Nuevas imágenes de paso deben mantener el mismo `object-fit: cover` y
  proporción del `.image-panel` para no romper el grid de 85vh fijo.
- Cualquier acción secundaria (como "Anterior") debe permanecer visualmente
  neutra (sin acento de color) para no competir con el CTA principal.
