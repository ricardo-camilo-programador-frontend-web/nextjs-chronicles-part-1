import { Plant } from "@/types/plant.types";
import Image from "next/image";
import { ExploreShortcut } from "@/blocks/exploreShortcut";
import { BuyShortcut } from "@/blocks/buyShortcut";

interface PlantBannerCardProps {
  plant: Plant;
  imageClassName?: string;
  className?: string;
}

export function PlantBannerCard({
  plant,
  imageClassName,
  className,
}: PlantBannerCardProps) {
  return (
    <div
      className={`flex relative justify-between items-center w-full bg-gradient-to-r from-white/10 via-transparent to-transparent backdrop-blur-md rounded-3xl lg:rounded-full py-8 lg:p-8 border border-white/20 max-w-6xl mx-auto ${className}`}
      role="article"
      aria-label={`Plant card for ${plant.common_name || plant.scientific_name}`}
    >

        <div className="w-full relative h-24 ml-auto top-0 flex justify-center items-center">
          {plant.image_url && (
            <Image
              src={plant.image_url}
              alt={plant.common_name || plant.scientific_name}
              width={240}
              height={240}
              sizes="(max-width: 768px) 160px, 240px"
              className={`object-cover w-[17rem] h-[17rem] rounded-2xl absolute -top-[9rem] right-0 lg:-top-[11rem] lg:left-0 scale-150 ${imageClassName}`}
            />
          )}
        </div>

        <div className="w-full max-w-[45rem] px-6">
          <h3 className="text-white text-2xl font-semibold mb-2">
            {plant.common_name || plant.scientific_name}
          </h3>

          <p className="text-white text-sm mb-4 line-clamp-2">
            {plant.bibliography}
          </p>

          <p className="mt-4 text-white text-2xl font-semibold my-4">
            Rs. 570/-
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center md:justify-start gap-4 w-full lg:w-auto md:max-w-[25rem]">
            <ExploreShortcut plant={plant} />

            <BuyShortcut
              plant={plant}
            />
          </div>
        </div>
    </div>
  );
}
