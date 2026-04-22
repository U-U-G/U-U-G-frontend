import CheckIcon from '@/assets/icon/check-icon.svg'
import ErrorIcon from '@/assets/icon/error-icon.svg'
import Image from 'next/image'

interface HelperTextProps {
  children: React.ReactNode
  status?: 'default' | 'success' | 'error' | 'empty'
  id?: string
  visible?: boolean
  showDash?: boolean
}

export default function HelperText({
  children,
  status = 'default',
  id,
  visible = true,
  showDash = false,
}: HelperTextProps) {
  if (!visible) return null

  const colorClass = {
    default: 'text-gray-4',
    success: 'text-primary',
    error: 'text-text-point-red',
    empty: 'text-transparent',
  }[status]

  const icon = {
    default: null,
    success: (
      <Image
        src={CheckIcon}
        alt="check"
        width={21}
        height={21}
        className="-mr-1"
      />
    ),
    error: (
      <Image
        src={ErrorIcon}
        alt="error"
        width={14}
        height={14}
        className="ml-1"
      />
    ),
    empty: <span className="w-5.25 h-5.25" />,
  }[status]

  return (
    <span id={id} className={`flex items-center gap-1 text-sm ${colorClass}`}>
      {icon}
      {showDash && status === 'default' && <span>-</span>}
      {children}
    </span>
  )
}
