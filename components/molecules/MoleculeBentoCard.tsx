'use client'

/**
 * @atomic  MOLECULE
 * @file    molecules/MoleculeBentoCard.tsx
 * @summary Reusable card wrapper untuk bento grid layout.
 *          Mendukung glow accent, hover lift, dan multiple size variants.
 *          Children bebas diisi konten apapun.
 *
 * @example
 *   <MoleculeBentoCard accent="blue" hover animDelay={0.2} className="col-span-2 row-span-2">
 *     <p>Content</p>
 *   </MoleculeBentoCard>
 */

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export type CardAccent = 'none' | 'blue' | 'purple' | 'green' | 'pink' | 'amber'

export interface MoleculeBentoCardProps {
  children:    React.ReactNode
  accent?:     CardAccent
  hover?:      boolean
  animDelay?:  number
  className?:  string
  innerClass?: string
  /** Tampilkan noise texture overlay */
  noise?:      boolean
  /** Tampilkan gradient mesh di background */
  mesh?:       boolean
}

const accentGlow: Record<CardAccent, string> = {
  none:   '',
  blue:   'after:bg-blue-500/8',
  purple: 'after:bg-violet-500/8',
  green:  'after:bg-emerald-500/8',
  pink:   'after:bg-pink-500/8',
  amber:  'after:bg-amber-500/8',
}

const accentBorder: Record<CardAccent, string> = {
  none:   'border-white/[0.06]',
  blue:   'border-blue-500/20',
  purple: 'border-violet-500/20',
  green:  'border-emerald-500/20',
  pink:   'border-pink-500/20',
  amber:  'border-amber-500/20',
}

export function MoleculeBentoCard({
  children, accent = 'none', hover = false,
  animDelay = 0, className, innerClass, noise = false, mesh = false,
}: MoleculeBentoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ delay: animDelay, duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
      whileHover={hover ? { y: -3, transition: { duration: 0.25 } } : undefined}
      className={cn(
        'relative rounded-2xl border overflow-hidden',
        'bg-card/60 backdrop-blur-sm',
        accentBorder[accent],
        // Glow pseudoelement — using after via Tailwind arbitrary
        accent !== 'none' && [
          'after:absolute after:inset-0 after:rounded-2xl after:pointer-events-none',
          accentGlow[accent],
        ],
        className,
      )}
    >
      {/* Noise texture */}
      {noise && (
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none z-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '180px 180px',
          }}
          aria-hidden
        />
      )}

      {/* Mesh gradient */}
      {mesh && (
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: `radial-gradient(ellipse 60% 50% at 20% 20%, rgba(79,156,255,0.06) 0%, transparent 60%),
                         radial-gradient(ellipse 50% 40% at 80% 80%, rgba(139,92,246,0.05) 0%, transparent 60%)`,
          }}
          aria-hidden
        />
      )}

      <div className={cn('relative z-10 h-full', innerClass)}>
        {children}
      </div>
    </motion.div>
  )
}