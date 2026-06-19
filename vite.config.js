import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        calendario: './src/pages/calendario.html',
        noticias: './src/pages/noticias.html',
        grupos: './src/pages/grupos.html',
        privacidad: './src/pages/privacidad.html',
        terminos: './src/pages/terminos.html',
        acerca: './src/pages/acerca.html'
      }
    }
  }
})