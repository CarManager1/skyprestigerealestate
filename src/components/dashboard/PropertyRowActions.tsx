'use client'

import Link from 'next/link'
import { useTransition } from 'react'
import { Pencil, Trash2, Eye, EyeOff, ExternalLink } from 'lucide-react'
import { deleteProperty, togglePublished } from '@/app/actions/properties'
import type { Property } from '@/lib/types'

export function PropertyRowActions({ property }: { property: Property }) {
  const [isPending, startTransition] = useTransition()

  function handleDelete() {
    if (!confirm(`Apagar o anúncio "${property.title}"? Esta ação não pode ser desfeita.`)) return
    startTransition(() => deleteProperty(property.id))
  }

  function handleToggle() {
    startTransition(() => togglePublished(property.id, !property.published))
  }

  return (
    <div className="flex items-center justify-end gap-1.5">
      <Link
        href={`/imoveis/${property.slug}`}
        target="_blank"
        className="rounded-lg p-2 text-sky-950/40 hover:bg-sky-950/5 hover:text-sky-950"
        title="Ver no site"
      >
        <ExternalLink className="h-4 w-4" />
      </Link>
      <button
        onClick={handleToggle}
        disabled={isPending}
        className="rounded-lg p-2 text-sky-950/40 hover:bg-sky-950/5 hover:text-sky-950 disabled:opacity-40"
        title={property.published ? 'Despublicar' : 'Publicar'}
      >
        {property.published ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
      </button>
      <Link
        href={`/dashboard/imoveis/${property.id}`}
        className="rounded-lg p-2 text-sky-950/40 hover:bg-sky-950/5 hover:text-sky-950"
        title="Editar"
      >
        <Pencil className="h-4 w-4" />
      </Link>
      <button
        onClick={handleDelete}
        disabled={isPending}
        className="rounded-lg p-2 text-red-400 hover:bg-red-50 hover:text-red-600 disabled:opacity-40"
        title="Apagar"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  )
}
