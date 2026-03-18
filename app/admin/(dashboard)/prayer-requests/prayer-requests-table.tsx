"use client"

import { useMemo, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import type { PrayerRequestRow } from "@/lib/admin-types"

const statusOptions = ["new", "reviewed", "prayed", "followed_up", "archived"]
const PAGE_SIZE = 5

function getStatusBadgeClass(status: string) {
  switch (status) {
    case "new":
      return "bg-blue-100 text-blue-700 border-blue-200"
    case "reviewed":
      return "bg-amber-100 text-amber-700 border-amber-200"
    case "prayed":
      return "bg-green-100 text-green-700 border-green-200"
    case "followed_up":
      return "bg-purple-100 text-purple-700 border-purple-200"
    case "archived":
      return "bg-gray-100 text-gray-700 border-gray-200"
    default:
      return "bg-secondary text-secondary-foreground border-border"
  }
}

export default function PrayerRequestsTable({
  initialRows,
}: {
  initialRows: PrayerRequestRow[]
}) {
  const supabase = createClient()
  const [rows, setRows] = useState(initialRows)
  const [savingId, setSavingId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [error, setError] = useState("")
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      const matchesStatus =
        statusFilter === "all" ? true : row.status === statusFilter

      const searchValue = search.trim().toLowerCase()
      const matchesSearch =
        searchValue === ""
          ? true
          : [
              row.name ?? "",
              row.email ?? "",
              row.phone ?? "",
              row.prayer_request ?? "",
              row.status ?? "",
              row.is_anonymous ? "anonymous" : "",
            ]
              .join(" ")
              .toLowerCase()
              .includes(searchValue)

      return matchesStatus && matchesSearch
    })
  }, [rows, search, statusFilter])

  const visibleRows = useMemo(
    () => filteredRows.slice(0, visibleCount),
    [filteredRows, visibleCount]
  )

  const stats = useMemo(() => {
    return {
      total: rows.length,
      newCount: rows.filter((row) => row.status === "new").length,
      prayedCount: rows.filter((row) => row.status === "prayed").length,
      archivedCount: rows.filter((row) => row.status === "archived").length,
    }
  }, [rows])

  function exportToCSV() {
    const headers = [
      "id",
      "name",
      "email",
      "phone",
      "prayer_request",
      "is_anonymous",
      "allow_contact",
      "share_with_prayer_team",
      "status",
      "created_at",
    ]

    const csvRows = filteredRows.map((row) =>
      [
        row.id,
        row.name ?? "",
        row.email ?? "",
        row.phone ?? "",
        row.prayer_request,
        row.is_anonymous ? "true" : "false",
        row.allow_contact ? "true" : "false",
        row.share_with_prayer_team ? "true" : "false",
        row.status,
        row.created_at,
      ]
        .map((value) => `"${String(value).replace(/"/g, '""')}"`)
        .join(",")
    )

    const csvContent = [headers.join(","), ...csvRows].join("\n")
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", "prayer-requests.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  async function updateStatus(id: string, status: string) {
    setSavingId(id)
    setError("")

    const { error } = await supabase
      .from("prayer_requests")
      .update({ status })
      .eq("id", id)

    if (error) {
      setError("Could not update prayer request status.")
      setSavingId(null)
      return
    }

    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, status } : row))
    )
    setSavingId(null)
  }

  async function deleteRequest(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this prayer request? This action cannot be undone."
    )

    if (!confirmed) return

    setDeletingId(id)
    setError("")

    const { error } = await supabase
      .from("prayer_requests")
      .delete()
      .eq("id", id)

    if (error) {
      setError("Could not delete prayer request.")
      setDeletingId(null)
      return
    }

    setRows((prev) => prev.filter((row) => row.id !== id))
    setDeletingId(null)
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="text-sm text-muted-foreground">Total Requests</p>
          <p className="mt-2 text-3xl font-bold text-foreground">{stats.total}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="text-sm text-muted-foreground">New</p>
          <p className="mt-2 text-3xl font-bold text-foreground">{stats.newCount}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="text-sm text-muted-foreground">Prayed</p>
          <p className="mt-2 text-3xl font-bold text-foreground">{stats.prayedCount}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="text-sm text-muted-foreground">Archived</p>
          <p className="mt-2 text-3xl font-bold text-foreground">{stats.archivedCount}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="grid gap-4 md:grid-cols-[1fr_220px_auto]">
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Search
            </label>
            <input
              type="text"
              placeholder="Search by name, email, phone, request, or status..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setVisibleCount(PAGE_SIZE)
              }}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Filter by Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value)
                setVisibleCount(PAGE_SIZE)
              }}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              <option value="all">All statuses</option>
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status.replaceAll("_", " ")}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="button"
              onClick={exportToCSV}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              Export CSV
            </button>
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
          Showing {visibleRows.length} of {filteredRows.length} filtered prayer requests
        </div>

        <div className="space-y-4">
          {visibleRows.length === 0 ? (
            <p className="text-sm text-muted-foreground">No prayer requests found.</p>
          ) : (
            visibleRows.map((row) => (
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
                        {row.status.replaceAll("_", " ")}
                      </span>
                    </div>

                    <p className="text-sm">
                      <span className="font-semibold text-foreground">Name:</span>{" "}
                      <span className="text-muted-foreground">
                        {row.is_anonymous ? "Anonymous" : row.name || "Not provided"}
                      </span>
                    </p>

                    <p className="text-sm">
                      <span className="font-semibold text-foreground">Email:</span>{" "}
                      <span className="text-muted-foreground">
                        {row.is_anonymous ? "Hidden" : row.email || "Not provided"}
                      </span>
                    </p>

                    <p className="text-sm">
                      <span className="font-semibold text-foreground">Phone:</span>{" "}
                      <span className="text-muted-foreground">
                        {row.is_anonymous ? "Hidden" : row.phone || "Not provided"}
                      </span>
                    </p>

                    <p className="text-sm">
                      <span className="font-semibold text-foreground">Share with prayer team:</span>{" "}
                      <span className="text-muted-foreground">
                        {row.share_with_prayer_team ? "Yes" : "No"}
                      </span>
                    </p>

                    <p className="text-sm">
                      <span className="font-semibold text-foreground">Allow contact:</span>{" "}
                      <span className="text-muted-foreground">
                        {row.allow_contact ? "Yes" : "No"}
                      </span>
                    </p>
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
                            {status.replaceAll("_", " ")}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      type="button"
                      onClick={() => deleteRequest(row.id)}
                      disabled={deletingId === row.id}
                      className="w-full rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 transition-colors hover:bg-red-100 disabled:opacity-60"
                    >
                      {deletingId === row.id ? "Deleting..." : "Delete Request"}
                    </button>
                  </div>
                </div>

                <div className="mt-4 rounded-xl bg-secondary p-4">
                  <p className="text-sm font-semibold text-foreground">Prayer Request</p>
                  <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
                    {row.prayer_request}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {visibleCount < filteredRows.length && (
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
              className="rounded-xl border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  )
}