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

    return (
      <Suspense fallback={<Loading />}>
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
