'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import type { Lead } from '@/lib/types'

export async function updateLeadStatus(id: string, status: Lead['status']) {
  const supabase = await createClient()
  const { error } = await supabase.from('leads').update({ status }).eq('id', id)

  if (error) console.error('updateLeadStatus', error.message)

  revalidatePath('/dashboard/leads')
}
