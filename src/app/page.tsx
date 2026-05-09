import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    absolute: '음어그 | UUG',
  },
  description:
    'AI 기반 면접 연습 플랫폼 음어그. 실전처럼 연습하고 분석 받아보세요.',
}

import Image from 'next/image'
import Header from '@/components/common/header/Header'
import HeroSection from '@/components/landing/HeroSection'
import LandingConcernsSection from '@/components/landing/LandingConcernsSection'
import LandingFooterSection from '@/components/landing/LandingFooterSection'
import FeatureTemplate from '@/components/landing/FeatureTemplate'
import Feature1Img from '@/assets/image/landing/feature1-img.png'
import Feature2Img from '@/assets/image/landing/feature2-img.png'
import Feature3Img from '@/assets/image/landing/feature3-img.png'
import Number1Icon from '@/assets/icon/number1-round-fill-icon.svg'
import Number2Icon from '@/assets/icon/number2-round-fill-icon.svg'
import Number3Icon from '@/assets/icon/number3-round-fill-icon.svg'

export default function LandingPage() {
  return (
    <main className="flex h-screen flex-col ">
      <Header />
      <HeroSection />
      <LandingConcernsSection />
      <FeatureTemplate
        icon={<Image src={Number1Icon} alt="" width={22} height={22} />}
        image={Feature1Img}
        imagePosition="right"
        title={`채용 공고 링크 하나로\n끝내는 모의면접`}
        subtitle={`복잡한 설정 없이 지원할 채용 공고 URL만 입력하세요.\n면접 대비의 전체 사이클이 단 한 번의 입력으로 자동 진행됩니다.`}
        caption="공고 분석 〉 맞춤형 질문 생성 〉 사용자 답변 〉 분석 리포트 생성"
      />
      <FeatureTemplate
        backgroundClassName="bg-white"
        icon={<Image src={Number2Icon} alt="" width={22} height={22} />}
        image={Feature2Img}
        imagePosition="left"
        title={`내 말하기 습관의\n직관적인 데이터화`}
        subtitle={`무의식적으로 사용하는 '음, 어, 그'와 침묵 시간을 정확하게\n식별합니다. 직관적인 점수와 프로그레스가 바로 제공되며,\n 더불어 답변의 퀄리티를 확인받고 교정할 수 있습니다.`}
      />
      <FeatureTemplate
        backgroundClassName="bg-white"
        icon={<Image src={Number3Icon} alt="" width={22} height={22} />}
        image={Feature3Img}
        imagePosition="right"
        title={`실시간 랭킹으로\n파악하는 나의 순위`}
        subtitle={`전체 사용자 중 나의 객관적인 위치를 파악하세요.\n 분석 리포트의 총점을 기준으로 실시간 랭킹이 산정됩니다.\n 실전 감각을 유지하고 확실한 동기부여를 얻을 수 있습니다.`}
      />
      <LandingFooterSection />
    </main>
  )
}
