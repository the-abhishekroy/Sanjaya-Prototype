"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Mic, MicOff } from "lucide-react"
import { GoogleGenerativeAI } from "@google/generative-ai"
import ReactMarkdown from 'react-markdown'

// Initialize Gemini with api key
const genAI = new GoogleGenerativeAI("AIzaSyCPz6mnZ3IxUtVTwpAKFqL8J9P107o7PwA")

// Create chat model
const model = genAI.getGenerativeModel({ 
  model: "gemini-2.0-flash",
})

// Create chat instance
const chat = model.startChat({
  history: [
    {
      role: "user",
      parts: "You are Sanjaya, a farming AI assistant. You only answer questions related to farming, agriculture, and crops. Keep responses focused and practical.",
    },
    {
      role: "model",
      parts: "I understand. I am Sanjaya, your farming assistant. I will focus only on providing helpful information about farming, agriculture, and crops. How can I assist you today?"
    }
  ],
  generationConfig: {
    maxOutputTokens: 8192,
    temperature: 0.9,
    topP: 0.95,
    topK: 40,
  }
})

interface Message {
  role: "user" | "assistant"
  content: string
}

interface ChatBotProps {
  onTalkingStateChange: (talking: boolean) => void
}

const formatResponse = (text: string) => {
  // First, replace markdown headers with HTML headers
  text = text.replace(/^#\s+(.*)$/gm, '<h3 class="text-lg font-medium text-blue-400 mt-4">$1</h3>')
  
  // Replace numbered lists with proper formatting
  text = text.replace(/^\d+\.\s+(.*)$/gm, '<div class="mt-3"><strong>$1</strong></div>')
  
  // Replace bullet points with proper formatting
  text = text.replace(/^\*\s+(.*)$/gm, '<div class="ml-4 mt-2">• $1</div>')
  
  // Replace bold text
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  
  // Add paragraph breaks
  text = text.split('\n\n').map(paragraph => {
    if (paragraph.trim().startsWith('<')) return paragraph
    return `<p class="mt-3">${paragraph}</p>`
  }).join('')
  
  return text
}

export default function ChatBot({ onTalkingStateChange }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "👋 Hi! I'm Sanjaya, your Farming AI assistant. Ask me anything about farming!"
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
    setMessages(prev => [...prev, { role: "user", content: userMessage }])
    setIsLoading(true)
    onTalkingStateChange(true)

    try {
      // Fixed: Send message with correct format
      const result = await chat.sendMessage(userMessage)
      const assistantMessage = formatResponse(result.response.text())

      setMessages(prev => [
        ...prev,
        { role: "assistant", content: assistantMessage }
      ])
    } catch (error) {
      console.error("Chat error:", error)
      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: "I apologize, but I'm having trouble processing your request. Please try again."
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
    <div className="flex h-full flex-col bg-gray-900">
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
                  : "bg-gray-800 text-white shadow [&_p]:mt-3 [&_strong]:text-blue-400 [&_h3]:mb-2"
              }`}
              dangerouslySetInnerHTML={{ __html: message.content }}
            />
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-800 text-white rounded-lg px-4 py-2 shadow">
              Thinking...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="border-t border-gray-800 bg-gray-900 p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 rounded-lg border border-gray-700 bg-gray-800 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
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