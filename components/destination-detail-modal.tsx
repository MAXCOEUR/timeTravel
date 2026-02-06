"use client"

import React from "react"

import { useEffect, useRef } from "react"
import Image from "next/image"
import {
  X,
  MapPin,
  Calendar,
  Clock,
  Shield,
  Star,
  Users,
  Utensils,
  Landmark,
  TreePine,
  Palette,
  ArrowRight,
} from "lucide-react"

interface Destination {
  title: string
  subtitle: string
  description: string
  image: string
  era: string
  duration: string
}

const destinationDetails: Record<
  string,
  {
    longDescription: string
    highlights: { icon: React.ElementType; label: string }[]
    includes: string[]
    price: string
    rating: string
    maxGroup: string
    bestSeason: string
    dangerLevel: string
  }
> = {
  "Paris, 1889": {
    longDescription:
      "Plongez au coeur de la Belle Epoque parisienne. Assistez en personne a l'inauguration de la Tour Eiffel lors de l'Exposition Universelle de 1889. Flandez dans les boulevards haussmanniens eclaires au gaz, degustez un diner prive chez Maxim's, et croisez les plus grands artistes impressionnistes dans les cafes de Montmartre. Votre concierge temporel vous garantit un acces exclusif aux salons les plus prives de l'aristocratie parisienne.",
    highlights: [
      { icon: Landmark, label: "Inauguration Tour Eiffel" },
      { icon: Utensils, label: "Diner prive chez Maxim's" },
      { icon: Palette, label: "Ateliers impressionnistes" },
      { icon: Users, label: "Salons aristocratiques" },
    ],
    includes: [
      "Suite au Grand Hotel de Paris",
      "Garde-robe d'epoque sur mesure",
      "Guide historien bilingue",
      "Voiture a cheval privee",
      "Acces VIP Exposition Universelle",
      "Assurance temporelle complete",
    ],
    price: "A partir de 45 000 Credits Temporels",
    rating: "4.9/5",
    maxGroup: "4 personnes max.",
    bestSeason: "Mai - Octobre 1889",
    dangerLevel: "Minimal",
  },
  "Periode Cretace": {
    longDescription:
      "Une aventure unique au coeur de la prehistoire, 66 millions d'annees avant notre ere. Observez les dinosaures dans leur habitat naturel depuis notre biodome securise de derniere generation. Traversez des forets de fougeres geantes, admirez des volcans en activite a distance sure, et vivez l'experience la plus brute et la plus pure de la nature jamais concue. Chaque expedition est supervisee par nos paleontologues certifies.",
    highlights: [
      { icon: TreePine, label: "Forets prehistoriques" },
      { icon: Shield, label: "Biodome haute securite" },
      { icon: Star, label: "Observation T-Rex" },
      { icon: Users, label: "Paleontologue dedie" },
    ],
    includes: [
      "Capsule d'observation blindee",
      "Combinaison bio-protectrice",
      "Guide paleontologue certifie",
      "Kit de survie avance",
      "Drone d'observation aerien",
      "Evacuation d'urgence garantie",
    ],
    price: "A partir de 78 000 Credits Temporels",
    rating: "4.8/5",
    maxGroup: "2 personnes max.",
    bestSeason: "Toute periode",
    dangerLevel: "Modere (securise)",
  },
  "Florence, 1504": {
    longDescription:
      "Vivez l'apogee de la Renaissance italienne aux cotes des plus grands genies de l'histoire. Assistez a la revelation du David de Michel-Ange, visitez l'atelier de Leonard de Vinci, et profitez de visites privees des collections Medicis avant qu'elles ne deviennent des musees. Savourez la gastronomie toscane authentique et decouvrez Florence a son age d'or, entre art, science et politique.",
    highlights: [
      { icon: Palette, label: "Atelier de Leonard" },
      { icon: Landmark, label: "Revelation du David" },
      { icon: Utensils, label: "Banquet des Medicis" },
      { icon: Star, label: "Collections privees" },
    ],
    includes: [
      "Palazzo prive dans le centre",
      "Tenue Renaissance authentique",
      "Historien d'art personnel",
      "Acces ateliers des maitres",
      "Banquet prive Medicis",
      "Cours de peinture Renaissance",
    ],
    price: "A partir de 52 000 Credits Temporels",
    rating: "5.0/5",
    maxGroup: "3 personnes max.",
    bestSeason: "Printemps 1504",
    dangerLevel: "Minimal",
  },
}

