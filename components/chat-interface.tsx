"use client"

import { useState, useCallback } from "react"
import ChatBot from "./ChatBot"
import { GradientBackground } from './ui/gradient-background'
import { motion, AnimatePresence } from 'framer-motion'

interface ChatInterfaceProps {
  onBack: () => void;
}

interface ChatAction {
  icon: JSX.Element;
  label: string;
  onClick: () => void;
}

export default function ChatInterface({ onBack }: ChatInterfaceProps) {
  const [isTalking, setIsTalking] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const [isRecording, setIsRecording] = useState(false)

  const handleTalkingState = useCallback((talking: boolean) => {
    setIsTalking(talking)
  }, [])

  const chatActions: ChatAction[] = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      ),
      label: 'Voice Input',
      onClick: () => setIsRecording(!isRecording)
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: 'Help',
      onClick: () => setShowInfo(!showInfo)
    }
  ]

  return (
    <div className="fixed inset-0 flex flex-col">
      <GradientBackground />
      
      {/* Enhanced Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10"
      >
        <div className="backdrop-blur-sm bg-gray-900/50 border-b border-gray-800/50">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={onBack} 
                  className="p-2 rounded-lg hover:bg-gray-800/50 transition-all duration-200"
                >
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div>
                  <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                    AI Crop Assistant
                  </h1>
                  <p className="text-sm text-gray-400">Get personalized farming advice</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                {chatActions.map((action, index) => (
                  <motion.button
                    key={action.label}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-2 rounded-lg transition-all duration-200
                              ${index === 0 && isRecording 
                                ? 'bg-blue-500/20 text-blue-400 ring-2 ring-blue-500/50' 
                                : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-300'}`}
                    onClick={action.onClick}
                  >
                    {action.icon}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Chat Content Area */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative flex-1 overflow-hidden"
      >
        {/* Improved Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-gray-950/50" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23333' fill-opacity='0.05' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
             }}
        />
        
        {/* Chatbot Component */}
        <div className="relative h-full">
          <ChatBot onTalkingStateChange={handleTalkingState} />
          
          {/* Enhanced Voice Indicator */}
          <AnimatePresence>
            {isTalking && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
              >
                <div className="px-4 py-2 rounded-full bg-blue-500/20 backdrop-blur-sm 
                              border border-blue-500/20 text-blue-400 
                              text-sm font-medium flex items-center space-x-2">
                  <span className="animate-pulse relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                  </span>
                  <span>AI is speaking...</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Help Info Panel */}
          <AnimatePresence>
            {showInfo && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute bottom-20 right-4 w-72 p-4 rounded-xl 
                          bg-gray-900/90 backdrop-blur-sm border border-gray-800
                          shadow-xl shadow-black/20"
              >
                <h3 className="text-lg font-medium text-blue-400 mb-2">Quick Tips</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Ask about crop diseases and solutions</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Get weather-based farming advice</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Learn about best farming practices</span>
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}

