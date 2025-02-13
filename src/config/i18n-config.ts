export const locales = ['en', 'br', 'hi', 'jp', 'de', 'ar', 'pl'] as const;
export const defaultLocale = 'pt' as const;

export type Locale = (typeof locales)[number];

export const rtlLocales = ['ar'] as const;

export const isRTL = (locale: Locale): boolean => {
  return (rtlLocales as readonly string[]).includes(locale);
};

export const getDirection = (locale: Locale): boolean => {
  return isRTL(locale);
};
