import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import WeddingInvitation from './WeddingInvitation'

export default function WeddingInvitationModal({ open, onClose }) {
  const closeButtonRef = useRef(null)

  useEffect(() => {
    if (!open) return

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, onClose])

  useEffect(() => {
    if (open && closeButtonRef.current) {
      closeButtonRef.current.focus({ preventScroll: true })
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="婚禮資訊"
            className="relative w-full max-w-4xl"
            initial={{ opacity: 0, scale: 0.9, rotateX: -12 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.92, rotateX: 6 }}
            transition={{ type: 'spring', stiffness: 120, damping: 18 }}
            style={{ transformPerspective: 1400 }}
            onClick={(event) => event.stopPropagation()}
          >
            <WeddingInvitation className="overflow-visible" />
            <motion.button
              ref={closeButtonRef}
              type="button"
              className="absolute -right-3 -top-3 rounded-full bg-cinnabar text-white shadow-lg transition hover:bg-cinnabar/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/90 focus-visible:ring-offset-2 focus-visible:ring-offset-cinnabar"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 250, damping: 20, delay: 0.1 }}
              onClick={onClose}
            >
              <span className="block px-3 py-2 text-sm font-serif tracking-wide">關閉</span>
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
