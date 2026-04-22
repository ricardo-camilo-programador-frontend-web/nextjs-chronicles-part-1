"use client";

import { useState, useMemo, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import shopIcon from "@/assets/svg/shop-icon.svg";
import { useCartStore } from "@/store/cartStore";
import { ClearCartModal } from "@/components/cart/ClearCartModal";
import { RemoveCartItemModal } from "@/components/cart/RemoveCartItemModal";
import { getUniqueId } from "@/utils/getUniqueId";
import { CartItem } from "@/types/cartItem";
import { useTranslations } from "next-intl";
import { useFormatCurrency } from "@/hooks/useFormatCurrency";
import Link from "next/link";

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

  const handleClose = () => {
    setIsOpen(false);
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

  const incrementItemQuantity = useCartStore((state) => state.addItem);
  const decrementItemQuantity = useCartStore((state) => state.decrementItemQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const [removingItemId, setRemovingItemId] = useState<number | null>(null);

  const renderCartItem = useCallback(
    (cartItem: CartItem, index: number) => {
      const displayName =
        cartItem.item.common_name || cartItem.item.scientific_name;
      const unitPrice = cartItem.item.genus_id;
      const lineTotal = unitPrice * cartItem.quantity;

      const handleDecrement = () => {
        if (cartItem.quantity === 1) {
          setRemovingItemId(cartItem.item.id);
          return;
        }
        decrementItemQuantity(cartItem.item);
      };

      const handleIncrement = () => {
        incrementItemQuantity(cartItem.item);
      };

      return (
        <div
          key={`${cartItem.item.id}-${index}-cart-item-${getUniqueId()}`}
          className="group relative bg-white/[0.03] hover:bg-white/[0.06] rounded-2xl border border-white/[0.06] hover:border-white/10 transition-all duration-300 overflow-hidden"
        >
          <div className="flex gap-3 p-3">
            {/* Thumbnail */}
            <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-black/20">
              <Image
                src={cartItem.item.image_url}
                alt={displayName}
                fill
                sizes="80px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
              <div>
                <p className="text-white font-medium text-[0.8rem] leading-tight truncate pr-6">
                  {displayName}
                </p>
                <p className="text-white/25 text-[0.65rem] mt-0.5">
                  {formatCurrency(unitPrice)} each
                </p>
              </div>

              <div className="flex items-center justify-between mt-1.5">
                {/* Quantity controls */}
                <div className="flex items-center gap-0">
                  <button
                    type="button"
                    onClick={handleDecrement}
                    className="w-7 h-7 flex items-center justify-center rounded-lg text-white/40 hover:text-white hover:bg-white/10 active:scale-90 transition-all duration-150"
                    aria-label="Decrease quantity"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M5 12h14" />
                    </svg>
                  </button>

                  <span className="w-7 text-center text-white text-xs font-semibold tabular-nums">
                    {cartItem.quantity}
                  </span>

                  <button
                    type="button"
                    onClick={handleIncrement}
                    className="w-7 h-7 flex items-center justify-center rounded-lg text-white/40 hover:text-emerald-400 hover:bg-emerald-500/10 active:scale-90 transition-all duration-150"
                    aria-label="Increase quantity"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M12 5v14" />
                      <path d="M5 12h14" />
                    </svg>
                  </button>
                </div>

                {/* Line total */}
                <p className="text-white font-bold text-sm tabular-nums">
                  {formatCurrency(lineTotal)}
                </p>
              </div>
            </div>
          </div>

          {/* Remove button — appears on hover */}
          <button
            type="button"
            onClick={() => {
              setRemovingItemId(cartItem.item.id);
            }}
            className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full text-white/0 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 group-hover:text-white/20"
            aria-label="Remove item"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18" />
              <path d="M6 6l12 12" />
            </svg>
          </button>
        </div>
      );
    },
    [formatCurrency, incrementItemQuantity, decrementItemQuantity]
  );

  const panel = isOpen ? (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm animate-fade-in"
        style={{ zIndex: 9998 }}
        onClick={handleClose}
      />

      {/* Slide-out panel */}
      <div
        className="fixed top-0 right-0 h-dvh w-full sm:w-96 bg-[#1a2e1a] border-l border-white/10 shadow-2xl flex flex-col translate-x-0 transition-transform duration-300"
        style={{ zIndex: 9999 }}
      >
        {/* Panel header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 flex-shrink-0">
          <button
            className="flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 rounded-lg p-2 transition-colors"
            type="button"
            aria-label={translateCart("closeShoppingCart")}
            title={translateCart("closeShoppingCart")}
            onClick={handleClose}
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

          <h2
            className="text-white font-semibold text-base"
            style={{ fontFamily: "Georgia, serif" }}
          >
            {translateCart("shoppingCart")}
          </h2>

          <div className="flex items-center gap-2">
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
            cartItems.map((cartItem, index) =>
              renderCartItem(cartItem, index)
            )
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
          <div className="flex-shrink-0 border-t border-white/10 bg-[#1a2e1a]">
            {/* Total */}
            <div className="flex justify-between items-center px-5 pt-4 pb-2">
              <span className="text-white/40 text-xs uppercase tracking-wider">
                {translateCart("checkout")}
              </span>
              <span className="text-white font-bold text-xl" style={{ fontFamily: "Georgia, serif" }}>
                {formatCurrency(totalPrice)}
              </span>
            </div>

            {/* Checkout button */}
            <div className="px-4 pb-4 pt-1">
              <Link
                href="/checkout?step=shipping"
                className="group flex items-center justify-between bg-accent hover:bg-accent/90 text-primary py-3.5 px-4 rounded-xl font-semibold text-sm transition-all duration-300 w-full"
              >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <line x1="2" x2="22" y1="10" y2="10" />
                  </svg>
                  <span className="flex-1 text-center">{translateCart("checkout")}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Modals — z-index 10000, above cart panel */}
      <ClearCartModal
        isOpen={isClearCartOpen}
        onClose={() => setIsClearCartOpen(false)}
        onConfirm={handleClearCartConfirm}
        itemCount={cartItems.length}
      />

      {removingItemId !== null && (() => {
        const targetItem = cartItems.find(ci => ci.item.id === removingItemId);
        if (!targetItem) return null;
        return (
          <RemoveCartItemModal
            isOpen={true}
            onClose={() => setRemovingItemId(null)}
            cartItem={targetItem}
            onConfirm={() => {
              removeItem(targetItem.item);
              setRemovingItemId(null);
            }}
          />
        );
      })()}
    </>
  ) : null;

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

      {typeof document !== "undefined" && panel && createPortal(panel, document.body)}
    </div>
  );
}
