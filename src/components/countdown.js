// === CONSTANTES ===
const START_DATE    = new Date('2025-12-01T00:00:00Z')
const WORLD_CUP    = new Date('2026-06-11T20:00:00Z')

const PARTIDOS = [
    {
        grupo: 'Grupo A', jornada: 'Jornada 1',
        equipo1: { codigo: 'mx', abrev: 'MEX' },
        equipo2: { codigo: 'za', abrev: 'RSA' },
        fecha: '11 JUN', hora: '14:00',
        sede: { pais: 'México', ciudad: 'CDMX', estadio: 'Estadio Azteca', capacidad: '83,264' },
        clima: { condicion: '🌦️', descripcion: 'Lluvioso', temp: '25°C', humedad: '66%', viento: '11 km/h' }
    },
    {
        grupo: 'Grupo A', jornada: 'Jornada 1',
        equipo1: { codigo: 'kr', abrev: 'KOR' },
        equipo2: { codigo: 'cz', abrev: 'CZE' },
        fecha: '11 JUN', hora: '21:00',
        sede: { pais: 'EE. UU.', ciudad: 'Inglewood', estadio: 'SoFi Stadium', capacidad: '70,240' },
        clima: { condicion: '☀️', descripcion: 'Soleado', temp: '25°C', humedad: '65%', viento: '13 km/h' }
    }
]

// === COMPONENTE PRINCIPAL ===
export function renderCountdown() {
    const section = document.createElement('section')
    section.className = 'relative flex flex-col items-center justify-center gap-4 md:gap-6 overflow-hidden bg-cover bg-center bg-no-repeat'
    section.style.backgroundImage = window.innerWidth >= 768
        ? "url('/img/fondo-home-countdown.png')"
        : "url('/img/fondo-home-countdown-phone.png')"
    section.style.minHeight = '100vh'

    section.innerHTML = /*html*/`

    <!-- === VERSIÓN MÓVIL === -->
    <div class="md:hidden flex flex-col items-center gap-6 w-full px-6 pt-5 pb-28 z-10">

        <h2 class="text-5xl font-black text-white text-center font-bebas tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)]">
            FALTAN
        </h2>

        <!-- Círculo con días -->
        <div class="relative w-52 h-52 flex items-center justify-center">
            <div class="absolute -inset-3 rounded-full bg-amber-900/20 blur-2xl"></div>
            <div class="absolute inset-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/5"></div>
            <div class="absolute inset-10 rounded-full bg-gradient-to-br from-white/10 via-transparent to-white/5"></div>
            <svg class="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 200 200">
                <defs>
                    <linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#fbbf24"/>
                        <stop offset="25%" stop-color="#f59e0b"/>
                        <stop offset="50%" stop-color="#d97706"/>
                        <stop offset="75%" stop-color="#b45309"/>
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

        <!-- HH:MM:SS -->
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

        <div class="w-full max-w-sm border-t border-white/10"></div>

        <h2 class="text-white font-bebas text-xl tracking-widest uppercase">Próximos Partidos</h2>
        <div id="cards-container-mobile" class="flex flex-col gap-3 w-full max-w-sm"></div>

        <!-- Botón calendario -->
        <a href="/calendario" class="w-full max-w-sm flex items-center justify-center gap-3 bg-white/5 border border-white/10 rounded-2xl py-4 text-white/80 font-bebas tracking-widest hover:bg-white/10 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                <line x1="16" x2="16" y1="2" y2="6"></line>
                <line x1="8" x2="8" y1="2" y2="6"></line>
                <line x1="3" x2="21" y1="10" y2="10"></line>
            </svg>
            VER CALENDARIO COMPLETO
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m9 18 6-6-6-6"/>
            </svg>
        </a>
    </div>

    <!-- === VERSIÓN DESKTOP === -->
    <div class="hidden md:flex flex-col items-center gap-6 z-10">

        <!-- Barra de progreso flotante -->
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

        <!-- Countdown desktop -->
        <div class="relative mt-5 md:mt-6 xl:mt-10 flex flex-col items-center gap-6">
            <h2 class="text-xl xl:text-5xl 2xl:text-7xl font-black text-white text-center font-bebas tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)]">
                Faltan
            </h2>
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
            <h2 class="text-xl xl:text-5xl 2xl:text-7xl font-black text-white text-center font-bebas tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)]">
                PARA EL INICIO DEL MUNDIAL 2026
            </h2>
            <p class="text-lg xl:text-xl 2xl:text-2xl text-white/70 text-center font-bebas tracking-wide uppercase bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)]">
                El evento más importante del mundo del fútbol está por comenzar.
            </p>
        </div>

        <!-- Próximos partidos -->
        <div class="flex items-center gap-4">
            <div class="w-30 h-px bg-gradient-to-r from-transparent to-lime-500"></div>
            <h2 class="text-white text-xl xl:text-4xl 2xl:text-5xl font-bold uppercase tracking-widest font-bebas bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                Próximos Partidos
            </h2>
            <div class="w-30 h-px bg-gradient-to-l from-transparent to-sky-500"></div>
        </div>
        <div id="cards-container" class="flex justify-center items-center gap-6 w-full px-8 font-bebas tracking-wide"></div>
    </div>

    <!-- Degradado al footer -->
    <div class="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-b from-transparent to-[#0b1220] pointer-events-none z-20"></div>
    `

    // === COUNTDOWN ===
    function updateCountdown() {
        const now  = new Date()
        const diff = WORLD_CUP - now

        const days    = Math.floor(diff / (1000 * 60 * 60 * 24))
        const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((diff % (1000 * 60)) / 1000)

        // Desktop
        updateElement(section, '#days', days)
        updateElement(section, '#hours', hours)
        updateElement(section, '#minutes', minutes)
        updateElement(section, '#seconds', seconds)

        // Móvil
        updateElement(section, '#days-mobile', days)
        updateElement(section, '#hours-mobile', hours)
        updateElement(section, '#minutes-mobile', minutes)
        updateElement(section, '#seconds-mobile', seconds)

        // Progreso
        const total   = WORLD_CUP - START_DATE
        const elapsed = now - START_DATE
        const percent = Math.min(Math.floor((elapsed / total) * 100), 100)

        updateProgress(section, '#progress-bar', '#progress-percent', percent)
        updateProgress(section, '#progress-bar-mobile', '#progress-percent-mobile', percent)

        // Anillo SVG
        const ring = section.querySelector('#ring-progress')
        if (ring) {
            const circumference = 2 * Math.PI * 90
            ring.setAttribute('stroke-dashoffset', circumference - (circumference * percent / 100))
        }
    }

    updateCountdown()
    setInterval(updateCountdown, 1000)

    // === TARJETAS MÓVIL ===
    renderMobileCards(section)

    // === TARJETAS DESKTOP (flip) ===
    renderDesktopCards(section)

    return section
}

