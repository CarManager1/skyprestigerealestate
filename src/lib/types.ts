export type PropertyPurpose = 'venda' | 'arrendamento'

export type PropertyState = 'disponivel' | 'reservado' | 'vendido'

export type PropertyType =
  | 'apartamento'
  | 'moradia'
  | 'penthouse'
  | 'terreno'
  | 'escritorio'
  | 'loja'

export type PropertyImage = {
  id: string
  property_id: string
  url: string
  position: number
}

export type Property = {
  id: string
  agent_id: string | null
  title: string
  slug: string
  description: string | null
  price: number
  purpose: PropertyPurpose
  type: PropertyType
  state: PropertyState
  bedrooms: number | null
  bathrooms: number | null
  area_m2: number | null
  city: string
  district: string | null
  address: string | null
  featured: boolean
  published: boolean
  created_at: string
  updated_at: string
  property_images?: PropertyImage[]
}

export type Lead = {
  id: string
  property_id: string | null
  name: string
  email: string
  phone: string | null
  message: string | null
  status: 'novo' | 'contactado' | 'fechado'
  created_at: string
  properties?: Pick<Property, 'id' | 'title' | 'slug'> | null
}

export type Profile = {
  id: string
  full_name: string | null
  phone: string | null
  role: 'admin' | 'agente'
  created_at: string
}

export type PropertyFilters = {
  q?: string
  purpose?: PropertyPurpose
  type?: PropertyType
  city?: string
  minPrice?: number
  maxPrice?: number
  bedrooms?: number
}
