// ============================================================================
// SECCIÓN 1: ESTADO GLOBAL
// ============================================================================
let partidosGlobales = []
let diasUnicos = []
let diaActualIndex = 0
let mesCalendarioActivo = 5 // 5 = Junio, 6 = Julio
let filtros = { estado: 'todos', grupo: 'todos', equipo: 'todos', sede: 'todos' }

if (!window.__calendarClickListenerAdded) {
    document.addEventListener('click', () => {
        document.querySelectorAll('.menu-agendar').forEach(m => m.classList.add('hidden'))
    })
    window.__calendarClickListenerAdded = true
}

// ============================================================================
// SECCIÓN 2: UTILIDADES DE FECHA
// ============================================================================
function formatearFechaLocal(dateObj) {
    const dias = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado']
    const meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
    const local = new Date(dateObj.toLocaleString('en-US', { timeZone: tz }))
    return `${dias[local.getDay()]} ${local.getDate()} ${meses[local.getMonth()]} ${local.getFullYear()}`
}

function diaLocal(dateObj) {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
    return new Date(dateObj.toLocaleString('en-US', { timeZone: tz })).getDate()
}

function mesLocal(dateObj) {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
    return new Date(dateObj.toLocaleString('en-US', { timeZone: tz })).getMonth()
}

// ============================================================================
// SECCIÓN 3: MAPAS DE DATOS
// ============================================================================
const GRUPOS_MAP = {
    'Mexico': 'Grupo A', 'South Africa': 'Grupo A', 'South Korea': 'Grupo A', 'Czech Republic': 'Grupo A',
    'Canada': 'Grupo B', 'Bosnia & Herzegovina': 'Grupo B', 'Qatar': 'Grupo B', 'Switzerland': 'Grupo B',
    'Brazil': 'Grupo C', 'Morocco': 'Grupo C', 'Haiti': 'Grupo C', 'Scotland': 'Grupo C',
    'USA': 'Grupo D', 'Paraguay': 'Grupo D', 'Australia': 'Grupo D', 'Türkiye': 'Grupo D',
    'Germany': 'Grupo E', 'Curaçao': 'Grupo E', 'Ivory Coast': 'Grupo E', 'Ecuador': 'Grupo E',
    'Netherlands': 'Grupo F', 'Japan': 'Grupo F', 'Sweden': 'Grupo F', 'Tunisia': 'Grupo F',
    'Belgium': 'Grupo G', 'Egypt': 'Grupo G', 'Iran': 'Grupo G', 'New Zealand': 'Grupo G',
    'Spain': 'Grupo H', 'Cape Verde Islands': 'Grupo H', 'Saudi Arabia': 'Grupo H', 'Uruguay': 'Grupo H',
    'France': 'Grupo I', 'Senegal': 'Grupo I', 'Iraq': 'Grupo I', 'Norway': 'Grupo I',
    'Argentina': 'Grupo J', 'Algeria': 'Grupo J', 'Austria': 'Grupo J', 'Jordan': 'Grupo J',
    'Portugal': 'Grupo K', 'Congo DR': 'Grupo K', 'Uzbekistan': 'Grupo K', 'Colombia': 'Grupo K',
    'England': 'Grupo L', 'Croatia': 'Grupo L', 'Ghana': 'Grupo L', 'Panama': 'Grupo L',
}

const FASES_MAP = {
    'Group Stage - 1': 'Fase de Grupos - J1',
    'Group Stage - 2': 'Fase de Grupos - J2',
    'Group Stage - 3': 'Fase de Grupos - J3',
    'Round of 32': 'Dieciseisavos',
    'Round of 16': 'Octavos de Final',
    'Quarter-finals': 'Cuartos de Final',
    'Semi-finals': 'Semifinales',
    '3rd Place Final': 'Tercer Puesto',
    'Final': 'Final',
}

const SEDES_MAP = {
    'Mexico': 'México', 'South Korea': 'México', 'Czech Republic': 'México', 'South Africa': 'México',
    'Uzbekistan': 'México', 'Colombia': 'México', 'Portugal': 'México', 'Congo DR': 'México',
    'Uruguay': 'México', 'Spain': 'México', 'Cape Verde Islands': 'México',
    'Canada': 'Canadá', 'Bosnia & Herzegovina': 'Canadá', 'Switzerland': 'Canadá', 'Qatar': 'Canadá',
    'Croatia': 'Canadá', 'Ghana': 'Canadá', 'Panama': 'Canadá', 'England': 'Canadá',
    'Scotland': 'Canadá', 'Brazil': 'Canadá', 'Haiti': 'Canadá', 'Morocco': 'Canadá',
    'Senegal': 'USA', 'Iraq': 'USA', 'Norway': 'USA', 'France': 'USA', 'Argentina': 'USA',
    'Algeria': 'USA', 'Austria': 'USA', 'Jordan': 'USA', 'Germany': 'USA', 'Curaçao': 'USA',
    'Ivory Coast': 'USA', 'Ecuador': 'USA', 'Netherlands': 'USA', 'Japan': 'USA', 'Sweden': 'USA',
    'Tunisia': 'USA', 'Belgium': 'USA', 'Egypt': 'USA', 'Iran': 'USA', 'New Zealand': 'USA',
    'USA': 'USA', 'Paraguay': 'USA', 'Australia': 'USA', 'Türkiye': 'USA', 'Saudi Arabia': 'USA',
}

