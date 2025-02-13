"use client";

import { FC } from "react";
import Button from "@/components/Button";
import Link from "@/components/Link";
import { useCartStore } from "@/store/cartStore";
import { useCustomerStore } from "@/store/customerStore";
import { useCheckoutStore } from "@/store/checkoutStore";
import { useTranslations } from "next-intl";
import { FaBox, FaCreditCard, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { CartItem } from "@/types/cartItem";
import { useFormatCurrency } from "@/hooks/useFormatCurrency";
import { usePaymentStore } from "@/store/paymentStore";

const ConfirmationStep: FC = () => {
  const t = useTranslations("checkout.confirmation");
  const tShipping = useTranslations("checkout.shipping");
  const { items } = useCartStore();
  const { shippingAddress, selectedShippingMethod } = useCheckoutStore();
  const { customerInfo } = useCustomerStore();
  const formatCurrency = useFormatCurrency();
  const { paymentInfo } = usePaymentStore();
  const subtotal = items.reduce((acc, item) => acc + item.item.genus_id * item.quantity, 0);

  const renderOrderSummary = () => (
    <div className="space-y-4 bg-black/20 rounded-lg p-4">
      <h3 className="text-xl font-semibold">{t("orderSummary")}</h3>
      <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
        {items.map((item: CartItem) => (
          <div key={item.item.id} className="flex justify-between items-center py-2 border-b border-white/10">
            <div className="flex items-center gap-4">
              <img
                src={item.item.image_url}
                alt={item.item.common_name || ""}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div>
                <p className="font-medium">{item.item.common_name}</p>
                <p className="text-sm text-white/70">
                  {t("quantity")}: {item.quantity}
                </p>
              </div>
            </div>
            <p className="font-medium">{formatCurrency(item.item.genus_id * item.quantity)}</p>
          </div>
        ))}
      </div>

      <div className="space-y-2 pt-4">
        <div className="flex justify-between">
          <p>{t("subtotal")}</p>
          <p>{formatCurrency(subtotal)}</p>
        </div>
        <div className="flex justify-between">
          <p>{t("shipping")}</p>
          <p>{formatCurrency(selectedShippingMethod?.price || 0)}</p>
        </div>
        <div className="flex justify-between text-lg font-bold pt-2 border-t border-white/10">
          <p>{t("total")}</p>
          <p>{formatCurrency(subtotal + (selectedShippingMethod?.price || 0))}</p>
        </div>
      </div>
    </div>
  );

  const renderDeliveryInfo = () => (
    <div className="space-y-4 bg-black/20 rounded-lg p-4">
      <div className="flex items-center gap-2">
        <FaMapMarkerAlt className="text-green-500" />
        <h3 className="text-xl font-semibold">{t("deliveryInformation")}</h3>
      </div>
      {shippingAddress?.number && (
        <div className="space-y-2">
          <p>{shippingAddress?.street}, {shippingAddress?.number}</p>
          <p>{shippingAddress?.complement}</p>
        <p>{shippingAddress?.city}, {shippingAddress?.state}</p>
        <p>{shippingAddress?.zipCode}</p>
        <p className="text-green-500 font-medium mt-4">
          {t("estimatedDelivery")}: {selectedShippingMethod?.time}
          </p>
        </div>
      )}
      {!shippingAddress?.number && (
        <p>{tShipping("pickup")}</p>
      )}
    </div>
  );

  const renderCustomerInfo = () => (
    <div className="space-y-4 bg-black/20 rounded-lg p-4">
      <div className="flex items-center gap-2">
        <FaUser className="text-green-500" />
        <h3 className="text-xl font-semibold">{t("customerInformation")}</h3>
      </div>
      <div className="space-y-2">
        <p>{customerInfo?.personalInfo?.fullName}</p>
        <p>{customerInfo?.personalInfo?.email}</p>
        <p>{customerInfo?.personalInfo?.phoneNumber}</p>
      </div>
    </div>
  );

  const renderPaymentInfo = () => (
    <div className="space-y-4 bg-black/20 rounded-lg p-4">
      <div className="flex items-center gap-2">
        <FaCreditCard className="text-green-500" />
        <h3 className="text-xl font-semibold">{t("paymentInformation")}</h3>
      </div>
      <div className="flex items-center gap-2">
        <FaBox className="text-green-500" />
        <p>{paymentInfo.paymentMethod}</p>
      </div>
    </div>
  );

  return (
    <div className="w-full min-h-[400px] space-y-6 transition-all duration-300 ease-in-out">
      <h2 className="text-2xl font-bold mb-6">{t("title")}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          {renderCustomerInfo()}
          {renderDeliveryInfo()}
          {renderPaymentInfo()}
        </div>
        {renderOrderSummary()}
      </div>

      <div className="grid grid-cols-2 gap-4 items-center justify-between mt-8">
        <Link href="/checkout?step=payment" className="w-max">
          <Button
            type="button"
            label={t("backButton")}
            className="w-auto"
          />
        </Link>

        <Link href="/orders" className="w-max ml-auto">
          <Button
            type="button"
            label={t("confirmOrder")}
            className="w-auto ml-auto bg-green-500 hover:bg-green-600"
          />
        </Link>
      </div>
    </div>
  );
};

export default ConfirmationStep;
