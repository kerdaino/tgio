import Image from "next/image"
import {
  Heart,
  BookOpen,
  Users,
  Globe,
  Target,
  Eye,
  Shield,
  Handshake,
} from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us - The Good Ones International Outreach",
  description:
    "Learn about the mission, vision, values, and purpose of The Good Ones International Outreach.",
}

const values = [
  {
    icon: Heart,
    title: "Love",
    description:
      "We are committed to expressing the love of Christ through compassion, care, and service to others.",
  },
  {
    icon: BookOpen,
    title: "The Word of God",
    description:
      "We value Bible study and sound spiritual growth, helping believers grow in truth and daily obedience to God.",
  },
  {
    icon: Users,
    title: "Unity",
    description:
      "We believe in building a united community of believers where encouragement, support, and fellowship thrive.",
  },
  {
    icon: Shield,
    title: "Integrity",
    description:
      "We seek to serve with honesty, accountability, and consistency in both ministry and community impact.",
  },
  {
    icon: Globe,
    title: "Outreach",
    description:
      "We are committed to sharing the Gospel and serving people through evangelism and practical community service.",
  },
  {
    icon: Handshake,
    title: "Fellowship",
    description:
      "We value mutual support, spiritual encouragement, and genuine relationships among believers.",
  },
]

const highlights = [
  {
    title: "Prayer",
    description:
      "Creating room for believers to seek God together and stand in faith for one another.",
  },
  {
    title: "Bible Study",
    description:
      "Helping members grow in spiritual understanding through the study and teaching of God’s Word.",
  },
  {
    title: "Mutual Support",
    description:
      "Encouraging believers through fellowship, care, and a shared journey of faith.",
  },
  {
    title: "Evangelism & Service",
    description:
      "Reaching beyond the fellowship to share the Gospel and serve communities with love and purpose.",
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <Image
          src="/images/fellowship-gathering.jpg"
          alt="The Good Ones International Outreach fellowship gathering"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary/75" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-accent">
            About Us
          </p>
          <h1 className="font-serif text-4xl font-bold text-primary-foreground sm:text-5xl lg:text-6xl text-balance">
            A Fellowship Committed to Spiritual Growth, Unity, and Outreach
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-primary-foreground/90">
            The Good Ones International Outreach is a faith-based fellowship devoted
            to connecting believers, sharing God&apos;s Word, promoting prayer and
            fellowship, and mobilizing members for evangelism and community service.
          </p>
        </div>
      </section>

      {/* Intro / Story */}
      <section className="bg-background py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-accent">
                Who We Are
              </p>
              <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl text-balance">
                Building a Digital and Spiritual Platform for Believers
              </h2>

              <div className="mt-6 flex flex-col gap-4 text-muted-foreground leading-relaxed">
                <p>
                  Good Ones International Outreach exists to foster spiritual growth,
                  unity, and outreach among believers. We are committed to creating a
                  platform where people can grow through prayer, Bible study, and mutual support.
                </p>

                <p>
                  Our mission is not only to strengthen believers internally, but also
                  to inspire outward action through evangelism and community service.
                  We believe faith should be lived, shared, and demonstrated through love.
                </p>

                <p>
                  Through this website and our wider fellowship activities, we aim to
                  connect people, share God&apos;s Word, highlight testimonies, provide
                  prayer support, and mobilize members for meaningful outreach.
                </p>
              </div>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/images/outreach-community.jpg"
                alt="Community outreach by The Good Ones International Outreach"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-secondary py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-8 lg:p-10">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-4 font-serif text-2xl font-bold text-foreground">
                Our Mission
              </h3>
              <p className="leading-relaxed text-muted-foreground">
                To build a united community of believers who grow spiritually through
                prayer, Bible study, and mutual support, while actively sharing the Gospel
                and serving others through outreach and community service.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-8 lg:p-10">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-accent/20">
                <Eye className="h-6 w-6 text-accent" />
              </div>
              <h3 className="mb-4 font-serif text-2xl font-bold text-foreground">
                Our Vision
              </h3>
              <p className="leading-relaxed text-muted-foreground">
                To provide a digital platform that fosters spiritual growth, unity,
                and outreach by connecting believers, sharing God&apos;s Word, promoting
                prayer and fellowship, and mobilizing members for evangelism and community service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Focus On */}
      <section className="bg-background py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-accent">
              What We Focus On
            </p>
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl text-balance">
              Core Areas of the Fellowship
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-muted-foreground">
              Our fellowship is centered on helping believers grow, connect, and serve with purpose.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-border bg-card p-6 lg:p-8"
              >
                <h3 className="font-serif text-xl font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-secondary py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-accent">
              What Guides Us
            </p>
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl text-balance">
              Our Core Values
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-2xl border border-border bg-card p-6 lg:p-8"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <value.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-2 font-serif text-lg font-bold text-foreground">
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Placeholder / Ministry Note */}
      <section className="bg-background py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-accent">
            Our Community
          </p>
          <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl text-balance">
            A Fellowship Growing in Faith and Purpose
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            The Good Ones International Outreach is committed to building a spiritually
            healthy and service-driven community of believers. As more ministry details,
            leadership information, testimonies, and outreach updates are shared, this
            platform will continue to grow as a place of connection, encouragement, and impact.
          </p>
        </div>
      </section>
    </>
  )
}