"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type MobileNavProps = {
  isOpen: boolean
}

export default function MobileNav({ isOpen }: MobileNavProps) {
  
  return (
    <div 
      className={cn(
        "md:hidden fixed inset-x-0 top-[60px] bg-black/95 backdrop-blur-lg border-t border-white/10 transition-all duration-300 overflow-hidden",
        isOpen ? "max-h-[calc(100vh-80px)] sm:max-h-[calc(100vh-96px)] opacity-100" : "max-h-0 opacity-0"
      )}
    >
      <div className={cn(
        "container mx-auto px-3 py-4 flex flex-col gap-2 transition-all duration-300 overflow-y-auto",
        isOpen ? "translate-y-0" : "-translate-y-4"
      )}>
        <Link href="#features" className="py-2 px-2 border-b border-white/10 hover:bg-white/5 rounded-md transition-colors active:bg-white/10">
          Tjänster
        </Link>

        <Link href="#how-it-works" className="py-2 px-2 border-b border-white/10 hover:bg-white/5 rounded-md transition-colors active:bg-white/10">
          Så fungerar det
        </Link>

        <Link href="#testimonials" className="py-2 px-2 border-b border-white/10 hover:bg-white/5 rounded-md transition-colors active:bg-white/10">
          Omdömen
        </Link>

        <Link href="#faq" className="py-2 px-2 border-b border-white/10 hover:bg-white/5 rounded-md transition-colors active:bg-white/10">
          Vanliga frågor
        </Link>

        <div className="flex flex-col gap-2 pt-3">
          <a href="mailto:info@exposia.se">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 h-10 active:bg-white/20 w-full">
              Kontakt
            </Button>
          </a>
          <Link href="#pricing">
            <Button
              className="bg-gradient-to-r from-red-500 to-amber-500 hover:from-red-600 hover:to-amber-600 text-white border-0 h-10 shadow-lg shadow-amber-500/20 active:opacity-90 w-full"
            >
              Priser
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
