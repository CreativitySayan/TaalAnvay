"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Music, Heart, MessageSquare, Filter, Plus, ArrowDown, Play, Pause } from "lucide-react"
import { ParticleBackground } from "@/components/particle-background"
import Image from "next/image"
import DynamicWaveform from "@/components/dynamic-waveform"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GlowingButton } from "@/components/glowing-button"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

// Sample famous raag compositions
const famousCompositions = [
  {
    id: 1,
    title: "Raag Bhairav - Morning Meditation",
    author: "Pt. Ravi Shankar",
    avatar: "/placeholder.svg?height=100&width=100",
    date: "Classical Recording",
    likes: 542,
    description:
      "A serene morning raag performed by the legendary sitarist Pt. Ravi Shankar. This composition exemplifies the peaceful and contemplative nature of Raag Bhairav.",
    instrument: "Sitar",
  },
  {
    id: 2,
    title: "Raag Yaman - Evening Bliss",
    author: "Ustad Bismillah Khan",
    avatar: "/placeholder.svg?height=100&width=100",
    date: "Traditional Rendition",
    likes: 487,
    description:
      "A soulful evening raag performed on the shehnai by Ustad Bismillah Khan. Raag Yaman is known for its serene and romantic mood, perfect for sunset hours.",
    instrument: "Shehnai",
  },
  {
    id: 3,
    title: "Raag Malkauns - Midnight Mystique",
    author: "Pt. Jasraj",
    avatar: "/placeholder.svg?height=100&width=100",
    date: "Vocal Masterpiece",
    likes: 398,
    description:
      "A profound vocal rendition of Raag Malkauns by Pt. Jasraj. This midnight raag creates a deep, meditative atmosphere with its pentatonic structure.",
    instrument: "Vocal",
  },
  {
    id: 4,
    title: "Raag Darbari - Royal Court",
    author: "Ustad Ali Akbar Khan",
    avatar: "/placeholder.svg?height=100&width=100",
    date: "Historic Recording",
    likes: 456,
    description:
      "A majestic rendition of Raag Darbari on the sarod by Ustad Ali Akbar Khan. This raag was historically performed in the royal courts and evokes a sense of grandeur.",
    instrument: "Sarod",
  },
  {
    id: 5,
    title: "Raag Bhimpalasi - Afternoon Delight",
    author: "Hariprasad Chaurasia",
    avatar: "/placeholder.svg?height=100&width=100",
    date: "Flute Symphony",
    likes: 367,
    description:
      "A melodious afternoon raag performed on the bansuri flute by Hariprasad Chaurasia. Raag Bhimpalasi is known for its sweet and somewhat melancholic mood.",
    instrument: "Bansuri",
  },
]

// Sample discussion data
const discussions = [
  {
    id: 1,
    title: "How to create a morning raag with peaceful vibes?",
    author: "RaagExplorer",
    avatar: "/placeholder.svg?height=100&width=100",
    date: "2 days ago",
    replies: 12,
    likes: 24,
    tags: ["Morning Raags", "Beginners"],
    excerpt:
      "I'm trying to generate a morning raag that evokes a sense of peace and tranquility. Any suggestions on the parameters I should use?",
  },
  {
    id: 2,
    title: "Combining Bhairav and Yaman elements - Is it possible?",
    author: "ClassicalFusion",
    avatar: "/placeholder.svg?height=100&width=100",
    date: "5 days ago",
    replies: 8,
    likes: 16,
    tags: ["Fusion", "Advanced"],
    excerpt:
      "I'm experimenting with combining elements from Bhairav and Yaman raags. Has anyone tried this before? What were your results?",
  },
  {
    id: 3,
    title: "Best settings for monsoon raags",
    author: "MalharLover",
    avatar: "/placeholder.svg?height=100&width=100",
    date: "1 week ago",
    replies: 15,
    likes: 32,
    tags: ["Seasonal", "Tips"],
    excerpt:
      "With the monsoon season approaching, I'd like to generate some raags that capture the essence of rain. What settings work best for you?",
  },
  {
    id: 4,
    title: "Feedback on my first AI-generated raag composition",
    author: "NewToRagas",
    avatar: "/placeholder.svg?height=100&width=100",
    date: "3 days ago",
    replies: 7,
    likes: 9,
    tags: ["Feedback", "Showcase"],
    excerpt:
      "I've just created my first raag using RaagAI. I'd love to get some feedback from more experienced users. Here's the link to my composition.",
  },
  {
    id: 5,
    title: "Technical discussion: How does the AI model understand raag structure?",
    author: "AIResearcher",
    avatar: "/placeholder.svg?height=100&width=100",
    date: "2 weeks ago",
    replies: 23,
    likes: 41,
    tags: ["Technical", "AI Models"],
    excerpt:
      "I'm curious about the underlying architecture of the AI model. How does it understand and implement the complex structure of raags?",
  },
]

