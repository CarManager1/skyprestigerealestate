'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Crown, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Input, Label } from '@/components/ui/Field'
import { Button } from '@/components/ui/Button'
import { BRAND } from '@/lib/site'

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    setLoading(false)

    if (error) {
      setError('Email ou palavra-passe incorretos.')
      return
    }

    router.push(searchParams.get('next') || '/dashboard')
    router.refresh()
  }

  return (
    <div className="relative w-full max-w-md">
      <Link href="/" className="mb-8 flex items-center justify-center gap-2 text-white">
        <Crown className="h-6 w-6 text-gold-400" strokeWidth={1.5} />
        <span className="font-display text-xl tracking-wide">{BRAND.name}</span>
      </Link>

      <div className="rounded-3xl bg-white p-8 shadow-2xl">
        <h1 className="font-display text-2xl text-sky-950">Área do Consultor</h1>
        <p className="mt-1 text-sm text-sky-950/50">
          Aceda ao painel de gestão de imóveis e contactos.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="consultor@skyprestige.pt"
            />
          </div>
          <div>
            <Label htmlFor="password">Palavra-passe</Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-sm font-medium text-red-600">{error}</p>}

          <Button type="submit" disabled={loading} className="mt-2 w-full">
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading ? 'A entrar…' : 'Entrar'}
          </Button>
        </form>
      </div>

      <p className="mt-6 text-center text-xs text-white/40">
        Os acessos são criados internamente pela administração da {BRAND.name}.
      </p>
    </div>
  )
}
