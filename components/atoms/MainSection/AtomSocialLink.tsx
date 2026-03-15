'use client'

/**
 * @atomic  ATOM
 * @file    atoms/AtomSocialLink.tsx
 * @summary Link sosial media dengan icon Lucide, label opsional,
 *          tooltip, dan animasi hover.
 *
 * @props
 *  href        — URL tujuan
 *  icon        — komponen icon Lucide (ReactNode)
 *  label       — teks label (tampil di samping icon)
 *  tooltip     — teks tooltip saat hover (gunakan jika label disembunyikan)
 *  showLabel   — tampilkan label teks, default true
 *  variant     — 'ghost' | 'pill' | 'icon'
 *  accent      — warna hover: 'blue' | 'purple' | 'pink' | 'amber' | 'green' | 'white'
 *  size        — 'sm' | 'md' | 'lg'
 *  external    — buka di tab baru + rel="noopener noreferrer"
 *  className   — override class tambahan
 *
 * @example
 *  import { Github } from 'lucide-react'
 *  <AtomSocialLink href="https://github.com/user" icon={<Github />} label="GitHub" accent="white" />
 */

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

/* ─── Types ─────────────────────────────────────────────── */
export type SocialVariant = 'ghost' | 'pill' | 'icon'
export type SocialAccent  = 'blue' | 'purple' | 'pink' | 'amber' | 'green' | 'white'
export type SocialSize    = 'sm' | 'md' | 'lg'

export interface AtomSocialLinkProps {
  href:        string
  icon:        React.ReactNode
  label?:      string
  tooltip?:    string
  showLabel?:  boolean
  variant?:    SocialVariant
  accent?:     SocialAccent
  size?:       SocialSize
  external?:   boolean
  className?:  string
}

/* ─── Maps ───────────────────────────────────────────────── */
const accentHover: Record<SocialAccent, string> = {
  blue:   'hover:text-blue-400   hover:border-blue-500/40  hover:bg-blue-500/10',
  purple: 'hover:text-violet-400 hover:border-violet-500/40 hover:bg-violet-500/10',
  pink:   'hover:text-pink-400   hover:border-pink-500/40  hover:bg-pink-500/10',
  amber:  'hover:text-amber-400  hover:border-amber-500/40 hover:bg-amber-500/10',
  green:  'hover:text-emerald-400 hover:border-emerald-500/40 hover:bg-emerald-500/10',
  white:  'hover:text-white       hover:border-white/30     hover:bg-white/10',
}

const sizeMap: Record<SocialSize, { icon: string; text: string; gap: string; pad: string }> = {
  sm: { icon: 'size-3.5', text: 'text-xs',  gap: 'gap-1.5', pad: 'px-2 py-1'   },
  md: { icon: 'size-4',   text: 'text-sm',  gap: 'gap-2',   pad: 'px-3 py-1.5' },
  lg: { icon: 'size-5',   text: 'text-base',gap: 'gap-2.5', pad: 'px-4 py-2'   },
}

const variantBase: Record<SocialVariant, string> = {
  ghost: 'border border-transparent rounded-lg',
  pill:  'border border-white/[0.08] rounded-full bg-white/[0.04]',
  icon:  'border border-white/[0.08] rounded-xl bg-white/[0.04]',
}

/* ─── Component ─────────────────────────────────────────── */
export default function AtomSocialLink({
  href,
  icon,
  label,
  tooltip,
  showLabel  = true,
  variant    = 'pill',
  accent     = 'white',
  size       = 'md',
  external   = true,
  className,
}: AtomSocialLinkProps) {
  const s = sizeMap[size]

  const linkProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {}

  return (
    <motion.a
      href={href}
      aria-label={tooltip ?? label ?? 'Social link'}
      title={tooltip ?? label}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className={cn(
        'inline-flex items-center font-medium',
        'text-text/60 transition-all duration-200 ease-out',
        'outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60',
        variantBase[variant],
        accentHover[accent],
        /* icon-only mode: square aspect */
        variant === 'icon' ? 'justify-center aspect-square p-2' : s.pad,
        s.gap,
        s.text,
        className,
      )}
      {...linkProps}
    >
      {/* Icon wrapper — uniform sizing */}
      <span className={cn('shrink-0 flex items-center justify-center', s.icon)}>
        {icon}
      </span>

      {/* Label */}
      {showLabel && label && variant !== 'icon' && (
        <span className="leading-none">{label}</span>
      )}
    </motion.a>
  )
}