import { Plus } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import { PropertyCover } from '@/components/PropertyCover'
import { PropertyRowActions } from '@/components/dashboard/PropertyRowActions'
import { PROPERTY_TYPE_LABEL } from '@/lib/site'
import { formatPrice } from '@/lib/format'
import { getDashboardProperties } from '@/lib/queries'

export default async function DashboardPropertiesPage() {
  const properties = await getDashboardProperties()

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-3xl text-sky-950">Imóveis</h1>
          <p className="mt-1 text-sm text-sky-950/50">
            Gira os anúncios publicados no site — {properties.length} no total.
          </p>
        </div>
        <ButtonLink href="/dashboard/imoveis/novo">
          <Plus className="h-4 w-4" /> Novo Anúncio
        </ButtonLink>
      </div>

      {properties.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-sky-950/15 p-16 text-center">
          <p className="text-sky-950/50">Ainda não criou nenhum imóvel.</p>
          <ButtonLink href="/dashboard/imoveis/novo" className="mt-6 inline-flex">
            <Plus className="h-4 w-4" /> Criar o primeiro anúncio
          </ButtonLink>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-sky-950/10 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="border-b border-sky-950/10 bg-sky-950/[0.02] text-xs uppercase tracking-wide text-sky-950/40">
                <tr>
                  <th className="px-5 py-3 font-medium">Imóvel</th>
                  <th className="px-5 py-3 font-medium">Tipo</th>
                  <th className="px-5 py-3 font-medium">Cidade</th>
                  <th className="px-5 py-3 font-medium">Preço</th>
                  <th className="px-5 py-3 font-medium">Estado</th>
                  <th className="px-5 py-3 font-medium text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sky-950/5">
                {properties.map((property, i) => (
                  <tr key={property.id}>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <PropertyCover
                          url={property.property_images?.[0]?.url}
                          alt={property.title}
                          seed={i}
                          className="h-12 w-16 shrink-0 rounded-lg"
                        />
                        <div className="min-w-0">
                          <p className="truncate font-medium text-sky-950">{property.title}</p>
                          <p className="text-xs text-sky-950/40">
                            {property.published ? 'Publicado' : 'Rascunho'}
                            {property.featured ? ' · Destaque' : ''}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-sky-950/70">{PROPERTY_TYPE_LABEL[property.type]}</td>
                    <td className="px-5 py-3 text-sky-950/70">{property.city}</td>
                    <td className="px-5 py-3 font-medium text-sky-950">
                      {formatPrice(property.price, property.purpose)}
                    </td>
                    <td className="px-5 py-3">
                      <span className="rounded-full bg-sky-950/5 px-2.5 py-1 text-xs font-semibold capitalize text-sky-950/60">
                        {property.state}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <PropertyRowActions property={property} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
