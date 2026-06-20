// scripts/optimize-images.js
// Convierte imágenes a WebP y las redimensiona a un ancho máximo según la carpeta.
// NO sobreescribe los .webp ya existentes. Mantiene los originales como respaldo.
// Uso: npm run optimize-images

import sharp from 'sharp'
import { readdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

const QUALITY = 80

// Carpetas a procesar con su ancho máximo (en px).
// Los íconos se ven a ~80px, así que 240px cubre pantallas retina 3x de sobra.
// Las noticias y fondos necesitan más resolución.
const CARPETAS = [
    { ruta: 'public/icons',    maxWidth: 240 },
    { ruta: 'public/news-img', maxWidth: 1200 },
    { ruta: 'public/img',      maxWidth: 1920 },
]

const EXTENSIONES = ['.jpg', '.jpeg', '.png', '.avif']

async function procesarCarpeta({ ruta, maxWidth }) {
    if (!existsSync(ruta)) {
        console.log(`⏭️  Carpeta no encontrada (se omite): ${ruta}`)
        return { convertidas: 0, omitidas: 0 }
    }

    const archivos = await readdir(ruta)
    let convertidas = 0
    let omitidas = 0

    for (const archivo of archivos) {
        const ext = path.extname(archivo).toLowerCase()
        if (!EXTENSIONES.includes(ext)) continue

        const nombreBase = path.basename(archivo, ext)
        const rutaEntrada = path.join(ruta, archivo)
        const rutaSalida = path.join(ruta, `${nombreBase}.webp`)

        // No sobreescribir si ya existe el .webp
        if (existsSync(rutaSalida)) {
            omitidas++
            continue
        }

        try {
            // Solo redimensiona si la imagen es más ancha que maxWidth (no agranda)
            const info = await sharp(rutaEntrada)
                .resize({ width: maxWidth, withoutEnlargement: true })
                .webp({ quality: QUALITY })
                .toFile(rutaSalida)

            console.log(`✅ ${ruta}/${archivo} → ${nombreBase}.webp  (${info.width}x${info.height}, ${(info.size / 1024).toFixed(1)} KB)`)
            convertidas++
        } catch (err) {
            console.error(`❌ Error con ${archivo}:`, err.message)
        }
    }

    return { convertidas, omitidas }
}

async function main() {
    console.log('🖼️  Optimizando imágenes a WebP (con redimensión)...\n')
    let totalConvertidas = 0
    let totalOmitidas = 0

    for (const carpeta of CARPETAS) {
        const { convertidas, omitidas } = await procesarCarpeta(carpeta)
        totalConvertidas += convertidas
        totalOmitidas += omitidas
    }

    console.log(`\n✨ Listo: ${totalConvertidas} convertidas, ${totalOmitidas} ya existían (omitidas)`)
    if (totalConvertidas > 0) {
        console.log('👉 Recuerda referenciar los .webp en tu código si aún no lo hiciste')
    }
}

main()