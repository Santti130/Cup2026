import { noticias } from '../src/data/noticias.js'
import { writeFileSync } from 'fs'

const BASE = 'https://cup-hub.com'
const hoy  = new Date().toISOString().split('T')[0]  // 2026-06-15

const urls = [
    { loc: `${BASE}/`,          lastmod: hoy,         changefreq: 'daily',  priority: '1.0' },
    { loc: `${BASE}/calendario`, lastmod: hoy,         changefreq: 'daily',  priority: '0.9' },
    { loc: `${BASE}/grupos`,    lastmod: hoy,         changefreq: 'hourly', priority: '0.9' },
    { loc: `${BASE}/noticias`,  lastmod: hoy,         changefreq: 'daily',  priority: '0.8' },
    // Genera una URL por cada noticia automáticamente
    ...noticias.map(n => ({
        loc:        `${BASE}/noticias/${n.slug}`,
        lastmod:    hoy,
        changefreq: 'weekly',
        priority:   '0.7'
    }))
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `    <url>
        <loc>${u.loc}</loc>
        <lastmod>${u.lastmod}</lastmod>
        <changefreq>${u.changefreq}</changefreq>
        <priority>${u.priority}</priority>
    </url>`).join('\n')}
</urlset>`

writeFileSync('public/sitemap.xml', xml)
console.log(`✅ Sitemap generado con ${urls.length} URLs`)