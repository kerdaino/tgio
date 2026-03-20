import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import type { TestimonyRow } from "@/lib/admin-types"
import TestimoniesManager from "./testimonies-manager"

export default async function AdminTestimoniesPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  const { data, error } = await supabase
    .from("testimonies")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    return (
      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="font-serif text-2xl font-bold text-foreground">Testimonies</h2>
        <p className="mt-3 text-sm text-red-600">Failed to load testimonies.</p>
      </section>
    )
  }

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-border bg-card p-6">
        <h2 className="font-serif text-2xl font-bold text-foreground">Testimonies Manager</h2>
        <p className="mt-2 text-muted-foreground">
          Add, publish, and manage testimonies for the public testimonies page.
        </p>
      </div>

      <TestimoniesManager initialItems={(data ?? []) as TestimonyRow[]} />
    </section>
  )
}