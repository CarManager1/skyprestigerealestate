import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 * Supabase client para Server Components, Server Actions e Route Handlers.
 * Lê/escreve os cookies de sessão através da API `cookies()` do Next.js.
 */
export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // `setAll` foi chamado a partir de um Server Component.
            // Pode ser ignorado se houver um proxy a atualizar a sessão.
          }
        },
      },
    }
  )
}
