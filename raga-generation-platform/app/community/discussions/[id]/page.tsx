"use client"

import Link from "next/link"
import { useState } from "react"
import { Music, Heart, ArrowLeft, MessageSquare, Share2, Flag, Send } from "lucide-react"
import { ParticleBackground } from "@/components/particle-background"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { GlowingButton } from "@/components/glowing-button"
import { toast } from "@/components/ui/use-toast"

// Sample discussion data
const discussionData = {
  id: 1,
  title: "How to create a morning raag with peaceful vibes?",
  author: "RagaExplorer",
  avatar: "/placeholder.svg?height=100&width=100",
  date: "2 days ago",
  content: `
    I've been experimenting with the RaagAI platform for a few weeks now, and I'm particularly interested in creating morning raags that evoke a sense of peace and tranquility.
    
    I've tried adjusting the mood intensity to around 40% and setting the complexity to 50%, but I'm not quite getting the results I want. The compositions feel a bit too energetic for what I'm aiming for.
    
    Has anyone had success creating peaceful morning raags? What parameters did you use? Any specific raags I should study as reference?
    
    Thanks in advance for your help!
  `,
  tags: ["Morning Ragas", "Beginners"],
  likes: 24,
  replies: [
    {
      id: 1,
      author: "ClassicalMaster",
      avatar: "/placeholder.svg?height=100&width=100",
      date: "2 days ago",
      content:
        "For morning raags with peaceful vibes, I'd recommend looking at Raag Bhairav as a starting point. Try setting the mood intensity to around 30% and complexity to 40%. Also, make sure to set the improvisation level lower, around 20-30%, to keep it more structured and less unpredictable.",
      likes: 12,
      isLiked: false,
    },
    {
      id: 2,
      author: "NewLearner",
      avatar: "/placeholder.svg?height=100&width=100",
      date: "1 day ago",
      content:
        "I had similar questions when I started! What helped me was using the 'Custom Creator' with Raag Bhairav or Raag Ahir Bhairav as reference. These raags naturally have a peaceful morning quality. I found that keeping the tempo slower also helps create that tranquil feeling.",
      likes: 8,
      isLiked: false,
    },
    {
      id: 3,
      author: "AIResearcher",
      avatar: "/placeholder.svg?height=100&width=100",
      date: "1 day ago",
      content:
        "From a technical perspective, the AI tends to generate more energetic compositions when the complexity is set higher. For peaceful morning ragas, try reducing both complexity and improvisation levels. Also, in the advanced settings, you can explicitly set the tempo to 'Vilambit' (slow) which should help achieve the peaceful quality you're looking for.",
      likes: 15,
      isLiked: false,
    },
  ],
}

