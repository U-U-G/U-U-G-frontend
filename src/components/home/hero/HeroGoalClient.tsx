'use client'

import { useQuery } from '@tanstack/react-query'
import { getJobPostingList } from '@/apis/job-postings'
import HeroGoalSection from '@/components/home/hero/HeroGoalSection'

export default function HeroGoalClient() {
  const { data: jobPostings = [] } = useQuery({
    queryKey: ['job-postings'],
    queryFn: getJobPostingList,
    retry: false,
  })

  const isEmpty = jobPostings.length === 0

  return <HeroGoalSection isEmpty={isEmpty} />
}
