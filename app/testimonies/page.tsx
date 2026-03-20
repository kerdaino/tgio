import { createClient } from "@/lib/supabase/server"
import TestimoniesClient from "./testimonies-client"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Testimonies - The Good Ones International Outreach",
  description:
    "Read testimonies of God’s faithfulness, spiritual growth, answered prayers, and transformed lives through The Good Ones International Outreach.",
}

export default async function TestimoniesPage() {
  const supabase = await createClient()

  const { data } = await supabase
    .from("testimonies")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false })

  return <TestimoniesClient items={data ?? []} />
}