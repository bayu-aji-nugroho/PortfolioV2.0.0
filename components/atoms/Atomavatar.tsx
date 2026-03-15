'use client'

/**
 * @atomic  ATOM
 * @file    atoms/AtomAvatar.tsx
 * @summary Foto profil berbentuk lingkaran dengan ring glow animasi,
 *          status dot opsional, dan fallback initials.
 *
 * @props
 *  src         — URL gambar
 *  alt         — alt text aksesibilitas
 *  initials    — fallback teks jika src kosong (maks 2 karakter)
 *  size        — ukuran avatar: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
 *  ring        — tampilkan ring border di luar foto
 *  ringAccent  — warna ring: 'blue' | 'purple' | 'green' | 'pink' | 'amber' | 'white'
 *  glow        — tampilkan glow box-shadow di belakang avatar
 *  pulse       — animasi pulse pada ring (mode online indicator)
 *  status      — titik status: 'online' | 'away' | 'busy' | 'offline' | 'none'
 *  className   — override class tambahan
 *
 * @example
 *  <AtomAvatar
 *    src="/photo.jpg"
 *    alt="John Doe"
 *    size="xl"
 *    ring
 *    ringAccent="blue"
 *    glow
 *    status="online"
 *  />
 */

import Image from 'next/image'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

/* ─── Types ─────────────────────────────────────────────── */
export type AvatarSize    = 'sm' | 'md' | 'lg' | 'xl' | '2xl'
export type AvatarAccent  = 'blue' | 'purple' | 'green' | 'pink' | 'amber' | 'white'
export type AvatarStatus  = 'online' | 'away' | 'busy' | 'offline' | 'none'

export interface AtomAvatarProps {
  src?:        string
  alt?:        string
  initials?:   string
  size?:       AvatarSize
  ring?:       boolean
  ringAccent?: AvatarAccent
  glow?:       boolean
  pulse?:      boolean
  status?:     AvatarStatus
  className?:  string
}

/* ─── Maps ───────────────────────────────────────────────── */
const sizeMap: Record<AvatarSize, { wrap: string; px: number }> = {
  'sm':  { wrap: 'size-10',    px: 40  },
  'md':  { wrap: 'size-16',    px: 64  },
  'lg':  { wrap: 'size-24',    px: 96  },
  'xl':  { wrap: 'size-36',    px: 144 },
  '2xl': { wrap: 'size-48',    px: 192 },
}

const ringColorMap: Record<AvatarAccent, string> = {
  blue:   'ring-blue-500/60',
  purple: 'ring-violet-500/60',
  green:  'ring-emerald-500/60',
  pink:   'ring-pink-500/60',
  amber:  'ring-amber-500/60',
  white:  'ring-white/30',
}

const glowColorMap: Record<AvatarAccent, string> = {
  blue:   '0 0 40px 8px rgba(59,130,246,0.25)',
  purple: '0 0 40px 8px rgba(139,92,246,0.25)',
  green:  '0 0 40px 8px rgba(16,185,129,0.25)',
  pink:   '0 0 40px 8px rgba(236,72,153,0.25)',
  amber:  '0 0 40px 8px rgba(245,158,11,0.25)',
  white:  '0 0 40px 8px rgba(255,255,255,0.10)',
}

const statusColorMap: Record<AvatarStatus, string> = {
  online:  'bg-emerald-400',
  away:    'bg-amber-400',
  busy:    'bg-red-500',
  offline: 'bg-slate-500',
  none:    'hidden',
}

/* ─── Status dot position by size ───────────────────────── */
const statusPosMap: Record<AvatarSize, string> = {
  'sm':  'size-2.5 bottom-0 right-0',
  'md':  'size-3   bottom-0.5 right-0.5',
  'lg':  'size-3.5 bottom-1 right-1',
  'xl':  'size-4   bottom-1 right-1',
  '2xl': 'size-5   bottom-1.5 right-1.5',
}

/* ─── Component ─────────────────────────────────────────── */
export default function AtomAvatar({
  src,
  alt         = 'Avatar',
  initials    = '??',
  size        = 'lg',
  ring        = false,
  ringAccent  = 'blue',
  glow        = false,
  pulse       = false,
  status      = 'none',
  className,
}: AtomAvatarProps) {
  const { wrap, px } = sizeMap[size]

  return (
    <motion.div
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ scale: 1,    opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      className={cn('relative shrink-0 inline-block', className)}
    >
      {/* ── Pulse ring (animated) ── */}
      {pulse && ring && (
        <motion.span
          className={cn(
            'absolute inset-0 rounded-full',
            ringColorMap[ringAccent].replace('ring-', 'bg-').replace('/60', '/20'),
          )}
          animate={{ scale: [1, 1.18, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden
        />
      )}

      {/* ── Avatar wrapper ── */}
      <div
        className={cn(
          wrap,
          'relative rounded-full overflow-hidden',
          ring && ['ring-2 ring-offset-2 ring-offset-[var(--color-tema)]', ringColorMap[ringAccent]],
        )}
        style={glow ? { boxShadow: glowColorMap[ringAccent] } : undefined}
      >
        {src ? (
          <Image
            src={src}
            alt={alt}
            width={px}
            height={px}
            className="object-cover w-full h-full"
            priority
          />
        ) : (
          /* Fallback initials */
          <div className="flex items-center justify-center w-full h-full bg-card text-text font-semibold text-lg select-none">
            {initials.slice(0, 2).toUpperCase()}
          </div>
        )}
      </div>

      {/* ── Status dot ── */}
      {status !== 'none' && (
        <span
          className={cn(
            'absolute rounded-full ring-2 ring-[var(--color-tema)]',
            statusColorMap[status],
            statusPosMap[size],
          )}
          aria-label={status}
        />
      )}
    </motion.div>
  )
}