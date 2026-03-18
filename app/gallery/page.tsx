"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight, Play, ImageIcon, Video } from "lucide-react"

type GalleryItem = {
  id: string
  src: string
  alt: string
  category: string
  type: "image" | "video"
  thumbnail?: string
}

const galleryItems: GalleryItem[] = [
  {
    id: "1",
    src: "/images/hero-worship.jpg",
    alt: "Fellowship gathering moment",
    category: "Fellowship",
    type: "image",
  },
  {
    id: "2",
    src: "/images/prayer-gathering.jpg",
    alt: "Prayer gathering session",
    category: "Prayer",
    type: "image",
  },
  {
    id: "3",
    src: "/images/bible-study.jpg",
    alt: "Bible study session",
    category: "Bible Study",
    type: "image",
  },
  {
    id: "4",
    src: "/images/evangelism.jpg",
    alt: "Evangelism outreach moment",
    category: "Evangelism",
    type: "image",
  },
  {
    id: "5",
    src: "/images/outreach-community.jpg",
    alt: "Community outreach activity",
    category: "Outreach",
    type: "image",
  },
  {
    id: "6",
    src: "/images/fellowship-gathering.jpg",
    alt: "Believers gathered in fellowship",
    category: "Fellowship",
    type: "image",
  },
  {
    id: "7",
    src: "/images/bible-prayer.jpg",
    alt: "Prayer and Bible reflection moment",
    category: "Prayer",
    type: "image",
  },

  // Example video-ready item structure for future admin uploads
  {
    id: "8",
    src: "/videos/outreach-highlight.mp4",
    thumbnail: "/images/outreach-community.jpg",
    alt: "Outreach highlight video",
    category: "Outreach",
    type: "video",
  },
]

const categories = [
  "All",
  "Fellowship",
  "Prayer",
  "Bible Study",
  "Evangelism",
  "Outreach",
]

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filtered = useMemo(() => {
    return selectedCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory)
  }, [selectedCategory])

  function openLightbox(index: number) {
    setLightboxIndex(index)
  }

  function closeLightbox() {
    setLightboxIndex(null)
  }

  function navigate(direction: "prev" | "next") {
    if (lightboxIndex === null || filtered.length === 0) return

    if (direction === "prev") {
      setLightboxIndex(lightboxIndex === 0 ? filtered.length - 1 : lightboxIndex - 1)
    } else {
      setLightboxIndex(lightboxIndex === filtered.length - 1 ? 0 : lightboxIndex + 1)
    }
  }

  const activeItem = lightboxIndex !== null ? filtered[lightboxIndex] : null

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <Image
          src="/images/hero-worship.jpg"
          alt="Gallery of The Good Ones International Outreach"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary/75" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-accent">
            Gallery
          </p>
          <h1 className="font-serif text-4xl font-bold text-primary-foreground sm:text-5xl lg:text-6xl text-balance">
            Photo & Video Gallery
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-primary-foreground/90">
            Explore moments from fellowship, prayer gatherings, Bible study, evangelism,
            outreach activities, and other meaningful moments in the life of the ministry.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="border-b border-border bg-background py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-primary/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Intro Note */}
      <section className="bg-background pt-10">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="leading-relaxed text-muted-foreground">
            Media uploads on this page will be managed from the admin side, making it easy to
            update photos and videos from fellowship meetings, testimonies, and outreach events.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-border bg-card px-6 py-16 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <ImageIcon className="h-7 w-7 text-primary" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-foreground">
                No media available yet
              </h2>
              <p className="mx-auto mt-3 max-w-xl leading-relaxed text-muted-foreground">
                Photos and videos for this section will appear here as they are uploaded and managed.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => openLightbox(index)}
                  className="group relative aspect-[4/3] overflow-hidden rounded-2xl text-left"
                >
                  <Image
                    src={item.type === "video" ? item.thumbnail || "/images/hero-worship.jpg" : item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/30" />

                  <div className="absolute left-4 top-4 flex items-center gap-2">
                    <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                      {item.category}
                    </span>

                    {item.type === "video" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-foreground">
                        <Video className="h-3.5 w-3.5" />
                        Video
                      </span>
                    )}
                  </div>

                  {item.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/85 shadow-lg">
                        <Play className="ml-1 h-6 w-6 text-primary" />
                      </div>
                    </div>
                  )}

                  <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 transition-opacity group-hover:opacity-100">
                    <p className="text-sm font-medium text-white">{item.alt}</p>
                    <span className="text-xs text-white/80">{item.category}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
          <button
            onClick={closeLightbox}
            className="absolute right-6 top-6 text-white transition-colors hover:text-white/80"
            aria-label="Close lightbox"
          >
            <X className="h-8 w-8" />
          </button>

          {filtered.length > 1 && (
            <>
              <button
                onClick={() => navigate("prev")}
                className="absolute left-4 text-white transition-colors hover:text-white/80"
                aria-label="Previous media"
              >
                <ChevronLeft className="h-10 w-10" />
              </button>

              <button
                onClick={() => navigate("next")}
                className="absolute right-4 text-white transition-colors hover:text-white/80"
                aria-label="Next media"
              >
                <ChevronRight className="h-10 w-10" />
              </button>
            </>
          )}

          <div className="mx-4 w-full max-w-5xl">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-black">
              {activeItem.type === "image" ? (
                <Image
                  src={activeItem.src}
                  alt={activeItem.alt}
                  fill
                  className="object-contain"
                />
              ) : (
                <video
                  src={activeItem.src}
                  controls
                  autoPlay
                  className="h-full w-full object-contain"
                />
              )}
            </div>

            <div className="mt-4 text-center">
              <p className="text-sm font-medium text-white">{activeItem.alt}</p>
              <p className="mt-1 text-xs text-white/70">{activeItem.category}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}