export default function Community() {
  const router = useRouter()
  const [playingTrack, setPlayingTrack] = useState<number | null>(null)

  const handleNewDiscussion = () => {
    router.push("/community/new-discussion")
  }

  const togglePlay = (id: number) => {
    if (playingTrack === id) {
      setPlayingTrack(null)
    } else {
      setPlayingTrack(id)
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
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <div className="inline-block rounded-full bg-gold-500/10 px-4 py-1.5 text-sm font-medium text-gold-300 backdrop-blur-sm border border-gold-500/20 shadow-[0_0_15px_rgba(255,215,0,0.2)]">
              Community
            </div>
            <h1 className="mt-6 font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              <span className="devanagari-inspired block bg-gradient-to-r from-gold-300 via-gold-200 to-gold-400 bg-clip-text text-transparent">
                Share & Discover
              </span>
              <span className="mt-2 block text-gold-400 drop-shadow-[0_0_8px_rgba(255,215,0,0.3)]">
                AI-Generated Raags
              </span>
            </h1>
            <p className="mt-6 text-lg text-white/70">
              Explore compositions from our community, share your creations, and connect with fellow enthusiasts.
            </p>
          </div>

          <Tabs defaultValue="compositions" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-black/40 border border-gold-500/20">
              <TabsTrigger
                value="compositions"
                className="data-[state=active]:bg-gold-500/10 data-[state=active]:text-gold-300"
              >
                Compositions
              </TabsTrigger>
              <TabsTrigger
                value="discussions"
                className="data-[state=active]:bg-gold-500/10 data-[state=active]:text-gold-300"
              >
                Discussions
              </TabsTrigger>
            </TabsList>

            {/* Compositions Tab */}
            <TabsContent value="compositions" className="mt-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-serif font-bold text-white">Famous Raag Compositions</h2>
                <Button
                  variant="outline"
                  className="border-gold-500/30 text-white hover:border-gold-400/50 hover:bg-black/50 hover:text-gold-300"
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Filter by Raag
                </Button>
              </div>

              <div className="grid gap-8">
                {famousCompositions.map((composition) => (
                  <div
                    key={composition.id}
                    className="rounded-xl border border-gold-500/20 bg-black/40 p-6 backdrop-blur-md hover:border-gold-500/40 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-gold-500/50 flex-shrink-0">
                        <Image
                          src={composition.avatar || "/placeholder.svg"}
                          alt={`${composition.author}'s avatar`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                          <h3 className="font-serif text-xl font-bold text-white">{composition.title}</h3>
                          <Badge
                            variant="outline"
                            className="bg-gold-500/10 text-gold-300 border-gold-500/30 hover:bg-gold-500/20 self-start sm:self-auto"
                          >
                            {composition.instrument}
                          </Badge>
                        </div>
                        <div className="flex items-center text-sm text-white/60 mb-3">
                          <span className="font-medium text-gold-300">{composition.author}</span>
                          <span className="mx-2">•</span>
                          <span>{composition.date}</span>
                        </div>
                        <p className="text-sm text-white/70 mb-4">{composition.description}</p>
                        <div className="flex items-center justify-between">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gold-500/30 text-white hover:border-gold-400/50 hover:bg-black/50 hover:text-gold-300"
                            onClick={() => togglePlay(composition.id)}
                          >
                            {playingTrack === composition.id ? (
                              <>
                                <Pause className="mr-2 h-4 w-4" />
                                Pause
                              </>
                            ) : (
                              <>
                                <Play className="mr-2 h-4 w-4" />
                                Play
                              </>
                            )}
                          </Button>
                          <button className="group flex items-center gap-2 text-sm text-white/60 hover:text-gold-400 transition-colors">
                            <Heart className="h-4 w-4" />
                            <span>{composition.likes}</span>
                          </button>
                        </div>
                        {playingTrack === composition.id && (
                          <div className="mt-4">
                            <DynamicWaveform />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Discussions Tab */}
            <TabsContent value="discussions" className="mt-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gold-500/30 text-white hover:border-gold-400/50 hover:bg-black/50 hover:text-gold-300"
                  >
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-white/60">Sort by:</span>
                    <Button variant="ghost" size="sm" className="text-white/80 hover:text-gold-300">
                      Latest
                      <ArrowDown className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <GlowingButton
                  text="New Discussion"
                  icon={<Plus className="mr-2 h-4 w-4" />}
                  size="sm"
                  onClick={handleNewDiscussion}
                />
              </div>

              <div className="space-y-4">
                {discussions.map((discussion) => (
                  <div
                    key={discussion.id}
                    className="rounded-xl border border-gold-500/20 bg-black/40 p-6 backdrop-blur-md hover:border-gold-500/40 transition-all duration-300"
                  >
                    <div className="flex gap-4">
                      <div className="hidden sm:block">
                        <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-gold-500/50">
                          <Image
                            src={discussion.avatar || "/placeholder.svg"}
                            alt={`${discussion.author}'s avatar`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <h3 className="font-serif text-xl font-medium text-white hover:text-gold-300 transition-colors">
                            <Link href={`/community/discussions/${discussion.id}`}>{discussion.title}</Link>
                          </h3>
                          <div className="flex items-center gap-3 text-sm text-white/60">
                            <span className="flex items-center">
                              <MessageSquare className="mr-1 h-4 w-4" />
                              {discussion.replies}
                            </span>
                            <span className="flex items-center">
                              <Heart className="mr-1 h-4 w-4" />
                              {discussion.likes}
                            </span>
                          </div>
                        </div>

                        <div className="mt-2 flex flex-wrap gap-2">
                          {discussion.tags.map((tag, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="bg-gold-500/10 text-gold-300 border-gold-500/30 hover:bg-gold-500/20"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <p className="mt-3 text-sm text-white/70">{discussion.excerpt}</p>

                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-white/80">{discussion.author}</span>
                            <span className="text-xs text-white/50">• {discussion.date}</span>
                          </div>
                          <Link href={`/community/discussions/${discussion.id}`}>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-gold-400 hover:text-gold-300 hover:bg-transparent"
                            >
                              Read more
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex justify-center">
                <Button
                  variant="outline"
                  className="border-gold-500/30 text-white hover:border-gold-400/50 hover:bg-black/50 hover:text-gold-300"
                >
                  Load More
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

