"use client"

import { motion } from "framer-motion"

const areas = [
  "Södermalm",
  "Östermalm",
  "Vasastan",
  "Kungsholmen",
  "Norrmalm",
  "Hammarby Sjöstad",
  "Bromma",
  "Solna",
  "Täby",
  "Lidingö",
]

export default function LocalSeoSection() {
  return (
    <section className="py-16 sm:py-20 bg-black relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-red-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-amber-500/10 rounded-full blur-[100px]" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl space-y-4 mb-8"
        >
          <p className="text-sm text-white/60 uppercase tracking-[0.2em]">Lokal expertis</p>
          <h2 className="text-3xl sm:text-4xl font-bold">Fastighetsfotografi i hela Stockholms län</h2>
          <p className="text-white/70">
            Vi täcker hela Stockholms län och åker snabbt ut till ditt objekt. Våra fotografer och filmare är vana vid att arbeta
            i allt från innerstadens sekelskifteslägenheter till moderna villor i förorten.
          </p>
        </motion.div>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.06 },
            },
          }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-w-4xl"
        >
          {areas.map((area) => (
            <motion.li
              key={area}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white/80 text-sm sm:text-base"
            >
              {area}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}

