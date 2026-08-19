'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Building2, Users2, LogOut, Crown, ExternalLink } from 'lucide-react'
import { signOut } from '@/app/actions/auth'
import { BRAND } from '@/lib/site'
import { cn } from '@/lib/utils'

const LINKS = [
  { href: '/dashboard', label: 'Visão Geral', icon: LayoutDashboard },
  { href: '/dashboard/imoveis', label: 'Imóveis', icon: Building2 },
  { href: '/dashboard/leads', label: 'Contactos', icon: Users2 },
]

export function Sidebar({ userEmail }: { userEmail?: string | null }) {
  const pathname = usePathname()

  return (
    <aside className="flex w-full shrink-0 flex-col justify-between border-r border-sky-950/10 bg-sky-950 px-4 py-6 text-white lg:h-screen lg:w-64 lg:sticky lg:top-0">
      <div>
        <Link href="/" className="mb-8 flex items-center gap-2 px-2">
          <Crown className="h-6 w-6 text-gold-400" strokeWidth={1.5} />
          <span className="font-display text-lg tracking-wide">{BRAND.name}</span>
        </Link>

        <nav className="flex flex-col gap-1">
          {LINKS.map((link) => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                  active ? 'bg-gold-500 text-sky-950' : 'text-white/70 hover:bg-white/5 hover:text-white'
                )}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="flex flex-col gap-3 border-t border-white/10 pt-4">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 px-3 text-xs text-white/50 hover:text-white"
        >
          <ExternalLink className="h-3.5 w-3.5" /> Ver site público
        </Link>
        {userEmail && <p className="truncate px-3 text-xs text-white/40">{userEmail}</p>}
        <form action={signOut}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white"
          >
            <LogOut className="h-4 w-4" /> Terminar sessão
          </button>
        </form>
      </div>
    </aside>
  )
}
