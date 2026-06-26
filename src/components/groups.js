// ============================================================================
// CUPHUB · SECCIÓN GRUPOS + KNOCKOUT + ESTADÍSTICAS + 11 IDEAL — Mundial 2026
// ----------------------------------------------------------------------------
// SECCIÓN 1: API (standings 5min · live 60s · stats jugadores 15min lazy)
// SECCIÓN 2: COMPONENTE PRINCIPAL
// SECCIÓN 3: TIRA EN VIVO
// SECCIÓN 4: CONTROLES BRACKET + 11 IDEAL
// SECCIÓN 5: TABLA DE GRUPO
// SECCIÓN 6: MEJORES TERCEROS
// SECCIÓN 7: ESTADÍSTICAS DE JUGADORES (goles/asist/amarillas/rojas/vallas)
// SECCIÓN 8: 11 IDEAL (widget Sofascore por jornada)
// SECCIÓN 9: BRACKET KNOCKOUT
// ============================================================================

const STANDINGS_CACHE_DURATION = 5 * 60 * 1000   // 5 min
const LIVE_CACHE_DURATION      = 60 * 1000        // 1 min
const STATS_CACHE_DURATION     = 15 * 60 * 1000   // 15 min
const ESTADOS_VIVO = ['1H', 'HT', '2H', 'ET', 'BT', 'P', 'PEN', 'LIVE']
const API_BASE = 'https://v3.football.api-sports.io'
const PLAYER_FALLBACK = 'https://media.api-sports.io/football/players/0.png'

// ---- 11 IDEAL (Sofascore) ----
const SOFA_TOURNAMENT = 16      // FIFA World Cup en Sofascore
const SOFA_SEASON     = 58210   // Temporada Mundial 2026
// ⚠️ Completa el "round" real de cada jornada. Cómo: entra al 11 ideal de Sofascore,
//    elige la jornada y copia el número que va después de /round/ en la URL del widget.
const JORNADAS = [
    { label: 'Jornada 1', round: 27696 },
    { label: 'Jornada 2', round: 27696 }, // ⚠️ reemplaza por el round real de la Jornada 2
]
function urlWidget(round) {
    return `https://widgets.sofascore.com/es-ES/embed/unique-tournament/${SOFA_TOURNAMENT}/season/${SOFA_SEASON}/round/${round}/teamOfTheWeek?showCompetitionLogo=true&widgetTheme=dark&widgetTitle=FIFA%20World%20Cup`
}

function apiKey() { return import.meta.env.VITE_API_FOOTBALL_KEY }

// ---- 1a. STANDINGS ----
async function cargarGruposAPI() {
    const CACHE_KEY = 'cuphub_standings_cache', CACHE_TIME_KEY = 'cuphub_standings_time'
    try {
        const ahora = Date.now()
        const ultimo = parseInt(localStorage.getItem(CACHE_TIME_KEY) || '0')
        const cacheData = localStorage.getItem(CACHE_KEY)
        if ((ahora - ultimo) < STANDINGS_CACHE_DURATION && cacheData) {
            const parsed = JSON.parse(cacheData)
            if (parsed.length === 12 && parsed[0].length === 4) return parsed
            localStorage.removeItem(CACHE_KEY); localStorage.removeItem(CACHE_TIME_KEY)
        }
        const response = await fetch(`${API_BASE}/standings?league=1&season=2026`, { headers: { 'x-apisports-key': apiKey() } })
        const data = await response.json()
        const rawStandings = data.response[0]?.league?.standings || []
        const standings = normalizarStandings(rawStandings)
        localStorage.setItem(CACHE_KEY, JSON.stringify(standings))
        localStorage.setItem(CACHE_TIME_KEY, ahora.toString())
        return standings
    } catch (error) {
        console.error('❌ Error cargando grupos:', error)
        return []
    }
}

function normalizarStandings(rawStandings) {
    const todos = rawStandings.flat()
    const porGrupo = {}
    for (const eq of todos) {
        const grupo = eq.group
        if (!porGrupo[grupo]) porGrupo[grupo] = {}
        const id = eq.team.id
        if (!porGrupo[grupo][id] || eq.all.played > porGrupo[grupo][id].all.played) porGrupo[grupo][id] = eq
    }
    return Object.keys(porGrupo).sort().map(grupo => {
        return Object.values(porGrupo[grupo]).sort((a, b) => {
            if (b.points !== a.points) return b.points - a.points
            if (b.goalsDiff !== a.goalsDiff) return b.goalsDiff - a.goalsDiff
            return b.all.goals.for - a.all.goals.for
        })
    })
}

// ---- 1b. FIXTURES (live + finalizados) ----
async function cargarPartidosEnVivo() {
    const CACHE_KEY = 'cuphub_live_fixtures', CACHE_TIME_KEY = 'cuphub_live_time'
    try {
        const ahora = Date.now()
        const ultimo = parseInt(localStorage.getItem(CACHE_TIME_KEY) || '0')
        const cacheData = localStorage.getItem(CACHE_KEY)
        if ((ahora - ultimo) < LIVE_CACHE_DURATION && cacheData) return JSON.parse(cacheData)
        const res = await fetch(`${API_BASE}/fixtures?league=1&season=2026`, { headers: { 'x-apisports-key': apiKey() } })
        const data = await res.json()
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
        const partidos = (data.response || []).map(item => ({
            home: item.teams.home.name, homeLogo: item.teams.home.logo, homeGoals: item.goals.home,
            away: item.teams.away.name, awayLogo: item.teams.away.logo, awayGoals: item.goals.away,
            status: item.fixture.status.short, minuto: item.fixture.status.elapsed,
            estadio: item.fixture.venue?.name || '',
            hora: new Date(item.fixture.date).toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: tz })
        }))
        localStorage.setItem(CACHE_KEY, JSON.stringify(partidos))
        localStorage.setItem(CACHE_TIME_KEY, ahora.toString())
        return partidos
    } catch { return [] }
}

// ---- 1c. ESTADÍSTICAS DE JUGADORES ----
async function cargarStat(tipo, endpoint) {
    const CK = `cuphub_stat_${tipo}`, TK = `cuphub_stat_${tipo}_t`
    try {
        const ahora = Date.now()
        const ult = parseInt(localStorage.getItem(TK) || '0')
        const cd = localStorage.getItem(CK)
        if ((ahora - ult) < STATS_CACHE_DURATION && cd) return JSON.parse(cd)
        const res = await fetch(`${API_BASE}/${endpoint}?league=1&season=2026`, { headers: { 'x-apisports-key': apiKey() } })
        const data = await res.json()
        const norm = normalizarStat(data.response || [])
        localStorage.setItem(CK, JSON.stringify(norm))
        localStorage.setItem(TK, ahora.toString())
        return norm
    } catch { return [] }
}

function normalizarStat(arr) {
    return arr.map(it => {
        const s = it.statistics?.[0] || {}
        return {
            id: it.player?.id, nombre: it.player?.name || '', foto: it.player?.photo || '', nac: it.player?.nationality || '',
            equipo: s.team?.name || '', equipoLogo: s.team?.logo || '',
            goles: s.goals?.total ?? 0, asis: s.goals?.assists ?? 0,
            amarillas: s.cards?.yellow ?? 0, rojas: s.cards?.red ?? 0,
            rating: s.games?.rating ? parseFloat(s.games.rating) : null,
            apps: s.games?.appearences ?? 0, mins: s.games?.minutes ?? 0,
        }
    })
}

async function cargarTodasStats() {
    const [goleadores, asistencias, amarillas, rojas] = await Promise.all([
        cargarStat('scorers', 'players/topscorers'),
        cargarStat('assists', 'players/topassists'),
        cargarStat('yellow', 'players/topyellowcards'),
        cargarStat('red', 'players/topredcards'),
    ])
    return { goleadores, asistencias, amarillas, rojas }
}

