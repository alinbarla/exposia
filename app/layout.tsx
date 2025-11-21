import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import ModernHeader from "@/components/header"
import ModernFooter from "@/components/footer"
import StructuredData from "@/components/structured-data"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://exposia.se"),
  title: {
    default: "Exposia - Professionell Fastighetsfotografi & Bostadsvideo i Stockholm | 24h Leverans",
    template: "%s | Exposia - Fastighetsfotografi Stockholm",
  },
  description: "Professionell fastighetsfotografi och bostadsvideo i Stockholm. Vi erbjuder fastighetsfotografering, drönarfotografering, fastighetsvideo och 3D-planritning med garanterad 24-timmarsleverans. Perfekt för mäklare och fastighetsägare som vill sälja snabbare. Kontakta Alin Barla på info@exposia.se eller 076-344 11 68.",
  keywords: [
    "fastighetsfotografi",
    "fastighetsfotografering",
    "bostadsfotografi",
    "bostadsvideo",
    "fastighetsvideo",
    "drönarfotografi",
    "fastighetsfotograf",
    "fastighetsfotograf Stockholm",
    "bostadsfotograf",
    "mäklarfotograf",
    "fastighetsbilder",
    "bostadsbilder",
    "fastighetsmarknadsföring",
    "3D-planritning",
    "skymningsbild",
    "exteriörfoto",
    "interiörfoto",
    "drönarvideo",
    "fastighetsfilm",
    "bostadsfilm",
    "sälja bostad",
    "fastighetsförsäljning",
    "Stockholm fastighetsfotografi",
    "professionell fastighetsfotografi",
    "fastighetsfotografi pris",
    "fastighetsfotografi priser",
    "fastighetsfotografi kostnad",
    "24h leverans",
    "snabbfotografering",
    "fastighetsfotografi lägenhet",
    "fastighetsfotografi villa",
  ],
  authors: [{ name: "Alin Barla", url: "https://exposia.se" }],
  creator: "Alin Barla",
  publisher: "Exposia",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  generator: "Exposia",
  applicationName: "Exposia",
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "sv_SE",
    url: "https://exposia.se",
    siteName: "Exposia - Fastighetsfotografi Stockholm",
    title: "Exposia - Professionell Fastighetsfotografi & Bostadsvideo i Stockholm | 24h Leverans",
    description: "Professionell fastighetsfotografi och bostadsvideo i Stockholm. Fastighetsfotografering, drönarfotografi, fastighetsvideo och 3D-planritning med garanterad 24-timmarsleverans. Perfekt för mäklare och fastighetsägare.",
    images: [
      {
        url: "/image.png",
        width: 1200,
        height: 630,
        alt: "Exposia - Professionell fastighetsfotografi och bostadsvideo i Stockholm",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Exposia - Professionell Fastighetsfotografi & Bostadsvideo i Stockholm",
    description: "Professionell fastighetsfotografi och bostadsvideo i Stockholm. 24h leverans. Perfekt för mäklare och fastighetsägare.",
    images: ["/image.png"],
    creator: "@exposia",
  },
  alternates: {
    canonical: "https://exposia.se",
  },
  category: "Fastighetsfotografi",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="sv" suppressHydrationWarning>
      <head>
        <StructuredData />
        <link rel="canonical" href="https://exposia.se" />
      </head>
      <body className={`${inter.className} bg-black text-white`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ModernHeader />
          <main>{children}</main>
          <ModernFooter />
        </ThemeProvider>
      </body>
    </html>
  )
}