const BANDERAS_MAP = {
    'Mexico': 'mx', 'South Africa': 'za', 'South Korea': 'kr', 'Czech Republic': 'cz',
    'Canada': 'ca', 'Bosnia & Herzegovina': 'ba', 'Qatar': 'qa', 'Switzerland': 'ch',
    'Brazil': 'br', 'Morocco': 'ma', 'Haiti': 'ht', 'Scotland': 'gb-sct',
    'USA': 'us', 'Paraguay': 'py', 'Australia': 'au', 'Türkiye': 'tr',
    'Germany': 'de', 'Curaçao': 'cw', 'Ivory Coast': 'ci', 'Ecuador': 'ec',
    'Netherlands': 'nl', 'Japan': 'jp', 'Sweden': 'se', 'Tunisia': 'tn',
    'Belgium': 'be', 'Egypt': 'eg', 'Iran': 'ir', 'New Zealand': 'nz',
    'Spain': 'es', 'Cape Verde Islands': 'cv', 'Saudi Arabia': 'sa', 'Uruguay': 'uy',
    'France': 'fr', 'Senegal': 'sn', 'Iraq': 'iq', 'Norway': 'no',
    'Argentina': 'ar', 'Algeria': 'dz', 'Austria': 'at', 'Jordan': 'jo',
    'Portugal': 'pt', 'Congo DR': 'cd', 'Uzbekistan': 'uz', 'Colombia': 'co',
    'England': 'gb-eng', 'Croatia': 'hr', 'Ghana': 'gh', 'Panama': 'pa',
}

// ============================================================================
// SECCIÓN 4: CARGA DE DATOS DESDE API-FOOTBALL
// ============================================================================
export async function inicializarCalendario(contenedorPadre) {
    await cargarDatosAPI()
    const ui = renderCalendar()
    contenedorPadre.appendChild(ui)
}

async function cargarDatosAPI() {
    const CACHE_KEY = 'cuphub_fixtures_cache'
    const CACHE_TIME_KEY = 'cuphub_fixtures_time'
    const CACHE_DURATION = 60 * 1000

    try {
        const ahora = Date.now()
        const ultimaActualizacion = parseInt(localStorage.getItem(CACHE_TIME_KEY) || '0')
        const cacheValido = (ahora - ultimaActualizacion) < CACHE_DURATION
        const cacheData = localStorage.getItem(CACHE_KEY)

        if (cacheValido && cacheData) {
            console.log('✅ Usando caché')
            partidosGlobales = JSON.parse(cacheData)
        } else {
            console.log('🔄 Llamando a la API...')
            const API_KEY = import.meta.env.VITE_API_FOOTBALL_KEY
            const response = await fetch('https://v3.football.api-sports.io/fixtures?league=1&season=2026', {
                headers: { 'x-apisports-key': API_KEY }
            })
            const data = await response.json()
            partidosGlobales = normalizarDatosAPI(data.response)
            localStorage.setItem(CACHE_KEY, JSON.stringify(partidosGlobales))
            localStorage.setItem(CACHE_TIME_KEY, ahora.toString())
            console.log(`✅ API cargada: ${partidosGlobales.length} partidos`)
        }

        diasUnicos = [...new Set(partidosGlobales.map(p => p.fecha_str))]
        const indexHoy = diasUnicos.indexOf(formatearFechaLocal(new Date()))
        if (indexHoy !== -1) diaActualIndex = indexHoy

    } catch (error) {
        console.error('❌ Error API:', error)
        partidosGlobales = []
        diasUnicos = []
    }
}

function normalizarDatosAPI(apiResponse) {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
    return apiResponse.map(item => {
        const dateObj = new Date(item.fixture.date)
        const nombreLocal = item.teams.home.name
        const nombreVisita = item.teams.away.name
        return {
            id: item.fixture.id,
            fecha_str: formatearFechaLocal(dateObj),
            hora: dateObj.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: tz }),
            equipo1: { abrev: nombreLocal, codigo: item.teams.home.logo, goles: item.goals.home },
            equipo2: { abrev: nombreVisita, codigo: item.teams.away.logo, goles: item.goals.away },
            fase: FASES_MAP[item.league.round] || item.league.round,
            grupo: GRUPOS_MAP[nombreLocal] || GRUPOS_MAP[nombreVisita] || 'Por confirmar',
            estadio: item.fixture.venue.name || 'Por confirmar',
            ciudad: item.fixture.venue.city || '',
            dia: diaLocal(dateObj),
            mes: mesLocal(dateObj),
            status: item.fixture.status.short,
            minuto: item.fixture.status.elapsed
        }
    }).sort((a, b) => new Date(a.fecha_str + ' ' + a.hora) - new Date(b.fecha_str + ' ' + b.hora))
}

// ============================================================================
// SECCIÓN 5: ENLACES DE CALENDARIO (Google, Apple, Outlook)
// ============================================================================
function generarEnlacesCalendario(partido) {
    const mes = String(partido.mes + 1).padStart(2, '0')
    const dia = String(partido.dia).padStart(2, '0')
    const [h, m] = partido.hora.split(':')
    const hFin = (parseInt(h) + 2).toString().padStart(2, '0')
    const inicio = `2026${mes}${dia}T${h}${m}00`
    const fin = `2026${mes}${dia}T${hFin}${m}00`
    const inicioIso = `2026-${mes}-${dia}T${h}:${m}:00`
    const finIso = `2026-${mes}-${dia}T${hFin}:${m}:00`
    const titulo = encodeURIComponent(`⚽ ${partido.equipo1.abrev} vs ${partido.equipo2.abrev} | Mundial 2026`)
    const detalle = encodeURIComponent(`Fase: ${partido.fase}\nGrupo: ${partido.grupo}`)
    const lugar = encodeURIComponent(`${partido.estadio}, ${partido.ciudad}`)
    const ics = encodeURIComponent(`BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:⚽ ${partido.equipo1.abrev} vs ${partido.equipo2.abrev} | Mundial 2026\nDESCRIPTION:Fase: ${partido.fase}\\nGrupo: ${partido.grupo}\nLOCATION:${partido.estadio}, ${partido.ciudad}\nDTSTART:${inicio}\nDTEND:${fin}\nEND:VEVENT\nEND:VCALENDAR`)
    return {
        googleLink: `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${titulo}&dates=${inicio}/${fin}&details=${detalle}&location=${lugar}`,
        outlookLink: `https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent&startdt=${inicioIso}&enddt=${finIso}&subject=${titulo}&body=${detalle}&location=${lugar}`,
        appleLink: `data:text/calendar;charset=utf8,${ics}`
    }
}

