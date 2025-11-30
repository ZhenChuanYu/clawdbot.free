import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import enTranslations from './locales/en.json'
import zhTranslations from './locales/zh.json'
import esTranslations from './locales/es.json'
import jaTranslations from './locales/ja.json'
import koTranslations from './locales/ko.json'
import frTranslations from './locales/fr.json'
import deTranslations from './locales/de.json'

// Supported languages
export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'ko', name: 'Korean', nativeName: '한국어' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
] as const

export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number]['code']

const resources = {
  en: { translation: enTranslations },
  zh: { translation: zhTranslations },
  es: { translation: esTranslations },
  ja: { translation: jaTranslations },
  ko: { translation: koTranslations },
  fr: { translation: frTranslations },
  de: { translation: deTranslations },
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

