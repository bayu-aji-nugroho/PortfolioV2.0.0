'use client'

/**
 * @atomic  ATOM
 * @file    atoms/AtomButton.tsx
 * @summary CTA Button dengan magnetic hover + multiple variants.
 *
 * @example
 *   <AtomButton variant="primary" size="lg" icon={<ArrowRight />}>View Work</AtomButton>
 */

import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline'
export type ButtonSize    = 'sm' | 'md' | 'lg'

export interface AtomButtonProps {
  children:      React.ReactNode
  variant?:      ButtonVariant
  size?:         ButtonSize
  icon?:         React.ReactNode
  iconPosition?: 'left' | 'right'
  href?:         string
  onClick?:      () => void
  disabled?:     boolean
  className?:    string
  animDelay?:    number
  magnetic?:     boolean
  fullWidth?:    boolean
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:   'bg-text text-tema border-transparent hover:bg-text/90',
  secondary: 'bg-white/5 border-white/10 text-text hover:bg-white/8 hover:border-white/20',
  ghost:     'bg-transparent border-transparent text-text/60 hover:text-text hover:bg-white/5',
  outline:   'bg-transparent border-white/15 text-text hover:border-white/30 hover:bg-white/5',
}
const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-xs gap-1.5',
  md: 'px-5 py-2.5 text-sm gap-2',
  lg: 'px-7 py-3.5 text-sm gap-2',
}

export function AtomButton({
  children, variant = 'primary', size = 'md',
  icon, iconPosition = 'right', href, onClick,
  disabled = false, className, animDelay = 0,
  magnetic = false, fullWidth = false,
}: AtomButtonProps) {
  const ref     = useRef<HTMLDivElement>(null)
  const mouseX  = useMotionValue(0)
  const mouseY  = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 })

  const onMove = (e: React.MouseEvent) => {
    if (!magnetic || !ref.current) return
    const r  = ref.current.getBoundingClientRect()
    mouseX.set((e.clientX - r.left - r.width / 2) * 0.25)
    mouseY.set((e.clientY - r.top - r.height / 2) * 0.25)
  }
  const onLeave = () => { mouseX.set(0); mouseY.set(0) }

  const content = (
    <motion.div
      ref={ref}
      style={magnetic ? { x: springX, y: springY } : undefined}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: animDelay, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      whileTap={{ scale: 0.97 }}
      onClick={!disabled ? onClick : undefined}
      className={cn(
        'relative inline-flex items-center justify-center rounded-full border',
        'font-semibold tracking-wide transition-all duration-200 cursor-pointer select-none overflow-hidden',
        variantStyles[variant], sizeStyles[size],
        fullWidth && 'w-full',
        disabled && 'opacity-40 pointer-events-none',
        className,
      )}
    >
      {variant === 'primary' && (
        <motion.span
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{ translateX: ['-100%', '200%'] }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 4, ease: 'linear' }}
          aria-hidden
        />
      )}
      {icon && iconPosition === 'left'  && <span className="shrink-0">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </motion.div>
  )

  return href
    ? <a href={href} className={cn('inline-block', fullWidth && 'w-full')}>{content}</a>
    : content
}