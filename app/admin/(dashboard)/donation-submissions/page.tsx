import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import type { DonationSubmissionRow } from "@/lib/admin-types"
import DonationSubmissionsTable from "./donation-submissions-table"

export default async function DonationSubmissionsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  const { data, error } = await supabase
    .from("donation_submissions")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    return (
      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="font-serif text-2xl font-bold text-foreground">
          Donation Submissions
        </h2>
        <p className="mt-3 text-sm text-red-600">
          Failed to load donation submissions.
        </p>
      </section>
    )
  }

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-border bg-card p-6">
        <h2 className="font-serif text-2xl font-bold text-foreground">
          Donation Submissions
        </h2>
        <p className="mt-2 text-muted-foreground">
          View and manage donation confirmations submitted through the website.
        </p>
      </div>

      <DonationSubmissionsTable initialRows={(data ?? []) as DonationSubmissionRow[]} />
    </section>
  )
}