import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import type { PrayerTeamApplicationRow } from "@/lib/admin-types"
import PrayerTeamTable from "./prayer-team-table"

export default async function AdminPrayerTeamPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  const { data, error } = await supabase
    .from("prayer_team_applications")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    return (
      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="font-serif text-2xl font-bold text-foreground">
          Prayer Team Applications
        </h2>
        <p className="mt-3 text-sm text-red-600">
          Failed to load prayer team applications.
        </p>
      </section>
    )
  }

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-border bg-card p-6">
        <h2 className="font-serif text-2xl font-bold text-foreground">
          Prayer Team Applications
        </h2>
        <p className="mt-2 text-muted-foreground">
          Review people who want to join the prayer team.
        </p>
      </div>

      <PrayerTeamTable initialRows={(data ?? []) as PrayerTeamApplicationRow[]} />
    </section>
  )
}