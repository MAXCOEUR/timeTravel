"use client"

import React from "react"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"

function getMessageText(message: { parts?: Array<{ type: string; text?: string }> }): string {
  if (!message.parts || !Array.isArray(message.parts)) return ""
  return message.parts
    .filter((p): p is { type: "text"; text: string } => p.type === "text")
    .map((p) => p.text)
    .join("")
}

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  })

  const isLoading = status === "streaming" || status === "submitted"

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    sendMessage({ text: input })
    setInput("")
  }

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className="animate-chat-slide-up fixed right-6 bottom-24 z-50 flex h-[500px] w-[380px] flex-col overflow-hidden rounded-sm border border-border/50 bg-card shadow-2xl shadow-primary/5 max-sm:right-3 max-sm:bottom-20 max-sm:h-[420px] max-sm:w-[calc(100vw-24px)]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border/50 bg-secondary/50 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
                <Bot className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Assistant Chrono</p>
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
                  <p className="text-xs text-primary/70">Propulse par Mistral AI</p>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground transition-all duration-200 hover:rotate-90 hover:text-foreground"
              aria-label="Fermer le chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5">
            <div className="flex flex-col gap-4">
              {/* Welcome message */}
              {messages.length === 0 && (
                <div className="flex gap-3">
                  <div className="animate-levitate flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/5">
                    <Bot className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div className="rounded-sm rounded-tl-none border border-border/50 bg-secondary/50 px-4 py-3">
                    <p className="text-sm leading-relaxed text-foreground">
                      Bienvenue chez TimeTravel Agency. Posez-moi n{"'"}importe
                      quelle question sur votre prochain voyage a travers le temps...
                    </p>
                    <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                      {"A l'instant"}
                      <span className="animate-blink ml-1 inline-block h-3 w-px bg-primary/50" />
                    </p>
                  </div>
                </div>
              )}

              {/* Chat messages */}
              {messages.map((message) => {
                const text = getMessageText(message)
                if (!text) return null

                const isUser = message.role === "user"

                return (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}
                  >
                    <div
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${
                        isUser
                          ? "border-primary/40 bg-primary/20"
                          : "border-primary/20 bg-primary/5"
                      }`}
                    >
                      {isUser ? (
                        <User className="h-3.5 w-3.5 text-primary" />
                      ) : (
                        <Bot className="h-3.5 w-3.5 text-primary" />
                      )}
                    </div>
                    <div
                      className={`max-w-[75%] px-4 py-3 text-sm leading-relaxed ${
                        isUser
                          ? "rounded-sm rounded-tr-none border border-primary/30 bg-primary/10 text-foreground"
                          : "rounded-sm rounded-tl-none border border-border/50 bg-secondary/50 text-foreground"
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{text}</p>
                    </div>
                  </div>
                )
              })}

              {/* Typing indicator */}
              {isLoading && messages[messages.length - 1]?.role === "user" && (
                <div className="flex gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/5">
                    <Bot className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div className="rounded-sm rounded-tl-none border border-border/50 bg-secondary/50 px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <Loader2 className="h-3.5 w-3.5 animate-spin text-primary/60" />
                      <span className="text-xs text-muted-foreground">En train de reflechir...</span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="border-t border-border/50 bg-secondary/30 p-4">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ecrivez votre question..."
                disabled={isLoading}
                className="flex-1 border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-all duration-300 focus:border-primary/50 focus:shadow-[0_0_10px_hsl(43_56%_52%_/_0.1)] disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="flex h-10 w-10 shrink-0 items-center justify-center border border-primary bg-primary text-primary-foreground transition-all duration-300 hover:bg-transparent hover:text-primary active:scale-90 disabled:opacity-50 disabled:hover:bg-primary disabled:hover:text-primary-foreground"
                aria-label="Envoyer le message"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Floating Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="animate-glow-pulse fixed right-6 bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-primary/30 bg-primary text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-primary/30 max-sm:right-3 max-sm:bottom-3"
        aria-label={isOpen ? "Fermer le chat" : "Ouvrir le chat"}
      >
        <span
          className={`transition-transform duration-300 ${isOpen ? "rotate-90" : "rotate-0"}`}
        >
          {isOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <MessageCircle className="h-5 w-5" />
          )}
        </span>
      </button>
    </>
  )
}
