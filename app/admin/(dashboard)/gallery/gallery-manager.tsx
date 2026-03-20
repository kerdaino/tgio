"use client"

import { useState } from "react"
import Image from "next/image"
import { createClient } from "@/lib/supabase/client"
import type { GalleryItemRow } from "@/lib/admin-types"

type FormState = {
  title: string
  alt: string
  category: string
  mediaType: "image" | "video"
  sortOrder: string
  isPublished: boolean
  thumbnailUrl: string
}

const initialForm: FormState = {
  title: "",
  alt: "",
  category: "Fellowship",
  mediaType: "image",
  sortOrder: "0",
  isPublished: true,
  thumbnailUrl: "",
}

const categories = [
  "Fellowship",
  "Prayer",
  "Bible Study",
  "Evangelism",
  "Outreach",
]

export default function GalleryManager({
  initialItems,
}: {
  initialItems: GalleryItemRow[]
}) {
  const supabase = createClient()

  const [items, setItems] = useState<GalleryItemRow[]>(initialItems)
  const [form, setForm] = useState<FormState>(initialForm)
  const [file, setFile] = useState<File | null>(null)
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
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

  async function uploadFileToBucket(selectedFile: File, folder: string) {
    const fileExt = selectedFile.name.split(".").pop()
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`

    const { error } = await supabase.storage
      .from("gallery")
      .upload(fileName, selectedFile, {
        upsert: false,
      })

    if (error) throw error

    const { data } = supabase.storage.from("gallery").getPublicUrl(fileName)
    return data.publicUrl
  }

  async function handleAddItem() {
    if (!file) {
      setErrorMessage("Please select a file to upload.")
      return
    }

    setLoading(true)
    setSuccess("")
    setErrorMessage("")

    try {
      const fileUrl = await uploadFileToBucket(file, form.mediaType === "image" ? "images" : "videos")

      let thumbnailUrl: string | null = null

      if (form.mediaType === "video") {
        if (thumbnailFile) {
          thumbnailUrl = await uploadFileToBucket(thumbnailFile, "thumbnails")
        } else if (form.thumbnailUrl.trim()) {
          thumbnailUrl = form.thumbnailUrl.trim()
        }
      }

      const { data, error } = await supabase
        .from("gallery_items")
        .insert([
          {
            title: form.title || null,
            alt: form.alt,
            category: form.category,
            media_type: form.mediaType,
            file_url: fileUrl,
            thumbnail_url: thumbnailUrl,
            is_published: form.isPublished,
            sort_order: Number(form.sortOrder) || 0,
          },
        ])
        .select()
        .single()

      if (error) throw error

      setItems((prev) => [data, ...prev])
      setForm(initialForm)
      setFile(null)
      setThumbnailFile(null)
      setSuccess("Gallery item added successfully.")
    } catch (error) {
      console.error(error)
      setErrorMessage("Failed to upload gallery item.")
    } finally {
      setLoading(false)
    }
  }

  async function handleTogglePublished(id: string, isPublished: boolean) {
    const { error } = await supabase
      .from("gallery_items")
      .update({ is_published: !isPublished })
      .eq("id", id)

    if (error) {
      setErrorMessage("Failed to update publish status.")
      return
    }

    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, is_published: !isPublished } : item
      )
    )
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm("Delete this gallery item?")
    if (!confirmed) return

    const { error } = await supabase
      .from("gallery_items")
      .delete()
      .eq("id", id)

    if (error) {
      setErrorMessage("Failed to delete gallery item.")
      return
    }

    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
        <h3 className="text-xl font-bold text-foreground">Add New Media</h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title (optional)"
            className="w-full rounded-xl border p-3"
          />

          <input
            name="alt"
            value={form.alt}
            onChange={handleChange}
            placeholder="Alt text / description"
            className="w-full rounded-xl border p-3"
          />

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

          <select
            name="mediaType"
            value={form.mediaType}
            onChange={handleChange}
            className="w-full rounded-xl border p-3"
          >
            <option value="image">Image</option>
            <option value="video">Video</option>
          </select>

          <input
            name="sortOrder"
            value={form.sortOrder}
            onChange={handleChange}
            type="number"
            placeholder="Sort order"
            className="w-full rounded-xl border p-3"
          />

          <label className="flex items-center gap-3 rounded-xl border p-3">
            <input
              type="checkbox"
              name="isPublished"
              checked={form.isPublished}
              onChange={handleChange}
            />
            <span className="text-sm">Published</span>
          </label>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">
            Upload file
          </label>
          <input
            type="file"
            accept={form.mediaType === "image" ? "image/*" : "video/*"}
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full rounded-xl border p-3"
          />
        </div>

        {form.mediaType === "video" && (
          <>
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Upload thumbnail (optional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
                className="w-full rounded-xl border p-3"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Or thumbnail URL (optional)
              </label>
              <input
                name="thumbnailUrl"
                value={form.thumbnailUrl}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full rounded-xl border p-3"
              />
            </div>
          </>
        )}

        <button
          type="button"
          onClick={handleAddItem}
          className="rounded-xl bg-primary px-6 py-3 text-white"
        >
          {loading ? "Uploading..." : "Add Media"}
        </button>

        {success && <p className="text-green-600">{success}</p>}
        {errorMessage && <p className="text-red-600">{errorMessage}</p>}
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <h3 className="mb-4 text-xl font-bold text-foreground">Existing Media</h3>

        <div className="space-y-4">
          {items.length === 0 ? (
            <p className="text-sm text-muted-foreground">No gallery items yet.</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="rounded-2xl border border-border p-4">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="flex gap-4">
                    <div className="relative h-24 w-32 overflow-hidden rounded-xl bg-secondary">
                      <Image
                        src={item.media_type === "video" ? item.thumbnail_url || "/images/hero-worship.jpg" : item.file_url}
                        alt={item.alt}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="space-y-1 text-sm">
                      <p><span className="font-semibold">Title:</span> {item.title || "—"}</p>
                      <p><span className="font-semibold">Alt:</span> {item.alt}</p>
                      <p><span className="font-semibold">Category:</span> {item.category}</p>
                      <p><span className="font-semibold">Type:</span> {item.media_type}</p>
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
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}