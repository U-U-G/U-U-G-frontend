'use client'

import Button from '@/components/common/button/Button'
import { useModal } from '@/hooks/useModal'

interface SignoutConfirmPopupProps {
  onCancel: () => void
  onConfirm: () => void
}

export default function SignoutConfirmPopup({
  onCancel,
  onConfirm,
}: SignoutConfirmPopupProps) {
  const { ref } = useModal(true, onCancel)

  return (
    <div className="fixed inset-0 bg-black/13 flex items-center justify-center z-50">
      <div
        ref={ref}
        className="bg-white rounded-2xl shadow-[0_0_16px_0_rgba(99,99,99,0.16)] px-10 pt-10 pb-8 flex flex-col gap-8 min-w-100"
      >
        <div className="flex flex-col items-center gap-4">
          <h2 className="h3">회원 탈퇴</h2>
          <p className="p4 text-center">
            탈퇴 시 계정 정보 및 지금까지의
            <br />
            모의면접 분석 결과와 랭킹 정보가 모두 삭제되어
            <br />
            복구가 불가합니다. 정말 탈퇴하시겠습니까?
          </p>
        </div>
        <div className="flex gap-4 w-full">
          <Button variant="primary" onClick={onCancel} className="flex-1 h3">
            취소하기
          </Button>
          <Button variant="outlined" onClick={onConfirm} className="flex-1 h3">
            탈퇴하기
          </Button>
        </div>
      </div>
    </div>
  )
}
