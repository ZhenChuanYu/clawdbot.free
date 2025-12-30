import en from './locales/grok-api-free/en.json';
import zh from './locales/grok-api-free/zh.json';
import zhTW from './locales/grok-api-free/zh-TW.json';

export const platformsTranslations = {
  en,
  zh,
  'zh-tw': zhTW,
} as const;

export type Locale = keyof typeof platformsTranslations;

export function tPlatforms(locale: Locale, key: string): string {
  const translation = platformsTranslations[locale];
  return (translation as Record<string, string>)[key] || key;
}

