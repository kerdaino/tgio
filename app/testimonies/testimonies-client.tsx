"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Quote, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

type TestimonyItem = {
  id: string
  category: string
  title: string
  story: string
  name: string
  meta: string | null
  image_url: string | null
}

const categories = [
  "All",
  "Answered Prayer",
  "Spiritual Growth",
  "Outreach Impact",
  "Encouragement",
]

export default function TestimoniesClient({ items }: { items: TestimonyItem[] }) {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredItems = useMemo(() => {
    return selectedCategory === "All"
      ? items
      : items.filter((item) => item.category === selectedCategory)
  }, [items, selectedCategory])

  return (
    <>
      <section className="relative overflow-hidden py-20 lg:py-32">
        <Image
          src="/images/hero-worship.jpg"
          alt="Worship gathering"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary/75" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-accent">
            Testimonies
          </p>
          <h1 className="font-serif text-4xl font-bold text-primary-foreground sm:text-5xl lg:text-6xl text-balance">
            Stories of God’s Faithfulness
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-primary-foreground/90">
            Testimonies remind us that God is still moving. This page is dedicated to
            stories of answered prayers, spiritual growth, encouragement, and lives touched
            through faith and outreach.
          </p>
        </div>
      </section>

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

      <section className="bg-background pt-12">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="leading-relaxed text-muted-foreground">
            Real testimonies shared through the ministry are published here to glorify God and encourage others.
          </p>
        </div>
      </section>

      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {filteredItems.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-border bg-card px-6 py-16 text-center">
              <h2 className="font-serif text-2xl font-bold text-foreground">
                No testimonies available yet
              </h2>
              <p className="mx-auto mt-3 max-w-xl leading-relaxed text-muted-foreground">
                Published testimonies will appear here as they are added and approved.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredItems.map((testimony) => (
                <article
                  key={testimony.id}
                  className="group overflow-hidden rounded-2xl border border-border bg-card"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={testimony.image_url || "/images/hero-worship.jpg"}
                      alt={testimony.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute left-4 top-4">
                      <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                        {testimony.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <Quote className="h-4 w-4 text-primary" />
                    </div>

                    <h2 className="mb-3 font-serif text-xl font-bold text-foreground">
                      {testimony.title}
                    </h2>

                    <p className="mb-6 line-clamp-5 text-sm leading-relaxed text-foreground">
                      {testimony.story}
                    </p>

                    <div className="border-t border-border pt-4">
                      <p className="text-sm font-semibold text-foreground">{testimony.name}</p>
                      <p className="text-xs text-muted-foreground">{testimony.meta || "Faith Journey"}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-secondary py-16 text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-foreground sm:text-3xl text-balance">
            Has God Done Something in Your Life?
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Share your testimony to encourage others in their faith journey and give glory to God.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/contact">
                Share Your Testimony
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button asChild variant="outline">
              <a href="mailto:thegoodonesoutreach@gmail.com?subject=My Testimony">
                Email Your Testimony
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}