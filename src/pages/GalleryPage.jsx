import Section from '../components/Section'
import GalleryAuto from '../components/GalleryAuto'

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      {/* Hero Section */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif font-normal text-stone-800 mb-4">
              婚禮回憶
            </h1>
            <p className="text-lg md:text-xl text-stone-600 leading-relaxed">
              每一個瞬間都是永恆，每一張照片都是故事
            </p>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <Section 
        title="照片畫廊" 
        subtitle="沿著相片的節奏漫步，重溫婚禮最真摯的畫面"
        className="py-12 md:py-16"
      >
        <GalleryAuto />
      </Section>

      {/* Footer Note */}
      <div className="bg-stone-50 border-t border-stone-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-stone-500 text-sm">
            <p>感謝所有參與我們重要日子的親朋好友</p>
            <p className="mt-2">這些珍貴的時刻將永遠留在我們心中</p>
          </div>
        </div>
      </div>
    </main>
  )
}