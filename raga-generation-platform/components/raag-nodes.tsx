"use client"

import { useEffect, useRef, useState } from "react"

// Sample raag data
const raags = [
  { id: 1, name: "Bhairav", thaat: "Bhairav", time: "Morning" },
  { id: 2, name: "Yaman", thaat: "Kalyan", time: "Evening" },
  { id: 3, name: "Malkauns", thaat: "Bhairavi", time: "Night" },
  { id: 4, name: "Darbari", thaat: "Asavari", time: "Night" },
  { id: 5, name: "Bhimpalasi", thaat: "Kafi", time: "Afternoon" },
  { id: 6, name: "Bageshri", thaat: "Kafi", time: "Night" },
  { id: 7, name: "Khamaj", thaat: "Khamaj", time: "Night" },
  { id: 8, name: "Bhairavi", thaat: "Bhairavi", time: "Morning" },
  { id: 9, name: "Todi", thaat: "Todi", time: "Morning" },
  { id: 10, name: "Puriya Dhanashree", thaat: "Purvi", time: "Evening" },
  { id: 11, name: "Marwa", thaat: "Marwa", time: "Evening" },
  { id: 12, name: "Shree", thaat: "Purvi", time: "Evening" },
  { id: 13, name: "Jaijaiwanti", thaat: "Khamaj", time: "Night" },
  { id: 14, name: "Jaunpuri", thaat: "Asavari", time: "Morning" },
  { id: 15, name: "Miyan Ki Malhar", thaat: "Kafi", time: "Monsoon" },
  { id: 16, name: "Kedar", thaat: "Kalyan", time: "Night" },
  { id: 17, name: "Hamir", thaat: "Kalyan", time: "Night" },
  { id: 18, name: "Tilak Kamod", thaat: "Khamaj", time: "Night" },
  { id: 19, name: "Bihag", thaat: "Bilawal", time: "Night" },
  { id: 20, name: "Durga", thaat: "Bilawal", time: "Evening" },
]

interface Node {
  id: number
  x: number
  y: number
  radius: number
  color: string
  name: string
  thaat: string
  time: string
  vx: number
  vy: number
  selected: boolean
}

