import Link from "next/link"
import type { ReactNode } from "react"
import { ArrowRight } from "lucide-react"

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
  link: string
}

export default function FeatureCard({ icon, title, description, link }: FeatureCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-black/40 p-6 backdrop-blur-md transition-all duration-500 hover:bg-black/60 hover:shadow-[0_0_30px_rgba(0,0,0,0.7)] border border-gold-500/20 hover:border-gold-500/40">
      <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gold-500/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gold-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

      <div className="relative z-10">
        <div className="mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:text-gold-400 group-hover:drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]">
          {icon}
        </div>
        <h3 className="mb-2 font-serif text-xl font-bold text-white group-hover:text-gold-300 transition-colors duration-300">
          {title}
        </h3>
        <p className="mb-4 text-sm text-white/70 group-hover:text-white/80 transition-colors duration-300">
          {description}
        </p>
        <Link
          href={link}
          className="inline-flex items-center text-sm font-medium text-gold-400 transition-all duration-300 hover:text-gold-300 group-hover:translate-x-1"
        >
          Learn more <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  )
}

