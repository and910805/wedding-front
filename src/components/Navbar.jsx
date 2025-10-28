import { useMemo } from 'react'
import { useTheme } from '../theme/ThemeContext'
import { assetUrl } from '../utils/assetUrl'

const sections = [
  { href: '#story', label: '緣起' },
  { href: '#gallery', label: '照片畫廊' },
  { href: '#seating', label: '座位查詢' },
  { href: '#creator', label: '聯絡創作人' },
]

export default function Navbar(){
  const { theme } = useTheme()
  const accent = theme === 'tang' ? 'text-cinnabar' : 'text-forest'
  const pillBg = theme === 'tang' ? 'bg-white/70 border-cinnabar/20' : 'bg-white/75 border-forest/20'

  const navItems = useMemo(() => sections, [])

  return (
    <header className={`sticky top-0 z-50 border-b backdrop-blur ${theme==='tang' ? 'bg-cloud/85 border-cinnabar/15' : 'bg-ivory/85 border-gold/15'}`}>
      <div className="container-xl flex h-14 items-center justify-between md:h-16">
        <a href="#top" className="flex items-center gap-3">
          <img
            src={theme==='tang' ? assetUrl('logo-tang.svg') : assetUrl('logo.svg')}
            alt="莊雨瑄與趙國宏婚禮標誌"
            className="h-8 w-8 md:h-9 md:w-9"
          />
          <div className="flex flex-col leading-tight">
            <span className={`text-base font-serif tracking-[0.4em] uppercase ${accent}`}>Wedding</span>
            <span className="text-lg md:text-xl font-serif tracking-wide text-stone-900">莊雨瑄 &amp; 趙國宏</span>
          </div>
        </a>
        <nav className="hidden items-center gap-3 md:flex">
          <div className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-sans uppercase tracking-[0.25em] text-stone-500 ${pillBg}`}>
            <span className="inline-flex h-2 w-2 rounded-full bg-gradient-to-br from-rose-400 to-cinnabar/80" aria-hidden="true"></span>
            Romantic Journey
          </div>
          <ul className="flex items-center gap-2 text-sm font-sans">
            {navItems.map(({href, label}) => (
              <li key={href}>
                <a
                  href={href}
                  className={`group inline-flex items-center gap-2 rounded-full border border-transparent px-4 py-2 font-medium transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-20px_rgba(244,63,94,0.8)] ${theme==='tang' ? 'bg-white/80 text-stone-700 hover:text-cinnabar' : 'bg-white/80 text-stone-700 hover:text-forest'}`}
                >
                  <span className="relative">
                    {label}
                    <span className={`absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${theme==='tang' ? 'bg-cinnabar/60' : 'bg-forest/50'}`} aria-hidden="true"></span>
                  </span>
                  <span className="text-xs opacity-0 transition-opacity duration-300 group-hover:opacity-70">↧</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="md:hidden">
          <details className="relative">
            <summary className={`flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm font-sans ${theme==='tang' ? 'border-cinnabar/40 text-cinnabar' : 'border-forest/40 text-forest'}`}>
              導覽
              <span className="text-base">⌄</span>
            </summary>
            <ul className="absolute right-0 mt-3 w-48 overflow-hidden rounded-2xl border border-stone-200 bg-white/95 shadow-soft backdrop-blur">
              {navItems.map(({href, label}) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={(event) => {
                      const details = event.currentTarget.closest('details')
                      if (details) details.removeAttribute('open')
                    }}
                    className="block px-4 py-3 text-sm text-stone-700 transition hover:bg-rose-50/80"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </details>
        </div>
      </div>
    </header>
  )
}
