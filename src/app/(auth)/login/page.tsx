"use client"

export default function Login() {

  const handleLogin = ()=>{
    console.log("로그인 페이지로 이동") //TODO: 로그인 api 연동
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <section className="w-full max-w-[380px]">

        <form className="flex flex-col" onClick = {handleLogin}>

          <div className="mb-5">
            <input
              type="email"
              placeholder="이메일"
              className="w-full border-0 border-b border-foreground-primary bg-transparent px-1 pb-4 pt-2 text-[16px] text-foreground-primary outline-none placeholder:text-secondary"
            />
          </div>

          <div className="mb-16">
            <input
              type="password"
              placeholder="비밀번호"
              className="w-full border-0 border-b border-foreground-primary bg-transparent px-1 pb-4 pt-2 text-[16px] text-foreground-primary outline-none placeholder:text-secondary"
            />
          </div>

          <button
            type="submit"
            className="mb-10 h-[56px] w-full rounded-md bg-primary text-[20px] font-bold text-white cursor-pointer"
          >
            로그인
          </button>
        </form>

          <div className="font-medium mb-12 flex items-center justify-center gap-4 text-[16px] text-black">
            <button className = "cursor-pointer" type="button">비밀번호 찾기</button>
            <span className="text-foreground-primary">|</span>
            <button className = "cursor-pointer" type="button">회원가입</button>
          </div>

          <div className="flex items-center justify-center gap-8">
            <button
              type="button"
              className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-[#fee500] cursor-pointer"
              aria-label="카카오 로그인"
            >
              <img src="/kakao-logo.svg" alt="카카오 로그인" />
            </button>

            <button
              type="button"
              className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.08)] cursor-pointer"
              aria-label="구글 로그인"
            >
              <img src="/google-logo.svg" alt="구글 로그인" />
            </button>

            <button
              type="button"
              className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-[#03c75a] cursor-pointer"
              aria-label="네이버 로그인"
            >
              <img src="/naver-logo.svg" alt="네이버 로그인" />
            </button>
          </div>
      </section>
    </main>
  );
}