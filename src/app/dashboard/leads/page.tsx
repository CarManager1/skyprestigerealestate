import Link from 'next/link'
import { Mail, Phone } from 'lucide-react'
import { getDashboardLeads } from '@/lib/queries'
import { formatDate } from '@/lib/format'
import { LeadStatusSelect } from '@/components/dashboard/LeadStatusSelect'

export default async function DashboardLeadsPage() {
  const leads = await getDashboardLeads()

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display text-3xl text-sky-950">Contactos</h1>
        <p className="mt-1 text-sm text-sky-950/50">
          Pedidos de informação recebidos através do site — {leads.length} no total.
        </p>
      </div>

      {leads.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-sky-950/15 p-16 text-center">
          <p className="text-sky-950/50">Ainda não há contactos recebidos.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {leads.map((lead) => (
            <div
              key={lead.id}
              className="flex flex-col gap-4 rounded-2xl border border-sky-950/10 bg-white p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold text-sky-950">{lead.name}</p>
                  <span className="text-xs text-sky-950/40">{formatDate(lead.created_at)}</span>
                </div>

                <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-sky-950/60">
                  <a href={`mailto:${lead.email}`} className="flex items-center gap-1.5 hover:text-sky-950">
                    <Mail className="h-3.5 w-3.5" /> {lead.email}
                  </a>
                  {lead.phone && (
                    <a href={`tel:${lead.phone}`} className="flex items-center gap-1.5 hover:text-sky-950">
                      <Phone className="h-3.5 w-3.5" /> {lead.phone}
                    </a>
                  )}
                </div>

                {lead.properties ? (
                  <Link
                    href={`/imoveis/${lead.properties.slug}`}
                    target="_blank"
                    className="mt-2 inline-block text-xs font-semibold text-gold-600 hover:text-gold-700"
                  >
                    Re: {lead.properties.title}
                  </Link>
                ) : (
                  <p className="mt-2 text-xs font-semibold text-sky-950/40">Contacto geral</p>
                )}

                {lead.message && (
                  <p className="mt-2 max-w-xl text-sm text-sky-950/70">&ldquo;{lead.message}&rdquo;</p>
                )}
              </div>

              <div className="shrink-0">
                <LeadStatusSelect lead={lead} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
