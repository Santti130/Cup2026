// === CONSTANTES ===
const START_DATE = new Date('2025-12-01T00:00:00Z')
const WORLD_CUP  = new Date('2026-06-11T19:00:00Z') // 14:00 Colombia = 19:00 UTC

const PARTIDOS_FALLBACK = [
    {
        grupo: 'Grupo A', jornada: 'Jornada 1',
        equipo1: { codigo: 'mx', abrev: 'MEX' },
        equipo2: { codigo: 'za', abrev: 'RSA' },
        fecha: '11 JUN', hora: '14:00',
        sede: { pais: 'México', ciudad: 'CDMX', estadio: 'Estadio Azteca', capacidad: '83,264' },
        clima: { condicion: '🌦️', descripcion: 'Lluvioso', temp: '25°C', humedad: '66%' }
    },
    {
        grupo: 'Grupo A', jornada: 'Jornada 1',
        equipo1: { codigo: 'kr', abrev: 'KOR' },
        equipo2: { codigo: 'cz', abrev: 'CZE' },
        fecha: '11 JUN', hora: '21:00',
        sede: { pais: 'EE. UU.', ciudad: 'Inglewood', estadio: 'SoFi Stadium', capacidad: '70,240' },
        clima: { condicion: '☀️', descripcion: 'Soleado', temp: '25°C', humedad: '65%' }
    }
]

// === MAPAS ===
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
    'Group Stage - 1': 'Fase de Grupos - J1', 'Group Stage - 2': 'Fase de Grupos - J2',
    'Group Stage - 3': 'Fase de Grupos - J3', 'Round of 32': 'Dieciseisavos',
    'Round of 16': 'Octavos de Final', 'Quarter-finals': 'Cuartos de Final',
    'Semi-finals': 'Semifinales', '3rd Place Final': 'Tercer Puesto', 'Final': 'Final',
}

// Coordenadas de sedes para Open-Meteo
const SEDES_COORDS = {
    'Estadio Azteca':          { lat: 19.30,  lon: -99.15  },
    'Estadio Akron':           { lat: 20.67,  lon: -103.46 },
    'Estadio BBVA':            { lat: 25.67,  lon: -100.24 },
    'MetLife Stadium':         { lat: 40.81,  lon: -74.07  },
    'AT&T Stadium':            { lat: 32.75,  lon: -97.09  },
    'SoFi Stadium':            { lat: 33.95,  lon: -118.34 },
    'Hard Rock Stadium':       { lat: 25.96,  lon: -80.24  },
    'NRG Stadium':             { lat: 29.68,  lon: -95.41  },
    'Lumen Field':             { lat: 47.60,  lon: -122.33 },
    'Mercedes-Benz Stadium':   { lat: 33.76,  lon: -84.40  },
    'Lincoln Financial Field': { lat: 39.90,  lon: -75.17  },
    'Arrowhead Stadium':       { lat: 39.05,  lon: -94.48  },
    "Levi's Stadium":          { lat: 37.40,  lon: -121.97 },
    'Gillette Stadium':        { lat: 42.09,  lon: -71.26  },
    'BMO Field':               { lat: 43.63,  lon: -79.42  },
    'BC Place':                { lat: 49.28,  lon: -123.11 },
}

function climaDesdeWMO(code) {
    if (code === 0)  return { emoji: '☀️',  desc: 'Despejado' }
    if (code <= 2)   return { emoji: '⛅',  desc: 'Parcialmente nublado' }
    if (code === 3)  return { emoji: '☁️',  desc: 'Nublado' }
    if (code <= 49)  return { emoji: '🌫️', desc: 'Niebla' }
    if (code <= 59)  return { emoji: '🌦️', desc: 'Llovizna' }
    if (code <= 69)  return { emoji: '🌧️', desc: 'Lluvia' }
    if (code <= 79)  return { emoji: '❄️',  desc: 'Nieve' }
    if (code <= 84)  return { emoji: '🌧️', desc: 'Chubascos' }
    if (code <= 99)  return { emoji: '⛈️',  desc: 'Tormenta' }
    return { emoji: '🌡️', desc: 'Variable' }
}

// Caché de clima para no repetir llamadas
const climaCache = {}

