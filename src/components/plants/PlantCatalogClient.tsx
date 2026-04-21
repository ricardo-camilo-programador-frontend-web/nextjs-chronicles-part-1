"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Plant } from "@/types/plant.types";
import { PlantCard } from "@/components/PlantCard";
import { PlantSearchBar } from "@/components/plants/PlantSearchBar";
import { PlantFamilyChips } from "@/components/plants/PlantFamilyChips";
import { PlantSortDropdown, SortOption } from "@/components/plants/PlantSortDropdown";

interface PlantCatalogClientProps {
  plants: Plant[];
}

export function PlantCatalogClient({ plants }: PlantCatalogClientProps) {
  const t = useTranslations("plants");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFamily, setSelectedFamily] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("az");

  const families = useMemo(
    () => [...new Set(plants.map((p) => p.family))].filter(Boolean).sort(),
    [plants]
  );

  const filteredPlants = useMemo(() => {
    let result = [...plants];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          (p.common_name && p.common_name.toLowerCase().includes(query)) ||
          p.scientific_name.toLowerCase().includes(query)
      );
    }

    if (selectedFamily) {
      result = result.filter((p) => p.family === selectedFamily);
    }

    switch (sortBy) {
      case "az":
        result.sort((a, b) =>
          (a.common_name || a.scientific_name).localeCompare(
            b.common_name || b.scientific_name
          )
        );
        break;
      case "za":
        result.sort((a, b) =>
          (b.common_name || b.scientific_name).localeCompare(
            a.common_name || a.scientific_name
          )
        );
        break;
      case "family":
        result.sort((a, b) => a.family.localeCompare(b.family));
        break;
    }

    return result;
  }, [plants, searchQuery, selectedFamily, sortBy]);

  return (
    <div>
      {/* Search and filters */}
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <PlantSearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
          <PlantSortDropdown value={sortBy} onChange={setSortBy} />
        </div>

        {families.length > 1 && (
          <PlantFamilyChips
            families={families}
            selected={selectedFamily}
            onSelect={setSelectedFamily}
          />
        )}

        <p className="text-white/50 text-sm">
          {t("resultsCount", { count: filteredPlants.length })}
        </p>
      </div>

      {/* Grid */}
      {filteredPlants.length === 0 ? (
        <p className="text-white/60 text-center py-12">{t("noResults")}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredPlants.map((plant) => (
            <PlantCard key={plant.id} plant={plant} showScientificDetails />
          ))}
        </div>
      )}
    </div>
  );
}
