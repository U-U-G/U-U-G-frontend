import Image from 'next/image'
import Link from 'next/link'
import LandingBackgroundImg from '@/assets/image/landing/background-img.png'
import LandingSideImg from '@/assets/image/landing/uug-character-landing-img.png'
import SpeechBubbleImg from '@/assets/image/landing/speech-bubble-img.png'

export default function HeroSection() {
  return (
    <div className="relative flex-1 min-h-screen shrink-0">
      <Image
        src={LandingBackgroundImg}
        alt=""
        fill
        priority
        className="object-cover object-center pointer-events-none select-none"
        sizes="100vw"
      />

      <div className="relative z-10 flex h-full min-h-0 items-center justify-center gap-[clamp(16px,6vw,100px)] px-[clamp(16px,2.5vw,80px)] py-6">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col">
            <Image
              src={SpeechBubbleImg}
              alt=""
              width={180}
              height={120}
              className="-translate-x-3.5 h-auto object-left mb-1"
              priority
            />

            <div className="flex flex-col gap-2">
              <span className="text-5xl font-extrabold text-primary">
                공고 링크 하나면
              </span>

              <span className="mt-2 text-5xl font-extrabold text-black">
                면접 준비는 끝났습니다
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col p1 text-text-primary">
              <p>
                공고 링크 하나면 기업 분석부터 실전 모의면접, 말버릇 교정까지 한
                번에.
              </p>

              <p>나만의 AI 면접 코치 &apos;음어그&apos;를 만나보세요.</p>
            </div>

            <Link
              href="/"
              className="mt-14 p2 inline-flex cursor-pointer items-center justify-center self-start rounded-full bg-primary px-10 py-3.5 text-white"
            >
              바로 시작하기
            </Link>
          </div>
        </div>

        <div className="relative shrink-0">
          <Image
            src={LandingSideImg}
            alt=""
            width={750}
            height={750}
            className="h-auto max-h-[min(75vh,560px)] w-auto object-contain object-right"
            priority
          />
        </div>
      </div>
    </div>
  )
}
