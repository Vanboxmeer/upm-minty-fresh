import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-semibold",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-primary/10 hover:text-primary",
        link: "text-primary underline-offset-4 hover:underline",
        hero: "bg-gradient-to-r from-primary to-primary-glow text-primary-foreground hover:shadow-lg hover:scale-105 transition-all duration-300",
        cta: "bg-primary text-primary-foreground hover:bg-primary-dark shadow-lg hover:shadow-xl transition-all duration-300",
        retro: "relative overflow-hidden bg-gradient-to-r from-primary/20 to-primary-glow/20 border-2 border-primary text-primary hover:bg-gradient-to-r hover:from-primary/30 hover:to-primary-glow/30 hover:border-primary-electric hover:scale-105 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 retro-glow font-semibold",
        synthwave: "relative overflow-hidden bg-gradient-to-r from-primary/20 to-primary-electric/20 border-2 border-primary text-primary hover:bg-gradient-to-r hover:from-primary/30 hover:to-primary-electric/30 hover:border-primary-electric hover:scale-105 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 retro-glow font-semibold",
        light: "border-2 border-primary/40 bg-card text-primary hover:bg-primary/10 hover:border-primary transition-all duration-300 shadow-md",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
