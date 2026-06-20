export function renderNavbar() {
  const nav = document.createElement('div');

  nav.innerHTML = /*html*/`
    <!-- NAVBAR DESKTOP -->
    <nav class="hidden md:block bg-black/90 text-white fixed top-0 left-0 right-0 z-50 h-8 md:h-10 2xl:h-12">
      <div class="flex items-center justify-center h-full px-4 md:px-6">
        <div class="hidden xl:block w-1/3"></div>
        <div class="flex items-center justify-center gap-2 md:gap-4 xl:gap-6 w-full xl:w-1/3 font-teko font-medium text-xs md:text-sm xl:text-base">
          <a href="/" class="transition-colors duration-300 hover:text-gray-400">INICIO</a>
          <a href="/noticias" class="transition-colors duration-300 hover:text-gray-400">NOTICIAS</a>
          <a href="/">
            <img class="w-8 md:w-10 xl:w-12" src="/icons/CupHubBlanco-logo.webp" alt="LogoPrincipal">
          </a>
          <a href="/calendario" class="transition-colors duration-300 hover:text-gray-400">CALENDARIO</a>
          <a href="/grupos" class="transition-colors duration-300 hover:text-gray-400">GRUPOS</a>
        </div>
        <div class="hidden xl:block w-1/3"></div>
      </div>
    </nav>

    <!-- NAVBAR MOVIL -->
    <nav id="mobile-nav" class="md:hidden fixed bottom-6 left-4 right-4 z-50 flex justify-center">
      <div id="nav-bar" class="w-full max-w-full bg-black/90 text-white rounded-2xl px-3 py-1 flex items-center justify-between overflow-hidden will-change-transform">
        <div id="nav-left" class="flex-shrink-0 overflow-hidden" style="width: 28px; opacity: 1;">
          <button class="text-white/80 hover:text-white transition-colors flex items-center justify-center w-full h-9" aria-label="Buscar">
            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>

        <div id="nav-logo" class="flex-shrink-0">
          <a href="/" class="flex h-9 w-9 items-center justify-center">
            <img class="w-9 h-9 object-contain" src="/icons/CupHubBlanco-logo.webp" alt="LogoPrincipal">
          </a>
        </div>

        <div id="nav-right" class="flex-shrink-0 flex justify-end overflow-hidden" style="width: 28px; opacity: 1;">
          <button id="menu-toggle" class="relative w-5 h-9 text-white/80 hover:text-white transition-colors flex items-center justify-center" aria-label="Abrir menu" aria-expanded="false">
            <span id="line1" class="absolute left-0 right-0 h-[2.5px] bg-current rounded-full transition-all duration-300 ease-out" style="transform: translateY(-4px) rotate(0deg);"></span>
            <span id="line2" class="absolute left-0 h-[2.5px] w-[70%] bg-current rounded-full transition-all duration-300 ease-out" style="transform: translateY(4px) rotate(0deg);"></span>
          </button>
        </div>
      </div>

      <div id="menu-panel" class="absolute bottom-16 left-0 right-0 bg-black/95 rounded-2xl p-4 border border-white/10 backdrop-blur-md transition-all duration-300 ease-out opacity-0 translate-y-4 pointer-events-none">
        <div class="flex flex-col gap-3">
          <a href="/noticias" class="text-white/80 hover:text-white transition-colors font-teko font-medium text-sm py-2 px-3 rounded hover:bg-white/5">NOTICIAS</a>
          <a href="/calendario" class="text-white/80 hover:text-white transition-colors font-teko font-medium text-sm py-2 px-3 rounded hover:bg-white/5">CALENDARIO</a>
          <a href="/grupos" class="text-white/80 hover:text-white transition-colors font-teko font-medium text-sm py-2 px-3 rounded hover:bg-white/5">GRUPOS</a>
        </div>
      </div>
    </nav>
  `;

  const mobileNav = nav.querySelector('#mobile-nav');
  const navBar = nav.querySelector('#nav-bar');
  const navLeft = nav.querySelector('#nav-left');
  const navRight = nav.querySelector('#nav-right');
  const menuToggle = nav.querySelector('#menu-toggle');
  const menuPanel = nav.querySelector('#menu-panel');
  const line1 = nav.querySelector('#line1');
  const line2 = nav.querySelector('#line2');

  const STORAGE_KEY = 'cuphub-mobile-navbar-state';
  const SCROLL_HIDE_AT = 80;

  let lastScrollTop = window.scrollY || document.documentElement.scrollTop || 0;
  let isCompressed = false;
  let isHidden = false;
  let isMenuOpen = false;
  let animationTimer = null;
  let transitionsEnabled = false;

  function setTransitions(enabled) {
    transitionsEnabled = enabled;

    mobileNav.style.transition = enabled
      ? 'transform 320ms cubic-bezier(0.4, 0, 0.2, 1), opacity 220ms ease'
      : 'none';

    navBar.style.transition = enabled
      ? 'max-width 320ms cubic-bezier(0.4, 0, 0.2, 1), padding 260ms ease, border-radius 160ms ease'
      : 'none';

    navLeft.style.transition = enabled ? 'width 220ms ease, opacity 160ms ease' : 'none';
    navRight.style.transition = enabled ? 'width 220ms ease, opacity 160ms ease' : 'none';
  }

  function saveState() {
    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        isCompressed,
        isHidden,
        scrollTop: window.scrollY || document.documentElement.scrollTop || 0,
      }),
    );
  }

  function setMenu(open) {
    isMenuOpen = open;
    menuToggle.setAttribute('aria-expanded', String(open));

    if (open) {
      menuPanel.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none');
      menuPanel.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto');
      line1.style.transform = 'translateY(0) rotate(45deg)';
      line1.style.width = '100%';
      line2.style.transform = 'translateY(0) rotate(-45deg)';
      line2.style.width = '100%';
      line2.style.left = '0';
      line2.style.right = '0';
      return;
    }

    menuPanel.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
    menuPanel.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
    line1.style.transform = 'translateY(-4px) rotate(0deg)';
    line1.style.width = '100%';
    line2.style.transform = 'translateY(4px) rotate(0deg)';
    line2.style.width = '70%';
    line2.style.left = '0';
    line2.style.right = 'auto';
  }

  function setCompressed(compressed) {
    isCompressed = compressed;

    navLeft.style.width = compressed ? '0px' : '28px';
    navLeft.style.opacity = compressed ? '0' : '1';
    navRight.style.width = compressed ? '0px' : '28px';
    navRight.style.opacity = compressed ? '0' : '1';

    navBar.style.maxWidth = compressed ? '48px' : '100%';
    navBar.style.padding = compressed ? '4px' : '4px 12px';
    navBar.style.borderRadius = compressed ? '9999px' : '1rem';
    navBar.style.margin = compressed ? '0 auto' : '0';

    saveState();
  }

  function setHidden(hidden) {
    isHidden = hidden;

    mobileNav.style.transform = hidden ? 'translateY(130px)' : 'translateY(0)';
    mobileNav.style.opacity = hidden ? '0' : '1';
    mobileNav.style.pointerEvents = hidden ? 'none' : 'auto';

    saveState();
  }

  function restoreInitialState() {
    setTransitions(false);

    const currentScroll = window.scrollY || document.documentElement.scrollTop || 0;
    let savedState = null;

    try {
      savedState = JSON.parse(sessionStorage.getItem(STORAGE_KEY));
    } catch {
      savedState = null;
    }

    if (savedState && currentScroll > SCROLL_HIDE_AT) {
      setCompressed(Boolean(savedState.isCompressed));
      setHidden(Boolean(savedState.isHidden));
    } else {
      setCompressed(false);
      setHidden(false);
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => setTransitions(true));
    });
  }

  menuToggle.addEventListener('click', () => setMenu(!isMenuOpen));

  window.addEventListener(
    'scroll',
    () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
      const scrollingDown = scrollTop > lastScrollTop;
      const scrollingUp = scrollTop < lastScrollTop;

      clearTimeout(animationTimer);

      if (scrollTop <= 0) {
        setHidden(false);
        setCompressed(false);
        lastScrollTop = 0;
        return;
      }

      if (scrollingDown && scrollTop > SCROLL_HIDE_AT) {
        if (isMenuOpen) setMenu(false);

        if (!isCompressed) setCompressed(true);

        animationTimer = setTimeout(() => {
          if (transitionsEnabled) setHidden(true);
        }, 320);
      }

      if (scrollingUp) {
        setHidden(false);

        animationTimer = setTimeout(() => {
          setCompressed(false);
        }, isHidden ? 180 : 0);
      }

      lastScrollTop = Math.max(scrollTop, 0);
    },
    { passive: true },
  );

  window.addEventListener('beforeunload', saveState);

  restoreInitialState();

  return nav;
}