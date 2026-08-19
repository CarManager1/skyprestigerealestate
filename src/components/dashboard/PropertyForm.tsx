'use client'

import { useActionState } from 'react'
import { Loader2 } from 'lucide-react'
import { Input, Textarea, Select, Label } from '@/components/ui/Field'
import { Button } from '@/components/ui/Button'
import { ImageUploader } from '@/components/dashboard/ImageUploader'
import { PROPERTY_TYPES, CITIES } from '@/lib/site'
import type { Property } from '@/lib/types'
import type { PropertyFormState } from '@/app/actions/properties'

const initialState: PropertyFormState = { status: 'idle' }

export function PropertyForm({
  property,
  action,
}: {
  property?: Property
  action: (prevState: PropertyFormState, formData: FormData) => Promise<PropertyFormState>
}) {
  const [state, formAction, pending] = useActionState(action, initialState)

  return (
    <form action={formAction} className="flex flex-col gap-8">
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Label htmlFor="title">Título do anúncio</Label>
          <Input
            id="title"
            name="title"
            required
            defaultValue={property?.title}
            placeholder="Ex: Apartamento T3 com vista rio, Chiado"
          />
        </div>

        <div>
          <Label htmlFor="purpose">Finalidade</Label>
          <Select id="purpose" name="purpose" defaultValue={property?.purpose ?? 'venda'}>
            <option value="venda">Venda</option>
            <option value="arrendamento">Arrendamento</option>
          </Select>
        </div>

        <div>
          <Label htmlFor="type">Tipologia</Label>
          <Select id="type" name="type" defaultValue={property?.type ?? 'apartamento'}>
            {PROPERTY_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <Label htmlFor="price">Preço (€)</Label>
          <Input
            id="price"
            name="price"
            type="number"
            min={0}
            required
            defaultValue={property?.price}
          />
        </div>

        <div>
          <Label htmlFor="state">Estado</Label>
          <Select id="state" name="state" defaultValue={property?.state ?? 'disponivel'}>
            <option value="disponivel">Disponível</option>
            <option value="reservado">Reservado</option>
            <option value="vendido">Vendido / Arrendado</option>
          </Select>
        </div>

        <div>
          <Label htmlFor="city">Cidade</Label>
          <Input id="city" name="city" list="cities" required defaultValue={property?.city} />
          <datalist id="cities">
            {CITIES.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
        </div>

        <div>
          <Label htmlFor="district">Zona / Freguesia</Label>
          <Input id="district" name="district" defaultValue={property?.district ?? ''} />
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="address">Morada (opcional, não é publicada)</Label>
          <Input id="address" name="address" defaultValue={property?.address ?? ''} />
        </div>

        <div>
          <Label htmlFor="bedrooms">Quartos</Label>
          <Input id="bedrooms" name="bedrooms" type="number" min={0} defaultValue={property?.bedrooms ?? ''} />
        </div>
        <div>
          <Label htmlFor="bathrooms">Casas de banho</Label>
          <Input id="bathrooms" name="bathrooms" type="number" min={0} defaultValue={property?.bathrooms ?? ''} />
        </div>
        <div>
          <Label htmlFor="area_m2">Área (m²)</Label>
          <Input id="area_m2" name="area_m2" type="number" min={0} defaultValue={property?.area_m2 ?? ''} />
        </div>
      </section>

      <section>
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          name="description"
          rows={6}
          defaultValue={property?.description ?? ''}
          placeholder="Descreva o imóvel: acabamentos, envolvente, potencial..."
        />
      </section>

      <section>
        <Label>Fotografias</Label>
        <ImageUploader initialUrls={property?.property_images?.map((i) => i.url) ?? []} />
      </section>

      <section className="flex flex-wrap gap-6 rounded-2xl bg-sky-950/[0.03] p-5">
        <label className="flex items-center gap-2 text-sm font-medium text-sky-950">
          <input
            type="checkbox"
            name="published"
            defaultChecked={property?.published ?? true}
            className="h-4 w-4 rounded border-sky-950/30 accent-gold-500"
          />
          Publicado no site
        </label>
        <label className="flex items-center gap-2 text-sm font-medium text-sky-950">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={property?.featured ?? false}
            className="h-4 w-4 rounded border-sky-950/30 accent-gold-500"
          />
          Destacar na página inicial
        </label>
      </section>

      {state.status === 'error' && (
        <p className="text-sm font-medium text-red-600">{state.message}</p>
      )}

      <div className="flex justify-end gap-3">
        <Button type="submit" disabled={pending} size="lg">
          {pending && <Loader2 className="h-4 w-4 animate-spin" />}
          {pending ? 'A guardar…' : property ? 'Guardar alterações' : 'Criar anúncio'}
        </Button>
      </div>
    </form>
  )
}
