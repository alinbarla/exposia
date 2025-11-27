import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import ModernHeader from "@/components/header"
import ModernFooter from "@/components/footer"
import StructuredData from "@/components/structured-data"

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-inter",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://exposia.se"),
  title: {
    default: "Exposia - Fastighetsfotografi & Bostadsvideo Stockholm",
    template: "%s | Exposia",
  },
  description: "Professionell fastighetsfotografi och bostadsvideo i Stockholm. Fastighetsfotografering, drönarfotografi, fastighetsvideo och 3D-planritning med 24h leverans. Perfekt för mäklare och fastighetsägare.",
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
    title: "Exposia - Fastighetsfotografi & Bostadsvideo Stockholm",
    description: "Professionell fastighetsfotografi och bostadsvideo i Stockholm. Fastighetsfotografering, drönarfotografi, fastighetsvideo och 3D-planritning med 24h leverans. Perfekt för mäklare och fastighetsägare.",
    images: [
      {
        url: "https://exposia.se/exposia-rich-image.png",
        width: 1200,
        height: 630,
        alt: "Exposia - Professionell fastighetsfotografi och bostadsvideo i Stockholm",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Exposia - Fastighetsfotografi & Bostadsvideo Stockholm",
    description: "Professionell fastighetsfotografi och bostadsvideo i Stockholm. 24h leverans. Perfekt för mäklare och fastighetsägare.",
    images: ["https://exposia.se/exposia-rich-image.png"],
    creator: "@exposia",
  },
  alternates: {
    canonical: "https://exposia.se",
    languages: {
      "sv-SE": "https://exposia.se",
    },
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
        {/* Preconnect to Google Tag Manager for faster loading */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        {/* Google Tag Manager - Loaded asynchronously to prevent render blocking */}
        <script
          async
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5C7KWK8L');`,
          }}
        />
        {/* End Google Tag Manager */}
        <StructuredData />
        <link rel="canonical" href="https://exposia.se" />
      </head>
      <body className={`${inter.className} bg-black text-white`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5C7KWK8L"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
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