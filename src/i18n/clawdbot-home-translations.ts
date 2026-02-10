/**
 * ClawdBot 首页多语言
 * 与项目 i18n 架构一致：locales/clawdbot-home/*.json + tClawdbotHome(locale, key)
 */
import en from './locales/clawdbot-home/en.json';
import zh from './locales/clawdbot-home/zh.json';
import zhTW from './locales/clawdbot-home/zh-TW.json';
import ja from './locales/clawdbot-home/ja.json';
import ko from './locales/clawdbot-home/ko.json';
import es from './locales/clawdbot-home/es.json';
import de from './locales/clawdbot-home/de.json';
import fr from './locales/clawdbot-home/fr.json';
import pt from './locales/clawdbot-home/pt.json';
import ru from './locales/clawdbot-home/ru.json';
import hi from './locales/clawdbot-home/hi.json';

export const clawdbotHomeTranslations = {
  en,
  zh,
  'zh-tw': zhTW,
  ja,
  ko,
  es,
  de,
  fr,
  pt,
  ru,
  hi,
} as const;

export type ClawdbotHomeLocale = keyof typeof clawdbotHomeTranslations;

export function tClawdbotHome(locale: ClawdbotHomeLocale, key: string): string {
  const translation = clawdbotHomeTranslations[locale];
  return (translation as Record<string, string>)[key] ?? (clawdbotHomeTranslations.en as Record<string, string>)[key] ?? key;
}
