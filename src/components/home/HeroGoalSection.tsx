import Image from 'next/image'
import NoteImage from '@/assets/icon/home/note-icon.svg'
import RobotImage from '@/assets/icon/home/robot-icon.svg'

export default function HeroGoalSection() {
  return (
    <div className="relative mr-7 mb-7 h-[480px] flex-[2] rounded-2xl bg-secondary p-7">
      <div className="flex h-full flex-col justify-between">
        <div>
          <h2 className="mb-3 text-2xl font-bold text-text-primary">
            아직 목표 기업을 설정하지 않았어요. 첫 면접 준비를 시작해 볼까요?
          </h2>
          <p className="text-lg font-medium text-gray-3">
            목표하는 기업의 공고 링크를 준비해주세요
          </p>
        </div>

        <div className="flex flex-col items-start justify-between gap-8">
          <button
            type="button"
            className="h-14 w-63 items-center justify-center rounded-full bg-primary px-12 text-xl font-bold text-white"
          >
            지금 시작하기
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