// === HELPERS ===
function updateElement(section, selector, value) {
    const el = section.querySelector(selector)
    if (el) el.textContent = String(value).padStart(2, '0')
}

function updateProgress(section, barSelector, textSelector, percent) {
    const bar  = section.querySelector(barSelector)
    const text = section.querySelector(textSelector)
    if (bar) bar.style.width = percent + '%'
    if (text) text.textContent = percent + '%'
}

// === TARJETAS MÓVIL ===
function renderMobileCards(section) {
    const container = section.querySelector('#cards-container-mobile')
    if (!container) return

    PARTIDOS.forEach(partido => {
        const card = document.createElement('div')
        card.className = 'flex flex-col bg-white/5 border border-white/10 rounded-2xl'
        card.innerHTML = /*html*/`
            <div class="flex items-center justify-between px-10 pt-2 pb-1">
                <div class="flex items-center gap-3 flex-1">
                    <img src="https://flagcdn.com/w80/${partido.equipo1.codigo}.png" class="w-10 h-10 rounded-full object-cover">
                    <span class="text-white font-bebas text-lg tracking-wider">${partido.equipo1.abrev}</span>
                </div>
                <span class="text-white/40 font-bebas text-sm">VS</span>
                <div class="flex items-center gap-3 flex-1 justify-end">
                    <span class="text-white font-bebas text-lg tracking-wider">${partido.equipo2.abrev}</span>
                    <img src="https://flagcdn.com/w80/${partido.equipo2.codigo}.png" class="w-10 h-10 rounded-full object-cover">
                </div>
            </div>
            <div class="flex items-center justify-center gap-3">
                <span class="text-white/40 font-bebas text-xs tracking-wider">${partido.fecha} · ${partido.hora}</span>
            </div>
        `
        container.append(card)
    })
}

