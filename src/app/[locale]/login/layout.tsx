import { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import PublicLayout from "@/layouts/PublicLayout";

export default async function UserLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const messages = (await import(`@/messages/${locale}.json`)).default;

  return (
    <PublicLayout>
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </PublicLayout>
  );
}