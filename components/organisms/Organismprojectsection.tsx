'use client'

/**
 * @atomic   ORGANISM
 * @file     organisms/OrganismProjectSection.tsx
 * @summary  Full "Projects" section — section header, animated filter tabs,
 *           and a responsive bento grid of MoleculeProjectCard.
 *
 *           Layout strategy (hole-free):
 *             Featured cards  → dedicated 2-column grid (always fills rows evenly)
 *             Regular cards   → dedicated 3-column grid (sm:2col / lg:3col)
 *             Both sub-grids are separated so col-span never creates orphan holes.
 *
 *           Responsive breakpoints:
 *             Mobile  (<sm)  : 1 column for both grids
 *             Tablet  (sm)   : featured 2-col, regular 2-col
 *             Desktop (lg+)  : featured 2-col, regular 3-col
 *
 *           Filter behaviour:
 *             • "All" shows every project
 *             • Category pills derived automatically from project data
 *             • Filtered cards animate in/out with AnimatePresence
 *
 * @depends
 *   MoleculeProjectCard   — individual project card
 *   MoleculeProjectFilter — animated filter pill tabs
 *
 * @props
 *   heading     — section title            (default: "Projects")
 *   subheading  — section subtitle
 *   projects    — array of ProjectItem
 *   className   — override class
 *
 * @example
 *   <OrganismProjectSection
 *     heading="Projects"
 *     subheading="Things I've built"
 *     projects={projectsData}
 *   />
 */

import { useState, useMemo }        from 'react'
import { motion, AnimatePresence }  from 'framer-motion'
import { Layers }                   from 'lucide-react'
import { MoleculeProjectCard }      from '@/components/molecules/Moleculeprojectcard'
import { MoleculeProjectFilter }    from '@/components/molecules/Moleculeprojectfilter'
import { cn }                       from '@/lib/utils'
import type { ProjectItem }         from '@/app/src/Projects.data'

/* ─── Types ─────────────────────────────────────────────── */

export interface OrganismProjectSectionProps {
  heading?:    string
  subheading?: string
  projects:    ProjectItem[]
  className?:  string
}


/* ─── Sub-component: animated card wrapper ───────────────── */

function AnimatedCard({
  project,
  index,
}: {
  project: ProjectItem
  index:   number
}) {
  return (
    <motion.div
      key={project.id}
      custom={index}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
      className="h-full"
    >
      <MoleculeProjectCard {...project} animDelay={0} />
    </motion.div>
  )
}

/* ─── Component ─────────────────────────────────────────── */

export function OrganismProjectSection({
  heading    = 'Projects',
  subheading,
  projects,
  className,
}: OrganismProjectSectionProps) {

  /* Derive unique categories from project data */
  const categories = useMemo<string[]>(() => {
    const set = new Set(projects.map((p) => p.category))
    return Array.from(set)
  }, [projects])

  const [activeCategory, setActiveCategory] = useState<string>('All')

  /* Filtered list */
  const filtered = useMemo<ProjectItem[]>(() => {
    if (activeCategory === 'All') return projects
    return projects.filter((p) => p.category === activeCategory)
  }, [projects, activeCategory])

  /* Split into featured vs regular to prevent grid holes */
  const featuredCards = filtered.filter((p) => p.featured)
  const regularCards  = filtered.filter((p) => !p.featured)

  const hasAny      = filtered.length > 0
  const hasFeatured = featuredCards.length > 0
  const hasRegular  = regularCards.length > 0

  return (
    <section
      className={cn('w-full p-10', className)}
      aria-labelledby="project-section-heading"
    >
     

        <div className="space-y-2 mb-15">
        <span className="text-text/40 text-xs font-semibold tracking-[0.25em] uppercase">
            Portfolio Highlights
        </span>
        <h2 className="text-text font-bold text-2xl sm:text-3xl tracking-tight">
            Project
        </h2>
        </div>

      {/* ── Filter tabs ────────────────────────────────── */}
      <MoleculeProjectFilter
        categories={categories}
        active={activeCategory}
        onChange={setActiveCategory}
        className="mb-6"
      />

      {/* ── Bento grid ─────────────────────────────────── */}
      <AnimatePresence mode="popLayout">

        {/* Empty state */}
        {!hasAny && (
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="flex flex-col items-center justify-center py-20 gap-3"
          >
            <span className="text-text/20 text-5xl select-none" aria-hidden>🗂</span>
            <p className="text-text/30 text-sm">No projects in this category.</p>
          </motion.div>
        )}

        {/* ── Featured row — always 2 columns, no holes ── */}
        {hasFeatured && (
          <motion.div
            key="featured-grid"
            layout
            className={cn(
              'grid gap-4',
              'grid-cols-1',
              'sm:grid-cols-2',
              hasRegular ? 'mb-4' : '',
            )}
          >
            {featuredCards.map((project, i) => (
              <AnimatedCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        )}

        {/* ── Regular grid — 1 / 2 / 3 columns ─────────── */}
        {hasRegular && (
          <motion.div
            key="regular-grid"
            layout
            className={cn(
              'grid gap-4',
              'grid-cols-1',
              'sm:grid-cols-2',
              'lg:grid-cols-3',
            )}
          >
            {regularCards.map((project, i) => (
              <AnimatedCard
                key={project.id}
                project={project}
                index={hasFeatured ? featuredCards.length + i : i}
              />
            ))}
          </motion.div>
        )}

      </AnimatePresence>
    </section>
  )
}