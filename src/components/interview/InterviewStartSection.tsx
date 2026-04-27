import Image from 'next/image'
import Link from 'next/link'
import uugCharacter2 from '@/assets/image/uug-character2-img.png'
import StepList from '@/components/common/step/StepList'

const STEPS = [
  '링크, 회사명, 면접 일정 입력',
  '마이크 점검',
  '맞춤형 질문 5개 연습',
  '결과 분석',
  '분석 리포트 제공',
]

export default function InterviewStartSection() {
  return (
    <section className="flex flex-col flex-1 min-h-0 gap-5 px-10 pt-6.5 pb-10">
      <h1 className="h1 w-full">원하는 기업의 공고 링크로 면접을 연습하세요</h1>

      <div className="flex-1 min-h-0 w-full min-w-200 bg-secondary rounded-2xl border border-primary flex flex-col items-center justify-center">
        <Image
          src={uugCharacter2}
          alt="음어그 캐릭터"
          width={132}
          height={129}
          className="object-contain"
        />

        <div className="flex flex-col items-center gap-3.5 mt-2.25">
          <h2 className="h1 text-primary">공고 맞춤 면접 연습</h2>
          <p className="p1 text-text-primary text-center">
            원하는 기업의 채용 공고 링크 URL을 준비해주세요
            <br />
            해당 공고에 특화된 질문을 AI가 생성합니다.
          </p>
        </div>

        <hr className="w-157.5 border-gray-5 mt-6.75" />

        <div className="mt-6.25">
          <StepList steps={STEPS} />
        </div>

        <Link
          href="/interview/job-posting"
          className="min-w-101.5 text-center h3 text-white bg-primary rounded-full px-13.75 py-3 mt-9.75"
        >
          면접 연습 시작
        </Link>
      </div>
    </section>
  )
}
