"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function DesktopNav() {

  return (
    <>
      <nav 
        className="hidden md:flex items-center gap-4 lg:gap-8"
        aria-label="Huvudmeny"
      >
        <Link 
          href="#features"
          className="text-white/80 hover:text-white transition-colors py-2 px-1 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/70 text-sm lg:text-base"
        >
          Tjänster
        </Link>

        <Link 
          href="#how-it-works"
          className="text-white/80 hover:text-white transition-colors py-2 px-1 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/70 text-sm lg:text-base"
        >
          Så fungerar det
        </Link>

        <Link 
          href="#testimonials"
          className="text-white/80 hover:text-white transition-colors py-2 px-1 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/70 text-sm lg:text-base"
        >
          Omdömen
        </Link>

        <Link 
          href="#faq"
          className="text-white/80 hover:text-white transition-colors py-2 px-1 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/70 text-sm lg:text-base"
        >
          Vanliga frågor
        </Link>
      </nav>

      <div className="hidden md:flex items-center gap-2 lg:gap-4">
        <a href="mailto:info@exposia.se" aria-label="Kontakta oss via e-post">
          <Button 
            variant="ghost" 
            className="text-white hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-amber-500/70 text-sm lg:text-base"
          >
            Kontakt
          </Button>
        </a>
        <Link href="#pricing-toggle">
          <Button 
            className="bg-gradient-to-r from-red-500 to-amber-500 hover:from-red-600 hover:to-amber-600 text-white border-0 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-shadow text-sm lg:text-base px-3 lg:px-4"
          >
            Priser
          </Button>
        </Link>
      </div>
    </>
  )
}
