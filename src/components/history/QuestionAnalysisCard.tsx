import AnalysisBadge from './AnalysisBadge'

export interface QuestionAnalysisCardProps {
  questionNumber: number
  question: string
  answer: string
  feedback: string
  totalScore: number
  silenceScore: number
  fillerScore: number
  logicScore: number
}

export default function QuestionAnalysisCard({
  questionNumber,
  question,
  answer,
  feedback,
  totalScore,
  silenceScore,
  fillerScore,
  logicScore,
}: QuestionAnalysisCardProps) {
  return (
    <article className="flex flex-col gap-6">
      <div className="bg-secondary rounded-2xl p-6 flex flex-col gap-5">
        <div className="flex items-start gap-4">
          <span className="bg-primary text-white rounded-full px-3.5 py-0.5 p4 shrink-0">
            질문 {questionNumber}
          </span>
          <p className="p2 text-primary font-semibold">{question}</p>
        </div>

        <div className="flex items-start gap-4">
          <span className="border border-primary text-primary rounded-full px-4.5 py-px p4 shrink-0">
            답변
          </span>
          <p className="flex-1 p3 text-gray-3 leading-relaxed">{answer}</p>
        </div>
      </div>

      <div className="max-w-310 mx-auto w-full flex flex-col gap-4">
        <p className="p3 text-text-primary leading-relaxed wrap-break-word">
          {feedback}
        </p>
        <div className="flex flex-wrap gap-4">
          <AnalysisBadge label="총점" value={`${totalScore}점`} active />
          <AnalysisBadge label="침묵" value={`${silenceScore}점`} />
          <AnalysisBadge label="습관어" value={`${fillerScore}점`} />
          <AnalysisBadge label="논리/구조" value={`${logicScore}점`} />
        </div>
      </div>
    </article>
  )
}
