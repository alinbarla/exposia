"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import ObfuscatedEmail from "@/components/obfuscated-email"

export default function ModernCta() {
  return (
    <section className="py-16 pb-20 px-3 sm:px-0 sm:py-16 md:py-24 bg-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-radial from-red-500/20 via-transparent to-transparent opacity-30"></div>
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-repeat opacity-10"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-amber-500 rounded-2xl blur-lg opacity-70"></div>
            <div className="relative bg-black/80 backdrop-blur-sm border border-white/10 rounded-xl p-5 sm:p-8 md:p-12 text-center">
              <h2 className="text-3xl sm:text-3xl md:text-4xl font-bold mb-5 sm:mb-6 leading-tight">Redo att presentera ditt objekt professionellt med fastighetsfotografi?</h2>
              <p className="text-base sm:text-lg md:text-xl text-white/70 mb-8 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
                Gå med bland hundratals nöjda mäklare och fastighetsägare i Stockholm som redan använder Exposias professionella fastighetsfotografering och bostadsvideo för att sälja sina objekt snabbare. Våra fastighetsbilder och bostadsvideor ökar intresset och hjälper till med snabbare fastighetsförsäljning.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-4 justify-center">
                <Link href="#popular-plan">
                  <Button className="bg-gradient-to-r from-red-500 to-amber-500 hover:from-red-600 hover:to-amber-600 text-white border-0 h-12 sm:h-12 px-6 sm:px-6 md:px-8 text-base sm:text-base w-full sm:w-auto min-h-[48px]">
                    Priser
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <a href="mailto:info@exposia.se">
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 h-12 sm:h-12 px-6 sm:px-6 md:px-8 text-base sm:text-base w-full sm:w-auto min-h-[48px]" aria-label="Kontakta oss via e-post">
                    Kontakta oss
                  </Button>
                </a>
              </div>

              <p className="mt-4 sm:mt-6 text-white/50 text-xs sm:text-sm">
                Ring 076-344 11 68 eller skicka e-post till <ObfuscatedEmail email="info@exposia.se" className="text-white/70 hover:text-white underline" />
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
