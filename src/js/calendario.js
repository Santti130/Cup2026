import '../css/main.css'
import { renderNavbar } from '../components/navbar.js'
import { renderFooter } from '../components/footer.js'

document.body.prepend(renderNavbar())
document.body.append(renderFooter())

const main = document.getElementById('main-content')
// Aquí va la lógica del calendario