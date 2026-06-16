export const noticias = [
    /* NOTICIA NÚMERO 1 */
    {
        id: 1, 
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
    /* NOTICIA NÚMERO 2 */
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
    /* NOTICIA NÚMERO 3 */
    {
        id: 3,
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
    /* NOTICIA NÚMERO 4 */
    {
        id: 4,
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
    /* NOTICIA NÚMERO 5 */
    {
    id: 5,
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
    /* NOTICIA NÚMERO 6 */
    {
    id: 6,
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
        destacada: true,
        slug: 'cabo-verde-empate-historico-espana-mundial-2026',
        categoria: 'Actualidad',
        titulo: 'CABO VERDE HACE HISTORIA: EMPATE LEGENDARIO ANTE ESPAÑA EN SU DEBUT MUNDIALISTA',
        resumen: 'Los Tiburones Azules igualaron 0-0 ante la vigente campeona de Europa en su primer partido en la historia de una Copa del Mundo. Vozinha, figura del partido.',
        imagen: '/news-img/VozinhaEmpate.webp',
        fecha: '15 Junio 2026',
        contenido: (() => {
            return `
                <p class="mb-6 font-playfair text-xl leading-loose text-zinc-300 first-letter:float-left first-letter:text-6xl first-letter:pr-3 first-letter:font-playfair first-letter:font-black first-letter:text-zinc-100 first-letter:leading-[0.8] mt-2">
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
    }

]