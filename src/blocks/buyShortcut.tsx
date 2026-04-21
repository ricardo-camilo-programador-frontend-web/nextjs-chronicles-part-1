"use client";

import { Plant } from "@/types/plant.types";
import Image from "next/image";
import shopIcon from "@/assets/svg/shop-icon.svg";
import { useCartStore } from "@/store/cartStore";
import QuantityShortcut from "@/blocks/quantityShortcut";
import Button from "@/components/Button";
import { useToast } from "@/hooks/useToast";
import { useTranslations } from "next-intl";

interface BuyShortcutProps {
  plant: Plant;
  className?: string;
  showIcon?: boolean;
  quantityClassName?: string;
  shopIconClassName?: string;
  loading?: boolean;
  variant?: "default" | "compact";
}

export const BuyShortcut = ({
  plant,
  className,
  shopIconClassName,
  showIcon = true,
  quantityClassName,
  loading,
  variant = "default",
}: BuyShortcutProps) => {
  const { addItem } = useCartStore();
  const cartItems = useCartStore.getState().items;
  const toast = useToast();
  const t = useTranslations('buyShortcut');

  const itemExistsOnCart = () => {
    return cartItems.some((item) => item.item.id === plant.id);
  };

  if (variant === "compact") {
    return itemExistsOnCart() ? (
      <div className="flex items-center justify-center gap-3 py-2">
        <QuantityShortcut
          cartItem={{ item: plant, quantity: 1 }}
          className={quantityClassName}
        />
      </div>
    ) : (
      <button
        onClick={() => {
          addItem(plant);
          toast.success(`${plant.common_name || plant.scientific_name} ${t('success')}`);
        }}
        type="button"
        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg py-2.5 font-medium text-sm transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25"
        title={`Buy ${plant.common_name || plant.scientific_name}`}
      >
        {t('addToCart')}
      </button>
    );
  }

  return itemExistsOnCart() ? (
    <QuantityShortcut
      cartItem={{ item: plant, quantity: 1 }}
      className={`${quantityClassName}`}
    />
  ) : (
    <Button
      onClick={() => {
        addItem(plant);
        toast.success(`${plant.common_name || plant.scientific_name} ${t('success')}`);
      }}
      type="button"
      loading={loading}
      className={`${className}`}
      title={`Buy ${plant.common_name || plant.scientific_name} plants`}
    >
        {showIcon && (
          <Image
            src={shopIcon}
            className={`w-11 h-11 max-w-[44px] max-h-[44px] ${shopIconClassName}`}
            alt="Shop icon"
          />
        )}
      {!showIcon && <span className="text-sm">Buy now</span>}
    </Button>
  );
};
