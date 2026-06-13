// ============================================================================
// SECCIÓN 1: API
// ----------------------------------------------------------------------------
// 1a. STANDINGS (tabla) — caché 5 min.
// 1b. FIXTURES EN VIVO — caché 60 s (marcador en tiempo real).
// ============================================================================
const STANDINGS_CACHE_DURATION = 5 * 60 * 1000  // 5 minutos
const LIVE_CACHE_DURATION      = 60 * 1000       // 1 minuto
const ESTADOS_VIVO = ['1H', 'HT', '2H', 'ET', 'BT', 'P', 'PEN', 'LIVE']

async function cargarGruposAPI() {
    const CACHE_KEY      = 'cuphub_standings_cache'
    const CACHE_TIME_KEY = 'cuphub_standings_time'
    try {
        const ahora = Date.now()
        const ultimo = parseInt(localStorage.getItem(CACHE_TIME_KEY) || '0')
        const cacheData = localStorage.getItem(CACHE_KEY)
        if ((ahora - ultimo) < STANDINGS_CACHE_DURATION && cacheData) return JSON.parse(cacheData)

        const API_KEY = import.meta.env.VITE_API_FOOTBALL_KEY
        const response = await fetch('https://v3.football.api-sports.io/standings?league=1&season=2026', {
            headers: { 'x-apisports-key': API_KEY }
        })
        const data = await response.json()
        const standings = data.response[0]?.league?.standings || []
        localStorage.setItem(CACHE_KEY, JSON.stringify(standings))
        localStorage.setItem(CACHE_TIME_KEY, ahora.toString())
        return standings
    } catch (error) {
        console.error('❌ Error cargando grupos:', error)
        return []
    }
}

async function cargarPartidosEnVivo() {
    const CACHE_KEY      = 'cuphub_live_fixtures'
    const CACHE_TIME_KEY = 'cuphub_live_time'
    try {
        const ahora = Date.now()
        const ultimo = parseInt(localStorage.getItem(CACHE_TIME_KEY) || '0')
        const cacheData = localStorage.getItem(CACHE_KEY)
        if ((ahora - ultimo) < LIVE_CACHE_DURATION && cacheData) return JSON.parse(cacheData)

        const API_KEY = import.meta.env.VITE_API_FOOTBALL_KEY
        const res = await fetch('https://v3.football.api-sports.io/fixtures?league=1&season=2026', {
            headers: { 'x-apisports-key': API_KEY }
        })
        const data = await res.json()
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone

        const partidos = (data.response || []).map(item => ({
            home:      item.teams.home.name,
            homeLogo:  item.teams.home.logo,
            homeGoals: item.goals.home,
            away:      item.teams.away.name,
            awayLogo:  item.teams.away.logo,
            awayGoals: item.goals.away,
            status:    item.fixture.status.short,
            minuto:    item.fixture.status.elapsed,
            estadio:   item.fixture.venue?.name || '',
            hora:      new Date(item.fixture.date).toLocaleTimeString(navigator.language, {
                           hour: '2-digit', minute: '2-digit', hour12: false, timeZone: tz
                       })
        }))
        localStorage.setItem(CACHE_KEY, JSON.stringify(partidos))
        localStorage.setItem(CACHE_TIME_KEY, ahora.toString())
        return partidos
    } catch {
        return []
    }
}

