import Image from 'next/image'
import character5 from '@/assets/image/uug-character5-img.png'
import Metric from './Metric'

export default function ReportSummarySection() {
  return (
    <section className="grid grid-cols-[2fr_1fr] gap-6 mb-8">
      <div className="bg-secondary rounded-2xl p-6 flex justify-between items-center">
        <div className="flex flex-col gap-2 flex-1 mr-5">
          <span className="p3 text-primary">종합점수</span>
          <span className="text-5xl font-bold text-primary">64점</span>
          <p className="text-sm text-gray-600 leading-relaxed">
            서비스에 대한 애정과 열정은 충분히 느껴졌지만, 질문의 핵심
            의도를 파악하고 논리적으로 설득하는 과정에서 큰 아쉬움이 남는
            면접이었습니다. 특히 당황스러운 질문을 받았을 때 습관어가
            급격히 늘어나고 말끝을 흐리는 패턴이 반복되어, 기획자에게 가장
            중요한 '신뢰감'과 '전문성'이 다소 부족해 보일 수 있습니다.
          </p>
        </div>
        <Image
          src={character5}
          alt="캐릭터"
          width={200}
          height={200}
          className="object-contain"
        />
      </div>

      <div className="bg-secondary rounded-2xl p-6 flex flex-col gap-4">
        <Metric
          label="침묵"
          value="평균 4초"
          percent={60}
          color="bg-red-500"
        />
        <Metric
          label="습관어"
          value="평균 5회"
          percent={45}
          color="bg-red-500"
        />
        <Metric
          label="논리/구조"
          value="평균 64점"
          percent={70}
          color="bg-purple-500"
        />
      </div>
    </section>
  )
}
