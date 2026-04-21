"use client";

import { useTranslations } from "next-intl";

export type SortOption = "az" | "za" | "family";

interface PlantSortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export function PlantSortDropdown({ value, onChange }: PlantSortDropdownProps) {
  const t = useTranslations("plants");

  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="appearance-none bg-white/10 border border-white/20 rounded-xl px-4 py-3 pr-10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent cursor-pointer transition-all"
        aria-label={t("sortBy")}
      >
        <option value="az" className="bg-primary text-white">
          {t("sortAz")}
        </option>
        <option value="za" className="bg-primary text-white">
          {t("sortZa")}
        </option>
        <option value="family" className="bg-primary text-white">
          {t("sortFamily")}
        </option>
      </select>
      <svg
        className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60 pointer-events-none"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </div>
  );
}
