# CupHub — README del Proyecto

> **Última actualización:** 20 Junio 2026
> **Estado:** En producción, Mundial 2026 en curso (Fase de Grupos)

---

## 🏗️ Datos del Proyecto

| Campo | Valor |
|---|---|
| **URL producción** | https://cup-hub.com |
| **URL legacy** | https://cuphub-gamma.vercel.app (sigue activa) |
| **Repositorio** | https://github.com/Santti130/Cup2026.git |
| **Branch** | `master` |
| **Git user** | Santti130 / santti130@users.noreply.github.com |
| **Stack** | Vanilla JS, Vite v8, Tailwind CSS v4, Vercel Hobby |
| **Node** | v24.15.0 |
| **Dominio** | Cloudflare (~$10.46/año) |
| **API datos** | API-Football (v3.football.api-sports.io) — key en `.env` como `VITE_API_FOOTBALL_KEY` |
| **Analytics** | Google Analytics `G-0KMRY9054T` |
| **Search Console** | Verificación: `c-Ti5MKt-ZFeV_K2MSwsRjdnwtcHXN6eiIXQOc9dRo4` |
| **AdSense** | Publisher ID: `pub-2567978542585707` — EN REVISIÓN (solicitado 19 Jun 2026) |

---

## 📁 Estructura de Archivos Clave

```
CUP2026/
├── index.html                    ← Página principal (countdown + partidos del día)
├── vercel.json                   ← Rewrites para URLs limpias
├── vite.config.js                ← Entry points de todas las páginas
├── package.json                  ← Scripts: dev, build, sitemap, optimize-images
├── .env                          ← VITE_API_FOOTBALL_KEY (no se sube a git)
├── public/
│   ├── sitemap.xml               ← Generado por script, NO editar manualmente
│   ├── robots.txt
│   ├── ads.txt                   ← Para AdSense
│   ├── icons/                    ← Logos del navbar/footer (ya en .webp, redimensionados a 240px)
│   ├── img/                      ← Fondos y recursos generales
│   │   └── proximamente.webp     ← Imagen del anuncio "Próximas competiciones"
│   └── news-img/                 ← Imágenes de noticias (todas en .webp)
├── scripts/
│   ├── generate-sitemap.js       ← npm run sitemap
│   └── optimize-images.js        ← npm run optimize-images (convierte + redimensiona a WebP)
├── src/
│   ├── main.js                   ← Entry point principal
│   ├── css/
│   │   └── main.css              ← Tailwind + estilos custom (orbs, panel expandible, reveal)
│   ├── components/
│   │   ├── navbar.js
│   │   ├── footer.js
│   │   ├── countdown.js          ← Sección hero: cuenta regresiva + partidos del día + anuncio próximas competiciones
│   │   ├── calendar.js           ← Sección calendario: partidos por día con filtros
│   │   ├── groups.js             ← Tabla de posiciones de los 12 grupos
│   │   └── news.js               ← Sección noticias: "The Daily CupHub"
│   ├── data/
│   │   └── noticias.js           ← Array de objetos con todas las noticias
│   └── pages/
│       ├── calendario.html
│       ├── grupos.html
│       ├── noticias.html
│       ├── privacidad.html
│       ├── terminos.html
│       └── acerca.html
```

---

## ⚙️ Configuración Crítica

### vercel.json (rewrites actuales)
```json
{
    "rewrites": [
        { "source": "/calendario", "destination": "/src/pages/calendario.html" },
        { "source": "/grupos", "destination": "/src/pages/grupos.html" },
        { "source": "/noticias", "destination": "/src/pages/noticias.html" },
        { "source": "/noticias/:slug", "destination": "/src/pages/noticias.html" },
        { "source": "/privacidad", "destination": "/src/pages/privacidad.html" },
        { "source": "/terminos", "destination": "/src/pages/terminos.html" },
        { "source": "/acerca", "destination": "/src/pages/acerca.html" }
    ],
    "headers": [
        { "source": "/sitemap.xml", "headers": [{ "key": "Content-Type", "value": "application/xml" }] }
    ],
    "buildCommand": "npm run build",
    "outputDirectory": "dist"
}
```

### vite.config.js (entry points)
Todas las páginas HTML deben estar como entry points en `rollupOptions.input`, o Vercel dará 404. Si se agrega una nueva página HTML, agregarla aquí Y en vercel.json.

### Tailwind CSS v4 — Patrón importante
Las clases dinámicas agregadas por JavaScript NO funcionan con Tailwind v4 (no las compila). Usar clases CSS planas en `main.css` en su lugar. Ejemplo:
- ❌ `panel.classList.add('grid-rows-[1fr]')` — no funciona
- ✅ `panel.classList.add('is-open')` + CSS: `.info-panel.is-open { grid-template-rows: 1fr; }`

---

## 📰 Sistema de Noticias

