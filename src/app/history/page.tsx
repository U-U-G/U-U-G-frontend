import Header from '@/components/common/header/Header'
import HistorySection from '@/components/history/HistorySection'

export default function HistoryPage() {
  return (
    <main className="h-screen overflow-hidden flex flex-col pb-10">
      <Header />
      <HistorySection />
    </main>
  )
}
