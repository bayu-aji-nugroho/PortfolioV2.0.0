'use client'
import { useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring, } from 'framer-motion'
import { MapPin, GraduationCap, Globe, Users } from 'lucide-react'
import { cn } from '@/lib/utils'

import AtomTypingText    from '@/components/atoms/AtomTypingText'
import AtomAvatar        from '@/components/atoms/Atomavatar'
import AtomSocialLink    from '@/components/atoms/MainSection/AtomSocialLink'
import AtomBadge         from '@/components/atoms/MainSection/AtomBadge'
import AtomInfoRow       from '@/components/atoms/MainSection/AtomInfoRow'
import AtomStatusDot     from '@/components/atoms/MainSection/AtomStatusDot'   // 🆕
import { MoleculeBentoCard } from '@/components/molecules/MoleculeBentoCard'
import DATA from '@/app/src/data'

/* ══════════════════════════════════════════════════════════
   📋  Data organisasi
   TODO: Pindahkan ke @/app/src/data agar satu sumber kebenaran
══════════════════════════════════════════════════════════ */

/**
 * @interface OrgItem
 * @description Struktur data satu item pengalaman organisasi
 */
interface OrgItem {
  /** Nama organisasi */
  name    : string
  /** Jabatan / peran di organisasi */
  role    : string
  /** Tahun mulai */
  from    : string
  /** Tahun selesai; undefined = masih aktif */
  to?     : string
  /** Warna aksen icon — merujuk ke color token AtomInfoRow */
  accent  : 'blue' | 'purple' | 'green' | 'amber' | 'red'
}

const ORGANIZATIONS: OrgItem[] = [
  {
    name   : 'SKI FKIP UNS',
    role   : 'Anggota',
    from   : '2024',
    to     : '2024',
    accent : 'purple',
  },
  {
    name   : 'Robotika UNS',
    role   : 'Tim Pemrogram',
    from   : '2024',
    accent : 'blue',       // masih aktif — tanpa `to`
  },
]

/* ══════════════════════════════════════════════════════════
   🎞️  Animation variants
══════════════════════════════════════════════════════════ */

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.08 } },
}

const staggerItem = {
  initial:    { opacity: 0, x: -12 },
  animate:    { opacity: 1, x: 0   },
  transition: { duration: 0.45, ease: [0.23, 1, 0.32, 1] },
}

/** Variant khusus timeline item — slide dari kiri + fade */
const timelineItem = {
  initial:  { opacity: 0, x: -16 },
  animate:  { opacity: 1, x: 0   },
  transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] },
}

/* ══════════════════════════════════════════════════════════
   🪄  Magnetic hover hook (untuk avatar)
══════════════════════════════════════════════════════════ */
function useMagnet(strength = 0.25) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 180, damping: 18 })
  const sy = useSpring(y, { stiffness: 180, damping: 18 })

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const cx   = rect.left + rect.width  / 2
    const cy   = rect.top  + rect.height / 2
    x.set((e.clientX - cx) * strength)
    y.set((e.clientY - cy) * strength)
  }
  const onLeave = () => { x.set(0); y.set(0) }
  return { sx, sy, onMove, onLeave }
}

/* ══════════════════════════════════════════════════════════
   🧩  Card components
══════════════════════════════════════════════════════════ */

/** Card kolom 1 — Avatar */
function AvatarCard({ magnet }: { magnet: ReturnType<typeof useMagnet> }) {
  return (
    <MoleculeBentoCard
      accent="blue"
      hover={false}
      animDelay={0.2}
      noise
      mesh
      className="col-span-1 row-span-1"
      innerClass="flex flex-col items-center justify-center gap-4 p-6"
    >
      <div className="relative">
        <motion.div
          className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden
        />
        <motion.div
          style={{ x: magnet.sx, y: magnet.sy }}
          onMouseMove={magnet.onMove}
          onMouseLeave={magnet.onLeave}
        >
          <AtomAvatar
            src={DATA.image}
            alt="Foto profil"
            size="xl"
            ring
            ringAccent="blue"
            glow
            pulse
          />
        </motion.div>
      </div>

      <div className="text-center space-y-1">
        <p className="text-text/50 text-xs font-medium tracking-widest uppercase">
          Portfolio
        </p>
        <motion.div
          className="flex items-center gap-1.5 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        />
      </div>
    </MoleculeBentoCard>
  )
}

