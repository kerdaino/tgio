"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/programs", label: "Programs" },
  { href: "/prayer-request", label: "Prayer Request" },
  { href: "/testimonies", label: "Testimonies" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-11 w-11 overflow-hidden rounded-full bg-white ring-1 ring-border sm:h-12 sm:w-12">
              <Image
                src="/images/logo.png"
                alt="The Good Ones International Outreach logo"
                fill
                className="object-contain p-1"
                priority
              />
            </div>

            <div className="hidden sm:block">
              <p className="text-sm font-bold leading-tight tracking-tight text-foreground">
                The Good Ones
              </p>
              <p className="text-xs leading-tight text-muted-foreground">
                International Outreach
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button asChild className="hidden bg-primary text-primary-foreground hover:bg-primary/90 sm:inline-flex">
              <Link href="/donate">
                <Heart className="mr-2 h-4 w-4" />
                Donate
              </Link>
            </Button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-lg p-2 text-foreground hover:bg-secondary lg:hidden"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-border bg-card lg:hidden">
          <nav className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg px-3 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}

              <Button asChild className="mt-3 bg-primary text-primary-foreground hover:bg-primary/90 sm:hidden">
                <Link href="/donate" onClick={() => setIsOpen(false)}>
                  <Heart className="mr-2 h-4 w-4" />
                  Donate
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}