// ============================================================================
// SECCIÓN 2: COMPONENTE PRINCIPAL — TEMA OSCURO
// ============================================================================
export function renderSeccionGrupos() {
    const section = document.createElement('section')
    section.className = 'relative w-full min-h-screen flex flex-col items-center pb-32 bg-[#0b1220] overflow-x-hidden'

    const barraTricolor = () => `
        <span class="flex gap-1.5 shrink-0 items-center">
            <span class="w-2 h-4 bg-emerald-500 rounded-full shadow-sm"></span>
            <span class="w-2 h-6 bg-red-500 rounded-full shadow-sm"></span>
            <span class="w-2 h-4 bg-blue-600 rounded-full shadow-sm"></span>
        </span>`

    section.innerHTML = /*html*/`
        <style>
            .b-col   { display:flex; flex-direction:column; width:230px; margin-right:28px; }
            .b-col:last-child { margin-right:0; }
            .b-rows  { flex:1; display:flex; flex-direction:column; justify-content:space-around; padding-bottom:20px; }
            .b-pair  { position:relative; flex:1; display:flex; flex-direction:column; justify-content:space-around; }
            .b-match { position:relative; }
            .b-match::after { content:''; position:absolute; top:50%; right:-14px; width:14px; height:2px; background:rgba(139,92,246,0.35); }
            .b-pair::after  { content:''; position:absolute; right:-14px; top:25%; height:50%; width:2px; background:rgba(139,92,246,0.35); }
            .b-pair::before { content:''; position:absolute; right:-28px; top:50%; width:14px; height:2px; background:rgba(139,92,246,0.35); }
            .b-final .b-match::after, .b-final .b-pair::after, .b-final .b-pair::before { display:none; }
            #bracket-card:fullscreen { background:#0b1220; padding:2rem; overflow:auto; }
        </style>

        <!-- Cuadrícula clara sobre fondo oscuro -->
        <div class="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:35px_35px]"></div>

        <!-- HEADER -->
        <div class="relative w-full max-w-[1400px] px-4 md:px-8 pt-10 md:pt-16 pb-10 z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-b border-white/10">
            <div class="lg:col-span-5 flex flex-col justify-center">
                <div class="inline-flex items-center gap-2 px-4 py-1.5 bg-violet-500/15 border border-violet-500/30 text-violet-300 text-sm font-bold tracking-widest uppercase rounded-full mb-5 w-max">
                    Mundial 2026 · Estadísticas en Vivo
                </div>
                <div class="flex items-center gap-4 mb-4">
                    ${barraTricolor()}
                    <h2 class="text-6xl md:text-7xl font-black font-bebas tracking-wide uppercase text-white">FASE DE GRUPOS</h2>
                </div>
                <p class="text-white/60 text-base md:text-lg max-w-xl font-sans leading-relaxed">
                    Los 2 primeros lugares de cada sector avanzan directo. Los 8 mejores terceros lugares completarán los casilleros del cuadro de eliminación directa.
                </p>
                <div class="flex items-center gap-6 mt-6">
                    <div class="flex items-center gap-2"><div class="w-2.5 h-2.5 rounded-full bg-emerald-400"></div><span class="text-sm text-white/50 font-sans">Clasifica directo</span></div>
                    <div class="flex items-center gap-2"><div class="w-2.5 h-2.5 rounded-full bg-amber-400"></div><span class="text-sm text-white/50 font-sans">Posible mejor 3°</span></div>
                    <div class="flex items-center gap-2"><div class="w-2.5 h-2.5 rounded-full bg-white/20"></div><span class="text-sm text-white/50 font-sans">Eliminado</span></div>
                </div>
            </div>
            <div class="lg:col-span-7 w-full">
                <div id="mejores-terceros-container" class="bg-[#101828] border border-white/10 rounded-2xl p-5 animate-pulse min-h-[17rem] flex items-center justify-center text-white/30 font-bebas tracking-widest text-base shadow-2xl">
                    Sincronizando coeficientes de terceros...
                </div>
            </div>
        </div>

        <!-- TIRA DE PARTIDOS EN VIVO -->
        <div class="relative w-full max-w-[1400px] px-4 md:px-8 z-10 mt-8">
            <div id="live-strip"></div>
        </div>

        <!-- GRUPOS -->
        <div class="relative w-full max-w-[1400px] px-4 md:px-8 z-10 flex flex-col gap-5 mt-12">
            <div class="flex items-center gap-4 mb-2">
                ${barraTricolor()}
                <h3 class="text-3xl md:text-4xl font-black font-bebas tracking-wide text-white uppercase">Clasificación por Sectores</h3>
            </div>
            <div id="grid-grupos" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 w-full">
                ${Array(12).fill(0).map(() => `<div class="bg-white/[0.02] border border-white/5 rounded-2xl p-4 animate-pulse h-52"></div>`).join('')}
            </div>
        </div>

        <!-- KNOCKOUT STAGE -->
        <div class="relative w-full max-w-[1400px] px-4 md:px-8 z-10 flex flex-col gap-6 mt-16 pt-10 border-t border-white/10">
            <div id="bracket-card" class="bg-[#0d1320] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">

                <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 px-6 py-5 border-b border-white/5 bg-[#101828]/60">
                    <div>
                        <div class="flex items-center gap-4">
                            ${barraTricolor()}
                            <h3 class="text-3xl md:text-4xl font-black font-bebas tracking-wide text-white uppercase">Knockout Stage</h3>
                        </div>
                        <p class="text-white/40 text-sm font-sans mt-1.5">Los equipos aparecen automáticamente al registrar su primer partido oficial. Cruces oficiales FIFA.</p>
                    </div>
                    <div class="flex items-center gap-2 shrink-0">
                        <button id="btn-zoom-out" title="Alejar" class="w-10 h-10 rounded-xl bg-white/5 hover:bg-violet-500/20 border border-white/10 hover:border-violet-500/40 flex items-center justify-center text-white/60 hover:text-white transition-all">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/></svg>
                        </button>
                        <button id="btn-zoom-in" title="Acercar" class="w-10 h-10 rounded-xl bg-white/5 hover:bg-violet-500/20 border border-white/10 hover:border-violet-500/40 flex items-center justify-center text-white/60 hover:text-white transition-all">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
                        </button>
                        <button id="btn-fullscreen" title="Pantalla completa" class="w-10 h-10 rounded-xl bg-white/5 hover:bg-emerald-500/20 border border-white/10 hover:border-emerald-500/40 flex items-center justify-center text-white/60 hover:text-white transition-all">
                            <svg id="icon-expand" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
                            <svg id="icon-compress" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="hidden"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/></svg>
                        </button>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 py-6 border-b border-white/5 bg-white/[0.02]">
                    <div>
                        <p class="text-sm font-bold text-violet-400 uppercase tracking-widest font-sans mb-3 flex items-center gap-2">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
                            Cómo leer el cuadro
                        </p>
                        <ul class="flex flex-col gap-2.5 text-sm text-white/60 font-sans leading-relaxed">
                            <li><span class="text-white font-bold font-bebas text-base tracking-wider">M73–M104</span> · Número oficial del partido en el torneo (104 en total).</li>
                            <li><span class="text-white font-bold font-bebas text-base tracking-wider">W74</span> · <span class="text-white/80 font-semibold">Winner</span> — el ganador del partido 74 ocupa ese lugar.</li>
                            <li><span class="text-white font-bold font-bebas text-base tracking-wider">L101 / L102</span> · <span class="text-white/80 font-semibold">Loser</span> — los perdedores de semifinales juegan el tercer puesto.</li>
                            <li><span class="text-white font-bold font-bebas text-base tracking-wider">1A · 2B</span> · Posición y grupo: 1° del Grupo A, 2° del Grupo B.</li>
                        </ul>
                    </div>
                    <div>
                        <p class="text-sm font-bold text-amber-400 uppercase tracking-widest font-sans mb-3 flex items-center gap-2">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"/></svg>
                            ¿Por qué los terceros muestran varios grupos?
                        </p>
                        <p class="text-sm text-white/60 font-sans leading-relaxed">
                            Solo 8 de los 12 terceros clasifican y no se sabe de antemano cuáles serán. Por eso FIFA define para cada llave una lista de grupos posibles: la etiqueta <span class="text-amber-400 font-bold">3A/3B/3C/3D/3F</span> significa que ese cupo lo tomará el tercero de <span class="text-white font-bold">uno</span> de esos grupos. La combinación exacta se activa automáticamente cuando termina la fase de grupos y se conocen los 8 mejores terceros.
                        </p>
                    </div>
                </div>

                <div class="w-full overflow-x-auto overflow-y-hidden p-6" style="scrollbar-width: thin;">
                    <div id="bracket-zoom" style="zoom: 1; transform-origin: top left;">
                        <div id="bracket-container" class="flex items-stretch" style="min-width: 1290px; height: 1420px;"></div>
                    </div>
                </div>

                <div class="flex flex-wrap items-center gap-6 px-6 py-4 border-t border-white/5 font-sans text-sm text-white/50 bg-[#101828]/40">
                    <div class="flex items-center gap-2"><div class="w-3 h-3 rounded bg-white/5 border border-white/10"></div><span>Casillero vacío</span></div>
                    <div class="flex items-center gap-2"><div class="w-3 h-3 rounded bg-amber-400/10 border border-amber-400/30"></div><span>Mejor tercer lugar</span></div>
                    <div class="flex items-center gap-2"><div class="w-3 h-3 rounded bg-violet-500/10 border border-violet-500/30"></div><span>Equipo con datos en vivo</span></div>
                    <span class="ml-auto text-xs text-white/25">Actualización automática cada 5 min</span>
                </div>
            </div>
        </div>

        <!-- Bloque SEO -->
        <div class="relative w-full max-w-[1400px] px-4 md:px-8 z-10 mt-16 pt-8 border-t border-white/10">
            <h3 class="text-2xl md:text-3xl font-black font-bebas tracking-wide text-white uppercase mb-3">Tabla de Posiciones del Mundial 2026 en Vivo</h3>
            <p class="text-white/60 text-sm md:text-base font-sans leading-relaxed max-w-4xl mb-3">
                Consulta la tabla de posiciones del Mundial 2026 actualizada en tiempo real: puntos, partidos jugados, goles a favor, goles en contra y diferencia de gol de los 12 grupos (A a la L) de la Copa del Mundo de México, Estados Unidos y Canadá. CupHub te muestra qué selecciones clasifican al Round of 32, el ranking de los 8 mejores terceros y el cuadro completo de eliminación directa con fechas y horarios oficiales de octavos de final, cuartos, semifinales y la gran final en el MetLife Stadium el 19 de julio de 2026.
            </p>
            <p class="text-white/45 text-sm font-sans leading-relaxed max-w-4xl">
                Sigue la clasificación de México, Argentina, Colombia, España, Brasil y las 48 selecciones del primer Mundial de la historia con 104 partidos y tres países anfitriones.
            </p>
        </div>
    `

    // ----- Orquestación: standings (5 min) + en vivo (60 s) -----
    let ultimoStandings = []
    let equiposEnVivo   = new Set()

    const pintarTablas = () => {
        if (!ultimoStandings.length) return
        section.querySelector('#grid-grupos').innerHTML =
            ultimoStandings.map(g => tablaGrupo(g, equiposEnVivo)).join('')
    }

    const cargarStandings = () => {
        cargarGruposAPI().then(standings => {
            if (!standings || !standings.length) {
                section.querySelector('#grid-grupos').innerHTML =
                    `<p class="text-red-400 col-span-full font-bebas text-center py-10 text-2xl">Error al enlazar datos con los servidores de la FIFA.</p>`
                return
            }
            ultimoStandings = standings
            pintarTablas()
            const cont = section.querySelector('#mejores-terceros-container')
            cont.innerHTML = tablaTerceros(mejoresTerceros(standings))
            cont.classList.remove('animate-pulse')
            section.querySelector('#bracket-container').innerHTML = renderBracket(standings)
        })
    }

    const cargarLive = () => {
        cargarPartidosEnVivo().then(partidos => {
            const live = (partidos || []).filter(p => ESTADOS_VIVO.includes(p.status))
            equiposEnVivo = new Set(live.flatMap(p => [p.home, p.away]))
            renderLiveStrip(section, live)
            pintarTablas()
        })
    }

    cargarStandings()
    cargarLive()
    setInterval(cargarStandings, STANDINGS_CACHE_DURATION)
    setInterval(cargarLive, LIVE_CACHE_DURATION)

    setupBracketControls(section)
    return section
}

