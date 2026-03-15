'use client'

/**
 * @atomic   ORGANISM
 * @file     organisms/OrganismMyJourney.tsx
 * @summary  Section "My Journey" — zigzag timeline yang menampilkan
 *           perjalanan akademik, kompetisi, dan proyek secara kronologis.
 *
 * @layout
 *  Desktop (md+) : Zigzag — card bergantian kiri ↔ kanan di sepanjang
 *                  garis tengah vertikal yang beranimasi saat di-scroll.
 *  Mobile        : Single column — garis di kiri, semua card di kanan.
 *
 * @features
 *  - Scroll-driven progress line (useScroll + useTransform)
 *    → garis tumbuh dari atas ke bawah seiring scroll
 *  - Per-item useInView → node dot dan card masuk bersama
 *  - Pulse ring pada node milestone yang masih aktif (ongoing)
 *  - Horizontal connector arm antara node dan card (desktop)
 *  - Section header dengan gradient text + animated rule
 *  - Ambient glow background + subtle grid overlay
 *
 * @molecules_used
 *  MoleculeJourneyCard — card satu milestone
 *
 * @atoms_used (via MoleculeJourneyCard)
 *  AtomBadge, AtomStatusDot
 *
 * @data
 *  JOURNEY array didefinisikan inline — pindahkan ke @/app/src/data
 *  jika perlu satu sumber kebenaran.
 */

import { useRef }                              from 'react'
import { inView, motion, useInView, useScroll, useTransform } from 'framer-motion'
import { cn }                                  from '@/lib/utils'
import MoleculeJourneyCard, { type JourneyCategory }
  from '@/components/molecules/Moleculejourneycard'

/* ══════════════════════════════════════════════════════════
   📋  Data
══════════════════════════════════════════════════════════ */

interface JourneyItem {
  title:        string
  year:         string
  description?: string
  category:     JourneyCategory
  active?:      boolean
}

const JOURNEY: JourneyItem[] = [
     {
    year:        '2020',
    title:       'Hello World in C++ — Where It All Began',
    description: 'The classic first step. A single cout in C++ that sparked a curiosity for how computers think.',
    category:    'Academic',
  },
  {
    year:        '2022',
    title:       'Built My First Mobile App with Flutter',
    description: 'Developed my first mobile application using Flutter — a non-commercial personal project that introduced me to cross-platform development and the joy of building things people can actually touch.',
    category:    'Academic',
  },
  {
    year:        '2023',
    title:       'Best Mathematics Score in High School',
    description: 'Achieved the highest mathematics grade in school, reflecting a strong analytical foundation and deep passion for problem-solving.',
    category:    'Academic',
  },
  {
    year:        '2024',
    title:       'Accepted to Universitas Sebelas Maret via SNBT',
    description: 'Passed the national SNBT university entrance exam and secured admission to UNS — the only student from the school to achieve this.',
    category:    'Academic',
  },
  {
    year:        '2024',
    title:       'Selected for Robotika UNS Programming Team',
    description: 'Passed the competitive internal selection process and joined the core programming division of Robotika UNS.',
    category:    'Organization',
  },
  {
    year:        '2024',
    title:       'Selected for KRAI ABU ROBOCON Team',
    description: 'Earned a spot in the KRAI ABU ROBOCON competition team, representing UNS at both national and Asia-Pacific stages.',
    category:    'Competition',
  },
  {
    year:        '2024',
    title:       'ABU ROBOCON 2024 — KRI, KRAI & Asia-Pacific Representative',
    description: 'Contributed to the robot development project representing UNS at KRI (Kontes Robot Indonesia), KRAI (Kontes Robot ABU Indonesia), and ABU ROBOCON Asia Pacific 2024.',
    category:    'Competition',
  },
  {
    year:        '2025',
    title:       'Robot Cleared Regional Qualification Round',
    description: 'The ABU ROBOCON robot successfully advanced through the regional round, securing a slot in the national competition.',
    category:    'Competition',
  },
  {
    year:        '2024',
    title:       'Launched bermatematika.com',
    description: 'Designed and built bermatematika.com — an educational web platform dedicated to making mathematics more accessible and engaging for students.',
    category:    'Project',
  },
  {
    year:        '2025',
    title:       'Programming Interviewer at Robotika UNS',
    description: 'Appointed as a programming interviewer, responsible for assessing and selecting new candidates for the robotics programming team.',
    category:    'Organization',
  },
  {
    year:        '2025',
    title:       'Launched neuro.my.id',
    description: 'Built and launched neuro.my.id — a personal platform currently in active development, continuing the mission of creating meaningful digital products.',
    category:    'Project',
    active:      false,
  },
  {
    year:        '2025',
    title:       'Led Team to PKM Abstract Approval — Road to PIMNAS',
    description: 'Served as team leader and successfully guided the group through the PKM abstract selection at UNS — one step closer to competing at PIMNAS, Indonesia\'s most prestigious national student innovation stage.',
    category:    'Academic',
    active:       true
  },
  {
    year:        '2026',
    title:       'ABU ROBOCON 2026 — Active Asia-Pacific Representative',
    description: 'Currently contributing to the ABU ROBOCON 2025 robot project, representing UNS at KRI, KRAI, and ABU ROBOCON Asia Pacific 2025.',
    category:    'Competition',
    active:      true,
  },
  {
    year:        '2025',
    title:       'Launched Dolphin Edu — Evolution of bermatematika.com',
    description: 'Developed and launched Dolphin Edu as the next evolution of bermatematika.com, expanding the platform with richer features and a broader educational scope. Currently ongoing.',
    category:    'Project',
    active:      true,
  },
]

