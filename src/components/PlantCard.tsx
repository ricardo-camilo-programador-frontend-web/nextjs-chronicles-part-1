"use client";

import { Plant } from "@/types/plant.types";
import Image from "next/image";
import { BuyShortcut } from "@/blocks/buyShortcut";
import { BotanicalDetailsAccordion } from "@/components/plants/BotanicalDetailsAccordion";

const DEFAULT_PRICE = "$59.99";

interface PlantCardProps {
  plant: Plant;
}

export function PlantCard({ plant }: PlantCardProps) {
  const displayName = plant.common_name || plant.scientific_name;

  return (
    <div
      className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 shadow-lg hover:shadow-2xl transition-all duration-300 animate-fade-in"
      role="article"
      aria-label={`Plant card for ${displayName}`}
    >
      {/* Image section */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {plant.image_url && (
          <Image
            src={plant.image_url}
            alt={displayName}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={85}
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}

        {/* Family badge */}
        {plant.family && (
          <span className="absolute top-3 right-3 bg-primary/80 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full border border-white/20">
            {plant.family}
          </span>
        )}

        {/* Price badge */}
        <span className="absolute bottom-3 left-3 bg-accent text-primary font-bold text-sm px-3 py-1 rounded-lg">
          {DEFAULT_PRICE}
        </span>
      </div>

      {/* Content section */}
      <div className="p-4">
        <h3 className="text-white font-semibold text-lg leading-tight line-clamp-2">
          {displayName}
        </h3>
        {plant.common_name && (
          <p className="text-white/60 text-sm italic mt-1">
            {plant.scientific_name}
          </p>
        )}

        {/* Genus chip */}
        {plant.genus && (
          <span className="inline-block mt-2 text-xs bg-white/10 text-white/70 px-2 py-0.5 rounded-full">
            {plant.genus}
          </span>
        )}

        {/* CTA */}
        <div className="mt-4">
          <BuyShortcut plant={plant} variant="compact" />
        </div>
      </div>

      {/* Botanical details accordion */}
      <BotanicalDetailsAccordion plant={plant} />
    </div>
  );
}
