"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import Image from "next/image";
import shopIcon from "@/assets/svg/shop-icon.svg";
import CheckoutShortcut from "./checkoutShortcut";
import { useCartStore } from "@/store/cartStore";
import { QuantityShortcut } from "./quantityShortcut";
import { Modal } from "@/components/Modal";
import { getUniqueId } from "@/utils/getUniqueId";
import { CartItem } from "@/types/cartItem";
import { useTranslations } from 'next-intl';

interface ShoppingCartProps {
  className?: string;
}

export function ShoppingCart({ className }: ShoppingCartProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isClearCartOpen, setIsClearCartOpen] = useState(false);
  const { items: cartItems } = useCartStore();
  const clearCart = useCartStore((state) => state.clearCart);
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

  const translateCart = useTranslations('cart');

  const handleClearCartConfirm = () => {
    clearCart();
    setIsClearCartOpen(false);
  };

  useEffect(() => {
  }, [cartItems]);

  const renderCartItem = useCallback((cartItem: CartItem, index: number) => (
    <div
      key={`${cartItem.item.id}-${index}-cart-item-on-cart-${getUniqueId()}`}
      className="flex w-full items-center p-4 gap-5 bg-white/5 rounded-lg"
    >
      <div className="w-1/5">
        <Image
          src={cartItem.item.image_url}
          alt={
            cartItem.item.common_name ||
            cartItem.item.scientific_name
          }
          width={80}
          height={80}
          className="min-w-[4rem] w-full h-auto object-cover rounded scale-150 overflow-hidden border border-white/20 max-h-[4.7rem] ml-1"
        />
      </div>

      <div className="w-[65%] px-4 flex flex-col space-y-1">
        <h3 className="font-medium text-lg">
          {cartItem.item.common_name ||
            cartItem.item.scientific_name}
        </h3>
        <span className="text-sm text-gray-300">
          Quantity: {cartItem.quantity}
        </span>
        <span className="font-semibold">
          ${cartItem.item.genus_id * cartItem.quantity}
        </span>
      </div>

      <QuantityShortcut
        cartItem={cartItem}
        className="!flex-col !min-w-[0.001rem] !w-[3rem] !relative !-mr-4 !border-none"
      />
    </div>
  ), []);

  return (
    <div className={`flex flex-col items-center space-y-4 ${className}`}>
      <button
        className="flex items-center justify-between w-full relative"
        onClick={handleToggleMenu}
      >
        <Image
          src={shopIcon}
          className="md:w-11 md:h-11 max-w-[44px] max-h-[44px]"
          alt="Shop icon"
        />
        {cartItems.length > 0 && (
          <span className="absolute -top-1 right-0 text-white text-lg font-bold rounded-full bg-primary w-6 h-6 flex items-center justify-center border border-white/20">
            {totalItems}
          </span>
        )}
      </button>

      <div
        className={`absolute inset-y-0 right-0 flex-grow w-full bg-primary/90 backdrop-blur-sm h-[99vh] md:h-screen border-l border-white/20 shadow-sm max-w-xs md:max-w-sm -top-4 z-[9999] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300`}
      >
        <div className="relative  overflow-hidden overflow-y-auto h-[90vh]">
          <div className="fixed bg-primary flex items-center justify-between w-full text-white border-b border-white/20  py-2  z-[99]">
            <button
              className="flex items-center justify-center mr-4 mt-1 text-white hover:bg-white/10 hover:text-gray-50 rounded-full p-2"
              type="button"
              aria-label="Close shopping cart"
              title={translateCart('closeShoppingCart')}
              onClick={handleToggleMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
                />
              </svg>
            </button>

            <p className="text-2xl font-bold w-full text-center">
              {translateCart('shoppingCart')}
            </p>

            <div className="flex flex-col gap-1">
            <Modal
              isOpen={isClearCartOpen}
              onClose={() => setIsClearCartOpen(false)}
              id="clear-cart-modal"
              title={translateCart('clearCart')}
            >
              <div className="flex flex-col gap-4 justify-start">
                <p className="text-lg text-center">
                  {translateCart('clearCartConfirmation')}
                </p>
                <div className="flex justify-end gap-2 w-full">
                  <button
                    onClick={() => setIsClearCartOpen(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md w-full"
                  >
                    {translateCart('cancel')}
                  </button>
                  <button
                    onClick={() => handleClearCartConfirm()}
                    className=" text-white bg-red-500 px-4 py-2 rounded-md w-full"
                  >
                    {translateCart('clear')}
                  </button>
                </div>
              </div>
            </Modal>
              <button
                title={translateCart('clearCart')}
                aria-label={translateCart('clearCart')}
                type="button"
                className="text-white hover:text-red-500 rounded-full p-2 transition-all duration-300"
                onClick={() => setIsClearCartOpen(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="34"
                  height="34"
                  viewBox="0 0 16 16"
                >
                  <g fill="none">
                    <g clipPath="url(#gravityUiBroomMotion0)">
                      <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M11.995.667a.75.75 0 1 0-1.49.166L11.19 7h-.867c-1.64 0-2.896 1.449-3.197 3.06a12.6 12.6 0 0 1-1.2 3.44C5.434 14.448 5 15 5 15h8.5s2.08-1.734 2.488-5.49C16.14 8.094 14.91 7 13.488 7H12.7zM3.75 2.5a.75.75 0 1 0 0 1.5h4.5a.75.75 0 0 0 0-1.5zM.75 6a.75.75 0 1 0 0 1.5h5.5a.75.75 0 0 0 0-1.5zM1 10.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75m6.593 3.25c.393-.866.78-1.94 1.008-3.165C8.819 9.167 9.646 8.5 10.322 8.5h3.167c.332 0 .618.13.797.303a.63.63 0 0 1 .21.545c-.175 1.622-.708 2.779-1.173 3.514a6 6 0 0 1-.461.638h-.999c.539-.706.887-1.728.887-2.75H12c-.351 1.229-1.072 2.088-2.162 2.75z"
                        clipRule="evenodd"
                      />
                    </g>
                    <defs>
                      <clipPath id="gravityUiBroomMotion0">
                        <path fill="currentColor" d="M0 0h16v16H0z" />
                      </clipPath>
                    </defs>
                  </g>
                </svg>
              </button>
            </div>
          </div>

          <div
            className={`flex flex-col items-center space-y-4 min-w-[17rem] px-2 md:h-[80vh] mt-[5rem] pb-[5rem] md:pb-[10rem] text-white max-h-[]`}
          >
            {cartItems.length > 0 ? (
              cartItems.map((cartItem, index) => renderCartItem(cartItem, index))
            ) : (
              <p>{translateCart('noItemsInCart')}</p>
            )}
          </div>

          <div className="fixed mt-auto bottom-14 md:bottom-0 w-full bg-transparent md:mb-2">
            <CheckoutShortcut
              className="w-full max-w-[17rem] md:max-w-sm md:px-2 mx-auto "
            />
          </div>
        </div>
      </div>

      <button
        className={` min-w-screen min-h-screen bg-black/10 backdrop-blur-xs z-[5] -top-4 ${
          isOpen ? "absolute inset-0" : "hidden"
        } transition-transform duration-300`}
        onClick={handleToggleMenu}
      ></button>
    </div>
  );
}