// ============================================================================
// SECCIÓN 3: TIRA DE PARTIDOS EN VIVO
// ============================================================================
function tarjetaEnVivo(p) {
    return `
    <div class="shrink-0 w-64 bg-[#101828] border border-red-500/30 rounded-2xl p-3 shadow-lg">
        <div class="flex items-center justify-between mb-2">
            <span class="flex items-center gap-1.5 text-red-400 text-[11px] font-bold font-sans uppercase tracking-widest">
                <span class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> En Vivo
            </span>
            <span class="text-white/40 text-[11px] font-sans tabular-nums">${p.minuto ? p.minuto + "'" : ''}</span>
        </div>
        <div class="flex items-center justify-between gap-2">
            <div class="flex items-center gap-2 min-w-0 flex-1">
                <img src="${p.homeLogo}" class="w-6 h-6 object-contain shrink-0" alt="${p.home}">
                <span class="text-white font-bebas text-sm tracking-wider truncate">${p.home.toUpperCase()}</span>
            </div>
            <span class="text-white font-bebas text-2xl tabular-nums shrink-0 px-1">${p.homeGoals ?? 0}-${p.awayGoals ?? 0}</span>
            <div class="flex items-center gap-2 min-w-0 flex-1 justify-end">
                <span class="text-white font-bebas text-sm tracking-wider truncate text-right">${p.away.toUpperCase()}</span>
                <img src="${p.awayLogo}" class="w-6 h-6 object-contain shrink-0" alt="${p.away}">
            </div>
        </div>
    </div>`
}