export function RaagNodes() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [nodes, setNodes] = useState<Node[]>([])
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)

  // Initialize nodes
  useEffect(() => {
    const initialNodes: Node[] = raags.map((raag) => {
      // Assign colors based on thaat
      const thaatColors: Record<string, string> = {
        Bhairav: "#FFD700",
        Kalyan: "#FFC107",
        Bhairavi: "#FF9800",
        Asavari: "#FF5722",
        Kafi: "#F44336",
        Khamaj: "#E91E63",
        Bilawal: "#9C27B0",
        Todi: "#673AB7",
        Purvi: "#3F51B5",
        Marwa: "#2196F3",
      }

      return {
        id: raag.id,
        x: Math.random() * 100,
        y: Math.random() * 100,
        radius: Math.random() * 5 + 5,
        color: thaatColors[raag.thaat] || "#FFD700",
        name: raag.name,
        thaat: raag.thaat,
        time: raag.time,
        vx: (Math.random() - 0.5) * 0.1,
        vy: (Math.random() - 0.5) * 0.1,
        selected: false,
      }
    })

    setNodes(initialNodes)
  }, [])

  // Animation and rendering
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || nodes.length === 0) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
    }

    setCanvasDimensions()

    // Handle click events
    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // Check if a node was clicked
      const clickedNode = nodes.find((node) => {
        const nodeX = (node.x / 100) * rect.width
        const nodeY = (node.y / 100) * rect.height
        const distance = Math.sqrt(Math.pow(nodeX - x, 2) + Math.pow(nodeY - y, 2))
        return distance <= node.radius + 5 // Add a small buffer for easier clicking
      })

      if (clickedNode) {
        setSelectedNode(clickedNode)
        setNodes((prev) =>
          prev.map((node) => ({
            ...node,
            selected: node.id === clickedNode.id,
          })),
        )
      } else {
        setSelectedNode(null)
        setNodes((prev) =>
          prev.map((node) => ({
            ...node,
            selected: false,
          })),
        )
      }
    }

    canvas.addEventListener("click", handleClick)

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const width = canvas.width / window.devicePixelRatio
      const height = canvas.height / window.devicePixelRatio

      // Draw connections
      ctx.lineWidth = 0.5
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          // Connect nodes of the same thaat
          if (nodes[i].thaat === nodes[j].thaat) {
            const x1 = (nodes[i].x / 100) * width
            const y1 = (nodes[i].y / 100) * height
            const x2 = (nodes[j].x / 100) * width
            const y2 = (nodes[j].y / 100) * height

            const dx = x2 - x1
            const dy = y2 - y1
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 150) {
              ctx.beginPath()
              ctx.strokeStyle = `${nodes[i].color}${Math.floor((1 - distance / 150) * 255)
                .toString(16)
                .padStart(2, "0")}`
              ctx.moveTo(x1, y1)
              ctx.lineTo(x2, y2)
              ctx.stroke()
            }
          }
        }
      }

      // Update and draw nodes
      setNodes((prev) =>
        prev.map((node) => {
          // Update position
          let newX = node.x + node.vx
          let newY = node.y + node.vy

          // Bounce off edges
          if (newX < 0 || newX > 100) node.vx *= -1
          if (newY < 0 || newY > 100) node.vy *= -1

          // Keep within bounds
          newX = Math.max(0, Math.min(100, newX))
          newY = Math.max(0, Math.min(100, newY))

          // Draw node
          const x = (newX / 100) * width
          const y = (newY / 100) * height

          // Glow effect
          const glow = node.selected ? 20 : 10

          ctx.beginPath()
          ctx.shadowColor = node.color
          ctx.shadowBlur = glow
          ctx.fillStyle = node.color
          ctx.arc(x, y, node.radius, 0, Math.PI * 2)
          ctx.fill()

          // Reset shadow
          ctx.shadowBlur = 0

          // Draw node name if selected or hovered
          if (node.selected) {
            ctx.font = "bold 12px Arial"
            ctx.fillStyle = "#FFFFFF"
            ctx.textAlign = "center"
            ctx.fillText(node.name, x, y - node.radius - 10)
          }

          return {
            ...node,
            x: newX,
            y: newY,
          }
        }),
      )

      // Draw selected node info
      if (selectedNode) {
        const infoX = 20
        const infoY = height - 80

        ctx.fillStyle = "rgba(0, 0, 0, 0.7)"
        ctx.roundRect(infoX - 10, infoY - 30, 250, 100, 10)
        ctx.fill()

        ctx.font = "bold 16px Arial"
        ctx.fillStyle = selectedNode.color
        ctx.textAlign = "left"
        ctx.fillText(selectedNode.name, infoX, infoY)

        ctx.font = "14px Arial"
        ctx.fillStyle = "#FFFFFF"
        ctx.fillText(`Thaat: ${selectedNode.thaat}`, infoX, infoY + 25)
        ctx.fillText(`Time: ${selectedNode.time}`, infoX, infoY + 50)
      }

      requestAnimationFrame(animate)
    }

    // Add roundRect method if not available
    if (!ctx.roundRect) {
      ctx.roundRect = function (x: number, y: number, width: number, height: number, radius: number) {
        this.beginPath()
        this.moveTo(x + radius, y)
        this.lineTo(x + width - radius, y)
        this.quadraticCurveTo(x + width, y, x + width, y + radius)
        this.lineTo(x + width, y + height - radius)
        this.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
        this.lineTo(x + radius, y + height)
        this.quadraticCurveTo(x, y + height, x, y + height - radius)
        this.lineTo(x, y + radius)
        this.quadraticCurveTo(x, y, x + radius, y)
        this.closePath()
      }
    }

    // Start animation
    const animationId = requestAnimationFrame(animate)

    // Handle resize
    window.addEventListener("resize", setCanvasDimensions)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", setCanvasDimensions)
      canvas.removeEventListener("click", handleClick)
    }
  }, [nodes, selectedNode])

  return <canvas ref={canvasRef} className="h-full w-full cursor-pointer" />
}

