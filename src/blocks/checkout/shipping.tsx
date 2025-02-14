"use client";

import type { FC } from "react";
import { useEffect, useState } from "react";
import { FieldValues, useForm, UseFormRegister } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextInput } from "@/components/forms/TextInput";
import { useCheckoutStore } from "@/store/checkoutStore";
import {
  getShippingSchema,
  ShippingFormData,
} from "@/schemas/checkout/shipping";
import { useAddressByCep } from "@/hooks/useAddressByCep";
import Button from "@/components/Button";
import { ShippingMethod } from "@/types/shippingMethod";
import { FaTruck, FaStore } from "react-icons/fa";
import DropdownSelect from "@/components/forms/DropdownSelect";
import { Country } from "@/types/country";
import { useTranslations } from "next-intl";
import Link from "@/components/Link";
import { useRouter } from "next/navigation";
import { useFormatCurrency } from "@/hooks/useFormatCurrency";
import { useToast } from "@/hooks/useToast";

interface ShippingStepProps {
  countries: Country[];
  shippingMethods: ShippingMethod[];
}

const getShippingValidationMessages = (t: (key: string) => string) => ({
  street: t("shipping.street.required"),
  number: t("shipping.number.required"),
  complement: t("shipping.complement.required"),
  neighborhood: t("shipping.neighborhood.required"),
  city: t("shipping.city.required"),
  state: t("shipping.state.required"),
  zipCode: t("shipping.zipCode.required"),
  country: t("shipping.country.required"),
});

