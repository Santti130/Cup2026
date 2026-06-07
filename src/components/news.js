import { noticias } from '../data/noticias.js'

// === DECISOR — ¿lista o artículo? ===
export function renderNews() {
    const params = new URLSearchParams(window.location.search)
    const id = params.get('id')

    if (id) {
        return renderArticle(parseInt(id))
    }
    return renderNewsList()
}

// === LISTA DE NOTICIAS ===
function renderNewsList() {
    const section = document.createElement('section')

    // Generar tarjetas alternadas desde los datos
    const tarjetas = noticias.map((noticia, index) => {
        // index par = imagen izquierda, impar = imagen derecha
        const direction = index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'

        return /*html*/`
        <a href="/noticias?id=${noticia.id}" class="group relative flex flex-col ${direction} items-center bg-[#151515] hover:bg-[#1c1c1e] rounded-2xl md:rounded-[2rem] p-3 md:p-4 border border-white/5 shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div class="w-full md:w-5/12 h-52 md:h-72 overflow-hidden rounded-xl md:rounded-[1.5rem]">
                <img src="${noticia.imagen}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" alt="${noticia.titulo}">
            </div>
            <div class="flex-1 px-4 py-4 md:py-6 md:px-12 flex flex-col justify-center">
                <span class="text-zinc-500 text-xs md:text-sm font-semibold tracking-widest uppercase mb-2">${noticia.categoria}</span>
                <h2 class="font-teko text-2xl md:text-4xl text-zinc-100 leading-none">${noticia.titulo}</h2>
                <p class="text-zinc-400 mt-3 md:mt-4 text-base md:text-lg leading-relaxed font-light">${noticia.resumen}</p>
            </div>
        </a>
        `
    }).join('')

    section.innerHTML = /*html*/`
    <div class="relative min-h-screen bg-[#070708] px-6 pb-40">
        <!-- Cuadrícula decorativa -->
        <div class="absolute inset-0 opacity-30 pointer-events-none bg-[linear-gradient(to_right,#ffffff20_1px,transparent_1px),linear-gradient(to_bottom,#ffffff20_1px,transparent_1px)] bg-[size:50px_50px]"></div>

        <!-- Título -->
        <h2 class="font-bebas pt-10 md:pt-15 2xl:pt-20 text-6xl md:text-7xl 2xl:text-8xl text-center text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.25)] tracking-wide hover:drop-shadow-[0_0_35px_rgba(255,255,255,0.4)] transition-all duration-500 cursor-default hover:scale-105 w-fit mx-auto">
            NOTICIAS
        </h2>

        <!-- Tarjetas -->
        <div class="max-w-5xl mx-auto pt-5 md:pt-10 2xl:pt-15 flex flex-col gap-6 md:gap-12 relative z-10">
            ${tarjetas}
        </div>

        <!-- Degradado al footer -->
        <div class="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-b from-transparent to-[#0b1220] pointer-events-none z-20"></div>
    </div>
    `
    return section
}

// === ARTÍCULO INDIVIDUAL ===
function renderArticle(id) {
    const noticia = noticias.find(n => n.id === id)
    const section = document.createElement('section')

    // Noticia no encontrada
    if (!noticia) {
        section.innerHTML = /*html*/`
        <div class="min-h-screen bg-[#070708] pt-30 px-6 flex flex-col items-center justify-center">
            <p class="text-white/60 font-bebas text-2xl tracking-widest">Noticia no encontrada</p>
            <a href="/noticias" class="text-zinc-500 font-bebas tracking-widest text-sm mt-4 hover:text-white transition-colors">← Volver a noticias</a>
        </div>
        `
        return section
    }

    // SEO dinámico — cambia el título y descripción de la página
    document.title = `${noticia.titulo} — Noticias Mundial 2026 | CupHub`
    document.querySelector('meta[name="description"]')?.setAttribute('content', noticia.resumen)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', noticia.titulo)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', noticia.resumen)
    document.querySelector('meta[property="og:image"]')?.setAttribute('content', `https://cuphub-gamma.vercel.app${noticia.imagen}`)

    section.innerHTML = /*html*/`
    <div class="relative min-h-screen bg-[#070708] px-6 pb-80">
        <!-- Cuadrícula decorativa -->
        <div class="absolute inset-0 opacity-30 pointer-events-none bg-[linear-gradient(to_right,#ffffff20_1px,transparent_1px),linear-gradient(to_bottom,#ffffff20_1px,transparent_1px)] bg-[size:50px_50px]"></div>

        <article class="max-w-3xl mx-auto relative z-10 pt-10 md:pt-15 2xl:pt-20">
            <!-- Volver -->
            <a href="/noticias" class="text-zinc-500 font-bebas tracking-widest text-sm hover:text-white transition-colors inline-flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                Volver a noticias
            </a>

            <!-- Categoría y fecha -->
            <div class="flex items-center gap-3 mt-8">
                <span class="text-zinc-500 text-xs font-semibold tracking-widest uppercase">${noticia.categoria}</span>
                <span class="text-zinc-600">·</span>
                <span class="text-zinc-500 text-xs tracking-wider">${noticia.fecha}</span>
            </div>

            <!-- Título -->
            <h2 class="font-teko text-3xl md:text-5xl 2xl:text-6xl text-zinc-100 leading-none mt-4">
                ${noticia.titulo}
            </h2>

            <!-- Imagen -->
            <div class="w-full h-56 md:h-80 2xl:h-96 overflow-hidden rounded-2xl mt-8">
                <img src="${noticia.imagen}" class="w-full h-full object-cover" alt="${noticia.titulo}">
            </div>

            <!-- Contenido -->
            <div class="mt-8 text-zinc-300 text-base md:text-lg leading-relaxed space-y-6">
                ${noticia.contenido}
            </div>
        </article>

        <!-- Degradado al footer -->
        <div class="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-b from-transparent to-[#0b1220] pointer-events-none z-20"></div>
    </div>
    `
    return section
}