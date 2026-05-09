import UserInfoSection from '@/components/setting/UserInfoSection'

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
        <div className="flex flex-row gap-5 p4 text-gray-3">
          <a href="#">이용약관</a>
          <a href="#">개인정보처리방침</a>
        </div>
      </section>
    </>
  )
}
