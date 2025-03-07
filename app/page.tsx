"use client"

import { useState } from "react"
import KioskDevice from "@/components/kiosk-device"
import FaceScanner from "@/components/face-scanner"
import ChatInterface from "@/components/chat-interface"
import Image from 'next/image'

export default function Home() {
  const [scanComplete, setScanComplete] = useState(false)
  const [showChat, setShowChat] = useState(false)

  const handleScanComplete = () => {
    setScanComplete(true)
    setTimeout(() => {
      setShowChat(true)
    }, 1000)
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center custom-background overflow-hidden">
      {/* Optional overlay for better readability */}
      <div className="absolute inset-0 bg-black/20" />
      
      <div className="relative w-full max-w-6xl">
        <KioskDevice>
          {!scanComplete ? (
            <FaceScanner onScanComplete={handleScanComplete} />
          ) : !showChat ? (
            <div className="flex h-full items-center justify-center bg-gray-900 text-white">
              <div className="text-center">
                <div className="mb-4 text-blue-500">
                  <svg
                    className="mx-auto h-16 w-16 animate-pulse"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-blue-400">Scan Complete</h2>
                <p className="mt-2 text-sm text-gray-400">Initializing Sanjaya Assistant...</p>
              </div>
            </div>
          ) : (
            <ChatInterface />
          )}
        </KioskDevice>
      </div>
    </main>
  )
}