/** Card kolom 1 — Sosial Links */
function SocialCard() {
  return (
    <MoleculeBentoCard
      accent="purple"
      hover
      animDelay={0.3}
      className="col-span-1 row-span-1"
      innerClass="flex flex-col gap-1.5 p-4"
    >
      <p className="text-text/40 text-[10px] font-semibold tracking-widest uppercase mb-2 px-1">
        TFind me on
      </p>
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid grid-cols-2 gap-2"
      >
        {DATA.socials.map((s) => (
          <motion.div key={s.label} variants={staggerItem}>
            <AtomSocialLink
              href={s.href}
              icon={s.logo}
              label={s.label}
              accent={s.accent}
              variant="ghost"
              size="sm"
              className="w-full justify-start"
            />
          </motion.div>
        ))}
      </motion.div>
    </MoleculeBentoCard>
  )
}

/** Card kolom 2 — Bio */
function BioCard() {
  return (
    <MoleculeBentoCard
      accent="green"
      hover
      animDelay={0.25}
      noise
      className="col-span-1 md:col-span-2 lg:col-span-2 row-span-1"
      innerClass="flex flex-col justify-between gap-4 p-6"
    >
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-emerald-400 text-xs font-semibold tracking-wider uppercase">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
            About Me
          </span>
        </div>
        <p className="text-text/75 text-sm leading-relaxed">
          <AtomTypingText
            texts={[DATA.deskripsi]}
            typingSpeed={15}
            deletingSpeed={0}
            pauseDuration={3600000}
            startDelay={300}
            className="text-text"
          />
        </p>
      </div>
    </MoleculeBentoCard>
  )
}

/** Card kolom 2 — Pendidikan */
function EducationCard() {
  return (
    <MoleculeBentoCard
      accent="purple"
      hover
      animDelay={0.35}
      className="col-span-1 row-span-1"
      innerClass="flex flex-col justify-between gap-3 p-5"
    >
      <p className="text-text/40 text-[10px] font-semibold tracking-widest Fuppercase">
        Education
      </p>
      <AtomInfoRow
        icon={<GraduationCap />}
        label={DATA.education.institution}
        sublabel={DATA.education.major}
        subPosition="below"
        iconColor="purple"
        size="md"
      />
      <AtomBadge
        label={DATA.education.year}
        color="purple"
        variant="outline"
        size="xs"
        dot
      />
    </MoleculeBentoCard>
  )
}

/** Card kolom 2 — Lokasi */
function LocationCard() {
  return (
    <MoleculeBentoCard
      accent="amber"
      hover
      animDelay={0.4}
      className="col-span-1 row-span-1"
      innerClass="flex flex-col justify-between gap-3 p-5"
    >
      <p className="text-text/40 text-[10px] font-semibold tracking-widest uppercase">
        Location
      </p>
      <AtomInfoRow
        icon={<MapPin />}
        label={DATA.location}
        iconColor="amber"
        size="md"
      />
      <AtomInfoRow
        icon={<Globe />}
        label="Indonesia"
        sublabel="WIB (UTC+7)"
        subPosition="right"
        iconColor="green"
        size="sm"
      />
    </MoleculeBentoCard>
  )
}

/* ══════════════════════════════════════════════════════════
   🆕  Card — Pengalaman Organisasi (Timeline)
   @atoms: AtomInfoRow, AtomBadge, AtomStatusDot
══════════════════════════════════════════════════════════ */

/**
 * @component OrganizationCard
 * @description Card bento berisi timeline pengalaman organisasi.
 *              Setiap item terhubung oleh garis vertikal di sisi kiri.
 *              Item aktif (tanpa `to`) menampilkan AtomStatusDot pulse.
 */
