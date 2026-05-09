import type { Metadata } from 'next'
import AnalysisSection from '@/components/interview/AnalysisSection'

export const metadata: Metadata = {
  title: '분석 중',
  description: '공고를 분석하고 면접 질문을 생성하고 있어요.',
}

export default function AnalysisPage() {
  return <AnalysisSection />
}
