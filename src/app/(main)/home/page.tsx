import type { Metadata } from 'next'
import HomeGreetingClient from '@/components/home/hero/HomeGreetingClient'
import HeroGoalSection from '@/components/home/hero/HeroGoalSection'
import InterviewPlanSection from '@/components/home/interviewPlan/InterviewPlanSection'
import TodayScheduleSection from '@/components/home/todaySchedule/TodayScheduleSection'
import { homeMockData } from '@/mocks/homeMockData'

export const metadata: Metadata = {
  title: '홈',
  description: '오늘의 면접 일정과 학습 현황을 확인하세요.',
}

export default function Home() {
  const data = homeMockData

  return (
    <div className="flex-1 min-h-0 flex flex-col pt-4">
      <HomeGreetingClient fallbackName={data.user.name} />

      <section className="flex flex-1 gap-[clamp(8px,2vw,24px)] min-h-0">
        <div className="flex-2 min-h-0 flex">
          <HeroGoalSection data={data.heroGoal} />
        </div>
        <div className="flex-1 min-h-0 flex">
          <TodayScheduleSection />
        </div>
      </section>

      <div className=" mt-[clamp(8px,2vw,24px)] mb-[clamp(8px,2vw,24px)]">
        <InterviewPlanSection />
      </div>
    </div>
  )
}
