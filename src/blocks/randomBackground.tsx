import type { FC } from 'react'
import bgBonsai from '@/assets/images/bonsai.webp'
import bgCactus from '@/assets/images/cactus.webp'
import bgJibola from '@/assets/images/jibola.webp'
import Image from 'next/image'

interface RandomBackgroundProps {
  className?: string
}

const RandomBackground: FC<RandomBackgroundProps> = ({ className }) => {
  const backgrounds = [
    {
      id: 1,
      image: bgBonsai,
      title: "BONSAI",
    },
    {
      id: 2,
      image: bgCactus,
      title: "CACTUS",
    },
    {
      id: 3,
      image: bgJibola,
      title: "JIBOIA",
    },
  ]

  const randomBackground = backgrounds[Math.floor(Math.random() * backgrounds.length)]

  return (
    <div className={`flex flex-col items-center justify-center h-screen bg-gradient-to-r from-gradient-start to-gradient-end absolute inset-0 min-h-full blur-sm ${className}`}>
      <p
        className="text-foreground text-7xl font-bold absolute top-[7rem] left-6"
      >
        {randomBackground.title}
      </p>

      <Image
        src={randomBackground.image}
        alt={`${randomBackground.title} plant background decoration`}
        className="absolute right-0 ml-auto bottom-0 min-h-full w-full object-cover max-w-[20rem] max-h-screen overflow-visible"
        fill
        sizes="20rem"
        aria-hidden="true"
      />
    </div>
  )
}

export default RandomBackground
