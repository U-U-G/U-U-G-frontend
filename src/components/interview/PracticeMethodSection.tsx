import Image from 'next/image'
import PracticeCard from './PracticeCard'
import { PRACTICE_CARDS } from '@/constants/interview'
import jobPostingImage from '@/assets/image/job-posting-image.png'
import byRoleImage from '@/assets/image/by-role-image.png'

const imageMap = {
  'job-posting': jobPostingImage,
  'by-role': byRoleImage,
} as const

export default function PracticeMethodSection() {
  return (
    <section className="flex flex-col gap-9.75">
      <div className="flex flex-col h-25.75 gap-1 pb-5.75 border-b border-gray5">
        <h1 className="text-[2rem] font-bold">면접 연습하기</h1>
        <p className="text-[1.375rem] font-medium text-gray2">
          어떤 방식으로 연습하시겠어요?
        </p>
      </div>

      <div className="flex gap-7">
        {PRACTICE_CARDS.map((card) => (
          <PracticeCard
            key={card.id}
            title={card.title}
            badge={card.badge}
            description={card.description}
            steps={[...card.steps]}
            href={card.href}
            image={
              <Image
                src={imageMap[card.id]}
                alt={card.title}
                width={128}
                height={128}
                className="object-contain"
              />
            }
          />
        ))}
      </div>
    </section>
  )
}
