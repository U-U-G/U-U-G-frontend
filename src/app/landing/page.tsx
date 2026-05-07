import Header from '@/components/common/header/Header'
import HeroSection from '@/components/landing/HeroSection'
import LandingConcernsSection from '@/components/landing/LandingConcernsSection'

export default function LandingPage() {
  return (
    <main className="flex h-screen min-h-0 flex-col ">
      <Header />
      <HeroSection />
      <LandingConcernsSection />
    </main>
  )
}
