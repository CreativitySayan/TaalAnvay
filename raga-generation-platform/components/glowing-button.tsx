import { Button } from "@/components/ui/button"
import type { ButtonProps } from "@/components/ui/button"
import type { ReactNode } from "react"

interface GlowingButtonProps extends ButtonProps {
  text: string
  icon?: ReactNode
}

export function GlowingButton({ text, icon, className, ...props }: GlowingButtonProps) {
  return (
    <Button
      {...props}
      className={`group relative overflow-hidden bg-gradient-to-r from-gold-600 to-gold-500 text-black hover:from-gold-500 hover:to-gold-400 transition-all duration-300 ${className}`}
    >
      <span className="relative z-10 flex items-center">
        {icon}
        {text}
      </span>
      <span className="absolute inset-0 z-0 bg-gradient-to-r from-gold-400 to-gold-300 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-70"></span>
      <span className="absolute -inset-x-1 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-300 to-transparent opacity-70"></span>
      <span className="absolute -inset-y-1 right-0 w-px bg-gradient-to-b from-transparent via-gold-300 to-transparent opacity-70"></span>
      <span className="absolute -inset-x-1 top-0 h-px bg-gradient-to-r from-transparent via-gold-300 to-transparent opacity-70"></span>
      <span className="absolute -inset-y-1 left-0 w-px bg-gradient-to-b from-transparent via-gold-300 to-transparent opacity-70"></span>
    </Button>
  )
}

