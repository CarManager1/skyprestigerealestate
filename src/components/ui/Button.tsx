import { cn } from '@/lib/utils'
import Link from 'next/link'
import type { ComponentProps } from 'react'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none'

const variants = {
  primary: 'bg-gold-500 text-sky-950 hover:bg-gold-400',
  dark: 'bg-sky-950 text-white hover:bg-sky-900',
  outline: 'border border-sky-950/20 text-sky-950 hover:border-sky-950 bg-white',
  ghost: 'text-sky-950 hover:bg-sky-950/5',
  outlineLight: 'border border-white/30 text-white hover:bg-white/10',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

type CommonProps = {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  className?: string
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: CommonProps & ComponentProps<'button'>) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props} />
  )
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className,
  href,
  ...props
}: CommonProps & ComponentProps<typeof Link>) {
  return (
    <Link href={href} className={cn(base, variants[variant], sizes[size], className)} {...props} />
  )
}
