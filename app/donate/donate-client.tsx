"use client"


import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import {
  Heart,
  BookOpen,
  Users,
  Globe,
  CheckCircle,
  ArrowRight,
  Copy,
} from "lucide-react"
import { Button } from "@/components/ui/button"

type CurrencyCode = "NGN" | "USD" | "EUR" | "GBP"

type DonationFormData = {
  fullName: string
  email: string
  phone: string
  currency: CurrencyCode
  amount: string
  message: string
  paymentReference: string
  proofNote: string
}

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

const impactAreas = [
  {
    icon: Heart,
    title: "Prayer Ministry",
    description:
      "Support prayer-focused ministry efforts that encourage believers and strengthen lives through faith.",
  },
  {
    icon: BookOpen,
    title: "Bible Study Resources",
    description:
      "Help provide study materials, teaching support, and resources that aid spiritual growth.",
  },
  {
    icon: Globe,
    title: "Evangelism Outreach",
    description:
      "Support gospel-centered outreach efforts that take the message of Christ to more people and places.",
  },
  {
    icon: Users,
    title: "Community Service",
    description:
      "Help support acts of compassion, care, and practical service within communities.",
  },
]

const currencyPresets: Record<CurrencyCode, number[]> = {
  NGN: [5000, 10000, 25000, 50000, 100000],
  USD: [10, 25, 50, 100, 250],
  EUR: [10, 25, 50, 100, 250],
  GBP: [10, 25, 50, 100, 250],
}

const currencySymbols: Record<CurrencyCode, string> = {
  NGN: "₦",
  USD: "$",
  EUR: "€",
  GBP: "£",
}

const initialFormData: DonationFormData = {
  fullName: "",
  email: "",
  phone: "",
  currency: "NGN",
  amount: "25000",
  message: "",
  paymentReference: "",
  proofNote: "",
}

