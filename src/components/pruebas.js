export function renderCountdown() {
    const section = document.createElement('section');
    // MEJORA: Añadimos overflow-hidden para las animaciones de fondo y perspective para efectos 3D
    section.className = 'relative flex flex-col items-center justify-center gap-12 bg-[url(/src/assets/img/fondo-home-countdown.png)] bg-cover bg-center bg-no-repeat overflow-hidden perspective';
    section.style.minHeight = '100vh';
    section.style.marginTop = '0';

    section.innerHTML = /*html*/`



    <div class="relative flex flex-col items-center gap-6 z-10">
        <h1 class="text-6xl font-black text-white text-center font-bebas tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)]">Faltan</h1>
        
        <div class="flex gap-6 mt-2 font-bebas">
            <div class="relative group">
                <div class="absolute -inset-1 bg-gradient-to-r from-lime-400 to-sky-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                <div class="relative flex flex-col items-center justify-center bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-2xl min-w-[150px] shadow-2xl hover:-translate-y-2 transition-transform duration-300 hover:border-lime-500/50">
                    <span id="days" class="text-9xl font-black text-white tabular-nums tracking-tight leading-none drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">00</span>
                    <span class="text-lime-300 text-sm uppercase tracking-[0.3em] mt-3 font-jakarta font-bold">Días</span>
                </div>
            </div>
            <div class="text-9xl font-black text-white/20 self-center -mt-6">:</div>
            
            <div class="relative flex flex-col items-center justify-center bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-2xl min-w-[150px] shadow-2xl hover:-translate-y-2 transition-transform duration-300 hover:border-sky-500/50 group">
                <div class="absolute -inset-1 bg-sky-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
                <span id="hours" class="text-9xl font-black text-white tabular-nums tracking-tight leading-none drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">00</span>
                <span class="text-sky-300 text-sm uppercase tracking-[0.3em] mt-3 font-jakarta font-bold">Horas</span>
            </div>
             <div class="text-9xl font-black text-white/20 self-center -mt-6">:</div>
            <div class="relative flex flex-col items-center justify-center bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-2xl min-w-[150px] shadow-2xl hover:-translate-y-2 transition-transform duration-300 hover:border-emerald-500/50 group">
                <div class="absolute -inset-1 bg-emerald-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
                <span id="minutes" class="text-9xl font-black text-white tabular-nums tracking-tight leading-none">00</span>
                <span class="text-emerald-300 text-sm uppercase tracking-[0.3em] mt-3 font-jakarta font-bold">Minutos</span>
            </div>
            <div class="text-9xl font-black text-white/20 self-center -mt-6">:</div>
            <div class="relative flex flex-col items-center justify-center bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-2xl min-w-[150px] shadow-2xl hover:-translate-y-2 transition-transform duration-300 hover:border-amber-500/50 group">
                <div class="absolute -inset-1 bg-amber-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
                <span id="seconds" class="text-9xl font-black text-amber-300 tabular-nums tracking-tight leading-none animate-pulse-subtle">00</span>
                <span class="text-amber-100 text-sm uppercase tracking-[0.3em] mt-3 font-jakarta font-bold">Segundos</span>
            </div>
        </div>
        
        <div class="flex flex-col items-center gap-1 mt-4">
            <h1 class="text-5xl font-black text-white text-center font-bebas tracking-wider uppercase drop-shadow-md">PARA EL INICIO DEL MUNDIAL 2026</h1>
            <p class="text-white/70 text-center text-xl font-jakarta font-light tracking-wide max-w-2xl">La energía del continente está subiendo. El encuentro de fútbol más importante de la historia está por comenzar.</p>
        </div>
    </div>

    <div class="absolute bottom-[35%] left-0 w-full overflow-hidden rotate-180 opacity-20 z-0">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" class="relative block w-[200%] h-20 fill-white">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
    </div>

    <div class="relative w-full z-10 mt-10 flex flex-col items-center gap-6">
        <div class="flex items-center gap-4">
            <div class="w-16 h-px bg-gradient-to-r from-transparent to-lime-500"></div>
            <h2 class="text-white text-3xl font-black uppercase tracking-[0.2em] font-bebas bg-clip-text text-transparent bg-gradient-to-r from-lime-300 to-sky-300">Próximos Choques</h2>
            <div class="w-16 h-px bg-gradient-to-l from-transparent to-sky-500"></div>
        </div>
        <div id="cards-container" class="flex justify-center items-center gap-6 w-full px-8 pb-10 font-jakarta font-bold perspective"></div>
    </div>
    `;

    // --- Lógica del Contador (Tu lógica original optimizada) ---
    const startDate = new Date('2025-12-01T00:00:00Z');
    const worldCupDate = new Date('2026-06-11T20:00:00Z');

    const daysEl = section.querySelector('#days');
    const hoursEl = section.querySelector('#hours');
    const minutesEl = section.querySelector('#minutes');
    const secondsEl = section.querySelector('#seconds');
    const progressBarEl = section.querySelector('#progress-bar');
    const progressPercentEl = section.querySelector('#progress-percent');

    function updateCountdown() {
        const now = new Date();
        const diff = worldCupDate - now;

        if (diff <= 0) {
            // Manejar fin de la cuenta regresiva si es necesario
            return;
        }

        const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        daysEl.textContent    = String(days).padStart(2, '0');
        hoursEl.textContent   = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        
        // EFECTO INNOVADOR: Pequeña animación de "latido" en el texto de segundos
        if (secondsEl.textContent !== String(seconds).padStart(2, '0')) {
            secondsEl.classList.remove('animate-tick');
            void secondsEl.offsetWidth; // Trigger reflow para reiniciar animación
            secondsEl.classList.add('animate-tick');
        }
        secondsEl.textContent = String(seconds).padStart(2, '0');

        const total   = worldCupDate - startDate;
        const elapsed = now - startDate;
        const percent = Math.min(Math.floor((elapsed / total) * 100), 100);

        progressBarEl.style.width = percent + '%';
        progressPercentEl.textContent = percent + '%';
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    // --- Datos de partidos ---
    const partidos = [
        {
            grupo: 'Grupo A', jornada: 'Jornada 1', estadio: 'Estadio Azteca, CDMX',
            equipo1: { codigo: 'mx', abrev: 'MEX', nombre: 'México' },
            equipo2: { codigo: 'za', abrev: 'RSA', nombre: 'Sudáfrica' },
            fecha: '11 JUN', hora: '14:00 PM'
        },
        {
            grupo: 'Grupo A', jornada: 'Jornada 1', estadio: 'SoFi Stadium, Inglewood',
            equipo1: { codigo: 'kr', abrev: 'KOR', nombre: 'Corea del Sur' },
            equipo2: { codigo: 'cz', abrev: 'CZE', nombre: 'Rep. Checa' },
            fecha: '11 JUN', hora: '21:00 PM'
        }
    ];

    // Crear cada tarjeta (Estilo Premium Mejorado)
    const container = section.querySelector('#cards-container');
    partidos.forEach(partido => {
        const card = document.createElement('div');
        // MEJORA: Clases para efecto 3D hover y diseño Glassmorphism pulido
        card.className = 'group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 w-80 flex-shrink-0 shadow-xl transition-all duration-500 ease-out hover:border-lime-400/50 hover:shadow-[0_20px_50px_rgba(56,189,61,0.15)] hover:scale-105 hover:-rotate-y-2 hover:rotate-x-2';
        
        card.innerHTML = /*html*/`
            <div class="absolute inset-0 rounded-3xl bg-gradient-to-br from-lime-500/10 to-sky-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div class="relative z-10">
                <div class="flex justify-between items-center mb-5">
                    <span class="bg-black/40 text-lime-300 text-xs font-bold px-3 py-1 rounded-full border border-lime-900/50 uppercase tracking-wider inner-shadow">
                        ${partido.grupo}
                    </span>
                    <span class="text-white/50 text-xs font-normal">
                        ${partido.jornada}
                    </span>
                </div>

                <div class="flex items-center justify-center gap-2 mb-6 h-20">
                    <div class="flex flex-col items-center gap-2 flex-1 group-hover:translate-x-[-5px] transition-transform duration-300">
                        <div class="relative h-16 w-16 p-1 rounded-full bg-gradient-to-b from-white/10 to-transparent border border-white/10 shadow-lg overflow-hidden">
                            <img src="https://flagcdn.com/w160/${partido.equipo1.codigo}.png" alt="${partido.equipo1.nombre}" class="w-full h-full rounded-full object-cover group-hover:scale-110 transition-transform duration-500">
                        </div>
                        <span class="text-white text-base font-black tracking-tight">${partido.equipo1.abrev}</span>
                    </div>

                    <div class="relative flex items-center justify-center">
                        <div class="absolute w-12 h-12 bg-lime-500/20 rounded-full blur-md animate-pulse"></div>
                        <span class="relative text-sky-300 text-2xl font-black italic drop-shadow-[0_0_10px_rgba(56,189,148,0.5)]">VS</span>
                    </div>

                    <div class="flex flex-col items-center gap-2 flex-1 group-hover:translate-x-[5px] transition-transform duration-300">
                         <div class="relative h-16 w-16 p-1 rounded-full bg-gradient-to-b from-white/10 to-transparent border border-white/10 shadow-lg overflow-hidden">
                            <img src="https://flagcdn.com/w160/${partido.equipo2.codigo}.png" alt="${partido.equipo2.nombre}" class="w-full h-full rounded-full object-cover group-hover:scale-110 transition-transform duration-500">
                        </div>
                        <span class="text-white text-base font-black tracking-tight">${partido.equipo2.abrev}</span>
                    </div>
                </div>

                <div class="flex flex-col items-center gap-1 text-center bg-black/30 p-3 rounded-xl border border-white/5 mb-4 inner-shadow">
                    <p class="text-white/90 text-sm font-medium">📅 ${partido.fecha}</p>
                    <p class="text-lime-300 text-lg font-black tracking-wide">🕐 ${partido.hora}</p>
                </div>
                
                <p class="text-white/50 text-xs font-light text-center truncate italic">
                     📍 ${partido.estadio}
                </p>
            </div>
        `;
        container.append(card);
    });

    return section;
}