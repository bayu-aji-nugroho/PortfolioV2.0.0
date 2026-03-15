'use client'

/**
 * @atomic  ATOM
 * @file    atoms/AtomNavLink.tsx
 * @summary Single navigation link untuk side navbar.
 *          Active state otomatis dari pathname atau prop `isActive`.
 *          Mendukung icon, label, dan optional badge count.
 *
 * @example
 *   <AtomNavLink href="#hero"    icon={<Home />}    label="Home"    isActive />
 *   <AtomNavLink href="#projects" icon={<Layers />}  label="Projects" />
 */

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface AtomNavLinkProps {
  href:        string
  label:       string
  icon:        React.ReactNode
  isActive?:   boolean
  badge?:      number
  collapsed?:  boolean
  onClick?:    () => void
  animDelay?:  number
  className?:  string
}

export function AtomNavLink({
  href,
  label,
  icon,
  isActive   = false,
  badge,
  collapsed  = false,
  onClick,
  animDelay  = 0,
  className,
}: AtomNavLinkProps) {
  return (
    <motion.a
      href={href}
      onClick={onClick}
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: animDelay, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ x: 3 }}
      aria-label={label}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'group relative flex items-center gap-3 rounded-xl transition-all duration-200',
        'text-sm font-medium',
        collapsed ? 'p-2.5 justify-center' : 'px-3 py-2.5',
        isActive
          ? 'bg-white/8 text-text border border-white/10'
          : 'text-text/40 hover:text-text/80 hover:bg-white/4 border border-transparent',
        className
      )}
    >
      {/* Active left bar indicator */}
      {isActive && (
        <motion.span
          layoutId="nav-active-bar"
          className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-0.5 rounded-full bg-blue-400"
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
      )}

      {/* Icon */}
      <span
        className={cn(
          'h-4 w-4 shrink-0 transition-colors duration-200',
          isActive ? 'text-blue-400' : 'text-text/30 group-hover:text-text/60',
        )}
      >
        {icon}
      </span>

      {/* Label */}
      {!collapsed && (
        <span className="flex-1 truncate">{label}</span>
      )}

      {/* Badge */}
      {!collapsed && badge !== undefined && badge > 0 && (
        <span className="ml-auto flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-blue-500/20 px-1 text-[10px] font-semibold text-blue-300">
          {badge}
        </span>
      )}
    </motion.a>
  )
}