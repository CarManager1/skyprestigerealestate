'use client'

import { useTransition } from 'react'
import { updateLeadStatus } from '@/app/actions/lead-status'
import type { Lead } from '@/lib/types'

const OPTIONS: Lead['status'][] = ['novo', 'contactado', 'fechado']

export function LeadStatusSelect({ lead }: { lead: Lead }) {
  const [isPending, startTransition] = useTransition()

  return (
    <select
      defaultValue={lead.status}
      disabled={isPending}
      onChange={(e) =>
        startTransition(() => updateLeadStatus(lead.id, e.target.value as Lead['status']))
      }
      className="rounded-full border border-sky-950/15 bg-white px-3 py-1.5 text-xs font-semibold capitalize text-sky-950 outline-none disabled:opacity-50"
    >
      {OPTIONS.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}
