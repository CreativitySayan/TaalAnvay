import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Music, AudioWaveformIcon as Waveform, Compass, Play, Users, Info } from "lucide-react"
import Image from "next/image"
import DynamicWaveform from "@/components/dynamic-waveform"
import FeatureCard from "@/components/feature-card"
import { MobileNav } from "@/components/mobile-nav"
import { ParticleBackground } from "@/components/particle-background"
import { GlowingButton } from "@/components/glowing-button"
import { FloatingNotations } from "@/components/floating-notations"
import { RaagNodes } from "@/components/raag-nodes"

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col bg-black">
      {/* Particle Background */}
      <ParticleBackground />

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gold-500/20 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="group flex items-center gap-2">
            <Music className="h-6 w-6 text-gold-500 transition-all duration-300 group-hover:text-gold-400 group-hover:drop-shadow-[0_0_8px_rgba(255,215,0,0.8)]" />
            <span className="hidden font-serif text-xl font-medium text-white group-hover:text-gold-300 transition-colors duration-300 sm:inline-block">
              RaagAI
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            {["Raag Generator", "Raag Explorer", "Live Improvisation", "Custom Creator", "Community", "About Us"].map(
              (item, index) => (
                <Link
                  key={index}
                  href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="group relative text-sm font-medium text-white/80 transition-colors hover:text-gold-400"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-gradient-to-r from-gold-500 to-gold-300 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ),
            )}
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/sign-in">
              <GlowingButton variant="default" className="hidden md:inline-flex" text="Sign In" />
            </Link>
            <MobileNav />
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-24 md:py-32 lg:py-40">
          {/* Background patterns */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,215,0,0.15),transparent_70%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(255,215,0,0.1),transparent_60%)]"></div>
            <div className="absolute inset-0 opacity-30">
              <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Sitar string patterns */}
                <path
                  d="M0,50 Q25,30 50,50 T100,50"
                  fill="none"
                  stroke="url(#goldGradient)"
                  strokeWidth="0.1"
                  className="animate-pulse-slow"
                />
                <path
                  d="M0,60 Q35,40 70,60 T100,60"
                  fill="none"
                  stroke="url(#goldGradient)"
                  strokeWidth="0.1"
                  className="animate-pulse-slower"
                />
                <path
                  d="M0,40 Q45,60 90,40 T100,40"
                  fill="none"
                  stroke="url(#goldGradient)"
                  strokeWidth="0.1"
                  className="animate-pulse-slowest"
                />
                <defs>
                  <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(255,215,0,0.1)" />
                    <stop offset="50%" stopColor="rgba(255,215,0,0.5)" />
                    <stop offset="100%" stopColor="rgba(255,215,0,0.1)" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          <FloatingNotations />

          <div className="container relative z-10">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-block rounded-full bg-gold-500/10 px-4 py-1.5 text-sm font-medium text-gold-300 backdrop-blur-sm border border-gold-500/20 shadow-[0_0_15px_rgba(255,215,0,0.2)]">
                Fusion of Classical Tradition & AI Innovation
              </div>
              <h1 className="mt-6 font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                <span className="devanagari-inspired block bg-gradient-to-r from-gold-300 via-gold-200 to-gold-400 bg-clip-text text-transparent">
                  AI-Powered Raag Generation
                </span>
                <span className="mt-2 block text-gold-400 drop-shadow-[0_0_8px_rgba(255,215,0,0.3)]">
                  Explore, Create, and Innovate
                </span>
              </h1>
              <p className="mt-6 text-lg text-white/70">
                Experience the fusion of ancient Indian classical music traditions with cutting-edge AI technology.
                Create, explore, and innovate with raags like never before.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/raag-generator">
                  <GlowingButton
                    size="lg"
                    className="pulse-animation"
                    text="Start Generating"
                    icon={<Waveform className="mr-2 h-4 w-4" />}
                  />
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-gold-500/30 text-white hover:border-gold-400/50 hover:bg-black/50 hover:text-gold-300 transition-all duration-300"
                >
                  Explore Library
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-16 flex justify-center">
            <DynamicWaveform />
          </div>
        </section>

        {/* Features Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-radial from-black via-black/95 to-black"></div>
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=500&width=500')] bg-repeat opacity-5"></div>

          <div className="container relative z-10">
            <div className="text-center">
              <div className="inline-block rounded-full bg-gold-500/10 px-4 py-1.5 text-sm font-medium text-gold-300 backdrop-blur-sm border border-gold-500/20 mb-4">
                Powerful Features
              </div>
              <h2 className="text-center font-serif text-3xl font-bold text-white md:text-4xl mb-16">
                Discover Our <span className="text-gold-400 drop-shadow-[0_0_8px_rgba(255,215,0,0.3)]">Features</span>
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<Waveform className="h-10 w-10 text-gold-500" />}
                title="Raag Generator"
                description="Create your own raag in seconds with our AI-powered generator. Upload audio, MIDI, or text notation and customize to your preferences."
                link="/raag-generator"
              />
              <FeatureCard
                icon={<Compass className="h-10 w-10 text-gold-500" />}
                title="Raag Explorer"
                description="Discover and learn from a vast library of raags. Explore information on Thaat, Arohana & Avarohana, and more."
                link="/raag-explorer"
              />
              <FeatureCard
                icon={<Play className="h-10 w-10 text-gold-500" />}
                title="Live Improvisation"
                description="Experience AI-powered raag jamming in real time. Generate Alap, Jor-Jhala, or Taan improvisations dynamically."
                link="/live-improvisation"
              />
              <FeatureCard
                icon={<Music className="h-10 w-10 text-gold-500" />}
                title="Custom Raag Creator"
                description="Design a unique raag with AI. Define constraints, adjust mood and improvisation levels, and get AI-generated names."
                link="/custom-raag-creator"
              />
              <FeatureCard
                icon={<Users className="h-10 w-10 text-gold-500" />}
                title="Community & Feedback"
                description="Collaborate, share, and improve with our interactive community. Post your AI-generated raags and get feedback."
                link="/community"
              />
              <FeatureCard
                icon={<Info className="h-10 w-10 text-gold-500" />}
                title="About Us"
                description="Meet the minds behind the AI. Learn about our team and the story of our platform."
                link="/about-us"
              />
            </div>
          </div>
        </section>

        {/* Raag Explorer Preview */}
        <section className="py-24 bg-black/80 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,215,0,0.1),transparent_70%)]"></div>

          <div className="container relative z-10">
            <div className="text-center mb-16">
              <div className="inline-block rounded-full bg-gold-500/10 px-4 py-1.5 text-sm font-medium text-gold-300 backdrop-blur-sm border border-gold-500/20 mb-4">
                Interactive Experience
              </div>
              <h2 className="font-serif text-3xl font-bold text-white md:text-4xl">
                Explore the{" "}
                <span className="text-gold-400 drop-shadow-[0_0_8px_rgba(255,215,0,0.3)]">Raag Universe</span>
              </h2>
              <p className="mt-4 mx-auto max-w-2xl text-white/70">
                Discover hundreds of raags in our interactive constellation visualization. Each node represents a unique
                raag with its own characteristics and emotions.
              </p>
            </div>

            <div className="relative h-[500px] w-full rounded-xl border border-gold-500/20 bg-black/40 backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.5)]">
              <RaagNodes />
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-24 bg-black relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.05),transparent_70%)]"></div>

          <div className="container relative z-10">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-block rounded-full bg-gold-500/10 px-4 py-1.5 text-sm font-medium text-gold-300 backdrop-blur-sm border border-gold-500/20 mb-4">
                Testimonials
              </div>
              <h2 className="font-serif text-3xl font-bold text-white md:text-4xl">
                What Musicians Are{" "}
                <span className="text-gold-400 drop-shadow-[0_0_8px_rgba(255,215,0,0.3)]">Saying</span>
              </h2>
              <div className="mt-10 rounded-xl bg-black/40 p-8 backdrop-blur-md border border-gold-500/20 shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:border-gold-500/30 transition-all duration-500">
                <p className="text-lg italic text-white/80">
                  "RaagAI has revolutionized my approach to Indian classical music. The ability to generate and
                  experiment with raags has opened up new creative possibilities I never thought possible."
                </p>
                <div className="mt-6">
                  <div className="flex items-center justify-center gap-4">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-gold-500/50 shadow-[0_0_15px_rgba(255,215,0,0.3)]">
                      <Image
                        src="/placeholder.svg?height=100&width=100"
                        alt="Testimonial author"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-white">Anushka Sharma</p>
                      <p className="text-sm text-gold-300/60">Classical Sitarist</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-black relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(255,215,0,0.1),transparent_70%)]"></div>

          <div className="container relative z-10">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-block rounded-full bg-gold-500/10 px-4 py-1.5 text-sm font-medium text-gold-300 backdrop-blur-sm border border-gold-500/20 mb-4">
                Join Us Today
              </div>
              <h2 className="font-serif text-3xl font-bold text-white md:text-4xl">
                Ready to Start Your{" "}
                <span className="text-gold-400 drop-shadow-[0_0_8px_rgba(255,215,0,0.3)]">Raag Journey?</span>
              </h2>
              <p className="mt-6 text-lg text-white/70">
                Join thousands of musicians exploring the intersection of AI and Indian classical music.
              </p>
              <div className="mt-10">
                <GlowingButton size="lg" text="Get Started for Free" className="pulse-animation" />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gold-500/20 bg-black py-12 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(255,215,0,0.05),transparent_70%)]"></div>

        <div className="container relative z-10">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <Music className="h-6 w-6 text-gold-500" />
                <span className="font-serif text-xl font-medium text-white">RaagAI</span>
              </div>
              <p className="mt-4 text-sm text-white/60">
                Blending Indian classical music traditions with cutting-edge AI technology.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gold-400">Features</h3>
              <ul className="mt-4 space-y-2">
                {["Raag Generator", "Raag Explorer", "Live Improvisation", "Custom Creator"].map((item, index) => (
                  <li key={index}>
                    <Link
                      href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                      className="group text-sm text-white/60 transition-colors hover:text-gold-300"
                    >
                      <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>{" "}
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gold-400">Company</h3>
              <ul className="mt-4 space-y-2">
                {["About Us", "Community", "Blog", "Contact"].map((item, index) => (
                  <li key={index}>
                    <Link
                      href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                      className="group text-sm text-white/60 transition-colors hover:text-gold-300"
                    >
                      <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>{" "}
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gold-400">Legal</h3>
              <ul className="mt-4 space-y-2">
                {["Terms of Service", "Privacy Policy", "Cookie Policy"].map((item, index) => (
                  <li key={index}>
                    <Link
                      href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                      className="group text-sm text-white/60 transition-colors hover:text-gold-300"
                    >
                      <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>{" "}
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-gold-500/20 pt-6 text-center">
            <p className="text-sm text-white/60">© {new Date().getFullYear()} RaagAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

