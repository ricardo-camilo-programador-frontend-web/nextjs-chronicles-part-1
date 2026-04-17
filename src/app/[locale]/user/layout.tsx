import { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import AdminLayout from "@/layouts/AdminLayout";

export default async function UserLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const messages = (await import(`@/messages/${locale}.json`)).default;

  return (
    <AdminLayout>
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </AdminLayout>
  );
}