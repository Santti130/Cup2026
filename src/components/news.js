import { noticias } from '../data/noticias.js'

/* ============================================================================
 * NEWS.JS — Sección de Noticias de CupHub  ·  "The Daily CupHub"
 * ----------------------------------------------------------------------------
 *   /noticias          -> renderNewsList()  = PORTADA estilo periódico (CLARA)
 *   /noticias/<slug>   -> renderArticle()   = ARTÍCULO individual (CLARO)
 *
 * 🗂️  SECCIONES (filtros): cada noticia pertenece a UNA de estas 10 secciones.
 *     En noticias.js agrega el campo  seccion: 'Convocatorias'  (uno de la lista
 *     SECCIONES de abajo). Las 8 noticias viejas se mapean solas (MAPA_LEGACY).
 *
 * 🎨  Contenido del artículo: está escrito con clases de tema OSCURO; el bloque
 *     ".news-articulo .article-body" lo RE-TEMATIZA al papel automáticamente.
 *     => Sigues escribiendo las noticias igual; el CSS las adapta.
 * ==========================================================================*/

/* ----------------------------------------------------------------------------
 * 1) SECCIONES FIJAS  (el orden aquí es el orden de la barra de filtros)
 * --------------------------------------------------------------------------*/
const SECCIONES = [
    'Convocatorias',  // listas de convocados
    'Calendario',     // cuándo y dónde juega cada selección
    'Grupos',         // análisis de cada grupo y rivales
    'Selecciones',    // perfiles y favoritos
    'Figuras',        // jugadores y regresos
    'Sedes',          // estadios y ciudades anfitrionas
    'El Torneo',      // formato y datos generales
    'Resultados',     // crónicas de los partidos del día
    'Previas',        // antesala de cada partido
    'Actualidad',     // última hora y varios
]

// Mapea las categorías viejas de tus 8 noticias a una sección (para que el
// filtro funcione sin tener que editarlas). Para noticias NUEVAS usa `seccion`.
const MAPA_LEGACY = {
    'Sedes Oficiales': 'Sedes',
    'Regresos Históricos': 'Figuras',
    'El Torneo': 'El Torneo',
    'Selección Colombia': 'Convocatorias',
    'Grupo K': 'Grupos',
    'Grupo J': 'Selecciones',
    'Grupo C': 'Grupos',
    'Grupo H': 'Convocatorias',
}

// Devuelve la sección de una noticia: usa `seccion` si existe; si no, deduce.
function seccionDe(n) {
    // Si tiene campo `seccion` explícito, úsalo
    if (n.seccion && SECCIONES.includes(n.seccion)) return n.seccion
    // Si la `categoria` coincide directamente con una sección, úsala
    if (SECCIONES.includes(n.categoria)) return n.categoria
    // Si no, busca en el mapa de categorías viejas
    return MAPA_LEGACY[n.categoria] || 'Actualidad'
}

// Convierte "15 Junio 2026" -> "2026-06-15" (para los datos estructurados)
const MESES = { enero:1, febrero:2, marzo:3, abril:4, mayo:5, junio:6, julio:7, agosto:8, septiembre:9, octubre:10, noviembre:11, diciembre:12 }
function fechaISO(fechaStr) {
    const m = (fechaStr || '').trim().toLowerCase().match(/(\d{1,2})\s+([a-záéíóú]+)\s+(\d{4})/)
    if (!m) return new Date().toISOString().split('T')[0]
    const dia = m[1].padStart(2, '0')
    const mes = String(MESES[m[2]] || 1).padStart(2, '0')
    return `${m[3]}-${mes}-${dia}`
}

/* ----------------------------------------------------------------------------
 * 2) ESTILOS  (Playfair para titulares · Teko para la navegación)
 * --------------------------------------------------------------------------*/
