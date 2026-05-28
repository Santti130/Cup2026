# Resumen del Proyecto — Cup 2026
## ¿Qué construimos hasta ahora?

Configuramos el **entorno de desarrollo completo** del proyecto. Esto es como
construir el taller antes de hacer los muebles — no se ve nada espectacular
todavía, pero sin esto nada de lo que viene después funcionaría.

---

## ¿Qué es cada herramienta y para qué la usamos?

### ⚡ Vite
**¿Qué es?**
Vite es una herramienta de desarrollo que hace dos cosas:

1. **Durante el desarrollo** — Arranca un servidor local en tu computador
   (el `localhost:5173` que abriste). Cada vez que guardas un archivo, el
   navegador se actualiza automáticamente sin que hagas nada.

2. **Al publicar** — Toma todo tu código, lo optimiza y lo comprime en la
   carpeta `dist/` lista para subir a Vercel.

**Analogía:** Vite es como el motor de un taller. No lo ves directamente
en el producto final, pero sin él nada funciona.

---

### 🎨 Tailwind CSS
**¿Qué es?**
Es un framework de CSS. En lugar de escribir CSS tradicional así:

```css
/* Sin Tailwind — CSS tradicional */
.titulo {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  color: white;
}
```

Con Tailwind escribes las clases directamente en el HTML:

```html
<!-- Con Tailwind -->
<h1 class="text-4xl font-bold text-center text-white">
  Título
</h1>
```

**¿Por qué es popular?**
- No tienes que inventar nombres de clases
- El diseño queda en el mismo lugar que el HTML
- Tiene utilidades para todo: colores, tamaños, espaciado, responsive, modo oscuro

---

### 📦 Node.js y npm
**¿Qué es Node.js?**
Es un entorno que permite ejecutar JavaScript fuera del navegador,
directamente en tu computador. Sin él no podrías usar Vite ni Tailwind.

**¿Qué es npm?**
Es el gestor de paquetes de Node.js. Cuando escribes `npm install`,
npm va a internet, descarga las herramientas que necesitas y las guarda
en `node_modules/`.

**Analogía:** Node.js es como el sistema operativo del proyecto y
npm es como una tienda de aplicaciones desde la terminal.

---

### 📄 package.json
**¿Qué es?**
Es el documento de identidad del proyecto. Guarda:
- El nombre del proyecto (`cup2026`)
- Qué herramientas usa y en qué versión
- Los comandos disponibles (`npm run dev`, `npm run build`)

**¿Por qué importa?**
Cuando alguien clone tu proyecto de GitHub, solo ejecuta `npm install`
y este archivo le dice exactamente qué instalar. Sin él tendrían que
adivinar qué herramientas usar.

---

### 🗂️ node_modules/
**¿Qué es?**
Es la carpeta donde npm descarga todas las herramientas instaladas.
Pesa bastante y **nunca se sube a GitHub** — por eso existe el `.gitignore`.

**¿Qué es .gitignore?**
Es un archivo que le dice a Git qué carpetas y archivos ignorar.
`node_modules/` siempre va ahí porque cualquiera puede regenerarla
con `npm install`.

---

## ¿Qué archivos creamos y para qué sirve cada uno?

| Archivo | Ubicación | Para qué sirve |
|---|---|---|
| `vite.config.js` | Raíz | Configuración de Vite + conexión con Tailwind |
| `index.html` | Raíz | Página principal, punto de entrada del sitio |
| `main.js` | `src/` | Punto de entrada de JavaScript, carga el CSS |
| `main.css` | `src/css/` | Activa Tailwind en todo el proyecto |

---

## ¿Cómo fluye todo junto?

```
Tú guardas un archivo
        ↓
     Vite detecta el cambio
        ↓
     Procesa main.js → que importa main.css → que carga Tailwind
        ↓
     El navegador se actualiza automáticamente
```

---

## Estructura actual del proyecto

```
CUP2026/
│
├── dist/                  ← Código optimizado para producción (lo genera Vite)
├── node_modules/          ← Herramientas instaladas (no tocar, no subir a GitHub)
├── public/                ← Archivos estáticos (favicon, imágenes globales)
│
├── src/                   ← Todo nuestro código va aquí
│   ├── assets/            ← Imágenes e íconos
│   ├── components/        ← Partes reutilizables (navbar, cards, footer)
│   ├── css/
│   │   └── main.css       ← Activa Tailwind
│   ├── js/                ← Lógica JavaScript
│   └── pages/             ← Páginas del sitio
│
├── .gitignore             ← Le dice a Git qué ignorar
├── index.html             ← Página principal
├── main.js                ← Punto de entrada JS
├── package.json           ← Identidad y dependencias del proyecto
├── package-lock.json      ← Versiones exactas instaladas (no tocar)
├── vite.config.js         ← Configuración de Vite + Tailwind
└── README.md              ← Documentación del proyecto
```

---

## Comandos que ya conocemos

| Comando | Para qué sirve |
|---|---|
| `npm install` | Instala todas las dependencias del proyecto |
| `npm run dev` | Arranca el servidor de desarrollo en localhost |
| `Ctrl + C` | Detiene el servidor de desarrollo |
| `npm run build` | Genera la carpeta dist/ lista para publicar |

---

## ¿Dónde estamos en la hoja de ruta?

| Fase | Estado |
|---|---|
| ✅ Fase 0 — Entorno y configuración | **Completada** |
| 🔄 Fase 1 — HTML base, navegación y diseño | **Siguiente** |
| ⏳ Fase 2 — JavaScript + APIs en vivo | Pendiente |
| ⏳ Fase 3 — Por selección + Vue.js | Pendiente |
| ⏳ Fase 4 — Clima y noticias | Pendiente |
| ⏳ Fase 5 — SEO, Analytics, AdSense | Pendiente |

---

## Lo que viene en la Fase 1

- Diseñar el `index.html` real con Tailwind
- Crear la barra de navegación (`navbar`)
- Crear el footer
- Modo oscuro/claro funcional con un botón
- Estructura visual de la página principal
