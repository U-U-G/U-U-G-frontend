import Image from 'next/image'
import defaultProfileIcon from '@/assets/icon/default-profile-icon.svg'

type RankingCardVariant = 'primary' | 'secondary'
type RankingCardSize = 'md' | 'lg'

type RankingCardProps = {
  rank: number
  name: string
  role: string
  score: number
  bestScore: number
  practiceCount: number
  profileImage?: string
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
  profileImage,
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
          : 'border-gray-5 bg-white text-text-primary',
        isLarge ? 'min-h-[144px] px-16 py-14' : 'min-h-[104px] px-12 py-8',
      ].join(' ')}
    >
      <div className="flex flex-1 items-center gap-6">
        <span className="w-12 shrink-0 text-primary h2">#{rank}</span>

        <Image
          src={profileImage ?? defaultProfileIcon}
          alt={`${name} 프로필`}
          width={60}
          height={60}
          className="h-14 w-14 rounded-full object-cover shrink-0"
        />

        <div>
          <div className="h2">{name}</div>
          <div className={`p1 ${isPrimary ? 'text-primary' : 'text-gray-2'}`}>
            {role}
          </div>
        </div>
      </div>

      <div className="text-4xl font-bold text-primary">{score}점</div>

      <div
        className={[
          'ml-10 flex flex-col p1',
          isPrimary ? 'text-primary' : 'text-gray-2',
        ].join(' ')}
      >
        <div>최고 점수 {bestScore}점</div>
        <div>총 {practiceCount}회 연습</div>
      </div>
    </article>
  )
}
