import { Link, NavLink } from 'react-router-dom'
import { useTheme } from '../theme/ThemeContext'

export default function Navbar(){
  const { theme } = useTheme()
  return (
    <header className={`sticky top-0 z-50 backdrop-blur border-b ${theme==='tang' ? 'bg-cloud/80 border-cinnabar/20' : 'bg-ivory/80 border-gold/20'}`}>
      <div className="container-xl flex h-14 md:h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src={theme==='tang' ? '/logo-tang.svg' : '/logo.svg'} alt="logo" className="h-7 w-7 md:h-8 md:w-8" />
          <span className={`text-lg md:text-xl font-serif tracking-wide ${theme==='tang' ? 'text-cinnabar' : 'text-forest'}`}>我們的婚禮</span>
        </Link>
        <nav className="flex items-center gap-4 md:gap-6 font-sans text-sm md:text-base">
          {['/', '/story', '/gallery', '/seating'].map((p)=>{
            const labels = { '/': '首頁', '/story': '故事', '/gallery': '相簿', '/seating': '座位' }
            return (
              <NavLink key={p} to={p} className={({isActive}) =>
                `pb-0.5 ${isActive ? (theme==='tang'?'text-cinnabar':'text-forest') : 'text-stone-700 hover:text-stone-900'}`}>
                {labels[p]}
              </NavLink>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
