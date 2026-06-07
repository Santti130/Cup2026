import { fixture } from '../data/fixture.js'

// === ESTADO ===
let diaActual = 0
let filtros = { estado: 'todos', grupo: 'todos', fase: 'todos' }

// === FUNCIÓN DE PRUEBA: simula que hoy es 12 de junio de 2026 ===
function getDiaHoy() {
    // SIMULACIÓN: Forzamos que hoy sea 12 de junio de 2026 para pruebas
    const hoy = new Date()  // <--- CAMBIA ESTA FECHA PARA PROBAR
    
    // CÓDIGO ORIGINAL (comentado para pruebas)
    // const hoy = new Date()
    
    const dia = hoy.getDate()
    const mes = hoy.getMonth()
    const anio = hoy.getFullYear()

    const meses = { 'Enero':0, 'Febrero':1, 'Marzo':2, 'Abril':3, 'Mayo':4, 'Junio':5, 'Julio':6 }

    console.log(`Buscando fecha: ${dia}/${mes+1}/${anio}`) // Log para debugging

    for (let i = 0; i < fixture.length; i++) {
        const partes = fixture[i].dia.split(' ')
        const diaFixture = parseInt(partes[1])
        const mesFixture = meses[partes[3]]
        const anioFixture = parseInt(partes[4])

        if (dia === diaFixture && mes === mesFixture && anio === anioFixture) {
            console.log(`✅ Día encontrado: índice ${i} - ${fixture[i].dia}`)
            return i
        }
    }
    console.log(`❌ No se encontró partido para esta fecha`)
    return -1
}

// Devuelve la imagen de fondo según el tamaño de pantalla
function getFondo() {
    return window.innerWidth >= 768
        ? "url('/img/fondo-home-plantilla2.png')"
        : "url('/img/fondo-calendario-phone.png')"
}

