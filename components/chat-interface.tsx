"use client"

import { useState, useCallback } from "react"
import ChatBot from "./ChatBot"
import ChatAvatar from "./chat-avatar"

export default function ChatInterface() {
  const [isTalking, setIsTalking] = useState(false)

  const handleTalkingState = useCallback((talking: boolean) => {
    setIsTalking(talking)
  }, [])

  return (
    <div className="flex h-full flex-col bg-gray-900"> {/* Added bg-gray-900 */}
      <div className="flex justify-center p-4 bg-gray-900"> {/* Added bg-gray-900 */}
        <ChatAvatar isTalking={isTalking} />
      </div>

      <div className="flex-1 overflow-hidden bg-gray-900"> {/* Added bg-gray-900 */}
        <ChatBot onTalkingStateChange={handleTalkingState} />
      </div>
    </div>
  )
}

