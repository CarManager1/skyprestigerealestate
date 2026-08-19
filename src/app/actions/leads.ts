'use server'

import { createClient } from '@/lib/supabase/server'

export type LeadFormState = {
  status: 'idle' | 'success' | 'error'
  message?: string
}

export async function createLead(
  _prevState: LeadFormState,
  formData: FormData
): Promise<LeadFormState> {
  const name = String(formData.get('name') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim()
  const phone = String(formData.get('phone') ?? '').trim()
  const message = String(formData.get('message') ?? '').trim()
  const propertyId = formData.get('property_id')

  if (!name || !email) {
    return { status: 'error', message: 'Preencha pelo menos o nome e o email.' }
  }

  const supabase = await createClient()
  const { error } = await supabase.from('leads').insert({
    name,
    email,
    phone: phone || null,
    message: message || null,
    property_id: propertyId ? String(propertyId) : null,
  })

  if (error) {
    console.error('createLead', error.message)
    return { status: 'error', message: 'Não foi possível enviar o pedido. Tente novamente.' }
  }

  return { status: 'success', message: 'Recebemos o seu pedido. Entraremos em contacto em breve.' }
}
