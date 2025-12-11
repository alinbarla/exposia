import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram } from "lucide-react"
import ObfuscatedEmail from "@/components/obfuscated-email"

export default function ModernFooter() {
  return (
    <footer className="bg-black border-t border-white/10 py-8  sm:py-16  px-3 sm:px-6 lg:px-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <Image
                src="/exposia logo.png"
                alt="Exposia Photography"
                width={220}
                height={80}
                className="h-16 sm:h-20 w-auto object-contain"
              />
            </Link>
            <p className="text-white/70 mb-6">
              Exposia erbjuder professionell fastighetsfotografi och bostadsvideo i Stockholm. Vi är specialister på fastighetsfotografering, drönarfotografi, bostadsvideo och 3D-planritning. Vi hjälper mäklare och fastighetsägare att presentera sina objekt på bästa möjliga sätt med högkvalitativt visuellt material för snabbare fastighetsförsäljning.
            </p>
            <div className="text-white/70 mb-6 space-y-2">
              <p><strong>Alin Barla</strong></p>
              <p>E-post: <ObfuscatedEmail email="info@exposia.se" className="text-amber-400 hover:text-amber-300" /></p>
              <p>Telefon: <a href="tel:0763441168" className="text-amber-400 hover:text-amber-300">076-344 11 68</a></p>
            </div>
            <div className="flex space-x-4">
              <a href="https://facebook.com/exposia" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="https://instagram.com/exposia" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Tjänster</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#features" className="text-white/70 hover:text-white transition-colors">
                  Fotografering
                </Link>
              </li>
              <li>
                <Link href="#features" className="text-white/70 hover:text-white transition-colors">
                  Bostadsvideo
                </Link>
              </li>
              <li>
                <Link href="#features" className="text-white/70 hover:text-white transition-colors">
                  Extratjänster
                </Link>
              </li>
              <li>
                <Link href="#pricing-toggle" className="text-white/70 hover:text-white transition-colors">
                  Priser
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="text-white/70 hover:text-white transition-colors">
                  Så fungerar det
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Om oss</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#testimonials" className="text-white/70 hover:text-white transition-colors">
                  Kundomdömen
                </Link>
              </li>
              <li>
                <Link href="#faq" className="text-white/70 hover:text-white transition-colors">
                  Vanliga frågor
                </Link>
              </li>
              <li>
                <ObfuscatedEmail email="info@exposia.se" className="text-white/70 hover:text-white transition-colors" displayText="Kontakt" />
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Kontakt</h3>
            <ul className="space-y-3">
              <li className="text-white/70">
                <ObfuscatedEmail email="info@exposia.se" className="hover:text-white transition-colors" />
              </li>
              <li className="text-white/70">
                <a href="tel:0763441168" className="hover:text-white transition-colors">
                  076-344 11 68
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/50 text-sm mb-4 md:mb-0">© {new Date().getFullYear()} Exposia - Alin Barla. Alla rättigheter förbehållna.</p>
          <div className="flex gap-6">
            <Link href="/integritetspolicy" className="text-white/50 hover:text-white text-sm transition-colors">
              Integritetspolicy
            </Link>
            <Link href="/villkor" className="text-white/50 hover:text-white text-sm transition-colors">
              Villkor
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
