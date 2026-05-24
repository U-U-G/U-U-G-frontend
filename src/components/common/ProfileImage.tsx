import Image from 'next/image'
import { resolveProfileImageSrc } from '@/utils/profileImage'

type ProfileImageProps = {
  profileImageUrl?: string | null
  width: number
  height: number
  alt: string
  className?: string
}

export default function ProfileImage({
  profileImageUrl,
  width,
  height,
  alt,
  className,
}: ProfileImageProps) {
  const src = resolveProfileImageSrc(profileImageUrl)
  const isRemoteImage = typeof src === 'string' && src.startsWith('http')

  return (
    <Image
      key={isRemoteImage ? src : 'default-profile'}
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      unoptimized={isRemoteImage}
    />
  )
}
