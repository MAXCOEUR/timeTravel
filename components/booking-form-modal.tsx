"use client"

import React from "react"

import { useEffect, useRef, useState } from "react"
import { X, User, Mail, Phone, MapPin, CalendarDays, Users, MessageSquare, Check, Loader2 } from "lucide-react"

export function BookingFormModal({
  isOpen,
  onClose,
  preselectedDestination,
}: {
  isOpen: boolean
  onClose: () => void
  preselectedDestination?: string
}) {
  const modalRef = useRef<HTMLDivElement>(null)
  const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle")
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    email: "",
    phone: "",
    destination: preselectedDestination || "",
    startDate: "",
    endDate: "",
    travelers: "1",
    message: "",
  })

  useEffect(() => {
    if (preselectedDestination) {
      setFormData((prev) => ({ ...prev, destination: preselectedDestination }))
    }
  }, [preselectedDestination])

  useEffect(() => {
    if (!isOpen) return

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleEsc)
    document.body.style.overflow = "hidden"

    // Animate fields
    const items = modalRef.current?.querySelectorAll(".form-field-stagger")
    items?.forEach((item, i) => {
      setTimeout(() => {
        item.classList.add("animate-fade-in-stagger")
      }, 150 + i * 80)
    })

    return () => {
      document.removeEventListener("keydown", handleEsc)
      document.body.style.overflow = ""
    }
  }, [isOpen, onClose])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormState("submitting")
    setTimeout(() => {
      setFormState("success")
    }, 2000)
  }

  const handleReset = () => {
    setFormState("idle")
    setFormData({
      lastName: "",
      firstName: "",
      email: "",
      phone: "",
      destination: "",
      startDate: "",
      endDate: "",
      travelers: "1",
      message: "",
    })
    onClose()
  }

  if (!isOpen) return null

  const inputClasses =
    "w-full border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground outline-none transition-all duration-300 focus:border-primary/50 focus:shadow-[0_0_12px_hsl(43_56%_52%_/_0.12)] placeholder:text-muted-foreground/50"

  return (
    <div
      className="animate-modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          if (formState === "success") handleReset()
          else onClose()
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Formulaire de reservation"
    >
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md" />

      <div
        ref={modalRef}
        className="animate-modal-content relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-sm border border-border/50 bg-card"
      >
        {/* Close */}
        <button
          type="button"
          onClick={() => {
            if (formState === "success") handleReset()
            else onClose()
          }}
          className="absolute top-4 right-4 z-10 border border-border/50 bg-background/80 p-2 text-muted-foreground backdrop-blur-sm transition-colors duration-200 hover:text-primary"
          aria-label="Fermer"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <p className="mb-2 text-xs tracking-[0.35em] uppercase text-primary">
              Reservation
            </p>
            <h2 className="mb-2 font-serif text-3xl font-semibold text-foreground">
              Demande de Voyage
            </h2>
            <div className="mx-auto mb-4 h-px w-16 bg-primary/50" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              Remplissez le formulaire ci-dessous et notre concierge temporel vous
              contactera sous 24 heures.
            </p>
          </div>

          {formState === "success" ? (
            <div className="animate-scale-in flex flex-col items-center gap-4 py-12 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary bg-primary/10">
                <Check className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-foreground">
                Demande Envoyee
              </h3>
              <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                Merci pour votre interet. Un concierge temporel dedie prendra
                contact avec vous dans les plus brefs delais pour finaliser votre
                itineraire sur mesure.
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="mt-4 border border-primary bg-primary px-8 py-3 text-sm font-medium tracking-[0.15em] uppercase text-primary-foreground transition-all duration-300 hover:bg-transparent hover:text-primary"
              >
                Fermer
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Nom / Prenom */}
              <div className="form-field-stagger grid gap-4 opacity-0 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="booking-lastName"
                    className="flex items-center gap-2 text-xs tracking-widest uppercase text-muted-foreground"
                  >
                    <User className="h-3.5 w-3.5 text-primary/60" />
                    Nom
                  </label>
                  <input
                    id="booking-lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Dupont"
                    className={inputClasses}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="booking-firstName"
                    className="flex items-center gap-2 text-xs tracking-widest uppercase text-muted-foreground"
                  >
                    <User className="h-3.5 w-3.5 text-primary/60" />
                    Prenom
                  </label>
                  <input
                    id="booking-firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Marie"
                    className={inputClasses}
                  />
                </div>
              </div>

              {/* Email / Telephone */}
              <div className="form-field-stagger grid gap-4 opacity-0 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="booking-email"
                    className="flex items-center gap-2 text-xs tracking-widest uppercase text-muted-foreground"
                  >
                    <Mail className="h-3.5 w-3.5 text-primary/60" />
                    Email
                  </label>
                  <input
                    id="booking-email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="marie@exemple.com"
                    className={inputClasses}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="booking-phone"
                    className="flex items-center gap-2 text-xs tracking-widest uppercase text-muted-foreground"
                  >
                    <Phone className="h-3.5 w-3.5 text-primary/60" />
                    Telephone
                  </label>
                  <input
                    id="booking-phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+33 6 12 34 56 78"
                    className={inputClasses}
                  />
                </div>
              </div>

              {/* Destination */}
              <div className="form-field-stagger flex flex-col gap-2 opacity-0">
                <label
                  htmlFor="booking-destination"
                  className="flex items-center gap-2 text-xs tracking-widest uppercase text-muted-foreground"
                >
                  <MapPin className="h-3.5 w-3.5 text-primary/60" />
                  Destination
                </label>
                <select
                  id="booking-destination"
                  name="destination"
                  required
                  value={formData.destination}
                  onChange={handleChange}
                  className={inputClasses}
                >
                  <option value="">Choisir une epoque</option>
                  <option value="Paris, 1889">Paris, 1889 - Belle Epoque</option>
                  <option value="Periode Cretace">Periode Cretace - Dinosaures</option>
                  <option value="Florence, 1504">Florence, 1504 - Renaissance</option>
                  <option value="Egypte, 2500 av. J.-C.">Egypte, 2500 av. J.-C.</option>
                  <option value="Rome, 44 av. J.-C.">Rome, 44 av. J.-C.</option>
                </select>
              </div>

              {/* Dates + Voyageurs */}
              <div className="form-field-stagger grid gap-4 opacity-0 md:grid-cols-3">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="booking-startDate"
                    className="flex items-center gap-2 text-xs tracking-widest uppercase text-muted-foreground"
                  >
                    <CalendarDays className="h-3.5 w-3.5 text-primary/60" />
                    Depart
                  </label>
                  <input
                    id="booking-startDate"
                    name="startDate"
                    type="date"
                    required
                    value={formData.startDate}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="booking-endDate"
                    className="flex items-center gap-2 text-xs tracking-widest uppercase text-muted-foreground"
                  >
                    <CalendarDays className="h-3.5 w-3.5 text-primary/60" />
                    Retour
                  </label>
                  <input
                    id="booking-endDate"
                    name="endDate"
                    type="date"
                    required
                    value={formData.endDate}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="booking-travelers"
                    className="flex items-center gap-2 text-xs tracking-widest uppercase text-muted-foreground"
                  >
                    <Users className="h-3.5 w-3.5 text-primary/60" />
                    Voyageurs
                  </label>
                  <select
                    id="booking-travelers"
                    name="travelers"
                    value={formData.travelers}
                    onChange={handleChange}
                    className={inputClasses}
                  >
                    <option value="1">1 voyageur</option>
                    <option value="2">2 voyageurs</option>
                    <option value="3">3 voyageurs</option>
                    <option value="4">4 voyageurs</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="form-field-stagger flex flex-col gap-2 opacity-0">
                <label
                  htmlFor="booking-message"
                  className="flex items-center gap-2 text-xs tracking-widest uppercase text-muted-foreground"
                >
                  <MessageSquare className="h-3.5 w-3.5 text-primary/60" />
                  Message (optionnel)
                </label>
                <textarea
                  id="booking-message"
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Decrivez vos attentes, preferences ou demandes speciales..."
                  className={`${inputClasses} resize-none`}
                />
              </div>

              {/* Submit */}
              <div className="form-field-stagger opacity-0">
                <button
                  type="submit"
                  disabled={formState === "submitting"}
                  className="group flex w-full items-center justify-center gap-3 border border-primary bg-primary px-8 py-4 text-sm font-medium tracking-[0.2em] uppercase text-primary-foreground transition-all duration-300 hover:bg-transparent hover:text-primary hover:shadow-[0_0_25px_hsl(43_56%_52%_/_0.2)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {formState === "submitting" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    "Envoyer la Demande"
                  )}
                </button>
              </div>

              <p className="form-field-stagger text-center text-xs text-muted-foreground opacity-0">
                Vos informations sont protegees et ne seront jamais partagees avec
                des tiers. Politique de confidentialite temporelle applicable.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
