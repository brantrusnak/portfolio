import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/Brant_Rusnak_Senior_Frontend_Engineer.pdf'
    },
    sitemap: 'https://www.brantrusnak.com/sitemap.xml',
  }
}