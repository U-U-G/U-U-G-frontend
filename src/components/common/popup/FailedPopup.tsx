import Image from 'next/image'
import bangImg from '@/assets/image/bang-img.png'
import PopupShell from './PopupShell'

export default function FailedPopup({
  popupRef,
  title,
  onClose,
}: {
  popupRef: React.RefObject<HTMLDivElement | null>
  title: string
  onClose: () => void
}) {
  return (
    <PopupShell
      popupRef={popupRef}
      onClose={onClose}
      className="h-140.75 flex flex-col items-center justify-center w-194.5"
    >
      <Image
        src={bangImg}
        alt="경고"
        width={39}
        height={85}
        className="object-contain mb-10"
      />
      <p className="h1 text-primary mb-20">{title}</p>
      <button
        type="button"
        onClick={onClose}
        className="w-70 rounded-full border border-primary text-primary h3 py-3 cursor-pointer hover:bg-secondary"
      >
        링크 다시 입력하기
      </button>
    </PopupShell>
  )
}
