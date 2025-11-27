"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Zap } from "lucide-react"

export default function SocialProof() {
  const brokers = [
    { name: "Broker 1", logo: "/broker1.webp" },
    { name: "Broker 2", logo: "/broker2.jpg" },
    { name: "Broker 3", logo: "/broker3.jpg" },
    { name: "Broker 4", logo: "/broker4.png" },
    { name: "Broker 5", logo: "/broker5.webp" },
    { name: "Broker 6", logo: "/broker6.png" },
  ];

  const stats = [
    { value: "100+", label: "Nöjda kunder", hasLightning: false },
    { value: "500+", label: "Fotograferade objekt", hasLightning: false },
    { value: "24h", label: "Leveranstid", hasLightning: true },
    { value: "100%", label: "Professionell kvalitet", hasLightning: false },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  return (
    <section 
      className="relative py-12 sm:py-16 md:py-20 overflow-hidden bg-black"
      aria-labelledby="social-proof-heading"
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0 opacity-50" aria-hidden="true">
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-red-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-amber-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-repeat opacity-5"></div>
      </div>

      <div className="container relative z-10 px-4 md:px-8">
        <motion.div
          className="text-center mb-10 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-base sm:text-lg text-amber-400 font-medium mb-3">Förtroende av mäklare och fastighetsägare i Stockholm</p>
          <h2 id="social-proof-heading" className="text-2xl sm:text-2xl md:text-3xl font-bold text-white">Gå med bland hundratals nöjda kunder som väljer Exposia för bostadsvideo i Stockholm</h2>
        </motion.div>

        {/* Broker logos */}
        <motion.div
          className="flex flex-wrap justify-center items-center gap-x-6 gap-y-4 sm:gap-x-8 md:gap-x-12 mb-12 sm:mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          aria-label="Brokers and property owners using our services"
        >
          {brokers.map((broker, index) => (
            <motion.div
              key={index}
              className="opacity-70 hover:opacity-100 transition-all duration-300"
              variants={itemVariants}
            >
              <div className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px] rounded-full overflow-hidden border-2 border-white/10 hover:border-white/30 transition-colors bg-white/5 p-1">
                <Image 
                  src={broker.logo} 
                  alt={`${broker.name}`}
                  width={120} 
                  height={120} 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 auto-rows-fr"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          aria-label="Key platform statistics"
        >
          {stats.map((stat, index) => (
            <motion.div key={index} className="text-center h-full" variants={itemVariants}>
              <div className="relative group h-full">
                <div 
                  className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-amber-500 rounded-lg blur opacity-30 group-hover:opacity-60 transition duration-300"
                  aria-hidden="true"
                ></div>
                <div 
                  className="relative bg-black/70 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-white/10 h-full flex flex-col justify-center"
                  role="presentation"
                >
                  <div 
                    className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-400 to-amber-400 bg-clip-text text-transparent mb-1 sm:mb-2 truncate"
                    aria-hidden="true"
                  >
                    {stat.value}
                  </div>
                  <p 
                    className="text-white/70 text-base sm:text-base truncate flex items-center justify-center gap-1 leading-relaxed"
                    aria-label={`${stat.value} ${stat.label}`}
                  >
                    {stat.label}
                    {stat.hasLightning && (
                      <Zap className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-400 fill-amber-400 flex-shrink-0" />
                    )}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
