"use client"

import { useEffect, useRef } from "react"
import { Clock } from "lucide-react"

export function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const cols = entry.target.querySelectorAll(".footer-col")
            cols.forEach((col, i) => {
              setTimeout(() => {
                col.classList.add("animate-fade-in-up")
              }, i * 150)
            })
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.1 }
    )

    if (footerRef.current) {
      observer.observe(footerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <footer ref={footerRef} className="border-t border-border/50 bg-secondary/20 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Marque */}
          <div className="footer-col opacity-0 md:col-span-1">
            <div className="mb-4 flex items-center gap-3">
              <Clock className="h-5 w-5 text-primary" />
              <span className="font-serif text-lg font-semibold tracking-wide text-primary">
                TimeTravel
              </span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Le premier service de voyage temporel de luxe au monde.
              Redéfinir les limites de l{"'"}expérience humaine depuis 2145.
            </p>
          </div>

          {/* Destinations */}
          <div className="footer-col opacity-0">
            <h4 className="mb-4 text-xs tracking-[0.25em] uppercase text-primary">
              {"Epoques Populaires"}
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground transition-all duration-300 hover:translate-x-1 hover:text-primary"
                >
                  Paris, 1889
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground transition-all duration-300 hover:translate-x-1 hover:text-primary"
                >
                  {"Periode Cretace"}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground transition-all duration-300 hover:translate-x-1 hover:text-primary"
                >
                  Florence, 1504
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground transition-all duration-300 hover:translate-x-1 hover:text-primary"
                >
                  {"Egypte Antique"}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground transition-all duration-300 hover:translate-x-1 hover:text-primary"
                >
                  Rome, 44 av. J.-C.
                </a>
              </li>
            </ul>
          </div>

          {/* Societe */}
          <div className="footer-col opacity-0">
            <h4 className="mb-4 text-xs tracking-[0.25em] uppercase text-primary">
              {"Societe"}
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground transition-all duration-300 hover:translate-x-1 hover:text-primary"
                >
                  A Propos
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground transition-all duration-300 hover:translate-x-1 hover:text-primary"
                >
                  {"Protocoles de Securite"}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground transition-all duration-300 hover:translate-x-1 hover:text-primary"
                >
                  {"Ethique Temporelle"}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground transition-all duration-300 hover:translate-x-1 hover:text-primary"
                >
                  {"Carrieres"}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground transition-all duration-300 hover:translate-x-1 hover:text-primary"
                >
                  Presse
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col opacity-0">
            <h4 className="mb-4 text-xs tracking-[0.25em] uppercase text-primary">
              Nous Suivre
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground transition-all duration-300 hover:translate-x-1 hover:text-primary"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground transition-all duration-300 hover:translate-x-1 hover:text-primary"
                >
                  X / Twitter
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground transition-all duration-300 hover:translate-x-1 hover:text-primary"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground transition-all duration-300 hover:translate-x-1 hover:text-primary"
                >
                  Nous Contacter
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Barre du bas */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-8 md:flex-row">
          <p className="text-xs text-muted-foreground">
            {"2145 TimeTravel Agency. Tous droits reserves a travers toutes les lignes temporelles."}
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-xs text-muted-foreground transition-colors hover:text-primary"
            >
              {"Politique de Confidentialite"}
            </a>
            <a
              href="#"
              className="text-xs text-muted-foreground transition-colors hover:text-primary"
            >
              {"Responsabilite Temporelle"}
            </a>
            <a
              href="#"
              className="text-xs text-muted-foreground transition-colors hover:text-primary"
            >
              {"Conditions d'Utilisation"}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
