import Link from "next/link"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import AdminLogoutButton from "./logout-button"

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="font-serif text-2xl font-bold text-foreground">Admin</h1>
            <p className="text-sm text-muted-foreground">
              The Good Ones International Outreach
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-muted-foreground sm:inline">
              {user.email}
            </span>
            <AdminLogoutButton />
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[240px_1fr] lg:px-8">
        <aside className="rounded-2xl border border-border bg-card p-4">
         <nav className="space-y-2">
  <Link href="/admin" className="block rounded-lg px-3 py-2 text-sm hover:bg-secondary">
    Dashboard
  </Link>
  <Link href="/admin/prayer-requests" className="block rounded-lg px-3 py-2 text-sm hover:bg-secondary">
    Prayer Requests
  </Link>
  <Link href="/admin/prayer-team" className="block rounded-lg px-3 py-2 text-sm hover:bg-secondary">
    Prayer Team
  </Link>
  <Link href="/admin/donations" className="block rounded-lg px-3 py-2 text-sm hover:bg-secondary">
    Donations
  </Link>
  <Link href="/admin/donation-submissions" className="block rounded-lg px-3 py-2 text-sm hover:bg-secondary">
  Donation Submissions
</Link>
<Link href="/admin/gallery" className="block rounded-lg px-3 py-2 text-sm hover:bg-secondary">
  Gallery
</Link>
<Link href="/admin/testimonies" className="block rounded-lg px-3 py-2 text-sm hover:bg-secondary">
  Testimonies
</Link>
</nav>
        </aside>

        <main>{children}</main>
      </div>
    </div>
  )
}