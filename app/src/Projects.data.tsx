/**
 * @file    data/projects.data.ts
 * @summary Sample project data — replace with your actual projects.
 *          Import into OrganismProjectSection as the `projects` prop.
 *
 * @example
 *   import { projectsData } from '@/data/projects.data'
 *   <OrganismProjectSection projects={projectsData} />
 */

import type { CardAccent } from '@/components/molecules/MoleculeBentoCard'
import type { BadgeColor }  from '@/components/atoms/MainSection/AtomBadge'
 
/* ─── Link ──────────────────────────────────────────────── */
 
export type ProjectLinkType = 'github' | 'demo' | 'docs' | 'other'
 
export interface ProjectLink {
  /** Button label, e.g. "GitHub", "Live Demo" */
  label:    string
  href:     string
  /** Controls which Lucide icon is shown beside the label */
  type:     ProjectLinkType
}
 
/* ─── Project Item ───────────────────────────────────────── */
 
export interface ProjectItem {
  /** Unique identifier — used as React key */
  id:           string
  /** Project title displayed on the card */
  title:        string
  /** Short description, max ~120 chars. Rendered with line-clamp. */
  description?: string
  /**
   * Display date or range.
   * @example "Jan 2024" | "2023 – 2024" | "2024 – present"
   */
  date:         string
  /** Tech / knowledge tags rendered as AtomBadge chips */
  tags:         string[]
  /**
   * Category label used by the filter tabs.
   * @example "Web" | "Mobile" | "Robotics" | "Data"
   */
  category:     string
  /** Optional links shown as AtomButton at the card footer */
  links?:       ProjectLink[]
  /**
   * Featured cards span 2 columns in the bento grid (md+).
   * Use sparingly — 1 or 2 featured items per section looks best.
   */
  featured?:    boolean
  /** Card accent glow color, maps to MoleculeBentoCard accent prop */
  accent?:      CardAccent
  /** Color for the tech tag badges */
  tagColor?:    BadgeColor
}
 
/* ─── Section Props (re-exported for convenience) ───────── */
 
export interface ProjectSectionData {
  /** Section heading */
  heading?:   string
  /** Section sub-heading / description */
  subheading?: string
  /** Array of project items */
  projects:   ProjectItem[]
}
 
