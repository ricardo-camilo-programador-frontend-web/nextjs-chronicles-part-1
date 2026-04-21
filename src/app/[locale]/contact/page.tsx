import type { Metadata } from "next";
import { ContactForm } from '@/blocks/ContactForm'
import ogImage from '@/assets/images/android-launchericon-512-512.png'
import DefaultLayout from "@/layouts/DefaultLayout";
import { useTranslations } from "next-intl";
import RandomBackground from "@/blocks/randomBackground";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || ''),
  title: "Breath Natural - Contact Us",
  description: "Get in touch with Breath Natural for any inquiries or questions about our indoor plants, care guides, and services.",
  keywords: [
    "contact us",
    "breath natural",
    "indoor plants",
    "customer service",
    "inquiries",
    "questions",
  ],
  openGraph: {
    title: "Breath Natural - Contact Us",
    description: "Get in touch with Breath Natural for any inquiries or questions about our indoor plants, care guides, and services.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/contact`,
    siteName: "Breath Natural",
    images: [
      {
        url: ogImage.src,
        width: 1200,
        height: 630,
      },
    ],
  },
};

const ContactPage = () => {
  const t = useTranslations('contact')

  const validationMessages = {
    'firstName.min': t('validation.firstName.min'),
    'firstName.max': t('validation.firstName.max'),
    'lastName.min': t('validation.lastName.min'),
    'lastName.max': t('validation.lastName.max'),
    'email.invalid': t('validation.email.invalid'),
    'phoneNumber.invalid': t('validation.phoneNumber.invalid'),
    'message.min': t('validation.message.min'),
    'message.max': t('validation.message.max')
  }

  return (
    <DefaultLayout>
      <RandomBackground />

      <ContactForm
        className="mt-8"
        title={t('title')}
        titleHighlight={t('titleHighlight')}
        subtitle={t('subtitle')}
        formTitle={t('formTitle')}
        formSubtitle={t('formSubtitle')}
        firstName={t('firstName')}
        lastName={t('lastName')}
        email={t('email')}
        phoneNumber={t('phoneNumber')}
        message={t('message')}
        sending={false}
        send={t('send')}
        validationMessages={validationMessages}
      />
    </DefaultLayout>
  )
}

export default ContactPage;

