# 🤸 EF en casa · Aula virtual de Educación Física

Modo **no presencial** de la Programación Didáctica de Educación Física
(5º de Educación Primaria · Curso 2025-2026), de **Laura de los Ángeles Hernández Sierra**.

## ¿Qué es?

Un sitio web moderno y animado donde el alumnado puede:

- 📅 Consultar la **temporalización** del curso (3 trimestres, 9 Unidades de Programación).
- 🎒 Entrar en cada **unidad didáctica** con su reto, criterios de evaluación, saberes básicos y productos.
- 💪 Realizar las **54 actividades** (6 por unidad), cada una con vídeo, pasos guiados y entrega para Classroom.
- ✅ Marcar actividades como completadas (el progreso se guarda en el dispositivo).

## Fundamentación pedagógica

- **Secuencia de M. David Merrill** (Primeros Principios de Instrucción): cada unidad gira en torno a un
  reto real y sus actividades siguen las fases **Activación 🔥 → Demostración 👀 → Aplicación 💪 → Integración 🚀**.
- **Inteligencias Múltiples de Howard Gardner**: cada actividad está etiquetada con las inteligencias
  que pone en juego (lingüística, lógico-matemática, espacial, corporal, musical, interpersonal,
  intrapersonal y naturalista).

## ⚠️ Vídeos provisionales

Los vídeos de YouTube enlazados son **de fachada** (marcadores de posición). Para sustituirlos:

1. Abre `js/data.js`.
2. Busca la actividad y cambia el campo `video` por el **ID** del vídeo definitivo
   (el ID es lo que aparece después de `watch?v=` en la URL de YouTube).

```js
// Ejemplo: https://www.youtube.com/watch?v=ABC123xyz89  →  video: "ABC123xyz89"
video: "ABC123xyz89",
```

Cada actividad muestra un aviso «Vídeo de muestra (provisional)» que puedes eliminar en
`js/app.js` (busca `video-note`) cuando todos los vídeos sean definitivos.

## Estructura

```
index.html        → página única (SPA)
css/styles.css    → estilos (mobile-first, animaciones)
js/data.js        → TODO el contenido: unidades, actividades, vídeos
js/app.js         → navegación, progreso y animaciones
```

## Cómo publicarlo

No necesita instalación ni servidor: es un sitio estático.

- **GitHub Pages**: Settings → Pages → Deploy from branch → rama y carpeta `/ (root)`.
- **Local**: abre `index.html` en el navegador, o sirve la carpeta con `python3 -m http.server`.

Funciona perfectamente en **móviles y tablets** (menú hamburguesa, diseño responsive y táctil).
