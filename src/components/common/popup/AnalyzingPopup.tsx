import Image from 'next/image'
import character2 from '@/assets/image/uug-character2-img.png'
import speechBubble from '@/assets/image/speech-bubble-img.png'
import PopupShell from './PopupShell'
import Button from '@/components/common/button/Button'

export default function AnalyzingPopup({
  popupRef,
  onClose,
}: {
  popupRef: React.RefObject<HTMLDivElement | null>
  onClose: () => void
}) {
  return (
    <PopupShell
      popupRef={popupRef}
      onClose={onClose}
      className="h-140.75 flex flex-col items-center justify-center w-194.5"
    >
      <div className="relative mb-4.5">
        <Image
          src={character2}
          alt="캐릭터"
          width={158}
          height={154}
          className="object-contain"
        />
        <Image
          src={speechBubble}
          alt="말풍선"
          width={57}
          height={45}
          className="absolute -top-4 -right-6 object-contain"
        />
      </div>
      <div className="flex flex-col items-center gap-1.75 mb-12">
        <p className="h1 text-primary">채용 공고 링크를 분석 중이에요</p>
        <p className="p1 text-gray-2">
          공고에 담긴 정보를 꼼꼼히 분석 중이에요.
        </p>
      </div>
      <Button
        variant="outlined"
        className="w-70 rounded-full! py-3 bg-white hover:bg-secondary"
        onClick={onClose}
      >
        <span className="h3">중단 하기</span>
      </Button>
    </PopupShell>
  )
}
