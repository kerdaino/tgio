import { createClient } from "@/lib/supabase/server"
import GalleryClient from "./gallery-client"

export default async function GalleryPage() {
  const supabase = await createClient()

  const { data } = await supabase
    .from("gallery_items")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false })

  return <GalleryClient items={data ?? []} />
}