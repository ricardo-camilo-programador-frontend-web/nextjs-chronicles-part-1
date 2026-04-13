"use client";

import type { FC } from "react";
import DefaultLayout from "@/layouts/DefaultLayout";
import RandomBackground from "@/blocks/randomBackground";
import { useOrderStore } from "@/store/orderStore";
import { useTranslations } from "next-intl";
import { useFormatCurrency } from "@/hooks/useFormatCurrency";
import Link from "@/components/Link";
import { FaBox, FaMapMarkerAlt, FaCreditCard } from "react-icons/fa";

const OrdersPage: FC = () => {
  const t = useTranslations("orders");
  const allOrders = useOrderStore((state) => state.getAllOrders());
  const formatCurrency = useFormatCurrency();

  return (
    <DefaultLayout>
      <RandomBackground />

      <div className="min-h-screen flex justify-center">
        <div className="w-full flex flex-col mx-auto px-4 py-8 max-w-4xl z-10 text-foreground">
          <h2 className="text-2xl font-bold mb-6">{t("ordersTitle")}</h2>

          {allOrders.length === 0 ? (
            <div className="bg-surface backdrop-blur-md rounded-lg p-8 text-center border border-surface-border">
              <p>{t("noOrders")}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {allOrders.map((order) => (
                <div
                  key={order.orderId}
                  className="bg-surface backdrop-blur-md rounded-lg p-6 border border-surface-border space-y-4 min-w-[17rem]"
                >
                  <div className="flex justify-between items-center gap-4">
                    {order.shippingMethod?.name && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <FaMapMarkerAlt className="text-success" />
                        <span className="font-semibold">{t("shipping")}</span>
                      </div>
                       <p className="text-sm text-muted">{order.shippingMethod?.name}</p>
                        <p className="text-sm text-muted">{order.shippingAddress.city}, {order.shippingAddress.state}</p>
                      </div>
                    )}

                    {!order.shippingMethod?.name && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <FaMapMarkerAlt className="text-success" />
                          <span className="font-semibold">{t("shipping")}</span>
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <FaCreditCard className="text-success" />
                        <span className="font-semibold">{t("payment")}</span>
                      </div>
                      <p className="text-sm text-muted">{order.paymentInfo.paymentMethod}</p>
                      <p className="text-sm text-success">{order.status}</p>
                    </div>

                    <div className="space-y-2">
                      <p className="font-semibold">{t("total")}</p>
                      <p className="text-xl font-bold text-accent">
                        {formatCurrency(order.total)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 border-b border-surface-border pt-8">
                    <FaBox className="text-success w-auto h-auto" />
                    <Link
                      href={`/order/${order.orderId}`}
                      className="group text-xl flex gap-2 items-center font-semibold transition-all duration-300 ease-in-out"
                    >
                      <span className="flex items-center gap-2">
                        {t("orderId")}:{" "}
                        <span className="text-accent underline decoration-dotted underline-offset-4 group-hover:text-accent/80 group-hover:decoration-solid">
                          {order.orderId}
                        </span>
                      </span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default OrdersPage;
