'use client'

import Image from 'next/image'
import KakaoLogoIcon from '@/assets/icon/kakao-logo.svg'
import GoogleLogoIcon from '@/assets/icon/google-logo.svg'
import NaverLogoIcon from '@/assets/icon/naver-logo.svg'

export default function Login() {
  const handleLogin = () => {
    console.log('홈으로 이동') //TODO: 로그인 api 연동
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <section className="w-full max-w-[380px]">
        <form className="flex flex-col" onClick={handleLogin}>
          <div className="mb-5">
            <label htmlFor="email" className="sr-only">
              이메일
            </label>
            <input
              id="email"
              type="email"
              placeholder="이메일"
              className="w-full border-0 border-b border-secondary bg-transparent px-1 pb-4 pt-2 text-lg text-text-primary outline-none focus:border-text-primary placeholder:text-secondary transition-all duration-300 ease-in-out"
            />
          </div>

          <div className="mb-16">
            <label htmlFor="password" className="sr-only">
              비밀번호
            </label>

            <input
              id="password"
              type="password"
              placeholder="비밀번호"
              autoComplete="current-password"
              className="w-full border-0 border-b border-secondary bg-transparent px-1 pb-4 pt-2 text-lg text-text-primary outline-none focus:border-text-primary placeholder:text-secondary transition-all duration-300 ease-in-out"
            />
          </div>

          <button
            type="submit"
            className="mb-10 h-[56px] w-full rounded-md bg-primary text-xl font-bold text-white cursor-pointer"
          >
            로그인
          </button>
        </form>

        <div className="font-medium mb-12 flex items-center justify-center gap-4 text-md text-text-primary">
          <button className="cursor-pointer" type="button">
            비밀번호 찾기
          </button>
          <span className="text-foreground-primary">|</span>
          <button className="cursor-pointer" type="button">
            회원가입
          </button>
        </div>

        <div className="flex items-center justify-center gap-8">
          <button
            type="button"
            className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-[#fee500] cursor-pointer"
            aria-label="카카오 로그인"
          >
            <Image src={KakaoLogoIcon} alt="카카오 로그인" />
          </button>

          <button
            type="button"
            className="flex h-[68px] w-[68px] items-center justify-center rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.08)] cursor-pointer"
            aria-label="구글 로그인"
          >
            <Image src={GoogleLogoIcon} alt="구글 로그인" />
          </button>

          <button
            type="button"
            className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-[#03c75a] cursor-pointer"
            aria-label="네이버 로그인"
          >
            <Image src={NaverLogoIcon} alt="네이버 로그인" />
          </button>
        </div>
      </section>
    </main>
  )
}
