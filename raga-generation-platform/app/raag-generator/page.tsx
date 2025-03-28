"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { Music, AudioWaveformIcon as Waveform, FileText, FileMusic } from "lucide-react"
import { GlowingButton } from "@/components/glowing-button"
import { ParticleBackground } from "@/components/particle-background"
import DynamicWaveform from "@/components/dynamic-waveform"
import { generateRaag, type RaagGenerationResponse } from "@/lib/api-service"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

export default function RaagGenerator() {
  const [file, setFile] = useState<File | null>(null)
  const [fileType, setFileType] = useState<"audio" | "midi" | "text">("audio")
  const [isLoading, setIsLoading] = useState(false)
  const [generatedRaag, setGeneratedRaag] = useState<RaagGenerationResponse | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)

      // Determine file type
      if (selectedFile.type.includes("audio")) {
        setFileType("audio")
      } else if (selectedFile.name.endsWith(".mid") || selectedFile.name.endsWith(".midi")) {
        setFileType("midi")
      } else {
        setFileType("text")
      }
    }
  }

  const handleGenerate = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please upload a file first.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const result = await generateRaag(file, fileType)
      setGeneratedRaag(result)
      toast({
        title: "Raag Generated",
        description: `Successfully generated ${result.name}`,
      })
    } catch (error) {
      console.error("Error generating raag:", error)
      toast({
        title: "Generation Failed",
        description: "There was an error generating the raag. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
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
            Raag Generator
          </div>
          <h1 className="mt-6 font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            <span className="devanagari-inspired block bg-gradient-to-r from-gold-300 via-gold-200 to-gold-400 bg-clip-text text-transparent">
              Create Your Own Raag
            </span>
            <span className="mt-2 block text-gold-400 drop-shadow-[0_0_8px_rgba(255,215,0,0.3)]">in Seconds</span>
          </h1>
          <p className="mt-6 text-lg text-white/70">
            Upload your input as Audio, MIDI, or Text Notation and let our AI transform it into a unique raag
            composition.
          </p>

          <div className="mt-16">
            <div className="rounded-xl border border-gold-500/20 bg-black/40 p-8 backdrop-blur-md">
              <div className="flex flex-col items-center gap-6">
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    className="border-gold-500/30 text-white hover:border-gold-400/50 hover:bg-black/50 hover:text-gold-300"
                    onClick={() => document.getElementById("file-upload")?.click()}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Select File
                  </Button>
                  <input
                    id="file-upload"
                    type="file"
                    accept=".mp3,.wav,.midi,.mid,.txt"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <GlowingButton
                    size="lg"
                    text={isLoading ? "Generating..." : "Generate Raag"}
                    icon={<Waveform className="mr-2 h-4 w-4" />}
                    onClick={handleGenerate}
                    disabled={isLoading || !file}
                  />
                </div>
                <p className="text-sm text-white/60">
                  {file ? `Selected: ${file.name}` : "Supported formats: .mp3, .wav, .midi, or text notation"}
                </p>
              </div>

              {generatedRaag ? (
                <div className="mt-8 space-y-6">
                  <Card className="border-gold-500/30 bg-black/60 text-white">
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-serif font-bold text-gold-400 mb-4">{generatedRaag.name}</h2>
                      <p className="mb-6 text-white/80">{generatedRaag.description}</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-lg font-medium text-gold-300 mb-2">Arohana (Ascending)</h3>
                          <div className="flex flex-wrap gap-2">
                            {generatedRaag.arohana.map((note, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 rounded-full bg-gold-500/10 text-white border border-gold-500/30"
                              >
                                {note}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-medium text-gold-300 mb-2">Avarohana (Descending)</h3>
                          <div className="flex flex-wrap gap-2">
                            {generatedRaag.avarohana.map((note, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 rounded-full bg-gold-500/10 text-white border border-gold-500/30"
                              >
                                {note}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <DynamicWaveform />

                  <div className="flex justify-center gap-4">
                    <Button
                      variant="outline"
                      className="border-gold-500/30 text-white hover:border-gold-400/50 hover:bg-black/50 hover:text-gold-300"
                    >
                      <FileMusic className="mr-2 h-4 w-4" />
                      Download MIDI
                    </Button>
                    <Button
                      variant="outline"
                      className="border-gold-500/30 text-white hover:border-gold-400/50 hover:bg-black/50 hover:text-gold-300"
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Download Notation
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="mt-8">
                  <DynamicWaveform />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

