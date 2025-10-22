import { useState, useMemo } from 'react'
import { photosEuro } from '../data/photosEuro'
import { photosTang } from '../data/photosTang'
import Lightbox from './Lightbox'

export default function GalleryAuto() {
  // 合併所有圖片（順序你可以自己調整）
  const items = useMemo(() => [...photosTang, ...photosEuro], [])
  const [activeIndex, setActiveIndex] = useState(null)

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h3 className="text-xl md:text-2xl mb-3 md:mb-4">婚禮相簿精選</h3>
        <p className="font-sans text-sm md:text-base text-stone-600">
          一頁一頁翻閱婚禮相簿，將親友的祝福與最燦爛的笑容通通珍藏。
        </p>
      </div>

      {/* 取消固定 4:3 比例，不裁切、不拉伸 */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
        {items.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setActiveIndex(i)}
            className="group relative block w-full overflow-hidden rounded-2xl border border-stone-200/70 bg-white/60 shadow-soft transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-200 focus-visible:ring-offset-2 focus-visible:ring-offset-rose-50"
            aria-label={`檢視婚禮照片 ${i + 1}`}
          >
            <div className="w-full overflow-hidden bg-white">
              {/* 關鍵：用 object-contain + h-auto，保持原始比例，不變形 */}
              <img
                src={src}
                alt={`婚禮照片 ${i + 1}`}
                className="block w-full h-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                loading="lazy"
              />
            </div>

            <div
              className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              aria-hidden="true"
            >
              <span className="absolute inset-0 bg-gradient-to-br from-rose-50/30 to-rose-100/20 mix-blend-multiply" />
            </div>
          </button>
        ))}
      </div>

      {/* 新版 Lightbox：支援下一張/上一張、點一下換下一張 */}
      <Lightbox
        open={activeIndex !== null}
        items={items}
        index={activeIndex ?? 0}
        onClose={() => setActiveIndex(null)}
        onPrev={() => setActiveIndex((i) => (i - 1 + items.length) % items.length)}
        onNext={() => setActiveIndex((i) => (i + 1) % items.length)}
      />
    </div>
  )
}
