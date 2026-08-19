import { PropertyForm } from '@/components/dashboard/PropertyForm'
import { createProperty } from '@/app/actions/properties'

export default function NewPropertyPage() {
  return (
    <div className="flex max-w-3xl flex-col gap-8">
      <div>
        <h1 className="font-display text-3xl text-sky-950">Novo Anúncio</h1>
        <p className="mt-1 text-sm text-sky-950/50">
          Preencha os dados do imóvel para publicar no site.
        </p>
      </div>

      <PropertyForm action={createProperty} />
    </div>
  )
}
