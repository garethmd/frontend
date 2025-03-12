import { CompanyLogo } from "@/components/company-logo"
import Link from "next/link"

export function CompanyFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex flex-col gap-4">
            <CompanyLogo />
            <p className="text-sm text-muted-foreground">
                Horizon Scanner
            </p>
          </div>

   
        </div>

        <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Neural Aspect Ltd. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="#" className="text-muted-foreground hover:text-[#354A63]">
              Privacy
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-[#354A63]">
              Terms
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-[#354A63]">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

