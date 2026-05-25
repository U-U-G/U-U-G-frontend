'use client'

import { useQuery } from '@tanstack/react-query'
import { getJobPostingList } from '@/apis/job-postings'
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

  const { data: jobPostings = [] } = useQuery({
    queryKey: ['job-postings'],
    queryFn: getJobPostingList,
    retry: false,
  })

  const userNickname = profile?.nickname ?? fallbackName

  const isEmpty = jobPostings.length === 0
  const greetingMessage = isEmpty ? '만나서 반가워요' : '오늘도 연습해볼까요?'

  return (
    <h1 className="mb-[clamp(6px,1vw,16px)] h1 text-text-primary">
      {userNickname}님, {greetingMessage}
    </h1>
  )
}
