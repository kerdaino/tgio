"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { Send, CheckCircle, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"

type PrayerRequestFormData = {
  name: string
  email: string
  phone: string
  prayerRequest: string
  isAnonymous: boolean
  allowContact: boolean
  shareWithPrayerTeam: boolean
}

type PrayerTeamFormData = {
  name: string
  email: string
  phone: string
  location: string
  availability: string
  experience: string
  whyJoin: string
  allowContact: boolean
}

const initialPrayerRequestData: PrayerRequestFormData = {
  name: "",
  email: "",
  phone: "",
  prayerRequest: "",
  isAnonymous: false,
  allowContact: false,
  shareWithPrayerTeam: true,
}

const initialPrayerTeamData: PrayerTeamFormData = {
  name: "",
  email: "",
  phone: "",
  location: "",
  availability: "",
  experience: "",
  whyJoin: "",
  allowContact: true,
}

export default function PrayerRequestPage() {
  const searchParams = useSearchParams()
  const supabase = createClient()

  const [activeTab, setActiveTab] = useState<"request" | "join">("request")
  const [submittedType, setSubmittedType] = useState<"request" | "join" | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const [prayerRequestData, setPrayerRequestData] =
    useState<PrayerRequestFormData>(initialPrayerRequestData)

  const [prayerTeamData, setPrayerTeamData] =
    useState<PrayerTeamFormData>(initialPrayerTeamData)

  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab === "join") {
      setActiveTab("join")
    } else {
      setActiveTab("request")
    }
  }, [searchParams])

  function handlePrayerRequestChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value, type } = e.target

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked
      setPrayerRequestData((prev) => ({
        ...prev,
        [name]: checked,
      }))
      return
    }

    setPrayerRequestData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  function handlePrayerTeamChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value, type } = e.target

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked
      setPrayerTeamData((prev) => ({
        ...prev,
        [name]: checked,
      }))
      return
    }

    setPrayerTeamData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  async function handlePrayerRequestSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError("")

    try {
      const payload = {
        name: prayerRequestData.isAnonymous ? null : prayerRequestData.name || null,
        email: prayerRequestData.isAnonymous ? null : prayerRequestData.email || null,
        phone: prayerRequestData.isAnonymous ? null : prayerRequestData.phone || null,
        prayer_request: prayerRequestData.prayerRequest,
        is_anonymous: prayerRequestData.isAnonymous,
        allow_contact: prayerRequestData.isAnonymous ? false : prayerRequestData.allowContact,
        share_with_prayer_team: prayerRequestData.shareWithPrayerTeam,
      }

      const { error } = await supabase
        .from("prayer_requests")
        .insert([payload])

      if (error) {
        throw error
      }

      setSubmittedType("request")
    } catch (error) {
      console.error("Prayer request submission failed:", error)
      setSubmitError("Something went wrong while submitting your prayer request. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handlePrayerTeamSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError("")

    try {
      const payload = {
        name: prayerTeamData.name,
        email: prayerTeamData.email,
        phone: prayerTeamData.phone,
        location: prayerTeamData.location || null,
        availability: prayerTeamData.availability,
        experience: prayerTeamData.experience || null,
        why_join: prayerTeamData.whyJoin,
        allow_contact: prayerTeamData.allowContact,
      }

      const { error } = await supabase
        .from("prayer_team_applications")
        .insert([payload])

      if (error) {
        throw error
      }

      setSubmittedType("join")
    } catch (error) {
      console.error("Prayer team submission failed:", error)
      setSubmitError("Something went wrong while submitting your prayer team interest. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  function handleReset() {
    setSubmittedType(null)
    setSubmitError("")
    setPrayerRequestData(initialPrayerRequestData)
    setPrayerTeamData(initialPrayerTeamData)
  }

  return (
    <>
      <section className="relative overflow-hidden py-20 lg:py-32">
        <Image
          src="/images/bible-prayer.jpg"
          alt="Prayer and Bible"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary/75" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-accent">
            Prayer
          </p>
          <h1 className="font-serif text-4xl font-bold text-primary-foreground sm:text-5xl lg:text-6xl text-balance">
            Stand in Faith With Us
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-primary-foreground/90">
            Share your prayer needs or express your interest in joining the prayer team.
            Whether you need support or want to serve through prayer, there is a place for you here.
          </p>
        </div>
      </section>

      <section className="bg-background py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {submittedType ? (
            <div className="rounded-3xl border border-border bg-card px-6 py-12 text-center shadow-sm sm:px-10">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>

              <h2 className="mb-4 font-serif text-3xl font-bold text-foreground">
                {submittedType === "request"
                  ? "Prayer Request Received"
                  : "Prayer Team Interest Received"}
              </h2>

              <p className="mx-auto max-w-md leading-relaxed text-muted-foreground">
                {submittedType === "request"
                  ? "Thank you for sharing your prayer request. We are grateful to stand with you in faith."
                  : "Thank you for your interest in joining the prayer team. Your submission has been received and will be reviewed."}
              </p>

              <Button
                onClick={handleReset}
                className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Submit Another Response
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-10 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab("request")}
                  className={`rounded-full px-5 py-3 text-sm font-semibold transition-colors ${
                    activeTab === "request"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-primary/10"
                  }`}
                >
                  Submit Prayer Request
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("join")}
                  className={`rounded-full px-5 py-3 text-sm font-semibold transition-colors ${
                    activeTab === "join"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-primary/10"
                  }`}
                >
                  Join Prayer Team
                </button>
              </div>

              {submitError && (
                <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {submitError}
                </div>
              )}

              {activeTab === "request" ? (
                <>
                  <div className="mb-10 text-center">
                    <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl text-balance">
                      Submit Your Prayer Request
                    </h2>
                    <p className="mt-4 leading-relaxed text-muted-foreground">
                      Your request will be handled with care. You may choose to remain anonymous
                      if you prefer.
                    </p>
                  </div>

                  <form
                    onSubmit={handlePrayerRequestSubmit}
                    className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8"
                  >
                    <div className="flex flex-col gap-6">
                      <label className="flex cursor-pointer items-start gap-3">
                        <input
                          type="checkbox"
                          name="isAnonymous"
                          checked={prayerRequestData.isAnonymous}
                          onChange={handlePrayerRequestChange}
                          className="mt-1 h-5 w-5 rounded border-border text-primary focus:ring-primary"
                        />
                        <div>
                          <span className="block text-sm font-medium text-foreground">
                            Submit anonymously
                          </span>
                          <span className="block text-xs text-muted-foreground">
                            Your name and contact details will not be required if you choose this option.
                          </span>
                        </div>
                      </label>

                      {!prayerRequestData.isAnonymous && (
                        <>
                          <div className="grid gap-6 sm:grid-cols-2">
                            <div>
                              <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
                                Your Name
                              </label>
                              <input
                                type="text"
                                id="name"
                                name="name"
                                value={prayerRequestData.name}
                                onChange={handlePrayerRequestChange}
                                required={!prayerRequestData.isAnonymous}
                                placeholder="Enter your name"
                                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                              />
                            </div>

                            <div>
                              <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                                Email Address
                              </label>
                              <input
                                type="email"
                                id="email"
                                name="email"
                                value={prayerRequestData.email}
                                onChange={handlePrayerRequestChange}
                                placeholder="your@email.com"
                                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                              />
                            </div>
                          </div>

                          <div>
                            <label htmlFor="phone" className="mb-2 block text-sm font-medium text-foreground">
                              Phone / WhatsApp Number
                            </label>
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              value={prayerRequestData.phone}
                              onChange={handlePrayerRequestChange}
                              placeholder="Enter your phone number"
                              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                            />
                          </div>
                        </>
                      )}

                      <div>
                        <label
                          htmlFor="prayerRequest"
                          className="mb-2 block text-sm font-medium text-foreground"
                        >
                          Your Prayer Request
                        </label>
                        <textarea
                          id="prayerRequest"
                          name="prayerRequest"
                          value={prayerRequestData.prayerRequest}
                          onChange={handlePrayerRequestChange}
                          required
                          rows={7}
                          placeholder="Please share your prayer request here..."
                          className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                        />
                      </div>

                      <label className="flex cursor-pointer items-start gap-3">
                        <input
                          type="checkbox"
                          name="shareWithPrayerTeam"
                          checked={prayerRequestData.shareWithPrayerTeam}
                          onChange={handlePrayerRequestChange}
                          className="mt-1 h-5 w-5 rounded border-border text-primary focus:ring-primary"
                        />
                        <div>
                          <span className="block text-sm font-medium text-foreground">
                            Share with the prayer team
                          </span>
                          <span className="block text-xs text-muted-foreground">
                            Leave this checked if you want your request to be shared with those helping to pray.
                          </span>
                        </div>
                      </label>

                      {!prayerRequestData.isAnonymous && (
                        <label className="flex cursor-pointer items-start gap-3">
                          <input
                            type="checkbox"
                            name="allowContact"
                            checked={prayerRequestData.allowContact}
                            onChange={handlePrayerRequestChange}
                            className="mt-1 h-5 w-5 rounded border-border text-primary focus:ring-primary"
                          />
                          <div>
                            <span className="block text-sm font-medium text-foreground">
                              It is okay to contact me
                            </span>
                            <span className="block text-xs text-muted-foreground">
                              Check this if you are open to a follow-up message or encouragement.
                            </span>
                          </div>
                        </label>
                      )}

                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="bg-primary text-base text-primary-foreground hover:bg-primary/90 disabled:opacity-70"
                      >
                        <Send className="mr-2 h-5 w-5" />
                        {isSubmitting ? "Submitting..." : "Submit Prayer Request"}
                      </Button>
                    </div>
                  </form>
                </>
              ) : (
                <>
                  <div className="mb-10 text-center">
                    <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl text-balance">
                      Join the Prayer Team
                    </h2>
                    <p className="mt-4 leading-relaxed text-muted-foreground">
                      If you would like to serve through prayer and stand in faith with others,
                      kindly fill out the form below.
                    </p>
                  </div>

                  <form
                    onSubmit={handlePrayerTeamSubmit}
                    className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8"
                  >
                    <div className="flex flex-col gap-6">
                      <div className="grid gap-6 sm:grid-cols-2">
                        <div>
                          <label htmlFor="team-name" className="mb-2 block text-sm font-medium text-foreground">
                            Full Name
                          </label>
                          <input
                            type="text"
                            id="team-name"
                            name="name"
                            value={prayerTeamData.name}
                            onChange={handlePrayerTeamChange}
                            required
                            placeholder="Enter your name"
                            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                          />
                        </div>

                        <div>
                          <label htmlFor="team-email" className="mb-2 block text-sm font-medium text-foreground">
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="team-email"
                            name="email"
                            value={prayerTeamData.email}
                            onChange={handlePrayerTeamChange}
                            required
                            placeholder="your@email.com"
                            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                          />
                        </div>
                      </div>

                      <div className="grid gap-6 sm:grid-cols-2">
                        <div>
                          <label htmlFor="team-phone" className="mb-2 block text-sm font-medium text-foreground">
                            Phone / WhatsApp Number
                          </label>
                          <input
                            type="tel"
                            id="team-phone"
                            name="phone"
                            value={prayerTeamData.phone}
                            onChange={handlePrayerTeamChange}
                            required
                            placeholder="Enter your phone number"
                            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                          />
                        </div>

                        <div>
                          <label htmlFor="location" className="mb-2 block text-sm font-medium text-foreground">
                            Location
                          </label>
                          <input
                            type="text"
                            id="location"
                            name="location"
                            value={prayerTeamData.location}
                            onChange={handlePrayerTeamChange}
                            placeholder="City / State / Country"
                            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="availability" className="mb-2 block text-sm font-medium text-foreground">
                          Availability
                        </label>
                        <select
                          id="availability"
                          name="availability"
                          value={prayerTeamData.availability}
                          onChange={handlePrayerTeamChange}
                          required
                          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                        >
                          <option value="" disabled>
                            Select your availability
                          </option>
                          <option value="weekdays">Weekdays</option>
                          <option value="weekends">Weekends</option>
                          <option value="both">Both Weekdays and Weekends</option>
                          <option value="flexible">Flexible</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="experience" className="mb-2 block text-sm font-medium text-foreground">
                          Prayer / Ministry Experience (optional)
                        </label>
                        <textarea
                          id="experience"
                          name="experience"
                          value={prayerTeamData.experience}
                          onChange={handlePrayerTeamChange}
                          rows={4}
                          placeholder="Share any relevant prayer, ministry, or service experience..."
                          className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                        />
                      </div>

                      <div>
                        <label htmlFor="whyJoin" className="mb-2 block text-sm font-medium text-foreground">
                          Why would you like to join the prayer team?
                        </label>
                        <textarea
                          id="whyJoin"
                          name="whyJoin"
                          value={prayerTeamData.whyJoin}
                          onChange={handlePrayerTeamChange}
                          required
                          rows={5}
                          placeholder="Tell us why you would like to serve through prayer..."
                          className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                        />
                      </div>

                      <label className="flex cursor-pointer items-start gap-3">
                        <input
                          type="checkbox"
                          name="allowContact"
                          checked={prayerTeamData.allowContact}
                          onChange={handlePrayerTeamChange}
                          className="mt-1 h-5 w-5 rounded border-border text-primary focus:ring-primary"
                        />
                        <div>
                          <span className="block text-sm font-medium text-foreground">
                            It is okay to contact me
                          </span>
                          <span className="block text-xs text-muted-foreground">
                            Leave this checked if you are open to follow-up regarding prayer team service.
                          </span>
                        </div>
                      </label>

                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="bg-primary text-base text-primary-foreground hover:bg-primary/90 disabled:opacity-70"
                      >
                        <Users className="mr-2 h-5 w-5" />
                        {isSubmitting ? "Submitting..." : "Join Prayer Team"}
                      </Button>
                    </div>
                  </form>
                </>
              )}
            </>
          )}
        </div>
      </section>

      <section className="bg-secondary py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <blockquote className="font-serif text-2xl font-medium italic leading-relaxed text-foreground sm:text-3xl">
            &ldquo;Do not be anxious about anything, but in every situation, by prayer and petition,
            with thanksgiving, present your requests to God.&rdquo;
          </blockquote>
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Philippians 4:6
          </p>
        </div>
      </section>
    </>
  )
}