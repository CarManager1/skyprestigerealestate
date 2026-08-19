import Link from 'next/link'
import { Crown, Mail, MapPin, Phone, AtSign, Briefcase } from 'lucide-react'
import { BRAND, NAV_LINKS, PROPERTY_TYPES } from '@/lib/site'

export function Footer() {
  return (
    <footer className="bg-sky-950 text-white/70">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
          <Link href="/" className="flex items-center gap-2 text-white">
            <Crown className="h-6 w-6 text-gold-400" strokeWidth={1.5} />
            <span className="font-display text-xl tracking-wide">{BRAND.name}</span>
          </Link>
          <p className="max-w-xs text-sm leading-relaxed">{BRAND.description}</p>
          <div className="flex gap-3 pt-2">
            <a
              href={BRAND.instagram}
              className="rounded-full border border-white/15 p-2 transition-colors hover:border-gold-400 hover:text-gold-400"
              aria-label="Instagram"
            >
              <AtSign className="h-4 w-4" />
            </a>
            <a
              href={BRAND.linkedin}
              className="rounded-full border border-white/15 p-2 transition-colors hover:border-gold-400 hover:text-gold-400"
              aria-label="LinkedIn"
            >
              <Briefcase className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
            Navegação
          </h4>
          <ul className="space-y-3 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
            Tipologias
          </h4>
          <ul className="space-y-3 text-sm">
            {PROPERTY_TYPES.slice(0, 4).map((type) => (
              <li key={type.value}>
                <Link
                  href={`/imoveis?type=${type.value}`}
                  className="transition-colors hover:text-white"
                >
                  {type.label}s
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
            Contactos
          </h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" /> {BRAND.address}
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-gold-400" />
              <a href={`tel:${BRAND.phoneHref}`} className="hover:text-white">
                {BRAND.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-gold-400" />
              <a href={`mailto:${BRAND.email}`} className="hover:text-white">
                {BRAND.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-6">
        <p className="mx-auto max-w-7xl text-center text-xs text-white/40">
          © {new Date().getFullYear()} {BRAND.fullName}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
