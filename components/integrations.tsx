"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function Integrations() {
  // These would typically be actual logos in a real implementation
  const integrations = [
    { name: "Slack", category: "Communication", logo: "https://cdn.simpleicons.org/slack" },
    { name: "GitHub", category: "Development", logo: "https://cdn.simpleicons.org/github" },
    { name: "Notion", category: "Productivity", logo: "https://cdn.simpleicons.org/notion" },
    { name: "Google", category: "Workspace", logo: "https://cdn.simpleicons.org/google" },
    { name: "Figma", category: "Design", logo: "https://cdn.simpleicons.org/figma" },
    { name: "Salesforce", category: "CRM", logo: "https://cdn.simpleicons.org/salesforce" },
    { name: "Zapier", category: "Automation", logo: "https://cdn.simpleicons.org/zapier" },
    { name: "Stripe", category: "Payments", logo: "https://cdn.simpleicons.org/stripe" },
    { name: "Hubspot", category: "Marketing", logo: "https://cdn.simpleicons.org/hubspot" },
    { name: "Zoom", category: "Meetings", logo: "https://cdn.simpleicons.org/zoom" },
    { name: "Jira", category: "Project Management", logo: "https://cdn.simpleicons.org/jira" },
    { name: "Zendesk", category: "Support", logo: "https://cdn.simpleicons.org/zendesk" },
  ];

  return (
    <section 
      className="py-12 sm:py-16 md:py-24 bg-black relative overflow-hidden"
      aria-labelledby="integrations-heading"
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-red-500/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-amber-500/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-10 md:mb-16"
        >
          <h2 id="integrations-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Vi arbetar med</h2>
          <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto">
            Professionella bilder och videor för alla plattformar och marknadsföringskanaler
          </p>
        </motion.div>

        {/* Simplified grid for mobile */}
        <div 
          className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6 sm:gap-4"
          role="list"
          aria-label="Available integrations"
        >
          {integrations.map((integration, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="group"
              role="listitem"
            >
              <div 
                className="bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg p-2 sm:p-3 md:p-4 flex flex-col items-center justify-center h-full transition-colors focus-within:ring-2 focus-within:ring-white"
                tabIndex={0}
              >
                <div 
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-red-500/20 to-amber-500/20 flex items-center justify-center mb-1 sm:mb-2"
                  aria-hidden="true"
                >
                  <img 
                    src={integration.logo} 
                    alt=""
                    className="w-4 h-4 sm:w-5 sm:h-5 object-contain filter brightness-0 invert"
                  />
                </div>
                <h3 className="font-medium text-center text-xs sm:text-sm">{integration.name}</h3>
                {/* Remove category text on mobile */}
                <p className="hidden sm:block text-xs text-white/50 mt-0.5" aria-label={`${integration.category} integration`}>{integration.category}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-6 sm:mt-8"
        >
          <p className="text-xs sm:text-sm text-white/70">
            Behöver du något specifikt? {" "}
            <a 
              href="#contact" 
              className="text-amber-400 hover:text-amber-300 underline underline-offset-2 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-black"
              aria-label="Kontakta oss för skräddarsydda lösningar"
            >
              Kontakta oss för skräddarsydda lösningar
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
