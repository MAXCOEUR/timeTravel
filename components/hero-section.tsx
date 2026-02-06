"use client"

import { useEffect, useRef } from "react"
import { ChevronDown } from "lucide-react"

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const children = el.querySelectorAll(".hero-animate")
    children.forEach((child, i) => {
      setTimeout(() => {
        child.classList.add("animate-fade-in-up")
      }, 600 + i * 200)
    })
    const line = el.querySelector(".hero-line")
    if (line) {
      setTimeout(() => {
        line.classList.add("animate-line-reveal")
      }, 500)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
          poster="/images/paris-1889.jpg"
        >
          <source
            src="https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4"
            type="video/mp4"
          />
        </video>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-background/75" />
        {/* Vignette */}
        <div className="animate-vignette-pulse absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_hsl(220_10%_8%)_100%)]" />
        {/* Gold radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(43_56%_52%_/_0.08)_0%,_transparent_60%)]" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(43 56% 52% / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(43 56% 52% / 0.3) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Floating golden particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="animate-particle-float absolute top-1/4 left-1/4 h-1.5 w-1.5 rounded-full bg-primary/40" />
        <div
          className="animate-particle-float absolute top-1/3 right-1/3 h-2 w-2 rounded-full bg-primary/30"
          style={{ animationDelay: "1s", animationDuration: "8s" }}
        />
        <div
          className="animate-particle-float absolute bottom-1/3 left-1/2 h-1 w-1 rounded-full bg-primary/20"
          style={{ animationDelay: "2s", animationDuration: "7s" }}
        />
        <div
          className="animate-particle-float absolute top-2/3 right-1/4 h-1.5 w-1.5 rounded-full bg-primary/30"
          style={{ animationDelay: "0.5s", animationDuration: "9s" }}
        />
        <div
          className="animate-particle-float absolute top-1/2 left-1/3 h-1 w-1 rounded-full bg-primary/25"
          style={{ animationDelay: "3s", animationDuration: "10s" }}
        />
        <div
          className="animate-particle-float absolute bottom-1/4 right-1/2 h-2 w-2 rounded-full bg-primary/15"
          style={{ animationDelay: "4s", animationDuration: "11s" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <p className="hero-animate mb-6 text-xs tracking-[0.35em] uppercase text-primary opacity-0 md:text-sm">
          Voyages Temporels de Luxe depuis 2145
        </p>

        {/* Gold decorative line */}
        <div className="hero-line mx-auto mb-8 h-px bg-primary/50" />

        <h1 className="hero-animate mb-8 font-serif text-5xl font-semibold leading-tight tracking-tight text-foreground opacity-0 md:text-7xl lg:text-8xl">
          <span className="text-balance">
            Voyagez a Travers
            <br />
            <span className="text-primary">le Temps</span>
          </span>
        </h1>

        <p className="hero-animate mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-muted-foreground opacity-0 md:text-xl">
          Depassez les frontieres du present. Vivez les moments les plus
          extraordinaires de l{"'"}histoire avec un luxe et une discretion
          inegales.
        </p>

        <a
          href="#destinations"
          className="hero-animate animate-glow-pulse group inline-flex items-center gap-3 border border-primary bg-primary px-10 py-4 text-sm font-medium tracking-[0.2em] uppercase text-primary-foreground opacity-0 transition-all duration-300 hover:bg-transparent hover:text-primary"
        >
          Decouvrir nos Destinations
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
            {"->"}
          </span>
        </a>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <a href="#agence" aria-label="Defiler vers le bas">
          <ChevronDown className="h-6 w-6 animate-bounce text-primary/50" />
        </a>
      </div>
    </section>
  )
}
