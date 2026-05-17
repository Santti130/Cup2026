import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite' /*Importa el plugin*/

export default defineConfig({ /*Funcion que usa Vite para recibir la configuración*/
  plugins: [ /*Le indica a Vite que use Tailwind que procese los archivos*/
    tailwindcss(),
  ],
})