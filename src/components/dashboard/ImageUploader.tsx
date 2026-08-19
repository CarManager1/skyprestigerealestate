'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { ImagePlus, Loader2, X } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const BUCKET = 'property-images'

export function ImageUploader({ initialUrls = [] }: { initialUrls?: string[] }) {
  const [urls, setUrls] = useState<string[]>(initialUrls)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return
    setUploading(true)
    setError(null)

    const supabase = createClient()
    const uploaded: string[] = []

    for (const file of Array.from(files)) {
      const path = `${crypto.randomUUID()}-${file.name.replace(/[^a-zA-Z0-9.\-_]/g, '')}`
      const { error: uploadError } = await supabase.storage.from(BUCKET).upload(path, file, {
        cacheControl: '3600',
        upsert: false,
      })

      if (uploadError) {
        setError('Falha ao enviar uma ou mais imagens. Verifique se está autenticado.')
        continue
      }

      const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
      uploaded.push(data.publicUrl)
    }

    setUrls((prev) => [...prev, ...uploaded])
    setUploading(false)
    if (inputRef.current) inputRef.current.value = ''
  }

  function removeAt(index: number) {
    setUrls((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="flex flex-col gap-3">
      {urls.map((url) => (
        <input key={url} type="hidden" name="image_urls" value={url} />
      ))}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {urls.map((url, i) => (
          <div key={url} className="group relative aspect-square overflow-hidden rounded-xl border border-sky-950/10">
            <Image src={url} alt={`Foto ${i + 1}`} fill sizes="180px" className="object-cover" />
            <button
              type="button"
              onClick={() => removeAt(i)}
              className="absolute right-1.5 top-1.5 rounded-full bg-sky-950/80 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
              aria-label="Remover imagem"
            >
              <X className="h-3.5 w-3.5" />
            </button>
            {i === 0 && (
              <span className="absolute bottom-1.5 left-1.5 rounded-full bg-gold-500 px-2 py-0.5 text-[10px] font-semibold text-sky-950">
                Capa
              </span>
            )}
          </div>
        ))}

        <label className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-sky-950/15 text-sky-950/40 transition-colors hover:border-gold-500 hover:text-gold-600">
          {uploading ? <Loader2 className="h-6 w-6 animate-spin" /> : <ImagePlus className="h-6 w-6" />}
          <span className="text-xs font-medium">{uploading ? 'A enviar…' : 'Adicionar fotos'}</span>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
            disabled={uploading}
          />
        </label>
      </div>

      {error && <p className="text-sm font-medium text-red-600">{error}</p>}
      <p className="text-xs text-sky-950/40">
        A primeira foto é usada como capa do anúncio. Pode arrastar para reordenar em breve —
        por agora, remova e reenvie pela ordem desejada.
      </p>
    </div>
  )
}
