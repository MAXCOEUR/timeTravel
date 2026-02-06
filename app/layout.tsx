import React from "react"
import type { Metadata, Viewport } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import "./globals.css"

const _playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600", "700"] })
const _inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TimeTravel Agency | Voyages Temporels de Luxe",
  description:
    "Vivez les moments les plus extraordinaires de l'histoire avec notre service de voyage temporel de luxe. Reservez des voyages exclusifs vers les epoques les plus remarquables.",
  generator: "v0.app",
}

export const viewport: Viewport = {
  themeColor: "#D4AF37",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
