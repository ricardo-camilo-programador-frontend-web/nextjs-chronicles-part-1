import { QuotedTitle } from "@/components/QuotedTitle";
import { useMockupPlants } from "@/hooks/mockupPlants";
import { HomePlantCard } from "@/components/HomePlantCard";
import { getUniqueId } from "@/utils/getUniqueId";
import { useTranslations } from 'next-intl';

export default function TopSellingSection() {
  const mockupPlants = useMockupPlants();
  const t = useTranslations('topSelling');

  return (
    <div className="relative min-h-screen max-w-7xl mx-auto pt-32 px-2 h-full pb-6">
      <div className="flex flex-col items-center max-w-[40rem] mx-auto">
        <QuotedTitle className="text-center text-white">
          {t('title')}
        </QuotedTitle>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center h-auto min-h-[90rem] w-full gap-[10rem] md:gap-y-[8rem] lg:gap-4 mt-[11rem] gap-y-[15rem]">
        {mockupPlants.slice(1, mockupPlants.length).map((plant, index) => (
          <HomePlantCard
            containerClassName="w-full max-w-full min-w-full"
            key={`${plant.id}-${index}-top-selling-${getUniqueId()}`}
            plant={plant}
            showPrice={true}
          />
        ))}
      </div>
    </div>
  );
}
