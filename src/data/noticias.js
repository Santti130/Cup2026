export const noticias = [
    /* NOTICIA NÚMERO 1 */
    {
        id: 1,
        slug: 'colombia-vence-uzbekistan-debut-mundial-2026',
        categoria: 'Resultados',
        titulo: '¡GRAN REGRESO MUNDIALISTA PARA COLOMBIA! TRIUNFO 3-1 SOBRE UZBEKISTÁN',
        resumen: 'La Tricolor venció 3-1 a Uzbekistán en el Estadio Azteca con goles de Muñoz, Luis Díaz y Campaz. Colombia vuelve a ganar en un Mundial tras 8 años de ausencia. Lucho Díaz, figura del partido.',
        imagen: '/news-img/Colombia-Uzbekistan.webp',
        fecha: '17 Junio 2026',
        contenido: (() => {
            return `
                <p class="mb-6 font-playfair text-xl leading-loose text-zinc-300 first-letter:float-left first-letter:text-6xl first-letter:pr-3 first-letter:font-playfair first-letter:font-black first-letter:text-black-100 first-letter:leading-[0.8] mt-2">
                    La selección de Colombia resolvió su debut en el Mundial 2026 con una victoria 3-1 sobre Uzbekistán en el Estadio Azteca. La Tricolor fue mejor de inicio a fin y se fue al frente en el primer tiempo con un gol de Daniel Muñoz al minuto 40, pero luego vino el sorpresivo empate uzbeko al minuto 60, de la mano de Abbosbek Fayzullaev.</p>

                <p class="mb-10 font-playfair text-xl leading-loose text-zinc-300">
                    Luis Díaz rápidamente remontó el marcador cinco minutos después. Y el triunfo fue coronado por Jáminton Campaz en el agregado, al minuto 97. Un gran regreso de Colombia a la Copa del Mundo luego de 8 años de ausencia.</p>

                <div class="p-6 my-10 bg-white/5 border border-white/10 rounded-2xl">
                    <h4 class="font-teko text-2xl text-zinc-100 tracking-widest uppercase mb-6 text-center">Resultado Final</h4>
                    <div class="grid grid-cols-2 gap-2 text-center items-center py-2 border-b border-white/5">
                        <span class="text-zinc-100 font-medium text-left">Colombia</span>
                        <span class="text-emerald-400 font-teko text-2xl font-bold">3</span>
                    </div>
                    <div class="grid grid-cols-2 gap-2 text-center items-center py-2">
                        <span class="text-zinc-100 font-medium text-left">Uzbekistán</span>
                        <span class="text-zinc-300 font-teko text-2xl">1</span>
                    </div>
                </div>

                <div class="p-6 my-10 bg-white/5 border border-white/10 rounded-2xl">
                    <h4 class="font-teko text-2xl text-zinc-100 tracking-widest uppercase mb-4">Goles del Partido</h4>
                    <div class="flex flex-col gap-2">
                        ${[
                            ['COL', 'Daniel Muñoz', "40'"],
                            ['UZB', 'Abbosbek Fayzullaev', "60'"],
                            ['COL', 'Luis Díaz', "65'"],
                            ['COL', 'Jáminton Campaz', "90+7'"],
                        ].map(([eq, jugador, min]) => `
                            <div class="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                                <span class="text-emerald-400 font-sans text-xs font-bold tracking-widest w-12 shrink-0">${eq}</span>
                                <span class="text-zinc-300 font-sans text-sm font-medium flex-1">${jugador}</span>
                                <span class="text-zinc-100 font-teko text-lg tabular-nums">${min}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <h3 class="font-teko text-3xl md:text-4xl text-white mb-6 tracking-wide mt-12">CÓMO SE VIVIÓ EL PARTIDO</h3>

                <p class="mb-10 font-playfair text-xl leading-loose text-zinc-300">
                    Colombia dominó el trámite desde el inicio en un Estadio Azteca que se sintió como local. La Tricolor tuvo la posesión y las ideas, y encontró el premio al minuto 40 con un gol de Daniel Muñoz que puso el 1-0 antes del descanso.</p>

                <p class="mb-10 font-playfair text-xl leading-loose text-zinc-300">
                    El segundo tiempo trajo un susto: Uzbekistán igualó el marcador al minuto 60 con un tanto de Abbosbek Fayzullaev que puso nervioso al equipo de Néstor Lorenzo. Pero la reacción colombiana fue inmediata. Solo cinco minutos después, Luis Díaz — el motor ofensivo de esta selección — volvió a poner adelante a Colombia con una jugada que desató la euforia en las gradas.</p>

                <p class="mb-10 font-playfair text-xl leading-loose text-zinc-300">
                    Ya en el tiempo agregado, Jáminton Campaz selló el triunfo con un cabezazo al minuto 97 que cerró una noche perfecta para la Tricolor.</p>

                <div class="my-10 p-8 rounded-2xl bg-gradient-to-br from-yellow-500/10 via-transparent to-blue-500/10 border border-white/10">
                    <h4 class="font-teko text-2xl text-zinc-100 tracking-widest uppercase mb-6 text-center">Figura del Partido</h4>
                    <div class="grid grid-cols-3 gap-4 text-center">
                        <div>
                            <span class="block font-teko text-4xl text-emerald-400 leading-none">1</span>
                            <span class="text-zinc-500 text-xs uppercase tracking-widest font-sans mt-2 block">Gol</span>
                        </div>
                        <div>
                            <span class="block font-teko text-4xl text-emerald-400 leading-none">1</span>
                            <span class="text-zinc-500 text-xs uppercase tracking-widest font-sans mt-2 block">Asistencia</span>
                        </div>
                        <div>
                            <span class="block font-teko text-4xl text-emerald-400 leading-none">MVP</span>
                            <span class="text-zinc-500 text-xs uppercase tracking-widest font-sans mt-2 block">Luis Díaz</span>
                        </div>
                    </div>
                </div>

                <h3 class="font-teko text-3xl md:text-4xl text-white mb-6 tracking-wide mt-12">LAS VOCES DEL TRIUNFO</h3>

                <p class="mb-8 font-playfair text-xl leading-loose text-zinc-300">
                    Lucho Díaz se llevó el trofeo al mejor jugador del partido. El goleador de 29 años se fue con un gol, una asistencia y la ovación de un Estadio Azteca rendido al motor de esta selección colombiana.</p>

                <div class="my-10 flex flex-col gap-4">
                    <blockquote class="relative p-8 bg-gradient-to-br from-emerald-900/20 to-transparent border-l-4 border-emerald-500 rounded-r-2xl">
                        <svg class="absolute top-4 left-4 w-8 h-8 text-emerald-500/20" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true"><path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"></path></svg>
                        <p class="relative z-10 text-xl md:text-2xl font-light text-zinc-100 italic leading-relaxed pl-6">
                            "Hermoso debut con un gol. En mi carrera llevo apenas tres goles de cabeza, gracias a Dios que hoy se dio otra vez."
                        </p>
                        <footer class="mt-4 pl-6 text-sm text-emerald-400 font-semibold tracking-widest uppercase">— Jáminton Campaz</footer>
                    </blockquote>

                    <blockquote class="relative p-8 bg-gradient-to-br from-emerald-900/20 to-transparent border-l-4 border-emerald-500 rounded-r-2xl">
                        <svg class="absolute top-4 left-4 w-8 h-8 text-emerald-500/20" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true"><path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"></path></svg>
                        <p class="relative z-10 text-xl md:text-2xl font-light text-zinc-100 italic leading-relaxed pl-6">
                            "Estamos para cosas grandes, para luchar, con el apoyo de la gente."
                        </p>
                        <footer class="mt-4 pl-6 text-sm text-emerald-400 font-semibold tracking-widest uppercase">— Jáminton Campaz</footer>
                    </blockquote>
                </div>

                <p class="mt-12 text-xl leading-loose text-zinc-300 p-8 border border-zinc-800 bg-zinc-900/20 rounded-2xl text-center italic font-playfair">
                    Colombia vuelve a ganar en un Mundial después de 8 años. Con Luis Díaz encendido y una generación que ilusiona, la Tricolor arranca su camino en el Grupo K con paso firme. El próximo reto: Portugal.</p>
            `
        })()
    },
    /* NOTICIA NÚMERO 2 */
    {
        id: 2,
        slug: 'portugal-congo-empate-debut-mundial-2026',
        categoria: 'Resultados',
        titulo: 'RD CONGO HACE HISTORIA Y LE SACA UN PUNTO A PORTUGAL EN SU REGRESO AL MUNDIAL',
        resumen: 'Los Leopardos lograron su primer gol y su primer punto en una Copa del Mundo. Wissa empató el partido en el descuento del primer tiempo y Cristiano Ronaldo no pudo marcar en su sexto Mundial.',
        imagen: '/news-img/Portugal-RDCongo.webp',
        fecha: '17 Junio 2026',
        contenido: (() => {
            return `
                <p class="mb-6 font-playfair text-xl leading-loose text-zinc-300 first-letter:float-left first-letter:text-6xl first-letter:pr-3 first-letter:font-playfair first-letter:font-black first-letter:text-black first-letter:leading-[0.8] mt-2">
                    Las sorpresas no paran en este Mundial 2026. Portugal, señalada como una de las firmes candidatas al título, no pasó del empate 1-1 ante la República Democrática del Congo en Houston, en lo que supuso el debut de ambas selecciones en el Grupo K. Para los africanos, el punto tiene un valor histórico incalculable: es el primer gol y el primer punto de la nación en una Copa del Mundo, 52 años después de su única participación bajo el nombre de Zaire en Alemania 1974.</p>

                <p class="mb-10 font-playfair text-xl leading-loose text-zinc-300">
                    El guion del partido parecía escrito a favor de los lusos. João Neves adelantó a Portugal apenas al minuto 6 con un cabezazo que anticipaba una goleada. Sin embargo, esos no eran los planes de Los Leopardos. La selección africana, con un bloque físico resistente y transiciones rápidas orquestadas por el técnico Sébastien Desabre, aguantó la presión y esperó su momento.</p>

                <div class="p-6 my-10 bg-white/5 border border-white/10 rounded-2xl">
                    <h4 class="font-teko text-2xl text-zinc-100 tracking-widest uppercase mb-6 text-center">Resultado Final</h4>
                    <div class="grid grid-cols-2 gap-2 text-center items-center py-2 border-b border-white/5">
                        <span class="text-zinc-100 font-medium text-left">Portugal</span>
                        <span class="text-zinc-300 font-teko text-2xl">1</span>
                    </div>
                    <div class="grid grid-cols-2 gap-2 text-center items-center py-2">
                        <span class="text-zinc-100 font-medium text-left">RD Congo</span>
                        <span class="text-zinc-300 font-teko text-2xl">1</span>
                    </div>
                </div>

                <div class="p-6 my-10 bg-white/5 border border-white/10 rounded-2xl">
                    <h4 class="font-teko text-2xl text-zinc-100 tracking-widest uppercase mb-4">Goles del Partido</h4>
                    <div class="flex flex-col gap-2">
                        ${[
                            ['POR', 'João Neves', "6'"],
                            ['COD', 'Yoane Wissa', "45+5'"],
                        ].map(([eq, jugador, min]) => `
                            <div class="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                                <span class="text-emerald-400 font-sans text-xs font-bold tracking-widest w-12 shrink-0">${eq}</span>
                                <span class="text-zinc-300 font-sans text-sm font-medium flex-1">${jugador}</span>
                                <span class="text-zinc-100 font-teko text-lg tabular-nums">${min}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <h3 class="font-teko text-3xl md:text-4xl text-white mb-6 tracking-wide mt-12">CÓMO SE VIVIÓ EL PARTIDO</h3>

                <p class="mb-10 font-playfair text-xl leading-loose text-zinc-300">
                    El arranque fue todo de Portugal. Con el 68% de posesión y un dominio territorial claro, la selección de Roberto Martínez parecía tener el control absoluto. Pero tras el gol tempranero, los lusos bajaron la intensidad y empezaron a encontrarse con un muro congoleño bien plantado en defensa.</p>

                <p class="mb-10 font-playfair text-xl leading-loose text-zinc-300">
                    Los Leopardos no se limitaron a defender. Cedric Bakambu estrelló un balón en el palo y generó peligro en las transiciones. Y justo cuando parecía que Portugal se iría al descanso con la ventaja mínima, llegó el momento que cambiará la historia del fútbol congoleño para siempre: al minuto 45+5, Yoane Wissa, delantero del Newcastle, conectó un cabezazo imparable al fondo de la red. Primer gol de RD Congo en un Mundial. Primer punto. Delirio en las gradas de Houston.</p>

                <blockquote class="relative p-8 my-10 bg-gradient-to-br from-emerald-900/20 to-transparent border-l-4 border-emerald-500 rounded-r-2xl">
                    <svg class="absolute top-4 left-4 w-8 h-8 text-emerald-500/20" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true"><path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"></path></svg>
                    <p class="relative z-10 text-xl md:text-2xl font-light text-zinc-100 italic leading-relaxed pl-6">
                        En 1974, como Zaire, se fueron del Mundial con tres derrotas y cero goles. 52 años después, bajo el nombre de República Democrática del Congo, lograron lo que parecía imposible: su primer gol y su primer punto en una Copa del Mundo.
                    </p>
                    <footer class="mt-4 pl-6 text-sm text-emerald-400 font-semibold tracking-widest uppercase">— Una hazaña histórica</footer>
                </blockquote>

                <p class="mb-10 font-playfair text-xl leading-loose text-zinc-300">
                    La segunda parte no mejoró para Portugal. Cristiano Ronaldo, en su sexto Mundial a los 41 años — convirtiéndose en el jugador de campo más veterano en disputar un partido mundialista —, perdonó en al menos dos ocasiones claras. Francisco Conceição, ingresado al entretiempo, y Bruno Fernandes, con un disparo que rozó el poste, fueron los únicos que generaron algo de peligro real. Pero la defensa congoleña, liderada por Mbemba y Tuanzebe, resistió todo.</p>

                <div class="my-10 grid grid-cols-2 gap-4 text-center">
                    <div class="bg-white/5 border border-white/10 rounded-2xl p-5">
                        <span class="block font-teko text-5xl text-zinc-100 leading-none">68%</span>
                        <span class="text-zinc-500 text-xs uppercase tracking-widest font-sans mt-2 block">Posesión Portugal</span>
                    </div>
                    <div class="bg-white/5 border border-white/10 rounded-2xl p-5">
                        <span class="block font-teko text-5xl text-zinc-100 leading-none">7 vs 8</span>
                        <span class="text-zinc-500 text-xs uppercase tracking-widest font-sans mt-2 block">Remates totales</span>
                    </div>
                </div>

                <p class="mb-10 font-playfair text-xl leading-loose text-zinc-300">
                    Con este resultado, el Grupo K queda completamente abierto. Colombia lidera con 3 puntos tras vencer a Uzbekistán, mientras que Portugal y RD Congo comparten la segunda posición con 1 punto cada uno. La próxima fecha promete emociones fuertes: Portugal se medirá con Uzbekistán el 23 de junio, mientras que RD Congo enfrentará a Colombia el mismo día.</p>

                <div class="p-6 my-10 bg-white/5 border border-white/10 rounded-2xl">
                    <h4 class="font-teko text-2xl text-zinc-100 tracking-widest uppercase mb-4">Así quedó el Grupo K tras la jornada 1</h4>
                    <div class="flex flex-col gap-2">
                        ${[
                            ['Colombia', '3'],
                            ['Portugal', '1'],
                            ['RD Congo', '1'],
                            ['Uzbekistán', '0'],
                        ].map(([equipo, pts]) => `
                            <div class="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                                <span class="text-zinc-300 font-sans text-sm font-medium">${equipo}</span>
                                <span class="text-zinc-100 font-teko text-xl tracking-wider">${pts} pts</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <p class="mt-12 text-xl leading-loose text-zinc-300 p-8 border border-zinc-800 bg-zinc-900/20 rounded-2xl text-center italic font-playfair">
                    Yoane Wissa, del Newcastle, se llevó el trofeo al mejor jugador del partido. Su gol no solo le dio el empate a RD Congo: le dio un lugar en la historia del fútbol africano. El sueño de Los Leopardos en el Mundial 2026 apenas comienza.</p>
            `
        })()
    },
    /* NOTICIA NÚMERO 3 */
    {
        id: 3,
        slug: 'messi-triplete-argentina-argelia-mundial-2026',
        categoria: 'Resultados',
        titulo: '¡TRIPLETE DE UN YA HISTÓRICO MESSI! ARGENTINA GANA 3-0 CONTRA ARGELIA',
        resumen: 'La Albiceleste debutó con una goleada sobre Argelia en Kansas City. Lionel Messi marcó su primer hat trick en un Mundial e igualó el récord histórico de Klose con 16 goles en Copas del Mundo.',
        imagen: '/news-img/Argentina-Algeria.webp',
        fecha: '16 Junio 2026',
        contenido: (() => {
            return `
                <p class="mb-6 font-playfair text-xl leading-loose text-zinc-300 first-letter:float-left first-letter:text-6xl first-letter:pr-3 first-letter:font-playfair first-letter:font-black first-letter:text-zinc-100 first-letter:leading-[0.8] mt-2">
                    La selección argentina ganó en su debut con tres goles de Lionel Messi, quien hizo historia al participar en su sexta Copa del Mundo y que ahora figura primero como máximo anotador histórico de los torneos FIFA, junto a Miroslav Klose. La Albiceleste debutó con una goleada 3-0 sobre Argelia en Kansas City.</p>

                <p class="mb-10 font-playfair text-xl leading-loose text-zinc-300">
                    Lionel Messi marcó su primer hat trick en este, su sexto Mundial, e igualó el récord de máximo anotador en Copas del Mundo con 16 tantos. Además, llegó a los 200 partidos y 120 goles con la selección argentina desde su debut, en 2005. Una noche soñada para el 10.</p>

                <div class="p-6 my-10 bg-white/5 border border-white/10 rounded-2xl">
                    <h4 class="font-teko text-2xl text-zinc-100 tracking-widest uppercase mb-6 text-center">Resultado Final</h4>
                    <div class="grid grid-cols-2 gap-2 text-center items-center py-2 border-b border-white/5">
                        <span class="text-zinc-100 font-medium text-left">Argentina</span>
                        <span class="text-emerald-400 font-teko text-2xl font-bold">3</span>
                    </div>
                    <div class="grid grid-cols-2 gap-2 text-center items-center py-2">
                        <span class="text-zinc-100 font-medium text-left">Argelia</span>
                        <span class="text-zinc-300 font-teko text-2xl">0</span>
                    </div>
                </div>

                <div class="p-6 my-10 bg-white/5 border border-white/10 rounded-2xl">
                    <h4 class="font-teko text-2xl text-zinc-100 tracking-widest uppercase mb-4">Goles del Partido</h4>
                    <div class="flex flex-col gap-2">
                        ${[
                            ['ARG', 'Lionel Messi', "Hat trick"],
                        ].map(([eq, jugador, det]) => `
                            <div class="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                                <span class="text-emerald-400 font-sans text-xs font-bold tracking-widest w-12 shrink-0">${eq}</span>
                                <span class="text-zinc-300 font-sans text-sm font-medium flex-1">${jugador}</span>
                                <span class="text-zinc-100 font-teko text-lg">${det}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <h3 class="font-teko text-3xl md:text-4xl text-white mb-6 tracking-wide mt-12">MESSI, RÉCORD HISTÓRICO</h3>

                <p class="mb-10 font-playfair text-xl leading-loose text-zinc-300">
                    Con este triplete, Messi se convirtió en el máximo anotador de la historia de los Mundiales junto a Miroslav Klose, ambos con 16 goles. El astro argentino llega a este Mundial 2026 disputando su sexta Copa del Mundo, una marca que pocos jugadores en la historia han alcanzado, y lo hace en plena forma goleadora.</p>

                <div class="my-10 p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 via-transparent to-emerald-500/10 border border-white/10">
                    <h4 class="font-teko text-2xl text-zinc-100 tracking-widest uppercase mb-6 text-center">Messi en números</h4>
                    <div class="grid grid-cols-3 gap-4 text-center">
                        <div>
                            <span class="block font-teko text-4xl text-emerald-400 leading-none">16</span>
                            <span class="text-zinc-500 text-xs uppercase tracking-widest font-sans mt-2 block">Goles en Mundiales</span>
                        </div>
                        <div>
                            <span class="block font-teko text-4xl text-emerald-400 leading-none">200</span>
                            <span class="text-zinc-500 text-xs uppercase tracking-widest font-sans mt-2 block">Partidos con Argentina</span>
                        </div>
                        <div>
                            <span class="block font-teko text-4xl text-emerald-400 leading-none">120</span>
                            <span class="text-zinc-500 text-xs uppercase tracking-widest font-sans mt-2 block">Goles con Argentina</span>
                        </div>
                    </div>
                </div>

                <h3 class="font-teko text-3xl md:text-4xl text-white mb-6 tracking-wide mt-12">LAS PALABRAS DE MESSI</h3>

                <p class="mb-8 font-playfair text-xl leading-loose text-zinc-300">
                    Tras finalizado el partido, Messi declaró estar feliz por el triunfo. Habló del equipo argentino, de lo "unido" y "fuerte" que está, reconociendo que "nunca es fácil" el debut en un Mundial, aunque aún así lograron la victoria contra Argelia.</p>

                <div class="my-10 flex flex-col gap-4">
                    <blockquote class="relative p-8 bg-gradient-to-br from-emerald-900/20 to-transparent border-l-4 border-emerald-500 rounded-r-2xl">
                        <svg class="absolute top-4 left-4 w-8 h-8 text-emerald-500/20" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true"><path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"></path></svg>
                        <p class="relative z-10 text-xl md:text-2xl font-light text-zinc-100 italic leading-relaxed pl-6">
                            "Es muy lindo haber empezado de esta manera."
                        </p>
                        <footer class="mt-4 pl-6 text-sm text-emerald-400 font-semibold tracking-widest uppercase">— Lionel Messi</footer>
                    </blockquote>

                    <blockquote class="relative p-8 bg-gradient-to-br from-emerald-900/20 to-transparent border-l-4 border-emerald-500 rounded-r-2xl">
                        <svg class="absolute top-4 left-4 w-8 h-8 text-emerald-500/20" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true"><path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"></path></svg>
                        <p class="relative z-10 text-xl md:text-2xl font-light text-zinc-100 italic leading-relaxed pl-6">
                            "Estoy agradecido a la gente porque una vez más demuestra que Argentina es una locura. Volvimos a llenar el estadio. Siempre están, sea donde sea, incluso haciendo un esfuerzo muy grande."
                        </p>
                        <footer class="mt-4 pl-6 text-sm text-emerald-400 font-semibold tracking-widest uppercase">— Lionel Messi, sobre la afición</footer>
                    </blockquote>
                </div>

                <p class="mt-12 text-xl leading-loose text-zinc-300 p-8 border border-zinc-800 bg-zinc-900/20 rounded-2xl text-center italic font-playfair">
                    Una noche soñada para el 10. Argentina arranca su defensa del título con paso firme, y Messi reafirma que, a sus 38 años, sigue escribiendo historia en cada Mundial que disputa.</p>
            `
        })()
    },
    /* NOTICIA NÚMERO 4 */
    {
        id: 4,
        slug: 'noruega-haaland-doblete-irak-mundial-2026',
        categoria: 'Resultados',
        titulo: 'HAALAND SE ESTRENA CON DOBLETE EN EL MUNDIAL EN LA VICTORIA DE NORUEGA FRENTE A IRAK',
        resumen: 'Un doblete de Erling Haaland en su debut absoluto en una Copa del Mundo impulsó a Noruega a imponerse 4-1 ante Irak en Boston, en el regreso de la selección nórdica a un Mundial 28 años después.',
        imagen: '/news-img/Noruega-Irak.webp',
        fecha: '16 Junio 2026',
        contenido: (() => {
            return `
                <p class="mb-6 font-playfair text-xl leading-loose text-zinc-300 first-letter:float-left first-letter:text-6xl first-letter:pr-3 first-letter:font-playfair first-letter:font-black first-letter:text-zinc-100 first-letter:leading-[0.8] mt-2">
                    Un doblete de Erling Haaland en su debut absoluto en una Copa del Mundo impulsó este lunes a una Noruega muy en forma a imponerse por 4-1 a una combativa Irak en Boston (Estados Unidos), en el regreso de la selección nórdica a un Mundial 28 años después, desde Francia 1998.</p>

                <p class="mb-10 font-playfair text-xl leading-loose text-zinc-300">
                    Los tres puntos ponen a Noruega a la par de Francia al frente del Grupo I del Mundial, el considerado como "grupo de la muerte". Franceses y noruegos se medirán, también en Boston, en la tercera jornada, en uno de los partidos más atractivos de la primera fase.</p>

                <p class="mb-10 font-playfair text-xl leading-loose text-zinc-300">
                    Irak, que fue el último de los 48 clasificados para este Mundial, sorprendió de inicio a los noruegos, con ocasiones y corriendo mucho, en una combinación de fútbol y físico que ha rodeado de aura a esta selección en su camino a Norteamérica. Boston fue una fiesta vikinga, con las gradas del estadio de los New England Patriots repletas de aficionados noruegos que imitaban el gesto de remar en un ambiente intimidante para el rival.</p>

                <div class="p-6 my-10 bg-white/5 border border-white/10 rounded-2xl">
                    <h4 class="font-teko text-2xl text-zinc-100 tracking-widest uppercase mb-6 text-center">Resultado Final</h4>
                    <div class="grid grid-cols-2 gap-2 text-center items-center py-2 border-b border-white/5">
                        <span class="text-zinc-100 font-medium text-left">Irak</span>
                        <span class="text-zinc-300 font-teko text-2xl">1</span>
                    </div>
                    <div class="grid grid-cols-2 gap-2 text-center items-center py-2">
                        <span class="text-zinc-100 font-medium text-left">Noruega</span>
                        <span class="text-emerald-400 font-teko text-2xl font-bold">4</span>
                    </div>
                </div>

                <div class="p-6 my-10 bg-white/5 border border-white/10 rounded-2xl">
                    <h4 class="font-teko text-2xl text-zinc-100 tracking-widest uppercase mb-4">Goles del Partido</h4>
                    <div class="flex flex-col gap-2">
                        ${[
                            ['NOR', 'Erling Haaland', "29'"],
                            ['IRQ', 'Aymen Hussein', "39'"],
                            ['NOR', 'Erling Haaland', "43'"],
                            ['NOR', 'Leo Ostigard', "76'"],
                            ['NOR', 'Kristian Thorstvedt', "90+6'"],
                        ].map(([eq, jugador, min]) => `
                            <div class="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                                <span class="text-emerald-400 font-sans text-xs font-bold tracking-widest w-12 shrink-0">${eq}</span>
                                <span class="text-zinc-300 font-sans text-sm font-medium flex-1">${jugador}</span>
                                <span class="text-zinc-100 font-teko text-lg tabular-nums">${min}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <h3 class="font-teko text-3xl md:text-4xl text-white mb-6 tracking-wide mt-12">CÓMO SE VIVIÓ EL PARTIDO</h3>

                <p class="mb-10 font-playfair text-xl leading-loose text-zinc-300">
                    Una nueva estrella mundial se presentó en el Mundial 2026: Erling Haaland, gran referencia de Noruega. El estreno para el seleccionado europeo se produjo frente a una Irak que consiguió la clasificación vía repechaje internacional, al vencer a su par de Bolivia.</p>

                <p class="mb-10 font-playfair text-xl leading-loose text-zinc-300">
                    Noruega e Irak integran la misma zona de Francia y Senegal, equipos que jugaron a primer turno. Vale recordar que la selección de Medio Oriente disputa su segundo Mundial, luego de su paso por México 1986 (tres derrotas), mientras que para los noruegos es su cuarta participación histórica y la primera desde Francia 1998.</p>

                <p class="mb-10 font-playfair text-xl leading-loose text-zinc-300">
                    Noruega convirtió el 1-0 promediando la primera parte, cortesía de, cuándo no, Erling Haaland. El delantero del Manchester City aprovechó una buena asistencia de David Moller Wolfe y anotó así su primer tanto en una Copa del Mundo, en el que también es su primer partido.</p>

                <blockquote class="relative p-8 my-10 bg-gradient-to-br from-emerald-900/20 to-transparent border-l-4 border-emerald-500 rounded-r-2xl">
                    <svg class="absolute top-4 left-4 w-8 h-8 text-emerald-500/20" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true"><path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"></path></svg>
                    <p class="relative z-10 text-xl md:text-2xl font-light text-zinc-100 italic leading-relaxed pl-6">
                        Irak llegó al empate 1-1 gracias a un excelente cabezazo de Aymen Hussein, pero la alegría les duró poco: horror en la salida, anticipo de Haaland contra el arquero Jalal Hassan y doblete del noruego.
                    </p>
                    <footer class="mt-4 pl-6 text-sm text-emerald-400 font-semibold tracking-widest uppercase">— El momento clave del partido</footer>
                </blockquote>

                <p class="mb-10 font-playfair text-xl leading-loose text-zinc-300">
                    Ya en la segunda parte, llegó la tranquilidad para los europeos, con el 3-1 marcado por Leo Ostigaard, mientras que en la última jugada del partido, Kristian Thorstvedt colocó el 4-1 definitivo.</p>

                <p class="mt-12 text-xl leading-loose text-zinc-300 p-8 border border-zinc-800 bg-zinc-900/20 rounded-2xl text-center italic font-playfair">
                    Con este resultado, Noruega arranca el Mundial igualada en puntos con Francia en la cima del Grupo I, en lo que ya se perfila como una de las zonas más disputadas del torneo.</p>
            `
        })()
    },
    /* NOTICIA NÚMERO 5 */
    {
        id: 5,
        destacada: true,
        slug: 'mexico-primer-clasificado-dieciseisavos-mundial-2026',
        categoria: 'Resultados',
        titulo: 'MÉXICO ES EL PRIMER CLASIFICADO A DIECISEISAVOS DEL MUNDIAL 2026',
        resumen: 'El Tri venció 1-0 a Corea del Sur en el Estadio Akron con un gol de Luis Romo y se convirtió en el primer equipo en asegurar su pase a la siguiente ronda, liderando el Grupo A con 6 puntos.',
        imagen: '/news-img/Mexico-PrimerClasificado.webp',
        fecha: '18 Junio 2026',
        contenido: (() => {
            return `
                <p class="mb-6 font-playfair text-xl leading-loose text-zinc-300 first-letter:float-left first-letter:text-6xl first-letter:pr-3 first-letter:font-playfair first-letter:font-black first-letter:text-black first-letter:leading-[0.8] mt-2">
                    México hizo historia este jueves al convertirse en la primera selección en clasificar a los dieciseisavos de final del Mundial 2026. El Tri venció 1-0 a Corea del Sur en el Estadio Akron de Guadalajara, con un solitario gol de Luis Romo al minuto 50, y aseguró su pase a la siguiente ronda como líder indiscutido del Grupo A.</p>

                <p class="mb-10 font-playfair text-xl leading-loose text-zinc-300">
                    El choque entre aztecas y surcoreanos llegaba como un duelo clave: ambos habían ganado en su debut, por lo que el ganador daba un paso enorme hacia la clasificación. Tras el empate 1-1 entre Sudáfrica y República Checa en el primer turno, México sabía que un triunfo lo metía directo en la siguiente fase.</p>

                <div class="p-6 my-10 bg-white/5 border border-white/10 rounded-2xl">
                    <h4 class="font-teko text-2xl text-zinc-100 tracking-widest uppercase mb-6 text-center">Resultado Final</h4>
                    <div class="grid grid-cols-2 gap-2 text-center items-center py-2 border-b border-white/5">
                        <span class="text-zinc-100 font-medium text-left">México</span>
                        <span class="text-emerald-400 font-teko text-2xl font-bold">1</span>
                    </div>
                    <div class="grid grid-cols-2 gap-2 text-center items-center py-2">
                        <span class="text-zinc-100 font-medium text-left">Corea del Sur</span>
                        <span class="text-zinc-300 font-teko text-2xl">0</span>
                    </div>
                </div>

                <div class="p-6 my-10 bg-white/5 border border-white/10 rounded-2xl">
                    <h4 class="font-teko text-2xl text-zinc-100 tracking-widest uppercase mb-4">Goles del Partido</h4>
                    <div class="flex flex-col gap-2">
                        ${[
                            ['MEX', 'Luis Romo', "50'"],
                        ].map(([eq, jugador, min]) => `
                            <div class="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                                <span class="text-emerald-400 font-sans text-xs font-bold tracking-widest w-12 shrink-0">${eq}</span>
                                <span class="text-zinc-300 font-sans text-sm font-medium flex-1">${jugador}</span>
                                <span class="text-zinc-100 font-teko text-lg tabular-nums">${min}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <h3 class="font-teko text-3xl md:text-4xl text-white mb-6 tracking-wide mt-12">CÓMO SE VIVIÓ EL PARTIDO</h3>

                <p class="mb-10 font-playfair text-xl leading-loose text-zinc-300">
                    El primer tiempo fue de dominio surcoreano. Los dirigidos por Hong Myung-bo manejaron la posesión, aunque sin generar peligro claro ante una defensa azteca bien ordenada. La más clara del Tri en la primera mitad fue un cabezazo de Julián Quiñones que atajó el portero Kim Seung-gyu. Edson Álvarez, por su parte, evitó de manera milagrosa el primero de Corea con un cierre sobre la línea ante un remate de Son Heung-min, jugada que de todas formas fue anulada por fuera de juego.</p>

                <blockquote class="relative p-8 my-10 bg-gradient-to-br from-emerald-900/20 to-transparent border-l-4 border-emerald-500 rounded-r-2xl">
                    <svg class="absolute top-4 left-4 w-8 h-8 text-emerald-500/20" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true"><path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"></path></svg>
                    <p class="relative z-10 text-xl md:text-2xl font-light text-zinc-100 italic leading-relaxed pl-6">
                        Al minuto 50, un grave error del portero Kim Seung-gyu en la salida —tras chocar con su compañero Lee Gi-hyuk— dejó el balón servido. Luis Romo no perdonó y desató la locura del "Cielito Lindo" en Guadalajara.
                    </p>
                    <footer class="mt-4 pl-6 text-sm text-emerald-400 font-semibold tracking-widest uppercase">— La jugada del partido</footer>
                </blockquote>

                <p class="mb-10 font-playfair text-xl leading-loose text-zinc-300">
                    El gol le dio tranquilidad al local, que volvió a tomar el control y estuvo cerca de aumentar la ventaja al minuto 75 con un remate de Raúl Jiménez que tapó Kim. Pero el cierre fue de sufrimiento: Corea del Sur se fue con todo en busca del empate y obligó a Raúl Rangel a vestirse de héroe con una doble atajada providencial ante Cho Gue-sung, manteniendo su arco en cero por segundo partido consecutivo.</p>

                <div class="my-10 p-8 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-transparent to-red-500/10 border border-white/10">
                    <h4 class="font-teko text-2xl text-zinc-100 tracking-widest uppercase mb-6 text-center">Figura del Partido</h4>
                    <div class="grid grid-cols-3 gap-4 text-center">
                        <div>
                            <span class="block font-teko text-4xl text-emerald-400 leading-none">1</span>
                            <span class="text-zinc-500 text-xs uppercase tracking-widest font-sans mt-2 block">Gol decisivo</span>
                        </div>
                        <div>
                            <span class="block font-teko text-4xl text-emerald-400 leading-none">30</span>
                            <span class="text-zinc-500 text-xs uppercase tracking-widest font-sans mt-2 block">Pases correctos</span>
                        </div>
                        <div>
                            <span class="block font-teko text-4xl text-emerald-400 leading-none">MVP</span>
                            <span class="text-zinc-500 text-xs uppercase tracking-widest font-sans mt-2 block">Luis Romo</span>
                        </div>
                    </div>
                </div>

                <p class="mb-10 font-playfair text-xl leading-loose text-zinc-300">
                    Con la victoria, México llegó a 6 puntos en la cima del Grupo A, seguido por Corea del Sur con 3 unidades. República Checa y Sudáfrica, que empataron más temprano, registran un punto cada uno. En la última jornada, que se jugará el 24 de junio, México enfrentará a República Checa en el Estadio Azteca, mientras que Corea del Sur se medirá ante Sudáfrica en Monterrey.</p>

                <div class="p-6 my-10 bg-white/5 border border-white/10 rounded-2xl">
                    <h4 class="font-teko text-2xl text-zinc-100 tracking-widest uppercase mb-4">Así quedó el Grupo A tras la jornada 2</h4>
                    <div class="flex flex-col gap-2">
                        ${[
                            ['México', '6'],
                            ['Corea del Sur', '3'],
                            ['República Checa', '1'],
                            ['Sudáfrica', '1'],
                        ].map(([equipo, pts]) => `
                            <div class="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                                <span class="text-zinc-300 font-sans text-sm font-medium">${equipo}</span>
                                <span class="text-zinc-100 font-teko text-xl tracking-wider">${pts} pts</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <p class="mt-12 text-xl leading-loose text-zinc-300 p-8 border border-zinc-800 bg-zinc-900/20 rounded-2xl text-center italic font-playfair">
                    El Tri sufrió, pero cumplió. Como anfitrión, México arranca su Mundial con paso firme y ya tiene asegurado su lugar en los dieciseisavos de final. El próximo objetivo: cerrar la fase de grupos como líder y soñar con romper, por fin, la barrera de los cuartos.</p>
            `
        })()
    },
    /* NOTICIA NÚMERO 6 */
    {
        id: 6,
        slug: 'canada-golea-qatar-primer-triunfo-mundial-2026',
        categoria: 'Resultados',
        titulo: 'CANADÁ GOLEA 6-0 A CATAR Y LOGRA SU PRIMER TRIUNFO MUNDIALISTA',
        resumen: 'Un triplete de Jonathan David impulsó la goleada histórica de Canadá sobre Catar en Vancouver. Los anfitriones lideran el Grupo B y quedan a un paso de los dieciseisavos, en una noche marcada por la grave lesión de Ismael Koné.',
        imagen: '/news-img/CanadaGolea6.webp',
        fecha: '18 Junio 2026',
        contenido: (() => {
            return `
                <p class="mb-6 font-playfair text-xl leading-loose text-zinc-300 first-letter:float-left first-letter:text-6xl first-letter:pr-3 first-letter:font-playfair first-letter:font-black first-letter:text-black first-letter:leading-[0.8] mt-2">
                    Tuvieron que pasar tres participaciones en Copas del Mundo para que Canadá consiguiera su primera victoria mundialista, y cuando llegó, lo hizo a lo grande. Los anfitriones golearon 6-0 a Catar en el BC Place de Vancouver, con un triplete de Jonathan David como gran figura, y quedaron como líderes del Grupo B a un paso de los dieciseisavos de final. Sin embargo, lo que pintaba para una fiesta total se tiñó de preocupación por la grave lesión de uno de sus jugadores clave.</p>

                <p class="mb-10 font-playfair text-xl leading-loose text-zinc-300">
                    El equipo de Jesse Marsch, que había sumado su primer punto histórico ante Bosnia y Herzegovina en el debut, dio un salto enorme con una actuación de autoridad, presión alta y eficacia goleadora ante 52.497 espectadores. Curiosamente, el capitán Alphonso Davies, ya recuperado de su lesión, volvió a quedarse en el banquillo.</p>

                <div class="p-6 my-10 bg-white/5 border border-white/10 rounded-2xl">
                    <h4 class="font-teko text-2xl text-zinc-100 tracking-widest uppercase mb-6 text-center">Resultado Final</h4>
                    <div class="grid grid-cols-2 gap-2 text-center items-center py-2 border-b border-white/5">
                        <span class="text-zinc-100 font-medium text-left">Canadá</span>
                        <span class="text-emerald-400 font-teko text-2xl font-bold">6</span>
                    </div>
                    <div class="grid grid-cols-2 gap-2 text-center items-center py-2">
                        <span class="text-zinc-100 font-medium text-left">Catar</span>
                        <span class="text-zinc-300 font-teko text-2xl">0</span>
                    </div>
                </div>

                <div class="p-6 my-10 bg-white/5 border border-white/10 rounded-2xl">
                    <h4 class="font-teko text-2xl text-zinc-100 tracking-widest uppercase mb-4">Goles del Partido</h4>
                    <div class="flex flex-col gap-2">
                        ${[
                            ['CAN', 'Cyle Larin', "16'"],
                            ['CAN', 'Jonathan David', "29'"],
                            ['CAN', 'Jonathan David', "45+3'"],
                            ['CAN', 'Nathan Saliba', "64'"],
                            ['CAN', 'Al Mannai (e/c)', "75'"],
                            ['CAN', 'Jonathan David', "90+8'"],
                        ].map(([eq, jugador, min]) => `
                            <div class="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                                <span class="text-emerald-400 font-sans text-xs font-bold tracking-widest w-12 shrink-0">${eq}</span>
                                <span class="text-zinc-300 font-sans text-sm font-medium flex-1">${jugador}</span>
                                <span class="text-zinc-100 font-teko text-lg tabular-nums">${min}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <h3 class="font-teko text-3xl md:text-4xl text-white mb-6 tracking-wide mt-12">CÓMO SE VIVIÓ EL PARTIDO</h3>

                <p class="mb-10 font-playfair text-xl leading-loose text-zinc-300">
                    Canadá dominó desde el primer minuto. La superioridad se reflejó en el marcador al minuto 16 con un tanto de Cyle Larin, que además se convertía momentáneamente en el máximo anotador canadiense en Mundiales. Poco después, Jonathan David amplió la ventaja con una volea dentro del área que batió al arquero qatarí.</p>

                <p class="mb-10 font-playfair text-xl leading-loose text-zinc-300">
                    El partido se rompió definitivamente al minuto 33: tras una revisión del VAR, Homam Al-Amin fue expulsado y dejó a Catar con diez hombres. Canadá se adueñó del balón y encerró a su rival. Antes del descanso, David firmó su doblete para el 3-0, empatando a Larin en el récord goleador histórico de Canadá en Copas del Mundo.</p>

                <blockquote class="relative p-8 my-10 bg-gradient-to-br from-emerald-900/20 to-transparent border-l-4 border-emerald-500 rounded-r-2xl">
                    <svg class="absolute top-4 left-4 w-8 h-8 text-emerald-500/20" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true"><path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"></path></svg>
                    <p class="relative z-10 text-xl md:text-2xl font-light text-zinc-100 italic leading-relaxed pl-6">
                        Nathan Saliba, que entró por el lesionado Koné, marcó de tiro libre al minuto 64. Inmediatamente corrió hacia el banquillo, tomó la camiseta de su compañero y la besó. Fue el momento más emotivo de la noche.
                    </p>
                    <footer class="mt-4 pl-6 text-sm text-emerald-400 font-semibold tracking-widest uppercase">— El gesto de la noche</footer>
                </blockquote>

                <p class="mb-10 font-playfair text-xl leading-loose text-zinc-300">
                    La fiesta, sin embargo, quedó marcada por un episodio doloroso. Al minuto 50, una durísima falta de Assim Madibo —que fue expulsado, dejando a Catar con nueve— provocó una grave fractura en la pierna izquierda de Ismael Koné, mediocampista del Sassuolo. El jugador fue retirado en camilla y trasladado a un hospital de Vancouver. Ambos equipos quedaron visiblemente impactados.</p>

                <p class="mb-10 font-playfair text-xl leading-loose text-zinc-300">
                    Con nueve hombres, Catar ya no tuvo respuesta. El 5-0 llegó al minuto 75 con un autogol de Mohammed Al Mannai al desviar un remate de Shaffelburg. Y en el tiempo de descuento, David empujó el balón para completar su triplete y sellar el 6-0, igualando a Lionel Messi como los únicos jugadores con un hat-trick en lo que va del torneo.</p>

                <div class="p-6 my-10 bg-white/5 border border-white/10 rounded-2xl">
                    <h4 class="font-teko text-2xl text-zinc-100 tracking-widest uppercase mb-4">Así quedó el Grupo B tras la jornada 2</h4>
                    <div class="flex flex-col gap-2">
                        ${[
                            ['Canadá', '4'],
                            ['Suiza', '4'],
                            ['Bosnia y Herzegovina', '1'],
                            ['Catar', '0'],
                        ].map(([equipo, pts]) => `
                            <div class="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                                <span class="text-zinc-300 font-sans text-sm font-medium">${equipo}</span>
                                <span class="text-zinc-100 font-teko text-xl tracking-wider">${pts} pts</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <p class="mt-12 text-xl leading-loose text-zinc-300 p-8 border border-zinc-800 bg-zinc-900/20 rounded-2xl text-center italic font-playfair">
                    Canadá y Suiza, ambos con cuatro puntos, definirán el liderato del Grupo B en un mano a mano en la última jornada. Los anfitriones quedaron virtualmente clasificados gracias a su contundente diferencia de gol. Una noche histórica para el fútbol de la hoja de maple, que ojalá no quede opacada por la dura lesión de Koné.</p>
            `
        })()
    },
    /* NOTICIA NÚMERO 7 */
    {
        id: 7,
        slug: 'convocados-francia-mundial-2026',
        categoria: 'Convocatorias',
        titulo: 'LOS 26 CONVOCADOS DE FRANCIA PARA EL MUNDIAL 2026',
        resumen: 'Didier Deschamps se despedirá de la selección francesa tras el Mundial en Norteamérica, y lo hará con una plantilla que combina experiencia y juventud, aunque con ausencias sorpresivas como la de Eduardo Camavinga.',
        imagen: '/news-img/FranciaConvocados.webp',
        fecha: '14 Mayo 2026',
        contenido: (() => {
            const plantilla = [
                { pos: 'Arqueros', count: '03', jugadores: ['Mike Maignan', 'Brice Samba', 'Robin Risser'] },
                { pos: 'Defensores', count: '09', jugadores: ['Malo Gusto', 'Jules Koundé', 'Ibrahima Konaté', 'William Saliba', 'Dayot Upamecano', 'Lucas Hernández', 'Lucas Digne', 'Theo Hernández', 'Maxence Lacroix'] },
                { pos: 'Mediocampistas', count: '06', jugadores: ['Adrien Rabiot', 'Aurélien Tchouaméni', 'N\'Golo Kanté', 'Warren Zaïre-Emery', 'Manu Koné', 'Maghnes Akliouche'] },
                { pos: 'Delanteros', count: '08', jugadores: ['Kylian Mbappé', 'Ousmane Dembélé', 'Michael Olise', 'Désiré Doué', 'Bradley Barcola', 'Marcus Thuram', 'Rayan Cherki', 'Jean-Philippe Mateta'] }
            ];

            const rosterHTML = plantilla.map(grupo => `
                <div class="relative pl-5 md:pl-0 md:grid md:grid-cols-[220px_1fr] gap-8 items-start border-t border-zinc-800/60 py-8 hover:bg-zinc-900/10 transition-colors">
                    <div class="absolute left-0 top-8 bottom-8 w-[2px] bg-zinc-800 md:hidden"></div>
                    
                    <div class="mb-5 md:mb-0">
                        <span class="block font-teko text-3xl md:text-4xl text-zinc-100 tracking-widest uppercase leading-none">${grupo.pos}</span>
                        <span class="font-mono text-[10px] text-zinc-500 tracking-[0.2em] uppercase mt-2 block">Seleccionados: ${grupo.count}</span>
                    </div>
                    
                    <ul class="columns-1 sm:columns-2 lg:columns-3 gap-8 text-zinc-400 font-playfair text-lg md:text-xl leading-relaxed">
                        ${grupo.jugadores.map(jugador => `
                            <li class="break-inside-avoid flex items-center gap-3 mb-2 border-b border-zinc-800/30 pb-1">
                                <span class="w-1.5 h-1.5 bg-zinc-700 rotate-45 shrink-0"></span>
                                <span class="text-zinc-300 hover:text-white transition-colors cursor-default">${jugador}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            `).join('');

            return `
                <p class="mb-6 font-playfair text-xl leading-loose text-zinc-300 first-letter:float-left first-letter:text-6xl first-letter:pr-3 first-letter:font-playfair first-letter:font-black first-letter:text-black-100 first-letter:leading-[0.8] mt-2">
                    Los éxitos recientes le han dado mucha estabilidad a Francia y Didier Deschamps ya lleva casi 15 años como el seleccionador a cargo, puesto del que se despedirá tras el Mundial en Norteamérica. </p>

                <p class="mb-12 font-playfair text-xl leading-loose text-zinc-300">
                    ¿Cómo será la plantilla de Francia para el Mundial 2026? A continuación, analizamos todos los detalles. Como en la última edición, las selecciones podrán convocar a 26 futbolistas, de los cuales 3 deben ser guardametas. </p>

                <div class="my-16">
                    <div class="mb-8 border-b-2 pb-4">
                        <h3 class="font-playfair text-4xl md:text-5xl text-zinc-100 font-bold italic tracking-tight">Roster Oficial</h3>
                        <p class="text-zinc-500 font-sans text-xs uppercase tracking-widest mt-2">Convocatoria definitiva — Didier Deschamps</p>
                    </div>
                    
                    <div class="flex flex-col border-b border-zinc-800/60">
                        ${rosterHTML}
                    </div>
                </div>

                <p class="mt-12 text-xl leading-loose text-zinc-300 p-8 border border-zinc-800 bg-zinc-900/20 rounded-2xl text-center italic">
                    El jueves 14 de mayo, Didier Deschamps comunicó de manera oficial los 26 elegidos para la Copa del Mundo, con algunas sorpresas entre los nombres anunciados. Principalmente, la ausencia de Eduardo Camavinga. También sorprendió la presencia de Robin Risser como tercer arquero, por encima de otros nombres como Lucas Chevalier o Hugo Lloris. Randal Kolo Muani y Kingsley Coman también se quedaron fuera de los 26. Vale recordar que jugadores como Antoine Griezmann y Karim Benzema están retirados de la selección. Francia integrará el Grupo B junto a Inglaterra, Irán y Panamá. </p>
            `;
        })()
    },
    /* NOTICIA NÚMERO 8 */
    {
        id: 8,
        slug: 'convocados-espana-mundial-2026',
        categoria: 'Convocatorias',
        titulo: 'CONVOCADOS DE ESPAÑA: UNA NUEVA GENERACIÓN SUEÑA CON LA SEGUNDA ESTRELLA',
        resumen: 'Campeones de Europa y del torneo olímpico, los dirigidos por Luis de la Fuente llegan a Norteamérica con una mezcla de juventud, talento y la ilusión de conquistar una segunda Copa del Mundo.',
        imagen: '/news-img/EspañaConvocados.webp',
        fecha: '5 Junio 2026',
        contenido: (() => {
            const plantilla = [
                { pos: 'Porteros', count: '03', jugadores: ['Unai Simón', 'David Raya', 'Joan García'] },
                { pos: 'Defensas', count: '08', jugadores: ['Pedro Porro', 'Marcos Llorente', 'Aymeric Laporte', 'Pau Cubarsí', 'Marc Pubill', 'Eric García', 'Marc Cucurella', 'Álex Grimaldo'] },
                { pos: 'Mediocampistas', count: '07', jugadores: ['Rodri', 'Martín Zubimendi', 'Pedri', 'Mikel Merino', 'Fabián Ruiz', 'Dani Olmo', 'Gavi'] },
                { pos: 'Delanteros', count: '08', jugadores: ['Nico Williams', 'Álex Baena', 'Mikel Oyarzabal', 'Ferran Torres', 'Borja Iglesias', 'Yeremy Pino', 'Lamine Yamal', 'Víctor Muñoz'] }
            ];

            const rosterHTML = plantilla.map(grupo => `
                <div class="relative pl-5 md:pl-0 md:grid md:grid-cols-[220px_1fr] gap-8 items-start border-t border-zinc-800/60 py-8 hover:bg-zinc-900/10 transition-colors">
                    <div class="absolute left-0 top-8 bottom-8 w-[2px] bg-zinc-800 md:hidden"></div>
                    
                    <div class="mb-5 md:mb-0">
                        <span class="block font-teko text-3xl md:text-4xl text-zinc-100 tracking-widest uppercase leading-none">${grupo.pos}</span>
                        <span class="font-mono text-[10px] text-zinc-500 tracking-[0.2em] uppercase mt-2 block">Seleccionados: ${grupo.count}</span>
                    </div>
                    
                    <ul class="columns-1 sm:columns-2 lg:columns-3 gap-8 text-zinc-400 font-playfair text-lg md:text-xl leading-relaxed">
                        ${grupo.jugadores.map(jugador => `
                            <li class="break-inside-avoid flex items-center gap-3 mb-2 border-b border-zinc-800/30 pb-1">
                                <span class="w-1.5 h-1.5 bg-zinc-700 rotate-45 shrink-0"></span>
                                <span class="text-zinc-300 hover:text-white transition-colors cursor-default">${jugador}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            `).join('');

            return `
                <p class="mb-6 font-playfair text-xl leading-loose text-zinc-300 first-letter:float-left first-letter:text-6xl first-letter:pr-3 first-letter:font-playfair first-letter:font-black first-letter:text-black-100 first-letter:leading-[0.8] mt-2">
                    Los últimos Mundiales no han dejado los mejores recuerdos para España. Desde aquel inolvidable Sudáfrica 2010, la Roja no ha conseguido superar los octavos de final. Sin embargo, una nueva generación cargada de talento vuelve a ilusionar a todo un país con la posibilidad de levantar la segunda estrella en la gran final de Nueva York el próximo 19 de julio de 2026. </p>

                <p class="mb-12 font-playfair text-xl leading-loose text-zinc-300">
                    El verano de 2024 cambió la historia reciente del fútbol español. Campeones de Europa en Berlín y campeones olímpicos en París, los dirigidos por Luis de la Fuente se consolidaron como una de las selecciones más completas del planeta. </p>

                <div class="my-16">
                    <div class="mb-8 border-b-2 pb-4">
                        <h3 class="font-playfair text-4xl md:text-5xl text-zinc-100 font-bold italic tracking-tight">Roster Oficial</h3>
                        <p class="text-zinc-500 font-sans text-xs uppercase tracking-widest mt-2">Convocatoria definitiva — Luis de la Fuente</p>
                    </div>
                    
                    <div class="flex flex-col border-b border-zinc-800/60">
                        ${rosterHTML}
                    </div>
                </div>

                <div class="mt-12 p-8 rounded-2xl bg-gradient-to-r from-yellow-500/10 via-transparent to-red-500/10 border border-yellow-500/20 text-center">
                    <p class="text-zinc-300 text-xl leading-loose">
                        Barcelona aporta ocho futbolistas a la convocatoria, mientras que por primera vez en la historia ningún jugador del Real Madrid integra la lista mundialista de España. España integrará el Grupo H junto a Corea del Sur, Nigeria y Canadá.
                    </p>
                    <p class="mt-6 font-teko text-3xl md:text-4xl tracking-wider text-white">
                        ¿Será esta la generación que devuelva a España a la cima del mundo?
                    </p>
                </div>
            `;
        })()
    },
    /* NOTICIA NÚMERO 9 */
    {
        id: 9,
        slug: 'por-que-el-mundial-2026-se-juega-en-tres-paises',
        categoria: 'Sedes',
        imagen: '/news-img/Mascotas2026-2.webp',
        titulo: '¿Por qué el Mundial 2026 se jugará en tres países diferentes?',
        resumen: 'Estados Unidos, México y Canadá compartirán por primera vez la organización de una Copa del Mundo, una decisión impulsada por la expansión del torneo a 48 selecciones.',

        fecha: '15 Junio 2026',
        contenido: `
            <p class="mb-6">La Copa del Mundo de 2026 marcará un antes y un después en la historia del fútbol. Por primera vez, tres países compartirán la organización del torneo: Estados Unidos, México y Canadá. La decisión fue tomada el 13 de junio de 2018 durante el 68.º Congreso de la FIFA celebrado en Moscú, donde la candidatura conjunta "United 2026" se impuso a la propuesta de Marruecos con 134 votos a favor.</p>

            <p class="mb-6">Aunque muchos aficionados se preguntaron por qué la FIFA optó por una sede tripartita, la respuesta está relacionada con la magnitud del propio campeonato. El Mundial de 2026 será el primero en disputarse con 48 selecciones, un aumento significativo respecto a las 32 que participaron entre 1998 y 2022. Esta ampliación elevó el número total de partidos de 64 a 104, lo que exigía una capacidad organizativa sin precedentes.</p>

            <p class="mb-6">La candidatura norteamericana ofrecía ventajas difíciles de igualar: estadios de primer nivel ya construidos, una amplia red de transporte, infraestructura hotelera suficiente y experiencia en la realización de eventos deportivos de talla mundial. Repartir la organización entre tres países permitió afrontar de mejor manera los desafíos logísticos y económicos que implica el torneo más grande de la historia.</p>

            <p class="mb-6">Estados Unidos será anfitrión por segunda ocasión tras el Mundial de 1994. México, por su parte, hará historia al convertirse en el primer país en albergar tres Copas del Mundo masculinas, luego de organizar las ediciones de 1970 y 1986. Canadá completará esta inédita sede compartida con su primera experiencia como organizador del campeonato masculino absoluto.</p>

            <p class="mb-6">El torneo se disputará entre el 11 de junio y el 19 de julio de 2026, y contará con 16 ciudades anfitrionas distribuidas entre los tres países. La FIFA incluso dividió las sedes en regiones geográficas para facilitar los desplazamientos de selecciones y aficionados durante la competencia.</p>

            <ul class="flex flex-col gap-4 bg-white/5 p-6 md:p-8 rounded-3xl border border-white/10 text-base md:text-lg">
                <li class="flex items-start gap-3">
                    <svg class="w-6 h-6 text-emerald-400 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    <span><strong class="text-white font-medium">Estados Unidos:</strong> Atlanta, Boston, Dallas, Houston, Kansas City, Los Ángeles, Miami, Nueva York/Nueva Jersey, Filadelfia, San Francisco y Seattle.</span>
                </li>

                <li class="flex items-start gap-3">
                    <svg class="w-6 h-6 text-emerald-400 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    <span><strong class="text-white font-medium">Canadá:</strong> Toronto y Vancouver serán las dos ciudades encargadas de recibir encuentros mundialistas.</span>
                </li>

                <li class="flex items-start gap-3">
                    <svg class="w-6 h-6 text-emerald-400 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    <span><strong class="text-white font-medium">México:</strong> Ciudad de México, Guadalajara y Monterrey volverán a ser protagonistas de una Copa del Mundo, consolidando la histórica tradición futbolera del país.</span>
                </li>
            </ul>

            <p class="mt-6">La edición de 2026 no solo será recordada por su nuevo formato y por reunir a más selecciones que nunca, sino también por inaugurar una nueva era en la organización de los Mundiales. De hecho, la Copa del Mundo de 2030 también contará con múltiples países anfitriones, lo que confirma una tendencia que parece haber llegado para quedarse.</p>
        `
    },
    /* NOTICIA NÚMERO 10 */
    {
        id: 10, slug: 'mexico-tres-veces-anfitrion-mundial-2026',
        categoria: 'Sedes',
        imagen: '/news-img/EstadioAzteca-1.webp',
        titulo: 'México, tres veces anfitrión: el Azteca se viste de gala',
        resumen: 'El Estadio Azteca se convertirá en el primer escenario en albergar la inauguración de tres Copas del Mundo: 1970, 1986 y 2026.',
        
        fecha: '28 Mayo 2026',
        contenido: `
            <p class="mb-6">El Estadio Azteca recibirá por tercera vez en su historia la inauguración de una Copa del Mundo. Un hecho sin precedentes en el fútbol mundial.</p>

            <p class="mb-6">México está haciendo historia. Ser sede de un Mundial conlleva una enorme responsabilidad: social, deportiva y cultural. Los ojos del planeta entero están puestos sobre el país, hoy y en los días que vienen. Ahora bien, imaginemos por un momento lo que significa ser anfitrión de tres Copas del Mundo.</p>

            <p class="mb-6">Es momento de recordar los momentos más trascendentes que han quedado grabados en la memoria colectiva del fútbol. El primer Mundial disputado en tierras aztecas, en 1970, contó con un Pelé de 29 años que lideró a la mejor Brasil de la historia rumbo a su tercer título mundial, el último que levantaría en su carrera. Viajando 16 años al futuro, en el Mundial de 1986 llegó la segunda estrella para Argentina con Diego Armando Maradona como protagonista absoluto. Fue en esa justa donde el "10" inmortalizó aquella jugada polémica contra Inglaterra —marcada con la mano, pero validada por el árbitro— que se convirtió en símbolo de algo más grande que un partido. Hoy, 40 años después, aunque la batuta es compartida con Estados Unidos y Canadá, y la final no se disputará en suelo mexicano, México vuelve a ser parte de la historia: 96 años después del nacimiento del torneo más importante del mundo.</p>

            <p class="mb-6">En total, México albergará 13 partidos distribuidos en tres sedes, con encuentros desde la fase de grupos hasta los octavos de final:</p>

            <ul class="flex flex-col gap-4 bg-white/5 p-6 md:p-8 rounded-3xl border border-white/10 text-base md:text-lg">
                <li class="flex items-start gap-3">
                    <svg class="w-6 h-6 text-emerald-400 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    <span><strong class="text-white font-medium">Ciudad de México (Estadio Azteca):</strong> 5 partidos (partido inaugural, dos juegos de fase de grupos, un partido de dieciseisavos y uno de octavos de final).</span>
                </li>
                <li class="flex items-start gap-3">
                    <svg class="w-6 h-6 text-emerald-400 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    <span><strong class="text-white font-medium">Guadalajara (Estadio Akron):</strong> 4 partidos (todos de fase de grupos, incluyendo el segundo partido de la Selección Mexicana y el atractivo duelo Uruguay vs. España).</span>
                </li>
                <li class="flex items-start gap-3">
                    <svg class="w-6 h-6 text-emerald-400 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    <span><strong class="text-white font-medium">Monterrey (Estadio BBVA):</strong> 4 partidos (tres de fase de grupos y uno de dieciseisavos de final).</span>
                </li>
            </ul>
        `
    },
    /* NOTICIA NÚMERO 11 */
    {
        id: 11, slug: 'colombia-grupo-k-mundial-2026',
        categoria: 'Selecciones',
        titulo: 'COLOMBIA EN EL MUNDIAL 2026: GRUPO, RIVALES Y HORARIOS',
        resumen: 'Colombia enfrentará a Portugal, RD Congo y Uzbekistán en el Grupo K. Conoce las fechas y horarios de todos sus partidos.',
        imagen: '/news-img/GrupoK-Colombia.webp',
        fecha: '5 Junio 2026',
        contenido: `
            <p class="mb-8">Colombia clasificó al Mundial 2026 y quedó ubicada en el Grupo K junto a Portugal, República Democrática del Congo y Uzbekistán.</p>
            
            <h3 class="font-teko text-3xl md:text-4xl text-white mb-6 tracking-wide">CALENDARIO DE PARTIDOS</h3>
            
            <div class="flex flex-col gap-3 mb-8">
                <div class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:bg-white/[0.05] transition-colors">
                    <span class="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-lg text-xs font-bold tracking-widest uppercase w-fit">Jornada 1</span>
                    <span class="text-zinc-200 font-medium tracking-wide">Portugal <span class="text-zinc-500 mx-2 text-sm font-light">vs</span> RD Congo</span>
                </div>
                <div class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:bg-white/[0.05] transition-colors">
                    <span class="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-lg text-xs font-bold tracking-widest uppercase w-fit">Jornada 1</span>
                    <span class="text-zinc-200 font-medium tracking-wide">Uzbekistán <span class="text-zinc-500 mx-2 text-sm font-light">vs</span> Colombia</span>
                </div>
                <div class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:bg-white/[0.05] transition-colors">
                    <span class="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-lg text-xs font-bold tracking-widest uppercase w-fit">Jornada 2</span>
                    <span class="text-zinc-200 font-medium tracking-wide">Portugal <span class="text-zinc-500 mx-2 text-sm font-light">vs</span> Colombia</span>
                </div>
                <div class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:bg-white/[0.05] transition-colors">
                    <span class="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-lg text-xs font-bold tracking-widest uppercase w-fit">Jornada 2</span>
                    <span class="text-zinc-200 font-medium tracking-wide">RD Congo <span class="text-zinc-500 mx-2 text-sm font-light">vs</span> Uzbekistán</span>
                </div>
                <div class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:bg-white/[0.05] transition-colors">
                    <span class="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-lg text-xs font-bold tracking-widest uppercase w-fit">Jornada 3</span>
                    <span class="text-zinc-200 font-medium tracking-wide">Colombia <span class="text-zinc-500 mx-2 text-sm font-light">vs</span> RD Congo</span>
                </div>
                <div class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:bg-white/[0.05] transition-colors">
                    <span class="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-lg text-xs font-bold tracking-widest uppercase w-fit">Jornada 3</span>
                    <span class="text-zinc-200 font-medium tracking-wide">Uzbekistán <span class="text-zinc-500 mx-2 text-sm font-light">vs</span> Portugal</span>
                </div>
            </div>
            
            <div class="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center gap-3 text-blue-200 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                <p>Para ver el calendario completo y toda su información te invitamos a ingresar a la sección de calendario.</p>
            </div>
        `
    },
    /* NOTICIA NÚMERO 12 */
    {
        id: 12, slug: 'neymar-regresa-seleccion-brasil-mundial-2026',
        categoria: 'Figuras',
        titulo: 'EL PRÍNCIPE VUELVE POR SU CORONA, "la 10"',
        resumen: 'Neymar regresa a la selección después de tres años. Con el Mundial cada vez más cerca, comienza una nueva oportunidad para hacer historia.',
        imagen: '/news-img/NeymarConvocado.webp',
        fecha: '25 Mayo 2026',
        contenido: `
            <p class="mb-6">Neymar regresa a la selección brasileña después de tres años de ausencia por lesiones que marcaron la etapa más difícil de su carrera.</p>
            
            <p class="mb-8">Con el Mundial cada vez más cerca, el delantero comienza una nueva oportunidad para hacer historia con la camiseta 10 que lo vio brillar en los mundiales de 2014 y 2018.</p>
            
            <blockquote class="relative p-8 my-10 bg-gradient-to-br from-emerald-900/20 to-transparent border-l-4 border-emerald-500 rounded-r-2xl">
                <svg class="absolute top-4 left-4 w-8 h-8 text-emerald-500/20" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true"><path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"></path></svg>
                <p class="relative z-10 text-xl md:text-2xl font-light text-zinc-100 italic leading-relaxed pl-6">
                    "Este Mundial es mi última oportunidad de levantar la copa con Brasil. Estoy más motivado que nunca".
                </p>
                <footer class="mt-4 pl-6 text-sm text-emerald-400 font-semibold tracking-widest uppercase">— Neymar Jr.</footer>
            </blockquote>
        `
    },
    /* NOTICIA NÚMERO 13 */
    {
        id: 13, slug: 'brasil-busca-sexta-estrella-grupo-c-mundial-2026',
        categoria: 'Selecciones',
        titulo: 'BRASIL BUSCA SU SEXTA ESTRELLA: GRUPO, RIVALES Y HORARIOS',
        resumen: 'La Canarinha enfrentará a Marruecos, Haití y Escocia en el Grupo C del Mundial 2026.',
        imagen: '/news-img/BrasilRumboHexa.webp',
        fecha: '5 Junio 2026',
        contenido: `
            <p class="mb-8">Brasil llega al Mundial 2026 con la misión de conquistar su sexta Copa del Mundo. La Canarinha quedó ubicada en el Grupo C.</p>
            
            <h3 class="font-teko text-3xl md:text-4xl text-white mb-6 tracking-wide">CALENDARIO DE PARTIDOS</h3>
            
            <div class="flex flex-col gap-3">
                <div class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:bg-white/[0.05] transition-colors">
                    <span class="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-lg text-xs font-bold tracking-widest uppercase w-fit">Jornada 1</span>
                    <span class="text-zinc-200 font-medium tracking-wide">Brasil <span class="text-zinc-500 mx-2 text-sm font-light">vs</span> Marruecos</span>
                </div>
                <div class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:bg-white/[0.05] transition-colors">
                    <span class="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-lg text-xs font-bold tracking-widest uppercase w-fit">Jornada 1</span>
                    <span class="text-zinc-200 font-medium tracking-wide">Haití <span class="text-zinc-500 mx-2 text-sm font-light">vs</span> Escocia</span>
                </div>
                <div class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:bg-white/[0.05] transition-colors">
                    <span class="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-lg text-xs font-bold tracking-widest uppercase w-fit">Jornada 2</span>
                    <span class="text-zinc-200 font-medium tracking-wide">Brasil <span class="text-zinc-500 mx-2 text-sm font-light">vs</span> Haití</span>
                </div>
                <div class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:bg-white/[0.05] transition-colors">
                    <span class="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-lg text-xs font-bold tracking-widest uppercase w-fit">Jornada 2</span>
                    <span class="text-zinc-200 font-medium tracking-wide">Marruecos <span class="text-zinc-500 mx-2 text-sm font-light">vs</span> Escocia</span>
                </div>
                <div class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:bg-white/[0.05] transition-colors">
                    <span class="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-lg text-xs font-bold tracking-widest uppercase w-fit">Jornada 3</span>
                    <span class="text-zinc-200 font-medium tracking-wide">Escocia <span class="text-zinc-500 mx-2 text-sm font-light">vs</span> Brasil</span>
                </div>
                <div class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:bg-white/[0.05] transition-colors">
                    <span class="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-lg text-xs font-bold tracking-widest uppercase w-fit">Jornada 3</span>
                    <span class="text-zinc-200 font-medium tracking-wide">Marruecos <span class="text-zinc-500 mx-2 text-sm font-light">vs</span> Haití</span>
                </div>
            </div>

            <div class="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center gap-3 text-blue-200 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                <p>Para ver el calendario completo y toda su información te invitamos a ingresar a la sección de calendario.</p>
            </div>
        `
    },
    /* NOTICIA NÚMERO 14 */
    {
        id: 14,
        slug: 'cabo-verde-empate-historico-espana-mundial-2026',
        categoria: 'Actualidad',
        titulo: 'CABO VERDE HACE HISTORIA: EMPATE LEGENDARIO ANTE ESPAÑA EN SU DEBUT MUNDIALISTA',
        resumen: 'Los Tiburones Azules igualaron 0-0 ante la vigente campeona de Europa en su primer partido en la historia de una Copa del Mundo. Vozinha, figura del partido.',
        imagen: '/news-img/VozinhaEmpate.webp',
        fecha: '15 Junio 2026',
        contenido: (() => {
            return `
                <p class="mb-6 font-playfair text-xl leading-loose text-black-300 first-letter:float-left first-letter:text-6xl first-letter:pr-3 first-letter:font-playfair first-letter:font-black first-letter:text-black-100 first-letter:leading-[0.8] mt-2">
                    Hay debuts y hay DEBUTS. El de Cabo Verde en el Mundial 2026 será de los que se recuerden por años. Este lunes 15 de junio, los Tiburones Azules disputaron el primer partido de su historia en una Copa del Mundo, y no les tocó un rival cualquiera: enfrente tenían a España, vigente campeona de Europa y una de las grandes favoritas a levantar el trofeo.</p>

                <p class="mb-10 font-playfair text-xl leading-loose text-zinc-300">
                    El resultado: 0-0. Y vaya que pesa ese cero.</p>

                <div class="my-10 grid grid-cols-3 gap-4 text-center">
                    <div class="bg-white/5 border border-white/10 rounded-2xl p-5">
                        <span class="block font-teko text-5xl text-zinc-100 leading-none">65%</span>
                        <span class="text-zinc-500 text-xs uppercase tracking-widest font-sans mt-2 block">Posesión España</span>
                    </div>
                    <div class="bg-white/5 border border-white/10 rounded-2xl p-5">
                        <span class="block font-teko text-5xl text-zinc-100 leading-none">27</span>
                        <span class="text-zinc-500 text-xs uppercase tracking-widest font-sans mt-2 block">Remates España</span>
                    </div>
                    <div class="bg-white/5 border border-white/10 rounded-2xl p-5">
                        <span class="block font-teko text-5xl text-zinc-100 leading-none">7</span>
                        <span class="text-zinc-500 text-xs uppercase tracking-widest font-sans mt-2 block">A puerta España</span>
                    </div>
                </div>

                <p class="mb-10 font-playfair text-xl leading-loose text-zinc-300">
                    España dominó por completo el partido. La Roja generó volumen ofensivo y ocasiones claras, pero la falta de puntería en el remate final acabó siendo decisiva. Oyarzabal incluso mandó un balón al larguero en uno de los momentos de mayor peligro para el arco caboverdiano.</p>

                <blockquote class="relative p-8 my-10 bg-gradient-to-br from-emerald-900/20 to-transparent border-l-4 border-emerald-500 rounded-r-2xl">
                    <svg class="absolute top-4 left-4 w-8 h-8 text-emerald-500/20" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true"><path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"></path></svg>
                    <p class="relative z-10 text-xl md:text-2xl font-light text-zinc-100 italic leading-relaxed pl-6">
                        "El portero Josimar Vozinha se vistió de héroe con una serie de atajadas que mantuvieron el arco en cero y enloquecieron a la afición."
                    </p>
                    <footer class="mt-4 pl-6 text-sm text-emerald-400 font-semibold tracking-widest uppercase">— Figura del partido</footer>
                </blockquote>

                <p class="mb-10 font-playfair text-xl leading-loose text-zinc-300">
                    Para dimensionar la hazaña: Cabo Verde es un archipiélago de poco más de medio millón de habitantes que disputa su primera Copa del Mundo en la historia del país. Sacarle un punto a España en su estreno es, sin exagerar, una de las grandes historias del torneo hasta ahora.</p>

                <div class="p-6 my-10 bg-white/5 border border-white/10 rounded-2xl">
                    <h4 class="font-teko text-2xl text-zinc-100 tracking-widest uppercase mb-4">Así quedó el Grupo H tras la jornada 1</h4>
                    <div class="flex flex-col gap-2">
                        ${[
                            ['España', '0', '1'],
                            ['Cabo Verde', '0', '1'],
                            ['Uruguay', '—', '1'],
                            ['Arabia Saudita', '—', '1'],
                        ].map(([equipo, goles, pts]) => `
                            <div class="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                                <span class="text-zinc-300 font-sans text-sm font-medium">${equipo}</span>
                                <span class="text-zinc-100 font-teko text-xl tracking-wider">${pts} pts</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <p class="mt-12 text-xl leading-loose text-zinc-300 p-8 border border-zinc-800 bg-zinc-900/20 rounded-2xl text-center italic font-playfair">
                    El sueño caboverdiano apenas comienza. Y si Vozinha sigue así, nadie querrá enfrentarlos.</p>
            `
        })()
    },
    /* NOTICIA NÚMERO 15 */
    {
    id: 15,
    slug: 'convocados-ecuador-mundial-2026',
    categoria: 'Convocatorias',
    titulo: 'LOS 26 CONVOCADOS DE ECUADOR PARA EL MUNDIAL 2026',
    resumen: 'La Tri combina experiencia y juventud en su nómina mundialista, con Moisés Caicedo como gran figura y Enner Valencia liderando el ataque en busca de superar su mejor actuación histórica.',
    imagen: '/news-img/EcuadorConvocados.webp',
    fecha: '31 Mayo 2026',
    contenido: (() => {
        const plantilla = [
            { pos: 'Arqueros', count: '03', jugadores: ['Hernán Galíndez', 'Gonzalo Valle', 'Moisés Ramírez'] },
            { pos: 'Defensores', count: '08', jugadores: ['Ángelo Preciado', 'Willian Pacho', 'Joel Ordóñez', 'Piero Hincapié', 'Félix Torres', 'Jackson Porozo', 'Pervis Estupiñán', 'Yaimar Medina'] },
            { pos: 'Mediocampistas', count: '06', jugadores: ['Pedro Vite', 'Jordy Alcívar', 'Alan Franco', 'Moisés Caicedo', 'Kendry Páez', 'Denil Castillo'] },
            { pos: 'Delanteros', count: '09', jugadores: ['John Yeboah', 'Gonzalo Plata', 'Anthony Valencia', 'Nilson Angulo', 'Alan Minda', 'Enner Valencia', 'Kevin Rodríguez', 'Jordy Caicedo', 'Jeremy Arévalo'] }
        ];

        const rosterHTML = plantilla.map(grupo => `
            <div class="relative pl-5 md:pl-0 md:grid md:grid-cols-[220px_1fr] gap-8 items-start border-t border-zinc-800/60 py-8 hover:bg-zinc-900/10 transition-colors">
                <div class="absolute left-0 top-8 bottom-8 w-[2px] bg-zinc-800 md:hidden"></div>
                
                <div class="mb-5 md:mb-0">
                    <span class="block font-teko text-3xl md:text-4xl text-zinc-100 tracking-widest uppercase leading-none">${grupo.pos}</span>
                    <span class="font-mono text-[10px] text-zinc-500 tracking-[0.2em] uppercase mt-2 block">Seleccionados: ${grupo.count}</span>
                </div>
                
                <ul class="columns-1 sm:columns-2 lg:columns-3 gap-8 text-zinc-400 font-playfair text-lg md:text-xl leading-relaxed">
                    ${grupo.jugadores.map(jugador => `
                        <li class="break-inside-avoid flex items-center gap-3 mb-2 border-b border-zinc-800/30 pb-1">
                            <span class="w-1.5 h-1.5 bg-zinc-700 rotate-45 shrink-0"></span>
                            <span class="text-zinc-300 hover:text-white transition-colors cursor-default">${jugador}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `).join('');

        return `
            <p class="mb-6 font-playfair text-xl leading-loose text-zinc-300 first-letter:float-left first-letter:text-6xl first-letter:pr-3 first-letter:font-playfair first-letter:font-black first-letter:text-black-100 first-letter:leading-[0.8] mt-2">
                De cara al Mundial 2026, el plantel ecuatoriano combina experiencia y juventud. Los pilares defensivos Willian Pacho, Piero Hincapié y Pervis Estupiñán encabezan una última línea de primer nivel, mientras que en el mediocampo Moisés Caicedo se mantiene como la gran figura del equipo. Enner Valencia volverá a liderar el ataque acompañado por nombres como Gonzalo Plata, Kendry Páez y John Yeboah, exponentes de una nueva generación que promete velocidad y desequilibrio. </p>

            <p class="mb-12 font-playfair text-xl leading-loose text-zinc-300">
                Con esto en mente, Ecuador apunta a superar su mejor actuación mundialista y consolidarse como uno de los proyectos más sólidos de la región. ¿Qué nombres integran su lista para la próxima Copa del Mundo? Lo repasamos al detalle, a continuación. </p>

            <div class="my-16">
                <div class="mb-8 border-b-2 pb-4">
                    <h3 class="font-playfair text-4xl md:text-5xl text-zinc-100 font-bold italic tracking-tight">Roster Oficial</h3>
                    <p class="text-zinc-500 font-sans text-xs uppercase tracking-widest mt-2">Convocatoria definitiva — Ecuador</p>
                </div>
                
                <div class="flex flex-col border-b border-zinc-800/60">
                    ${rosterHTML}
                </div>
            </div>

            <p class="mt-12 text-xl leading-loose text-zinc-300 p-8 border border-zinc-800 bg-zinc-900/20 rounded-2xl text-center italic">
            El domingo 24 de mayo, Ecuador presentó una prelista de 28 jugadores. Luego, el domingo 31 de mayo confirmó a sus 26 convocados. La Tri integrará el Grupo E junto a Costa de Marfil, Suecia y Japón. La combinación de solidez defensiva y juventud en ataque ilusiona a una nación que busca escribir su mejor página en la historia de los Mundiales. </p>
            `;
        })()
    },
    /* NOTICIA NÚMERO 16 */
    {
    id: 2,
    slug: 'convocados-argentina-mundial-2026',
    categoria: 'Convocatorias',
    titulo: 'LOS 26 CONVOCADOS DE ARGENTINA PARA EL MUNDIAL 2026',
    resumen: 'Lionel Scaloni confirmó la lista definitiva de jugadores que representarán a Argentina en la Copa Mundial de la FIFA 2026 con la esperanza de retener el título.',
    imagen: '/news-img/ArgentinaConvocados.webp',
    fecha: '28 Mayo 2026',
    contenido: (() => {
        const plantilla = [
            { pos: 'Arqueros', count: '03', jugadores: ['Emiliano Martínez', 'Gerónimo Rulli', 'Juan Musso'] },
            { pos: 'Defensas', count: '08', jugadores: ['Gonzalo Montiel', 'Nahuel Molina', 'Lisandro Martínez', 'Nicolás Otamendi', 'Leonardo Balerdi', 'Cristian Romero', 'Facundo Medina', 'Nicolás Tagliafico'] },
            { pos: 'Mediocampistas', count: '08', jugadores: ['Leandro Paredes', 'Rodrigo De Paul', 'Exequiel Palacios', 'Enzo Fernández', 'Alexis Mac Allister', 'Giovani Lo Celso', 'Valentín Barco', 'Nicolás Paz'] },
            { pos: 'Delanteros', count: '07', jugadores: ['Lionel Messi', 'Julián Álvarez', 'Lautaro Martínez', 'Nicolás González', 'Thiago Almada', 'Giuliano Simeone', 'José Manuel López'] }
        ];

        const rosterHTML = plantilla.map(grupo => `
            <div class="relative pl-5 md:pl-0 md:grid md:grid-cols-[220px_1fr] gap-8 items-start border-t border-zinc-800/60 py-8 hover:bg-zinc-900/10 transition-colors">
                <div class="absolute left-0 top-8 bottom-8 w-[2px] bg-zinc-800 md:hidden"></div>
                
                <div class="mb-5 md:mb-0">
                    <span class="block font-teko text-3xl md:text-4xl text-zinc-100 tracking-widest uppercase leading-none">${grupo.pos}</span>
                    <span class="font-mono text-[10px] text-zinc-500 tracking-[0.2em] uppercase mt-2 block">Seleccionados: ${grupo.count}</span>
                </div>
                
                <ul class="columns-1 sm:columns-2 lg:columns-3 gap-8 text-zinc-400 font-playfair text-lg md:text-xl leading-relaxed">
                    ${grupo.jugadores.map(jugador => `
                        <li class="break-inside-avoid flex items-center gap-3 mb-2 border-b border-zinc-800/30 pb-1">
                            <span class="w-1.5 h-1.5 bg-zinc-700 rotate-45 shrink-0"></span>
                            <span class="text-zinc-300 hover:text-white transition-colors cursor-default">${jugador}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `).join('');

        return `
            <p class="mb-6 font-playfair text-xl leading-loose text-zinc-300 first-letter:float-left first-letter:text-6xl first-letter:pr-3 first-letter:font-playfair first-letter:font-black first-letter:text-black-100 first-letter:leading-[0.8] mt-2">
                Lionel Scaloni hizo oficial este jueves 28 de mayo la lista de 26 convocados que acudirán a la Copa Mundial 2026 con la esperanza de retener el título, una situación que no se da desde que Brasil repitió festejo en 1958 y 1962. </p>

            <p class="mb-12 font-playfair text-xl leading-loose text-zinc-300">
                Aunque no hay demasiadas sorpresas, Scaloni apuesta a algunos jugadores que no fueron parte de Catar, como Valentín Barco, de muy buena temporada europea, José Manuel López, centrodelantero del Palmeiras que le brinda opciones de recambio a Julián Álvarez y Lautaro Martínez, o Nico Paz, muy considerado por el cuerpo técnico luego de un alto rendimiento en Como. </p>

            <div class="my-16">
                <div class="mb-8 border-b-2 pb-4">
                    <h3 class="font-playfair text-4xl md:text-5xl text-zinc-100 font-bold italic tracking-tight">Roster Oficial</h3>
                    <p class="text-zinc-500 font-sans text-xs uppercase tracking-widest mt-2">Convocatoria definitiva — Lionel Scaloni</p>
                </div>
                
                <div class="flex flex-col border-b border-zinc-800/60">
                    ${rosterHTML}
                </div>
            </div>

            <p class="mt-12 text-xl leading-loose text-zinc-300 p-8 border border-zinc-800 bg-zinc-900/20 rounded-2xl text-center italic">
                Campeona del mundo en Qatar 2022, la Selección Argentina llega al 2026 de nuevo como candidata. Argentina integrará el Grupo C junto a Alemania, Túnez y Australia. La ilusión de volver a levantar la copa sigue intacta en una generación que ya hizo historia y busca escribir un nuevo capítulo dorado. </p>
        `;
    })()
    },    
    /* NOTICIA NÚMERO 17 */
    {
        id: 17,
        slug: 'convocados-brasil-mundial-2026',
        categoria: 'Convocatorias',
        titulo: 'LOS 26 CONVOCADOS DE BRASIL PARA EL MUNDIAL 2026',
        resumen: 'Carlo Ancelotti hizo pública la lista definitiva de 26 jugadores que defenderán la camiseta de Brasil en la Copa Mundial de la FIFA 2026, con Neymar como gran novedad en la nómina.',
        imagen: '/news-img/BrasiConvocados.webp',
        fecha: '18 Mayo 2026',
        contenido: (() => {
            const plantilla = [
                { pos: 'Arqueros', count: '03', jugadores: ['Alisson', 'Ederson', 'Weverton'] },
                { pos: 'Defensores', count: '09', jugadores: ['Marquinhos', 'Gabriel Magalhães', 'Bremer', 'Leo Pereira', 'Ibañez', 'Danilo', 'Douglas Santos', 'Alex Sandro'] },
                { pos: 'Mediocampistas', count: '06', jugadores: ['Casemiro', 'Bruno Guimarães', 'Fabinho', 'Danilo Santos', 'Lucas Paquetá', 'Éderson'] },
                { pos: 'Delanteros', count: '08', jugadores: ['Vinícius Jr.', 'Raphinha', 'Matheus Cunha', 'Gabriel Martinelli', 'Luiz Henrique', 'Igor Thiago', 'Endrick', 'Rayan', 'Neymar'] }
            ];

            const rosterHTML = plantilla.map(grupo => `
                <div class="relative pl-5 md:pl-0 md:grid md:grid-cols-[220px_1fr] gap-8 items-start border-t border-zinc-800/60 py-8 hover:bg-zinc-900/10 transition-colors">
                    <div class="absolute left-0 top-8 bottom-8 w-[2px] bg-zinc-800 md:hidden"></div>
                    
                    <div class="mb-5 md:mb-0">
                        <span class="block font-teko text-3xl md:text-4xl text-zinc-100 tracking-widest uppercase leading-none">${grupo.pos}</span>
                        <span class="font-mono text-[10px] text-zinc-500 tracking-[0.2em] uppercase mt-2 block">Seleccionados: ${grupo.count}</span>
                    </div>
                    
                    <ul class="columns-1 sm:columns-2 lg:columns-3 gap-8 text-zinc-400 font-playfair text-lg md:text-xl leading-relaxed">
                        ${grupo.jugadores.map(jugador => `
                            <li class="break-inside-avoid flex items-center gap-3 mb-2 border-b border-zinc-800/30 pb-1">
                                <span class="w-1.5 h-1.5 bg-zinc-700 rotate-45 shrink-0"></span>
                                <span class="text-zinc-300 hover:text-white transition-colors cursor-default">${jugador}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            `).join('');

            return `
                <p class="mb-6 font-playfair text-xl leading-loose text-zinc-300 first-letter:float-left first-letter:text-6xl first-letter:pr-3 first-letter:font-playfair first-letter:font-black first-letter:text-black-100 first-letter:leading-[0.8] mt-2">
                    El lunes 18 de mayo, Carlo Ancelotti oficializó su nómina de 26 futbolistas para disputar la Copa del Mundo 2026. La gran sorpresa de la lista es el regreso de Neymar, quien se ganó un lugar por encima de otros atacantes que venían teniendo un buen presente, como Joao Pedro. Cabe recordar que Estevão no podrá estar presente debido a una lesión. </p>

                <p class="mb-12 font-playfair text-xl leading-loose text-zinc-300">
                    Entre los convocados finalmente no aparece el experimentado Thiago Silva, quien sí había integrado la prelista de 55 jugadores. Se trata de una convocatoria con marcado perfil ofensivo, con pocos volantes —dos de ellos de características más ofensivas como Lucas Paquetá y Danilo Santos— y hasta nueve atacantes. </p>

                <p class="mb-12 font-playfair text-xl leading-loose text-zinc-300">
                    El domingo 7 de junio, a menos de una semana del estreno mundialista, se produjo una modificación de último momento: Wesley fue descartado por lesión y en su lugar fue convocado Éderson. </p>

                <div class="my-16">
                    <div class="mb-8 border-b-2 pb-4">
                        <h3 class="font-playfair text-4xl md:text-5xl text-zinc-100 font-bold italic tracking-tight">Roster Oficial</h3>
                        <p class="text-zinc-500 font-sans text-xs uppercase tracking-widest mt-2">Convocatoria definitiva — Carlo Ancelotti</p>
                    </div>
                    
                    <div class="flex flex-col border-b border-zinc-800/60">
                        ${rosterHTML}
                    </div>
                </div>

                <p class="mt-12 text-xl leading-loose text-zinc-300 p-8 border border-zinc-800 bg-zinc-900/20 rounded-2xl text-center italic">
                    Brasil llega al Mundial 2026 con la presión de volver a levantar el trofeo después de 24 años. La Canarinha integrará el Grupo H junto a España, Marruecos y Nueva Zelanda. La mezcla entre experiencia y juventud será la gran apuesta de Ancelotti para buscar la tan anhelada sexta estrella. </p>
            `;
        })()
    },
    /* NOTICIA NÚMERO 18 */
    {
        id: 18, 
        slug: 'convocados-colombia-mundial-2026',
        categoria: 'Convocatorias',
        titulo: 'LOS 26 CONVOCADOS DE COLOMBIA PARA EL MUNDIAL 2026', // [cite: 26]
        resumen: 'Néstor Lorenzo confirmó la lista definitiva de jugadores que representarán a Colombia en la Copa Mundial de la FIFA 2026.', // [cite: 26]
        imagen: '/news-img/ColombiaConvocados.webp',
        fecha: '25 Mayo 2026',
        contenido: (() => {
            // Plantilla reutilizable para cualquier país
            const plantilla = [
                { pos: 'Arqueros', count: '03', jugadores: ['Camilo Vargas', 'Álvaro Montero', 'David Ospina'] }, // [cite: 29]
                { pos: 'Defensas', count: '08', jugadores: ['Dávinson Sánchez', 'John Lucumí', 'Yerry Mina', 'Willer Ditta', 'Daniel Muñoz', 'Santiago Arias', 'Johan Mojica', 'Deiver Machado'] }, // [cite: 30]
                { pos: 'Volantes', count: '10', jugadores: ['Richard Ríos', 'Jefferson Lerma', 'Kevin Castaño', 'Juan Portilla', 'Gustavo Puerta', 'Jhon Arias', 'Jorge Carrascal', 'Juan Fernando Quintero', 'James Rodríguez', 'Jaminton Campaz'] }, // [cite: 32]
                { pos: 'Delanteros', count: '05', jugadores: ['Luis Díaz', 'Jhon Córdoba', 'Luis Suárez', 'Carlos Andrés Gómez', 'Juan Camilo Hernández'] } // [cite: 33]
            ];

            const rosterHTML = plantilla.map(grupo => `
                <div class="relative pl-5 md:pl-0 md:grid md:grid-cols-[180px_1fr] gap-8 items-start border-t border-zinc-800/60 py-8 hover:bg-zinc-900/10 transition-colors">
                    <div class="absolute left-0 top-8 bottom-8 w-[2px] bg-zinc-800 md:hidden"></div>
                    
                    <div class="mb-5 md:mb-0">
                        <span class="block font-teko text-3xl md:text-4xl text-zinc-100 tracking-widest uppercase leading-none">${grupo.pos}</span>
                        <span class="font-mono text-[10px] text-zinc-500 tracking-[0.2em] uppercase mt-2 block">Seleccionados: ${grupo.count}</span>
                    </div>
                    
                    <ul class="columns-1 sm:columns-2 lg:columns-3 gap-8 text-zinc-400 font-playfair text-lg md:text-xl leading-relaxed">
                        ${grupo.jugadores.map(jugador => `
                            <li class="break-inside-avoid flex items-center gap-3 mb-2 border-b border-zinc-800/30 pb-1">
                                <span class="w-1.5 h-1.5 bg-zinc-700 rotate-45 shrink-0"></span>
                                <span class="text-zinc-300 hover:text-white transition-colors cursor-default">${jugador}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            `).join('');

            return `
                <p class="mb-6 font-playfair text-xl leading-loose text-zinc-300 first-letter:float-left first-letter:text-6xl first-letter:pr-3 first-letter:font-playfair first-letter:font-black first-letter:text-black-100 first-letter:leading-[0.8] mt-2">
                    La Selección Colombia ya tiene definidos los 26 futbolistas que disputarán la Copa Mundial de la FIFA 2026. El entrenador Néstor Lorenzo apostó por una base consolidada que combina experiencia internacional, liderazgo y juventud para afrontar el torneo que se celebrará en México, Estados Unidos y Canadá. </p>

                <p class="mb-12 font-playfair text-xl leading-loose text-zinc-300">
                    Entre los nombres más destacados aparecen James Rodríguez, Luis Díaz, Jhon Arias, Richard Ríos, Daniel Muñoz y Dávinson Sánchez, jugadores que han sido piezas fundamentales durante el proceso clasificatorio de la Tricolor. Colombia regresará a una Copa del Mundo con el objetivo de superar su histórica actuación de Brasil 2014. </p>

                <div class="my-16">
                    <div class="mb-8 border-b-2 pb-4">
                        <h3 class="font-playfair text-4xl md:text-5xl text-zinc-100 font-bold italic tracking-tight">Roster Oficial</h3>
                        <p class="text-zinc-500 font-sans text-xs uppercase tracking-widest mt-2">Convocatoria definitiva — Néstor Lorenzo</p>
                    </div>
                    
                    <div class="flex flex-col border-b border-zinc-800/60">
                        ${rosterHTML}
                    </div>
                </div>

                <p class="mt-12 text-xl leading-loose text-zinc-300 p-8 border border-zinc-800 bg-zinc-900/20 rounded-2xl text-center italic">
                    Colombia integrará el Grupo K junto a Portugal, Uzbekistán y República Democrática del Congo. La ilusión de millones de colombianos vuelve a estar puesta en una generación que buscará escribir una nueva página dorada en la historia del fútbol nacional. </p>
            `;
        })()
    },
    /* NOTICIA NÚMERO 19 */
    {
        id: 19,
        slug: 'convocados-uruguay-mundial-2026',
        categoria: 'Convocatorias',
        titulo: 'LOS 26 CONVOCADOS DE URUGUAY PARA EL MUNDIAL 2026',
        resumen: 'Marcelo Bielsa entregó la lista definitiva de 26 jugadores que representarán a Uruguay en la Copa Mundial de la FIFA 2026, con Federico Valverde como gran líder de una generación que buscará hacer historia.',
        imagen: '/news-img/UruguayConvocados.webp',
        fecha: '31 Mayo 2026',
        contenido: (() => {
            const plantilla = [
                { pos: 'Arqueros', count: '03', jugadores: ['Sergio Rochet', 'Fernando Muslera', 'Santiago Mele'] },
                { pos: 'Defensas', count: '08', jugadores: ['Guillermo Varela', 'Ronald Araujo', 'José María Giménez', 'Santiago Bueno', 'Sebastián Cáceres', 'Mathías Olivera', 'Joaquín Piquerez', 'Matías Viña'] },
                { pos: 'Mediocampistas', count: '12', jugadores: ['Manuel Ugarte', 'Emiliano Martínez', 'Rodrigo Bentancur', 'Federico Valverde', 'Agustín Canobbio', 'Juan Manuel Sanabria', 'Giorgian De Arrascaeta', 'Nicolás De La Cruz', 'Rodrigo Zalazar', 'Facundo Pellistri', 'Maximiliano Araújo', 'Brian Rodríguez'] },
                { pos: 'Delanteros', count: '03', jugadores: ['Rodrigo Aguirre', 'Federico Viñas', 'Darwin Núñez'] }
            ];

            const rosterHTML = plantilla.map(grupo => `
                <div class="relative pl-5 md:pl-0 md:grid md:grid-cols-[220px_1fr] gap-8 items-start border-t border-zinc-800/60 py-8 hover:bg-zinc-900/10 transition-colors">
                    <div class="absolute left-0 top-8 bottom-8 w-[2px] bg-zinc-800 md:hidden"></div>
                    
                    <div class="mb-5 md:mb-0">
                        <span class="block font-teko text-3xl md:text-4xl text-zinc-100 tracking-widest uppercase leading-none">${grupo.pos}</span>
                        <span class="font-mono text-[10px] text-zinc-500 tracking-[0.2em] uppercase mt-2 block">Seleccionados: ${grupo.count}</span>
                    </div>
                    
                    <ul class="columns-1 sm:columns-2 lg:columns-3 gap-8 text-zinc-400 font-playfair text-lg md:text-xl leading-relaxed">
                        ${grupo.jugadores.map(jugador => `
                            <li class="break-inside-avoid flex items-center gap-3 mb-2 border-b border-zinc-800/30 pb-1">
                                <span class="w-1.5 h-1.5 bg-zinc-700 rotate-45 shrink-0"></span>
                                <span class="text-zinc-300 hover:text-white transition-colors cursor-default">${jugador}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            `).join('');

            return `
                <p class="mb-6 font-playfair text-xl leading-loose text-zinc-300 first-letter:float-left first-letter:text-6xl first-letter:pr-3 first-letter:font-playfair first-letter:font-black first-letter:text-black-100 first-letter:leading-[0.8] mt-2">
                    La historia de Uruguay en los Mundiales es ampliamente reconocida: forma parte del selecto grupo de naciones que ha levantado el trofeo en más de una ocasión. Sin embargo, disputar el torneo de manera constante es un logro reciente para la Celeste, que por primera vez consigue clasificar a cinco ediciones consecutivas del campeonato. </p>

                <p class="mb-12 font-playfair text-xl leading-loose text-zinc-300">
                    El domingo 31 de mayo, Uruguay presentó su nómina de convocados para el Mundial 2026. Marcelo Bielsa optó por solo tres atacantes, con Darwin Núñez como principal referencia ofensiva. Llama la atención la inclusión de Joaquín Piquerez, a quien muchos daban por descartado tras una lesión en el tobillo. Federico Valverde se erige como el gran referente de esta generación. </p>

                <div class="my-16">
                    <div class="mb-8 border-b-2 pb-4">
                        <h3 class="font-playfair text-4xl md:text-5xl text-zinc-100 font-bold italic tracking-tight">Roster Oficial</h3>
                        <p class="text-zinc-500 font-sans text-xs uppercase tracking-widest mt-2">Convocatoria definitiva — Marcelo Bielsa</p>
                    </div>
                    
                    <div class="flex flex-col border-b border-zinc-800/60">
                        ${rosterHTML}
                    </div>
                </div>

                <p class="mt-12 text-xl leading-loose text-zinc-300 p-8 border border-zinc-800 bg-zinc-900/20 rounded-2xl text-center italic">
                    Uruguay llega al Mundial 2026 con la ilusión de volver a protagonizar una gran actuación. La Celeste integrará el Grupo D junto a Francia, Canadá y Senegal. La experiencia defensiva sumada a la calidad de Valverde en el mediocampo serán las grandes armas de Bielsa para buscar superar las expectativas. </p>
            `;
        })()
    },
    /* NOTICIA NÚMERO 20 */
    {
        id: 20,
        slug: 'francia-vence-senegal-debut-mundial-2026',
        categoria: 'Resultados',
        titulo: 'FRANCIA REAFIRMA SU CANDIDATURA A FAVORITA CON VICTORIA EN SU DEBUT',
        resumen: 'Los dirigidos por Didier Deschamps vencieron 3-1 a Senegal en Nueva York con un doblete de Mbappé y un gol de Barcola. El francés quedó a solo dos tantos del récord histórico de Klose en Mundiales.',
        imagen: '/news-img/Francia-Senegal.webp',
        fecha: '16 Junio 2026',
        contenido: (() => {
            return `
                <p class="mb-6 font-playfair text-xl leading-loose text-zinc-300 first-letter:float-left first-letter:text-6xl first-letter:pr-3 first-letter:font-playfair first-letter:font-black first-letter:text-black-100 first-letter:leading-[0.8] mt-2">
                    De la Selección de Francia, con una delantera que impacta, se esperan muchos goles en este Mundial 2026. Y a pesar de un flojo comienzo ante Senegal, sin alguna oportunidad clara en la primera parte, terminó con tres goles y una victoria clara en Nueva York en su debut.</p>

                <p class="mb-10 font-playfair text-xl leading-loose text-zinc-300">
                    El equipo de Didier Deschamps se impuso por dos goles de Kylian Mbappé, que quedó a solo dos tantos del récord de goles en la historia de los Mundiales (los 16 de Miroslav Klose), y por la gran actuación de Michael Olise en la segunda mitad, cuando se acomodó como el conductor del equipo por el centro del campo en vez de jugar sobre la banda derecha. Bradley Barcola, que ingresó para los 10 minutos finales, convirtió el gol restante.</p>

                <p class="mb-10 font-playfair text-xl leading-loose text-zinc-300">
                    Los senegaleses se pueden haber ilusionado durante los 45 minutos iniciales con repetir su hazaña del Mundial 2002 ante Francia, que esta vez no hubiera sido tan sorprendente por tener varios jugadores de jerarquía en su equipo. Sin embargo, el poste no colaboró en un remate de Nicolas Jackson, Ismaïla Sarr desaprovechó una chance clara y en la segunda parte fueron superados con claridad por los galos.</p>

                <div class="p-6 my-10 bg-white/5 border border-white/10 rounded-2xl">
                    <h4 class="font-teko text-2xl text-zinc-100 tracking-widest uppercase mb-6 text-center">Resultado Final</h4>
                    <div class="grid grid-cols-4 gap-2 text-center mb-4">
                        <span class="text-zinc-500 text-xs uppercase tracking-widest font-sans"></span>
                        <span class="text-zinc-500 text-xs uppercase tracking-widest font-sans">1T</span>
                        <span class="text-zinc-500 text-xs uppercase tracking-widest font-sans">2T</span>
                        <span class="text-zinc-500 text-xs uppercase tracking-widest font-sans">Res.</span>
                    </div>
                    <div class="grid grid-cols-4 gap-2 text-center items-center py-2 border-b border-white/5">
                        <span class="text-zinc-100 font-medium text-left">Francia</span>
                        <span class="text-zinc-300 font-teko text-xl">1</span>
                        <span class="text-zinc-300 font-teko text-xl">2</span>
                        <span class="text-emerald-400 font-teko text-2xl font-bold">3</span>
                    </div>
                    <div class="grid grid-cols-4 gap-2 text-center items-center py-2">
                        <span class="text-zinc-100 font-medium text-left">Senegal</span>
                        <span class="text-zinc-300 font-teko text-xl">0</span>
                        <span class="text-zinc-300 font-teko text-xl">1</span>
                        <span class="text-zinc-300 font-teko text-2xl">1</span>
                    </div>
                </div>

                <div class="p-6 my-10 bg-white/5 border border-white/10 rounded-2xl">
                    <h4 class="font-teko text-2xl text-zinc-100 tracking-widest uppercase mb-4">Goles del Partido</h4>
                    <div class="flex flex-col gap-2">
                        ${[
                            ['FRA', 'Kylian Mbappé', "66'"],
                            ['FRA', 'Bradley Barcola', "82'"],
                            ['SEN', 'Ibrahim Mbaye', "90+5'"],
                            ['FRA', 'Kylian Mbappé', "90+6'"],
                        ].map(([eq, jugador, min]) => `
                            <div class="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                                <span class="text-emerald-400 font-sans text-xs font-bold tracking-widest w-12 shrink-0">${eq}</span>
                                <span class="text-zinc-300 font-sans text-sm font-medium flex-1">${jugador}</span>
                                <span class="text-zinc-100 font-teko text-lg tabular-nums">${min}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <h3 class="font-teko text-3xl md:text-4xl text-white mb-6 tracking-wide mt-12">CÓMO SE VIVIÓ EL PARTIDO</h3>

                <p class="mb-10 font-playfair text-xl leading-loose text-zinc-300">
                    Francia, con una generación que se ilusiona con llegar a su tercera final consecutiva, empezó el Mundial 2026 frente a Senegal en Nueva York. Los dirigidos por Didier Deschamps quieren tomarse revancha de la derrota contra Argentina en Qatar 2022 y empezar con el pie derecho era clave.</p>

                <p class="mb-10 font-playfair text-xl leading-loose text-zinc-300">
                    Los senegaleses no partían como favoritos, aunque se aferraban al antecedente mundialista de 2002, cuando vencieron 1-0 a los franceses en Corea-Japón con gol de Papa Bouba Diop. Esta vez no hubo sorpresa y Francia se llevó los tres puntos.</p>

                <p class="mb-10 font-playfair text-xl leading-loose text-zinc-300">
                    El primer tiempo terminó sin goles pero no faltaron emociones, sobre todo de parte de los africanos, que tuvieron las oportunidades más claras: Nicolas Jackson destrozó el palo, mientras que Ismaïla Sarr se perdió el 1-0 en la última jugada. El subcampeón del mundo no mostraba reacción.</p>

                <blockquote class="relative p-8 my-10 bg-gradient-to-br from-emerald-900/20 to-transparent border-l-4 border-emerald-500 rounded-r-2xl">
                    <svg class="absolute top-4 left-4 w-8 h-8 text-emerald-500/20" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true"><path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"></path></svg>
                    <p class="relative z-10 text-xl md:text-2xl font-light text-zinc-100 italic leading-relaxed pl-6">
                        Didier Deschamps hizo un cambio táctico clave en el segundo tiempo, ubicando a Michael Olise detrás de Kylian Mbappé. La decisión dio frutos casi de inmediato.
                    </p>
                    <footer class="mt-4 pl-6 text-sm text-emerald-400 font-semibold tracking-widest uppercase">— Jugada clave del partido</footer>
                </blockquote>

                <p class="mb-10 font-playfair text-xl leading-loose text-zinc-300">
                    El cambio dio frutos: el centrodelantero marcó el 1-0 a pase del atacante del Bayern Múnich. El cooling break le vino bien a Senegal, que mostró tener armas para lastimar (le anularon un gol por fuera de juego). A los 82 minutos, ingresado en lugar de Ousmane Dembélé, Bradley Barcola marcó el 2-0. Senegal descontó por medio de Ibrahim Mbaye a los 90+5, pero Mbappé volvió a estirar diferencias para el 3-1 final.</p>

                <p class="mt-12 text-xl leading-loose text-zinc-300 p-8 border border-zinc-800 bg-zinc-900/20 rounded-2xl text-center italic font-playfair">
                    Francia volverá a jugar el 22 de junio ante Irak en Filadelfia, mientras que Senegal lo hará el mismo día en un partido clave ante Noruega, de nuevo en Nueva York.</p>
            `
        })()
    },
    /* NOTICIA NÚMERO 21 */
    {
    id: 21,
    slug: 'convocados-paraguay-mundial-2026',
    categoria: 'Convocatorias',
    titulo: 'LOS 26 CONVOCADOS DE PARAGUAY PARA EL MUNDIAL 2026',
    resumen: 'Con líderes cargados de experiencia como Gustavo Gómez y Miguel Almirón, más una interesante generación de talentos del calibre de Diego Gómez y Julio Enciso, la Albirroja parece lista para dar más de una sorpresa en la Copa del Mundo 2026.',
    imagen: '/news-img/ParaguayConvocados.webp',
    fecha: '1 Junio 2026',
    contenido: (() => {
        const plantilla = [
            { pos: 'Arqueros', count: '03', jugadores: ['Orlando Gill', 'Roberto Junior Fernández', 'Gastón Oliveira'] },
            { pos: 'Defensores', count: '08', jugadores: ['Juan Cáceres', 'Gustavo Velázquez', 'Gustavo Gómez', 'Junior Alonso', 'José Canale', 'Omar Alderete', 'Alexandro Maidana', 'Fabián Balbuena'] },
            { pos: 'Mediocampistas', count: '08', jugadores: ['Diego Gómez', 'Mauricio Magalhães', 'Damián Bobadilla', 'Braian Ojeda', 'Andrés Cubas', 'Matías Galarza Fonda', 'Alejandro Romero Gamarra'] },
            { pos: 'Delanteros', count: '07', jugadores: ['Gustavo Caballero', 'Ramón Sosa', 'Alex Arce', 'Isidro Pitta', 'Gabriel Ávalos', 'Miguel Almirón', 'Julio Enciso', 'Antonio Sanabria'] }
        ];

        const rosterHTML = plantilla.map(grupo => `
            <div class="relative pl-5 md:pl-0 md:grid md:grid-cols-[220px_1fr] gap-8 items-start border-t border-zinc-800/60 py-8 hover:bg-zinc-900/10 transition-colors">
                <div class="absolute left-0 top-8 bottom-8 w-[2px] bg-zinc-800 md:hidden"></div>
                
                <div class="mb-5 md:mb-0">
                    <span class="block font-teko text-3xl md:text-4xl text-zinc-100 tracking-widest uppercase leading-none">${grupo.pos}</span>
                    <span class="font-mono text-[10px] text-zinc-500 tracking-[0.2em] uppercase mt-2 block">Seleccionados: ${grupo.count}</span>
                </div>
                
                <ul class="columns-1 sm:columns-2 lg:columns-3 gap-8 text-zinc-400 font-playfair text-lg md:text-xl leading-relaxed">
                    ${grupo.jugadores.map(jugador => `
                        <li class="break-inside-avoid flex items-center gap-3 mb-2 border-b border-zinc-800/30 pb-1">
                            <span class="w-1.5 h-1.5 bg-zinc-700 rotate-45 shrink-0"></span>
                            <span class="text-zinc-300 hover:text-white transition-colors cursor-default">${jugador}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `).join('');

        return `
            <p class="mb-6 font-playfair text-xl leading-loose text-zinc-300 first-letter:float-left first-letter:text-6xl first-letter:pr-3 first-letter:font-playfair first-letter:font-black first-letter:text-black-100 first-letter:leading-[0.8] mt-2">
                Con líderes cargados de experiencia como Gustavo Gómez y Miguel Almirón, más una interesante generación de talentos del calibre de Diego Gómez y Julio Enciso, la Selección de Paraguay parece lista para dar más de una sorpresa en la Copa del Mundo 2026, y el desafío será grande después del sorteo. </p>

            <p class="mb-12 font-playfair text-xl leading-loose text-zinc-300">
                Y es que el conjunto de Alfaro cayó en el Grupo D junto con uno de los anfitriones, Estados Unidos, Australia y Turquía. </p>

            <div class="my-16">
                <div class="mb-8 border-b-2 pb-4">
                    <h3 class="font-playfair text-4xl md:text-5xl text-zinc-100 font-bold italic tracking-tight">Roster Oficial</h3>
                    <p class="text-zinc-500 font-sans text-xs uppercase tracking-widest mt-2">Convocatoria definitiva — Gustavo Alfaro</p>
                </div>
                
                <div class="flex flex-col border-b border-zinc-800/60">
                    ${rosterHTML}
                </div>
            </div>

            <p class="mt-12 text-xl leading-loose text-zinc-300 p-8 border border-zinc-800 bg-zinc-900/20 rounded-2xl text-center italic">
            El domingo 31 de mayo, a horas de que se entregue la lista definitiva para el Mundial 2026, se conoció que Gustavo Alfaro le comunicó a Adam Bareiro que no irá a la Copa del Mundo. El delantero de Boca Juniors peleaba por un lugar entre los 26 convocados. La lista definitiva se entregó el lunes 1 de junio. La Albirroja integrará el Grupo D junto a Estados Unidos, Australia y Turquía. </p>
            `;
        })()
    }
]