function renderLiveStrip(section, live) {
    const cont = section.querySelector('#live-strip')
    if (!cont) return

    if (!live.length) {
        cont.innerHTML = `
            <div class="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-[#101828]/60 border border-white/10 text-white/45 text-sm font-sans">
                <span class="w-2 h-2 rounded-full bg-white/25"></span>
                No hay partidos en vivo en este momento. El marcador en tiempo real aparecerá aquí durante cada partido.
            </div>`
        return
    }

    cont.innerHTML = `
        <div class="flex items-center gap-3 mb-3">
            <span class="flex items-center gap-2 text-red-400 font-bold font-sans uppercase tracking-widest text-sm">
                <span class="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span> Partidos en Vivo
            </span>
            <span class="text-white/40 text-sm font-sans">· ${live.length} en juego ahora</span>
        </div>
        <div class="flex gap-3 overflow-x-auto pb-2" style="scrollbar-width: thin;">
            ${live.map(tarjetaEnVivo).join('')}
        </div>`
}

// ============================================================================
// SECCIÓN 4: CONTROLES DEL BRACKET — fullscreen y zoom
// ============================================================================
function setupBracketControls(section) {
    const card     = section.querySelector('#bracket-card')
    const zoomEl   = section.querySelector('#bracket-zoom')
    const btnFull  = section.querySelector('#btn-fullscreen')
    const btnIn    = section.querySelector('#btn-zoom-in')
    const btnOut   = section.querySelector('#btn-zoom-out')
    const iconExp  = section.querySelector('#icon-expand')
    const iconComp = section.querySelector('#icon-compress')

    let zoom = 1
    btnIn.addEventListener('click', () => { zoom = Math.min(1.5, zoom + 0.1); zoomEl.style.zoom = zoom })
    btnOut.addEventListener('click', () => { zoom = Math.max(0.5, zoom - 0.1); zoomEl.style.zoom = zoom })

    btnFull.addEventListener('click', () => {
        if (!document.fullscreenElement) card.requestFullscreen().catch(() => {})
        else document.exitFullscreen()
    })

    document.addEventListener('fullscreenchange', () => {
        const activo = document.fullscreenElement === card
        iconExp.classList.toggle('hidden', activo)
        iconComp.classList.toggle('hidden', !activo)
        btnFull.title = activo ? 'Salir de pantalla completa' : 'Pantalla completa'
    })
}

