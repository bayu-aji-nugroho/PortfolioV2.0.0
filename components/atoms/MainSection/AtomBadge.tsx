'use client'

/**
 * @atomic  ATOM
 * @file    atoms/AtomBadge.tsx
 * @summary Chip / badge kecil untuk menampilkan teknologi, bahasa,
 *          atau tag kategori. Mendukung icon opsional dan dot indicator.
 *
 * @props
 *  label     — teks badge (required)
 *  icon      — icon di kiri label (ReactNode, opsional)
 *  dot       — tampilkan dot warna di kiri
 *  variant   — 'solid' | 'outline' | 'ghost' | 'glow'
 *  color     — palet warna badge
 *  size      — 'xs' | 'sm' | 'md'
 *  className — override class tambahan
 *
 * @example
 *  <AtomBadge label="TypeScript" color="blue" variant="glow" />
 *  <AtomBadge label="Indonesia" dot color="green" size="xs" />
 */

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

/* ─── Types ─────────────────────────────────────────────── */
export type BadgeVariant = 'solid' | 'outline' | 'ghost' | 'glow'
export type BadgeColor   = 'blue' | 'purple' | 'green' | 'pink' | 'amber' | 'slate' | 'white' | 'red' | 'cyan'
export type BadgeSize    = 'xs' | 'sm' | 'md'

export interface AtomBadgeProps {
  label:      string
  icon?:      React.ReactNode
  dot?:       boolean
  variant?:   BadgeVariant
  color?:     BadgeColor
  size?:      BadgeSize
  className?: string
}

/* ─── Color palette ──────────────────────────────────────── */
type ColorTokens = { text: string; bg: string; border: string; dot: string; glow: string }

const colorMap: Record<BadgeColor, ColorTokens> = {
  blue:   { text: 'text-blue-300',    bg: 'bg-blue-500/15',    border: 'border-blue-500/30',    dot: 'bg-blue-400',    glow: 'shadow-blue-500/20'   },
  purple: { text: 'text-violet-300',  bg: 'bg-violet-500/15',  border: 'border-violet-500/30',  dot: 'bg-violet-400',  glow: 'shadow-violet-500/20' },
  green:  { text: 'text-emerald-300', bg: 'bg-emerald-500/15', border: 'border-emerald-500/30', dot: 'bg-emerald-400', glow: 'shadow-emerald-500/20' },
  pink:   { text: 'text-pink-300',    bg: 'bg-pink-500/15',    border: 'border-pink-500/30',    dot: 'bg-pink-400',    glow: 'shadow-pink-500/20'   },
  amber:  { text: 'text-amber-300',   bg: 'bg-amber-500/15',   border: 'border-amber-500/30',   dot: 'bg-amber-400',   glow: 'shadow-amber-500/20'  },
  slate:  { text: 'text-slate-300',   bg: 'bg-slate-500/15',   border: 'border-slate-500/30',   dot: 'bg-slate-400',   glow: 'shadow-slate-500/20'  },
  white:  { text: 'text-white/80',    bg: 'bg-white/8',        border: 'border-white/20',       dot: 'bg-white/70',    glow: 'shadow-white/10'      },
  red:    { text: 'text-red-300',     bg: 'bg-red-500/15',     border: 'border-red-500/30',     dot: 'bg-red-400',     glow: 'shadow-red-500/20'    },
  cyan:   { text: 'text-cyan-300',    bg: 'bg-cyan-500/15',    border: 'border-cyan-500/30',    dot: 'bg-cyan-400',    glow: 'shadow-cyan-500/20'   },
}

const sizeMap: Record<BadgeSize, { wrap: string; text: string; icon: string; dot: string }> = {
  xs: { wrap: 'px-1.5 py-0.5 gap-1 rounded',   text: 'text-[10px]', icon: 'size-2.5', dot: 'size-1.5' },
  sm: { wrap: 'px-2   py-0.5 gap-1.5 rounded-md', text: 'text-xs',   icon: 'size-3',   dot: 'size-1.5' },
  md: { wrap: 'px-2.5 py-1   gap-1.5 rounded-md', text: 'text-sm',   icon: 'size-3.5', dot: 'size-2'   },
}

/* ─── Component ─────────────────────────────────────────── */
export default function AtomBadge({
  label,
  icon,
  dot       = false,
  variant   = 'outline',
  color     = 'slate',
  size      = 'sm',
  className,
}: AtomBadgeProps) {
  const c = colorMap[color]
  const s = sizeMap[size]

  const variantClass: Record<BadgeVariant, string> = {
    solid:   cn(c.bg,   'border border-transparent'),
    outline: cn('bg-transparent', 'border', c.border),
    ghost:   'bg-transparent border border-transparent',
    glow:    cn(c.bg, 'border', c.border, 'shadow-md', c.glow),
  }

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      className={cn(
        'inline-flex items-center font-medium leading-none select-none',
        c.text,
        variantClass[variant],
        s.wrap,
        s.text,
        className,
      )}
    >
      {/* Dot */}
      {dot && <span className={cn('shrink-0 rounded-full', c.dot, s.dot)} aria-hidden />}

      {/* Icon */}
      {icon && <span className={cn('shrink-0 flex items-center', s.icon)}>{icon}</span>}

      {/* Label */}
      <span>{label}</span>
    </motion.span>
  )
}