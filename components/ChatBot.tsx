"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Mic, MicOff } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
}

interface ChatBotProps {
  onTalkingStateChange: (talking: boolean) => void
}

export default function ChatBot({ onTalkingStateChange }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "👋 Hi! I'm your Farming AI assistant. Say Hi! to Start "
    }
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<any>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput("")
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])
    setIsLoading(true)
    onTalkingStateChange(true)

    try {
      const response = await fetch("https://api.dhenu.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer dh-NI7ce0aFMx8M2ByJ8AVNxsFpnd3o-Q-sU3VPkpE84MA",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          model: "dhenu2-in-8b-preview", 
          messages: [
            { role: "system", content: "You are a helpful Sanjaya Farming assistant." },
            ...messages,
            { role: "user", content: userMessage }
          ],
          temperature: 0.7,
          max_tokens: 1000
        }),
      })

      const data = await response.json()
      
      // Debug logging
      console.log("API Response:", data)

      if (!response.ok) {
        throw new Error(`API error: ${response.status} - ${JSON.stringify(data)}`)
      }

      if (!data.choices?.[0]?.message?.content) {
        throw new Error("Invalid response format from API")
      }

      const assistantMessage = data.choices[0].message.content

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: assistantMessage }
      ])
    } catch (error) {
      console.error("Detailed error:", error)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Error: ${"Unknown error occurred"}`
        }
      ])
    } finally {
      setIsLoading(false)
      onTalkingStateChange(false)
    }
  }

  const startListening = () => {
    setIsListening(true)
    setInput('Listening...')

    setTimeout(() => {
      setIsListening(false)
      setInput('What should I keep in Mind while Growing Tomatoes?')
      // Auto submit after setting the input
      setTimeout(() => {
        handleSubmit({ preventDefault: () => {} } as React.FormEvent)
      }, 100)
    }, 2000)
  }

  const stopListening = () => {
    setIsListening(false)
    setInput('')
  }

  return (
    <div className="flex h-full flex-col bg-gray-900"> {/* Changed from bg-gray-50 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-800 text-white shadow" /* Changed from bg-white text-gray-800 */
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-800 text-white rounded-lg px-4 py-2 shadow"> {/* Changed from bg-white text-gray-800 */}
              Thinking...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="border-t border-gray-800 bg-gray-900 p-4"> {/* Changed from bg-white */}
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 rounded-lg border border-gray-700 bg-gray-800 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400" /* Updated input styles */
            disabled={isLoading || isListening}
          />
          <button
            type="button"
            onClick={isListening ? stopListening : startListening}
            disabled={isLoading}
            className={`rounded-lg p-2 text-white hover:opacity-80 disabled:opacity-50 ${
              isListening ? 'bg-red-500' : 'bg-green-500'
            }`}
          >
            {isListening ? (
              <MicOff className="h-5 w-5 animate-pulse" />
            ) : (
              <Mic className="h-5 w-5" />
            )}
          </button>
          <button
            type="submit"
            disabled={isLoading || isListening}
            className="rounded-lg bg-blue-500 p-2 text-white hover:bg-blue-600 disabled:opacity-50"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  )
}