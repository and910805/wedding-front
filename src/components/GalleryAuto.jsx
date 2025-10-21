import { useState } from 'react'
import { AutoThemeTarget } from '../theme/ThemeContext'
import { photosEuro } from '../data/photosEuro'
import { photosTang } from '../data/photosTang'
import Lightbox from './Lightbox'

export default function GalleryAuto(){
  const [active, setActive] = useState(null)

  return (
    <div className="space-y-8 md:space-y-12">
      {/* Tang block */}
      <AutoThemeTarget theme="tang" className="min-h-[70vh]">
        <h3 className="text-xl md:text-2xl mb-3 md:mb-4">唐風相簿</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
          {photosTang.map((src, i)=>(
            <img key={i} src={src} alt={`tang-${i}`} className="rounded-xl md:rounded-2xl border border-stone-300/40 shadow-soft cursor-pointer"
                 onClick={()=>setActive(src)} />
          ))}
        </div>
      </AutoThemeTarget>

      {/* Euro block */}
      <AutoThemeTarget theme="euro" className="min-h-[70vh]">
        <h3 className="text-xl md:text-2xl mb-3 md:mb-4">歐式相簿</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
          {photosEuro.map((src, i)=>(
            <img key={i} src={src} alt={`euro-${i}`} className="rounded-xl md:rounded-2xl border border-stone-300/40 shadow-soft cursor-pointer"
                 onClick={()=>setActive(src)} />
          ))}
        </div>
      </AutoThemeTarget>

      <Lightbox open={!!active} src={active} onClose={()=>setActive(null)} />
    </div>
  )
}
