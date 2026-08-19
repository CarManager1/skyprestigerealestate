'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { slugify } from '@/lib/format'
import type { PropertyPurpose, PropertyState, PropertyType } from '@/lib/types'

export type PropertyFormState = {
  status: 'idle' | 'error'
  message?: string
}

function readImageUrls(formData: FormData) {
  return formData
    .getAll('image_urls')
    .map((v) => String(v))
    .filter(Boolean)
}

function readPayload(formData: FormData) {
  const title = String(formData.get('title') ?? '').trim()
  const price = Number(formData.get('price') ?? 0)
  const city = String(formData.get('city') ?? '').trim()

  return {
    title,
    slug: `${slugify(title)}-${Math.random().toString(36).slice(2, 7)}`,
    description: String(formData.get('description') ?? '').trim() || null,
    price,
    purpose: String(formData.get('purpose') ?? 'venda') as PropertyPurpose,
    type: String(formData.get('type') ?? 'apartamento') as PropertyType,
    state: String(formData.get('state') ?? 'disponivel') as PropertyState,
    bedrooms: formData.get('bedrooms') ? Number(formData.get('bedrooms')) : null,
    bathrooms: formData.get('bathrooms') ? Number(formData.get('bathrooms')) : null,
    area_m2: formData.get('area_m2') ? Number(formData.get('area_m2')) : null,
    city,
    district: String(formData.get('district') ?? '').trim() || null,
    address: String(formData.get('address') ?? '').trim() || null,
    featured: formData.get('featured') === 'on',
    published: formData.get('published') === 'on',
  }
}

export async function createProperty(
  _prevState: PropertyFormState,
  formData: FormData
): Promise<PropertyFormState> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { status: 'error', message: 'Sessão expirada. Inicie sessão novamente.' }

  const payload = readPayload(formData)

  if (!payload.title || !payload.city || !payload.price) {
    return { status: 'error', message: 'Preencha pelo menos título, cidade e preço.' }
  }

  const { data: property, error } = await supabase
    .from('properties')
    .insert({ ...payload, agent_id: user.id })
    .select('id')
    .single()

  if (error) {
    console.error('createProperty', error.message)
    return { status: 'error', message: 'Não foi possível criar o imóvel.' }
  }

  const imageUrls = readImageUrls(formData)
  if (imageUrls.length > 0) {
    await supabase.from('property_images').insert(
      imageUrls.map((url, position) => ({ property_id: property.id, url, position }))
    )
  }

  revalidatePath('/dashboard/imoveis')
  revalidatePath('/imoveis')
  redirect('/dashboard/imoveis')
}

export async function updateProperty(
  id: string,
  _prevState: PropertyFormState,
  formData: FormData
): Promise<PropertyFormState> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { status: 'error', message: 'Sessão expirada. Inicie sessão novamente.' }

  const payload = readPayload(formData)

  if (!payload.title || !payload.city || !payload.price) {
    return { status: 'error', message: 'Preencha pelo menos título, cidade e preço.' }
  }

  // Manter o slug original em edições, para não partir links já partilhados.
  const updatePayload: Partial<typeof payload> = { ...payload }
  delete updatePayload.slug

  const { error } = await supabase.from('properties').update(updatePayload).eq('id', id)

  if (error) {
    console.error('updateProperty', error.message)
    return { status: 'error', message: 'Não foi possível guardar as alterações.' }
  }

  const imageUrls = readImageUrls(formData)
  await supabase.from('property_images').delete().eq('property_id', id)
  if (imageUrls.length > 0) {
    await supabase.from('property_images').insert(
      imageUrls.map((url, position) => ({ property_id: id, url, position }))
    )
  }

  revalidatePath('/dashboard/imoveis')
  revalidatePath('/imoveis')
  redirect('/dashboard/imoveis')
}

export async function deleteProperty(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('properties').delete().eq('id', id)

  if (error) console.error('deleteProperty', error.message)

  revalidatePath('/dashboard/imoveis')
  revalidatePath('/imoveis')
}

export async function togglePublished(id: string, published: boolean) {
  const supabase = await createClient()
  const { error } = await supabase.from('properties').update({ published }).eq('id', id)

  if (error) console.error('togglePublished', error.message)

  revalidatePath('/dashboard/imoveis')
  revalidatePath('/imoveis')
}
