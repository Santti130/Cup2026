import './css/main.css'

import { renderNavbar } from './components/navbar.js'
import { renderCountdown } from './components/countdown.js'
import { renderFooter } from './components/footer.js'
import { renderCalendar } from './components/calendar.js'

// Vercel Analytics
// import { inject } from '@vercel/analytics'

// if (import.meta.env.PROD) {
//     inject()
// }

// Navbar
document.body.prepend(renderNavbar())

// Main
const main = document.getElementById('main-content')

// Detectar página actual
const path = window.location.pathname
// HOME COUNTDOWN
if (
    path === '/' ||
    path.includes('index.html')
) {
    main.append(renderCountdown())
}
// CALENDARIO
if (
    path.includes('calendario')
) {
    main.append(renderCalendar())
}

// Footer
document.body.append(renderFooter())