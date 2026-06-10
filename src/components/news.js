import { noticias } from '../data/noticias.js'

// === DECISOR — ¿lista o artículo? ===
export function renderNews() {
    const path = window.location.pathname

    // Si la ruta es /noticias/slug → artículo
    if (path.startsWith('/noticias/')) {
        const slug = path.replace('/noticias/', '')
        const noticia = noticias.find(n => n.slug === slug)
        if (noticia) return renderArticle(noticia.id)
    }

    // Si no → lista
    return renderNewsList()
}

// === LISTA DE NOTICIAS ===
function renderNewsList() {
    const section = document.createElement('section')

    const tarjetas = noticias.map((noticia, index) => {
        const direction = index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'

        return /*html*/`
        <a href="/noticias/${noticia.slug}" class="group relative flex flex-col ${direction} items-center bg-white/[0.02] hover:bg-white/[0.04] backdrop-blur-sm rounded-3xl md:rounded-[2.5rem] p-3 md:p-5 border border-white/5 hover:border-white/10 shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
            
            <div class="relative w-full md:w-1/2 h-60 md:h-80 overflow-hidden rounded-2xl md:rounded-[2rem]">
                <div class="absolute inset-0 bg-gradient-to-t from-[#070708]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                <img src="${noticia.imagen}" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" alt="${noticia.titulo}">
            </div>
            
            <div class="flex-1 px-4 py-6 md:py-8 md:px-12 flex flex-col justify-center">
                <div class="flex items-center gap-3 mb-4">
                    <span class="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-zinc-300 text-xs font-semibold tracking-widest uppercase">${noticia.categoria}</span>
                </div>
                
                <h2 class="font-teko text-3xl md:text-5xl text-zinc-100 leading-[1.1] mb-4 group-hover:text-emerald-400 transition-colors duration-300">${noticia.titulo}</h2>
                <p class="text-zinc-400 text-base md:text-lg leading-relaxed font-light line-clamp-3">${noticia.resumen}</p>
                
                <div class="mt-6 flex items-center gap-2 text-sm font-medium tracking-widest uppercase text-zinc-500 group-hover:text-emerald-400 transition-colors">
                    <span>Leer artículo</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                </div>
            </div>
        </a>
        `
    }).join('')

section.innerHTML = /*html*/`
    <div class="relative min-h-screen bg-[#070708] px-4 sm:px-6 pb-40 overflow-hidden">

        <div class="absolute inset-0 opacity-[0.4] pointer-events-none bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:40px_40px] z-[1]"></div>

        <h2 class="font-bebas pt-6 md:pt-16 2xl:pt-20 text-5xl md:text-7xl 2xl:text-8xl text-center text-white tracking-widest w-fit mx-auto relative z-10">
            NOTICIAS
        </h2>

        <div class="max-w-6xl 2xl:max-w-6xl mx-auto pt-4 md:pt-4 2xl:pt-6 flex flex-col gap-8 md:gap-16 relative z-10">
            ${tarjetas}
        </div>
    </div>
`
return section
}