export function DestinationDetailModal({
  destination,
  onClose,
  onBook,
}: {
  destination: Destination | null
  onClose: () => void
  onBook: (destinationTitle: string) => void
}) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!destination) return

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleEsc)
    document.body.style.overflow = "hidden"

    // Stagger animate inner elements
    const items = modalRef.current?.querySelectorAll(".detail-stagger")
    items?.forEach((item, i) => {
      setTimeout(() => {
        item.classList.add("animate-fade-in-stagger")
      }, 200 + i * 100)
    })

    return () => {
      document.removeEventListener("keydown", handleEsc)
      document.body.style.overflow = ""
    }
  }, [destination, onClose])

  if (!destination) return null

  const details = destinationDetails[destination.title]
  if (!details) return null

  return (
    <div
      className="animate-modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`Details de ${destination.title}`}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md" />

      {/* Modal */}
      <div
        ref={modalRef}
        className="animate-modal-content relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-sm border border-border/50 bg-card"
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 border border-border/50 bg-background/80 p-2 text-muted-foreground backdrop-blur-sm transition-colors duration-200 hover:text-primary"
          aria-label="Fermer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Hero image */}
        <div className="relative aspect-[21/9] w-full overflow-hidden">
          <Image
            src={destination.image || "/placeholder.svg"}
            alt={`${destination.title} - ${destination.subtitle}`}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
          <div className="absolute bottom-6 left-6">
            <span className="mb-2 inline-block border border-primary/30 bg-background/80 px-3 py-1 text-xs tracking-widest uppercase text-primary backdrop-blur-sm">
              {destination.era}
            </span>
            <h2 className="font-serif text-3xl font-semibold text-foreground md:text-4xl">
              {destination.title}
            </h2>
            <p className="text-sm tracking-widest uppercase text-primary">
              {destination.subtitle}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Stats row */}
          <div className="detail-stagger mb-8 grid grid-cols-2 gap-4 opacity-0 md:grid-cols-4">
            {[
              { icon: Star, label: "Note", value: details.rating },
              { icon: Users, label: "Groupe", value: details.maxGroup },
              { icon: Calendar, label: "Saison ideale", value: details.bestSeason },
              { icon: Shield, label: "Risque", value: details.dangerLevel },
            ].map((stat) => (
              <div
                key={stat.label}
                className="border border-border/30 bg-secondary/30 p-3 text-center"
              >
                <stat.icon className="mx-auto mb-1 h-4 w-4 text-primary/70" />
                <p className="text-[10px] tracking-widest uppercase text-muted-foreground">
                  {stat.label}
                </p>
                <p className="text-sm font-medium text-foreground">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="detail-stagger mb-8 opacity-0">
            <h3 className="mb-3 font-serif text-lg font-semibold text-foreground">
              A Propos de Cette Destination
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {details.longDescription}
            </p>
          </div>

          {/* Highlights */}
          <div className="detail-stagger mb-8 opacity-0">
            <h3 className="mb-4 font-serif text-lg font-semibold text-foreground">
              Points Forts
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {details.highlights.map((h) => (
                <div
                  key={h.label}
                  className="flex items-center gap-3 border border-border/30 bg-secondary/20 p-3 transition-colors duration-300 hover:border-primary/30"
                >
                  <h.icon className="h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm text-foreground">{h.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Includes */}
          <div className="detail-stagger mb-8 opacity-0">
            <h3 className="mb-4 font-serif text-lg font-semibold text-foreground">
              Inclus dans le Voyage
            </h3>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              {details.includes.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full bg-primary" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Price + CTA */}
          <div className="detail-stagger flex flex-col items-center gap-4 border-t border-border/30 pt-6 opacity-0 md:flex-row md:justify-between">
            <div>
              <p className="text-xs tracking-widest uppercase text-muted-foreground">
                Tarif
              </p>
              <p className="font-serif text-xl font-semibold text-primary">
                {details.price}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                onClose()
                onBook(destination.title)
              }}
              className="group flex items-center gap-3 border border-primary bg-primary px-8 py-3 text-sm font-medium tracking-[0.2em] uppercase text-primary-foreground transition-all duration-300 hover:bg-transparent hover:text-primary hover:shadow-[0_0_25px_hsl(43_56%_52%_/_0.2)]"
            >
              Reserver Maintenant
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
