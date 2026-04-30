import { IconChevronLeft } from '@tabler/icons-react'
import Image from 'next/image'
import character5 from '@/assets/image/uug-character5-img.png'
import Header from '@/components/common/header/Header'

const questionAnalyses = Array.from({ length: 5 }, (_, index) => ({
  questionNumber: index + 1,
  question:
    'A/B 테스트를 진행했는데 결과가 가설과 전혀 다르게, 혹은 부정적으로 나왔다면 어떻게 대처하시겠습니까?',
  answer:
    '음 우선 결과가 실패했다고 단정 짓기보다는, 왜 그런 결과가 나왔는지 2차 데이터를 확인합니다. 어 예를 들어 전환율은 떨어졌는데 체류 시간은 늘어났을 수도 있으니까요. 그 세그먼트를 나눠서 특정 코호트에서는 긍정적인 반응이 있었는지도 쪼개어 살펴보고, 다음 개선 가설을 세울 것 같습니다.',
  feedback:
    "목표 얼라인부터 RICE 기법을 활용한 지표 비교, 그리고 타 부서 설득으로 이어지는 논리 흐름이 매우 훌륭해 실무 경험이 돋보이는 답변입니다. 다만, 문장의 주제가 전환되는 구간마다 '어', '그' 같은 습관어가 감지되었습니다. 다음 말을 이어갈 때 접속사나 습관어 대신 1초 정도 가볍게 쉬어가는 포즈(Pause) 기법을 사용해 보세요. 또한, '타 부서를 설득한다'는 표현보다는 '데이터를 바탕으로 합의점을 도출한다'라고 다듬는다면 협업 능력이 한층 더 부각될 수 있습니다.",
  score: 80,
  silence: '1초',
  fillerWord: '3회',
  logicScore: 95,
}))

function QuestionAnalysisCard({
  questionNumber,
  question,
  answer,
  feedback,
  score,
  silence,
  fillerWord,
  logicScore,
}: {
  questionNumber: number
  question: string
  answer: string
  feedback: string
  score: number
  silence: string
  fillerWord: string
  logicScore: number
}) {
  return (
    <article className="flex flex-col gap-6">
      <div className="bg-secondary rounded-2xl p-6 flex flex-col gap-5">
        <div className="flex items-center gap-4">
          <span className="bg-primary text-white rounded-full px-3.5 py-0.5 p4">
            질문 {questionNumber}
          </span>
          <p className="p2 text-primary font-semibold">{question}</p>
        </div>

        <div className="flex items-start gap-4">
          <span className="border border-primary text-primary rounded-full px-[18px] py-[1px] p4 shrink-0">
            답변
          </span>
          <p className="flex-1 p3 text-gray-3 leading-relaxed">{answer}</p>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto w-full flex flex-col gap-4">
        <p className="p3 text-text-primary leading-relaxed break-words">
          {feedback}
        </p>
        <div className="flex flex-wrap gap-4">
          <AnalysisBadge label="총점" value={`${score}점`} active />
          <AnalysisBadge label="침묵" value={silence} />
          <AnalysisBadge label="습관어" value={fillerWord} />
          <AnalysisBadge label="논리/구조" value={`${logicScore}점`} />
        </div>
      </div>
    </article>
  )
}

function AnalysisBadge({
  label,
  value,
  active = false,
}: {
  label: string
  value: string
  active?: boolean
}) {
  return (
    <div
      className={`rounded-full border px-4 py-1 p1 bg-secondary ${
        active ? 'border-primary text-primary' : 'border-gray-5 text-primary '
      }`}
    >
      {label} <span className="h4">{value}</span>
    </div>
  )
}

export default function HistoryDetailPage() {
  return (
    <main className="h-screen flex flex-col overflow-hidden px-6 gap-6">
      <Header />
      <div className="flex flex-col flex-1 min-h-0 overflow-auto px-[clamp(16px,2.5vw,80px)] max-w-[1440px] mx-auto py-2 gap-3">
        <section className="flex flex-col gap-2">
          <h1 className="h1 text-xl font-semibold text-text-primary">
            면접 리포트를 확인해보세요
          </h1>

          <div className="p3 flex items-center gap-1 text-gray-400 text-sm">
            <IconChevronLeft size={18} />
            <span>연습 이력</span>
          </div>
        </section>

        <section className="flex flex-col gap-2 overflow-auto border border-primary rounded-2xl p-7">
          <div className="flex flex-row items-center">
            <div className="bg-secondary p2 text-primary border text-center rounded-full mr-3 py-[1px] px-2">
              2차 시도
            </div>
            <div className="h2 text-text-primary">카카오 서비스 기획자</div>
          </div>
          <div className="p3 text-gray-4 mb-6">00월 00일 5문항 6분 50초</div>

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
                  중요한 ‘신뢰감’과 ‘전문성’이 다소 부족해 보일 수 있습니다.
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
          <p className="p2 text-text-primary">질문별 분석</p>
          <section className="flex flex-col gap-14">
            {questionAnalyses.map((item) => (
              <QuestionAnalysisCard key={item.questionNumber} {...item} />
            ))}
          </section>
        </section>
      </div>
    </main>
  )
}

function Metric({
  label,
  value,
  percent,
  color,
  background = 'bg-gray-5',
}: {
  label: string
  value: string
  percent: number
  color: string
  background?: string
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between text-sm text-gray-700">
        <span>{label}</span>
        <span>{value}</span>
      </div>

      <div className={`w-full h-3 rounded-full overflow-hidden  ${background}`}>
        <div className={`h-full ${color}`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}
