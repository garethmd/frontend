import { Button } from "@/components/ui/button"
import { ShieldCheck } from "lucide-react"
import Link from "next/link"
import LogoutButton from "./logout-button"

export function Header() {
  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">AI Regulatory Advisor</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-gray-600 hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-primary transition-colors">
            About
          </Link>
           <Link href="/contact"  className="text-gray-600 hover:text-primary transition-colors">
            Contact Us
          </Link>
        </nav>
       
         <a
          href="https://calendly.com/garethmd/30min"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="outline" className="hidden md:inline-flex">
            Book a call
          </Button>
        </a>
        <LogoutButton />
      </div>
    </header>
  )
}

