"use client"

import { useState } from "react"
import KioskDevice from "@/components/kiosk-device"
import FaceScanner from "@/components/face-scanner"
import HomeScreen from "@/components/home-screen"
import ChatInterface from "@/components/chat-interface"
import Marketplace from "@/components/marketplace"
import Automation from "@/components/automation"
import Weather from "@/components/weather"
import Learn from "@/components/learn"
import SchemesScreen from "@/components/schemes-screen"
import AnalyticsScreen from "@/components/analytics-screen"

type ViewType = 'home' | 'chatbot' | 'marketplace' | 'automation' | 'weather' | 'learn' | 'schemes' | 'analytics';

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
    setCurrentView(view)
    setShowHome(true)
  }

  const renderContent = () => {
    if (!scanComplete) {
      return <FaceScanner onScanComplete={handleScanComplete} />
    }

    if (!showHome) {
      return (
        <div className="flex h-full items-center justify-center bg-gray-900 text-white">
          {/* ...existing loading screen JSX... */}
        </div>
      )
    }

    switch (currentView) {
      case 'home':
        return <HomeScreen onNavigate={handleNavigation} />
      case 'chatbot':
        return <ChatInterface onBack={() => handleNavigation('home')} />
      case 'marketplace':
        return <Marketplace onBack={() => handleNavigation('home')} />
      case 'automation':
        return <Automation onBack={() => handleNavigation('home')} />
      case 'weather':
        return <Weather onBack={() => handleNavigation('home')} />
      case 'learn':
        return <Learn onBack={() => handleNavigation('home')} />
      case 'schemes':
        return <SchemesScreen onNavigate={handleNavigation} />
      case 'analytics':
        return <AnalyticsScreen onNavigate={handleNavigation} />
      default:
        return <HomeScreen onNavigate={handleNavigation} />
    }
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