// === COMPONENTE PRINCIPAL ===
export function renderCalendar() {
    const section = document.createElement('section')
    section.className = 'relative w-full flex flex-col items-center overflow-hidden bg-cover bg-center bg-no-repeat pb-24 px-4 md:px-6'
    section.style.backgroundImage = getFondo()
    section.style.minHeight = '100vh'

    section.innerHTML = /*html*/`
        <!-- Cuadrícula decorativa -->
        <div class="absolute inset-0 opacity-30 pointer-events-none bg-[linear-gradient(to_right,#ffffff20_1px,transparent_1px),linear-gradient(to_bottom,#ffffff20_1px,transparent_1px)] bg-[size:50px_50px]"></div>

        <!-- Capa oscura -->
        <div class="absolute inset-0 md:bg-black/22 2xl:bg-black/25 pointer-events-none"></div>

        <!-- Contenedor principal -->
        <div class="relative w-full max-w-4xl flex flex-col items-center md:gap-5 2xl:gap-10">

            <h2 class="text-5xl md:text-6xl 2xl:text-7xl font-extrabold font-bebas text-white tracking-widest pt-5 md:pt-15 2xl:pt-20 mb-4 uppercase">
                Calendario
            </h2>

            <!-- Navegación -->
            <div id="navigation-wrapper" class="w-full flex flex-col items-center gap-4">
                <!-- Flechas y carrusel -->
                <div class="w-full flex items-center justify-center gap-2 md:gap-4">
                    <button id="skip-prev" class="text-white/60 hover:text-white/80 w-7 h-7 rounded-full bg-white/25 border border-white/20 flex items-center justify-center transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m11 17-5-5 5-5"/><path d="m18 17-5-5 5-5"/></svg>
                    </button>
                    <button id="prev" class="text-white/80 hover:text-white w-9 h-9 rounded-full bg-white/35 border border-white/20 flex items-center justify-center transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                    </button>
                    <div id="day-carousel" class="flex items-center gap-2 min-w-[160px] md:min-w-[400px] justify-center"></div>
                    <button id="next" class="text-white/80 hover:text-white w-9 h-9 rounded-full bg-white/35 border border-white/20 flex items-center justify-center transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                    </button>
                    <button id="skip-next" class="text-white/60 hover:text-white/80 w-7 h-7 rounded-full bg-white/25 border border-white/20 flex items-center justify-center transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 17 5-5-5-5"/><path d="m13 17 5-5-5-5"/></svg>
                    </button>
                </div>
                <!-- Botón HOY + Paginación + Filtros -->
                <div class="flex flex-col md:flex-row items-center w-full gap-2 md:gap-0">
                    <div class="w-full md:w-1/3 flex justify-center md:justify-start">
                        <button id="btn-hoy" class="hidden px-4 py-1.5 rounded-2xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-amber-400 text-xs md:text-sm font-bebas tracking-widest transition-all items-center gap-2 mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                            Hoy
                        </button>
                    </div>
                    <div id="day-counter" class="flex items-center justify-center gap-1 w-full md:w-1/3"></div>
                    <div class="w-full md:w-1/3 flex justify-center md:justify-end">
                        <button id="toggle-filtros" class="px-4 py-1.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 text-white text-xs md:text-sm font-bebas tracking-widest transition-all flex items-center gap-2 mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
                            Filtros
                        </button>
                    </div>
                </div>
            </div>

            <!-- Filtro activo -->
            <div id="filter-info" class="hidden items-center gap-3 mb-5 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
                <span id="filter-info-text" class="text-white/80 text-sm font-bebas tracking-widest"></span>
                <button id="clear-filters" class="text-white/60 hover:text-red-400 text-sm transition-colors">✕</button>
            </div>

            <!-- Panel de filtros -->
            <div id="filtros-panel" class="hidden w-full max-w-2xl bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 flex-col gap-5 mb-2">
                <div class="flex flex-col gap-2">
                    <label class="text-white/60 md:text-md 2xl:text-xl uppercase tracking-widest font-bebas">Estado</label>
                    <div class="flex gap-2 flex-wrap" id="filtro-estado">
                        <button data-value="todos" class="filtro-btn px-3 py-1.5 rounded-lg bg-white text-black text-xs font-semibold transition-all">Todos</button>
                        <button data-value="en-vivo" class="filtro-btn px-3 py-1.5 rounded-lg bg-white/10 text-white/80 text-xs transition-all hover:bg-white/20">En vivo</button>
                        <button data-value="proximo" class="filtro-btn px-3 py-1.5 rounded-lg bg-white/10 text-white/80 text-xs transition-all hover:bg-white/20">Próximo</button>
                        <button data-value="resultado" class="filtro-btn px-3 py-1.5 rounded-lg bg-white/10 text-white/80 text-xs transition-all hover:bg-white/20">Resultado</button>
                    </div>
                </div>
                <div class="flex flex-col gap-2">
                    <label class="text-white/60 md:text-md 2xl:text-xl uppercase tracking-widest font-bebas">Grupo</label>
                    <div class="flex gap-2 flex-wrap" id="filtro-grupo">
                        <button data-value="todos" class="filtro-btn px-3 py-1.5 rounded-lg bg-white text-black text-xs font-semibold transition-all">Todos</button>
                        ${['A','B','C','D','E','F','G','H','I','J','K','L'].map(g => `<button data-value="${g}" class="filtro-btn px-3 py-1.5 rounded-lg bg-white/10 text-white/80 text-xs transition-all hover:bg-white/20">${g}</button>`).join('')}
                    </div>
                </div>
                <div class="flex flex-col gap-2">
                    <label class="text-white/60 md:text-md 2xl:text-xl uppercase tracking-widest font-bebas">Fase</label>
                    <div class="flex gap-2 flex-wrap" id="filtro-fase">
                        <button data-value="todos" class="filtro-btn px-3 py-1.5 rounded-lg bg-white text-black text-xs font-semibold transition-all">Todos</button>
                        <button data-value="Fase de Grupos" class="filtro-btn px-3 py-1.5 rounded-lg bg-white/10 text-white/80 text-xs transition-all hover:bg-white/20">Fase de Grupos</button>
                    </div>
                </div>
            </div>

            <!-- Tarjetas de partidos -->
            <div id="cards-container" class="w-full flex flex-col items-center gap-6 mt-4"></div>
        </div>

        <!-- Degradado al footer -->
        <div class="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-[#0b1220] pointer-events-none"></div>
    `

    setupNavigation(section)
    setupFilters(section)
    render(section)
    return section
}

// === NAVEGACIÓN ===
function setupNavigation(section) {
    section.querySelector('#prev').addEventListener('click', () => {
        if (diaActual > 0) diaActual--
        render(section)
    })
    section.querySelector('#next').addEventListener('click', () => {
        if (diaActual < fixture.length - 1) diaActual++
        render(section)
    })
    section.querySelector('#skip-prev').addEventListener('click', () => {
        diaActual = Math.max(0, diaActual - 5)
        render(section)
    })
    section.querySelector('#skip-next').addEventListener('click', () => {
        diaActual = Math.min(fixture.length - 1, diaActual + 5)
        render(section)
    })

    // Botón HOY — navega al día actual del torneo
    const btnHoy = section.querySelector('#btn-hoy')
    btnHoy.addEventListener('click', () => {
        const diaHoy = getDiaHoy()
        if (diaHoy !== -1) {
            diaActual = diaHoy
            render(section)
        }
    })
}

