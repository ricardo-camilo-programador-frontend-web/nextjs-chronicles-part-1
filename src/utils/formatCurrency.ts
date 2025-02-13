type NotationType =
  | 'standard'
  | 'scientific'
  | 'engineering'
  | 'compact'
  | undefined
type CompactDisplayType = 'short' | 'long' | undefined
type LocaleType = 'pt-BR' | 'en-US' | undefined
type CurrencyType = 'BRL' | 'USD' | undefined

export function formatCurrency(
  value: number | string | null | undefined,
  notation: NotationType = 'standard',
  compactDisplay: CompactDisplayType = 'short',
  locale: LocaleType = 'pt-BR',
  currency: CurrencyType = 'BRL',
  minimumFractionDigits = 2,
  maximumFractionDigits = 2,
) {
  if (value === undefined || value === null) {
    return
  }

  const convertedToNumber = Number(value)

  if (isNaN(convertedToNumber)) {
    return
  }

  const formatter = new Intl.NumberFormat(locale, {
    notation,
    compactDisplay,
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  })

  const formattedValue = formatter.format(convertedToNumber)

  return formattedValue
}
