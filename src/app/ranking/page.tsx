import Header from '@/components/common/header/Header'
import RankingCard from '@/components/ranking/RankingCard'
import { MY_RANK, rankingList } from '@/mock/ranking'
import { formatDateKo } from '@/utils/formatDate'

export default function RankingPage() {
  return (
    <main className="h-screen flex flex-col overflow-hidden">
      <Header />
      <div className="flex-1 min-h-0 overflow-auto w-full max-w-[1440px] mx-auto px-[clamp(16px,2.5vw,80px)]">
        <section className="p-8">
          <div className="h1 mb-4">랭킹을 확인해보세요</div>
          <div className="p2 mb-2">나의 순위</div>
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
        <div className="flex flex-col px-10">
          <div className="flex items-center gap-2 py-4">
            <span className="p2 text-gray-1">전체 유저 순위</span>
            <span className="p4 text-gray-3">{formatDateKo()} 기준</span>
          </div>
          <section className="bg-secondary rounded-t-2xl">
            <div className="flex flex-col gap-4 p-8">
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
      </div>
    </main>
  )
}
