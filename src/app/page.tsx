import { ArrowRight, Quote, ShieldCheck } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { HeroSearch } from '@/components/HeroSearch'
import { SectionTitle } from '@/components/SectionTitle'
import { PropertyCard } from '@/components/PropertyCard'
import { ButtonLink } from '@/components/ui/Button'
import { BRAND, STATS, VALUES, FAQS } from '@/lib/site'
import { getFeaturedProperties } from '@/lib/queries'

export default async function HomePage() {
  const properties = await getFeaturedProperties(6)

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />

      {/* --- HERO --- */}
      <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-sky-950 pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-950 via-sky-900 to-sky-950" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:64px_64px]" />
        <div className="absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-gold-500/10 blur-3xl" />

        <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-24">
          <div className="max-w-3xl">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
              Imobiliária de Prestígio desde 2008
            </span>
            <h1 className="text-balance font-display text-5xl leading-[1.1] text-white sm:text-6xl lg:text-7xl">
              Viver bem é uma <span className="text-gold-400">questão de escolha.</span>
            </h1>
            <p className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-white/70">
              {BRAND.description}
            </p>
          </div>

          <HeroSearch />

          <dl className="grid grid-cols-2 gap-8 border-t border-white/10 pt-10 sm:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-3xl text-gold-400 sm:text-4xl">{stat.value}</dd>
                <p className="mt-1 text-xs uppercase tracking-wide text-white/50">{stat.label}</p>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* --- FEATURED PROPERTIES --- */}
      <section className="mx-auto w-full max-w-7xl px-6 py-24">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionTitle
            eyebrow="Portefólio"
            title="Imóveis em Destaque"
            description="Uma seleção dos imóveis mais exclusivos disponíveis neste momento."
          />
          <ButtonLink href="/imoveis" variant="outline" className="shrink-0">
            Ver todos os imóveis <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </div>

        {properties.length > 0 ? (
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((property, i) => (
              <PropertyCard key={property.id} property={property} seed={i} />
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-2xl border border-dashed border-sky-950/15 p-16 text-center">
            <p className="text-sky-950/50">
              Ainda não há imóveis publicados. Adicione o primeiro no painel de gestão.
            </p>
          </div>
        )}
      </section>

      {/* --- VALUES --- */}
      <section className="bg-sky-950/[0.03] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionTitle
            eyebrow="Porquê a SkyPrestige"
            title="Excelência em cada detalhe"
            align="center"
            className="mx-auto"
          />
          <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((value) => (
              <div key={value.title} className="flex flex-col gap-3">
                <ShieldCheck className="h-8 w-8 text-gold-500" strokeWidth={1.25} />
                <h3 className="font-display text-lg text-sky-950">{value.title}</h3>
                <p className="text-sm leading-relaxed text-sky-950/60">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TESTIMONIAL / CTA --- */}
      <section className="relative overflow-hidden bg-sky-950 py-24">
        <div className="absolute -left-24 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-gold-500/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <Quote className="mx-auto mb-6 h-10 w-10 text-gold-400" />
          <p className="text-balance font-display text-2xl leading-relaxed text-white sm:text-3xl">
            &ldquo;A equipa da SkyPrestige encontrou o imóvel perfeito para a nossa família em
            tempo recorde, com um acompanhamento impecável do início ao fim.&rdquo;
          </p>
          <p className="mt-6 text-sm uppercase tracking-wide text-gold-400">
            Mariana Costa · Cliente SkyPrestige
          </p>

          <div className="mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <ButtonLink href="/imoveis">
              Explorar Imóveis <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href="/contacto" variant="outlineLight">
              Falar com um Consultor
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* --- FAQ --- */}
      <section className="mx-auto w-full max-w-4xl px-6 py-24">
        <SectionTitle eyebrow="Dúvidas" title="Perguntas Frequentes" align="center" className="mx-auto" />
        <div className="mt-12 divide-y divide-sky-950/10 border-y border-sky-950/10">
          {FAQS.map((faq) => (
            <details key={faq.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg text-sky-950">
                {faq.question}
                <span className="shrink-0 text-gold-500 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-sky-950/60">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
