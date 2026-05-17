import './css/main.css'
import { renderNavbar } from './components/navbar.js'
import { renderFooter } from './components/footer.js'

document.body.prepend(renderNavbar()) /*Inserta el nav al inicio del body*/
document.body.append(renderFooter()) /*Inserta el footer al final del body*/