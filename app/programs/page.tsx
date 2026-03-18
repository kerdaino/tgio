import Image from "next/image"
import Link from "next/link"
import { HandHeart, BookOpen, Globe, Users, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Programs - The Good Ones International Outreach",
  description:
    "Explore the core areas of ministry at The Good Ones International Outreach including prayer, Bible study, fellowship, evangelism, and community outreach.",
}

const programs = [
  {
    id: "prayer",
    icon: HandHeart,
    title: "Prayer Support",
    subtitle: "Seeking God Together",
    description:
      "Prayer is a vital part of our fellowship. We create room for believers to seek God, stand in faith for one another, and grow stronger spiritually through consistent prayer and intercession.",
    highlights: [
      "Personal and shared prayer support",
      "Faith-based encouragement",
      "Spiritual strengthening through prayer",
      "A community that stands together in faith",
    ],
    image: "/images/prayer-gathering.jpg",
  },
  {
    id: "bible-study",
    icon: BookOpen,
    title: "Bible Study",
    subtitle: "Growing Through God’s Word",
    description:
      "We are committed to helping believers grow through the study of Scripture. Our Bible study focus is designed to deepen understanding, strengthen faith, and encourage practical Christian living.",
    highlights: [
      "Learning and reflection from Scripture",
      "Spiritual growth through the Word",
      "Encouragement for daily Christian living",
      "A stronger foundation in faith",
    ],
    image: "/images/bible-study.jpg",
  },
  {
    id: "evangelism",
    icon: Globe,
    title: "Evangelism",
    subtitle: "Sharing the Gospel with Others",
    description:
      "We are passionate about spreading the message of Christ. Through evangelism, we seek to reach lives with hope, truth, and the love of God, both within and beyond our immediate community.",
    highlights: [
      "Sharing the Gospel with boldness",
      "Reaching people with hope and truth",
      "Encouraging believers to be active witnesses",
      "Extending the message of Christ beyond the fellowship",
    ],
    image: "/images/evangelism.jpg",
  },
  {
    id: "community",
    icon: Users,
    title: "Community Service",
    subtitle: "Serving with Love and Purpose",
    description:
      "Our outreach goes beyond words into practical care and support. We believe community service is one of the ways we reflect the love of Christ and make meaningful impact in the lives of others.",
    highlights: [
      "Practical expressions of care and compassion",
      "Support for people and communities",
      "Serving with love and purpose",
      "Living out faith through action",
    ],
    image: "/images/outreach-community.jpg",
  },
]

export default function ProgramsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <Image
          src="/images/evangelism.jpg"
          alt="The Good Ones International Outreach programs and outreach activities"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary/75" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-accent">
            Our Programs
          </p>
          <h1 className="font-serif text-4xl font-bold text-primary-foreground sm:text-5xl lg:text-6xl text-balance">
            Growing in Faith, Fellowship, and Outreach
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-primary-foreground/90">
            Our programs are centered on spiritual growth, prayer, Bible study,
            fellowship, evangelism, and service to others through meaningful outreach.
          </p>
        </div>
      </section>

      {/* Programs List */}
      <section className="bg-background py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-20 lg:gap-28">
            {programs.map((program, index) => (
              <div
                key={program.id}
                id={program.id}
                className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-16 ${
                  index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div>
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <program.icon className="h-6 w-6 text-primary" />
                  </div>

                  <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-accent">
                    {program.subtitle}
                  </p>

                  <h2 className="mb-4 font-serif text-3xl font-bold text-foreground sm:text-4xl">
                    {program.title}
                  </h2>

                  <p className="mb-6 leading-relaxed text-muted-foreground">
                    {program.description}
                  </p>

                  <ul className="flex flex-col gap-3">
                    {program.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-3">
                        <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
                        <span className="text-sm text-foreground">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-20 text-center text-primary-foreground lg:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold sm:text-4xl text-balance">
            Ready to Get Involved?
          </h2>

          <p className="mt-6 text-lg leading-relaxed opacity-90">
            Whether you want to connect with the fellowship, grow through prayer and Bible study,
            participate in outreach, or support the mission, there is a place for you here.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-accent px-8 text-base text-accent-foreground hover:bg-accent/90"
            >
              <Link href="/contact">
                Get Connected
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="secondary"
              className="border border-white/40 bg-white/10 px-8 text-base text-white hover:bg-white/20 hover:text-white"
            >
              <Link href="/donate">Support Our Programs</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}