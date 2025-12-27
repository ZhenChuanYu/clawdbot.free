import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import enTranslations from './locales/en.json'
import zhTranslations from './locales/zh.json'
import zhTWTranslations from './locales/zh-TW.json'

// Supported languages (English, Simplified Chinese, and Traditional Chinese for Grok API)
export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' },
  { code: 'zh-TW', name: 'Traditional Chinese', nativeName: '繁體中文' },
] as const

export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number]['code']

const resources = {
  en: { translation: enTranslations },
  zh: { translation: zhTranslations },
  'zh-TW': { translation: zhTWTranslations },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    detection: {
      order: ['path', 'localStorage', 'navigator'],
      lookupFromPathIndex: 0,
      caches: ['localStorage'],
    },
  })

export default i18n
