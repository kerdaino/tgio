"use client"

import Image from "next/image"
import Link from "next/link"
import { Mail, Phone, Facebook, Instagram, MessageCircle } from "lucide-react"

const quickLinks = [
  { href: "/about", label: "About Us" },
  { href: "/programs", label: "Programs" },
  { href: "/prayer-request", label: "Prayer Request" },
  { href: "/testimonies", label: "Testimonies" },
  { href: "/gallery", label: "Gallery" },
  { href: "/donate", label: "Donate" },
  { href: "/contact", label: "Contact" },
]

const programs = [
  { href: "/programs#prayer", label: "Prayer Gatherings" },
  { href: "/programs#bible-study", label: "Bible Study" },
  { href: "/programs#evangelism", label: "Evangelism" },
  { href: "/programs#community", label: "Community Outreach" },
]

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="mb-4 flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-full bg-white ring-1 ring-white/20">
                <Image
                  src="/images/logo.png"
                  alt="The Good Ones International Outreach logo"
                  fill
                  className="object-contain p-1"
                />
              </div>

              <div>
                <p className="text-sm font-bold leading-tight">The Good Ones</p>
                <p className="text-xs leading-tight opacity-80">
                  International Outreach
                </p>
              </div>
            </Link>

            <p className="mt-4 text-sm leading-relaxed opacity-80">
              Building a united community of believers who grow spiritually through prayer,
              Bible study, mutual support, and fellowship while actively sharing the Gospel
              and serving others through outreach and community service.
            </p>

            <div className="mt-6 flex gap-3">
              <a
                href="https://www.facebook.com/share/1cH9EaXkmr/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/10 transition-colors hover:bg-primary-foreground/20"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>

              <a
                href="https://www.instagram.com/goodones2026?igsh=MTZ4dnRzdnB4anQ4ag=="
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/10 transition-colors hover:bg-primary-foreground/20"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>

              <a
                href="https://chat.whatsapp.com/HeuTxqSVl8s9UKav99m7lh?mode=gi_t"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/10 transition-colors hover:bg-primary-foreground/20"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider opacity-90">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm opacity-80 transition-opacity hover:opacity-100"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider opacity-90">
              Our Programs
            </h3>
            <ul className="flex flex-col gap-2">
              {programs.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm opacity-80 transition-opacity hover:opacity-100"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider opacity-90">
              Contact Us
            </h3>

            <div className="flex flex-col gap-3">
              <a
                href="tel:08033480653"
                className="flex items-center gap-2 text-sm opacity-80 transition-opacity hover:opacity-100"
              >
                <Phone className="h-4 w-4 shrink-0" />
                08033480653
              </a>

              <a
                href="tel:08164026108"
                className="flex items-center gap-2 text-sm opacity-80 transition-opacity hover:opacity-100"
              >
                <Phone className="h-4 w-4 shrink-0" />
                08164026108
              </a>

              <a
                href="mailto:thegoodonesoutreach@gmail.com"
                className="flex items-center gap-2 text-sm opacity-80 transition-opacity hover:opacity-100"
              >
                <Mail className="h-4 w-4 shrink-0" />
                <span className="break-all">thegoodonesoutreach@gmail.com</span>
              </a>
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="mb-2 text-sm font-semibold">Newsletter</h4>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Enter email"
                  className="flex-1 rounded-lg border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-2 text-sm text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary-foreground/30"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
                >
                  Join
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-primary-foreground/10 pt-8 text-center">
          <p className="text-sm opacity-70">
            &copy; {new Date().getFullYear()} The Good Ones International Outreach. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}