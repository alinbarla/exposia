"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Star, Sparkles } from "lucide-react"
import Link from "next/link"

export default function ModernHero() {
  const parallaxRef = useRef<HTMLDivElement>(null)
  const [showLogo, setShowLogo] = useState(true)

  useEffect(() => {
    // Hide logo after 3 seconds
    const timer = setTimeout(() => {
      setShowLogo(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Only enable parallax effect on desktop devices
    const handleMouseMove = (e: MouseEvent) => {
      if (!parallaxRef.current || window.innerWidth < 768) return

      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window

      const moveX = (clientX - innerWidth / 2) / 50
      const moveY = (clientY - innerHeight / 2) / 50

      parallaxRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`
    }

    document.addEventListener("mousemove", handleMouseMove)
    return () => document.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section className="relative min-h-[100svh] flex items-center pt-20 sm:pt-24 overflow-hidden bg-black">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black via-black to-black/90"></div>

        {/* Animated gradient orbs - adjusted for mobile */}
        <div className="absolute top-1/3 left-1/3 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-red-500/20 blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 right-1/3 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] rounded-full bg-amber-500/20 blur-[100px] animate-pulse-slow delay-1000"></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-repeat opacity-10"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 py-8 sm:py-0">
          {/* Hero content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center gap-3 mb-4 sm:mb-6"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="relative inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-500 backdrop-blur-sm px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-lg shadow-red-500/50 animate-pulse-slow"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-amber-500 rounded-full blur opacity-75 animate-pulse"></div>
                <div className="relative flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
                  <span className="font-bold text-white text-xs sm:text-sm tracking-wide">BLACK FRIDAY</span>
                  <span className="text-white/90 text-xs sm:text-sm">- 25% RABATT</span>
                </div>
              </motion.div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm">
                <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-amber-400" />
                <span className="font-medium">Professionell fastighetsfotografi & videografi</span>
              </div>
            </motion.div>

            <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-5 sm:mb-6 leading-tight">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="block"
              >
                Exposia - Fastighetsfotografi
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-gradient-to-r from-red-500 to-amber-500 bg-clip-text text-transparent block"
              >
                & Bostadsvideo Stockholm
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-base md:text-lg lg:text-xl text-white/70 mb-8 sm:mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Exposia är Stockholms ledande fastighetsfotograf. Vi erbjuder professionell fastighetsfotografering och bostadsvideo i Stockholm. Vår bostadsvideo i Stockholm kombineras med drönarfotografi och 3D-planritning. Exposia hjälper mäklare och fastighetsägare i Stockholm sälja snabbare med garanterad 24h-leverans. För lägenheter och villor i Stockholms län.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col w-full sm:w-auto sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
            >
              <Link href="#pricing">
                <Button className="bg-gradient-to-r from-red-500 to-amber-500 hover:from-red-600 hover:to-amber-600 text-white border-0 h-12 sm:h-12 px-6 sm:px-6 md:px-8 text-base sm:text-base w-full sm:w-auto min-h-[48px]">
                  Priser
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-4 sm:w-4" />
                </Button>
              </Link>
              <a href="mailto:info@exposia.se">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 h-12 sm:h-12 px-6 sm:px-6 md:px-8 text-base sm:text-base w-full sm:w-auto min-h-[48px]" aria-label="Kontakta oss via e-post">
                  Kontakta oss
                </Button>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-6 sm:mt-8 flex items-center justify-center lg:justify-start gap-2 sm:gap-4 flex-wrap sm:flex-nowrap"
            >
              <div className="flex -space-x-2">
                {[
                  "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3",
                  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3",
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3",
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3"
                ].map((imageUrl, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-black overflow-hidden relative"
                  >
                    <Image
                      src={imageUrl}
                      alt={`Fastighetsmäklare från Stockholm som använder professionell fastighetsfotografi ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 32px, 40px"
                    />
                  </div>
                ))}
              </div>
              <div className="text-xs sm:text-sm">
                <span className="text-white/70">Förtroende av</span> <span className="font-bold">100+</span>{" "}
                <span className="text-white/70">mäklare</span>
              </div>
              <div className="flex items-center gap-0.5 sm:gap-1">
                <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-amber-400 text-amber-400" />
                <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-amber-400 text-amber-400" />
                <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-amber-400 text-amber-400" />
                <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-amber-400 text-amber-400" />
                <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-amber-400 text-amber-400" />
              </div>
            </motion.div>
          </div>

          {/* Hero image */}
          <div className="flex-1 relative mt-8 lg:mt-0 w-full max-w-full sm:max-w-[90%] md:max-w-[80%] lg:max-w-full mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative z-10"
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-amber-500 rounded-2xl blur-lg opacity-70"></div>
                <div
                  ref={parallaxRef}
                  className="relative bg-black/80 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden"
                >
                  <video
                    src="/sample.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="w-full h-auto aspect-video rounded-lg object-cover"
                    style={{ pointerEvents: 'none' }}
                    aria-label="Exposia fastighetsfotografi och bostadsvideo demonstration"
                  />
                  
                  {/* Logo overlay that fades in and out */}
                  <AnimatePresence mode="wait">
                    {showLogo && (
                      <motion.div
                        key="logo-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 1, 0] }}
                        exit={{ opacity: 0 }}
                        transition={{
                          duration: 3,
                          ease: "easeInOut",
                          times: [0, 0.1, 0.9, 1]
                        }}
                        className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-lg z-10"
                      >
                        <motion.div
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0.8 }}
                          transition={{
                            duration: 0.5,
                            ease: "easeOut"
                          }}
                        >
                          <Image
                            src="/exposia logo.png"
                            alt="Exposia Photography"
                            width={300}
                            height={108}
                            className="h-20 sm:h-24 md:h-32 w-auto object-contain"
                            priority
                          />
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            {/* Decorative elements - reduced on mobile */}
            <div className="absolute -top-5 sm:-top-10 -right-5 sm:-right-10 w-10 h-10 sm:w-20 sm:h-20 border border-white/10 rounded-full hidden sm:block"></div>
            <div className="absolute -bottom-3 sm:-bottom-5 -left-3 sm:-left-5 w-6 h-6 sm:w-10 sm:h-10 border border-white/10 rounded-full hidden sm:block"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
