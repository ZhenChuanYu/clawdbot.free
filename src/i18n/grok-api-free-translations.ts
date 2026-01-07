import en from './locales/grok-api-free/en.json';
import zh from './locales/grok-api-free/zh.json';
import zhTW from './locales/grok-api-free/zh-TW.json';
import ja from './locales/grok-api-free/ja.json';
import hi from './locales/grok-api-free/hi.json';
import es from './locales/grok-api-free/es.json';
import pt from './locales/grok-api-free/pt.json';
import ru from './locales/grok-api-free/ru.json';
import de from './locales/grok-api-free/de.json';
import fr from './locales/grok-api-free/fr.json';
import ko from './locales/grok-api-free/ko.json';

export const platformsTranslations = {
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

export type Locale = keyof typeof platformsTranslations;

export function tPlatforms(locale: Locale, key: string): string {
  const translation = platformsTranslations[locale];
  return (translation as Record<string, string>)[key] || key;
}