const injectStyles = () => {
    if (document.getElementById('news-styles')) return
    const style = document.createElement('style')
    style.id = 'news-styles'
    style.innerHTML = `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Teko:wght@300..700&display=swap');

        .font-playfair { font-family:'Playfair Display', Georgia, serif; }
        .font-teko     { font-family:'Teko', sans-serif; }

        /* ====================== 🎨 PALETA (un solo lugar) ====================== */
        .news-portada, .news-articulo{
            --paper:#f3f0e9;   /* fondo papel, claro pero cálido */
            --ink:#1c1b18;     /* texto principal */
            --gray:#6c6a63;    /* texto secundario */
            --line:#d7d2c8;    /* reglas/divisores */
            --hover:#9a968c;   /* titular al pasar el cursor = GRIS */
            --accent:#9c2218;  /* acento editorial (kicker / subrayado activo) */
            --emerald:#0a7c54; /* verde oscurecido para contraste */
            --blue:#1f5fa8;    /* azul oscurecido */
            --card:#efece4;    /* fondo de los recuadros retro */
            background:var(--paper); color:var(--ink); min-height:100vh;
        }
        .news-portada *, .news-articulo *{ box-sizing:border-box; }
        .news-portada .kicker, .news-articulo .kicker{
            display:inline-block; font-family:'Plus Jakarta Sans', sans-serif;
            font-size:.6rem; font-weight:700; text-transform:uppercase;
            letter-spacing:.16em; color:var(--accent); margin-bottom:8px;
        }

        /* ============================ PORTADA ============================ */
        /* Más angosto (1080px) para dejar aire a los anuncios sin verse mal */
        .news-portada .container{ max-width:1080px; margin:0 auto; padding:0 24px; }

        /* Barra superior: fecha de hoy · frase · edición */
        .np-bar{
            display:flex; justify-content:space-between; align-items:center;
            padding:52px 0 14px; border-top:1px solid var(--ink);
            font-family:'Plus Jakarta Sans', sans-serif; font-size:.64rem;
            text-transform:uppercase; letter-spacing:.2em; color:var(--gray);
        }
        @media (max-width:760px){ .np-bar .center{ display:none; } }

        /* Cabecera "The Daily CupHub" (Playfair itálica negra) */
        .np-name{
            text-align:center; font-style:italic; font-weight:900;
            font-size:clamp(2.5rem, 7vw, 5.4rem); line-height:1;
            letter-spacing:-.02em; padding:16px 0 18px; border-bottom:1px solid var(--line);
        }

        /* Barra de filtros (funcional) */
        .np-nav{
            display:flex; flex-wrap:wrap; justify-content:center; gap:4px 22px;
            padding:13px 4px; border-bottom:3px solid var(--ink); margin-bottom:36px;
        }
        .np-nav button{
            background:none; border:none; cursor:pointer; font-family:'Teko', sans-serif;
            font-size:1.18rem; line-height:1; text-transform:uppercase; letter-spacing:.06em;
            color:var(--gray); padding:3px 0; position:relative; white-space:nowrap; transition:color .2s ease;
        }
        .np-nav button:hover{ color:var(--ink); }
        .np-nav button.active{ color:var(--ink); }
        .np-nav button.active::after{
            content:''; position:absolute; left:0; right:0; bottom:-3px; height:2px; background:var(--accent);
        }
        @media (max-width:760px){
            .np-nav{ flex-wrap:nowrap; overflow-x:auto; justify-content:flex-start; gap:0 20px; }
            .np-nav::-webkit-scrollbar{ height:0; }
        }

        /* Zona superior: HÉROE (izq) + 3 noticias con foto (der) */
        .np-top{
            display:grid; grid-template-columns:1.55fr 1fr; gap:44px;
            padding-bottom:36px; border-bottom:1px solid var(--line); margin-bottom:40px;
        }
        .np-top.solo{ grid-template-columns:1fr; }  /* cuando la sección tiene 1 sola noticia */

        .np-hero a{ text-decoration:none; color:inherit; display:block; }
        .np-hero .media{ aspect-ratio:16/10; overflow:hidden; border-radius:2px; border:1px solid var(--line); margin-bottom:16px; }
        .np-hero .media img{ width:100%; height:100%; object-fit:cover; filter:grayscale(12%); transition:filter .6s ease, transform .7s cubic-bezier(.2,.6,.2,1); }
        .np-hero a:hover .media img{ filter:grayscale(0); transform:scale(1.02); }
        .np-hero h2{ font-weight:800; font-size:clamp(1.9rem, 3.3vw, 3rem); line-height:1.08; margin:6px 0 14px; transition:color .25s ease; }
        .np-hero a:hover h2{ color:var(--hover); }
        .np-hero .deck{ color:var(--gray); font-size:1.05rem; line-height:1.6; text-align:justify; }

        .np-aside{ border-left:1px solid var(--line); padding-left:44px; display:flex; flex-direction:column; gap:14px; }
        .np-aside .item{ padding-bottom:14px; border-bottom:1px solid var(--line); }
        .np-aside .item:last-child{ padding-bottom:0; border-bottom:none; }
        .np-aside .item a{ display:flex; gap:14px; text-decoration:none; color:inherit; align-items:flex-start; }
        .np-aside .thumb{ flex:0 0 86px; aspect-ratio:1/1; overflow:hidden; border-radius:2px; border:1px solid var(--line); }
        .np-aside .thumb img{ width:100%; height:100%; object-fit:cover; filter:grayscale(12%); transition:filter .5s ease, transform .6s ease; }
        .np-aside .item a:hover .thumb img{ filter:grayscale(0); transform:scale(1.05); }
        .np-aside h3{ font-weight:700; font-size:1.12rem; line-height:1.16; margin-bottom:5px; transition:color .25s ease; }
        .np-aside .item a:hover h3{ color:var(--hover); }
        .np-aside .deck{ color:var(--gray); font-size:.82rem; line-height:1.42; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }

        /* Etiqueta de sección con regla */
        .np-section-label{
            display:flex; align-items:center; gap:16px; font-family:'Plus Jakarta Sans', sans-serif;
            font-size:.72rem; font-weight:700; text-transform:uppercase; letter-spacing:.2em; color:var(--ink); margin:0 0 26px;
        }
        .np-section-label::after{ content:''; flex:1; height:1px; background:var(--line); }

        /* Rejilla inferior: RECUADROS RETRO de periódico */
        .np-grid{ display:grid; grid-template-columns:repeat(4,1fr); gap:22px; padding-bottom:90px; }
        .retro{
            background:var(--card); border:1px solid var(--line); border-top:3px solid var(--ink);
            border-radius:2px; padding:14px; display:flex; flex-direction:column; transition:box-shadow .3s ease;
        }
        .retro:hover{ box-shadow:0 8px 24px rgba(28,27,24,.12); }
        .retro a{ text-decoration:none; color:inherit; display:flex; flex-direction:column; height:100%; }
        .retro .media{ aspect-ratio:16/10; overflow:hidden; border:1px solid var(--line); margin-bottom:12px; }
        .retro .media img{ width:100%; height:100%; object-fit:cover; filter:grayscale(35%) sepia(10%); transition:filter .5s ease, transform .6s ease; }
        .retro:hover .media img{ filter:grayscale(0) sepia(0); transform:scale(1.04); }
        .retro h4{ font-weight:700; font-size:1.04rem; line-height:1.16; margin:2px 0 0; transition:color .25s ease; }
        .retro:hover h4{ color:var(--hover); }
        .retro .date{ font-family:'Plus Jakarta Sans', sans-serif; font-size:.6rem; text-transform:uppercase; letter-spacing:.14em; color:var(--gray); margin-top:auto; padding-top:12px; text-align:right; }

        .np-empty{ text-align:center; color:var(--gray); font-style:italic; font-size:1.3rem; padding:70px 0 110px; }

        /* ============================ ARTÍCULO ============================ */
        .news-articulo .container{ max-width:760px; margin:0 auto; padding-top:20px; padding-right:24px; padding-bottom:120px; padding-left:24px;}
        .news-articulo .art-back{
            display:inline-flex; align-items:center; gap:8px; margin-top:50px;
            font-family:'Plus Jakarta Sans', sans-serif; font-size:.72rem; font-weight:700;
            text-transform:uppercase; letter-spacing:.16em; color:var(--gray); text-decoration:none; transition:color .2s ease;
        }
        .news-articulo .art-back:hover{ color:var(--ink); }
        .news-articulo .art-back svg{ transition:transform .2s ease; }
        .news-articulo .art-back:hover svg{ transform:translateX(-3px); }
        .news-articulo .art-header{ margin:34px 0 26px; }
        .news-articulo .art-title{ font-weight:800; font-size:clamp(2.1rem, 5vw, 3.6rem); line-height:1.06; letter-spacing:-.01em; margin:0; }
        .news-articulo .art-meta{
            display:flex; align-items:center; gap:12px; margin-top:22px; padding-top:18px; border-top:1px solid var(--line);
            font-family:'Plus Jakarta Sans', sans-serif; font-size:.74rem; text-transform:uppercase; letter-spacing:.1em; color:var(--gray);
        }
        .news-articulo .art-hero{ position:relative; margin:0 0 44px; border-radius:3px; overflow:hidden; aspect-ratio:3/2; max-height:540px; border:1px solid var(--line); }
        .news-articulo .art-hero img{ width:100%; height:100%; object-fit:cover; display:block; }
        .news-articulo .art-stats{ position:absolute; right:14px; bottom:14px; display:flex; gap:8px; }
        .news-articulo .art-stats .pill{
            display:inline-flex; align-items:center; gap:6px; padding:7px 12px;
            background:rgba(10,12,16,.62); -webkit-backdrop-filter:blur(8px); backdrop-filter:blur(8px);
            border:1px solid rgba(255,255,255,.14); border-radius:999px; color:#e7e5e0;
            font-family:'Plus Jakarta Sans', sans-serif; font-size:.72rem; font-weight:600; cursor:pointer;
            transition:transform .15s ease, color .2s ease, border-color .2s ease;
        }
        .news-articulo .art-stats .pill:active{ transform:scale(.92); }
        .news-articulo .art-stats .pill.liked{ color:#fb7185; border-color:rgba(251,113,133,.4); }

        .news-articulo .article-body{ font-family:Georgia, 'Iowan Old Style', 'Times New Roman', serif; font-size:1.18rem; line-height:1.85; color:#2a2823; }
        .news-articulo .article-body a{ color:var(--accent); }
        .news-articulo .article-body .text-white,
        .news-articulo .article-body .text-zinc-100,
        .news-articulo .article-body .text-zinc-200{ color:var(--ink) !important; }
        .news-articulo .article-body .text-zinc-300,
        .news-articulo .article-body .text-zinc-400{ color:#4a473f !important; }
        .news-articulo .article-body .text-zinc-500,
        .news-articulo .article-body .text-zinc-600{ color:var(--gray) !important; }
        .news-articulo .article-body [class*="bg-white/"]{ background:#ece8df !important; }
        .news-articulo .article-body [class*="border-white/"]{ border-color:var(--line) !important; }
        .news-articulo .article-body .text-emerald-400{ color:var(--emerald) !important; }
        .news-articulo .article-body [class*="text-emerald-500/"]{ color:rgba(10,124,84,.25) !important; }
        .news-articulo .article-body [class*="bg-emerald-500/"]{ background:rgba(10,124,84,.10) !important; }
        .news-articulo .article-body [class*="border-emerald-500/"]{ border-color:rgba(10,124,84,.28) !important; }
        .news-articulo .article-body .border-emerald-500{ border-color:var(--emerald) !important; }
        .news-articulo .article-body [class*="bg-blue-500/"]{ background:rgba(31,95,168,.10) !important; }
        .news-articulo .article-body [class*="border-blue-500/"]{ border-color:rgba(31,95,168,.25) !important; }
        .news-articulo .article-body .text-blue-200{ color:var(--blue) !important; }
        .news-articulo .article-body [class*="bg-gradient"]{ background:#ece8df !important; }
        .news-articulo .article-body [class*="border-yellow-500/"]{ border-color:var(--line) !important; }
        .news-articulo .article-body .font-teko{ color:var(--ink) !important; }
        .news-articulo .article-body blockquote{ border-radius:0 6px 6px 0 !important; }

        /* ============================ RESPONSIVE ============================ */
        @media (max-width:880px){
            .np-top{ grid-template-columns:1fr; gap:30px; }
            .np-aside{ border-left:none; padding-left:0; border-top:1px solid var(--line); padding-top:28px; }
            .np-grid{ grid-template-columns:repeat(2,1fr); }
        }
        @media (max-width:520px){
            .news-portada .container, .news-articulo .container{ padding-left:18px; padding-right:18px; }
            .news-articulo .container{ padding-top:10px; }
            .news-articulo .art-back{ margin-top:20px; }   /* 👈 asegura que en móvil no haya margen */
            .np-grid{ grid-template-columns:1fr; }
            .np-aside .thumb{ flex-basis:74px; }
            .news-articulo .art-stats .share-label{ display:none; }
        }
    `
    document.head.appendChild(style)
}


