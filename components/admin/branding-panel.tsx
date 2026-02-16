"use client"

import Image from "next/image"

export function BrandingPanel() {
  return (
    <div className="relative flex h-full flex-col overflow-hidden">
      <Image src="/admin-bg.jpg" alt="" fill className="object-cover" priority />

      <div className="absolute inset-0 bg-background/40" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />

      {/* Animated orbs */}
      <div className="absolute top-20 left-20 h-64 w-64 rounded-full bg-primary/10 blur-[100px] animate-pulse-glow" />
      <div className="absolute bottom-32 right-16 h-48 w-48 rounded-full bg-primary/15 blur-[80px] animate-pulse-glow [animation-delay:1.5s]" />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 py-12 lg:px-20 lg:py-20">
        <div className="flex flex-col items-center text-center gap-6 max-w-2xl w-full">
          <div className="h-[200px] w-[200px]">
            <Image
              src="/logo.png"
              alt="Vinony Logo"
              width={200}
              height={200}
              className="h-full w-full object-contain"
              priority
            />
          </div>

          {/* Text */}
          <div className="flex flex-col gap-4 animate-fade-in-up">
            <div className="mx-auto inline-flex items-center gap-2 w-fit rounded-full border border-primary/50 bg-primary/5 px-4 py-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow" />
              <span className="text-xs font-medium text-black dark:text-primary tracking-wide uppercase">
                All-in-One AI Workspace
              </span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-foreground text-balance">
              100+ AI Models. One Subscription.
            </h1>

            <p className="text-foreground text-base lg:text-xl leading-relaxed max-w-lg mx-auto mt-6">
              Vinony brings chat, image generation, text-to-video, and AI agents into one unified
              experience—so you can switch tools instantly without changing products, accounts, or
              billing plans.
            </p>
          </div>

          {/* Stats */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-8 animate-fade-in [animation-delay:0.5s] opacity-0">
            {[
              { value: "100+", label: "Models & Tools" },
              { value: "1", label: "Subscription" },
              { value: "90 Days", label: "Retention Policy" },
            ].map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-8">
                {i > 0 && <div className="hidden sm:block h-8 w-px bg-border/50" />}
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-foreground">{stat.value}</span>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}
