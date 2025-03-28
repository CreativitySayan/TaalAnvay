"use client"

import Link from "next/link"
import { useState } from "react"
import { Music, FileMusic, FileText } from "lucide-react"
import { ParticleBackground } from "@/components/particle-background"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { GlowingButton } from "@/components/glowing-button"
import { createCustomRaag, type CustomRaagParams, type CustomRaagResponse } from "@/lib/api-service"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import DynamicWaveform from "@/components/dynamic-waveform"

export default function CustomCreator() {
  const [params, setParams] = useState<CustomRaagParams>({
    mood: "romantic",
    time_of_day: "Evening",
    taal: "Teentaal",
    bandish_prompt: "a romantic song",
    vakra: false,
    num_notes: 7,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [generatedRaag, setGeneratedRaag] = useState<CustomRaagResponse | null>(null)

  const handleSliderChange = (name: string, value: number[]) => {
    setParams((prev) => ({ ...prev, [name]: value[0] }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setParams((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setParams((prev) => ({ ...prev, [name]: checked }))
  }

  const handleGenerate = async () => {
    setIsLoading(true)
    try {
      const result = await createCustomRaag(params)
      setGeneratedRaag(result)
      toast({
        title: "Raag Generated",
        description: `Successfully generated ${result.name}`,
      })
    } catch (error) {
      console.error("Error generating custom raag:", error)
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
            Custom Raag Creator
          </div>
          <h1 className="mt-6 font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            <span className="devanagari-inspired block bg-gradient-to-r from-gold-300 via-gold-200 to-gold-400 bg-clip-text text-transparent">
              Design Your Unique
            </span>
            <span className="mt-2 block text-gold-400 drop-shadow-[0_0_8px_rgba(255,215,0,0.3)]">Raag with AI</span>
          </h1>
          <p className="mt-6 text-lg text-white/70">
            Define constraints, adjust moods, and create your own unique raag composition with our AI assistance.
          </p>

          <div className="mt-16">
            <div className="rounded-xl border border-gold-500/20 bg-black/40 p-8 backdrop-blur-md">
              {!generatedRaag ? (
                <div className="grid gap-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <Label className="text-gold-400">Mood</Label>
                      <Select defaultValue={params.mood} onValueChange={(value) => handleSelectChange("mood", value)}>
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
                        defaultValue={params.time_of_day}
                        onValueChange={(value) => handleSelectChange("time_of_day", value)}
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
                    <Label className="text-gold-400">Number of Notes ({params.num_notes})</Label>
                    <Slider
                      defaultValue={[params.num_notes as number]}
                      min={5}
                      max={9}
                      step={1}
                      onValueChange={(value) => handleSliderChange("num_notes", value)}
                    />
                  </div>

                  <div className="space-y-4">
                    <Label className="text-gold-400">Taal (Rhythm)</Label>
                    <Select defaultValue={params.taal} onValueChange={(value) => handleSelectChange("taal", value)}>
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
                      checked={params.vakra}
                      onCheckedChange={(checked) => handleSwitchChange("vakra", checked)}
                    />
                  </div>

                  <div className="space-y-4">
                    <Label className="text-gold-400">Bandish Theme</Label>
                    <Select
                      defaultValue={params.bandish_prompt}
                      onValueChange={(value) => handleSelectChange("bandish_prompt", value)}
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

                  <GlowingButton
                    size="lg"
                    text={isLoading ? "Generating..." : "Generate Custom Raag"}
                    className="w-full"
                    onClick={handleGenerate}
                    disabled={isLoading}
                  />
                </div>
              ) : (
                <div className="space-y-8">
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

                      <div className="mt-6">
                        <h3 className="text-lg font-medium text-gold-300 mb-2">Pakad (Characteristic Phrase)</h3>
                        <div className="flex flex-wrap gap-2">
                          {generatedRaag.pakad.map((note, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 rounded-full bg-gold-500/10 text-white border border-gold-500/30"
                            >
                              {note}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-6">
                        <h3 className="text-lg font-medium text-gold-300 mb-2">Bandish</h3>
                        <div className="bg-black/30 p-4 rounded-md border border-gold-500/20">
                          <pre className="whitespace-pre-wrap text-white/80">{generatedRaag.bandish.lyrics}</pre>
                        </div>
                      </div>

                      <div className="mt-6">
                        <h3 className="text-lg font-medium text-gold-300 mb-2">Taal: {params.taal}</h3>
                        <div className="bg-black/30 p-4 rounded-md border border-gold-500/20">
                          <p className="text-white/80">{generatedRaag.taal.structure}</p>
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
                    <GlowingButton text="Create New Raag" onClick={() => setGeneratedRaag(null)} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

