import { createContext, useContext, useEffect, useRef, useState } from 'react'

const ThemeContext = createContext({ theme: 'euro', setTheme: () => {} })

export function ThemeProvider({children}){
  const [theme, setTheme] = useState('euro')
  useEffect(()=>{
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])
  return <ThemeContext.Provider value={{theme, setTheme}}>{children}</ThemeContext.Provider>
}
export function useTheme(){ return useContext(ThemeContext) }

/**
 * AutoThemeTarget v2
 * - More forgiving threshold (default .3)
 * - rootMargin accounts for sticky header (~64px)
 * - Falls back to 'scroll' check if IO not supported
 * - Accepts className for layout (so you can add min-h for reliability)
 */
export function AutoThemeTarget({theme, children, threshold=.3, rootMargin='-64px 0px -45% 0px', className=''}){
  const { setTheme } = useTheme()
  const ref = useRef(null)

  useEffect(()=>{
    const node = ref.current
    if(!node) return
    if ('IntersectionObserver' in window){
      const io = new IntersectionObserver((entries)=>{
        const e = entries[0]
        if (e.isIntersecting && e.intersectionRatio >= threshold) setTheme(theme)
      }, { threshold: [0,.15,.3,.5,.75,1], rootMargin })
      io.observe(node)
      return () => io.disconnect()
    } else {
      const onScroll = () => {
        const r = node.getBoundingClientRect()
        const vh = window.innerHeight || document.documentElement.clientHeight
        const visible = Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0))
        if (visible / Math.max(1, r.height) >= threshold) setTheme(theme)
      }
      onScroll()
      window.addEventListener('scroll', onScroll, { passive: true })
      return () => window.removeEventListener('scroll', onScroll)
    }
  }, [theme, threshold, rootMargin, setTheme])

  return <div ref={ref} className={className} data-theme-target={theme}>{children}</div>
}