/* ----------------------------------------------------------------------------
 * 3) ROUTER
 * --------------------------------------------------------------------------*/
export function renderNews() {
    injectStyles()
    const path = window.location.pathname
    if (path.startsWith('/noticias/')) {
        const slug = path.replace('/noticias/', '')
        const noticia = noticias.find(n => n.slug === slug)
        if (noticia) return renderArticle(noticia.id)
    }
    return renderNewsList()
}


/* ============================================================================
 * 4) PORTADA  —  "The Daily CupHub" con filtros funcionales
 * ==========================================================================*/
function renderNewsList() {
    const section = document.createElement('section')
    section.className = 'news-portada'

    // Fecha de hoy en español (se actualiza sola)
    const hoy = new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    const fechaHoy = hoy.charAt(0).toUpperCase() + hoy.slice(1)

    const navItems = ['Todas', ...SECCIONES]

    section.innerHTML = /*html*/`
        <div class="container mt-30">
            <div class="np-bar">
                <span class="left">${fechaHoy}</span>
                <span class="center">Cobertura Global de la Copa del Mundo</span>
                <span class="right">Edición Especial</span>
            </div>
            <div class="np-name font-playfair">The Daily CupHub</div>
            <nav class="np-nav">
                ${navItems.map(s => `<button data-sec="${s}">${s}</button>`).join('')}
            </nav>
            <div id="news-root"></div>
        </div>
    `

    const root = section.querySelector('#news-root')
    const nav = section.querySelector('.np-nav')

    // --- Plantillas de tarjeta ---
    const tarjetaAside = (n) => /*html*/`
        <div class="item">
            <a href="/noticias/${n.slug}">
                <div class="thumb"><img src="${n.imagen}" alt="${n.titulo}" loading="lazy"></div>
                <div>
                    <span class="kicker">${seccionDe(n)}</span>
                    <h3 class="font-playfair">${n.titulo}</h3>
                    <p class="deck">${n.resumen}</p>
                </div>
            </a>
        </div>`

    const tarjetaRetro = (n) => /*html*/`
        <article class="retro">
            <a href="/noticias/${n.slug}">
                <div class="media"><img src="${n.imagen}" alt="${n.titulo}" loading="lazy"></div>
                <span class="kicker">${seccionDe(n)}</span>
                <h4 class="font-playfair">${n.titulo}</h4>
                <span class="date">${n.fecha}</span>
            </a>
        </article>`

    // --- Pinta la portada según la sección elegida ---
    const pintar = (sec) => {
        const lista = sec === 'Todas' ? noticias : noticias.filter(n => seccionDe(n) === sec)

        if (!lista.length) {
            root.innerHTML = `<p class="np-empty">Aún no hay noticias en “${sec}”.</p>`
            return
        }

        const heroIndex = lista.findIndex(n => n.destacada)
        const hero  = heroIndex !== -1 ? lista[heroIndex] : lista[0]
        const resto = lista.filter(n => n !== hero)
        const aside = resto.slice(0, 4)
        const grid  = resto.slice(4)

        root.innerHTML = /*html*/`
            <div class="np-top${aside.length ? '' : ' solo'}">
                <div class="np-hero">
                    <a href="/noticias/${hero.slug}">
                        <div class="media"><img src="${hero.imagen}" alt="${hero.titulo}" loading="eager"></div>
                        <span class="kicker">${seccionDe(hero)}</span>
                        <h2 class="font-playfair">${hero.titulo}</h2>
                        <p class="deck">${hero.resumen}</p>
                    </a>
                </div>
                ${aside.length ? `<aside class="np-aside">${aside.map(tarjetaAside).join('')}</aside>` : ''}
            </div>
            ${grid.length ? `
                <h2 class="np-section-label">Más noticias</h2>
                <div class="np-grid">${grid.map(tarjetaRetro).join('')}</div>
            ` : ''}
        `
    }

    // --- Conecta los filtros ---
    nav.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
            nav.querySelectorAll('button').forEach(b => b.classList.remove('active'))
            btn.classList.add('active')
            pintar(btn.dataset.sec)
        })
    })

    // Estado inicial: "Todas"
    nav.querySelector('button[data-sec="Todas"]').classList.add('active')
    pintar('Todas')

    return section
}


