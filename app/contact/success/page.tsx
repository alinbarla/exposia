"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Check, Calendar, MapPin, Package, User, Mail, Phone, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ContactHeader from "@/components/header/ContactHeader";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [orderData, setOrderData] = useState<any>(null);

  useEffect(() => {
    // Get order data from URL params or localStorage
    const data = searchParams.get("data");
    if (data) {
      try {
        const decoded = JSON.parse(decodeURIComponent(data));
        setOrderData(decoded);
        // Also store in localStorage as backup
        localStorage.setItem("lastOrder", JSON.stringify(decoded));
      } catch (e) {
        // Try localStorage as fallback
        const stored = localStorage.getItem("lastOrder");
        if (stored) {
          setOrderData(JSON.parse(stored));
        } else {
          router.push("/");
        }
      }
    } else {
      // Try localStorage as fallback
      const stored = localStorage.getItem("lastOrder");
      if (stored) {
        setOrderData(JSON.parse(stored));
      } else {
        router.push("/");
      }
    }
  }, [searchParams, router]);

  if (!orderData) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/70">Laddar...</p>
        </div>
      </div>
    );
  }

  const calculateTotal = () => {
    const basePrice = orderData.plan?.price || 0;
    const additionalPrice = (orderData.additionalServices || []).reduce(
      (sum: number, s: any) => sum + (s.price || 0),
      0
    );
    return basePrice + additionalPrice;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <ContactHeader />
      <div className="pt-20 sm:pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-3xl">
          {/* Success Icon and Header */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 mb-6">
              <Check className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Tack för din bokning!
            </h1>
            <p className="text-lg sm:text-xl text-white/70">
              Din bokningsförfrågan har skickats och en bekräftelse har skickats till din e-post
            </p>
          </motion.div>

          {/* Order Summary Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 md:p-10 mb-8"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 flex items-center gap-3">
              <Package className="h-6 w-6 sm:h-7 sm:w-7 text-amber-400" />
              Din bokningssammanfattning
            </h2>

            <div className="space-y-6">
              {/* Plan Details */}
              <div className="pb-6 border-b border-white/10">
                <h3 className="text-lg font-semibold mb-3 text-amber-400">Vald plan</h3>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xl font-bold">{orderData.plan?.name}</span>
                  <span className="text-xl font-bold">{orderData.plan?.price} kr</span>
                </div>
                <p className="text-white/60 text-sm mb-3">
                  {orderData.plan?.isVilla ? "Villa" : "Lägenhet"}
                </p>
                <ul className="space-y-2">
                  {orderData.plan?.features?.map((feature: string, index: number) => (
                    <li key={index} className="flex items-start gap-2 text-white/80">
                      <Check className="h-4 w-4 text-amber-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Address */}
              <div className="pb-6 border-b border-white/10">
                <h3 className="text-lg font-semibold mb-3 text-amber-400 flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  {orderData.zipcode ? "Postnummer & Adress" : "Adress"}
                </h3>
                {orderData.zipcode && (
                  <p className="text-white/80 mb-2">
                    <span className="font-semibold">Postnummer:</span> {orderData.zipcode}
                  </p>
                )}
                <p className="text-white/80">{orderData.address}</p>
              </div>

              {/* Date */}
              <div className="pb-6 border-b border-white/10">
                <h3 className="text-lg font-semibold mb-3 text-amber-400 flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Datum för fotografering
                </h3>
                <p className="text-white/80">
                  {new Date(orderData.date).toLocaleDateString("sv-SE", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              {/* Additional Services */}
              {orderData.additionalServices && orderData.additionalServices.length > 0 && (
                <div className="pb-6 border-b border-white/10">
                  <h3 className="text-lg font-semibold mb-3 text-amber-400">Extratjänster</h3>
                  <ul className="space-y-2">
                    {orderData.additionalServices.map((service: any, index: number) => (
                      <li key={index} className="flex items-center justify-between">
                        <span className="text-white/80">{service.name}</span>
                        <span className="text-white font-semibold">+{service.price} kr</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Contact Information */}
              <div className="pb-6 border-b border-white/10">
                <h3 className="text-lg font-semibold mb-3 text-amber-400 flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Kontaktuppgifter
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-white/80">
                    <User className="h-4 w-4 text-white/50" />
                    <span>{orderData.contact?.fullName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <Mail className="h-4 w-4 text-white/50" />
                    <span>{orderData.contact?.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <Phone className="h-4 w-4 text-white/50" />
                    <span>{orderData.contact?.phone}</span>
                  </div>
                </div>
              </div>

              {/* Total */}
              <div className="pt-4">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-white/70">Subtotal:</span>
                    <span className="font-semibold">{orderData.total || calculateTotal()} kr</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Moms (25%):</span>
                    <span className="font-semibold">{orderData.vat || Math.round((orderData.total || calculateTotal()) * 0.25)} kr</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-red-500/20 to-amber-500/20 rounded-lg border border-amber-500/30">
                  <span className="text-xl font-bold">Totalt inkl. moms:</span>
                  <span className="text-3xl font-bold bg-gradient-to-r from-red-500 to-amber-500 bg-clip-text text-transparent">
                    {orderData.totalWithVAT || (orderData.total || calculateTotal()) + Math.round((orderData.total || calculateTotal()) * 0.25)} kr
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 mb-8"
          >
            <h3 className="text-xl font-bold mb-4">Vad händer nu?</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-black font-bold text-sm">1</span>
                </div>
                <div>
                  <p className="font-semibold">Bekräftelse skickad</p>
                  <p className="text-white/70 text-sm">
                    En bekräftelse har skickats till {orderData.contact?.email}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-black font-bold text-sm">2</span>
                </div>
                <div>
                  <p className="font-semibold flex items-center gap-2">
                    Vi granskar din förfrågan
                    <Zap className="h-4 w-4 text-amber-400 fill-amber-400" />
                  </p>
                  <p className="text-white/70 text-sm">
                    Vi kommer att kontakta dig inom 3 timmar för att bekräfta detaljerna
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-black font-bold text-sm">3</span>
                </div>
                <div>
                  <p className="font-semibold">Fotografering</p>
                  <p className="text-white/70 text-sm">
                    Vi kommer till adressen på det valda datumet för att fotografera
                  </p>
                </div>
              </li>
            </ul>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/">
              <Button className="bg-gradient-to-r from-red-500 to-amber-500 hover:from-red-600 hover:to-amber-600 text-white border-0 w-full sm:w-auto px-8 py-6 text-base">
                Tillbaka till startsidan
              </Button>
            </Link>
            <Link href="mailto:info@exposia.se">
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 w-full sm:w-auto px-8 py-6 text-base"
              >
                Kontakta oss
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

