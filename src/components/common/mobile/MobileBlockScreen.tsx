import CopyLinkButton from './CopyLinkButton'

export default function MobileBlockScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white xl:hidden">
      <p className="text-center h3 text-primary leading-relaxed">
        아직은 PC용 서비스만
        <br />
        준비되어있어요!
      </p>
      <p className="mt-5.75 text-center p4 leading-relaxed">
        링크 복사 후 PC에서 접속하시면
        <br />
        원활한 서비스를 이용하실 수 있습니다
      </p>
      <CopyLinkButton />
    </div>
  )
}
