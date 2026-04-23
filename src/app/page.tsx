import Header from '@/components/common/header/Header'
import HeroGoalSection from '@/components/home/HeroGoalSection'
import InterviewPlanSection from '@/components/home/InterviewPlanSection'
import TodayScheduleSection from '@/components/home/TodayScheduleSection'
import { homeMockData, emptyHomeMockData } from '@/mocks/homeMockData'

export default function Home() {
  const data = homeMockData
  //const data = emptyHomeMockData

  return (
    <main className="min-h-screen pb-10">
      <Header />
      <div className="mx-auto px-10 pt-10">
        <h1 className="mb-6 h1 leading-tight text-text-primary">
          {data.user.name}님, 오늘도 연습해볼까요?
        </h1>

        <section className="flex">
          <HeroGoalSection data={data.heroGoal} />
          <TodayScheduleSection data={data.todaySchedule} />
        </section>

        <InterviewPlanSection />
      </div>
    </main>
  )
}
