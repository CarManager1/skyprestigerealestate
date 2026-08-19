import type { Metadata } from 'next'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { PropertyFilterBar } from '@/components/PropertyFilterBar'
import { PropertyCard } from '@/components/PropertyCard'
import { getPublishedProperties } from '@/lib/queries'
import type { PropertyFilters, PropertyPurpose, PropertyType } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Imóveis',
  description: 'Explore o portefólio de imóveis de prestígio disponíveis para venda e arrendamento.',
}

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const params = await searchParams

  const first = (value: string | string[] | undefined) =>
    Array.isArray(value) ? value[0] : value

  const filters: PropertyFilters = {
    q: first(params.q),
    purpose: first(params.purpose) as PropertyPurpose | undefined,
    type: first(params.type) as PropertyType | undefined,
    city: first(params.city),
    bedrooms: first(params.bedrooms) ? Number(first(params.bedrooms)) : undefined,
    minPrice: first(params.minPrice) ? Number(first(params.minPrice)) : undefined,
    maxPrice: first(params.maxPrice) ? Number(first(params.maxPrice)) : undefined,
  }

  const properties = await getPublishedProperties(filters)

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />

      <section className="bg-sky-950 pt-32 pb-16">
        <div className="mx-auto max-w-7xl px-6">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
            Portefólio
          </span>
          <h1 className="mt-3 font-display text-4xl text-white sm:text-5xl">
            Encontre o seu próximo imóvel
          </h1>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-12">
        <PropertyFilterBar />

        <p className="mt-8 text-sm text-sky-950/50">
          {properties.length}{' '}
          {properties.length === 1 ? 'imóvel encontrado' : 'imóveis encontrados'}
        </p>

        {properties.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((property, i) => (
              <PropertyCard key={property.id} property={property} seed={i} />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-dashed border-sky-950/15 p-16 text-center">
            <p className="text-sky-950/50">
              Não encontrámos imóveis com estes critérios. Tente ajustar os filtros.
            </p>
          </div>
        )}
      </section>

      <Footer />
    </div>
  )
}
