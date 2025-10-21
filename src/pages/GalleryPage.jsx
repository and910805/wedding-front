import Section from '../components/Section'
import GalleryAuto from '../components/GalleryAuto'
export default function GalleryPage(){
  return (
    <main>
      <Section title="照片畫廊" subtitle="向下滑動，主題會跟著相簿自動切換">
        <GalleryAuto />
      </Section>
    </main>
  )
}
