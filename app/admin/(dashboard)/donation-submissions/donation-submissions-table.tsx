"use client"

import { useMemo, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import type { DonationSubmissionRow } from "@/lib/admin-types"

const statusOptions = ["pending", "confirmed", "reviewed", "archived"]

function getStatusBadgeClass(status: string) {
  switch (status) {
    case "pending":
      return "bg-amber-100 text-amber-700 border-amber-200"
    case "confirmed":
      return "bg-green-100 text-green-700 border-green-200"
    case "reviewed":
      return "bg-blue-100 text-blue-700 border-blue-200"
    case "archived":
      return "bg-gray-100 text-gray-700 border-gray-200"
    default:
      return "bg-secondary text-secondary-foreground border-border"
  }
}

export default function DonationSubmissionsTable({
  initialRows,
}: {
  initialRows: DonationSubmissionRow[]
}) {
  const supabase = createClient()
  const [rows, setRows] = useState(initialRows)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [savingId, setSavingId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [error, setError] = useState("")

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      const matchesStatus = statusFilter === "all" ? true : row.status === statusFilter
      const searchValue = search.trim().toLowerCase()

      const matchesSearch =
        searchValue === ""
          ? true
          : [
              row.full_name,
              row.email,
              row.phone ?? "",
              row.currency,
              row.payment_reference,
              row.message ?? "",
              row.proof_note ?? "",
              row.status,
            ]
              .join(" ")
              .toLowerCase()
              .includes(searchValue)

      return matchesStatus && matchesSearch
    })
  }, [rows, search, statusFilter])

  async function updateStatus(id: string, status: string) {
    setSavingId(id)
    setError("")

    const { error } = await supabase
      .from("donation_submissions")
      .update({ status })
      .eq("id", id)

    if (error) {
      setError("Could not update donation status.")
      setSavingId(null)
      return
    }

    setRows((prev) => prev.map((row) => (row.id === id ? { ...row, status } : row)))
    setSavingId(null)
  }

  async function deleteSubmission(id: string) {
    const confirmed = window.confirm("Delete this donation submission?")
    if (!confirmed) return

    setDeletingId(id)
    setError("")

    const { error } = await supabase
      .from("donation_submissions")
      .delete()
      .eq("id", id)

    if (error) {
      setError("Could not delete donation submission.")
      setDeletingId(null)
      return
    }

    setRows((prev) => prev.filter((row) => row.id !== id))
    setDeletingId(null)
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="grid gap-4 md:grid-cols-[1fr_220px]">
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Search
            </label>
            <input
              type="text"
              placeholder="Search by name, email, currency, reference..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Filter by Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              <option value="all">All statuses</option>
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="mb-4 text-sm text-muted-foreground">
          Showing {filteredRows.length} of {rows.length} donation submissions
        </div>

        <div className="space-y-4">
          {filteredRows.length === 0 ? (
            <p className="text-sm text-muted-foreground">No donation submissions found.</p>
          ) : (
            filteredRows.map((row) => (
              <div key={row.id} className="rounded-2xl border border-border p-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm text-muted-foreground">
                        Submitted: {new Date(row.created_at).toLocaleString()}
                      </p>
                      <span
                        className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${getStatusBadgeClass(
                          row.status
                        )}`}
                      >
                        {row.status}
                      </span>
                    </div>

                    <p className="text-sm"><span className="font-semibold">Name:</span> {row.full_name}</p>
                    <p className="text-sm"><span className="font-semibold">Email:</span> {row.email}</p>
                    <p className="text-sm"><span className="font-semibold">Phone:</span> {row.phone || "Not provided"}</p>
                    <p className="text-sm"><span className="font-semibold">Currency:</span> {row.currency}</p>
                    <p className="text-sm"><span className="font-semibold">Amount:</span> {row.amount}</p>
                    <p className="text-sm"><span className="font-semibold">Reference:</span> {row.payment_reference}</p>
                  </div>

                  <div className="min-w-[220px] space-y-3">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-foreground">
                        Status
                      </label>
                      <select
                        value={row.status}
                        onChange={(e) => updateStatus(row.id, e.target.value)}
                        disabled={savingId === row.id}
                        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      type="button"
                      onClick={() => deleteSubmission(row.id)}
                      disabled={deletingId === row.id}
                      className="w-full rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 hover:bg-red-100 disabled:opacity-60"
                    >
                      {deletingId === row.id ? "Deleting..." : "Delete Submission"}
                    </button>
                  </div>
                </div>

                {row.message && (
                  <div className="mt-4 rounded-xl bg-secondary p-4">
                    <p className="text-sm font-semibold text-foreground">Message</p>
                    <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
                      {row.message}
                    </p>
                  </div>
                )}

                {row.proof_note && (
                  <div className="mt-4 rounded-xl bg-secondary p-4">
                    <p className="text-sm font-semibold text-foreground">Proof Note</p>
                    <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
                      {row.proof_note}
                    </p>
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