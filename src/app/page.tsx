export default function Home() {
  const weekDays = [
    { label: '일', date: 19 },
    { label: '월', date: 20, active: true },
    { label: '화', date: 21 },
    { label: '수', date: 22 },
    { label: '목', date: 23 },
    { label: '금', date: 24 },
    { label: '토', date: 25 },
  ]

  return (
    <main className="min-h-screen p-10">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-6 text-4xl font-bold leading-tight text-[#111111]">
          아무개님, 만나서 반가워요
        </h1>

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_420px]">
          <div className="rounded-[28px] bg-[#f3f1f8] px-6 py-7 md:px-8 md:py-8">
            <div className="flex h-full flex-col justify-between gap-8">
              <div>
                <h2 className="text-[24px] font-extrabold leading-snug text-[#111111] md:text-[40px]">
                  아직 목표 기업을 설정하지 않았어요. 첫 면접 준비를 시작해
                  볼까요?
                </h2>
                <p className="mt-4 text-[18px] font-medium text-[#8e8e93] md:text-[28px]">
                  목표하는 기업의 공고 링크를 준비해주세요
                </p>
              </div>

              <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
                <button
                  type="button"
                  className="inline-flex h-[62px] items-center justify-center rounded-full bg-[#6c47ff] px-10 text-[20px] font-bold text-white shadow-[0_8px_20px_rgba(108,71,255,0.25)] transition hover:brightness-105 md:h-[74px] md:px-14 md:text-[32px]"
                >
                  지금 시작하기
                </button>

                <div className="flex w-full justify-center md:w-auto">
                  <div className="flex items-end gap-4 md:gap-6">
                    <div className="flex h-[120px] w-[100px] items-center justify-center rounded-[24px] bg-[#d9d4ff] text-sm font-medium text-[#7a70b8] md:h-[160px] md:w-[132px]">
                      이미지
                    </div>
                    <div className="flex h-[220px] w-[180px] items-center justify-center rounded-[36px] bg-[#d9d4ff] text-sm font-medium text-[#7a70b8] md:h-[320px] md:w-[260px]">
                      캐릭터 이미지
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <aside className="rounded-[28px] bg-[#f3f1f8] px-6 py-7 md:px-8 md:py-8">
            <div className="flex h-full flex-col">
              <div className="mb-8 flex items-center justify-between">
                <h3 className="text-[24px] font-extrabold text-[#111111] md:text-[34px]">
                  오늘의 스케줄
                </h3>
                <button
                  type="button"
                  className="text-[28px] font-light text-[#6c47ff] transition hover:opacity-70"
                  aria-label="다음 주 보기"
                >
                  ›
                </button>
              </div>

              <div className="mb-8 grid grid-cols-7 gap-2 text-center">
                {weekDays.map((day) => (
                  <div
                    key={`${day.label}-${day.date}`}
                    className="flex flex-col items-center gap-3"
                  >
                    <span className="text-[18px] font-medium text-[#6f6f73] md:text-[22px]">
                      {day.label}
                    </span>
                    <div
                      className={[
                        'flex h-11 w-11 items-center justify-center rounded-full text-[20px] font-extrabold md:h-14 md:w-14 md:text-[28px]',
                        day.active
                          ? 'bg-[#6c47ff] text-white'
                          : 'text-[#111111]',
                      ].join(' ')}
                    >
                      {day.date}
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="mb-5 flex h-[64px] w-full items-center rounded-[16px] border border-[#7b61ff] bg-white px-5 text-left text-[18px] font-semibold text-[#9a9aa2] md:h-[78px] md:px-6 md:text-[28px]"
              >
                일정에 맞게 오늘의 스케줄을 생성해요
              </button>

              <div className="mt-auto space-y-4">
                <div className="h-[72px] rounded-[16px] bg-[#f8f8f8]" />
                <div className="h-[72px] rounded-[16px] bg-[#f8f8f8]" />
                <div className="h-[72px] rounded-[16px] bg-[#f8f8f8]" />
              </div>
            </div>
          </aside>
        </section>

        <section className="mt-6 rounded-[28px] bg-[#f3f1f8] px-6 py-7 md:px-8 md:py-8">
          <div className="grid grid-cols-1 gap-8 xl:grid-cols-[600px_1fr]">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <h3 className="text-[24px] font-extrabold text-[#111111] md:text-[34px]">
                  면접 일정
                </h3>
                <button
                  type="button"
                  className="text-[28px] font-semibold leading-none text-[#6c47ff] transition hover:opacity-70"
                  aria-label="면접 일정 추가"
                >
                  +
                </button>
              </div>

              <div className="mb-5 flex min-h-[76px] items-center rounded-[16px] border border-[#7b61ff] bg-white px-5 md:min-h-[88px] md:px-6">
                <span className="mr-4 text-[22px] font-extrabold text-[#6c47ff] md:text-[36px]">
                  D-day
                </span>
                <span className="text-[18px] font-semibold text-[#9a9aa2] md:text-[28px]">
                  면접 일정을 등록해주세요
                </span>
              </div>

              <div className="space-y-5">
                <div className="h-[88px] rounded-[16px] bg-[#f8f8f8]" />
                <div className="h-[88px] rounded-[16px] bg-[#f8f8f8]" />
                <div className="h-[32px] rounded-[12px] bg-[#f8f8f8]" />
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-[24px] font-extrabold text-[#111111] md:text-[34px]">
                면접 커리큘럼
              </h3>

              <div className="min-h-[320px] rounded-[16px] border border-[#7b61ff] bg-white px-6 py-6 md:min-h-[360px] md:px-8 md:py-8">
                <div className="flex items-start gap-3">
                  <span className="mt-2 inline-block h-2.5 w-2.5 rounded-full bg-[#8b74ff]" />
                  <p className="text-[18px] font-semibold leading-relaxed text-[#9a9aa2] md:text-[28px]">
                    일정을 등록하면 나만을 위한 맞춤 커리큘럼을 생성해요
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
