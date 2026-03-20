import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import type { GalleryItemRow } from "@/lib/admin-types"
import GalleryManager from "./gallery-manager"

export default async function AdminGalleryPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  const { data, error } = await supabase
    .from("gallery_items")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false })

  if (error) {
    return (
      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="font-serif text-2xl font-bold text-foreground">Gallery</h2>
        <p className="mt-3 text-sm text-red-600">Failed to load gallery items.</p>
      </section>
    )
  }

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-border bg-card p-6">
        <h2 className="font-serif text-2xl font-bold text-foreground">Gallery Manager</h2>
        <p className="mt-2 text-muted-foreground">
          Upload and manage photos and videos for the public gallery page.
        </p>
      </div>

      <GalleryManager initialItems={(data ?? []) as GalleryItemRow[]} />
    </section>
  )
}