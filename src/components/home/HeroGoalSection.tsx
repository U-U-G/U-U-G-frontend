import Image from 'next/image'
import UUGCharacterImage from '@/assets/image/uug-character-img.png'
import NoteImage from '@/assets/image/note-img.png'

type HeroGoalData = {
  title: string
  description: string
  dDayLabel?: string
  ctaLabel: string
} | null

export default function HeroGoalSection({ data }: { data: HeroGoalData }) {
  const isEmpty = !data

  return (
    <div className="h-full w-full rounded-2xl bg-secondary p-6 flex flex-col justify-between min-h-0">
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

      <div className="flex items-end justify-between gap-4">
        <button
          type="button"
          className="h3 h-[clamp(40px,5.5vh,56px)] px-[clamp(16px,4vw,48px)] rounded-full bg-primary text-white whitespace-nowrap"
        >
          {isEmpty ? '지금 시작하기' : data.ctaLabel}
        </button>

        <div className="flex items-end gap-2">
          <Image
            src={NoteImage}
            alt=""
            className="hidden md:block w-[80px] lg:w-[120px]"
          />

          <Image
            src={UUGCharacterImage}
            alt="면접 준비 캐릭터"
            className="w-[clamp(120px,20vw,320px)]"
            priority
          />
        </div>
      </div>
    </div>
  )
}
