import { CompanyLogo } from "@/components/company-logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import LogoutButton from "./logout-button"

export function CompanyHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <CompanyLogo />

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/about" className="text-sm font-medium hover:text-[#F5793B]">
            About
          </Link>
          <a
          href="https://calendly.com/garethmd/30min"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="outline" className="hidden md:inline-flex">
            Book a call
          </Button>
        </a>
        </nav>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <LogoutButton />
        </div>
      </div>
    </header>
  )
}

