import clsx from 'classnames'
import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const floralPatternSvg = `
<svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="petalGradient" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f6dce3" />
      <stop offset="100%" stop-color="#f0c9cf" />
    </linearGradient>
    <linearGradient id="leafGradient" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="#b4c7b5" />
      <stop offset="100%" stop-color="#d8e3d0" />
    </linearGradient>
    <g id="floral">
      <path d="M60 200c0-25 18-48 42-56-8 18-4 40 10 54s36 18 54 10c-8 24-31 42-56 42-28 0-50-22-50-50z" fill="url(#petalGradient)" opacity="0.35" />
      <path d="M340 200c0 25-18 48-42 56 8-18 4-40-10-54s-36-18-54-10c8-24 31-42 56-42 28 0 50 22 50 50z" fill="url(#petalGradient)" opacity="0.35" />
      <path d="M200 60c25 0 48 18 56 42-18-8-40-4-54 10s-18 36-10 54c-24-8-42-31-42-56 0-28 22-50 50-50z" fill="url(#petalGradient)" opacity="0.25" />
      <path d="M200 340c-25 0-48-18-56-42 18 8 40 4 54-10s18-36 10-54c24 8 42 31 42 56 0 28-22 50-50 50z" fill="url(#petalGradient)" opacity="0.25" />
      <path d="M200 90c-12 20-34 32-57 31 9-12 24-20 41-22-15-9-34-11-51-6 10-17 28-28 48-28 8 0 15 1 19 3z" fill="url(#leafGradient)" opacity="0.3" />
      <path d="M200 310c12-20 34-32 57-31-9 12-24 20-41 22 15 9 34 11 51 6-10 17-28 28-48 28-8 0-15-1-19-3z" fill="url(#leafGradient)" opacity="0.3" />
    </g>
  </defs>
  <rect width="400" height="400" fill="none" />
  <use href="#floral" />
  <use href="#floral" transform="rotate(90 200 200)" />
</svg>`

function createPetalField(isOpen) {
  if (!isOpen) return []

  const count = 10 + Math.floor(Math.random() * 3)
  return Array.from({ length: count }).map((_, index) => ({
    id: `petal-${index}-${Math.random().toString(36).slice(2, 8)}`,
    left: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 6 + Math.random() * 5,
    size: 14 + Math.random() * 12,
    opacity: 0.35 + Math.random() * 0.35,
    drift: (Math.random() - 0.5) * 40,
    rotation: (Math.random() - 0.5) * 160,
  }))
}

