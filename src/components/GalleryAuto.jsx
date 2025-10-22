import { useState } from 'react'
import { photosEuro } from '../data/photosEuro'
import { photosTang } from '../data/photosTang'
import Lightbox from './Lightbox'

const galleryPhotos = [...photosTang, ...photosEuro]

export default function GalleryAuto(){
  const [activeIndex, setActiveIndex] = useState(null)
  const hasPhotos = galleryPhotos.length > 0
  const activeSrc = activeIndex !== null && hasPhotos ? galleryPhotos[activeIndex] : null

  const showNext = ()=>{
    if(!hasPhotos) return
    setActiveIndex((prev)=>{
      if(prev === null) return 0
      return (prev + 1) % galleryPhotos.length
    })
  }

  const showPrev = ()=>{
    if(!hasPhotos) return
    setActiveIndex((prev)=>{
      if(prev === null) return galleryPhotos.length - 1
      return (prev - 1 + galleryPhotos.length) % galleryPhotos.length
    })
  }

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h3 className="text-xl md:text-2xl mb-3 md:mb-4">婚禮相簿精選</h3>
        <p className="font-sans text-sm md:text-base text-stone-600">一頁一頁翻閱婚禮相簿，將親友的祝福與最燦爛的笑容通通珍藏。</p>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
        {galleryPhotos.map((src, i)=>(
          <button
            key={src}
            type="button"
            onClick={()=>setActiveIndex(i)}
            className="group relative block w-full overflow-hidden rounded-2xl border border-stone-200/70 bg-white/60 shadow-soft transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-200 focus-visible:ring-offset-2 focus-visible:ring-offset-rose-50"
            aria-label={`檢視婚禮照片 ${i + 1}`}
          >
            <img
              src={src}
              alt="婚禮照片"
              className="block h-auto w-full transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true">
              <span className="absolute inset-0 bg-gradient-to-br from-rose-50/30 to-rose-100/20 mix-blend-multiply" />
            </div>
          </button>
        ))}
      </div>

      <Lightbox
        open={activeIndex !== null}
        src={activeSrc}
        onClose={()=>setActiveIndex(null)}
        onNext={showNext}
        onPrev={showPrev}
      />
    </div>
  )
}
