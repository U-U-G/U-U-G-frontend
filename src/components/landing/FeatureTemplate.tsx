import Image, { StaticImageData } from 'next/image'
import { ReactNode } from 'react'

type FeatureTemplateProps = {
  icon?: ReactNode
  image: StaticImageData | string
  imageAlt?: string
  imagePosition?: 'left' | 'right'
  backgroundClassName?: string
  title: string
  subtitle: string
  caption?: string
  showCaption?: boolean
}

export default function FeatureTemplate({
  icon,
  image,
  imageAlt = '',
  imagePosition = 'right',
  backgroundClassName = 'bg-secondary',
  title,
  subtitle,
  caption,
  showCaption = true,
}: FeatureTemplateProps) {
  const imageOnLeft = imagePosition === 'left'

  const TextSection = (
    <div
      className={
        imageOnLeft
          ? 'flex flex-col items-end text-right'
          : 'flex flex-col items-start text-left'
      }
    >
      {icon && (
        <div
          className={`mb-3 flex ${imageOnLeft ? 'justify-end' : 'justify-start'}`}
        >
          {icon}
        </div>
      )}

      <h2 className="whitespace-pre-line text-4xl font-bold leading-normal text-primary">
        {title}
      </h2>

      <p className="p1 mt-12 whitespace-pre-line text-black">{subtitle}</p>

      {showCaption && caption && (
        <p className="mt-10 p5 text-primary">{caption}</p>
      )}
    </div>
  )

  const ImageSection = (
    <div
      className={`flex w-full ${imageOnLeft ? 'justify-start' : 'justify-end'}`}
    >
      <div className="relative w-full max-w-[540px] overflow-hidden">
        <Image
          src={image}
          alt={imageAlt}
          className="block h-auto w-full"
          sizes="(max-width: 1024px) 100vw, 540px"
          priority
        />
      </div>
    </div>
  )

  return (
    <section
      className={`w-full ${backgroundClassName} px-[clamp(24px,8vw,110px)] py-[clamp(80px,12vw,160px)]`}
    >
      <div
        className={`mx-auto grid max-w-[1180px] grid-cols-1 gap-[clamp(48px,8vw,120px)] lg:grid-cols-2 ${
          imageOnLeft ? 'items-start' : 'items-center'
        }`}
      >
        {imagePosition === 'left' ? (
          <>
            {ImageSection}
            {TextSection}
          </>
        ) : (
          <>
            {TextSection}
            {ImageSection}
          </>
        )}
      </div>
    </section>
  )
}
