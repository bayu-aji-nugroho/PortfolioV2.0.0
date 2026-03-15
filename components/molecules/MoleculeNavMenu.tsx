'use client'

/**
 * @atomic  MOLECULE
 * @file    molecules/MoleculeNavMenu.tsx
 * @summary Kelompok AtomNavLink dengan section label opsional.
 *          Mengelola active state via `activeId` prop.
 * @example
 *   <MoleculeNavMenu
 *     items={navItems}
 *     activeId="hero"
 *     collapsed={false}
 *   />
 */

import { AtomNavLink } from '@/components/atoms/AtomNavLink'

export interface NavItem {
  id:     string
  href:   string
  label:  string
  icon:   React.ReactNode
  badge?: number
}

export interface MoleculeNavMenuProps {
  items:       NavItem[]
  activeId?:   string
  collapsed?:  boolean
  animDelay?:  number
  onItemClick?: (id: string) => void
}

export function MoleculeNavMenu({
  items, activeId, collapsed = false, animDelay = 0, onItemClick,
}: MoleculeNavMenuProps) {
  return (
    <nav className="flex flex-col gap-1">
      {items.map((item, i) => (
        <AtomNavLink
          key={item.id}
          href={item.href}
          label={item.label}
          icon={item.icon}
          badge={item.badge}
          isActive={activeId === item.id}
          collapsed={collapsed}
          animDelay={animDelay + i * 0.06}
          onClick={() => onItemClick?.(item.id)}
        />
      ))}
    </nav>
  )
}