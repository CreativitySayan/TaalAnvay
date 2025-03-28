"use client"

import { useEffect, useState } from "react"

// Sargam notations
const notations = ["सा", "रे", "ग", "म", "प", "ध", "नि", "सां"]

interface Notation {
  id: number
  text: string
  x: number
  y: number
  opacity: number
  size: number
  speed: number
}

export function FloatingNotations() {
  const [notationElements, setNotationElements] = useState<Notation[]>([])

  useEffect(() => {
    // Create initial notations
    const initialNotations: Notation[] = []

    for (let i = 0; i < 15; i++) {
      initialNotations.push({
        id: i,
        text: notations[Math.floor(Math.random() * notations.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 0.5 + 0.1,
        size: Math.random() * 1.5 + 0.8,
        speed: Math.random() * 0.5 + 0.2,
      })
    }

    setNotationElements(initialNotations)

    // Animation interval
    const interval = setInterval(() => {
      setNotationElements((prev) =>
        prev.map((notation) => {
          // Move notation upward
          const newY = notation.y - notation.speed

          // Reset if it goes off screen
          if (newY < -10) {
            return {
              ...notation,
              y: 110,
              x: Math.random() * 100,
              text: notations[Math.floor(Math.random() * notations.length)],
              opacity: Math.random() * 0.5 + 0.1,
            }
          }

          return {
            ...notation,
            y: newY,
          }
        }),
      )
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {notationElements.map((notation) => (
        <div
          key={notation.id}
          className="absolute font-serif text-gold-400 drop-shadow-[0_0_5px_rgba(255,215,0,0.5)]"
          style={{
            left: `${notation.x}%`,
            top: `${notation.y}%`,
            opacity: notation.opacity,
            fontSize: `${notation.size}rem`,
            transform: `rotate(${Math.random() * 20 - 10}deg)`,
            transition: "top 0.5s linear",
          }}
        >
          {notation.text}
        </div>
      ))}
    </div>
  )
}

