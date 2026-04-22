"use client";

import { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import shopIcon from "@/assets/svg/shop-icon.svg";
import CheckoutShortcut from "./checkoutShortcut";
import { useCartStore } from "@/store/cartStore";
import QuantityShortcut from "./quantityShortcut";
import { ClearCartModal } from "@/components/cart/ClearCartModal";
import { getUniqueId } from "@/utils/getUniqueId";
import { CartItem } from "@/types/cartItem";
import { useTranslations } from "next-intl";
import { useFormatCurrency } from "@/hooks/useFormatCurrency";

interface ShoppingCartProps {
  className?: string;
}

export function ShoppingCart({ className }: ShoppingCartProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isClearCartOpen, setIsClearCartOpen] = useState(false);
  const { items: cartItems } = useCartStore();
  const clearCart = useCartStore((state) => state.clearCart);
  const formatCurrency = useFormatCurrency();

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const totalItems = useMemo(() => {
    const totalOnStore = cartItems.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    return totalOnStore > 99 ? "99+" : totalOnStore;
  }, [cartItems]);

  const translateCart = useTranslations("cart");

  const handleClearCartConfirm = () => {
    clearCart();
    setIsClearCartOpen(false);
  };

  const totalPrice = useMemo(
    () =>
      cartItems.reduce(
        (acc, item) => acc + item.item.genus_id * item.quantity,
        0
      ),
    [cartItems]
  );

  const renderCartItem = useCallback(
    (cartItem: CartItem, index: number) => {
      const displayName =
        cartItem.item.common_name || cartItem.item.scientific_name;

      return (
        <div
          key={`${cartItem.item.id}-${index}-cart-item-${getUniqueId()}`}
          className="flex w-full items-center gap-3 bg-white/5 rounded-xl p-3 border border-white/5"
        >
          {/* Thumbnail */}
          <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={cartItem.item.image_url}
              alt={displayName}
              fill
              sizes="64px"
              className="object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0 flex flex-col gap-0.5">
            <p className="text-white font-medium text-sm truncate">
              {displayName}
            </p>
            <p className="text-white/40 text-xs">
              {translateCart("checkout") === "Checkout"
                ? "Qty"
                : "Qtd"}: {cartItem.quantity}
            </p>
            <p className="text-emerald-400 text-sm font-semibold">
              {formatCurrency(cartItem.item.genus_id * cartItem.quantity)}
            </p>
          </div>

          {/* Quantity controls */}
          <QuantityShortcut
            cartItem={cartItem}
            className="!flex-col !min-w-[2.5rem] !w-[2.5rem] !relative !border-none !min-h-[5rem]"
          />
        </div>
      );
    },
    [formatCurrency, translateCart]
  );

  return (
    <div className={`relative flex items-center ${className}`}>
      {/* Cart icon button */}
      <button
        className="flex items-center justify-center relative"
        onClick={handleToggleMenu}
        aria-label={translateCart("shoppingCart")}
      >
        <Image
          src={shopIcon}
          className="w-8 h-8 md:w-9 md:h-9"
          alt="Shop icon"
          width={36}
          height={36}
        />
        {cartItems.length > 0 && (
          <span className="absolute -top-1 -right-1 text-[10px] font-bold rounded-full bg-emerald-500 w-5 h-5 flex items-center justify-center text-white">
            {totalItems}
          </span>
        )}
      </button>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[9998] transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={handleToggleMenu}
      />

      {/* Slide-out panel */}
      <div
        className={`fixed top-0 right-0 h-dvh w-full sm:w-96 bg-[#1a2e1a] border-l border-white/10 shadow-2xl z-[9999] flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Panel header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 flex-shrink-0">
          <button
            className="flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 rounded-lg p-2 transition-colors"
            type="button"
            aria-label={translateCart("closeShoppingCart")}
            title={translateCart("closeShoppingCart")}
            onClick={handleToggleMenu}
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
            >
              <path d="M18 6L6 18" />
              <path d="M6 6l12 12" />
            </svg>
          </button>

          <h2 className="text-white font-semibold text-base" style={{ fontFamily: "Georgia, serif" }}>
            {translateCart("shoppingCart")}
          </h2>

          <div className="flex items-center gap-2">
            <ClearCartModal
              isOpen={isClearCartOpen}
              onClose={() => setIsClearCartOpen(false)}
              onConfirm={handleClearCartConfirm}
              itemCount={cartItems.length}
            />
            {cartItems.length > 0 && (
              <button
                title={translateCart("clearCart")}
                aria-label={translateCart("clearCart")}
                type="button"
                className="text-white/40 hover:text-red-400 rounded-lg p-2 transition-colors"
                onClick={() => setIsClearCartOpen(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Cart items list */}
        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
          {cartItems.length > 0 ? (
            cartItems.map((cartItem, index) => renderCartItem(cartItem, index))
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 py-16 text-white/30">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-40"
              >
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              <p className="text-sm">{translateCart("noItemsInCart")}</p>
            </div>
          )}
        </div>

        {/* Footer: summary + checkout */}
        {cartItems.length > 0 && (
          <div className="flex-shrink-0 border-t border-white/10 px-4 py-4 bg-[#1a2e1a]">
            {/* Summary */}
            <div className="flex justify-between items-center mb-3 text-sm">
              <span className="text-white/50">
                {totalItems} {totalItems === 1 ? "item" : "items"}
              </span>
              <span className="text-white font-bold text-lg">
                {formatCurrency(totalPrice)}
              </span>
            </div>

            <CheckoutShortcut className="w-full" />
          </div>
        )}
      </div>
    </div>
  );
}
