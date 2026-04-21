"use client";

import { Plant } from "@/types/plant.types";
import { useTranslations } from "next-intl";

interface BotanicalDetailsAccordionProps {
  plant: Plant;
}

export function BotanicalDetailsAccordion({ plant }: BotanicalDetailsAccordionProps) {
  const t = useTranslations("plants");

  return (
    <details className="border-t border-white/10">
      <summary className="px-4 py-3 text-sm text-white/60 cursor-pointer hover:text-white transition-colors flex items-center gap-2 select-none">
        <span>ℹ️</span> {t("scientificInfo")}
      </summary>
      <div className="px-4 pb-4 text-xs text-white/50 space-y-1">
        {plant.author && (
          <p>
            <span className="text-white/70">{t("author")}:</span> {plant.author}
          </p>
        )}
        {plant.year > 0 && (
          <p>
            <span className="text-white/70">{t("year")}:</span> {plant.year}
          </p>
        )}
        {plant.status && (
          <p>
            <span className="text-white/70">{t("status")}:</span> {plant.status}
          </p>
        )}
        {plant.rank && (
          <p>
            <span className="text-white/70">{t("rank")}:</span> {plant.rank}
          </p>
        )}
        {plant.bibliography && (
          <p>
            <span className="text-white/70">{t("bibliography")}:</span>{" "}
            {plant.bibliography}
          </p>
        )}
        {plant.family && (
          <p>
            <span className="text-white/70">{t("sortFamily")}:</span>{" "}
            {plant.family}
          </p>
        )}
        {plant.genus && (
          <p>
            <span className="text-white/70">Genus:</span> {plant.genus}
          </p>
        )}
        {plant.synonyms.length > 0 && (
          <p>
            <span className="text-white/70">{t("synonyms")}:</span>{" "}
            {plant.synonyms.join(", ")}
          </p>
        )}
      </div>
    </details>
  );
}
