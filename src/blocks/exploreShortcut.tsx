import { Plant } from "@/types/plant.types";
import Link from "@/components/Link";
import { useTranslations } from 'next-intl';

interface ExploreShortcutProps {
  plant: Plant;
  className?: string;
}

export const ExploreShortcut = ({ plant, className }: ExploreShortcutProps) => {
  const t = useTranslations('explore');

  return (
    <Link
      className={`flex-shrink-0 min-w-full w-full flex items-center justify-center md:max-w-[13rem] px-5 py-2 border border-glass-border text-foreground rounded-lg md:w-[12rem] text-[1.75rem] hover:bg-glass transition-all duration-300 text-center ${className}`}
      title={t('title', { name: plant.common_name || plant.scientific_name })}
      href='/plants'
    >
      {t('text')}
    </Link>
  );
};
