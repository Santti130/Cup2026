import './css/main.css'
import { renderNavbar } from './components/navbar.js'
import { renderCountdown } from './components/countdown.js'
import { renderFooter } from './components/footer.js'

// Inserta Navbar al inicio del Body
document.body.prepend(renderNavbar()) 

// Inserta contenido en el medio del Main
const main = document.getElementById('main-content')
main.append(renderCountdown())


// Inserta Footer al final del Body
document.body.append(renderFooter()) /*Inserta el footer al final del body*/