function calcularVallasInvictas(fixtures) {
    const map = {}
    for (const p of (fixtures || [])) {
        if (p.status !== 'FT') continue
        if (!map[p.home]) map[p.home] = { equipo: p.home, equipoLogo: p.homeLogo, clean: 0, jugados: 0 }
        if (!map[p.away]) map[p.away] = { equipo: p.away, equipoLogo: p.awayLogo, clean: 0, jugados: 0 }
        map[p.home].jugados++; map[p.away].jugados++
        if ((p.awayGoals ?? 0) === 0) map[p.home].clean++
        if ((p.homeGoals ?? 0) === 0) map[p.away].clean++
    }
    return Object.values(map).filter(t => t.clean > 0).sort((a, b) => b.clean - a.clean || a.jugados - b.jugados)
}

// ============================================================================
// SECCIÓN 2: COMPONENTE PRINCIPAL
// ============================================================================
export function renderSeccionGrupos() {
    const section = document.createElement('section')
    section.className = 'relative w-full min-h-screen flex flex-col items-center pb-32 bg-[#070b14] overflow-x-hidden'

    const barra = () => `
        <span class="flex gap-1.5 shrink-0 items-center">
            <span class="w-2 h-4 bg-emerald-500 rounded-full"></span>
            <span class="w-2 h-6 bg-red-500 rounded-full"></span>
            <span class="w-2 h-4 bg-blue-600 rounded-full"></span>
        </span>`

    const tabsJornadas = JORNADAS.map((j, i) =>
        `<button class="oi-tab ${i === 0 ? 'is-active' : ''}" data-round="${j.round}">${j.label}</button>`
    ).join('')

    section.innerHTML = /*html*/`
        <style>
            /* ---------- Fondo aurora premium (sin cuadrícula) ---------- */
            .gp-bg { position:absolute; inset:0; z-index:0; pointer-events:none; overflow:hidden;
                background:
                    radial-gradient(1100px 700px at 15% 4%,  rgba(124,58,237,0.16), transparent 60%),
                    radial-gradient(1000px 700px at 88% 30%, rgba(37,99,235,0.13), transparent 60%),
                    radial-gradient(1000px 800px at 30% 70%, rgba(5,150,105,0.12), transparent 60%),
                    radial-gradient(900px 700px at 85% 96%,  rgba(245,158,11,0.08), transparent 60%); }
            .gp-blob { position:absolute; border-radius:9999px; filter:blur(110px); pointer-events:none; will-change:transform; }
            .gp-b1 { width:500px; height:500px; background:#7c3aed; opacity:.30; top:-70px;  left:-130px; animation:gpD1 34s ease-in-out infinite; }
            .gp-b2 { width:440px; height:440px; background:#2563eb; opacity:.24; top:14%;    right:-140px; animation:gpD2 40s ease-in-out infinite; }
            .gp-b3 { width:460px; height:460px; background:#059669; opacity:.22; top:36%;    left:-120px; animation:gpD3 37s ease-in-out infinite; }
            .gp-b4 { width:420px; height:420px; background:#7c3aed; opacity:.18; top:58%;    right:-120px; animation:gpD1 43s ease-in-out infinite; }
            .gp-b5 { width:440px; height:440px; background:#2563eb; opacity:.18; top:78%;    left:6%;      animation:gpD2 39s ease-in-out infinite; }
            .gp-b6 { width:400px; height:400px; background:#f59e0b; opacity:.12; top:93%;    right:4%;     animation:gpD3 36s ease-in-out infinite; }
            @keyframes gpD1 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(60px,55px) scale(1.1)} }
            @keyframes gpD2 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-70px,45px) scale(1.08)} }
            @keyframes gpD3 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(45px,-60px) scale(1.1)} }

            /* Grano sutil para profundidad premium */
            .gp-noise { position:absolute; inset:0; z-index:1; pointer-events:none; opacity:.035; mix-blend-mode:overlay;
                background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }

            /* Revelado al scroll */
            .gp-reveal { opacity:0; transform:translateY(26px); transition:opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1); }
            .gp-reveal.is-in { opacity:1; transform:none; }

            /* Banderas circulares */
            .gp-flag { border-radius:9999px; overflow:hidden; display:inline-flex; flex-shrink:0; box-shadow:inset 0 0 0 1px rgba(255,255,255,.18); background:rgba(255,255,255,.06); }
            .gp-flag img { width:100%; height:100%; object-fit:cover; }

            /* Entrada escalonada tarjetas */
            @keyframes gpFadeUp { from{opacity:0; transform:translateY(16px)} to{opacity:1; transform:translateY(0)} }
            .gp-gcard { animation:gpFadeUp .5s cubic-bezier(.16,1,.3,1) both; }
            .gp-gcard:nth-child(1){animation-delay:.02s} .gp-gcard:nth-child(2){animation-delay:.05s}
            .gp-gcard:nth-child(3){animation-delay:.08s} .gp-gcard:nth-child(4){animation-delay:.11s}
            .gp-gcard:nth-child(5){animation-delay:.14s} .gp-gcard:nth-child(6){animation-delay:.17s}
            .gp-gcard:nth-child(7){animation-delay:.20s} .gp-gcard:nth-child(8){animation-delay:.23s}
            .gp-gcard:nth-child(9){animation-delay:.26s} .gp-gcard:nth-child(10){animation-delay:.29s}
            .gp-gcard:nth-child(11){animation-delay:.32s} .gp-gcard:nth-child(12){animation-delay:.35s}

            /* Estadísticas */
            .gp-tabcontent { animation:gpFadeUp .4s cubic-bezier(.16,1,.3,1) both; }
            .gp-podium { transition:transform .4s cubic-bezier(.16,1,.3,1), box-shadow .4s; }
            .gp-podium:hover { transform:translateY(-6px); }
            .gp-row { transition:background .2s, transform .2s; }
            .gp-row:hover { transform:translateX(3px); }

            /* Shimmer loading */
            @keyframes gpShim { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
            .gp-shim { background:linear-gradient(90deg,rgba(255,255,255,.03) 25%,rgba(255,255,255,.08) 50%,rgba(255,255,255,.03) 75%); background-size:200% 100%; animation:gpShim 1.5s infinite; }

            /* ---------- 11 Ideal: pestañas + tarjeta + loader ---------- */
            .oi-tab { font-family:'Bebas Neue',sans-serif; letter-spacing:.08em; font-size:1.05rem;
                padding:.55rem 1.35rem; border-radius:9999px; cursor:pointer; white-space:nowrap;
                color:rgba(255,255,255,.55); background:rgba(255,255,255,.04);
                border:1px solid rgba(255,255,255,.10); transition:all .35s cubic-bezier(.16,1,.3,1); }
            .oi-tab:hover { color:rgba(255,255,255,.85); background:rgba(255,255,255,.07); border-color:rgba(255,255,255,.2); }
            .oi-tab.is-active { color:#fff; background:linear-gradient(135deg,rgba(139,92,246,.9),rgba(124,58,237,.75));
                border-color:rgba(167,139,250,.6); box-shadow:0 8px 30px -6px rgba(139,92,246,.6); transform:translateY(-1px); }
            .oi-card { position:relative; border-radius:28px; padding:1px;
                background:linear-gradient(160deg, rgba(167,139,250,.35), rgba(255,255,255,.06) 40%, rgba(59,130,246,.25));
                box-shadow:0 30px 80px -30px rgba(0,0,0,.8); }
            .oi-card-inner { border-radius:27px; background:rgba(9,12,22,.85); backdrop-filter:blur(12px); padding:1rem; }
            @media (min-width:640px){ .oi-card-inner { padding:1.5rem; } }
            .oi-loader { position:absolute; inset:1px; border-radius:27px; z-index:5; background:rgba(9,12,22,.92);
                display:flex; flex-direction:column; align-items:center; justify-content:center; gap:1rem; transition:opacity .4s ease; }
            .oi-spinner { width:42px; height:42px; border-radius:9999px; border:3px solid rgba(255,255,255,.12); border-top-color:#a78bfa; animation:oiSpin .8s linear infinite; }
            @keyframes oiSpin { to { transform:rotate(360deg); } }

            /* Bracket */
            .b-col { display:flex; flex-direction:column; width:230px; margin-right:28px; }
            .b-col:last-child { margin-right:0; }
            .b-rows { flex:1; display:flex; flex-direction:column; justify-content:space-around; padding-bottom:20px; }
            .b-pair { position:relative; flex:1; display:flex; flex-direction:column; justify-content:space-around; }
            .b-match { position:relative; }
            .b-match::after { content:''; position:absolute; top:50%; right:-14px; width:14px; height:2px; background:rgba(139,92,246,0.35); }
            .b-pair::after { content:''; position:absolute; right:-14px; top:25%; height:50%; width:2px; background:rgba(139,92,246,0.35); }
            .b-pair::before { content:''; position:absolute; right:-28px; top:50%; width:14px; height:2px; background:rgba(139,92,246,0.35); }
            .b-final .b-match::after, .b-final .b-pair::after, .b-final .b-pair::before { display:none; }
            #bracket-card:fullscreen { background:#070b14; padding:2rem; overflow:auto; }

            @media (prefers-reduced-motion: reduce) {
                .gp-blob, .gp-reveal, .gp-gcard, .gp-tabcontent, .gp-podium, .gp-row, .oi-spinner {
                    animation:none !important; transition:none !important; transform:none !important; opacity:1 !important;
                }
                .oi-tab { transition:none !important; }
            }
        </style>

        <!-- Fondo aurora -->
        <div class="gp-bg">
            <span class="gp-blob gp-b1"></span>
            <span class="gp-blob gp-b2"></span>
            <span class="gp-blob gp-b3"></span>
            <span class="gp-blob gp-b4"></span>
            <span class="gp-blob gp-b5"></span>
            <span class="gp-blob gp-b6"></span>
        </div>
        <div class="gp-noise"></div>

        <!-- HEADER -->
        <div class="relative w-full max-w-[1400px] px-4 md:px-8 pt-12 md:pt-20 pb-10 z-10">
            <div class="inline-flex items-center gap-2 px-4 py-1.5 bg-violet-500/15 border border-violet-500/30 text-violet-300 text-xs font-bold tracking-[0.2em] uppercase rounded-full mb-6">
                <span class="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse"></span>
                Mundial 2026 · Datos en Vivo
            </div>
            <div class="flex items-center gap-4 mb-5">
                ${barra()}
                <h1 class="text-6xl md:text-8xl font-black font-bebas tracking-wide uppercase bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/55">Fase de Grupos</h1>
            </div>
            <p class="text-white/55 text-base md:text-lg max-w-2xl font-sans leading-relaxed mb-8">
                Los 2 primeros de cada sector avanzan directo al Round of 32. Los 8 mejores terceros completan el cuadro de eliminación directa.
            </p>
            <div id="mini-stats" class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-3xl"></div>
        </div>

        <!-- TIRA EN VIVO -->
        <div class="relative w-full max-w-[1400px] px-4 md:px-8 z-10 mt-2">
            <div id="live-strip"></div>
        </div>

        <!-- GRUPOS -->
        <div class="relative w-full max-w-[1400px] px-4 md:px-8 z-10 flex flex-col gap-5 mt-14 gp-reveal">
            <div class="flex items-center gap-4 mb-1">
                ${barra()}
                <h2 class="text-3xl md:text-5xl font-black font-bebas tracking-wide text-white uppercase">Clasificación por Sectores</h2>
            </div>
            <div class="flex flex-wrap items-center gap-5">
                <div class="flex items-center gap-2"><div class="w-2.5 h-2.5 rounded-full bg-emerald-400"></div><span class="text-sm text-white/45 font-sans">Clasifica directo</span></div>
                <div class="flex items-center gap-2"><div class="w-2.5 h-2.5 rounded-full bg-amber-400"></div><span class="text-sm text-white/45 font-sans">Posible mejor 3°</span></div>
                <div class="flex items-center gap-2"><div class="w-2.5 h-2.5 rounded-full bg-white/20"></div><span class="text-sm text-white/45 font-sans">Eliminado</span></div>
            </div>
            <div id="grid-grupos" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 w-full">
                ${Array(12).fill(0).map(() => `<div class="gp-shim border border-white/5 rounded-2xl h-52"></div>`).join('')}
            </div>
        </div>

        <!-- MEJORES TERCEROS -->
        <div class="relative w-full max-w-[1400px] px-4 md:px-8 z-10 flex flex-col gap-5 mt-16 gp-reveal">
            <div class="flex items-center gap-4 mb-1">
                <span class="flex gap-1.5 shrink-0 items-center"><span class="w-2 h-6 bg-amber-400 rounded-full"></span></span>
                <h2 class="text-3xl md:text-5xl font-black font-bebas tracking-wide text-white uppercase">Ranking de Mejores Terceros</h2>
                <span class="hidden sm:inline text-xs text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20 font-sans font-bold whitespace-nowrap">Top 8 Avanzan</span>
            </div>
            <div id="mejores-terceros-container" class="bg-white/[0.025] border border-white/10 rounded-2xl p-5 md:p-6 min-h-[14rem] shadow-2xl">
                <div class="gp-shim rounded-xl h-48"></div>
            </div>
        </div>

        <!-- ESTADÍSTICAS DE JUGADORES -->
        <div id="stats-jugadores" class="relative w-full max-w-[1400px] px-4 md:px-8 z-10 flex flex-col gap-5 mt-20 gp-reveal">
            <div class="flex items-center gap-4 mb-1">
                <span class="flex gap-1.5 shrink-0 items-center"><span class="w-2 h-6 bg-emerald-400 rounded-full"></span></span>
                <h2 class="text-3xl md:text-5xl font-black font-bebas tracking-wide text-white uppercase">Líderes del Torneo</h2>
            </div>
            <p class="text-white/45 text-sm md:text-base font-sans max-w-2xl -mt-2">Los protagonistas del Mundial: goleadores, asistidores, disciplina y porteros imbatidos. Actualizado en tiempo real.</p>
            <div id="stats-body"></div>
        </div>

        <!-- 11 IDEAL (Sofascore, por jornada) -->
        <div class="relative w-full max-w-[1400px] px-4 md:px-8 z-10 flex flex-col items-center gap-5 mt-20 gp-reveal">
            <div class="w-full max-w-3xl flex flex-col items-center">
                <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-400/30 bg-violet-500/10 text-violet-300 text-xs font-bold tracking-[0.22em] uppercase mb-5">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.3 6.9.6-5.2 4.6 1.6 6.8L12 17.3 5.8 20.9l1.6-6.8L2.2 8.9l6.9-.6z"/></svg>
                    Sofascore · Equipo de la Semana
                </div>
                <h2 class="text-4xl md:text-6xl font-black font-bebas tracking-wide uppercase text-center bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/50 leading-[0.92] mb-4">11 Ideal de la Jornada</h2>
                <p class="text-white/55 text-base md:text-lg text-center max-w-xl font-sans leading-relaxed mb-8">
                    La formación de la semana con las mejores actuaciones del Mundial, según las valoraciones de cada partido. Elige una jornada.
                </p>
                <div class="flex gap-2.5 flex-wrap justify-center mb-8">${tabsJornadas}</div>
                <div class="w-full oi-card">
                    <div class="oi-card-inner">
                        <div class="relative" style="min-height:620px;">
                            <div id="oi-loader" class="oi-loader">
                                <div class="oi-spinner"></div>
                                <span class="text-white/40 font-bebas tracking-widest text-sm">Cargando 11 ideal…</span>
                            </div>
                            <iframe id="oi-frame" title="11 Ideal de la Jornada — FIFA World Cup" loading="lazy"
                                width="100%" height="620" style="display:block; max-width:700px; margin:0 auto; border-radius:14px;"
                                src="${urlWidget(JORNADAS[0].round)}" frameBorder="0" scrolling="no"></iframe>
                        </div>
                    </div>
                </div>
                <p class="text-white/30 text-xs font-sans text-center mt-5">
                    Datos y formación cortesía de <a href="https://www.sofascore.com/es/football/tournament/world/world-championship/16#id:58210" target="_blank" rel="noopener" class="text-violet-400/70 hover:text-violet-300 transition-colors">Sofascore</a>. Las valoraciones se actualizan al finalizar cada partido.
                </p>
            </div>
        </div>

        <!-- KNOCKOUT -->
        <div class="relative w-full max-w-[1400px] px-4 md:px-8 z-10 flex flex-col gap-6 mt-20 gp-reveal">
            <div id="bracket-card" class="bg-[#0b1322] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 px-6 py-5 border-b border-white/5 bg-white/[0.02]">
                    <div>
                        <div class="flex items-center gap-4">
                            ${barra()}
                            <h2 class="text-3xl md:text-5xl font-black font-bebas tracking-wide text-white uppercase">Cuadro Final</h2>
                        </div>
                        <p class="text-white/40 text-sm font-sans mt-1.5">Los equipos aparecen automáticamente al jugar su primer partido. Cruces y horarios oficiales FIFA.</p>
                    </div>
                    <div class="flex items-center gap-2 shrink-0">
                        <button id="btn-zoom-out" title="Alejar" class="w-10 h-10 rounded-xl bg-white/5 hover:bg-violet-500/20 border border-white/10 hover:border-violet-500/40 flex items-center justify-center text-white/60 hover:text-white transition-all"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/></svg></button>
                        <button id="btn-zoom-in" title="Acercar" class="w-10 h-10 rounded-xl bg-white/5 hover:bg-violet-500/20 border border-white/10 hover:border-violet-500/40 flex items-center justify-center text-white/60 hover:text-white transition-all"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg></button>
                        <button id="btn-fullscreen" title="Pantalla completa" class="w-10 h-10 rounded-xl bg-white/5 hover:bg-emerald-500/20 border border-white/10 hover:border-emerald-500/40 flex items-center justify-center text-white/60 hover:text-white transition-all">
                            <svg id="icon-expand" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
                            <svg id="icon-compress" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="hidden"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/></svg>
                        </button>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 py-6 border-b border-white/5 bg-white/[0.015]">
                    <div>
                        <p class="text-sm font-bold text-violet-400 uppercase tracking-widest font-sans mb-3 flex items-center gap-2"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>Cómo leer el cuadro</p>
                        <ul class="flex flex-col gap-2.5 text-sm text-white/55 font-sans leading-relaxed">
                            <li><span class="text-white font-bold font-bebas text-base tracking-wider">M73–M104</span> · Número oficial del partido (104 en total).</li>
                            <li><span class="text-white font-bold font-bebas text-base tracking-wider">W74</span> · <span class="text-white/80 font-semibold">Winner</span> — el ganador del partido 74 ocupa ese lugar.</li>
                            <li><span class="text-white font-bold font-bebas text-base tracking-wider">L101 / L102</span> · <span class="text-white/80 font-semibold">Loser</span> — los perdedores de semis juegan el tercer puesto.</li>
                            <li><span class="text-white font-bold font-bebas text-base tracking-wider">1A · 2B</span> · Posición y grupo: 1° del Grupo A, 2° del Grupo B.</li>
                        </ul>
                    </div>
                    <div>
                        <p class="text-sm font-bold text-amber-400 uppercase tracking-widest font-sans mb-3 flex items-center gap-2"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"/></svg>¿Por qué los terceros muestran varios grupos?</p>
                        <p class="text-sm text-white/55 font-sans leading-relaxed">Solo 8 de los 12 terceros clasifican. Por eso FIFA define para cada llave una lista de grupos posibles: la etiqueta <span class="text-amber-400 font-bold">3A/3B/3C/3D/3F</span> significa que ese cupo lo tomará el tercero de <span class="text-white font-bold">uno</span> de esos grupos. La combinación exacta se activa al terminar la fase de grupos.</p>
                    </div>
                </div>

                <div class="w-full overflow-x-auto overflow-y-hidden p-6" style="scrollbar-width:thin;">
                    <div id="bracket-zoom" style="zoom:1; transform-origin:top left;">
                        <div id="bracket-container" class="flex items-stretch" style="min-width:1290px; height:1420px;"></div>
                    </div>
                </div>

                <div class="flex flex-wrap items-center gap-6 px-6 py-4 border-t border-white/5 font-sans text-sm text-white/50 bg-white/[0.015]">
                    <div class="flex items-center gap-2"><div class="w-3 h-3 rounded bg-white/5 border border-white/10"></div><span>Casillero vacío</span></div>
                    <div class="flex items-center gap-2"><div class="w-3 h-3 rounded bg-amber-400/10 border border-amber-400/30"></div><span>Mejor tercer lugar</span></div>
                    <div class="flex items-center gap-2"><div class="w-3 h-3 rounded bg-violet-500/10 border border-violet-500/30"></div><span>Equipo clasificado</span></div>
                    <span class="ml-auto text-xs text-white/25">Actualización automática cada 5 min</span>
                </div>
            </div>
        </div>

        <!-- SEO -->
        <div class="relative w-full max-w-[1400px] px-4 md:px-8 z-10 mt-16 pt-8 border-t border-white/10">
            <h2 class="text-2xl md:text-3xl font-black font-bebas tracking-wide text-white uppercase mb-3">Tabla de Posiciones y Estadísticas del Mundial 2026 en Vivo</h2>
            <p class="text-white/55 text-sm md:text-base font-sans leading-relaxed max-w-4xl mb-3">
                Consulta la tabla de posiciones del Mundial 2026 actualizada en tiempo real: puntos, goles a favor y en contra y diferencia de gol de los 12 grupos (A a la L) de la Copa del Mundo de México, Estados Unidos y Canadá. CupHub te muestra los goleadores, asistencias, tarjetas, vallas invictas y el 11 ideal de la jornada, además del ranking de los 8 mejores terceros y el cuadro completo de eliminación directa con fechas y horarios oficiales hasta la gran final en el MetLife Stadium el 19 de julio de 2026.
            </p>
            <p class="text-white/40 text-sm font-sans leading-relaxed max-w-4xl">
                Sigue la clasificación y las estadísticas de México, Argentina, Colombia, España, Brasil y las 48 selecciones del primer Mundial con 104 partidos y tres países anfitriones.
            </p>
        </div>
    `

    // ----- Estado -----
    let ultimoStandings = [], ultimosFixtures = [], equiposEnVivo = new Set()
    let statsCargadas = null, statsCargando = false

    const pintarTablas = () => {
        if (!ultimoStandings.length) return
        section.querySelector('#grid-grupos').innerHTML = ultimoStandings.map(g => tablaGrupo(g, equiposEnVivo)).join('')
    }

    const pintarMiniStats = () => {
        const cont = section.querySelector('#mini-stats')
        if (!cont || !ultimoStandings.length) return
        const equipos = ultimoStandings.flat()
        const totalGoles = equipos.reduce((s, e) => s + (e.all.goals.for || 0), 0)
        const totalPJ = Math.round(equipos.reduce((s, e) => s + (e.all.played || 0), 0) / 2)
        const prom = totalPJ ? (totalGoles / totalPJ).toFixed(2) : '0.00'
        const stat = (n, l, color) => `
            <div class="bg-white/[0.03] border border-white/10 rounded-2xl px-4 py-3.5 flex flex-col">
                <span class="font-bebas text-4xl md:text-5xl leading-none ${color}">${n}</span>
                <span class="text-white/45 text-[11px] font-sans uppercase tracking-widest mt-1">${l}</span>
            </div>`
        cont.innerHTML =
            stat('48', 'Selecciones', 'text-white') +
            stat(totalPJ, 'Partidos jugados', 'text-emerald-400') +
            stat(totalGoles, 'Goles totales', 'text-amber-400') +
            stat(prom, 'Goles / partido', 'text-violet-400')
    }

    const cargarStandings = () => {
        cargarGruposAPI().then(standings => {
            if (!standings || !standings.length) {
                section.querySelector('#grid-grupos').innerHTML = `<p class="text-red-400 col-span-full font-bebas text-center py-10 text-2xl">Error al enlazar datos con los servidores.</p>`
                return
            }
            ultimoStandings = standings
            pintarTablas(); pintarMiniStats()
            section.querySelector('#mejores-terceros-container').innerHTML = tablaTerceros(mejoresTerceros(standings))
            section.querySelector('#bracket-container').innerHTML = renderBracket(standings)
        })
    }

    const cargarLive = () => {
        cargarPartidosEnVivo().then(partidos => {
            ultimosFixtures = partidos || []
            const live = ultimosFixtures.filter(p => ESTADOS_VIVO.includes(p.status))
            equiposEnVivo = new Set(live.flatMap(p => [p.home, p.away]))
            renderLiveStrip(section, live)
            pintarTablas()
            const cont = section.querySelector('#stats-body')
            if (cont && cont._bound) {
                cont._vallas = calcularVallasInvictas(ultimosFixtures)
                if (cont._activo === 'vallas') pintarEstadisticas(cont)
            }
        })
    }

    const cargarStatsLazy = () => {
        if (statsCargadas || statsCargando) return
        statsCargando = true
        section.querySelector('#stats-body').innerHTML = `<div class="gp-shim rounded-2xl h-64"></div>`
        cargarTodasStats().then(data => {
            statsCargadas = data
            statsCargando = false
            montarEstadisticas(section, data, ultimosFixtures)
        })
    }

    cargarStandings()
    cargarLive()
    setInterval(cargarStandings, STANDINGS_CACHE_DURATION)
    setInterval(cargarLive, LIVE_CACHE_DURATION)

    setupBracketControls(section)
    setup11Ideal(section)
    setupReveal(section)
    setupStatsObserver(section, cargarStatsLazy)

    return section
}

