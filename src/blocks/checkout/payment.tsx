"use client";

import { useState } from "react";
import { FieldValues, useForm, UseFormRegister } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import Button from "@/components/Button";
import Link from "@/components/Link";
import { TextInput } from "@/components/forms/TextInput";
import { RadioGroup } from "@/components/forms/RadioGroup";
import { usePaymentStore } from "@/store/paymentStore";
import { PaymentInformation, PaymentMethod } from "@/types/payment";
import { getPaymentSchema } from "@/schemas/checkout/payment";
import MaskedInput from "@/components/forms/MaskedInput";
import CreditCard from "@/components/CreditCard";
import { useRouter } from "next/navigation";

const PaymentStep = () => {
  const t = useTranslations('payment');
  const tCheckout = useTranslations('checkout');
  const [selectedMethod, setSelectedMethod] = useState<string>("creditCard");
  const { paymentInfo, setPaymentInfo } = usePaymentStore();
  const router = useRouter();

  const paymentValidationMessages = {
    number: t('creditCard.number.required'),
    name: t('creditCard.name.required'),
    expirationDate: t('creditCard.expirationDate.required'),
    cvv: t('creditCard.cvv.required'),
    boletoNumber: t('boleto.number.required'),
    paymentInfoRequired: t('information.required'),
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PaymentInformation>({
    resolver: zodResolver(getPaymentSchema(paymentValidationMessages)),
    defaultValues: paymentInfo,
    mode: "onChange",
  });

  const watchedCardNumber = watch("creditCard.number") || '';
  const watchedCardName = watch("creditCard.name") || '';
  const watchedExpirationDate = watch("creditCard.expirationDate") || '';
  const watchedCVV = watch("creditCard.cvv") || '';

  const paymentMethods = [
    { value: "creditCard", label: t('methods.creditCard') },
    { value: "boleto", label: t('methods.boleto') },
    { value: "pix", label: t('methods.pix') },
    { value: "bitcoin", label: t('methods.bitcoin') },
    { value: "paypal", label: t('methods.paypal') },
  ];

  const onSubmit = async (data: PaymentInformation) => {
    try {
      setPaymentInfo(data);

      router.push("/checkout?step=confirmation");
    } catch (error) {
      console.error("Failed to process payment:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full space-y-6 transition-all duration-300 ease-in-out"
    >
      <section className="flex flex-col gap-4 h-full">
        <div className="min-h-[15rem] md:min-h-full">
          <RadioGroup
            name="paymentMethod"
            label={t('paymentMethods')}
            options={paymentMethods}
            value={selectedMethod}
            onChange={(value) => setSelectedMethod(value)}
            register={register as unknown as UseFormRegister<FieldValues>}
          />
        </div>

        {selectedMethod === "creditCard" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full h-full">
            <div className="flex flex-col gap-4">
              <MaskedInput
                label={t('creditCard.number.label')}
                name="creditCard.number"
                register={register as unknown as UseFormRegister<FieldValues>}
                error={errors.creditCard?.number?.message}
                mask="creditCard"
              />

              <TextInput
                label={t('creditCard.name.label')}
                name="creditCard.name"
                register={register as unknown as UseFormRegister<FieldValues>}
                error={errors.creditCard?.name?.message}
              />

              <div className="grid grid-cols-2 gap-4">
                <MaskedInput
                  label={t('creditCard.expirationDate.label')}
                  name="creditCard.expirationDate"
                  register={register as unknown as UseFormRegister<FieldValues>}
                  error={errors.creditCard?.expirationDate?.message}
                  mask="expirationDate"
                />

                <MaskedInput
                  label={t('creditCard.cvv.label')}
                  name="creditCard.cvv"
                  register={register as unknown as UseFormRegister<FieldValues>}
                  error={errors.creditCard?.cvv?.message}
                  mask="cvv"
                />
              </div>
            </div>
            <div className="flex w-full items-center justify-center">
              <CreditCard
                cardNumber={watchedCardNumber || ''}
                cardHolderName={watchedCardName || ''}
                expirationDate={watchedExpirationDate || ''}
                securityCode={watchedCVV || ''}
                className="bg-gradient-to-br from-green-900 to-green-700"
              />
            </div>
          </div>
        )}

        {selectedMethod === "boleto" && (
          <div className="p-4 bg-primary/70 rounded-lg">
            <p className="text-center">{t('boleto.description')}</p>
          </div>
        )}

        {selectedMethod === "pix" && (
          <div className="p-4 bg-primary/70 rounded-lg">
            <p className="text-center">{t('pix.description')}</p>
          </div>
        )}

        {selectedMethod === "bitcoin" && (
          <div className="p-4 bg-primary/70 rounded-lg">
            <p className="text-center">{t('bitcoin.description')}</p>
          </div>
        )}

        {selectedMethod === "paypal" && (
          <div className="p-4 bg-primary/70 rounded-lg">
            <p className="text-center">{t('paypal.description')}</p>
          </div>
        )}
      </section>

      <div className="grid grid-cols-2 gap-4 items-center justify-between">
        <Link href="/checkout?step=customer" className="w-max">
          <Button
            type="button"
            loading={isSubmitting}
            label={tCheckout('back')}
            className="w-auto"
          />
        </Link>

        {selectedMethod === "creditCard" &&
          <Button
            type="submit"
            loading={isSubmitting}
            label={tCheckout('next')}
            className="w-auto ml-auto bg-green-500 hover:bg-green-600"
          />
        }

        {selectedMethod !== "creditCard" &&
          <Link href="/checkout?step=confirmation" className="w-max ml-auto">
            <Button
              type="button"
              loading={isSubmitting}
              label={tCheckout('next')}
              className="w-auto ml-auto bg-green-500 hover:bg-green-600"
              onClick={() => {
                setPaymentInfo({
                  paymentMethod: selectedMethod as PaymentMethod,
                });
              }}
            />
          </Link>
        }

      </div>
    </form>
  );
};

export default PaymentStep;
