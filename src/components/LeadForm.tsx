'use client'

import { useActionState } from 'react'
import { createLead, type LeadFormState } from '@/app/actions/leads'
import { Input, Textarea, Label } from '@/components/ui/Field'
import { Button } from '@/components/ui/Button'
import { Loader2, CheckCircle2 } from 'lucide-react'

const initialState: LeadFormState = { status: 'idle' }

export function LeadForm({
  propertyId,
  propertyTitle,
}: {
  propertyId?: string
  propertyTitle?: string
}) {
  const [state, formAction, pending] = useActionState(createLead, initialState)

  if (state.status === 'success') {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-gold-200 bg-gold-50 p-6 text-center">
        <CheckCircle2 className="h-8 w-8 text-gold-600" />
        <p className="text-sm font-medium text-sky-950">{state.message}</p>
      </div>
    )
  }

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {propertyId && <input type="hidden" name="property_id" value={propertyId} />}

      {propertyTitle && (
        <p className="text-sm text-sky-950/60">
          A pedir informações sobre <span className="font-semibold text-sky-950">{propertyTitle}</span>
        </p>
      )}

      <div>
        <Label htmlFor="name">Nome</Label>
        <Input id="name" name="name" required placeholder="O seu nome" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required placeholder="voce@email.com" />
        </div>
        <div>
          <Label htmlFor="phone">Telefone</Label>
          <Input id="phone" name="phone" type="tel" placeholder="+351 9xx xxx xxx" />
        </div>
      </div>

      <div>
        <Label htmlFor="message">Mensagem</Label>
        <Textarea
          id="message"
          name="message"
          placeholder={
            propertyTitle
              ? 'Gostaria de agendar uma visita...'
              : 'Como podemos ajudar?'
          }
        />
      </div>

      {state.status === 'error' && (
        <p className="text-sm font-medium text-red-600">{state.message}</p>
      )}

      <Button type="submit" disabled={pending} className="w-full">
        {pending && <Loader2 className="h-4 w-4 animate-spin" />}
        {pending ? 'A enviar…' : 'Enviar pedido'}
      </Button>
    </form>
  )
}
