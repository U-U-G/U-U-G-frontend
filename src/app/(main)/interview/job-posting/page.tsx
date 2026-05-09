import type { Metadata } from 'next'
import JobPostingFormSection from '@/components/interview/JobPostingFormSection'

export const metadata: Metadata = {
  title: '공고 등록',
  description: '연습할 채용 공고를 등록하세요.',
}

export default function JobPostingPage() {
  return <JobPostingFormSection />
}
