import sharp from 'sharp'
import { readdirSync, existsSync } from 'fs'
import { join, extname, basename } from 'path'

// Carpeta donde están tus imágenes de noticias
const INPUT_DIR  = 'public/news-img'
// Calidad WebP (80 = muy buena calidad, archivo pequeño)
// Súbelo a 90 si notas pérdida de calidad, bájalo a 70 para más compresión
const QUALITY = 80

const EXTENSIONES = ['.jpg', '.jpeg', '.png', '.avif']

const archivos = readdirSync(INPUT_DIR).filter(f =>
    EXTENSIONES.includes(extname(f).toLowerCase())
)

if (!archivos.length) {
    console.log('No hay imágenes para convertir.')
    process.exit(0)
}

console.log(`Encontradas ${archivos.length} imágenes. Convirtiendo...\n`)

let ok = 0, skip = 0

for (const archivo of archivos) {
    const inputPath  = join(INPUT_DIR, archivo)
    const outputName = basename(archivo, extname(archivo)) + '.webp'
    const outputPath = join(INPUT_DIR, outputName)

    // Si ya existe el .webp, no lo sobreescribe (ahorra tiempo)
    if (existsSync(outputPath)) {
        console.log(`⏭  Ya existe: ${outputName}`)
        skip++
        continue
    }

    try {
        await sharp(inputPath).webp({ quality: QUALITY }).toFile(outputPath)
        console.log(`✅ Convertido: ${archivo} → ${outputName}`)
        ok++
    } catch (err) {
        console.error(`❌ Error con ${archivo}:`, err.message)
    }
}

console.log(`\nListo: ${ok} convertidas, ${skip} ya existían.`)