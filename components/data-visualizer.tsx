"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Sample data
const soilData = [
  { name: "N", value: 65, optimal: 60, unit: "kg/ha" },
  { name: "P", value: 35, optimal: 45, unit: "kg/ha" },
  { name: "K", value: 80, optimal: 75, unit: "kg/ha" },
  { name: "pH", value: 6.5, optimal: 6.8, unit: "pH" },
  { name: "OM", value: 3.2, optimal: 3.5, unit: "%" },
]

const weatherData = [
  { day: "M", temp: 28, humidity: 65, rainfall: 0 },
  { day: "T", temp: 30, humidity: 60, rainfall: 0 },
  { day: "W", temp: 29, humidity: 70, rainfall: 5 },
  { day: "T", temp: 27, humidity: 75, rainfall: 10 },
  { day: "F", temp: 26, humidity: 80, rainfall: 15 },
  { day: "S", temp: 28, humidity: 70, rainfall: 5 },
  { day: "S", temp: 30, humidity: 65, rainfall: 0 },
]

const airQualityData = [
  { name: "PM2.5", value: 15, limit: 35, unit: "μg/m³" },
  { name: "PM10", value: 30, limit: 50, unit: "μg/m³" },
  { name: "CO2", value: 450, limit: 1000, unit: "ppm" },
  { name: "Hum", value: 65, limit: 70, unit: "%" },
]

export default function DataVisualizer() {
  const [activeTab, setActiveTab] = useState("soil")

  return (
    <div className="w-full">
      <Tabs defaultValue="soil" onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid h-8 w-full grid-cols-3 text-xs">
          <TabsTrigger value="soil" className="h-7 px-1 py-0">
            Soil
          </TabsTrigger>
          <TabsTrigger value="weather" className="h-7 px-1 py-0">
            Weather
          </TabsTrigger>
          <TabsTrigger value="air" className="h-7 px-1 py-0">
            Air
          </TabsTrigger>
        </TabsList>

        <TabsContent value="soil">
          <Card className="border-0 shadow-none">
            <CardHeader className="p-2">
              <CardTitle className="text-sm">Soil Fertility</CardTitle>
              <CardDescription className="text-xs">Current vs optimal levels</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-[140px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={soilData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }} barSize={8}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip
                      contentStyle={{ fontSize: "10px" }}
                      formatter={(value, name) => {
                        const item = soilData.find((d) => d.value === value || d.optimal === value)
                        return [`${value} ${item?.unit}`, name]
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: "10px" }} />
                    <Bar dataKey="value" name="Current" fill="#0ea5e9" />
                    <Bar dataKey="optimal" name="Optimal" fill="#22c55e" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-1 rounded-lg bg-blue-50 p-1.5 text-[10px]">
                <p className="font-medium text-blue-800">Recommendation:</p>
                <p className="text-blue-700">Apply phosphorus-rich fertilizer to improve soil fertility.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weather">
          <Card className="border-0 shadow-none">
            <CardHeader className="p-2">
              <CardTitle className="text-sm">Weather Forecast</CardTitle>
              <CardDescription className="text-xs">7-day prediction</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-[140px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weatherData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip contentStyle={{ fontSize: "10px" }} />
                    <Legend wrapperStyle={{ fontSize: "10px" }} />
                    <Line
                      type="monotone"
                      dataKey="temp"
                      name="Temp °C"
                      stroke="#ef4444"
                      activeDot={{ r: 4 }}
                      strokeWidth={2}
                    />
                    <Line type="monotone" dataKey="rainfall" name="Rain mm" stroke="#22c55e" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-1 rounded-lg bg-blue-50 p-1.5 text-[10px]">
                <p className="font-medium text-blue-800">Advisory:</p>
                <p className="text-blue-700">Expect rainfall Wed-Fri. Plan irrigation accordingly.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="air">
          <Card className="border-0 shadow-none">
            <CardHeader className="p-2">
              <CardTitle className="text-sm">Air Quality</CardTitle>
              <CardDescription className="text-xs">Current vs safe limits</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-[140px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={airQualityData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }} barSize={8}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip
                      contentStyle={{ fontSize: "10px" }}
                      formatter={(value, name) => {
                        const item = airQualityData.find((d) => d.value === value || d.limit === value)
                        return [`${value} ${item?.unit}`, name]
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: "10px" }} />
                    <Bar dataKey="value" name="Current" fill="#0ea5e9" />
                    <Bar dataKey="limit" name="Limit" fill="#f97316" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-1 rounded-lg bg-green-50 p-1.5 text-[10px]">
                <p className="font-medium text-green-800">Status:</p>
                <p className="text-green-700">All air quality parameters within safe limits.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

