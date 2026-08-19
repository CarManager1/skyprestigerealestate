import Link from 'next/link'
import { Building2, CheckCircle2, MailPlus, ArrowRight, Plus } from 'lucide-react'
import { getDashboardStats, getDashboardLeads } from '@/lib/queries'
import { formatDate } from '@/lib/format'
import { ButtonLink } from '@/components/ui/Button'

export default async function DashboardHome() {
  const [stats, leads] = await Promise.all([getDashboardStats(), getDashboardLeads()])
  const recentLeads = leads.slice(0, 5)

  const cards = [
    { label: 'Total de imóveis', value: stats.totalProperties, icon: Building2 },
    { label: 'Publicados no site', value: stats.publishedProperties, icon: CheckCircle2 },
    { label: 'Novos contactos', value: stats.newLeads, icon: MailPlus },
  ]

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-3xl text-sky-950">Visão Geral</h1>
          <p className="mt-1 text-sm text-sky-950/50">Resumo da atividade da agência.</p>
        </div>
        <ButtonLink href="/dashboard/imoveis/novo">
          <Plus className="h-4 w-4" /> Novo Anúncio
        </ButtonLink>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {cards.map((card) => (
          <div key={card.label} className="rounded-2xl border border-sky-950/10 bg-white p-6">
            <card.icon className="h-6 w-6 text-gold-500" strokeWidth={1.5} />
            <p className="mt-4 font-display text-3xl text-sky-950">{card.value}</p>
            <p className="mt-1 text-sm text-sky-950/50">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-sky-950/10 bg-white p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg text-sky-950">Contactos recentes</h2>
          <Link
            href="/dashboard/leads"
            className="flex items-center gap-1 text-sm font-semibold text-gold-600 hover:text-gold-700"
          >
            Ver todos <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {recentLeads.length === 0 ? (
          <p className="mt-6 text-sm text-sky-950/40">Ainda não há contactos recebidos.</p>
        ) : (
          <div className="mt-4 divide-y divide-sky-950/5">
            {recentLeads.map((lead) => (
              <div key={lead.id} className="flex items-center justify-between gap-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-sky-950">{lead.name}</p>
                  <p className="text-xs text-sky-950/50">
                    {lead.properties?.title ?? 'Contacto geral'} · {formatDate(lead.created_at)}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-sky-950/5 px-3 py-1 text-xs font-semibold capitalize text-sky-950/60">
                  {lead.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