// ============================================================================
// REVELADO AL SCROLL + OBSERVER STATS
// ============================================================================
function setupReveal(section) {
    const els = section.querySelectorAll('.gp-reveal')
    if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('is-in')); return }
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); obs.unobserve(e.target) } })
    }, { threshold: 0.08 })
    els.forEach(e => obs.observe(e))
}

function setupStatsObserver(section, cb) {
    const target = section.querySelector('#stats-jugadores')
    if (!target) return
    if (!('IntersectionObserver' in window)) { cb(); return }
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { cb(); obs.disconnect() } })
    }, { rootMargin: '200px' })
    obs.observe(target)
}

// ============================================================================
// 11 IDEAL — pestañas por jornada
// ============================================================================
function setup11Ideal(section) {
    const iframe = section.querySelector('#oi-frame')
    const loader = section.querySelector('#oi-loader')
    if (!iframe || !loader) return
    const tabs = [...section.querySelectorAll('.oi-tab')]

    const mostrarLoader = () => { loader.style.opacity = '1'; loader.style.pointerEvents = 'auto' }
    const ocultarLoader = () => { loader.style.opacity = '0'; loader.style.pointerEvents = 'none' }

    iframe.addEventListener('load', ocultarLoader)
    let respaldo = setTimeout(ocultarLoader, 2500)

    tabs.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.classList.contains('is-active')) return
            tabs.forEach(b => b.classList.remove('is-active'))
            btn.classList.add('is-active')
            mostrarLoader()
            clearTimeout(respaldo)
            respaldo = setTimeout(ocultarLoader, 2500)
            iframe.src = urlWidget(btn.dataset.round)
        })
    })
}

