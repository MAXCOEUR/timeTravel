"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, RefreshCw, ArrowRight, Sparkles } from "lucide-react"

const questions = [
  {
    id: 1,
    question: "Quel type d'expérience recherchez-vous ?",
    options: [
      { text: "Culturelle et artistique", value: "art" },
      { text: "Aventure et nature", value: "nature" },
      { text: "Élégance et raffinement", value: "luxury" },
    ],
  },
  {
    id: 2,
    question: "Votre période préférée ?",
    options: [
      { text: "Histoire moderne (XIXe-XXe siècle)", value: "luxury" },
      { text: "Temps anciens et origines", value: "nature" },
      { text: "Renaissance et classicisme", value: "art" },
    ],
  },
  {
    id: 3,
    question: "Vous préférez :",
    options: [
      { text: "L'effervescence urbaine", value: "luxury" },
      { text: "La nature sauvage", value: "nature" },
      { text: "L'art et l'architecture", value: "art" },
    ],
  },
  {
    id: 4,
    question: "Votre activité idéale :",
    options: [
      { text: "Visiter des monuments", value: "luxury" },
      { text: "Observer la faune", value: "nature" },
      { text: "Explorer des musées", value: "art" },
    ],
  },
]

const results = {
  luxury: {
    title: "Paris, 1889",
    description: "Vous avez soif d'élégance et de prestige. La Belle Époque vous attend avec ses lumières scintillantes et l'effervescence de l'Exposition Universelle.",
    image: "/images/paris-1889.jpg",
  },
  nature: {
    title: "Période Crétacé",
    description: "L'explorateur en vous a parlé. Rien ne vaut la pureté sauvage d'un monde avant l'humanité pour satisfaire votre besoin d'aventure.",
    image: "/images/cretaceous.jpg",
  },
  art: {
    title: "Florence, 1504",
    description: "Votre âme d'esthète trouvera son bonheur dans les rues de Florence, aux côtés des plus grands génies que l'humanité ait portés.",
    image: "/images/florence-1504.jpg",
  },
}

export function QuizSection() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [showResult, setShowResult] = useState(false)

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, value]
    setAnswers(newAnswers)

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setShowResult(true)
    }
  }

  const resetQuiz = () => {
    setCurrentStep(0)
    setAnswers([])
    setShowResult(false)
  }

  // Calcul du résultat dominant
  const getRecommendation = () => {
    const counts = answers.reduce((acc, val) => {
      acc[val] = (acc[val] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    
    return Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b)) as keyof typeof results
  }

  const recommendation = showResult ? results[getRecommendation()] : null

  return (
    <section  id="quiz" className="py-24 bg-background relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl mb-4 text-foreground">Trouvez votre Époque</h2>
          <div className="h-px w-20 bg-primary/50 mx-auto"></div>
        </div>

        <div className="min-h-[400px] border border-primary/20 bg-card/50 backdrop-blur-sm p-8 rounded-sm shadow-2xl">
          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key="question"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="flex justify-between items-end">
                  <span className="text-xs tracking-[0.2em] text-primary uppercase">Question {currentStep + 1}/{questions.length}</span>
                </div>
                
                <h3 className="text-xl md:text-2xl font-medium text-foreground">
                  {questions[currentStep].question}
                </h3>

                <div className="grid gap-4">
                  {questions[currentStep].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option.value)}
                      className="group flex items-center justify-between border border-primary/20 bg-secondary/30 p-4 text-left transition-all hover:border-primary hover:bg-primary/10"
                    >
                      <span className="text-sm md:text-base group-hover:text-primary transition-colors">{option.text}</span>
                      <ArrowRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6"
              >
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <Sparkles className="h-8 w-8 text-primary animate-pulse" />
                </div>
                <h3 className="text-sm tracking-[0.3em] uppercase text-primary">Votre Destination Idéale</h3>
                <h4 className="font-serif text-4xl text-foreground">{recommendation?.title}</h4>
                <p className="text-muted-foreground leading-relaxed italic">
                  "{recommendation?.description}"
                </p>
                
                <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={() => window.location.href = '#destinations'}
                    className="bg-primary text-primary-foreground px-8 py-3 text-xs tracking-[0.2em] uppercase font-bold hover:bg-transparent hover:text-primary border border-primary transition-all"
                  >
                    Réserver ce voyage
                  </button>
                  <button 
                    onClick={resetQuiz}
                    className="flex items-center justify-center gap-2 border border-primary/30 px-8 py-3 text-xs tracking-[0.2em] uppercase text-primary hover:bg-primary/5 transition-all"
                  >
                    <RefreshCw className="h-3 w-3" /> Recommencer
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}