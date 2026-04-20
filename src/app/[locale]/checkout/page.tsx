import { FC } from "react";
import DefaultLayout from "@/layouts/DefaultLayout";
import { useTranslations } from "next-intl";
import { ShippingMethod } from "@/types/shippingMethod";
import { CheckoutSteps } from "@/blocks/checkout/steps";
import { CountriesService } from "@/services/countries.service";
import { Suspense } from "react";
import RandomBackground from "@/blocks/randomBackground";
import { Language } from "@/types/language";
import { mockCountries } from "@/static/mockCountries";
import Loading from "@/components/Loading";

const CheckoutPage: FC = () => {
  const t = useTranslations('checkout');

  const shippingMethods: ShippingMethod[] = [
    {
      id: 'standard',
      name: t('shipping.methods.standard'),
      price: 100,
      time: `5-7 ${t('shipping.methods.days')}`
    },
    {
      id: 'express',
      name: t('shipping.methods.express'),
      price: 250,
      time: `2-3 ${t('shipping.methods.days')}`
    },
    {
      id: 'overnight',
      name: t('shipping.methods.overnight'),
      price: 500,
      time: `1 ${t('shipping.methods.day')}`
    }
  ];


  const customerValidationMessages = {
    'fullName.min': t('customer.fullName.min'),
    'fullName.max': t('customer.fullName.max'),
    'email.invalid': t('customer.email.invalid'),
    'phoneNumber.min': t('customer.phoneNumber.min'),
    'phoneNumber.max': t('customer.phoneNumber.max'),
    'dateOfBirth.required': t('customer.dateOfBirth.required'),
    'preferredLanguage.required': t('customer.preferredLanguage.required'),
    'taxId.min': t('customer.taxId.min'),
    'taxId.max': t('customer.taxId.max'),
    'password.required': t('customer.password.required'),
    'terms.required': t('customer.acceptedTerms.required'),
  };

  return (
    <DefaultLayout>
      <Suspense fallback={<Loading />}>
        <CheckoutContent
          shippingMethods={shippingMethods}
          customerValidationMessages={customerValidationMessages}
          t={t}
        />
      </Suspense>
    </DefaultLayout>
  );
}

async function CheckoutContent({
  shippingMethods,
  customerValidationMessages,
}: {
  shippingMethods: ShippingMethod[],
  customerValidationMessages: Record<string, string>,
  t: (key: string) => string
}) {
  const countriesService = new CountriesService();
  const countries = await countriesService.getAllCountries()
    .then((countries) => countries.filter((country) => country.languages))
    .catch((error) => {
      console.error('Error fetching countries:', error);

      return mockCountries
    });

  const languages: Language[] = []

  countries.forEach(country => {
    if (country.languages) {
      Object.entries(country.languages).forEach(([code, name]) => {
        if (!languages.some(lang => lang.id === code)) {
          languages.push({
            id: code,
            name: name as string
          });
        }
      });
    }
  });

  return (
    <>
      <RandomBackground />

      <CheckoutSteps
        shippingMethods={shippingMethods}
        customerValidationMessages={customerValidationMessages}
        languages={languages}
        countries={countries}
      />
    </>
  );
}

export default CheckoutPage
