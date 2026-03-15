/**
 * @file    data/contact.data.tsx
 * @summary Contact platform data — consumed by OrganismContactSection.
 *          Replace href and handle values with your real details.
 *
 * NOTE: This file uses .tsx because it contains JSX (Lucide icon instances).
 *
 * @example
 *   import { contactData } from '@/data/contact.data'
 *   <OrganismContactSection contacts={contactData} />
 */

import { Mail, Github, Linkedin, Instagram } from 'lucide-react'
import type { CardAccent }                   from '@/components/molecules/MoleculeBentoCard'

/* ─── Type ───────────────────────────────────────────────── */

export interface ContactItem {
  /** Unique key */
  id:        string
  /** Display name shown on card */
  platform:  string
  /** Username, email, or URL shown as subtext */
  handle:    string
  /** Destination URL */
  href:      string
  /** Lucide icon instance — rendered inside the card */
  icon:      React.ReactNode
  /** Card accent glow color */
  accent:    CardAccent
}

/* ─── Data ───────────────────────────────────────────────── */

export const contactData: ContactItem[] = [
  {
    id:       'email',
    platform: 'Email',
    handle:   'yourname@email.com',        // ← ganti dengan email kamu
    href:     'mailto:yourname@email.com', // ← ganti dengan email kamu
    icon:     <Mail size={24} strokeWidth={1.8} />,
    accent:   'blue',
  },
  {
    id:       'github',
    platform: 'GitHub',
    handle:   '@yourusername',             // ← ganti dengan username GitHub kamu
    href:     'https://github.com/yourusername', // ← ganti
    icon:     <Github size={24} strokeWidth={1.8} />,
    accent:   'purple',
  },
  {
    id:       'linkedin',
    platform: 'LinkedIn',
    handle:   'Your Name',                 // ← ganti dengan nama LinkedIn kamu
    href:     'https://linkedin.com/in/yourusername', // ← ganti
    icon:     <Linkedin size={24} strokeWidth={1.8} />,
    accent:   'blue',
  },
  {
    id:       'instagram',
    platform: 'Instagram',
    handle:   '@yourusername',             // ← ganti dengan username Instagram kamu
    href:     'https://instagram.com/yourusername', // ← ganti
    icon:     <Instagram size={24} strokeWidth={1.8} />,
    accent:   'pink',
  },
]