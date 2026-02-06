"use client"

import { useEffect, useRef } from "react"
import { Shield, Compass, Clock, Gem } from "lucide-react"

const features = [
  {
    icon: Clock,
    title: "Navigation Temporelle de Precision",
    description:
      "Notre technologie propriétaire de chronochamp garantit une précision absolue, vous déposant à quelques secondes du moment désiré dans l'histoire.",
  },
  {
    icon: Shield,
    title: "Discrétion Absolue",
    description:
      "Chaque voyage est protégé par nos protocoles de furtivité temporelle. Votre présence dans toute époque reste totalement indétectable.",
  },
  {
    icon: Compass,
    title: "Expériences Sur Mesure",
    description:
      "Nos historiens et concierges conçoivent des itinéraires personnalisés, vous offrant un accès exclusif aux moments les plus secrets de l'histoire.",
  },
  {
    icon: Gem,
    title: "Luxe Inégalé",
    description:
      "De la haute couture d'époque aux hébergements privés, chaque détail est conçu pour surpasser les attentes des voyageurs les plus exigeants.",
  },
]

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            // Animate heading
            const heading = entry.target.querySelector(".about-heading")
            if (heading) heading.classList.add("animate-blur-in")

            // Animate line
            const line = entry.target.querySelector(".about-line")
            if (line) {
              setTimeout(() => line.classList.add("animate-line-reveal"), 300)
            }

            // Stagger cards with alternating directions
            const children = entry.target.querySelectorAll(".feature-card")
            children.forEach((child, index) => {
              setTimeout(() => {
                child.classList.add(
                  index % 2 === 0 ? "animate-fade-in-left" : "animate-fade-in-right"
                )
              }, 400 + index * 150)
            })
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.15 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="agence" ref={sectionRef} className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-20 text-center">
          <p className="mb-4 text-xs tracking-[0.35em] uppercase text-primary">
            L{"'"}Agence
          </p>
          <h2 className="about-heading mb-6 font-serif text-4xl font-semibold tracking-tight text-foreground opacity-0 md:text-5xl">
            <span className="text-balance">Redéfinir les Frontières du Voyage</span>
          </h2>
          <div className="about-line mx-auto mb-8 h-px bg-primary/40" />
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
            TimeTravel Agency est le premier et unique service de voyage temporel
            de luxe au monde, offrant un accès exclusif aux moments les plus
            convoités de toute l{"'"}histoire humaine.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="feature-card group rounded-sm border border-border/50 bg-card p-8 opacity-0 transition-all duration-500 hover:border-primary/30 hover:bg-secondary/50"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-sm border border-primary/20 bg-primary/5 transition-all duration-500 group-hover:border-primary/40 group-hover:bg-primary/10 group-hover:scale-110">
                <feature.icon className="h-5 w-5 text-primary transition-transform duration-500 group-hover:rotate-12" />
              </div>
              <h3 className="mb-3 font-serif text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
