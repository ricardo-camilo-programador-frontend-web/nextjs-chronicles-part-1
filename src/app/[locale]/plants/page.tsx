import { FC } from "react";
import { NoDataToShow } from "@/components/NoDataToShow";
import DefaultLayout from "@/layouts/DefaultLayout";
import { PlantsService } from "@/app/api/plants/plants.service";
import Loading from "@/components/Loading";
import { Suspense } from "react";
import { getTranslations } from 'next-intl/server';
import { unstable_cache } from 'next/cache';
import type { Metadata } from "next";
import Script from "next/script";
import { PlantCatalogClient } from "@/components/plants/PlantCatalogClient";
import { homePlants } from "@/data/homePlants";

export const metadata: Metadata = {
  title: "Plant Collection | Breath Natural - Premium Indoor Plants",
  description: "Explore our complete collection of air-purifying indoor plants, exotic succulents, and decorative greenery. Expert care guides and sustainable packaging included.",
  keywords: ["indoor plants collection", "plant catalog", "air purifying plants", "decorative greenery", "plant species", "succulent collection", "rare plants"],
  openGraph: {
    title: "Plant Collection | Breath Natural - Premium Indoor Plants",
    description: "Browse our complete plant collection featuring rare species, air-purifying greens, and expert care guides for homes and offices.",
    url: "https://breath-natural-nextjs-chronicles.netlify.app/plants",
    siteName: "Breath Natural",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Plant Collection | Breath Natural - Premium Indoor Plants",
    description: "Browse our complete plant collection featuring rare species and expert care guides.",
  },
  alternates: {
    canonical: 'https://breath-natural-nextjs-chronicles.netlify.app/plants',
  },
};

const PlantsPage: FC = async () => {
  const t = await getTranslations('plants');
  const plantsService = new PlantsService();

  const getCachedPlants = unstable_cache(
    async () => {
      const response = await plantsService.getPlants();
      return response;
    },
    ['plants-data'],
    {
      revalidate: false,
      tags: ['plants']
    }
  );

  try {
    const { data: plants } = await getCachedPlants();

    if (!Array.isArray(plants)) {
      throw new Error(t('invalidDataError'));
    }

    // Generate JSON-LD structured data for products
    const jsonLdData = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: plants.map((plant, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: plant.common_name || plant.scientific_name,
          image: plant.image_url,
          description: `Beautiful ${plant.family} plant - ${plant.scientific_name}`,
          brand: "Breath Natural",
          offers: {
            "@type": "Offer",
            price: "59.99",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          },
          additionalProperty: [
            {
              "@type": "PropertyValue",
              name: "Scientific Name",
              value: plant.scientific_name,
            },
            {
              "@type": "PropertyValue",
              name: "Family",
              value: plant.family,
            },
            {
              "@type": "PropertyValue",
              name: "Genus",
              value: plant.genus,
            },
          ],
        },
      })),
    };

    return (
      <Suspense fallback={<Loading />}>
        <Script
          id="structured-data-plants"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdData),
          }}
        />
        <DefaultLayout>
          <div className="py-8 px-4 max-w-7xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-8">
              {t('pageTitle')}
            </h1>
            {plants.length === 0 ? (
              <NoDataToShow message={t('noPlantsMessage')} />
            ) : (
              <PlantCatalogClient plants={plants} homePlants={homePlants} />
            )}
          </div>
        </DefaultLayout>
      </Suspense>
    );
  } catch (error: unknown) {
    console.error("Error fetching plants:", error);

    const errorMessage =
      error instanceof Error
        ? t('loadError', { message: error.message })
        : t('genericError');

    return (
      <DefaultLayout>
        <div className="py-8">
          <NoDataToShow message={errorMessage} />
        </div>
      </DefaultLayout>
    );
  }
}

export default PlantsPage;
