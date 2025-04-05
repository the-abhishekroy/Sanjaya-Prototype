"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import * as faceapi from 'face-api.js'
import { GradientBackground } from './ui/gradient-background'

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
        
        // Apply the same transform to canvas as we do to video
        const ctx = canvasRef.current.getContext('2d')
        if (ctx) {
          // Flip the canvas horizontally to match the video orientation
          ctx.translate(canvasRef.current.width, 0)
          ctx.scale(-1, 1)
        }
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
            
            // Save the current state
            ctx.save()
            
            // Reset the transformation to handle the mirroring properly
            ctx.setTransform(1, 0, 0, 1, 0, 0)
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            
            // Apply the flipping transformation again
            ctx.translate(canvas.width, 0)
            ctx.scale(-1, 1)

            // Draw new detections
            const resizedDetection = faceapi.resizeResults(detection, displaySize)
            faceapi.draw.drawDetections(canvas, [resizedDetection])
            faceapi.draw.drawFaceLandmarks(canvas, [resizedDetection])
            
            // Restore the context state
            ctx.restore()

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
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      <GradientBackground />

      {/* Premium Welcome Text */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 z-10 space-y-4"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-violet-500/10 
                    ring-1 ring-violet-500/20 flex items-center justify-center"
        >
          <svg 
            className="w-8 h-8 text-violet-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                  d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
        </motion.div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-600 
                      bg-clip-text text-transparent mb-3">
          Welcome to Sanjaya
        </h1>
        <p className="text-gray-400 text-lg max-w-md mx-auto">
          Secure authentication powered by AI facial recognition
        </p>
      </motion.div>

      {/* Enhanced Main Content */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-2xl px-6"
      >
        <div className="space-y-8">
          {/* Status Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <p className="text-base text-gray-400 bg-gray-900/50 backdrop-blur-sm px-4 py-2 
                        rounded-full inline-block ring-1 ring-gray-800">
              {message}
            </p>
          </motion.div>

          {/* Premium Video Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative aspect-video w-full overflow-hidden rounded-3xl 
                    bg-gradient-to-br from-gray-900 to-gray-950
                    ring-1 ring-gray-800 hover:ring-violet-500/30
                    transition-all duration-300 shadow-2xl shadow-black/50"
          >
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              onPlay={handleVideoPlay}
              className="h-full w-full object-cover transform scale-x-[-1]" // Apply horizontal flip to the video
            />
            <canvas
              ref={canvasRef}
              className="absolute inset-0 h-full w-full"
            />
            
            {/* Enhanced Loading Overlay */}
            <AnimatePresence>
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center 
                          bg-gray-900/90 backdrop-blur-md"
                >
                  <div className="relative">
                    <div className="h-16 w-16 animate-spin rounded-full border-4 
                                border-violet-400/20 border-t-violet-400" />
                    <div className="absolute inset-0 animate-ping opacity-50
                                rounded-full border-4 border-violet-400/10" />
                  </div>
                  <p className="mt-6 text-base text-gray-400 font-medium">Initializing camera...</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Enhanced Face Detection Guide */}
            <div className="absolute inset-0 pointer-events-none mix-blend-plus-lighter">
              <div className="h-full w-full flex items-center justify-center">
                <motion.div
                  animate={{
                    opacity: [0.3, 0.1, 0.3],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative w-56 h-56"
                >
                  <div className="absolute inset-0 rounded-full border-2 border-dashed 
                                border-violet-400/30 animate-[spin_10s_linear_infinite]" />
                  <div className="absolute inset-2 rounded-full border-2 border-dashed 
                                border-violet-400/20 animate-[spin_15s_linear_infinite_reverse]" />
                  <div className="absolute inset-4 rounded-full border-2 border-dashed 
                                border-violet-400/10 animate-[spin_20s_linear_infinite]" />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Progress Section */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-3"
            >
              <div className="flex justify-between text-sm font-medium">
                <span className="text-gray-400">Authentication Progress</span>
                <span className="text-violet-400">{scanProgress}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-gray-900/80 
                          backdrop-blur-sm ring-1 ring-gray-800 p-[1px]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${scanProgress}%` }}
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-violet-500 
                          shadow-lg shadow-violet-500/25"
                  style={{
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 2s linear infinite',
                  }}
                />
              </div>
            </motion.div>

            {/* Enhanced Success State */}
            <AnimatePresence>
              {scanProgress === 100 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="relative overflow-hidden rounded-2xl bg-gradient-to-br 
                          from-green-500/10 to-emerald-500/10 backdrop-blur-sm 
                          border border-green-500/20 p-8"
                >
                  <div className="relative z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", bounce: 0.5 }}
                      className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 
                              flex items-center justify-center"
                    >
                      <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </motion.div>
                    <h3 className="text-xl font-semibold text-green-400 mb-2">Authentication Successful!</h3>
                    <p className="text-gray-400">Redirecting to your dashboard...</p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/5 to-green-500/0
                                animate-[shimmer_2s_infinite]" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

