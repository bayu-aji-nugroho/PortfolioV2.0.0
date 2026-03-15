'use client'

/**
 * @atomic   MOLECULE
 * @file     molecules/skills/MoleculeSkillDetailCard.tsx
 * @summary  Compact skill card — logo + name + level dots + year + source tag.
 *           Used in both Technical and Non-Technical skill sections.
 *
 *           Card anatomy:
 *             ┌─────────────────────────────────┐
 *             │ [Logo]  Skill Name       [★]   │
 *             │         ●●●●○                   │
 *             │ 📅 2022–present · Self-Taught   │
 *             │ [tag1] [tag2] [tag3]            │
 *             └─────────────────────────────────┘
 *
 * @depends
 *   MoleculeBentoCard — card wrapper with accent glow + hover lift
 *   AtomBadge         — source / tag badges
 *   AtomInfoRow       — year + source row
 *
 * @props
 *   name          — skill name
 *   year          — year or range (e.g. "2022 – present")
 *   source        — how skill was obtained
 *   level         — proficiency 1–5 (dot indicator, no text label)
 *   icon          — { type: 'lucide'; component: LucideIcon }
 *                   { type: 'img';    src: string }
 *   accent        — card accent color
 *   iconColorClass— Tailwind color class for icon + active dots
 *   tags          — optional badge labels
 *   tagColor      — badge color
 *   primary       — show "★" badge in top-right corner
 */

import { Calendar } from 'lucide-react'
import { type LucideIcon } from 'lucide-react'
import { MoleculeBentoCard, type CardAccent } from '@/components/molecules/MoleculeBentoCard'
import AtomBadge, { type BadgeColor }           from '@/components/atoms/MainSection/AtomBadge'
import AtomInfoRow                               from '@/components/atoms/MainSection/AtomInfoRow'
import { cn }                                    from '@/lib/utils'

/* ─── Types ─────────────────────────────────────────────── */

export type SkillSource =
  | 'University'
  | 'Self-Taught'
  | 'Project'
  | 'Course'
  | 'Native'
  | 'Robotika UNS'

export type SkillIcon =
  | { type: 'lucide'; component: LucideIcon }
  | { type: 'img';    src: string; alt?: string }

export interface MoleculeSkillDetailCardProps {
  name:            string
  year:            string
  source:          SkillSource
  icon:            SkillIcon
  accent?:         CardAccent
  iconColorClass?: string
  tags?:           string[]
  tagColor?:       BadgeColor
  primary?:        boolean
  className?:      string
}

/* ─── Source badge config ────────────────────────────────── */

const sourceConfig: Record<SkillSource, { color: BadgeColor; label: string }> = {
  'University':  { color: 'green',  label: 'University'  },
  'Self-Taught': { color: 'blue',   label: 'Self-Taught' },
  'Project':     { color: 'amber',  label: 'Project'     },
  'Course':      { color: 'purple', label: 'Course'      },
  'Native':      { color: 'cyan',   label: 'Native'      },
  'Robotika UNS': { color: 'blue',  label: 'robotika UNS'}   
}


/* ─── SkillIconRenderer ──────────────────────────────────── */

function SkillIconRenderer({ icon, colorClass }: { icon: SkillIcon; colorClass: string }) {
  if (icon.type === 'lucide') {
    const Icon = icon.component
    return (
      <span
        className={cn(
          'inline-flex items-center justify-center shrink-0',
          'size-8 rounded-xl bg-white/[0.05] border border-white/[0.07]',
          colorClass,
        )}
        aria-hidden
      >
        <Icon size={15} strokeWidth={2.2} />
      </span>
    )
  }

  return (
    <span className="inline-flex items-center justify-center shrink-0 size-8 rounded-xl bg-white/[0.05] border border-white/[0.07] overflow-hidden p-1.5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={icon.src}
        alt={icon.alt ?? ''}
        className="w-full h-full object-contain"
        loading="lazy"
        decoding="async"
      />
    </span>
  )
}

/* ─── Component ─────────────────────────────────────────── */

export function MoleculeSkillDetailCard({
  name,
  year,
  source,
  icon,
  accent          = 'blue',
  iconColorClass  = 'text-blue-400',
  tags,
  tagColor        = 'slate',
  primary         = false,
  className,
}: MoleculeSkillDetailCardProps) {
  const src      = sourceConfig[source]
  const dotClass = iconColorClass.replace('text-', 'bg-')

  const infoColor =
    accent === 'green'  ? 'green'  :
    accent === 'purple' ? 'purple' :
    accent === 'pink'   ? 'pink'   :
    accent === 'amber'  ? 'amber'  : 'blue'

  return (
    <MoleculeBentoCard
      accent={accent}
      hover
      noise={primary}
      className={cn('h-full', className)}
      innerClass="flex flex-col gap-2.5 p-3.5 h-full"
    >
      {/* Row 1: Logo + Name + Primary badge */}
      <div className="flex items-center gap-2.5 shrink-0">
        <SkillIconRenderer icon={icon} colorClass={iconColorClass} />
        <div className="flex-1 min-w-0 flex items-start justify-between gap-1">
          <p className={cn('font-semibold text-sm leading-snug truncate text-text', iconColorClass)}>
            {name}
          </p>
          {primary && (
            <AtomBadge label="★" color="amber" variant="glow" size="xs" className="shrink-0" />
          )}
        </div>
      </div>
      

      {/* Divider */}
      <div className="h-px bg-white/[0.05] shrink-0" />

      {/* Row 3: Year + Source */}
      <div className="items-center gap-2 shrink-0">
        <AtomInfoRow
          icon={<Calendar />}
          label={year}
          iconColor={infoColor}
          size="sm"
          className="flex-1 min-w-0"
        />
        <AtomBadge label={src.label} color={src.color} variant="outline" size="xs" dot />
      </div>

      {/* Row 4: Tags */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-1 shrink-0">
          {tags.map((t) => (
            <AtomBadge key={t} label={t} color={tagColor} variant="ghost" size="xs" />
          ))}
        </div>
      )}
    </MoleculeBentoCard>
  )
}