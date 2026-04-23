export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center flex-1"
    >
      <figure role="presentation" className="relative size-16 m-0">
        <span className="absolute w-full h-full border-2 border-t-primary rounded-full animate-spin" />
      </figure>
      <h2 className="mt-4 text-lg font-medium text-text-primary">로딩 중...</h2>
      <p className="text-sm text-secondary">잠시만 기다려주세요</p>
    </div>
  )
}
