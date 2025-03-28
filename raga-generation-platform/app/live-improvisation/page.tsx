"use client"

import Link from "next/link"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Music, Play, Pause, Mic, Download } from "lucide-react"
import { GlowingButton } from "@/components/glowing-button"
import { ParticleBackground } from "@/components/particle-background"
import DynamicWaveform from "@/components/dynamic-waveform"
import { generateImprovisation, type ImprovisationResponse } from "@/lib/api-service"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

export default function LiveImprovisation() {
  const [isRecording, setIsRecording] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [improvisation, setImprovisation] = useState<ImprovisationResponse | null>(null)
  const audioChunks = useRef<Blob[]>([])
  const mediaRecorder = useRef<MediaRecorder | null>(null)

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRecorder.current = new MediaRecorder(stream)

      mediaRecorder.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data)
      }

      mediaRecorder.current.onstop = async () => {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/wav" })
        const reader = new FileReader()

        reader.onloadend = async () => {
          if (typeof reader.result === "string") {
            const base64Audio = reader.result.split(",")[1]
            await generateImprovisationResponse(base64Audio)
          }
        }

        reader.readAsDataURL(audioBlob)
      }

      audioChunks.current = []
      mediaRecorder.current.start()
      setIsRecording(true)

      toast({
        title: "Recording Started",
        description: "Play or sing a raag pattern. Recording will stop after 10 seconds.",
      })

      // Automatically stop recording after 10 seconds
      setTimeout(() => {
        if (mediaRecorder.current && mediaRecorder.current.state === "recording") {
          stopRecording()
        }
      }, 10000)
    } catch (error) {
      console.error("Error accessing microphone:", error)
      toast({
        title: "Microphone Error",
        description: "Could not access your microphone. Please check permissions.",
        variant: "destructive",
      })
    }
  }

  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state === "recording") {
      mediaRecorder.current.stop()
      setIsRecording(false)

      toast({
        title: "Recording Stopped",
        description: "Processing your audio...",
      })
    }
  }

  const generateImprovisationResponse = async (audioData: string) => {
    setIsLoading(true)
    try {
      const result = await generateImprovisation(audioData)
      setImprovisation(result)
      toast({
        title: "Improvisation Generated",
        description: `Generated response in Raag ${result.raag}`,
      })
    } catch (error) {
      console.error("Error generating improvisation:", error)
      toast({
        title: "Generation Failed",
        description: "There was an error generating the improvisation. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const togglePlayback = () => {
    setIsPlaying(!isPlaying)
    // In a real implementation, this would play the generated audio
  }

  const downloadImprovisation = () => {
    // In a real implementation, this would download the generated audio
    toast({
      title: "Download Started",
      description: "Your improvisation is being downloaded.",
    })
  }

  return (
    <div className="relative min-h-screen bg-black">
      <ParticleBackground />

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gold-500/20 backdrop-blur-md">
        <div className="container flex h-16 items-center">
          <Link href="/" className="group flex items-center gap-2">
            <Music className="h-6 w-6 text-gold-500 transition-all duration-300 group-hover:text-gold-400 group-hover:drop-shadow-[0_0_8px_rgba(255,215,0,0.8)]" />
            <span className="hidden font-serif text-xl font-medium text-white group-hover:text-gold-300 transition-colors duration-300 sm:inline-block">
              RaagAI
            </span>
          </Link>
        </div>
      </header>

      <main className="container py-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-block rounded-full bg-gold-500/10 px-4 py-1.5 text-sm font-medium text-gold-300 backdrop-blur-sm border border-gold-500/20 shadow-[0_0_15px_rgba(255,215,0,0.2)]">
            Live Improvisation
          </div>
          <h1 className="mt-6 font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            <span className="devanagari-inspired block bg-gradient-to-r from-gold-300 via-gold-200 to-gold-400 bg-clip-text text-transparent">
              AI-Powered Raag
            </span>
            <span className="mt-2 block text-gold-400 drop-shadow-[0_0_8px_rgba(255,215,0,0.3)]">
              Jamming in Real Time
            </span>
          </h1>
          <p className="mt-6 text-lg text-white/70">
            Experience dynamic raag improvisations with our AI. Generate Alap, Jor-Jhala, or Taan patterns in real-time.
          </p>

          <div className="mt-16">
            <div className="rounded-xl border border-gold-500/20 bg-black/40 p-8 backdrop-blur-md">
              <div className="flex flex-col items-center gap-6">
                <div className="flex gap-4">
                  {!isRecording ? (
                    <GlowingButton
                      size="lg"
                      text="Start Recording"
                      icon={<Mic className="mr-2 h-4 w-4" />}
                      onClick={startRecording}
                      disabled={isLoading}
                    />
                  ) : (
                    <GlowingButton
                      size="lg"
                      text="Stop Recording"
                      icon={<Pause className="mr-2 h-4 w-4" />}
                      onClick={stopRecording}
                    />
                  )}

                  {improvisation && (
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-gold-500/30 text-white hover:border-gold-400/50 hover:bg-black/50 hover:text-gold-300 transition-all duration-300"
                      onClick={togglePlayback}
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="mr-2 h-4 w-4" />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play className="mr-2 h-4 w-4" />
                          Play Response
                        </>
                      )}
                    </Button>
                  )}
                </div>

                {isRecording && (
                  <p className="text-sm text-gold-300 animate-pulse">
                    Recording... (will automatically stop after 10 seconds)
                  </p>
                )}

                {isLoading && <p className="text-sm text-gold-300 animate-pulse">Generating AI response...</p>}
              </div>

              <div className="mt-8">
                <DynamicWaveform />
              </div>

              {improvisation && (
                <div className="mt-8">
                  <Card className="border-gold-500/30 bg-black/60 text-white">
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-serif font-bold text-gold-400 mb-4">
                        Improvisation in Raag {improvisation.raag}
                      </h2>
                      <p className="mb-6 text-white/80">{improvisation.description}</p>

                      <div className="flex justify-center mt-6">
                        <Button
                          variant="outline"
                          className="border-gold-500/30 text-white hover:border-gold-400/50 hover:bg-black/50 hover:text-gold-300"
                          onClick={downloadImprovisation}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download Improvisation
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

