import en from './en.json';
import fr from './fr.json';
import es from './es.json';
import ja from './ja.json';
import zh from './zh.json';
import ar from './ar.json';

export const locales = {
  en,
  fr,
  es,
  ja,
  zh,
  ar,
} as const;

export type Locale = keyof typeof locales;

export const localeNames: Record<Locale, string> = {
  en: 'English',
  fr: 'Français',
  es: 'Español',
  ja: '日本語',
  zh: '中文',
  ar: 'العربية',
};

export const defaultLocale: Locale = 'en';

export function getLocale(locale: string): Locale {
  return locale in locales ? (locale as Locale) : defaultLocale;
}

export function isRTL(locale: Locale): boolean {
  return locales[locale].meta.dir === 'rtl';
}
