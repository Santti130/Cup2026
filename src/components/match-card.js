// // Esta función crea UNA sola tarjeta
// function createMatchCard(partido) {
//     const card = document.createElement('div')
//     card.className = 'bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 w-72'
//     card.innerHTML = /*html*/`
    
//     <!-- Encabezado -->
//         <p class="text-green-400 text-xs font-semibold text-center uppercase tracking-widest mb-4">
//             ${partido.grupo} · ${partido.jornada}
//         </p>

//         <!-- Equipos -->
//         <div class="flex items-center justify-center gap-4 mb-4">
//             <div class="flex flex-col items-center gap-2">
//                 <img src="https://flagcdn.com/w80/${partido.equipo1.codigo}.png" class="w-12 h-12 rounded-full object-cover">
//                 <span class="text-white text-sm font-bold">${partido.equipo1.abrev}</span>
//             </div>
//             <span class="text-white text-xl font-bold">VS</span>
//             <div class="flex flex-col items-center gap-2">
//                 <img src="https://flagcdn.com/w80/${partido.equipo2.codigo}.png" class="w-12 h-12 rounded-full object-cover">
//                 <span class="text-white text-sm font-bold">${partido.equipo2.abrev}</span>
//             </div>
//         </div>

//         <!-- Separador -->
//         <div class="border-t border-white/10 my-3"></div>

//         <!-- Fecha y hora -->
//         <div class="flex items-center justify-center gap-4 text-white/60 text-sm">
//             <span>📅 ${partido.fecha}</span>
//             <span class="text-white/20">·</span>
//             <span>🕐 ${partido.hora}</span>
//         </div>

//     `
//     return card
// }

// // Esta función crea el contenedor y genera todas las tarjetas
// export function renderMatchCards() {
//     const section = document.createElement('section')
//     section.className = 'py-16 flex flex-wrap justify-center items-center gap-6 min-h-screen'

//     // Lista de partidos con datos falsos por ahora
//     const partidos = [
//         {
//             grupo: 'Grupo A',
//             jornada: 'Jornada 1',
//             equipo1: { nombre: 'México', codigo: 'mx', abrev: 'MEX' },
//             equipo2: { nombre: 'Sudáfrica', codigo: 'za', abrev: 'RSA' },
//             fecha: '11 JUN',
//             hora: '14:00 PM',
//             sede: { pais: 'MEX', ciudad: 'Ciudad de México', estadio: 'Estadio Azteca', capacidad: '87.000', anfitrion: 'mexico' }
//         },
//         {
//             grupo: 'Grupo B',
//             jornada: 'Jornada 1',
//             equipo1: { nombre: 'Estados Unidos', codigo: 'us', abrev: 'USA' },
//             equipo2: { nombre: 'Japón', codigo: 'jp', abrev: 'JPN' },
//             fecha: '12 JUN',
//             hora: '17:00 PM',
//             sede: { pais: 'USA', ciudad: 'Dallas', estadio: 'AT&T Stadium', capacidad: '80.000', anfitrion: 'usa' }
//         },
//         {
//             grupo: 'Grupo K',
//             jornada: 'Jornada 3',
//             equipo1: { nombre: 'Colombia', codigo: 'co', abrev: 'COL' },
//             equipo2: { nombre: 'Portugal', codigo: 'pt', abrev: 'POR' },
//             fecha: '26 JUN',
//             hora: '18:30 PM',
//             sede: { pais: 'USA', ciudad: 'Dallas', estadio: 'AT&T Stadium', capacidad: '80.000', anfitrion: 'usa' }
//         }
//     ]

//     // Por cada partido crea una tarjeta y la agrega al contenedor
//     partidos.forEach(partido => {
//         section.append(createMatchCard(partido))
//     })

//     return section
// }