// === TARJETAS DESKTOP (flip 3D) ===
function renderDesktopCards(section) {
    const container = section.querySelector('#cards-container')
    if (!container) return

    PARTIDOS.forEach(partido => {
        const card = document.createElement('div')
        card.className = 'relative cursor-pointer group flex-shrink-0'
        card.style.width = '280px'
        card.style.height = '220px'
        card.style.perspective = '1000px'
        card.innerHTML = /*html*/`
            <div class="relative w-full h-full transition-transform duration-700 group-hover:[transform:rotateY(180deg)] [transform-origin:center] will-change-transform" style="transform-style: preserve-3d">
                <!-- Cara frontal -->
                <div class="absolute inset-0 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl flex flex-col items-center justify-center w-full h-full" style="backface-visibility: hidden; -webkit-backface-visibility: hidden; transform: translate3d(0, 0, 1px);">
                    <p class="text-green-400 text-base font-semibold text-center uppercase tracking-widest mb-4">${partido.grupo} · ${partido.jornada}</p>
                    <div class="flex items-center justify-center gap-6 mb-4 w-full">
                        <div class="flex flex-col items-center gap-2">
                            <img src="https://flagcdn.com/w80/${partido.equipo1.codigo}.png" class="w-12 h-12 rounded-full object-cover" style="transform: translateZ(0); backface-visibility: hidden;">
                            <span class="text-white text-base tracking-wider">${partido.equipo1.abrev}</span>
                        </div>
                        <span class="text-white text-2xl font-bold">VS</span>
                        <div class="flex flex-col items-center gap-2">
                            <img src="https://flagcdn.com/w80/${partido.equipo2.codigo}.png" class="w-12 h-12 rounded-full object-cover" style="transform: translateZ(0); backface-visibility: hidden;">
                            <span class="text-white text-base tracking-wider">${partido.equipo2.abrev}</span>
                        </div>
                    </div>
                    <div class="flex items-center justify-center gap-4 text-white/60 text-sm mt-2">
                        <span>📅 ${partido.fecha}</span>
                        <span>·</span>
                        <span>🕐 ${partido.hora}</span>
                    </div>
                </div>
                <!-- Cara trasera -->
                <div class="absolute inset-0 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl flex flex-col items-center justify-center w-full h-full" style="backface-visibility: hidden; -webkit-backface-visibility: hidden; transform: rotateY(180deg) translate3d(0, 0, 1px);">
                    <p class="text-white/90 tracking-widest text-sm font-semibold uppercase mb-1 text-center w-full">${partido.sede.pais} · ${partido.sede.ciudad}</p>
                    <div class="border-t border-white/10 my-2 w-full"></div>
                    <p class="text-white font-bold text-lg mt-2 text-center tracking-wide w-full">${partido.sede.estadio}</p>
                    <p class="text-white/50 text-sm mt-1 text-center font-sans w-full">Capacidad: ${partido.sede.capacidad}</p>
                    <div class="border-t border-white/10 my-3 w-full"></div>
                    <div class="grid grid-cols-3 gap-2 text-center mt-2 w-full">
                        <div>
                            <p class="text-2xl">${partido.clima.condicion}</p>
                            <p class="text-white/50 text-xs font-sans mt-1">${partido.clima.descripcion}</p>
                        </div>
                        <div>
                            <p class="text-white text-xl font-bold">${partido.clima.temp}</p>
                            <p class="text-white/50 text-xs font-sans mt-1">Temp</p>
                        </div>
                        <div>
                            <p class="text-white text-xl font-bold">${partido.clima.humedad}</p>
                            <p class="text-white/50 text-xs font-sans mt-1">Humedad</p>
                        </div>
                    </div>
                </div>
            </div>
        `
        container.append(card)
    })
}