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
import ptTranslations from './locales/pt.json'
import ruTranslations from './locales/ru.json'
import itTranslations from './locales/it.json'
import arTranslations from './locales/ar.json'
import hiTranslations from './locales/hi.json'
import trTranslations from './locales/tr.json'
import viTranslations from './locales/vi.json'
import thTranslations from './locales/th.json'
import idTranslations from './locales/id.json'
import nlTranslations from './locales/nl.json'
import plTranslations from './locales/pl.json'
import svTranslations from './locales/sv.json'
import noTranslations from './locales/no.json'
import daTranslations from './locales/da.json'
import fiTranslations from './locales/fi.json'
import zhTWTranslations from './locales/zh-TW.json'

// Supported languages
// Sorted alphabetically by language code
export const SUPPORTED_LANGUAGES = [
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
  { code: 'da', name: 'Danish', nativeName: 'Dansk' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'fi', name: 'Finnish', nativeName: 'Suomi' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'ko', name: 'Korean', nativeName: '한국어' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands' },
  { code: 'no', name: 'Norwegian', nativeName: 'Norsk' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska' },
  { code: 'th', name: 'Thai', nativeName: 'ไทย' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' },
  { code: 'zh-TW', name: 'Chinese (Traditional)', nativeName: '繁體中文' },
] as const

export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number]['code']

const resources = {
  en: { translation: enTranslations },
  zh: { translation: zhTranslations },
  'zh-TW': { translation: zhTWTranslations },
  es: { translation: esTranslations },
  ja: { translation: jaTranslations },
  ko: { translation: koTranslations },
  fr: { translation: frTranslations },
  de: { translation: deTranslations },
  pt: { translation: ptTranslations },
  ru: { translation: ruTranslations },
  it: { translation: itTranslations },
  ar: { translation: arTranslations },
  hi: { translation: hiTranslations },
  tr: { translation: trTranslations },
  vi: { translation: viTranslations },
  th: { translation: thTranslations },
  id: { translation: idTranslations },
  nl: { translation: nlTranslations },
  pl: { translation: plTranslations },
  sv: { translation: svTranslations },
  no: { translation: noTranslations },
  da: { translation: daTranslations },
  fi: { translation: fiTranslations },
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

