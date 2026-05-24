import type { StaticImageData } from 'next/image'
import defaultProfileIcon from '@/assets/icon/default-profile-icon.svg'

export function resolveProfileImageSrc(
  profileImageUrl?: string | null,
): string | StaticImageData {
  if (!profileImageUrl) {
    return defaultProfileIcon
  }

  const trimmedUrl = profileImageUrl.trim()

  if (trimmedUrl.length === 0) {
    return defaultProfileIcon
  }

  const isExternalImage = trimmedUrl.startsWith('http')

  if (!isExternalImage) {
    return defaultProfileIcon
  }

  return trimmedUrl
}
