import Header from '@/components/common/header/Header'
import JobPostingFormSection from '@/components/interview/JobPostingFormSection'

export default function JobPostingPage() {
  return (
    <main className="h-screen flex flex-col overflow-hidden">
      <Header />
      <JobPostingFormSection />
    </main>
  )
}
