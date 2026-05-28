export function renderCountdown() {
    const section = document.createElement('section')
    // Contenedor flexible centrado vertical y horizontalmente con imagen de fondo adaptable y elementos organizados en columna
    section.className = 'relative flex flex-col items-center justify-center gap-6 overflow-hidden bg-[url(/src/assets/img/fondo-home-countdown.png)] bg-cover bg-center bg-no-repeat perspective pt-16 lg:pt-0'
    // Area visible del navegador
    section.style.minHeight = '100vh'
    section.style.marginTop = '0'
    section.innerHTML = /*html*/`

    <!-- TARJETA PROGRESO -->
    <div class="absolute top-15 left-4 bg-black/70 backdrop-blur-sm border border-white/10 rounded-xl px-5 py-3 w-64 font-bebas transition-all hover:border-cyan-400/50 hover:shadow-[0_8px_50px_0_rgba(34,211,238,0.2)]">
        <p class="text-white/90 text-xl tracking-wide">Cargando Mundial 2026...</p>
        <!-- Barra de progreso + porcentaje -->
        <div class="flex items-center gap-2">
            <div class="flex-1 bg-white/15 rounded-full h-2 relative">
                <div 
                    id="progress-bar"
                    class="h-2 rounded-full bg-gradient-to-r from-yellow-200 via-amber-400 to-yellow-600 relative" 
                style="width: 0%">
                    <!-- Punto dorado en la punta -->
                    <div class="absolute -right-1.5 -top-1 w-4 h-4 rounded-full bg-yellow-400 border-2 border-yellow-200 shadow-[0_0_6px_2px_rgba(234,179,8,0.6)]"></div>
                </div>
            </div>
        <span id="progress-percent" class="text-white text-base tracking-wide">0%</span>
        </div>
    </div>

    <div class="relative mt-5 md:mt-6 xl:mt-10 flex flex-col items-center gap-6 z-10">
        <h1 class="text-base md:text-xl xl:text-5xl 2xl:text-7xl font-black text-white text-center font-bebas tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)]">
        Faltan
        </h1>
        <!-- Contador -->
        <div class="flex gap-8 items-center font-bebas">
            <div class="relative group">
                <div class="relative flex flex-col items-center justify-center bg-black/40 backdrop-blur-md border border-white/15 p-5 rounded-4xl min-w-[100px] shadow-2xl hover:-translate-y-1 transition-transform duration-500 hover:border-white/30 group">
                    <div class="absolute -inset-1 bg-white rounded-4xl blur opacity-0 group-hover:opacity-10 transition duration-700"></div>
                    <span id="days" class="text-lg md:text-xl xl:text-8xl 2xl:text-9xl font-bold text-white tabular-nums leading-none rounded-xl">00</span>
                    <span class="text-gray-300 text-base md:text-lg xl:text-xl 2xl:text-2xl uppercase tracking-widest font-bold">Días</span>
                </div>
            </div>
            <div class="text-5xl 2xl:text-8xl font-black text-white/40 self-center -mt-2">:</div>

            <div class="relative flex flex-col items-center justify-center bg-black/40 backdrop-blur-md border border-white/15 p-5 rounded-4xl min-w-[100px] shadow-2xl hover:-translate-y-1 transition-transform duration-500 hover:border-white/30 group">
                <div class="absolute -inset-1 bg-white rounded-4xl blur opacity-0 group-hover:opacity-10 transition duration-700"></div>
                <span id="hours" class="text-lg md:text-xl xl:text-8xl 2xl:text-9xl font-bold text-white tabular-nums leading-none rounded-xl">00</span>
                <span class="text-gray-300 text-base md:text-lg xl:text-xl 2xl:text-2xl uppercase tracking-widest font-bold">Horas</span>
            </div>
            <div class="text-5xl 2xl:text-8xl font-black text-white/40 self-center -mt-2">:</div>

            <div class="relative flex flex-col items-center justify-center bg-black/40 backdrop-blur-md border border-white/15 p-5 rounded-4xl min-w-[100px] shadow-2xl hover:-translate-y-1 transition-transform duration-500 hover:border-white/30 group">
                <div class="absolute -inset-1 bg-white rounded-4xl blur opacity-0 group-hover:opacity-10 transition duration-700"></div>
                <span id="minutes" class="text-lg md:text-xl xl:text-8xl 2xl:text-9xl font-bold text-white">00</span>
                <span class="text-gray-300 text-base md:text-lg xl:text-xl 2xl:text-2xl uppercase tracking-widest font-bold">Minutos</span>
            </div>
            <div class="text-5xl 2xl:text-8xl font-black text-white/40 self-center -mt-2">:</div>

            <div class="relative flex flex-col items-center justify-center bg-black/40 backdrop-blur-md border border-white/15 p-5 rounded-4xl min-w-[100px] shadow-2xl hover:-translate-y-1 transition-transform duration-500 hover:border-white/30 group">
                <div class="absolute -inset-1 bg-white rounded-4xl blur opacity-0 group-hover:opacity-10 transition duration-700"></div>
                <span id="seconds" class="text-lg md:text-xl xl:text-8xl 2xl:text-9xl font-bold text-white">00</span>
                <span class="text-gray-300 text-base md:text-lg xl:text-xl 2xl:text-2xl uppercase tracking-widest font-bold">Segundos</span>
            </div>
        </div>

        <h1 class="text-base md:text-xl xl:text-5xl 2xl:text-7xl font-black text-white text-center font-bebas tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)]">
        PARA EL INICIO DEL MUNDIAL 2026
        </h1>
        <div class="flex flex-col items-center gap-1">
        <p class="text-base md:text-lg xl:text-xl 2xl:text-2xl text-white/70 text-center font-bebas tracking-wide uppercase bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)]">
        El evento más importante del mundo del fútbol está por comenzar.
        </p>
    </div>
</div>



        <!-- TARJETAS DE PARTIDOS -->

        <div class="flex items-center gap-4">
            <div class="w-30 h-px bg-gradient-to-r from-transparent to-lime-500"></div>
            <h2 class="text-white text-base md:text-xl xl:text-4xl 2xl:text-5xl font-bold uppercase tracking-widest font-bebas bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)]">
            Próximos Partidos
            </h2>
            <div class="w-30 h-px bg-gradient-to-l from-transparent to-sky-500"></div>
        </div>
        <div id="cards-container" class="flex justify-center items-center gap-6 w-full px-8 font-bebas tracking-wide"></div>
        
        

        <!-- DEGRADADO DE TRANSICIÓN -->
        <div class="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-b from-transparent to-[#0b1220] pointer-events-none z-20"></div>
    `

    // Fechas — declaradas UNA sola vez fuera de la función
    const startDate = new Date('2025-12-01T00:00:00Z')
    const worldCupDate = new Date('2026-06-11T20:00:00Z')

    function updateCountdown() {
        const now = new Date()
        const diff = worldCupDate - now

        // Cuenta regresiva
        const days    = Math.floor(diff / (1000 * 60 * 60 * 24))
        const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((diff % (1000 * 60)) / 1000)

        section.querySelector('#days').textContent    = String(days).padStart(2, '0')
        section.querySelector('#hours').textContent   = String(hours).padStart(2, '0')
        section.querySelector('#minutes').textContent = String(minutes).padStart(2, '0')
        section.querySelector('#seconds').textContent = String(seconds).padStart(2, '0')

        // Progreso — ahora sí tiene acceso a now
        const total   = worldCupDate - startDate
        const elapsed = now - startDate
        const percent = Math.min(Math.floor((elapsed / total) * 100), 100)

        section.querySelector('#progress-bar').style.width        = percent + '%'
        section.querySelector('#progress-percent').textContent    = percent + '%'
    }
    updateCountdown()
    setInterval(updateCountdown, 1000)


// Datos de partidos (¡Aquí agregamos el objeto "sede" para que no dé error!)
    const partidos = [
        {
            grupo: 'Grupo A', jornada: 'Jornada 1',
            equipo1: { codigo: 'mx', abrev: 'MEX' },
            equipo2: { codigo: 'za', abrev: 'RSA' },
            fecha: '11 JUN', hora: '14:00 PM',
            sede: { pais: 'México', ciudad: 'CDMX', estadio: 'Estadio Azteca', capacidad: '83,264' },
            clima: { condicion: '🌦️', descripcion: 'Lluvioso', temp: '25°C', humedad: '66%', viento: '11 km/h' }
        },
        {
            grupo: 'Grupo A', jornada: 'Jornada 1',
            equipo1: { codigo: 'kr', abrev: 'KOR' },
            equipo2: { codigo: 'cz', abrev: 'CZE' },
            fecha: '11 JUN', hora: '21:00 PM',
            sede: { pais: 'EE. UU.', ciudad: 'Inglewood', estadio: 'SoFi Stadium', capacidad: '70,240' },
            clima: { condicion: '☀️', descripcion: 'Soleado', temp: '25°C', humedad: '65%', viento: '13 km/h' }
        }
    //  {
    //      grupo: 'Grupo A', jornada: 'Jornada 1',
    //      equipo1: { codigo: 'mx', abrev: 'MEX' },
    //      equipo2: { codigo: 'za', abrev: 'RSA' },
    //      fecha: '11 JUN', hora: '14:00 PM',
    //      sede: { pais: 'EE. UU.', ciudad: 'Inglewood', estadio: 'SoFi Stadium', capacidad: '70,240' }
    //  } 
    ]

// Crear cada tarjeta y agregarla al contenedor
const container = section.querySelector('#cards-container')
    partidos.forEach(partido => {
        const card = document.createElement('div')
        card.className = 'relative cursor-pointer group flex-shrink-0'
        card.style.width = '280px'
        card.style.height = '220px' // Un poco de altura extra para que quepa todo sin verse apretado
        card.style.perspective = '1000px'

    card.innerHTML = /*html*/`
            <div class="relative w-full h-full transition-transform duration-700 group-hover:[transform:rotateY(180deg)] [transform-origin:center] will-change-transform"
                style="transform-style: preserve-3d">

                <div class="absolute inset-0 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl flex flex-col items-center justify-center w-full h-full"
                    style="backface-visibility: hidden; -webkit-backface-visibility: hidden; transform: translate3d(0, 0, 1px);">

                    <p class="text-green-400 text-base font-semibold text-center uppercase tracking-widest mb-4">
                        ${partido.grupo} · ${partido.jornada}
                    </p>
                    <div class="flex items-center justify-center gap-6 mb-4 w-full">
                        <div class="flex flex-col items-center gap-2">
                            <img src="https://flagcdn.com/w80/${partido.equipo1.codigo}.png" class="w-12 h-12 rounded-full object-cover" 
                            style="transform: translateZ(0); backface-visibility: hidden;">
                            <span class="text-white text-base tracking-wider">${partido.equipo1.abrev}</span>
                        </div>
                        <span class="text-white text-2xl font-bold">VS</span>
                        <div class="flex flex-col items-center gap-2">
                            <img src="https://flagcdn.com/w80/${partido.equipo2.codigo}.png" class="w-12 h-12 rounded-full object-cover" 
                            style="transform: translateZ(0); backface-visibility: hidden;">
                            <span class="text-white text-base tracking-wider">${partido.equipo2.abrev}</span>
                        </div>
                    </div>
                    <div class="flex items-center justify-center gap-4 text-white/60 text-sm mt-2">
                        <span>📅 ${partido.fecha}</span>
                        <span>·</span>
                        <span>🕐 ${partido.hora}</span>
                    </div>
                </div>

                <div class="absolute inset-0 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-[0_20px_50px_rgba(56,189,61,0.15)] flex flex-col items-center justify-center w-full h-full"
                    style="backface-visibility: hidden; -webkit-backface-visibility: hidden; transform: rotateY(180deg) translate3d(0, 0, 1px);">

                    <p class="text-white/90 tracking-widest text-sm font-semibold uppercase mb-1 text-center w-full">
                        ${partido.sede.pais} · ${partido.sede.ciudad}
                    </p>
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

    return section
}