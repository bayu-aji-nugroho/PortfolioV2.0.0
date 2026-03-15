'use client'

/**
 * @atomic  ATOM
 * @file    atoms/AtomLogo.tsx
 * @summary Brand logo — monogram SVG + optional wordmark.
 *          Dipakai di OrganismSideNav header.
 *
 * @example
 *   <AtomLogo monogram="JD" wordmark="John Doe" size="md" />
 */

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import AtomAvatar from './Atomavatar'
import DATA from '@/app/src/data'

export type LogoSize = 'sm' | 'md' | 'lg'

export interface AtomLogoProps {
  monogram?:    string
  wordmark?:    string
  showWordmark?: boolean
  size?:        LogoSize
  className?:   string
  animDelay?:   number
}

const sizeMap: Record<LogoSize, { box: string; mono: string; word: string }> = {
  sm: { box: 'h-7 w-7 text-xs',   mono: 'text-xs',   word: 'text-sm'  },
  md: { box: 'h-9 w-9 text-sm',   mono: 'text-sm',   word: 'text-base'},
  lg: { box: 'h-11 w-11 text-base',mono:'text-base', word: 'text-lg'  },
}

export function AtomLogo({
  monogram     = 'JD',
  wordmark     = 'John Doe',
  showWordmark = true,
  size         = 'md',
  className,
  animDelay    = 0,
}: AtomLogoProps) {
  const s = sizeMap[size]

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: animDelay, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className={cn('flex items-center gap-2.5 select-none', className)}
    >
      <AtomAvatar glow src={DATA.image} size='md'/>

      {/* Wordmark */}
      {showWordmark && (
        <span className={cn('font-bold text-text tracking-tight leading-none', s.word)}>
          {wordmark}
        </span>
      )}
    </motion.div>
  )
}