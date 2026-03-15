'use client'

/**
 * @atomic   ORGANISM
 * @file     organisms/OrganismSkillSection.tsx
 * @summary  Skills section split into Technical and Non-Technical.
 *
 *           Structure:
 *             ── TECHNICAL SKILLS ────────────────────────
 *               1. IoT & Robotics         (Lucide icons)
 *               2. Programming Languages  (SimpleIcons CDN)
 *               3. Programming Types      (Lucide icons)
 *               4. Technologies           (SimpleIcons CDN)
 *               5. Tools & Software       (SimpleIcons CDN + Lucide)
 *
 *             ── NON-TECHNICAL SKILLS ────────────────────
 *               6. Languages              (Lucide)
 *               7. Soft Skills            (Lucide)
 *
 *           Bloom animation (per card):
 *             scroll in  → scale 0.80 → 1, blur → clear  ("bloom")
 *             scroll out → reverses                       (once: false)
 *
 *           Logo sources:
 *             Lucide    — offline, IoT + type + misc
 *             cdn.simpleicons.org/{slug}/{hex} — no API key
 *
 * @depends  MoleculeSkillDetailCard
 */

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'
import {
  MoleculeSkillDetailCard,
} from '@/components/molecules/MoleculeSkillCard'
import { NON_TECHNICAL, SkillCategory, TECHNICAL } from '@/app/src/data'


/* ══════════════════════════════════════════════════════════
   Bloom Animation
   once: false — reversible on scroll up
══════════════════════════════════════════════════════════ */

const BLOOM_CARD = {
  hidden:  { scale: 0.80, opacity: 0, filter: 'blur(10px)', y: 18 },
  visible: { scale: 1,    opacity: 1, filter: 'blur(0px)',  y: 0  },
} as const

const BLOOM_HEADER = {
  hidden:  { opacity: 0, x: -14 },
  visible: { opacity: 1, x: 0   },
} as const

/* ─── BloomCard ─────────────────────────────────────────── */
function BloomCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      variants={BLOOM_CARD}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.08 }}
      transition={{ type: 'spring', stiffness: 68, damping: 13, delay }}
      className="h-full"
    >
      {children}
    </motion.div>
  )
}

/* ─── CategoryHeader ────────────────────────────────────── */
function CategoryHeader({
  icon: Icon, title, subtitle, iconColorClass, headerGradient,
}: Pick<SkillCategory, 'icon' | 'title' | 'subtitle' | 'iconColorClass' | 'headerGradient'>) {
  return (
    <motion.div
      variants={BLOOM_HEADER}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.4 }}
      transition={{ duration: 0.48, ease: [0.23, 1, 0.32, 1] }}
      className="flex items-center gap-3 mb-4"
    >
      <div className={cn(
        'inline-flex items-center justify-center shrink-0',
        'size-9 rounded-xl bg-white/[0.04] border border-white/[0.08]',
        iconColorClass,
      )}>
        <Icon size={17} strokeWidth={2} />
      </div>
      <div>
        <h3 className="text-text font-bold text-sm leading-snug">{title}</h3>
        <p className="text-text/35 text-[10px] mt-0.5">{subtitle}</p>
      </div>
      <div className={cn('flex-1 h-px bg-gradient-to-r opacity-25', headerGradient)} />
    </motion.div>
  )
}

/* ─── SectionDivider ────────────────────────────────────── */
function SectionDivider({
  label,
  inView,
  delay = 0,
}: {
  label:  string
  inView: boolean
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
      className="flex items-center gap-4"
    >
      {/* Left line */}
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-white/10" />

      {/* Label pill */}
      <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] text-text/40 text-[10px] font-bold tracking-[0.25em] uppercase select-none">
        {label}
      </span>

      {/* Right line */}
      <div className="flex-1 h-px bg-gradient-to-l from-transparent via-white/10 to-white/10" />
    </motion.div>
  )
}

/* ══════════════════════════════════════════════════════════
   ORGANISM — OrganismSkillSection
══════════════════════════════════════════════════════════ */

export default function OrganismSkillSection() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className={cn(
        'relative w-full',
        'px-4 sm:px-6 lg:px-10 xl:px-16',
        'py-20 sm:py-24 lg:py-28',
        'overflow-hidden',
      )}
    >
      <div className="relative z-10 mx-auto w-full max-w-6xl space-y-14 sm:space-y-16">

       {/* ── Section Header ──────────────────────────── */}
        <motion.div
        className="space-y-2"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
        >
        <span className="text-text/40 text-xs font-semibold tracking-[0.25em] uppercase">
            My Expertise
        </span>
        <h2 className="text-text font-bold text-2xl sm:text-3xl tracking-tight">
            Skills & Technologies
        </h2>
        </motion.div>

        {/* ══ TECHNICAL SKILLS ════════════════════════ */}
        <SectionDivider label="Technical Skills" inView={inView} delay={0.3} />

        <div className="space-y-12 sm:space-y-14">
          {TECHNICAL.map((cat) => (
            <div key={cat.id}>
              <CategoryHeader
                icon={cat.icon}
                title={cat.title}
                subtitle={cat.subtitle}
                iconColorClass={cat.iconColorClass}
                headerGradient={cat.headerGradient}
              />
              <div className="grid gap-2.5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                {cat.skills.map((skill, i) => (
                  <BloomCard key={skill.name} delay={i * 0.04}>
                    <MoleculeSkillDetailCard
                      {...skill}
                      accent={cat.accent}
                      iconColorClass={cat.iconColorClass}
                    />
                  </BloomCard>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ══ NON-TECHNICAL SKILLS ════════════════════ */}
        <SectionDivider label="Non-Technical Skills" inView={inView} delay={0.4} />

        <div className="space-y-12 sm:space-y-14">
          {NON_TECHNICAL.map((cat) => (
            <div key={cat.id}>
              <CategoryHeader
                icon={cat.icon}
                title={cat.title}
                subtitle={cat.subtitle}
                iconColorClass={cat.iconColorClass}
                headerGradient={cat.headerGradient}
              />
              <div className="grid gap-2.5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                {cat.skills.map((skill, i) => (
                  <BloomCard key={skill.name} delay={i * 0.06}>
                    <MoleculeSkillDetailCard
                      {...skill}
                      accent={cat.accent}
                      iconColorClass={cat.iconColorClass}
                    />
                  </BloomCard>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}