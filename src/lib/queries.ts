import { createClient } from '@/lib/supabase/server'
import type { Property, PropertyFilters, Lead } from '@/lib/types'

const PROPERTY_SELECT = '*, property_images(id, property_id, url, position)'

function sortImages(property: Property): Property {
  return {
    ...property,
    property_images: [...(property.property_images ?? [])].sort(
      (a, b) => a.position - b.position
    ),
  }
}

export async function getFeaturedProperties(limit = 6) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('properties')
    .select(PROPERTY_SELECT)
    .eq('published', true)
    .order('featured', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('getFeaturedProperties', error.message)
    return []
  }

  return (data as Property[]).map(sortImages)
}

export async function getPublishedProperties(filters: PropertyFilters) {
  const supabase = await createClient()
  let query = supabase
    .from('properties')
    .select(PROPERTY_SELECT)
    .eq('published', true)

  if (filters.q) {
    query = query.or(`title.ilike.%${filters.q}%,city.ilike.%${filters.q}%`)
  }
  if (filters.purpose) query = query.eq('purpose', filters.purpose)
  if (filters.type) query = query.eq('type', filters.type)
  if (filters.city) query = query.eq('city', filters.city)
  if (filters.bedrooms) query = query.gte('bedrooms', filters.bedrooms)
  if (filters.minPrice) query = query.gte('price', filters.minPrice)
  if (filters.maxPrice) query = query.lte('price', filters.maxPrice)

  const { data, error } = await query.order('created_at', { ascending: false })

  if (error) {
    console.error('getPublishedProperties', error.message)
    return []
  }

  return (data as Property[]).map(sortImages)
}

export async function getPropertyBySlug(slug: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('properties')
    .select(PROPERTY_SELECT)
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle()

  if (error || !data) return null
  return sortImages(data as Property)
}

export async function getSimilarProperties(property: Property, limit = 3) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('properties')
    .select(PROPERTY_SELECT)
    .eq('published', true)
    .eq('type', property.type)
    .neq('id', property.id)
    .limit(limit)

  if (error) return []
  return (data as Property[]).map(sortImages)
}

// --- Painel (requer sessão autenticada; protegido por RLS + proxy) ---

export async function getDashboardProperties() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('properties')
    .select(PROPERTY_SELECT)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('getDashboardProperties', error.message)
    return []
  }
  return (data as Property[]).map(sortImages)
}

export async function getDashboardProperty(id: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('properties')
    .select(PROPERTY_SELECT)
    .eq('id', id)
    .maybeSingle()

  if (error || !data) return null
  return sortImages(data as Property)
}

export async function getDashboardLeads(): Promise<Lead[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('leads')
    .select('*, properties(id, title, slug)')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('getDashboardLeads', error.message)
    return []
  }
  return data as Lead[]
}

export async function getDashboardStats() {
  const supabase = await createClient()
  const [{ count: totalProperties }, { count: publishedProperties }, { count: newLeads }] =
    await Promise.all([
      supabase.from('properties').select('*', { count: 'exact', head: true }),
      supabase
        .from('properties')
        .select('*', { count: 'exact', head: true })
        .eq('published', true),
      supabase
        .from('leads')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'novo'),
    ])

  return {
    totalProperties: totalProperties ?? 0,
    publishedProperties: publishedProperties ?? 0,
    newLeads: newLeads ?? 0,
  }
}