// ============================================================================
// SECCIÓN 5: TABLA DE GRUPO — País·PJ·G·E·P·GF·GC·DG·Pts (+ indicador EN VIVO)
// ============================================================================
const GRID_COLS = '1.1rem 1.1rem 1.2rem 1fr 1.2rem 1.2rem 1.2rem 1.2rem 1.2rem 1.2rem 1.5rem 1.5rem'

function tablaGrupo(grupoData, liveSet = new Set()) {
    const nombre = grupoData[0].group.replace('Group ', 'Grupo ')
    const letra  = nombre.replace('Grupo ', '')

    const filas = grupoData.map((eq, i) => {
        const enVivo = liveSet.has(eq.team.name)
        const dot = i < 2 ? 'bg-emerald-400' : i === 2 ? 'bg-amber-400' : 'bg-white/10'
        const gf = eq.all.goals.for
        const gc = eq.all.goals.against
        const dg = eq.goalsDiff > 0 ? `+${eq.goalsDiff}` : eq.goalsDiff

        const indicador = enVivo
            ? `<span class="w-2 h-2 rounded-full bg-red-500 animate-pulse mx-auto block"></span>`
            : `<div class="w-1.5 h-1.5 rounded-full ${dot} mx-auto"></div>`

        return /*html*/`
        <div class="grid items-center py-2 border-b border-white/[0.03] last:border-0 rounded-lg px-1 transition-colors ${enVivo ? 'bg-red-500/[0.07]' : 'hover:bg-white/[0.04]'}"
            style="grid-template-columns: ${GRID_COLS}">
            ${indicador}
            <span class="text-white/30 font-bebas text-xs text-center">${i + 1}</span>
            <img src="${eq.team.logo}" class="w-4 h-4 object-contain mx-auto" alt="Logo de ${eq.team.name} en vivo Mundial 2026">
            <span class="text-white font-bebas text-sm tracking-wider truncate px-1 flex items-center gap-1" title="${eq.team.name}">
                ${eq.team.name.substring(0,10).toUpperCase()}
                ${enVivo ? `<span class="text-[8px] text-red-400 font-sans font-bold bg-red-500/15 px-1 rounded shrink-0">LIVE</span>` : ''}
            </span>
            <span class="text-white/50 font-sans text-[11px] text-center tabular-nums">${eq.all.played}</span>
            <span class="text-white/40 font-sans text-[11px] text-center tabular-nums">${eq.all.win}</span>
            <span class="text-white/40 font-sans text-[11px] text-center tabular-nums">${eq.all.draw}</span>
            <span class="text-white/40 font-sans text-[11px] text-center tabular-nums">${eq.all.lose}</span>
            <span class="text-white/40 font-sans text-[11px] text-center tabular-nums">${gf}</span>
            <span class="text-white/40 font-sans text-[11px] text-center tabular-nums">${gc}</span>
            <span class="font-sans text-[11px] text-center tabular-nums ${eq.goalsDiff > 0 ? 'text-emerald-400' : eq.goalsDiff < 0 ? 'text-red-400' : 'text-white/40'}">${dg}</span>
            <span class="text-white font-bebas text-base text-center tabular-nums font-bold">${eq.points}</span>
        </div>
        `
    }).join('')

    return /*html*/`
    <div class="bg-[#101828] border border-white/10 rounded-2xl p-4 flex flex-col hover:border-violet-500/50 transition-all duration-300 shadow-xl">
        <div class="flex items-center justify-between mb-3 pb-2.5 border-b border-white/10">
            <div class="flex items-center gap-2.5">
                <span class="w-1.5 h-5 bg-violet-500 rounded-full shrink-0"></span>
                <h4 class="text-xl font-black font-bebas text-white tracking-[0.12em]">GRUPO <span class="text-violet-300">${letra}</span></h4>
            </div>
            <span class="text-[10px] text-violet-400/60 font-sans font-bold uppercase tracking-widest">WC26</span>
        </div>
        <div class="grid text-[10px] font-bold text-white/25 uppercase tracking-wider mb-1.5 px-1"
            style="grid-template-columns: ${GRID_COLS}">
            <span></span><span></span><span></span>
            <span class="px-1 text-white/40">País</span>
            <span class="text-center">PJ</span>
            <span class="text-center">G</span>
            <span class="text-center">E</span>
            <span class="text-center">P</span>
            <span class="text-center">GF</span>
            <span class="text-center">GC</span>
            <span class="text-center">DG</span>
            <span class="text-center text-white/50">Pts</span>
        </div>
        ${filas}
    </div>
    `
}