export default function WeddingInvitation({ className = '' }) {
  const [isOpen, setIsOpen] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const backgroundImage = useMemo(
    () => `url("data:image/svg+xml,${encodeURIComponent(floralPatternSvg)}")`,
    []
  )

  const petals = useMemo(() => createPetalField(isOpen), [isOpen])

  return (
    <div className={clsx('relative mx-auto w-full max-w-4xl', className)}>
      <div className="relative aspect-[3/2] w-full" style={{ perspective: '1600px' }}>
        <div
          className="absolute inset-0 overflow-hidden rounded-[40px] border-2 border-cinnabar/25 bg-ivory/95 shadow-soft"
        >
          <div
            aria-hidden
            className="absolute inset-0 opacity-30 mix-blend-multiply"
            style={{ backgroundImage, backgroundSize: '320px', backgroundPosition: 'center' }}
          />

          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="card"
                className="relative flex h-full flex-col justify-between px-6 py-8 text-stone-700 sm:px-8 sm:py-10 md:px-12 md:py-14"
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -16 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <div>
                  <motion.h2
                    className="text-center font-serif text-3xl text-cinnabar sm:text-4xl md:text-5xl"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 1.2, ease: 'easeOut' }}
                  >
                    趙國宏 ＆ 莊雨瑄
                  </motion.h2>
                  <motion.p
                    className="mt-3 text-center font-script text-xl text-cinnabar/90 sm:text-2xl"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.55, duration: 1.2, ease: 'easeOut' }}
                  >
                    We are getting married!
                  </motion.p>
                  <p className="mt-4 text-center text-sm font-serif uppercase tracking-[0.35em] text-cinnabar/75 sm:text-base">
                    Wedding Invitation
                  </p>
                </div>

                <div className="mt-8 grid flex-1 gap-6 md:grid-cols-2 md:gap-10">
                  <div className="space-y-6">
                    <div className="rounded-3xl border border-cinnabar/15 bg-white/80 p-5 shadow-soft backdrop-blur">
                      <h3 className="text-base font-serif text-cinnabar sm:text-lg">新人</h3>
                      <p className="mt-2 text-xl font-serif text-stone-800 sm:text-2xl">趙國宏 ＆ 莊雨瑄</p>
                      <p className="mt-2 text-base font-serif text-stone-600 sm:text-lg">
                        攜手步向人生新章節，誠摯邀請您共享喜悅。
                      </p>
                    </div>
                    <div className="space-y-4 rounded-3xl border border-cinnabar/15 bg-white/80 p-5 shadow-soft backdrop-blur">
                      <div>
                        <h3 className="text-base font-serif text-cinnabar sm:text-lg">男方父母</h3>
                        <p className="mt-1 text-base font-serif text-stone-700 sm:text-lg">趙坤德、廖品淳</p>
                      </div>
                      <div>
                        <h3 className="text-base font-serif text-cinnabar sm:text-lg">女方父母</h3>
                        <p className="mt-1 text-base font-serif text-stone-700 sm:text-lg">莊全立、吳美賢</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="rounded-3xl border border-cinnabar/15 bg-white/80 p-5 shadow-soft backdrop-blur">
                      <h3 className="text-base font-serif text-cinnabar sm:text-lg">第一場・台中</h3>
                      <ul className="mt-3 space-y-3 text-base font-serif text-stone-700 sm:text-lg">
                        <li className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-2">
                          <span className="text-sm uppercase tracking-[0.3em] text-cinnabar/80 sm:w-20 sm:text-base">日期</span>
                          <span>114/11/29（星期六）</span>
                        </li>
                        <li className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-2">
                          <span className="text-sm uppercase tracking-[0.3em] text-cinnabar/80 sm:w-20 sm:text-base">時間</span>
                          <span>中午 12:00（需再確認是否為 12:30）</span>
                        </li>
                        <li className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-2">
                          <span className="text-sm uppercase tracking-[0.3em] text-cinnabar/80 sm:w-20 sm:text-base">地點</span>
                          <span>臻愛花園飯店</span>
                        </li>
                        <li className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-2">
                          <span className="text-sm uppercase tracking-[0.3em] text-cinnabar/80 sm:w-20 sm:text-base">地址</span>
                          <span>台中市烏日區高鐵路三段 168 號</span>
                        </li>
                      </ul>
                    </div>
                    <div className="rounded-3xl border border-cinnabar/15 bg-white/80 p-5 shadow-soft backdrop-blur">
                      <h3 className="text-base font-serif text-cinnabar sm:text-lg">第二場・嘉義</h3>
                      <ul className="mt-3 space-y-3 text-base font-serif text-stone-700 sm:text-lg">
                        <li className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-2">
                          <span className="text-sm uppercase tracking-[0.3em] text-cinnabar/80 sm:w-20 sm:text-base">日期</span>
                          <span>114/11/30（星期日）</span>
                        </li>
                        <li className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-2">
                          <span className="text-sm uppercase tracking-[0.3em] text-cinnabar/80 sm:w-20 sm:text-base">時間</span>
                          <span>12:00 入席</span>
                        </li>
                        <li className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-2">
                          <span className="text-sm uppercase tracking-[0.3em] text-cinnabar/80 sm:w-20 sm:text-base">地點</span>
                          <span>晶饌會館</span>
                        </li>
                        <li className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-2">
                          <span className="text-sm uppercase tracking-[0.3em] text-cinnabar/80 sm:w-20 sm:text-base">地址</span>
                          <span>嘉義市西區友忠路 508 號</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <p className="text-base font-serif uppercase tracking-[0.25em] text-cinnabar/80 sm:text-lg">Eternal Love</p>
                  <p className="mt-3 text-lg font-script text-stone-700 sm:text-xl">We sincerely invite you to celebrate with us</p>
                </div>
              </motion.div>
            ) : (
              <motion.button
                key="cover"
                type="button"
                onClick={() => setIsOpen(true)}
                className="absolute inset-0 flex flex-col items-center justify-center gap-5 rounded-[40px] bg-white/70 px-6 text-cinnabar backdrop-blur-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cinnabar/70"
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -20 }}
                transition={{ duration: 0.5, ease: [0.25, 0.8, 0.25, 1] }}
                aria-label="開啟婚禮邀請卡"
              >
                <span className="text-center font-serif text-4xl text-cinnabar md:text-5xl">趙國宏 ＆ 莊雨瑄</span>
                <span className="font-script text-xl text-cinnabar/80 md:text-2xl">Tap to open the invitation</span>
                <span className="text-sm font-serif uppercase tracking-[0.4em] text-cinnabar/70">Wedding Invitation</span>
              </motion.button>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isOpen && (
              <motion.button
                type="button"
                onClick={() => setIsOpen(false)}
                className="absolute top-4 left-4 z-[9999] flex items-center gap-1 cursor-pointer text-cinnabar/80 hover:text-cinnabar focus:outline-none focus-visible:ring-2 focus-visible:ring-cinnabar/50"
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -10 }}
                transition={{ duration: 0.25, ease: 'easeOut', delay: 0.2 }}
              >
                <span aria-hidden className="text-lg">←</span>
                <span className="text-sm font-sans tracking-wide">返回封面</span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          className="pointer-events-none absolute left-1/2 top-[6%] z-30 h-[58%] w-[86%] -translate-x-1/2 bg-gradient-to-b from-rose-100/95 via-ivory/90 to-ivory/95"
          style={{ transformOrigin: 'top center', clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}
          animate={isOpen ? { rotateX: -150, y: prefersReducedMotion ? 0 : -12, opacity: 1 } : { rotateX: 0, y: 0, opacity: 1 }}
          transition={{ duration: prefersReducedMotion ? 0.3 : 0.8, ease: [0.18, 0.88, 0.32, 1] }}
        >
          <div className="h-full w-full border border-cinnabar/25 shadow-soft" />
        </motion.div>

        <div className="absolute inset-x-[6%] bottom-[6%] z-20 h-[42%] rounded-[32px] border border-cinnabar/25 bg-white/60 shadow-soft" />

        <AnimatePresence>
          {isOpen && !prefersReducedMotion && (
            <motion.div
              className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              {petals.map((petal) => (
                <motion.span
                  key={petal.id}
                  className="absolute block rounded-full bg-rose-200/80 blur-sm"
                  style={{
                    left: `${petal.left}%`,
                    width: `${petal.size}px`,
                    height: `${petal.size}px`,
                    opacity: petal.opacity,
                  }}
                  initial={{ y: '-15vh', x: 0, rotate: 0, opacity: 0 }}
                  animate={{ y: '110vh', x: petal.drift, rotate: petal.rotation, opacity: 1 }}
                  transition={{
                    delay: petal.delay,
                    duration: petal.duration,
                    ease: 'linear',
                    repeat: Infinity,
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
