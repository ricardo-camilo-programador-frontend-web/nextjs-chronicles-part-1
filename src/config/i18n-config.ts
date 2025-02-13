export const locales = ['en-US', 'pt-BR', 'hi', 'jp', 'de', 'ar', 'pl'] as const;
export const defaultLocale = 'en-US' as const;

export type Locale = (typeof locales)[number];

export const rtlLocales = ['ar'] as const;

export const isRTL = (locale: Locale): boolean => {
  return (rtlLocales as readonly string[]).includes(locale);
};

export const getDirection = (locale: Locale): boolean => {
  return isRTL(locale);
};

export type LocaleType =
| 'pt-BR'
| 'en-US'
| 'hi-IN'
| 'ja-JP'
| 'de-DE'
| 'ar-SA'
| 'pl-PL'
| undefined


export type CurrencyType =
| 'BRL'
| 'USD'
| 'INR'
| 'JPY'
| 'EUR'
| 'PLN'
| undefined

