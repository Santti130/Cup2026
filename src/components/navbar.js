export function renderNavbar() {
  const nav = document.createElement('nav')
  nav.className = 'bg-black/90 text-white fixed top-0 left-0 right-0 z-50'
  nav.innerHTML = /*html*/`
    <div class="flex items-center p-2">

        <!-- ZONA IZQUIERDA — oculta en móvil -->
        <div class="hidden xl:block w-1/3"></div>

        <!-- ZONA CENTRO -->
        <div class="flex items-center justify-center gap-4 xl:gap-6 w-full xl:w-1/3 font-teko font-medium text-sm">
            <a href="/index.html" class="transition-colors duration-300 hover:text-gray-400">INICIO</a>
            <a href="/index.html">
                <img class="w-8 xl:w-12" src="/icons/WorldCup-logo.png" alt="LogoPrincipal">
            </a>
            <a href="/pages/calendario.html" class="transition-colors duration-300 hover:text-gray-400">CALENDARIO</a>
        </div>

        <!-- ZONA DERECHA — oculta en móvil -->
        <div class="hidden xl:block w-1/3"></div>
    </div>
  `
  return nav
}