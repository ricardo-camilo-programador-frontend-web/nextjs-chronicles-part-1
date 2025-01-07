"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import shopIcon from "@/assets/svg/shop-icon.svg";
import { handleWithBlockScroll } from "@/utils/handleWithBlockScroll";
import CheckoutShortcut from "./checkoutShortcut";
import { useShoppingCartStore } from "@/store/shoppingCartStore";

interface ShoppingCartProps {
  className?: string;
}

export function ShoppingCart({ className }: ShoppingCartProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { items: cartItems } = useShoppingCartStore();
  const removeItem = useShoppingCartStore((state) => state.removeItem);
  const clearCart = useShoppingCartStore((state) => state.clearCart);

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);

    handleWithBlockScroll(isOpen);
  };

  const totalItems = () => {
    const totalOnStore = cartItems.reduce(
      (acc, item) => acc + item.quantity,
      0
    );

    if (totalOnStore > 99) {
      return "99+";
    }

    return totalOnStore;
  };

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  return (
    <div className={`flex flex-col items-center space-y-4 ${className}`}>
      <button
        className="flex items-center justify-between w-full relative"
        onClick={handleToggleMenu}
      >
        <Image
          src={shopIcon}
          className="w-11 h-11 max-w-[44px] max-h-[44px]"
          alt="Shop icon"
        />
        {cartItems.length > 0 && (
          <span className="absolute -top-1 right-0 text-white text-lg font-bold rounded-full bg-primary w-6 h-6 flex items-center justify-center border border-white/20">
            {totalItems()}
          </span>
        )}
      </button>

      <div
        className={`absolute inset-y-0 right-0 flex-grow w-full bg-primary/90 backdrop-blur-sm h-[99vh] border-l border-white/20 shadow-sm max-w-xs -top-4 z-[9999] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300`}
      >
        <div className="relative  overflow-hidden overflow-y-auto">
          <div className="fixed bg-primary flex items-center justify-between w-full text-white border-b border-white/20  py-2  z-[99]">
            <button
              className="flex items-center justify-center mr-4 mt-1 text-white hover:bg-white/10 hover:text-gray-50 rounded-full p-2"
              type="button"
              aria-label="Close shopping cart"
              title="Close shopping cart"
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
              Shopping Cart
            </p>

            <button
              className="text-white hover:text-gray-50 rounded-full p-2"
              onClick={clearCart}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="34"
                height="34"
                viewBox="0 0 16 16"
              >
                <g fill="none">
                  <g clip-path="url(#gravityUiBroomMotion0)">
                    <path
                      fill="currentColor"
                      fill-rule="evenodd"
                      d="M11.995.667a.75.75 0 1 0-1.49.166L11.19 7h-.867c-1.64 0-2.896 1.449-3.197 3.06a12.6 12.6 0 0 1-1.2 3.44C5.434 14.448 5 15 5 15h8.5s2.08-1.734 2.488-5.49C16.14 8.094 14.91 7 13.488 7H12.7zM3.75 2.5a.75.75 0 1 0 0 1.5h4.5a.75.75 0 0 0 0-1.5zM.75 6a.75.75 0 1 0 0 1.5h5.5a.75.75 0 0 0 0-1.5zM1 10.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75m6.593 3.25c.393-.866.78-1.94 1.008-3.165C8.819 9.167 9.646 8.5 10.322 8.5h3.167c.332 0 .618.13.797.303a.63.63 0 0 1 .21.545c-.175 1.622-.708 2.779-1.173 3.514a6 6 0 0 1-.461.638h-.999c.539-.706.887-1.728.887-2.75H12c-.351 1.229-1.072 2.088-2.162 2.75z"
                      clip-rule="evenodd"
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

          <div
            className={`flex flex-col items-center space-y-4 min-w-[17rem] px-2 -mt-[5rem] h-[100vh] pt-[10rem] text-white`}
          >
            {cartItems.length > 0 ? (
              cartItems.map((cartItem, index) => (
                <div
                  key={cartItem.item.id + index}
                  className="flex w-full items-center p-4 bg-white/5 rounded-lg"
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
                      className="w-full h-auto object-cover rounded scale-150"
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
                      ${cartItem.item.genus_id.toLocaleString()}
                    </span>
                  </div>

                  <div className="w-[15%] flex justify-center">
                    <button
                      onClick={() => removeItem(cartItem.item.id)}
                      className="p-2 hover:bg-white/10 rounded-full transition-colors"
                      aria-label="Remove item"
                      title="Remove item"
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
                        <path d="M3 6h18" />
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No items in cart</p>
            )}
          </div>

          <div className="fixed mt-auto bottom-0 w-full bg-transparent">
            <CheckoutShortcut
              total={0}
              className="w-full max-w-[17rem] mx-auto "
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
