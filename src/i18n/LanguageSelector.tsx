"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useI18n } from './context';
import { Locale, localeNames } from '../locales';

const localeFlags: Record<Locale, string> = {
  en: '🇬🇧',
  fr: '🇫🇷',
  es: '🇪🇸',
  ja: '🇯🇵',
  zh: '🇨🇳',
  ar: '🇸🇦',
};

interface LanguageSelectorProps {
  variant?: 'light' | 'dark';
  className?: string;
}

export function LanguageSelector({ variant = 'dark', className = '' }: LanguageSelectorProps) {
  const { locale, setLocale } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const colors = {
    light: {
      button: 'border-white/30 text-white hover:bg-white/10',
      dropdown: 'bg-white/95 backdrop-blur-md',
      item: 'text-gray-800 hover:bg-gray-100',
      active: 'bg-[#BC9E73]/20 text-[#BC9E73]',
    },
    dark: {
      button: 'border-[#2C241B]/30 text-[#2C241B] hover:bg-[#2C241B]/10',
      dropdown: 'bg-white shadow-xl',
      item: 'text-gray-800 hover:bg-gray-100',
      active: 'bg-[#BC9E73]/20 text-[#BC9E73]',
    },
  };

  const style = colors[variant];

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 rounded-full border transition-colors ${style.button}`}
      >
        <span className="text-base">{localeFlags[locale]}</span>
        <span className="text-xs uppercase tracking-wider hidden sm:inline">
          {locale}
        </span>
        <svg
          className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className={`absolute top-full mt-2 right-0 rounded-xl overflow-hidden z-50 min-w-[160px] ${style.dropdown}`}>
          {(Object.keys(localeNames) as Locale[]).map((loc) => (
            <button
              key={loc}
              onClick={() => {
                setLocale(loc);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                locale === loc ? style.active : style.item
              }`}
            >
              <span className="text-base">{localeFlags[loc]}</span>
              <span>{localeNames[loc]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
