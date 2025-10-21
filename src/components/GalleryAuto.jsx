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
        <p className="font-sans text-sm md:text-base text-stone-600">唐風與歐式的風情收藏在同一冊裡，讓你一次重溫所有動人畫面。</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
        {[...photosTang, ...photosEuro].map((src, i)=>(
          <img
            key={i}
            src={src}
            alt={`wedding-${i}`}
            className="rounded-xl md:rounded-2xl border border-stone-300/40 shadow-soft cursor-pointer"
            onClick={()=>setActive(src)}
          />
        ))}
      </div>

      <Lightbox open={!!active} src={active} onClose={()=>setActive(null)} />
    </div>
  )
}