/* ============================================================================
 * 5) ARTÍCULO  (claro, armónico; titular en Playfair)
 * ==========================================================================*/
function renderArticle(id) {
    const noticia = noticias.find(n => n.id === id)
    const section = document.createElement('section')
    section.className = 'news-articulo'

    if (!noticia) {
        section.innerHTML = /*html*/`
        <div class="container" style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:80vh;text-align:center;">
            <p class="font-playfair" style="font-size:4rem;line-height:1;margin-bottom:8px;font-style:italic;">404</p>
            <p style="color:var(--gray);font-family:'Plus Jakarta Sans',sans-serif;margin-bottom:28px;">La noticia que buscas no está disponible.</p>
            <a class="art-back" href="/noticias">← Volver a noticias</a>
        </div>`
        return section
    }

    // === SEO dinámico + datos estructurados ===
    const urlArticulo = `https://cup-hub.com/noticias/${noticia.slug}`
    const imgArticulo = `https://cup-hub.com${noticia.imagen}`
    const set = (sel, attr, val) => document.querySelector(sel)?.setAttribute(attr, val)

    document.title = `${noticia.titulo} — Noticias Mundial 2026 | CupHub`
    set('meta[name="description"]', 'content', noticia.resumen)
    set('link[rel="canonical"]', 'href', urlArticulo)          // 👈 canonical correcto por artículo
    set('meta[property="og:type"]', 'content', 'article')
    set('meta[property="og:url"]', 'content', urlArticulo)
    set('meta[property="og:title"]', 'content', noticia.titulo)
    set('meta[property="og:description"]', 'content', noticia.resumen)
    set('meta[property="og:image"]', 'content', imgArticulo)
    set('meta[name="twitter:title"]', 'content', noticia.titulo)
    set('meta[name="twitter:description"]', 'content', noticia.resumen)
    set('meta[name="twitter:image"]', 'content', imgArticulo)

    // Datos estructurados NewsArticle (Google los usa para Noticias / resultados enriquecidos)
    const ld = {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "headline": noticia.titulo,
        "image": [imgArticulo],
        "datePublished": fechaISO(noticia.fecha),
        "dateModified": fechaISO(noticia.fecha),
        "author": { "@type": "Organization", "name": "CupHub", "url": "https://cup-hub.com" },
        "publisher": {
            "@type": "Organization",
            "name": "CupHub",
            "logo": { "@type": "ImageObject", "url": "https://cup-hub.com/icons/WorldCup.png" }
        },
        "description": noticia.resumen,
        "mainEntityOfPage": { "@type": "WebPage", "@id": urlArticulo }
    }
    let ldScript = document.getElementById('ld-noticia')
    if (!ldScript) {
        ldScript = document.createElement('script')
        ldScript.type = 'application/ld+json'
        ldScript.id = 'ld-noticia'
        document.head.appendChild(ldScript)
    }
    ldScript.textContent = JSON.stringify(ld)

    const stats = {
        1: { vistas: '4.2K', likes: 318 },
        2: { vistas: '6.8K', likes: 512 },
        3: { vistas: '3.1K', likes: 204 },
        4: { vistas: '5.5K', likes: 431 },
    }
    const stat = stats[id] || { vistas: '1.2K', likes: 98 }

    const likeKey = `cuphub_like_${id}`
    const likedBefore = localStorage.getItem(likeKey) === 'true'

    section.innerHTML = /*html*/`
    <div id="toast-compartir" style="position:fixed;top:18px;left:50%;transform:translate(-50%,-8px);z-index:999;display:flex;align-items:center;gap:8px;padding:11px 18px;background:#1c1b18;color:#fff;border-radius:999px;font-family:'Plus Jakarta Sans',sans-serif;font-size:.85rem;box-shadow:0 10px 30px rgba(0,0,0,.25);opacity:0;pointer-events:none;transition:all .3s ease;">
        <svg style="width:16px;height:16px;color:#34d399;flex-shrink:0;" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
        <span>Link copiado</span>
    </div>

    <div class="container">
        <a class="art-back" href="/noticias">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            Volver a noticias
        </a>

        <header class="art-header">
            <span class="kicker">${seccionDe(noticia)}</span>
            <h1 class="art-title font-playfair">${noticia.titulo}</h1>
            <div class="art-meta">
                <span>${noticia.fecha}</span><span>·</span><span>CupHub</span>
            </div>
        </header>

        <figure class="art-hero">
            <img src="${noticia.imagen}" alt="${noticia.titulo}">
            <div class="art-stats">
                <span class="pill" title="Vistas">
                    <svg style="width:14px;height:14px" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/></svg>
                    <span>${stat.vistas}</span>
                </span>
                <button id="btn-like" class="pill ${likedBefore ? 'liked' : ''}">
                    <svg id="icon-like" style="width:14px;height:14px" fill="${likedBefore ? 'currentColor' : 'none'}" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"/></svg>
                    <span id="count-like">${likedBefore ? stat.likes + 1 : stat.likes}</span>
                </button>
                <button id="btn-compartir" class="pill">
                    <svg style="width:14px;height:14px" fill="currentColor" viewBox="0 0 30 30"><path d="M 23 3 C 20.791 3 19 4.791 19 7 C 19 7.2869826 19.034351 7.5660754 19.091797 7.8359375 L 10 12.380859 C 9.2667379 11.541629 8.2018825 11 7 11 C 4.791 11 3 12.791 3 15 C 3 17.209 4.791 19 7 19 C 8.2018825 19 9.2667379 18.458371 10 17.619141 L 19.091797 22.164062 C 19.034351 22.433925 19 22.713017 19 23 C 19 25.209 20.791 27 23 27 C 25.209 27 27 25.209 27 23 C 27 20.791 25.209 19 23 19 C 21.798117 19 20.733262 19.541629 20 20.380859 L 10.908203 15.835938 C 10.965649 15.566075 11 15.286983 11 15 C 11 14.713017 10.965649 14.433925 10.908203 14.164062 L 20 9.6191406 C 20.733262 10.458371 21.798117 11 23 11 C 25.209 11 27 9.209 27 7 C 27 4.791 25.209 3 23 3 z"/></svg>
                    <span class="share-label">Compartir</span>
                </button>
            </div>
        </figure>

        <div class="article-body">${noticia.contenido}</div>
    </div>
    `

    // LIKE
    const btnLike = section.querySelector('#btn-like')
    const iconLike = section.querySelector('#icon-like')
    const countLike = section.querySelector('#count-like')
    let liked = likedBefore
    btnLike.addEventListener('click', () => {
        liked = !liked
        localStorage.setItem(likeKey, liked)
        countLike.textContent = liked ? stat.likes + 1 : stat.likes
        iconLike.setAttribute('fill', liked ? 'currentColor' : 'none')
        btnLike.classList.toggle('liked', liked)
        btnLike.style.transform = 'scale(1.18)'
        setTimeout(() => btnLike.style.transform = '', 150)
    })

    // COMPARTIR
    const btnCompartir = section.querySelector('#btn-compartir')
    const toast = section.querySelector('#toast-compartir')
    btnCompartir.addEventListener('click', () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
            toast.style.opacity = '1'; toast.style.transform = 'translate(-50%, 0)'
            setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translate(-50%, -8px)' }, 2500)
        })
    })

    return section
}