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
import { Toaster } from 'sonner';
import "@/assets/styles/globals.css";
import "@/assets/styles/pageTransition.css";
import "@/assets/styles/animatedUnderline.css";
import "@/assets/styles/scrollDriven.css";
import "@/assets/styles/checkbox.css";
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
  title: "Breath Natural | Premium Indoor Plants & Decorative Greenery",
  description:
    "Transform your space with our curated collection of air-purifying indoor plants, exotic succulents, and stylish decorative greenery. Expert care guides, free shipping, and sustainable packaging included.",
  keywords: [
    "indoor plants",
    "decorative plants",
    "air-purifying plants",
    "low maintenance indoor plants",
    "office plants",
    "modern houseplants",
    "succulents delivery",
    "rare indoor plants",
    "plant decor",
    "urban gardening",
    "pet-safe plants",
    "vertical garden kits",
    "plant accessories",
    "botanical home decor",
    "plant care essentials",
    "indoor gardening supplies",
    "luxury plant pots",
    "biophilic design plants",
    "plant subscription box",
    "indoor plant consultation"
  ],
  openGraph: {
    title: "Breath Natural | Premium Indoor Plants & Modern Plant Decor",
    description:
      "Create your urban jungle with our designer-curated plant collection. Shop rare species, air-purifying greens, and complete plant care solutions for homes and offices.",
    url: "https://breath-natural-nextjs-chronicles.netlify.app/",
    siteName: "Breath Natural",
    images: [
      {
        url: ogImage.src,
        width: 1200,
        height: 630,
        alt: "Breath Natural's curated indoor plant collection in modern home setting"
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

        <Toaster
          position="bottom-right"
          expand={true}
          richColors
          theme="dark"
        />
      </body>

      <Script
        src="https://cdn.counter.dev/script.js"
        data-id={process.env.COUNTER_API_KEY}
        data-utcoffset="-3"
      ></Script>
    </html>
  );
}
