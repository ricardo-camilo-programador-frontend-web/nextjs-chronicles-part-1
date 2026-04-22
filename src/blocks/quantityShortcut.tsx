"use client";
import type { FC } from "react";
import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { CartItem } from "@/types/cartItem";
import { RemoveCartItemModal } from "@/components/cart/RemoveCartItemModal";
import { useTranslations } from "next-intl";
import { useToast } from "@/hooks/useToast";

interface ShoppingCartProps {
  cartItem: CartItem;
  className?: string;
}

const QuantityShortcut: FC<ShoppingCartProps> = ({
  className,
  cartItem,
}) => {
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const cartItemQuantity = useCartStore.getState().items.find(item => item.item.id === cartItem.item.id)?.quantity;
  const removeItem = useCartStore((state) => state.removeItem);
  const incrementItemQuantity = useCartStore((state) => state.addItem);
  const t = useTranslations('quantityShortcut');
  const toast = useToast();

  const decrementItemQuantity = useCartStore(
    (state) => state.decrementItemQuantity
  );

  const handleWithdrawItem = () => {
    if (cartItemQuantity === 1) {
      setIsRemoveModalOpen(true);
      return;
    }

    decrementItemQuantity(cartItem.item);
  };

  const handleConfirmRemove = () => {
    removeItem(cartItem.item);
    toast.warning(`${cartItem.item.common_name || cartItem.item.scientific_name} ${t('removeItemDescription')}`);
  };

  return (
    <>
      <RemoveCartItemModal
        isOpen={isRemoveModalOpen}
        onClose={() => setIsRemoveModalOpen(false)}
        cartItem={cartItem}
        onConfirm={handleConfirmRemove}
      />

      <div
        className={`flex justify-between items-center min-w-full w-full md:w-auto border border-white/20 text-white rounded-lg hover:bg-white/10 transition-all duration-300 text-center mr-auto min-h-[3.5rem] mx-auto ${className}`}
      >
        <button
          type="button"
          className="w-full min-h-[3.5rem] flex items-center justify-center active:text-red-500 active:bg-white/10 transition-all duration-300"
          aria-label={t('decreaseQuantity')}
          title={t('decreaseQuantity')}
          onClick={() => handleWithdrawItem()}
        >
          <span className="text-xl font-medium">-</span>
        </button>

        <button
          type="button"
          className="w-full min-h-[3.5rem] flex items-center justify-center active:text-red-500 active:bg-white/10 transition-all duration-300"
          aria-label={t('removeItem')}
          title={t('removeItem')}
          onClick={() => setIsRemoveModalOpen(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          </svg>
        </button>

        <button
          type="button"
          className="flex items-center justify-center w-full min-h-[3.5rem] text-white hover:text-green-500 hover:bg-white/10 active:text-green-500 active:bg-white/20 active:scale-95 touch-none transition-all duration-300"
          aria-label={t('increaseQuantity')}
          title={t('increaseQuantity')}
          onClick={() => incrementItemQuantity(cartItem.item)}
        >
          <span className="text-xl font-medium">+</span>
        </button>
      </div>
    </>
  );
}

export default QuantityShortcut;
