"use client";

import { FC } from "react";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCheckoutStore } from "@/store/checkoutStore";
import ShippingStep from "@/blocks/checkout/shipping";
import CustomerStep from "@/blocks/checkout/customer";
import PaymentStep from "@/blocks/checkout/payment";
import ConfirmationStep from "@/blocks/checkout/confirmation";
import { ShippingMethod } from "@/types/shippingMethod";
import { Country } from "@/types/country";
import { Language } from "@/types/language";
import { useCountriesStore } from "@/store/countriesStore";
import { useTranslations } from 'next-intl';

interface CheckoutStepProps {
  shippingMethods: ShippingMethod[];
  customerValidationMessages: Record<string, string>;
  languages: Language[];
  countries: Country[];
}

type CheckoutStep = "shipping" | "customer" | "payment" | "confirmation";

export const CheckoutSteps: FC<CheckoutStepProps> = ({
  shippingMethods,
  customerValidationMessages,
  languages,
  countries,
}) => {
  const CHECKOUT_STEPS: CheckoutStep[] = ["shipping", "customer", "payment", "confirmation"];
  const router = useRouter();
  const searchParams = useSearchParams();
  const { currentStep, setCurrentStep } = useCheckoutStore();
  const countriesStore = useCountriesStore();
  const t = useTranslations('checkout');

  function isStepValid(step: CheckoutStep): boolean {
    return CHECKOUT_STEPS.indexOf(step) > CHECKOUT_STEPS.indexOf(currentStep);
  }

  useEffect(() => {
    const stepParam = searchParams.get('step') as CheckoutStep;

    if (stepParam && CHECKOUT_STEPS.includes(stepParam)) {
      setCurrentStep(stepParam);
    } else if (currentStep) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set('step', currentStep);
      router.push(`/checkout?${newSearchParams.toString()}`);
    }
  }, [searchParams, currentStep, setCurrentStep, router]);

  useEffect(() => {
    if (countries.length > 0) {
      countriesStore.setCountries(countries);
    }
  }, [countries]);

  function handleStepChange(step: CheckoutStep) {
    console.log("Step changed to:", step);
    const currentStepIndex = CHECKOUT_STEPS.indexOf(currentStep);
    const targetStepIndex = CHECKOUT_STEPS.indexOf(step);

    if (targetStepIndex > currentStepIndex && !isStepValid(currentStep)) {
      return;
    }

    setCurrentStep(step);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('step', step);
    router.push(`/checkout?${newSearchParams.toString()}`);
  }

  const renderStepHeader = () => {
    return (
      CHECKOUT_STEPS.map(
        (step, index) => {
          const stepIndex = CHECKOUT_STEPS.indexOf(currentStep);
          const isCompleted = index <= stepIndex;
          const animationDelay = `${index * 0.3}s`;

          return (
            <div key={step} className="flex w-full items-center justify-between gap-2 ml-8 md:ml-[14%]">
              <div
                role="button"
                tabIndex={0}
                aria-label={`Step ${index + 1}: ${step}`}
                aria-current={currentStep === step ? "step" : undefined}
                className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center transition-all flex-shrink-0 duration-300 ease-in-out transform cursor-pointer hover:bg-green-600 hover:text-white ${isCompleted ? "bg-green-500 text-white scale-110" : "bg-glass text-foreground/60"
                  }`}
                style={{ transitionDelay: animationDelay }}
                onClick={() => handleStepChange(step as CheckoutStep)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleStepChange(step as CheckoutStep);
                  }
                }}
              >
                {index + 1}
              </div>
              {index < 3 && (
                <div className="h-1 flex-1 relative bg-glass">
                  <div
                    className="absolute left-0 top-0 h-full bg-green-500 transition-all duration-300 ease-in-out"
                    style={{
                      width: index < stepIndex ? '100%' :
                        index === stepIndex ? '50%' : '0%',
                      opacity: index <= stepIndex ? 1 : 0,
                      transitionDelay: animationDelay
                    }}
                  />
                </div>
              )}
            </div>
          );
        }
      )
    );
  };

  const renderStep = () => {
    switch (currentStep) {
      case "shipping":
        return (
          <div className="w-full md:min-w-[800px] max-w-7xl grid mx-auto">
            <ShippingStep
              shippingMethods={shippingMethods}
              countries={countries}
            />
          </div>
        );
      case "customer":
        return (
          <div className="w-full md:min-w-[800px] max-w-7xl grid mx-auto">
            <CustomerStep
              validationMessages={customerValidationMessages}
              languages={languages}
            />
          </div>
        );
      case "payment":
        return (
          <div className="w-full md:min-w-[800px] max-w-7xl">
            <PaymentStep />
          </div>
        );
      case "confirmation":
        return (
          <div className="w-full md:min-w-[800px] max-w-7xl grid mx-auto">
            <ConfirmationStep />
          </div>
        );
      default:
        return (
          <div className="w-full md:min-w-[800px] max-w-7xl grid mx-auto">
            <ShippingStep
              countries={countries}
              shippingMethods={shippingMethods}
            />
          </div>
        );
    }
  };

  return (
    <div className="text-foreground flex flex-col w-full max-w-7xl mx-auto">
      <div className="flex flex-col md:items-center md:justify-center w-full md:px-4 transition-all duration-300 ease-in-out">
        <div className="text-center my-12 mt-6 w-full z-[50]">
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            {t('title')}
            <span className="text-green-500">{t('process')}</span>
          </h1>
          <p className="text-foreground/70 text-sm md:text-lg">{t('complete')}</p>
        </div>

        <div className="w-full max-w-7xl grid mx-auto bg-gradient-to-r from-black/10 via-black/20 to-black/60 backdrop-blur-md rounded-[32px] p-4 md:p-8 border border-glass-border shadow-xl">
          <div className="flex justify-center items-center space-x-4 mb-8">
            {renderStepHeader()}
          </div>

          <div className="transition-all duration-300 ease-in-out">
            {renderStep()}
          </div>
        </div>
      </div>
    </div>
  );
}
