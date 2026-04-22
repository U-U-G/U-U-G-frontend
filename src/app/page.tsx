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
        <h1 className="mb-6 text-4xl font-bold leading-tight text-text-primary">
          아무개님, 만나서 반가워요
        </h1>
        <section className="grid grid-cols-1 xl:grid-cols-[1fr_480px]">
          <div className="max-w-[900px] h-[450px] rounded-2xl bg-secondary p-6 mr-7 mb-7">
            <div className="flex h-full flex-col justify-between">
              <div className="">
                <h2 className="text-2xl font-bold text-text-primary mb-3">
                  아직 목표 기업을 설정하지 않았어요. 첫 면접 준비를 시작해
                  볼까요?
                </h2>
                <p className="text-lg font-medium text-gray-3">
                  목표하는 기업의 공고 링크를 준비해주세요
                </p>
              </div>

              <div className="flex flex-col items-start justify-between gap-8">
                <button
                  type="button"
                  className="h-14 w-63 items-center justify-center rounded-full bg-primary px-12 text-xl font-bold text-white"
                >
                  지금 시작하기
                </button>
              </div>
            </div>
          </div>

          <div className="h-[450px] rounded-2xl bg-secondary overflow-hidden">
            <div className="flex h-full flex-col gap-6 px-6 p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-text-primary">
                  오늘의 스케줄
                </h3>
              </div>

              <div className="flex gap-4 text-center">
                {weekDays.map((day) => (
                  <div
                    key={`${day.label}-${day.date}`}
                    className="flex flex-1 flex-col items-center gap-1.5"
                  >
                    <span className="text-lg font-medium text-[#6f6f73]">
                      {day.label}
                    </span>
                    <div
                      className={[
                        'flex h-10 w-10 items-center justify-center rounded-full text-xl font-bold',
                        day.active
                          ? 'bg-primary text-white'
                          : 'text-text-primary',
                      ].join(' ')}
                    >
                      {day.date}
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  className="text-3xl font-light leading-none text-primary transition"
                  aria-label="다음 주 보기"
                >
                  ›
                </button>
              </div>

              <div className="mt-auto space-y-3.5">
                <div className="w-full rounded-lg border border-primary bg-white px-5 py-4 text-left text-lg font-medium text-gray-3">
                  일정에 맞게 오늘의 스케줄을 생성해요
                </div>

                <div className="h-14 rounded-lg bg-white" />
                <div className="h-14 rounded-lg bg-white" />

                <div className="h-9 rounded-t-lg bg-white" />
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-2xl bg-secondary px-6 py-7 overflow-y-scroll">
          <div className="flex h-full gap-8">
            <div className="flex-1">
              <div className="mb-5 flex items-center gap-2">
                <h3 className="text-lg font-bold text-text-primary">
                  면접 일정
                </h3>
                <button
                  type="button"
                  className="text-primary"
                  aria-label="면접 일정 추가"
                >
                  +
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex h-16 items-center rounded-lg border border-primary bg-white px-5 py-4">
                  <span className="mr-4 text-xl font-bold text-primary">
                    D-day
                  </span>
                  <span className="text-lg font-medium text-gray-3">
                    면접 일정을 등록해주세요
                  </span>
                </div>
                <div className="h-14 rounded-lg bg-white" />
                <div className="h-14 rounded-lg bg-white" />
                <div className="h-10 rounded-t-lg bg-white" />
              </div>
            </div>

            <div className="flex flex-[1.2] flex-col">
              <h3 className="mb-5 text-lg font-bold text-text-primary">
                면접 커리큘럼
              </h3>

              <div className="flex-1 rounded-lg border border-primary bg-white px-6.5 py-6.5">
                <div className="flex items-start gap-4">
                  <span className="mt-2 inline-block h-2.5 w-2.5 rounded-full bg-[#977AFF]" />
                  <span className="text-lg font-medium text-gray-3">
                    일정을 등록하면 나만을 위한 맞춤 커리큘럼을 생성해요
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
