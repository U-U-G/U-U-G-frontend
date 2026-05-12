import type { Metadata } from 'next'
import UserInfoSection from '@/components/setting/UserInfoSection'
import TermsLinks from '@/components/setting/TermsLinks'

export const metadata: Metadata = {
  title: '설정',
  description: '계정 정보와 프로필을 관리하세요.',
}

export default function SettingPage() {
  return (
    <>
      <div className="h1 py-5">환경설정</div>
      <section className="gap-28 flex border-t border-b border-gray-5 py-16">
        <div className="p2 text-gray-1">내 정보</div>
        <UserInfoSection />
      </section>
      <section className="flex flex-row gap-19 py-15">
        <div className="p2 text-gray-1">서비스 정보</div>
        <TermsLinks />
      </section>
    </>
  )
}
