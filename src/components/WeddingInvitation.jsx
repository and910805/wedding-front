import clsx from 'classnames'
import { useEffect, useMemo, useState } from 'react'
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

  useEffect(() => {
    if (typeof document === 'undefined') return undefined

    const { body } = document
    const previousOverflow = body.style.overflow

    if (isOpen) {
      body.style.overflow = 'hidden'
    }

    return () => {
      body.style.overflow = previousOverflow
    }
  }, [isOpen])

  return (
    <div className={clsx('relative mx-auto w-full max-w-3xl px-4 py-6 sm:max-w-4xl sm:px-6 md:max-w-5xl md:py-8 lg:max-w-6xl', className)}>
      <div className="relative aspect-[3/4] sm:aspect-[2/3] md:aspect-[4/5] lg:aspect-[1/1] w-full" style={{ perspective: '2000px' }}>
        <div
          className="absolute inset-0 overflow-hidden rounded-2xl sm:rounded-[32px] md:rounded-[40px] border-2 border-cinnabar/30 bg-ivory/95 shadow-2xl"
        >
          <div
            aria-hidden
            className="absolute inset-0 opacity-20 mix-blend-multiply"
            style={{ backgroundImage, backgroundSize: '400px', backgroundPosition: 'center' }}
          />

          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="card"
                className="relative flex h-full flex-col overflow-hidden px-6 py-6 text-stone-700 sm:px-8 sm:py-8 md:px-10 md:py-10 lg:px-12 lg:py-12"
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -16 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex-1 overflow-y-auto pr-2 sm:pr-4 md:overflow-y-visible md:pr-0">
                  <div className="pb-4 sm:pb-6 md:pb-4">
                    <motion.h2
                      className="text-center font-serif text-2xl text-cinnabar sm:text-3xl md:text-3xl lg:text-4xl"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4, duration: 1.2, ease: 'easeOut' }}
                    >
                      趙國宏 ＆ 莊雨瑄
                    </motion.h2>
                    <motion.p
                      className="mt-2 text-center font-script text-lg text-cinnabar/90 sm:text-xl md:text-xl"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.55, duration: 1.2, ease: 'easeOut' }}
                    >
                      We are getting married!
                    </motion.p>
                    <p className="mt-2 text-center text-xs font-serif uppercase tracking-[0.35em] text-cinnabar/75 sm:text-sm md:text-sm">
                      Wedding Invitation
                    </p>

                    <div className="mt-4 grid gap-3 md:grid-cols-2 md:gap-4 lg:gap-5 lg:mt-5">
                      <div className="space-y-3 md:space-y-3">
                        <div className="rounded-3xl bg-transparent p-3 shadow-none md:p-4">
                          <h3 className="text-sm font-serif text-cinnabar sm:text-base md:text-base">新人</h3>
                          <p className="mt-1 text-lg font-serif text-stone-800 sm:text-xl md:text-xl">趙國宏 ＆ 莊雨瑄</p>
                          <p className="mt-1 text-sm font-serif text-stone-600 sm:text-base md:text-base">
                            攜手步向人生新章節，誠摯邀請您共享喜悅。
                          </p>
                        </div>
                        <div className="space-y-2 rounded-3xl border border-cinnabar/15 bg-white/80 p-3 shadow-soft backdrop-blur md:space-y-2 md:p-4">
                          <div>
                            <h3 className="text-sm font-serif text-cinnabar sm:text-base md:text-base">男方父母</h3>
                            <p className="mt-1 text-sm font-serif text-stone-700 sm:text-base md:text-base">趙坤德、廖品淳</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-serif text-cinnabar sm:text-base md:text-base">女方父母</h3>
                            <p className="mt-1 text-sm font-serif text-stone-700 sm:text-base md:text-base">莊全立、吳美賢</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3 md:space-y-3">
                        <div className="rounded-3xl border border-cinnabar/15 bg-white/80 p-3 shadow-soft backdrop-blur md:p-4">
                          <h3 className="text-sm font-serif text-cinnabar sm:text-base md:text-base">第一場・台中</h3>
                          <ul className="mt-2 space-y-1.5 text-sm font-serif text-stone-700 sm:text-base md:space-y-2 md:text-base">
                            <li className="flex items-baseline gap-2">
                              <span className="text-xs uppercase tracking-[0.3em] text-cinnabar/80 w-14 flex-shrink-0 sm:text-sm sm:w-16 md:text-sm md:w-16">日期</span>
                              <span>114/11/29（星期六）</span>
                            </li>
                            <li className="flex items-baseline gap-2">
                              <span className="text-xs uppercase tracking-[0.3em] text-cinnabar/80 w-14 flex-shrink-0 sm:text-sm sm:w-16 md:text-sm md:w-16">時間</span>
                              <span>中午 12:00（需再確認是否為 12:30）</span>
                            </li>
                            <li className="flex items-baseline gap-2">
                              <span className="text-xs uppercase tracking-[0.3em] text-cinnabar/80 w-14 flex-shrink-0 sm:text-sm sm:w-16 md:text-sm md:w-16">地點</span>
                              <span>臻愛花園飯店</span>
                            </li>
                            <li className="flex items-baseline gap-2">
                              <span className="text-xs uppercase tracking-[0.3em] text-cinnabar/80 w-14 flex-shrink-0 sm:text-sm sm:w-16 md:text-sm md:w-16">地址</span>
                              <span>台中市烏日區高鐵路三段 168 號</span>
                            </li>
                          </ul>
                        </div>
                        <div className="rounded-3xl border border-cinnabar/15 bg-white/80 p-3 shadow-soft backdrop-blur md:p-4">
                          <h3 className="text-sm font-serif text-cinnabar sm:text-base md:text-base">第二場・嘉義</h3>
                          <ul className="mt-2 space-y-1.5 text-sm font-serif text-stone-700 sm:text-base md:space-y-2 md:text-base">
                            <li className="flex items-baseline gap-2">
                              <span className="text-xs uppercase tracking-[0.3em] text-cinnabar/80 w-14 flex-shrink-0 sm:text-sm sm:w-16 md:text-sm md:w-16">日期</span>
                              <span>114/11/30（星期日）</span>
                            </li>
                            <li className="flex items-baseline gap-2">
                              <span className="text-xs uppercase tracking-[0.3em] text-cinnabar/80 w-14 flex-shrink-0 sm:text-sm sm:w-16 md:text-sm md:w-16">時間</span>
                              <span>12:00 入席</span>
                            </li>
                            <li className="flex items-baseline gap-2">
                              <span className="text-xs uppercase tracking-[0.3em] text-cinnabar/80 w-14 flex-shrink-0 sm:text-sm sm:w-16 md:text-sm md:w-16">地點</span>
                              <span>晶饌會館</span>
                            </li>
                            <li className="flex items-baseline gap-2">
                              <span className="text-xs uppercase tracking-[0.3em] text-cinnabar/80 w-14 flex-shrink-0 sm:text-sm sm:w-16 md:text-sm md:w-16">地址</span>
                              <span>嘉義市西區友忠路 508 號</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 text-center lg:mt-5">
                      <p className="text-sm font-serif uppercase tracking-[0.25em] text-cinnabar/80 sm:text-base md:text-base">Eternal Love</p>
                      <p className="mt-1.5 text-base font-script text-stone-700 sm:text-lg md:text-lg">
                        We sincerely invite you to celebrate with us
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.button
                key="cover"
                type="button"
                onClick={() => setIsOpen(true)}
                className="group absolute inset-0 flex items-center justify-center overflow-hidden rounded-2xl sm:rounded-[32px] md:rounded-[40px] bg-transparent backdrop-blur-md transition focus:outline-none focus-visible:ring-4 focus-visible:ring-cinnabar/50"
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -20 }}
                transition={{ duration: 0.5, ease: [0.25, 0.8, 0.25, 1] }}
                aria-label="開啟婚禮邀請卡"
              >
                <span className="pointer-events-none absolute inset-0">
                  <span className="absolute inset-x-5 inset-y-6 sm:inset-x-8 sm:inset-y-8 md:inset-x-10 md:inset-y-10 rounded-[26px] sm:rounded-[32px] md:rounded-[36px] bg-gradient-to-br from-rose-50/92 via-white to-ivory/92 shadow-2xl transition duration-500 group-hover:from-rose-100 group-hover:via-white group-hover:to-ivory" />
                  <span
                    aria-hidden
                    className="absolute left-1/2 top-[8%] h-[58%] w-[88%] -translate-x-1/2 rounded-t-[34px] bg-gradient-to-b from-rose-100/95 via-rose-50/85 to-ivory/80 shadow-[0_18px_32px_rgba(180,125,125,0.22)]"
                    style={{ clipPath: 'polygon(0% 0%, 50% 72%, 100% 0%, 100% 100%, 0% 100%)' }}
                  />
                  <span
                    aria-hidden
                    className="absolute left-1/2 bottom-[9%] h-[54%] w-[90%] -translate-x-1/2 rounded-b-[30px] bg-gradient-to-br from-rose-50/30 via-white/65 to-rose-100/35"
                    style={{ clipPath: 'polygon(0% 0%, 50% 76%, 100% 0%, 100% 100%, 0% 100%)' }}
                  />
                  <span
                    aria-hidden
                    className="absolute inset-x-[17%] top-[46%] h-px bg-gradient-to-r from-transparent via-rose-200/80 to-transparent"
                  />
                  <span
                    aria-hidden
                    className="absolute left-1/2 bottom-[21%] h-[46%] w-[76%] -translate-x-1/2"
                    style={{
                      backgroundImage:
                        'linear-gradient(124deg, rgba(223, 176, 177, 0.42), rgba(223, 176, 177, 0) 55%), linear-gradient(236deg, rgba(223, 176, 177, 0.42), rgba(223, 176, 177, 0) 55%)',
                      clipPath: 'polygon(0% 0%, 50% 74%, 100% 0%, 100% 100%, 0% 100%)',
                    }}
                  />
                  <span
                    aria-hidden
                    className="absolute inset-x-[18%] bottom-[15%] h-px bg-gradient-to-r from-transparent via-rose-200/70 to-transparent"
                  />
                </span>

                <span className="relative z-30 flex flex-col items-center gap-3 pt-24 pb-12 text-center sm:gap-4 sm:pt-28 sm:pb-14">
                  <span className="font-serif text-3xl text-cinnabar drop-shadow-sm sm:text-5xl md:text-6xl">趙國宏 ＆ 莊雨瑄</span>
                  <span className="font-script text-base text-cinnabar/80 sm:text-2xl md:text-3xl">Tap to open the invitation</span>
                  <span className="text-xs font-serif uppercase tracking-[0.4em] text-cinnabar/70 sm:text-sm">Wedding Invitation</span>
                </span>
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
          className="pointer-events-none absolute left-1/2 top-[2%] sm:top-[3%] z-30 h-[50%] sm:h-[45%] md:h-[45%] lg:h-[48%] w-[94%] sm:w-[92%] -translate-x-1/2"
          style={{
            transformOrigin: 'top center',
            transformStyle: 'preserve-3d',
            clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
          }}
          initial={false}
          animate={
            isOpen
              ? {
                  rotateX: -180,
                  y: prefersReducedMotion ? 0 : -20,
                  opacity: 1,
                }
              : { rotateX: 0, y: 0, opacity: 1 }
          }
          exit={{ rotateX: -180 }}
          transition={{ duration: prefersReducedMotion ? 0.3 : 1.4, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <div
            className="h-full w-full border-2 border-cinnabar/30 bg-gradient-to-b from-rose-200/95 via-rose-100/90 to-ivory/95 shadow-2xl"
            style={{ backfaceVisibility: 'hidden' }}
          />
          <div
            className="absolute inset-0 h-full w-full border-2 border-transparent bg-gradient-to-b from-rose-200/80 via-rose-100/75 to-ivory/80 shadow-inner"
            style={{ transform: 'rotateX(180deg)', backfaceVisibility: 'hidden' }}
          />
        </motion.div>

        <AnimatePresence>
          {isOpen && !prefersReducedMotion && (
            <motion.div
              className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
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