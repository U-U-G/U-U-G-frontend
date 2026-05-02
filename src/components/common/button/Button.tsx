import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outlined'
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
    outlined: 'bg-secondary text-primary border border-primary',
  }[variant]

  return (
    <button
      type="button"
      {...props}
      className={`
        p4 rounded-lg whitespace-nowrap min-w-22.25 px-4 py-3.5 cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantStyle}
        ${className ?? ''}
      `}
    >
      {children}
    </button>
  )
}