// === ARTÍCULO INDIVIDUAL ===
function renderArticle(id) {
    const noticia = noticias.find(n => n.id === id)
    const section = document.createElement('section')

    if (!noticia) {
        section.innerHTML = /*html*/`
        <div class="min-h-screen bg-[#070708] pt-30 px-6 flex flex-col items-center justify-center">
            <p class="text-white/60 font-bebas text-4xl tracking-widest mb-4">404</p>
            <p class="text-zinc-400 text-lg mb-8">La noticia que buscas no está disponible.</p>
            <a href="/noticias" class="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-zinc-300 font-medium tracking-wide transition-all hover:scale-105">← Volver a noticias</a>
        </div>
        `
        return section
    }

    // SEO dinámico
    document.title = `${noticia.titulo} — Noticias Mundial 2026 | CupHub`
    document.querySelector('meta[name="description"]')?.setAttribute('content', noticia.resumen)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', noticia.titulo)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', noticia.resumen)
    document.querySelector('meta[property="og:image"]')?.setAttribute('content', `https://cuphub-gamma.vercel.app${noticia.imagen}`)

    // Números decorativos por noticia
    const stats = {
        1: { vistas: '4.2K', likes: 318 },
        2: { vistas: '6.8K', likes: 512 },
        3: { vistas: '3.1K', likes: 204 },
        4: { vistas: '5.5K', likes: 431 },
    }
    const stat = stats[id] || { vistas: '1.2K', likes: 98 }

    // Estado like desde localStorage
    const likeKey = `cuphub_like_${id}`
    const likedBefore = localStorage.getItem(likeKey) === 'true'

    section.innerHTML = /*html*/`
    <!-- Toast compartir -->
    <div id="toast-compartir" class="fixed top-3 md:top-12 2xl:top-14  left-1/2 -translate-x-1/2 z-[999] flex items-center gap-2 px-5 py-3 bg-[#111] border border-white/10 rounded-full text-sm text-white shadow-2xl opacity-0 pointer-events-none transition-all duration-300 -translate-y-2">
        <svg class="w-4 h-4 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
        </svg>
        <span>Link copiado</span>
    </div>

    <div class="relative min-h-screen bg-[#070708] pb-40 selection:bg-emerald-500/30">
    <div class="absolute inset-0 opacity-[0.4] pointer-events-none bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:40px_40px] z-[1]"></div>
        <div class="absolute inset-0 opacity-[0.07] pointer-events-none bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:40px_40px]"></div>

        <article class="max-w-4xl 2xl:max-w-6xl mx-auto relative z-10 px-4 sm:px-6">

            <!-- Botón volver -->
            <div class="pt-16 md:pt-24 pb-6">
                <a href="/noticias" class="group inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-zinc-400 hover:text-white font-bebas tracking-widest text-sm transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m15 18-6-6 6-6"/>
                    </svg>
                    Volver a noticias
                </a>
            </div>

            <!-- Tarjeta contenido -->
            <div class="bg-[#0f1623] border border-white/[0.06] rounded-3xl md:rounded-[2rem] p-3 md:p-4 shadow-2xl mb-20">
            <!-- Hero imagen + stats pegada abajo -->
            <div class="relative w-full h-[55vw] max-h-[520px] min-h-[260px] overflow-hidden rounded-2xl md:rounded-[1.5rem]">
                <img src="${noticia.imagen}" class="w-full h-full object-cover" alt="${noticia.titulo}">
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none"></div>

                <!-- Barra stats abajo derecha -->
                <div class="absolute bottom-4 right-4 flex items-center gap-1 sm:gap-2">

                    <!-- Vistas -->
                    <div class="flex items-center gap-1.5 px-3 py-1.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-zinc-300 text-xs font-medium">
                        <svg class="w-3.5 h-3.5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178Z"/>
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                        </svg>
                        <span>${stat.vistas}</span>
                    </div>

                    <!-- Likes -->
                    <button id="btn-like" class="flex items-center gap-1.5 px-3 py-1.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-xs font-medium transition-all duration-200 active:scale-90 ${likedBefore ? 'text-rose-400 border-rose-500/30' : 'text-zinc-300 hover:text-rose-400 hover:border-rose-500/20'}">
                        <svg id="icon-like" class="w-3.5 h-3.5 transition-all duration-200" fill="${likedBefore ? 'currentColor' : 'none'}" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"/>
                        </svg>
                        <span id="count-like">${likedBefore ? stat.likes + 1 : stat.likes}</span>
                    </button>

                    <!-- Compartir -->
                    <button id="btn-compartir" class="flex items-center gap-1.5 px-3 py-1.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-zinc-300 hover:text-white hover:border-white/20 text-xs font-medium transition-all duration-200 active:scale-90">
                    <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 30 30">
                        <path d="M 23 3 C 20.791 3 19 4.791 19 7 C 19 7.2869826 19.034351 7.5660754 19.091797 7.8359375 L 10 12.380859 C 9.2667379 11.541629 8.2018825 11 7 11 C 4.791 11 3 12.791 3 15 C 3 17.209 4.791 19 7 19 C 8.2018825 19 9.2667379 18.458371 10 17.619141 L 19.091797 22.164062 C 19.034351 22.433925 19 22.713017 19 23 C 19 25.209 20.791 27 23 27 C 25.209 27 27 25.209 27 23 C 27 20.791 25.209 19 23 19 C 21.798117 19 20.733262 19.541629 20 20.380859 L 10.908203 15.835938 C 10.965649 15.566075 11 15.286983 11 15 C 11 14.713017 10.965649 14.433925 10.908203 14.164062 L 20 9.6191406 C 20.733262 10.458371 21.798117 11 23 11 C 25.209 11 27 9.209 27 7 C 27 4.791 25.209 3 23 3 z"/>
                    </svg>
                        <span class="hidden sm:inline">Compartir</span>
                    </button>

                </div>
            </div>

            <div class="px-3 md:px-8 2xl:px-12">
                <!-- Categoría • Fecha -->
                <div class="flex items-center gap-2 mt-8 mb-3">
                    <span class="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-bold tracking-widest uppercase">${noticia.categoria}</span>
                    <span class="text-zinc-600 text-sm">•</span>
                    <span class="text-zinc-500 text-sm tracking-wider uppercase font-medium">${noticia.fecha}</span>
                </div>

                <!-- Título -->
                <h1 class="font-teko text-5xl md:text-7xl 2xl:text-8xl text-white leading-[0.9] tracking-tight mb-10">
                    ${noticia.titulo}
                </h1>

                <!-- Contenido -->
                <div class="text-zinc-300 text-lg md:text-xl leading-loose font-light space-y-8 pb-20">
                    ${noticia.contenido}
                </div>
            </div>
            
        </article>

        <div class="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-b from-transparent to-[#0b1220] pointer-events-none z-20"></div>
    </div>
    `

    // === LÓGICA INTERACTIVA ===
    const btnLike = section.querySelector('#btn-like')
    const iconLike = section.querySelector('#icon-like')
    const countLike = section.querySelector('#count-like')
    let liked = likedBefore
    let likesCount = likedBefore ? stat.likes + 1 : stat.likes

    btnLike.addEventListener('click', () => {
        liked = !liked
        localStorage.setItem(likeKey, liked)
        likesCount = liked ? stat.likes + 1 : stat.likes
        countLike.textContent = likesCount
        iconLike.setAttribute('fill', liked ? 'currentColor' : 'none')
        btnLike.classList.toggle('text-rose-400', liked)
        btnLike.classList.toggle('border-rose-500/30', liked)
        btnLike.classList.toggle('text-zinc-300', !liked)
        btnLike.style.transform = 'scale(1.2)'
        setTimeout(() => btnLike.style.transform = '', 150)
    })

    const btnCompartir = section.querySelector('#btn-compartir')
    const toast = section.querySelector('#toast-compartir')

    btnCompartir.addEventListener('click', () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
            toast.classList.remove('opacity-0', 'pointer-events-none', '-translate-y-2')
            toast.classList.add('opacity-100', 'translate-y-0')
            setTimeout(() => {
                toast.classList.add('opacity-0', '-translate-y-2')
                toast.classList.remove('opacity-100', 'translate-y-0')
            }, 2500)
        })
    })

    return section
}