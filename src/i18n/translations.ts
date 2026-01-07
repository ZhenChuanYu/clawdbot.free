import en from './locales/en.json';
import zh from './locales/zh.json';
import zhTW from './locales/zh-TW.json';
import ja from './locales/ja.json';
import hi from './locales/hi.json';
import es from './locales/es.json';
import pt from './locales/pt.json';
import ru from './locales/ru.json';
import de from './locales/de.json';
import fr from './locales/fr.json';
import ko from './locales/ko.json';

export const translations = {
  en,
  zh,
  'zh-tw': zhTW,
  ja,
  hi,
  es,
  pt,
  ru,
  de,
  fr,
  ko,
} as const;

export type Locale = keyof typeof translations;

export function t(locale: Locale, key: string): string {
  const translation = translations[locale];
  return (translation as Record<string, string>)[key] || key;
}

export function getLocaleFromUrl(url: URL): Locale {
  const [, lang] = url.pathname.split('/');
  if (lang === 'zh') return 'zh';
  if (lang === 'zh-tw') return 'zh-tw';
  if (lang === 'ja') return 'ja';
  if (lang === 'hi') return 'hi';
  if (lang === 'es') return 'es';
  if (lang === 'pt') return 'pt';
  if (lang === 'ru') return 'ru';
  if (lang === 'de') return 'de';
  if (lang === 'fr') return 'fr';
  if (lang === 'ko') return 'ko';
  return 'en';
}

export const locales: Locale[] = ['en', 'zh', 'zh-tw', 'ja', 'hi', 'es', 'pt', 'ru', 'de', 'fr', 'ko'];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  zh: '中文',
  'zh-tw': '繁體中文',
  ja: '日本語',
  hi: 'हिन्दी',
  es: 'Español',
  pt: 'Português',
  ru: 'Русский',
  de: 'Deutsch',
  fr: 'Français',
  ko: '한국어',
};
