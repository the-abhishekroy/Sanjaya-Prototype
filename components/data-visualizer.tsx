"use client"

import { useState, useEffect } from "react"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, LineChart, Line, AreaChart, Area, Cell
} from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Enhanced realistic data
const soilData = [
  { name: "Nitrogen", value: 65, optimal: 60, unit: "kg/ha", status: "good" },
  { name: "Phosphorus", value: 35, optimal: 45, unit: "kg/ha", status: "low" },
  { name: "Potassium", value: 80, optimal: 75, unit: "kg/ha", status: "high" },
  { name: "pH Level", value: 6.5, optimal: 6.8, unit: "pH", status: "normal" },
  { name: "Organic", value: 3.2, optimal: 3.5, unit: "%", status: "normal" },
]

// Dynamic weather data generation
const generateWeatherData = () => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  return days.map((day, i) => ({
    day,
    temp: Math.floor(Math.random() * (32 - 24) + 24),
    humidity: Math.floor(Math.random() * (85 - 55) + 55),
    rainfall: Math.floor(Math.random() * (20)),
    uv: Math.floor(Math.random() * 10)
  }))
}

// New crop health data
const generateCropHealthData = () => {
  return [
    { stage: 'Seedling', completion: 100, pests: 15, disease: 10 },
    { stage: 'Vegetative', completion: 80, pests: 25, disease: 20 },
    { stage: 'Flowering', completion: 45, pests: 40, disease: 35 },
    { stage: 'Maturity', completion: 20, pests: 30, disease: 25 },
    { stage: 'Harvest', completion: 0, pests: 20, disease: 15 },
  ]
}

