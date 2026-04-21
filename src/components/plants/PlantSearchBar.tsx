"use client";

import { useTranslations } from "next-intl";

interface PlantSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function PlantSearchBar({ value, onChange }: PlantSearchBarProps) {
  const t = useTranslations("plants");

  return (
    <div className="relative">
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t("searchPlaceholder")}
        className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent transition-all"
        aria-label={t("searchPlaceholder")}
      />
    </div>
  );
}
