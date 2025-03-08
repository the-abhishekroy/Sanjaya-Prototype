"use client"

import { useState } from "react"
import KioskDevice from "@/components/kiosk-device"
import FaceScanner from "@/components/face-scanner"
import HomeScreen from "@/components/home-screen"
import ChatInterface from "@/components/chat-interface"

type ViewType = 'home' | 'chatbot';

export default function Home() {
  const [scanComplete, setScanComplete] = useState(false)
  const [showHome, setShowHome] = useState(false)
  const [currentView, setCurrentView] = useState<ViewType>('home')

  const handleScanComplete = () => {
    setScanComplete(true)
    setTimeout(() => {
      setShowHome(true)
    }, 1000)
  }

  const handleNavigation = (view: ViewType) => {
    setShowHome(true) // Ensure home is shown before navigation
    setCurrentView(view)
  }

  const renderContent = () => {
    if (!scanComplete) {
      return <FaceScanner onScanComplete={handleScanComplete} />
    }

    if (!showHome) {
      return (
        <div className="flex h-full items-center justify-center bg-gray-900 text-white">
          <div className="text-center">
            <div className="mb-4 text-blue-500">
              <svg
                className="mx-auto h-16 w-16 animate-pulse"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
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
      )
    }

    // Only render these components after showHome is true
    if (showHome) {
      return currentView === 'home' ? (
        <HomeScreen onNavigate={handleNavigation} />
      ) : (
        <ChatInterface onBack={() => handleNavigation('home')} />
      )
    }

    return null // Fallback return
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center custom-background overflow-hidden">
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative w-full max-w-6xl">
        <KioskDevice>
          {renderContent()}
        </KioskDevice>
      </div>
    </main>
  )
}








