import { notFound } from 'next/navigation'
import { PropertyForm } from '@/components/dashboard/PropertyForm'
import { updateProperty } from '@/app/actions/properties'
import { getDashboardProperty } from '@/lib/queries'

export default async function EditPropertyPage(props: PageProps<'/dashboard/imoveis/[id]'>) {
  const { id } = await props.params
  const property = await getDashboardProperty(id)

  if (!property) notFound()

  const boundAction = updateProperty.bind(null, property.id)

  return (
    <div className="flex max-w-3xl flex-col gap-8">
      <div>
        <h1 className="font-display text-3xl text-sky-950">Editar Anúncio</h1>
        <p className="mt-1 text-sm text-sky-950/50">{property.title}</p>
      </div>

      <PropertyForm property={property} action={boundAction} />
    </div>
  )
}
