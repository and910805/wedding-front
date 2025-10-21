import { useTheme } from '../theme/ThemeContext'
export default function Footer(){
  const { theme } = useTheme()
  return (
    <footer className={`mt-12 border-t ${theme==='tang' ? 'border-cinnabar/20' : 'border-gold/20'}`}>
      <div className="container-xl py-8 md:py-10 text-center font-sans text-xs md:text-sm text-stone-600">
        <p>Made with ♥ — European × 唐風（Auto Theme v2）</p>
      </div>
    </footer>
  )
}
