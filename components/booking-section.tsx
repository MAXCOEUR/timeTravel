"use client"

import { useEffect, useRef, useState } from "react"
import { CalendarDays, MapPin, ArrowRight } from "lucide-react"
import { BookingFormModal } from "./booking-form-modal"

export function BookingSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [destination, setDestination] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const heading = entry.target.querySelector(".booking-heading")
            if (heading) heading.classList.add("animate-blur-in")

            const card = entry.target.querySelector(".booking-card")
            if (card) {
              setTimeout(() => card.classList.add("animate-scale-in"), 400)
            }

            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleSubmit = () => {
    setModalOpen(true)
  }

  return (
    <>
      <section id="reservation" ref={sectionRef} className="relative py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="booking-heading mb-16 text-center opacity-0">
            <p className="mb-4 text-xs tracking-[0.35em] uppercase text-primary">
              Reservations
            </p>
            <h2 className="mb-6 font-serif text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
              <span className="text-balance">Commencez Votre Voyage</span>
            </h2>
            <p className="mx-auto max-w-xl text-lg leading-relaxed text-muted-foreground">
              Selectionnez votre destination et vos dates de voyage preferees pour
              commencer a planifier votre odyssee temporelle.
            </p>
          </div>

          <div className="booking-card mx-auto max-w-4xl rounded-sm border border-border/50 bg-card p-6 opacity-0 md:p-8">
            <div className="grid gap-6 md:grid-cols-4 md:items-end">
              {/* Destination */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="destination"
                  className="flex items-center gap-2 text-xs tracking-widest uppercase text-muted-foreground"
                >
                  <MapPin className="h-3.5 w-3.5 text-primary/60" />
                  Destination
                </label>
                <select
                  id="destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground outline-none transition-all duration-300 focus:border-primary/50 focus:shadow-[0_0_10px_hsl(43_56%_52%_/_0.1)]"
                >
                  <option value="">{"Choisir une epoque"}</option>
                  <option value="Paris, 1889">Paris, 1889</option>
                  <option value="Periode Cretace">{"Periode Cretace"}</option>
                  <option value="Florence, 1504">Florence, 1504</option>
                  <option value="Egypte, 2500 av. J.-C.">{"Egypte, 2500 av. J.-C."}</option>
                  <option value="Rome, 44 av. J.-C.">Rome, 44 av. J.-C.</option>
                </select>
              </div>

              {/* Start Date */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="start-date"
                  className="flex items-center gap-2 text-xs tracking-widest uppercase text-muted-foreground"
                >
                  <CalendarDays className="h-3.5 w-3.5 text-primary/60" />
                  {"Depart"}
                </label>
                <input
                  id="start-date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground outline-none transition-all duration-300 focus:border-primary/50 focus:shadow-[0_0_10px_hsl(43_56%_52%_/_0.1)]"
                />
              </div>

              {/* End Date */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="end-date"
                  className="flex items-center gap-2 text-xs tracking-widest uppercase text-muted-foreground"
                >
                  <CalendarDays className="h-3.5 w-3.5 text-primary/60" />
                  Retour
                </label>
                <input
                  id="end-date"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground outline-none transition-all duration-300 focus:border-primary/50 focus:shadow-[0_0_10px_hsl(43_56%_52%_/_0.1)]"
                />
              </div>

              {/* CTA */}
              <button
                type="button"
                onClick={handleSubmit}
                className="group flex items-center justify-center gap-2 border border-primary bg-primary px-6 py-3 text-sm font-medium tracking-[0.15em] uppercase text-primary-foreground transition-all duration-300 hover:bg-transparent hover:text-primary hover:shadow-[0_0_20px_hsl(43_56%_52%_/_0.15)]"
              >
                Demander
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            <p className="mt-6 text-center text-xs text-muted-foreground">
              Un concierge temporel dedie vous contactera sous 24 heures pour
              finaliser votre itineraire sur mesure.
            </p>
          </div>
        </div>
      </section>

      {/* Booking Form Modal */}
      <BookingFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        preselectedDestination={destination}
      />
    </>
  )
}