// ============================================================================
// SECCIÓN 3: TIRA EN VIVO
// ============================================================================
function tarjetaEnVivo(p) {
    return `
    <div class="shrink-0 w-64 bg-white/[0.04] border border-red-500/30 rounded-2xl p-3 shadow-lg">
        <div class="flex items-center justify-between mb-2">
            <span class="flex items-center gap-1.5 text-red-400 text-[11px] font-bold font-sans uppercase tracking-widest"><span class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> En Vivo</span>
            <span class="text-white/40 text-[11px] font-sans tabular-nums">${p.minuto ? p.minuto + "'" : ''}</span>
        </div>
        <div class="flex items-center justify-between gap-2">
            <div class="flex items-center gap-2 min-w-0 flex-1">
                <span class="gp-flag w-6 h-6"><img src="${p.homeLogo}" alt="${p.home}"></span>
                <span class="text-white font-bebas text-sm tracking-wider truncate">${p.home.toUpperCase()}</span>
            </div>
            <span class="text-white font-bebas text-2xl tabular-nums shrink-0 px-1">${p.homeGoals ?? 0}-${p.awayGoals ?? 0}</span>
            <div class="flex items-center gap-2 min-w-0 flex-1 justify-end">
                <span class="text-white font-bebas text-sm tracking-wider truncate text-right">${p.away.toUpperCase()}</span>
                <span class="gp-flag w-6 h-6"><img src="${p.awayLogo}" alt="${p.away}"></span>
            </div>
        </div>
    </div>`
}

