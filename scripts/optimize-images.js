// scripts/optimize-images.js
// Convierte imágenes de public/news-img y public/icons a WebP.
// NO sobreescribe los .webp ya existentes. Mantiene los originales como respaldo.
// Uso: npm run optimize-images

import sharp from 'sharp'
import { readdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

const QUALITY = 80

// Carpetas a procesar
const CARPETAS = [
    'public/news-img',
    'public/icons',
    'public/img',
]

const EXTENSIONES = ['.jpg', '.jpeg', '.png', '.avif']

async function procesarCarpeta(carpeta) {
    if (!existsSync(carpeta)) {
        console.log(`⏭️  Carpeta no encontrada (se omite): ${carpeta}`)
        return { convertidas: 0, omitidas: 0 }
    }

    const archivos = await readdir(carpeta)
    let convertidas = 0
    let omitidas = 0

    for (const archivo of archivos) {
        const ext = path.extname(archivo).toLowerCase()
        if (!EXTENSIONES.includes(ext)) continue

        const nombreBase = path.basename(archivo, ext)
        const rutaEntrada = path.join(carpeta, archivo)
        const rutaSalida = path.join(carpeta, `${nombreBase}.webp`)

        // No sobreescribir si ya existe el .webp
        if (existsSync(rutaSalida)) {
            omitidas++
            continue
        }

        try {
            const info = await sharp(rutaEntrada)
                .webp({ quality: QUALITY })
                .toFile(rutaSalida)

            const kbOriginal = (await sharp(rutaEntrada).metadata()).size
            console.log(`✅ ${carpeta}/${archivo} → ${nombreBase}.webp (${(info.size / 1024).toFixed(1)} KB)`)
            convertidas++
        } catch (err) {
            console.error(`❌ Error con ${archivo}:`, err.message)
        }
    }

    return { convertidas, omitidas }
}

async function main() {
    console.log('🖼️  Optimizando imágenes a WebP...\n')
    let totalConvertidas = 0
    let totalOmitidas = 0

    for (const carpeta of CARPETAS) {
        const { convertidas, omitidas } = await procesarCarpeta(carpeta)
        totalConvertidas += convertidas
        totalOmitidas += omitidas
    }

    console.log(`\n✨ Listo: ${totalConvertidas} convertidas, ${totalOmitidas} ya existían (omitidas)`)
    if (totalConvertidas > 0) {
        console.log('👉 Ahora actualiza las referencias en tu código de .png a .webp')
    }
}

main()