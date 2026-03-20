import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import type { ContactMessageRow } from "@/lib/admin-types"
import ContactMessagesTable from "./contact-messages-table"

export default async function ContactMessagesPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  const { data, error } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    return (
      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="font-serif text-2xl font-bold text-foreground">
          Contact Messages
        </h2>
        <p className="mt-3 text-sm text-red-600">
          Failed to load contact messages.
        </p>
      </section>
    )
  }

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-border bg-card p-6">
        <h2 className="font-serif text-2xl font-bold text-foreground">
          Contact Messages
        </h2>
        <p className="mt-2 text-muted-foreground">
          View and manage messages submitted from the contact page.
        </p>
      </div>

      <ContactMessagesTable initialRows={(data ?? []) as ContactMessageRow[]} />
    </section>
  )
}