'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, X, Crown } from 'lucide-react'
import { BRAND, NAV_LINKS } from '@/lib/site'
import { ButtonLink } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        scrolled || isOpen ? 'bg-sky-950/95 shadow-lg backdrop-blur' : 'bg-transparent'
      )}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 text-white">
          <Crown className="h-6 w-6 text-gold-400" strokeWidth={1.5} />
          <span className="font-display text-xl tracking-wide">{BRAND.name}</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                'text-sm font-medium text-white/80 transition-colors hover:text-gold-400',
                pathname === link.href && 'text-gold-400'
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <ButtonLink href="/login" variant="primary" size="sm">
            Área do Consultor
          </ButtonLink>
        </div>

        <button
          onClick={() => setIsOpen((v) => !v)}
          className="p-2 text-white md:hidden"
          aria-label="Abrir menu"
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {isOpen && (
        <div className="border-t border-white/10 px-6 pb-6 md:hidden">
          <div className="flex flex-col gap-4 pt-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-white/90"
              >
                {link.label}
              </Link>
            ))}
            <ButtonLink href="/login" variant="primary" size="sm" className="mt-2 w-full">
              Área do Consultor
            </ButtonLink>
          </div>
        </div>
      )}
    </header>
  )
}
