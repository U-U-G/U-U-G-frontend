import { InputHTMLAttributes } from 'react'

interface InputBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  status?: 'default' | 'success' | 'error'
  rightElement?: React.ReactNode
}

export default function InputBox({
  status = 'default',
  rightElement,
  className,
  ...props
}: InputBoxProps) {
  const borderClass = {
    default: 'border-gray4 focus:border-text-primary',
    success: 'border-gray4 focus:border-primary',
    error: 'border-text-point-red focus:border-text-point-red',
  }[status]

  return (
    <div className="w-full">
      <div className="relative flex items-center">
        <input
          {...props}
          className={`
            w-full px-4 py-3 text-base rounded-lg border outline-none
            transition-colors duration-250 ease-in-out
            placeholder:text-gray4 disabled:cursor-not-allowed
            ${rightElement ? 'pr-12' : ''}
            ${borderClass}
            ${className ?? ''}
          `}
        />
        {rightElement && (
          <div className="absolute right-4 inset-y-0 flex items-center">
            {rightElement}
          </div>
        )}
      </div>
    </div>
  )
}