export default function DonateClient({
  donationSettings,
  donationAccounts,
}: {
  donationSettings: any
  donationAccounts: DonationAccount[]
}) {
  const supabase = createClient()  
  const [formData, setFormData] = useState<DonationFormData>(initialFormData)
  const [selectedAmount, setSelectedAmount] = useState<number | null>(25000)
  const [showAccountDetails, setShowAccountDetails] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [copiedField, setCopiedField] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const presets = currencyPresets[formData.currency]

  const activeAmount = useMemo(() => {
    if (selectedAmount !== null) return selectedAmount
    const parsed = parseFloat(formData.amount)
    return Number.isFinite(parsed) ? parsed : 0
  }, [selectedAmount, formData.amount])

  const activeAccount = useMemo(() => {
    return (
      donationAccounts.find(
        (account) => account.currency?.toUpperCase() === formData.currency
      ) || null
    )
  }, [donationAccounts, formData.currency])

  function handleAmountClick(amount: number) {
    setSelectedAmount(amount)
    setFormData((prev) => ({
      ...prev,
      amount: String(amount),
    }))
  }

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target

    if (name === "currency") {
      const nextCurrency = value as CurrencyCode
      const defaultAmount = currencyPresets[nextCurrency][2]

      setFormData((prev) => ({
        ...prev,
        currency: nextCurrency,
        amount: String(defaultAmount),
      }))
      setSelectedAmount(defaultAmount)
      setShowAccountDetails(false)
      return
    }

    if (name === "amount") {
      setSelectedAmount(null)
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  function handleContinueToAccountDetails(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setShowAccountDetails(true)
  }

  async function handleFinalSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault()
  setIsSubmitting(true)

  try {
    const { error } = await supabase
      .from("donation_submissions")
      .insert([
        {
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone || null,
          currency: formData.currency,
          amount: activeAmount,
          message: formData.message || null,
          payment_reference: formData.paymentReference,
          proof_note: formData.proofNote || null,
        },
      ])

    if (error) {
      throw error
    }

    setSubmitted(true)
  } catch (error) {
    console.error("Donation submission failed:", error)
  } finally {
    setIsSubmitting(false)
  }
}

  async function copyText(value: string, label: string) {
    try {
      await navigator.clipboard.writeText(value)
      setCopiedField(label)
      setTimeout(() => setCopiedField(""), 2000)
    } catch (error) {
      console.error("Copy failed:", error)
    }
  }

  function resetDonationFlow() {
    setFormData(initialFormData)
    setSelectedAmount(25000)
    setShowAccountDetails(false)
    setSubmitted(false)
  }

  const noAccountConfigured = !activeAccount

  return (
    <>
      <section className="relative overflow-hidden py-20 lg:py-32">
        <Image
          src="/images/donation-hero.jpg"
          alt="Support the mission through giving"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary/75" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-accent">
            Support the Mission
          </p>
          <h1 className="font-serif text-4xl font-bold text-primary-foreground sm:text-5xl lg:text-6xl text-balance">
            Give to Support the Work
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-primary-foreground/90">
            Your giving helps support prayer, Bible study, evangelism, and community service.
            Every gift is a meaningful contribution toward the mission.
          </p>
        </div>
      </section>

      <section className="bg-background py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              {submitted ? (
                <div className="rounded-3xl border border-border bg-card p-8 text-center shadow-sm">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <CheckCircle className="h-8 w-8 text-primary" />
                  </div>

                  <h2 className="mb-4 font-serif text-3xl font-bold text-foreground">
                    Thank You for Your Support
                  </h2>

                  <p className="mx-auto max-w-md leading-relaxed text-muted-foreground">
                    Your donation details have been submitted successfully. Thank you for your generosity and support.
                  </p>

                  <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <Button
                      onClick={resetDonationFlow}
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      Make Another Donation
                    </Button>

                    <Button asChild variant="outline">
                      <Link href="/">Return Home</Link>
                    </Button>
                  </div>
                </div>
              ) : !showAccountDetails ? (
                <>
                  <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-accent">
                    Make a Donation
                  </p>
                  <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl text-balance">
                    Choose Your Currency and Amount
                  </h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    Fill in your details, select your preferred currency, and choose the amount
                    you would like to donate. You will then see the account details for payment.
                  </p>

                  <form onSubmit={handleContinueToAccountDetails} className="mt-8 flex flex-col gap-6">
                    <div>
                      <label htmlFor="currency" className="mb-2 block text-sm font-medium text-foreground">
                        Select Currency
                      </label>
                      <select
                        id="currency"
                        name="currency"
                        value={formData.currency}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                      >
                        <option value="NGN">Nigerian Naira (NGN)</option>
                        <option value="USD">US Dollar (USD)</option>
                        <option value="EUR">Euro (EUR)</option>
                        <option value="GBP">British Pound (GBP)</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-3 block text-sm font-medium text-foreground">
                        Select Amount
                      </label>
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                        {presets.map((amount) => (
                          <button
                            key={`${formData.currency}-${amount}`}
                            type="button"
                            onClick={() => handleAmountClick(amount)}
                            className={`rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${
                              selectedAmount === amount
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border bg-card text-foreground hover:border-primary/50"
                            }`}
                          >
                            {currencySymbols[formData.currency]}
                            {amount.toLocaleString()}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="amount" className="mb-2 block text-sm font-medium text-foreground">
                        Or enter a custom amount
                      </label>
                      <input
                        type="number"
                        id="amount"
                        name="amount"
                        value={formData.amount}
                        onChange={handleInputChange}
                        required
                        min="1"
                        placeholder="Enter amount"
                        className="w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="fullName" className="mb-2 block text-sm font-medium text-foreground">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required
                          placeholder="Your name"
                          className="w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
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
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="your@email.com"
                          className="w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
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
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                        className="w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
                        Message (optional)
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Add a note with your donation..."
                        className="w-full resize-none rounded-xl border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={activeAmount <= 0}
                      className="bg-accent text-base text-accent-foreground hover:bg-accent/90 disabled:opacity-50"
                    >
                      <Heart className="mr-2 h-5 w-5" />
                      Continue to Payment Details
                    </Button>
                  </form>
                </>
              ) : (
                <>
                  <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-accent">
                    Payment Details
                  </p>
                  <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl text-balance">
                    Transfer Using the Account Details Below
                  </h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    Please transfer{" "}
                    <span className="font-semibold text-foreground">
                      {currencySymbols[formData.currency]}
                      {activeAmount.toLocaleString()}
                    </span>{" "}
                    using the account details below, then submit your payment reference and proof note.
                  </p>

                  {noAccountConfigured ? (
                    <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-800">
                      No active donation account has been configured for {formData.currency} yet.
                    </div>
                  ) : (
                    <div className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-sm">
                      <div className="space-y-5">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Currency</p>
                          <p className="mt-1 text-lg font-semibold text-foreground">{formData.currency}</p>
                        </div>

                        {activeAccount?.account_label && (
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Account Label</p>
                            <p className="mt-1 text-lg font-semibold text-foreground">{activeAccount.account_label}</p>
                          </div>
                        )}

                        {activeAccount?.bank_name && (
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Bank Name</p>
                            <div className="mt-1 flex items-center justify-between gap-3">
                              <p className="text-lg font-semibold text-foreground">{activeAccount.bank_name}</p>
                              <button
                                type="button"
                                onClick={() => copyText(activeAccount.bank_name || "", "bank")}
                                className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-xs font-medium text-foreground hover:bg-secondary"
                              >
                                <Copy className="h-4 w-4" />
                                {copiedField === "bank" ? "Copied" : "Copy"}
                              </button>
                            </div>
                          </div>
                        )}

                        {activeAccount?.account_name && (
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Account Name</p>
                            <div className="mt-1 flex items-center justify-between gap-3">
                              <p className="text-lg font-semibold text-foreground">{activeAccount.account_name}</p>
                              <button
                                type="button"
                                onClick={() => copyText(activeAccount.account_name || "", "account-name")}
                                className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-xs font-medium text-foreground hover:bg-secondary"
                              >
                                <Copy className="h-4 w-4" />
                                {copiedField === "account-name" ? "Copied" : "Copy"}
                              </button>
                            </div>
                          </div>
                        )}

                        {activeAccount?.account_number && (
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Account Number / Details</p>
                            <div className="mt-1 flex items-center justify-between gap-3">
                              <p className="text-lg font-semibold break-all text-foreground">
                                {activeAccount.account_number}
                              </p>
                              <button
                                type="button"
                                onClick={() => copyText(activeAccount.account_number || "", "account-number")}
                                className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-xs font-medium text-foreground hover:bg-secondary"
                              >
                                <Copy className="h-4 w-4" />
                                {copiedField === "account-number" ? "Copied" : "Copy"}
                              </button>
                            </div>
                          </div>
                        )}

                        {activeAccount?.iban && (
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">IBAN</p>
                            <div className="mt-1 flex items-center justify-between gap-3">
                              <p className="text-lg font-semibold break-all text-foreground">{activeAccount.iban}</p>
                              <button
                                type="button"
                                onClick={() => copyText(activeAccount.iban || "", "iban")}
                                className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-xs font-medium text-foreground hover:bg-secondary"
                              >
                                <Copy className="h-4 w-4" />
                                {copiedField === "iban" ? "Copied" : "Copy"}
                              </button>
                            </div>
                          </div>
                        )}

                        {activeAccount?.swift_code && (
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">SWIFT Code</p>
                            <div className="mt-1 flex items-center justify-between gap-3">
                              <p className="text-lg font-semibold break-all text-foreground">{activeAccount.swift_code}</p>
                              <button
                                type="button"
                                onClick={() => copyText(activeAccount.swift_code || "", "swift")}
                                className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-xs font-medium text-foreground hover:bg-secondary"
                              >
                                <Copy className="h-4 w-4" />
                                {copiedField === "swift" ? "Copied" : "Copy"}
                              </button>
                            </div>
                          </div>
                        )}

                        {activeAccount?.routing_number && (
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Routing Number</p>
                            <p className="mt-1 text-lg font-semibold text-foreground">{activeAccount.routing_number}</p>
                          </div>
                        )}

                        {activeAccount?.sort_code && (
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Sort Code</p>
                            <p className="mt-1 text-lg font-semibold text-foreground">{activeAccount.sort_code}</p>
                          </div>
                        )}

                        {activeAccount?.beneficiary_address && (
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Beneficiary Address</p>
                            <p className="mt-1 whitespace-pre-wrap text-foreground">{activeAccount.beneficiary_address}</p>
                          </div>
                        )}

                        {(activeAccount?.note || donationSettings?.donation_message) && (
                          <div className="rounded-xl bg-secondary p-4">
                            <p className="text-sm leading-relaxed text-muted-foreground">
                              {activeAccount?.note || donationSettings?.donation_message}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleFinalSubmit} className="mt-8 flex flex-col gap-5">
                    <div>
                      <label
                        htmlFor="paymentReference"
                        className="mb-2 block text-sm font-medium text-foreground"
                      >
                        Payment Reference / Transfer Note
                      </label>
                      <input
                        type="text"
                        id="paymentReference"
                        name="paymentReference"
                        value={formData.paymentReference}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your transfer reference"
                        className="w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="proofNote"
                        className="mb-2 block text-sm font-medium text-foreground"
                      >
                        Proof of Payment Note
                      </label>
                      <textarea
                        id="proofNote"
                        name="proofNote"
                        value={formData.proofNote}
                        onChange={handleInputChange}
                        rows={4}
                        placeholder="Example: Screenshot sent to WhatsApp, transfer made from Access Bank, sender name John Doe"
                        className="w-full resize-none rounded-xl border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                      />
                    </div>

                    <div className="rounded-xl bg-secondary p-4">
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        After making your transfer, you can also send proof of payment through the ministry’s WhatsApp or email for faster confirmation.
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowAccountDetails(false)}
                      >
                        Back
                      </Button>

                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting || noAccountConfigured}
                        className="bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-70"
                      >
                        <CheckCircle className="mr-2 h-5 w-5" />
                        {isSubmitting ? "Submitting..." : "I Have Made the Transfer"}
                      </Button>
                    </div>
                  </form>
                </>
              )}
            </div>

            <div>
              <div className="sticky top-28">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-accent">
                  Your Impact
                </p>
                <h3 className="mb-6 font-serif text-2xl font-bold text-foreground text-balance">
                  Where Your Support Helps
                </h3>

                <div className="flex flex-col gap-4">
                  {impactAreas.map((area) => (
                    <div
                      key={area.title}
                      className="flex gap-4 rounded-2xl border border-border bg-card p-5"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <area.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="mb-1 font-semibold text-foreground">{area.title}</h4>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {area.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-2xl border border-border bg-secondary p-6">
                  <blockquote className="font-serif text-lg font-medium italic leading-relaxed text-foreground">
                    &ldquo;Each of you should give what you have decided in your heart to give, not
                    reluctantly or under compulsion, for God loves a cheerful giver.&rdquo;
                  </blockquote>
                  <p className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                    2 Corinthians 9:7
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary py-16 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h3 className="font-serif text-2xl font-bold sm:text-3xl text-balance">
            Other Ways to Support
          </h3>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-primary-foreground/85">
            Beyond financial giving, you can also support through volunteering, prayer,
            and helping spread the message.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/contact">
                Become a Volunteer
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="secondary"
              className="border border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white"
            >
              <Link href="/prayer-request?tab=join">Join Prayer Team</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}