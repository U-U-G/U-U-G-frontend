'use client'

import { useQuery } from '@tanstack/react-query'
import { getProfile } from '@/apis/user'

type HomeGreetingClientProps = {
  fallbackName: string
}

export default function HomeGreetingClient({
  fallbackName,
}: HomeGreetingClientProps) {
  const { data: profile } = useQuery({
    queryKey: ['user', 'profile'],
    queryFn: getProfile,
    retry: false,
  })

  const displayName = profile?.nickname ?? fallbackName

  return (
    <h1 className="mb-[clamp(6px,1vw,16px)] h1 text-text-primary">
      {displayName}님, 오늘도 연습해볼까요?
    </h1>
  )
}
