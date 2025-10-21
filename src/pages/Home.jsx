import Section from '../components/Section'
import GalleryAuto from '../components/GalleryAuto'
import { AutoThemeTarget } from '../theme/ThemeContext'

export default function Home(){
  return (
    <main>
      <AutoThemeTarget theme="euro" className="container-xl pt-8 md:pt-12 pb-6">
        <h1 className="text-4xl md:text-6xl font-serif leading-tight">Alice & Bernard</h1>
        <p className="mt-3 font-sans text-stone-700 text-sm md:text-base">歐式的典雅 × 唐風的華美，沿著照片向下滑，主題會替你選。</p>
      </AutoThemeTarget>

      <Section title="照片畫廊（自動切換風格）" subtitle="唐風區塊 → 介面自動轉為唐代配色；歐式區塊 → 還原歐洲風">
        <GalleryAuto />
      </Section>
    </main>
  )
}
