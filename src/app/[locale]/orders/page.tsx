"use client";

import type { FC } from "react";
import DefaultLayout from "@/layouts/DefaultLayout";
import RandomBackground from "@/blocks/randomBackground";
import { useOrderStore } from "@/store/orderStore";
import { useTranslations } from "next-intl";
import { useFormatCurrency } from "@/hooks/useFormatCurrency";
import Link from "@/components/Link";
const OrdersPage: FC = () => {
  const t = useTranslations("orders");
  const allOrders = useOrderStore((state) => state.getAllOrders());
  const formatCurrency = useFormatCurrency();

  return (
    <DefaultLayout>
      <RandomBackground />

      <div className="min-h-screen flex justify-center">
        <div className="w-full flex flex-col items-center mx-auto px-4 py-8 max-w-7xl z-10 text-white">
          <h2 className="text-2xl font-bold mb-6 mr-auto">
            {t("ordersTitle")}
          </h2>

          {allOrders.length === 0 ? (
            <p className="text-center">{t("noOrders")}</p>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {allOrders.map((order) => (
                <div
                  key={order.orderId}
                  className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20"
                >
                  <Link
                    href={`/order/${order.orderId}`}
                    className="text-lg font-bold mb-2"
                  >
                    {t("orderId")}: {order.orderId}
                  </Link>
                  <p>
                    {t("total")}: {formatCurrency(order.total)}
                  </p>
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
