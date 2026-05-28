# Tech Stack — Mundial 2026

## 🖥️ Frontend

| Herramienta | Uso | Cuándo |
|---|---|---|
| HTML5 + CSS3 | Estructura y estilos base del sitio | Fase 1 |
| Tailwind CSS | Clases utilitarias para diseño rápido (desktop first) | Fase 1 |
| JavaScript Vanilla | Lógica, dinamismo y consumo de APIs | Fases 1–2 |
| Vue.js | Framework para interfaces complejas y reactivas | Fase 3+ |

---

## 🔌 APIs Externas

| API | Datos que provee | Costo |
|---|---|---|
| API-Football | Partidos, grupos, jugadores, estadísticas del mundial | Gratis con límite |
| OpenWeatherMap | Clima en tiempo real para cada sede | Gratis con límite |
| NewsAPI | Noticias actualizadas del mundial por país | Gratis con límite |

---

## 🛠️ Herramientas de Desarrollo

| Herramienta | Uso | Estado |
|---|---|---|
| VS Code | Editor principal de código | Ya instalado |
| Git + GitHub | Control de versiones y repositorio | Ya instalado |
| Node.js | Entorno para Tailwind y Vite | Ya instalado |
| Vite | Servidor de desarrollo y empaquetador | Lo instalamos juntos |

---

## ☁️ Despliegue y Hosting

| Herramienta | Uso | Costo |
|---|---|---|
| Vercel | Hosting con despliegue automático desde GitHub | Gratis |

---

## 📊 Analytics y Monetización

| Herramienta | Uso | Cuándo |
|---|---|---|
| Google Analytics | Medir tráfico y comportamiento de usuarios | Fase 5 |
| Google AdSense | Banners automáticos para monetizar el tráfico | Fase 5 |
| SEO básico | Meta tags, Open Graph, sitemap para Google | Fase 5 |

---

## 🎨 Decisiones de Diseño

| Decisión | Elección |
|---|---|
| Framework CSS | Tailwind CSS |
| Estrategia responsive | Desktop first |
| Modo oscuro/claro | Sí, desde el inicio |

---

## 🛣️ Hoja de Ruta

| Fase | Contenido |
|---|---|
| Fase 1 | Estructura de carpetas, HTML base, Tailwind, modo oscuro/claro, navegación |
| Fase 2 | JavaScript + APIs: partidos, resultados, grupos en vivo |
| Fase 3 | Filtro por selección, estadísticas, jugadores — migración a Vue.js |
| Fase 4 | Clima por sede, feed de noticias |
| Fase 5 | SEO, Google Analytics, Google AdSense, monetización |



mundial-2026/
│
├── 📄 index.html                  ← Punto de entrada único
├── 📄 package.json                ← Dependencias del proyecto (lo genera Vite)
├── 📄 vite.config.js              ← Configuración de Vite
├── 📄 tailwind.config.js          ← Configuración de Tailwind
├── 📄 .gitignore                  ← Archivos que Git debe ignorar
├── 📄 README.md                   ← Documentación del proyecto
│
├── 📁 src/                        ← Todo el código que escribimos
│   │
│   ├── 📁 assets/                 ← Imágenes, íconos, fuentes
│   │   ├── img/
│   │   └── icons/
│   │
│   ├── 📁 css/                    ← Estilos
│   │   └── main.css               ← Aquí entra Tailwind
│   │
│   ├── 📁 js/                     ← Lógica JavaScript
│   │   ├── api.js                 ← Todas las llamadas a APIs
│   │   ├── partidos.js
│   │   ├── clima.js
│   │   └── noticias.js
│   │
│   ├── 📁 pages/                  ← Páginas HTML
│   │   ├── partidos.html
│   │   ├── grupos.html
│   │   ├── selecciones.html
│   │   ├── estadios.html
│   │   └── noticias.html
│   │
│   └── 📁 components/             ← Partes reutilizables (cards, navbar, etc.)
│       ├── navbar.js
│       ├── footer.js
│       └── card-partido.js
│
└── 📁 dist/                       ← Código final optimizado (lo genera Vite solo)