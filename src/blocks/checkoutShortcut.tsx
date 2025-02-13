import { useCartStore } from "@/store/cartStore";
import { useTranslations } from "next-intl";
import Link from "@/components/Link";

interface CheckoutShortcutProps {
  className?: string;
}

export default function CheckoutShortcut({ className }: CheckoutShortcutProps) {
  const { items: cartItems } = useCartStore();
  const totalOnStore = cartItems.reduce((acc, cartItem) => acc + cartItem.item.genus_id * cartItem.quantity, 0);
  const translateCart = useTranslations('cart');

  return (
    <div className={`flex items-center justify-center w-full bottom-12 -mt-6 ${className}`}>
    <Link
      href={`/checkout?step=shipping`}
      className="bg-white !text-black px-4 py-2 w-full grid grid-cols-2 gap-2 border border-white/20 rounded-lg hover:!bg-white/70 transition-all duration-300 text-center"
    >
      <span className="font-bold">
        ${totalOnStore.toFixed(2)}
      </span>
      <span className="text-md font-bold">
        {translateCart('checkout')}
      </span>
    </Link>
  </div>
  )
}