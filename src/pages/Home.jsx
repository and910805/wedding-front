import { Suspense, lazy, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { AutoThemeTarget } from '../theme/ThemeContext'

const WeddingInvitationModal = lazy(() => import('../components/WeddingInvitationModal'))

export default function Home() {
  const [isInvitationOpen, setInvitationOpen] = useState(true)
  const prefersReducedMotion = useReducedMotion()

  const poemText = `他們，
在某個不經意的午後相遇，
不是同班，
只是朋友的朋友，
在人群的邊緣，交換了一個微笑。

他來自不同的系，
她走過不同的樓，
卻總在某個轉角遇見彼此的身影，
像命運偷偷擺好的座標。

時間流過，
課表換了，季節也換了，
他們仍然記得那句輕輕的「嗨」，
像一顆種子，
在不知不覺間發芽。

多年以後，
他牽起她的手，
笑著說：「原來那天的風，
一直吹到今天。」

—
一場緣分的開花，
從青春的校園開始，
在愛裡長成永恆。`

  const openInvitation = () => setInvitationOpen(true)
  const closeInvitation = () => setInvitationOpen(false)

  return (
    <main>
      <AutoThemeTarget theme="euro" className="container-xl pt-10 md:pt-16 pb-10">
        <div className="flex flex-col items-center gap-8 text-center md:flex-row md:items-start md:justify-between md:text-left">
          <div className="max-w-xl">
            <p className="text-sm uppercase tracking-[0.35em] text-cinnabar/70 font-serif">
              Wedding Day
            </p>
            <h1 className="mt-3 text-3xl md:text-5xl font-serif leading-tight text-stone-900">
              莊雨瑄 ＆ 趙國宏
            </h1>
            {/* ✅ 修正版：桌機單行、手機自動適應不破圖 */}
            <p
              className="mt-4 font-serif text-sm md:text-base leading-relaxed text-stone-700 
                         text-center md:text-left sm:whitespace-nowrap 
                         [text-wrap:balance] sm:[text-wrap:nowrap]"
              style={{
                fontSize: 'clamp(12px, 2.5vw, 16px)',
              }}
            >
              滿載真摯與浪漫的婚禮網站，收藏我們相守的約定，也誠摯邀請您一同蒞臨見證。
            </p>
          </div>

          <div className="flex w-full flex-col items-center gap-4 md:w-auto md:items-end">
            <button
              type="button"
              onClick={openInvitation}
              className="w-full rounded-full bg-cinnabar px-8 py-3 font-serif text-base tracking-wide text-white shadow-lg transition hover:bg-cinnabar/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-cinnabar/70 focus-visible:ring-offset-2 focus-visible:ring-offset-rose-50 md:w-48"
            >
              婚禮資訊
            </button>
            <Link
              to="/gallery"
              className="w-full rounded-full border border-cinnabar/40 bg-white/70 px-8 py-3 font-serif text-base tracking-wide text-cinnabar shadow-soft transition hover:border-cinnabar/60 hover:bg-white md:w-48"
            >
              照片畫廊
            </Link>
          </div>
        </div>
      </AutoThemeTarget>

      <motion.section
        className="poem-section bg-rose-50 px-6 py-16 text-center"
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.6,
          ease: prefersReducedMotion ? 'linear' : [0.16, 1, 0.3, 1],
        }}
      >
        <div className="mx-auto max-w-3xl space-y-6">
          <h2 className="text-2xl font-serif tracking-[0.2em] text-cinnabar md:text-3xl">
            💍 Our Story
          </h2>
          <p className="whitespace-pre-line font-serif text-lg leading-8 text-stone-700 md:text-xl md:leading-9">
            {poemText}
			
          </p>
        </div>
      </motion.section>

      <Suspense
        fallback={(
          <div className="flex items-center justify-center bg-white/70 py-10">
            <p className="font-serif text-base tracking-[0.3em] text-cinnabar/70">
              婚禮資訊載入中⋯
            </p>
          </div>
        )}
      >
        <WeddingInvitationModal open={isInvitationOpen} onClose={closeInvitation} />
      </Suspense>
    </main>
  )
}
