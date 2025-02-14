import { LocaleType, CurrencyType } from "@/config/i18n-config";

type NotationType = 'standard' | 'scientific' | 'engineering' | 'compact' | undefined;
type CompactDisplayType = 'short' | 'long' | undefined;

interface FormatCurrencyOptions {
  notation?: NotationType;
  compactDisplay?: CompactDisplayType;
  locale?: LocaleType;
  currency?: CurrencyType;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

export function formatCurrency(
  value: number | string | null | undefined,
  options: Partial<FormatCurrencyOptions> = {}
) {
  if (value === undefined || value === null) {
    return '0,00';
  }

  const convertedToNumber = Number(value);

  if (isNaN(convertedToNumber)) {
    return '0,00';
  }

  const {
    notation = 'standard',
    compactDisplay = 'short',
    locale = 'pt-BR',
    currency = 'BRL',
    minimumFractionDigits = 2,
    maximumFractionDigits = 2,
  } = options;

  const adjustedValue = currency === 'BRL'
    ? convertedToNumber * 3
    : convertedToNumber;

  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    notation,
    compactDisplay,
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  });

  return formatter.format(adjustedValue);
}
