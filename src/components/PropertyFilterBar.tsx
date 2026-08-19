'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, type FormEvent } from 'react'
import { SlidersHorizontal, X } from 'lucide-react'
import { CITIES, PROPERTY_TYPES } from '@/lib/site'
import { Select, Input } from '@/components/ui/Field'
import { Button } from '@/components/ui/Button'

export function PropertyFilterBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [open, setOpen] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const params = new URLSearchParams()

    for (const [key, value] of formData.entries()) {
      if (value) params.set(key, String(value))
    }

    router.push(`/imoveis?${params.toString()}`)
    setOpen(false)
  }

  const hasFilters = searchParams.size > 0

  return (
    <div className="rounded-2xl border border-sky-950/10 bg-white p-4 shadow-sm sm:p-6">
      <div className="flex items-center justify-between sm:hidden">
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-2 text-sm font-semibold text-sky-950"
        >
          <SlidersHorizontal className="h-4 w-4" /> Filtros
        </button>
        {hasFilters && (
          <button
            onClick={() => router.push('/imoveis')}
            className="flex items-center gap-1 text-xs text-sky-950/50"
          >
            <X className="h-3 w-3" /> Limpar
          </button>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className={`${open ? 'mt-4 flex' : 'hidden'} flex-col gap-4 sm:mt-0 sm:flex sm:flex-row sm:flex-wrap sm:items-end`}
      >
        <div className="sm:w-52">
          <Select name="purpose" defaultValue={searchParams.get('purpose') ?? ''}>
            <option value="">Venda ou Arrendamento</option>
            <option value="venda">Venda</option>
            <option value="arrendamento">Arrendamento</option>
          </Select>
        </div>

        <div className="sm:w-44">
          <Select name="type" defaultValue={searchParams.get('type') ?? ''}>
            <option value="">Tipo de imóvel</option>
            {PROPERTY_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </Select>
        </div>

        <div className="sm:w-44">
          <Select name="city" defaultValue={searchParams.get('city') ?? ''}>
            <option value="">Localização</option>
            {CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
        </div>

        <div className="sm:w-36">
          <Select name="bedrooms" defaultValue={searchParams.get('bedrooms') ?? ''}>
            <option value="">Quartos</option>
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n}+ quartos
              </option>
            ))}
          </Select>
        </div>

        <div className="flex gap-2 sm:w-36">
          <Input
            name="minPrice"
            type="number"
            placeholder="Preço min."
            defaultValue={searchParams.get('minPrice') ?? ''}
          />
        </div>
        <div className="flex gap-2 sm:w-36">
          <Input
            name="maxPrice"
            type="number"
            placeholder="Preço máx."
            defaultValue={searchParams.get('maxPrice') ?? ''}
          />
        </div>

        <div className="flex gap-3 sm:ml-auto">
          <Button type="submit" size="md">
            Filtrar
          </Button>
          {hasFilters && (
            <Button
              type="button"
              variant="ghost"
              size="md"
              onClick={() => router.push('/imoveis')}
            >
              Limpar
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}
