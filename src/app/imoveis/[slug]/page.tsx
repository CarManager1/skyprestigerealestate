import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BedDouble, Bath, Ruler, MapPin, CalendarCheck } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { PropertyGallery } from '@/components/PropertyGallery'
import { PropertyCard } from '@/components/PropertyCard'
import { LeadForm } from '@/components/LeadForm'
import { BRAND, PROPERTY_TYPE_LABEL } from '@/lib/site'
import { formatArea, formatPrice } from '@/lib/format'
import { getPropertyBySlug, getSimilarProperties } from '@/lib/queries'

export async function generateMetadata(props: PageProps<'/imoveis/[slug]'>): Promise<Metadata> {
  const { slug } = await props.params
  const property = await getPropertyBySlug(slug)
  if (!property) return { title: 'Imóvel não encontrado' }

  return {
    title: property.title,
    description: property.description?.slice(0, 160),
  }
}

export default async function PropertyDetailPage(props: PageProps<'/imoveis/[slug]'>) {
  const { slug } = await props.params
  const property = await getPropertyBySlug(slug)

  if (!property) notFound()

  const similar = await getSimilarProperties(property)

  const specs = [
    property.bedrooms != null && { icon: BedDouble, label: `${property.bedrooms} quartos` },
    property.bathrooms != null && { icon: Bath, label: `${property.bathrooms} casas de banho` },
    property.area_m2 != null && { icon: Ruler, label: formatArea(property.area_m2) },
  ].filter(Boolean) as { icon: typeof BedDouble; label: string }[]

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />

      <div className="mx-auto w-full max-w-7xl px-6 pt-28 pb-24">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-gold-600">
            <MapPin className="h-4 w-4" />
            {property.city}
            {property.district ? ` · ${property.district}` : ''}
          </div>
          <h1 className="font-display text-3xl text-sky-950 sm:text-4xl">{property.title}</h1>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <PropertyGallery images={property.property_images ?? []} title={property.title} />

            <div className="mt-10 flex flex-wrap items-center gap-6 border-y border-sky-950/10 py-6">
              {specs.map((spec) => (
                <div key={spec.label} className="flex items-center gap-2 text-sky-950/70">
                  <spec.icon className="h-5 w-5 text-gold-500" />
                  <span className="text-sm font-medium">{spec.label}</span>
                </div>
              ))}
              <div className="flex items-center gap-2 text-sky-950/70">
                <CalendarCheck className="h-5 w-5 text-gold-500" />
                <span className="text-sm font-medium">
                  {PROPERTY_TYPE_LABEL[property.type]} para{' '}
                  {property.purpose === 'venda' ? 'venda' : 'arrendamento'}
                </span>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="font-display text-2xl text-sky-950">Descrição</h2>
              <p className="mt-4 whitespace-pre-line text-base leading-relaxed text-sky-950/70">
                {property.description || 'Sem descrição disponível.'}
              </p>
            </div>
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-28 flex flex-col gap-6 rounded-3xl border border-sky-950/10 p-6 shadow-xl shadow-sky-950/5">
              <div>
                <p className="font-display text-3xl text-sky-950">
                  {formatPrice(property.price, property.purpose)}
                </p>
                {property.state !== 'disponivel' && (
                  <span className="mt-2 inline-block rounded-full bg-sky-950/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-950/60">
                    {property.state === 'reservado' ? 'Reservado' : 'Vendido'}
                  </span>
                )}
              </div>

              <div className="h-px bg-sky-950/10" />

              <div>
                <p className="text-sm font-semibold text-sky-950">Interessado neste imóvel?</p>
                <p className="mt-1 text-xs text-sky-950/50">
                  Fale com um dos nossos consultores ou envie os seus dados.
                </p>
              </div>

              <LeadForm propertyId={property.id} propertyTitle={property.title} />

              <p className="text-center text-xs text-sky-950/40">
                ou ligue para{' '}
                <a href={`tel:${BRAND.phoneHref}`} className="font-semibold text-sky-950">
                  {BRAND.phone}
                </a>
              </p>
            </div>
          </aside>
        </div>

        {similar.length > 0 && (
          <div className="mt-24">
            <h2 className="font-display text-2xl text-sky-950">Imóveis semelhantes</h2>
            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((item, i) => (
                <PropertyCard key={item.id} property={item} seed={i} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