// ============================================================================
// SECCIÓN 6: COMPONENTE PRINCIPAL
// ============================================================================
export function renderCalendar() {
    const section = document.createElement('section')
    section.className = 'relative w-full flex flex-col items-center overflow-hidden bg-cover bg-center bg-no-repeat pb-32'
    section.style.backgroundImage = window.innerWidth >= 768 ? "url('/img/fondo-home-plantilla2.png')" : "url('/img/fondo-calendario-phone.png')"
    section.style.minHeight = '100vh'

    section.innerHTML = /*html*/`
        <div class="absolute inset-0 opacity-30 pointer-events-none bg-[linear-gradient(to_right,#ffffff20_1px,transparent_1px),linear-gradient(to_bottom,#ffffff20_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        <div class="absolute inset-0 bg-black/40 md:bg-black/25 pointer-events-none"></div>

        <div class="relative w-full text-center pt-10 md:pt-16 pb-6 z-10">
            <h2 class="text-5xl md:text-6xl 2xl:text-7xl font-extrabold font-bebas text-white tracking-widest uppercase drop-shadow-xl">Calendario</h2>
        </div>

        <div class="relative w-full max-w-[1400px] flex items-start justify-center gap-6 px-4 md:px-8 z-10">

            <!-- Sidebar desktop: mini calendario + botón descarga -->
            <aside class="hidden lg:flex flex-col w-80 sticky top-10 shrink-0 bg-[#0b1220]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl gap-6">
                <div>
                    <h3 class="text-xl font-bebas text-violet-400 tracking-widest mb-4 uppercase border-b border-white/10 pb-2 flex items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                        Mes de Competición
                    </h3>
                    <div id="desktop-calendar-container" class="w-full"></div>
                </div>

                <!-- Botón descarga — solo desktop, fijo dentro del sidebar -->
                <a href="/Horarios-Grupos-2026.pdf" download="Horarios-Grupos-Mundial-2026.pdf"
                   class="flex items-center justify-center gap-2 px-4 py-3 bg-[#0f1623] hover:bg-[#162030] border border-white/10 hover:border-emerald-500/50 rounded-full shadow-xl transition-all duration-300 hover:scale-105 group">
                    <svg class="w-5 h-5 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"/>
                    </svg>
                    <span class="text-zinc-300 group-hover:text-white text-sm font-bebas tracking-widest transition-colors">Descargar Horarios</span>
                </a>
            </aside>

            <!-- Contenido principal -->
            <main class="flex-1 w-full max-w-3xl flex flex-col items-center min-h-[500px]">

                <!-- Barra de navegación por día -->
                <div id="navigation-wrapper" class="w-full flex items-center justify-between bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 mb-6 shadow-lg">
                    <!-- Botón calendario solo visible en móvil — abre drawer de mini calendario -->
                    <button id="btn-mobile-cal" class="lg:hidden text-white/80 hover:text-violet-400 p-2 transition-colors">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    </button>
                    <div class="flex items-center gap-2 md:gap-4 flex-1 justify-center">
                        <button id="prev" class="text-white/80 hover:text-white w-8 h-8 rounded-full bg-white/20 border border-white/10 flex items-center justify-center hover:bg-violet-500/30 transition-all">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>
                        </button>
                        <div id="day-carousel" class="flex items-center justify-center text-center"></div>
                        <button id="next" class="text-white/80 hover:text-white w-8 h-8 rounded-full bg-white/20 border border-white/10 flex items-center justify-center hover:bg-violet-500/30 transition-all">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
                        </button>
                    </div>
                    <button id="toggle-filtros" class="text-white/80 hover:text-violet-400 p-2 flex items-center gap-2 text-sm font-bebas tracking-widest transition-colors">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
                        <span class="hidden md:inline">Filtros</span>
                    </button>
                </div>

                <!-- Banner filtros activos -->
                <div id="filter-info" class="hidden items-center justify-between w-full mb-6 px-5 py-3 bg-violet-500/10 border border-violet-500/20 rounded-2xl backdrop-blur-md">
                    <span id="filter-info-text" class="text-violet-300 text-sm md:text-base font-bebas tracking-widest"></span>
                    <button id="clear-filters-btn" class="text-white/60 hover:text-red-400 text-xs uppercase tracking-wider bg-white/5 px-3 py-1 rounded transition-colors">Limpiar ✕</button>
                </div>

                <!-- Tarjetas de partidos -->
                <div id="cards-container" class="w-full flex flex-col items-center gap-6"></div>

                <!-- Botón descarga móvil — solo visible en móvil, al final del contenido -->
                <div class="lg:hidden w-full flex justify-end mt-6 mb-2">
                    <a href="/Horarios-Grupos-2026.pdf" download="Horarios-Grupos-Mundial-2026.pdf"
                       class="flex items-center justify-center w-14 h-14 bg-[#0f1623] hover:bg-[#162030] border border-white/10 hover:border-emerald-500/50 rounded-full shadow-xl transition-all duration-300 hover:scale-105">
                        <svg class="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"/>
                        </svg>
                    </a>
                </div>
            </main>
        </div>

        <!-- Overlay para drawer de filtros Y drawer de mini calendario móvil -->
        <div id="drawer-overlay" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] hidden transition-opacity duration-300 opacity-0"></div>

        <!-- Mini calendario drawer móvil — sale desde la izquierda -->
        <div id="mobile-cal-drawer" class="fixed top-0 left-0 h-full w-72 bg-[#0b1220] border-r border-white/10 z-[100] transform -translate-x-full transition-transform duration-300 flex flex-col p-6">
            <div class="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                <h3 class="font-bebas text-lg text-violet-400 tracking-widest uppercase">Mes de Competición</h3>
                <button id="close-mobile-cal" class="text-white/60 hover:text-white transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
            </div>
            <div id="mobile-calendar-container" class="w-full"></div>
        </div>

        <!-- Degradado al footer -->
        <div class="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-b from-transparent to-[#0b1220] pointer-events-none z-20"></div>
    `

    setupEvents(section)
    render(section)
    return section
}