/* ══════════════════════════════════════════════════════════
   🔵  TimelineNode (internal atom-level JSX)
   @description  Node dot di titik tengah timeline.
                 Menerima inView dari JourneyRow untuk animasi sinkron.
══════════════════════════════════════════════════════════ */

interface TimelineNodeProps {
  inView:    boolean
  active?:   boolean
  /** 'md' = ukuran desktop, 'sm' = ukuran mobile */
  nodeSize?: 'sm' | 'md'
}

function TimelineNode({ inView, active = false, nodeSize = 'md' }: TimelineNodeProps) {
  const dotClass = nodeSize === 'md' ? 'size-3.5' : 'size-3'

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : {}}
      transition={{ duration: 0.4, type: 'spring', stiffness: 300, delay: 0.1 }}
      className={cn(
        'relative z-10 rounded-full ring-[3px] ring-card shrink-0',
        dotClass,
        active ? 'bg-emerald-400' : 'bg-text/35',
      )}
    >
      {/* Pulse ring — hanya untuk item aktif */}
      {active && (
        <motion.span
          className="absolute inset-0 rounded-full bg-emerald-400/35"
          animate={{ scale: [1, 3], opacity: [0.6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
          aria-hidden
        />
      )}
    </motion.div>
  )
}

/* ══════════════════════════════════════════════════════════
   🔗  ConnectorArm (internal)
   @description  Garis horizontal pendek dari node ke sisi card (desktop only).
══════════════════════════════════════════════════════════ */

function ConnectorArm({
  inView,
  direction,
}: {
  inView:     boolean
  direction:  'left' | 'right'
}) {
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      animate={inView ? { scaleX: 1, opacity: 1 } : {}}
      transition={{ delay: 0.18, duration: 0.35, ease: 'easeOut' }}
      style={{ transformOrigin: direction === 'left' ? 'right' : 'left' }}
      className={cn(
        'h-px w-10 bg-gradient-to-r',
        direction === 'left'
          ? 'from-transparent to-white/15'
          : 'from-white/15 to-transparent',
      )}
      aria-hidden
    />
  )
}

/* ══════════════════════════════════════════════════════════
   📦  JourneyRow (internal)
   @description  Satu baris timeline. Menggabungkan node + card
                 dengan shared useInView untuk animasi sinkron.
══════════════════════════════════════════════════════════ */

interface JourneyRowProps {
  item:    JourneyItem
  index:   number
  isLast:  boolean
}

function JourneyRow({ item, index, isLast }: JourneyRowProps) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  /* Even index → card di kiri  |  Odd index → card di kanan */
  const isLeft = index % 2 === 0

  return (
    <div
      ref={ref}
      className={cn('relative', !isLast && 'pb-10 sm:pb-12 md:pb-16')}
    >

      {/* ══ DESKTOP LAYOUT (md+): 3-column zigzag ══════════════ */}
      <div className="hidden md:grid grid-cols-[1fr_52px_1fr] items-start">

        {/* ── Kolom Kiri ── */}
        <div className="flex justify-end items-start gap-0">
          {isLeft ? (
            /* Card kiri */
            <MoleculeJourneyCard
              {...item}
              side="left"
              inView={inView}
              index={index}
              className="max-w-[380px] w-full"
            />
          ) : (
            /* Connector arm menuju node (dari sisi kiri, tdk ada card) */
            <div className="flex items-start pt-[22px] w-full justify-end">
              <ConnectorArm inView={inView} direction="left" />
            </div>
          )}
        </div>

        {/* ── Kolom Tengah: Node ── */}
        <div className="flex justify-center items-start pt-[14px]">
          <TimelineNode inView={inView} active={item.active} nodeSize="md" />
        </div>

        {/* ── Kolom Kanan ── */}
        <div className="flex justify-start items-start gap-0">
          {!isLeft ? (
            /* Card kanan */
            <MoleculeJourneyCard
              {...item}
              side="right"
              inView={inView}
              index={index}
              className="max-w-[380px] w-full"
            />
          ) : (
            /* Connector arm menuju node (dari sisi kanan, tdk ada card) */
            <div className="flex items-start pt-[22px]">
              <ConnectorArm inView={inView} direction="right" />
            </div>
          )}
        </div>

      </div>

      {/* ══ MOBILE LAYOUT: Single column ═══════════════════════ */}
      <div className="md:hidden flex items-start gap-4 pl-1">

        {/* Node */}
        <div className="flex flex-col items-center shrink-0 pt-[14px]">
          <TimelineNode inView={inView} active={item.active} nodeSize="sm" />
        </div>

        {/* Card — selalu ke kanan, slide dari right */}
        <MoleculeJourneyCard
          {...item}
          side="right"
          inView={inView}
          index={index}
          className="flex-1 min-w-0"
        />

      </div>

    </div>
  )
}

