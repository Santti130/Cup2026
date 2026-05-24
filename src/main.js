import './css/main.css'
import { renderNavbar } from './components/navbar.js'
import { renderCountdown } from './components/countdown.js'
import { renderFooter } from './components/footer.js'
// import { renderGroups } from './components/groups.js'
// import { renderMatchCards } from './components/match-card.js'

// Vercel Analytics
import { inject } from '@vercel/analytics'
if (import.meta.env.PROD) { // Solo ejecuta en producción, no en local
    inject()
}

// Inserta Navbar al inicio del Body
document.body.prepend(renderNavbar()) 

// Inserta contenido en el medio del Main
const main = document.getElementById('main-content')
main.append(renderCountdown())
// main.append(renderMatchCards())
// main.append(renderGroups())

// Inserta Footer al final del Body
document.body.append(renderFooter())