import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import DataVisualizer from './data-visualizer';
import { GradientBackground } from './ui/gradient-background';

// Add new types for analytics data
interface CropData {
  name: string;
  area: number;
  yield: number;
  revenue: number;
}

interface SoilData {
  moisture: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  ph: number;
}

interface AnalyticsScreenProps {
  onNavigate: (view: 'home' | 'chatbot' | 'marketplace' | 'automation' | 'learn' | 'schemes' | 'analytics') => void;
}

export default function AnalyticsScreen({ onNavigate }: AnalyticsScreenProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'day' | 'week' | 'month' | 'year'>('week');
  const [activeCrop, setActiveCrop] = useState<CropData>({
    name: 'Wheat',
    area: 5,
    yield: 2.5,
    revenue: 25000
  });
  
  const soilData: SoilData = {
    moisture: 75,
    nitrogen: 65,
    phosphorus: 45,
    potassium: 55,
    ph: 6.8
  };

  const quickStats = [
    {
      title: 'Yield Forecast',
      value: '2.5 tons',
      change: '+15%',
      trend: 'up',
      icon: (
        <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    {
      title: 'Soil Health',
      value: '85%',
      change: '+5%',
      trend: 'up',
      icon: (
        <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7c-2 0-3 1-3 3z" />
        </svg>
      )
    },
    {
      title: 'Water Usage',
      value: '450L',
      change: '-10%',
      trend: 'down',
      icon: (
        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M20 7l-8 4m0 6l-8-4m8 4l8-4m-8-4L4 7" />
        </svg>
      )
    }
  ];

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
                  onClick={() => onNavigate('home')}
                  className="p-2 hover:bg-gray-800/50 rounded-lg transition-all"
                >
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div>
                  <h1 className="text-xl font-semibold bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">
                    Farm Analytics
                  </h1>
                  <p className="text-sm text-gray-400">Track your farm's performance</p>
                </div>
              </div>

              {/* Add Timeframe Selector */}
              <div className="flex items-center space-x-2 px-4 py-2 bg-gray-800/40 rounded-lg">
                {['day', 'week', 'month', 'year'].map((timeframe) => (
                  <button
                    key={timeframe}
                    onClick={() => setSelectedTimeframe(timeframe as typeof selectedTimeframe)}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-all
                              ${selectedTimeframe === timeframe
                                ? 'bg-cyan-500/20 text-cyan-400'
                                : 'text-gray-400 hover:text-gray-300'}`}
                  >
                    {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
                  </button>
                ))}
              </div>

              {/* Profile Quick View */}
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <h2 className="text-sm font-medium text-gray-200">Ramesh</h2>
                  <p className="text-xs text-gray-400">🌾 Wheat Farmer</p>
                </div>
                <motion.div 
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-10 h-10 rounded-xl overflow-hidden ring-2 ring-gray-800">
                    <Image
                      src="/images/profile.jpg"
                      alt="Profile"
                      width={40}
                      height={40}
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-gray-900 rounded-full"></div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Content */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative flex-1 overflow-auto scrollbar-hide"
      >
        <div className="max-w-6xl mx-auto p-6">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {quickStats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 
                          ring-1 ring-gray-800 hover:ring-cyan-500/30
                          transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className="p-2 bg-gray-800/50 rounded-lg">{stat.icon}</div>
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    stat.trend === 'up' 
                      ? 'text-emerald-400 bg-emerald-500/10' 
                      : 'text-rose-400 bg-rose-500/10'
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <div className="mt-3">
                  <h3 className="text-gray-400 text-sm font-medium">{stat.title}</h3>
                  <p className="text-2xl font-semibold text-gray-200 mt-1">{stat.value}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Chart Section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-gray-900 rounded-xl border border-gray-800">
                <DataVisualizer />
              </div>

              {/* Weather Forecast */}
              <div className="p-4 bg-gray-900 rounded-xl border border-gray-800">
                <h3 className="text-lg font-medium text-blue-400">Weather Forecast</h3>
                <div className="mt-4 grid grid-cols-7 gap-2">
                  {[
                    { day: 'Today', temp: 28, icon: 'sun' },
                    { day: 'Mon', temp: 27, icon: 'cloud-sun' },
                    { day: 'Tue', temp: 25, icon: 'cloud' },
                    { day: 'Wed', temp: 26, icon: 'sun' },
                    { day: 'Thu', temp: 29, icon: 'sun' },
                    { day: 'Fri', temp: 24, icon: 'cloud-rain' },
                    { day: 'Sat', temp: 25, icon: 'cloud-sun' }
                  ].map((weather, index) => (
                    <div key={index} className="text-center p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors">
                      <p className="text-sm font-medium text-gray-400">{weather.day}</p>
                      {weather.icon === 'sun' && (
                        <svg className="w-8 h-8 mx-auto my-2 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                        </svg>
                      )}
                      {weather.icon === 'cloud' && (
                        <svg className="w-8 h-8 mx-auto my-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
                        </svg>
                      )}
                      {weather.icon === 'cloud-sun' && (
                        <svg className="w-8 h-8 mx-auto my-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8zM11 3.055A9 9 0 1012.945 5 9 9 0 0011 3.055z" />
                        </svg>
                      )}
                      {weather.icon === 'cloud-rain' && (
                        <svg className="w-8 h-8 mx-auto my-2 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M3.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1111.5 16h-8zm9.447-3.635L14 11.41V10a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      )}
                      <p className="text-lg font-medium">{weather.temp}°C</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Farm Health */}
              <div className="p-4 bg-gray-900 rounded-xl border border-gray-800">
                <h3 className="text-lg font-medium text-green-400">Farm Health</h3>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Soil Moisture</span>
                      <div className="w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full w-3/4 bg-blue-400"></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Nutrient Levels</span>
                      <div className="w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full w-1/2 bg-green-400"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Add Soil Health Panel */}
            <div className="lg:col-span-1 space-y-6">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-4 bg-gray-900/50 backdrop-blur-sm rounded-xl 
                          ring-1 ring-gray-800 hover:ring-cyan-500/30"
              >
                <h3 className="text-lg font-medium text-cyan-400 mb-4">Soil Analysis</h3>
                <div className="space-y-4">
                  {Object.entries(soilData).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-400 capitalize">
                          {key}
                        </span>
                        <span className="text-sm text-gray-200">{value}{key === 'ph' ? '' : '%'}</span>
                      </div>
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${key === 'ph' ? (value/14)*100 : value}%` }}
                          className={`h-full rounded-full ${
                            value >= 70 ? 'bg-emerald-400' :
                            value >= 40 ? 'bg-amber-400' : 'bg-rose-400'
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Financial Overview */}
              <div className="p-4 bg-gray-900 rounded-xl border border-gray-800">
                <h3 className="text-lg font-medium text-amber-400">Financial Overview</h3>
                <div className="mt-4 space-y-3">
                  <div className="p-3 bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-400">Monthly Income</p>
                    <p className="text-xl font-medium text-green-400">₹25,000</p>
                  </div>
                  <div className="p-3 bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-400">Monthly Expenses</p>
                    <p className="text-xl font-medium text-red-400">₹15,000</p>
                  </div>
                </div>
              </div>

              {/* Task Manager */}
              <div className="p-4 bg-gray-900 rounded-xl border border-gray-800">
                <h3 className="text-lg font-medium text-purple-400">Today's Tasks</h3>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center">
                    <input type="checkbox" className="mr-3 text-gray-400" />
                    <span>Water the crops at 6 AM</span>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="mr-3 text-gray-400" />
                    <span>Apply fertilizer to wheat field</span>
                  </div>
                </div>
              </div>

              {/* Smart Recommendations */}
              <div className="p-4 bg-gray-900 rounded-xl border border-gray-800">
                <h3 className="text-lg font-medium text-rose-400">Smart Recommendations</h3>
                <div className="mt-4 space-y-3">
                  <div className="mt-4 p-3 bg-gray-800/50 rounded-lg border border-green-900/30">
                    <div className="flex items-start">
                      <div className="p-2 bg-green-500/10 rounded-lg">
                        <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                      </div>
                      <div className="ml-3 flex-1">
                        <h4 className="text-sm font-medium text-green-400">Fertilizer Suggestion</h4>
                        <p className="mt-1 text-xs text-gray-400">Based on soil analysis, apply nitrogen-rich organic fertilizer. Recommended: Vermicompost (5kg/acre)</p>
                      </div>
                    </div>
                  </div>

                  {/* Alternative Crop Suggestions */}
                  <div className="mt-3 p-3 bg-gray-800/50 rounded-lg border border-blue-900/30">
                    <div className="flex items-start">
                      <div className="p-2 bg-blue-500/10 rounded-lg">
                        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                        </svg>
                      </div>
                      <div className="ml-3 flex-1">
                        <h4 className="text-sm font-medium text-blue-400">Crop Rotation Suggestion</h4>
                        <p className="mt-1 text-xs text-gray-400">Consider planting pulses next season. Market trends show 25% higher profits for organic lentils.</p>
                      </div>
                    </div>
                  </div>

                  {/* Sustainable Farming Tips */}
                  <div className="mt-3 p-3 bg-gray-800/50 rounded-lg border border-amber-900/30">
                    <div className="flex items-start">
                      <div className="p-2 bg-amber-500/10 rounded-lg">
                        <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <div className="ml-3 flex-1">
                        <h4 className="text-sm font-medium text-amber-400">Water Conservation Tip</h4>
                        <p className="mt-1 text-xs text-gray-400">Install drip irrigation to reduce water usage by 40%. Estimated cost recovery: 8 months</p>
                      </div>
                    </div>
                  </div>

                  <button className="mt-4 w-full py-2 px-4 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg text-sm">
                    View All Recommendations
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}