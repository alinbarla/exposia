import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/contact/success'],
      },
    ],
    sitemap: 'https://exposia.se/sitemap.xml',
  }
}

