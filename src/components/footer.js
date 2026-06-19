export function renderFooter(){
    const footer = document.createElement('div')
    footer.className = 'footer-information'
    footer.innerHTML = /*HTML*/`
    <!-- FOOTER COMPLETO -->
    <footer class="bg-[#0b1220] text-gray-400">

    <!-- COLUMNAS DEL FOOTER -->
    <div class="max-w-7xl mx-auto px-10 py-14">
    <!-- Cantiadad de columnas que tendra el Footer -->
        <div class="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr] gap-15">

            <!-- Parte izquierda = LOGO + DESCRIPCIÓN -->
            <div class="flex flex-col gap-4 max-w-[340px]">
                <div class="flex items-center gap-1">
                    <img class="w-12" src="/icons/WorldCup-logo.png" alt="World Cup 2026">
                    <div>
                        <h2 class="text-white font-bold text-xl">
                            Copa Mundial de la FIFA 2026
                        </h2>
                        <p class="text-sm text-gray-500 italic">
                            "Live the World Cup 2026"
                        </p>
                    </div>
                </div>
                <p class="text-sm leading-relaxed text-gray-500 ">
                Plataforma con horarios, resultados, grupos, estadísticas y noticias del Mundial 2026.
                </p>
            </div>


            <!-- COLUMNAS -->
            
            <!-- INFORMACIÓN -->
            <div class="flex flex-col gap-3">
                <h4 class="text-white font-semibold text-sm uppercase tracking-wider">Información</h4>
                <a href="/acerca" class="w-fit hover:text-white transition-colors text-sm">Acerca de</a>
                <a href="" class="w-fit hover:text-white transition-colors text-sm">Contacto</a>
                <a href="" class="w-fit hover:text-white transition-colors text-sm">Publicidad</a>
            </div> 

            <!-- INFORMACIÓN
            <div class="flex flex-col gap-3">
                <h4 class="text-white font-semibold text-sm uppercase tracking-wider">Información</h4>
                <a href="" class="w-fit hover:text-white transition-colors text-sm">Estadios</a>
                <a href="" class="w-fit hover:text-white transition-colors text-sm">Noticias</a>
                <a href="" class="w-fit hover:text-white transition-colors text-sm">Clima</a>
                <a href="" class="w-fit hover:text-white transition-colors text-sm">Acerca de</a>
            </div>-->
            

            <!-- REDES -->
            <div class="flex flex-col gap-4">
                <h4 class="text-white font-bold text-base uppercase tracking-wider">
                    Síguenos
                </h4>

                <div class="flex items-center gap-4 max-w-xs">
                    <a href="#" class="hover:opacity-80 transition-opacity">
                        <img class="w-20 opacity-70 hover:opacity-100 transition" src="/icons/Red-X.png"alt="X">
                    </a>
                    <a href="https://www.instagram.com/cuphub_stats/" target="_blank" class="hover:opacity-80 transition-opacity">
                        <img class="w-20 opacity-70 hover:opacity-100 transition"src="/icons/Red-IG.png"alt="Instagram">
                    </a>
                    <a href="https://www.tiktok.com/@cuphub_oficial" target="_blank class="hover:opacity-80 transition-opacity">
                        <img class="w-20 opacity-70 hover:opacity-100 transition"src="/icons/Red-TT.png"alt="TikTok">
                    </a>  
                </div>
                <p class="text-sm text-gray-500 leading-relaxed max-w-xs">
                    Muy pronto podrás seguir toda la información del Mundial 2026 a través de nuestras redes sociales.
                </p>
            </div>
        </div>
    </div>

    <!-- COPYRIGHT -->
    <div class="border-t border-gray-800">
        <div class="max-w-7xl mx-auto px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p class="text-sm text-gray-500">© World Cup 2026. Todos los derechos reservados. </br>V.1.0.1</p>
            <div class="flex items-center gap-6 text-sm">
                <a href="/privacidad" class="w-fit hover:text-white transition-colors">Privacidad</a>
                <a href="/terminos" class="w-fit hover:text-white transition-colors">Términos</a>
                <a href="" class="w-fit hover:text-white transition-colors">Cookies</a>
            </div>
        </div>
    </div>

</footer>
`
return footer
}