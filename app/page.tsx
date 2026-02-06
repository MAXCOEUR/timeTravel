import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { DestinationsSection } from "@/components/destinations-section"
import { BookingSection } from "@/components/booking-section"
import { Footer } from "@/components/footer"
import { ChatbotWidget } from "@/components/chatbot-widget"

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <DestinationsSection />
      <BookingSection />
      <Footer />
      <ChatbotWidget />
    </main>
  )
}
