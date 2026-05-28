import { fixture } from '../data/fixture.js'

// ================================================
// ESTADO — variables que controlan qué se muestra
let diaActual = 0
let filtros = {
    estado: 'todos',
    grupo: 'todos',
    fase: 'todos'
}

// ================================================
// FUNCIÓN PRINCIPAL — crea toda la sección del calendario
export function renderCalendar() {

    const section = document.createElement('section')
    section.className = 'relative flex flex-col items-center overflow-hidden bg-[url(/src/assets/img/fondo-home-plantilla2.png)] bg-cover bg-center bg-no-repeat pt-20 pb-24 px-6'
    section.style.minHeight = '100vh'
    section.innerHTML = /*html*/`
        <!-- FONDO DECORATIVO — cuadrícula sutil -->
        <div class="absolute inset-0 opacity-30 pointer-events-none bg-[linear-gradient(to_right,#ffffff20_1px,transparent_1px),linear-gradient(to_bottom,#ffffff20_1px,transparent_1px)] bg-[size:50px_50px]"></div>

        <!-- CAPA OSCURA sobre la imagen de fondo -->
        <div class="absolute inset-0 md:bg-black/22 2xl:bg-black/25 pointer-events-none"></div>

        <!-- CONTENEDOR PRINCIPAL -->
    <div class="relative w-full 2xl:mt-2 max-w-4xl flex flex-col items-center md:gap-5 2xl:gap-10">

<h1 class="text-3xl md:text-6xl 2xl:text-7xl font-extrabold font-bebas text-white tracking-widest uppercase">
    Calendario
</h1>

        <!-- NAVEGACIÓN — flechas, carrusel, paginación y filtros -->
        <div id="navigation-wrapper" class="w-full flex flex-col items-center gap-4">
            <!-- Flechas y nombre del día -->
            <div class="w-full flex items-center justify-center gap-4">
                <button id="skip-prev" class="text-white/30 hover:text-white/60 w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m11 17-5-5 5-5"/><path d="m18 17-5-5 5-5"/></svg>
                </button>
                <button id="prev" class="text-white/40 hover:text-white/80 w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                </button>
                <div id="day-carousel" class="flex items-center gap-4 min-w-[300px] md:min-w-[500px] justify-center"></div>
                <button id="next" class="text-white/40 hover:text-white/80 w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </button>
                <button id="skip-next" class="text-white/30 hover:text-white/60 w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 17 5-5-5-5"/><path d="m13 17 5-5-5-5"/></svg>
                </button>
            </div>
            <!-- Paginación (números) centrada + Filtro a la derecha -->
            <div class="flex items-center w-full">
                <div class="w-1/3"></div>
                <div id="day-counter" class="flex items-center justify-center gap-1 w-1/3"></div>
                <div class="w-1/3 flex justify-end">
                    <button id="toggle-filtros" class="px-5 py-2 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 text-white md:text-sm 2xl:text-base font-bebas tracking-widest transition-all flex items-center gap-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
                        Filtros
                    </button>
                </div>
            </div>
        </div>

            <!-- MENSAJE DE FILTRO ACTIVO — aparece cuando hay un filtro seleccionado -->
            <div id="filter-info" class="hidden items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
                <span id="filter-info-text" class="text-white/80 text-sm font-bebas tracking-widest"></span>
                <button id="clear-filters" class="text-white/60 hover:text-red-400 text-sm transition-colors">✕</button>
            </div>

            <!-- PANEL DE FILTROS — oculto por defecto -->
            <div id="filtros-panel" class="hidden w-full max-w-2xl bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex-col gap-5">
                <!-- Filtro: Estado -->
                <div class="flex flex-col gap-2">
                    <label class="text-white/60 md:text-md 2xl:text-xl uppercase tracking-widest font-bebas">Estado</label>
                    <div class="flex gap-2 flex-wrap" id="filtro-estado">
                        <button data-value="todos" class="filtro-btn px-3 py-1.5 rounded-lg bg-white text-black text-xs font-semibold transition-all">Todos</button>
                        <button data-value="en-vivo" class="filtro-btn px-3 py-1.5 rounded-lg bg-white/10 text-white/80 text-xs transition-all hover:bg-white/20">En vivo</button>
                        <button data-value="proximo" class="filtro-btn px-3 py-1.5 rounded-lg bg-white/10 text-white/80 text-xs transition-all hover:bg-white/20">Próximo</button>
                        <button data-value="resultado" class="filtro-btn px-3 py-1.5 rounded-lg bg-white/10 text-white/80 text-xs transition-all hover:bg-white/20">Resultado</button>
                    </div>
                </div>
                <!-- Filtro: Grupo -->
                <div class="flex flex-col gap-2">
                    <label class="text-white/60 md:text-md 2xl:text-xl uppercase tracking-widest font-bebas">Grupo</label>
                    <div class="flex gap-2 flex-wrap" id="filtro-grupo">
                        <button data-value="todos" class="filtro-btn px-3 py-1.5 rounded-lg bg-white text-black text-xs font-semibold transition-all">Todos</button>
                        ${['A','B','C','D','E','F','G','H','I','J','K','L'].map(g => `<button data-value="${g}" class="filtro-btn px-3 py-1.5 rounded-lg bg-white/10 text-white/80 text-xs transition-all hover:bg-white/20">${g}</button>`).join('')}
                    </div>
                </div>
                <!-- Filtro: Fase -->
                <div class="flex flex-col gap-2">
                    <label class="text-white/60 md:text-md 2xl:text-xl uppercase tracking-widest font-bebas">Fase</label>
                    <div class="flex gap-2 flex-wrap" id="filtro-fase">
                        <button data-value="todos" class="filtro-btn px-3 py-1.5 rounded-lg bg-white text-black text-xs font-semibold transition-all">Todos</button>
                        <button data-value="Fase de Grupos" class="filtro-btn px-3 py-1.5 rounded-lg bg-white/10 text-white/80 text-xs transition-all hover:bg-white/20">Fase de Grupos</button>
                    </div>
                </div>
            </div>

            <!-- CONTENEDOR DE TARJETAS DE PARTIDOS -->
            <div id="cards-container" class="w-full flex flex-col items-center gap-6"></div>

    </div>

        <!-- DEGRADADO DE TRANSICIÓN AL FOOTER -->
        <div class="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-[#0b1220] pointer-events-none"></div>
    `

    // Inicializar eventos y renderizar
    setupNavigation(section)
    setupFilters(section)
    render(section)

    return section
}

