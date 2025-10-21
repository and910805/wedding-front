import { useTheme } from '../theme/ThemeContext'
export default function Section({title, subtitle, children}){
  const { theme } = useTheme()
  return (
    <section className="container-xl my-8 md:my-12">
      <div className="text-center mb-4 md:mb-8">
        <h2 className={`text-2xl md:text-4xl font-serif tracking-wide ${theme==='tang'?'text-cinnabar':''}`}>{title}</h2>
        {subtitle && <p className="font-sans text-stone-600 mt-1 md:mt-2 text-sm md:text-base">{subtitle}</p>}
      </div>
      <div className={`p-4 md:p-8 rounded-2xl md:rounded-3xl backdrop-blur border shadow-soft ${theme==='tang' ? 'bg-white/85 border-cinnabar/25' : 'bg-white/80 border-gold/20'}`}>
        {children}
      </div>
    </section>
  )
}
