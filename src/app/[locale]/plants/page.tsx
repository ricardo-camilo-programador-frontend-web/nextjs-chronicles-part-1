import { FC } from "react";
import { PlantCard } from "@/components/PlantCard";
import { NoDataToShow } from "@/components/NoDataToShow";
import DefaultLayout from "@/layouts/DefaultLayout";
import { PlantsService } from "@/app/api/plants/plants.service";
import { getUniqueId } from "@/utils/getUniqueId";
import Loading from "@/components/Loading";
import { Suspense } from "react";
import { getTranslations } from 'next-intl/server';
import { unstable_cache } from 'next/cache';
import type { Metadata } from "next";
import Script from "next/script";

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
          <div className="py-8 px-2 md:pt-[11rem]">
            {plants.length === 0 ? (
              <NoDataToShow message={t('noPlantsMessage')} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 md:gap-6 md:gap-y-[12rem]">
                {plants.map((plant, index) => (
                  <PlantCard
                    containerClassName="w-full bg-white/5 backdrop-blur-sm rounded-2xl p-6 relative flex flex-col items-center shadow-lg hover:shadow-xl transition-all duration-300 border border-white/10"
                    imageClassName="rounded-full overflow-hidden !w-[120px] !h-[120px] md:!w-[9rem] md:!h-[9rem] !-mt-[2.5rem] md:!-mt-[10rem] shadow-lg border-4 border-white/10 ml-12"
                    shopIconClassName="min-w-[17rem] w-full"
                    quantityClassName="!min-w-[17rem] !w-full md:!ml-[11rem]"
                    key={`${plant.id}-${index}-plant-card-${getUniqueId()}`}
                    plant={plant}
                    showExploreShortcut={false}
                    showPrice
                  />
                ))}
              </div>
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
