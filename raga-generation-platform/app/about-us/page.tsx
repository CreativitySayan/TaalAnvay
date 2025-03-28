import Link from "next/link"
import { Music } from "lucide-react"
import { ParticleBackground } from "@/components/particle-background"
import Image from "next/image"

export default function AboutUs() {
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
          <div className="text-center mb-16">
            <div className="inline-block rounded-full bg-gold-500/10 px-4 py-1.5 text-sm font-medium text-gold-300 backdrop-blur-sm border border-gold-500/20 shadow-[0_0_15px_rgba(255,215,0,0.2)]">
              About Us
            </div>
            <h1 className="mt-6 font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              <span className="devanagari-inspired block bg-gradient-to-r from-gold-300 via-gold-200 to-gold-400 bg-clip-text text-transparent">
                Meet the Minds
              </span>
              <span className="mt-2 block text-gold-400 drop-shadow-[0_0_8px_rgba(255,215,0,0.3)]">Behind the AI</span>
            </h1>
            <p className="mt-6 text-lg text-white/70">
              We're a team of musicians, developers, and AI researchers passionate about preserving and evolving Indian
              classical music.
            </p>
          </div>

          <div className="grid gap-16">
            <section>
              <h2 className="text-2xl font-serif font-bold text-white mb-8">Our Story</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-white/70">
                  RaagAI began as a collaboration between classical musicians and AI researchers who shared a vision: to
                  create a platform that would help preserve and evolve the rich tradition of Indian classical music
                  through the power of artificial intelligence.
                </p>
                <p className="text-white/70">
                  Our journey started with extensive research into both the mathematical patterns underlying ragas and
                  the latest developments in AI and machine learning. We worked closely with veteran musicians to ensure
                  that our AI models would respect the fundamental principles of Indian classical music while enabling
                  new forms of creative expression.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-white mb-8">Our Team</h2>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div className="group relative overflow-hidden rounded-xl border border-gold-500/20 bg-black/40 p-6 backdrop-blur-md hover:border-gold-500/40 transition-all duration-300">
                  <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gold-500/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"></div>
                  <div className="relative z-10">
                    <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full border-2 border-gold-500/50">
                      <Image src="/placeholder.svg?height=200&width=200" alt="Sayan" fill className="object-cover" />
                    </div>
                    <div className="mt-4 text-center">
                      <h3 className="font-medium text-white">Sayan</h3>
                      <p className="text-sm text-gold-400">Developer</p>
                    </div>
                  </div>
                </div>
                <div className="group relative overflow-hidden rounded-xl border border-gold-500/20 bg-black/40 p-6 backdrop-blur-md hover:border-gold-500/40 transition-all duration-300">
                  <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gold-500/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"></div>
                  <div className="relative z-10">
                    <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full border-2 border-gold-500/50">
                      <Image src="/placeholder.svg?height=200&width=200" alt="Nandini" fill className="object-cover" />
                    </div>
                    <div className="mt-4 text-center">
                      <h3 className="font-medium text-white">Nandini</h3>
                      <p className="text-sm text-gold-400">AI Engineer</p>
                    </div>
                  </div>
                </div>
                <div className="group relative overflow-hidden rounded-xl border border-gold-500/20 bg-black/40 p-6 backdrop-blur-md hover:border-gold-500/40 transition-all duration-300">
                  <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gold-500/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"></div>
                  <div className="relative z-10">
                    <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full border-2 border-gold-500/50">
                      <Image src="/placeholder.svg?height=200&width=200" alt="Ridhi" fill className="object-cover" />
                    </div>
                    <div className="mt-4 text-center">
                      <h3 className="font-medium text-white">Ridhi</h3>
                      <p className="text-sm text-gold-400">Data Analyst</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}

