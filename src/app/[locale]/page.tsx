import type { FC } from 'react';
import { Suspense } from 'react';
import type { Metadata } from "next";
import IntroSection from "@/blocks/sections/introSection";
import TopSellingSection from "@/blocks/sections/topSellingSection";
import DefaultLayout from "@/layouts/DefaultLayout";
import TestimonialSection from "@/blocks/sections/testimonialSection";
import BestProductsSection from "@/blocks/sections/bestProductstSection";
import Loading from "@/components/Loading";

export const metadata: Metadata = {
  title: "Home | Breath Natural - Premium Indoor Plants",
  description: "Discover our curated collection of air-purifying indoor plants, exotic succulents, and stylish decorative greenery. Free shipping and expert care guides included.",
  keywords: ["indoor plants", "home plants", "air purifying plants", "decorative plants", "plant decor", "urban jungle"],
  openGraph: {
    title: "Home | Breath Natural - Premium Indoor Plants & Decorative Greenery",
    description: "Transform your space with our designer-curated plant collection featuring rare species, air-purifying greens, and complete care solutions.",
    url: "https://breath-natural-nextjs-chronicles.netlify.app/",
    siteName: "Breath Natural",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Breath Natural - Premium Indoor Plants",
    description: "Discover our curated collection of air-purifying indoor plants with free shipping and expert care guides.",
  },
};

const Home: FC = () => {
  return (
    <Suspense fallback={
      <Loading />
    }>
      <DefaultLayout>
        <IntroSection />
        <TopSellingSection />
        <TestimonialSection />
        <BestProductsSection />
      </DefaultLayout>
    </Suspense>
  );
}

export default Home;
