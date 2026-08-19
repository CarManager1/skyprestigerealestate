import type { Metadata } from 'next'
import { Mail, MapPin, Phone, Clock } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { SectionTitle } from '@/components/SectionTitle'
import { LeadForm } from '@/components/LeadForm'
import { BRAND } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contacto',
  description: `Fale com a equipa da ${BRAND.fullName}.`,
}

const INFO = [
  { icon: MapPin, label: 'Morada', value: BRAND.address },
  { icon: Phone, label: 'Telefone', value: BRAND.phone },
  { icon: Mail, label: 'Email', value: BRAND.email },
  { icon: Clock, label: 'Horário', value: BRAND.hours },
]

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />

      <section className="bg-sky-950 pt-32 pb-16">
        <div className="mx-auto max-w-7xl px-6">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
            Contacto
          </span>
          <h1 className="mt-3 font-display text-4xl text-white sm:text-5xl">
            Vamos encontrar o seu próximo imóvel
          </h1>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div>
            <SectionTitle
              eyebrow="Fale connosco"
              title="Estamos disponíveis para ajudar"
              description="Preencha o formulário e um dos nossos consultores entrará em contacto consigo em menos de 24 horas."
            />

            <div className="mt-10 space-y-6">
              {INFO.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold-50 text-gold-600">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-sky-950/40">
                      {item.label}
                    </p>
                    <p className="text-sm font-medium text-sky-950">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-sky-950/10 p-8 shadow-xl shadow-sky-950/5">
            <LeadForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
