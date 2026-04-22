import Header from '@/components/common/header/Header'
import HeroGoalSection from '@/components/home/HeroGoalSection'
import InterviewPlanSection from '@/components/home/InterviewPlanSection'
import TodayScheduleSection from '@/components/home/TodayScheduleSection'

export default function Home() {
  return (
    <main className="min-h-screen pb-10">
      <Header />
      <div className="mx-auto px-10 pt-10">
        <h1 className="mb-6 text-4xl leading-tight font-bold text-text-primary">
          아무개님, 만나서 반가워요
        </h1>

        <section className="flex">
          <HeroGoalSection />
          <TodayScheduleSection />
        </section>

        <InterviewPlanSection />
      </div>
    </main>
  )
}
