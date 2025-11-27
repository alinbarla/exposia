"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Zap } from "lucide-react";
import Link from "next/link";

export default function ModernPricing() {
  const [isVilla, setIsVilla] = useState(false);
  const apartmentButtonRef = useRef<HTMLButtonElement>(null);
  const villaButtonRef = useRef<HTMLButtonElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateBackground = () => {
      if (backgroundRef.current && apartmentButtonRef.current && villaButtonRef.current) {
        const activeButton = isVilla ? villaButtonRef.current : apartmentButtonRef.current;
        const rect = activeButton.getBoundingClientRect();
        const containerRect = activeButton.parentElement?.getBoundingClientRect();
        
        if (containerRect) {
          backgroundRef.current.style.width = `${rect.width}px`;
          backgroundRef.current.style.left = `${rect.left - containerRect.left}px`;
        }
      }
    };

    // Initial update
    updateBackground();

    // Update on window resize
    window.addEventListener('resize', updateBackground);
    return () => window.removeEventListener('resize', updateBackground);
  }, [isVilla]);

  // Define plans directly so they recalculate on every render when isVilla changes
  const plans = [
    {
      name: "Fotografi",
      description: "Alla tjänster från fotografering inkluderade",
      price: isVilla ? 3200 : 2200,
      features: [
        "1 session med 20-25 interiörfoton",
        "3 exteriörfoton",
        "1 skymningsbild",
        "3 drönarbilder",
        "1 planritning",
      ],
      cta: "Boka nu",
      popular: false,
      hasFastDelivery: true,
    },
    {
      name: "Video",
      description: "Alla tjänster från video inkluderade",
      price: isVilla ? 3200 : 2200,
      features: [
        "30 sekunders video (horisontell eller vertikal)",
        "Drönarvideo inkluderad",
      ],
      cta: "Boka nu",
      popular: false,
      hasFastDelivery: true,
    },
    {
      name: "Fotografi + Video",
      description: "Alla tjänster från fotografi och video",
      price: isVilla ? 4800 : 3300, // 25% discount rounded down to nearest hundred: 6400*0.75=4800, 4400*0.75=3300
      fullPrice: isVilla ? 6400 : 4400, // Fotografi (3200/2200) + Video (3200/2200)
      discount: 25, // 25% discount for both
      features: [
        "1 session med 20-25 interiörfoton",
        "3 exteriörfoton",
        "1 skymningsbild",
        "3 drönarbilder",
        "1 planritning",
        "30 sekunders video (horisontell eller vertikal)",
        "Drönarvideo inkluderad",
      ],
      cta: "Boka nu",
      popular: true,
      hasFastDelivery: true,
    },
  ];

  return (
    <section
      id="pricing"
      className="py-16 sm:py-20 md:py-24 bg-black relative overflow-hidden"
      aria-labelledby="pricing-heading"
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-red-500/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-amber-500/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-16"
        >
          <h2
            id="pricing-heading"
            className="text-3xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-4"
          >
            Tydliga priser för fastighetsfotografi och bostadsvideo i Stockholm
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            Välj det paket som passar bäst för ditt objekt. Kontakta oss för skräddarsydda lösningar.
          </p>

          <div className="relative flex items-center justify-center mt-6 sm:mt-8">
            <fieldset className="bg-white/5 backdrop-blur-sm border border-white/10 p-1 rounded-full">
              <legend className="sr-only">Fastighetstyp</legend>
              <div className="relative flex">
                <button
                  ref={apartmentButtonRef}
                  onClick={() => setIsVilla(false)}
                  className={`relative z-10 px-5 sm:px-6 py-2.5 sm:py-2 rounded-full transition-colors focus:outline-none border-0 whitespace-nowrap text-base sm:text-base min-h-[44px] ${
                    !isVilla ? "text-white" : "text-white/70"
                  }`}
                  aria-pressed={!isVilla}
                  aria-label="Lägenheter"
                >
                  Lägenheter
                </button>
                <button
                  ref={villaButtonRef}
                  onClick={() => setIsVilla(true)}
                  className={`relative z-10 px-5 sm:px-6 py-2.5 sm:py-2 rounded-full transition-colors focus:outline-none border-0 whitespace-nowrap text-base sm:text-base min-h-[44px] ${
                    isVilla ? "text-white" : "text-white/70"
                  }`}
                  aria-pressed={isVilla}
                  aria-label="Villor"
                >
                  Villor
                </button>
                <div
                  ref={backgroundRef}
                  className="absolute top-1 h-[calc(100%-8px)] bg-gradient-to-r from-red-500 to-amber-500 rounded-full transition-all duration-300"
                  aria-hidden="true"
                ></div>
              </div>
            </fieldset>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8" role="list">
          {plans.map((plan, index) => {
            // Reorder to put popular plan in center
            const displayIndex = plan.popular ? 1 : index === 0 ? 0 : 2;
            return (
            <motion.div
              key={`${plan.name}-${isVilla ? 'villa' : 'apartment'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`relative ${plan.popular ? "md:-mt-4 md:mb-4" : ""}`}
              style={{ order: displayIndex }}
              role="listitem"
            >
              {plan.popular && (
                  <div className="absolute -top-3 left-0 right-0 flex justify-center">
                  <div className="bg-gradient-to-r from-red-500 to-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full z-50">
                    Mest populär
                  </div>
                </div>
              )}

              <div
                className={`h-full bg-white/5 backdrop-blur-sm border rounded-2xl overflow-hidden transition-transform ${
                  plan.popular ? "border-amber-500" : "border-white/10"
                }`}
              >
                <div className="p-5 sm:p-8">
                  <h3 className="text-xl sm:text-2xl font-bold mb-3">
                    {plan.name}
                  </h3>
                  <p className="text-white/70 text-base mb-6 sm:mb-6 leading-relaxed">
                    {plan.description}
                  </p>

                  <div className="mb-5 sm:mb-6">
                    <div
                      className="flex items-baseline gap-2 sm:gap-3 flex-wrap"
                      aria-label={`${plan.price} kronor`}
                    >
                      <span className="text-2xl sm:text-4xl font-bold">
                        {plan.price} kr
                      </span>
                      {plan.fullPrice ? (
                        <>
                          <span className="text-lg sm:text-xl text-white/50 line-through">
                            {plan.fullPrice} kr
                          </span>
                          <span className="bg-gradient-to-r from-red-500 to-amber-500 text-white text-xs sm:text-sm font-bold px-2 py-1 rounded-full">
                            -{plan.discount}%
                          </span>
                        </>
                      ) : null}
                    </div>
                    <p className="text-white/60 text-xs mt-1">
                      exkl. moms
                    </p>
                    {plan.hasFastDelivery && (
                      <div className="flex items-center gap-1.5 mt-2 text-amber-400">
                        <Zap className="h-4 w-4 sm:h-4 sm:w-4" />
                        <span className="text-sm sm:text-sm font-medium">24h snabbleverans</span>
                      </div>
                    )}
                  </div>

                  <Link href={`/contact?plan=${encodeURIComponent(plan.name)}&type=${isVilla ? 'villa' : 'apartment'}`}>
                    <Button
                      className={`w-full mb-6 sm:mb-8 py-3 sm:py-3 text-base sm:text-base min-h-[48px] focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black focus:outline-none ${
                        plan.popular
                          ? "bg-gradient-to-r from-red-500 to-amber-500 hover:from-red-600 hover:to-amber-600 text-white border-0"
                          : "bg-white/10 hover:bg-white/20 text-white"
                      }`}
                      aria-label={`${plan.cta} with the ${plan.name} plan`}
                    >
                      {plan.cta}
                    </Button>
                  </Link>

                  <ul
                    className="space-y-3 sm:space-y-4"
                    aria-label={`${plan.name} plan features`}
                  >
                    {plan.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 sm:gap-3"
                      >
                        <div
                          className="flex-shrink-0 h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-gradient-to-r from-red-500 to-amber-500 flex items-center justify-center"
                          aria-hidden="true"
                        >
                          <Check className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-white" />
                        </div>
                        <span className="text-white/80 text-base sm:text-base leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
            );
          })}
        </div>

        <div className="mt-10 sm:mt-16 text-center">
          <p className="text-white/70 text-sm sm:text-base">
            Exposia erbjuder tydliga priser för fastighetsfotografi och bostadsvideo i Stockholm. Alla priser är exklusive moms. Välj mellan lägenheter eller villor för att se rätt priser.
          </p>
        </div>
      </div>
    </section>
  );
}
