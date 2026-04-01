import type { FC } from "react";
import { useTranslations } from "next-intl";
import Link from "@/components/Link";
import { formatValueWithMask } from "@/utils/formatValueWithMask";

interface Props {
  cardNumber: string;
  cardHolderName: string;
  expirationDate: string;
  securityCode: string;
  className?: string;
  cardName?: string;
}

const CreditCard: FC<Props> = ({
  cardNumber,
  cardHolderName,
  expirationDate,
  securityCode,
  className,
  cardName = "Abyss Tech",
}) => {
  const formattedCardNumber = cardNumber.replace(/(\d{4})/g, "$1 ").trim();
  const t = useTranslations("payment");

  return (
    <div
      role="group"
      aria-label={t("creditCard.label")}
      className={`relative w-[420px] h-[260px] rounded-2xl shadow-xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 ${className}`}
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0,#ffffff33,transparent_70%)]" />
      </div>

      <div className="relative h-full p-8 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="w-12 h-10 bg-yellow-500/80 rounded-md bg-gradient-to-br from-yellow-400 to-yellow-600 overflow-hidden">
            <div className="h-full w-full grid grid-cols-2 gap-1 p-1">
              <div className="bg-yellow-700/30 rounded-sm" />
              <div className="bg-yellow-700/30 rounded-sm" />
            </div>
          </div>
          <Link
            href="https://cnpj.biz/47798810000107"
            externalLink
            rel="noopener noreferrer"
            className="text-2xl font-bold italic text-white"
          >
            {cardName}
          </Link>
        </div>

        <div className="text-2xl tracking-wider text-white font-mono">
          {formattedCardNumber}
        </div>

        <div className="flex flex-col w-full gap-2">
          <div>
            <div className="text-xs text-muted uppercase tracking-wider">
              {t("creditCard.name.label")}
            </div>
            <div className="text-xs text-white font-medium tracking-wide truncate max-w-[20rem]">
              {cardHolderName.toUpperCase()}
            </div>
          </div>

          <div className="flex justify-between">
            <div className="text-right">
              <div className="text-xs text-muted uppercase tracking-wider">
                {t("creditCard.expirationDate.label")}
              </div>
              <div className="text-white font-medium">
                {formatValueWithMask(expirationDate, "expirationDate")}
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs text-muted uppercase tracking-wider">
                {t("creditCard.cvv.label")}
              </div>
              <div className="text-white font-medium">{securityCode}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCard;
