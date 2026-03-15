'use client'

/**
 * @atomic   MOLECULE
 * @file     molecules/project/MoleculeProjectFilter.tsx
 * @summary  Animated filter pill tabs for the project section.
 *           Active pill slides with a shared layout animation (Framer Motion layoutId).
 *
 *           Anatomy:
 *             ┌─────────────────────────────────────────┐
 *             │  [All]  [Web]  [Mobile]  [Robotics]  … │
 *             └─────────────────────────────────────────┘
 *
 * @props
 *   categories      — list of category strings derived from project data
 *   active          — currently active category ('All' = show everything)
 *   onChange        — callback fired when a category pill is clicked
 *   className       — additional wrapper class
 *
 * @example
 *   <MoleculeProjectFilter
 *     categories={['Web', 'Mobile', 'Robotics']}
 *     active={activeCategory}
 *     onChange={setActiveCategory}
 *   />
 */

import { motion }   from 'framer-motion'
import { cn }       from '@/lib/utils'

/* ─── Types ─────────────────────────────────────────────── */

export interface MoleculeProjectFilterProps {
  categories:  string[]
  active:      string
  onChange:    (category: string) => void
  className?:  string
}

/* ─── Constants ──────────────────────────────────────────── */

const ALL_LABEL = 'All'

/* ─── Component ─────────────────────────────────────────── */

export function MoleculeProjectFilter({
  categories,
  active,
  onChange,
  className,
}: MoleculeProjectFilterProps) {
  const tabs = [ALL_LABEL, ...categories]

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
      className={cn(
        'flex flex-wrap items-center gap-1.5',
        className,
      )}
      role="tablist"
      aria-label="Filter projects by category"
    >
      {tabs.map((tab) => {
        const isActive = active === tab

        return (
          <button
            key={tab}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab)}
            className={cn(
              'relative px-3.5 py-1.5 rounded-full text-xs font-medium',
              'transition-colors duration-200 select-none outline-none',
              'focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-1 focus-visible:ring-offset-transparent',
              isActive
                ? 'text-text'
                : 'text-text/40 hover:text-text/70',
            )}
          >
            {/* Sliding pill background */}
            {isActive && (
              <motion.span
                layoutId="project-filter-pill"
                className={cn(
                  'absolute inset-0 rounded-full',
                  'bg-white/8 border border-white/15',
                )}
                transition={{ type: 'spring', stiffness: 380, damping: 36 }}
                aria-hidden
              />
            )}

            {/* Label */}
            <span className="relative z-10">{tab}</span>
          </button>
        )
      })}
    </motion.div>
  )
}