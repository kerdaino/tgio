"use client"

import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  Heart,
  BookOpen,
  Users,
  Globe,
  HandHeart,
  Camera,
  MessageCircleHeart,
} from "lucide-react"
import { Button } from "@/components/ui/button"

function HeroSection() {
  return (
    <section className="relative min-h-[88vh] flex items-center overflow-hidden">
      <Image
        src="/images/hero-worship.jpg"
        alt="The Good Ones International Outreach fellowship gathering"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-primary/75" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-accent">
          Faith • Fellowship • Outreach
        </p>

        <h1 className="font-serif text-4xl font-bold leading-tight text-primary-foreground sm:text-5xl lg:text-7xl text-balance">
          Building a United Community of Believers
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-primary-foreground/90 sm:text-xl">
          The Good Ones International Outreach is a faith-based fellowship committed
          to spiritual growth through prayer, Bible study, and mutual support while
          actively sharing the Gospel and serving others through outreach and community service.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="bg-accent px-8 text-base text-accent-foreground hover:bg-accent/90"
          >
            <Link href="/about">
              Learn More
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>

<Button
  asChild
  size="lg"
  variant="secondary"
  className="bg-white/10 px-8 text-base text-white border border-white/40 hover:bg-white/20 hover:text-white"
>
  <Link href="/prayer-request">Send a Prayer Request</Link>
</Button>

<Button
  asChild
  size="lg"
  variant="secondary"
  className="bg-white/10 px-8 text-base text-white border border-white/40 hover:bg-white/20 hover:text-white"
>
  <Link href="/donate">
    <Heart className="mr-2 h-5 w-5" />
    Support the Outreach
  </Link>
</Button>
        </div>
      </div>
    </section>
  )
}

function AboutSection() {
  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-accent">
            Who We Are
          </p>

          <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl text-balance">
            A Fellowship Centered on{" "}
            <span className="text-primary">Spiritual Growth, Unity, and Service</span>
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Good Ones International Outreach exists to provide a digital and physical
            platform where believers can grow in God&apos;s Word, remain steadfast in prayer,
            strengthen one another through fellowship, and be mobilized for evangelism
            and community service.
          </p>

          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            We are committed to helping lives grow deeper in faith while reflecting
            the love of Christ through practical outreach and genuine community impact.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/about">
                Read Our Story
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button asChild variant="outline">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
          <Image
            src="/images/outreach-community.jpg"
            alt="Members of The Good Ones International Outreach serving the community"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-foreground/10" />
        </div>
      </div>
    </section>
  )
}

