'use client'

/**
 * @atomic   MOLECULE
 * @file     molecules/MoleculeJourneyCard.tsx
 * @summary  Card tunggal untuk satu milestone perjalanan akademik/kompetisi.
 *           Dipakai secara internal oleh OrganismMyJourney sebagai item zigzag.
 *
 * @props
 *  title        — judul milestone (required)
 *  year         — tahun kejadian (required)
 *  description  — deskripsi singkat opsional
 *  category     — 'Academic' | 'Competition' | 'Project' | 'Organization'
 *  active       — true → tampilkan AtomStatusDot pulse "Ongoing"
 *  side         — 'left' | 'right' → arah animasi slide masuk
 *  inView       — shared boolean dari parent JourneyRow (sinkron dengan node)
 *  index        — urutan item (untuk stagger delay kecil)
 *  className    — override class tambahan
 *
 * @atoms_used
 *  AtomBadge     — category label (variant glow) + year label (variant outline)
 *  AtomStatusDot — pulse dot untuk milestone yang masih ongoing
 *
 * @molecule_used
 *  MoleculeBentoCard — card wrapper dengan efek border glow + hover lift
 *
 * @notes
 *  - Komponen ini TIDAK menghitung useInView sendiri.
 *    inView dikirim dari JourneyRow agar node dan card beranimasi sinkron.
 *  - motion.div wrapper menangani entrance animasi lateral (x-axis).
 *    MoleculeBentoCard menerima animDelay={0} agar tidak double-animate.
 */

import { motion }                   from 'framer-motion'
import { cn }                       from '@/lib/utils'
import { MoleculeBentoCard }        from '@/components/molecules/MoleculeBentoCard'
import AtomBadge, { type BadgeColor } from '@/components/atoms/MainSection/AtomBadge'
import AtomStatusDot                from '@/components/atoms/MainSection/AtomStatusDot'

/* ══════════════════════════════════════════════════════════
   Types & Config
══════════════════════════════════════════════════════════ */

export type JourneyCategory = 'Academic' | 'Competition' | 'Project' | 'Organization'

export interface MoleculeJourneyCardProps {
  title:        string
  year:         string
  description?: string
  category:     JourneyCategory
  active?:      boolean
  /** Posisi card dalam zigzag → menentukan arah animasi masuk */
  side:         'left' | 'right'
  /** Shared inView dari parent JourneyRow */
  inView:       boolean
  /** Index urutan untuk stagger delay ringan */
  index:        number
  className?:   string
}

type BentoAccent = 'blue' | 'purple' | 'green' | 'amber'

const CATEGORY_CONFIG: Record<
  JourneyCategory,
  { badgeColor: BadgeColor; bentoAccent: BentoAccent }
> = {
  Academic:     { badgeColor: 'purple', bentoAccent: 'purple' },
  Competition:  { badgeColor: 'blue',   bentoAccent: 'blue'   },
  Project:      { badgeColor: 'green',  bentoAccent: 'green'  },
  Organization: { badgeColor: 'amber',  bentoAccent: 'amber'  },
}

/* ══════════════════════════════════════════════════════════
   Component
══════════════════════════════════════════════════════════ */

export default function MoleculeJourneyCard({
  title,
  year,
  description,
  category,
  active    = false,
  side,
  inView,
  index,
  className,
}: MoleculeJourneyCardProps) {
  const cfg = CATEGORY_CONFIG[category]

  return (
    <motion.div
      initial={{ opacity: 0, x: side === 'left' ? -36 : 36 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration : 0.6,
        delay    : 0.08,
        ease     : [0.23, 1, 0.32, 1],
      }}
      className={cn('w-full', className)}
    >
      <MoleculeBentoCard
        accent={cfg.bentoAccent}
        hover
        animDelay={0}
        innerClass="flex flex-col gap-3 p-5"
      >

        {/* ── Row 1: Category badge (kiri) + status & year (kanan) ── */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <AtomBadge
            label={category}
            color={cfg.badgeColor}
            variant="glow"
            size="xs"
          />

          <div className="flex items-center gap-2 shrink-0">
            {active && (
              <AtomStatusDot
                active
                size="xs"
                label="Ongoing"
              />
            )}
            <AtomBadge
              label={year}
              color="white"
              variant="outline"
              size="xs"
            />
          </div>
        </div>

        {/* ── Row 2: Title ── */}
        <h3 className="text-text font-bold text-sm leading-snug tracking-tight">
          {title}
        </h3>

        {/* ── Row 3: Description (opsional) ── */}
        {description && (
          <p className="text-text/45 text-xs leading-relaxed">
            {description}
          </p>
        )}

      </MoleculeBentoCard>
    </motion.div>
  )
}