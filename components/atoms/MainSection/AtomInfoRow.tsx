'use client'

/**
 * @atomic  ATOM
 * @file    atoms/AtomInfoRow.tsx
 * @summary Baris informasi dengan icon Lucide di kiri dan teks di kanan.
 *          Digunakan untuk menampilkan lokasi, pendidikan, tahun, dsb.
 *
 * @props
 *  icon        — komponen icon Lucide (ReactNode, required)
 *  label       — teks utama (required)
 *  sublabel    — teks sekunder (lebih kecil, di bawah atau kanan label)
 *  subPosition — posisi sublabel: 'right' | 'below'
 *  iconColor   — warna icon: 'blue' | 'purple' | 'green' | 'amber' | 'pink' | 'slate'
 *  size        — 'sm' | 'md' | 'lg'
 *  className   — override class tambahan
 *
 * @example
 *  import { MapPin } from 'lucide-react'
 *  <AtomInfoRow icon={<MapPin />} label="Surakarta, Jawa Tengah" iconColor="blue" />
 *
 *  import { GraduationCap } from 'lucide-react'
 *  <AtomInfoRow
 *    icon={<GraduationCap />}
 *    label="Universitas Sebelas Maret"
 *    sublabel="2021 – Sekarang"
 *    subPosition="right"
 *    iconColor="purple"
 *  />
 */

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

/* ─── Types ─────────────────────────────────────────────── */
export type InfoIconColor  = 'blue' | 'purple' | 'green' | 'amber' | 'pink' | 'slate'
export type InfoSize       = 'sm' | 'md' | 'lg'
export type SubPosition    = 'right' | 'below'

export interface AtomInfoRowProps {
  icon:          React.ReactNode
  label:         string
  sublabel?:     string
  subPosition?:  SubPosition
  iconColor?:    InfoIconColor
  size?:         InfoSize
  className?:    string
}

/* ─── Maps ───────────────────────────────────────────────── */
const iconColorMap: Record<InfoIconColor, { icon: string; bg: string }> = {
  blue:   { icon: 'text-blue-400',    bg: 'bg-blue-500/10'    },
  purple: { icon: 'text-violet-400',  bg: 'bg-violet-500/10'  },
  green:  { icon: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  amber:  { icon: 'text-amber-400',   bg: 'bg-amber-500/10'   },
  pink:   { icon: 'text-pink-400',    bg: 'bg-pink-500/10'    },
  slate:  { icon: 'text-slate-400',   bg: 'bg-slate-500/10'   },
}

const sizeMap: Record<InfoSize, { wrap: string; iconBox: string; iconEl: string; label: string; sub: string; gap: string }> = {
  sm: { wrap: 'gap-2',   iconBox: 'size-6  rounded-md p-1',   iconEl: 'size-3',   label: 'text-xs  font-medium', sub: 'text-[10px]', gap: 'gap-1.5' },
  md: { wrap: 'gap-2.5', iconBox: 'size-8  rounded-lg p-1.5', iconEl: 'size-3.5', label: 'text-sm  font-medium', sub: 'text-xs',     gap: 'gap-2'   },
  lg: { wrap: 'gap-3',   iconBox: 'size-10 rounded-xl p-2',   iconEl: 'size-4',   label: 'text-base font-medium', sub: 'text-sm',    gap: 'gap-2.5' },
}

/* ─── Component ─────────────────────────────────────────── */
export default function AtomInfoRow({
  icon,
  label,
  sublabel,
  subPosition = 'right',
  iconColor   = 'slate',
  size        = 'md',
  className,
}: AtomInfoRowProps) {
  const s  = sizeMap[size]
  const ic = iconColorMap[iconColor]

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className={cn('flex items-center', s.wrap, className)}
    >
      {/* Icon box */}
      <span
        className={cn(
          'shrink-0 flex items-center justify-center',
          ic.bg,
          ic.icon,
          s.iconBox,
        )}
        aria-hidden
      >
        <span className={cn('flex items-center', s.iconEl)}>
          {icon}
        </span>
      </span>

      {/* Text area */}
      <div
        className={cn(
          'flex min-w-0',
          subPosition === 'right' ? 'flex-row items-baseline' : 'flex-col',
          subPosition === 'right' ? s.gap : 'gap-0.5',
        )}
      >
        {/* Main label */}
        <span className={cn('text-text leading-tight truncate', s.label)}>
          {label}
        </span>

        {/* Sub label */}
        {sublabel && (
          <span className={cn('text-text/50 leading-tight shrink-0', s.sub)}>
            {subPosition === 'right' && '·'} {sublabel}
          </span>
        )}
      </div>
    </motion.div>
  )
}