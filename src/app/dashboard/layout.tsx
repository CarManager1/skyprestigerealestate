import { Sidebar } from '@/components/dashboard/Sidebar'
import { createClient } from '@/lib/supabase/server'

export default async function DashboardLayout({ children }: LayoutProps<'/dashboard'>) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="flex min-h-screen flex-col bg-sky-950/[0.02] lg:flex-row">
      <Sidebar userEmail={user?.email} />
      <main className="flex-1 px-6 py-10 lg:px-10">{children}</main>
    </div>
  )
}
