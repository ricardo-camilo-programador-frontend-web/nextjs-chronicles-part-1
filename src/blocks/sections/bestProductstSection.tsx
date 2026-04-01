import type { FC } from "react";
import { QuotedTitle } from "@/components/QuotedTitle";
import { useMockupPlants } from "@/hooks/mockupPlants";
import { EmblaCarousel } from "@/components/EmblaCarousel/EmblaCarousel";
import { PlantCardContent } from "@/components/plantCardContent";
import { getUniqueId } from "@/utils/getUniqueId";
import { useTranslations } from "next-intl";

const BestProductsSection: FC = () => {
  const mockupPlants = useMockupPlants();
  const t = useTranslations('bestProducts');

  return (
    <div className="relative min-h-[35rem] max-w-[95vw] md:max-w-7xl mx-auto pt-32 px-2 h-full pb-6">
      <div className="flex flex-col items-center max-w-[40rem] mx-auto">
        <QuotedTitle className="text-center text-foreground">
          {t('title')}
        </QuotedTitle>
      </div>

      <div className="w-full max-w-[95vw] lg:max-w-[64rem] mx-auto mt-32">
        <EmblaCarousel
          carouselId={`embla-carousel-best-products-${getUniqueId()}`}
          className="w-full bg-gradient-to-r from-glass via-transparent to-transparent backdrop-blur-md rounded-[32px] p-8 border border-glass-border"
          options={{ loop: true }}
          snapDisplayClassName="absolute -bottom-16 md:bottom-6 ml-auto md:right-[-25rem] flex gap-2"
        >
          {mockupPlants.map((plant, index) => (
            <div
              className="flex-[0_0_100%] min-w-[90vw] sm:min-w-[40rem] md:min-w-[50rem] lg:min-w-[60rem] relative"
              key={`${plant.id}-${index}-best-product-${getUniqueId()}`}
            >
              <PlantCardContent
                plant={plant}
                containerClassName="grid md:grid-cols-2 items-center gap-8 px-4"
                contentClassName="space-y-6"
                imageClassName="w-[10rem] h-[10rem] mx-auto -right-16 top-8 md:scale-150"
                showPrice={true}
                showBuyShortcut={false}
              />
            </div>
          ))}
        </EmblaCarousel>
      </div>
    </div>
  );
};

export default BestProductsSection;
