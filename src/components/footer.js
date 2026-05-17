export function renderFooter(){
    const footer = document.createElement('div')
    footer.className = 'footer-information'
    footer.innerHTML = /*HTML*/`
    <!-- CONTENIDO PRINCIPAL -->
    <footer class="bg-[#0b1220] text-gray-400 mt-20 border-t border-gray-800">

    <!-- CONTENIDO PRINCIPAL -->
    <div class="max-w-7xl mx-auto px-10 py-14">
    <!-- Cantiadad de columnas que tendra el Footer -->
        <div class="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1fr_1fr] gap-15">

            <!-- Parte izquierda = LOGO + DESCRIPCIÓN -->
            <div class="flex flex-col gap-4">
                <div class="flex items-center gap-1">
                    <img 
                        class="w-12"
                        src="/src/assets/icons/WorldCup-logo.png" 
                        alt="World Cup 2026"
                    >
                    <div>
                        <h2 class="text-white font-bold text-xl">
                            World Cup 2026
                        </h2>

                        <p class="text-sm text-gray-500">
                            Mundial 2026
                        </p>
                    </div>
                </div>
                <p class="text-sm leading-relaxed text-gray-500">
                    Plataforma con horarios, resultados, grupos,
                    estadísticas y noticias del Mundial 2026.
                </p>
            </div>

            <!-- NAVEGACIÓN -->
            <div class="flex flex-col gap-3">
                <h4 class="text-white font-semibold text-sm uppercase tracking-wider">
                    Navegación
                </h4>

                <a href="" class="w-fit hover:text-white transition-colors text-sm">
                    Fixture
                </a>

                <a href="" class="w-fit hover:text-white transition-colors text-sm">
                    Resultados
                </a>

                <a href="" class="w-fit hover:text-white transition-colors text-sm">
                    Grupos
                </a>

                <a href="" class="w-fit hover:text-white transition-colors text-sm">
                    Estadísticas
                </a>
            </div>

            <!-- INFORMACIÓN -->
            <div class="flex flex-col gap-3">
                <h4 class="text-white font-semibold text-sm uppercase tracking-wider">
                    Información
                </h4>

                <a href="" class="w-fit hover:text-white transition-colors text-sm">
                    Estadios
                </a>

                <a href="" class="w-fit hover:text-white transition-colors text-sm">
                    Noticias
                </a>

                <a href="" class="w-fit hover:text-white transition-colors text-sm">
                    Clima
                </a>

                <a href="" class="w-fit hover:text-white transition-colors text-sm">
                    Acerca de
                </a>
            </div>

            <!-- INFORMACIÓN -->
            <div class="flex flex-col gap-3">
                <h4 class="text-white font-semibold text-sm uppercase tracking-wider">
                    Información
                </h4>

                <a href="" class="w-fit hover:text-white transition-colors text-sm">
                    Estadios
                </a>

                <a href="" class="w-fit hover:text-white transition-colors text-sm">
                    Noticias
                </a>

                <a href="" class="w-fit hover:text-white transition-colors text-sm">
                    Clima
                </a>

                <a href="" class="w-fit hover:text-white transition-colors text-sm">
                    Acerca de
                </a>
            </div>

            <!-- REDES -->
            <div class="flex flex-col gap-4">
                <h4 class="text-white font-semibold text-sm uppercase tracking-wider">
                    Síguenos
                </h4>

                <div class="flex items-center gap-4">

                    <a href="#" class="hover:opacity-80 transition-opacity">
                        <img 
                            class="w-20 opacity-70 hover:opacity-100 transition"
                            src="/src/assets/icons/Red-X.png"
                            alt="X"
                        >
                    </a>

                    <a href="#" class="hover:opacity-80 transition-opacity">
                        <img 
                            class="w-20 opacity-70 hover:opacity-100 transition"
                            src="/src/assets/icons/Red-IG.png"
                            alt="Instagram"
                        >
                    </a>

                    <a href="#" class="hover:opacity-80 transition-opacity">
                        <img 
                            class="w-20 opacity-70 hover:opacity-100 transition"
                            src="/src/assets/icons/Red-TT.png"
                            alt="TikTok"
                        >
                    </a>
                </div>

                <p class="text-sm text-gray-500 leading-relaxed">
                    Sigue toda la información del Mundial
                    desde cualquier dispositivo.
                </p>

            </div>

        </div>

    </div>

    <!-- COPYRIGHT -->
    <div class="border-t border-gray-800">

        <div class="max-w-7xl mx-auto px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-4">

            <p class="text-sm text-gray-500">
                © 2026 Cup2026 — Todos los derechos reservados
            </p>

            <div class="flex items-center gap-6 text-sm">

                <a href="" class="w-fit hover:text-white transition-colors">
                    Privacidad
                </a>

                <a href="" class="w-fit hover:text-white transition-colors">
                    Términos
                </a>

                <a href="" class="w-fit hover:text-white transition-colors">
                    Cookies
                </a>

            </div>

        </div>

    </div>

</footer>
`
return footer
}