// ================================================
// NAVEGACIÓN — eventos de las flechas
function setupNavigation(section) {
    // Flecha izquierda — un día atrás
    section.querySelector('#prev').addEventListener('click', () => {
        if (diaActual > 0) diaActual--
        render(section)
    })
    // Flecha derecha — un día adelante
    section.querySelector('#next').addEventListener('click', () => {
        if (diaActual < fixture.length - 1) diaActual++
        render(section)
    })
    // Doble flecha izquierda — 5 días atrás
    section.querySelector('#skip-prev').addEventListener('click', () => {
        diaActual = Math.max(0, diaActual - 5)
        render(section)
    })
    // Doble flecha derecha — 5 días adelante
    section.querySelector('#skip-next').addEventListener('click', () => {
        diaActual = Math.min(fixture.length - 1, diaActual + 5)
        render(section)
    })
}

// ================================================
// FILTROS — toggle del panel y eventos de cada grupo
function setupFilters(section) {
    const toggleBtn = section.querySelector('#toggle-filtros')
    const panel = section.querySelector('#filtros-panel')

    // SVG del filtro normal
    const iconoFiltro = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>`

    // SVG del filtro con X para cerrar
    const iconoCerrar = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.531 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14v6a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341l.427-.473"/><path d="m16.5 3.5 5 5"/><path d="m21.5 3.5-5 5"/></svg>`

    // Abrir/cerrar panel de filtros
    toggleBtn.addEventListener('click', () => {
        panel.classList.toggle('hidden')
        panel.classList.toggle('flex')

        // Cambiar ícono según estado del panel
        if (panel.classList.contains('hidden')) {
            toggleBtn.innerHTML = iconoFiltro + ' Filtros'
        } else {
            toggleBtn.innerHTML = iconoCerrar + ' Cerrar'
        }
    })

    // Botón X para limpiar todos los filtros
    section.querySelector('#clear-filters').addEventListener('click', () => {
        filtros = { estado: 'todos', grupo: 'todos', fase: 'todos' }
        resetFilterButtons(section)
        render(section)
    })

    // Eventos de cada grupo de filtros
    setupFilterGroup(section, '#filtro-estado', 'estado')
    setupFilterGroup(section, '#filtro-grupo', 'grupo')
    setupFilterGroup(section, '#filtro-fase', 'fase')
}

