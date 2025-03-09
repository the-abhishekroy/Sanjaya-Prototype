import Link from 'next/link'

interface HomeScreenProps {
  onNavigate: (view: 'home' | 'chatbot' | 'marketplace' | 'automation' | 'learn' | 'schemes' | 'analytics') => void;
}

export default function HomeScreen({ onNavigate }: HomeScreenProps) {
  return (
    <div className="w-full h-full overflow-y-auto bg-gray-950 text-gray-200 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      <div className="p-6 pb-12">
        {/* Welcome header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-blue-400">Welcome to Sanjaya</h1>
          <p className="text-sm text-gray-400 mt-2">Your Smart Farming Assistant</p>
        </div>
        {/* Grid container with gap between rows */}
        <div className="grid grid-cols-2 gap-8">
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
          <button 
            onClick={() => onNavigate('marketplace')} 
            className="group text-left"
          >
            <div className="h-40 rounded-2xl bg-gray-900 p-4 ring-1 ring-gray-800 hover:ring-green-500/50 transition-all">
              <div className="h-full flex flex-col items-center justify-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <span className="text-lg font-medium">Connect to Buyers & Sellers</span>
                <span className="text-xs text-gray-400">Trade equipment & produce</span>
              </div>
            </div>
          </button>

          {/* Auto Crop Care */}
          <button 
            onClick={() => onNavigate('automation')} 
            className="group text-left"
          >
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
          </button>

          {/* Learn & Earn */}
          <button 
            onClick={() => onNavigate('learn')} 
            className="group text-left"
          >
            <div className="h-40 rounded-2xl bg-gray-900 p-4 ring-1 ring-gray-800 hover:ring-indigo-500/50 transition-all">
              <div className="h-full flex flex-col items-center justify-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
                  <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-lg font-medium">Learn & Earn</span>
                <span className="text-xs text-gray-400">Watch tutorials & earn rewards</span>
              </div>
            </div>
          </button>

          {/* Government Schemes & Alerts */}
          <button 
            onClick={() => onNavigate('schemes')} 
            className="group text-left"
          >
            <div className="h-40 rounded-2xl bg-gray-900 p-4 ring-1 ring-gray-800 hover:ring-amber-500/50 transition-all">
              <div className="h-full flex flex-col items-center justify-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                  <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <span className="text-lg font-medium">Government Support</span>
                <span className="text-xs text-gray-400">Subsidies, loans & alerts</span>
              </div>
            </div>
          </button>

          {/* Farmer's Analytics Dashboard */}
          <button 
            onClick={() => onNavigate('analytics')} 
            className="group text-left"
          >
            <div className="h-40 rounded-2xl bg-gray-900 p-4 ring-1 ring-gray-800 hover:ring-rose-500/50 transition-all">
              <div className="h-full flex flex-col items-center justify-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center group-hover:bg-rose-500/20 transition-colors">
                  <svg className="w-6 h-6 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <span className="text-lg font-medium">Farm Analytics</span>
                <span className="text-xs text-gray-400">Track farm performance</span>
              </div>
            </div>
          </button>
        </div>
        {/* Add bottom padding for better scrolling experience */}
        <div className="h-12"></div>
      </div>
    </div>
  )
}