// ============================================================================
// SECCIÓN 7: MINI CALENDARIO MENSUAL
// ============================================================================
function getMesHTML() {
    const infoMes = {
        5: { nombre: 'Junio', inicioMes: 0, totalDias: 30 },
        6: { nombre: 'Julio', inicioMes: 2, totalDias: 31 }
    }
    const mes = infoMes[mesCalendarioActivo]
    const svgPrev = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>`
    const svgNext = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>`

    let html = `
        <div class="mb-4 w-full">
            <div class="flex justify-between items-center mb-3 px-2">
                <button class="btn-mes-prev w-6 h-6 rounded-full bg-white/10 hover:bg-violet-500/30 flex items-center justify-center text-white/40 hover:text-white transition-all ${mesCalendarioActivo === 5 ? 'invisible' : ''}">${svgPrev}</button>
                <h4 class="text-white font-bebas tracking-widest text-lg text-center uppercase">${mes.nombre}</h4>
                <button class="btn-mes-next w-6 h-6 rounded-full bg-white/10 hover:bg-violet-500/30 flex items-center justify-center text-white/40 hover:text-white transition-all ${mesCalendarioActivo === 6 ? 'invisible' : ''}">${svgNext}</button>
            </div>
            <div class="grid grid-cols-7 gap-1 text-center mb-2">
                ${['L','M','X','J','V','S','D'].map(d => `<div class="text-white/40 text-xs font-bold">${d}</div>`).join('')}
            </div>
            <div class="grid grid-cols-7 gap-1 text-center">
    `

    for (let i = 0; i < mes.inicioMes; i++) html += `<div></div>`

    for (let d = 1; d <= mes.totalDias; d++) {
        const tienePartidos = partidosGlobales.some(p => p.dia === d && p.mes === mesCalendarioActivo)
        const fechaViendo = diasUnicos[diaActualIndex]
        const estaSeleccionado = fechaViendo && fechaViendo.includes(`${d} ${mes.nombre}`) && filtros.grupo === 'todos' && filtros.equipo === 'todos'

        if (tienePartidos) {
            const estilos = estaSeleccionado
                ? 'bg-violet-500/80 text-white font-bold scale-110 shadow-[0_0_15px_rgba(139,92,246,0.5)] border-violet-400'
                : 'bg-white/10 text-white hover:bg-violet-500/30 cursor-pointer border-white/5'
            html += `<div data-dia="${d}" data-mes="${mesCalendarioActivo}" class="cal-day w-8 h-8 mx-auto rounded-full flex items-center justify-center text-sm transition-all duration-300 border ${estilos}">${d}</div>`
        } else {
            html += `<div class="w-8 h-8 mx-auto rounded-full flex items-center justify-center text-sm text-white/10">${d}</div>`
        }
    }

    html += `</div></div>`
    return html
}

// ============================================================================
// SECCIÓN 8: RENDERIZADO PRINCIPAL
// ============================================================================
function render(section) {
    // Actualizar mini calendario desktop y móvil
    const calHTML = getMesHTML()
    const deskCal = section.querySelector('#desktop-calendar-container')
    const mobCal = section.querySelector('#mobile-calendar-container')
    if (deskCal) deskCal.innerHTML = calHTML
    if (mobCal) mobCal.innerHTML = calHTML

    // Navegación de meses
    section.querySelectorAll('.btn-mes-prev').forEach(btn => btn.addEventListener('click', () => { mesCalendarioActivo = 5; render(section) }))
    section.querySelectorAll('.btn-mes-next').forEach(btn => btn.addEventListener('click', () => { mesCalendarioActivo = 6; render(section) }))

    // Clic en días del mini calendario
    section.querySelectorAll('.cal-day').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const d = parseInt(e.target.dataset.dia)
            const m = parseInt(e.target.dataset.mes)
            const mesesNombres = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio']
            const idx = diasUnicos.findIndex(f => f.includes(`${d} ${mesesNombres[m]}`))
            if (idx !== -1) {
                diaActualIndex = idx
                filtros = { estado: 'todos', grupo: 'todos', equipo: 'todos', sede: 'todos' }
                resetSelectsFiltros(section)
                // Cerrar drawer móvil si está abierto
                cerrarMobileCal(section)
                render(section)
            }
        })
    })

    const hayFiltroActivo = Object.values(filtros).some(v => v !== 'todos')
    const carouselWrapper = section.querySelector('#navigation-wrapper')
    const filterInfo = section.querySelector('#filter-info')
    const cardsContainer = section.querySelector('#cards-container')
    cardsContainer.innerHTML = ''

    if (hayFiltroActivo) {
        carouselWrapper.classList.add('hidden')
        carouselWrapper.classList.remove('flex')
        filterInfo.classList.remove('hidden')
        filterInfo.classList.add('flex')

        const partes = []
        if (filtros.equipo !== 'todos') partes.push(`Selección: ${filtros.equipo}`)
        if (filtros.sede !== 'todos') partes.push(`Sede: ${filtros.sede}`)
        if (filtros.grupo !== 'todos') partes.push(`Grupo ${filtros.grupo}`)
        if (filtros.estado !== 'todos') partes.push(filtros.estado.toUpperCase())
        section.querySelector('#filter-info-text').innerHTML = `Resultados para: <span class="text-white ml-2">${partes.join(' · ')}</span>`

        renderizarDiasFiltrados(cardsContainer)
    } else {
        carouselWrapper.classList.remove('hidden')
        carouselWrapper.classList.add('flex')
        filterInfo.classList.add('hidden')
        filterInfo.classList.remove('flex')

        const fechaTexto = diasUnicos[diaActualIndex] || 'Cargando...'
        section.querySelector('#day-carousel').innerHTML = `
            <div class="flex items-center gap-2 text-white font-bebas uppercase tracking-widest px-2 leading-none text-2xl md:text-3xl">${fechaTexto}</div>
        `

        const partidosDelDia = partidosGlobales.filter(p => p.fecha_str === diasUnicos[diaActualIndex])
        if (partidosDelDia.length > 0) {
            const divDia = crearContenedorDia(fechaTexto)
            partidosDelDia.forEach(p => divDia.querySelector('.partidos-lista').appendChild(createMatchCard(p)))
            cardsContainer.appendChild(divDia)
        }
    }
}

