import { createClient } from "@/lib/supabase/server"
import DonateClient from "./donate-client"

export default async function DonatePage() {
  const supabase = await createClient()

  const { data: settings } = await supabase
    .from("donation_settings")
    .select("*")
    .limit(1)
    .maybeSingle()

  const { data: accounts } = await supabase
    .from("donation_accounts")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false })

  return (
    <DonateClient
      donationSettings={settings}
      donationAccounts={accounts ?? []}
    />
  )
}