// === FILTROS ===
function setupFilters(section) {
    const toggleBtn = section.querySelector('#toggle-filtros')
    const panel = section.querySelector('#filtros-panel')

    const iconoFiltro = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>`
    const iconoCerrar = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.531 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14v6a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341l.427-.473"/><path d="m16.5 3.5 5 5"/><path d="m21.5 3.5-5 5"/></svg>`

    toggleBtn.addEventListener('click', () => {
        panel.classList.toggle('hidden')
        panel.classList.toggle('flex')
        toggleBtn.innerHTML = panel.classList.contains('hidden')
            ? iconoFiltro + ' Filtros'
            : iconoCerrar + ' Cerrar'
    })

    section.querySelector('#clear-filters').addEventListener('click', () => {
        filtros = { estado: 'todos', grupo: 'todos', fase: 'todos' }
        resetFilterButtons(section)
        render(section)
    })

    setupFilterGroup(section, '#filtro-estado', 'estado')
    setupFilterGroup(section, '#filtro-grupo', 'grupo')
    setupFilterGroup(section, '#filtro-fase', 'fase')
}

function setupFilterGroup(section, selector, key) {
    const grupo = section.querySelector(selector)
    grupo.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
            grupo.querySelectorAll('button').forEach(b => {
                b.classList.remove('bg-white', 'text-black', 'font-semibold')
                b.classList.add('bg-white/10', 'text-white/80')
            })
            btn.classList.remove('bg-white/10', 'text-white/80')
            btn.classList.add('bg-white', 'text-black', 'font-semibold')
            filtros[key] = btn.dataset.value
            render(section)
        })
    })
}

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

// === RENDER ===
function render(section) {
    const hayFiltroActivo = filtros.grupo !== 'todos' || filtros.fase !== 'todos' || filtros.estado !== 'todos'
    const navigation = section.querySelector('#navigation-wrapper')
    const filterInfo = section.querySelector('#filter-info')

    if (hayFiltroActivo) {
        section.style.backgroundImage = 'none'
        section.style.backgroundColor = '#0b1220'
        navigation.classList.add('hidden')
        filterInfo.classList.remove('hidden')
        filterInfo.classList.add('flex')
        renderFilterInfo(section)
        renderFilteredDays(section)
    } else {
        section.style.backgroundImage = getFondo()
        section.style.backgroundColor = ''
        navigation.classList.remove('hidden')
        filterInfo.classList.add('hidden')
        filterInfo.classList.remove('flex')
        renderCarousel(section)
        renderCounter(section)
        renderDayCard(section)

        // ============================================
        // MOSTRAR BOTÓN HOY (con debugging)
        // ============================================
        const btnHoy = section.querySelector('#btn-hoy')
        const diaHoy = getDiaHoy()
        
        console.log('DEBUG RENDER:')
        console.log('  - diaActual:', diaActual)
        console.log('  - diaHoy:', diaHoy)
        console.log('  - diaHoy !== -1:', diaHoy !== -1)
        console.log('  - diaActual !== diaHoy:', diaActual !== diaHoy)
        
        if (diaHoy !== -1 && diaActual !== diaHoy) {
            console.log('Mostrando botón HOY')
            btnHoy.classList.remove('hidden')
            btnHoy.classList.add('flex')
        } else {
            console.log('Ocultando botón HOY')
            btnHoy.classList.add('hidden')
            btnHoy.classList.remove('flex')
        }
    }
}

function renderFilterInfo(section) {
    const text = section.querySelector('#filter-info-text')
    const partes = []
    if (filtros.grupo !== 'todos') partes.push(`Grupo ${filtros.grupo}`)
    if (filtros.fase !== 'todos') partes.push(filtros.fase)
    if (filtros.estado !== 'todos') partes.push(filtros.estado.toUpperCase())
    text.textContent = `Mostrando: ${partes.join(' · ')}`
}

// === CARRUSEL ===
function renderCarousel(section) {
    const carousel = section.querySelector('#day-carousel')
    carousel.innerHTML = ''

    const prev = fixture[diaActual - 1]
    if (prev) {
        const spanPrev = document.createElement('span')
        spanPrev.className = 'text-white/30 font-bebas text-sm uppercase tracking-wider hidden md:block'
        spanPrev.textContent = prev.dia
        carousel.append(spanPrev)
    }

    const curr = fixture[diaActual]
    const spanCurr = document.createElement('div')
    spanCurr.className = 'flex flex-col md:flex-row items-center md:gap-2 text-white font-bebas uppercase tracking-wider px-2 text-center leading-tight'
    const partes = curr.dia.split(' ')
    spanCurr.innerHTML = `
        <span class="text-lg md:text-2xl">${partes[0]}</span>
        <span class="text-lg md:text-2xl">${partes[1]} ${partes[2]} ${partes[3]}</span>
        <span class="text-lg md:text-2xl text-white/70">${partes[4]}</span>
    `
    carousel.append(spanCurr)

    const next = fixture[diaActual + 1]
    if (next) {
        const spanNext = document.createElement('span')
        spanNext.className = 'text-white/30 font-bebas text-sm uppercase tracking-wider hidden md:block'
        spanNext.textContent = next.dia
        carousel.append(spanNext)
    }
}

