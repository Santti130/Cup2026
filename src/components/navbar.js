export function renderNavbar() {
  const nav = document.createElement('nav')
  nav.className = 'bg-black/90 text-white fixed top-0 left-0 right-0 z-50'
  nav.innerHTML = /*html*/`
    <div class="flex items-center p-2">

      <!-- ZONA IZQUIERDA -->
      <div class="w-1/3"></div>

      <!-- ZONA CENTRO -->
      <div class="flex items-center justify-center gap-6 w-1/3 font-teko font-medium text-sm">
        <a href="#" class="transition-colors duration-300 hover:text-gray-400">INICIO</a>
        <!-- <a href="/src/pages/calendario.html" class="transition-colors duration-300 hover:text-gray-300">RESULTADOS</a> -->
        <a href="#">
          <img class="w-12" src="/src/assets/icons/WorldCup-logo.png" alt="LogoPrincipal">
        </a>
        <a href="#" class="transition-colors duration-300 hover:text-gray-400">CALENDARIO</a>
        <!-- <a href="#" class="transition-colors duration-300 hover:text-gray-300">NOTICIAS</a> -->
      </div>

      <!-- ZONA DERECHA -->
      <!-- <div class="flex items-center justify-end gap-0 w-1/3">
        <a href="#">
          <img class="w-12" src="/src/assets/icons/login-provisional.png" alt="login">
        </a>
        <a href="#">
          <img class="w-12" src="/src/assets/icons/login-provisional.png" alt="notlogin">
        </a>
      </div> -->

    </div>
  `
  return nav
}