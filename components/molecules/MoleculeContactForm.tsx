'use client'

/**
 * @atomic  MOLECULE
 * @file    molecules/MoleculeContactForm.tsx
 * @summary Form kirim pesan pada section Contact: name, email, subject,
 *          message, dengan validasi sederhana dan send state.
 *
 * @atoms-used
 *  - AtomInput    — field name, email, subject
 *  - AtomTextarea — field message
 *  - AtomButton   — tombol send
 *
 * @props
 *  onSubmit  — async handler submit (menerima FormData), opsional override
 *  className — override class tambahan
 *
 * @example
 *  <MoleculeContactForm />
 *  <MoleculeContactForm onSubmit={async (d) => await sendEmail(d)} />
 */

'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Mail, Tag, Send, CheckCircle2, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import AtomInput    from '@/components/atoms/Contact/AtomInput'
import AtomTextarea from '@/components/atoms/Contact/AtomTextarea'
import { AtomButton } from '@/components/atoms/AtomButton'

/* ─── Types ─────────────────────────────────────────────── */
export interface ContactFormData {
  name:    string
  email:   string
  subject: string
  message: string
}

type SendStatus = 'idle' | 'loading' | 'success' | 'error'

interface MoleculeContactFormProps {
  onSubmit?:  (data: ContactFormData) => Promise<void>
  className?: string
}

/* ─── Helpers ────────────────────────────────────────────── */
const validate = (form: ContactFormData): Partial<Record<keyof ContactFormData, string>> => {
  const errs: Partial<Record<keyof ContactFormData, string>> = {}
  if (!form.name.trim())                            errs.name    = 'Name is required.'
  if (!form.email.trim())                           errs.email   = 'Email is required.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
                                                     errs.email   = 'Please enter a valid email.'
  if (!form.subject.trim())                         errs.subject = 'Subject is required.'
  if (form.message.trim().length < 10)              errs.message = 'Message must be at least 10 characters.'
  return errs
}

/* ─── Default submit (mock) ──────────────────────────────── */
const defaultSubmit = async (_: ContactFormData): Promise<void> => {
  await new Promise((r) => setTimeout(r, 1800))
  // In production: replace with your API call / EmailJS / Resend / etc.
}

/* ─── Component ─────────────────────────────────────────── */
export default function MoleculeContactForm({
  onSubmit  = defaultSubmit,
  className,
}: MoleculeContactFormProps) {
  const [form, setForm]     = useState<ContactFormData>({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({})
  const [status, setStatus] = useState<SendStatus>('idle')

  const set = (key: keyof ContactFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((p) => ({ ...p, [key]: e.target.value }))
      if (errors[key]) setErrors((p) => ({ ...p, [key]: undefined }))
    }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length) { setErrors(errs); return }

    setStatus('loading')
    try {
      await onSubmit(form)
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const isLoading = status === 'loading'

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
      className={cn(
        'relative rounded-2xl border border-white/[0.07] bg-card p-6 sm:p-8',
        'shadow-[0_8px_48px_rgba(0,0,0,0.25)]',
        className,
      )}
    >
      {/* Subtle top glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-px left-1/2 -translate-x-1/2 h-px w-2/3 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"
      />

      <AnimatePresence mode="wait">
        {/* ── Success state ── */}
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col items-center justify-center gap-4 py-12 text-center"
          >
            <span className="flex items-center justify-center size-14 rounded-full bg-emerald-500/15 text-emerald-400">
              <CheckCircle2 className="size-7" />
            </span>
            <div className="space-y-1.5">
              <p className="text-lg font-semibold text-text">Message sent!</p>
              <p className="text-sm text-text/50">I'll get back to you as soon as possible.</p>
            </div>
            <button
              onClick={() => setStatus('idle')}
              className="mt-2 text-xs text-blue-400 hover:underline transition-colors"
            >
              Send another message
            </button>
          </motion.div>

        ) : (
          /* ── Form state ── */
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            noValidate
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-4"
          >
            {/* Form heading */}
            <div className="mb-1">
              <h3 className="text-lg font-semibold text-text">Send a message [ngga berfungsi]</h3>
              <p className="text-xs text-text/40 mt-0.5">I typically respond within 24 hours.</p>
            </div>

            {/* Row: Name + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AtomInput
                label="Your name"
                name="name"
                type="text"
                value={form.name}
                onChange={set('name')}
                icon={<User className="size-full" />}
                error={errors.name}
                required
                animDelay={0.05}
              />
              <AtomInput
                label="Email address"
                name="email"
                type="email"
                value={form.email}
                onChange={set('email')}
                icon={<Mail className="size-full" />}
                error={errors.email}
                required
                animDelay={0.1}
              />
            </div>

            {/* Subject */}
            <AtomInput
              label="Subject"
              name="subject"
              type="text"
              value={form.subject}
              onChange={set('subject')}
              icon={<Tag className="size-full" />}
              error={errors.subject}
              required
              animDelay={0.15}
            />

            {/* Message */}
            <AtomTextarea
              label="Message"
              name="message"
              rows={5}
              maxLength={500}
              value={form.message}
              onChange={set('message')}
              error={errors.message}
              required
              animDelay={0.2}
            />

            {/* Error banner */}
            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2.5"
              >
                <AlertCircle className="size-4 shrink-0 text-red-400" />
                <p className="text-xs text-red-300">Something went wrong. Please try again.</p>
              </motion.div>
            )}

            {/* Submit */}
            <div className="pt-1">
              <AtomButton
                variant="primary"
                size="md"
                icon={<Send className="size-3.5" />}
                iconPosition="right"
                disabled={isLoading}
                fullWidth
                animDelay={0.25}
              >
                {isLoading ? 'Sending…' : 'Send Message'}
              </AtomButton>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  )
}