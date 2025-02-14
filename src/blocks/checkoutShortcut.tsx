import type { FC } from "react";
import { useMemo } from "react";
import { useCartStore } from "@/store/cartStore";
import { useTranslations } from "next-intl";
import Link from "@/components/Link";
import { useFormatCurrency } from "@/hooks/useFormatCurrency";

interface CheckoutShortcutProps {
  className?: string;
}

export const CheckoutShortcut: FC<CheckoutShortcutProps> = ({ className }) => {
  const { items: cartItems } = useCartStore();
  const totalOnStore = cartItems.reduce((acc, cartItem) => acc + cartItem.item.genus_id * cartItem.quantity, 0);
  const translateCart = useTranslations('cart');
  const formatCurrency = useFormatCurrency();

  const checkoutLink = useMemo(() => (
    <div className={`flex items-center justify-center w-full bottom-12 -mt-6 ${className}`}>
      <Link
        href={`/checkout?step=shipping`}
        className="bg-white !text-black px-4 py-2 w-full grid grid-cols-2 gap-2 border border-white/20 rounded-lg hover:!bg-white/70 transition-all duration-300 text-center"
      >
        <span className="font-bold">
          {formatCurrency(totalOnStore)}&nbsp;
        </span>
        <span className="text-md font-bold">
          {translateCart('checkout')}
        </span>
      </Link>
    </div>
  ), [className, formatCurrency, totalOnStore, translateCart]);

  return cartItems && cartItems.length > 0 && checkoutLink;
}