const ShippingStep: FC<ShippingStepProps> = ({
  shippingMethods,
  countries,
}) => {
  const t = useTranslations("checkout");
  const router = useRouter();
  const {
    setShippingAddress,
    setCurrentStep,
    setSelectedShippingMethod,
    selectedShippingMethod,
    setShippingMethods,
    shippingFormData,
    setShippingFormData,
    isDelivery,
    setIsDelivery,
  } = useCheckoutStore();
  const formatCurrency = useFormatCurrency();
  const [selectedCountry, setSelectedCountry] = useState(
    shippingFormData.country || countries[0]?.cca2 || ""
  );
  const [disabledFields, setDisabledFields] = useState<boolean>(false);
  const toast = useToast();

  const shippingValidationMessages = getShippingValidationMessages(t);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ShippingFormData>({
    resolver: zodResolver(getShippingSchema(shippingValidationMessages)),
    defaultValues: {
      ...shippingFormData,
      country: shippingFormData.country || countries[0]?.cca2 || "",
    },
  });

  const { isLoadingCep, fetchAddressByCep } = useAddressByCep(setValue);

  const renderFooterButtons = () => {
    return (
      <div className="grid grid-cols-2 gap-4 items-center justify-between mt-8 min-w-full">
        <Link href="/" className="w-max">
          <Button type="button" label={t("back")} className="w-auto" />
        </Link>

        {isDelivery && (
          <Button
            type="submit"
            label={t("continue")}
            className="w-auto ml-auto bg-green-500 hover:bg-green-600"
            disabled={!selectedShippingMethod}
          />
        )}

        {!isDelivery && (
          <Link href="/checkout?step=customer" className="w-auto ml-auto">
            <Button
              type="button"
              label={t("next")}
              className="w-auto ml-auto bg-green-500 hover:bg-green-600"
              disabled={selectedCountry === ""}
            />
          </Link>
        )}
      </div>
    );
  };

  const onSubmit = async (data: ShippingFormData) => {
    if (!selectedShippingMethod) {
      toast.error(t('shipping.error.submission'));
      return;
    }

    try {
      setShippingAddress(data);
      setShippingFormData(data);
      setCurrentStep("customer");
      router.push("/checkout?step=customer");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

      toast.error(t('shipping.error.submission'), {
        description: errorMessage,
      });
    }
  };

  useEffect(() => {
    if (!isDelivery) {
      setShippingAddress({
        country: selectedCountry,
        neighborhood: "",
        street: "",
        number: "",
        complement: "",
        city: "",
        state: "",
        zipCode: "",
      });

      setValue("neighborhood", "");
      setValue("street", "");
      setValue("number", "");
      setValue("complement", "");
      setValue("city", "");
      setValue("state", "");
      setValue("zipCode", "");

      return;
    }

    setShippingAddress({
      ...shippingFormData,
      country: selectedCountry,
      neighborhood: shippingFormData.complement || "",
      street: shippingFormData.street || "",
      number: shippingFormData.number || "",
      complement: shippingFormData.complement || "",
      city: shippingFormData.city || "",
      state: shippingFormData.state || "",
      zipCode: shippingFormData.zipCode || "",
    });
  }, [selectedCountry, isDelivery]);

  useEffect(() => {
    setShippingMethods(shippingMethods);
  }, [shippingMethods]);

  useEffect(() => {
    setDisabledFields(selectedCountry === "BR" ? true : false);
  }, [selectedCountry]);

  useEffect(() => {
    setValue("country", selectedCountry);
  }, [selectedCountry, setValue]);

  return (
    <div className="w-full transition-all duration-300 ease-in-out">
      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        <Button
          label={t("shipping.delivery")}
          icon={<FaTruck />}
          className={`flex-row-reverse text-2xl font-bold mb-6 gap-4 ${isDelivery ? "bg-green-500" : "bg-gray-500"
            }`}
          onClick={() => setIsDelivery(true)}
        >
          <input
            checked={isDelivery}
            onChange={(e) => setIsDelivery(e.target.checked)}
            className={`w-6 h-6 transition-all duration-300 ease-in-out ${isDelivery ? "scale-100" : "scale-0"
              }`}
            type="radio"
            name="shippingType"
            value="delivery"
          />
        </Button>

        <Button
          label={t("shipping.pickup")}
          icon={<FaStore />}
          className={`flex-row-reverse text-2xl font-bold mb-6 gap-4 ${isDelivery ? "bg-gray-500" : "bg-green-500"
            }`}
          onClick={() => setIsDelivery(false)}
        >
          <input
            checked={!isDelivery}
            onChange={(e) => setIsDelivery(!e.target.checked)}
            className={`w-6 h-6 transition-all duration-300 ease-in-out ${isDelivery ? "scale-0" : "scale-100"
              }`}
            type="radio"
            name="shippingType"
            value="pickup"
          />
        </Button>
      </div>

      {isDelivery ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="md:space-y-6 w-full min-w-full transition-all duration-300 ease-in-out grid gap-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextInput
              label={t("shipping.zipCode.label")}
              name="zipCode"
              register={register as unknown as UseFormRegister<FieldValues>}
              error={errors.zipCode?.message}
              onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                fetchAddressByCep(e.target.value.replace(/\D/g, ""));
              }}
              disabled={isLoadingCep}
            />

            <DropdownSelect
              options={countries.map((country: Country) => ({
                label: country.name.common + " - " + country.cca2,
                value: country.cca2,
              }))}
              label={t("shipping.country.label")}
              name="country"
              register={register as unknown as UseFormRegister<FieldValues>}
              rules={{ required: true }}
              onChange={(value: string | number) =>
                setSelectedCountry(String(value))
              }
            />
          </div>

          <TextInput
            label={t("shipping.street.label")}
            name="street"
            register={register as unknown as UseFormRegister<FieldValues>}
            error={errors.street?.message}
            disabled={disabledFields}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextInput
              label={t("shipping.number.label")}
              name="number"
              register={register as unknown as UseFormRegister<FieldValues>}
              error={errors.number?.message}
            />
            <TextInput
              label={t("shipping.complement.label")}
              name="complement"
              register={register as unknown as UseFormRegister<FieldValues>}
              error={errors.complement?.message}
              rules={{ required: false }}
            />
          </div>

          <TextInput
            label={t("shipping.neighborhood.label")}
            name="neighborhood"
            register={register as unknown as UseFormRegister<FieldValues>}
            error={errors.neighborhood?.message}
            disabled={disabledFields}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextInput
              label={t("shipping.city.label")}
              name="city"
              register={register as unknown as UseFormRegister<FieldValues>}
              error={errors.city?.message}
              disabled={disabledFields}
            />
            <TextInput
              label={t("shipping.state.label")}
              name="state"
              register={register as unknown as UseFormRegister<FieldValues>}
              error={errors.state?.message}
              disabled={disabledFields}
            />
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">
              {t("shipping.methods.title")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {shippingMethods.map((method) => (
                <label
                  key={method.id}
                  className={`flex items-center justify-between p-4 border rounded-lg w-full z-[2] px-4 py-3 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ease-in-out cursor-pointer ${selectedShippingMethod?.id === method.id
                      ? "border-green-500 bg-green-50 !text-black"
                      : "border-gray-200"
                    }`}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="shippingMethod"
                      value={method.id}
                      aria-label={`${method.name} - ${method.time}`}
                      checked={selectedShippingMethod?.id === method.id}
                      onChange={() => setSelectedShippingMethod(method)}
                      className="mr-3"
                    />
                    <div>
                      <p className="font-medium">{method.name}</p>
                      <p
                        className={`text-sm text-gray-100 ${selectedShippingMethod?.id === method.id
                            ? "text-green-500"
                            : ""
                          }`}
                      >
                        {method.time}
                      </p>
                    </div>
                  </div>
                  <span className="font-medium">{formatCurrency(method.price)}</span>
                </label>
              ))}
            </div>
          </div>

          {renderFooterButtons()}
        </form>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4">
          <DropdownSelect
            options={countries.map((country: Country) => ({
              label: country.name.common + " - " + country.cca2,
              value: country.cca2,
            }))}
            label={t("shipping.country.label")}
            name="country"
            register={register as unknown as UseFormRegister<FieldValues>}
            rules={{ required: true }}
            onChange={(value: string | number) =>
              setSelectedCountry(String(value))
            }
          />

          {renderFooterButtons()}
        </div>
      )}
    </div>
  );
};

export default ShippingStep;
