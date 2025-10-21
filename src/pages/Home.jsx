import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AutoThemeTarget } from '../theme/ThemeContext'
import WeddingInvitationModal from '../components/WeddingInvitationModal'

export default function Home(){
  const [isInvitationOpen, setInvitationOpen] = useState(false)

  const openInvitation = () => setInvitationOpen(true)
  const closeInvitation = () => setInvitationOpen(false)

  return (
    <main>
      <AutoThemeTarget theme="euro" className="container-xl pt-10 md:pt-16 pb-10">
        <div className="flex flex-col items-center gap-8 text-center md:flex-row md:items-start md:justify-between md:text-left">
          <div className="max-w-xl">
            <p className="text-sm uppercase tracking-[0.35em] text-cinnabar/70 font-serif">Wedding Day</p>
            <h1 className="mt-3 text-4xl md:text-6xl font-serif leading-tight text-stone-900">莊雨瑄 ＆ 趙國宏</h1>
            <p className="mt-4 font-sans text-base md:text-lg text-stone-700">
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

      <WeddingInvitationModal open={isInvitationOpen} onClose={closeInvitation} />
    </main>
  )
}
