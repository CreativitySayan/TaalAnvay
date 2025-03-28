"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Music } from "lucide-react"
import Link from "next/link"
import { GlowingButton } from "./glowing-button"

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-white hover:bg-gold-500/10 hover:text-gold-300 transition-all duration-300"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="border-gold-500/20 bg-gradient-to-b from-black to-black/95 backdrop-blur-xl"
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-2 mb-8">
            <Music className="h-6 w-6 text-gold-500" />
            <span className="font-serif text-xl font-medium text-white">RagaAI</span>
          </div>
          <nav className="flex flex-col gap-6">
            {["Raga Generator", "Raga Explorer", "Live Improvisation", "Custom Creator", "Community", "About Us"].map(
              (item, index) => (
                <Link
                  key={index}
                  href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="group flex items-center text-sm font-medium text-white/80 transition-colors hover:text-gold-400"
                  onClick={() => setOpen(false)}
                >
                  <span className="mr-2 inline-block h-1 w-1 rounded-full bg-gold-500/50 transition-all duration-300 group-hover:h-1.5 group-hover:w-1.5 group-hover:bg-gold-400"></span>
                  {item}
                </Link>
              ),
            )}
          </nav>
          <div className="mt-auto pt-8">
            <Link href="/sign-in" onClick={() => setOpen(false)}>
              <GlowingButton className="w-full" text="Sign In" />
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

