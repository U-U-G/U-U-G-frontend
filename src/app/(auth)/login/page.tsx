'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { loginApi } from '@/apis/auth'
import { getHttpStatus } from '@/apis/common/httpError'
import HelperText from '@/components/common/text/HelperText'
import { setAccessToken, setRefreshToken } from '@/utils/tokenStorage'
import KakaoLogoIcon from '@/assets/icon/kakao-logo.svg'
import GoogleLogoIcon from '@/assets/icon/google-logo.svg'
import NaverLogoIcon from '@/assets/icon/naver-logo.svg'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoginError, setIsLoginError] = useState(false)

  const loginMutation = useMutation({
    mutationFn: loginApi.login,

    onSuccess: (response) => {
      setAccessToken(response.accessToken)
      setRefreshToken(response.refreshToken)
      router.push('/')
    },

    onError: (error) => {
      const status = getHttpStatus(error)
      if (status !== 401 && status !== 404) {
        return
      }
      setIsLoginError(true)
    },
  })

  const handleKakaoLogin = () => {
    window.location.href = loginApi.loginWithKakao()
  }
  const handleGoogleLogin = () => {
    window.location.href = loginApi.loginWithGoogle()
  }
  const handleNaverLogin = () => {
    window.location.href = loginApi.loginWithNaver()
  }

  const handleSubmit = (
    e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>,
  ) => {
    e.preventDefault()
    loginMutation.mutate({ email, password })
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <section className="w-full max-w-[380px]">
        <div className="mb-12 flex justify-center">
          <Image
            src="/logo-primary.png"
            alt="음어그 로고"
            width={180}
            height={120}
            priority
          />
        </div>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="email" className="sr-only">
              이메일
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일"
              className="w-full border-0 border-b border-gray-4 bg-transparent px-1 pb-4 pt-2 p1 text-text-primary outline-none focus:border-text-primary placeholder:text-gray-5 transition-all duration-300 ease-in-out"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="sr-only">
              비밀번호
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호"
              className="w-full border-0 border-b border-gray-4 bg-transparent px-1 pb-4 pt-2 p1 text-text-primary outline-none focus:border-text-primary placeholder:text-gray-5 transition-all duration-300 ease-in-out"
            />
          </div>

          <div className="mb-10 min-h-[22px]">
            {isLoginError ? (
              <HelperText status="error">
                아이디 또는 비밀번호가 틀렸습니다.
              </HelperText>
            ) : (
              '\u00a0'
            )}
          </div>

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className={`mb-10 h-[56px] w-full rounded-md h4 text-white ${
              loginMutation.isPending
                ? 'cursor-not-allowed bg-gray-5 text-text-primary'
                : 'cursor-pointer bg-primary'
            }`}
          >
            로그인
          </button>
        </form>

        <div className="p4 mb-12 flex items-center justify-center gap-4 text-text-primary">
          <Link href="forgot-password" className="cursor-pointer">
            비밀번호 찾기
          </Link>
          <span className="text-foreground-primary" aria-hidden="true">
            |
          </span>
          <Link href="/sign-up" className="cursor-pointer">
            회원가입
          </Link>
        </div>

        <div className="flex items-center justify-center gap-8">
          <button
            type="button"
            onClick={handleKakaoLogin}
            className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-[#fee500] cursor-pointer"
            aria-label="카카오 로그인"
          >
            <Image src={KakaoLogoIcon} alt="" />
          </button>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex h-[68px] w-[68px] items-center justify-center rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.08)] cursor-pointer"
            aria-label="구글 로그인"
          >
            <Image src={GoogleLogoIcon} alt="" />
          </button>

          <button
            type="button"
            onClick={handleNaverLogin}
            className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-[#03c75a] cursor-pointer"
            aria-label="네이버 로그인"
          >
            <Image src={NaverLogoIcon} alt="" />
          </button>
        </div>
      </section>
    </main>
  )
}
