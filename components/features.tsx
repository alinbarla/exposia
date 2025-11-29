"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Zap, Users, Shield, BarChart3, Camera, Video, Home } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

export default function ModernFeatures() {
  const [activeTab, setActiveTab] = useState("fotografering")
  const isMobile = useIsMobile()
  const [mounted, setMounted] = useState(false)

  // Set mounted state to true on client-side
  useEffect(() => {
    setMounted(true)
  }, [])

  const features = [
    {
      id: "fotografering",
      icon: <Camera className="h-5 w-5" />,
      title: "Fastighetsfotografi & Bostadsfotografi",
      description:
        "Professionell fastighetsfotografering som fångar din bostads bästa vinklar med interiörfoto, exteriörfoto, skymningsbilder och drönarfotografi. Våra fastighetsbilder presenterar objektet på ett attraktivt sätt för potentiella köpare och hjälper till att sälja bostaden snabbare. Exposia använder avancerad fototeknik och professionell belysning för att skapa fastighetsbilder som framhäver objektets unika karaktär och lockar fler intressenter. Varje fastighetsfoto är noggrant komponerat och redigerat för att maximera visuell påverkan och öka intresset från potentiella köpare i Stockholm.",
      benefits: [
        "1 session med 20-25 interiörfoton",
        "3 exteriörfoton",
        "1 skymningsbild",
        "1 planritning",
      ],
      image: "/foto.webp",
    },
    {
      id: "bostadsvideo",
      icon: <Video className="h-5 w-5" />,
      title: "Bostadsvideo & Fastighetsvideo",
      description:
        "Exposia erbjuder professionell bostadsvideo i Stockholm och fastighetsfilm som presenterar bostaden med drönarvideo och film inomhus. Våra bostadsvideor i Stockholm ger en helhetsbild av objektet och är perfekt för fastighetsmarknadsföring på sociala medier och fastighetsmäklarsidor.",
      benefits: [
        "30 sekunders video (horisontell eller vertikal)",
        "Drönarvideo inkluderad",
      ],
      image: "/video.jpg",
    },
    {
      id: "extratjanster",
      icon: <Home className="h-5 w-5" />,
      title: "Extratjänster för Fastighetsförsäljning",
      description:
        "Ytterligare tjänster för att förbättra presentationen av din fastighet och öka intresset från potentiella köpare. Vi erbjuder 3D-planritning, säsongsbyte av fastighetsbilder och fastighetsvideor med mäklarpresentation för optimal fastighetsmarknadsföring. Exposia hjälper dig att skapa en komplett marknadsföringspaket som visar din fastighet från alla vinklar och ökar chanserna för en snabb försäljning i Stockholm. Våra extratjänster kompletterar vårt huvudpaket med fastighetsfotografi och bostadsvideo för att ge dig den bästa möjliga presentationen av ditt objekt.",
      benefits: [
        "Extra rum - För lägenheter ingår 1 rum, för villor ingår 2 rum. Extra rum kan läggas till (300 kr per rum)",
        "3D-planritning",
        "Foto med säsongsbyte - Digital omvandling av bilder för att visa bostaden under olika årstider",
        "Videor av fastighet med mäklarpresentation",
        "Drönarbilder - Professionella drönarfoton (70 kr per bild)",
      ],
      image: "/twilight.jpg",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  // Automatically update activeTab when a user selects a new tab
  const handleTabChange = (value: string) => {
    setActiveTab(value)
    
    // Only scroll on mobile devices - fixed scrolling UX issue
    if (isMobile && mounted) {
      setTimeout(() => {
        const element = document.getElementById(`${value}-content`)
        if (element) {
          const yOffset = -80 // Adjust for header height
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
          window.scrollTo({ top: y, behavior: 'smooth' })
        }
      }, 100)
    }
  }

  // Prepare stable dimensions for content to prevent layout shifts
  const contentStyle = {
    minHeight: mounted ? "400px" : "auto", // Reduced height for mobile
  }

  return (
    <section id="features" className="py-12 px-4 sm:py-16 md:py-24 bg-black relative">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-red-500/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-amber-500/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-3">Våra tjänster</h2>
          <p className="text-base sm:text-base md:text-lg text-white/70 max-w-2xl mx-auto">
            Exposia erbjuder professionella lösningar för fastighetsfotografi och bostadsvideo i Stockholm. Vi hjälper dig att presentera dina fastigheter på bästa sätt.
          </p>
        </motion.div>

        <Tabs defaultValue="fotografering" value={activeTab} onValueChange={handleTabChange} className="w-full">
          <div className="flex justify-center mb-6 sm:mb-8 overflow-x-auto pb-3 sm:pb-0 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            <TabsList className="bg-white/5 backdrop-blur-sm border border-white/10 p-1 rounded-xl flex-nowrap min-w-max">
              {features.map((feature) => (
                <TabsTrigger
                  key={feature.id}
                  value={feature.id}
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-amber-500 data-[state=active]:text-white rounded-lg p-2 sm:px-3 sm:py-1.5 whitespace-nowrap"
                >
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="flex items-center justify-center">{feature.icon}</span>
                    <span className="hidden sm:inline text-sm md:text-base">{feature.title}</span>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Mobile feature title display - only visible on mobile */}
          <div className="sm:hidden text-center mb-6">
            <h3 className="text-xl font-bold">{features.find(f => f.id === activeTab)?.title}</h3>
          </div>

          <div style={contentStyle} className="relative">
            {features.map((feature) => (
              <TabsContent
                key={feature.id}
                value={feature.id}
                className="focus-visible:outline-none focus-visible:ring-0 scroll-mt-20 absolute top-0 left-0 w-full transition-opacity"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Image shown first on mobile and a simpler feature display */}
                    <div className="relative order-first mb-4 md:hidden min-h-[185px]">
                      <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-amber-500 rounded-2xl blur-md opacity-70"></div>
                      <div className="relative bg-black/80 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden p-1">
                        <Image
                          src={feature.image || "/placeholder.svg"}
                          alt={feature.title}
                          width={600}
                          height={400}
                          className="w-full h-auto rounded-lg object-cover"
                          sizes="(max-width: 768px) 100vw, 600px"
                        />
                      </div>
                    </div>
                    
                    <p className="hidden md:block text-white/70 text-base sm:text-base mb-6 mt-8 sm:mb-6 leading-relaxed">{feature.description}</p>

                    {/* Benefits list - show all items */}
                    <div className="mb-4">
                      <h3 className="text-white font-semibold mb-4 text-base sm:text-base">Ingår i paketet:</h3>
                      <ul className="space-y-3 sm:space-y-3">
                        {feature.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start gap-3 text-base sm:text-base">
                            <div className="h-5 w-5 sm:h-5 sm:w-5 rounded-full bg-gradient-to-r from-red-500 to-amber-500 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                              ✓
                            </div>
                            <span className="text-white/80 leading-relaxed">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>

                  {/* Desktop image view */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative hidden md:block"
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-amber-500 rounded-2xl blur-lg opacity-70"></div>
                    <div className="relative bg-black/80 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden p-1 ">
                      <Image
                        src={feature.image || "/placeholder.svg"}
                        alt={feature.title} 
                        width={800}
                        height={600}
                        className="w-full h-auto rounded-lg object-cover"
                        sizes="(max-width: 768px) 100vw, 800px"
                      />
                    </div>
                  </motion.div>
                </div>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </section>
  )
}
