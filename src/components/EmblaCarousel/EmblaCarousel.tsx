"use client"

import type { FC, ReactNode } from 'react'
import { Children, useEffect } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from '@/components/EmblaCarousel/EmblaCarouselArrowButtons'
import {
  SelectedSnapDisplay,
  useSelectedSnapDisplay
} from '@/components/EmblaCarousel/EmblaCarouselSelectedSnapDisplay'
import useEmblaCarousel from 'embla-carousel-react'

type PropType = {
  className?: string
  children: ReactNode
  options?: EmblaOptionsType
  snapDisplayClassName?: string
  carouselId?: string
  hideInactiveSlides?: boolean
}

export const EmblaCarousel: FC<PropType> = (props) => {
  const {
    children,
    options,
    className,
    snapDisplayClassName,
    carouselId = 'embla-carousel',
    hideInactiveSlides = true
  } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  const { selectedSnap, snapCount } = useSelectedSnapDisplay(emblaApi)

  const updateSlidesVisibility = () => {
    if (!emblaApi || !hideInactiveSlides) return

    requestAnimationFrame(() => {
      const viewport = document.getElementById(carouselId)
      if (!viewport) return

      const viewportRect = viewport.getBoundingClientRect()
      const slideNodes = emblaApi.slideNodes()

      const tolerance = 100

      slideNodes.forEach((slide) => {
        const slideRect = slide.getBoundingClientRect()
        const isVisible = (
          slideRect.left >= viewportRect.left - tolerance &&
          slideRect.right <= viewportRect.right + tolerance
        )

        slide.classList.toggle('opacity-0', !isVisible)
        slide.classList.toggle('opacity-100', isVisible)
      })
    })
  }

  const onDotButtonClick = (index: number) => {
    if (!emblaApi) return
    emblaApi.scrollTo(index)
  }

  useEffect(() => {
    if (!emblaApi) return

    const timer = setTimeout(() => {
      updateSlidesVisibility()
    }, 100)

    emblaApi.on('scroll', updateSlidesVisibility)
    emblaApi.on('reInit', updateSlidesVisibility)
    emblaApi.on('select', updateSlidesVisibility)

    return () => {
      clearTimeout(timer)
      emblaApi.off('scroll', updateSlidesVisibility)
      emblaApi.off('reInit', updateSlidesVisibility)
      emblaApi.off('select', updateSlidesVisibility)
    }
  }, [emblaApi])

  const goToNextSlide = () => {
    if (!emblaApi) return
    emblaApi.scrollNext()
  }

  return (
    <section
      id={carouselId}
      className={`rounded-[24px] p-8 relative z-[1] ${className}`}
    >
      <div className="relative" ref={emblaRef}>
        <div className="flex touch-pan-y items-center transition-opacity duration-300 cursor-grab hover:cursor-grabbing"
        onClick={goToNextSlide}
        >
          {Children.map(children, (child, index) => (
            <div
              key={index + 'embla-carousel-slide' + carouselId}
              className="transition-opacity duration-300 pointer-events-auto"
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center relative">
        <div className="flex gap-4">
          <PrevButton
            onClick={onPrevButtonClick}
            disabled={prevBtnDisabled}
            className="w-10 h-10 flex items-center justify-center text-white/50 bg-transparent hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed absolute -top-[6rem] md:-top-[5rem] -left-9"
          />
          <NextButton
            onClick={onNextButtonClick}
            disabled={nextBtnDisabled}
            className="w-10 h-10 flex items-center justify-center text-white/50 bg-transparent hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed absolute -top-[6rem] md:-top-[5rem] -right-9"
          />
        </div>

        <SelectedSnapDisplay
          selectedSnap={selectedSnap}
          snapCount={snapCount}
          className={`text-white/70 text-sm w-full justify-center ${snapDisplayClassName}`}
          onDotButtonClick={onDotButtonClick}
        />
      </div>
    </section>
  )
}

export default EmblaCarousel
