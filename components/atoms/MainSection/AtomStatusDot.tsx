'use client'

/**
 * @file AtomStatusDot.tsx
 * @layer Atom
 * @description Indikator status aktif/selesai berupa dot berwarna.
 *              Dot "active" menampilkan animasi pulse (ring memudar),
 *              sedangkan dot "ended" ditampilkan statis dengan warna redup.
 *
 * @usage
 *   <AtomStatusDot active />                    → dot hijau pulse tanpa label
 *   <AtomStatusDot active label="Now" />        → dot hijau pulse + label "Now"
 *   <AtomStatusDot label="2024" />              → dot abu statis + label "2024"
 *   <AtomStatusDot active size="md" />          → ukuran medium
 */

import { motion } from 'framer-motion'
import { cn }     from '@/lib/utils'

/* ══════════════════════════════════════════════════════════
   Types
══════════════════════════════════════════════════════════ */

type Size = 'xs' | 'sm' | 'md'

interface AtomStatusDotProps {
  /** Jika true → hijau + animasi pulse. Default: false (abu statis) */
  active?    : boolean
  /** Ukuran dot. Default: 'sm' */
  size?      : Size
  /** Label teks opsional di samping dot */
  label?     : string
  /** Class tambahan untuk wrapper */
  className? : string
}

/* ══════════════════════════════════════════════════════════
   Konstanta
══════════════════════════════════════════════════════════ */

const DOT_SIZE: Record<Size, string> = {
  xs : 'size-1.5',
  sm : 'size-2',
  md : 'size-2.5',
}

const RING_SIZE: Record<Size, string> = {
  xs : 'size-3',
  sm : 'size-4',
  md : 'size-5',
}

const LABEL_SIZE: Record<Size, string> = {
  xs : 'text-[9px]',
  sm : 'text-[10px]',
  md : 'text-xs',
}

/* ══════════════════════════════════════════════════════════
   Component
══════════════════════════════════════════════════════════ */

export default function AtomStatusDot({
  active    = false,
  size      = 'sm',
  label,
  className,
}: AtomStatusDotProps) {
  return (
    <span className={cn('inline-flex items-center gap-1.5', className)}>

      {/* ── Dot wrapper (relative untuk posisi ring) ── */}
      <span className="relative inline-flex items-center justify-center">

        {/* Pulse ring — hanya muncul saat active */}
        {active && (
          <motion.span
            aria-hidden
            className={cn(
              'absolute rounded-full',
              RING_SIZE[size],
              'bg-emerald-400/30',
            )}
            animate={{
              scale   : [0.8, 1.8, 0.8],
              opacity : [0.6, 0,   0.6],
            }}
            transition={{
              duration : 2,
              repeat   : Infinity,
              ease     : 'easeInOut',
            }}
          />
        )}

        {/* Core dot */}
        <span
          className={cn(
            'relative rounded-full transition-colors duration-300',
            DOT_SIZE[size],
            active ? 'bg-emerald-400' : 'bg-text/20',
          )}
        />
      </span>

      {/* Label opsional */}
      {label && (
        <span
          className={cn(
            'font-semibold tracking-wider uppercase',
            LABEL_SIZE[size],
            active ? 'text-emerald-400' : 'text-text/30',
          )}
        >
          {label}
        </span>
      )}
    </span>
  )
}