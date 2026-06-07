export function renderNavbar() {
  const nav = document.createElement('nav');

  nav.innerHTML = /*html*/`
    <!-- NAVBAR DESKTOP -->
    <nav class="hidden md:block bg-black/90 text-white fixed top-0 left-0 right-0 z-50 h-8 md:h-10 2xl:h-13">
      <div class="flex items-center justify-center h-full px-4 md:px-6">
        <div class="hidden xl:block w-1/3"></div>
        <div class="flex items-center justify-center gap-2 md:gap-4 xl:gap-6 w-full xl:w-1/3 font-teko font-medium text-xs md:text-sm xl:text-base">
          <!-- <a href="/" class="transition-colors duration-300 hover:text-gray-400">INICIO</a> -->
          <a href="/noticias" class="transition-colors duration-300 hover:text-gray-400">NOTICIAS</a>
          <a href="/">
            <img class="w-8 md:w-10 xl:w-14" src="/icons/CupHubBlanco-logo.png" alt="LogoPrincipal">
          </a>
          <a href="/calendario" class="transition-colors duration-300 hover:text-gray-400">CALENDARIO</a>
        </div>
        <div class="hidden xl:block w-1/3"></div>
      </div>
    </nav>

    <!-- NAVBAR MÓVIL -->
    <nav id="mobile-nav" class="md:hidden fixed bottom-4 left-4 right-4 z-50 flex justify-center">

      <div id="nav-bar" class="w-full bg-black/90 text-white rounded-2xl px-4 py-1 flex items-center justify-between overflow-hidden">
        
        <!-- Lupa -->
        <div id="nav-left" class="flex-shrink-0" style="width: 28px; opacity: 1;">
          <button class="text-white/80 hover:text-white transition-colors flex items-center justify-center w-full h-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>

        <!-- Logo -->
        <div id="nav-logo" class="rounded-full flex-shrink-0">
          <a href="/">
            <img class="w-14" src="/icons/CupHubBlanco-logo.png" alt="LogoPrincipal">
          </a>
        </div>

        <!-- Hamburguesa -->
        <div id="nav-right" class="flex-shrink-0 flex justify-end" style="width: 28px; opacity: 1;">
          <button id="menu-toggle" class="relative w-5 h-5 text-white/80 hover:text-white transition-colors flex items-center justify-center">
              <span id="line1" class="absolute left-0 right-0 h-[2.5px] bg-current rounded-full transition-all duration-300 ease-out" style="transform: translateY(-4px) rotate(0deg);"></span>
              <span id="line2" class="absolute left-0 h-[2.5px] w-[70%] bg-current rounded-full transition-all duration-300 ease-out" style="transform: translateY(4px) rotate(0deg);"></span>
          </button>
        </div>
      </div>

      <!-- Panel de opciones — con transición -->
      <div id="menu-panel" class="absolute bottom-20 left-0 right-0 bg-black/95 rounded-2xl p-4 border border-white/10 backdrop-blur-md transition-all duration-300 ease-out opacity-0 translate-y-4 pointer-events-none">
        <div class="flex flex-col gap-3">
          <a href="/noticias" class="text-white/80 hover:text-white transition-colors font-teko font-medium text-sm py-2 px-3 rounded hover:bg-white/5">
            NOTICIAS
          </a>
          <a href="/calendario" class="text-white/80 hover:text-white transition-colors font-teko font-medium text-sm py-2 px-3 rounded hover:bg-white/5">
            CALENDARIO
          </a>
        </div>
      </div>
    </nav>
  `;

  // ============================================
  // REFERENCIAS
  // ============================================
  const mobileNav  = nav.querySelector('#mobile-nav');
  const navBar     = nav.querySelector('#nav-bar');
  const navLeft    = nav.querySelector('#nav-left');
  const navRight   = nav.querySelector('#nav-right');
  const menuToggle = nav.querySelector('#menu-toggle');
  const menuPanel  = nav.querySelector('#menu-panel');
  const line1      = nav.querySelector('#line1');
  const line2      = nav.querySelector('#line2');

  // ============================================
  // TRANSICIONES BARRA
  // ============================================
  mobileNav.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease-in-out';
  navBar.style.transition    = 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1), padding 0.4s ease-in-out, border-radius 0.4s ease-in-out';
  navLeft.style.transition   = 'width 0.3s ease-in-out, opacity 0.2s ease-in-out';
  navRight.style.transition  = 'width 0.3s ease-in-out, opacity 0.2s ease-in-out';

  // ============================================
  // ESTADO Y VARIABLES DE CONTROL
  // ============================================
  let lastScrollTop  = 0;
  let isCompressed   = false;
  let isHidden       = false;
  let isMenuOpen     = false;
  let animationTimer = null;

  const BOLITA_WIDTH = '56px'; 
  const BARRA_WIDTH  = '100%';

// ============================================
  // MENÚ TOGGLE
  // ============================================
  menuToggle.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;

    if (isMenuOpen) {
      // Abrir — panel sube y aparece
      menuPanel.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none');
      menuPanel.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto');
      // Hamburguesa → X (ambas líneas centradas y mismo ancho)
      line1.style.transform = 'translateY(0) rotate(45deg)';
      line1.style.width = '100%';
      line2.style.transform = 'translateY(0) rotate(-45deg)';
      line2.style.width = '100%';
      line2.style.left = '0';
      line2.style.right = '0';
    } else {
      // Cerrar — panel baja y desaparece
      menuPanel.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
      menuPanel.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
      // X → Hamburguesa (line2 vuelve a ser más corta)
      line1.style.transform = 'translateY(-4px) rotate(0deg)';
      line1.style.width = '100%';
      line2.style.transform = 'translateY(4px) rotate(0deg)';
      line2.style.width = '70%';
      line2.style.right = 'auto';
    }
  });

  // ============================================
  // SCROLL
  // ============================================
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (scrollTop <= 0) return;

    if (scrollTop > lastScrollTop && scrollTop > 80) {
      // ── SCROLL HACIA ABAJO ──
      
      // Cerrar menú si está abierto
      if (isMenuOpen) menuToggle.click();

      if (!isCompressed) {
        isCompressed = true;
        clearTimeout(animationTimer);

        navLeft.style.width   = '0px';
        navLeft.style.opacity = '0';
        navRight.style.width   = '0px';
        navRight.style.opacity = '0';
        
        navBar.style.width        = BOLITA_WIDTH;
        navBar.style.padding      = '12px'; 
        navBar.style.borderRadius = '9999px';

        animationTimer = setTimeout(() => {
          isHidden = true;
          mobileNav.style.transform     = 'translateY(150px)';
          mobileNav.style.opacity       = '0';
          mobileNav.style.pointerEvents = 'none';
        }, 400);
      }

    } else if (scrollTop < lastScrollTop) {
      // ── SCROLL HACIA ARRIBA ──

      if (isHidden || isCompressed) {
        clearTimeout(animationTimer);

        isHidden = false;
        mobileNav.style.transform     = 'translateY(0)';
        mobileNav.style.opacity       = '1';
        mobileNav.style.pointerEvents = 'auto';

        animationTimer = setTimeout(() => {
          isCompressed = false;
          navBar.style.width        = BARRA_WIDTH;
          navBar.style.padding      = '12px 16px';
          navBar.style.borderRadius = '1rem';
          
          navLeft.style.width   = '28px';
          navLeft.style.opacity = '1';
          navRight.style.width   = '28px';
          navRight.style.opacity = '1';
        }, 200);
      }
    }

    lastScrollTop = scrollTop;
  });

  return nav;
}