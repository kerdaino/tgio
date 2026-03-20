"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Phone,
  Mail,
  Facebook,
  Instagram,
  MessageCircle,
  Send,
  CheckCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"

type ContactFormData = {
  fullName: string
  email: string
  phone: string
  subject: string
  message: string
  allowFollowUp: boolean
}

const initialFormData: ContactFormData = {
  fullName: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
  allowFollowUp: true,
}

const contactInfo = [
  {
    icon: Phone,
    label: "Phone Numbers",
    values: ["08033480653", "08164026108"],
    href: ["tel:08033480653", "tel:08164026108"],
  },
  {
    icon: Mail,
    label: "Email Address",
    values: ["thegoodonesoutreach@gmail.com"],
    href: ["mailto:thegoodonesoutreach@gmail.com"],
  },
]

const socialLinks = [
  {
    icon: Facebook,
    label: "Facebook",
    href: "https://www.facebook.com/share/1cH9EaXkmr/",
    color: "hover:bg-[#1877f2]/10 hover:text-[#1877f2]",
  },
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://www.instagram.com/goodones2026?igsh=MTZ4dnRzdnB4anQ4ag==",
    color: "hover:bg-[#e4405f]/10 hover:text-[#e4405f]",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp Community",
    href: "https://wa.me/2348033480653",
    color: "hover:bg-[#25d366]/10 hover:text-[#25d366]",
  },
]

export default function ContactClient() {
  const supabase = createClient()

  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [formData, setFormData] = useState<ContactFormData>(initialFormData)

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value, type } = e.target

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }))
      return
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError("")

    try {
      const { error } = await supabase
        .from("contact_messages")
        .insert([
          {
            full_name: formData.fullName,
            email: formData.email,
            phone: formData.phone || null,
            subject: formData.subject,
            message: formData.message,
            allow_follow_up: formData.allowFollowUp,
          },
        ])

      if (error) throw error

      setSubmitted(true)
    } catch (error) {
      console.error("Contact form submission failed:", error)
      setSubmitError("Something went wrong while sending your message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  function handleReset() {
    setSubmitted(false)
    setSubmitError("")
    setFormData(initialFormData)
  }

  return (
    <>
      <section className="relative overflow-hidden py-20 lg:py-32">
        <Image
          src="/images/contact-hero.jpg"
          alt="Connect with The Good Ones International Outreach"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary/75" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-accent">
            Get in Touch
          </p>
          <h1 className="font-serif text-4xl font-bold text-primary-foreground sm:text-5xl lg:text-6xl text-balance">
            Contact Us
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-primary-foreground/90">
            We would love to hear from you. Whether you have questions, want to connect,
            need support, or would like to share a message with the fellowship, feel free to reach out.
          </p>
        </div>
      </section>

      <section className="bg-background py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
            <div className="lg:col-span-2">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-accent">
                Reach Out
              </p>
              <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl text-balance">
                We Are Here to Connect With You
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Reach us through the contact details below or send us a message directly
                through the form.
              </p>

              <div className="mt-8 flex flex-col gap-6">
                {contactInfo.map((info) => (
                  <div key={info.label} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <info.icon className="h-5 w-5 text-primary" />
                    </div>

                    <div>
                      <p className="mb-1 text-sm font-semibold text-foreground">{info.label}</p>
                      {info.values.map((val, idx) =>
                        info.href[idx] ? (
                          <a
                            key={val}
                            href={info.href[idx]}
                            className="block text-sm text-muted-foreground transition-colors hover:text-primary"
                          >
                            {val}
                          </a>
                        ) : (
                          <p key={val} className="text-sm text-muted-foreground">
                            {val}
                          </p>
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <p className="mb-4 text-sm font-semibold text-foreground">Connect Online</p>
                <div className="flex flex-col gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-muted-foreground transition-colors ${social.color}`}
                    >
                      <social.icon className="h-5 w-5" />
                      {social.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 lg:p-10">
                {submitted ? (
                  <div className="py-12 text-center">
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      <CheckCircle className="h-8 w-8 text-primary" />
                    </div>

                    <h3 className="mb-4 font-serif text-2xl font-bold text-foreground">
                      Message Sent Successfully
                    </h3>

                    <p className="mx-auto max-w-sm leading-relaxed text-muted-foreground">
                      Thank you for reaching out. Your message has been received and will be
                      attended to as soon as possible.
                    </p>

                    <Button
                      onClick={handleReset}
                      className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <>
                    <h3 className="mb-2 font-serif text-2xl font-bold text-foreground">
                      Send Us a Message
                    </h3>
                    <p className="mb-8 leading-relaxed text-muted-foreground">
                      Fill out the form below and send us your message directly.
                    </p>

                    {submitError && (
                      <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {submitError}
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="fullName"
                            className="mb-2 block text-sm font-medium text-foreground"
                          >
                            Full Name
                          </label>
                          <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            placeholder="Your name"
                            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="email"
                            className="mb-2 block text-sm font-medium text-foreground"
                          >
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="your@email.com"
                            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="phone"
                          className="mb-2 block text-sm font-medium text-foreground"
                        >
                          Phone / WhatsApp Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="08012345678"
                          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="subject"
                          className="mb-2 block text-sm font-medium text-foreground"
                        >
                          Subject
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          required
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                        >
                          <option value="" disabled>
                            Select a subject
                          </option>
                          <option value="general-inquiry">General Inquiry</option>
                          <option value="prayer-support">Prayer Support</option>
                          <option value="fellowship-connection">Fellowship Connection</option>
                          <option value="volunteer-interest">Volunteer Interest</option>
                          <option value="partnership-support">Partnership / Support</option>
                          <option value="share-testimony">Share a Testimony</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="mb-2 block text-sm font-medium text-foreground"
                        >
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={6}
                          placeholder="Write your message here..."
                          className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                        />
                      </div>

                      <label className="flex cursor-pointer items-start gap-3">
                        <input
                          type="checkbox"
                          name="allowFollowUp"
                          checked={formData.allowFollowUp}
                          onChange={handleChange}
                          className="mt-1 h-5 w-5 rounded border-border text-primary focus:ring-primary"
                        />
                        <div>
                          <span className="block text-sm font-medium text-foreground">
                            It is okay to contact me back
                          </span>
                          <span className="block text-xs text-muted-foreground">
                            Leave this checked if you are open to a follow-up response.
                          </span>
                        </div>
                      </label>

                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="bg-primary text-base text-primary-foreground hover:bg-primary/90 disabled:opacity-70"
                      >
                        <Send className="mr-2 h-5 w-5" />
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-accent">
            Stay Connected
          </p>
          <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl text-balance">
            Connect With the Fellowship Online
          </h2>
          <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-muted-foreground">
            Join our online community through email, phone, WhatsApp, Facebook, and Instagram
            to stay updated on fellowship activities, outreach updates, and ministry announcements.
          </p>
        </div>
      </section>

      <section className="bg-primary py-16 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h3 className="font-serif text-2xl font-bold sm:text-3xl text-balance">
            Ready to Connect With Us?
          </h3>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-primary-foreground/85">
            Take the next step toward fellowship, prayer, encouragement, and community.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/programs">Explore Our Programs</Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="secondary"
              className="border border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white"
            >
              <Link href="/prayer-request">Request Prayer</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}