// src/components/WeddingInvitation.jsx
import clsx from 'classnames'
import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

/* === 動畫參數（2s / 1s / 1s） === */
const DOOR_DURATION = 1;   // 左右門滑開時間（秒）
const DOOR_DELAY = 0.6;      // 蠟封退場到門開始滑動的延遲（秒）
const SEAL_DURATION = 0.2;   // 蠟封縮淡時間（秒）
const easeGate = [0.16, 1, 0.3, 1]

/* 背景花紋 SVG（保留你的） */
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
      <path d="M200 340c-25 0-48-18-56-42 18 8 40 4 54-10s18 36 10 54c24 8 42 31 42 56 0 28 22 50 50 50z" fill="url(#petalGradient)" opacity="0.25" />
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
  return Array.from({ length: count }).map((_, i) => ({
    id: `petal-${i}-${Math.random().toString(36).slice(2, 8)}`,
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
  const petals = useMemo(() => createPetalField(isOpen), [isOpen])
  const bgImage = useMemo(() => `url("data:image/svg+xml,${encodeURIComponent(floralPatternSvg)}")`, [])

  return (
    <div className={clsx('relative mx-auto w-full max-w-3xl px-4 py-6 sm:max-w-4xl sm:px-6 md:max-w-5xl md:py-8 lg:max-w-6xl', className)}>
      {/* 統一尺寸：整段吃滿視窗高，避免開前開後大小不一致 */}
      <div className="relative w-full min-h-[100svh]">
        {/* 外框 */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl sm:rounded-[32px] md:rounded-[40px] border-2 border-cinnabar/30 bg-ivory/95 shadow-2xl">
          {/* 背景花紋（淡） */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-15 mix-blend-multiply"
            style={{ backgroundImage: bgImage, backgroundSize: '400px', backgroundPosition: 'center' }}
          />

          {/* 內頁內容（底層；未開禁互動；開啟後為內部滾動區） */}
          <div
            className="relative z-0 h-full w-full px-6 py-6 sm:px-8 sm:py-8 md:px-10 md:py-10 lg:px-12 lg:py-12 flex flex-col overscroll-contain"
            style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
          >
            <div className="flex-1 overflow-y-auto pr-2 sm:pr-4 md:pr-0" style={{ scrollbarGutter: 'stable both-edges' }}>
              <div className="pb-4 sm:pb-6 md:pb-4">
                <motion.h2
                  className="text-center font-serif text-2xl text-cinnabar sm:text-3xl md:text-3xl lg:text-4xl"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  趙國宏 ＆ 莊雨瑄
                </motion.h2>
                <motion.p
                  className="mt-2 text-center font-script text-lg text-cinnabar/90 sm:text-xl md:text-xl"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                >
                  We are getting married!
                </motion.p>
                <p className="mt-2 text-center text-xs font-serif uppercase tracking-[0.35em] text-cinnabar/75 sm:text-sm md:text-sm">
                  Wedding Invitation
                </p>

                {/* 你的資訊排版（保留） */}
                <div className="mt-4 grid gap-3 md:grid-cols-2 md:gap-4 lg:gap-5 lg:mt-5">
                  <div className="space-y-3 md:space-y-3">
                    <div className="rounded-3xl bg-white/70 backdrop-blur p-3 shadow-soft md:p-4">
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
          </div>

          {/* === Gatefold 對開門：手機 fixed（不跟著滾動）、桌機 absolute === */}
          <AnimatePresence mode="wait">
            {!isOpen && (
              <motion.div
                key="gatefold"
                className="fixed inset-0 sm:absolute sm:inset-0 z-30"
                initial={false}
                exit={{ opacity: 1, transition: { when: 'afterChildren', duration: 0 } }}
              >
                {/* 左門 */}
                <motion.button
                  type="button"
                  onClick={() => setIsOpen(true)}
                  className="absolute inset-y-0 left-0 right-1/2 rounded-l-[26px] sm:rounded-l-[32px] md:rounded-l-[36px] border border-stone-200/70 shadow-2xl overflow-hidden"
                  initial={{ x: 0 }}
                  animate={{ x: 0 }}
                  exit={{ x: '-105%', transition: { duration: DOOR_DURATION, ease: easeGate, delay: DOOR_DELAY } }}
                  aria-label="開啟婚禮邀請"
                  style={{ backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.96), rgba(250,244,236,0.96))' }}
                >
                  <span className="absolute inset-0 opacity-20" style={{ backgroundImage: bgImage, backgroundSize: '420px', backgroundPosition: 'center left' }} />
                  <span className="absolute right-0 top-0 h-full w-[3px] bg-gradient-to-b from-yellow-200 via-amber-300 to-yellow-200 opacity-70" />
                </motion.button>

                {/* 右門 */}
                <motion.button
                  type="button"
                  onClick={() => setIsOpen(true)}
                  className="absolute inset-y-0 right-0 left-1/2 rounded-r-[26px] sm:rounded-r-[32px] md:rounded-r-[36px] border border-stone-200/70 shadow-2xl overflow-hidden"
                  initial={{ x: 0 }}
                  animate={{ x: 0 }}
                  exit={{ x: '105%', transition: { duration: DOOR_DURATION, ease: easeGate, delay: DOOR_DELAY } }}
                  aria-label="開啟婚禮邀請"
                  style={{ backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.96), rgba(250,244,236,0.96))' }}
                >
                  <span className="absolute inset-0 opacity-20" style={{ backgroundImage: bgImage, backgroundSize: '420px', backgroundPosition: 'center right' }} />
                  <span className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-yellow-200 via-amber-300 to-yellow-200 opacity-70" />
                </motion.button>

                {/* 蠟封（置中） */}
                <motion.button
                  type="button"
                  onClick={() => setIsOpen(true)}
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 h-16 w-16 sm:h-18 sm:w-18 rounded-full ring-2 ring-cinnabar/30 shadow-[0_12px_22px_rgba(180,80,80,0.3)] focus:outline-none focus-visible:ring-4 focus-visible:ring-cinnabar/40"
                  style={{ top: '42%', background: 'radial-gradient(circle at 35% 30%, #f3b2b5, #d46b71 60%, #b44b50 100%)' }}
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.6, opacity: 0, transition: { duration: SEAL_DURATION, ease: easeGate } }}
                  aria-label="點擊開啟"
                >
                  <span className="absolute inset-0 grid place-items-center">
                    <span className="font-serif text-xs tracking-widest text-white/95 drop-shadow">Z ♥ Y</span>
                  </span>
                  {!prefersReducedMotion && (
                    <motion.span
                      className="absolute inset-0 rounded-full"
                      initial={{ x: '-130%', opacity: 0 }}
                      animate={{ x: '130%', opacity: 0.25 }}
                      transition={{ duration: 2.0, repeat: Infinity, repeatDelay: 3 }}
                      style={{ background: 'linear-gradient(75deg, rgba(255,255,255,0) 45%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 55%)' }}
                    />
                  )}
                </motion.button>

                {/* 提示文字（膠囊） */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
                  <span className="inline-block rounded-full bg-white/80 backdrop-blur px-4 py-2 shadow-sm font-serif text-base sm:text-lg tracking-[0.4em] text-cinnabar/90">
                    打開信封
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 🔝 左上角小小「返回」：固定在最上層，不會被內文遮住 */}
          <div className="absolute inset-0 z-[2000] pointer-events-none">
            <AnimatePresence>
              {isOpen && (
                <motion.button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="返回"
                  className="pointer-events-auto absolute left-3 top-3 sm:left-4 sm:top-4
                             cursor-pointer text-cinnabar/80 hover:text-cinnabar
                             text-[11px] sm:text-xs font-sans font-medium tracking-wide
                             px-2 py-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-cinnabar/40"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                >
                  返回
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* 開啟後落花 */}
        <AnimatePresence>
          {isOpen && !prefersReducedMotion && (
            <motion.div
              className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {petals.map(p => (
                <motion.span
                  key={p.id}
                  className="absolute block rounded-full bg-rose-200/80 blur-sm"
                  style={{ left: `${p.left}%`, width: `${p.size}px`, height: `${p.size}px`, opacity: p.opacity }}
                  initial={{ y: '-15vh', x: 0, rotate: 0, opacity: 0 }}
                  animate={{ y: '110vh', x: p.drift, rotate: p.rotation, opacity: 1 }}
                  transition={{ delay: p.delay, duration: p.duration, ease: 'linear', repeat: Infinity }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
