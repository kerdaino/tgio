import { Suspense } from "react"
import PrayerRequestClientPage from "./prayer-request-client-page"

export default function PrayerRequestPage() {
  return (
    <Suspense fallback={<PrayerRequestFallback />}>
      <PrayerRequestClientPage />
    </Suspense>
  )
}

function PrayerRequestFallback() {
  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <div className="space-y-4 animate-pulse">
            <div className="h-8 w-56 rounded bg-secondary" />
            <div className="h-4 w-full rounded bg-secondary" />
            <div className="h-4 w-5/6 rounded bg-secondary" />
            <div className="h-12 w-full rounded bg-secondary" />
            <div className="h-12 w-full rounded bg-secondary" />
            <div className="h-40 w-full rounded bg-secondary" />
          </div>
        </div>
      </div>
    </section>
  )
}