// Configura los clicks de un grupo de filtros
function setupFilterGroup(section, selector, key) {
    const grupo = section.querySelector(selector)
    grupo.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
            // Desactivar todos los botones del grupo
            grupo.querySelectorAll('button').forEach(b => {
                b.classList.remove('bg-white', 'text-black', 'font-semibold')
                b.classList.add('bg-white/10', 'text-white/80')
            })
            // Activar el botón clickeado
            btn.classList.remove('bg-white/10', 'text-white/80')
            btn.classList.add('bg-white', 'text-black', 'font-semibold')
            // Actualizar el filtro
            filtros[key] = btn.dataset.value
            render(section)
        })
    })
}

// Resetea todos los botones de filtro a "Todos"
function resetFilterButtons(section) {
    section.querySelectorAll('.filtro-btn').forEach(btn => {
        btn.classList.remove('bg-white', 'text-black', 'font-semibold')
        btn.classList.add('bg-white/10', 'text-white/80')
    })
    section.querySelectorAll('.filtro-btn[data-value="todos"]').forEach(btn => {
        btn.classList.remove('bg-white/10', 'text-white/80')
        btn.classList.add('bg-white', 'text-black', 'font-semibold')
    })
}

// ================================================
// RENDER — decide qué mostrar según los filtros
function render(section) {
    const hayFiltroActivo = filtros.grupo !== 'todos' || filtros.fase !== 'todos' || filtros.estado !== 'todos'

    const navigation = section.querySelector('#navigation-wrapper')
    const filterInfo = section.querySelector('#filter-info')

    if (hayFiltroActivo) {
        // Con filtro → ocultar navegación, mostrar días filtrados
        navigation.classList.add('hidden')
        filterInfo.classList.remove('hidden')
        filterInfo.classList.add('flex')
        renderFilterInfo(section)
        renderFilteredDays(section)
    } else {
        // Sin filtro → mostrar navegación día por día
        navigation.classList.remove('hidden')
        filterInfo.classList.add('hidden')
        filterInfo.classList.remove('flex')
        renderCarousel(section)
        renderCounter(section)
        renderDayCard(section)
    }
}

// Muestra texto del filtro activo: "Mostrando: Grupo A"
function renderFilterInfo(section) {
    const text = section.querySelector('#filter-info-text')
    const partes = []
    if (filtros.grupo !== 'todos') partes.push(`Grupo ${filtros.grupo}`)
    if (filtros.fase !== 'todos') partes.push(filtros.fase)
    if (filtros.estado !== 'todos') partes.push(filtros.estado.toUpperCase())
    text.textContent = `Mostrando: ${partes.join(' · ')}`
}

// ================================================
// CARRUSEL — nombre del día con vecinos difuminados
function renderCarousel(section) {
    const carousel = section.querySelector('#day-carousel')
    carousel.innerHTML = ''

    // Día anterior (difuminado)
    const prev = fixture[diaActual - 1]
    if (prev) {
        const spanPrev = document.createElement('span')
        spanPrev.className = 'text-white/30 font-bebas text-sm uppercase tracking-wider hidden md:block'
        spanPrev.textContent = prev.dia
        carousel.append(spanPrev)
    }

    // Día actual (destacado)
    const curr = fixture[diaActual]
    const spanCurr = document.createElement('span')
    spanCurr.className = 'text-white font-bebas text-xl md:text-2xl uppercase tracking-wider px-4'
    spanCurr.textContent = curr.dia
    carousel.append(spanCurr)

    // Día siguiente (difuminado)
    const next = fixture[diaActual + 1]
    if (next) {
        const spanNext = document.createElement('span')
        spanNext.className = 'text-white/30 font-bebas text-sm uppercase tracking-wider hidden md:block'
        spanNext.textContent = next.dia
        carousel.append(spanNext)
    }
}

// ================================================
// PAGINACIÓN — 1 ... 4 [5] 6 ... 20
function renderCounter(section) {
    const counter = section.querySelector('#day-counter')
    counter.innerHTML = ''

    const total = fixture.length
    const actual = diaActual

    // Construir array de números a mostrar
    const numeros = []

    // Siempre el primero
    numeros.push(0)

    // Puntos suspensivos izquierdos
    if (actual - 1 > 1) numeros.push('...')

    // Vecino izquierdo
    if (actual - 1 > 0) numeros.push(actual - 1)

    // Número actual
    if (actual > 0 && actual < total - 1) numeros.push(actual)

    // Vecino derecho
    if (actual + 1 < total - 1) numeros.push(actual + 1)

    // Puntos suspensivos derechos
    if (actual + 1 < total - 2) numeros.push('...')

    // Siempre el último
    if (total > 1) numeros.push(total - 1)

    // Crear elementos visuales
    numeros.forEach(num => {
        const span = document.createElement('span')

        if (num === '...') {
            // Puntos suspensivos
            span.className = 'text-white/60 text-sm px-1'
            span.textContent = '...'

        } else if (num === actual) {
            // Número activo — blanco destacado
            span.className = 'bg-white text-black md:text-xl 2xl:text-2xl font-bold w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all'
            span.textContent = num + 1

        } else if (num === actual - 1 || num === actual + 1) {
            // Vecinos — difuminados
            span.className = 'text-white/60 text-xs w-7 h-7 rounded-full flex items-center justify-center cursor-pointer hover:text-white/60 transition-all'
            span.textContent = num + 1

        } else {
            // Primero y último — sutiles
            span.className = 'text-white/20 text-xs w-6 h-6 rounded-full flex items-center justify-center cursor-pointer hover:text-white/50 transition-all'
            span.textContent = num + 1
        }

        // Click navega a ese día
        if (num !== '...') {
            span.addEventListener('click', () => {
                diaActual = num
                render(section)
            })
        }

        counter.append(span)
    })
}

