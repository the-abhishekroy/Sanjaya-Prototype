import Link from 'next/link'
import { motion } from 'framer-motion' // Add framer-motion for animations

interface HomeScreenProps {
  onNavigate: (view: 'home' | 'chatbot' | 'marketplace' | 'automation' | 'learn' | 'schemes' | 'analytics') => void;
}

const navigationButtons = [
  {
    id: 'chatbot',
    title: 'Ask Crop Suggestion',
    description: 'AI-powered crop recommendations',
    icon: <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>,
    color: 'blue'
  },
  {
    id: 'marketplace',
    title: 'Marketplace',
    description: 'Buy and sell farm products',
    icon: <svg className="w-7 h-7 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>,
    color: 'green'
  },
  {
    id: 'automation',
    title: 'Auto Crop Care',
    description: 'Automated farming solutions',
    icon: <svg className="w-7 h-7 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                  d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
          </svg>,
    color: 'purple'
  },
  {
    id: 'learn',
    title: 'Learn',
    description: 'Educational farming content',
    icon: <svg className="w-7 h-7 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>,
    color: 'amber'
  },
  {
    id: 'schemes',
    title: 'Schemes',
    description: 'Government farming programs',
    icon: <svg className="w-7 h-7 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>,
    color: 'rose'
  },
  {
    id: 'analytics',
    title: 'Analytics',
    description: 'Farm data insights',
    icon: <svg className="w-7 h-7 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>,
    color: 'cyan'
  }
]

export default function HomeScreen({ onNavigate }: HomeScreenProps) {
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-gray-200">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="relative h-full overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <div className="p-6 pb-12">
          {/* Enhanced Welcome Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-block">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                Welcome to Sanjaya
              </h1>
              <div className="mt-2 flex items-center justify-center space-x-2">
                <span className="w-12 h-0.5 bg-gradient-to-r from-transparent via-gray-700 to-transparent"></span>
                <p className="text-sm text-gray-400">Your Smart Farming Assistant</p>
                <span className="w-12 h-0.5 bg-gradient-to-r from-transparent via-gray-700 to-transparent"></span>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Grid Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {navigationButtons.map((button, index) => (
              <motion.button 
                key={button.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => onNavigate(button.id as any)} 
                className="group text-left"
              >
                <div className={`h-44 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 p-5 
                              ring-1 ring-gray-800 hover:ring-2 hover:ring-${button.color}-500/50 
                              transition-all duration-300 ease-out
                              hover:shadow-lg hover:shadow-${button.color}-500/10`}>
                  <div className="h-full flex flex-col items-center justify-center space-y-4">
                    <div className={`w-14 h-14 rounded-xl bg-${button.color}-500/10 flex items-center justify-center
                                  group-hover:bg-${button.color}-500/20 transition-colors duration-300
                                  backdrop-blur-xl ring-1 ring-${button.color}-500/20`}>
                      {button.icon}
                    </div>
                    <div className="text-center">
                      <span className={`text-lg font-medium bg-gradient-to-r from-${button.color}-400 to-${button.color}-500 
                                     bg-clip-text text-transparent group-hover:to-${button.color}-400`}>
                        {button.title}
                      </span>
                      <p className="text-xs text-gray-400 mt-2">{button.description}</p>
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Footer Area */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 text-center"
          >
            <p className="text-xs text-gray-500">
              © 2024 Sanjaya. All rights reserved.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}