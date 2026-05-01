import Image from 'next/image'
import Header from '@/components/common/header/Header'
import InputBox from '@/components/common/input/InputBox'
import defaultProfileIcon from '@/assets/icon/default-profile-icon.svg'

interface SettingPageProps {
  name?: string
  nickname?: string
  profileImage?: string
  joinedAt?: string
}

export default function SettingPage({
  name = '아무개',
  nickname = '아무개',
  profileImage,
  joinedAt = '0000년 00월 00일',
}: SettingPageProps) {
  return (
    <main className="h-screen flex flex-col overflow-hidden">
      <Header />
      <div className="px-[clamp(1rem,5vw,5rem)]">
        <div className="h1 py-5">환경설정</div>
        <section className="gap-28 flex border-t border-b border-gray-5 py-16">
          <div className="p2 text-gray-1">내 정보 </div>
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-6">
              <Image
                src={profileImage ?? defaultProfileIcon}
                alt="프로필 사진"
                width={64}
                height={64}
                className="h-16 w-16 rounded-full object-cover shrink-0"
              />
              <div className="flex flex-col justify-center gap-1">
                <span className="h3 text-text-primary">{name}</span>
                <span className="p4 text-gray-4">{joinedAt}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8  max-w-4xl">
              <div className="flex flex-col gap-2">
                <label className="p4 text-gray-2">이메일</label>
                <InputBox
                  className="border-gray-5 text-gray-4"
                  disabled
                  defaultValue={name}
                />
              </div>
              <div />
              <div className="flex flex-col gap-2">
                <label className="p4 text-gray-2">닉네임</label>
                <div className="flex flex-row gap-3">
                  <InputBox
                    className="border-gray-5 text-gray-4"
                    disabled
                    defaultValue={nickname}
                  />
                  <button
                    type="button"
                    className="p4 shrink-0 bg-primary text-white px-7 rounded-lg cursor-pointer"
                  >
                    변경
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="p4 text-gray-2">비밀번호</label>
                <div className="flex flex-row gap-3">
                  <InputBox
                    className="border-gray-5 text-gray-4"
                    disabled
                    defaultValue="********"
                  />
                  <button
                    type="button"
                    className="p4 shrink-0 bg-primary text-white p4 px-6 rounded-lg cursor-pointer"
                  >
                    재설정
                  </button>
                </div>
              </div>
            </div>
            <div className="flex gap-4 pt-14 p4 text-gray-1">
              <a href="#" className="underline">
                로그아웃
              </a>
              <a href="#" className="underline">
                회원탈퇴
              </a>
            </div>
          </div>
        </section>
        <section className="flex flex-row gap-19 py-15">
          <div className="p2 text-gray-1">서비스 정보</div>
          <div className="flex flex-row gap-5 p4 text-gray-3">
            <a href="#">이용약관</a>
            <a href="#">개인정보처리방침</a>
          </div>
        </section>
      </div>
    </main>
  )
}
