import Link from 'next/link'

interface HomeScreenProps {
  onNavigate: (view: 'home' | 'chatbot') => void;
}

export default function HomeScreen({ onNavigate }: HomeScreenProps) {
  return (
    <div className="h-full w-full p-6 bg-gray-950 text-gray-200">
      {/* Welcome header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-blue-400">Welcome to Sanjaya</h1>
        <p className="text-sm text-gray-400 mt-2">Your Smart Farming Assistant</p>
      </div>

      {/* Menu grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Ask Crop Suggestion */}
        <button 
          onClick={() => onNavigate('chatbot')} 
          className="group text-left"
        >
          <div className="h-40 rounded-2xl bg-gray-900 p-4 ring-1 ring-gray-800 hover:ring-blue-500/50 transition-all">
            <div className="h-full flex flex-col items-center justify-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <span className="text-lg font-medium">Ask Crop Suggestion</span>
              <span className="text-xs text-gray-400">AI-powered crop recommendations</span>
            </div>
          </div>
        </button>

        {/* Connect to Buyers */}
        <Link href="/marketplace" className="group">
          <div className="h-40 rounded-2xl bg-gray-900 p-4 ring-1 ring-gray-800 hover:ring-green-500/50 transition-all">
            <div className="h-full flex flex-col items-center justify-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <span className="text-lg font-medium">Connect to Buyers</span>
              <span className="text-xs text-gray-400">Trade equipment & produce</span>
            </div>
          </div>
        </Link>

        {/* Auto Crop Care */}
        <Link href="/automation" className="group">
          <div className="h-40 rounded-2xl bg-gray-900 p-4 ring-1 ring-gray-800 hover:ring-purple-500/50 transition-all">
            <div className="h-full flex flex-col items-center justify-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <span className="text-lg font-medium">Auto Crop Care</span>
              <span className="text-xs text-gray-400">Smart irrigation & monitoring</span>
            </div>
          </div>
        </Link>

        {/* Weather Info */}
        <Link href="/weather" className="group">
          <div className="h-40 rounded-2xl bg-gray-900 p-4 ring-1 ring-gray-800 hover:ring-yellow-500/50 transition-all">
            <div className="h-full flex flex-col items-center justify-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center group-hover:bg-yellow-500/20 transition-colors">
                <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <span className="text-lg font-medium">Weather Info</span>
              <span className="text-xs text-gray-400">Local weather forecasts</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}