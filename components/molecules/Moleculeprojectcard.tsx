'use client'

/**
 * @atomic   MOLECULE
 * @file     molecules/project/MoleculeProjectCard.tsx
 * @summary  Project card for bento grid layout.
 *
 *           Card anatomy:
 *             ┌──────────────────────────────────────┐
 *             │ ▔▔▔▔ accent top-bar ▔▔▔▔            │
 *             │  [Category]              [Featured★] │
 *             │                                      │
 *             │  Project Title                       │
 *             │  Short description text...           │
 *             │                                      │
 *             │  📅 Jan 2024                         │
 *             │  [tag1] [tag2] [tag3]                │
 *             │                                      │
 *             │  [GitHub ↗]  [Live Demo ↗]           │
 *             └──────────────────────────────────────┘
 *
 * @depends
 *   MoleculeBentoCard — card wrapper with glow + hover lift
 *   AtomBadge         — tech tag chips + category chip
 *   AtomInfoRow       — date row with Calendar icon
 *   AtomButton        — project link buttons
 *
 * @props  See ProjectItem in project.types.ts
 */

import { Calendar, Github, ExternalLink, BookOpen, Link2 } from 'lucide-react'
import { MoleculeBentoCard, type CardAccent }               from '@/components/molecules/MoleculeBentoCard'
import AtomBadge, { type BadgeColor }                       from '@/components/atoms/MainSection/AtomBadge'
import AtomInfoRow                                          from '@/components/atoms/MainSection/AtomInfoRow'
import { AtomButton }                                       from '@/components/atoms/AtomButton'
import { cn }                                               from '@/lib/utils'
import type { ProjectItem, ProjectLinkType }                from '@/app/src/Projects.data'

/* ─── Link icon map ──────────────────────────────────────── */

const linkIconMap: Record<ProjectLinkType, React.ReactNode> = {
  github: <Github  size={12} strokeWidth={2} />,
  demo:   <ExternalLink size={12} strokeWidth={2} />,
  docs:   <BookOpen     size={12} strokeWidth={2} />,
  other:  <Link2        size={12} strokeWidth={2} />,
}

/* ─── Accent top-bar color map ───────────────────────────── */

const accentBarMap: Record<CardAccent, string> = {
  none:   'bg-white/10',
  blue:   'bg-gradient-to-r from-blue-500/60   via-blue-400/40   to-transparent',
  purple: 'bg-gradient-to-r from-violet-500/60 via-violet-400/40 to-transparent',
  green:  'bg-gradient-to-r from-emerald-500/60 via-emerald-400/40 to-transparent',
  pink:   'bg-gradient-to-r from-pink-500/60   via-pink-400/40   to-transparent',
  amber:  'bg-gradient-to-r from-amber-500/60  via-amber-400/40  to-transparent',
}

const accentTextMap: Record<CardAccent, string> = {
  none:   'text-slate-300',
  blue:   'text-blue-300',
  purple: 'text-violet-300',
  green:  'text-emerald-300',
  pink:   'text-pink-300',
  amber:  'text-amber-300',
}

const accentInfoColorMap: Record<CardAccent, 'blue' | 'purple' | 'green' | 'amber' | 'pink' | 'slate'> = {
  none:   'slate',
  blue:   'blue',
  purple: 'purple',
  green:  'green',
  pink:   'pink',
  amber:  'amber',
}

/* ─── Component ─────────────────────────────────────────── */

export interface MoleculeProjectCardProps extends ProjectItem {
  /** Additional className for outer wrapper */
  className?: string
  /** Animation delay for staggered entry */
  animDelay?: number
}

export function MoleculeProjectCard({
  title,
  description,
  date,
  tags,
  category,
  links,
  featured  = false,
  accent    = 'blue',
  tagColor  = 'slate',
  className,
  animDelay = 0,
}: MoleculeProjectCardProps) {
  const barClass      = accentBarMap[accent]
  const textClass     = accentTextMap[accent]
  const infoColor     = accentInfoColorMap[accent]
  const hasLinks      = links && links.length > 0

  return (
    <MoleculeBentoCard
      accent={accent}
      hover
      noise={featured}
      animDelay={animDelay}
      className={cn('h-full', className)}
      innerClass="flex flex-col h-full"
    >
      {/* Accent top bar */}
      <div className={cn('h-0.5 w-full shrink-0', barClass)} aria-hidden />

      {/* Card body */}
      <div className="flex flex-col gap-3 p-4 flex-1">

        {/* Row 1: Category chip + Featured badge */}
        <div className="flex items-center justify-between gap-2 shrink-0">
          <AtomBadge
            label={category}
            color={accent === 'none' ? 'slate' : accent as BadgeColor}
            variant="outline"
            size="xs"
            dot
          />
          {featured && (
            <AtomBadge label="Featured" color="amber" variant="glow" size="xs" />
          )}
        </div>

        {/* Row 2: Title */}
        <h3 className={cn(
          'font-semibold leading-snug',
          featured ? 'text-base' : 'text-sm',
          textClass,
        )}>
          {title}
        </h3>

        {/* Row 3: Description (featured cards show more lines) */}
        {description && (
          <p className={cn(
            'text-text/50 text-xs leading-relaxed',
            featured ? 'line-clamp-3' : 'line-clamp-2',
          )}>
            {description}
          </p>
        )}

        {/* Spacer — pushes footer content to bottom */}
        <div className="flex-1" />

        {/* Divider */}
        <div className="h-px bg-white/[0.05] shrink-0" />

        {/* Row 4: Date */}
        <AtomInfoRow
          icon={<Calendar />}
          label={date}
          iconColor={infoColor}
          size="sm"
          className="shrink-0"
        />

        {/* Row 5: Tech tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 shrink-0">
            {tags.map((tag) => (
              <AtomBadge
                key={tag}
                label={tag}
                color={tagColor}
                variant="ghost"
                size="xs"
              />
            ))}
          </div>
        )}

        {/* Row 6: Link buttons */}
        {hasLinks && (
          <div className="flex flex-wrap gap-2 shrink-0 pt-0.5">
            {links!.map((link) => (
              <AtomButton
                key={link.href}
                href={link.href}
                variant="outline"
                size="sm"
                icon={linkIconMap[link.type]}
                iconPosition="right"
                animDelay={0}
                className="text-xs py-1.5 px-3 rounded-lg"
              >
                {link.label}
              </AtomButton>
            ))}
          </div>
        )}
      </div>
    </MoleculeBentoCard>
  )
}