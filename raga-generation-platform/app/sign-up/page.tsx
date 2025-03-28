import Link from "next/link"
import { Music, Github, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { ParticleBackground } from "@/components/particle-background"
import { GlowingButton } from "@/components/glowing-button"
import { FloatingNotations } from "@/components/floating-notations"

export default function SignUp() {
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
                Join Our Community
              </div>
              <h1 className="font-serif text-3xl font-bold text-white">
                <span className="text-gold-400 drop-shadow-[0_0_8px_rgba(255,215,0,0.3)]">Create</span> an Account
              </h1>
              <p className="mt-2 text-sm text-white/70">Begin your journey in AI-powered raag generation</p>
            </div>

            <div className="grid gap-6">
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="border-gold-500/30 text-white hover:border-gold-400/50 hover:bg-black/50 hover:text-gold-300 transition-all duration-300"
                >
                  <Github className="mr-2 h-4 w-4" />
                  Github
                </Button>
                <Button
                  variant="outline"
                  className="border-gold-500/30 text-white hover:border-gold-400/50 hover:bg-black/50 hover:text-gold-300 transition-all duration-300"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Google
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full border-gold-500/20" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-black px-2 text-white/60">Or continue with</span>
                </div>
              </div>

              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name" className="text-white">
                      First Name
                    </Label>
                    <Input
                      id="first-name"
                      className="border-gold-500/30 bg-black/50 text-white placeholder:text-white/40 focus:border-gold-400 focus:ring-gold-400/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name" className="text-white">
                      Last Name
                    </Label>
                    <Input
                      id="last-name"
                      className="border-gold-500/30 bg-black/50 text-white placeholder:text-white/40 focus:border-gold-400 focus:ring-gold-400/20"
                    />
                  </div>
                </div>
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
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    className="border-gold-500/30 bg-black/50 text-white placeholder:text-white/40 focus:border-gold-400 focus:ring-gold-400/20"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    className="border-gold-500/50 data-[state=checked]:bg-gold-500 data-[state=checked]:text-black"
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm text-white/70 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the{" "}
                    <Link href="/terms-of-service" className="text-gold-400 hover:text-gold-300 transition-colors">
                      terms of service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy-policy" className="text-gold-400 hover:text-gold-300 transition-colors">
                      privacy policy
                    </Link>
                  </label>
                </div>
                <GlowingButton text="Create Account" className="w-full" />
              </form>

              <div className="text-center text-sm text-white/60">
                Already have an account?{" "}
                <Link href="/sign-in" className="text-gold-400 hover:text-gold-300 transition-colors">
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

