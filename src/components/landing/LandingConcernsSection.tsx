import Image from 'next/image'
import CheckRoundFillIcon from '@/assets/icon/check-round-fill-icon.svg'
import ChevronDownIcon from '@/assets/icon/chevron-down-icon.svg'

const CONCERN_ITEMS = [
  '막상 면접에만 들어가면 머릿속이 새하얘져 버려요',
  '긴장하면 나도 모르게 "음, 어, 그" 같은 말이 튀어나와요',
  '혼자 연습하려니 내 답변이 공고의 직무 요건에 맞는지 확신이 없어요',
  '다른 지원자들과 비교했을 때, 내 객관적인 면접 실력이 궁금해요',
] as const

export default function LandingConcernsSection() {
  return (
    <section className="p-30 flex flex-col justify-center items-center gap-20">
      <span className="text-4xl font-bold">
        혹시 <span className="text-primary">이런 고민</span>에 해당되시나요?
      </span>
      <div className="flex w-full max-w-[720px] flex-col gap-6.5">
        {CONCERN_ITEMS.map((text) => (
          <div
            key={text}
            className="flex items-center rounded-xl border border-primary bg-secondary px-6 py-4.5"
          >
            <span className="inline-flex items-center gap-3 p1 text-text-primary">
              <Image
                src={CheckRoundFillIcon}
                alt=""
                width={28}
                height={28}
                className="shrink-0"
              />
              {text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center gap-6">
        <Image
          src={ChevronDownIcon}
          alt=""
          width={45}
          height={45}
          className="shrink-0"
        />
        <span className="text-center text-4xl text-primary font-medium">
          모든 고민, <span className="text-4xl font-bold">음어그</span>에서
          해결해드립니다
        </span>
      </div>
    </section>
  )
}
