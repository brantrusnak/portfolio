import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/resume.pdf'
    },
    sitemap: 'https://www.brantrusnak.com/sitemap.xml',
  }
}