export default function DataVisualizer() {
  const [activeTab, setActiveTab] = useState("soil")
  const [weatherData, setWeatherData] = useState(generateWeatherData())
  const [cropHealthData, setCropHealthData] = useState(generateCropHealthData())
  const [airData, setAirData] = useState([
    { name: "PM2.5", value: 15, limit: 35, unit: "μg/m³", quality: "Good" },
    { name: "PM10", value: 30, limit: 50, unit: "μg/m³", quality: "Good" },
    { name: "CO2", value: 450, limit: 1000, unit: "ppm", quality: "Excellent" },
    { name: "Humidity", value: 65, limit: 70, unit: "%", quality: "Normal" },
  ])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setWeatherData(generateWeatherData())
      setCropHealthData(prev => prev.map(item => ({
        ...item,
        pests: Math.max(10, Math.min(50, item.pests + (Math.random() - 0.5) * 10)),
        disease: Math.max(5, Math.min(45, item.disease + (Math.random() - 0.5) * 8))
      })))
      setAirData(prev => prev.map(item => ({
        ...item,
        value: Math.floor(item.value * (0.95 + Math.random() * 0.1))
      })))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full">
      <Tabs defaultValue="soil" onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid h-10 w-full grid-cols-3 bg-gray-900 text-gray-400 rounded-t-xl">
          <TabsTrigger 
            value="soil" 
            className="data-[state=active]:bg-gray-800 data-[state=active]:text-blue-400 transition-all"
          >
            🌱 Soil Analysis
          </TabsTrigger>
          <TabsTrigger 
            value="crop" 
            className="data-[state=active]:bg-gray-800 data-[state=active]:text-blue-400 transition-all"
          >
            🌾 Crop Health
          </TabsTrigger>
          <TabsTrigger 
            value="air" 
            className="data-[state=active]:bg-gray-800 data-[state=active]:text-blue-400 transition-all"
          >
            💨 Air Quality
          </TabsTrigger>
        </TabsList>

        <TabsContent value="soil">
          <Card className="border-0 bg-gray-900 text-gray-200">
            <CardHeader className="p-4">
              <CardTitle className="text-lg font-bold text-blue-400">Soil Nutrient Analysis</CardTitle>
              <CardDescription className="text-sm text-gray-400">Monitoring key soil parameters</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={soilData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }} barSize={12}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#9CA3AF" }} />
                    <YAxis tick={{ fontSize: 12, fill: "#9CA3AF" }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "#1F2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                        padding: "10px"
                      }}
                      cursor={{ fill: 'rgba(107, 114, 128, 0.1)' }}
                      formatter={(value, name, props) => {
                        const item = soilData[props.payload.name]
                        return [`${value} ${item?.unit}`, name]
                      }}
                    />
                    <Legend 
                      wrapperStyle={{ fontSize: "12px", padding: "10px" }}
                      formatter={(value) => <span className="text-gray-400">{value}</span>}
                    />
                    <Bar dataKey="value" name="Current" fill="#3B82F6" radius={[4, 4, 0, 0]}>
                      {soilData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`}
                          fill={entry.status === 'low' ? '#EF4444' : entry.status === 'high' ? '#F59E0B' : '#3B82F6'}
                        />
                      ))}
                    </Bar>
                    <Bar dataKey="optimal" name="Optimal" fill="#10B981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 rounded-lg bg-gray-800/50 p-3">
                <p className="font-medium text-blue-400 mb-1">Smart Recommendations:</p>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Increase phosphorus levels through organic fertilizers</li>
                  <li>• Monitor potassium levels - slightly above optimal</li>
                  <li>• Maintain current nitrogen management practices</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="crop">
          <Card className="border-0 bg-gray-900 text-gray-200">
            <CardHeader className="p-4">
              <CardTitle className="text-lg font-bold text-blue-400">Crop Health Monitor</CardTitle>
              <CardDescription className="text-sm text-gray-400">Growth stages and risk factors</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={cropHealthData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }} barSize={12}>
                    <defs>
                      <linearGradient id="pestGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#F43F5E" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#F43F5E" stopOpacity={0.3}/>
                      </linearGradient>
                      <linearGradient id="diseaseGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="stage" tick={{ fontSize: 12, fill: "#9CA3AF" }} />
                    <YAxis yAxisId="risk" domain={[0, 100]} tick={{ fontSize: 12, fill: "#9CA3AF" }} />
                    <YAxis yAxisId="completion" orientation="right" domain={[0, 100]} tick={{ fontSize: 12, fill: "#9CA3AF" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                        padding: "10px"
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: "12px", padding: "10px" }} />
                    <Bar yAxisId="risk" dataKey="pests" name="Pest Risk %" fill="url(#pestGradient)" radius={[4, 4, 0, 0]} />
                    <Bar yAxisId="risk" dataKey="disease" name="Disease Risk %" fill="url(#diseaseGradient)" radius={[4, 4, 0, 0]} />
                    <Line
                      yAxisId="completion"
                      type="monotone"
                      dataKey="completion"
                      name="Stage Completion %"
                      stroke="#10B981"
                      strokeWidth={2}
                      dot={{ fill: "#10B981" }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 rounded-lg bg-gray-800/50 p-3">
                <p className="font-medium text-blue-400 mb-1">Growth Analysis:</p>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Flowering stage in progress (45% complete)</li>
                  <li>• Elevated pest risk detected - consider organic pesticides</li>
                  <li>• Disease risk within manageable levels</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="air">
          <Card className="border-0 bg-gray-900 text-gray-200">
            <CardHeader className="p-4">
              <CardTitle className="text-lg font-bold text-blue-400">Air Quality Monitoring</CardTitle>
              <CardDescription className="text-sm text-gray-400">Real-time air parameters</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={airData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }} barSize={12}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#9CA3AF" }} />
                    <YAxis tick={{ fontSize: 12, fill: "#9CA3AF" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                        padding: "10px"
                      }}
                      formatter={(value, name, props) => {
                        const item = airData[props.payload.name]
                        return [`${value} ${item?.unit}`, name]
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: "12px", padding: "10px" }} />
                    <Bar dataKey="value" name="Current" fill="#10B981" radius={[4, 4, 0, 0]}>
                      {airData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.value > entry.limit ? '#EF4444' : '#10B981'}
                        />
                      ))}
                    </Bar>
                    <Bar dataKey="limit" name="Safe Limit" fill="#6B7280" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 rounded-lg bg-gray-800/50 p-3">
                <p className="font-medium text-blue-400 mb-1">Air Quality Status:</p>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• All parameters within safe limits</li>
                  <li>• Optimal humidity levels for crops</li>
                  <li>• Good ventilation recommended</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

