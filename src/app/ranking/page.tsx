import Header from '@/components/common/header/Header'
import RankingSection from '@/components/ranking/RankingSection'

export default function RankingPage() {
  return (
    <main className="h-screen flex flex-col overflow-hidden">
      <Header />
      <RankingSection />
    </main>
  )
}
