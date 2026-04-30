import QuestionAnalysisCard, {
  QuestionAnalysisCardProps,
} from './QuestionAnalysisCard'
import ReportSummarySection from './ReportSummarySection'

interface HistoryReportSectionProps {
  questionAnalyses: QuestionAnalysisCardProps[]
}

export default function HistoryReportSection({
  questionAnalyses,
}: HistoryReportSectionProps) {
  return (
    <section className="flex flex-col gap-2 overflow-auto border border-primary rounded-2xl p-7">
      <div className="flex flex-row items-center">
        <div className="bg-secondary p2 text-primary border text-center rounded-full mr-3 py-[1px] px-2">
          2차 시도
        </div>
        <div className="h2 text-text-primary">카카오 서비스 기획자</div>
      </div>
      <div className="p3 text-gray-4 mb-6">00월 00일 5문항 6분 50초</div>

      <ReportSummarySection />

      <p className="p2 text-text-primary">질문별 분석</p>
      <section className="flex flex-col gap-14">
        {questionAnalyses.map((item) => (
          <QuestionAnalysisCard key={item.questionNumber} {...item} />
        ))}
      </section>
    </section>
  )
}
