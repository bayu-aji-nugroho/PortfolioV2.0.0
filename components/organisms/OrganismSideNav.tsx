'use client'

/**
 * @atomic  ORGANISM
 * @file    organisms/OrganismSideNav.tsx
 * @summary Side navigation bar — fixed kiri, collapsible di mobile.
 *          Desktop: 240px fixed. Mobile: overlay slide-in via hamburger.
 *          Active section di-track via IntersectionObserver.
 *
 * @depends AtomLogo, AtomNavLink, MoleculeNavMenu
 *
 * INTEGRASI:
 *   1. Wrap page dalam flex:  <div className="flex">
 *   2. Tambah offset kiri:    <main className="flex-1 lg:ml-[240px]">
 *   3. Mount sekali di layout.tsx
 */

'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home,  Mail, Layers, Menu, X, Github, Linkedin, Twitter,
  Wrench,Waypoints,
} from 'lucide-react'
import { AtomLogo }         from '@/components/atoms/AtomLogo'
import { MoleculeNavMenu }  from '@/components/molecules/MoleculeNavMenu'
import type { NavItem }     from '@/components/molecules/MoleculeNavMenu'
import { cn }               from '@/lib/utils'
import DATA from '@/app/src/data'


// ─── Default Nav Items ────────────────────────────────────────────────────────

const DEFAULT_NAV_ITEMS: NavItem[] = [
  { id: 'home',       href: '#home',       label: 'Home',       icon: <Home      className="h-4 w-4"/> },
  { id: 'skills',      href: '#skills',      label: 'Skills',     icon: <Wrench      className="h-4 w-4"/> },
  { id: 'myjourney',   href: '#myjourney',   label: 'My journey', icon: <Waypoints className="h-4 w-4"/> },
  { id: 'project',     href: '#project',     label: 'Project',    icon: <Layers    className="h-4 w-4"/> },
  { id: 'contact',    href: '#contact',    label: 'Contact',    icon: <Mail      className="h-4 w-4"/> },
]

// ─── Types ────────────────────────────────────────────────────────────────────

export interface OrganismSideNavProps {
  wordmark?:    string
  navItems?:    NavItem[]
  githubHref?:  string
  linkedinHref?: string
  twitterHref?: string
}

// ─── Component ───────────────────────────────────────────────────────────────

export function OrganismSideNav({
  wordmark     = DATA.nama,
  navItems     = DEFAULT_NAV_ITEMS,
  githubHref   = '#',
  linkedinHref = '#',
  twitterHref  = '#',
}: OrganismSideNavProps) {
  const [activeId,    setActiveId]    = useState<string>('hero')
  const [mobileOpen,  setMobileOpen]  = useState(false)

  // ── IntersectionObserver untuk track section aktif ────────────────────────
  useEffect(() => {
  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      // Kita anggap section aktif jika sedang menyentuh area tengah layar
      if (entry.isIntersecting) {
        setActiveId(entry.target.id);
      }
    });
  };

  const observerOptions = {
    root: null,
    // rootMargin: 'atas kanan bawah kiri'
    // -40% di atas dan bawah artinya kita hanya mendeteksi section 
    // yang berada di 20% area tengah layar (viewport).
    rootMargin: '-40% 0px -40% 0px', 
    threshold: 0, 
  };

  const observer = new IntersectionObserver(handleObserver, observerOptions);

  // Ambil semua element <section> yang memiliki ID
  const sections = document.querySelectorAll('section[id]');
  sections.forEach((section) => observer.observe(section));

  return () => observer.disconnect();
}, []);

  // ── Close mobile on resize ────────────────────────────────────────────────
  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 1024) setMobileOpen(false) }
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  // ── Nav content (shared desktop/mobile) ──────────────────────────────────
  const NavContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-4 py-6 border-b border-white/[0.06]">
        <AtomLogo wordmark={wordmark} animDelay={0.1}/>
      </div>

      {/* Nav links */}
      <div className="flex-1 px-3 py-6 overflow-y-auto">
        <MoleculeNavMenu
          items={navItems}
          activeId={activeId}
          animDelay={0.2}
          onItemClick={() => setMobileOpen(false)}
        />
      </div>

      {/* Bottom — socials + divider */}
      <div className="px-4 py-5 border-t border-white/[0.06] space-y-4">
        {/* Social icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="flex items-center gap-2"
        >
          {[
            { href: githubHref,   icon: <Github   className="h-3.5 w-3.5"/>, label: 'GitHub'   },
            { href: linkedinHref, icon: <Linkedin className="h-3.5 w-3.5"/>, label: 'LinkedIn' },
            { href: twitterHref,  icon: <Twitter  className="h-3.5 w-3.5"/>, label: 'Twitter'  },
          ].map(s => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-text/30 hover:text-text/70 hover:bg-white/5 transition-all duration-200"
            >
              {s.icon}
            </a>
          ))}
        </motion.div>

        {/* Tiny credit */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="text-[10px] text-text/20 font-mono"
        >
          © {new Date().getFullYear()} {wordmark}
        </motion.p>
      </div>
    </div>
  )

  return (
    <>
      {/* ── DESKTOP sidebar ───────────────────────────────────────────────── */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-[240px] flex-col bg-second/80 backdrop-blur-xl border-r border-white/[0.06] z-40">
        <NavContent/>
      </aside>

      {/* ── MOBILE hamburger trigger ──────────────────────────────────────── */}
      <button
        onClick={() => setMobileOpen(v => !v)}
        aria-label="Toggle navigation"
        className={cn(
          'lg:hidden fixed z-50 top-4 left-4',
          'p-2.5 rounded-xl border border-white/10 bg-second/90 backdrop-blur-md',
          'text-text/60 hover:text-text transition-colors duration-200',
        )}
      >
        {mobileOpen ? <X className="h-4 w-4"/> : <Menu className="h-4 w-4"/>}
      </button>

      {/* ── MOBILE overlay sidebar ────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            />
            {/* Panel */}
            <motion.aside
              key="panel"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 32 }}
              className="lg:hidden fixed left-0 top-0 h-screen w-[240px] z-50 bg-second border-r border-white/[0.06]"
            >
              <NavContent/>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}