import Header from '@/components/common/header/Header'
import InterviewStartSection from '@/components/interview/InterviewStartSection'

export default function InterviewPage() {
  return (
    <main className="h-screen flex flex-col overflow-hidden">
      <Header />
      <InterviewStartSection />
    </main>
  )
}
