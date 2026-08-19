import Image from 'next/image'
import { Building2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const GRADIENTS = [
  'from-sky-950 via-sky-800 to-sky-950',
  'from-sky-900 via-sky-700 to-gold-900',
  'from-sky-950 via-sky-900 to-sky-800',
]

export function PropertyCover({
  url,
  alt,
  seed = 0,
  className,
  sizes,
  priority,
}: {
  url?: string | null
  alt: string
  seed?: number
  className?: string
  sizes?: string
  priority?: boolean
}) {
  if (url) {
    return (
      <div className={cn('relative overflow-hidden', className)}>
        <Image
          src={url}
          alt={alt}
          fill
          sizes={sizes ?? '(min-width: 1024px) 33vw, 100vw'}
          priority={priority}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
    )
  }

  const gradient = GRADIENTS[seed % GRADIENTS.length]

  return (
    <div
      className={cn(
        'relative flex items-center justify-center overflow-hidden bg-gradient-to-br',
        gradient,
        className
      )}
    >
      <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:28px_28px]" />
      <Building2 className="relative h-10 w-10 text-white/40" strokeWidth={1.25} />
    </div>
  )
}
