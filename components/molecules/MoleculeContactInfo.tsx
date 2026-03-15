'use client'

/**
 * @atomic  MOLECULE
 * @file    molecules/MoleculeContactInfo.tsx
 * @summary Panel kiri section Contact: menampilkan heading, deskripsi,
 *          baris info kontak, badge status, dan social media links.
 *
 * @atoms-used
 *  - AtomInfoRow   — lokasi, email, availability info
 *  - AtomBadge     — status ketersediaan
 *  - AtomSocialLink — ikon sosial media
 *
 * @props
 *  data    — ContactInfoData (lihat interface di bawah)
 *  className — override class tambahan
 *
 * @example
 *  <MoleculeContactInfo data={contactInfoData} />
 */

import { motion } from 'framer-motion'
import {
  MapPin, Mail, Clock, Github, Linkedin, Twitter, Instagram,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import AtomInfoRow   from '@/components/atoms/MainSection/AtomInfoRow'
import AtomBadge     from '@/components/atoms/MainSection/AtomBadge'
import AtomSocialLink from '@/components/atoms/MainSection/AtomSocialLink'

/* ─── Types ─────────────────────────────────────────────── */
export interface SocialItem {
  platform: 'github' | 'linkedin' | 'twitter' | 'instagram'
  href:     string
  label:    string
}

export interface ContactInfoData {
  heading?:      string
  description?:  string
  location:      string
  email:         string
 
  socials:       SocialItem[]
}

interface MoleculeContactInfoProps {
  data:       ContactInfoData
  className?: string
}

/* ─── Social icon map ────────────────────────────────────── */
const socialIconMap: Record<SocialItem['platform'], React.ReactNode> = {
  github:    <Github    className="size-full" />,
  linkedin:  <Linkedin  className="size-full" />,
  twitter:   <Twitter   className="size-full" />,
  instagram: <Instagram className="size-full" />,
}

/* ─── Animation variants ─────────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
}

const itemVariants = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } },
}

/* ─── Component ─────────────────────────────────────────── */
export default function MoleculeContactInfo({
  data,
  className,
}: MoleculeContactInfoProps) {
  const {
    heading     = "Let's Work Together",
    description = "I'm currently open to new opportunities. Whether you have a project in mind, want to collaborate, or just want to say hi — my inbox is always open.",
    location,
    email,

    socials,
  } = data

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className={cn('flex flex-col gap-8', className)}
    >
      {/* Heading block */}
      <motion.div className="space-y-3">

        

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-bold text-text leading-tight tracking-tight">
          {heading}
        </h2>

        {/* Description */}
        <p className="text-sm text-text/55 leading-relaxed max-w-sm">
          {description}
        </p>
      </motion.div>

      {/* Divider */}
      <motion.div
        
        className="h-px w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent"
      />

      {/* Info rows */}
      <motion.div className="flex flex-col gap-3">
        <AtomInfoRow
          icon={<MapPin className="size-full" />}
          label={location}
          iconColor="blue"
          size="md"
        />
        <AtomInfoRow
          icon={<Mail className="size-full" />}
          label={email}
          iconColor="purple"
          size="md"
        />
       
      </motion.div>

      {/* Divider */}
      <motion.div
        
        className="h-px w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent"
      />

      {/* Social links */}
      <motion.div  className="flex flex-col gap-3">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-text/30">
          Find me on
        </span>
        <div className="flex flex-wrap gap-2">
          {socials.map((s) => (
            <AtomSocialLink
              key={s.platform}
              href={s.href}
              icon={socialIconMap[s.platform]}
              label={s.label}
              variant="pill"
              accent="white"
              size="sm"
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}