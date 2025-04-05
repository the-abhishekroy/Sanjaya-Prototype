import { motion } from 'framer-motion'
import { GradientBackground } from './ui/gradient-background'

interface AutomationProps {
  onBack: () => void;
}

// Add this interface for type safety
interface AutomationFeature {
  title: string;
  description: string;
  action: string;
  status?: string;
  icon: JSX.Element;
}

const automationFeatures: AutomationFeature[] = [
  {
    title: 'Smart Irrigation',
    description: 'AI-powered water management based on soil moisture and weather forecasts',
    action: 'Configure',
    status: 'Active',
    icon: <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                  d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
  },
  {
    title: 'Climate Control',
    description: 'Automated greenhouse temperature and humidity regulation',
    action: 'Monitor',
    status: 'Active',
    icon: <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                  d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
          </svg>
  },
  {
    title: 'Pest Detection',
    description: 'Real-time monitoring and automated pest control systems',
    action: 'View Alerts',
    status: 'Warning',
    icon: <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
  },
  {
    title: 'Nutrient Dosing',
    description: 'Automated fertilizer application based on soil analysis',
    action: 'Adjust',
    status: 'Active',
    icon: <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
  },
  {
    title: 'Crop Monitoring',
    description: 'AI-powered growth tracking and yield prediction',
    action: 'View Stats',
    status: 'Active',
    icon: <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                  d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
  },
  {
    title: 'Weather Station',
    description: 'Local weather monitoring and forecast integration',
    action: 'View Data',
    status: 'Active',
    icon: <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                  d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
          </svg>
  }
]

export default function Automation({ onBack }: AutomationProps) {
  return (
    <div className="fixed inset-0 flex flex-col">
      <GradientBackground />

      {/* Premium Header */}
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
                  className="p-2 hover:bg-gray-800/50 rounded-lg transition-all"
                >
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                </button>
                <div>
                  <h1 className="text-xl font-semibold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                    Auto Crop Care
                  </h1>
                  <p className="text-sm text-gray-400">Smart farming automation controls</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative flex-1 overflow-auto scrollbar-hide"
      >
        <div className="max-w-6xl mx-auto p-6">
          {/* Status Overview Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              {
                title: 'Irrigation Status',
                content: (
                  <div className="flex items-center space-x-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-sm text-gray-400">Active</span>
                  </div>
                )
              },
              {
                title: 'Soil Moisture',
                content: <span className="text-2xl font-medium text-gray-200">65%</span>
              },
              {
                title: 'System Health',
                content: (
                  <div className="flex items-center space-x-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
                    <span className="text-sm text-gray-400">All Systems Normal</span>
                  </div>
                )
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="group bg-gradient-to-br from-gray-900 to-gray-800 p-4 rounded-xl 
                          ring-1 ring-purple-500/30 hover:ring-purple-500/50
                          transition-all duration-300"
              >
                <h3 className="text-purple-400 font-medium mb-2">{item.title}</h3>
                {item.content}
              </motion.div>
            ))}
          </div>

          {/* Automation Features */}
          <div className="space-y-4">
            {automationFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="group bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl 
                          ring-1 ring-gray-800 hover:ring-purple-500/30
                          transition-all duration-300"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center
                                  group-hover:bg-purple-500/20 transition-colors duration-300
                                  ring-1 ring-purple-500/20 group-hover:ring-purple-500/30">
                      {feature.icon}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="text-purple-400 font-medium group-hover:text-purple-300 transition-colors">
                          {feature.title}
                        </h4>
                        {feature.status && (
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium
                                        ${feature.status === 'Warning' 
                                          ? 'bg-amber-500/10 text-amber-400' 
                                          : 'bg-green-500/10 text-green-400'}`}>
                            {feature.status}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-400 mt-1 max-w-md">{feature.description}</p>
                    </div>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-purple-500/10 text-purple-400 rounded-lg 
                             hover:bg-purple-500/20 transition-all duration-300
                             whitespace-nowrap ml-4"
                  >
                    {feature.action}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}