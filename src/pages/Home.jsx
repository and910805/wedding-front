import Section from '../components/Section'
import GalleryAuto from '../components/GalleryAuto'
import { AutoThemeTarget } from '../theme/ThemeContext'
import WeddingInvitation from '../components/WeddingInvitation'

export default function Home(){
  return (
    <main>
      <AutoThemeTarget theme="euro" className="container-xl pt-8 md:pt-12 pb-6">
        <h1 className="text-4xl md:text-6xl font-serif leading-tight">莊雨瑄 & 趙國宏</h1>
        <p className="mt-3 font-sans text-stone-700 text-sm md:text-base">沿著照片向下滑，與我們一同收藏婚禮的每個幸福瞬間。</p>
      </AutoThemeTarget>

      <WeddingInvitation />

      <Section title="照片畫廊" subtitle="婚禮的動人片段彙整成單一畫廊，讓回憶更聚焦。">
        <GalleryAuto />
      </Section>
    </main>
  )
}
