import type { FC } from "react";
import { QuotedTitle } from "@/components/QuotedTitle";
import { useTestimonials } from "@/hooks/testimonials";
import { TestimonialCard } from "@/components/TestimonialCard";
import { getUniqueId } from "@/utils/getUniqueId";
import { useTranslations } from 'next-intl';

const TestimonialSection: FC = () => {
  const testimonials = useTestimonials();
  const t = useTranslations('testimonials');

  return (
    <div className="relative min-h-[20rem] max-w-7xl mx-auto pt-32 px-2 h-full pb-6">
      <div className="flex flex-col items-center max-w-[40rem] mx-auto">
        <QuotedTitle className="text-center text-foreground">
          {t('title')}
        </QuotedTitle>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center h-auto w-full gap-[10rem] md:gap-y-[8rem] lg:gap-4 mt-[11rem] gap-y-[15rem]">
        {testimonials.slice(0, 3).map((testimonial, index) => (
          <TestimonialCard
            key={`${testimonial.id}-${index}-testimonial-${getUniqueId()}`}
            testimonial={testimonial}
            className="col-span-1 h-auto"
          />
        ))}
      </div>
    </div>
  );
}

export default TestimonialSection;
