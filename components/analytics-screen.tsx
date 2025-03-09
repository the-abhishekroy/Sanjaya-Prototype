import React, { useState } from 'react';
import Image from 'next/image';

interface AnalyticsScreenProps {
  onNavigate: (view: 'home' | 'chatbot' | 'marketplace' | 'automation' | 'learn' | 'schemes' | 'analytics') => void;
}

export default function AnalyticsScreen({ onNavigate }: AnalyticsScreenProps) {
  return (
    <div className="h-full w-full overflow-y-auto bg-gray-950 text-gray-200 scrollbar-hide">
      {/* Header with back button */}
      <div className="sticky top-0 z-10 bg-gray-950/80 backdrop-blur-sm border-b border-gray-800">
        <div className="flex items-center p-4">
          <button 
            onClick={() => onNavigate('home')}
            className="p-2 hover:bg-gray-800 rounded-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="ml-4 text-xl font-semibold">Farm Analytics</h1>
        </div>
      </div>

      {/* Profile Section */}
      <div className="p-4 bg-gray-900/50">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full overflow-hidden">
              <Image
                src="/images/profile.jpg"
                alt="Ramesh's profile"
                width={64}
                height={64}
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 border-2 border-gray-900 rounded-full"></div>
          </div>
          <div>
            <h2 className="text-xl font-medium">Hello, Ramesh !!</h2>
            <div className="flex space-x-4 mt-1 text-sm text-gray-400">
              <span>🌾Wheat Farmer</span>
              <span>📍Guwahati</span>
              <span>🚜5 Acres</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="p-4 grid grid-cols-2 gap-4">
        {/* Financial Overview */}
        <div className="col-span-2 p-4 bg-gray-900 rounded-xl border border-gray-800">
          <h3 className="text-lg font-medium text-rose-400">Financial Overview</h3>
          <div className="mt-4 grid grid-cols-2 gap-4">
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

        {/* Farm Health */}
        <div className="col-span-2 p-4 bg-gray-900 rounded-xl border border-gray-800">
          <h3 className="text-lg font-medium text-rose-400">Farm Health</h3>
          <div className="mt-4 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Soil Moisture</span>
              <div className="w-48 h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-blue-400"></div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Nutrient Levels</span>
              <div className="w-48 h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full w-1/2 bg-green-400"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Weather Forecast */}
        <div className="col-span-2 p-4 bg-gray-900 rounded-xl border border-gray-800">
          <h3 className="text-lg font-medium text-rose-400">Weather Forecast</h3>
          <div className="mt-4 flex space-x-4 overflow-x-auto pb-2 scrollbar-hide" 
            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {[
              { day: 'Today', temp: 28, icon: 'sun' },
              { day: 'Mon', temp: 27, icon: 'cloud-sun' },
              { day: 'Tue', temp: 25, icon: 'cloud' },
              { day: 'Wed', temp: 26, icon: 'sun' },
              { day: 'Thu', temp: 29, icon: 'sun' },
              { day: 'Fri', temp: 24, icon: 'cloud-rain' },
              { day: 'Sat', temp: 25, icon: 'cloud-sun' }
            ].map((weather, index) => (
              <div key={index} className="text-center min-w-[4rem]">
                <p className="text-sm text-gray-400">{weather.day}</p>
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
                <p className="text-lg">{weather.temp}°C</p>
              </div>
            ))}
          </div>
        </div>

        {/* Task Manager */}
        <div className="col-span-2 p-4 bg-gray-900 rounded-xl border border-gray-800">
          <h3 className="text-lg font-medium text-rose-400">Today's Tasks</h3>
          <div className="mt-4 space-y-2">
            <div className="flex items-center">
              <input type="checkbox" className="mr-3" />
              <span>Water the crops at 6 AM</span>
            </div>
            <div className="flex items-center">
              <input type="checkbox" className="mr-3" />
              <span>Apply fertilizer to wheat field</span>
            </div>
          </div>
        </div>

        {/* Smart Farming Recommendations */}
        <div className="col-span-2 p-4 bg-gray-900 rounded-xl border border-gray-800">
          <h3 className="text-lg font-medium text-rose-400">Smart Recommendations</h3>
          
          {/* Fertilizer & Pesticide Suggestions */}
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
  );
}