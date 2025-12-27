import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { SUPPORTED_LANGUAGES } from '../i18n/config'

const BASE_URL = 'https://grok.api'

export default function SEOHead() {
  const { i18n, t } = useTranslation()
  const location = useLocation()

  useEffect(() => {
    // Update HTML lang attribute
    document.documentElement.lang = i18n.language

    // Get current path without language prefix
    const pathWithoutLang = location.pathname.replace(/^\/(zh|zh-tw)(\/|$)/, '/')
    const currentPath = pathWithoutLang === '/' ? '' : pathWithoutLang

    const pathLang = i18n.language

    // Update page title
    const title = t('seo_title')
    document.title = title

    // Update meta description
    const description = t('seo_description')
    let metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.setAttribute('name', 'description')
      document.head.appendChild(metaDescription)
    }
    metaDescription.setAttribute('content', description)

    // Update meta keywords
    const keywords = t('seo_keywords')
    let metaKeywords = document.querySelector('meta[name="keywords"]')
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta')
      metaKeywords.setAttribute('name', 'keywords')
      document.head.appendChild(metaKeywords)
    }
    metaKeywords.setAttribute('content', keywords)

    // Update canonical URL
    const canonicalUrl = i18n.language === 'en'
      ? `${BASE_URL}${currentPath}`
      : `${BASE_URL}/${pathLang}${currentPath}`
    
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', canonicalUrl)

    // Update Open Graph tags
    const updateMetaTag = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`)
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute('property', property)
        document.head.appendChild(meta)
      }
      meta.setAttribute('content', content)
    }

    updateMetaTag('og:title', title)
    updateMetaTag('og:description', description)
    updateMetaTag('og:url', canonicalUrl)
    updateMetaTag('og:locale', i18n.language.replace('-', '_'))

    // Update Twitter tags
    updateMetaTag('twitter:title', title)
    updateMetaTag('twitter:description', description)
    updateMetaTag('twitter:url', canonicalUrl)

    // Remove existing hreflang tags
    const existingHreflangs = document.querySelectorAll('link[rel="alternate"][hreflang]')
    existingHreflangs.forEach(tag => tag.remove())

    // Add hreflang tags for all supported languages
    SUPPORTED_LANGUAGES.forEach((lang) => {
      const langPath = lang.code === 'en'
        ? `${BASE_URL}${currentPath}`
        : `${BASE_URL}/${lang.code}${currentPath}`

      const hreflang = document.createElement('link')
      hreflang.setAttribute('rel', 'alternate')
      // Use zh-CN for simplified Chinese, zh-TW for traditional
      const hreflangCode = lang.code === 'zh' ? 'zh-CN' : lang.code
      hreflang.setAttribute('hreflang', hreflangCode)
      hreflang.setAttribute('href', langPath)
      document.head.appendChild(hreflang)
    })
    
    // Add zh-HK pointing to zh-TW
    const hkHreflang = document.createElement('link')
    hkHreflang.setAttribute('rel', 'alternate')
    hkHreflang.setAttribute('hreflang', 'zh-HK')
    hkHreflang.setAttribute('href', `${BASE_URL}/zh-tw${currentPath}`)
    document.head.appendChild(hkHreflang)

    // Add x-default hreflang (points to English version)
    const defaultHreflang = document.createElement('link')
    defaultHreflang.setAttribute('rel', 'alternate')
    defaultHreflang.setAttribute('hreflang', 'x-default')
    defaultHreflang.setAttribute('href', `${BASE_URL}${currentPath}`)
    document.head.appendChild(defaultHreflang)
  }, [i18n.language, location.pathname, t])

  return null
}

