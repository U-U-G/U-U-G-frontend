import Image from 'next/image'
import NoteImage from '@/assets/icon/home/note-icon.svg'
import RobotImage from '@/assets/icon/home/robot-icon.svg'

type HeroGoalData = {
  title: string
  description: string
  dDayLabel?: string
  ctaLabel: string
} | null

export default function HeroGoalSection({ data }: { data: HeroGoalData }) {
  const isEmpty = !data

  return (
    <div className="relative mr-7 mb-7 h-[480px] flex-[2] rounded-2xl bg-secondary p-7">
      <div className="flex h-full flex-col justify-between">
        <div>
          {isEmpty ? (
            <>
              <h2 className="mb-3 h2 text-text-primary">
                아직 목표 기업을 설정하지 않았어요. 첫 면접 준비를 시작해
                볼까요?
              </h2>
              <p className="p3 text-gray-3">
                목표하는 기업의 공고 링크를 준비해주세요
              </p>
            </>
          ) : (
            <>
              <div className="mb-3 flex items-center gap-3">
                {data.dDayLabel && (
                  <span className="border border-primary p2 rounded-full w-14 text-center bg-white px-2 text-primary">
                    {data.dDayLabel}
                  </span>
                )}
                <h2 className="h2 text-text-primary">{data.title}</h2>
              </div>

              <p className="p3 text-gray-3">{data.description}</p>
            </>
          )}
        </div>

        <div className="flex flex-col items-start justify-between gap-8">
          <button
            type="button"
            className="h-14 w-63 items-center justify-center rounded-full bg-primary px-12 h3 text-white"
          >
            {isEmpty ? '지금 시작하기' : data.ctaLabel}
          </button>

          <Image
            src={NoteImage}
            alt=""
            className="absolute right-115 bottom-35 w-[150px]"
          />

          <Image
            src={RobotImage}
            alt="면접 준비 캐릭터"
            className="absolute right-12 bottom-[-25px] w-[450px]"
            priority
          />
        </div>
      </div>
    </div>
  )
}
