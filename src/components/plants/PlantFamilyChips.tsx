"use client";

import { useTranslations } from "next-intl";

interface PlantFamilyChipsProps {
  families: string[];
  selected: string | null;
  onSelect: (family: string | null) => void;
}

export function PlantFamilyChips({
  families,
  selected,
  onSelect,
}: PlantFamilyChipsProps) {
  const t = useTranslations("plants");

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
      <button
        onClick={() => onSelect(null)}
        className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
          selected === null
            ? "bg-accent text-primary"
            : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
        }`}
      >
        {t("filterAll")}
      </button>
      {families.map((family) => (
        <button
          key={family}
          onClick={() => onSelect(family)}
          className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
            selected === family
              ? "bg-accent text-primary"
              : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
          }`}
        >
          {family}
        </button>
      ))}
    </div>
  );
}