### Estructura de una noticia en `noticias.js`
```javascript
{
    id: 18,                          // Incremental único
    destacada: true,                 // Solo UNA puede tener true (define el héroe)
    slug: 'colombia-vence-uzbekistan-debut-mundial-2026',
    categoria: 'Resultados',         // Debe ser una de las 10 válidas
    titulo: 'TÍTULO EN MAYÚSCULAS',
    resumen: 'Resumen corto para la tarjeta y meta description.',
    imagen: '/news-img/NombreImagen.webp',
    fecha: '17 Junio 2026',
    contenido: (() => { return `HTML del artículo` })()
}
```

### Categorías válidas (10)
`'Convocatorias'`, `'Calendario'`, `'Grupos'`, `'Selecciones'`, `'Figuras'`, `'Sedes'`, `'El Torneo'`, `'Resultados'`, `'Previas'`, `'Actualidad'`

### Plantilla de contenido para noticias de resultados
- Letra capital (`first-letter:text-black`)
- Bloque resultado final (grid 2 cols)
- Bloque goles del partido (con array .map())
- Crónica del partido con h3 "CÓMO SE VIVIÓ EL PARTIDO"
- Blockquote con declaraciones (SVG de comillas + footer con nombre)
- Figura del partido (grid 3 cols con stats)
- Tabla del grupo (si aplica)
- Párrafo de cierre en recuadro con borde

### Flujo para agregar una noticia nueva
1. Agregar objeto a `src/data/noticias.js`
2. Si es la noticia del día: `destacada: true` (quitar de la anterior)
3. Poner imagen en `public/news-img/`
4. `npm run optimize-images`
5. Referenciar `.webp` en la noticia
6. `npm run sitemap`
7. `git add . && git commit -m "..." && git push origin master`

---

## 🎨 Estilo Visual y Decisiones de Diseño

### Filosofía
Estilo **Apple**: minimalista, mucho aire, animaciones suaves con `cubic-bezier(0.16, 1, 0.3, 1)`, sin sombras pesadas ni glassmorphism exagerado. Bordes sutiles (`black/[0.06]`). Colores base: `#0b1220` (fondo oscuro), `#1d1d1f` (texto Apple sobre fondo claro), `#f5f1e8` (fondo de tarjetas).

### Elementos de diseño implementados
- **Orbs flotantes CSS**: esferas de luz difuminadas (violeta, esmeralda, azul, ámbar) que flotan con keyframes. Peso: 0 bytes.
- **Parallax al scroll**: los orbs se mueven a diferentes velocidades via JS (`data-speed`).
- **Reveal al scroll**: elementos con clase `reveal-on-scroll` aparecen con fade + translateY al entrar en viewport (IntersectionObserver). Se repite cada vez, no solo la primera.
- **Banderas circulares**: recortadas en círculo vía clase `.flag-circle` en CSS.
- **Panel expandible**: animado con `grid-template-rows: 0fr → 1fr` (clase `.is-open`).
- **Tarjeta de partido (calendario)**: grid de 3 columnas fijas, bandera arriba, nombre abajo. Ganador en bold, perdedor en gris. Toda la tarjeta es clickable.
- **Tarjeta de partido (countdown desktop)**: flip 3D al hover con info del estadio y clima real (API Open-Meteo).

### Fonts
- **Plus Jakarta Sans**: texto general
- **Bebas Neue**: títulos y tracking widest
- **Teko**: números y etiquetas en noticias

### CSS custom en main.css
- `.flag-circle` — banderas circulares
- `.info-panel` / `.is-open` — panel expandible
- `.chevron` / `.is-rotated` — flecha que gira
- `.match-card` + `@keyframes cardFadeIn` — entrada escalonada de tarjetas
- `.cal-orb-*` — orbs del calendario
- `.cd-orb-*` — orbs del countdown (más vibrantes, con parallax)
- `.reveal-on-scroll` / `.is-visible` — aparición al scroll

---

## 🚀 Rendimiento (PageSpeed 20 Jun 2026)

### Estado actual
| Métrica | Desktop | Móvil |
|---|---|---|
| **Performance** | 74 | 70 |
| **LCP** | 1.8s | 5.0s |
| **CLS** | 0.112 | 0.112 |
| **Accessibility** | 92 | 90 |
| **Best Practices** | 100 | 100 |
| **SEO** | 100 | 100 |
| **Payload total** | ~2.9 MB | ~2.9 MB |

### Progreso logrado
- LCP móvil: 56.8s → 5.0s (reducción del 91%)
- CLS: 0.972 → 0.112 (reducción del 88%)
- Payload: 12.6 MB → 2.9 MB (reducción del 77%)
- Íconos navbar/footer: 10 MB → ~30 KB

