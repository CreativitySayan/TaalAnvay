"use client"

import type React from "react"

import Link from "next/link"
import { useState, useRef } from "react"
import { Music, Upload, Search, Wand2, Download, Info } from "lucide-react"
import { ParticleBackground } from "@/components/particle-background"
import { RaagNodes } from "@/components/raag-nodes"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GlowingButton } from "@/components/glowing-button"
import { toast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import DynamicWaveform from "@/components/dynamic-waveform"

// Sample raag database for search functionality
const raagDatabase = [
  {
    name: "Yaman",
    thaat: "Kalyan",
    time: "Evening",
    notes: ["S", "R", "G", "M#", "P", "D", "N", "S'"],
    description:
      "Raag Yaman is one of the most popular ragas in Hindustani classical music. It's an evening raga that evokes a serene and romantic mood. The distinctive feature is the sharpened fourth (M#) which gives it a unique character.",
  },
  {
    name: "Bhairav",
    thaat: "Bhairav",
    time: "Morning",
    notes: ["S", "r", "G", "M", "P", "d", "N", "S'"],
    description:
      "Raag Bhairav is a morning raga that creates a serious, profound atmosphere. It's one of the oldest ragas and is considered the first raga in the Hindustani classical system.",
  },
  {
    name: "Darbari",
    thaat: "Asavari",
    time: "Night",
    notes: ["S", "R", "g", "M", "P", "d", "n", "S'"],
    description:
      "Raag Darbari is a profound night raga known for its serious and majestic character. It was brought to India by Tansen and was often performed in the royal courts.",
  },
  {
    name: "Malkauns",
    thaat: "Bhairavi",
    time: "Night",
    notes: ["S", "g", "M", "d", "n", "S'"],
    description:
      "Raag Malkauns is a profound night raga with a meditative quality. It's a pentatonic raga (using only five notes) that creates a mystical and intense atmosphere.",
  },
  {
    name: "Bageshri",
    thaat: "Kafi",
    time: "Night",
    notes: ["S", "R", "g", "M", "P", "D", "n", "S'"],
    description:
      "Raag Bageshri is a beautiful night raga that evokes a romantic and slightly melancholic mood. It's often used to express the emotion of longing.",
  },
]

export default function RaagExplorer() {
  const [activeTab, setActiveTab] = useState("explore")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRaag, setSelectedRaag] = useState<any>(null)
  const [file, setFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [identifiedRaag, setIdentifiedRaag] = useState<any>(null)
  const [geminiResponse, setGeminiResponse] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const filteredRaags = raagDatabase.filter(
    (raag) =>
      raag.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      raag.thaat.toLowerCase().includes(searchQuery.toLowerCase()) ||
      raag.time.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      toast({
        title: "File Selected",
        description: `Selected file: ${e.target.files[0].name}`,
      })
    }
  }

  const handleIdentifyRaag = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please upload an audio file first.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      // In a real implementation, this would call your backend API
      // For now, we'll simulate a response
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simulated response - randomly select a raag from the database
      const randomRaag = raagDatabase[Math.floor(Math.random() * raagDatabase.length)]
      setIdentifiedRaag(randomRaag)

      setGeminiResponse(
        `I've analyzed your audio file and identified it as Raag ${randomRaag.name}. This ${randomRaag.time.toLowerCase()} raga from the ${randomRaag.thaat} thaat has a distinctive character defined by its note pattern. The audio exhibits the characteristic phrases and movements typical of ${randomRaag.name}, particularly in how it treats the notes ${randomRaag.notes.join(", ")}.`,
      )

      toast({
        title: "Raag Identified",
        description: `Successfully identified Raag ${randomRaag.name} from your audio.`,
      })
    } catch (error) {
      console.error("Error identifying raag:", error)
      toast({
        title: "Identification Failed",
        description: "There was an error identifying the raag. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRaagSelect = (raag: any) => {
    setSelectedRaag(raag)
    setGeminiResponse(
      `Raag ${raag.name} is a ${raag.time.toLowerCase()} raga belonging to the ${raag.thaat} thaat. It uses the notes ${raag.notes.join(", ")}. This raag creates a distinctive mood and is characterized by its unique melodic movements. When performed correctly, it can evoke powerful emotions in the listener.`,
    )
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
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <div className="inline-block rounded-full bg-gold-500/10 px-4 py-1.5 text-sm font-medium text-gold-300 backdrop-blur-sm border border-gold-500/20 shadow-[0_0_15px_rgba(255,215,0,0.2)]">
              Raag Explorer
            </div>
            <h1 className="mt-6 font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              <span className="devanagari-inspired block bg-gradient-to-r from-gold-300 via-gold-200 to-gold-400 bg-clip-text text-transparent">
                Discover the Universe
              </span>
              <span className="mt-2 block text-gold-400 drop-shadow-[0_0_8px_rgba(255,215,0,0.3)]">of Raags</span>
            </h1>
            <p className="mt-6 text-lg text-white/70">
              Explore our interactive visualization of raags, search the database, or identify raags from audio.
            </p>
          </div>

          <Tabs defaultValue="explore" onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-black/40 border border-gold-500/20">
              <TabsTrigger
                value="explore"
                className="data-[state=active]:bg-gold-500/10 data-[state=active]:text-gold-300"
              >
                Visual Explorer
              </TabsTrigger>
              <TabsTrigger
                value="search"
                className="data-[state=active]:bg-gold-500/10 data-[state=active]:text-gold-300"
              >
                Raag Database
              </TabsTrigger>
              <TabsTrigger
                value="identify"
                className="data-[state=active]:bg-gold-500/10 data-[state=active]:text-gold-300"
              >
                Identify Raag
              </TabsTrigger>
            </TabsList>

            {/* Visual Explorer Tab */}
            <TabsContent value="explore" className="mt-6">
              <div className="relative h-[600px] w-full rounded-xl border border-gold-500/20 bg-black/40 backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                <RaagNodes />
              </div>
              <div className="mt-4 text-center text-sm text-white/70">
                <p>Click on any node to learn more about a specific raag.</p>
              </div>
            </TabsContent>

            {/* Raag Database Tab */}
            <TabsContent value="search" className="mt-6">
              <div className="flex flex-col gap-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
                  <Input
                    placeholder="Search raags by name, thaat, or time of day..."
                    className="pl-10 border-gold-500/30 bg-black/50 text-white placeholder:text-white/40 focus:border-gold-400 focus:ring-gold-400/20"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredRaags.map((raag, index) => (
                    <Card
                      key={index}
                      className={`border-gold-500/20 bg-black/40 backdrop-blur-md hover:border-gold-500/40 transition-all duration-300 cursor-pointer ${selectedRaag?.name === raag.name ? "border-gold-500/60 bg-black/60" : ""}`}
                      onClick={() => handleRaagSelect(raag)}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-serif font-bold text-white">Raag {raag.name}</h3>
                          <Badge variant="outline" className="bg-gold-500/10 text-gold-300 border-gold-500/30">
                            {raag.time}
                          </Badge>
                        </div>
                        <p className="text-sm text-white/60 mt-1">Thaat: {raag.thaat}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {raag.notes.map((note, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 text-xs rounded-full bg-gold-500/10 text-white border border-gold-500/30"
                            >
                              {note}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredRaags.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-white/70">No raags found matching your search criteria.</p>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Identify Raag Tab */}
            <TabsContent value="identify" className="mt-6">
              <Card className="border-gold-500/20 bg-black/40 backdrop-blur-md">
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="text-center">
                      <h2 className="text-xl font-serif font-bold text-white">Upload Audio to Identify Raag</h2>
                      <p className="mt-2 text-sm text-white/70">
                        Upload an audio file of a raga performance to identify the raga, thaat, and time of day.
                      </p>
                    </div>

                    <div className="flex flex-col items-center gap-4">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="audio/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <Button
                        variant="outline"
                        className="border-gold-500/30 text-white hover:border-gold-400/50 hover:bg-black/50 hover:text-gold-300"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Select Audio File
                      </Button>
                      {file && <p className="text-sm text-white/70">Selected: {file.name}</p>}
                      <GlowingButton
                        text={isLoading ? "Identifying..." : "Identify Raag"}
                        onClick={handleIdentifyRaag}
                        disabled={isLoading || !file}
                      />
                    </div>

                    {identifiedRaag && (
                      <div className="mt-8 space-y-6">
                        <div className="rounded-lg border border-gold-500/30 bg-black/60 p-4">
                          <h3 className="text-xl font-serif font-bold text-gold-400 mb-2">
                            Identified: Raag {identifiedRaag.name}
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="text-center p-2 rounded-md bg-gold-500/10">
                              <p className="text-sm text-white/70">Thaat</p>
                              <p className="text-white font-medium">{identifiedRaag.thaat}</p>
                            </div>
                            <div className="text-center p-2 rounded-md bg-gold-500/10">
                              <p className="text-sm text-white/70">Time of Day</p>
                              <p className="text-white font-medium">{identifiedRaag.time}</p>
                            </div>
                            <div className="text-center p-2 rounded-md bg-gold-500/10">
                              <p className="text-sm text-white/70">Number of Notes</p>
                              <p className="text-white font-medium">{identifiedRaag.notes.length}</p>
                            </div>
                          </div>
                          <div className="mb-4">
                            <p className="text-sm text-white/70 mb-1">Notes</p>
                            <div className="flex flex-wrap gap-2">
                              {identifiedRaag.notes.map((note: string, index: number) => (
                                <span
                                  key={index}
                                  className="px-3 py-1 rounded-full bg-gold-500/10 text-white border border-gold-500/30"
                                >
                                  {note}
                                </span>
                              ))}
                            </div>
                          </div>
                          <p className="text-white/80">{identifiedRaag.description}</p>
                        </div>

                        <DynamicWaveform />

                        <div className="flex justify-center gap-4">
                          <Button
                            variant="outline"
                            className="border-gold-500/30 text-white hover:border-gold-400/50 hover:bg-black/50 hover:text-gold-300"
                          >
                            <Download className="mr-2 h-4 w-4" />
                            Download Analysis
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Gemini AI Response Section */}
          {geminiResponse && (
            <div className="mt-8">
              <Card className="border-gold-500/30 bg-black/60 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Wand2 className="h-5 w-5 text-gold-400" />
                    <h3 className="text-lg font-medium text-gold-400">AI Analysis</h3>
                  </div>
                  <div className="whitespace-pre-line text-white/80">{geminiResponse}</div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Info Section */}
          <div className="mt-12 rounded-xl border border-gold-500/20 bg-black/40 p-6 backdrop-blur-md">
            <div className="flex items-start gap-4">
              <Info className="h-6 w-6 text-gold-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-serif font-bold text-white mb-2">About Raags</h3>
                <p className="text-white/70 mb-4">
                  Raags are the melodic framework for composition and improvisation in Indian classical music. Each raag
                  has specific ascending (arohana) and descending (avarohana) patterns, as well as characteristic
                  phrases (pakad).
                </p>
                <p className="text-white/70">
                  Raags are often associated with specific times of day, seasons, or emotions. The thaat system
                  classifies raags into ten parent scales, each with its own distinctive character.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