export default function DiscussionDetail({ params }: { params: { id: string } }) {
  const [discussion, setDiscussion] = useState(discussionData)
  const [replyContent, setReplyContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setDiscussion((prev) => ({
      ...prev,
      likes: isLiked ? prev.likes - 1 : prev.likes + 1,
    }))

    if (!isLiked) {
      toast({
        title: "Post liked",
        description: "You've liked this discussion",
      })
    }
  }

  const handleReplyLike = (replyId: number) => {
    setDiscussion((prev) => ({
      ...prev,
      replies: prev.replies.map((reply) => {
        if (reply.id === replyId) {
          const newIsLiked = !reply.isLiked
          return {
            ...reply,
            likes: newIsLiked ? reply.likes + 1 : reply.likes - 1,
            isLiked: newIsLiked,
          }
        }
        return reply
      }),
    }))
  }

  const handleShare = () => {
    // Simulate copying to clipboard
    toast({
      title: "Link copied",
      description: "Discussion link copied to clipboard",
    })
  }

  const handleReport = () => {
    toast({
      title: "Report submitted",
      description: "Thank you for helping keep our community safe",
    })
  }

  const handleSubmitReply = () => {
    if (!replyContent.trim()) {
      toast({
        title: "Empty reply",
        description: "Please write something before submitting",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const newReply = {
        id: discussion.replies.length + 1,
        author: "You",
        avatar: "/placeholder.svg?height=100&width=100",
        date: "Just now",
        content: replyContent,
        likes: 0,
        isLiked: false,
      }

      setDiscussion((prev) => ({
        ...prev,
        replies: [...prev.replies, newReply],
      }))

      setReplyContent("")
      setIsSubmitting(false)

      toast({
        title: "Reply posted",
        description: "Your reply has been added to the discussion",
      })
    }, 1000)
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
              RagaAI
            </span>
          </Link>
        </div>
      </header>

      <main className="container py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <Link
              href="/community"
              className="inline-flex items-center text-white/70 hover:text-gold-300 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Community
            </Link>
          </div>

          {/* Discussion Header */}
          <div className="rounded-xl border border-gold-500/20 bg-black/40 p-6 backdrop-blur-md">
            <h1 className="font-serif text-2xl font-bold text-white md:text-3xl">{discussion.title}</h1>

            <div className="mt-4 flex flex-wrap gap-2">
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

            <div className="mt-6 flex items-start gap-4">
              <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-gold-500/50">
                <Image
                  src={discussion.avatar || "/placeholder.svg"}
                  alt={`${discussion.author}'s avatar`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-white">{discussion.author}</p>
                    <p className="text-sm text-white/50">{discussion.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white/60 hover:text-gold-300 hover:bg-transparent"
                      onClick={handleShare}
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white/60 hover:text-gold-300 hover:bg-transparent"
                      onClick={handleReport}
                    >
                      <Flag className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="mt-4 whitespace-pre-line text-white/80">{discussion.content}</div>
                <div className="mt-6 flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className={`border-gold-500/30 hover:border-gold-400/50 hover:bg-black/50 ${isLiked ? "text-gold-300 bg-gold-500/10" : "text-white hover:text-gold-300"}`}
                    onClick={handleLike}
                  >
                    <Heart className="mr-2 h-4 w-4" fill={isLiked ? "currentColor" : "none"} />
                    Like ({discussion.likes})
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gold-500/30 text-white hover:border-gold-400/50 hover:bg-black/50 hover:text-gold-300"
                    onClick={() => document.getElementById("reply-form")?.focus()}
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Reply
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Replies */}
          <div className="mt-8">
            <h2 className="font-serif text-xl font-bold text-white mb-4">Replies ({discussion.replies.length})</h2>

            <div className="space-y-6">
              {discussion.replies.map((reply) => (
                <div key={reply.id} className="rounded-xl border border-gold-500/20 bg-black/40 p-6 backdrop-blur-md">
                  <div className="flex items-start gap-4">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-gold-500/50">
                      <Image
                        src={reply.avatar || "/placeholder.svg"}
                        alt={`${reply.author}'s avatar`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-white">{reply.author}</p>
                          <p className="text-xs text-white/50">{reply.date}</p>
                        </div>
                      </div>
                      <div className="mt-3 text-white/80">{reply.content}</div>
                      <div className="mt-4 flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`text-white/60 hover:text-gold-300 hover:bg-transparent ${reply.isLiked ? "text-gold-300" : ""}`}
                          onClick={() => handleReplyLike(reply.id)}
                        >
                          <Heart className="mr-1 h-4 w-4" fill={reply.isLiked ? "currentColor" : "none"} />
                          {reply.likes}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-white/60 hover:text-gold-300 hover:bg-transparent"
                          onClick={() => document.getElementById("reply-form")?.focus()}
                        >
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reply Form */}
          <div className="mt-8 rounded-xl border border-gold-500/20 bg-black/40 p-6 backdrop-blur-md">
            <h3 className="font-medium text-white mb-4">Add Your Reply</h3>
            <Textarea
              id="reply-form"
              placeholder="Share your thoughts..."
              className="min-h-32 border-gold-500/30 bg-black/50 text-white placeholder:text-white/40 focus:border-gold-400 focus:ring-gold-400/20"
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
            />
            <div className="mt-4 flex justify-end">
              <GlowingButton
                text={isSubmitting ? "Posting..." : "Post Reply"}
                icon={<Send className="mr-2 h-4 w-4" />}
                size="sm"
                onClick={handleSubmitReply}
                disabled={isSubmitting}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

