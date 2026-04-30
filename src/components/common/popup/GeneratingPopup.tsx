import Image from 'next/image'
import character2 from '@/assets/image/uug-character2-img.png'
import speechBubble from '@/assets/image/speech-bubble-img.png'

export default function GeneratingPopup({
  popupRef,
  onClose,
}: {
  popupRef: React.RefObject<HTMLDivElement | null>
  onClose: () => void
}) {
  return (
    <div className="fixed inset-0 bg-black/13 flex items-center justify-center z-50">
      <div
        ref={popupRef}
        className="bg-white rounded-2xl py-25 flex flex-col items-center w-194.5 shadow-[0_0_16px_0_rgba(99,99,99,0.16)]"
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
          <p className="h1 text-primary">질문을 생성 중이에요</p>
          <p className="p1 text-gray-2">
            공고에 특화된 질문을 AI가 생성하고 있습니다.
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="w-70 rounded-full border border-primary text-primary h3 py-3 cursor-pointer hover:bg-secondary"
        >
          중단 하기
        </button>
      </div>
    </div>
  )
}
