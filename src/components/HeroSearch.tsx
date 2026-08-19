'use client'

import { useRouter } from 'next/navigation'
import { useState, type FormEvent } from 'react'
import { Search } from 'lucide-react'
import { CITIES, PROPERTY_TYPES } from '@/lib/site'
import { Select } from '@/components/ui/Field'

export function HeroSearch() {
  const router = useRouter()
  const [purpose, setPurpose] = useState('venda')
  const [type, setType] = useState('')
  const [city, setCity] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams()
    params.set('purpose', purpose)
    if (type) params.set('type', type)
    if (city) params.set('city', city)
    router.push(`/imoveis?${params.toString()}`)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-3 rounded-2xl bg-white/95 p-3 shadow-2xl shadow-sky-950/30 backdrop-blur sm:flex-row sm:items-center sm:rounded-full sm:p-2 sm:pl-6"
    >
      <div className="flex shrink-0 gap-1 rounded-full bg-sky-950/5 p-1 text-sm font-semibold">
        {(['venda', 'arrendamento'] as const).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setPurpose(option)}
            className={`rounded-full px-4 py-2 capitalize transition-colors ${
              purpose === option ? 'bg-sky-950 text-white' : 'text-sky-950/60'
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="hidden h-8 w-px bg-sky-950/10 sm:block" />

      <Select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="border-0 bg-transparent px-2 py-2 focus:ring-0 sm:w-44"
      >
        <option value="">Tipo de imóvel</option>
        {PROPERTY_TYPES.map((t) => (
          <option key={t.value} value={t.value}>
            {t.label}
          </option>
        ))}
      </Select>

      <div className="hidden h-8 w-px bg-sky-950/10 sm:block" />

      <Select
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="border-0 bg-transparent px-2 py-2 focus:ring-0 sm:w-44"
      >
        <option value="">Localização</option>
        {CITIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </Select>

      <button
        type="submit"
        className="flex items-center justify-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-sky-950 transition-colors hover:bg-gold-400 sm:ml-auto"
      >
        <Search className="h-4 w-4" /> Pesquisar
      </button>
    </form>
  )
}