// ============================================================================
// SECCIÓN 6: MEJORES TERCEROS
// ============================================================================
function mejoresTerceros(standings) {
    return standings
        .filter(g => g[2])
        .map(g => g[2])
        .sort((a, b) => {
            if (b.points !== a.points) return b.points - a.points
            if (b.goalsDiff !== a.goalsDiff) return b.goalsDiff - a.goalsDiff
            return b.all.goals.for - a.all.goals.for
        })
}

function tablaTerceros(terceros) {
    const filas = terceros.slice(0, 12).map((eq, i) => {
        const clasifica = i < 8
        const letra = eq.group.trim().split(/[\s-]+/).pop()

        return /*html*/`
        <div class="flex items-center justify-between py-2 border-b border-white/5 last:border-0 px-2 hover:bg-white/[0.04] rounded-lg transition-colors ${clasifica ? '' : 'opacity-50'}">
            <div class="flex items-center gap-2.5 min-w-0">
                <span class="font-bebas text-base w-5 text-center shrink-0 ${clasifica ? 'text-amber-400' : 'text-white/25'}">${i + 1}</span>
                <img src="${eq.team.logo}" class="w-5 h-5 object-contain shrink-0" alt="Logo de ${eq.team.name} - Terceros Mundial">
                <span class="text-white font-bebas text-base tracking-wider w-24 truncate shrink-0" title="${eq.team.name}">${eq.team.name.toUpperCase()}</span>
                <span class="text-[10px] text-amber-300/80 bg-amber-400/10 border border-amber-400/20 w-6 h-5 flex items-center justify-center rounded font-sans font-bold shrink-0">${letra}</span>
            </div>
            <div class="flex items-center gap-3 shrink-0">
                <span class="text-sm text-white/60 font-sans font-medium tabular-nums">${eq.points} pts</span>
                <span class="w-6 h-6 flex items-center justify-center rounded-full border text-xs font-bold shrink-0 ${clasifica ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-white/5 border-white/10 text-white/25'}">${clasifica ? '✓' : '✗'}</span>
            </div>
        </div>
        `
    }).join('')

    return /*html*/`
    <div class="flex flex-col gap-1 w-full">
        <span class="sr-only">Tabla de Posiciones de los Mejores Terceros Lugares de la Copa Mundial FIFA 2026 - CupHub coeficientes en tiempo real</span>
        <div class="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-white/10">
            <div class="flex items-center gap-2.5 w-full sm:w-auto justify-center sm:justify-start">
                <span class="w-2 h-6 bg-amber-400 rounded-full"></span>
                <span class="text-base text-white font-sans uppercase tracking-widest font-bold">Ranking de Mejores Terceros</span>
            </div>
            <span class="text-xs text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20 font-sans font-bold mx-auto sm:mx-0">Top 8 Avanzan</span>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-0">
            ${filas.length > 0 ? filas : `<p class="text-white/20 font-bebas text-center py-8 text-base col-span-full">Los datos se computarán al inicio de los partidos</p>`}
        </div>
    </div>
    `
}

// ============================================================================
// SECCIÓN 7: BRACKET — KNOCKOUT STAGE (cruces y fechas oficiales FIFA 2026)
// ============================================================================
const R32 = [
    { id: 'M74', fecha: '29 jun', hora: '15:30', t1: { g: 'E', pos: 1 }, t2: { tercero: '3A/3B/3C/3D/3F' } },
    { id: 'M77', fecha: '30 jun', hora: '16:00', t1: { g: 'I', pos: 1 }, t2: { tercero: '3C/3D/3F/3G/3H' } },
    { id: 'M73', fecha: '28 jun', hora: '14:00', t1: { g: 'A', pos: 2 }, t2: { g: 'B', pos: 2 } },
    { id: 'M75', fecha: '29 jun', hora: '20:00', t1: { g: 'F', pos: 1 }, t2: { g: 'C', pos: 2 } },
    { id: 'M83', fecha: '2 jul',  hora: '18:00', t1: { g: 'K', pos: 2 }, t2: { g: 'L', pos: 2 } },
    { id: 'M84', fecha: '2 jul',  hora: '14:00', t1: { g: 'H', pos: 1 }, t2: { g: 'J', pos: 2 } },
    { id: 'M81', fecha: '1 jul',  hora: '19:00', t1: { g: 'D', pos: 1 }, t2: { tercero: '3B/3E/3F/3I/3J' } },
    { id: 'M82', fecha: '1 jul',  hora: '15:00', t1: { g: 'G', pos: 1 }, t2: { tercero: '3A/3E/3H/3I/3J' } },
    { id: 'M76', fecha: '29 jun', hora: '12:00', t1: { g: 'C', pos: 1 }, t2: { g: 'F', pos: 2 } },
    { id: 'M78', fecha: '30 jun', hora: '12:00', t1: { g: 'E', pos: 2 }, t2: { g: 'I', pos: 2 } },
    { id: 'M79', fecha: '30 jun', hora: '20:00', t1: { g: 'A', pos: 1 }, t2: { tercero: '3C/3E/3F/3H/3I' } },
    { id: 'M80', fecha: '1 jul',  hora: '11:00', t1: { g: 'L', pos: 1 }, t2: { tercero: '3E/3H/3I/3J/3K' } },
    { id: 'M86', fecha: '3 jul',  hora: '17:00', t1: { g: 'J', pos: 1 }, t2: { g: 'H', pos: 2 } },
    { id: 'M88', fecha: '3 jul',  hora: '13:00', t1: { g: 'D', pos: 2 }, t2: { g: 'G', pos: 2 } },
    { id: 'M85', fecha: '2 jul',  hora: '22:00', t1: { g: 'B', pos: 1 }, t2: { tercero: '3E/3F/3G/3I/3J' } },
    { id: 'M87', fecha: '3 jul',  hora: '20:30', t1: { g: 'K', pos: 1 }, t2: { tercero: '3D/3E/3I/3J/3L' } },
]