// ================================================
// TARJETA DE UN DÍA — sin filtros activos
function renderDayCard(section) {
    const cardsContainer = section.querySelector('#cards-container')
    cardsContainer.innerHTML = ''
    const dia = fixture[diaActual]
    cardsContainer.append(createDayCard(dia, dia.partidos))
}

// ================================================
// DÍAS FILTRADOS — muestra todos los días que coinciden
function renderFilteredDays(section) {
    const cardsContainer = section.querySelector('#cards-container')
    cardsContainer.innerHTML = ''

    let tieneResultados = false

    fixture.forEach(dia => {
        const partidosFiltrados = dia.partidos.filter(partido => {
            if (filtros.grupo !== 'todos' && partido.grupo !== `Grupo ${filtros.grupo}`) return false
            if (filtros.fase !== 'todos' && partido.fase !== filtros.fase) return false
            return true
        })

        if (partidosFiltrados.length > 0) {
            cardsContainer.append(createDayCard(dia, partidosFiltrados))
            tieneResultados = true
        }
    })

    if (!tieneResultados) {
        const sinResultados = document.createElement('div')
        sinResultados.className = 'w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 text-center'
        sinResultados.innerHTML = `<p class="text-white/60 text-base font-bebas tracking-widest">No hay partidos con estos filtros</p>`
        cardsContainer.append(sinResultados)
    }
}

// ================================================
// CREAR TARJETA DE DÍA — contiene el título y los partidos
function createDayCard(dia, partidos) {
    const divDia = document.createElement('div')
    divDia.className = 'w-full max-w-3xl bg-[#f5f1e8]/95 border border-white/20 rounded-3xl p-6 md:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-md transition-transform duration-300 hover:scale-[1.01]'

    divDia.innerHTML = /*html*/`
        <h2 class="text-center text-[#111827] font-bebas text-2xl md:text-3xl uppercase tracking-widest mb-6 pb-3 border-b border-black/10">
            ${dia.dia}
        </h2>
    `

    partidos.forEach(partido => {
        divDia.append(createMatchCard(partido))
    })

    return divDia
}

// ================================================
// CREAR TARJETA DE PARTIDO — banderas, hora, info
function createMatchCard(partido) {
    const tarjeta = document.createElement('div')
    tarjeta.className = 'flex flex-col gap-2 py-4 border-b border-black/10 last:border-0 transition-colors hover:bg-black/5 rounded-lg px-2'
    tarjeta.innerHTML = /*html*/`
        <div class="flex items-center justify-between gap-4">
            <div class="flex items-center gap-3 min-w-[110px]">
                <img src="https://flagcdn.com/w40/${partido.equipo1.codigo}.png" class="w-8 h-6 object-cover rounded-sm shadow-sm">
                <span class="text-[#111827] font-bold text-sm md:text-base">${partido.equipo1.abrev}</span>
            </div>
            <span class="text-[#111827]/70 text-sm md:text-lg font-bold tabular-nums">${partido.hora}</span>
            <div class="flex items-center justify-end gap-3 min-w-[110px]">
                <span class="text-[#111827] font-bold text-sm md:text-base">${partido.equipo2.abrev}</span>
                <img src="https://flagcdn.com/w40/${partido.equipo2.codigo}.png" class="w-8 h-6 object-cover rounded-sm shadow-sm">
            </div>
        </div>
        <p class="text-center text-[#111827]/60 text-xs md:text-sm tracking-wide">
            ${partido.fase} · ${partido.grupo} · ${partido.estadio} / ${partido.ciudad}
        </p>
    `
    return tarjeta
}