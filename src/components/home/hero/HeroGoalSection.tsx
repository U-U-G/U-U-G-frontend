'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import UUGCharacterImage from '@/assets/image/uug-character-img.png'
import NoteImage from '@/assets/image/note-img.png'

type HeroGoalSectionProps = {
  isEmpty: boolean
}

export default function HeroGoalSection({ isEmpty }: HeroGoalSectionProps) {
  const router = useRouter()

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-secondary p-6 min-h-0">
      <div>
        {isEmpty ? (
          <>
            <h2 className="mb-1 h2 text-text-primary">
              첫 면접 준비를 시작해볼까요?
            </h2>
            <p className="p3 text-gray-3">
              목표하는 기업의 공고 링크를 준비해주세요
            </p>
          </>
        ) : (
          <>
            <h2 className="mb-1 h2 text-text-primary">
              꾸준한 모의면접으로 합격의 자신감을 채워보세요
            </h2>
            <p className="p3 text-gray-3">
              핵심 직무질문 5개 포함 15분 실전 모의면접에 바로 도전하세요
            </p>
          </>
        )}
      </div>

      <button
        type="button"
        onClick={() => router.push('/interview')}
        className="absolute left-10 bottom-6 z-10 h4 h-[clamp(40px,5.5vh,56px)] px-[clamp(20px,3vw,48px)] rounded-full bg-primary text-white whitespace-nowrap"
      >
        지금 시작하기
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
