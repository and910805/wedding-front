import { useState } from 'react'
import { photosEuro } from '../data/photosEuro'
import { photosTang } from '../data/photosTang'
import Lightbox from './Lightbox'

export default function GalleryAuto(){
  const [active, setActive] = useState(null)

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h3 className="text-xl md:text-2xl mb-3 md:mb-4">婚禮相簿精選</h3>
        <p className="font-sans text-sm md:text-base text-stone-600">一頁一頁翻閱婚禮相簿，將親友的祝福與最燦爛的笑容通通珍藏。</p>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
        {[...photosTang, ...photosEuro].map((src, i)=>(
          <button
            key={src}
            type="button"
            onClick={()=>setActive(src)}
            className="group relative block w-full overflow-hidden rounded-2xl border border-stone-200/70 bg-white/60 shadow-soft transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-200 focus-visible:ring-offset-2 focus-visible:ring-offset-rose-50"
            aria-label={`檢視婚禮照片 ${i + 1}`}
          >
            <div className="aspect-[4/3] w-full overflow-hidden">
              <img
                src={src}
                alt="婚禮照片"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true">
              <span className="absolute inset-0 bg-gradient-to-br from-rose-50/30 to-rose-100/20 mix-blend-multiply" />
            </div>
          </button>
        ))}
      </div>

      <Lightbox open={!!active} src={active} onClose={()=>setActive(null)} />
    </div>
  )
}
