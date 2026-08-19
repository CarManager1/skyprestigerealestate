import { cn } from '@/lib/utils'

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = 'left',
  light = false,
  className,
}: {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  light?: boolean
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' && 'items-center text-center',
        className
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            'text-xs font-semibold uppercase tracking-[0.2em]',
            light ? 'text-gold-400' : 'text-gold-600'
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          'font-display text-3xl leading-tight sm:text-4xl',
          light ? 'text-white' : 'text-sky-950'
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'max-w-2xl text-balance text-base leading-relaxed',
            light ? 'text-white/70' : 'text-sky-950/60'
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