const OCTAVOS = [
    { id: 'M89', fecha: '4 jul',  hora: '16:00', l1: 'W74', l2: 'W77' },
    { id: 'M90', fecha: '4 jul',  hora: '12:00', l1: 'W73', l2: 'W75' },
    { id: 'M93', fecha: '6 jul',  hora: '14:00', l1: 'W83', l2: 'W84' },
    { id: 'M94', fecha: '6 jul',  hora: '19:00', l1: 'W81', l2: 'W82' },
    { id: 'M91', fecha: '5 jul',  hora: '15:00', l1: 'W76', l2: 'W78' },
    { id: 'M92', fecha: '5 jul',  hora: '19:00', l1: 'W79', l2: 'W80' },
    { id: 'M95', fecha: '7 jul',  hora: '11:00', l1: 'W86', l2: 'W88' },
    { id: 'M96', fecha: '7 jul',  hora: '15:00', l1: 'W85', l2: 'W87' },
]

const CUARTOS = [
    { id: 'M97',  fecha: '9 jul',  hora: '15:00', l1: 'W89', l2: 'W90' },
    { id: 'M98',  fecha: '10 jul', hora: '14:00', l1: 'W93', l2: 'W94' },
    { id: 'M99',  fecha: '11 jul', hora: '16:00', l1: 'W91', l2: 'W92' },
    { id: 'M100', fecha: '11 jul', hora: '20:00', l1: 'W95', l2: 'W96' },
]

const SEMIS = [
    { id: 'M101', fecha: '14 jul', hora: '14:00', l1: 'W97', l2: 'W98' },
    { id: 'M102', fecha: '15 jul', hora: '14:00', l1: 'W99', l2: 'W100' },
]

function resolverEquipo(standings, slot) {
    if (slot.tercero) return { tipo: 'tercero', label: slot.tercero }
    const idx = 'ABCDEFGHIJKL'.indexOf(slot.g)
    if (idx === -1 || !standings[idx]) return { tipo: 'vacio', label: `${slot.pos}${slot.g}` }
    const eq = standings[idx][slot.pos - 1]
    if (!eq || eq.all.played === 0) return { tipo: 'vacio', label: `${slot.pos}${slot.g}` }
    return { tipo: 'equipo', nombre: eq.team.name.substring(0, 12).toUpperCase(), logo: eq.team.logo, puntos: eq.points }
}

function filaEquipo(eq) {
    if (eq.tipo === 'equipo') {
        return `
        <div class="flex items-center gap-2 px-3 py-2 bg-violet-500/[0.06]">
            <img src="${eq.logo}" class="w-4 h-4 object-contain shrink-0" alt="Logo ${eq.nombre}">
            <span class="text-white font-bebas text-sm tracking-wider truncate">${eq.nombre}</span>
            <span class="text-violet-300 font-sans text-[10px] ml-auto font-bold bg-violet-500/15 px-1.5 py-0.5 rounded tabular-nums shrink-0">${eq.puntos}pts</span>
        </div>`
    }
    if (eq.tipo === 'tercero') {
        return `
        <div class="flex items-center gap-2 px-3 py-2 bg-amber-400/[0.04]">
            <div class="w-4 h-4 rounded bg-amber-400/15 border border-amber-400/30 shrink-0 flex items-center justify-center">
                <span class="text-[7px] text-amber-400 font-bold">3°</span>
            </div>
            <span class="text-amber-400/70 font-bebas text-[11px] tracking-wider truncate">${eq.label}</span>
        </div>`
    }
    return `
    <div class="flex items-center gap-2 px-3 py-2">
        <div class="w-4 h-4 rounded-full bg-white/5 border border-white/10 shrink-0"></div>
        <span class="text-white/25 font-bebas text-sm tracking-widest">${eq.label || 'POR DEFINIR'}</span>
    </div>`
}

