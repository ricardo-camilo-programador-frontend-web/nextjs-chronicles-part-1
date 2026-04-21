import type { MetadataRoute } from 'next'
import { locales, defaultLocale } from "@/config/i18n-config";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL

const staticRoutes = [
  '',
  'api/countries',
  'sitemap.xml'
]

const dynamicRoutes = locales.flatMap((locale) => [
  locale,
  `${locale}/checkout`,
  `${locale}/contact`,
  `${locale}/orders`,
  `${locale}/plants`,
]);

const routes = [
  ...staticRoutes,
  ...dynamicRoutes
]

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemap: MetadataRoute.Sitemap = []

  routes.forEach((route) => {
    const urlPath = route ? `${route}` : ''
    const languageAlternates: { [key: string]: string } = {}

    locales.forEach((lang) => {
      const langPrefix = lang === defaultLocale ? '' : `${lang}`
      const fullUrl = `${baseUrl}${langPrefix}${urlPath}`.trim()

      languageAlternates[lang] = fullUrl
    })

    sitemap.push({
      url: `${baseUrl}${urlPath}`.trim(),
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: route === '' ? 1 : 0.8,
      alternates: {
        languages: languageAlternates
      }
    })
  })

  return sitemap.map(entry => ({
    ...entry,
    _prettyXml: true
  }))
}
