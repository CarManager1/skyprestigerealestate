import Link from 'next/link'
import { BedDouble, Bath, Ruler, MapPin } from 'lucide-react'
import type { Property } from '@/lib/types'
import { formatArea, formatPrice } from '@/lib/format'
import { PROPERTY_TYPE_LABEL } from '@/lib/site'
import { PropertyCover } from './PropertyCover'

export function PropertyCard({ property, seed = 0 }: { property: Property; seed?: number }) {
  const cover = property.property_images?.[0]?.url

  return (
    <Link
      href={`/imoveis/${property.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-sky-950/10 bg-white transition-shadow duration-300 hover:shadow-xl hover:shadow-sky-950/10"
    >
      <div className="relative">
        <PropertyCover url={cover} alt={property.title} seed={seed} className="aspect-[4/3] w-full" />
        <div className="absolute left-4 top-4 flex gap-2">
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-950 backdrop-blur">
            {property.purpose === 'venda' ? 'Venda' : 'Arrendamento'}
          </span>
        </div>
        {property.state !== 'disponivel' && (
          <div className="absolute right-4 top-4">
            <span className="rounded-full bg-sky-950/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur">
              {property.state === 'reservado' ? 'Reservado' : 'Vendido'}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-gold-600">
          <MapPin className="h-3.5 w-3.5" />
          {property.city}
          {property.district ? ` · ${property.district}` : ''}
        </div>

        <h3 className="font-display text-xl leading-snug text-sky-950 line-clamp-2">
          {property.title}
        </h3>

        <p className="text-xs font-medium uppercase tracking-wide text-sky-950/40">
          {PROPERTY_TYPE_LABEL[property.type]}
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-sky-950/10 pt-4">
          <span className="font-display text-lg text-sky-950">
            {formatPrice(property.price, property.purpose)}
          </span>
          <div className="flex items-center gap-3 text-sky-950/50">
            {property.bedrooms != null && (
              <span className="flex items-center gap-1 text-xs">
                <BedDouble className="h-4 w-4" /> {property.bedrooms}
              </span>
            )}
            {property.bathrooms != null && (
              <span className="flex items-center gap-1 text-xs">
                <Bath className="h-4 w-4" /> {property.bathrooms}
              </span>
            )}
            {property.area_m2 != null && (
              <span className="flex items-center gap-1 text-xs">
                <Ruler className="h-4 w-4" /> {formatArea(property.area_m2)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
