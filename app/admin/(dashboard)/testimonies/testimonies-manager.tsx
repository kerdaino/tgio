"use client"

import { useState } from "react"
import Image from "next/image"
import { createClient } from "@/lib/supabase/client"
import type { TestimonyRow } from "@/lib/admin-types"

type FormState = {
  category: string
  title: string
  story: string
  name: string
  meta: string
  image_url: string
  is_published: boolean
}

const categories = [
  "Answered Prayer",
  "Spiritual Growth",
  "Outreach Impact",
  "Encouragement",
]

const initialForm: FormState = {
  category: "Answered Prayer",
  title: "",
  story: "",
  name: "",
  meta: "",
  image_url: "",
  is_published: true,
}

export default function TestimoniesManager({
  initialItems,
}: {
  initialItems: TestimonyRow[]
}) {
  const supabase = createClient()

  const [items, setItems] = useState<TestimonyRow[]>(initialItems)
  const [form, setForm] = useState<FormState>(initialForm)
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

  async function handleAddTestimony() {
    setLoading(true)
    setSuccess("")
    setErrorMessage("")

    const { data, error } = await supabase
      .from("testimonies")
      .insert([
        {
          category: form.category,
          title: form.title,
          story: form.story,
          name: form.name,
          meta: form.meta || null,
          image_url: form.image_url || null,
          is_published: form.is_published,
        },
      ])
      .select()
      .single()

    if (error) {
      setErrorMessage("Failed to add testimony.")
    } else if (data) {
      setItems((prev) => [data, ...prev])
      setForm(initialForm)
      setSuccess("Testimony added successfully.")
    }

    setLoading(false)
  }

  async function handleTogglePublished(id: string, isPublished: boolean) {
    const { error } = await supabase
      .from("testimonies")
      .update({ is_published: !isPublished })
      .eq("id", id)

    if (error) {
      setErrorMessage("Failed to update testimony status.")
      return
    }

    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, is_published: !isPublished } : item
      )
    )
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm("Delete this testimony?")
    if (!confirmed) return

    const { error } = await supabase
      .from("testimonies")
      .delete()
      .eq("id", id)

    if (error) {
      setErrorMessage("Failed to delete testimony.")
      return
    }

    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
        <h3 className="text-xl font-bold text-foreground">Add New Testimony</h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full rounded-xl border p-3"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full rounded-xl border p-3"
          />

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full rounded-xl border p-3"
          />

          <input
            name="meta"
            value={form.meta}
            onChange={handleChange}
            placeholder="Meta (e.g. Prayer & Faith)"
            className="w-full rounded-xl border p-3"
          />
        </div>

        <input
          name="image_url"
          value={form.image_url}
          onChange={handleChange}
          placeholder="Image URL (optional)"
          className="w-full rounded-xl border p-3"
        />

        <textarea
          name="story"
          value={form.story}
          onChange={handleChange}
          placeholder="Write the testimony here..."
          className="w-full rounded-xl border p-3"
          rows={7}
        />

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            name="is_published"
            checked={form.is_published}
            onChange={handleChange}
          />
          <span className="text-sm text-foreground">Publish immediately</span>
        </label>

        <button
          type="button"
          onClick={handleAddTestimony}
          className="rounded-xl bg-primary px-6 py-3 text-white"
        >
          {loading ? "Saving..." : "Add Testimony"}
        </button>

        {success && <p className="text-green-600">{success}</p>}
        {errorMessage && <p className="text-red-600">{errorMessage}</p>}
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <h3 className="mb-4 text-xl font-bold text-foreground">Existing Testimonies</h3>

        <div className="space-y-4">
          {items.length === 0 ? (
            <p className="text-sm text-muted-foreground">No testimonies yet.</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="rounded-2xl border border-border p-4">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="flex gap-4">
                    <div className="relative h-24 w-32 overflow-hidden rounded-xl bg-secondary">
                      <Image
                        src={item.image_url || "/images/hero-worship.jpg"}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="space-y-1 text-sm">
                      <p><span className="font-semibold">Category:</span> {item.category}</p>
                      <p><span className="font-semibold">Title:</span> {item.title}</p>
                      <p><span className="font-semibold">Name:</span> {item.name}</p>
                      <p><span className="font-semibold">Meta:</span> {item.meta || "—"}</p>
                      <p><span className="font-semibold">Published:</span> {item.is_published ? "Yes" : "No"}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => handleTogglePublished(item.id, item.is_published)}
                      className="rounded-xl border px-4 py-2 text-sm"
                    >
                      {item.is_published ? "Unpublish" : "Publish"}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div className="mt-4 rounded-xl bg-secondary p-4">
                  <p className="text-sm font-semibold text-foreground">Story</p>
                  <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
                    {item.story}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}