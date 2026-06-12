import './css/main.css'

import { renderNavbar } from './components/navbar.js'
import { renderCountdown } from './components/countdown.js'
import { renderFooter } from './components/footer.js'
import { inicializarCalendario } from './components/calendar.js'
import { renderNews } from './components/news.js'
import { renderSeccionGrupos } from './components/groups.js'


// Favicon adaptable a modo claro/oscuro
const faviconLink = document.querySelector('link[rel="icon"]')
const darkMode = window.matchMedia('(prefers-color-scheme: dark)')

function updateFavicon() {
    if (faviconLink) {
        faviconLink.href = darkMode.matches ? '/favicon-dark.png' : '/favicon-light.png'
    }
}

updateFavicon()
darkMode.addEventListener('change', updateFavicon)

// Navbar
document.body.prepend(renderNavbar())

// Main
const main = document.getElementById('main-content')

// Detectar página actual
const path = window.location.pathname

if (path === '/' || path.includes('index.html')) {
    main.append(renderCountdown())
}

if (path.includes('calendario')) {
    inicializarCalendario(main)
}

if (path.includes('grupos')) {
    main.append(renderSeccionGrupos())
}

if (path.includes('noticias')) {
    main.append(renderNews())
}

// Footer
document.body.append(renderFooter())