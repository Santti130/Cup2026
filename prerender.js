// prerender.js — genera HTML estático por cada noticia en el build
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Leer el HTML base de noticias
const baseHTML = readFileSync(join(__dirname, 'src/pages/noticias.html'), 'utf-8')

// Importar noticias dinámicamente
const { noticias } = await import('./src/data/noticias.js')

// Por cada noticia generar su HTML estático
for (const noticia of noticias) {
    const dir = join(__dirname, `dist/noticias/${noticia.slug}`)
    
    // Crear carpeta si no existe
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true })

    // Personalizar el HTML con los meta tags de esta noticia
    let html = baseHTML
        .replace(/<title>.*?<\/title>/, `<title>${noticia.titulo} — Noticias Mundial 2026 | CupHub</title>`)
        .replace(
            /<meta name="description".*?>/,
            `<meta name="description" content="${noticia.resumen}">`
        )
        .replace(
            /<meta property="og:title".*?>/,
            `<meta property="og:title" content="${noticia.titulo}">`
        )
        .replace(
            /<meta property="og:description".*?>/,
            `<meta property="og:description" content="${noticia.resumen}">`
        )
        .replace(
            /<meta property="og:image".*?>/,
            `<meta property="og:image" content="https://cuphub-gamma.vercel.app${noticia.imagen}">`
        )

    writeFileSync(join(dir, 'index.html'), html, 'utf-8')
    console.log(`✅ Generado: /noticias/${noticia.slug}`)
}

console.log(`\n🎉 Prerender completo — ${noticias.length} noticias generadas`)