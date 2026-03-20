import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import DonationForm from "./donation-form"
import AccountsManager from "./accounts-manager"

export default async function DonationsAdminPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/admin/login")

  const { data: settings } = await supabase
    .from("donation_settings")
    .select("*")
    .limit(1)
    .maybeSingle()

  const { data: accounts } = await supabase
    .from("donation_accounts")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-8">
      <DonationForm initialData={settings} />
      <AccountsManager initialAccounts={accounts ?? []} />
    </div>
  )
}