function MissionVisionSection() {
  return (
    <section className="bg-secondary py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-accent">
          Our Purpose
        </p>

        <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl text-balance">
          Mission & Vision
        </h2>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-8 text-left lg:p-10">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Globe className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-4 font-serif text-2xl font-bold text-foreground">
              Our Mission
            </h3>
            <p className="leading-relaxed text-muted-foreground">
              To build a united community of believers who grow spiritually through
              prayer, Bible study, mutual support, and fellowship, while actively
              sharing the Gospel and serving others through outreach and community service.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-8 text-left lg:p-10">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-accent/20">
              <Heart className="h-6 w-6 text-accent" />
            </div>
            <h3 className="mb-4 font-serif text-2xl font-bold text-foreground">
              Our Vision
            </h3>
            <p className="leading-relaxed text-muted-foreground">
              To foster spiritual growth, strengthen unity among believers, promote
              prayer and fellowship, and mobilize members for evangelism and community
              service through a strong and impactful digital platform.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

const ministryAreas = [
  {
    icon: HandHeart,
    title: "Prayer Support",
    description:
      "A space for believers to share burdens, receive prayer, and grow stronger together through intercession.",
    image: "/images/prayer-gathering.jpg",
  },
  {
    icon: BookOpen,
    title: "Bible Study",
    description:
      "Teaching and study resources that help members grow in truth, wisdom, and daily obedience to God’s Word.",
    image: "/images/bible-study.jpg",
  },
  {
    icon: Users,
    title: "Fellowship & Community",
    description:
      "Building a united family of believers through encouragement, mutual support, and shared spiritual journey.",
    image: "/images/fellowship.jpg",
  },
  {
    icon: Globe,
    title: "Evangelism & Outreach",
    description:
      "Taking the message of Christ beyond the walls of fellowship through community outreach and gospel-centered service.",
    image: "/images/evangelism.jpg",
  },
]

function MinistryAreasSection() {
  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-accent">
            What We Do
          </p>

          <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl text-balance">
            Core Areas of Ministry
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-muted-foreground">
            Our fellowship is built around spiritual growth, unity, and outreach,
            creating room for believers to grow and serve with purpose.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {ministryAreas.map((item) => (
            <div
              key={item.title}
              className="group overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-[3/2] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>

                <h3 className="mb-2 font-serif text-lg font-bold text-foreground">
                  {item.title}
                </h3>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const quickLinks = [
  {
    icon: MessageCircleHeart,
    title: "Prayer Requests",
    description:
      "Submit your prayer needs and let us stand with you in faith.",
    href: "/prayer-request",
  },
  {
    icon: Heart,
    title: "Testimonies",
    description:
      "Read and share testimonies of God’s goodness and faithfulness.",
    href: "/testimonies",
  },
  {
    icon: Camera,
    title: "Photo Gallery",
    description:
      "View moments from fellowship meetings, outreach activities, and special events.",
    href: "/gallery",
  },
  {
    icon: HandHeart,
    title: "Donation Support",
    description:
      "Partner with the mission and support ongoing outreach and ministry efforts.",
    href: "/donate",
  },
]

function QuickAccessSection() {
  return (
    <section className="bg-secondary py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-accent">
            Explore More
          </p>
          <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl text-balance">
            Helpful Ways to Engage
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-muted-foreground">
            The website is being built to serve as a spiritual and practical platform
            for connection, encouragement, and outreach.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {quickLinks.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group rounded-2xl border border-border bg-card p-8 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground">
                {item.title}
              </h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {item.description}
              </p>
              <div className="mt-6 inline-flex items-center text-sm font-medium text-primary">
                Learn more
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactHighlightSection() {
  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-accent">
          Contact & Connection
        </p>

        <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl text-balance">
          Stay Connected With The Good Ones International Outreach
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Reach out, follow our community, and stay updated with fellowship activities,
          outreach updates, testimonies, and opportunities to serve.
        </p>

        <div className="mt-10 grid gap-6 rounded-2xl border border-border bg-card p-8 text-left sm:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Email
            </p>
            <a
              href="mailto:thegoodonesoutreach@gmail.com"
              className="mt-2 block text-lg font-medium text-primary hover:underline"
            >
              thegoodonesoutreach@gmail.com
            </a>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Phone / WhatsApp
            </p>
            <div className="mt-2 space-y-1 text-lg font-medium text-primary">
              <a href="tel:08033480653" className="block hover:underline">
                08033480653
              </a>
              <a href="tel:08164026108" className="block hover:underline">
                08164026108
              </a>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Facebook
            </p>
            <a
              href="https://www.facebook.com/share/1cH9EaXkmr/"
              target="_blank"
              rel="noreferrer"
              className="mt-2 block text-primary hover:underline"
            >
              Visit Facebook Page
            </a>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Instagram
            </p>
            <a
              href="https://www.instagram.com/goodones2026?igsh=MTZ4dnRzdnB4anQ4ag=="
              target="_blank"
              rel="noreferrer"
              className="mt-2 block text-primary hover:underline"
            >
              Follow on Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <Image
        src="/images/bible-prayer.jpg"
        alt="Prayer and Bible study background"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-primary/80" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl font-bold text-primary-foreground sm:text-4xl lg:text-5xl text-balance">
          Join Us in Faith, Fellowship, and Outreach
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/90">
          Whether you want to grow spiritually, share a testimony, request prayer,
          support outreach, or connect with a community of believers, there is a place for you here.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="bg-accent px-8 text-base text-accent-foreground hover:bg-accent/90"
          >
            <Link href="/contact">Connect With Us</Link>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-primary-foreground/30 px-8 text-base text-primary-foreground hover:bg-primary-foreground/10"
          >
            <Link href="/donate">
              <Heart className="mr-2 h-5 w-5" />
              Give Support
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <MissionVisionSection />
      <MinistryAreasSection />
      <QuickAccessSection />
      <ContactHighlightSection />
      <CTASection />
    </>
  )
}