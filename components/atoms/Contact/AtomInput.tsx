'use client'

/**
 * @atomic  ATOM
 * @file    atoms/AtomInput.tsx
 * @summary Single-line text input dengan floating label, icon opsional,
 *          error state, dan focus animation.
 *
 * @props
 *  label         — floating label text (required)
 *  name          — input name attribute
 *  type          — input type: 'text' | 'email' | 'tel' | 'url', default 'text'
 *  placeholder   — placeholder text (tampil saat input kosong & tidak focus)
 *  value         — controlled value
 *  onChange      — change handler
 *  icon          — icon Lucide di kiri (ReactNode, opsional)
 *  error         — pesan error (string, opsional)
 *  disabled      — non-aktifkan input
 *  required      — tandai required
 *  className     — override class tambahan
 *  animDelay     — delay animasi masuk (detik)
 *
 * @example
 *  import { Mail } from 'lucide-react'
 *  <AtomInput label="Email" name="email" type="email" icon={<Mail />} required />
 */

import { useState, useId } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

/* ─── Types ─────────────────────────────────────────────── */
export type InputType = 'text' | 'email' | 'tel' | 'url'

export interface AtomInputProps {
  label:       string
  name?:       string
  type?:       InputType
  placeholder?: string
  value?:      string
  onChange?:   (e: React.ChangeEvent<HTMLInputElement>) => void
  icon?:       React.ReactNode
  error?:      string
  disabled?:   boolean
  required?:   boolean
  className?:  string
  animDelay?:  number
}

/* ─── Component ─────────────────────────────────────────── */
export default function AtomInput({
  label,
  name,
  type       = 'text',
  placeholder,
  value,
  onChange,
  icon,
  error,
  disabled   = false,
  required   = false,
  className,
  animDelay  = 0,
}: AtomInputProps) {
  const id              = useId()
  const [focused, setFocused] = useState(false)
  const hasValue        = (value ?? '').length > 0
  const isFloating      = focused || hasValue

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: animDelay, duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
      className={cn('relative w-full', className)}
    >
      {/* Input wrapper */}
      <div
        className={cn(
          'relative flex items-center w-full rounded-xl border transition-all duration-200',
          'bg-white/[0.03]',
          focused
            ? 'border-blue-500/50 shadow-[0_0_0_3px_rgba(59,130,246,0.08)]'
            : 'border-white/10 hover:border-white/20',
          error && 'border-red-500/50 hover:border-red-500/60',
          disabled && 'opacity-40 pointer-events-none',
        )}
      >
        {/* Left icon */}
        {icon && (
          <span
            className={cn(
              'absolute left-3.5 flex items-center justify-center size-4 transition-colors duration-200',
              focused ? 'text-blue-400' : 'text-text/30',
              error && 'text-red-400/70',
            )}
            aria-hidden
          >
            {icon}
          </span>
        )}

        {/* Floating label */}
        <label
          htmlFor={id}
          className={cn(
            'absolute transition-all duration-200 pointer-events-none select-none origin-left',
            icon ? 'left-9' : 'left-3.5',
            isFloating
              ? 'top-1.5 text-[10px] font-medium'
              : 'top-1/2 -translate-y-1/2 text-sm',
            focused
              ? 'text-blue-400'
              : isFloating
                ? 'text-text/40'
                : 'text-text/30',
            error && (isFloating ? 'text-red-400' : 'text-red-400/70'),
          )}
        >
          {label}{required && <span className="ml-0.5 text-red-400">*</span>}
        </label>

        {/* Actual input */}
        <input
          id={id}
          name={name}
          type={type}
          placeholder={focused ? placeholder : undefined}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={cn(
            'w-full bg-transparent text-sm text-text outline-none',
            'pt-5 pb-2 transition-colors duration-200',
            'placeholder:text-text/20',
            icon ? 'pl-9 pr-3.5' : 'pl-3.5 pr-3.5',
          )}
        />
      </div>

      {/* Error message */}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1.5 text-[11px] text-red-400 pl-1"
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  )
}