function renderizarDiasFiltrados(cardsContainer) {
    const statusMap = { 'próximo': ['NS'], 'en vivo': ['1H','HT','2H','ET','PEN'], 'resultado': ['FT'] }
    let tieneResultados = false

    diasUnicos.forEach(diaTexto => {
        let partidos = partidosGlobales.filter(p => p.fecha_str === diaTexto)
        if (filtros.grupo !== 'todos') partidos = partidos.filter(p => p.grupo === `Grupo ${filtros.grupo}`)
        if (filtros.equipo !== 'todos') partidos = partidos.filter(p => p.equipo1.abrev === filtros.equipo || p.equipo2.abrev === filtros.equipo)
        if (filtros.sede !== 'todos') {
            const ciudadesMexico = ['Mexico City', 'Guadalajara', 'Monterrey']
            const ciudadesCanada = ['Toronto', 'Vancouver']
            const ciudadesUSA = ['Los Angeles', 'Dallas', 'Houston', 'Miami', 'Seattle', 'Atlanta', 'Philadelphia', 'Kansas City', 'New York New Jersey', 'San Francisco Bay Area', 'Boston']
            const mapaCiudades = { 'México': ciudadesMexico, 'Canadá': ciudadesCanada, 'USA': ciudadesUSA }
            partidos = partidos.filter(p => mapaCiudades[filtros.sede]?.includes(p.ciudad))
        }
        if (filtros.estado !== 'todos') partidos = partidos.filter(p => statusMap[filtros.estado]?.includes(p.status))

        if (partidos.length > 0) {
            tieneResultados = true
            const divDia = crearContenedorDia(diaTexto)
            partidos.forEach(p => divDia.querySelector('.partidos-lista').appendChild(createMatchCard(p)))
            cardsContainer.appendChild(divDia)
        }
    })

    if (!tieneResultados) {
        cardsContainer.innerHTML = `
            <div class="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 text-center mt-10 shadow-xl mx-auto">
                <div class="text-4xl mb-4">⚽</div>
                <p class="text-white/80 text-lg font-bebas tracking-widest">No hay partidos con estos filtros</p>
            </div>
        `
    }
}

function crearContenedorDia(fechaTexto) {
    const div = document.createElement('div')
    div.className = 'w-full bg-[#f5f1e8]/95 border border-white/20 rounded-[2rem] p-5 md:p-8 shadow-2xl backdrop-blur-md mb-6'
    div.innerHTML = `
        <h2 class="text-center text-[#111827] font-bebas text-2xl md:text-3xl uppercase tracking-widest mb-6 pb-4 border-b border-black/10">${fechaTexto}</h2>
        <div class="partidos-lista flex flex-col gap-3"></div>
    `
    return div
}

// ============================================================================
// SECCIÓN 9: TARJETA DE PARTIDO
// ============================================================================
function createMatchCard(partido) {
    const tarjeta = document.createElement('div')
    tarjeta.className = 'flex flex-col gap-1.5 py-4 px-3 bg-white/40 hover:bg-white border border-black/5 hover:border-violet-400/40 hover:shadow-md transition-all rounded-2xl group mb-3 last:mb-0'
    const enlaces = generarEnlacesCalendario(partido)

    const marcador = partido.status === 'NS' || !partido.status
        ? `<span class="text-[#111827]/80 text-sm md:text-lg font-extrabold tabular-nums bg-black/5 px-3 py-1 rounded-lg">${partido.hora}</span>`
        : partido.status === 'FT'
        ? `<span class="text-[#111827] text-sm md:text-lg font-extrabold tabular-nums bg-black/5 px-3 py-1 rounded-lg">${partido.equipo1.goles ?? 0} - ${partido.equipo2.goles ?? 0}</span>`
        : `<span class="text-red-600 text-sm md:text-lg font-extrabold tabular-nums bg-red-50 px-3 py-1 rounded-lg animate-pulse">${partido.equipo1.goles ?? 0} - ${partido.equipo2.goles ?? 0} <span class="text-xs">EN VIVO</span></span>`

    tarjeta.innerHTML = /*html*/`
        <div class="flex items-center justify-between gap-2">
            <div class="flex items-center gap-3 flex-1 justify-end">
                <span class="text-[#111827] font-bold text-base md:text-lg text-right group-hover:text-violet-800 transition-colors">${partido.equipo1.abrev}</span>
                <img src="${partido.equipo1.codigo}" class="w-10 h-7 object-cover rounded-sm shadow-sm ring-1 ring-black/10" alt="${partido.equipo1.abrev}">
            </div>
            <div class="flex flex-col items-center justify-center px-4 min-w-[80px]">${marcador}</div>
            <div class="flex items-center justify-start gap-3 flex-1">
                <img src="${partido.equipo2.codigo}" class="w-10 h-7 object-cover rounded-sm shadow-sm ring-1 ring-black/10" alt="${partido.equipo2.abrev}">
                <span class="text-[#111827] font-bold text-base md:text-lg text-left group-hover:text-violet-800 transition-colors">${partido.equipo2.abrev}</span>
            </div>
        </div>
        <div class="flex justify-center mt-2">
            <span class="px-3 py-1 bg-black/5 rounded-full text-[#111827]/60 text-xs font-semibold tracking-wide uppercase">
                ${partido.fase} <span class="mx-1 opacity-50">|</span> ${partido.grupo}
            </span>
        </div>
        <div class="flex justify-between items-center mt-2 px-2 relative">
            <p class="text-[#111827]/40 text-xs tracking-wide font-medium">📍 ${partido.estadio} · ${partido.ciudad}</p>
            <div class="relative inline-block">
                <button type="button" class="btn-agendar flex items-center gap-1.5 px-3 py-1.5 bg-violet-500/10 hover:bg-violet-500 hover:text-white text-violet-700 rounded-lg text-xs font-semibold transition-all duration-300">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    Agendar
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="opacity-70"><path d="m6 9 6 6 6-6"/></svg>
                </button>
                <div class="menu-agendar hidden absolute bottom-full right-0 mb-2 w-48 bg-white border border-gray-200 rounded-xl shadow-2xl z-[60] overflow-hidden">
                    <a href="${enlaces.googleLink}" target="_blank" class="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-sm text-gray-700 font-medium border-b border-gray-100">
                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M21.35 11.1h-9.1v2.73h5.36c-.23 1.17-.91 2.15-1.93 2.82v2.33h3.12c1.83-1.68 2.88-4.16 2.88-7.1 0-.6-.05-1.19-.14-1.78z" fill="#4285F4"/><path d="M12.25 21.36c2.56 0 4.7-.84 6.27-2.28l-3.12-2.33c-.85.57-1.93.9-3.15.9-2.42 0-4.47-1.63-5.2-3.83h-3.23v2.4c1.55 3.08 4.75 5.14 8.43 5.14z" fill="#34A853"/><path d="M7.05 13.82c-.19-.57-.29-1.17-.29-1.82s.1-1.25.29-1.82v-2.4H3.82c-.63 1.25-.99 2.66-.99 4.22s.36 2.97.99 4.22l3.23-2.4z" fill="#FBBC05"/><path d="M12.25 5.28c1.39 0 2.64.48 3.62 1.41l2.71-2.71C16.95 2.45 14.81 1.5 12.25 1.5 8.57 1.5 5.37 3.56 3.82 6.64l3.23 2.4c.73-2.2 2.78-3.76 5.2-3.76z" fill="#EA4335"/></svg>
                        Google Calendar
                    </a>
                    <a href="${enlaces.appleLink}" download="Mundial-Partido.ics" class="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-sm text-gray-700 font-medium border-b border-gray-100">
                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12.152 6.896c-.022-2.316 1.888-3.444 1.973-3.498-1.077-1.57-2.75-1.782-3.34-1.808-1.428-.144-2.793.844-3.524.844-.73 0-1.85-.826-3.023-.804-1.517.022-2.918.88-3.69 2.222-1.56 2.705-.398 6.705 1.123 8.898.74 1.07 1.61 2.26 2.76 2.22.1.002.203-.01.306-.034 1.107-.265 1.542-.87 2.875-.87 1.326 0 1.724.848 2.89.87 1.18.022 1.954-1.074 2.686-2.14.843-1.228 1.19-2.42 1.21-2.482-.027-.01-2.327-.893-2.346-3.418Z"/><path d="M10.875 3.013c.606-.732 1.016-1.75.904-2.764-1.267.05-2.616.84-3.242 1.593-.556.666-1.047 1.7-1.028 2.698 1.272.098 2.535-.783 3.366-1.527Z"/></svg>
                        Apple Calendar
                    </a>
                    <a href="${enlaces.outlookLink}" target="_blank" class="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-sm text-gray-700 font-medium">
                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12.5L2 6.5V18c0 .83.67 1.5 1.5 1.5h17c.83 0 1.5-.67 1.5-1.5V6.5L12 12.5z" fill="#2b579a"/><path d="M2 6.5v1.5L12 14l10-6V6.5c0-.83-.67-1.5-1.5-1.5H3.5C2.67 5 2 5.67 2 6.5z" fill="#1e395b"/></svg>
                        Outlook
                    </a>
                </div>
            </div>
        </div>
    `

    tarjeta.querySelector('.btn-agendar').addEventListener('click', (e) => {
        e.stopPropagation()
        document.querySelectorAll('.menu-agendar').forEach(m => {
            if (m !== tarjeta.querySelector('.menu-agendar')) m.classList.add('hidden')
        })
        tarjeta.querySelector('.menu-agendar').classList.toggle('hidden')
    })

    return tarjeta
}

