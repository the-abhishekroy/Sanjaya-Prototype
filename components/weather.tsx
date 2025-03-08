interface WeatherProps {
  onBack: () => void;
}

export default function Weather({ onBack }: WeatherProps) {
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
        <h2 className="ml-4 text-lg font-medium text-gray-200">Weather Information</h2>
      </div>

      <div className="flex-1 p-6 overflow-auto">
        {/* Current Weather */}
        <div className="bg-gray-900 p-6 rounded-xl ring-1 ring-yellow-500/30 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-medium text-gray-200">28°C</h3>
              <p className="text-yellow-400">Partly Cloudy</p>
            </div>
            <svg className="w-12 h-12 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
        </div>

        {/* Forecast */}
        <h3 className="text-lg font-medium text-gray-200 mb-4">5-Day Forecast</h3>
        <div className="grid grid-cols-5 gap-2">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day) => (
            <div key={day} className="bg-gray-900 p-3 rounded-xl ring-1 ring-gray-800 text-center">
              <span className="text-sm text-gray-400">{day}</span>
              <div className="my-2 text-yellow-400">
                <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-200">27°C</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}