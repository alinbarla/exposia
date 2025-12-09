import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/contact/success'],
      },
      // Allow ClaudeBot for SEO analysis and helpful features
      {
        userAgent: 'ClaudeBot',
        allow: '/',
      },
      // Block AI training bots (keeps your content from being used for training)
      {
        userAgent: ['GPTBot', 'Google-Extended', 'CCBot', 'Amazonbot', 'Bytespider'],
        disallow: '/',
      },
    ],
    sitemap: 'https://exposia.se/sitemap.xml',
  }
}