"use client"

import type React from "react"

import Link from "next/link"
import { useState, useRef } from "react"
import { Music, Upload, Wand2 } from "lucide-react"
import { ParticleBackground } from "@/components/particle-background"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { GlowingButton } from "@/components/glowing-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import DynamicWaveform from "@/components/dynamic-waveform"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CustomCreator() {
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("custom")
  const [file, setFile] = useState<File | null>(null)
  const [geminiResponse, setGeminiResponse] = useState("")
  const [songInput, setSongInput] = useState("")
  const [customParams, setCustomParams] = useState({
    mood: "romantic",
    timeOfDay: "Evening",
    notes: "",
    thaat: "Kalyan",
    numNotes: 7,
    vakra: false,
    taal: "Teentaal",
    bandishPrompt: "a romantic song",
  })
  const [identifiedRaga, setIdentifiedRaga] = useState({
    name: "",
    thaat: "",
    time: "",
    notes: [],
    description: "",
  })
  const [recommendedRagas, setRecommendedRagas] = useState<Array<{ name: string; description: string }>>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      toast({
        title: "File Selected",
        description: `Selected file: ${e.target.files[0].name}`,
      })
    }
  }

  const handleCustomParamChange = (param: string, value: any) => {
    setCustomParams((prev) => ({
      ...prev,
      [param]: value,
    }))
  }

  const handleIdentifyRaga = async () => {
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

      // Simulated response
      setIdentifiedRaga({
        name: "Yaman",
        thaat: "Kalyan",
        time: "Evening",
        notes: ["S", "R", "G", "M#", "P", "D", "N", "S'"],
        description:
          "Raag Yaman is one of the most popular ragas in Hindustani classical music. It's an evening raga that evokes a serene and romantic mood. The distinctive feature is the sharpened fourth (M#) which gives it a unique character.",
      })

      setGeminiResponse(
        "Raag Yaman is identified from your audio. This is an evening raga from the Kalyan thaat, known for its serene and romantic mood. The sharpened fourth (M#) gives it a distinctive character that makes it immediately recognizable.",
      )

      toast({
        title: "Raga Identified",
        description: "Successfully identified Raag Yaman from your audio.",
      })
    } catch (error) {
      console.error("Error identifying raga:", error)
      toast({
        title: "Identification Failed",
        description: "There was an error identifying the raga. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRecommendRagas = async () => {
    if (!songInput) {
      toast({
        title: "No songs entered",
        description: "Please enter at least one song name.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      // In a real implementation, this would call your backend API
      // For now, we'll simulate a response
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simulated response
      const songs = songInput.split(",").map((s) => s.trim())
      setRecommendedRagas([
        {
          name: "Yaman",
          description:
            "Based on your song preferences which suggest a romantic mood, Raag Yaman would be an excellent choice. This evening raga has a serene and uplifting quality that matches well with romantic songs like 'Tum Hi Ho'.",
        },
        {
          name: "Bhimpalasi",
          description:
            "For a more introspective mood, Raag Bhimpalasi offers a beautiful afternoon raga that can evoke both joy and a touch of melancholy, perfect for songs with emotional depth.",
        },
      ])

      setGeminiResponse(
        `Based on your song library (${songs.join(", ")}), I've analyzed that you prefer songs with a romantic and emotional quality. Raag Yaman would be an excellent match for your taste, as it's often used in romantic Bollywood compositions. You might also enjoy Raag Bhimpalasi for its emotional depth.`,
      )

      toast({
        title: "Recommendations Generated",
        description: "Successfully generated raga recommendations based on your songs.",
      })
    } catch (error) {
      console.error("Error recommending ragas:", error)
      toast({
        title: "Recommendation Failed",
        description: "There was an error generating recommendations. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateCustomRaga = async () => {
    setIsLoading(true)
    try {
      // In a real implementation, this would call your backend API
      // For now, we'll simulate a response
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setGeminiResponse(`I've created a custom raga based on your parameters:
      
Mood: ${customParams.mood}
Time of Day: ${customParams.timeOfDay}
Thaat: ${customParams.thaat}
Number of Notes: ${customParams.numNotes}
Vakra (Zigzag): ${customParams.vakra ? "Yes" : "No"}
Taal: ${customParams.taal}
Bandish Theme: ${customParams.bandishPrompt}

This custom raga combines elements of ${customParams.thaat} thaat with a ${customParams.mood} mood, perfect for ${customParams.timeOfDay.toLowerCase()} performances. The ${customParams.vakra ? "vakra (zigzag) patterns add complexity" : "straight patterns create clarity"} in the melodic structure.`)

      toast({
        title: "Custom Raga Created",
        description: "Successfully created a custom raga based on your parameters.",
      })
    } catch (error) {
      console.error("Error creating custom raga:", error)
      toast({
        title: "Creation Failed",
        description: "There was an error creating the custom raga. Please try again.",
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
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <div className="inline-block rounded-full bg-gold-500/10 px-4 py-1.5 text-sm font-medium text-gold-300 backdrop-blur-sm border border-gold-500/20 shadow-[0_0_15px_rgba(255,215,0,0.2)]">
              Custom Creator
            </div>
            <h1 className="mt-6 font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              <span className="devanagari-inspired block bg-gradient-to-r from-gold-300 via-gold-200 to-gold-400 bg-clip-text text-transparent">
                Design Your Unique
              </span>
              <span className="mt-2 block text-gold-400 drop-shadow-[0_0_8px_rgba(255,215,0,0.3)]">Raag with AI</span>
            </h1>
            <p className="mt-6 text-lg text-white/70">
              Identify, recommend, or create custom raags with our AI-powered tools.
            </p>
          </div>

          <Tabs defaultValue="custom" onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-black/40 border border-gold-500/20">
              <TabsTrigger
                value="identify"
                className="data-[state=active]:bg-gold-500/10 data-[state=active]:text-gold-300"
              >
                Identify Raag
              </TabsTrigger>
              <TabsTrigger
                value="recommend"
                className="data-[state=active]:bg-gold-500/10 data-[state=active]:text-gold-300"
              >
                Recommend Raags
              </TabsTrigger>
              <TabsTrigger
                value="custom"
                className="data-[state=active]:bg-gold-500/10 data-[state=active]:text-gold-300"
              >
                Create Custom Raag
              </TabsTrigger>
            </TabsList>

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
                        onClick={handleIdentifyRaga}
                        disabled={isLoading || !file}
                      />
                    </div>

                    {identifiedRaga.name && (
                      <div className="mt-8 space-y-6">
                        <div className="rounded-lg border border-gold-500/30 bg-black/60 p-4">
                          <h3 className="text-xl font-serif font-bold text-gold-400 mb-2">
                            Identified: Raag {identifiedRaga.name}
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="text-center p-2 rounded-md bg-gold-500/10">
                              <p className="text-sm text-white/70">Thaat</p>
                              <p className="text-white font-medium">{identifiedRaga.thaat}</p>
                            </div>
                            <div className="text-center p-2 rounded-md bg-gold-500/10">
                              <p className="text-sm text-white/70">Time of Day</p>
                              <p className="text-white font-medium">{identifiedRaga.time}</p>
                            </div>
                            <div className="text-center p-2 rounded-md bg-gold-500/10">
                              <p className="text-sm text-white/70">Number of Notes</p>
                              <p className="text-white font-medium">{identifiedRaga.notes.length}</p>
                            </div>
                          </div>
                          <div className="mb-4">
                            <p className="text-sm text-white/70 mb-1">Notes</p>
                            <div className="flex flex-wrap gap-2">
                              {identifiedRaga.notes.map((note, index) => (
                                <span
                                  key={index}
                                  className="px-3 py-1 rounded-full bg-gold-500/10 text-white border border-gold-500/30"
                                >
                                  {note}
                                </span>
                              ))}
                            </div>
                          </div>
                          <p className="text-white/80">{identifiedRaga.description}</p>
                        </div>

                        <DynamicWaveform />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Recommend Raags Tab */}
            <TabsContent value="recommend" className="mt-6">
              <Card className="border-gold-500/20 bg-black/40 backdrop-blur-md">
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="text-center">
                      <h2 className="text-xl font-serif font-bold text-white">Get Raag Recommendations</h2>
                      <p className="mt-2 text-sm text-white/70">
                        Enter songs you like, and we'll recommend raags that match your musical taste.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <Label htmlFor="songs" className="text-white">
                        Enter Song Names (comma separated)
                      </Label>
                      <Textarea
                        id="songs"
                        placeholder="e.g., Tum Hi Ho, Kal Ho Naa Ho, Vande Mataram"
                        className="min-h-20 border-gold-500/30 bg-black/50 text-white placeholder:text-white/40 focus:border-gold-400 focus:ring-gold-400/20"
                        value={songInput}
                        onChange={(e) => setSongInput(e.target.value)}
                      />
                      <div className="flex justify-center">
                        <GlowingButton
                          text={isLoading ? "Generating..." : "Get Recommendations"}
                          onClick={handleRecommendRagas}
                          disabled={isLoading || !songInput}
                        />
                      </div>
                    </div>

                    {recommendedRagas.length > 0 && (
                      <div className="mt-8 space-y-6">
                        <h3 className="text-xl font-serif font-bold text-white">Recommended Raags</h3>
                        <div className="grid gap-4">
                          {recommendedRagas.map((raga, index) => (
                            <div key={index} className="rounded-lg border border-gold-500/30 bg-black/60 p-4">
                              <h4 className="text-lg font-serif font-bold text-gold-400 mb-2">Raag {raga.name}</h4>
                              <p className="text-white/80">{raga.description}</p>
                            </div>
                          ))}
                        </div>

                        <DynamicWaveform />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Create Custom Raag Tab */}
            <TabsContent value="custom" className="mt-6">
              <Card className="border-gold-500/20 bg-black/40 backdrop-blur-md">
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="text-center">
                      <h2 className="text-xl font-serif font-bold text-white">Create a Custom Raag</h2>
                      <p className="mt-2 text-sm text-white/70">
                        Define parameters to create your own unique raag with AI assistance.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <Label className="text-gold-400">Mood</Label>
                        <Select
                          defaultValue={customParams.mood}
                          onValueChange={(value) => handleCustomParamChange("mood", value)}
                        >
                          <SelectTrigger className="border-gold-500/30 bg-black/50 text-white">
                            <SelectValue placeholder="Select mood" />
                          </SelectTrigger>
                          <SelectContent className="border-gold-500/30 bg-black/90 text-white">
                            <SelectItem value="romantic">Romantic</SelectItem>
                            <SelectItem value="melancholic">Melancholic</SelectItem>
                            <SelectItem value="devotional">Devotional</SelectItem>
                            <SelectItem value="energetic">Energetic</SelectItem>
                            <SelectItem value="classical">Classical</SelectItem>
                            <SelectItem value="patriotic">Patriotic</SelectItem>
                            <SelectItem value="playful">Playful</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-4">
                        <Label className="text-gold-400">Time of Day</Label>
                        <Select
                          defaultValue={customParams.timeOfDay}
                          onValueChange={(value) => handleCustomParamChange("timeOfDay", value)}
                        >
                          <SelectTrigger className="border-gold-500/30 bg-black/50 text-white">
                            <SelectValue placeholder="Select time of day" />
                          </SelectTrigger>
                          <SelectContent className="border-gold-500/30 bg-black/90 text-white">
                            <SelectItem value="Morning">Morning</SelectItem>
                            <SelectItem value="Afternoon">Afternoon</SelectItem>
                            <SelectItem value="Evening">Evening</SelectItem>
                            <SelectItem value="Night">Night</SelectItem>
                            <SelectItem value="Anytime">Anytime</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label className="text-gold-400">Thaat (Parent Scale)</Label>
                      <Select
                        defaultValue={customParams.thaat}
                        onValueChange={(value) => handleCustomParamChange("thaat", value)}
                      >
                        <SelectTrigger className="border-gold-500/30 bg-black/50 text-white">
                          <SelectValue placeholder="Select thaat" />
                        </SelectTrigger>
                        <SelectContent className="border-gold-500/30 bg-black/90 text-white">
                          <SelectItem value="Kalyan">Kalyan</SelectItem>
                          <SelectItem value="Bilawal">Bilawal</SelectItem>
                          <SelectItem value="Khamaj">Khamaj</SelectItem>
                          <SelectItem value="Bhairav">Bhairav</SelectItem>
                          <SelectItem value="Purvi">Purvi</SelectItem>
                          <SelectItem value="Marwa">Marwa</SelectItem>
                          <SelectItem value="Kafi">Kafi</SelectItem>
                          <SelectItem value="Asavari">Asavari</SelectItem>
                          <SelectItem value="Bhairavi">Bhairavi</SelectItem>
                          <SelectItem value="Todi">Todi</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-4">
                      <Label className="text-gold-400">Number of Notes ({customParams.numNotes})</Label>
                      <Slider
                        defaultValue={[customParams.numNotes]}
                        min={5}
                        max={9}
                        step={1}
                        onValueChange={(value) => handleCustomParamChange("numNotes", value[0])}
                      />
                    </div>

                    <div className="space-y-4">
                      <Label className="text-gold-400">Custom Notes (optional)</Label>
                      <Input
                        placeholder="e.g., S R G M# P D N"
                        className="border-gold-500/30 bg-black/50 text-white placeholder:text-white/40 focus:border-gold-400 focus:ring-gold-400/20"
                        value={customParams.notes}
                        onChange={(e) => handleCustomParamChange("notes", e.target.value)}
                      />
                      <p className="text-xs text-white/60">
                        Leave blank to let AI generate notes, or enter specific notes you want to include.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <Label className="text-gold-400">Taal (Rhythm)</Label>
                      <Select
                        defaultValue={customParams.taal}
                        onValueChange={(value) => handleCustomParamChange("taal", value)}
                      >
                        <SelectTrigger className="border-gold-500/30 bg-black/50 text-white">
                          <SelectValue placeholder="Select taal" />
                        </SelectTrigger>
                        <SelectContent className="border-gold-500/30 bg-black/90 text-white">
                          <SelectItem value="Teentaal">Teentaal (16 beats)</SelectItem>
                          <SelectItem value="Jhaptaal">Jhaptaal (10 beats)</SelectItem>
                          <SelectItem value="Ektaal">Ektaal (12 beats)</SelectItem>
                          <SelectItem value="Rupak">Rupak (7 beats)</SelectItem>
                          <SelectItem value="Dadra">Dadra (6 beats)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <Label className="text-gold-400">Use Vakra (Zigzag) Patterns</Label>
                      <Switch
                        checked={customParams.vakra}
                        onCheckedChange={(checked) => handleCustomParamChange("vakra", checked)}
                      />
                    </div>

                    <div className="space-y-4">
                      <Label className="text-gold-400">Bandish Theme</Label>
                      <Select
                        defaultValue={customParams.bandishPrompt}
                        onValueChange={(value) => handleCustomParamChange("bandishPrompt", value)}
                      >
                        <SelectTrigger className="border-gold-500/30 bg-black/50 text-white">
                          <SelectValue placeholder="Select theme" />
                        </SelectTrigger>
                        <SelectContent className="border-gold-500/30 bg-black/90 text-white">
                          <SelectItem value="a romantic song">Romantic</SelectItem>
                          <SelectItem value="a devotional prayer">Devotional</SelectItem>
                          <SelectItem value="a song about nature">Nature</SelectItem>
                          <SelectItem value="a song about seasons">Seasons</SelectItem>
                          <SelectItem value="a song about love and separation">Love & Separation</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex justify-center">
                      <GlowingButton
                        text={isLoading ? "Creating..." : "Create Custom Raag"}
                        icon={<Wand2 className="mr-2 h-4 w-4" />}
                        onClick={handleCreateCustomRaga}
                        disabled={isLoading}
                      />
                    </div>
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
        </div>
      </main>
    </div>
  )
}