function renderLiveStrip(section, live) {
    const cont = section.querySelector('#live-strip')
    if (!cont) return
    if (!live.length) {
        cont.innerHTML = `<div class="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-white/45 text-sm font-sans"><span class="w-2 h-2 rounded-full bg-white/25"></span>No hay partidos en vivo ahora. El marcador en tiempo real aparecerá aquí durante cada encuentro.</div>`
        return
    }
    cont.innerHTML = `
        <div class="flex items-center gap-3 mb-3">
            <span class="flex items-center gap-2 text-red-400 font-bold font-sans uppercase tracking-widest text-sm"><span class="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span> Partidos en Vivo</span>
            <span class="text-white/40 text-sm font-sans">· ${live.length} en juego ahora</span>
        </div>
        <div class="flex gap-3 overflow-x-auto pb-2" style="scrollbar-width:thin;">${live.map(tarjetaEnVivo).join('')}</div>`
}

// ============================================================================
// SECCIÓN 4: CONTROLES DEL BRACKET
// ============================================================================
function setupBracketControls(section) {
    const card = section.querySelector('#bracket-card')
    const zoomEl = section.querySelector('#bracket-zoom')
    const btnFull = section.querySelector('#btn-fullscreen')
    const btnIn = section.querySelector('#btn-zoom-in')
    const btnOut = section.querySelector('#btn-zoom-out')
    const iconExp = section.querySelector('#icon-expand')
    const iconComp = section.querySelector('#icon-compress')
    let zoom = 1
    btnIn.addEventListener('click', () => { zoom = Math.min(1.5, zoom + 0.1); zoomEl.style.zoom = zoom })
    btnOut.addEventListener('click', () => { zoom = Math.max(0.5, zoom - 0.1); zoomEl.style.zoom = zoom })
    btnFull.addEventListener('click', () => { if (!document.fullscreenElement) card.requestFullscreen().catch(() => {}); else document.exitFullscreen() })
    document.addEventListener('fullscreenchange', () => {
        const activo = document.fullscreenElement === card
        iconExp.classList.toggle('hidden', activo)
        iconComp.classList.toggle('hidden', !activo)
        btnFull.title = activo ? 'Salir de pantalla completa' : 'Pantalla completa'
    })
}

// ============================================================================
// SECCIÓN 5: TABLA DE GRUPO
// ============================================================================
const GRID_COLS = '1rem 1rem 1.6rem 1fr 1.2rem 1.2rem 1.2rem 1.2rem 1.2rem 1.2rem 1.5rem 1.5rem'

