"use client"

import { useState, useEffect, useRef } from "react"
import * as faceapi from 'face-api.js'

interface FaceScannerProps {
  onScanComplete: () => void
}

export default function FaceScanner({ onScanComplete }: FaceScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [scanProgress, setScanProgress] = useState(0)
  const [message, setMessage] = useState("Loading face detection models...")

  useEffect(() => {
    loadModelsAndStartCamera()
    return () => stopCamera()
  }, [])

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
  }

  const loadModelsAndStartCamera = async () => {
    try {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models')
      ])

      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' } 
      })
      
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setMessage("Please look at the camera")
      }

      setIsLoading(false)
    } catch (error) {
      console.error('Error:', error)
      setMessage("Error accessing camera. Please ensure camera permissions are granted.")
    }
  }

  const handleVideoPlay = () => {
    const detectFaces = async () => {
      if (!videoRef.current || !canvasRef.current) return

      // Get current video dimensions
      const displaySize = {
        width: videoRef.current.videoWidth,
        height: videoRef.current.videoHeight
      }

      // Ensure canvas is properly sized
      if (canvasRef.current.width !== displaySize.width || 
          canvasRef.current.height !== displaySize.height) {
        canvasRef.current.width = displaySize.width
        canvasRef.current.height = displaySize.height
      }

      try {
        const detection = await faceapi.detectSingleFace(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions()
        ).withFaceLandmarks()

        if (detection) {
          const canvas = canvasRef.current
          const ctx = canvas.getContext('2d')
          
          if (ctx) {
            // Clear previous drawing
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Draw new detections
            const resizedDetection = faceapi.resizeResults(detection, displaySize)
            faceapi.draw.drawDetections(canvas, [resizedDetection])
            faceapi.draw.drawFaceLandmarks(canvas, [resizedDetection])

            // Update progress
            setScanProgress(prev => {
              const newProgress = Math.min(prev + 2, 100)
              if (newProgress === 100) {
                setMessage("Face scan complete!")
                setTimeout(() => {
                  stopCamera()
                  onScanComplete()
                }, 500)
                return 100
              }
              return newProgress
            })
          }
        } else {
          setMessage("No face detected. Please look directly at the camera.")
        }

        // Continue detection if not complete
        if (scanProgress < 100) {
          requestAnimationFrame(detectFaces)
        }
      } catch (error) {
        console.error('Face detection error:', error)
      }
    }

    detectFaces()
  }

  return (
    <div className="flex h-full flex-col items-center justify-center bg-gray-950 p-6">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <h2 className="text-xl font-bold text-blue-400">Face Recognition</h2>
          <p className="mt-2 text-sm text-gray-400">{message}</p>
        </div>

        <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gray-900 ring-1 ring-gray-800">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            onPlay={handleVideoPlay}
            className="h-full w-full object-cover"
          />
          <canvas
            ref={canvasRef}
            className="absolute inset-0 h-full w-full"
          />
          
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-400 border-t-transparent" />
            </div>
          )}
        </div>

        <div className="mt-6">
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-gray-400">Scanning progress</span>
            <span className="text-blue-400">{scanProgress}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-gray-800">
            <div
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${scanProgress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

