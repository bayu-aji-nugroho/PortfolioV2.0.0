'use client'

/**
 * @atomic  ORGANISM
 * @file    organisms/OrganismSectionContact.tsx
 * @summary Section lengkap "Contact Me" — layout dua kolom:
 *          kiri (info + sosial) dan kanan (form kirim pesan).
 *          Termasuk dekorasi background, ambient glow, dan animasi masuk.
 *
 * @molecules-used
 *  - MoleculeContactInfo — panel kiri
 *  - MoleculeContactForm — panel kanan
 *
 * @props
 *  data      — ContactInfoData (diteruskan ke MoleculeContactInfo)
 *  onSubmit  — async form handler (diteruskan ke MoleculeContactForm)
 *  id        — section id untuk anchor nav, default 'contact'
 *  className — override class tambahan
 *
 * @example
 *  <OrganismSectionContact data={contactData} />
 */

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import MoleculeContactInfo, { type ContactInfoData } from '@/components/molecules/MoleculeContactInfo'
import MoleculeContactForm,  { type ContactFormData } from '@/components/molecules/MoleculeContactForm'
import DATA from '@/app/src/data'

/* ─── Types ─────────────────────────────────────────────── */
interface OrganismSectionContactProps {
  data?:      ContactInfoData
  onSubmit?:  (data: ContactFormData) => Promise<void>
  id?:        string
  className?: string
}

/* ─── Dummy data (replace with real data) ────────────────── */
const dummyContactData: ContactInfoData = {
  heading:     "Let's Work Together",
  description: "I'm currently open to new opportunities. Whether you have a project in mind, want to collaborate, or just want to say hi — my inbox is always open.",
  location:    'Surakarta, Central Java, ID',
  email:       DATA.socials[4].href,
 
  socials: [
    { platform: 'github',    href: DATA.socials[0].href,    label: 'GitHub'    },
    { platform: 'linkedin',  href: DATA.socials[2].href, label: 'LinkedIn'  },
    { platform: 'twitter',   href: DATA.socials[3].href,   label: 'Twitter'   },
    { platform: 'instagram', href: DATA.socials[1].href, label: 'Instagram' },
  ],
}

/* ─── Component ─────────────────────────────────────────── */
export default function OrganismSectionContact({
  data      = dummyContactData,
  onSubmit,
  id        = 'contact',
  className,
}: OrganismSectionContactProps) {
  return (
    <section
      id={id}
      className={cn(
        'relative w-full overflow-hidden bg-tema py-24 sm:py-32',
        className,
      )}
    >
      {/* ── Background decoration ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 select-none">
        {/* Ambient glow left */}
        <div className="absolute -left-32 top-1/2 -translate-y-1/2 size-[480px] rounded-full bg-blue-600/5 blur-[120px]" />
        {/* Ambient glow right */}
        <div className="absolute -right-32 top-1/4 size-[360px] rounded-full bg-violet-600/5 blur-[100px]" />
        {/* Top fade */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-tema to-transparent" />
        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-tema to-transparent" />
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              linear-gradient(to right, white 1px, transparent 1px),
              linear-gradient(to bottom, white 1px, transparent 1px)
            `,
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      {/* ── Content container ── */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="mb-14 flex flex-col items-center gap-2 text-center"
        >
          <span className="inline-block rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-text/40">
            Contact
          </span>
          <div className="mt-1 h-px w-12 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </motion.div>

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 lg:items-start">
          {/* Left — Info */}
          <MoleculeContactInfo data={data} />

          {/* Right — Form */}
          <MoleculeContactForm onSubmit={onSubmit} />
        </div>
      </div>
    </section>
  )
}