function tablaGrupo(grupoData, liveSet = new Set()) {
    const letra = grupoData[0].group.replace('Group ', '')
    const filas = grupoData.map((eq, i) => {
        const enVivo = liveSet.has(eq.team.name)
        const dot = i < 2 ? 'bg-emerald-400' : i === 2 ? 'bg-amber-400' : 'bg-white/15'
        const dg = eq.goalsDiff > 0 ? `+${eq.goalsDiff}` : eq.goalsDiff
        const indicador = enVivo
            ? `<span class="w-2 h-2 rounded-full bg-red-500 animate-pulse mx-auto block"></span>`
            : `<div class="w-1.5 h-1.5 rounded-full ${dot} mx-auto"></div>`
        return /*html*/`
        <div class="gp-row grid items-center py-2 border-b border-white/[0.04] last:border-0 rounded-lg px-1 ${enVivo ? 'bg-red-500/[0.07]' : 'hover:bg-white/[0.04]'}" style="grid-template-columns:${GRID_COLS}">
            ${indicador}
            <span class="text-white/30 font-bebas text-xs text-center">${i + 1}</span>
            <span class="gp-flag w-6 h-6 mx-auto"><img src="${eq.team.logo}" alt="Bandera de ${eq.team.name}"></span>
            <span class="text-white font-bebas text-sm tracking-wider truncate px-1 flex items-center gap-1.5" title="${eq.team.name}">
                ${eq.team.name.substring(0, 11).toUpperCase()}
                ${enVivo ? `<span class="text-[8px] text-red-400 font-sans font-bold bg-red-500/15 px-1 rounded shrink-0">LIVE</span>` : ''}
            </span>
            <span class="text-white/50 font-sans text-[11px] text-center tabular-nums">${eq.all.played}</span>
            <span class="text-white/40 font-sans text-[11px] text-center tabular-nums">${eq.all.win}</span>
            <span class="text-white/40 font-sans text-[11px] text-center tabular-nums">${eq.all.draw}</span>
            <span class="text-white/40 font-sans text-[11px] text-center tabular-nums">${eq.all.lose}</span>
            <span class="text-white/40 font-sans text-[11px] text-center tabular-nums">${eq.all.goals.for}</span>
            <span class="text-white/40 font-sans text-[11px] text-center tabular-nums">${eq.all.goals.against}</span>
            <span class="font-sans text-[11px] text-center tabular-nums ${eq.goalsDiff > 0 ? 'text-emerald-400' : eq.goalsDiff < 0 ? 'text-red-400' : 'text-white/40'}">${dg}</span>
            <span class="text-white font-bebas text-base text-center tabular-nums font-bold">${eq.points}</span>
        </div>`
    }).join('')

    return /*html*/`
    <div class="gp-gcard bg-white/[0.025] border border-white/10 rounded-2xl p-4 flex flex-col hover:border-violet-500/50 hover:-translate-y-0.5 transition-all duration-300 shadow-xl">
        <div class="flex items-center justify-between mb-3 pb-2.5 border-b border-white/10">
            <div class="flex items-center gap-2.5">
                <span class="w-1.5 h-5 bg-violet-500 rounded-full shrink-0"></span>
                <h3 class="text-xl font-black font-bebas text-white tracking-[0.12em]">GRUPO <span class="text-violet-300">${letra}</span></h3>
            </div>
            <span class="text-[10px] text-violet-400/60 font-sans font-bold uppercase tracking-widest">WC26</span>
        </div>
        <div class="grid text-[10px] font-bold text-white/25 uppercase tracking-wider mb-1.5 px-1" style="grid-template-columns:${GRID_COLS}">
            <span></span><span></span><span></span>
            <span class="px-1 text-white/40">País</span>
            <span class="text-center">PJ</span><span class="text-center">G</span><span class="text-center">E</span><span class="text-center">P</span>
            <span class="text-center">GF</span><span class="text-center">GC</span><span class="text-center">DG</span><span class="text-center text-white/50">Pts</span>
        </div>
        ${filas}
    </div>`
}

