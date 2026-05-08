'use client'

import { useQuery } from '@tanstack/react-query'
import RankingCard from '@/components/ranking/RankingCard'
import { getRanking } from '@/apis/ranking'
import { formatDateKo } from '@/utils/date'

export default function RankingSection() {
  const { data } = useQuery({
    queryKey: ['ranking'],
    queryFn: getRanking,
  })

  return (
    <div className="flex-1 min-h-0 overflow-auto w-full max-w-360 mx-auto px-[clamp(16px,2.5vw,80px)]">
      <section className="p-8">
        <div className="h1 mb-4">랭킹을 확인해보세요</div>
        <div className="p2 mb-2">나의 순위</div>
        {data?.myRankingResponse && (
          <RankingCard
            {...data.myRankingResponse}
            variant="primary"
            size="lg"
          />
        )}
      </section>
      <div className="flex flex-col px-10">
        <div className="flex items-center gap-2 py-4">
          <span className="p2 text-gray-1">전체 유저 순위</span>
          <span className="p4 text-gray-3">
            {formatDateKo(new Date())} 기준
          </span>
        </div>
        <section className="bg-secondary rounded-t-2xl">
          <div className="flex flex-col gap-4 p-8">
            {data?.rankingItemResponseList?.map((item) => (
              <RankingCard
                key={item.rank}
                {...item}
                variant={
                  item.rank === data.myRankingResponse?.rank
                    ? 'primary'
                    : 'secondary'
                }
                bgWhite={item.rank === data.myRankingResponse?.rank}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
