"use client"

import { useEffect, useRef } from "react"

export default function RaagWaveform() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Animation variables
    let animationId: number
    let t = 0

    // Function to draw the waveform
    const drawWaveform = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Set line style
      ctx.lineWidth = 2
      ctx.lineCap = "round"

      // Draw multiple waves with different parameters
      drawWave(ctx, canvas, t, 0.5, "#FFD700", 0.3) // Gold
      drawWave(ctx, canvas, t * 0.8, 0.3, "#E6C200", 0.2) // Darker gold
      drawWave(ctx, canvas, t * 1.2, 0.7, "#FFF0A0", 0.1) // Light gold

      // Update time
      t += 0.01
      animationId = requestAnimationFrame(drawWaveform)
    }

    // Start animation
    drawWaveform()

    // Handle resize
    const handleResize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Function to draw a single wave
  const drawWave = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    t: number,
    amplitude: number,
    color: string,
    opacity: number,
  ) => {
    const width = canvas.width
    const height = canvas.height
    const centerY = height / 2

    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.globalAlpha = opacity

    for (let x = 0; x < width; x++) {
      // Create a complex wave by combining multiple sine waves
      const y =
        centerY +
        Math.sin(x * 0.01 + t) * amplitude * 30 +
        Math.sin(x * 0.02 + t * 1.5) * amplitude * 15 +
        Math.sin(x * 0.005 + t * 0.5) * amplitude * 25

      if (x === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }

    ctx.stroke()
    ctx.globalAlpha = 1
  }

  return (
    <div className="w-full max-w-4xl px-4">
      <canvas ref={canvasRef} className="h-32 w-full" />
    </div>
  )
}

