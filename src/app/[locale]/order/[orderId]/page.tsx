"use client";

import { FC } from "react";
import DefaultLayout from "@/layouts/DefaultLayout";
import { useParams } from "next/navigation";
import { useOrderStore } from "@/store/orderStore";
import { useTranslations } from "next-intl";
import { FaCreditCard, FaUser, FaBox } from "react-icons/fa";
import { useFormatCurrency } from "@/hooks/useFormatCurrency";
import QRCode from "react-qr-code";
import RandomBackground from "@/blocks/randomBackground";

const PaymentPage: FC = () => {
  const { orderId } = useParams();
  const order = useOrderStore((state) => state.getOrder(orderId as string));
  const allOrders = useOrderStore((state) => state.getAllOrders());
  const t = useTranslations("payment");
  const formatCurrency = useFormatCurrency();

  console.log("allOrders:", allOrders);


  const renderPaymentMethod = () => {
    if (!order) return null;

    switch (order.paymentInfo.paymentMethod) {
      case "creditCard":
        return (
          <div className="bg-black/20 p-6 rounded-lg text-center">
            <FaCreditCard className="text-4xl mx-auto mb-4 text-green-500" />
            <h3 className="text-xl font-bold mb-2">{t("processingPayment")}</h3>
            <p>{t("creditCardProcessing")}</p>
          </div>
        );

      case "pix":
      case "bitcoin":
        return (
          <div className="bg-black/20 p-6 rounded-lg text-center">
            <div className="bg-white p-4 rounded-lg inline-block mx-auto mb-4">
              <QRCode value={order.paymentInfo.qrCodeUrl || ""} size={200} />
            </div>
            <p className="mt-4">{t("scanQRCode")}</p>
          </div>
        );

      case "boleto":
        return (
          <div className="bg-black/20 p-6 rounded-lg text-center">
            <a
              href={order.paymentInfo.boletoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg"
            >
              {t("downloadBoleto")}
            </a>
          </div>
        );

      case "paypal":
        return (
          <div className="bg-black/20 p-6 rounded-lg text-center">
            <a
              href={order.paymentInfo.paypalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg"
            >
              {t("proceedToPayPal")}
            </a>
          </div>
        );
    }
  };

  return (
    <DefaultLayout>
      {order ? (
        <>
          <RandomBackground />

          <div className="container mx-auto px-4 py-8 max-w-4xl z-10 text-white">
            <h2 className="text-2xl font-bold mb-6">{t("paymentTitle")}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="space-y-4 bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                  <div className="flex items-center gap-2">
                    <FaBox className="text-green-500" />
                    <h3 className="text-xl font-semibold">{t("orderSummary")}</h3>
                  </div>
                  <div className="space-y-2">
                    <p>{t("orderId")}: {order.orderId}</p>
                    <div className="flex justify-between pt-2 border-t border-white/10">
                      <p className="font-bold">{t("total")}</p>
                      <p className="font-bold">{formatCurrency(order.total)}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                  <div className="flex items-center gap-2">
                    <FaUser className="text-green-500" />
                    <h3 className="text-xl font-semibold">{t("customerInfo")}</h3>
                  </div>
                  <div className="space-y-2">
                    <p>{order.customerInfo.personalInfo.fullName}</p>
                    <p>{order.customerInfo.personalInfo.email}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                <div className="flex items-center gap-2 mb-4">
                  <FaCreditCard className="text-green-500" />
                  <h3 className="text-xl font-semibold">{t("paymentMethod")}</h3>
                </div>
                <div className="bg-white/5 backdrop-blur-md rounded-lg">
                  {renderPaymentMethod()}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center p-8">Order not found</div>
      )}
    </DefaultLayout>
  );
};

export default PaymentPage;
