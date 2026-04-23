import type { ReactNode } from 'react'
import Link from 'next/link'
import Badge from '@/components/common/badge/Badge'
import StepList from '@/components/common/step/StepList'

interface PracticeCardProps {
  title: string
  badge?: string
  description: string
  steps: string[]
  image: ReactNode
  href: string
}

export default function PracticeCard({
  title,
  badge,
  description,
  steps,
  image,
  href,
}: PracticeCardProps) {
  return (
    <div className="flex flex-col bg-[#F9F7FF] rounded-2xl p-8 gap-8 flex-1 max-w-116.25 min-w-100 border border-transparent hover:border-primary">
      <div className="flex flex-col gap-2.75">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-text-primary">{title}</span>
          {badge && <Badge label={badge} />}
        </div>
        <p className="text-lg font-medium text-gray3 whitespace-pre-line leading-relaxed">
          {description}
        </p>
      </div>

      <div className="flex items-end justify-between flex-1">
        <StepList steps={[...steps]} />
        <div className="flex flex-col items-center self-center">
          {image}
          <div className="w-30 h-3 mt-3 bg-[radial-gradient(ellipse_at_center,rgba(80,60,120,0.25)_0%,transparent_70%)]" />
        </div>
      </div>

      <Link
        // 여기에 페이지 링크 넣어주세욤
        href={href}
        className="block w-fit mx-auto text-center text-base font-medium text-white bg-primary rounded-lg px-15.75 py-2.25 cursor-pointer"
      >
        연습하기
      </Link>
    </div>
  )
}