// ============================================================================
// SECCIÓN 6: MEJORES TERCEROS
// ============================================================================
function mejoresTerceros(standings) {
    return standings.filter(g => g[2]).map(g => g[2]).sort((a, b) => {
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
        <div class="gp-row flex items-center justify-between py-2.5 border-b border-white/5 last:border-0 px-2 hover:bg-white/[0.04] rounded-lg ${clasifica ? '' : 'opacity-50'}">
            <div class="flex items-center gap-2.5 min-w-0">
                <span class="font-bebas text-base w-5 text-center shrink-0 ${clasifica ? 'text-amber-400' : 'text-white/25'}">${i + 1}</span>
                <span class="gp-flag w-7 h-7 shrink-0"><img src="${eq.team.logo}" alt="Bandera de ${eq.team.name}"></span>
                <span class="text-white font-bebas text-base tracking-wider w-28 truncate shrink-0" title="${eq.team.name}">${eq.team.name.toUpperCase()}</span>
                <span class="text-[10px] text-amber-300/80 bg-amber-400/10 border border-amber-400/20 w-6 h-5 flex items-center justify-center rounded font-sans font-bold shrink-0">${letra}</span>
            </div>
            <div class="flex items-center gap-3 shrink-0">
                <span class="text-sm text-white/55 font-sans font-medium tabular-nums">${eq.points} pts</span>
                <span class="w-6 h-6 flex items-center justify-center rounded-full border text-xs font-bold shrink-0 ${clasifica ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-white/5 border-white/10 text-white/25'}">${clasifica ? '✓' : '✗'}</span>
            </div>
        </div>`
    }).join('')

    return /*html*/`
    <span class="sr-only">Tabla de los Mejores Terceros Lugares de la Copa Mundial FIFA 2026 — CupHub en tiempo real</span>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0">
        ${filas.length > 0 ? filas : `<p class="text-white/20 font-bebas text-center py-8 text-base col-span-full">Los datos se computarán al inicio de los partidos</p>`}
    </div>`
}

// ============================================================================
// SECCIÓN 7: ESTADÍSTICAS DE JUGADORES
// ============================================================================
const STAT_COLORS = {
    emerald: { txt: 'text-emerald-400', bg: 'bg-emerald-500/15', bd: 'border-emerald-500/40', ring: 'ring-emerald-500/40', grad: 'from-emerald-500/25', glow: 'shadow-[0_8px_40px_-8px_rgba(16,185,129,0.5)]' },
    sky:     { txt: 'text-sky-400', bg: 'bg-sky-500/15', bd: 'border-sky-500/40', ring: 'ring-sky-500/40', grad: 'from-sky-500/25', glow: 'shadow-[0_8px_40px_-8px_rgba(56,189,248,0.5)]' },
    amber:   { txt: 'text-amber-400', bg: 'bg-amber-500/15', bd: 'border-amber-500/40', ring: 'ring-amber-500/40', grad: 'from-amber-500/25', glow: 'shadow-[0_8px_40px_-8px_rgba(245,158,11,0.5)]' },
    red:     { txt: 'text-red-400', bg: 'bg-red-500/15', bd: 'border-red-500/40', ring: 'ring-red-500/40', grad: 'from-red-500/25', glow: 'shadow-[0_8px_40px_-8px_rgba(239,68,68,0.5)]' },
    violet:  { txt: 'text-violet-400', bg: 'bg-violet-500/15', bd: 'border-violet-500/40', ring: 'ring-violet-500/40', grad: 'from-violet-500/25', glow: 'shadow-[0_8px_40px_-8px_rgba(139,92,246,0.5)]' },
}

function iconoStat(key) {
    if (key === 'goleadores') return `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7l1.5 3.2 3.5.3-2.7 2.3.9 3.4L12 17l-3.1 1.5.9-3.4L7 12.8l3.5-.3z" fill="currentColor" stroke="none"/></svg>`
    if (key === 'asistencias') return `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`
    if (key === 'amarillas' || key === 'rojas') return `<span class="inline-block w-3 h-4 rounded-[2px] bg-current rotate-6"></span>`
    if (key === 'vallas') return `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"/></svg>`
    return ''
}

function ratingBadge(r) {
    if (r == null || isNaN(r)) return ''
    const cls = r >= 7.5 ? 'bg-emerald-500/20 text-emerald-300' : r >= 6.8 ? 'bg-amber-500/20 text-amber-300' : 'bg-white/10 text-white/45'
    return `<span class="${cls} text-[11px] font-sans font-bold px-1.5 py-0.5 rounded tabular-nums shrink-0" title="Valoración media">${r.toFixed(1)}</span>`
}

function imgJugador(src, alt, sizeClass, ringClass = '') {
    return `<span class="gp-flag ${sizeClass} ${ringClass}"><img src="${src || PLAYER_FALLBACK}" alt="${alt}" onerror="this.onerror=null;this.src='${PLAYER_FALLBACK}'"></span>`
}

function podioCard(item, pos, color, campo, tipoEquipo) {
    const c = STAT_COLORS[color]
    const medalla = pos === 1 ? 'border-amber-400/50' : pos === 2 ? 'border-white/25' : 'border-orange-700/40'
    const numColor = pos === 1 ? 'text-amber-400' : pos === 2 ? 'text-white/60' : 'text-orange-600'
    const escala = pos === 1 ? 'md:scale-105 md:-translate-y-2' : ''
    const valor = item[campo] ?? 0
    const imagen = tipoEquipo
        ? `<span class="gp-flag w-16 h-16 ring-2 ${c.ring}"><img src="${item.equipoLogo}" alt="${item.equipo}"></span>`
        : imgJugador(item.foto, item.nombre, 'w-16 h-16', `ring-2 ${c.ring}`)
    const nombre = tipoEquipo ? item.equipo : item.nombre
    const sub = tipoEquipo
        ? `<span class="text-white/40 text-xs font-sans">${item.jugados} PJ</span>`
        : `<span class="gp-flag w-4 h-4"><img src="${item.equipoLogo}" alt="${item.equipo}"></span><span class="text-white/45 text-xs font-sans truncate">${item.equipo}</span>`

    return `
    <div class="gp-podium relative bg-gradient-to-b ${c.grad} to-transparent border ${medalla} rounded-2xl px-3 py-5 flex flex-col items-center text-center ${escala} ${pos === 1 ? c.glow : ''}">
        <span class="absolute top-2.5 left-3 font-bebas text-2xl ${numColor} leading-none">${pos}</span>
        ${imagen}
        <p class="text-white font-bebas text-base md:text-lg tracking-wider mt-3 leading-tight truncate w-full px-1" title="${nombre}">${(nombre || '').toUpperCase()}</p>
        <div class="flex items-center justify-center gap-1.5 mt-1 w-full">${sub}</div>
        <div class="flex items-baseline justify-center gap-1.5 mt-3">
            <span class="font-bebas text-5xl ${c.txt} leading-none tabular-nums">${valor}</span>
            ${!tipoEquipo ? ratingBadge(item.rating) : ''}
        </div>
    </div>`
}

function filaStat(item, pos, color, campo, tipoEquipo, subCampo, subLabel) {
    const c = STAT_COLORS[color]
    const valor = item[campo] ?? 0
    const imagen = tipoEquipo
        ? `<span class="gp-flag w-9 h-9 shrink-0"><img src="${item.equipoLogo}" alt="${item.equipo}"></span>`
        : imgJugador(item.foto, item.nombre, 'w-9 h-9 shrink-0')
    const nombre = tipoEquipo ? item.equipo : item.nombre
    const equipoTag = tipoEquipo
        ? `<span class="text-white/40 text-xs font-sans">${item.jugados} PJ</span>`
        : `<span class="gp-flag w-4 h-4 shrink-0"><img src="${item.equipoLogo}" alt="${item.equipo}"></span><span class="text-white/45 text-xs font-sans truncate">${item.equipo}</span>`
    const subValor = (!tipoEquipo && subCampo != null) ? `<span class="text-white/35 text-[11px] font-sans tabular-nums hidden sm:inline">${item[subCampo] ?? 0} ${subLabel}</span>` : ''

    return `
    <div class="gp-row flex items-center gap-3 py-2.5 px-2 border-b border-white/5 last:border-0 hover:bg-white/[0.04] rounded-lg">
        <span class="font-bebas text-base w-6 text-center text-white/30 shrink-0">${pos}</span>
        ${imagen}
        <div class="flex flex-col min-w-0 flex-1">
            <span class="text-white font-bebas text-sm tracking-wider truncate" title="${nombre}">${(nombre || '').toUpperCase()}</span>
            <div class="flex items-center gap-1.5 min-w-0">${equipoTag}</div>
        </div>
        ${!tipoEquipo ? ratingBadge(item.rating) : ''}
        ${subValor}
        <span class="font-bebas text-2xl ${c.txt} tabular-nums shrink-0 w-9 text-right">${valor}</span>
    </div>`
}

function montarEstadisticas(section, statsData, fixtures) {
    const cont = section.querySelector('#stats-body')
    if (!cont) return
    cont._stats = statsData
    cont._vallas = calcularVallasInvictas(fixtures)
    if (!cont._activo) cont._activo = 'goleadores'
    if (!cont._bound) {
        cont._bound = true
        cont.addEventListener('click', (e) => {
            const btn = e.target.closest('.gp-tabbtn')
            if (!btn) return
            cont._activo = btn.getAttribute('data-tab')
            pintarEstadisticas(cont)
        })
    }
    pintarEstadisticas(cont)
}

function pintarEstadisticas(cont) {
    const statsData = cont._stats || {}
    const vallas = cont._vallas || []
    const activo = cont._activo || 'goleadores'

    const TABS = [
        { key: 'goleadores',  label: 'Goleadores',      color: 'emerald', data: statsData.goleadores || [],  campo: 'goles',     sub: 'asis',      subLabel: 'AST', equipo: false },
        { key: 'asistencias', label: 'Asistencias',     color: 'sky',     data: statsData.asistencias || [], campo: 'asis',      sub: 'goles',     subLabel: 'GOL', equipo: false },
        { key: 'amarillas',   label: 'Amarillas',       color: 'amber',   data: statsData.amarillas || [],   campo: 'amarillas', sub: 'rojas',     subLabel: 'ROJ', equipo: false },
        { key: 'rojas',       label: 'Rojas',           color: 'red',     data: statsData.rojas || [],       campo: 'rojas',     sub: 'amarillas', subLabel: 'AMA', equipo: false },
        { key: 'vallas',      label: 'Vallas Invictas', color: 'violet',  data: vallas,                      campo: 'clean',     sub: null,        subLabel: '',    equipo: true  },
    ]

    const barraTabs = TABS.map(t => {
        const c = STAT_COLORS[t.color]
        const on = t.key === activo
        return `<button data-tab="${t.key}" class="gp-tabbtn flex items-center gap-2 px-4 py-2.5 rounded-xl font-bebas text-base tracking-wider whitespace-nowrap transition-all duration-300 border ${on ? `${c.bg} ${c.bd} ${c.txt}` : 'bg-white/[0.03] border-white/10 text-white/50 hover:text-white/80 hover:bg-white/[0.06]'}">
            <span class="${on ? c.txt : 'text-white/40'} flex items-center">${iconoStat(t.key)}</span>${t.label}
        </button>`
    }).join('')

    const tab = TABS.find(t => t.key === activo) || TABS[0]
    const data = tab.data
    let cuerpo
    if (!data.length) {
        const msg = tab.key === 'vallas'
            ? 'Aún no hay porterías imbatidas registradas. Aparecerán cuando se jueguen los primeros partidos.'
            : 'Los datos se computarán cuando se disputen los primeros partidos del torneo.'
        cuerpo = `<div class="gp-tabcontent text-center py-16 text-white/30 font-bebas text-lg tracking-wider">${msg}</div>`
    } else {
        const top3 = data.slice(0, 3)
        const resto = data.slice(3, 12)
        const podio = `<div class="grid grid-cols-3 gap-2 sm:gap-4 mb-5 items-end">
            ${top3[1] ? podioCard(top3[1], 2, tab.color, tab.campo, tab.equipo) : '<div></div>'}
            ${top3[0] ? podioCard(top3[0], 1, tab.color, tab.campo, tab.equipo) : '<div></div>'}
            ${top3[2] ? podioCard(top3[2], 3, tab.color, tab.campo, tab.equipo) : '<div></div>'}
        </div>`
        const lista = resto.length ? `<div class="flex flex-col">${resto.map((it, i) => filaStat(it, i + 4, tab.color, tab.campo, tab.equipo, tab.sub, tab.subLabel)).join('')}</div>` : ''
        cuerpo = `<div class="gp-tabcontent">${podio}${lista}</div>`
    }

    cont.innerHTML = `
        <div class="flex gap-2 overflow-x-auto pb-3 mb-5 -mx-1 px-1" style="scrollbar-width:thin;">${barraTabs}</div>
        <div class="bg-white/[0.02] border border-white/10 rounded-3xl p-4 md:p-6 shadow-2xl">${cuerpo}</div>`
}

// ============================================================================
// SECCIÓN 9: BRACKET KNOCKOUT (cruces y fechas oficiales FIFA 2026)
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
    { id: 'M89', fecha: '4 jul', hora: '16:00', l1: 'W74', l2: 'W77' },
    { id: 'M90', fecha: '4 jul', hora: '12:00', l1: 'W73', l2: 'W75' },
    { id: 'M93', fecha: '6 jul', hora: '14:00', l1: 'W83', l2: 'W84' },
    { id: 'M94', fecha: '6 jul', hora: '19:00', l1: 'W81', l2: 'W82' },
    { id: 'M91', fecha: '5 jul', hora: '15:00', l1: 'W76', l2: 'W78' },
    { id: 'M92', fecha: '5 jul', hora: '19:00', l1: 'W79', l2: 'W80' },
    { id: 'M95', fecha: '7 jul', hora: '11:00', l1: 'W86', l2: 'W88' },
    { id: 'M96', fecha: '7 jul', hora: '15:00', l1: 'W85', l2: 'W87' },
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
        return `<div class="flex items-center gap-2 px-3 py-2 bg-violet-500/[0.07]">
            <span class="gp-flag w-5 h-5 shrink-0"><img src="${eq.logo}" alt="${eq.nombre}"></span>
            <span class="text-white font-bebas text-sm tracking-wider truncate">${eq.nombre}</span>
            <span class="text-violet-300 font-sans text-[10px] ml-auto font-bold bg-violet-500/15 px-1.5 py-0.5 rounded tabular-nums shrink-0">${eq.puntos}pts</span>
        </div>`
    }
    if (eq.tipo === 'tercero') {
        return `<div class="flex items-center gap-2 px-3 py-2 bg-amber-400/[0.05]">
            <div class="w-5 h-5 rounded bg-amber-400/15 border border-amber-400/30 shrink-0 flex items-center justify-center"><span class="text-[7px] text-amber-400 font-bold">3°</span></div>
            <span class="text-amber-400/70 font-bebas text-[11px] tracking-wider truncate">${eq.label}</span>
        </div>`
    }
    return `<div class="flex items-center gap-2 px-3 py-2">
        <div class="w-5 h-5 rounded-full bg-white/5 border border-white/10 shrink-0"></div>
        <span class="text-white/25 font-bebas text-sm tracking-widest">${eq.label || 'POR DEFINIR'}</span>
    </div>`
}

