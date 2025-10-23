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
            <p className="font-sans text-lg md:text-xl text-stone-600 leading-relaxed">
              每一個瞬間都是永恆，每一張照片都是故事
            </p>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-rose-100/60 bg-white/80 shadow-[0_25px_70px_-25px_rgba(244,114,182,0.35)]">
            <div className="absolute -top-16 right-6 h-48 w-48 rounded-full bg-rose-100/50 blur-3xl" aria-hidden="true" />
            <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-rose-50/70 to-transparent" aria-hidden="true" />
            <div className="relative z-10 px-6 py-10 md:px-10 md:py-14">
              <div className="text-center mb-8">
                <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-rose-100/70 text-rose-600 font-sans text-sm tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" aria-hidden="true" />
                  照片畫廊
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" aria-hidden="true" />
                </span>
                <h2 className="mt-4 text-3xl md:text-4xl font-serif text-stone-800">
                  與我們一同回味最美的瞬間
                </h2>
              </div>
              <GalleryAuto />
            </div>
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <div className="bg-stone-50 border-t border-stone-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-stone-500 text-sm font-sans space-y-2">
            <p>感謝所有參與我們重要日子的親朋好友</p>
            <p>這些珍貴的時刻將永遠留在我們心中</p>
          </div>
        </div>
      </div>
    </main>
  )
}
