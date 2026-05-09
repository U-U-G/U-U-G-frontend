import Link from 'next/link'

export default function LandingFooterSection() {
  return (
    <footer className="flex flex-col items-center gap-4 bg-primary p-25 text-white">
      <span className="text-[33px] font-bold">
        면접의 차이는 객관적인 피드백에서 나옵니다.
      </span>
      <span className="p1">
        쉽고 빠르게 당신의 면접 수준을 진단하는 &apos;음어그&apos;를
        시작해보세요
      </span>
      <Link
        href="/home"
        className="mt-6 inline-flex cursor-pointer items-center justify-center rounded-full bg-white p2 px-8 py-3.5 text-primary"
      >
        바로 시작하기
      </Link>
    </footer>
  )
}
