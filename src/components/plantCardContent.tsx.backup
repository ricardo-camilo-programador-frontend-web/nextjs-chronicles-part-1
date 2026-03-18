import { Plant } from "@/types/plant.types";
import Image from "next/image";
import { BuyShortcut } from "@/blocks/buyShortcut";
import { ExploreShortcut } from "@/blocks/exploreShortcut";

interface PlantCardProps {
  plant: Plant;
  containerClassName?: string;
  imageContainerClassName?: string;
  imageClassName?: string;
  titleClassName?: string;
  showPrice?: boolean;
  showBuyShortcut?: boolean;
  showExploreShortcut?: boolean;
  contentClassName?: string;
  quantityClassName?: string;
  shopIconClassName?: string;
}

export function PlantCardContent({
  plant,
  containerClassName,
  imageClassName,
  imageContainerClassName,
  titleClassName,
  showPrice = false,
  showBuyShortcut = true,
  showExploreShortcut = true,
  contentClassName,
  quantityClassName = "h-[3.7rem]",
  shopIconClassName,
}: PlantCardProps) {
  const getRandomName = () => {
    const synonymsLength = plant.synonyms.length;

    const randomIndex = Math.floor(Math.random() * synonymsLength);

    return plant.synonyms[randomIndex];
  };

  return (
    <div className={`flex flex-col items-center ${containerClassName}`}>
      <div className={`mb-6 animate-slide-down ${imageContainerClassName}`}>
        {plant.image_url && (
          <Image
            src={plant.image_url}
            alt={plant.common_name || plant.scientific_name}
            width={240}
            height={240}
            loading="lazy"
            className={`absolute md:relative -mt-[9rem] -ml-[6rem] md:ml-0 md:-mt-32 object-cover w-[20rem] h-[17rem] md:h-[20rem] rounded-2xl animate-scale-in md:scale-125 ${imageClassName}`}
          />
        )}
      </div>

      <div
        className={`flex flex-col w-full animate-slide-up ${contentClassName}`}
      >
        <div className="flex flex-col w-full animate-slide-up">
          <p className="text-white text-sm mb-2">{getRandomName()}</p>

          <p className="text-white text-xs grid grid-cols-1 md:grid-cols-2">
            <span className="truncate max-w-[10rem] text-ellipsis">
              Family: {plant.family}
            </span>
            <span className="truncate max-w-[10rem] text-ellipsis">
              Genus: {plant.genus}
            </span>
          </p>

          <p
            className={`text-white text-sm md:text-xl font-semibold my-3 h-auto md:h-36 w-full md:line-clamp-3 overflow-ellipsis overflow-y-auto  ${titleClassName}`}
          >
            {plant.bibliography + " " + plant.scientific_name}
          </p>
        </div>

        <div className="flex flex-col w-full justify-center items-center">
          {!showPrice && (
            <div className=" min-w-[15rem] max-w-[14rem] lg:max-w-full flex items-center justify-start animate-fade-in-delay">
              <BuyShortcut
                className="px-6 py-3 bg-transparent backdrop-blur-sm border border-white/20 text-white rounded-lg hover:bg-white/10 transition-all duration-300"
                showIcon={false}
                plant={plant}
              />
            </div>
          )}

          {showPrice && (
            <div className="min-h-[2rem] w-full grid md:grid-cols-2 min-w-[16rem] max-w-[25rem] md:space-x-6 gap-8 lg:max-w-full place-items-center md:ml-6 px-2">
              {showExploreShortcut && (
                <ExploreShortcut plant={plant} />
              )}

              {showBuyShortcut && (
                <BuyShortcut
                  plant={plant}
                  quantityClassName={quantityClassName}
                  shopIconClassName={shopIconClassName}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
