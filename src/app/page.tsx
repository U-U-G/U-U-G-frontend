import Header from '@/components/common/header/Header'
import HeroGoalSection from '@/components/home/HeroGoalSection'
import InterviewPlanSection from '@/components/home/InterviewPlanSection'
import TodayScheduleSection from '@/components/home/TodayScheduleSection'
import { homeMockData, emptyHomeMockData } from '@/mocks/homeMockData'

export default function Home() {
  const data = homeMockData
  //const data = emptyHomeMockData
  throw new Error('test')
  return (
    <main className="h-screen overflow-hidden flex flex-col">
      <Header />

      <div className="flex-1 min-h-0 flex flex-col pt-4">
        <div className="w-full max-w-[1440px] mx-auto px-[clamp(16px,2.5vw,80px)] flex flex-col flex-1 min-h-0">
          <h1 className="mb-[clamp(6px,1vw,16px)] h1 text-text-primary">
            {data.user.name}님, 오늘도 연습해볼까요?
          </h1>

          <section className="flex flex-1 gap-[clamp(8px,2vw,24px)] min-h-0">
            <div className="flex-[2] min-h-0 flex">
              <HeroGoalSection data={data.heroGoal} />
            </div>
            <div className="flex-[1] min-h-0 flex">
              <TodayScheduleSection schedules={data.todaySchedule.schedules} />
            </div>
          </section>

          <div className="flex-shrink-0 mt-[clamp(8px,2vw,24px)] mb-[clamp(8px,2vw,24px)]">
            <InterviewPlanSection data={data.interviewPlans} />
          </div>
        </div>
      </div>
    </main>
  )
}