async function obtenerClima(estadio) {
    if (climaCache[estadio]) return climaCache[estadio]
    const sede = SEDES_COORDS[estadio]
    if (!sede) return null
    try {
        const res  = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${sede.lat}&longitude=${sede.lon}&current=temperature_2m,weathercode&timezone=auto`)
        const data = await res.json()
        const temp = Math.round(data.current.temperature_2m)
        const { emoji, desc } = climaDesdeWMO(data.current.weathercode)
        const result = { temp: `${temp}°C`, emoji, desc }
        climaCache[estadio] = result
        return result
    } catch { return null }
}

// ============================================================================
// API — caché compartido con calendar.js
// ============================================================================
async function cargarPartidosAPI() {
    const CACHE_KEY      = 'cuphub_fixtures_cache_v2'
    const CACHE_TIME_KEY = 'cuphub_fixtures_time_v2'
    const CACHE_DURATION = 60 * 1000
    try {
        const ahora = Date.now()
        const ultimo = parseInt(localStorage.getItem(CACHE_TIME_KEY) || '0')
        const cacheData = localStorage.getItem(CACHE_KEY)
        if ((ahora - ultimo) < CACHE_DURATION && cacheData) {
            const parsed = JSON.parse(cacheData)
            // Validar que los datos tienen la estructura correcta
            if (parsed.length > 0 && parsed[0].equipo1?.logo) return parsed
            // Si no tienen logo, limpiar caché y llamar API de nuevo
            localStorage.removeItem('cuphub_fixtures_cache')
            localStorage.removeItem('cuphub_fixtures_time')
        }

        const API_KEY = import.meta.env.VITE_API_FOOTBALL_KEY
        const response = await fetch('https://v3.football.api-sports.io/fixtures?league=1&season=2026', {
            headers: { 'x-apisports-key': API_KEY }
        })
        const data = await response.json()
        const partidos = normalizarPartidos(data.response)
        localStorage.setItem(CACHE_KEY, JSON.stringify(partidos))
        localStorage.setItem(CACHE_TIME_KEY, ahora.toString())
        return partidos
    } catch { return [] }
}

function normalizarPartidos(apiResponse) {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
    return apiResponse.map(item => {
        const dateObj = new Date(item.fixture.date)
        const local   = new Date(dateObj.toLocaleString('en-US', { timeZone: tz }))
        const home    = item.teams.home.name
        const away    = item.teams.away.name
        return {
            id:      item.fixture.id,
            hora:    dateObj.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: tz }),
            equipo1: { abrev: home, logo: item.teams.home.logo, goles: item.goals.home },
            equipo2: { abrev: away, logo: item.teams.away.logo, goles: item.goals.away },
            fase:    FASES_MAP[item.league.round] || item.league.round,
            grupo:   GRUPOS_MAP[home] || GRUPOS_MAP[away] || '',
            estadio: item.fixture.venue.name || '',
            ciudad:  item.fixture.venue.city || '',
            dia: local.getDate(), mes: local.getMonth(),
            status: item.fixture.status.short,
            minuto: item.fixture.status.elapsed
        }
    }).sort((a, b) => new Date(2026, a.mes, a.dia) - new Date(2026, b.mes, b.dia))
}

function obtenerPartidosActuales(partidos) {
    const ahora = new Date()
    const hoy = partidos.filter(p =>
        p.dia === ahora.getDate() && p.mes === ahora.getMonth() && ahora.getFullYear() === 2026
    )
    if (hoy.length > 0) return hoy
    const futuro = partidos.filter(p => new Date(2026, p.mes, p.dia) > ahora)
    if (!futuro.length) return []
    const next = futuro[0]
    return partidos.filter(p => p.dia === next.dia && p.mes === next.mes)
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================
export function renderCountdown() {
    const section = document.createElement('section')
    section.className = 'relative flex flex-col items-center justify-center gap-4 md:gap-6 overflow-hidden bg-cover bg-center bg-no-repeat'
    section.style.backgroundImage = window.innerWidth >= 768
        ? "url('/img/fondo-home-countdown.png')"
        : "url('/img/fondo-home-countdown-phone.png')"
    section.style.minHeight = '100vh'

    section.innerHTML = /*html*/`

    <!-- MÓVIL -->
    <div class="md:hidden flex flex-col items-center gap-6 w-full px-6 pt-5 pb-28 z-10">
        <h2 class="text-5xl font-black text-white text-center font-bebas tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)]">FALTAN</h2>

        <div class="relative w-52 h-52 flex items-center justify-center">
            <div class="absolute -inset-3 rounded-full bg-amber-900/20 blur-2xl"></div>
            <div class="absolute inset-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/5"></div>
            <div class="absolute inset-10 rounded-full bg-gradient-to-br from-white/10 via-transparent to-white/5"></div>
            <svg class="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 200 200">
                <defs>
                    <linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#fbbf24"/><stop offset="25%" stop-color="#f59e0b"/>
                        <stop offset="50%" stop-color="#d97706"/><stop offset="75%" stop-color="#b45309"/>
                        <stop offset="100%" stop-color="#fbbf24"/>
                    </linearGradient>
                </defs>
                <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="4"/>
                <circle id="ring-progress" cx="100" cy="100" r="90" fill="none" stroke="url(#ring-gradient)" stroke-width="10" stroke-linecap="round" stroke-dasharray="565" stroke-dashoffset="40"/>
            </svg>
            <div class="relative z-10 flex flex-col items-center justify-center">
                <span id="days-mobile" class="text-white font-bebas text-7xl leading-none">00</span>
                <span class="text-white/60 font-bebas text-lg tracking-widest uppercase">Días</span>
            </div>
        </div>

        <div class="flex items-center justify-center gap-0 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden">
            <div class="flex flex-col items-center px-6 py-3">
                <span id="hours-mobile" class="text-white font-bebas text-4xl leading-none">00</span>
                <span class="text-white/50 font-bebas text-xs tracking-widest uppercase">Horas</span>
            </div>
            <div class="w-px h-12 bg-white/10"></div>
            <div class="flex flex-col items-center px-6 py-3">
                <span id="minutes-mobile" class="text-white font-bebas text-4xl leading-none">00</span>
                <span class="text-white/50 font-bebas text-xs tracking-widest uppercase">Minutos</span>
            </div>
            <div class="w-px h-12 bg-white/10"></div>
            <div class="flex flex-col items-center px-6 py-3">
                <span id="seconds-mobile" class="text-white font-bebas text-4xl leading-none">00</span>
                <span class="text-white/50 font-bebas text-xs tracking-widest uppercase">Segundos</span>
            </div>
        </div>

        <span class="text-xl font-black text-white text-center font-bebas tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)]">
            PARA EL INICIO DE LA COPA DEL MUNDO 2026
        </span>
        <p id="hora-local-mobile" class="text-amber-400/80 font-bebas text-base tracking-widest text-center -mt-4"></p>

        <div class="w-full max-w-sm border-t border-white/10"></div>
        <h2 class="text-white font-bebas text-xl tracking-widest uppercase">Próximos Partidos</h2>
        <div id="cards-container-mobile" class="flex flex-col gap-3 w-full max-w-sm"></div>

        <a href="/calendario" class="w-full max-w-sm flex items-center justify-center gap-3 bg-white/5 border border-white/10 rounded-2xl py-4 text-white/80 font-bebas tracking-widest hover:bg-white/10 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line></svg>
            VER CALENDARIO COMPLETO
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </a>
    </div>

    <!-- DESKTOP -->
    <div class="hidden md:flex flex-col items-center gap-6 z-10">

        <div class="absolute top-15 left-4 bg-black/70 backdrop-blur-sm border border-white/10 rounded-xl px-5 py-3 w-64 font-bebas transition-all hover:border-cyan-400/50 hover:shadow-[0_8px_50px_0_rgba(34,211,238,0.2)]">
            <p class="text-white/90 text-xl tracking-wide">Cargando Mundial 2026...</p>
            <div class="flex items-center gap-2">
                <div class="flex-1 bg-white/15 rounded-full h-2 relative">
                    <div id="progress-bar" class="h-2 rounded-full bg-gradient-to-r from-yellow-200 via-amber-400 to-yellow-600 relative" style="width: 0%">
                        <div class="absolute -right-1.5 -top-1 w-4 h-4 rounded-full bg-yellow-400 border-2 border-yellow-200 shadow-[0_0_6px_2px_rgba(234,179,8,0.6)]"></div>
                    </div>
                </div>
                <span id="progress-percent" class="text-white text-base tracking-wide">0%</span>
            </div>
        </div>

        <div class="relative mt-5 md:mt-6 xl:mt-10 flex flex-col items-center gap-6 top-5">
            <div class="flex gap-8 items-center font-bebas">
                <div class="relative group">
                    <div class="relative flex flex-col items-center justify-center bg-black/40 backdrop-blur-md border border-white/15 p-5 rounded-4xl min-w-[100px] shadow-2xl hover:-translate-y-1 transition-transform duration-500 hover:border-white/30 group">
                        <div class="absolute -inset-1 bg-white rounded-4xl blur opacity-0 group-hover:opacity-10 transition duration-700"></div>
                        <span id="days" class="text-xl xl:text-8xl 2xl:text-9xl font-bold text-white tabular-nums leading-none">00</span>
                        <span class="text-gray-300 text-lg xl:text-xl 2xl:text-2xl uppercase tracking-widest font-bold">Días</span>
                    </div>
                </div>
                <div class="text-5xl 2xl:text-8xl font-black text-white/40 self-center -mt-2">:</div>
                <div class="relative flex flex-col items-center justify-center bg-black/40 backdrop-blur-md border border-white/15 p-5 rounded-4xl min-w-[100px] shadow-2xl hover:-translate-y-1 transition-transform duration-500 hover:border-white/30 group">
                    <div class="absolute -inset-1 bg-white rounded-4xl blur opacity-0 group-hover:opacity-10 transition duration-700"></div>
                    <span id="hours" class="text-xl xl:text-8xl 2xl:text-9xl font-bold text-white tabular-nums leading-none">00</span>
                    <span class="text-gray-300 text-lg xl:text-xl 2xl:text-2xl uppercase tracking-widest font-bold">Horas</span>
                </div>
                <div class="text-5xl 2xl:text-8xl font-black text-white/40 self-center -mt-2">:</div>
                <div class="relative flex flex-col items-center justify-center bg-black/40 backdrop-blur-md border border-white/15 p-5 rounded-4xl min-w-[100px] shadow-2xl hover:-translate-y-1 transition-transform duration-500 hover:border-white/30 group">
                    <div class="absolute -inset-1 bg-white rounded-4xl blur opacity-0 group-hover:opacity-10 transition duration-700"></div>
                    <span id="minutes" class="text-xl xl:text-8xl 2xl:text-9xl font-bold text-white">00</span>
                    <span class="text-gray-300 text-lg xl:text-xl 2xl:text-2xl uppercase tracking-widest font-bold">Minutos</span>
                </div>
                <div class="text-5xl 2xl:text-8xl font-black text-white/40 self-center -mt-2">:</div>
                <div class="relative flex flex-col items-center justify-center bg-black/40 backdrop-blur-md border border-white/15 p-5 rounded-4xl min-w-[100px] shadow-2xl hover:-translate-y-1 transition-transform duration-500 hover:border-white/30 group">
                    <div class="absolute -inset-1 bg-white rounded-4xl blur opacity-0 group-hover:opacity-10 transition duration-700"></div>
                    <span id="seconds" class="text-xl xl:text-8xl 2xl:text-9xl font-bold text-white">00</span>
                    <span class="text-gray-300 text-lg xl:text-xl 2xl:text-2xl uppercase tracking-widest font-bold">Segundos</span>
                </div>
            </div>
            <h2 class="text-xl xl:text-5xl 2xl:text-7xl font-black text-white text-center font-bebas tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)]">PARA EL INICIO DEL MUNDIAL 2026</h2>
            <p class="text-lg xl:text-xl 2xl:text-2xl text-white/70 text-center font-bebas tracking-wide uppercase bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)]">
                El evento más importante del mundo del fútbol está por comenzar.
            </p>
            <p id="hora-local-desktop" class="text-amber-400/80 font-bebas text-lg tracking-widest text-center -mt-4"></p>
        </div>

        <div class="flex items-center gap-4">
            <div class="w-30 h-px bg-gradient-to-r from-transparent to-lime-500"></div>
            <h2 class="text-white text-xl xl:text-4xl 2xl:text-5xl font-bold uppercase tracking-widest font-bebas bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">Próximos Partidos</h2>
            <div class="w-30 h-px bg-gradient-to-l from-transparent to-sky-500"></div>
        </div>
        <div id="cards-container" class="flex justify-center items-center gap-6 w-full px-8 font-bebas tracking-wide mb-20"></div>
    </div>

    <div class="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-b from-transparent to-[#0b1220] pointer-events-none z-20"></div>
    `

    // COUNTDOWN
    function updateCountdown() {
        const now  = new Date()
        const diff = WORLD_CUP - now
        const days    = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)))
        const hours   = Math.max(0, Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))
        const minutes = Math.max(0, Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)))
        const seconds = Math.max(0, Math.floor((diff % (1000 * 60)) / 1000))

        updateElement(section, '#days', days)
        updateElement(section, '#hours', hours)
        updateElement(section, '#minutes', minutes)
        updateElement(section, '#seconds', seconds)
        updateElement(section, '#days-mobile', days)
        updateElement(section, '#hours-mobile', hours)
        updateElement(section, '#minutes-mobile', minutes)
        updateElement(section, '#seconds-mobile', seconds)

        const total   = WORLD_CUP - START_DATE
        const elapsed = now - START_DATE
        const percent = Math.min(Math.max(Math.floor((elapsed / total) * 100), 0), 100)
        updateProgress(section, '#progress-bar', '#progress-percent', percent)

        const ring = section.querySelector('#ring-progress')
        if (ring) {
            const c = 2 * Math.PI * 90
            ring.setAttribute('stroke-dashoffset', c - (c * percent / 100))
        }

        // Hora local de inicio
        const horaLocal = WORLD_CUP.toLocaleTimeString(navigator.language, {
            hour: '2-digit', minute: '2-digit', hour12: false,
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
        })
        const textoHora = `Inicio en tu país: ${horaLocal} hrs`
        const elDesktop = section.querySelector('#hora-local-desktop')
        const elMobile  = section.querySelector('#hora-local-mobile')
        if (elDesktop) elDesktop.textContent = textoHora
        if (elMobile)  elMobile.textContent  = textoHora
    }

    updateCountdown()
    setInterval(updateCountdown, 1000)
    renderMobileCards(section)
    renderDesktopCards(section)
    return section
}

// ============================================================================
// HELPERS
// ============================================================================
function updateElement(section, selector, value) {
    const el = section.querySelector(selector)
    if (el) el.textContent = String(value).padStart(2, '0')
}

function updateProgress(section, barSel, textSel, percent) {
    const bar  = section.querySelector(barSel)
    const text = section.querySelector(textSel)
    if (bar)  bar.style.width    = percent + '%'
    if (text) text.textContent   = percent + '%'
}

// ============================================================================
// TARJETAS MÓVIL
// ============================================================================
async function renderMobileCards(section) {
    const container = section.querySelector('#cards-container-mobile')
    if (!container) return

    const dibujar = (partidos) => {
        const actuales = obtenerPartidosActuales(partidos)
        container.innerHTML = actuales.length > 0
            ? actuales.map(p => tarjetaMobile(p)).join('')
            : PARTIDOS_FALLBACK.map(p => `
                <div class="flex flex-col bg-white/5 border border-white/10 rounded-2xl">
                    <div class="flex items-center justify-between px-10 pt-2 pb-1">
                        <div class="flex items-center gap-3 flex-1">
                            <img src="https://flagcdn.com/w80/${p.equipo1.codigo}.png" class="w-10 h-10 rounded-full object-cover border border-white/10">
                            <span class="text-white font-bebas text-lg tracking-wider">${p.equipo1.abrev}</span>
                        </div>
                        <span class="text-white/40 font-bebas text-sm">VS</span>
                        <div class="flex items-center gap-3 flex-1 justify-end">
                            <span class="text-white font-bebas text-lg tracking-wider">${p.equipo2.abrev}</span>
                            <img src="https://flagcdn.com/w80/${p.equipo2.codigo}.png" class="w-10 h-10 rounded-full object-cover border border-white/10">
                        </div>
                    </div>
                    <div class="flex items-center justify-center gap-3 pb-2">
                        <span class="text-white/40 font-bebas text-xs tracking-wider">${p.fecha} · ${p.hora}</span>
                    </div>
                </div>`).join('')
    }

    const partidos = await cargarPartidosAPI()
    dibujar(partidos)
    setInterval(async () => dibujar(await cargarPartidosAPI()), 60000)
}

function tarjetaMobile(p) {
    const enVivo    = ['1H','HT','2H','ET','PEN'].includes(p.status)
    const finalizado = p.status === 'FT'

    const marcador = enVivo
        ? `<div class="flex flex-col items-center">
               <span class="text-red-400 font-bebas text-2xl animate-pulse">${p.equipo1.goles ?? 0} - ${p.equipo2.goles ?? 0}</span>
               <span class="text-red-400/70 text-xs font-bebas">🔴 ${p.minuto ? p.minuto + "'" : 'EN VIVO'}</span>
           </div>`
        : finalizado
        ? `<span class="text-white/60 font-bebas text-2xl">${p.equipo1.goles ?? 0} - ${p.equipo2.goles ?? 0}</span>`
        : `<span class="text-white/60 font-bebas text-xl tracking-widest">${p.hora}</span>`

    const badge = enVivo
        ? `<span class="px-2 py-0.5 bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-bebas rounded-full">EN VIVO</span>`
        : finalizado
        ? `<span class="px-2 py-0.5 bg-white/5 border border-white/10 text-white/40 text-xs font-bebas rounded-full">FINALIZADO</span>`
        : `<span class="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bebas rounded-full">${p.grupo}</span>`

    return `
        <div class="flex flex-col bg-white/5 border ${enVivo ? 'border-red-500/30' : 'border-white/10'} rounded-2xl p-3 gap-2">
            <div class="flex items-center justify-between px-2">${badge}</div>
            <div class="flex items-center justify-between px-3 gap-2">
                <div class="flex flex-col items-center gap-1 w-20 shrink-0">
                    <img src="${p.equipo1.logo}" class="w-10 h-10 rounded-full object-cover object-center border border-white/10 bg-white/10 p-0.5">
                    <span class="text-white font-bebas text-xs tracking-wider text-center leading-tight">${p.equipo1.abrev}</span>
                </div>
                <div class="flex-1 flex justify-center">${marcador}</div>
                <div class="flex flex-col items-center gap-1 w-20 shrink-0">
                    <img src="${p.equipo2.logo}" class="w-10 h-10 rounded-full object-cover object-center border border-white/10 bg-white/10 p-0.5">
                    <span class="text-white font-bebas text-xs tracking-wider text-center leading-tight">${p.equipo2.abrev}</span>
                </div>
            </div>
            </div>
        </div>`
}

// ============================================================================
// TARJETAS DESKTOP — flip 3D + clima real
// ============================================================================
async function renderDesktopCards(section) {
    const container = section.querySelector('#cards-container')
    if (!container) return

    const dibujar = async (partidos) => {
        const actuales = obtenerPartidosActuales(partidos)
        if (actuales.length > 0) {
            // Construir tarjetas con clima (async)
            const tarjetas = await Promise.all(actuales.map(p => tarjetaDesktop(p)))
            container.innerHTML = tarjetas.join('')
        } else {
            // Fallback con datos fijos
            container.innerHTML = PARTIDOS_FALLBACK.map(p => `
                <div class="relative cursor-pointer group flex-shrink-0" style="width:300px;height:240px;perspective:1000px">
                    <div class="relative w-full h-full transition-transform duration-700 group-hover:[transform:rotateY(180deg)] [transform-origin:center] will-change-transform" style="transform-style:preserve-3d">
                        <div class="absolute inset-0 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl px-6 py-5 shadow-xl flex flex-col items-center justify-between" style="backface-visibility:hidden;-webkit-backface-visibility:hidden;transform:translate3d(0,0,1px)">
                            <div class="flex items-center gap-2">
                                <span class="px-2.5 py-0.5 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bebas rounded-full tracking-widest">${p.grupo}</span>
                                <span class="px-2.5 py-0.5 bg-white/5 border border-white/15 text-white/50 text-xs font-bebas rounded-full tracking-widest">${p.jornada}</span>
                            </div>
                            <div class="flex items-center justify-center gap-5 w-full">
                                <div class="flex flex-col items-center gap-2">
                                    <img src="https://flagcdn.com/w80/${p.equipo1.codigo}.png" class="w-14 h-14 rounded-full object-cover border-2 border-white/10 shadow-lg">
                                    <span class="text-white font-bebas text-base tracking-wider">${p.equipo1.abrev}</span>
                                </div>
                                <div class="flex flex-col items-center gap-1">
                                    <span class="text-white font-bebas text-3xl tracking-widest">${p.hora}</span>
                                    <span class="text-white/30 font-bebas text-xs tracking-widest">HRS</span>
                                </div>
                                <div class="flex flex-col items-center gap-2">
                                    <img src="https://flagcdn.com/w80/${p.equipo2.codigo}.png" class="w-14 h-14 rounded-full object-cover border-2 border-white/10 shadow-lg">
                                    <span class="text-white font-bebas text-base tracking-wider">${p.equipo2.abrev}</span>
                                </div>
                            </div>
                            <p class="text-white/25 text-xs font-bebas tracking-wider">Pasa el cursor para más info</p>
                        </div>
                        <div class="absolute inset-0 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl px-6 py-5 shadow-xl flex flex-col items-center justify-center gap-2" style="backface-visibility:hidden;-webkit-backface-visibility:hidden;transform:rotateY(180deg) translate3d(0,0,1px)">
                            <p class="text-white/50 text-xs font-bebas tracking-widest uppercase">${p.sede.pais} · ${p.sede.ciudad}</p>
                            <p class="text-white font-bebas text-xl tracking-wide text-center">${p.sede.estadio}</p>
                            <p class="text-white/40 text-xs font-bebas">Capacidad: ${p.sede.capacidad}</p>
                            <div class="border-t border-white/10 w-full my-1"></div>
                            <div class="flex items-center justify-center gap-4">
                                <div class="flex flex-col items-center">
                                    <span class="text-2xl">${p.clima.condicion}</span>
                                    <span class="text-white/40 text-xs font-bebas mt-1">${p.clima.descripcion}</span>
                                </div>
                                <div class="flex flex-col items-center">
                                    <span class="text-white font-bebas text-2xl">${p.clima.temp}</span>
                                    <span class="text-white/40 text-xs font-bebas mt-1">Temp</span>
                                </div>
                                <div class="flex flex-col items-center">
                                    <span class="text-white font-bebas text-2xl">${p.clima.humedad}</span>
                                    <span class="text-white/40 text-xs font-bebas mt-1">Humedad</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`).join('')
        }
    }

    const partidos = await cargarPartidosAPI()
    await dibujar(partidos)
    setInterval(async () => await dibujar(await cargarPartidosAPI()), 60000)
}

async function tarjetaDesktop(p) {
    const enVivo    = ['1H','HT','2H','ET','PEN'].includes(p.status)
    const finalizado = p.status === 'FT'
    const border    = enVivo ? 'border-red-500/40' : 'border-white/10'

    const marcador = enVivo
        ? `<div class="flex flex-col items-center gap-1">
               <span class="text-red-400 font-bebas text-5xl leading-none animate-pulse">${p.equipo1.goles ?? 0} - ${p.equipo2.goles ?? 0}</span>
               <span class="text-red-400/80 text-xs font-bebas tracking-widest">🔴 ${p.minuto ? p.minuto + "'" : 'EN VIVO'}</span>
           </div>`
        : finalizado
        ? `<span class="text-white/80 font-bebas text-5xl leading-none">${p.equipo1.goles ?? 0} - ${p.equipo2.goles ?? 0}</span>`
        : `<div class="flex flex-col items-center gap-1">
               <span class="text-white font-bebas text-3xl tracking-widest">${p.hora}</span>
               <span class="text-white/30 font-bebas text-xs tracking-widest">HRS</span>
           </div>`

    // Extraer jornada del campo fase: "Fase de Grupos - J1" → "Jornada 1"
    const jornadaMatch = p.fase?.match(/J(\d)/)
    const jornadaLabel = jornadaMatch ? `Jornada ${jornadaMatch[1]}` : ''

    const badges = `
        <div class="flex items-center gap-2 flex-wrap justify-center">
            <span class="px-2.5 py-0.5 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bebas rounded-full tracking-widest">${p.grupo}</span>
            ${jornadaLabel ? `<span class="px-2.5 py-0.5 bg-white/5 border border-white/15 text-white/50 text-xs font-bebas rounded-full tracking-widest">${jornadaLabel}</span>` : ''}
            ${enVivo ? `<span class="px-2.5 py-0.5 bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-bebas rounded-full">EN VIVO</span>` : ''}
            ${finalizado ? `<span class="px-2.5 py-0.5 bg-white/5 border border-white/10 text-white/30 text-xs font-bebas rounded-full">FINALIZADO</span>` : ''}
        </div>`

    // Clima real de Open-Meteo
    const clima = await obtenerClima(p.estadio)
    const climaHTML = clima
        ? `<div class="flex items-center justify-center gap-4 mt-1">
               <div class="flex flex-col items-center">
                <span class="text-2xl">${clima.emoji}</span>
                <span class="text-white/40 text-xs font-bebas mt-1">${clima.desc}</span>
               </div>
               <div class="flex flex-col items-center">
                <span class="text-white font-bebas text-2xl">${clima.temp}</span>
                <span class="text-white/40 text-xs font-bebas mt-1">Temp</span>
               </div>
           </div>`
        : `<p class="text-white/20 text-xs font-bebas">Clima no disponible</p>`

    return `
        <div class="relative cursor-pointer group flex-shrink-0" style="width:300px;height:240px;perspective:1000px">
            <div class="relative w-full h-full transition-transform duration-700 group-hover:[transform:rotateY(180deg)] [transform-origin:center] will-change-transform" style="transform-style:preserve-3d">

                <!-- FRONTAL -->
                <div class="absolute inset-0 bg-white/5 backdrop-blur-xl border ${border} rounded-3xl px-6 py-5 shadow-xl flex flex-col items-center justify-between"
                    style="backface-visibility:hidden;-webkit-backface-visibility:hidden;transform:translate3d(0,0,1px)">
                    ${badges}
                    <div class="flex items-center justify-center gap-5 w-full">
                        <div class="flex flex-col items-center gap-2">
                            <img src="${p.equipo1.logo}" class="w-14 h-14 rounded-full object-cover border-2 border-white/10 shadow-lg" style="backface-visibility:hidden">
                            <span class="text-white font-bebas text-base tracking-wider">${p.equipo1.abrev}</span>
                        </div>
                        ${marcador}
                        <div class="flex flex-col items-center gap-2">
                            <img src="${p.equipo2.logo}" class="w-14 h-14 rounded-full object-cover border-2 border-white/10 shadow-lg" style="backface-visibility:hidden">
                            <span class="text-white font-bebas text-base tracking-wider">${p.equipo2.abrev}</span>
                        </div>
                    </div>
                    <p class="text-white/25 text-xs font-bebas tracking-wider">Pasa el cursor para más info</p>
                </div>

                <!-- TRASERA -->
                <div class="absolute inset-0 bg-white/5 backdrop-blur-xl border ${border} rounded-3xl px-6 py-5 shadow-xl flex flex-col items-center justify-center gap-2"
                    style="backface-visibility:hidden;-webkit-backface-visibility:hidden;transform:rotateY(180deg) translate3d(0,0,1px)">
                    <p class="text-white/50 text-xs font-bebas tracking-widest uppercase text-center">${p.ciudad}</p>
                    <p class="text-white font-bebas text-lg tracking-wide text-center leading-tight">${p.estadio}</p>
                    <div class="border-t border-white/10 w-full my-1"></div>
                    <span class="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bebas rounded-full tracking-widest">${p.fase}</span>
                    ${climaHTML}
                </div>

            </div>
        </div>`
}