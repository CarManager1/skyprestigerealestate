import type { NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/proxy'

// Nota: a partir do Next.js 16, o antigo `middleware.ts` passou a chamar-se
// `proxy.ts` — a funcionalidade é a mesma.
export function proxy(request: NextRequest) {
  return updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Corre em todos os pedidos exceto ficheiros estáticos e de imagem.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
