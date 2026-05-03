import Button from '@/components/common/button/Button'

interface StopConfirmPopupProps {
  onContinue: () => void
  onStop: () => void
}

export default function StopConfirmPopup({
  onContinue,
  onStop,
}: StopConfirmPopupProps) {
  return (
    <div className="fixed inset-0 bg-black/13 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-[0_0_16px_0_rgba(99,99,99,0.16)] p-10 flex flex-col gap-10 min-w-100">
        <div className="flex flex-col items-center gap-1.75">
          <h2 className="h3">연습을 중단할까요?</h2>
          <p className="p4">현재 세션은 저장되지 않습니다.</p>
        </div>
        <div className="flex gap-6 w-full">
          <Button variant="outlined" onClick={onContinue} className="flex-1 h3">
            계속하기
          </Button>
          <Button variant="primary" onClick={onStop} className="flex-1 h3">
            종료
          </Button>
        </div>
      </div>
    </div>
  )
}
