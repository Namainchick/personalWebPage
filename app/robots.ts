import type { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://namanh-portfolio.vercel.app/sitemap.xml', // TODO: URL anpassen
  }
}
