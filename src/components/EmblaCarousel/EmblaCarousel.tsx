"use client"

import type { FC, ReactNode } from 'react'
import { Children, useEffect, useCallback, useRef } from 'react'
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
  const rafIdRef = useRef<number>(0)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  const { selectedSnap, snapCount } = useSelectedSnapDisplay(emblaApi)

  const updateSlidesVisibility = useCallback(() => {
    if (!emblaApi || !hideInactiveSlides) return

    const viewport = document.getElementById(carouselId)
    if (!viewport) return

    const viewportRect = viewport.getBoundingClientRect()
    const slideNodes = emblaApi.slideNodes()

    const tolerance = 200

    slideNodes.forEach((slide) => {
      const slideRect = slide.getBoundingClientRect()
      const isVisible = (
        slideRect.left >= viewportRect.left - tolerance &&
        slideRect.right <= viewportRect.right + tolerance
      )

      slide.classList.toggle('opacity-0', !isVisible)
      slide.classList.toggle('opacity-100', isVisible)
      slide.classList.toggle('pointer-events-none', !isVisible)
    })
  }, [emblaApi, hideInactiveSlides, carouselId])

  const scheduleVisibilityUpdate = useCallback(() => {
    cancelAnimationFrame(rafIdRef.current)
    rafIdRef.current = requestAnimationFrame(updateSlidesVisibility)
  }, [updateSlidesVisibility])

  const onDotButtonClick = (index: number) => {
    if (!emblaApi) return
    emblaApi.scrollTo(index)
  }

  useEffect(() => {
    if (!emblaApi) return

    const timer = setTimeout(() => {
      updateSlidesVisibility()
    }, 50)

    emblaApi.on('scroll', scheduleVisibilityUpdate)
    emblaApi.on('reInit', updateSlidesVisibility)
    emblaApi.on('select', updateSlidesVisibility)
    emblaApi.on('settle', updateSlidesVisibility)

    return () => {
      clearTimeout(timer)
      cancelAnimationFrame(rafIdRef.current)
      emblaApi.off('scroll', scheduleVisibilityUpdate)
      emblaApi.off('reInit', updateSlidesVisibility)
      emblaApi.off('select', updateSlidesVisibility)
      emblaApi.off('settle', updateSlidesVisibility)
    }
  }, [emblaApi, updateSlidesVisibility, scheduleVisibilityUpdate])

  return (
    <section
      id={carouselId}
      className={`rounded-[24px] p-8 relative z-[1] ${className}`}
    >
      <div className="relative" ref={emblaRef}>
        <div className="flex touch-pan-y items-center transition-opacity duration-300 cursor-grab hover:cursor-grabbing"
        >
          {Children.map(children, (child, index) => (
            <div
              key={`${index}embla-carousel-slide${carouselId}`}
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
