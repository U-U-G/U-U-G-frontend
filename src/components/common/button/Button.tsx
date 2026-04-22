import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
}

export default function Button({
  children,
  variant = 'primary',
  className,
  ...props
}: ButtonProps) {
  const variantStyle = {
    primary: 'bg-primary text-white',
    secondary: 'bg-gray-5',
  }[variant]

  return (
    <button
      type="button"
      {...props}
      className={`
        text-base rounded-lg font-medium whitespace-nowrap min-w-22.25 px-4 py-3 cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantStyle}
        ${className ?? ''}
      `}
    >
      {children}
    </button>
  )
}
