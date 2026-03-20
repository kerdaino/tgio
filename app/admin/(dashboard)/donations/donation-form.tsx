"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"

type DonationSettingsForm = {
  id?: string
  donation_message: string
}

const emptyForm: DonationSettingsForm = {
  donation_message: "",
}

export default function DonationForm({ initialData }: { initialData: any }) {
  const supabase = createClient()

  const [form, setForm] = useState<DonationSettingsForm>({
    id: initialData?.id,
    donation_message: initialData?.donation_message || "",
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSave() {
    setLoading(true)
    setSuccess("")
    setErrorMessage("")

    let error

    if (form.id) {
      const result = await supabase
        .from("donation_settings")
        .update({
          donation_message: form.donation_message,
        })
        .eq("id", form.id)

      error = result.error
    } else {
      const result = await supabase
        .from("donation_settings")
        .insert([
          {
            donation_message: form.donation_message,
          },
        ])
        .select()
        .single()

      error = result.error

      if (!error && result.data) {
        setForm({
          id: result.data.id,
          donation_message: result.data.donation_message || "",
        })
      }
    }

    if (error) {
      setErrorMessage("Failed to save donation settings.")
    } else {
      setSuccess("Saved successfully")
    }

    setLoading(false)
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Donation Settings</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Manage the general donation message shown on the public donation page.
        </p>
      </div>

      <div>
        <label
          htmlFor="donation_message"
          className="mb-2 block text-sm font-medium text-foreground"
        >
          Donation Message
        </label>
        <textarea
          id="donation_message"
          name="donation_message"
          value={form.donation_message}
          onChange={handleChange}
          placeholder="Write the general donation message shown to donors..."
          className="w-full rounded-xl border p-3"
          rows={5}
        />
      </div>

      <button
        onClick={handleSave}
        className="rounded-xl bg-primary px-6 py-3 text-white"
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>

      {success && <p className="text-green-600">{success}</p>}
      {errorMessage && <p className="text-red-600">{errorMessage}</p>}
    </div>
  )
}