### Problemas de rendimiento conocidos pendientes
- **Render-blocking fonts** (Google Fonts ~750ms): agregar `display=swap` + `preload`
- **CLS residual** (0.112): el footer con el logo del Mundial sigue causando un layout shift menor
- **Logos de la API** (~89 KB c/u): vienen de servidor externo, no se pueden optimizar. En calendario ya se usan banderas flagcdn. En countdown desktop aún cargan algunos.
- **AdSense scripts** (~220 KB JS no utilizado): no controlable, es de Google

---

## 📋 ToDo — Pendientes por prioridad

### 🔴 Prioridad Alta
1. **Prerender**: convertir cada noticia a HTML estático para indexación rápida. El 90% del tráfico depende de empuje manual. Sin esto, Google no indexa bien las noticias (son renderizadas por JS).
2. **Sistema de orden de noticias**: agregar campo `orden` numérico para controlar el orden sin mover bloques de código.
3. **Sección de Estadísticas** (`cup-hub.com/estadisticas`): goleadores, asistencias, tarjetas, ranking FIFA. Genera tráfico orgánico pasivo ("goleadores mundial 2026").

### 🟡 Prioridad Media
4. **Categorías a prueba de errores**: validación que avise si una noticia tiene categoría inválida.
5. **AdSense**: esperando aprobación. Cuando aprueben, colocar anuncios.
6. **Velocidad residual**: fonts bloqueantes, CLS del footer.

### 🟢 Prioridad Baja
7. **Engagement**: predicciones, álbum de figuritas, notificaciones push, quiz, comparador de selecciones, brackets.
8. **Post-Mundial**: arquitectura multi-competencia, campo `competencia` en noticias, secciones por torneo en navbar, rebrand "CupHub — Live Every Cup".
9. **Técnico**: migrar a SSR/SSG (Astro/Next.js), Service Worker, automatizar sitemap y optimize-images en build.

---

## 📊 Métricas de Analytics (últimos 30 días al 19 Jun 2026)

- **Usuarios nuevos:** 509
- **Usuarios activos:** 508
- **Sesión promedio:** 8m 25s (muy por encima del benchmark de Sports)
- **Organic Search:** 75 de 736 sesiones (~10%) — el 90% viene de empuje manual
- **Países top:** Argentina (104), Colombia (97), México (46), España (42), USA (31)
- **Páginas más vistas:** Home (3.4K), Calendario (1.7K), Grupos (225)
- **Noticias:** 8-12 vistas por artículo (problema de indexación, no de calidad)

---

## 🔧 Scripts disponibles

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo (Vite) |
| `npm run build` | Build de producción → `dist/` |
| `npm run sitemap` | Genera `public/sitemap.xml` con todas las URLs incluyendo noticias |
| `npm run optimize-images` | Convierte PNG/JPG a WebP + redimensiona (icons→240px, news→1200px, img→1920px) |

---

## 🧑‍💻 Sobre el Usuario

**Santi** (Santiago Lozano) — Colombia. Comunica en español. Estudiante de ingeniería de software (5to semestre) con background en IT/infra. Está pivoteando a cybersecurity (Red Team). CupHub es su proyecto personal de media deportiva.

### Preferencias de trabajo
- Recibir archivos completos en vez de snippets parciales
- Usa Windows
- Formato git: `git add . && git commit -m "..." && git push origin master`
- No le gusta que le den pasos confusos o fragmentados — prefiere todo junto y paso a paso
- Le gusta el diseño minimalista estilo Apple, premium, sin dorado ni glassmorphism
- Las noticias las redacta con estilo periodístico propio, no quiere copiar de fuentes

### Redes del proyecto
- Instagram, TikTok, X: @cuphub
- Reddit: publica en r/worldcup, r/soccer, r/futbol
- Contenido en español

---

## ⚠️ Errores comunes a evitar

1. **404 en producción**: si agregas una nueva página HTML, debe estar en `vite.config.js` (input) Y en `vercel.json` (rewrite). Sin ambos, 404.
2. **Clases dinámicas de Tailwind**: no usar clases como `grid-rows-[1fr]` en JavaScript. Tailwind v4 no las compila. Usar CSS plano con clases como `is-open`.
3. **Imágenes nuevas**: siempre correr `npm run optimize-images` antes del commit. Las imágenes se guardan en `public/news-img/` como PNG/JPG y el script las convierte a WebP. Referenciar siempre `.webp` en el código.
4. **Sitemap**: correr `npm run sitemap` cuando se agregan noticias. El `dist/sitemap.xml` se genera automáticamente en el build de Vercel — nunca editarlo.
5. **Destacada**: solo una noticia puede tener `destacada: true`. Quitar de la anterior cuando se pone una nueva.
6. **Cache del navegador**: la API se cachea 60 segundos en localStorage (`cuphub_fixtures_cache_v2`). Si los datos parecen viejos, limpiar localStorage.
7. **AdSense**: NO hacer clic en los propios anuncios cuando estén activos. Google banea la cuenta.