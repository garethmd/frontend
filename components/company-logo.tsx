import Image from "next/image"
import Link from "next/link"

interface CompanyLogoProps {
  className?: string
}

export function CompanyLogo({ className }: CompanyLogoProps) {
  return (
    <Link href="/" className={`flex items-center space-x-2 ${className}`}>
        <Image
            src="/images/brand/svg/Black logo - no background.svg"
            alt="Neural Aspect Logo"
            width={96}
            height={96}
            className="rounded-md block dark:hidden"
        />
        <Image
            src="/images/brand/svg/Color logo - no background.svg"
            alt="Neural Aspect Logo"
            width={96}
            height={96}
            className="rounded-md hidden dark:block"
        />
    </Link>
  )
}