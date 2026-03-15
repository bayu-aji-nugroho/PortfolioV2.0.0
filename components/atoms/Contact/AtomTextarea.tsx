'use client'

/**
 * @atomic  ATOM
 * @file    atoms/AtomTextarea.tsx
 * @summary Multi-line textarea dengan floating label, karakter counter,
 *          auto-resize opsional, dan error state.
 *
 * @props
 *  label         — floating label text (required)
 *  name          — textarea name attribute
 *  placeholder   — placeholder text
 *  value         — controlled value
 *  onChange      — change handler
 *  rows          — jumlah baris default, default 4
 *  maxLength     — batas maksimal karakter (tampilkan counter)
 *  autoResize    — tinggi menyesuaikan konten otomatis
 *  error         — pesan error
 *  disabled      — non-aktifkan textarea
 *  required      — tandai required
 *  className     — override class tambahan
 *  animDelay     — delay animasi masuk (detik)
 *
 * @example
 *  <AtomTextarea label="Message" name="message" rows={5} maxLength={500} required />
 */

import { useState, useId, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

/* ─── Types ─────────────────────────────────────────────── */
export interface AtomTextareaProps {
  label:        string
  name?:        string
  placeholder?: string
  value?:       string
  onChange?:    (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  rows?:        number
  maxLength?:   number
  autoResize?:  boolean
  error?:       string
  disabled?:    boolean
  required?:    boolean
  className?:   string
  animDelay?:   number
}

/* ─── Component ─────────────────────────────────────────── */
export default function AtomTextarea({
  label,
  name,
  placeholder,
  value,
  onChange,
  rows       = 4,
  maxLength,
  autoResize = false,
  error,
  disabled   = false,
  required   = false,
  className,
  animDelay  = 0,
}: AtomTextareaProps) {
  const id                    = useId()
  const ref                   = useRef<HTMLTextAreaElement>(null)
  const [focused, setFocused] = useState(false)
  const charCount             = (value ?? '').length
  const hasValue              = charCount > 0
  const isFloating            = focused || hasValue

  /* Auto-resize logic */
  useEffect(() => {
    if (!autoResize || !ref.current) return
    ref.current.style.height = 'auto'
    ref.current.style.height = `${ref.current.scrollHeight}px`
  }, [value, autoResize])

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: animDelay, duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
      className={cn('relative w-full', className)}
    >
      {/* Textarea wrapper */}
      <div
        className={cn(
          'relative w-full rounded-xl border transition-all duration-200',
          'bg-white/[0.03]',
          focused
            ? 'border-blue-500/50 shadow-[0_0_0_3px_rgba(59,130,246,0.08)]'
            : 'border-white/10 hover:border-white/20',
          error && 'border-red-500/50 hover:border-red-500/60',
          disabled && 'opacity-40 pointer-events-none',
        )}
      >
        {/* Floating label */}
        <label
          htmlFor={id}
          className={cn(
            'absolute left-3.5 transition-all duration-200 pointer-events-none select-none origin-left',
            isFloating
              ? 'top-2 text-[10px] font-medium'
              : 'top-3.5 text-sm',
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

        {/* Actual textarea */}
        <textarea
          ref={ref}
          id={id}
          name={name}
          rows={rows}
          maxLength={maxLength}
          placeholder={focused ? placeholder : undefined}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={cn(
            'w-full bg-transparent text-sm text-text outline-none resize-none',
            'pt-6 pb-3 px-3.5 transition-colors duration-200',
            'placeholder:text-text/20',
            autoResize && 'overflow-hidden',
          )}
        />

        {/* Character counter */}
        {maxLength && (
          <div className="absolute bottom-2.5 right-3 pointer-events-none">
            <span
              className={cn(
                'text-[10px] tabular-nums transition-colors duration-200',
                charCount >= maxLength
                  ? 'text-red-400'
                  : charCount >= maxLength * 0.8
                    ? 'text-amber-400'
                    : 'text-text/25',
              )}
            >
              {charCount}/{maxLength}
            </span>
          </div>
        )}
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