"use client"

import { useState, useEffect } from "react"
import { Camera } from "lucide-react"

interface FaceScannerProps {
  onScanComplete: () => void
}

export default function FaceScanner({ onScanComplete }: FaceScannerProps) {
  const [scanProgress, setScanProgress] = useState(0)
  const [scanMessage, setScanMessage] = useState("Initializing face scan...")

  useEffect(() => {
    const timer = setTimeout(() => {
      if (scanProgress < 100) {
        setScanProgress((prev) => {
          const newProgress = prev + 1

          if (newProgress === 25) {
            setScanMessage("Detecting face...")
          } else if (newProgress === 50) {
            setScanMessage("Analyzing features...")
          } else if (newProgress === 75) {
            setScanMessage("Verifying identity...")
          } else if (newProgress === 95) {
            setScanMessage("Scan complete!")
          }

          return newProgress
        })
      } else {
        onScanComplete()
      }
    }, 50)

    return () => clearTimeout(timer)
  }, [scanProgress, onScanComplete])

  return (
    <div className="flex h-full flex-col items-center justify-center bg-gray-900 p-3 text-white">
      <div className="mb-4 text-center">
        <h2 className="mb-1 text-lg font-bold text-primary">Face Recognition</h2>
        <p className="text-xs text-gray-400">Please look directly at the screen</p>
      </div>

      <div className="relative mb-4 h-36 w-36 overflow-hidden rounded-full border-4 border-primary">
        <div className="absolute inset-0 flex items-center justify-center">
          <Camera size={50} className="text-primary opacity-50" />
        </div>

        {/* Scanning animation */}
        <div
          className="absolute left-0 top-0 h-full w-full bg-primary opacity-20"
          style={{
            clipPath: `polygon(0 0, 100% 0, 100% ${scanProgress}%, 0 ${scanProgress}%)`,
          }}
        ></div>

        {/* Scanning line */}
        <div
          className="absolute left-0 h-1 w-full bg-primary shadow-lg"
          style={{
            top: `${scanProgress}%`,
            boxShadow: "0 0 10px 2px #0ea5e9",
          }}
        ></div>

        {/* Face outline */}
        <div className="absolute left-1/2 top-1/2 h-24 w-20 -translate-x-1/2 -translate-y-1/2 transform rounded-full border-2 border-dashed border-primary"></div>
      </div>

      <div className="mb-2 w-full max-w-xs">
        <div className="mb-1 flex justify-between">
          <span className="text-xs text-gray-400">Scanning...</span>
          <span className="text-xs font-medium text-primary">{scanProgress}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-700">
          <div className="h-full bg-primary transition-all duration-100" style={{ width: `${scanProgress}%` }}></div>
        </div>
      </div>

      <p className="text-center text-xs text-gray-300">{scanMessage}</p>
    </div>
  )
}

