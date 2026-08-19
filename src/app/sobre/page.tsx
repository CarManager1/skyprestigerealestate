import type { Metadata } from 'next'
import { Award, Handshake, Globe2, Sparkles } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { SectionTitle } from '@/components/SectionTitle'
import { ButtonLink } from '@/components/ui/Button'
import { BRAND, STATS, VALUES } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Sobre Nós',
  description: `Conheça a história e os valores da ${BRAND.fullName}.`,
}

const TEAM = [
  { name: 'Ana Ribeiro', role: 'Fundadora & CEO' },
  { name: 'Tiago Marques', role: 'Diretor Comercial' },
  { name: 'Beatriz Santos', role: 'Consultora Sénior' },
  { name: 'Rui Ferreira', role: 'Consultor Internacional' },
]

const MILESTONES = [
  { icon: Award, title: 'Reconhecimento', text: 'Distinguida como agência de referência em imóveis de luxo em Portugal.' },
  { icon: Handshake, title: 'Confiança', text: 'Centenas de famílias e investidores acompanhados ao longo de 18 anos.' },
  { icon: Globe2, title: 'Alcance Global', text: 'Parcerias com agências internacionais na Europa e nas Américas.' },
  { icon: Sparkles, title: 'Serviço Premium', text: 'Acompanhamento personalizado do primeiro contacto à escritura.' },
]

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />

      <section className="relative overflow-hidden bg-sky-950 pt-32 pb-24">
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:56px_56px]" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
            A Nossa História
          </span>
          <h1 className="mt-4 font-display text-4xl text-white sm:text-5xl">
            Construímos relações, não apenas transações.
          </h1>
          <p className="mt-6 text-balance text-lg leading-relaxed text-white/70">
            Desde 2008 que a {BRAND.name} ajuda famílias e investidores a encontrar imóveis que
            marcam a diferença — com discrição, exigência e um profundo conhecimento do mercado.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-24">
        <dl className="grid grid-cols-2 gap-8 border-b border-sky-950/10 pb-16 sm:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <dd className="font-display text-3xl text-sky-950 sm:text-4xl">{stat.value}</dd>
              <p className="mt-1 text-xs uppercase tracking-wide text-sky-950/50">{stat.label}</p>
            </div>
          ))}
        </dl>

        <div className="grid grid-cols-1 gap-16 py-16 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionTitle
              eyebrow="A Nossa Missão"
              title="Elevar o standard do mercado imobiliário de luxo"
              description="Acreditamos que comprar, vender ou arrendar um imóvel de exceção deve ser uma experiência à altura do próprio imóvel. Por isso combinamos conhecimento local profundo, uma rede internacional de contactos e um serviço verdadeiramente personalizado."
            />
            <ButtonLink href="/contacto" className="mt-8">
              Fale connosco
            </ButtonLink>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {MILESTONES.map((item) => (
              <div key={item.title} className="rounded-2xl border border-sky-950/10 p-6">
                <item.icon className="h-7 w-7 text-gold-500" strokeWidth={1.25} />
                <h3 className="mt-4 font-display text-base text-sky-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-sky-950/60">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sky-950/[0.03] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionTitle eyebrow="Valores" title="O que nos guia" align="center" className="mx-auto" />
          <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((value) => (
              <div key={value.title} className="text-center">
                <h3 className="font-display text-lg text-sky-950">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-sky-950/60">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-24">
        <SectionTitle eyebrow="Equipa" title="Consultores dedicados" align="center" className="mx-auto" />
        <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4">
          {TEAM.map((member) => (
            <div key={member.name} className="text-center">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-sky-900 to-sky-950 font-display text-2xl text-gold-400">
                {member.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </div>
              <p className="mt-4 font-display text-base text-sky-950">{member.name}</p>
              <p className="text-xs uppercase tracking-wide text-sky-950/50">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
