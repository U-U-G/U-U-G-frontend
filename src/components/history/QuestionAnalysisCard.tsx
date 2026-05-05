import AnalysisBadge from './AnalysisBadge'

//TODO: 백엔드 명세에 따라 수정 예정
export interface QuestionAnalysisCardProps {
  questionNumber: number
  question: string
  answer: string
  feedback: string
  score: number
  silence: number
  fillerWord: number
  logicScore: number
}

export default function QuestionAnalysisCard({
  questionNumber,
  question,
  answer,
  feedback,
  score,
  silence,
  fillerWord,
  logicScore,
}: QuestionAnalysisCardProps) {
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
          <AnalysisBadge label="침묵" value={`${silence}점`} />
          <AnalysisBadge label="습관어" value={`${fillerWord}점`} />
          <AnalysisBadge label="논리/구조" value={`${logicScore}점`} />
        </div>
      </div>
    </article>
  )
}
