import type { FC } from "react"
import { PlantBannerCard } from "@/components/PlantBannerCard";
import { LiveDemoShortcut } from "../liveDemoShortcut";
import { TestimonialCard } from "@/components/TestimonialCard";
import { ExploreShortcut } from "@/blocks/exploreShortcut";
import { PlantCardContent } from "@/components/plantCardContent";
import { QuotedTitle } from "@/components/QuotedTitle";
import { EmblaCarousel } from "@/components/EmblaCarousel/EmblaCarousel";
import { getUniqueId } from "@/utils/getUniqueId";
import { useTranslations } from 'next-intl';
import { useTestimonials } from "@/hooks/testimonials";
import { useMockupPlants } from "@/hooks/mockupPlants";
import Image from "next/image";
import background from "@/assets/images/topiary-green-pot.webp";

interface IntroSectionProps {
  className?: string;
}

const IntroSection: FC<IntroSectionProps> = ({ className }) => {
  const t = useTranslations('hero');
  const liveDemo = useTranslations('liveDemo');
  const testimonials = useTestimonials();
  const mockupPlants = useMockupPlants();

  const randomTestimonial = () => {
    if (!testimonials.length) return null;

    const shuffled = [...testimonials].sort(() => Math.random() - 0.5);

    return shuffled[0];
  };

  const selectedTestimonial = randomTestimonial();

  const randomFlexDIrection = (index: number) => {
    const isEven = index % 2 === 0;

    return isEven ? "flex-col lg:flex-row" : "flex-col lg:flex-row-reverse";
  };

  return (
    <section
      className={`relative overflow-hidden w-screen pb-24 px-4 ${className}`}
    >
      <Image
        src={background}
        alt="Background decorative plants"
        fill
        priority={true}
        fetchPriority="high"
        className="object-cover"
        sizes="100vw"
      />
      <div className="max-w-7xl mx-auto relative grid grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col justify-between items-start mb-16  pt-4 lg:pt-32 gap-4">
          <h1 className="text-7xl xl:text-6xl text-white font-semibold max-w-[40rem]">
            {t('title')}
          </h1>

          <div className="mb-8 max-w-prose">
            <p className="text-white mb-4 text-lg xl:text-lg">
              {t('description')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:max-w-[23rem]">
            <ExploreShortcut
              plant={mockupPlants[1]}
              className="w-full"
            />

            <LiveDemoShortcut
              videoUrl={process.env.LIVE_DEMO_VIDEO_URL ?? ""}
              className="w-full"
              buttonLabel={liveDemo('buttonLabel')}
              buttonTitle={liveDemo('buttonTitle')}
              text={liveDemo('text')}
              modalTitle={liveDemo('modalTitle')}
            />
          </div>

          <div className="relative mt-24">
            {selectedTestimonial && (
              <TestimonialCard
                testimonial={selectedTestimonial}
                testimonialClassName="line-clamp-2"
              />
            )}
          </div>
        </div>

        <div className="lg:top-[1rem] lg:right-0 mx-auto w-[20rem] sm:w-screen md:w-[30rem] overflow-x-hidden overflow-y-visible min-h-[50rem]">
          <EmblaCarousel
            className="relative min-w-full w-full max-w-[20rem] sm:max-w-[99vw] lg:max-w-[25rem] bg-gradient-to-r from-white/10 via-transparent to-transparent backdrop-blur-md rounded-[32px] p-8 border border-white/20 mt-[7rem] right-0 lg:ml-0"
            options={{ loop: true }}
            snapDisplayClassName="absolute bottom-[4rem] left-0 w-full"
          >
            {mockupPlants.map((plant, index) => (
              <div
                className="flex-[0_0_100%] min-w-[19rem] lg:min-w-[20rem] relative mx-auto"
                key={`${plant.id}-${index}-intro-carousel-${getUniqueId()}`}
              >
                <PlantCardContent
                  plant={plant}
                  containerClassName="ml-5"
                  contentClassName="gap-8"
                />
              </div>
            ))}
          </EmblaCarousel>
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative grid grid-cols-1">
        <div className="space-y-6 flex flex-col items-center gap-32 lg:gap-24">
          <QuotedTitle className="text-center text-white">
            {t('trendyPlantsTitle')}
          </QuotedTitle>

          <div className="flex flex-wrap justify-center w-full gap-y-[9rem] lg:gap-[6rem]">
            {mockupPlants.slice(1, 4).map((plant, index) => (
              <PlantBannerCard
                key={`${plant.id}-${index}-intro-banner-${getUniqueId()}`}
                plant={plant}
                className={randomFlexDIrection(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default IntroSection;
