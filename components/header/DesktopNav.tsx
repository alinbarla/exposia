"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function DesktopNav() {

  return (
    <>
      <nav className="hidden md:flex items-center gap-4 lg:gap-8">
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
        <a href="mailto:info@exposia.se">
          <Button 
            variant="ghost" 
            className="text-white hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-amber-500/70 text-sm lg:text-base"
          >
            Kontakt
          </Button>
        </a>
      </div>
    </>
  )
}
