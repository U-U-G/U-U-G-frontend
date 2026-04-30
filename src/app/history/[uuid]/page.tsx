import { IconChevronLeft } from '@tabler/icons-react'
import Header from '@/components/common/header/Header'
import HistoryReportSection from '@/components/history/HistoryReportSection'

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

        <HistoryReportSection questionAnalyses={questionAnalyses} />
      </div>
    </main>
  )
}
