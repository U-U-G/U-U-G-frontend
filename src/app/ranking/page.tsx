import Header from '@/components/common/header/Header'
import RankingCard from '@/components/ranking/RankingCard'

export default function RankingPage() {
  return (
    <main className="h-screen flex flex-col overflow-hidden">
      <Header />
      <header>
        <div>랭킹을 확인해보세요</div>
        <div>나의 순위</div>
      </header>
      <div className="flex flex-col gap-4 p-6">
        <RankingCard
          rank={12}
          name="아무개"
          role="서비스 기획자"
          score={64}
          bestScore={72}
          practiceCount={4}
          variant="primary"
          size="lg"
        />

        <RankingCard
          rank={1}
          name="아무개 2"
          role="백엔드 개발자"
          score={100}
          bestScore={72}
          practiceCount={4}
          variant="secondary"
        />

        <RankingCard
          rank={12}
          name="아무개"
          role="서비스 기획자"
          score={64}
          bestScore={72}
          practiceCount={4}
          variant="primary"
          bgWhite
        />
      </div>
    </main>
  )
}
