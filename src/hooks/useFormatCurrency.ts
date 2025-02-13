import { useTranslations } from "next-intl";
import { formatCurrency } from "@/utils/formatCurrency";
import type { LocaleType, CurrencyType } from "@/config/i18n-config";

export function useFormatCurrency() {
  const t = useTranslations('currency');

  return (value: number | string | null | undefined) => {
    return formatCurrency(value, {
      locale: t('locale') as LocaleType,
      currency: t('type') as CurrencyType,
    });
  };
}
