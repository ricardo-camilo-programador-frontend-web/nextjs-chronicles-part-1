import { Plant } from "@/types/plant.types";
import { PlantCardContent } from "@/components/plantCardContent";

interface HomePlantCardProps {
  plant: Plant;
  containerClassName?: string;
  imageClassName?: string;
  titleClassName?: string;
  showPrice?: boolean;
  quantityClassName?: string;
  showExploreShortcut?: boolean;
  shopIconClassName?: string;
}

export function HomePlantCard({
  plant,
  containerClassName,
  imageClassName,
  titleClassName,
  showPrice = false,
  quantityClassName,
  showExploreShortcut = true,
  shopIconClassName,
}: HomePlantCardProps) {
  return (
    <div
      className={`relative bg-gradient-to-r from-white/10 via-transparent to-transparent backdrop-blur-md rounded-[32px] p-8 border border-white/20 w-full md:max-w-[25rem] max-h-[35rem] flex flex-col items-center animate-fade-in ${containerClassName}`}
      role="article"
      aria-label={`Plant card for ${plant.common_name || plant.scientific_name}`}
    >
      <PlantCardContent
        plant={plant}
        showPrice={showPrice}
        imageClassName={imageClassName}
        titleClassName={titleClassName}
        quantityClassName={quantityClassName}
        showExploreShortcut={showExploreShortcut}
        shopIconClassName={shopIconClassName}
      />
    </div>
  );
}
