type RankingCardVariant = 'primary' | 'secondary'
type RankingCardSize = 'md' | 'lg'

type RankingCardProps = {
  rank: number
  name: string
  role: string
  score: number
  bestScore: number
  practiceCount: number
  variant?: RankingCardVariant
  size?: RankingCardSize
  bgWhite?: boolean
}

export default function RankingCard({
  rank,
  name,
  role,
  score,
  bestScore,
  practiceCount,
  variant = 'secondary',
  size = 'md',
  bgWhite = false,
}: RankingCardProps) {
  const isPrimary = variant === 'primary'
  const isLarge = size === 'lg'

  return (
    <article
      className={[
        'flex items-center rounded-2xl border',
        isPrimary
          ? `border-primary text-primary ${bgWhite ? 'bg-white' : 'bg-secondary'}`
          : 'border-gray-200 bg-white text-text-primary',
        isLarge ? 'min-h-[144px] px-14 py-8' : 'min-h-[104px] px-8 py-6',
      ].join(' ')}
    >
      <div className="flex flex-1 items-center gap-6">
        <span className="w-12 shrink-0 text-2xl font-bold text-primary">
          #{rank}
        </span>

        <div className="h-14 w-14 rounded-full bg-primary" />

        <div>
          <div className="text-lg font-bold">{name}</div>
          <div className={isPrimary ? 'text-primary' : 'text-gray-500'}>
            {role}
          </div>
        </div>
      </div>

      <div className="text-3xl font-bold text-primary">{score}점</div>

      <div
        className={[
          'ml-10 flex flex-col gap-2 text-sm',
          isPrimary ? 'text-primary' : 'text-gray-500',
        ].join(' ')}
      >
        <div>최고 점수 {bestScore}점</div>
        <div>총 {practiceCount}회 연습</div>
      </div>
    </article>
  )
}
