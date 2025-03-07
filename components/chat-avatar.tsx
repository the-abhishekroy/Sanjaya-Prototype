"use client"

import { useEffect, useRef } from "react"

interface ChatAvatarProps {
  isTalking: boolean
}

export default function ChatAvatar({ isTalking }: ChatAvatarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let time = 0

    const drawBird = (t: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Bird body - circular gradient
      const gradient = ctx.createRadialGradient(150, 150, 0, 150, 150, 80)
      gradient.addColorStop(0, "#60A5FA")
      gradient.addColorStop(1, "#2563EB")

      ctx.beginPath()
      ctx.arc(150, 150, 60, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()

      // Eyes
      ctx.fillStyle = "#fff"
      ctx.beginPath()
      ctx.arc(130, 140, 15, 0, Math.PI * 2)
      ctx.arc(170, 140, 15, 0, Math.PI * 2)
      ctx.fill()

      // Pupils
      ctx.fillStyle = "#000"
      ctx.beginPath()
      ctx.arc(130, 140, 8, 0, Math.PI * 2)
      ctx.arc(170, 140, 8, 0, Math.PI * 2)
      ctx.fill()

      // Beak
      ctx.beginPath()
      ctx.moveTo(140, 160)
      ctx.lineTo(160, 160)
      ctx.lineTo(150, 180)
      ctx.closePath()
      ctx.fillStyle = "#FCD34D"
      ctx.fill()

      // Animated mouth when talking
      if (isTalking) {
        const mouthOpen = Math.sin(t * 0.2) * 5 + 5
        ctx.beginPath()
        ctx.moveTo(142, 165)
        ctx.lineTo(158, 165)
        ctx.lineTo(150, 165 + mouthOpen)
        ctx.closePath()
        ctx.fillStyle = "#991B1B"
        ctx.fill()
      }

      // Glowing effect
      ctx.beginPath()
      ctx.arc(150, 150, 80, 0, Math.PI * 2)
      const glowGradient = ctx.createRadialGradient(150, 150, 60, 150, 150, 80)
      glowGradient.addColorStop(0, "rgba(37, 99, 235, 0.2)")
      glowGradient.addColorStop(1, "rgba(37, 99, 235, 0)")
      ctx.fillStyle = glowGradient
      ctx.fill()

      // Animated wing
      ctx.save()
      ctx.translate(150, 150)
      ctx.rotate(Math.sin(t * 0.1) * 0.1)
      ctx.beginPath()
      ctx.ellipse(-50, 0, 30, 40, Math.PI / 4, 0, Math.PI * 2)
      ctx.fillStyle = "#3B82F6"
      ctx.fill()
      ctx.restore()

      time += 0.1
      animationFrameId = requestAnimationFrame(() => drawBird(time))
    }

    drawBird(time)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [isTalking])

  return (
    <div className="relative">
      <canvas ref={canvasRef} width={300} height={300} className="h-48 w-48" />
      {/* Reflection effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
    </div>
  )
}

