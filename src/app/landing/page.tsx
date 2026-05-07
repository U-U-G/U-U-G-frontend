import Header from '@/components/common/header/Header'
import HeroSection from '@/components/landing/HeroSection'

export default function LandingPage() {
  return (
    <main className="flex h-screen min-h-0 flex-col overflow-hidden">
      <Header />
      <HeroSection />
    </main>
  )
}
