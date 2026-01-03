import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://fileverified.eu'

  // Списък с твоите страници
  const routes = [
    '',
    '/services',
    '/diagnostics',
    '/tpms',
    '/faq',
    '/book',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8,
  }))
}