import { Suspense } from 'react'
import type { Metadata } from 'next'
import { LoginForm } from '@/components/auth/LoginForm'

export const metadata: Metadata = {
  title: 'Área do Consultor',
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-sky-950 px-6 py-16">
      <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:56px_56px]" />
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  )
}
