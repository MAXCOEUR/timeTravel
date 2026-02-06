"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ArrowRight, Calendar, MapPin } from "lucide-react"
import { DestinationDetailModal } from "./destination-detail-modal"
import { BookingFormModal } from "./booking-form-modal"

const destinations = [
  {
    title: "Paris, 1889",
    subtitle: "Belle Epoque",
    description:
      "Assistez au devoilement de la Tour Eiffel lors de l'Exposition Universelle. Dinez dans les salons parisiens exclusifs et promenez-vous le long des boulevards eclaires au gaz.",
    image: "/images/Paris 1-1.png",
    era: "XIXe Siecle",
    duration: "3-7 Jours",
  },
  {
    title: "Periode Cretace",
    subtitle: "Dinosaures & Nature",
    description:
      "Marchez parmi les titans du monde ancien dans un biodome protege. Decouvrez une nature intacte, 66 millions d'annees avant la civilisation.",
    image: "/images/cetacé 1-1.png",
    era: "66 Millions av. J.-C.",
    duration: "1-5 Jours",
  },
  {
    title: "Florence, 1504",
    subtitle: "Art de la Renaissance",
    description:
      "Rencontrez les maitres de la Renaissance. Assistez a la revelation du David par Michel-Ange et profitez de visites privees des collections Medicis.",
    image: "/images/florance 1-1.png",
    era: "XVIe Siecle",
    duration: "3-10 Jours",
  },
]

export function DestinationsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [selectedDestination, setSelectedDestination] = useState<(typeof destinations)[0] | null>(null)
  const [bookingOpen, setBookingOpen] = useState(false)
  const [bookingDestination, setBookingDestination] = useState("")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const heading = entry.target.querySelector(".dest-heading")
            if (heading) heading.classList.add("animate-fade-in-down")

            const children = entry.target.querySelectorAll(".destination-card")
            children.forEach((child, index) => {
              setTimeout(() => {
                child.classList.add("animate-scale-in")
              }, 300 + index * 250)
            })
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleBook = (destinationTitle: string) => {
    setBookingDestination(destinationTitle)
    setBookingOpen(true)
  }

  return (
    <>
      <section
        id="destinations"
        ref={sectionRef}
        className="relative bg-secondary/30 py-24 md:py-32"
      >
        {/* Shimmer overlay */}
        <div className="animate-shimmer pointer-events-none absolute inset-0" />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mb-20 text-center">
            <p className="mb-4 text-xs tracking-[0.35em] uppercase text-primary">
              Destinations
            </p>
            <h2 className="dest-heading mb-6 font-serif text-4xl font-semibold tracking-tight text-foreground opacity-0 md:text-5xl">
              <span className="text-balance">Choisissez Votre Epoque</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Chaque destination est meticuleusement preparee avec des environnements
              fideles a l{"'"}epoque, des guides personnels et un acces exclusif
              introuvable ailleurs.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {destinations.map((dest) => (
              <div
                key={dest.title}
                className="destination-card group relative overflow-hidden rounded-sm border border-border/50 bg-card opacity-0 transition-all duration-500 hover:border-primary/30"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={dest.image || "/placeholder.svg"}
                    alt={`${dest.title} - ${dest.subtitle}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />

                  {/* Gold overlay on hover */}
                  <div className="absolute inset-0 bg-primary/0 transition-colors duration-500 group-hover:bg-primary/10" />

                  {/* Era badge */}
                  <div className="absolute top-4 left-4 border border-primary/30 bg-background/80 px-3 py-1 backdrop-blur-sm transition-transform duration-300 group-hover:-translate-y-0.5">
                    <span className="text-xs tracking-widest uppercase text-primary">
                      {dest.era}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="mb-1 font-serif text-2xl font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
                    {dest.title}
                  </h3>
                  <p className="mb-4 text-xs tracking-widest uppercase text-primary">
                    {dest.subtitle}
                  </p>
                  <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                    {dest.description}
                  </p>

                  <div className="mb-6 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3 w-3 text-primary/60" />
                      {dest.era}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3 w-3 text-primary/60" />
                      {dest.duration}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedDestination(dest)}
                    className="group/btn flex w-full items-center justify-center gap-2 border border-primary/30 bg-transparent px-6 py-3 text-xs font-medium tracking-[0.2em] uppercase text-primary transition-all duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    Voir les Details
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Destination Detail Modal */}
      <DestinationDetailModal
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
        onBook={handleBook}
      />

      {/* Booking Form Modal (triggered from detail modal) */}
      <BookingFormModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        preselectedDestination={bookingDestination}
      />
    </>
  )
}
