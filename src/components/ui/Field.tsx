import { cn } from '@/lib/utils'
import type { ComponentProps, ReactNode } from 'react'

const fieldClass =
  'w-full rounded-xl border border-sky-950/15 bg-white px-4 py-3 text-sm text-sky-950 placeholder:text-sky-950/40 outline-none transition-colors focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20'

export function Input({ className, ...props }: ComponentProps<'input'>) {
  return <input className={cn(fieldClass, className)} {...props} />
}

export function Textarea({ className, ...props }: ComponentProps<'textarea'>) {
  return <textarea className={cn(fieldClass, 'min-h-32 resize-y', className)} {...props} />
}

export function Select({ className, ...props }: ComponentProps<'select'>) {
  return <select className={cn(fieldClass, 'appearance-none bg-white', className)} {...props} />
}

export function Label({
  children,
  className,
  ...props
}: ComponentProps<'label'> & { children: ReactNode }) {
  return (
    <label
      className={cn('mb-1.5 block text-xs font-semibold uppercase tracking-wide text-sky-950/60', className)}
      {...props}
    >
      {children}
    </label>
  )
}
