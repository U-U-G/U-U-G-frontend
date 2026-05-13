'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import UUGCharacterImage from '@/assets/image/uug-character-img.png'
import NoteImage from '@/assets/image/note-img.png'

type HeroGoalData = {
  title: string
  description: string
  dDayLabel?: string
  ctaLabel: string
} | null

export default function HeroGoalSection({ data }: { data: HeroGoalData }) {
  const router = useRouter()
  const isEmpty = !data

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-secondary p-6 min-h-0">
      <div>
        {isEmpty ? (
          <>
            <h2 className="mb-3 h2 text-text-primary">
              아직 목표 기업을 설정하지 않았어요. 첫 면접 준비를 시작해 볼까요?
            </h2>
            <p className="p3 text-gray-3">
              목표하는 기업의 공고 링크를 준비해주세요
            </p>
          </>
        ) : (
          <>
            <div className="mb-3 flex items-center gap-3">
              {data.dDayLabel && (
                <span className="border border-primary p2 rounded-full px-3 bg-white text-primary">
                  {data.dDayLabel}
                </span>
              )}
              <h2 className="h2 text-text-primary">{data.title}</h2>
            </div>

            <p className="p3 text-gray-3">{data.description}</p>
          </>
        )}
      </div>

      <button
        type="button"
        onClick={() => router.push('/interview')}
        className="absolute left-6 bottom-6 z-10 h4 h-[clamp(40px,5.5vh,56px)] px-[clamp(20px,3vw,48px)] rounded-full bg-primary text-white whitespace-nowrap"
      >
        {isEmpty ? '지금 시작하기' : data.ctaLabel}
      </button>

      <div className="absolute right-8 bottom-8 flex items-end pointer-events-none">
        <Image src={NoteImage} alt="" className="w-[clamp(56px,8vw,120px)]" />

        <Image
          src={UUGCharacterImage}
          alt="면접 준비 캐릭터"
          className="translate-y-8 translate-x-2 w-[clamp(240px,25vw,290px)]"
          priority
        />
      </div>
    </div>
  )
}
