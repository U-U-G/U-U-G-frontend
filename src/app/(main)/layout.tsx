import Header from '@/components/common/header/Header'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="h-screen flex flex-col overflow-hidden">
      <Header />
      <div className="flex-1 min-h-0 flex flex-col w-full max-w-360 mx-auto px-[clamp(16px,2.5vw,80px)]">
        {children}
      </div>
    </main>
  )
}
