"use client"

import type React from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Music, ArrowLeft } from "lucide-react"
import { ParticleBackground } from "@/components/particle-background"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { GlowingButton } from "@/components/glowing-button"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { toast } from "@/components/ui/use-toast"

export default function NewDiscussion() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    tags: "",
    content: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validate form
    if (!formData.title || !formData.category || !formData.content) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Discussion created!",
        description: "Your discussion has been posted successfully.",
      })
      setIsSubmitting(false)
      router.push("/community")
    }, 1500)
  }

  const handleCancel = () => {
    router.push("/community")
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
        <div className="mx-auto max-w-3xl">
          <div className="mb-8">
            <Link
              href="/community"
              className="inline-flex items-center text-white/70 hover:text-gold-300 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Community
            </Link>
          </div>

          <div className="rounded-xl border border-gold-500/20 bg-black/60 p-8 backdrop-blur-md">
            <h1 className="font-serif text-2xl font-bold text-white mb-6">Create New Discussion</h1>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="title" className="text-white">
                  Title <span className="text-gold-400">*</span>
                </Label>
                <Input
                  id="title"
                  placeholder="What would you like to discuss?"
                  className="border-gold-500/30 bg-black/50 text-white placeholder:text-white/40 focus:border-gold-400 focus:ring-gold-400/20"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-white">
                  Category <span className="text-gold-400">*</span>
                </Label>
                <Select onValueChange={handleCategoryChange} value={formData.category} required>
                  <SelectTrigger className="border-gold-500/30 bg-black/50 text-white focus:border-gold-400 focus:ring-gold-400/20">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className="border-gold-500/30 bg-black/90 text-white">
                    <SelectItem value="general">General Discussion</SelectItem>
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="composition">Composition</SelectItem>
                    <SelectItem value="feedback">Feedback Request</SelectItem>
                    <SelectItem value="showcase">Showcase</SelectItem>
                    <SelectItem value="help">Help & Support</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags" className="text-white">
                  Tags (comma separated)
                </Label>
                <Input
                  id="tags"
                  placeholder="e.g. Morning Raags, Beginners, Tips"
                  className="border-gold-500/30 bg-black/50 text-white placeholder:text-white/40 focus:border-gold-400 focus:ring-gold-400/20"
                  value={formData.tags}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content" className="text-white">
                  Content <span className="text-gold-400">*</span>
                </Label>
                <Textarea
                  id="content"
                  placeholder="Share your thoughts, questions, or ideas..."
                  className="min-h-40 border-gold-500/30 bg-black/50 text-white placeholder:text-white/40 focus:border-gold-400 focus:ring-gold-400/20"
                  value={formData.content}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="border-gold-500/30 text-white hover:border-gold-400/50 hover:bg-black/50 hover:text-gold-300"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <GlowingButton
                  text={isSubmitting ? "Creating..." : "Create Discussion"}
                  type="submit"
                  disabled={isSubmitting}
                />
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

