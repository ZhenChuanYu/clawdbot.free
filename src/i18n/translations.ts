import en from './locales/en.json';
import zh from './locales/zh.json';
import zhTW from './locales/zh-TW.json';

export const translations = {
  en,
  zh,
  'zh-tw': zhTW,
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
  return 'en';
}

export const locales: Locale[] = ['en', 'zh', 'zh-tw'];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  zh: '中文',
  'zh-tw': '繁體中文',
};
