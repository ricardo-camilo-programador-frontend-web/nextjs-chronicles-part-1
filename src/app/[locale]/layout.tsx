import type { Metadata } from "next";
import { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import ogImage from "@/assets/images/android-launchericon-512-512.png";
import Script from "next/script";
import IntroWarningModal from "@/blocks/IntroWarningModal";
import { Analytics } from "@/components/Analytics";
import ScrollToTop from "@/components/ScrollToTop";
import { NextIntlClientProvider } from "next-intl";
import { PortfolioShortcut } from "@/blocks/portfolioShortcut";
import { getDirection, Locale } from "@/config/i18n-config";

import "@/assets/styles/globals.css";
import "@/assets/styles/pageTransition.css";
import "@/assets/styles/animatedUnderline.css";
import "@/assets/styles/scrollDriven.css";
import { AmbientSound } from "@/components/AmbientSound";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || ""),
  title: "Breath Natural - NextJS Chronicles Part 1",
  description:
    "Discover premium indoor plants at Breath Natural. Shop exotic houseplants, succulents & cacti with expert care guides. Free shipping on orders over $50. Same-day delivery available.",
  keywords: [
    "indoor plants",
    "exotic houseplants",
    "succulents",
    "cacti",
    "expert care guides",
    "free shipping",
    "same-day delivery",
  ],
  openGraph: {
    title: "Breath Natural - NextJS Chronicles Part 1",
    description:
      "Discover premium indoor plants at Breath Natural. Shop exotic houseplants, succulents & cacti with expert care guides. Free shipping on orders over $50. Same-day delivery available.",
    url: "https://breath-natural-nextjs-chronicles.netlify.app/",
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

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const messages = (await import(`@/messages/${locale}.json`)).default;

  return (
    <html lang={locale} dir={getDirection(locale as Locale) ? "rtl" : "ltr"}>
      <head>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
            `,
          }}
        />
      </head>
      <body
        className={`scroll-smooth relative ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <IntroWarningModal
            linkedinUsername={process.env.LINKEDIN_USERNAME || ""}
            portfolioUrl={process.env.PORTFOLIO_URL || ""}
          />
          {children}
        </NextIntlClientProvider>
        <Analytics />
        <ScrollToTop />

        <div
          className="scroll-indicator"
          role="progressbar"
          aria-label="Page scroll progress"
        ></div>

        <PortfolioShortcut
          portfolioUrl={process.env.PORTFOLIO_URL || ""}
          customClassName="fixed bottom-4 left-4 hover:bg-gray-500 hover:text-white transition-all ease-in-out duration-300 z-[9999]"
          showText={false}
        />

        <div className="fixed bottom-[5rem] left-4 transition-all ease-in-out duration-300 z-[9999]">
          <AmbientSound />
        </div>
      </body>

      <Script
        src="https://cdn.counter.dev/script.js"
        data-id={process.env.COUNTER_API_KEY}
        data-utcoffset="-3"
      ></Script>
    </html>
  );
}