/* ══════════════════════════════════════════════════════════
   🏛️  ORGANISM — OrganismMyJourney
══════════════════════════════════════════════════════════ */

export default function OrganismMyJourney() {
  const sectionRef   = useRef<HTMLElement>(null)
  const headerRef    = useRef<HTMLDivElement>(null)
  const timelineRef  = useRef<HTMLDivElement>(null)

  const headerInView = useInView(headerRef, { once: true, margin: '-60px' })

  /* Scroll-driven line animation — berkaitan dengan posisi timeline container */
  const { scrollYProgress } = useScroll({
    target  : timelineRef,
    offset  : ['start 85%', 'end 15%'],
  })
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section
      ref={sectionRef}
      className={cn(
        'relative w-full',
        'px-4 sm:px-6 lg:px-10 xl:px-16',
        'py-20 sm:py-24 lg:py-28',
        'overflow-hidden',
      )}
    >
      {/* ── Background subtle grid ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(var(--color-text) 1px, transparent 1px),
            linear-gradient(90deg, var(--color-text) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
        aria-hidden
      />

      {/* ── Ambient glow blobs ── */}
      <div
        className="pointer-events-none absolute top-1/3 left-1/4 size-[500px] rounded-full blur-[140px] opacity-[0.035] bg-blue-500"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-1/4 right-1/4 size-[400px] rounded-full blur-[120px] opacity-[0.03] bg-violet-500"
        aria-hidden
      />

      {/* ── Main content wrapper ── */}
      <div className="relative z-10 mx-auto w-full max-w-6xl">

        {/* ════════════════════════════════════════════════════
            Section Header
        ════════════════════════════════════════════════════ */}
        <div className="space-y-2 mb-15">
        <span className="text-text/40 text-xs font-semibold tracking-[0.25em] uppercase">
            Timeline
        </span>
        <h2 className="text-text font-bold text-2xl sm:text-3xl tracking-tight">
            Academic Journey
        </h2>
        </div>
          

        {/* ════════════════════════════════════════════════════
            Timeline
        ════════════════════════════════════════════════════ */}
        <div ref={timelineRef} className="relative">

          {/* ── CENTER LINE: Desktop ── */}
          {/* Static faint background line */}
          <div
            className="hidden md:block absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-white/[0.05]"
            aria-hidden
          />
          {/* Animated progress overlay line */}
          <motion.div
            className="hidden md:block absolute left-1/2 -translate-x-px top-0 w-px origin-top pointer-events-none"
            style={{
              height    : '100%',
              scaleY    : lineScaleY,
              background: 'linear-gradient(to bottom, #3b82f6 0%, #8b5cf6 45%, #10b981 100%)',
              opacity   : 0.4,
            }}
            aria-hidden
          />

          {/* ── LEFT LINE: Mobile ── */}
          {/* Static faint */}
          <div
            className="md:hidden absolute left-[5px] top-0 bottom-0 w-px bg-white/[0.05]"
            aria-hidden
          />
          {/* Animated progress */}
          <motion.div
            className="md:hidden absolute left-[5px] top-0 w-px origin-top pointer-events-none"
            style={{
              height    : '100%',
              scaleY    : lineScaleY,
              background: 'linear-gradient(to bottom, #3b82f6 0%, #8b5cf6 45%, #10b981 100%)',
              opacity   : 0.4,
            }}
            aria-hidden
          />

          {/* ── Journey Items ── */}
          <div className="relative">
            {JOURNEY.map((item, i) => (
              <JourneyRow
                key={`journey-${i}`}
                item={item}
                index={i}
                isLast={i === JOURNEY.length - 1}
              />
            ))}
          </div>

        </div>
        {/* end timeline */}

      </div>
      {/* end max-w wrapper */}

    </section>
  )
}