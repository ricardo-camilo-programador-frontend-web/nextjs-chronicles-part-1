"use client"

import { FC, useCallback, useEffect, useState } from 'react'
import { EmblaCarouselType } from 'embla-carousel'
import { getUniqueId } from '@/utils/getUniqueId'

type UseSelectedSnapDisplayType = {
  selectedSnap: number
  snapCount: number
  scrollSnaps: number[]
  onDotButtonClick: (index: number) => void
}

export const useSelectedSnapDisplay = (
  emblaApi: EmblaCarouselType | undefined,
): UseSelectedSnapDisplayType => {
  const [selectedSnap, setSelectedSnap] = useState(0)
  const [snapCount, setSnapCount] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const updateScrollSnapState = useCallback((emblaApi: EmblaCarouselType) => {
    setSnapCount(emblaApi.scrollSnapList().length)
    setSelectedSnap(emblaApi.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    updateScrollSnapState(emblaApi)
    emblaApi.on('select', updateScrollSnapState)
    emblaApi.on('reInit', updateScrollSnapState)
  }, [emblaApi, updateScrollSnapState])

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return
      emblaApi.scrollTo(index)
    },
    [emblaApi]
  )

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList())
  }, [])

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedSnap(emblaApi.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onInit(emblaApi)
    onSelect(emblaApi)
    emblaApi.on('reInit', onInit).on('reInit', onSelect).on('select', onSelect)
  }, [emblaApi, onInit, onSelect])

  return {
    selectedSnap,
    scrollSnaps,
    onDotButtonClick,
    snapCount
  }
}

type PropType = {
  selectedSnap: number
  snapCount: number
  className?: string
  onDotButtonClick: (index: number) => void
}

export const SelectedSnapDisplay: FC<PropType> = ({ selectedSnap, snapCount, className, onDotButtonClick }) => {
  return (
    <div className={`flex gap-2 items-center justify-center -z-[1] ${className}`}>
      {Array.from({ length: snapCount }).map((_, index) => (
        <div
          key={`${index}selected-snap-display${getUniqueId()}`}
          aria-label={`Slide ${index + 1} of ${snapCount}`}
          className={`h-2 rounded-full transition-all duration-300 bg-foreground/50 hover:bg-foreground/70 cursor-pointer
            ${selectedSnap === index ? 'w-6' : 'w-2'}`}
          role="button"
          onClick={() => onDotButtonClick(index)}
        />
      ))}
    </div>
  )
}

export default SelectedSnapDisplay
