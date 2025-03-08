"use client"

import { useState, useCallback } from "react"
import ChatBot from "./ChatBot"

interface ChatInterfaceProps {
  onBack: () => void;
}

export default function ChatInterface({ onBack }: ChatInterfaceProps) {
  const [isTalking, setIsTalking] = useState(false)

  const handleTalkingState = useCallback((talking: boolean) => {
    setIsTalking(talking)
  }, [])

  return (
    <div className="flex h-full flex-col bg-gray-950">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-gray-800">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <h2 className="ml-4 text-lg font-medium text-gray-200">Crop Suggestions</h2>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-hidden bg-gray-950">
        <ChatBot onTalkingStateChange={handleTalkingState} />
      </div>
    </div>
  )
}

