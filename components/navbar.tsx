"use client"

import { useState, useEffect } from "react"
import { Clock, Menu, X } from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-500 ${
        scrolled
          ? "border-border/50 bg-background/90 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#" className="group flex items-center gap-3">
          <Clock className="h-6 w-6 text-primary transition-transform duration-500 group-hover:rotate-[360deg]" />
          <span className="font-serif text-xl font-semibold tracking-wide text-primary">
            TimeTravel
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#agence"
            className="relative text-sm tracking-widest uppercase text-muted-foreground transition-colors hover:text-primary after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
          >
            Agence
          </a>
          <a
            href="#destinations"
            className="relative text-sm tracking-widest uppercase text-muted-foreground transition-colors hover:text-primary after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
          >
            Destinations
          </a>
          <a
            href="#reservation"
            className="border border-primary bg-primary px-6 py-2 text-sm font-medium tracking-widest uppercase text-primary-foreground transition-all duration-300 hover:bg-transparent hover:text-primary"
          >
            Reserver Maintenant
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="text-foreground transition-transform duration-300 md:hidden active:scale-90"
          aria-label="Ouvrir le menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <div
        className={`overflow-hidden border-t border-border/50 bg-background/95 backdrop-blur-md transition-all duration-500 md:hidden ${
          isOpen ? "max-h-64 opacity-100" : "max-h-0 border-transparent opacity-0"
        }`}
      >
        <div className="flex flex-col gap-4 px-6 py-6">
          <a
            href="#agence"
            onClick={() => setIsOpen(false)}
            className="text-sm tracking-widest uppercase text-muted-foreground transition-colors hover:text-primary"
          >
            Agence
          </a>
          <a
            href="#destinations"
            onClick={() => setIsOpen(false)}
            className="text-sm tracking-widest uppercase text-muted-foreground transition-colors hover:text-primary"
          >
            Destinations
          </a>
          <a
            href="#reservation"
            onClick={() => setIsOpen(false)}
            className="mt-2 border border-primary bg-primary px-6 py-2 text-center text-sm font-medium tracking-widest uppercase text-primary-foreground transition-all hover:bg-transparent hover:text-primary"
          >
            Reserver Maintenant
          </a>
        </div>
      </div>
    </nav>
  )
}
