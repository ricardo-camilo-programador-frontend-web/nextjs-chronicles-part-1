"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { CartItem } from "@/types/cartItem";
import { Modal } from "@/components/Modal";

interface ShoppingCartProps {
  cartItem: CartItem;
  className?: string;
}

export function QuantityShortcut({
  className,
  cartItem,
}: ShoppingCartProps) {
  const [isOpen, setIsOpen] = useState(false);
  const cartItemQuantity = useCartStore.getState().items.find(item => item.item.id === cartItem.item.id)?.quantity;
  const removeItem = useCartStore((state) => state.removeItem);
  const incrementItemQuantity = useCartStore((state) => state.addItem);

  const decrementItemQuantity = useCartStore(
    (state) => state.decrementItemQuantity
  );

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleWithdrawItem = () => {

    if (cartItemQuantity === 1) {
      toggleModal();
      return;
    }

    decrementItemQuantity(cartItem.item);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        id="quantity-shortcut-modal"
        title="Remove item"
      >
        <div className="flex flex-col gap-4 justify-start">
          <p className="text-lg text-center">Are you sure you want to remove this item?</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
            <button
              onClick={() => setIsOpen(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded-md w-full order-2 md:order-1"
            >
              Cancel
            </button>
            <button
              onClick={() => removeItem(cartItem.item)}
              className="bg-red-500 text-white px-4 py-2 rounded-md w-full order-1 md:order-2"
            >
              Remove
            </button>
          </div>
        </div>
      </Modal>

      <div
        className={` flex justify-between items-center min-w-full w-full md:w-auto border border-white/20 text-white rounded-lg hover:bg-white/10 transition-all duration-300 text-center mr-auto min-h-[3.5rem] mx-auto ${className}`}
      >
        <button
          type="button"
          className="w-full min-h-[3.5rem] flex items-center justify-center active:text-red-500 active:bg-white/10 transition-all duration-300"
          aria-label="Decrease quantity"
          title="Decrease quantity"
          onClick={() => handleWithdrawItem()}
        >
          <span className="text-xl font-medium">-</span>
        </button>

        <button
          type="button"
          className="w-full min-h-[3.5rem] flex items-center justify-center active:text-red-500 active:bg-white/10 transition-all duration-300"
          aria-label="Remove item"
          title="Remove item"
          onClick={toggleModal}
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
          aria-label="Increase quantity"
          title="Increase quantity"
          onClick={() => incrementItemQuantity(cartItem.item)}
        >
          <span className="text-xl font-medium">+</span>
        </button>
      </div>
    </>
  );
}
