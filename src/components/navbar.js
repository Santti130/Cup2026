export function renderNavbar() {
  const nav = document.createElement('nav')
  nav.className = 'bg-black text-white'
  nav.innerHTML = /*html*/`
    <div class="flex items-center p-2">

      <!-- ZONA IZQUIERDA -->
      <div class="w-1/3"></div>

      <!-- ZONA CENTRO -->
      <div class="flex items-center justify-center gap-6 w-1/3">
        <a href="" class="hover:text-gray-300">Inicio</a>
        <a href="" class="hover:text-gray-300">Partidos</a>
        <a href="#">
          <img class="w-12" src="/src/assets/icons/WorldCup-logo.png" alt="LogoPrincipal">
        </a>
        <a href="" class="hover:text-gray-300">Estadios</a>
        <a href="" class="hover:text-gray-300">Noticias</a>
      </div>

      <!-- ZONA DERECHA -->
      <div class="flex items-center justify-end gap-0 w-1/3">
        <a href="#">
          <img class="w-12" src="/src/assets/icons/login-provisional.png" alt="login">
        </a>
        <a href="#">
          <img class="w-12" src="/src/assets/icons/login-provisional.png" alt="notlogin">
        </a>
      </div>

    </div>
  `
  return nav
}