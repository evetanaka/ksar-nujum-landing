"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { locales, Locale, defaultLocale, isRTL } from '../locales';

type TranslationValue = string | string[] | { [key: string]: TranslationValue };

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  tArray: (key: string) => string[];
  tObject: <T>(key: string) => T;
  isRTL: boolean;
}

const I18nContext = createContext<I18nContextType | null>(null);

function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  return path.split('.').reduce((acc: unknown, part: string) => {
    if (acc && typeof acc === 'object' && part in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, obj);
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Check localStorage for saved preference
    const saved = localStorage.getItem('ksar-locale') as Locale | null;
    if (saved && saved in locales) {
      setLocaleState(saved);
    } else {
      // Try to detect from browser
      const browserLang = navigator.language.split('-')[0];
      if (browserLang in locales) {
        setLocaleState(browserLang as Locale);
      }
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      // Update document direction for RTL languages
      document.documentElement.dir = isRTL(locale) ? 'rtl' : 'ltr';
      document.documentElement.lang = locale;
    }
  }, [locale, mounted]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('ksar-locale', newLocale);
  };

  const translations = locales[locale] as Record<string, unknown>;

  const t = (key: string): string => {
    const value = getNestedValue(translations, key);
    if (typeof value === 'string') return value;
    console.warn(`Translation missing or not a string: ${key}`);
    return key;
  };

  const tArray = (key: string): string[] => {
    const value = getNestedValue(translations, key);
    if (Array.isArray(value)) return value as string[];
    console.warn(`Translation missing or not an array: ${key}`);
    return [];
  };

  const tObject = <T,>(key: string): T => {
    const value = getNestedValue(translations, key);
    return value as T;
  };

  // Don't render until we've checked localStorage to avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <I18nContext.Provider
      value={{
        locale,
        setLocale,
        t,
        tArray,
        tObject,
        isRTL: isRTL(locale),
      }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}

export function useTranslation() {
  const { t, tArray, tObject, locale, isRTL } = useI18n();
  return { t, tArray, tObject, locale, isRTL };
}
