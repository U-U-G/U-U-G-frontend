import QuestionAnalysisCard, {
  QuestionAnalysisCardProps,
} from './QuestionAnalysisCard'
import ReportSummarySection, {
  ReportSummarySectionProps,
} from './ReportSummarySection'

interface HistoryReportSectionProps extends ReportSummarySectionProps {
  attempt: string
  title: string
  meta: string
  questionAnalyses: QuestionAnalysisCardProps[]
}

export default function HistoryReportSection({
  attempt,
  title,
  meta,
  totalScore,
  feedback,
  metrics,
  questionAnalyses,
}: HistoryReportSectionProps) {
  return (
    <section className="flex flex-col gap-2 overflow-auto border border-primary rounded-2xl p-7">
      <div className="flex flex-row items-center">
        <div className="bg-secondary p2 text-primary border text-center rounded-full mr-3 py-[1px] px-2">
          {attempt}
        </div>
        <div className="h2 text-text-primary">{title}</div>
      </div>
      <div className="p3 text-gray-4 mb-6">{meta}</div>

      <ReportSummarySection
        totalScore={totalScore}
        feedback={feedback}
        metrics={metrics}
      />

      <p className="p2 text-text-primary">질문별 분석</p>
      <section className="flex flex-col gap-14">
        {questionAnalyses.map((item) => (
          <QuestionAnalysisCard key={item.questionNumber} {...item} />
        ))}
      </section>
    </section>
  )
}
