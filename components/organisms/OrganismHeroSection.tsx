'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export interface OrganismHeroSectionProps {
  className?:    string
}


const TECH_LOGOS = [
  { name: 'React',      color: '#61DAFB', bg: 'rgba(97,218,251,0.1)',   border: 'rgba(97,218,251,0.2)',   symbol: '⚛' },
  { name: 'Next.js',    color: '#ffffff', bg: 'rgba(255,255,255,0.08)', border: 'rgba(255,255,255,0.15)', symbol: '▲' },
  { name: 'TypeScript', color: '#3178C6', bg: 'rgba(49,120,198,0.15)',  border: 'rgba(49,120,198,0.3)',   symbol: 'TS' },
  { name: 'Tailwind',   color: '#38BDF8', bg: 'rgba(56,189,248,0.1)',   border: 'rgba(56,189,248,0.25)',  symbol: '~' },
  { name: 'Framer',     color: '#BB4AF5', bg: 'rgba(187,74,245,0.1)',   border: 'rgba(187,74,245,0.25)',  symbol: 'F' },
  { name: 'Node.js',    color: '#84CC16', bg: 'rgba(132,204,22,0.1)',   border: 'rgba(132,204,22,0.2)',   symbol: '⬡' },
  { name: 'Git',        color: '#F97316', bg: 'rgba(249,115,22,0.1)',   border: 'rgba(249,115,22,0.2)',   symbol: '⌥' },
  { name: 'Figma',      color: '#F24E1E', bg: 'rgba(242,78,30,0.1)',    border: 'rgba(242,78,30,0.2)',    symbol: '◈' },
]

// Logo positions — randomly scattered but visually balanced
const LOGO_POSITIONS = [
  { x: '8%',  y: '22%' }, { x: '18%', y: '68%' }, { x: '32%', y: '15%' },
  { x: '48%', y: '72%' }, { x: '62%', y: '18%' }, { x: '72%', y: '62%' },
  { x: '82%', y: '30%' }, { x: '88%', y: '75%' },
]

function IntroOverlay({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<1 | 2 | 3 | 4>(1)

  useEffect(() => {
    const t2 = setTimeout(() => setPhase(2), 1000)
    const t3 = setTimeout(() => setPhase(3), 2100)
    const t4 = setTimeout(() => setPhase(4), 3200)
    const td = setTimeout(() => onDone(),   3900)
    return () => [t2, t3, t4, td].forEach(clearTimeout)
  }, [onDone])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#020509] overflow-hidden"
      animate={phase === 4 ? { opacity: 0, filter: 'blur(20px)', scale: 1.04 } : {}}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* ── Dot grid bg ─────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: 'radial-gradient(circle, #4f9cff 1px, transparent 1px)',
          backgroundSize:  '36px 36px',
        }}
        aria-hidden
      />

      {/* ── Radial glow center ──────────────────────────────────────────── */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(79,156,255,0.08) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      />

      <div className="relative z-10 text-center space-y-3 px-8">
        {/* "Welcome to my" — word stagger */}
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {['Welcome', 'to', 'my'].map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
              animate={{ opacity: phase >= 1 ? 1 : 0, y: phase >= 1 ? 0 : 30, filter: 'blur(0px)' }}
              transition={{ delay: 0.15 + i * 0.12, duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
              className="text-3xl sm:text-4xl md:text-5xl font-light text-white/60 tracking-tight"
            >
              {word}
            </motion.span>
          ))}
        </div>

        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: phase >= 2 ? '0%' : '110%', opacity: phase >= 2 ? 1 : 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight"
            style={{
              backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #93c5fd 40%, #a78bfa 70%, #f0abfc 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Portfolio Website
          </motion.h1>
        </div>

        <motion.div
          className="flex items-center justify-center gap-3"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: phase >= 2 ? 1 : 0, scaleX: phase >= 2 ? 1 : 0 }}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-blue-400/50"/>
          <motion.span
            className="font-mono text-xs text-blue-400/60 tracking-[0.3em] uppercase"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Loading
          </motion.span>
          <div className="h-px w-20 bg-gradient-to-l from-transparent to-blue-400/50"/>
        </motion.div>
      </div>

      {TECH_LOGOS.map((logo, i) => (
        <motion.div
          key={logo.name}
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={phase >= 3 ? {
            opacity: [0, 0.9, 0.7],
            scale:   [0.5, 1.05, 1],
            y:       [20, -5, 0],
          } : { opacity: 0 }}
          transition={{
            delay:    i * 0.08,
            duration: 0.6,
            ease:     [0.23, 1, 0.32, 1],
          }}
          className="absolute flex flex-col items-center gap-1.5 pointer-events-none"
          style={{ left: LOGO_POSITIONS[i].x, top: LOGO_POSITIONS[i].y }}
        >
        
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8 + i * 1.5, repeat: Infinity, ease: 'linear' }}
            className="absolute w-12 h-12 rounded-full border border-dashed opacity-20"
            style={{ borderColor: logo.color }}
          />
         
          <div
            className="px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5"
            style={{ background: logo.bg, borderColor: logo.border, color: logo.color }}
          >
            <span className="text-sm">{logo.symbol}</span>
            <span>{logo.name}</span>
          </div>
        </motion.div>
      ))}

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-48">
        <div className="h-0.5 w-full rounded-full bg-white/5 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 3.8, ease: 'linear' }}
          />
        </div>
      </div>
    </motion.div>
  )
}

export function OrganismHeroSection({className}: OrganismHeroSectionProps) {
  const [ready, setReady] = useState(false)
  return (
    <section
      id="hero"
      aria-label="Hero section"
      className={`relative min-h-screen bg-tema overflow-hidden ${className ?? ''}`}
    >
      <AnimatePresence>
        {!ready && <IntroOverlay onDone={() => setReady(true)}/>}
      </AnimatePresence>
    </section>
  )
}