// === PAGINACIÓN ===
function renderCounter(section) {
    const counter = section.querySelector('#day-counter')
    counter.innerHTML = ''

    const total = fixture.length
    const actual = diaActual
    const numeros = []

    numeros.push(0)
    if (actual - 1 > 1) numeros.push('...')
    if (actual - 1 > 0) numeros.push(actual - 1)
    if (actual > 0 && actual < total - 1) numeros.push(actual)
    if (actual + 1 < total - 1) numeros.push(actual + 1)
    if (actual + 1 < total - 2) numeros.push('...')
    if (total > 1) numeros.push(total - 1)

    numeros.forEach(num => {
        const span = document.createElement('span')

        if (num === '...') {
            span.className = 'text-white/60 text-sm px-1'
            span.textContent = '...'
        } else if (num === actual) {
            span.className = 'bg-white text-black md:text-xl 2xl:text-2xl font-bold w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all'
            span.textContent = num + 1
        } else if (num === actual - 1 || num === actual + 1) {
            span.className = 'text-white/60 text-xs w-7 h-7 rounded-full flex items-center justify-center cursor-pointer hover:text-white/60 transition-all'
            span.textContent = num + 1
        } else {
            span.className = 'text-white/20 text-xs w-6 h-6 rounded-full flex items-center justify-center cursor-pointer hover:text-white/50 transition-all'
            span.textContent = num + 1
        }

        if (num !== '...') {
            span.addEventListener('click', () => {
                diaActual = num
                render(section)
            })
        }

        counter.append(span)
    })
}

// === TARJETA DE UN DÍA ===
function renderDayCard(section) {
    const cardsContainer = section.querySelector('#cards-container')
    cardsContainer.innerHTML = ''
    const dia = fixture[diaActual]
    cardsContainer.append(createDayCard(dia, dia.partidos))
}

// === DÍAS FILTRADOS ===
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

// === CREAR TARJETA DE DÍA ===
function createDayCard(dia, partidos) {
    const divDia = document.createElement('div')
    divDia.className = 'w-full max-w-3xl bg-[#f5f1e8]/95 border border-white/20 rounded-3xl p-6 md:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-md transition-transform duration-300 hover:scale-[1.01]'
    divDia.innerHTML = /*html*/`
        <h2 class="text-center text-[#111827] font-bebas text-2xl md:text-3xl uppercase tracking-widest mb-6 pb-3 border-b border-black/10">
            ${dia.dia}
        </h2>
    `
    partidos.forEach(partido => divDia.append(createMatchCard(partido)))
    return divDia
}

// === CREAR TARJETA DE PARTIDO ===
function createMatchCard(partido) {
    const tarjeta = document.createElement('div')
    tarjeta.className = 'flex flex-col gap-2 py-4 border-b border-black/10 last:border-0 transition-colors hover:bg-black/5 rounded-lg px-2'
    tarjeta.innerHTML = /*html*/`
        <div class="flex items-center justify-between gap-2">
            <div class="flex items-center gap-3 flex-1">
                <img src="https://flagcdn.com/w40/${partido.equipo1.codigo}.png" class="w-8 h-6 object-cover rounded-sm shadow-sm">
                <span class="text-[#111827] font-bold text-sm md:text-base">${partido.equipo1.abrev}</span>
            </div>
            <span class="text-[#111827]/70 text-sm md:text-lg font-bold tabular-nums">${partido.hora}</span>
            <div class="flex items-center justify-end gap-3 flex-1">
                <span class="text-[#111827] font-bold text-sm md:text-base">${partido.equipo2.abrev}</span>
                <img src="https://flagcdn.com/w40/${partido.equipo2.codigo}.png" class="w-8 h-6 object-cover rounded-sm shadow-sm">
            </div>
        </div>
        <p class="text-center text-[#111827]/60 text-xs tracking-wide truncate px-4">
            ${partido.fase} · ${partido.grupo}
        </p>
        <p class="text-center text-[#111827]/40 text-xs tracking-wide truncate px-4">
            ${partido.estadio} / ${partido.ciudad}
        </p>
    `
    return tarjeta
}