function OrganizationCard() {
  return (
    <MoleculeBentoCard
      accent="blue"
      hover
      animDelay={0.45}
      className="col-span-1 row-span-1"
      innerClass="flex flex-col gap-4 p-5"
    >
      {/* ── Header ── */}
      <div className="flex items-center gap-2">
        <Users className="size-3.5 text-blue-400 shrink-0" aria-hidden />
        <p className="text-text/40 text-[10px] font-semibold tracking-widest uppercase">
          Organisational Experience
        </p>
      </div>

      {/* ── Timeline list ── */}
      <motion.ol
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="relative flex flex-col"
        aria-label="Daftar pengalaman organisasi"
      >
        {ORGANIZATIONS.map((org, index) => {
          const isActive  = !org.to
          const isLast    = index === ORGANIZATIONS.length - 1
          const period    = isActive ? `${org.from} — Now` : `${org.from} — ${org.to}`

          return (
            <motion.li
              key={org.name}
              variants={timelineItem}
              className="relative flex gap-4"
            >
              {/* ── Garis vertikal + node dot ── */}
              <div className="flex flex-col items-center shrink-0">
                {/* Node: dot berwarna sesuai aksen */}
                <span
                  className={cn(
                    'relative z-10 mt-1 size-2.5 rounded-full ring-2 ring-card shrink-0',
                    isActive ? 'bg-blue-400' : 'bg-text/20',
                  )}
                  aria-hidden
                />
                {/* Connector line — tersembunyi di item terakhir */}
                {!isLast && (
                  <span
                    className="mt-1 w-px flex-1 bg-gradient-to-b from-text/15 to-transparent"
                    aria-hidden
                  />
                )}
              </div>

              {/* ── Konten item ── */}
              <div
                className={cn(
                  'flex flex-col gap-2',
                  !isLast && 'pb-5',
                )}
              >
                {/* Nama organisasi */}
                <AtomInfoRow
                  icon={<Users />}
                  label={org.name}
                  sublabel={org.role}
                  subPosition="below"
                  iconColor="green"
                  size="sm"
                />

                {/* Periode + status dot */}
                <div className="flex items-center gap-2 flex-wrap">
                  <AtomBadge
                    label={period}
                    color={isActive ? 'blue' : 'purple'}
                    variant="outline"
                    size="xs"
                  />
                  <AtomStatusDot
                    active={isActive}
                    size="xs"
                    label={isActive ? 'Active' : 'Ended'}
                  />
                </div>
              </div>
            </motion.li>
          )
        })}
      </motion.ol>
    </MoleculeBentoCard>
  )
}

/* ══════════════════════════════════════════════════════════
   🏛️  ORGANISM — OrganismMainSection
══════════════════════════════════════════════════════════ */
export default function OrganismMainSection() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const magnet = useMagnet(0.3)

  return (
    <section
      ref={ref}
      className={cn(
        'relative w-full min-h-svh',
        'flex flex-col justify-center',
        'px-4 sm:px-6 lg:px-10 xl:px-16',
        'py-20 sm:py-24 lg:py-28',
        'overflow-hidden',
      )}
    >
      {/* ── Grid guide lines (subtle) ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(var(--color-text) 1px, transparent 1px),
                            linear-gradient(90deg, var(--color-text) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl space-y-8 sm:space-y-10">

        {/* ── Section label + Name heading ── */}
        <motion.div
          className="space-y-3"
          initial="initial"
          animate={inView ? 'animate' : 'initial'}
        >
          <div>
            <motion.span
              className="h-px w-8 bg-gradient-to-r from-blue-500 to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.15, duration: 0.6 }}
            />
            <span className="text-text/50 text-sm sm:text-base font-medium tracking-[0.2em] uppercase">
              Get to know me
            </span>
          </div>

          <div>
            <h1
              className={cn(
                'font-black leading-none tracking-tighter',
                'text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl',
                'text-text',
              )}
            >
              <AtomTypingText
                texts={[DATA.nama]}
                typingSpeed={70}
                deletingSpeed={0}
                pauseDuration={3600000}
                startDelay={300}
                className="text-text"
              />
            </h1>
          </div>

          <div className="flex items-center gap-2 text-text/50">
            <span className="text-sm sm:text-base">—</span>
            <AtomTypingText
              texts={DATA.taglines as unknown as string[]}
              typingSpeed={55}
              deletingSpeed={30}
              pauseDuration={2500}
              startDelay={1200}
              showCursor={false}
              className="text-sm sm:text-base font-medium text-blue-400"
            />
          </div>
        </motion.div>

        {/* ── Bento grid ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className={cn(
            'grid gap-3',
            'grid-cols-1',
            'md:grid-cols-3',
            'lg:grid-cols-3',
          )}
        >
          {/* ── Column 1: Avatar + Social ── */}
          <div className="md:row-span-2 md:col-span-1 flex flex-col gap-3">
            <AvatarCard magnet={magnet} />
            <SocialCard />
          </div>

          {/* ── Column 2: Bio + [Edu | Loc] + Organisasi ── */}
          <div className="md:col-span-2 flex flex-col gap-3">
            {/* Bio */}
            <BioCard />

            {/* Education + Location side by side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <EducationCard />
              <LocationCard />
            </div>

            {/* 🆕 Pengalaman Organisasi — full width column 2 */}
            <OrganizationCard />
          </div>
        </motion.div>

       

      </div>
    </section>
  )
}