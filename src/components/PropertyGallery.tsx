'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { PropertyImage } from '@/lib/types'
import { PropertyCover } from './PropertyCover'

export function PropertyGallery({
  images,
  title,
}: {
  images: PropertyImage[]
  title: string
}) {
  const [active, setActive] = useState(0)

  if (images.length === 0) {
    return <PropertyCover alt={title} className="aspect-[16/10] w-full rounded-3xl" />
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl bg-sky-950/5">
        <Image
          src={images[active].url}
          alt={`${title} — foto ${active + 1}`}
          fill
          sizes="(min-width: 1024px) 66vw, 100vw"
          priority
          className="object-cover"
        />
      </div>

      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {images.map((image, i) => (
            <button
              key={image.id}
              onClick={() => setActive(i)}
              className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-xl border-2 transition-colors ${
                active === i ? 'border-gold-500' : 'border-transparent'
              }`}
            >
              <Image
                src={image.url}
                alt={`${title} — miniatura ${i + 1}`}
                fill
                sizes="112px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