// ============================================================================
// SECCIÓN 10: DRAWER DE FILTROS
// ============================================================================
function setupFiltros(section) {
    const drawer = document.createElement('div')
    drawer.id = 'filtros-drawer'
    drawer.className = 'fixed top-0 right-0 h-full w-80 bg-[#0b1220] border-l border-white/10 z-[100] transform translate-x-full transition-transform duration-300 flex flex-col'

    drawer.innerHTML = /*html*/`
        <div class="flex items-center justify-between p-5 border-b border-white/10">
            <h3 class="font-bebas text-xl text-white tracking-widest">FILTROS</h3>
            <button id="close-drawer" class="text-white/60 hover:text-white transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
        </div>
        <div class="flex-1 overflow-y-auto p-5 flex flex-col gap-6">
            <div>
                <p class="font-bebas text-sm text-violet-400 tracking-widest mb-3 uppercase">Estado</p>
                <div class="flex flex-wrap gap-2">
                    ${['todos','próximo','en vivo','resultado'].map(v => `
                        <button data-value="${v}" class="filtro-btn-estado px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${v === 'todos' ? 'bg-white text-black' : 'bg-white/10 text-white/80 hover:bg-white/20'}">
                            ${v === 'todos' ? 'Todos' : v === 'próximo' ? 'Próximo' : v === 'en vivo' ? '🔴 En Vivo' : 'Resultado'}
                        </button>
                    `).join('')}
                </div>
            </div>
            <div>
                <p class="font-bebas text-sm text-violet-400 tracking-widest mb-3 uppercase">Selección</p>
                <div class="relative">
                    <button type="button" id="equipo-trigger" class="w-full bg-[#131729] border border-white/20 text-white rounded-xl px-4 py-3 text-sm cursor-pointer font-medium flex items-center justify-between gap-2">
                        <span id="equipo-selected" class="flex items-center gap-2"><span class="text-white/50">Todas las selecciones</span></span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-violet-400 shrink-0"><path d="m6 9 6 6 6-6"/></svg>
                    </button>
                    <div id="equipo-list" class="hidden absolute left-0 right-0 top-full mt-1 bg-[#0f1623] border border-white/20 rounded-xl shadow-2xl z-[200] max-h-60 overflow-y-auto">
                        <div data-value="todos" class="equipo-option flex items-center gap-2 px-4 py-2.5 hover:bg-white/10 cursor-pointer text-sm text-white/70 hover:text-white transition-colors">Todas las selecciones</div>
                        ${Object.keys(BANDERAS_MAP).sort().map(eq => `
                            <div data-value="${eq}" class="equipo-option flex items-center gap-2 px-4 py-2.5 hover:bg-white/10 cursor-pointer text-sm text-white/80 hover:text-white transition-colors">
                                <img src="https://flagcdn.com/w20/${BANDERAS_MAP[eq]}.png" class="w-5 h-3.5 object-cover rounded-sm shrink-0">
                                <span>${eq}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            <div>
                <p class="font-bebas text-sm text-violet-400 tracking-widest mb-3 uppercase">Grupo</p>
                <div class="flex flex-wrap gap-2">
                    <button data-value="todos" class="filtro-btn-grupo px-3 py-1.5 rounded-lg text-xs font-semibold bg-white text-black transition-all">Todos</button>
                    ${['A','B','C','D','E','F','G','H','I','J','K','L'].map(g => `
                        <button data-value="${g}" class="filtro-btn-grupo px-3 py-1.5 rounded-lg text-xs bg-white/10 text-white/80 hover:bg-white/20 transition-all font-semibold">${g}</button>
                    `).join('')}
                </div>
            </div>
            <div>
                <p class="font-bebas text-sm text-violet-400 tracking-widest mb-3 uppercase">País Anfitrión</p>
                <div class="relative">
                    <button type="button" id="sede-trigger" class="w-full bg-[#131729] border border-white/20 text-white rounded-xl px-4 py-3 text-sm cursor-pointer font-medium flex items-center justify-between gap-2">
                        <span id="sede-selected" class="flex items-center gap-2"><span class="text-white/50">Todos los anfitriones</span></span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-violet-400 shrink-0"><path d="m6 9 6 6 6-6"/></svg>
                    </button>
                    <div id="sede-list" class="hidden absolute left-0 right-0 top-full mt-1 bg-[#0f1623] border border-white/20 rounded-xl shadow-2xl z-[200] overflow-hidden">
                        <div data-value="todos" class="sede-option flex items-center gap-2 px-4 py-2.5 hover:bg-white/10 cursor-pointer text-sm text-white/70 hover:text-white transition-colors">Todos los anfitriones</div>
                        <div data-value="México" data-flag="mx" data-label="México" class="sede-option flex items-center gap-2 px-4 py-2.5 hover:bg-white/10 cursor-pointer text-sm text-white/80 hover:text-white transition-colors">
                            <img src="https://flagcdn.com/w20/mx.png" class="w-5 h-3.5 object-cover rounded-sm shrink-0"><span>México</span>
                        </div>
                        <div data-value="USA" data-flag="us" data-label="Estados Unidos" class="sede-option flex items-center gap-2 px-4 py-2.5 hover:bg-white/10 cursor-pointer text-sm text-white/80 hover:text-white transition-colors">
                            <img src="https://flagcdn.com/w20/us.png" class="w-5 h-3.5 object-cover rounded-sm shrink-0"><span>Estados Unidos</span>
                        </div>
                        <div data-value="Canadá" data-flag="ca" data-label="Canadá" class="sede-option flex items-center gap-2 px-4 py-2.5 hover:bg-white/10 cursor-pointer text-sm text-white/80 hover:text-white transition-colors">
                            <img src="https://flagcdn.com/w20/ca.png" class="w-5 h-3.5 object-cover rounded-sm shrink-0"><span>Canadá</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="p-5 border-t border-white/10 flex gap-3">
            <button id="limpiar-filtros" class="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-bebas tracking-widest transition-all">Limpiar</button>
            <button id="aplicar-filtros" class="flex-1 py-2.5 rounded-xl bg-violet-500 hover:bg-violet-600 text-white text-sm font-bebas tracking-widest transition-all">Aplicar</button>
        </div>
    `
    document.body.appendChild(drawer)

    const overlay = section.querySelector('#drawer-overlay')

    section.querySelector('#toggle-filtros').addEventListener('click', () => {
        drawer.classList.remove('translate-x-full')
        overlay.classList.remove('hidden')
        setTimeout(() => overlay.classList.add('opacity-100'), 10)
    })

    const cerrarDrawer = () => {
        drawer.classList.add('translate-x-full')
        overlay.classList.remove('opacity-100')
        setTimeout(() => overlay.classList.add('hidden'), 300)
    }

    drawer.querySelector('#close-drawer').addEventListener('click', cerrarDrawer)
    drawer.querySelector('#aplicar-filtros').addEventListener('click', cerrarDrawer)
    overlay.addEventListener('click', () => {
        cerrarDrawer()
        cerrarMobileCal(section)
    })

    section.querySelector('#clear-filters-btn').addEventListener('click', () => {
        resetSelectsFiltros(section)
        render(section)
    })

    drawer.querySelector('#limpiar-filtros').addEventListener('click', () => {
        resetSelectsFiltros(section)
        render(section)
    })

    const setupBotonesFiltro = (selector, key) => {
        drawer.querySelectorAll(selector).forEach(btn => {
            btn.addEventListener('click', () => {
                drawer.querySelectorAll(selector).forEach(b => {
                    b.classList.remove('bg-white', 'text-black')
                    b.classList.add('bg-white/10', 'text-white/80')
                })
                btn.classList.remove('bg-white/10', 'text-white/80')
                btn.classList.add('bg-white', 'text-black')
                filtros[key] = btn.dataset.value
                const error = validarFiltros(filtros.equipo, filtros.grupo, filtros.sede)
                if (error) {
                    mostrarToast(error, 'error')
                    filtros[key] = 'todos'
                    btn.classList.remove('bg-white', 'text-black')
                    btn.classList.add('bg-white/10', 'text-white/80')
                    drawer.querySelector(`${selector}[data-value="todos"]`).classList.replace('bg-white/10', 'bg-white')
                    drawer.querySelector(`${selector}[data-value="todos"]`).classList.replace('text-white/80', 'text-black')
                }
                render(section)
            })
        })
    }
    setupBotonesFiltro('.filtro-btn-estado', 'estado')
    setupBotonesFiltro('.filtro-btn-grupo', 'grupo')

    const equipoTrigger = drawer.querySelector('#equipo-trigger')
    const equipoList = drawer.querySelector('#equipo-list')
    const equipoSelected = drawer.querySelector('#equipo-selected')

    equipoTrigger.addEventListener('click', (e) => { e.stopPropagation(); equipoList.classList.toggle('hidden') })

    drawer.querySelectorAll('.equipo-option').forEach(opt => {
        opt.addEventListener('click', () => {
            const valor = opt.dataset.value
            equipoSelected.innerHTML = valor === 'todos'
                ? `<span class="text-white/50">Todas las selecciones</span>`
                : `<img src="https://flagcdn.com/w20/${BANDERAS_MAP[valor]}.png" class="w-5 h-3.5 object-cover rounded-sm"><span class="text-white">${valor}</span>`
            equipoList.classList.add('hidden')
            filtros.equipo = valor
            const error = validarFiltros(filtros.equipo, filtros.grupo, filtros.sede)
            if (error) {
                mostrarToast(error, 'error')
                filtros.equipo = 'todos'
                equipoSelected.innerHTML = `<span class="text-white/50">Todas las selecciones</span>`
            }
            render(section)
        })
    })

    const sedeTrigger = drawer.querySelector('#sede-trigger')
    const sedeList = drawer.querySelector('#sede-list')
    const sedeSelected = drawer.querySelector('#sede-selected')

    sedeTrigger.addEventListener('click', (e) => { e.stopPropagation(); equipoList.classList.add('hidden'); sedeList.classList.toggle('hidden') })

    drawer.querySelectorAll('.sede-option').forEach(opt => {
        opt.addEventListener('click', () => {
            const valor = opt.dataset.value
            const flag = opt.dataset.flag
            const label = opt.dataset.label
            sedeSelected.innerHTML = valor === 'todos'
                ? `<span class="text-white/50">Todos los anfitriones</span>`
                : `<img src="https://flagcdn.com/w20/${flag}.png" class="w-5 h-3.5 object-cover rounded-sm"><span class="text-white">${label}</span>`
            sedeList.classList.add('hidden')
            filtros.sede = valor
            const error = validarFiltros(filtros.equipo, filtros.grupo, filtros.sede)
            if (error) {
                mostrarToast(error, 'error')
                filtros.sede = 'todos'
                sedeSelected.innerHTML = `<span class="text-white/50">Todos los anfitriones</span>`
            }
            render(section)
        })
    })

    document.addEventListener('click', () => {
        equipoList.classList.add('hidden')
        sedeList.classList.add('hidden')
    })
}

// ============================================================================
// SECCIÓN 11: HELPERS DE FILTROS Y TOAST
// ============================================================================
function resetSelectsFiltros(section) {
    filtros = { estado: 'todos', grupo: 'todos', equipo: 'todos', sede: 'todos' }
    const drawer = document.getElementById('filtros-drawer')
    if (!drawer) return
    drawer.querySelector('#equipo-selected').innerHTML = `<span class="text-white/50">Todas las selecciones</span>`
    drawer.querySelector('#sede-selected').innerHTML = `<span class="text-white/50">Todos los anfitriones</span>`
    ;['.filtro-btn-estado', '.filtro-btn-grupo'].forEach(sel => {
        drawer.querySelectorAll(sel).forEach(b => {
            b.classList.remove('bg-white', 'text-black')
            b.classList.add('bg-white/10', 'text-white/80')
        })
        const todosBtn = drawer.querySelector(`${sel}[data-value="todos"]`)
        if (todosBtn) {
            todosBtn.classList.replace('bg-white/10', 'bg-white')
            todosBtn.classList.replace('text-white/80', 'text-black')
        }
    })
}

function validarFiltros(equipo, grupo, sede) {
    if (equipo !== 'todos' && grupo !== 'todos' && GRUPOS_MAP[equipo] !== `Grupo ${grupo}`)
        return `${equipo} no juega en el Grupo ${grupo}`
    if (equipo !== 'todos' && sede !== 'todos' && SEDES_MAP[equipo] !== sede)
        return `${equipo} no juega en ${sede}`
    return null
}

function mostrarToast(mensaje, tipo = 'info') {
    document.getElementById('filtro-toast')?.remove()
    const toast = document.createElement('div')
    toast.id = 'filtro-toast'
    toast.className = `fixed top-6 left-1/2 -translate-x-1/2 z-[999] flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium shadow-2xl ${
        tipo === 'error' ? 'bg-red-900/90 border border-red-500/30 text-red-200' : 'bg-[#111] border border-white/10 text-white'
    }`
    toast.innerHTML = `
        <svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            ${tipo === 'error'
                ? '<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"/>'
                : '<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>'
            }
        </svg>
        <span>${mensaje}</span>
    `
    document.body.appendChild(toast)
    setTimeout(() => toast.remove(), 3000)
}

// ============================================================================
// SECCIÓN 12: NAVEGACIÓN Y MINI CALENDARIO MÓVIL
// ============================================================================
function cerrarMobileCal(section) {
    const calDrawer = section.querySelector('#mobile-cal-drawer')
    const overlay = section.querySelector('#drawer-overlay')
    if (calDrawer) calDrawer.classList.add('-translate-x-full')
    if (overlay) {
        overlay.classList.remove('opacity-100')
        setTimeout(() => overlay.classList.add('hidden'), 300)
    }
}

function setupEvents(section) {
    section.querySelector('#prev').addEventListener('click', () => {
        if (diaActualIndex > 0) { diaActualIndex--; render(section) }
    })
    section.querySelector('#next').addEventListener('click', () => {
        if (diaActualIndex < diasUnicos.length - 1) { diaActualIndex++; render(section) }
    })

    // Botón calendario móvil — abre el mini calendario en drawer lateral izquierdo
    section.querySelector('#btn-mobile-cal').addEventListener('click', () => {
        const calDrawer = section.querySelector('#mobile-cal-drawer')
        const overlay = section.querySelector('#drawer-overlay')
        calDrawer.classList.remove('-translate-x-full')
        overlay.classList.remove('hidden')
        setTimeout(() => overlay.classList.add('opacity-100'), 10)
    })

    // Botón cerrar del mini calendario móvil
    section.querySelector('#close-mobile-cal').addEventListener('click', () => {
        cerrarMobileCal(section)
    })

    setupFiltros(section)
}