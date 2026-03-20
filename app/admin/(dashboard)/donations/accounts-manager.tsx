"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"

type DonationAccount = {
  id: string
  currency: string
  account_label: string | null
  bank_name: string | null
  account_name: string | null
  account_number: string | null
  iban: string | null
  swift_code: string | null
  routing_number: string | null
  sort_code: string | null
  beneficiary_address: string | null
  note: string | null
  is_active: boolean
}

type NewAccountForm = {
  currency: string
  account_label: string
  bank_name: string
  account_name: string
  account_number: string
  iban: string
  swift_code: string
  routing_number: string
  sort_code: string
  beneficiary_address: string
  note: string
  is_active: boolean
}

const emptyForm: NewAccountForm = {
  currency: "NGN",
  account_label: "",
  bank_name: "",
  account_name: "",
  account_number: "",
  iban: "",
  swift_code: "",
  routing_number: "",
  sort_code: "",
  beneficiary_address: "",
  note: "",
  is_active: true,
}

export default function AccountsManager({
  initialAccounts,
}: {
  initialAccounts: DonationAccount[]
}) {
  const supabase = createClient()

  const [accounts, setAccounts] = useState<DonationAccount[]>(initialAccounts)
  const [form, setForm] = useState<NewAccountForm>(emptyForm)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value, type } = e.target

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked
      setForm((prev) => ({ ...prev, [name]: checked }))
      return
    }

    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleAddAccount() {
    setLoading(true)
    setSuccess("")
    setErrorMessage("")

    const { data, error } = await supabase
      .from("donation_accounts")
      .insert([
        {
          currency: form.currency,
          account_label: form.account_label || null,
          bank_name: form.bank_name || null,
          account_name: form.account_name || null,
          account_number: form.account_number || null,
          iban: form.iban || null,
          swift_code: form.swift_code || null,
          routing_number: form.routing_number || null,
          sort_code: form.sort_code || null,
          beneficiary_address: form.beneficiary_address || null,
          note: form.note || null,
          is_active: form.is_active,
        },
      ])
      .select()
      .single()

    if (error) {
      setErrorMessage("Failed to add donation account.")
    } else if (data) {
      setAccounts((prev) => [...prev, data])
      setForm(emptyForm)
      setSuccess("Donation account added successfully.")
    }

    setLoading(false)
  }

  async function handleDeleteAccount(id: string) {
    const confirmed = window.confirm("Delete this donation account?")
    if (!confirmed) return

    const { error } = await supabase
      .from("donation_accounts")
      .delete()
      .eq("id", id)

    if (error) {
      setErrorMessage("Failed to delete donation account.")
      return
    }

    setAccounts((prev) => prev.filter((account) => account.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-card p-6">
        <h3 className="text-xl font-bold text-foreground">Donation Accounts</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Add and manage donation account details for different currencies.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
        <h4 className="text-lg font-semibold text-foreground">Add New Account</h4>

        <div className="grid gap-4 sm:grid-cols-2">
          <select
            name="currency"
            value={form.currency}
            onChange={handleChange}
            className="w-full rounded-xl border p-3"
          >
            <option value="NGN">NGN</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>

          <input
            name="account_label"
            value={form.account_label}
            onChange={handleChange}
            placeholder="Account Label"
            className="w-full rounded-xl border p-3"
          />

          <input
            name="bank_name"
            value={form.bank_name}
            onChange={handleChange}
            placeholder="Bank Name"
            className="w-full rounded-xl border p-3"
          />

          <input
            name="account_name"
            value={form.account_name}
            onChange={handleChange}
            placeholder="Account Name"
            className="w-full rounded-xl border p-3"
          />

          <input
            name="account_number"
            value={form.account_number}
            onChange={handleChange}
            placeholder="Account Number"
            className="w-full rounded-xl border p-3"
          />

          <input
            name="iban"
            value={form.iban}
            onChange={handleChange}
            placeholder="IBAN"
            className="w-full rounded-xl border p-3"
          />

          <input
            name="swift_code"
            value={form.swift_code}
            onChange={handleChange}
            placeholder="SWIFT Code"
            className="w-full rounded-xl border p-3"
          />

          <input
            name="routing_number"
            value={form.routing_number}
            onChange={handleChange}
            placeholder="Routing Number"
            className="w-full rounded-xl border p-3"
          />

          <input
            name="sort_code"
            value={form.sort_code}
            onChange={handleChange}
            placeholder="Sort Code"
            className="w-full rounded-xl border p-3"
          />
        </div>

        <textarea
          name="beneficiary_address"
          value={form.beneficiary_address}
          onChange={handleChange}
          placeholder="Beneficiary Address"
          className="w-full rounded-xl border p-3"
          rows={3}
        />

        <textarea
          name="note"
          value={form.note}
          onChange={handleChange}
          placeholder="Note"
          className="w-full rounded-xl border p-3"
          rows={3}
        />

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            name="is_active"
            checked={form.is_active}
            onChange={handleChange}
          />
          <span className="text-sm text-foreground">Active account</span>
        </label>

        <button
          type="button"
          onClick={handleAddAccount}
          className="rounded-xl bg-primary px-6 py-3 text-white"
        >
          {loading ? "Saving..." : "Add Account"}
        </button>

        {success && <p className="text-green-600">{success}</p>}
        {errorMessage && <p className="text-red-600">{errorMessage}</p>}
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <h4 className="mb-4 text-lg font-semibold text-foreground">Existing Accounts</h4>

        <div className="space-y-4">
          {accounts.length === 0 ? (
            <p className="text-sm text-muted-foreground">No donation accounts yet.</p>
          ) : (
            accounts.map((account) => (
              <div key={account.id} className="rounded-2xl border border-border p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1 text-sm">
                    <p><span className="font-semibold">Currency:</span> {account.currency}</p>
                    <p><span className="font-semibold">Label:</span> {account.account_label || "—"}</p>
                    <p><span className="font-semibold">Bank:</span> {account.bank_name || "—"}</p>
                    <p><span className="font-semibold">Account Name:</span> {account.account_name || "—"}</p>
                    <p><span className="font-semibold">Account Number:</span> {account.account_number || "—"}</p>
                    <p><span className="font-semibold">IBAN:</span> {account.iban || "—"}</p>
                    <p><span className="font-semibold">SWIFT:</span> {account.swift_code || "—"}</p>
                    <p><span className="font-semibold">Routing:</span> {account.routing_number || "—"}</p>
                    <p><span className="font-semibold">Sort Code:</span> {account.sort_code || "—"}</p>
                    <p><span className="font-semibold">Active:</span> {account.is_active ? "Yes" : "No"}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDeleteAccount(account.id)}
                    className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100"
                  >
                    Delete
                  </button>
                </div>

                {account.note && (
                  <div className="mt-3 rounded-xl bg-secondary p-3 text-sm text-muted-foreground">
                    {account.note}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}