export const projectsData: ProjectItem[] = [
  /* ─────────────────────────────────────────
   * WEB
   * ───────────────────────────────────────── */
   {
    id:          'robocon-2025',
    title:       'ABU Robocon 2025 — Basketball',
    description:
      'Competitive robotics project for ABU Robocon 2025 with a basketball theme. My primary role focused on image processing — implementing computer vision to detect the ball, hoop, and field zones in real time.',
    date:        '2025',
    category:    'Robotics',
    tags:        ['Image Processing', 'OpenCV', 'Python', 'Computer Vision', "roboflow"],
    tagColor:    'amber',
    accent:      'amber',
    featured:    true,
   
  },
  {
    id:          'robocon-2026',
    title:       'ABU Robocon 2026 — Kung Fu',
    description:
      'Competitive robotics project for ABU Robocon 2026 with a kung fu theme. My primary role focused on robot movement — designing motion planning, trajectory control, and dynamic balance algorithms.',
    date:        '2026 – present',
    category:    'Robotics',
    tags:        ['Motion Planning', 'omnidirection movement', 'C++', 'PID control', 'IMU system',"Encoder sensor","esp32", "Serial Studio", "raspberry pi"],
    tagColor:    'pink',
    accent:      'pink',
    featured:    true,
    
  },
  {
    id:          'portfolio-v2',
    title:       'Personal Portfolio V2.0.0',
    description:
      'The latest iteration of my personal portfolio. Built with Next.js 15, Tailwind v4, Framer Motion, and Atomic Design architecture. Dark-themed bento grid layout with smooth micro-interactions.',
    date:        '2026 – present',
    category:    'Web',
    tags:        ['Next.js', 'TypeScript', 'Tailwind v4', 'Framer Motion', 'Atomic Design'],
    tagColor:    'blue',
    accent:      'blue',
    featured:    true,
    links: [
      { label: 'GitHub',    href: 'https://github.com/', type: 'github' },
      { label: 'Live Demo', href: 'https://example.com', type: 'demo'   },
    ],
  },
  {
    id:          'portfolio-v1',
    title:       'Personal Portfolio V1.0.0',
    description:
      'Second version of my portfolio — refined layout, improved performance, and cleaner component structure compared to V0.',
    date:        '2024',
    category:    'Web',
    tags:        ['Next.js', 'TypeScript', 'Tailwind'],
    tagColor:    'blue',
    accent:      'blue',
    links: [
      { label: 'GitHub', href: 'https://github.com/bayu-aji-nugroho/portfolioProject', type: 'github' },
      { label: 'Live Demo', href: 'https://myportfolio-bayu-aji-nugroho.vercel.app/', type: 'demo'   },
    ],
  },
  {
    id:          'portfolio-v0',
    title:       'Personal Portfolio V0.0.0',
    description:
      'The very first version of my personal portfolio. Where it all started — simple layout, static content, and the first step into frontend development.',
    date:        '2024',
    category:    'Web',
    tags:        ['HTML', 'Tailwind', 'JavaScript'],
    tagColor:    'slate',
    accent:      'none',
    links: [
      
    ],
  },
  {
    id:          'bermatematika',
    title:       'Bermatematika.com & neuro',
    description:
      'Educational mathematics website providing learning materials, exercises, and interactive content to help students understand math concepts more intuitively.',
    date:        '2025',
    category:    'Web',
    tags:        ['Next.js', 'JavaScript', 'Tailwind'],
    tagColor:    'green',
    accent:      'green',
    featured:    true,
    links: [
      { label: 'Visit Site', href: 'https://bermatematika.vercel.app/', type: 'demo'   },
      { label: 'GitHub',     href: 'https://github.com/bayu-aji-nugroho/Science-Project',       type: 'github' },
    ],
  },
  {
    id:          'dolphin',
    title:       'Dolphin',
    description:
      'An advanced Educational Progress Tracker designed to monitor and visualize student development. This software provides real-time insights into academic performance, attendance, and behavioral milestones, enabling educators to make data-driven decisions to enhance classroom outcomes.',
    date:        '2025 – present',
    category:    'Web',
    tags:        ['Next.js', 'TypeScript', 'Tailwind',"Atomic Design", "Framer motion",],
    tagColor:    'purple',
    accent:      'purple',
    featured:    true,
    links: [
      { label: 'GitHub', href: 'https://github.com/bayu-aji-nugroho/dolphin', type: 'github' },
      { label: 'Visit Site', href: 'https://vercel.com/bayu-aji-nugrohos-projects/dolphin', type: 'demo'   },
    ],
  },
 
  /* ─────────────────────────────────────────
   * Mobile
   * ───────────────────────────────────────── */
  {
    id:          'flutter-calculator',
    title:       'Calculator App',
    description:
      'A clean calculator application built with Flutter — my first dive into mobile development. Supports standard arithmetic operations with a minimal UI.',
    date:        '2022',
    category:    'Mobile',
    tags:        ['Flutter', 'Dart'],
    tagColor:    'cyan',
    accent:      'blue',
    
  },
 
  /* ─────────────────────────────────────────
   * Robotics
   * ───────────────────────────────────────── */
 
  {
    id:          'media-ajar-arduino',
    title:       'Energy Conversion Teaching Aid',
    description:
      'Arduino-based interactive teaching media for energy conversion concepts, designed for elementary school students. Makes abstract physics concepts tangible through hands-on hardware interaction.',
    date:        '2025',
    category:    'Robotics',
    tags:        ['Arduino', 'C++', 'Electronics', 'Education'],
    tagColor:    'green',
    accent:      'green',
    featured:    true,
    
  },
  {
    id:          'robot-mobil-esp32',
    title:       'ESP32 RC Car — PS4 Gamepad',
    description:
      'A self-built RC car using ESP32 connected wirelessly to a PS4 gamepad controller. Implements Bluetooth HID protocol for low-latency gamepad input mapping to motor control.',
    date:        '2025',
    category:    'Robotics',
    tags:        ['ESP32', 'C++', 'Bluetooth', 'PS4 Controller', 'Motor Control'],
    tagColor:    'purple',
    
  },
]