interface AutomationProps {
  onBack: () => void;
}

export default function Automation({ onBack }: AutomationProps) {
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
        <h2 className="ml-4 text-lg font-medium text-gray-200">Auto Crop Care</h2>
      </div>

      <div className="flex-1 p-6 overflow-auto">
        {/* Status Overview Grid */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-900 p-4 rounded-xl ring-1 ring-purple-500/30">
            <h3 className="text-purple-400 font-medium mb-2">Irrigation Status</h3>
            <div className="flex items-center space-x-2">
              <div className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-sm text-gray-400">Active</span>
            </div>
          </div>
          <div className="bg-gray-900 p-4 rounded-xl ring-1 ring-purple-500/30">
            <h3 className="text-purple-400 font-medium mb-2">Soil Moisture</h3>
            <span className="text-2xl font-medium text-gray-200">65%</span>
          </div>
          <div className="bg-gray-900 p-4 rounded-xl ring-1 ring-purple-500/30">
            <h3 className="text-purple-400 font-medium mb-2">System Health</h3>
            <div className="flex items-center space-x-2">
              <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
              <span className="text-sm text-gray-400">All Systems Normal</span>
            </div>
          </div>
        </div>

        {/* Automation Features */}
        <div className="space-y-4">
          {/* Irrigation Control */}
          <div className="bg-gray-900 p-4 rounded-xl ring-1 ring-gray-800">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-purple-400 font-medium">Smart Irrigation</h4>
                <p className="text-sm text-gray-400 mt-1">AI-powered water management</p>
              </div>
              <button className="px-4 py-2 bg-purple-500/10 text-purple-400 rounded-lg hover:bg-purple-500/20 transition-colors">
                Configure
              </button>
            </div>
          </div>

          {/* Pest Control */}
          <div className="bg-gray-900 p-4 rounded-xl ring-1 ring-gray-800">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-purple-400 font-medium">Automated Pest Control</h4>
                <p className="text-sm text-gray-400 mt-1">Smart pest detection & management</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">Protected</span>
                <button className="px-4 py-2 bg-purple-500/10 text-purple-400 rounded-lg hover:bg-purple-500/20 transition-colors">
                  Settings
                </button>
              </div>
            </div>
          </div>

          {/* Climate Control */}
          <div className="bg-gray-900 p-4 rounded-xl ring-1 ring-gray-800">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-purple-400 font-medium">Climate Control</h4>
                <p className="text-sm text-gray-400 mt-1">Temperature & humidity management</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="text-sm text-gray-400">Temperature</div>
                  <div className="text-lg text-gray-200">24°C</div>
                </div>
                <button className="px-4 py-2 bg-purple-500/10 text-purple-400 rounded-lg hover:bg-purple-500/20 transition-colors">
                  Adjust
                </button>
              </div>
            </div>
          </div>

          {/* Fertilizer System */}
          <div className="bg-gray-900 p-4 rounded-xl ring-1 ring-gray-800">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-purple-400 font-medium">Smart Fertilization</h4>
                <p className="text-sm text-gray-400 mt-1">Automated nutrient delivery</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500"></div>
                <span className="text-sm text-gray-400">Scheduled for tomorrow</span>
                <button className="px-4 py-2 bg-purple-500/10 text-purple-400 rounded-lg hover:bg-purple-500/20 transition-colors">
                  Schedule
                </button>
              </div>
            </div>
          </div>

          {/* Drone Monitoring */}
          <div className="bg-gray-900 p-4 rounded-xl ring-1 ring-gray-800">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-purple-400 font-medium">Drone Surveillance</h4>
                <p className="text-sm text-gray-400 mt-1">Aerial crop monitoring & analysis</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">Last scan: 2h ago</span>
                <button className="px-4 py-2 bg-purple-500/10 text-purple-400 rounded-lg hover:bg-purple-500/20 transition-colors">
                  View Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}