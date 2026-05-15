import Image from 'next/image'
import bangImg from '@/assets/image/bang-img.png'
import PopupShell from './PopupShell'
import Button from '@/components/common/button/Button'

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
      <Button
        variant="outlined"
        className="p4 w-70 rounded-full! py-3 bg-white hover:bg-secondary"
        onClick={onClose}
      >
        <span className="h3">링크 다시 입력하기</span>
      </Button>
    </PopupShell>
  )
}
