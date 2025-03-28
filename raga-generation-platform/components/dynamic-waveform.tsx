"use client"

import { useEffect, useRef } from "react"

export default function DynamicWaveform() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<any[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions with higher resolution for retina displays
    const dpr = window.devicePixelRatio || 1
    canvas.width = canvas.offsetWidth * dpr
    canvas.height = canvas.offsetHeight * dpr
    ctx.scale(dpr, dpr)

    // Animation variables
    let animationId: number
    let t = 0

    // Initialize particles
    const particleCount = 100
    const particles: {
      x: number
      y: number
      size: number
      speed: number
      amplitude: number
      hue: number
      opacity: number
    }[] = []

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: (Math.random() * canvas.width) / dpr,
        y: canvas.height / (2 * dpr) + (Math.random() * 40 - 20),
        size: Math.random() * 3 + 1,
        speed: Math.random() * 0.2 + 0.1,
        amplitude: Math.random() * 20 + 5,
        hue: Math.random() * 30 + 40, // Gold hues
        opacity: Math.random() * 0.5 + 0.2,
      })
    }

    particlesRef.current = particles

    // Function to draw the waveform
    const drawWaveform = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr)

      const width = canvas.width / dpr
      const height = canvas.height / dpr
      const centerY = height / 2

      // Draw main waves
      drawWave(ctx, width, height, centerY, t, 0.5, "rgba(255, 215, 0, 0.3)", 0.7)
      drawWave(ctx, width, height, centerY, t * 0.8, 0.3, "rgba(255, 215, 0, 0.2)", 0.5)
      drawWave(ctx, width, height, centerY, t * 1.2, 0.7, "rgba(255, 215, 0, 0.1)", 0.3)

      // Draw particles
      particles.forEach((particle) => {
        // Update particle position
        particle.x += particle.speed
        if (particle.x > width) {
          particle.x = 0
        }

        // Calculate y position based on wave
        const waveY = Math.sin(particle.x * 0.02 + t) * particle.amplitude
        particle.y = centerY + waveY

        // Draw particle
        const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size * 2)
        gradient.addColorStop(0, `hsla(${particle.hue}, 100%, 70%, ${particle.opacity})`)
        gradient.addColorStop(1, `hsla(${particle.hue}, 100%, 50%, 0)`)

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      })

      // Update time
      t += 0.01
      animationId = requestAnimationFrame(drawWaveform)
    }

    // Function to draw a single wave
    const drawWave = (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
      centerY: number,
      t: number,
      amplitude: number,
      color: string,
      opacity: number,
    ) => {
      ctx.beginPath()
      ctx.strokeStyle = color
      ctx.lineWidth = 2
      ctx.globalAlpha = opacity

      // Create a complex wave by combining multiple sine waves
      for (let x = 0; x < width; x++) {
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

      // Add glow effect
      ctx.shadowColor = "rgba(255, 215, 0, 0.5)"
      ctx.shadowBlur = 10
      ctx.stroke()
      ctx.shadowBlur = 0
      ctx.globalAlpha = 1
    }

    // Start animation
    drawWaveform()

    // Handle resize
    const handleResize = () => {
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr
      ctx.scale(dpr, dpr)
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div className="w-full max-w-4xl px-4">
      <canvas ref={canvasRef} className="h-40 w-full" />
    </div>
  )
}