function filaGanador(label) {
    return `
    <div class="flex items-center gap-2 px-3 py-2">
        <div class="w-4 h-4 rounded-full bg-white/5 border border-white/10 shrink-0"></div>
        <span class="text-white/30 font-bebas text-sm tracking-widest">${label}</span>
    </div>`
}

function matchCard(fila1, fila2, fecha, hora, destacado = false) {
    return `
    <div class="b-match">
        <div class="flex items-stretch bg-[#131b2e] border ${destacado ? 'border-amber-400/30' : 'border-white/10'} rounded-xl overflow-hidden shadow-lg hover:border-violet-500/40 transition-all w-[230px]">
            <div class="flex-1 flex flex-col divide-y divide-white/5 min-w-0">
                ${fila1}
                ${fila2}
            </div>
            <div class="w-14 flex flex-col items-center justify-center border-l border-white/5 bg-white/[0.02] shrink-0">
                <span class="text-white/40 font-sans text-[10px] font-bold">${fecha}</span>
                <span class="text-white/25 font-sans text-[10px] tabular-nums">${hora}</span>
            </div>
        </div>
    </div>`
}

function renderBracket(standings) {
    let r32HTML = ''
    for (let i = 0; i < 16; i += 2) {
        const m1 = R32[i], m2 = R32[i + 1]
        r32HTML += `
        <div class="b-pair mb-5 gap-1 last:mb-0">
            ${matchCard(filaEquipo(resolverEquipo(standings, m1.t1)), filaEquipo(resolverEquipo(standings, m1.t2)), m1.fecha, m1.hora)}
            ${matchCard(filaEquipo(resolverEquipo(standings, m2.t1)), filaEquipo(resolverEquipo(standings, m2.t2)), m2.fecha, m2.hora)}
        </div>`
    }

    let octHTML = ''
    for (let i = 0; i < 8; i += 2) {
        const m1 = OCTAVOS[i], m2 = OCTAVOS[i + 1]
        octHTML += `
        <div class="b-pair">
            ${matchCard(filaGanador(m1.l1), filaGanador(m1.l2), m1.fecha, m1.hora)}
            ${matchCard(filaGanador(m2.l1), filaGanador(m2.l2), m2.fecha, m2.hora)}
        </div>`
    }

    let cuartosHTML = ''
    for (let i = 0; i < 4; i += 2) {
        const m1 = CUARTOS[i], m2 = CUARTOS[i + 1]
        cuartosHTML += `
        <div class="b-pair">
            ${matchCard(filaGanador(m1.l1), filaGanador(m1.l2), m1.fecha, m1.hora)}
            ${matchCard(filaGanador(m2.l1), filaGanador(m2.l2), m2.fecha, m2.hora)}
        </div>`
    }

    const semisHTML = `
    <div class="b-pair">
        ${matchCard(filaGanador(SEMIS[0].l1), filaGanador(SEMIS[0].l2), SEMIS[0].fecha, SEMIS[0].hora)}
        ${matchCard(filaGanador(SEMIS[1].l1), filaGanador(SEMIS[1].l2), SEMIS[1].fecha, SEMIS[1].hora)}
    </div>`

    const finalHTML = `
    <div class="b-rows">
        <div class="flex flex-col items-center justify-center gap-6">
            <div class="flex flex-col items-center gap-3">
                <img src="/icons/WorldCup.png" alt="Trofeo Copa del Mundo FIFA Oficial 2026"
                    class="w-20 h-auto object-contain cursor-pointer drop-shadow-[0_0_20px_rgba(251,191,36,0.6)] hover:drop-shadow-[0_0_40px_rgba(251,191,36,0.95)] hover:scale-110 transition-all duration-500">
                ${matchCard(filaGanador('W101'), filaGanador('W102'), '19 jul', '14:00', true)}
                <span class="text-[10px] text-amber-400 font-sans font-bold uppercase tracking-widest bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">Gran Final · MetLife</span>
            </div>
            <div class="flex flex-col items-center gap-2 opacity-60">
                ${matchCard(filaGanador('L101'), filaGanador('L102'), '18 jul', '16:00')}
                <span class="text-[10px] text-white/30 font-sans font-bold uppercase tracking-widest">Tercer Puesto</span>
            </div>
        </div>
    </div>`

    const header = (titulo) => `<div class="text-center font-sans font-bold text-[13px] text-violet-400 tracking-widest uppercase border-b-[3px] border-white/30 pb-3 mb-6">${titulo}</div>`

    return `
        <div class="b-col">${header('Round of 32')}<div class="b-rows">${r32HTML}</div></div>
        <div class="b-col">${header('Octavos de Final')}<div class="b-rows">${octHTML}</div></div>
        <div class="b-col">${header('Cuartos de Final')}<div class="b-rows">${cuartosHTML}</div></div>
        <div class="b-col">${header('Semifinales')}<div class="b-rows">${semisHTML}</div></div>
        <div class="b-col b-final">${header('Final')}${finalHTML}</div>
    `
}