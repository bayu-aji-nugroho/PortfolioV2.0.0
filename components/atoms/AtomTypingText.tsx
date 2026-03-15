'use client'

/**
 * @atomic  ATOM
 * @file    atoms/AtomTypingText.tsx
 * @summary Typewriter effect cycling through array of strings.
 */

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface AtomTypingTextProps {
  texts:          string[]
  typingSpeed?:   number
  deletingSpeed?: number
  pauseDuration?: number
  className?:     string
  startDelay?:    number
  showCursor?:    boolean
}

export default function AtomTypingText({
  texts, typingSpeed = 65, deletingSpeed = 35,
  pauseDuration = 2200, className, startDelay = 0, showCursor = true,
}: AtomTypingTextProps) {
  const [display,   setDisplay]   = useState('')
  const [textIdx,   setTextIdx]   = useState(0)
  const [charIdx,   setCharIdx]   = useState(0)
  const [phase,     setPhase]     = useState<'idle'|'typing'|'deleting'>('idle')

  useEffect(() => {
    const t = setTimeout(() => setPhase('typing'), startDelay)
    return () => clearTimeout(t)
  }, [startDelay])

  useEffect(() => {
    const cur = texts[textIdx] ?? ''
    if (phase === 'typing') {
      if (charIdx < cur.length) {
        const t = setTimeout(() => { setDisplay(cur.slice(0, charIdx + 1)); setCharIdx(i => i + 1) }, typingSpeed)
        return () => clearTimeout(t)
      }
      const t = setTimeout(() => setPhase('deleting'), pauseDuration)
      return () => clearTimeout(t)
    }
    if (phase === 'deleting') {
      if (charIdx > 0) {
        const t = setTimeout(() => { setDisplay(cur.slice(0, charIdx - 1)); setCharIdx(i => i - 1) }, deletingSpeed)
        return () => clearTimeout(t)
      }
      setTextIdx(i => (i + 1) % texts.length)
      setPhase('typing')
    }
  }, [phase, charIdx, textIdx, texts, typingSpeed, deletingSpeed, pauseDuration])

  return (
    <span className={cn('inline-flex items-center gap-1.5', className)}>
      <span>{display}</span>
      {showCursor && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
          className="inline-block w-[2px] h-[1em] bg-blue-400 rounded-full align-middle"
          aria-hidden
        />
      )}
    </span>
  )
}