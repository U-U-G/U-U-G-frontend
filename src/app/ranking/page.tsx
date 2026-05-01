import Header from '@/components/common/header/Header'
import RankingCard from '@/components/ranking/RankingCard'
import { MY_RANK, rankingList } from '@/mock/ranking'

export default function RankingPage() {
  return (
    <main className="h-screen flex flex-col overflow-hidden">
      <Header />
      <div className="flex-1 min-h-0 flex flex-col w-full max-w-[1440px] mx-auto px-[clamp(16px,2.5vw,80px)]">
        <section className="p-10">
          <div className="h1">랭킹을 확인해보세요</div>
          <div className="p2">나의 순위</div>
          <RankingCard
            rank={MY_RANK}
            name="아무개"
            role="서비스 기획자"
            score={64}
            bestScore={72}
            practiceCount={4}
            variant="primary"
            size="lg"
          />
        </section>
        <section className="flex-1 min-h-0 overflow-auto">
          <div className="flex flex-col gap-4 p-6">
            {rankingList.map(({ rank, ...rest }) => (
              <RankingCard
                key={rank}
                rank={rank}
                {...rest}
                variant={rank === MY_RANK ? 'primary' : 'secondary'}
                bgWhite={rank === MY_RANK}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
