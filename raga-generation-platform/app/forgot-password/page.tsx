import Link from "next/link"
import { Music } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ParticleBackground } from "@/components/particle-background"
import { GlowingButton } from "@/components/glowing-button"
import { FloatingNotations } from "@/components/floating-notations"

export default function ForgotPassword() {
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

      <main className="container flex flex-col items-center justify-center py-20">
        <div className="relative w-full max-w-md">
          <FloatingNotations />

          <div className="rounded-xl border border-gold-500/20 bg-black/60 p-8 backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.7)]">
            <div className="text-center mb-8">
              <div className="inline-block rounded-full bg-gold-500/10 px-4 py-1.5 text-sm font-medium text-gold-300 backdrop-blur-sm border border-gold-500/20 shadow-[0_0_15px_rgba(255,215,0,0.2)] mb-4">
                Reset Password
              </div>
              <h1 className="font-serif text-3xl font-bold text-white">
                <span className="text-gold-400 drop-shadow-[0_0_8px_rgba(255,215,0,0.3)]">Forgot</span> Your Password?
              </h1>
              <p className="mt-2 text-sm text-white/70">Enter your email and we'll send you a reset link</p>
            </div>

            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  className="border-gold-500/30 bg-black/50 text-white placeholder:text-white/40 focus:border-gold-400 focus:ring-gold-400/20"
                />
              </div>
              <GlowingButton text="Send Reset Link" className="w-full" />
            </form>

            <div className="mt-6 text-center text-sm text-white/60">
              Remember your password?{" "}
              <Link href="/sign-in" className="text-gold-400 hover:text-gold-300 transition-colors">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