function filaGanador(label) {
    return `<div class="flex items-center gap-2 px-3 py-2">
        <div class="w-5 h-5 rounded-full bg-white/5 border border-white/10 shrink-0"></div>
        <span class="text-white/30 font-bebas text-sm tracking-widest">${label}</span>
    </div>`
}

function matchCard(fila1, fila2, fecha, hora, destacado = false) {
    return `<div class="b-match">
        <div class="flex items-stretch bg-[#121a2e] border ${destacado ? 'border-amber-400/40' : 'border-white/10'} rounded-xl overflow-hidden shadow-lg hover:border-violet-500/40 transition-all w-[230px]">
            <div class="flex-1 flex flex-col divide-y divide-white/5 min-w-0">${fila1}${fila2}</div>
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
        r32HTML += `<div class="b-pair mb-5 gap-1 last:mb-0">
            ${matchCard(filaEquipo(resolverEquipo(standings, m1.t1)), filaEquipo(resolverEquipo(standings, m1.t2)), m1.fecha, m1.hora)}
            ${matchCard(filaEquipo(resolverEquipo(standings, m2.t1)), filaEquipo(resolverEquipo(standings, m2.t2)), m2.fecha, m2.hora)}
        </div>`
    }
    let octHTML = ''
    for (let i = 0; i < 8; i += 2) {
        const m1 = OCTAVOS[i], m2 = OCTAVOS[i + 1]
        octHTML += `<div class="b-pair">${matchCard(filaGanador(m1.l1), filaGanador(m1.l2), m1.fecha, m1.hora)}${matchCard(filaGanador(m2.l1), filaGanador(m2.l2), m2.fecha, m2.hora)}</div>`
    }
    let cuartosHTML = ''
    for (let i = 0; i < 4; i += 2) {
        const m1 = CUARTOS[i], m2 = CUARTOS[i + 1]
        cuartosHTML += `<div class="b-pair">${matchCard(filaGanador(m1.l1), filaGanador(m1.l2), m1.fecha, m1.hora)}${matchCard(filaGanador(m2.l1), filaGanador(m2.l2), m2.fecha, m2.hora)}</div>`
    }
    const semisHTML = `<div class="b-pair">${matchCard(filaGanador(SEMIS[0].l1), filaGanador(SEMIS[0].l2), SEMIS[0].fecha, SEMIS[0].hora)}${matchCard(filaGanador(SEMIS[1].l1), filaGanador(SEMIS[1].l2), SEMIS[1].fecha, SEMIS[1].hora)}</div>`
    const finalHTML = `<div class="b-rows"><div class="flex flex-col items-center justify-center gap-6">
        <div class="flex flex-col items-center gap-3">
            <img src="/icons/WorldCup.png" alt="Trofeo Copa del Mundo FIFA 2026" class="w-20 h-auto object-contain cursor-pointer drop-shadow-[0_0_20px_rgba(251,191,36,0.6)] hover:drop-shadow-[0_0_40px_rgba(251,191,36,0.95)] hover:scale-110 transition-all duration-500">
            ${matchCard(filaGanador('W101'), filaGanador('W102'), '19 jul', '14:00', true)}
            <span class="text-[10px] text-amber-400 font-sans font-bold uppercase tracking-widest bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">Gran Final · MetLife</span>
        </div>
        <div class="flex flex-col items-center gap-2 opacity-60">
            ${matchCard(filaGanador('L101'), filaGanador('L102'), '18 jul', '16:00')}
            <span class="text-[10px] text-white/30 font-sans font-bold uppercase tracking-widest">Tercer Puesto</span>
        </div>
    </div></div>`
    const header = (t) => `<div class="text-center font-sans font-bold text-[13px] text-violet-400 tracking-widest uppercase border-b-[3px] border-white/30 pb-3 mb-6">${t}</div>`
    return `
        <div class="b-col">${header('Round of 32')}<div class="b-rows">${r32HTML}</div></div>
        <div class="b-col">${header('Octavos de Final')}<div class="b-rows">${octHTML}</div></div>
        <div class="b-col">${header('Cuartos de Final')}<div class="b-rows">${cuartosHTML}</div></div>
        <div class="b-col">${header('Semifinales')}<div class="b-rows">${semisHTML}</div></div>
        <div class="b-col b-final">${header('Final')}${finalHTML}</div>
    `
}