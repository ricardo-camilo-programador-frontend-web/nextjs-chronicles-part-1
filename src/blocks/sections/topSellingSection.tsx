import { QuotedTitle } from "@/components/QuotedTitle";
import { useMockupPlants } from "@/hooks/mockupPlants";
import { PlantCard } from "@/components/PlantCard";
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-8">
        {mockupPlants.slice(1, mockupPlants.length).map((plant, index) => (
          <PlantCard
            key={`${plant.id}-${index}-top-selling`}
            plant={plant}
          />
        ))}
      </div>
    </div>
  );
}
