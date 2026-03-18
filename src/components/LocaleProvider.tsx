"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type SupportedLanguage = "en" | "fr" | "es" | "de" | "pt" | "zh" | "ja" | "ar";

type LanguageOption = {
  code: SupportedLanguage;
  label: string;
  shortLabel: string;
};

type LocaleContextValue = {
  language: SupportedLanguage;
  country: string | null;
  setLanguage: (language: SupportedLanguage) => void;
  languageOptions: LanguageOption[];
};

const STORAGE_KEY = "skcs_language_preference";

const languageOptions: LanguageOption[] = [
  { code: "en", label: "English", shortLabel: "EN" },
  { code: "fr", label: "Français", shortLabel: "FR" },
  { code: "es", label: "Español", shortLabel: "ES" },
  { code: "de", label: "Deutsch", shortLabel: "DE" },
  { code: "pt", label: "Português", shortLabel: "PT" },
  { code: "zh", label: "中文", shortLabel: "ZH" },
  { code: "ja", label: "日本語", shortLabel: "JA" },
  { code: "ar", label: "العربية", shortLabel: "AR" },
];

const supportedLanguageSet = new Set<SupportedLanguage>(languageOptions.map((l) => l.code));

function normalizeBrowserLanguage(input: string | null | undefined): SupportedLanguage {
  const fallback: SupportedLanguage = "en";
  if (!input) return fallback;

  const base = input.split(/[-_]/)[0]?.toLowerCase() ?? "";
  if (supportedLanguageSet.has(base as SupportedLanguage)) return base as SupportedLanguage;

  return fallback;
}

function extractCountry(input: string | null | undefined): string | null {
  if (!input) return null;
  const parts = input.split(/[-_]/);
  const region = parts[1];
  return region ? region.toUpperCase() : null;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<SupportedLanguage>("en");
  const [country, setCountry] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored && supportedLanguageSet.has(stored as SupportedLanguage)) {
        setLanguageState(stored as SupportedLanguage);
        setCountry(extractCountry(window.navigator.language));
        return;
      }

      const detected = normalizeBrowserLanguage(window.navigator.language);
      setLanguageState(detected);
      setCountry(extractCountry(window.navigator.language));
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // ignore
    }

    try {
      document.cookie = `user_language=${language}; path=/; samesite=lax`;
    } catch {
      // ignore
    }

    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo<LocaleContextValue>(() => {
    return {
      language,
      country,
      setLanguage: (next) => setLanguageState(next),
      languageOptions,
    };
  }, [country, language]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return ctx;
}
