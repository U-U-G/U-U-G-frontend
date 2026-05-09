import type { Metadata } from 'next'
import InterviewStartSection from '@/components/interview/InterviewStartSection'

export const metadata: Metadata = {
  title: '면접 연습',
  description: 'AI와 함께 실전 면접을 연습하세요.',
}

export default function InterviewPage() {
  return <InterviewStartSection />
}
